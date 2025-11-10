import { useLocation } from "react-router-dom";
import { useTranslation } from "../../i18n/useTranslation";
import { useEffect } from "react";

const UseStudies = () => {
  const { t } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollToId) {
      const el = document.getElementById(location.state.scrollToId);
      el?.scrollIntoView({ behavior: "instant" });
    }
  }, [location]);

  return (
    <div className="pt-25 2xl:pt-30" id="useStudies">
      <section className="text-gray-600 body-font px-4 md:p-8 pl-[1.375rem] lg:pl-[2.7rem] xl:pl-[3rem] 2xl:pl-[3.1265rem] pr-[2.9rem] lg:pr-[8.25rem] xl:pr-[9.16rem] 2xl:pr-[11rem]  pt-18 md:pt-12 pb-[2.5rem] lg:pb-[2.81rem] xl:pb-[3.12rem] 2xl:pb-[3.75rem] relative bg-background3">
        <div className=" mx-auto flex flex-wrap items-center">
          <div className="w-full text-white text-left">
            <h1 className="title-font font-medium text-[1.25rem] md:text-[2.9167rem] lg:text-[3.8000rem] xl:text-[4.1667rem] 2xl:text-[5rem] md:leading-[6.25rem] mb-[1rem] lg:mb-[1.54rem] xl:mb-[1.66rem] 2xl:mb-8 tracking-[0.04em] font-nunito">
              {t("useStudies.title")}
            </h1>
            <p className="leading-relaxed text-[0.875rem] sm:text-[1rem] md:text-[0.875rem] lg:text-[0.9975rem] xl:text-[1.0938rem] 2xl:text-[1.3125rem] md:leading-[2.1875rem] tracking-[0.02em] font-deca font-normal">
              {t("useStudies.subtitle")}
              <br/><br/>
            {/* </p>
              <p className="leading-relaxed max-w-[93.125rem] text-[0.875rem] sm:text-[1rem] md:text-[0.875rem] lg:text-[0.9975rem] xl:text-[1.0938rem] 2xl:text-[1.3125rem] md:leading-[2.1875rem] mt-[1rem] lg:mt-[1.54rem] xl:mt-[1.66rem] 2xl:mt-8 tracking-[0.02em] font-deca font-normal"> */}
              {t("useStudies.subtitle2")}
              <br/><br/>
            {/* </p>
              <p className="leading-relaxed max-w-[93.125rem] text-[0.875rem] sm:text-[1rem] md:text-[0.875rem] lg:text-[0.9975rem] xl:text-[1.0938rem] 2xl:text-[1.3125rem] md:leading-[2.1875rem] mt-[1rem] lg:mt-[1.54rem] xl:mt-[1.66rem] 2xl:mt-8 tracking-[0.02em] font-deca font-normal"> */}
              {t("useStudies.subtitle3")}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UseStudies;