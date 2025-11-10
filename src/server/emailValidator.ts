import * as punycode from "punycode";
import pkg from "email-addresses";
const { parseOneAddress } = pkg;
import { validate as isEmailValid } from "isemail";

export function validateRFCEmail(email: string): { valid: boolean; error?: string } {
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

  let normalizedDomain: string;
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
