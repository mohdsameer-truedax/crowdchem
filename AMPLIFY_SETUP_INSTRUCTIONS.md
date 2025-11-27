# AWS Amplify Function Setup Instructions


### Step 1: Configure AWS Credentials

Run this command to configure AWS credentials:
```bash
npx ampx configure profile
```

Follow the prompts to:
- Enter your AWS Access Key ID
- Enter your AWS Secret Access Key
- Choose your preferred AWS region (e.g., `eu-north-1`)


Run this command to configure AWS credentials:
```bash
export AWS_ACCESS_KEY_ID=""
export AWS_SECRET_ACCESS_KEY=""
export AWS_SESSION_TOKEN=""
export AWS_REGION="eu-north-1"
```

### Step 2: Configure Lambda Environment Variables

```bash
export RESEND_API_KEY=re_
export export RESEND_RECEIVER_EMAIL=xyz@truedax.io
export ALLOWED_ORIGINS="https://main.d2uotc8zdi4vjb.amplifyapp.com"
```

### Step 3: Deploy Amplify Backend

Once credentials are configured, deploy your backend:
```bash
npx ampx sandbox --once
```

**Important:** After deployment completes, you'll see output in amplify_outputs.json like:
```
"sendEmailFunctionUrl": "https://abc123xyz.lambda-url.eu-north-1.on.aws/"
```

**Copy this Function URL** - you'll need it in Step 4!

### Step 4: Configure Frontend Environment Variable

The Function URL is configured via environment variable. Update your `.env` file in the project root:

```bash
VITE_AMPLIFY_FUNCTION_URL=https://rrizrod4zz76k2i37ujasraqva0ziwaj.lambda-url.eu-north-1.on.aws/
```

**For AWS Amplify Hosting**, you also need to set this in the Amplify Console:

1. Go to AWS Amplify Console: https://console.aws.amazon.com/amplify/
2. Select your app → **Environment variables** (in the left sidebar)
3. Click **Manage variables**
4. Add environment variable:
   - **Key**: `VITE_AMPLIFY_FUNCTION_URL`
   - **Value**: `https://rrizrod4zz76k2i37ujasraqva0ziwaj.lambda-url.eu-north-1.on.aws/`
5. Click **Save**
6. Redeploy your app (or it will redeploy automatically on next push)

**Note:** The `.env` files (`.env`, `.env.dev`, `.env.prod`, `.env.test`) have all been updated with the Function URL.

### Step 5: Commit and Deploy

```bash
git add .
git commit -m "Connect contact form to AWS Amplify Function"
git push origin main
```

AWS Amplify will automatically build and deploy your changes.

### Step 6: Test Your Contact Form

1. Visit your live site: https://main.d2uotc8zdi4vjb.amplifyapp.com
2. Navigate to the Contact page
3. Fill out the form and submit
4. Check your email inbox (the one you set in `RESEND_RECEIVER_EMAIL`)
5. You should receive the contact form submission!

