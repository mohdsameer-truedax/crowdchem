import { useEffect, useState } from "react";
import { loadGA, GA_MEASUREMENT_ID } from "../utils/Analytics";

export const AnalyticsConsent = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return; // GA disabled in this env
    if (navigator.doNotTrack === "1") return; // Respect DNT

    const consent = localStorage.getItem("analyticsConsent");
    if (!consent) setShowModal(true);
  }, []);

  const handleConsent = (granted: boolean) => {
    localStorage.setItem("analyticsConsent", granted ? "granted" : "denied");
    setShowModal(false);
    if (granted) loadGA();
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-background2 p-6 rounded-2xl shadow-lg max-w-md text-center font-deca">
        <h2 className="text-xl text-white font-semibold mb-3">
          Analytics & Privacy
        </h2>
        <p className="text-gray-200 mb-5">
          We use anonymous analytics to improve your experience. Do you consent
          to data collection?
        </p>
        <div className="flex justify-center gap-4">
          <button
            className="px-5 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white"
            onClick={() => handleConsent(true)}
          >
            Yes
          </button>
          <button
            className="px-5 py-2 rounded bg-gray-400 hover:bg-gray-500 text-black"
            onClick={() => handleConsent(false)}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};
