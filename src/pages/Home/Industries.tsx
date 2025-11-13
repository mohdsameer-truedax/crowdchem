import { useTranslation } from "../../i18n/useTranslation";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";
import { ResponsiveBackground } from "../../utils/ResponsiveBackground";
import { ResponsiveImage } from "../../utils/ResponsiveImage";

const Industries = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate()
  useEffect(() => {
    if (location.state?.scrollToId) {
      const el = document.getElementById(location.state.scrollToId);
      el?.scrollIntoView({ behavior: "instant" })
    }
  }, [location]);

  return (
    <div id="industries">
      <ResponsiveBackground id="industry-bg" className="py-8 sm:py-20 text-gray-600 body-font   pb-12 bg-bottom bg-cover bg-no-repeat">
        <div className="flex items-center justify-center px-0 text-center">
          <p id='impact' className="2xl:max-w-7xl max-w-[75%] xl92r:max-w-5xl font-deca font-light text-[0.875rem] sm:text-2xl md:text-[1.2500rem] lg:text-[1.4250rem] xl92r:text-[1.5625rem] 2xl:text-[1.875rem] leading-[1.5rem] md:leading-[2.8125rem]  tracking-[0.08em] text-white">
            {t('industries.subtitle')}
          </p>
        </div>
       
       <ResponsiveImage id="industries" alt="industries"  className="w-full h-full  my-10 md:my-15"/>
       
        <div className="flex justify-center">
          <button id='explore-usecases' onClick={() => { navigate("/eng/usecases") }} className="inline-flex font-regular text-white cursor-pointer  md:text-[1.2500rem] lg:text-[1.4250rem] xl92r:text-[1.5625rem] 2xl:text-[1.875rem] md:leading-[100%]  tracking-[0.04em] items-center font-deca gap-2 border-3 border-white  py-1 sm:py-4 px-3 sm:px-6 focus:outline-none rounded-lg text-[1rem]">
            {t('industries.button')}
            <FaArrowRight />
          </button>
        </div>
    </ResponsiveBackground>
    </div>
  );
};

export default Industries;

