// src/i18n/TranslationProvider.tsx
import { useState, useEffect, type ReactNode } from "react";
import { translations, availableLanguages, type Language } from "./translations";
import { TranslationContext } from "./TranslationContext";
import { useLanguageSwitcher } from "./useLanguageSwitcher";

export const TranslationProvider = ({ children }: { children: ReactNode }) => {
  const { detectedLang, switchLanguage } = useLanguageSwitcher();
  const [language, setLanguage] = useState<Language>("English");

  useEffect(() => {
    if (detectedLang && translations[detectedLang as Language]) {
      setLanguage(detectedLang as Language);
    }
  }, [detectedLang]);

  const currentTranslation = translations[language] || translations["English"];
  const currentCode = currentTranslation?.native?.code || "en";

  const handleSetLanguage = (lang: Language) => {
    switchLanguage(lang);
  };

  const t = (key: string): string => {
    const keys = key.split(".");
    let value: unknown = translations[language];

    for (const k of keys) {
      if (
        value &&
        typeof value === "object" &&
        k in value &&
        (value as Record<string, unknown>)[k] !== undefined
      ) {
        value = (value as Record<string, unknown>)[k];
      } else {
        return key;
      }
    }

    return typeof value === "string" ? value : key;
  };

  return (
    <TranslationContext.Provider
      value={{
        t,
        language,
        code: currentCode,
        setLanguage: handleSetLanguage,
        availableLanguages,
      }}
    >
      {children}
    </TranslationContext.Provider>
  );
};
