import { Resend } from 'resend';
import * as dotenv from 'dotenv';
import type { ContactFormData } from '../pages/Contact/schema/FormSchema';

dotenv.config();

export async function sendEmail(data: ContactFormData): Promise<{ success: boolean; error?: string }> {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error("RESEND_API_KEY not configured");
    }

    const resend = new Resend(apiKey);
    
    const result = await resend.emails.send({
      from: "Your Site <onboarding@resend.dev>",
      to: "mohdsameer@truedax.io",
      subject: `Message from ${data.name}`,
      html: `
        <h3>New Contact Submission</h3>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Company:</strong> ${data.company || "N/A"}</p>
        <p><strong>Category:</strong> ${data.category}</p>
        <p><strong>Message:</strong></p>
        <p>${data.message || "N/A"}</p>
      `,
    });

    console.log("✅ Email sent:", result);
    return { success: true };
  } catch (error) {
    console.error("❌ Email error:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Unknown error"
    };
  }
}