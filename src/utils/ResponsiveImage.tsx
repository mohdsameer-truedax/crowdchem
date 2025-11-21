import { useLocation } from "react-router-dom";
import { useMemo } from "react";
import { useTranslation } from "../i18n/TranslationContext";

interface ResponsiveImageProps {
  /** image identifier (e.g. "hero1", "feature1") */
  id: string;
  alt: string;
  className?: string;
  /** If true, will look for language-specific images (e.g., automotive1j for Japanese) */
  languageSpecific?: boolean;
}

/**
 * Responsive, route-aware image loader.
 * - Loads from src/assets/[route]/[id]-desktop.webp or -mobile.webp
 * - Uses Vite's import.meta.glob for automatic path resolution
 * - Supports language-specific images when languageSpecific prop is true
 */
export const ResponsiveImage = ({ id, alt, className, languageSpecific = false }: ResponsiveImageProps) => {
  const location = useLocation();
  const { code } = useTranslation();

  // Normalize route → folder name
  const path = location.pathname === "/" ? "home" : location.pathname.split("/")[1] || "home";

  // Get language suffix based on the current language code
  const getLanguageSuffix = () => {
    if (!languageSpecific) return "";

    const languageMap: Record<string, string> = {
      "Japanese": "j",
      "French": "f",
      "Deutsch": "d",
      "Spanish": "s",
      "English": ""
    };

    return languageMap[code] || "";
  };

  const languageSuffix = getLanguageSuffix();
  const finalId = languageSpecific && languageSuffix ? `${id}${languageSuffix}` : id;

  // Import all images from src/assets (Vite will bundle and hash them)
  const images = useMemo(
    () =>
      import.meta.glob("/src/assets/**/*.{avif,webp,png,jpg,jpeg}", {
        eager: true,
        import: "default",
      }) as Record<string, string>,
    []
  );

  // Resolve file paths for mobile and desktop variants
  const desktopSrc = Object.entries(images).find(([key]) =>
    key.includes(`/assets/images/${path}/`) && key.includes(`${finalId}-desktop`)
  )?.[1] ||
    // fallback: shared
    Object.entries(images).find(([key]) =>
      key.includes(`/assets/images/shared/`) && key.includes(`${finalId}-desktop`)
    )?.[1];

  const mobileSrc = Object.entries(images).find(([key]) =>
    key.includes(`/assets/images/${path}/`) && key.includes(`${finalId}-mobile`)
  )?.[1] ||
    Object.entries(images).find(([key]) =>
      key.includes(`/assets/images/shared/`) && key.includes(`${finalId}-mobile`)
    )?.[1];

  // Fallback if desktop version missing
  const src = desktopSrc || mobileSrc;
  if (!src) {
    console.warn(`ResponsiveImage: missing image for ${path}/${finalId}`);
    return null;
  }

  return (
    <picture>
      {mobileSrc && <source srcSet={mobileSrc} media="(max-width: 768px)" />}
      <img
        src={src}
        alt={alt}
        className={className}
        loading="lazy"
        decoding="async"
      />
    </picture>
  );
};
