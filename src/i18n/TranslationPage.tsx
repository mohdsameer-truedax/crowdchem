import { useState } from "react";
import { FaGlobe, FaChevronDown } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "./useTranslation";
import { translations } from "./translations";
import type { Language } from "./constant";

const TranslationPage = () => {
  const { language, setLanguage } = useTranslation();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  // const { lang } = useParams();

  const languageOrder = ['English', '日本語', 'Deutsch', 'Français', 'Español'];
  const languages: { code: Language; label: string }[] = languageOrder
    .filter(lang => translations[lang])
    .map(lang => ({
      code: lang as Language,
      label: lang,
    }));

  const handleSelect = (newLang: Language) => {
    setLanguage(newLang);
    setOpen(false);

    const pathParts = location.pathname.split("/").filter(Boolean);
    const currentPage = pathParts[0] || "";

    const allowed = ['', 'usecases', 'contact'];
    const targetPage = allowed.includes(currentPage) ? currentPage : '';
    const base = targetPage ? `/${targetPage}` : '/';

    // Only add lang param if not English
    if (newLang.toLowerCase() === 'english') {
      navigate({ pathname: base }, { replace: true });
    } else {
      const next = new URLSearchParams(location.search);
      next.set("lang", newLang.toLowerCase().slice(0, 3));
      navigate({ pathname: base, search: `?${next.toString()}` }, { replace: true });
    }
  };


  return (
    <div className="relative inline-block">

<button
  onClick={() => setOpen(!open)}
  // Width set to 91px, Padding reduced (px-2) to save space
  className="group bg-gray-900 font-bold border border-white px-0.5 cursor-pointer w-[4.6875rem] h-[1.125rem] sm:w-[5.6875rem] sm:h-[1.8125rem] 
             hover:border-yellow-800 hover:text-gray-900 text-white sm:px-2 py-0 
             flex items-center justify-center rounded-t text-sm sm:text-base transition-all duration-200"
>
  <span className="flex items-center h-full"> {/* 💡 Add h-full here for robust sizing */}
    {/* Globe Icon */}
    <FaGlobe className="text-white w-[0.8125rem] h-[0.8125rem] sm:w-[1.0625rem] sm:h-[1.0625rem] group-hover:text-yellow-800 transition-colors mx-[0.0625rem]" />
    
    {/* Language Code & Chevron - FIX APPLIED HERE */}
    <span 
        className="group-hover:text-yellow-800 
                   border-l-2 border-gray-600 h-full px-0.5 
                   flex items-center text-[0.625rem] sm:text-[0.875rem] leading-none"
    >
      {/* If your language code is long (e.g., 'ENGLISH'), you must slice it to fit. 
          Use {language.slice(0, 2).toUpperCase()} for safe fitting. 
          I've kept {language} as you requested, but watch for overflow. */}
      {language} 
      <FaChevronDown className="w-2 h-2 ml-0.5" />
    </span>
  </span>
</button>

      {open && (
        <ul className="absolute top-full left-0 border border-white bg-background1 text-center text-white rounded-b z-10 w-[4.6875rem] sm:w-[6.25rem] max-h-60 overflow-auto shadow-lg">
          {languages.filter((l)=> l.label !== language).map((lang) => (
            <li
              key={lang.code}
              onClick={() => handleSelect(lang.code)}
              className="px-4 py-1 sm:py-2 cursor-pointer text-[0.625rem] sm:text-[0.875rem] font-nunito font-semibold hover:text-yellow-800"
            >
              {lang.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TranslationPage;
