import { defineBackend } from '@aws-amplify/backend';
import { sendEmail } from './sendEmail/resource';
import { FunctionUrlAuthType } from 'aws-cdk-lib/aws-lambda';

const backend = defineBackend({
  sendEmail
});

// Add Function URL configuration to the Lambda function
const sendEmailFunction = backend.sendEmail.resources.lambda;


// Enable Function URL without CORS (CORS is handled in the handler code to avoid duplicate headers)
backend.addOutput({
  custom: {
    sendEmailFunctionUrl: sendEmailFunction.addFunctionUrl({
      authType: FunctionUrlAuthType.NONE
    }).url
  }
});
