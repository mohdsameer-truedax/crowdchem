import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';
import { z } from 'zod';

const contactCategories = ["partnerships", "sales", "recruitment", "press"] as const;

const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  category: z.enum(contactCategories),
  company: z.string().optional(),
  message: z.string().max(1000).optional(),
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const allowedOrigins = [
    process.env.VITE_BASE_URL,
    process.env.VITE_API_URL,
    "http://localhost:5173"
    
  ].filter(Boolean);
  
  const origin = req.headers.origin || '';
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'method.not-allowed' });

  try {
    const rawData = req.body || {};

    const validationResult = contactSchema.safeParse(rawData);
    if (!validationResult.success) {
      return res.status(400).json({ 
        error: 'validation.failed', 
        message: validationResult.error.issues[0]?.message 
      });
    }

    if (!process.env.RESEND_API_KEY) {
      return res.status(500).json({ error: 'server.error', message: 'API key not configured' });
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
    return res.status(500).json({ 
      error: 'server.error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
