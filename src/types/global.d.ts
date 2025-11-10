export {}; // ensures this file is treated as a module

declare global {
  interface Window {
    /**
     * Google Tag Manager data layer.
     */
    dataLayer: unknown[];
    /**
     * Global gtag function for Google Analytics 4.
     */
    gtag?: (...args: (string | number | boolean | object | Date | undefined)[]) => void;
  }
}
