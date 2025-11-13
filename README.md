# CrowdChem

A full-stack application with a **React + Vite + TailwindCSS + TypeScript** frontend and an **AWS Lambda** backend for email functionality.  
The frontend contains reusable UI components, responsive layouts, and modern styling with full internationalization support.

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/truedaxio/crowdchem
cd crowdchem
```

### Install Dependencies

```bash
npm install
```

### Start the Development Server

```bash
npm run dev
```

## Environment Configuration

The project uses environment-specific configuration files:

- `.env.dev` - Development environment (localhost)
- `.env.test` - Test environment
- `.env.prod` - Production environment

### Environment Variables

```bash
VITE_BASE_URL           # Base URL of the application
VITE_GA_MEASUREMENT_ID  # Google Analytics ID
RESEND_API_KEY     # Resend API key for emails
VITE_API_URL            # API endpoint URL
VITE_ASSET_SERVER_URL   # Asset server URL
PORT                    # Development server port
```

### Running Different Environments

```bash
# Development (uses .env.dev)
npm run dev

# Test build (uses .env.test)
npm run build:test

# Production build (uses .env.prod)
npm run build
```

### Adding New Environment Variables

1. Add the variable to all three env files (`.env.dev`, `.env.test`, `.env.prod`)
2. Prefix with `VITE_` to expose to client-side code
3. Access in code: `import.meta.env.VITE_YOUR_VARIABLE`

## Backend - Email Service (AWS Lambda)

The backend uses an AWS Lambda function to handle email sending via Resend API.

### Prerequisites

- AWS account with permissions to create/modify Lambda functions, IAM roles, and read CloudWatch Logs
- Node.js installed locally
- Resend API key and verified sender domain

### Setup and Deployment

1. **Prepare locally**
   ```bash
   cd amplify/sendEmail
   npm install
   ```

2. **Create deployment package**
   
   PowerShell (Windows):
   ```powershell
   Remove-Item -Force sendEmail.zip -ErrorAction SilentlyContinue
   Compress-Archive -Path .\* -DestinationPath .\sendEmail.zip -Force
   ```
   
   Or manually zip all files/folders in `amplify/sendEmail` (including `node_modules`)

3. **Create Lambda function**
   - Go to AWS Console → Lambda
   - Create function → Author from scratch
   - Name: `sendEmail`
   - Runtime: Node.js 22.x
   - Architecture: x86_64
   - Permissions: Create a new role with basic Lambda permissions

4. **Configure Function URL**
   - Additional configurations → Networking tab
   - Enable Function URL
   - Auth type: NONE (public endpoint)
   - Do NOT enable CORS in Function URL settings (managed in code)

5. **Upload code**
   - In Lambda Code tab: Upload from → .zip file
   - Upload `amplify/sendEmail/sendEmail.zip`
   - Ensure Handler matches entry point (e.g., `index.handler`)

6. **Set environment variables**
   ```bash
   RESEND_API_KEY=<your_resend_api_key>
   RESEND_RECEIVER_EMAIL=<destination_email>
   ALLOWED_ORIGINS=<frontend_origins_comma_separated>
   # Example: http://localhost:5173,https://yourdomain.com
   ```
7. **Set API Gateway**
   - Go to AWS Console → API Gateway
   - Create REST API
   - Choose API name as crowdchem/sendEmail
   - Select API endpoint type as Edge-optimized
   - IP address type - IPv4
   - After creating REST API in it 
      - Create a Resource
      - Resource Path: /
      - Resource Name: sendemail
   - Select Resource sendemail the do Create method
      - Method type: POST
      - Integration type: Lambda function
      - Enable the checkbox Use Lambda Proxy integration
      - And select the Lambda function:sendEmail
      (For this we need permision to Grant API Gateway permission to invoke your Lambda function)
   - Deploy the API
      - In Actions dropdown select Deploy API
      - Deployment stage: [New Stage]
      - Stage name: prod
   - Now go to Stages section and enable Logs at section Logs and tracing by clicking the Edit button
      - Turn on CloudWatch logs by selecting Errors and info logs
   - Go to section Custom domain names
      - Add domain name
      - Domain name : api.crowdchem.ai
      - Keep it public
      - Routing mode: API mappings only
      - API endpoint type: Edge-optimized
      - IP address type: IPv4
      - Select ACM certificate

7. **Configure Resend domain**
   - Verify sending domain at https://resend.com/domains
   - DNS changes may take 1–60 minutes to propagate
   - Add domain api.crowdchem.net

8. **Update frontend configuration**
   - Copy the Lambda Function URL
   - Update `VITE_API_URL` https://api.crowdchem.net/sendemail
   - Rebuild/redeploy frontend

9. **Monitor logs**
   - Lambda → Monitor tab → View CloudWatch logs
   - Click "Start tailing" for live logs

### Notes

- CORS is managed in code; ensure `ALLOWED_ORIGINS` includes your frontend URL(s)
- Frontend `VITE_API_URL` must point exactly to the Lambda Function URL

## Internationalization (i18n)

The project supports multiple languages with automatic language file detection.

### Adding New Languages

1. Create a new file in `src/i18n/translations/` folder (e.g., `English.ts` for English)
2. Follow the existing structure from `ENglish.ts` or `Japanese.ts`
3. Export the translations as default:

```typescript
const en = {
  native:{
    lang:"English",
  },
  nav: {
    home: "Home",
    useCases: "USE CASES",
    contact: "CONTACT"
  },
  // ... other translations
};

export default en;
```

### Using Translations in Components

```typescript
import { useTranslation } from '../i18n/useTranslation';

const MyComponent = () => {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t('nav.home')}</h1>
      <img src="logo.png" alt={t('alt.logo')} />
      <input placeholder={t('form.placeholder')} />
    </div>
  );
};
```

### Translation Structure

Organize translations by feature/component:

```typescript
{
  nav: { /* Navigation items */ },
  hero: { /* Hero section */ },
  footer: { /* Footer content */ },
  alt: { /* Alt text for images */ },
  brand: { /* Brand names */ },
  form: { /* Form labels, placeholders */ }
}
```

### Language Switching

Use the language switcher in the navbar or programmatically:

```typescript
const { language, setLanguage } = useTranslation();
setLanguage('fr'); // Switch to French
```
