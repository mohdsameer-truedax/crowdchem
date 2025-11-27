/*
  AWS Lambda handler for sending contact form emails via Resend API.
  - Zod validation matching your app schema
  - RFC email validation using punycode + email-addresses + isemail
  - Resend SDK for sending emails
  - CORS handled in code (do NOT enable at Function URL to avoid duplicate headers)

  Required environment variables (configure in Lambda):
    - RESEND_API_KEY
    - RESEND_RECEIVER_EMAIL
    - ALLOWED_ORIGINS (comma-separated). If not set, no origins are allowed.
*/

import { z } from 'zod';
import { parseOneAddress } from 'email-addresses';
import { validate as isEmailValid } from 'isemail';
import { Resend } from 'resend';
import type { APIGatewayProxyResult } from 'aws-lambda';
import punycode from 'punycode/';

// Union type for both API Gateway and Lambda Function URL events
type LambdaEvent = {
  requestContext?: {
    http?: {
      method: string;
    };
  };
  httpMethod?: string;
  headers?: Record<string, string | undefined>;
  body?: string;
  isBase64Encoded?: boolean;
};

// Allowed contact categories matching the frontend
const CONTACT_CATEGORIES = ["partnerships", "sales", "recruitment", "press"] as const;

// Zod schema aligned with src/api/send-email.ts
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters.").max(100, "Name must be less than 100 characters."),
  email: z.string().email("Invalid email address.").min(1, "Email is required."),
  category: z.enum(CONTACT_CATEGORIES, { message: "Please select a valid category." }),
  company: z.string().optional(),
  message: z.string().max(1000, "Message must be under 1000 characters.").optional(),
});

function getAllowedOrigins(): string[] {
  const env = process.env.ALLOWED_ORIGINS;
  if (!env) return [];
  return env
    .split(",")
    .map(s => s.trim())
    .filter(Boolean);
}

function buildCorsHeaders(origin: string): Record<string, string> {
  const allowedOrigins = getAllowedOrigins();
  const headers: Record<string, string> = {};

  // Check if wildcard is allowed or if specific origin is in the list
  const allowAll = allowedOrigins.includes('*');
  const originAllowed = allowAll || (origin && allowedOrigins.includes(origin));

  if (originAllowed) {
    // If wildcard, use the actual origin; otherwise use the origin
    headers["Access-Control-Allow-Origin"] = allowAll ? "*" : origin;
    headers["Access-Control-Allow-Methods"] = "POST, OPTIONS";
    headers["Access-Control-Allow-Headers"] = "Content-Type, Accept, Authorization, X-Requested-With";
    if (!allowAll) {
      headers["Access-Control-Allow-Credentials"] = "true";
      headers["Vary"] = "Origin"; // avoid cache poisoning
    }
  }
  return headers;
}

function parseBody(event: LambdaEvent): Record<string, unknown> {
  if (!event || !event.body) return {};
  try {
    const raw = event.isBase64Encoded
      ? Buffer.from(event.body, "base64").toString("utf8")
      : event.body;
    return JSON.parse(raw || "{}") as Record<string, unknown>;
  } catch {
    return {};
  }
}

function errorResponse(statusCode: number, headers: Record<string, string>, payload: Record<string, unknown>): APIGatewayProxyResult {
  const baseHeaders: Record<string, string> = { "Content-Type": "application/json" };
  if (headers["Access-Control-Allow-Origin"]) baseHeaders["Vary"] = "Origin";
  return {
    statusCode,
    headers: { ...baseHeaders, ...headers },
    body: JSON.stringify(payload),
  };
}

function successResponse(headers: Record<string, string>, payload: Record<string, unknown>): APIGatewayProxyResult {
  const baseHeaders: Record<string, string> = { "Content-Type": "application/json" };
  if (headers["Access-Control-Allow-Origin"]) baseHeaders["Vary"] = "Origin";
  return {
    statusCode: 200,
    headers: { ...baseHeaders, ...headers },
    body: JSON.stringify(payload),
  };
}

