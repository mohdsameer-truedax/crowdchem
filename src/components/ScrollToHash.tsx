// components/ScrollToHash.tsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToHash() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;
    const fullHash = location.hash.slice(1);
    const [anchor] = fullHash.split('?');

    let attempts = 0;
    const tryScroll = () => {
      const el = document.getElementById(anchor);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
         if (!location.pathname.endsWith("/usecases")) {
          el.classList.add("bg-yellow-600");
          setTimeout(() => el.classList.remove("bg-yellow-600"), 2500);
        }
        return true;
      }
      return false;
    };

    const interval = setInterval(() => {
      if (tryScroll() || attempts > 30) clearInterval(interval);
      attempts++;
    }, 100);

    return () => clearInterval(interval);
  }, [location]);

  return null;
}
