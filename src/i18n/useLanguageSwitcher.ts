// import { useEffect } from "react";
import { useState } from "react";
// import { detectLanguageFromBrowser } from "./languageDetector";

// const CODE_TO_LANG: Record<string, string> = {
//   en: "English", ja: "日本語", es: "Español", de: "Deutsch", fr: "Français"
// };

const LANG_TO_CODE: Record<string, string> = {
  English: "en", "日本語": "ja", Español: "es", Deutsch: "de", Français: "fr"
};

export function useLanguageSwitcher() {
  const [detectedLang, setDetectedLang] = useState<string>("English");

  // useEffect(() => {
  //   const params = new URLSearchParams(window.location.search);
  //   const queryLang = params.get("lang");

  //   if (queryLang && CODE_TO_LANG[queryLang]) {
  //     setDetectedLang(CODE_TO_LANG[queryLang]);
  //     return;
  //   }

  //   const browserLang = detectLanguageFromBrowser();
  //   setDetectedLang(CODE_TO_LANG[browserLang]);
  // }, []);

  const switchLanguage = (langName: string) => {
    const code = LANG_TO_CODE[langName];
    if (!code) return;
    
    const url = new URL(window.location.href);
    url.searchParams.set("lang", code);
    window.history.pushState({}, "", url);
    setDetectedLang(langName);
  };

  return { detectedLang, switchLanguage };
}
