import { defineFunction, secret } from "@aws-amplify/backend";

export const sendEmail = defineFunction({
  name: "sendEmail",
  entry: "./handler.ts",
  environment: {
    // These will be loaded from AWS Systems Manager Parameter Store
    RESEND_API_KEY: secret('RESEND_API_KEY'),
    RESEND_RECEIVER_EMAIL: secret('RESEND_RECEIVER_EMAIL'),
    ALLOWED_ORIGINS: secret('ALLOWED_ORIGINS'),
  }
});