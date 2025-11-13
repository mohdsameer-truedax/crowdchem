import { Link } from "react-router-dom";
import { useTranslation } from "../i18n/useTranslation";
import { ResponsiveImage } from "../utils/ResponsiveImage";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="px-4  md:px-8 lg:px-12 xl92r:px-16 font-deca text-white bg-background2  ">
       <div className="w-full">
         <Link to="/">
             <ResponsiveImage
                                id="logo" alt={t("alt.logo")} className="w-[10.3rem] 2xl:pb-[3.31rem] xl92r:pb-[2.75rem] lg:pb-[2.48rem] pb-[0.5rem] pt-[1rem] lg:pt-[4.21rem] xl92r:pt-[4.68rem] 2xl:pt-[5.625rem] lg:w-[27.14rem] xl92r:w-[30.155rem] 2xl:w-[36.1875rem] h-auto l" />
            </Link>
        </div>
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
          <h1  id='vision' className="text-[0.8333rem] sm:text-[1rem] md:text-[0.8333rem] lg:text-[0.9500rem] xl92r:text-[1.0417rem] 2xl:text-[1.25rem] font-normal mb-12 leading-relaxed w-[90%] sm:w-[70%] lg:leading-[1.875rem] tracking-[0.08em] text-left">
            {t("footer.description")}<br/><br/>
               <p id='contact' className="leading-relaxed text-[0.5833rem] font-light  md:text-[0.75rem] lg:text-[0.8550rem] xl92r:text-[0.9375rem] 2xl:text-[1.125rem] lg:leading-[1.875rem] tracking-[0.08em] text-left">
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
     <div className="flex w-full lg:w-1/2 flex-col md:flex-row justify-between gap-10 order-2 lg:order-2">
  {/* Crowdchem */}
  <div className="flex-1 min-w-[9.375rem]">
    <h2 className="title-font text-[0.5833rem] font-medium mb-3 md:text-[0.8333rem] lg:text-[0.9500rem] xl92r:text-[1.0417rem] 2xl:text-[1.25rem] lg:leading-[1.875rem] tracking-[0.08em]">
      {t("footer.crowdchem")}
    </h2>
    <nav
      className="list-none font-normal text-[0.6667rem] md:text-[0.6667rem] lg:text-[0.7600rem] xl92r:text-[0.8333rem] 2xl:text-[1rem] lg:leading-[1.875rem] tracking-[0.08em]"
      id="footer"
    >
      <ul>
        <li className="">
          <Link
             to="/usecases" 
            className="bg-transparent text-white hover:text-gray-300 cursor-pointer transition-colors duration-200"
            aria-label="Scroll to Case Studies section"
          >
            {t("footer.studies")}
          </Link>
          </li>
          {/* <li className="pt-3 md:pt-[1.79vh]">
           <Link
             to="/" 
            className="bg-transparent text-white hover:text-gray-300  cursor-pointer transition-colors duration-200"
            aria-label="Scroll to Case Studies section"
          >
           CROWDCHEM.NET
          </Link>
        </li> */}
      </ul>
    </nav>
  </div>

  {/* Connect */}
  <div className="flex-1 min-w-[9.375rem]">
    <h2 className="title-font font-medium font-deca text-[0.5833rem] md:text-[0.8333rem] lg:text-[0.9500rem] xl92r:text-[1.0417rem] 2xl:text-[1.25rem] lg:leading-[1.875rem] tracking-[0.08em]">
      {t("footer.connect")}
    </h2>
    <ul className="list-none text-[0.6667rem] md:text-[0.6667rem] lg:text-[0.7600rem] xl92r:text-[0.8333rem] 2xl:text-[1rem] lg:leading-[1.625rem] tracking-[0.08em]">
      <li className="pb-5 pt-2">
        <Link to="/contact" className="hover:text-gray-300 cursor-pointer">
          {t("footer.contactUs")}
        </Link>
      </li>
      <li className="pb-5">
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

      </div>

      {/* Bottom Bar */}
      <p className="text-white text-sm text-center border-gray-700 pt-[1rem] lg:pt-[5.15rem] xl92r:pt-[5.72rem] 2xl:pt-[6.875rem]  pb-2">
        {t("footer.copyright")}
      </p>
    </footer>
  );
};

export default Footer;
