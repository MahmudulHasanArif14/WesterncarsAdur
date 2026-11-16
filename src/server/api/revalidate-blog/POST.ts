import type { Request, Response } from 'express';
import { handleRevalidateBlogWebhook } from '../../revalidate-blog';
import {
  DELIVERY_HEADER,
  EVENT_HEADER,
  IDEMPOTENCY_HEADER,
  SIGNATURE_HEADER,
  TIMESTAMP_HEADER,
} from '../../webhook-signature';

export default function handler(req: Request, res: Response) {
  const rawBody = Buffer.isBuffer(req.body) ? req.body.toString('utf8') : '';
  const result = handleRevalidateBlogWebhook(rawBody, {
    [SIGNATURE_HEADER]: req.get(SIGNATURE_HEADER) ?? null,
    [TIMESTAMP_HEADER]: req.get(TIMESTAMP_HEADER) ?? null,
    [DELIVERY_HEADER]: req.get(DELIVERY_HEADER) ?? null,
    [IDEMPOTENCY_HEADER]: req.get(IDEMPOTENCY_HEADER) ?? null,
    [EVENT_HEADER]: req.get(EVENT_HEADER) ?? null,
  });
  res.status(result.status).json(result.body);
}
