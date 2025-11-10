export function detectLanguageFromBrowser(): string {
  const browserLangs = navigator.languages || [navigator.language];
  
  for (const lang of browserLangs) {
    const code = lang.split('-')[0].toLowerCase();
    if (['en', 'ja', 'es', 'de', 'fr'].includes(code)) {
      return code;
    }
  }
  
  return "en";
}