// RFC-compliant validation with normalization, aligned with src/server/emailValidator.ts
function validateRFCEmail(email: string): { valid: boolean; error?: string } {
  if (!email || email.trim().length === 0) {
    return { valid: false, error: "Email is required." };
  }

  const atIndex = email.lastIndexOf("@");
  if (atIndex === -1) {
    return { valid: false, error: "Invalid email format: missing @ symbol." };
  }

  const localPart = email.substring(0, atIndex);
  const domain = email.substring(atIndex + 1);

  if (Buffer.byteLength(localPart, "utf8") > 64) {
    return { valid: false, error: "Email local part exceeds 64 octets." };
  }

  if (Buffer.byteLength(domain, "utf8") > 255) {
    return { valid: false, error: "Email domain exceeds 255 octets." };
  }

  let normalizedDomain;
  try {
    normalizedDomain = punycode.toASCII(domain);
  } catch {
    return { valid: false, error: "Invalid email domain: punycode conversion failed." };
  }

  const normalizedEmail = `${localPart}@${normalizedDomain}`;

  const parsed = parseOneAddress(normalizedEmail);
  if (!parsed) {
    return { valid: false, error: "Invalid email: RFC syntax parse failed." };
  }

  if (!isEmailValid(normalizedEmail)) {
    return { valid: false, error: "Invalid email: failed RFC compliance check." };
  }

  return { valid: true };
}

async function sendWithResend({ from, to, subject, html }: { from: string; to: string; subject: string; html: string }) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY not configured");
  }
  const resend = new Resend(apiKey);
  const result = await resend.emails.send({ from, to, subject, html });
  return result;
}

export const handler = async (event: LambdaEvent): Promise<APIGatewayProxyResult> => {
  console.log("Incoming event:", JSON.stringify(event));
  // Lambda Function URLs use requestContext.http.method, API Gateway uses httpMethod
  const method = event?.requestContext?.http?.method || event?.httpMethod || "";
  const origin = (event?.headers?.origin || event?.headers?.Origin || "").toString();
  const corsHeaders = buildCorsHeaders(origin);

  if (method === "OPTIONS") {
    // Preflight response
    const headers = {
      ...corsHeaders,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Accept, Authorization, X-Requested-With",
    };
    return { statusCode: 204, headers, body: "" };
  }

  if (method !== "POST") {
    return errorResponse(405, corsHeaders, { error: "method.not-allowed" });
  }

  try {
    const rawData = parseBody(event);

    // Zod validation (aligned with api/send-email.ts)
    const validationResult = contactSchema.safeParse(rawData);
    if (!validationResult.success) {
      const firstIssue = validationResult.error.issues[0];
      let errorCode = 'validation.failed';
      const detail = firstIssue?.message || 'Validation failed';
      if (firstIssue?.path[0] === 'email') errorCode = 'email.invalid';
      else if (firstIssue?.path[0] === 'name') errorCode = 'name.invalid';
      else if (firstIssue?.path[0] === 'message') errorCode = 'message.invalid';
      else if (firstIssue?.path[0] === 'category') errorCode = 'category.invalid';

      return errorResponse(400, corsHeaders, {
        error: errorCode,
        detail,
        message: firstIssue?.message,
      });
    }

    const data = validationResult.data;

    // Additional RFC validation (aligned with src/server/emailValidator.ts)
    const rfcValidation = validateRFCEmail(data.email);
    if (!rfcValidation.valid) {
      const detail = rfcValidation.error?.includes('RFC') ? 'syntax-parse-failed' :
                     rfcValidation.error?.includes('octets') ? 'length-limit-exceeded' :
                     rfcValidation.error?.includes('punycode') ? 'domain-normalization-failed' : 'rfc-validation-failed';
      return errorResponse(400, corsHeaders, {
        error: 'email.invalid',
        detail,
        message: rfcValidation.error,
      });
    }

    if (!process.env.RESEND_RECEIVER_EMAIL) {
      return errorResponse(500, corsHeaders, {
        error: 'server.error',
        message: 'Receiver email not configured',
      });
    }

    const html = `
      <h3>New Contact Submission</h3>
      <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
      <p><strong>Company:</strong> ${escapeHtml(data.company || 'N/A')}</p>
      <p><strong>Category:</strong> ${escapeHtml(data.category)}</p>
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(data.message || 'N/A')}</p>
    `;

    await sendWithResend({
      from: 'Your Site <onboarding@resend.dev>',
      to: process.env.RESEND_RECEIVER_EMAIL,
      subject: `Message from ${data.name}`,
      html,
    });

    return successResponse(corsHeaders, { success: true });
  } catch (err: unknown) {
    console.error('Lambda error:', err);
    const message = getErrorMessage(err) || 'Internal server error';
    return errorResponse(500, corsHeaders, {
      error: 'server.error',
      detail: 'internal-error',
      message,
    });
  }
};

// Added helper to safely extract an error message from unknowns
function getErrorMessage(err: unknown): string {
  if (err instanceof Error) return err.message;
  if (typeof err === 'string') return err;
  try {
    // Try to stringify objects (may produce useful info)
    return JSON.stringify(err);
  } catch {
    return String(err);
  }
}

function escapeHtml(str: string | undefined | null): string {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}