import { useEffect } from "react";
import { useTranslation } from "../../i18n/useTranslation";
import { logEvent } from "../../utils/telemetry";

const ServerError = () => {
  const { t } = useTranslation();

  useEffect(() => {
    logEvent("ErrorPageViewed", { statusCode: 500 });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-800 text-white px-6">
      <h1 className="text-5xl font-bold mb-4">{t("errors.title_500")}</h1>
      <p className="text-lg mb-8 text-gray-200 text-center">
        {t("errors.message_500")}
      </p>
      <a href="/contact" className="underline text-blue-300 hover:text-blue-100">
        {t("errors.contact_link")}
      </a>
    </div>
  );
};

export default ServerError;
