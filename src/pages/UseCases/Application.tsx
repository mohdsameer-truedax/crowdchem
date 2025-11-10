


import { useEffect, useMemo, useRef, useState } from 'react';
import { FaMinus, FaPlus } from "react-icons/fa"
import { useTranslation } from '../../i18n/useTranslation';
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useNavigate } from 'react-router-dom';
import { ResponsiveImage } from '../../utils/ResponsiveImage';
import { caseStudiesData,type CaseStudyKeyed, type CaseStudy } from '../../data/CaseStudy';
import Autotmotive from './usecase-pages/Automotive';
import AdvancedMaterials from './usecase-pages/AdvancedMaterials';
import Cosmetics from './usecase-pages/Cosmetics';

const Application = () => {
  const { t } = useTranslation();
  const casestudy: CaseStudy[] = useMemo(() => caseStudiesData.map((study: CaseStudyKeyed) => ({
    index: study.index,
    id: study.id,
    // Use the translation function (t) on all the keys
    title: t(study.titleKey), 
    heading: t(study.headingKey),
    subheading: t(study.subheadingKey),
    description: t(study.descriptionKey),
  })), [t]);
  const navigate = useNavigate()
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);
  // const expandedRef = useRef<HTMLDivElement | null>(null);
  const caseRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handlePlusClick = (caseStudy: CaseStudy) => {
    if (selectedCase) {
      setSelectedCase(null);
      setTimeout(() => {
        setSelectedCase(caseStudy);
        navigate(`${location.pathname}${location.search}#${caseStudy.id}`, { replace: true });
        setTimeout(() => {
          const expandedContent = document.getElementById(caseStudy.id);
          if (expandedContent) {
            const elementPosition = expandedContent.getBoundingClientRect().top + window.pageYOffset;
            window.scrollTo({ top: elementPosition - 100, behavior: "smooth" });
          }
        }, 400);
      }, 350);
    } else {
      setSelectedCase(caseStudy);
      navigate(`${location.pathname}${location.search}#${caseStudy.id}`, { replace: true });
      setTimeout(() => {
        const expandedContent = document.getElementById(caseStudy.id);
        if (expandedContent) {
          const elementPosition = expandedContent.getBoundingClientRect().top + window.pageYOffset;
          window.scrollTo({ top: elementPosition - 100, behavior: "smooth" });
        }
      }, 400);
    }
  };

  const handleMinusClick = (casestudy:CaseStudy) => {
    // Close the expanded view first
    setSelectedCase(null);
    navigate(`${location.pathname}${location.search}`, { replace: true });

    // Wait for AnimatePresence exit and layout animation to complete
    setTimeout(() => {
      const applicationSection = document.getElementById(casestudy.id);
      console.log(applicationSection)
      if (applicationSection) {
        const elementPosition = applicationSection.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({ top: elementPosition - 100, behavior: "smooth" });
      }
    }, 350);
  };
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollToId) {
      const el = document.getElementById(location.state.scrollToId);
      el?.scrollIntoView({ behavior: "instant" })
    }
  }, [location]);

  useEffect(() => {
    if (location.state?.openCaseIndex) {
      const openIndex = location.state.openCaseIndex;
      const caseToOpen = casestudy.find((c) => c.index === openIndex);
      if (caseToOpen) {
        setSelectedCase(caseToOpen);
        navigate(`${location.pathname}${location.search}#${caseToOpen.id}`, { replace: true });
        setTimeout(() => {
          const targetRef = caseRefs.current[openIndex - 1];
          targetRef?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 400);
      }
    }
  }, [location, navigate, casestudy]);
  // ✅ Expand case if URL has a hash on mount
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1);
      const caseToOpen = casestudy.find(c => c.id === id);
      if (caseToOpen) {
        setSelectedCase(caseToOpen);
        setTimeout(() => {
          const index = casestudy.findIndex(c => c.id === id);
          const targetRef = caseRefs.current[index];
          targetRef?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    }
  }, [location.hash,casestudy]);
  return (
    <div id='application'>
      <section className="text-black body-font px-4 md:px-8 lg:px-16  pb-12 mt-[2rem] lg:mt-[3.75rem] xl:mt-[4.16rem] 2xl:mt-[5rem]">

        {/* Case Study Grid */}
       <section className="body-font pb-12">
  <div className="container mx-auto">
    {/* Two cards per row, only gap between them */}
    <div className="flex flex-wrap justify-between gap-y-8 md:gap-y-12 lg:gap-y-16">
      {casestudy.map((caseStudy, i) => {
        const isSelected = selectedCase?.index === caseStudy.index;
        return (
          <motion.div
            key={caseStudy.index}
            ref={(el) => {
              caseRefs.current[i] = el;
            }}
            id={caseStudy.id}
            // two per row, no gap on outer sides, only between them
            className={`p-0 ${
              isSelected ? 'w-full' : 'w-full md:w-[49%] max-w-[30.54rem] lg:max-w-[34.35rem] 2xl:max-w-[45.8125rem] h-auto lg:max-h-[35.25rem]  2xl:max-h-[47.0rem]'
            }`}
            layout
          >
            <motion.div
              className={`relative rounded-[2.9375rem] ${isSelected ? 'p-0' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: caseStudy.index * 0.05 }}
            >
              {/* Image (collapsed state) */}
              {selectedCase?.id !== caseStudy.id && (
                <div className="relative group max-w-[30.54rem] lg:max-w-[34.35rem] 2xl:max-w-[45.8125rem]
    h-auto lg:max-h-[35.25rem]  2xl:max-h-[47.0rem] overflow-hidden rounded-2xl lg:rounded-[2.9375rem] transition-all duration-500">
                  <ResponsiveImage
                    id={caseStudy.id}
                    alt={t("alt.applicationImage")}
                    className="object-center w-full h-full transition-all duration-500 group-hover:blur-sm group-hover:scale-105"
                  />

                  {/* Overlay Title */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <h3 className="text-white text-2xl font-deca font-medium text-center px-4">
                      {`${caseStudy.title}`
                        .split(' ')
                        .map((word, i) => (
                        <span
  key={i}
  className="block
    text-[2.25rem]
    sm:text-[2.25rem]
    md:text-[2.25rem]
    lg:text-[2.565rem]
    xl:text-[2.8125rem]
    2xl:text-[3.375rem]
    tracking-[0.08em] leading-tight sm:leading-snug md:leading-normal lg:leading-relaxed xl:leading-[3.5rem] 2xl:leading-[4.0625rem]"
>
  {word}
</span>
                        ))}
                    </h3>
                  </div>
                </div>
              )}

              {/* Plus / Minus Button */}
                <button
                onClick={() =>
                  isSelected ? handleMinusClick(caseStudy) : handlePlusClick(caseStudy)
                }
                className={`absolute cursor-pointer ${
                  isSelected
                    ? 'w-14 h-14 md:w-20 md:h-20 lg:w-[7.4375rem] lg:h-[7.4375rem] text-gray-700 bg-white lg:text-background4 lg:bg-white'
                    : 'w-20 h-20  md:h-[7.12rem] lg:h-[8rem] xl:h-[8.90rem] 2xl:w-[10.6875rem] md:w-[7.12rem] lg:w-[8rem] xl:w-[8.90rem] 2xl:h-[10.6875rem] text-white bg-background4'
                }  rounded-full flex items-center justify-center  transition-colors bottom-12 right-12 z-0`}
                >
                {isSelected ? (
                  <FaMinus className="w-6 h-6 lg:w-10 lg:h-10" />
                ) : (
                  <FaPlus className="w-12 h-12 lg:w-[3.125rem] lg:h-auto" />
              )}
              </button>

              {/* Expanded Overlay Content */}
              <AnimatePresence>
                {isSelected && (
                 <motion.div
  id={caseStudy.id}
  className="w-full h-full rounded-[3.3125rem] z-0 pb-10 px-6 lg:px-8 pt-6 bg-[#D9D9D9]/95"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  transition={{ duration: 0.3 }}
>
                 {caseStudy.id === "automotive" &&   <Autotmotive caseStudy={caseStudy} onClose={handleMinusClick}/>}
                          {caseStudy.id === "advancedmaterials" &&   <AdvancedMaterials caseStudy={caseStudy} onClose={handleMinusClick}/>}
                                {caseStudy.id === "cosmetics" &&   <Cosmetics caseStudy={caseStudy} onClose={handleMinusClick}/>}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  </div>
</section>

      </section>
    </div>
  );
};

export default Application;