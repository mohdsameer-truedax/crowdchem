import { GA_MEASUREMENT_ID, loadGA } from "./Analytics";

// Initialize GA if consent already granted
if (localStorage.getItem("analyticsConsent") === "granted") {
  loadGA();
}

/**
 * A typed analytics wrapper for GA4
 */
export const Analytics = {
  /**
   * Track a page view
   */
  pageview: (url: string): void => {
    if (window.gtag && GA_MEASUREMENT_ID) {
      window.gtag("event", "page_view", { page_path: url });
    }
  },

  /**
   * Track a custom event with optional typed parameters
   */
  event: (name: string, params?: Record<string, string | number | boolean | undefined>): void => {
    if (window.gtag) {
      window.gtag("event", name, params);
    }
  },
};
