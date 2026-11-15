import type { Request, Response } from 'express';
import { sendContactEmail } from '../../../lib/contact-email';

export default async function handler(req: Request, res: Response) {
  const result = await sendContactEmail(req.body);
  res.status(result.status).json({ message: result.message });
}
