import { defineFunction } from "@aws-amplify/backend";

export const sendEmail = defineFunction({
  name: "sendEmail",
  entry: "./handler.ts",
  environment: {
    RESEND_API_KEY: process.env.RESEND_API_KEY!,
    RESEND_RECEIVER_EMAIL: process.env.RESEND_RECEIVER_EMAIL!,
    ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS!,
  }
});