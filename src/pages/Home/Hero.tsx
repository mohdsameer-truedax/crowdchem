import { FaArrowRight } from "react-icons/fa";
import { useTranslation } from "../../i18n/useTranslation";
import { useEffect } from "react";
import { ResponsiveBackground } from "../../utils/ResponsiveBackground";
import { ResponsiveImage } from "../../utils/ResponsiveImage";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const { t, code } = useTranslation();
  const navigate = useNavigate()
  useEffect(() => {
    document.title = "Home - CrowdChem";
    const meta = document.querySelector("meta[name='description']");
    if (meta)
      meta.setAttribute(
        "content",
        "Discover how CrowdChem connects innovators and organizations to collaborate on breakthrough chemistry projects."
      );
  }, []);

  return (
    <ResponsiveBackground
      id="hero-bg"
      className="min-h-[90vh] xl92r:min-h-[70vh] 2xl:min-h-[85vh] text-white bg-no-repeat bg-cover bg-center flex flex-col"
    >
      {/* Content */}
      <div className="flex-1 mt-25 sm:mt-40 xl:mt-35 flex flex-col justify-end items-start pl-6 sm:px-12 md:px-8 xl92r:px-14 2xl:pl-[4.375rem] max-w-[120rem]">
        {/* Title */}
        <h1
          id="hero"
          className="text-[1.25rem] md:text-[2.5000rem] lg:text-[2.8500rem] xl92r:text-[3.1250rem] 2xl:text-[3.75rem]  font-nunito leading-[1.875rem] md:leading-[3.125rem] lg:leading-[3.125rem] 2xl:leading-[6.25rem] mb-0.5 sm:mb-4 text-left"
        >
          {t("hero.title")}
        </h1>

        {/* Subtitle */}
        <p className="mb-3 sm:mb-8 text-[0.875rem] font-deca sm:text-lg md:text-[1.125rem] leading-[1.375rem] 2xl:leading-[1.875rem] w-[95%] xl92r:w-[80%] 2xl:w-[65%] tracking-[0.02em] sm:tracking-[0.02em] text-left">
          {t("hero.subtitle")}
        </p>

        {/* CTA */}
        <button
          id="signup"
          onClick={() => { navigate(`/contact?lang=${code || 'eng'}`); }}
          className="inline-flex items-center border-2 text-white font-deca border-white py-1 sm:py-2 px-2 sm:px-3  rounded-lg text-[0.75rem] lg:text-[1.125rem] hover:bg-background1 tracking-[0.04em] transition-colors duration-300"
        >
          <span className="font-deca">{t("hero.cta")}</span>
          <FaArrowRight className="ml-2" />
        </button>
      </div>
      <div className="w-[88%]  mx-auto md:mx-8 xl92r:mx-14 2xl:ml-[4.375rem] mt-4 sm:mt-10 mb-16 md:mb-20">
        {/* ISO Certificate */}
        <div className="flex justify-start lg:justify-end mb-4">
          <a
            href="crowdchem/cert/iso.html"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Validate CrowdChem ISO certificate on IAF CertSearch (opens in new tab)"
            onClick={() => {
              const w = window as Window & { ga?: (command: string, ...args: string[]) => void };
              if (w.ga) {
                w.ga('send', 'event', 'cert', 'click', 'iaf-cert');
              }
            }}
            className="block hover:opacity-80 transition-opacity"
          >
            <ResponsiveImage
              id="accred1"
              alt="IAF Certificate - CrowdChem"
              className="h-[2.9375rem] sm:h-[6.25rem] xl92r:h-[6.875rem] 2xl:h-[8.125rem] w-auto"
            />
          </a>
        </div>

        <section className="text-gray-600 body-font">

        </section>

        {/* Partner Logos */}

        <div className="bg-white rounded-lg shadow-lg">
          {/* <div className="flex flex-col justify-center ">
            <h2 className="text-background2 font-semibold  text-[0.583rem] lg:text-[0.656rem]  xl:text-[0.729rem] 2xl:text-[0.875rem] font-nunito mb-0">
              {t("hero.partners")}
            </h2>
            <div className="flex justify-end lg:justify-around">
              <ResponsiveImage
                id="jetro"
                alt={t("alt.partnerLogo")}
                className=""
              />
            </div>
          </div>

          <div className="flex items-center  justify-center">
            <ResponsiveImage
              id="incubator"
              alt={t("alt.partnerLogo")}
              className=""
            />
          </div>
          <div className="flex items-center justify-start  lg:justify-center">
            <ResponsiveImage
              id="deck"
              alt={t("alt.partnerLogo")}
              className=""
            />
          </div>
          <div className="flex items-center justify-end lg:justify-center">
            <ResponsiveImage
              id="creative"
              alt={t("alt.partnerLogo")}
              className=""
            />
          </div>
          <div className="flex items-center justify-center">
            <ResponsiveImage
              id="austin"
              alt={t("alt.partnerLogo")}
              className=""
            />
          </div>
          <div className="flex items-center justify-start lg:justify-center">
            <ResponsiveImage
              id="ranch"
              alt={t("alt.partnerLogo")}
              className=""
            />
          </div> */}
            <ResponsiveImage
              id="partners"
              alt={t("alt.partnerLogo")}
              className=""
            />
        </div>


      </div>
    </ResponsiveBackground>
  );
};

export default Hero;
