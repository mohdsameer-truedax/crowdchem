import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { TranslationProvider } from './i18n/TranslationProvider.tsx'

window.addEventListener('unhandledrejection', (event) => {
  if (event.reason?.message?.includes('getInstalledRelatedApps')) {
    event.preventDefault();
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TranslationProvider>
      <App />
    </TranslationProvider>
  </StrictMode>,
)
