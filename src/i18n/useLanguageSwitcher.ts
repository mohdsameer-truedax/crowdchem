// import { useEffect } from "react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// import { detectLanguageFromBrowser } from "./languageDetector";

const CODE_TO_LANG: Record<string, string> = {
  eng: "English", jap: "日本語", esp: "Español", deu: "Deutsch", fra: "Français"
};

const LANG_TO_CODE: Record<string, string> = {
  English: "eng", "日本語": "ja", Español: "esp", Deutsch: "deu", Français: "fra"
};

export function useLanguageSwitcher() {
  const [detectedLang, setDetectedLang] = useState<string>("English");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const queryLang = params.get("lang");

    if (queryLang && CODE_TO_LANG[queryLang]) {
      const langName = CODE_TO_LANG[queryLang];
      console.log("Detected language from URL:", langName);
      setDetectedLang(langName);
    } else {
      console.log("No valid lang param, using default English");
      setDetectedLang("English");
    }
    // const browserLang = detectLanguageFromBrowser();
    // setDetectedLang(CODE_TO_LANG[browserLang]);
  }, []);

  const switchLanguage = (langName: string) => {
    console.log("switchLanguage called with:", langName);
    const code = LANG_TO_CODE[langName];
    console.log("Mapped to code:", code);

    if (!code) return;

    const pathParts = location.pathname.split("/").filter(Boolean);
    const currentPage = pathParts[0] || "";
    const allowed = ['', 'usecases', 'contact'];
    const targetPage = allowed.includes(currentPage) ? currentPage : '';
    const base = targetPage ? `/${targetPage}` : '/';

    if (langName.toLowerCase() === 'english') {
      console.log("Navigating to English (no lang param):", base);
      navigate({ pathname: base }, { replace: true });
    } else {
      const next = new URLSearchParams(location.search);
      next.set("lang", code);
      console.log("Navigating with lang param:", base, next.toString());
      navigate({ pathname: base, search: `?${next.toString()}` }, { replace: true });
    }

    setDetectedLang(langName);
  };

  return { detectedLang, switchLanguage };
}
