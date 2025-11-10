import { useLocation } from "react-router-dom";
import { useMemo } from "react";

interface ResponsiveImageProps {
  /** image identifier (e.g. "hero1", "feature1") */
  id: string;
  alt: string;
  className?: string;
}

/**
 * Responsive, route-aware image loader.
 * - Loads from src/assets/[route]/[id]-desktop.webp or -mobile.webp
 * - Uses Vite's import.meta.glob for automatic path resolution
 */
export const ResponsiveImage = ({ id, alt, className }: ResponsiveImageProps) => {
  const location = useLocation();

  // Normalize route → folder name
  const path = location.pathname === "/" ? "home" : location.pathname.split("/")[1] || "home";

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
    key.includes(`/assets/images/${path}/`) && key.includes(`${id}-desktop`)
  )?.[1] ||
    // fallback: shared
    Object.entries(images).find(([key]) =>
      key.includes(`/assets/images/shared/`) && key.includes(`${id}-desktop`)
    )?.[1];

  const mobileSrc = Object.entries(images).find(([key]) =>
    key.includes(`/assets/images/${path}/`) && key.includes(`${id}-mobile`)
  )?.[1] ||
    Object.entries(images).find(([key]) =>
      key.includes(`/assets/images/shared/`) && key.includes(`${id}-mobile`)
    )?.[1];;

  // Fallback if desktop version missing
  const src = desktopSrc || mobileSrc;
  if (!src) {
    console.warn(`ResponsiveImage: missing image for ${path}/${id}`);
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
