import { useEffect } from "react";
import { useTranslation } from "../../i18n/useTranslation";
import { logEvent } from "../../utils/telemetry";

const Offline = () => {
  const { t } = useTranslation();

  useEffect(() => {
    logEvent("ErrorPageViewed", { statusCode: "offline" });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-800 text-white px-6">
      <h1 className="text-5xl font-bold mb-4">{t("errors.offline_title")}</h1>
      <p className="text-lg mb-8 text-gray-200 text-center">
        {t("errors.offline_message")}
      </p>
      <a href="/" className="underline text-blue-300 hover:text-blue-100">
        {t("errors.home_link")}
      </a>
    </div>
  );
};

export default Offline;
