import { defineFunction, secret } from "@aws-amplify/backend";

// Detect if running in AWS (production/staging) or locally (sandbox)
// AWS_BRANCH and AWS_APP_ID are set by Amplify Console during deployment
const isAWSDeployment = !!process.env.AWS_BRANCH || !!process.env.AWS_APP_ID;

export const sendEmail = defineFunction({
  name: "sendEmail",
  entry: "./handler.ts",
  environment: isAWSDeployment ? {
    // Production/Staging: Load secrets from AWS Systems Manager Parameter Store
    // These are secure and managed via AWS Console
    RESEND_API_KEY: secret('RESEND_API_KEY'),
    RESEND_RECEIVER_EMAIL: secret('RESEND_RECEIVER_EMAIL'),
    ALLOWED_ORIGINS: secret('ALLOWED_ORIGINS'),
  } : {
    // Local Development: Load from .env.local file
    // Create .env.local with your dev values (it's gitignored)
    RESEND_API_KEY: process.env.RESEND_API_KEY!,
    RESEND_RECEIVER_EMAIL: process.env.RESEND_RECEIVER_EMAIL!,
    ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS!,
  }
});