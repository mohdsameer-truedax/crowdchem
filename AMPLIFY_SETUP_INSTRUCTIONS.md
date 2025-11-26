# AWS Amplify Function Setup Instructions

## What I've Done ✅

1. **Created `amplify.yml`** - Build configuration for Amplify to deploy both frontend and backend
2. **Updated `Form.tsx`** - Removed old `apiUrl` variable and added `AMPLIFY_FUNCTION_URL` constant
3. **Prepared code** - Ready to use Amplify Function once deployed

## What You Need to Do Next

### Step 1: Configure AWS Credentials

Run this command to configure AWS credentials:
```bash
npx ampx configure profile
```

Follow the prompts to:
- Enter your AWS Access Key ID
- Enter your AWS Secret Access Key
- Choose your preferred AWS region (e.g., `eu-north-1`)

### Step 2: Deploy Amplify Backend

Once credentials are configured, deploy your backend:
```bash
npx ampx sandbox --once
```

**Important:** After deployment completes, you'll see output like:
```
✅ Deployment complete!
Function URL: https://abc123xyz.lambda-url.eu-north-1.on.aws/
```

**Copy this Function URL** - you'll need it in Step 4!

### Step 3: Configure Lambda Environment Variables

Go to AWS Console:
1. Navigate to: **AWS Amplify Console** → Your App → **Backend** → **Functions** → **sendEmail**
2. Click **Environment variables**
3. Add these **3 environment variables**:

| Variable Name | Value | Example |
|---------------|-------|---------|
| `RESEND_API_KEY` | Your Resend API key | `re_abc123xyz...` |
| `RESEND_RECEIVER_EMAIL` | Email where you want to receive contact form submissions | `mohdsameer@truedax.io` |
| `ALLOWED_ORIGINS` | Comma-separated list of allowed origins for CORS | `https://main.d3ovp08c30y2h1.amplifyapp.com,http://localhost:5173` |

### Step 4: Update Function URL in Code

Open [src/pages/Contact/Form.tsx](src/pages/Contact/Form.tsx) and update **line 10**:

**Replace:**
```typescript
const AMPLIFY_FUNCTION_URL = "YOUR-FUNCTION-URL-HERE";
```

**With your actual Function URL from Step 2:**
```typescript
const AMPLIFY_FUNCTION_URL = "https://abc123xyz.lambda-url.eu-north-1.on.aws/";
```

### Step 5: Commit and Deploy

```bash
git add .
git commit -m "Connect contact form to AWS Amplify Function"
git push origin main
```

AWS Amplify will automatically build and deploy your changes.

### Step 6: Test Your Contact Form

1. Visit your live site: https://main.d3ovp08c30y2h1.amplifyapp.com
2. Navigate to the Contact page
3. Fill out the form and submit
4. Check your email inbox (the one you set in `RESEND_RECEIVER_EMAIL`)
5. You should receive the contact form submission!

## Troubleshooting

### Check Lambda Logs

If emails aren't being sent, check the Lambda logs:

```bash
npx ampx sandbox logs --function sendEmail
```

Or view logs in AWS Console:
- AWS Console → CloudWatch → Log Groups → Find your `sendEmail` function logs

### Common Issues

1. **CORS errors**: Make sure `ALLOWED_ORIGINS` includes your website URL
2. **Email not sending**: Verify `RESEND_API_KEY` is correct
3. **403 Forbidden**: Check that Lambda has proper permissions

## Architecture Overview

```
Frontend (Form.tsx)
    ↓ POST request with JSON body
AWS Lambda Function (sendEmail)
    ↓ Validates with Zod schema
    ↓ RFC email validation
    ↓ Calls Resend API
Email sent to RESEND_RECEIVER_EMAIL
```

## Files Modified

- ✅ `amplify.yml` - Created build configuration
- ✅ `src/pages/Contact/Form.tsx` - Updated to use Amplify Function URL (line 10 & 114)

## Environment Variables Required in Lambda

| Variable | Purpose |
|----------|---------|
| `RESEND_API_KEY` | API key for Resend email service |
| `RESEND_RECEIVER_EMAIL` | Where to send contact form emails |
| `ALLOWED_ORIGINS` | CORS whitelist for security |

## Next Steps After Successful Deployment

Once everything works, you can optionally clean up these unused files:
- `src/server/Server.ts` - Old Vite dev middleware
- `src/api/send-email.ts` - Old Vercel function
- `src/email_api/EmailHandler.ts` - Duplicated in Lambda
- `.env` files with `VITE_API_URL` - No longer needed

But keep them for now in case you need to rollback!
