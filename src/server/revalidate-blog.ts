import {
  DELIVERY_HEADER,
  EVENT_HEADER,
  IDEMPOTENCY_HEADER,
  SIGNATURE_HEADER,
  TIMESTAMP_HEADER,
  verifyWebhook,
} from './webhook-signature';

type DeliveryPayload = {
  event: 'published' | 'updated';
  location: string;
  slug: string;
  postId: string;
  title: string;
  publishedAt: string | null;
  updatedAt: string | null;
  canonicalUrl: string | null;
  contentUrl: string;
  deliveryId: string;
  idempotencyKey: string;
  attempt: number;
  sentAt: string;
};

type HeaderValues = Partial<Record<
  typeof SIGNATURE_HEADER | typeof TIMESTAMP_HEADER | typeof DELIVERY_HEADER |
  typeof IDEMPOTENCY_HEADER | typeof EVENT_HEADER,
  string | null
>>;

type RevalidateResult = {
  status: number;
  body: Record<string, unknown>;
};

const seen = new Map<string, number>();

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function isDeliveryPayload(value: unknown): value is DeliveryPayload {
  if (typeof value !== 'object' || value === null) return false;
  const payload = value as Partial<DeliveryPayload>;
  return (
    (payload.event === 'published' || payload.event === 'updated') &&
    isNonEmptyString(payload.location) &&
    isNonEmptyString(payload.slug) &&
    isNonEmptyString(payload.postId) &&
    isNonEmptyString(payload.contentUrl) &&
    isNonEmptyString(payload.deliveryId) &&
    isNonEmptyString(payload.idempotencyKey)
  );
}

function rememberIdempotencyKey(key: string, now: number): boolean {
  const expiry = 300_000;
  const seenAt = seen.get(key);
  if (seenAt !== undefined && now - seenAt < expiry) return true;

  for (const [existingKey, existingAt] of seen) {
    if (now - existingAt >= expiry) seen.delete(existingKey);
  }

  if (seen.size >= 500) {
    const oldest = seen.keys().next();
    if (!oldest.done) seen.delete(oldest.value);
  }
  seen.set(key, now);
  return false;
}

export function handleRevalidateBlogWebhook(
  rawBody: string,
  headers: HeaderValues,
  now = Math.floor(Date.now() / 1000),
): RevalidateResult {
  const verified = verifyWebhook({
    rawBody,
    secret: process.env.REVALIDATE_WEBHOOK_SECRET,
    signatureHeader: headers[SIGNATURE_HEADER] ?? null,
    timestampHeader: headers[TIMESTAMP_HEADER] ?? null,
    now,
  });

  if (verified.ok === false) {
    return { status: 401, body: { ok: false, code: verified.reason } };
  }

  let value: unknown;
  try {
    value = JSON.parse(rawBody);
  } catch {
    return { status: 400, body: { ok: false, code: 'invalid_json' } };
  }

  if (!isDeliveryPayload(value)) {
    return { status: 400, body: { ok: false, code: 'invalid_payload' } };
  }

  const expectedLocation = (process.env.VITE_BLOG_LOCATION || 'adur').trim().toLowerCase();
  if (value.location !== expectedLocation) {
    return { status: 400, body: { ok: false, code: 'wrong_location' } };
  }

  if (headers[EVENT_HEADER] && headers[EVENT_HEADER] !== value.event) {
    return { status: 400, body: { ok: false, code: 'event_mismatch' } };
  }
  if (headers[DELIVERY_HEADER] && headers[DELIVERY_HEADER] !== value.deliveryId) {
    return { status: 400, body: { ok: false, code: 'delivery_mismatch' } };
  }
  if (headers[IDEMPOTENCY_HEADER] && headers[IDEMPOTENCY_HEADER] !== value.idempotencyKey) {
    return { status: 400, body: { ok: false, code: 'idempotency_mismatch' } };
  }

  const duplicate = rememberIdempotencyKey(value.idempotencyKey, now * 1000);
  console.info('blog.webhook.accepted', {
    event: value.event,
    location: value.location,
    slug: value.slug,
    duplicate,
  });

  return { status: 200, body: { ok: true, duplicate } };
}
