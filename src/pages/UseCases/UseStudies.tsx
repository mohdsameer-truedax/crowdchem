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
    <div className="pt-10 sm:pt-25 2xl:pt-30" id="useStudies">
      <section className="text-gray-600 body-font px-4 md:p-[2.86vh] pl-[1.375rem] lg:pl-[2.7rem] xl92r:pl-[3rem] 2xl:pl-[3.1265rem] pr-[2.9rem] lg:pr-[8.25rem] xl92r:pr-[9.16rem] 2xl:pr-[11rem]  pt-[2rem] lg:pt-[2.28rem] xl92r:pt-[2.5rem] 2xl:pt-[3rem] pb-[2.5rem] lg:pb-[2.81rem] xl92r:pb-[3.12rem] 2xl:pb-[3.75rem] relative bg-background3">
        <div className=" mx-auto flex flex-wrap items-center">
          <div className="w-full text-white text-left">
            <h1 className="title-font font-medium text-[1.5rem] sm:text-[1.25rem] md:text-[2.9167rem] lg:text-[3.8000rem] xl92r:text-[4.1667rem] 2xl:text-[5rem] leading-[140%] sm:leading-[4.12rem] lg:leading-[4.75rem] xl92r:leading-[5.2rem] 2xl:leading-[6.25rem] mb-1 sm:mb-[1rem] lg:mb-[2.86vh]  tracking-[0.04em] font-nunito">
              {t("useStudies.title")}
            </h1>
            <p className=" text-[0.875rem] sm:text-[1rem] md:text-[0.875rem] lg:text-[0.9975rem] xl92r:text-[1.0938rem] 2xl:text-[1.3125rem] lg:leading-[1.65rem] xl:leading-[1.81rem] 2xl:leading-[2.1875rem] tracking-[0.02em] font-deca font-normal">
              {t("useStudies.subtitle")}
              
            </p>
              <p className="max-w-[82.30vw] sm:max-w-[93.125rem] text-[0.875rem] sm:text-[1rem] md:text-[0.875rem] lg:text-[0.9975rem] xl:text-[1.0938rem] 2xl:text-[1.3125rem] lg:leading-[1.65rem] xl:leading-[1.81rem] 2xl:leading-[2.1875rem]  mt-[1rem] lg:mt-[2.86vh] tracking-[0.02em] font-deca font-normal">
              {t("useStudies.subtitle2")}
              
            </p>
              <p className="max-w-[82.30vw] sm:max-w-[93.125rem] text-[0.875rem] sm:text-[1rem] md:text-[0.875rem] lg:text-[0.9975rem] xl:text-[1.0938rem] 2xl:text-[1.3125rem] lg:leading-[1.65rem] xl:leading-[1.81rem] 2xl:leading-[2.1875rem]  mt-[1rem] lg:mt-[2.86vh] tracking-[0.02em] font-deca font-normal">
              {t("useStudies.subtitle3")}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UseStudies;