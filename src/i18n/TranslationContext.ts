// src/i18n/TranslationContext.ts
import { createContext, useContext } from "react";
import type { Language } from "./translations";

export interface TranslationContextType {
  t: (key: string) => string;
  language: Language;
  code: string;
  setLanguage: (lang: Language) => void;
  availableLanguages: { lang: string; code: string }[];
}

export const TranslationContext = createContext<TranslationContextType>({
  t: (key) => key,
  language: "English",
  code: "English",
  setLanguage: () => {},
  availableLanguages: [],
});

export const useTranslation = () => useContext(TranslationContext);
