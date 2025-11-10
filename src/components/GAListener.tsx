// src/components/GAListener.tsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Analytics } from "../utils/AnalyticsWrapper";

export const GAListener = () => {
  const location = useLocation();

  useEffect(() => {
    Analytics.pageview(location.pathname);
  }, [location]);

  return null;
};
