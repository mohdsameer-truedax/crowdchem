/**
 * Amplify Configuration
 *
 * This file manages the Amplify backend configuration, including
 * the auto-generated Lambda function URLs from amplify_outputs.json
 */

// Import amplify_outputs.json directly
// This file is auto-generated during deployment
import amplifyOutputs from '../../amplify_outputs.json';

// Export configuration
export const amplifyConfig = {
  /**
   * Lambda Function URL for sending emails
   *
   * Reads directly from amplify_outputs.json which is auto-generated
   * during Amplify deployment (both production and sandbox)
   */
  functionUrl: amplifyOutputs?.custom?.sendEmailFunctionUrl || '',
};

// Validate configuration at runtime
if (!amplifyConfig.functionUrl && import.meta.env.DEV) {
  console.error('❌ No Lambda function URL configured!');
  console.error('   Solutions:');
  console.error('   1. Deploy your backend: git push origin main');
  console.error('   2. Run local sandbox: npx ampx sandbox');
  console.error('   3. Check that amplify_outputs.json exists in project root');
}

// Log configuration in development
if (import.meta.env.DEV && amplifyConfig.functionUrl) {
  console.log('🚀 Amplify Config:', {
    functionUrl: amplifyConfig.functionUrl,
    source: 'amplify_outputs.json',
  });
}
