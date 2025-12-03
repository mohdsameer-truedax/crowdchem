# ✅ Direct Import from amplify_outputs.json

## What's Configured

Your code now **directly imports** `amplify_outputs.json` - exactly as you requested!

### How It Works:

```typescript
// src/config/amplify.ts
import amplifyOutputs from '../../amplify_outputs.json';

export const amplifyConfig = {
  functionUrl: amplifyOutputs?.custom?.sendEmailFunctionUrl || '',
};
```

No environment variables needed - it reads straight from the JSON file!

---

## 📁 Files Updated

### 1. `src/config/amplify.ts`
```typescript
import amplifyOutputs from '../../amplify_outputs.json';

export const amplifyConfig = {
  functionUrl: amplifyOutputs?.custom?.sendEmailFunctionUrl || '',
};
```

### 2. `src/vite-env.d.ts`
```typescript
declare module '*/amplify_outputs.json' {
  interface AmplifyOutputs {
    custom?: {
      sendEmailFunctionUrl?: string;
    };
  }
  const value: AmplifyOutputs;
  export default value;
}
```

### 3. `amplify.yml`
```yaml
version: 1
backend:
  phases:
    build:
      commands:
        - npm ci --cache .npm --prefer-offline
        - npx ampx pipeline-deploy --branch $AWS_BRANCH --app-id $AWS_APP_ID
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
        - npm install --prefix amplify
        # Verify amplify_outputs.json exists
        - echo "Checking amplify_outputs.json..."
        - cat amplify_outputs.json
    build:
      commands:
        - npm run build
```

### 4. `amplify_outputs.json` (Already exists)
```json
{
  "custom": {
    "sendEmailFunctionUrl": ""
  }
}
```

This temporary file ensures the build works. It will be **overwritten** automatically during deployment.

---

## 🚀 How It Works

### Production Deployment:

```text
1. git push origin main
   ↓
2. Amplify Console - BACKEND BUILD:
   - npm ci
   - npx ampx pipeline-deploy
   - Creates Lambda function
   - OVERWRITES amplify_outputs.json:
     {
       "custom": {
         "sendEmailFunctionUrl": "https://prod-url.lambda-url.eu-north-1.on.aws/"
       }
     }
   ↓
3. Amplify Console - FRONTEND BUILD:
   - Verifies amplify_outputs.json exists
   - npm run build
   - Vite imports amplify_outputs.json
   - Bundles with the function URL
   ↓
4. Deploy to CDN
   ↓
5. DONE! ✅
```

### Local Development:

```text
1. npx ampx sandbox
   ↓
2. Sandbox creates temporary Lambda
   ↓
3. Sandbox OVERWRITES amplify_outputs.json locally:
   {
     "custom": {
       "sendEmailFunctionUrl": "https://sandbox-url.lambda-url.eu-north-1.on.aws/"
     }
   }
   ↓
4. npm run dev
   ↓
5. Vite imports amplify_outputs.json
   ↓
6. Your app uses the sandbox function URL
   ↓
7. DONE! ✅
```

---

## 🎯 Key Points

### ✅ What's Good:

1. **Direct import** - Exactly as you wanted
2. **Auto-generated** - Backend creates the file automatically
3. **Type-safe** - TypeScript knows the structure
4. **No env vars needed** - Reads straight from JSON
5. **Works everywhere** - Production and local dev

### ⚠️ Important Notes:

1. **Don't edit `amplify_outputs.json` manually** - It's overwritten on every deployment
2. **File must exist** - The temporary empty one prevents build errors
3. **Backend runs first** - `amplify.yml` ensures proper order
4. **Gitignored** - The real file with URLs shouldn't be committed (already in .gitignore)

---

## 📋 Deployment Checklist

### ✅ Already Done:

- [x] `src/config/amplify.ts` imports from JSON
- [x] TypeScript types added
- [x] `amplify.yml` configured for backend-first build
- [x] Temporary `amplify_outputs.json` created
- [x] `.gitignore` includes `amplify_outputs.json`

### 🔧 One-Time Setup (Still Needed):

- [ ] **AWS Parameter Store** - Create 3 secrets:
  1. Go to: https://eu-north-1.console.aws.amazon.com/systems-manager/parameters/
  2. Create `/amplify/RESEND_API_KEY` (SecureString)
  3. Create `/amplify/RESEND_RECEIVER_EMAIL` (String)
  4. Create `/amplify/ALLOWED_ORIGINS` (String)

- [ ] **Amplify Console** - Connect repository:
  1. Go to: https://console.aws.amazon.com/amplify/
  2. New app → Host web app → GitHub
  3. Select repository and main branch
  4. Save and deploy

### 🚀 Deploy:

```bash
git add .
git commit -m "Direct import from amplify_outputs.json"
git push origin main
```

---

## 💻 Local Development

### Quick Start:

```bash
# Terminal 1: Start backend sandbox
npx ampx sandbox

# This will:
# 1. Create temporary Lambda in AWS
# 2. Overwrite amplify_outputs.json with real URL
# 3. Keep running and watch for changes

# Terminal 2: Start frontend
npm run dev

# Your app automatically reads from amplify_outputs.json!
```

### What `amplify_outputs.json` Looks Like After Sandbox:

```json
{
  "custom": {
    "sendEmailFunctionUrl": "https://abc123xyz456.lambda-url.eu-north-1.on.aws/"
  },
  "version": "1.1"
}
```

