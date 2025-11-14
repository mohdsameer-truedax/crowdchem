import { Link } from "react-router-dom";
import { useTranslation } from "../i18n/useTranslation";
import { ResponsiveImage } from "../utils/ResponsiveImage";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="px-2  md:px-8 lg:px-12 xl92r:px-16 font-deca text-white bg-background2  ">
       <div className="w-full">
         <Link to="/">
             <ResponsiveImage
                                id="logo" alt={t("alt.logo")} className="w-[10.3rem] 2xl:pb-[3.31rem] xl92r:pb-[2.75rem] lg:pb-[2.48rem] pb-[0.5rem] pt-[1rem] lg:pt-[4.21rem] xl92r:pt-[4.68rem] 2xl:pt-[5.625rem] md:w-[16.92rem] lg:w-[19.52rem] xl92r:w-[21.40rem] 2xl:w-[25.6875rem] h-auto" />
            {/* <ResponsiveImage
                                id="logo" alt={t("alt.logo")} className="2xl:pb-[3.31rem] xl92r:pb-[2.75rem] lg:pb-[2.48rem] pb-[0.5rem] pt-[1rem] lg:pt-[4.21rem] xl92r:pt-[4.68rem] 2xl:pt-[5.625rem] h-[3rem] lg:h-[6.55rem] xl92r:h-[7.18rem] 2xl:h-[8.62rem] w-auto" /> */}
            </Link>
        </div>
        <div className="px-3 sm:px-0">
      <div
        className="
          flex flex-col 
          md:grid md:grid-cols-1 
          lg:flex lg:flex-row 
          md:gap-8 
          items-start  justify-between
        "
      >
        {/* Logo & About Section (Left on Desktop, Bottom on Tablet) */}
        <div className="w-full lg:w-1/2  flex flex-col md:flex-row order-1 lg:order-1">
          <h1  id='vision' className="text-[0.75rem] sm:text-[1rem] md:text-[0.8333rem] lg:text-[0.9500rem] xl92r:text-[1.0417rem] 2xl:text-[1.25rem] font-normal   w-[90%] sm:w-[70%] leading-[150%] sm:leading-[1rem] lg:leading-[1.42rem] xl92r:leading-[1.56rem] 2xl:leading-[1.875rem] tracking-[0.08em] text-left">
            {t("footer.description")}<br/><br/>
               <p id='contact' className=" text-[0.75rem] font-light  md:text-[0.75rem] lg:text-[0.8550rem] xl92r:text-[0.9375rem] 2xl:text-[1.125rem] leading-[133.33%]  sm:leading-[1rem] lg:leading-[1.42rem] xl92r:leading-[1.56rem] 2xl:leading-[1.875rem] tracking-[0.08em] text-left">
             <span className="font-medium">{t("footer.headquarters")}</span>
            <br />
            {t("footer.address1")}
            <br/>
             {t("footer.address2")}
             <br/>
              {t("footer.address3")}
            </p>
          </h1>
       
          
        </div>

        {/* Links Section (Right on Desktop, Top on Tablet) */}
     <div className="flex w-full lg:w-1/2 mt-10.5 sm:mt-0 flex-col md:flex-row justify-between gap-4 sm:gap-10 order-2 lg:order-2">
  {/* Crowdchem */}
  <div className="flex-1 min-w-[9.375rem]">
    <h2 className="title-font text-[0.75rem] font-medium mb-2 sm:mb-3 md:text-[0.8333rem] lg:text-[0.9500rem] xl92r:text-[1.0417rem] 2xl:text-[1.25rem] lg:leading-[1.875rem] tracking-[0.08em]">
      {t("footer.crowdchem")}
    </h2>
    <ul
      className="list-none font-normal text-[0.75rem] md:text-[0.6667rem] lg:text-[0.7600rem] xl92r:text-[0.8333rem] 2xl:text-[1rem] lg:leading-[1.875rem] tracking-[0.08em]"
      id="footer"
    >
        <li className="">
          <Link
             to="/usecases" 
            className="bg-transparent text-white hover:text-gray-300 cursor-pointer transition-colors duration-200"
            aria-label="Scroll to Case Studies section"
          >
            {t("footer.studies")}
          </Link>
          </li>
          {/* <li className="pt-2 sm:pt-3 md:pt-[1.79vh]">
           <Link
             to="/" 
            className="bg-transparent text-white hover:text-gray-300  cursor-pointer transition-colors duration-200"
            aria-label="Scroll to Case Studies section"
          >
           CROWDCHEM.NET
          </Link>
        </li> */}
      </ul>
  </div>

  {/* Connect */}
  <div className="flex-1 min-w-[9.375rem]">
    <h2 className="title-font font-semibold sm:font-medium font-deca mb-2 sm:mb-3 text-[0.75rem] md:text-[0.8333rem] lg:text-[0.9500rem] xl92r:text-[1.0417rem] 2xl:text-[1.25rem] lg:leading-[1.875rem] tracking-[0.08em]">
      {t("footer.connect")}
    </h2>
    <ul className="list-none font-normal text-[0.75rem] md:text-[0.6667rem] lg:text-[0.7600rem] xl92r:text-[0.8333rem] 2xl:text-[1rem] lg:leading-[1.875rem] tracking-[0.08em]">
      <li className="pb-2 sm:pb-3 md:pb-[1.79vh]">
        <Link to="/contact" className="hover:text-gray-300 cursor-pointer">
          {t("footer.contactUs")}
        </Link>
      </li>
      <li className="pb-2 sm:pb-3 md:pb-[1.79vh]">
        <a
          href="https://www.linkedin.com/company/crowdchem"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-300 cursor-pointer "
        >
          {t("footer.linkedin")}
        </a>
      </li>
      <li>
           <a
          href="https://x.com/CrowdChem"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-300 cursor-pointer "
        >
          {t("footer.careers")}
        </a>
      </li>
    </ul>
  </div>
</div>

      </div></div>

      {/* Bottom Bar */}
      <p className="text-white text-[0.6875rem] sm:text-sm text-center font-light sm:font-normal border-gray-700 pt-[1.7rem] sm:pt-[1rem] lg:pt-[5.15rem] xl92r:pt-[5.72rem] 2xl:pt-[6.875rem]  pb-2">
        {t("footer.copyright")}
      </p>
    </footer>
  );
};

export default Footer;
