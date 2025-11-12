import { useState } from "react";
import { FaGlobe, FaChevronDown } from "react-icons/fa";
import { useTranslation } from "./useTranslation";
import { translations } from "./translations";
import type { Language } from "./constant";

const TranslationPage = () => {
  const { language, setLanguage } = useTranslation();
  const [open, setOpen] = useState(false);

  const languageOrder = ['English', '日本語', 'Deutsch', 'Français', 'Español'];
  const languages: { code: Language; label: string }[] = languageOrder
    .filter(lang => translations[lang])
    .map(lang => ({
      code: lang as Language,
      label: lang,
    }));

  const handleSelect = (newLang: Language) => {
    console.log("TranslationPage - handleSelect:", newLang);
    setLanguage(newLang);
    setOpen(false);
  };


  return (
    <div className="relative inline-block">

<button
  onClick={() => setOpen(!open)}
  // Width set to 91px, Padding reduced (px-2) to save space
  className="group bg-gray-900 font-bold border border-white cursor-pointer w-[5.6875rem] h-[1.8125rem] 
             hover:border-yellow-800 hover:text-gray-900 text-white px-2 py-0 
             flex items-center justify-center rounded-t text-sm sm:text-base transition-all duration-200"
>
  <span className="flex items-center h-full"> {/* 💡 Add h-full here for robust sizing */}
    {/* Globe Icon */}
    <FaGlobe className="text-white w-[1.0625rem] h-[1.0625rem] group-hover:text-yellow-800 transition-colors mx-[0.0625rem]" />
    
    {/* Language Code & Chevron - FIX APPLIED HERE */}
    <span 
        className="group-hover:text-yellow-800 
                   border-l-2 border-gray-600 h-full px-0 
                   flex items-center text-[0.875rem] leading-none"
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
        <ul className="absolute top-full left-0 border border-white bg-background1 text-center text-white rounded-b z-10 w-[6.25rem] max-h-60 overflow-auto shadow-lg">
          {languages.filter((l)=> l.label !== language).map((lang) => (
            <li
              key={lang.code}
              onClick={() => handleSelect(lang.code)}
              className="px-4 py-2 cursor-pointer text-[0.875rem] font-nunito font-semibold hover:text-yellow-800"
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