The sandbox URL is different from production - that's normal and expected!

---

## 🔍 Verify It's Working

### Check The Import:

**File: `src/config/amplify.ts`**
```typescript
import amplifyOutputs from '../../amplify_outputs.json';  // ✅ Direct import
console.log(amplifyOutputs);  // Should show the JSON content
```

### Check Browser Console (Dev Mode):

```javascript
🚀 Amplify Config: {
  functionUrl: "https://xxxxx.lambda-url.eu-north-1.on.aws/",
  source: "amplify_outputs.json"
}
```

### Check Build Logs (Amplify Console):

**Backend Phase:**
```
✓ Backend built successfully
✓ Generated amplify_outputs.json
   sendEmailFunctionUrl: https://xxxxx.lambda-url.eu-north-1.on.aws/
```

**Frontend Phase:**
```
Checking amplify_outputs.json...
{
  "custom": {
    "sendEmailFunctionUrl": "https://xxxxx.lambda-url.eu-north-1.on.aws/"
  }
}
✓ Frontend built successfully
```

---

## 🛠️ Troubleshooting

### Build Error: "Cannot find module '../../amplify_outputs.json'"

**Cause:** The file doesn't exist in the build environment

**Solution:**
1. Make sure `amplify_outputs.json` exists in project root
2. Check that backend phase runs first in `amplify.yml`
3. Verify backend build completes successfully

**Quick fix:**
```bash
# Ensure the temporary file exists
echo '{"custom":{"sendEmailFunctionUrl":""}}' > amplify_outputs.json
git add amplify_outputs.json
git commit -m "Add amplify_outputs.json placeholder"
git push
```

### Empty Function URL

**Cause:** Backend didn't generate the URL yet

**Check:**
```bash
# Look at amplify_outputs.json content
cat amplify_outputs.json
```

**Should show:**
```json
{
  "custom": {
    "sendEmailFunctionUrl": "https://xxxxx.lambda-url.eu-north-1.on.aws/"
  }
}
```

**If empty:**
- Check backend build logs in Amplify Console
- Verify `amplify/backend.ts` has `addOutput` code
- Check Parameter Store secrets are set

### TypeScript Error: "Module has no default export"

**Cause:** TypeScript types not recognized

**Solution:** Restart TypeScript server:
- VS Code: `Ctrl+Shift+P` → "TypeScript: Restart TS Server"
- Or restart your editor

---

## 📊 File Structure

```
your-project/
├── amplify_outputs.json           # ✅ Auto-generated (temp version exists)
├── amplify.yml                    # ✅ Backend-first build config
├── src/
│   ├── config/
│   │   └── amplify.ts             # ✅ Direct JSON import
│   ├── vite-env.d.ts              # ✅ TypeScript declarations
│   └── pages/
│       └── Contact/
│           └── Form.tsx           # ✅ Uses amplifyConfig.functionUrl
└── amplify/
    ├── backend.ts                 # Generates amplify_outputs.json
    └── sendEmail/
        ├── resource.ts            # Uses Parameter Store
        └── handler.ts             # Lambda function code
```

---

## 🎯 Comparison: Import vs Env Var

### Direct Import (Current Setup):

```typescript
// src/config/amplify.ts
import amplifyOutputs from '../../amplify_outputs.json';
export const amplifyConfig = {
  functionUrl: amplifyOutputs?.custom?.sendEmailFunctionUrl || '',
};
```

**Pros:**
- ✅ Direct access to JSON
- ✅ No environment variable needed
- ✅ Type-safe import
- ✅ Exactly what you wanted

**Cons:**
- ⚠️ File must exist during build
- ⚠️ Requires backend to run first

### Environment Variable (Alternative):

```typescript
// src/config/amplify.ts
export const amplifyConfig = {
  functionUrl: import.meta.env.VITE_AMPLIFY_FUNCTION_URL || '',
};
```

**Pros:**
- ✅ More flexible
- ✅ Fallback mechanisms easier

**Cons:**
- ❌ Extra step (env var management)
- ❌ Not direct JSON access

**Your choice: Direct import** ✅

---

## ✅ Summary

### What You Have Now:

```typescript
// Direct import from amplify_outputs.json
import amplifyOutputs from '../../amplify_outputs.json';

export const amplifyConfig = {
  functionUrl: amplifyOutputs?.custom?.sendEmailFunctionUrl || '',
};
```

### How It Gets Populated:

**Production:**
- Backend builds → Creates Lambda → Generates amplify_outputs.json → Frontend imports it

**Local Dev:**
- `npx ampx sandbox` → Creates temp Lambda → Generates amplify_outputs.json → `npm run dev` imports it

### Next Step:

```bash
git add .
git commit -m "Direct import from amplify_outputs.json"
git push origin main
```

Monitor the deployment in Amplify Console. The backend will generate the JSON file, and the frontend will import it directly!

---

## 📚 Reference

- **Backend setup:** [amplify/sendEmail/resource.ts](amplify/sendEmail/resource.ts)
- **Frontend config:** [src/config/amplify.ts](src/config/amplify.ts)
- **Build config:** [amplify.yml](amplify.yml)
- **Type definitions:** [src/vite-env.d.ts](src/vite-env.d.ts)

**You now have direct JSON import - exactly as requested!** 🎉
