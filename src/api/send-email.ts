import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';
import { contactSchema } from '../pages/Contact/schema/FormSchema';
import { validateRFCEmail } from '../server/emailValidator';
import { ZodError } from 'zod';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'method.not-allowed' });

  try {
    const rawData = {
      name: req.query.name as string || '',
      email: req.query.email as string || '',
      company: req.query.company as string || '',
      category: req.query.category as string || 'partnerships',
      message: req.query.message as string || ''
    };

    const validationResult = contactSchema.safeParse(rawData);
    if (!validationResult.success) {
      const firstIssue = (validationResult.error as ZodError).issues[0];
      return res.status(400).json({ error: 'validation.failed', message: firstIssue?.message });
    }

    const rfcValidation = validateRFCEmail(validationResult.data.email);
    if (!rfcValidation.valid) {
      return res.status(400).json({ error: 'email.invalid', message: rfcValidation.error });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: "Your Site <onboarding@resend.dev>",
      to: "mohdsameer@truedax.io",
      subject: `Message from ${validationResult.data.name}`,
      html: `
        <h3>New Contact Submission</h3>
        <p><strong>Name:</strong> ${validationResult.data.name}</p>
        <p><strong>Email:</strong> ${validationResult.data.email}</p>
        <p><strong>Company:</strong> ${validationResult.data.company || "N/A"}</p>
        <p><strong>Category:</strong> ${validationResult.data.category}</p>
        <p><strong>Message:</strong> ${validationResult.data.message || "N/A"}</p>
      `
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'server.error' });
  }
}
