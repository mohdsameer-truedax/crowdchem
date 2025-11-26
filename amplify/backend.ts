import { defineBackend } from '@aws-amplify/backend';
import { sendEmail } from './sendEmail/resource';
import { FunctionUrlAuthType, HttpMethod } from 'aws-cdk-lib/aws-lambda';

const backend = defineBackend({
  sendEmail
});

// Add Function URL configuration to the Lambda function
const sendEmailFunction = backend.sendEmail.resources.lambda;

// Enable Function URL with CORS (OPTIONS is handled automatically by AWS)
backend.addOutput({
  custom: {
    sendEmailFunctionUrl: sendEmailFunction.addFunctionUrl({
      authType: FunctionUrlAuthType.NONE,
      cors: {
        allowedOrigins: ['https://main.d3ovp08c30y2h1.amplifyapp.com', 'http://localhost:5173'],
        allowedMethods: [HttpMethod.POST],
        allowedHeaders: ['Content-Type', 'Accept', 'Authorization', 'X-Requested-With'],
        allowCredentials: true,
      }
    }).url
  }
});
