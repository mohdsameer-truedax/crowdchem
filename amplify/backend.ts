import { defineBackend } from '@aws-amplify/backend';
import { sendEmail } from './sendEmail/resource';

defineBackend({
  sendEmail
});
