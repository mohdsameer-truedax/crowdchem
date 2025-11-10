// src/utils/analytics.ts
export const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || "";

// Load GA if consent granted
export const loadGA = () => {
  if (!GA_MEASUREMENT_ID) return;
  if (localStorage.getItem("analyticsConsent") !== "granted") return;
  if (document.getElementById("ga-script")) return;

  const script = document.createElement("script");
  script.id = "ga-script";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function (...args) {
      window.dataLayer.push(args);
    };

  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID, { anonymize_ip: true });
};

// Auto-load if already consented
if (GA_MEASUREMENT_ID && localStorage.getItem("analyticsConsent") === "granted") {
  loadGA();
}

/**
 * --- Typed Event Definitions ---
 */
type AnalyticsEvent =
  | { type: "page_view"; url: string }
  | { type: "contact_submit"; name?: string; email?: string }
  | { type: "news_read"; slug: string; timeSpent?: number }

export const Analytics = {
  track: (event: AnalyticsEvent) => {
    if (!window.gtag || !GA_MEASUREMENT_ID) return;

    switch (event.type) {
      case "page_view":
        window.gtag("event", "page_view", { page_path: event.url });
        break;

      case "contact_submit":
        window.gtag("event", "contact_submit", {
          event_category: "engagement",
          event_label: event.email || "unknown",
        });
        break;

      case "news_read":
        window.gtag("event", "blog_read", {
          event_category: "engagement",
          event_label: event.slug,
          value: event.timeSpent ?? 0,
        });
        break;

    }
  },
};
