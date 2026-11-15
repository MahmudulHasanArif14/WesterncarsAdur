import type { Request, Response } from 'express';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function value(input: unknown, maxLength: number): string {
  return typeof input === 'string' ? input.trim().slice(0, maxLength) : '';
}

export default async function handler(req: Request, res: Response) {
  const name = value(req.body?.name, 100);
  const email = value(req.body?.email, 254);
  const telephone = value(req.body?.telephone, 30);
  const organisation = value(req.body?.organisation, 150);
  const message = value(req.body?.message, 5000);
  const enquiryType = value(req.body?.enquiryType, 80) || 'General enquiry';

  if (!name || !emailPattern.test(email) || !message || req.body?.consent !== true && req.body?.consent !== 'true') {
    res.status(400).json({ message: 'Please provide your name, a valid email address, your message and consent.' });
    return;
  }

  const { MS_GRAPH_TENANT_ID, MS_GRAPH_CLIENT_ID, MS_GRAPH_CLIENT_SECRET, MAIL_FROM_ADDRESS, MAIL_TO_ADDRESS } = process.env;
  if (!MS_GRAPH_TENANT_ID || !MS_GRAPH_CLIENT_ID || !MS_GRAPH_CLIENT_SECRET || !MAIL_FROM_ADDRESS || !MAIL_TO_ADDRESS) {
    console.error('contact.configuration.missing');
    res.status(503).json({ message: 'The enquiry service is not configured. Please call us on 01273 473737.' });
    return;
  }

  try {
    const tokenResponse = await fetch(`https://login.microsoftonline.com/${encodeURIComponent(MS_GRAPH_TENANT_ID)}/oauth2/v2.0/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: MS_GRAPH_CLIENT_ID,
        client_secret: MS_GRAPH_CLIENT_SECRET,
        scope: 'https://graph.microsoft.com/.default',
        grant_type: 'client_credentials',
      }),
    });
    if (!tokenResponse.ok) throw new Error(`Token request failed with ${tokenResponse.status}`);
    const token = await tokenResponse.json() as { access_token?: string };
    if (!token.access_token) throw new Error('Token response did not contain an access token');

    const body = [
      `Enquiry type: ${enquiryType}`,
      `Name: ${name}`,
      `Email: ${email}`,
      `Telephone: ${telephone || 'Not provided'}`,
      `Organisation: ${organisation || 'Not provided'}`,
      '',
      message,
    ].join('\n');

    const mailResponse = await fetch(`https://graph.microsoft.com/v1.0/users/${encodeURIComponent(MAIL_FROM_ADDRESS)}/sendMail`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token.access_token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: {
          subject: `${enquiryType} from ${name}`,
          body: { contentType: 'Text', content: body },
          toRecipients: [{ emailAddress: { address: MAIL_TO_ADDRESS } }],
          replyTo: [{ emailAddress: { address: email, name } }],
        },
        saveToSentItems: true,
      }),
    });
    if (!mailResponse.ok) throw new Error(`Graph sendMail failed with ${mailResponse.status}`);
    res.status(202).json({ message: 'Enquiry sent.' });
  } catch (error) {
    console.error('contact.send.failed', error instanceof Error ? error.message : 'unknown error');
    res.status(502).json({ message: 'We could not send your enquiry. Please call us on 01273 473737.' });
  }
}
