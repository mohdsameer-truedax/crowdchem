import type { ViteDevServer } from 'vite';
import { sendEmail } from '../email_api/EmailHandler';
import { contactSchema } from '../pages/Contact/schema/FormSchema';
import { validateRFCEmail } from './emailValidator';
import { ZodError } from 'zod';

export function configureAPIServer(server: ViteDevServer) {
  // Email endpoint with server-side validation
  server.middlewares.use('/api/send-email', async (req, res) => {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
      res.statusCode = 204;
      res.end();
      return;
    }

    if (req.method === 'POST') {
      res.setHeader('Content-Type', 'application/json');
      
      try {
        // Parse query parameters
        const url = new URL(req.url || '', `http://${req.headers.host}`);
        const rawData = {
          name: url.searchParams.get('name') || '',
          email: url.searchParams.get('email') || '',
          company: url.searchParams.get('company') || '',
          category: url.searchParams.get('category') || 'partnerships',
          message: url.searchParams.get('message') || ''
        };
        
        // Server-side validation with Zod schema
        const validationResult = contactSchema.safeParse(rawData);
        
        if (!validationResult.success) {
          const zodError = validationResult.error as ZodError;
          const firstIssue = zodError.issues[0];
          
          let errorCode = 'validation.failed';
          const detail = firstIssue?.message || 'Validation failed';
          
          if (firstIssue?.path[0] === 'email') {
            errorCode = 'email.invalid';
          } else if (firstIssue?.path[0] === 'name') {
            errorCode = 'name.invalid';
          } else if (firstIssue?.path[0] === 'message') {
            errorCode = 'message.invalid';
          }
          
          res.statusCode = 400;
          res.end(JSON.stringify({ 
            error: errorCode,
            detail,
            message: firstIssue?.message
          }));
          return;
        }
        
        // Additional RFC email validation (server-side only)
        const rfcValidation = validateRFCEmail(validationResult.data.email);
        if (!rfcValidation.valid) {
          res.statusCode = 400;
          res.end(JSON.stringify({ 
            error: 'email.invalid',
            detail: rfcValidation.error?.includes('RFC') ? 'syntax-parse-failed' : 
                    rfcValidation.error?.includes('octets') ? 'length-limit-exceeded' :
                    rfcValidation.error?.includes('punycode') ? 'domain-normalization-failed' : 'rfc-validation-failed',
            message: rfcValidation.error
          }));
          return;
        }
        
        // Send email with validated data
        const result = await sendEmail(validationResult.data);
        
        if (result.success) {
          res.statusCode = 200;
          res.end(JSON.stringify({ success: true }));
        } else {
          res.statusCode = 500;
          res.end(JSON.stringify({ 
            error: 'email.send-failed',
            detail: 'server-error',
            message: 'Failed to send email'
          }));
        }
      } catch (error) {
        console.error('❌ Server error:', error);
        res.statusCode = 500;
        res.end(JSON.stringify({ 
          error: 'server.error',
          detail: 'internal-error',
          message: 'Internal server error'
        }));
      }
    } else {
      res.statusCode = 405;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ 
        error: 'method.not-allowed',
        detail: 'use-get',
        message: 'Method Not Allowed' 
      }));
    }
  });

  console.log('✅ API server configured on port 5173');
}