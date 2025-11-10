// src/i18n/constants.ts
export interface Module {
  native: {
    lang: string;
    code: string;
  };
  [key: string]: string | number | boolean | object | undefined; // other translation keys
}

// Import all translation files eagerly
const modules = import.meta.glob("./translations/*.ts", { eager: true }) as Record<
  string,
  { default: Module }
>;

// ✅ Build translations safely
export const translations: Record<string, Module> = Object.fromEntries(
  Object.values(modules)
    .map((mod) => mod.default)
    .filter((data) => {
      if (!data?.native?.lang || !data?.native?.code) {
        console.warn("⚠️ Skipping invalid translation file:", data);
        return false;
      }
      return true;
    })
    .map((data) => [data.native.lang, data])
);

// ✅ Build list of available languages
export const availableLanguages = Object.values(translations).map((t) => ({
  lang: t.native.lang,
  code: t.native.code,
}));

// Type alias for language names
export type Language = keyof typeof translations;
