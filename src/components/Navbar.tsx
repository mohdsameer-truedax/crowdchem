import { useState, useEffect } from "react";
import { FiMenu, FiSearch, FiX } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "../i18n/useTranslation";
// import TranslationPage from "../i18n/TranslationPage";
import { ResponsiveImage } from "../utils/ResponsiveImage";
import SearchModal from "./SearchModal";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const { t, code } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    let lastScroll = 0;
    let hideTimer: NodeJS.Timeout;

    const handleScroll = () => {
      const currentScroll = window.scrollY;
      
      if (currentScroll <= 50) {
        setIsVisible(true);
      } else if (currentScroll > lastScroll) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
        clearTimeout(hideTimer);
        hideTimer = setTimeout(() => {
          if (window.scrollY > 50 && !isHovering) {
            setIsVisible(false);
          }
        }, 2000);
      }
      
      lastScroll = currentScroll;
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(hideTimer);
    };
  }, [isHovering]);

  // Derive current language (3-letter) from query param or fallback to context code
  const params = new URLSearchParams(location.search);
  const qLang = params.get("lang");
  const currentLang3 = (qLang || code || "English").toLowerCase().slice(0, 3);


  // Build route with ?lang preserved/updated (skip for English)
  const buildRoute = (path: string) => {
    const cleanedPath = path.replace(/^\/+/, "");
    const base = `/${cleanedPath}`.replace(/\/+/g, "/");
    
    // Don't add lang param for English
    if (currentLang3 === 'eng' || currentLang3 === 'en') {
      return base;
    }
    
    const next = new URLSearchParams(location.search);
    next.set("lang", currentLang3);
    const qs = next.toString();
    return qs ? `${base}?${qs}` : base;
  };


  return (
    <>
    <div 
      className="fixed top-0 left-0 w-full h-20 z-[100]"
      onMouseEnter={() => {
        setIsHovering(true);
        setIsVisible(true);
      }}
      onMouseLeave={() => setIsHovering(false)}
    />
    <nav 
      onMouseEnter={() => {
        setIsHovering(true);
        setIsVisible(true);
      }}
      onMouseLeave={() => setIsHovering(false)}
      // use isVisible to control transform/opacity (so the variable is read)
      className={`text-white shadow-md px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 fixed z-9999 py-0 sm:py-0 flex flex-col justify-between h-[3.93rem] md:h-[6.875rem] xl:h-[6.875rem] 2xl:h-[7.8125rem] w-full bg-background1 transition-transform duration-300 ease-in-out ${
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      {/* Top section: Logo and main nav */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center">
          <Link to={buildRoute("")}>
          <ResponsiveImage
                    id="logo"
              alt={t("alt.logo")}
              className="h-[2rem] w-[5.9375rem] sm:h-20 sm:w-60 lg:h-auto lg:w-[20rem]  xl:w-[21.25rem] desktop:w-[22.75rem] transition-all duration-200"
            />
          </Link>
        </div>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center space-x-6 xl:space-x-8 text-[0.75rem] md:text-[1.1667rem] lg:text-[1.3300rem] xl:text-[1.4583rem] 2xl:text-[1.75rem] leading-[100%] font-deca">
          <Link
            to={buildRoute("usecases")}
            className="hover:text-gray-300 transition-colors duration-200"
          >
            {t("nav.useCases")}
          </Link>
          <Link
            to={buildRoute("contact")}
            className="hover:text-gray-300 transition-colors duration-200"
          >
            {t("nav.contact")}
          </Link>
          <button onClick={() => setIsSearchOpen(true)} aria-label="Search" className="hover:text-yellow-800">
            <FiSearch className="w-[1.1875rem] h-[1.1875rem] xl:w-8 xl:h-8 cursor-pointer text-yellow-600 hover:text-yellow-800 transition-colors duration-200" />
          </button>
        </div>

        {/* Mobile section */}
        <div className="flex md:hidden flex items-center space-x-4 sm:space-x-6">
          <button onClick={() => setIsSearchOpen(true)} aria-label="Search" className="hover:text-yellow-800">
            <FiSearch className="w-5 h-5 sm:w-[31px] sm:h-[36px] text-yellow-600 cursor-pointer hover:text-yellow-800 transition-colors duration-200" />
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            className="p-1 hover:bg-white/10 rounded transition-colors duration-200"
          >
            {isOpen ? (
              <FiX className="w-6 h-6 sm:w-7 sm:h-7" />
            ) : (
              <FiMenu className="w-6 h-6 sm:w-7 sm:h-7" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="absolute z-50 top-full left-0 w-full bg-white shadow-lg flex flex-col items-center py-4 lg:hidden border-t border-gray-200">
          <Link
            to={buildRoute("usecases")}
            className="w-full text-center py-3 text-lg font-medium text-background2 hover:bg-gray-50 transition-colors duration-200"
            onClick={() => setIsOpen(false)}
          >
            {t("nav.useCases")}
          </Link>
          <Link
            to={buildRoute("contact")}
            className="w-full text-center py-3 text-lg font-medium text-blue-900 hover:bg-gray-50 transition-colors duration-200"
            onClick={() => setIsOpen(false)}
          >
            {t("nav.contact")}
          </Link>
        </div>
      )}

      {/* Bottom section: Translation */}
      {/* <div className="flex justify-end mt-auto absolute bottom-2 sm:bottom-0 right-4 sm:right-6 lg:right-8 xl:right-16">
        <TranslationPage />
      </div> */}

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </nav>
    </>
  );
};

export default Navbar;
