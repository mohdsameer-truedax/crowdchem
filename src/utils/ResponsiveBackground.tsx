import { useLocation } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";

interface ResponsiveBackgroundProps {
  /** unique key like "hero-bg" or "section1-bg" */
  id: string;
  className?: string;
  children?: React.ReactNode;
}

/**
 * Responsive, route-aware background image component.
 * - Works with images in src/assets/
 * - Uses Vite’s import.meta.glob to resolve URLs dynamically
 */
export const ResponsiveBackground = ({
  id,
  className = "",
  children,
}: ResponsiveBackgroundProps) => {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Watch for viewport changes
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Normalize route path → folder name
  const path =
    location.pathname === "/" ? "home" : location.pathname.split("/")[1] || "home";

  // Dynamically import all image files from src/assets
  const images = useMemo(
    () =>
      import.meta.glob("/src/assets/**/*.{avif,webp,jpg,jpeg,png}", {
        eager: true,
        import: "default",
      }) as Record<string, string>,
    []
  );

  // Target filename based on route + viewport
  const target = `${id}-${isMobile ? "mobile" : "desktop"}`;

  // Find image matching this route and ID
  const backgroundUrl = Object.entries(images).find(([key]) =>
    key.includes(`/assets/images/${path}/`) && key.includes(target)
  )?.[1];

  return (
    <div
      className={`bg-no-repeat bg-cover bg-center ${className}`}
      style={{
        backgroundImage: backgroundUrl ? `url(${backgroundUrl})` : "none",
      }}
    >
      {children}
    </div>
  );
};
