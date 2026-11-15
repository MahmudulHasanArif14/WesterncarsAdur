import type { IncomingMessage, ServerResponse } from 'node:http';
import { sendContactEmail, type ContactInput } from '../src/lib/contact-email.js';

type VercelRequest = IncomingMessage & {
  body?: unknown;
};

type VercelResponse = ServerResponse & {
  status(code: number): VercelResponse;
  json(body: unknown): void;
};

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method not allowed.' });
    return;
  }

  const body = req.body;
  const input: ContactInput = typeof body === 'object' && body !== null
    ? body as ContactInput
    : {};
  const result = await sendContactEmail(input);
  res.status(result.status).json({ message: result.message });
}
