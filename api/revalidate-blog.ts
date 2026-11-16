import type { IncomingMessage, ServerResponse } from 'node:http';
import { handleRevalidateBlogWebhook } from '../src/server/revalidate-blog';
import {
  DELIVERY_HEADER,
  EVENT_HEADER,
  IDEMPOTENCY_HEADER,
  SIGNATURE_HEADER,
  TIMESTAMP_HEADER,
} from '../src/server/webhook-signature';

function header(req: IncomingMessage, name: string): string | null {
  const value = req.headers[name];
  return Array.isArray(value) ? value[0] ?? null : value ?? null;
}

async function readBody(req: IncomingMessage): Promise<string> {
  const chunks: Buffer[] = [];
  let size = 0;

  for await (const chunk of req) {
    const buffer = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
    size += buffer.length;
    if (size > 256 * 1024) throw new Error('request_too_large');
    chunks.push(buffer);
  }

  return Buffer.concat(chunks).toString('utf8');
}

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.setHeader('Allow', 'POST');
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ ok: false, code: 'method_not_allowed' }));
    return;
  }

  try {
    const result = handleRevalidateBlogWebhook(await readBody(req), {
      [SIGNATURE_HEADER]: header(req, SIGNATURE_HEADER),
      [TIMESTAMP_HEADER]: header(req, TIMESTAMP_HEADER),
      [DELIVERY_HEADER]: header(req, DELIVERY_HEADER),
      [IDEMPOTENCY_HEADER]: header(req, IDEMPOTENCY_HEADER),
      [EVENT_HEADER]: header(req, EVENT_HEADER),
    });
    res.statusCode = result.status;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result.body));
  } catch (error) {
    if (error instanceof Error && error.message === 'request_too_large') {
      res.statusCode = 413;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ ok: false, code: 'request_too_large' }));
      return;
    }
    console.error('blog.webhook.read_failed', error instanceof Error ? error.message : 'unknown error');
    res.statusCode = 400;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ ok: false, code: 'invalid_request' }));
  }
}
