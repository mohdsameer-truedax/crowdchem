# CrowdChem Frontend

This is a **React + Vite + TailwindCSS + TypeScript** project built for the CrowdChem website.  
It contains reusable UI components, responsive layouts, and modern styling with full internationalization support.

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
