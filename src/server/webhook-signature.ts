import { createHmac, timingSafeEqual } from 'node:crypto';

export const SIGNATURE_HEADER = 'x-westerncars-signature';
export const TIMESTAMP_HEADER = 'x-westerncars-timestamp';
export const DELIVERY_HEADER = 'x-westerncars-delivery-id';
export const IDEMPOTENCY_HEADER = 'x-westerncars-idempotency-key';
export const EVENT_HEADER = 'x-westerncars-event';
export const SIGNATURE_VERSION = 'v1';
export const DEFAULT_TOLERANCE_SECONDS = 300;

function signingString(timestamp: number, rawBody: string): string {
  return `${SIGNATURE_VERSION}:${timestamp}:${rawBody}`;
}

function sign(rawBody: string, secret: string, timestamp: number): string {
  return createHmac('sha256', secret)
    .update(signingString(timestamp, rawBody))
    .digest('hex');
}

function constantTimeEquals(leftValue: string, rightValue: string): boolean {
  const left = Buffer.from(leftValue, 'utf8');
  const right = Buffer.from(rightValue, 'utf8');

  if (left.length !== right.length) {
    timingSafeEqual(left, left);
    return false;
  }

  return timingSafeEqual(left, right);
}

export type VerifyFailure =
  | 'missing_signature'
  | 'missing_timestamp'
  | 'malformed_timestamp'
  | 'stale_timestamp'
  | 'unsupported_signature_version'
  | 'malformed_signature'
  | 'invalid_signature'
  | 'not_configured';

export type VerifyResult =
  | { ok: true; timestamp: number }
  | { ok: false; reason: VerifyFailure };

export function verifyWebhook(options: {
  rawBody: string;
  secret: string | undefined;
  signatureHeader: string | null;
  timestampHeader: string | null;
  now?: number;
  toleranceSeconds?: number;
}): VerifyResult {
  const {
    rawBody,
    secret,
    signatureHeader,
    timestampHeader,
    now = Math.floor(Date.now() / 1000),
    toleranceSeconds = DEFAULT_TOLERANCE_SECONDS,
  } = options;

  if (!secret) return { ok: false, reason: 'not_configured' };
  if (!signatureHeader) return { ok: false, reason: 'missing_signature' };
  if (!timestampHeader) return { ok: false, reason: 'missing_timestamp' };
  if (!/^\d{1,15}$/.test(timestampHeader.trim())) {
    return { ok: false, reason: 'malformed_timestamp' };
  }

  const timestamp = Number(timestampHeader.trim());
  if (Math.abs(now - timestamp) > toleranceSeconds) {
    return { ok: false, reason: 'stale_timestamp' };
  }

  const [version, provided] = signatureHeader.trim().split('=', 2);
  if (version !== SIGNATURE_VERSION) {
    return { ok: false, reason: 'unsupported_signature_version' };
  }
  if (!provided || !/^[0-9a-f]{64}$/i.test(provided)) {
    return { ok: false, reason: 'malformed_signature' };
  }

  const expected = sign(rawBody, secret, timestamp);
  return constantTimeEquals(expected, provided.toLowerCase())
    ? { ok: true, timestamp }
    : { ok: false, reason: 'invalid_signature' };
}
