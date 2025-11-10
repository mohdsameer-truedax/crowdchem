import { useEffect } from "react";
import { useTranslation } from "../../i18n/useTranslation";
import { logEvent } from "../../utils/telemetry";

const NotFound = () => {
  const { t } = useTranslation();

  useEffect(() => {
    logEvent("ErrorPageViewed", { statusCode: 404 });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-800 text-white px-6">
      <h1 className="text-5xl font-bold mb-4">{t("errors.title_404")}</h1>
      <p className="text-lg mb-8 text-gray-200 text-center">
        {t("errors.message_404")}
      </p>
      <div className="flex gap-4">
        <a href="/" className="underline text-blue-300 hover:text-blue-100">
          {t("errors.home_link")}
        </a>
        <a href="/contact" className="underline text-blue-300 hover:text-blue-100">
          {t("errors.contact_link")}
        </a>
      </div>
    </div>
  );
};

export default NotFound;
