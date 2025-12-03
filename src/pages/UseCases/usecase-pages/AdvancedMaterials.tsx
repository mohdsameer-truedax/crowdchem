import React, { useState } from 'react';
import { type CaseStudy } from '../../../data/CaseStudy';
import { ResponsiveImage } from '../../../utils/ResponsiveImage';
import { FiX } from 'react-icons/fi';
// Import custom hooks/components for i18n
import { useTranslation } from '../../../i18n/TranslationContext'; 
import { TranslateHtml } from '../../../i18n/TranslateHtml';
import { translations } from '../../../i18n/translations';
import { FaChevronDown } from 'react-icons/fa';


const AdvancedMaterials = ({ caseStudy, onClose }: { caseStudy: CaseStudy; onClose: (caseStudy: CaseStudy) => void }) => {
  // Access the translation function
  const { t, language } = useTranslation();
   const [moreMobileButon, setMoreMobileButon] = useState(false)
  interface TableRow {
    area: string;
    process: string;
    after: string;
  }
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const currentTranslation = translations[language] as any;
  const tableData: TableRow[] = currentTranslation?.advancedMaterials?.caseStudy?.finalResults?.table?.rows || [];
  
  const tableTypes = ['triangle', 'cross', 'cross', 'cross', 'triangle', 'cross'];
  
  // Define common text styles
  const baseTextStyle = 'ml-2 text-[#000000] font-deca leading-[1.75] sm:leading-[1.608] tracking-[0.03em]';

  // Component to define the styling for the bolded text (interpolation component)
  const BoldText = <span className='font-light' />;
  
  // Helper for rendering list items with interpolation (using <1>, <2>, etc.)
  const renderInterpListItem = (keyPath: string, index: number) => (
    <li className={`text-xs sm:text-sm md:text-base lg:text-lg xl92r:text-[1.125rem] 2xl:text-[1.3125rem] font-extralight ${baseTextStyle} ml-2 sm:ml-4 mt-0 sm:mt-0.5`}>
      <TranslateHtml
        i18nKey={`advancedMaterials.caseStudy.${keyPath}.list.${index}`}
        // Pass components 1, 2, and 3 as they are all used in this case study
        components={{ 1: BoldText, 2: BoldText, 3: BoldText }} 
      />
    </li>
  );

  return (
    <div>
      {/* Main content container */}
      <div id={caseStudy.id} className="sm:flex gap-2 md:gap-4 ">
        {/* Left Column: Image */}
         <div className="relative w-full sm:w-1/2 pt-0  sm:pt-10 rounded-[2.9375rem]">
                 <ResponsiveImage
                   id={caseStudy.id}
                   alt={t('alt.applicationImage')}
                   className="w-full h-[27.25vh] sm:h-[25rem] lg:h-[64.63vh] 2xl:h-[47rem] rounded-[2.9375rem]"
                 />
                 <div className="absolute sm:hidden inset-0 flex items-center rounded-[2.9375rem] justify-center bg-black/40 opacity-100 transition-all duration-500">
                           <h3 className="text-white text-[1.125rem] font-deca font-medium text-center px-4">
                             {`${caseStudy.title}`
                               .split(' ')
                               .map((word, i) => (
                               <span
         key={i}
         className="block
           text-[1.125rem] leading-tight"
       >
         {word}
       </span>
                               ))}
                           </h3>
                             <button
                                         onClick={() => onClose(caseStudy)}
                                           className={`absolute cursor-pointer w-[4.625rem] h-[4.625rem] text-background4 bg-white lg:text-background4 lg:bg-white   rounded-full flex items-center justify-center  transition-colors bottom-4 right-4 sm:bottom-12 sm:right-12 z-0`}
                                           >
                                              <div className="w-4 h-1.5 bg-background4" ></div>
                                      
                                         </button>
                         </div>
               </div>

        {/* Right Column: Case Study Details & Close Button */}
        <div className="w-full sm:w-1/2 text-[#000000] pl-0 2xl:pl-3 pt-4 sm:pt-0 lg:pt-[5.37vh]">
          {/* Close Button Group */}
          <div className="hidden sm:flex justify-end">
            <button onClick={() => onClose(caseStudy)} className="cursor-pointer text-gray-600 flex items-center justify-center right-4 top-0 w-14 h-14 md:w-16 md:h-16 z-0">
              <FiX className="w-6 md:w-[5.9375rem] h-auto" style={{ color: '#5B5A5A69' }} />
            </button>
          </div>

          {/* Text Content Group */}
          <div className='w-[95%] pl-1.5 sm:pl-0 '>
            {/* CASE INDEX */}
            <p className="text-xs sm:text-lg md:text-xl lg:text-[1.5rem] md:text-[1.2500rem] lg:text-[1.4250rem] xl92r:text-[1.5625rem] 2xl:text-[1.875rem] ml-2 text-[#272626] lg:leading-[1] tracking-[0.00em] font-light sm:font-normal font-deca" style={{ color: '#272626' }}>
              {t('advancedMaterials.caseStudy.indexPrefix')} {caseStudy.index}
            </p>

            {/* TITLE (Prop) */}
            <p className="text-xs sm:text-xl md:text-2xl lg:text-[2rem] md:text-[2.0000rem] lg:text-[2.2800rem] pt-1 sm:pt-0 xl92r:text-[2.5000rem] 2xl:text-[3rem] ml-2 lg:leading-[1] tracking-[0.05em] font-semibold sm:font-medium font-nunito  md:mt-[2.14vh]">
              {caseStudy.title}
            </p>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm md:text-base lg:w-[33.68vw] lg:text-lg md:text-[1.0833rem] lg:text-[1.2350rem] xl92r:text-[1.3542rem] 2xl:text-[1.625rem] ml-2 text-[#000000] font-medium font-deca  leading-[1.75] sm:leading-[1.461] mt-2  sm:mt-[2.86vh] tracking-[0.01em]">
              {t('advancedMaterials.caseStudy.subtitle')}
            </p>

            {/* Overview Heading */}
            <p className={`text-xs  sm:w-[31.9vw] lg:w-[33.68vw] sm:text-sm md:text-base lg:text-lg md:text-[0.9583rem] lg:text-[1.0925rem] xl92r:text-[1.1979rem] 2xl:text-[1.4375rem] font-normal ${baseTextStyle} mt-8 sm:mt-[2.86vh]`}>
              {t('advancedMaterials.caseStudy.overview.heading')}
            </p>
            {/* Overview Content 1 */}
            <p className={`text-xs sm:text-sm lg:w-[33.68vw] md:text-base lg:text-lg md:text-[0.9583rem] lg:text-[1.0925rem] xl92r:text-[1.1979rem] 2xl:text-[1.4375rem] font-extralight ${baseTextStyle} tracking-[0.03em]`}>
              <TranslateHtml
                i18nKey="advancedMaterials.caseStudy.overview.content1"
                components={{ 1: BoldText }}
              />
            </p>
            {/* Overview Content 2 (Surface vs Insulation) */}
            <p className={`text-xs sm:text-sm md:text-base lg:text-lg md:text-[0.9583rem] lg:text-[1.0925rem] xl92r:text-[1.1979rem] 2xl:text-[1.4375rem] mt-3 sm:mt-10 font-extralight ${baseTextStyle} tracking-[0.03em]`}>
              <TranslateHtml
                i18nKey="advancedMaterials.caseStudy.overview.content2"
                components={{ 1: BoldText }}
              />
            </p>
            <p className={`sm:hidden text-xs sm:text-sm md:text-base lg:text-lg md:text-[0.9583rem] lg:text-[1.0925rem] xl92r:text-[1.1979rem] 2xl:text-[1.4375rem] mt-3 sm:mt-10 font-extralight ${baseTextStyle} tracking-[0.03em]`}>
            <TranslateHtml
              i18nKey="advancedMaterials.caseStudy.overview.content3"
              components={{ 1: BoldText }}
            />
          </p>
          </div>
        </div>
      </div>

      <div className="sm:flex gap-2 md:gap-4 pt-0">
        {/* Left Column: Quote 1 */}
        <div className='w-full sm:w-1/2 px-2 sm:px-0'>
          <p className={`text-[1rem] text-center sm:text-left sm:text-sm md:text-base lg:text-lg md:text-[1.0000rem] lg:text-[1.1400rem] xl92r:text-[1.2500rem] 2xl:text-[1.5rem] font-nunito italic font-bold mt-3 sm:mt-10 ${baseTextStyle} tracking-[0.03em]`}>
            {t('advancedMaterials.caseStudy.quote1')}
          </p>
        </div>
        {/* Right Column: Overview Content 3 (Heat resistance) */}
        <div className="w-full sm:w-1/2 hidden sm:block sm:w-[34w] pl-0 2xl:pl-3">
          <p className={`text-xs lg:w-[33.68vw] sm:text-sm md:text-base lg:text-lg md:text-[0.9583rem] lg:text-[1.0925rem] xl92r:text-[1.1979rem] 2xl:text-[1.4375rem] mt-10 font-extralight ${baseTextStyle} tracking-[0.03em]`}>
            <TranslateHtml
              i18nKey="advancedMaterials.caseStudy.overview.content3"
              components={{ 1: BoldText }}
            />
          </p>
        </div>
      </div>
  <div className={`morebutton flex ${moreMobileButon ? 'hidden' : ''} items-center justify-center pb-1 gap-x-1 cursor-pointer text-[0.875rem] sm:hidden font-deca text-center text-[#676767] mt-4`} onClick={()=> setMoreMobileButon(true)}>
        MORE <FaChevronDown  />
      </div>
<div className={`more sm:block pl-1.5 pr-3.5 sm:px-0  ${moreMobileButon ? 'block' : 'hidden'}`}>
      {/* Challenge Section (Why it matters) */}
      <p className={`text-xs sm:text-sm md:text-base lg:text-lg xl92r:text-[1.125rem] 2xl:text-[1.3125rem] font-regular ${baseTextStyle} mt-4`}>
        {t('advancedMaterials.caseStudy.whyItMatters.heading')}
      </p>
      <p className={`text-xs sm:text-sm md:text-base lg:text-lg xl92r:text-[1.125rem] 2xl:text-[1.3125rem] font-extralight ${baseTextStyle} mt-0`}>
        <TranslateHtml
          i18nKey="advancedMaterials.caseStudy.whyItMatters.content"
          components={{ 1: BoldText }}
        />
      </p>

      {/* Objective Section */}
      <p className={`text-xs sm:text-sm md:text-base lg:text-lg xl92r:text-[1.125rem] 2xl:text-[1.3125rem] font-regular ${baseTextStyle} mt-4`}>
        {t('advancedMaterials.caseStudy.objective.heading')}
      </p>
      <p className={`text-xs sm:text-sm md:text-base lg:text-lg xl92r:text-[1.125rem] 2xl:text-[1.3125rem] font-extralight ${baseTextStyle} mt-0`}>
        <TranslateHtml
          i18nKey="advancedMaterials.caseStudy.objective.content"
          components={{ 1: BoldText, 2: BoldText }}
        />
      </p>
      
      {/* Market Show Section */}
      <p className={`text-xs sm:text-sm md:text-base lg:text-lg xl92r:text-[1.125rem] 2xl:text-[1.3125rem] font-regular ${baseTextStyle} mt-4`}>
        {t('advancedMaterials.caseStudy.marketShow.heading')}
      </p>
      <ul className="list-disc  ml-5 sm:ml-6">
        {renderInterpListItem('marketShow', 0)}
        {renderInterpListItem('marketShow', 1)}
        {renderInterpListItem('marketShow', 2)}
        {renderInterpListItem('marketShow', 3)}
      </ul>
        
      {/* R&D and Levers Section (Flex Container) */}
      <div className="sm:flex gap-2 md:gap-4 pt-1 sm:pt-6">
        {/* Left Sub-Column: How can we assist your R&D */}
        <div className='w-full sm:w-1/2'>
          <p className={`text-xs sm:text-sm md:text-base lg:text-lg xl92r:text-[1.125rem] 2xl:text-[1.3125rem] font-regular ${baseTextStyle} mt-4`}>
            {t('advancedMaterials.caseStudy.rdAssistance.heading')}
          </p>
          {/* R&D Assistance Content 1 */}
          <p className={`text-xs sm:text-sm md:text-base lg:text-lg xl92r:text-[1.125rem] 2xl:text-[1.3125rem] font-extralight ${baseTextStyle} mt-1 sm:mt-0`}>
            <TranslateHtml
              i18nKey="advancedMaterials.caseStudy.rdAssistance.content1"
              components={{ 1: BoldText }}
            />
          </p>
          {/* R&D Assistance Content 2 */}
          <p className={`text-xs sm:text-sm md:text-base lg:text-lg xl92r:text-[1.125rem] 2xl:text-[1.3125rem] font-extralight ${baseTextStyle} mt-4`}>
            {t('advancedMaterials.caseStudy.rdAssistance.content2')}
          </p>
        </div>

        {/* Right Sub-Column: The levers that move the needle */}
        <div className='w-full sm:w-1/2'>
          <p className={`text-xs sm:text-sm md:text-base lg:text-lg xl92r:text-[1.125rem] 2xl:text-[1.3125rem] font-regular ${baseTextStyle} mt-4`}>
            {t('advancedMaterials.caseStudy.levers.heading')}
          </p>
          <ul className="list-disc space-y-3 ml-5 sm:ml-6">
            {/* Levers List Items */}
            {renderInterpListItem('levers', 0)}
            {renderInterpListItem('levers', 1)}
            {renderInterpListItem('levers', 2)}
          </ul>
        </div>
      </div>

      {/* Keep it private and traceable Section */}
      <p className={`text-xs sm:text-sm md:text-base lg:text-lg xl92r:text-[1.125rem] 2xl:text-[1.3125rem] font-regular ${baseTextStyle} mt-4`}>
        {t('advancedMaterials.caseStudy.traceability.heading')}
      </p>
      <p className={`text-xs sm:text-sm md:text-base lg:text-lg xl92r:text-[1.125rem] 2xl:text-[1.3125rem] font-extralight ${baseTextStyle} mt-0`}>
        <TranslateHtml
          i18nKey="advancedMaterials.caseStudy.traceability.content"
          components={{ 1: BoldText }}
        />
      </p>

      {/* How it looks with our AI platform Section */}
      <p className={`text-xs sm:text-sm pt-4 sm:pt-0 md:text-base lg:text-lg xl92r:text-[1.125rem] 2xl:text-[1.3125rem] font-regular font-deca leading-[1.865] sm:mt-10 tracking-[0.03em] ml-2 text-[#000000]`}>
        {t('advancedMaterials.caseStudy.aiPlatformLook.heading')}
      </p>
      <ul className="list-disc ml-5 sm:ml-6">
        {/* AI Platform List 1 */}
        <li className={`text-xs
  md:text-[0.958rem]
  lg:text-[1.0925rem]
  xl92r:text-[1.198rem]
  2xl:text-[1.4375rem] font-extralight ${baseTextStyle} sm:mb-[3.41vh] ml-2 sm:ml-4`}>
          <TranslateHtml
            i18nKey="advancedMaterials.caseStudy.aiPlatformLook.list.0"
            components={{ 1: BoldText, 2: BoldText }}
          />
        </li>
</ul>
     <ResponsiveImage id="materials1" alt="materials1" languageSpecific={true} className='w-full h-full bg-white mx-1 sm:mx-0 my-8 sm:my-0 py-0 sm:py-[2.04vh]' />  
  <ul className="list-disc ml-[12.5px]  sm:ml-6">
            <li className={`text-xs sm:text-sm md:text-base lg:text-lg xl92r:text-[1.125rem] 2xl:text-[1.3125rem] font-extralight font-deca leading-[1.75] sm:leading-[1.695] mt-0 sm:mt-4 tracking-[0.03em] ml-4 text-[#000000]`}>
        {/* AI Platform List 2 (Explainable shortlist) */}
    <TranslateHtml
            i18nKey="advancedMaterials.caseStudy.aiPlatformLook.list.1"
            components={{ 1: BoldText, 2: BoldText }}
          />
        </li>
          <li className={`text-xs sm:text-sm md:text-base lg:text-lg xl92r:text-[1.125rem] 2xl:text-[1.3125rem] font-extralight font-deca leading-[1.75] sm:leading-[1.695] mt-4 tracking-[0.03em] ml-4 text-[#000000]`}>
        {/* AI Platform List 3 (Operating window + guardrails) */}
   <TranslateHtml
            i18nKey="advancedMaterials.caseStudy.aiPlatformLook.list.2"
            components={{ 1: BoldText, 2: BoldText, 3: BoldText, 4: BoldText }}
          />
        </li>
      </ul>
         <div className='flex flex-col items-center justify-center mt-6 sm:mt-[7.16vh]'>
        <ResponsiveImage id="materials2" alt="materials2" languageSpecific={true} className='w-[58.71vw] h-full bg-white sm:w-[55.90vw] sm:h-auto pt-0 sm:pt-[3.58vh] mx-1 sm:mx-0' />
        <p className="w-full sm:w-[55.90vw] text-[0.625rem] sm:text-sm md:text-[0.75rem] lg:text-[0.8125rem] md:text-[0.6250rem] lg:text-[0.7125rem] xl92r:text-[0.7813rem] 2xl:text-[0.9375rem] ml-2 sm:ml-0 text-[#000000] font-extralight font-deca pb-0 sm:pb-10 leading-[1.75] sm:leading-[2.45] mt-4 tracking-[0.03em] max-w-4xl text-center">

      {/* Image and Caption Group */}
      <TranslateHtml
            i18nKey="advancedMaterials.caseStudy.imageCaption"
            components={{ 1: BoldText, 2: BoldText }}
          />
        </p>
      </div>

      {/* What does this mean? Section */}
      <p className={`text-xs sm:text-sm md:text-base lg:text-lg xl92r:text-[1.25rem] 2xl:text-[1.4375rem] font-regular ${baseTextStyle} mt-4`}>
        {t('advancedMaterials.caseStudy.meaning.heading')}
      </p>
      <ul className="list-disc ml-5 sm:ml-6">
        {/* Meaning List Items */}
        {renderInterpListItem('meaning', 0)}
        {/* NOTE: List item 1 for meaning uses {createInterpListItem} */}
        {renderInterpListItem('meaning', 1)}
      </ul>
      <p className="text-xs sm:text-sm md:text-base lg:text-lg xl92r:text-[1.25rem] 2xl:text-[1.4375rem] ml-2 text-[#000000] font-extralight font-deca pb-10 leading-[1.75] sm:leading-[1.865] mt-4 tracking-[0.03em]">
        {t('advancedMaterials.caseStudy.meaning.context')}
      </p>

        <div className='pl-1.5 sm:pl-0 pr-3.5 sm:pr-0 flex flex-col items-center my-0 sm:my-[3.41vh]'>
        <p className="pb-8 sm:pb-0 text-[1.5rem] sm:text-lg md:text-xl lg:text-2xl md:text-[1.6667rem] lg:text-[1.9000rem] xl92r:text-[2.0833rem] 2xl:text-[2.5rem] text-[#000000B2] italic font-bold font-nunito leading-[1.41] sm:leading-[1.25] tracking-[0.01em] text-center max-w-6xl 2xl:max-w-7xl">


      {/* Quote 2 */}
     {t('advancedMaterials.caseStudy.quote2')}
        </p>
      </div>
      {/* Business Value Section */}
      <p className={`text-xs sm:text-sm md:text-base lg:text-lg xl92r:text-[1.25rem] 2xl:text-[1.4375rem] font-regular ${baseTextStyle} mt-4`}>
        {t('advancedMaterials.caseStudy.businessValue.heading')}
      </p>
      <ul className="list-disc ml-5 sm:ml-6">
        {/* Business Value List Items */}
        {renderInterpListItem('businessValue', 0)}
        {renderInterpListItem('businessValue', 1)}
        {renderInterpListItem('businessValue', 2)}
      </ul>

      {/* Final Results Section */}
      <p className={`text-xs sm:text-sm md:text-base lg:text-lg xl92r:text-[1.25rem] sm:pb-[3.07vh] 2xl:text-[1.4375rem] font-regular ${baseTextStyle} mt-10`}>
        {t('advancedMaterials.caseStudy.finalResults.heading')}
      </p>
           <div className='pl-1 sm:pl-0'>
<div className="overflow-hidden rounded-xl border border-gray-800 mt-4 sm:mt-0 w-full 2xl:w-[75rem] mx-auto">
<table className="min-w-full table-fixed border border-gray-800 rounded-lg overflow-hidden divide-y divide-gray-800">

        {/* Table Header */}
        <thead>
          <tr className="divide-x divide-gray-800 "> 
            <th 
              scope="col"
              className="w-1/3 px-2 sm:px-3 md:px-4 lg:px-5 xl92r:px-6 py-2 text-left text-xs sm:text-sm md:text-base lg:text-lg md:text-[0.9583rem] lg:text-[1.0925rem] xl92r:text-[1.1979rem] 2xl:text-[1.4375rem] font-medium text-gray-800 opacity-58 xl92r:tracking-[0.07em] xl92r:leading-[1.6]"
            >
              {t('automotive.caseStudy.finalResults.table.headers.area')}
            </th>
            <th 
              scope="col"
              className="w-1/3 px-2 sm:px-3 md:px-4 lg:px-5 xl92r:px-6 py-2 text-left text-xs sm:text-sm md:text-base lg:text-lg md:text-[0.9583rem] lg:text-[1.0925rem] xl92r:text-[1.1979rem] 2xl:text-[1.4375rem] font-medium text-gray-800 opacity-58 xl92r:tracking-[0.07em] xl92r:leading-[1.6]"
            >
              {t('automotive.caseStudy.finalResults.table.headers.before')}
            </th>
            <th 
              scope="col"
              className="w-1/3 px-2 sm:px-3 md:px-4 lg:px-5 xl92r:px-6 py-2 text-left text-xs sm:text-sm md:text-base lg:text-lg md:text-[0.9583rem] lg:text-[1.0925rem] xl92r:text-[1.1979rem] 2xl:text-[1.4375rem] font-medium text-gray-800 opacity-58 xl92r:tracking-[0.07em] xl92r:leading-[1.6]"
            >
              {t('automotive.caseStudy.finalResults.table.headers.after')}
            </th>
          </tr>
        </thead>
        
        {/* Table Body */}
        <tbody className="divide-y divide-gray-800 font-deca">
          {tableData.map((row: TableRow, index: number) => (
            <tr
              key={index}
              className={`divide-x divide-gray-800 text-center`}
            >
              {/* Column 1: Area (Standard Cell) */}
              <td className=" px-0 sm:px-1 md:px-2 lg:px-4 xl92r:px-6 py-2 text-[0.625rem] sm:text-sm md:text-base lg:text-lg md:text-[1.0000rem] lg:text-[1.1400rem] xl92r:text-[1.2500rem] 2xl:text-[1.5rem] font-light text-black text-center opacity-100">
                {row.area}
              </td>

              {/* Column 2: Before (Image 1/4 + Text 3/4 Layout) */}
              <td className="px-0 py-2 font-light text-black opacity-100">
                <div className="flex items-center">
                  <div className="w-1/4 flex justify-center items-center">
                    <ResponsiveImage id={tableTypes[index]} alt='type' className='w-4 sm:w-full'/>
                  </div>
                  <div className="w-3/4 text-[0.625rem] sm:text-sm md:text-base lg:text-lg md:text-[0.8333rem] lg:text-[0.9500rem] xl92r:text-[1.0417rem] 2xl:text-[1.25rem] text-left">
                    {row.process}
                  </div>
                </div>
              </td>

              {/* Column 3: After (Image 1/4 + Text 3/4 Layout) */}
              <td className="px-0 py-2 font-light text-black opacity-100">
                <div className="flex items-center">
                  <div className="w-1/4 flex justify-center items-center">
                    <ResponsiveImage id='tick' alt='tick' className='w-4 sm:w-full'/>
                  </div>
                  <div className="w-3/4 text-[0.625rem] sm:text-sm md:text-base lg:text-lg md:text-[0.8333rem] lg:text-[0.9500rem] xl92r:text-[1.0417rem] 2xl:text-[1.25rem] text-left">
                    {row.after}
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
</div></div>

      <div className='flex justify-center mt-4 sm:mt-12 pb-15 sm:pb-0'>
        <p className="relative text-[1.25rem] sm:text-lg md:text-xl lg:text-[1.5rem] md:text-[1.4583rem] lg:text-[1.6625rem] xl92r:text-[1.8229rem] 2xl:text-[2.1875rem] ml-2 text-[#000000B2] italic max-w-7xl pb-5 sm:pb-40 font-bold font-nunito leading-[1.7] sm:leading-[1] mt-4 tracking-[0.02em] text-center">
          {t('advancedMaterials.caseStudy.finalQuote')}
          <div className=" sm:hidden justify-end">
                      <button onClick={() => onClose(caseStudy)} className="absolute  -bottom-8 -right-4 cursor-pointer text-gray-600 flex items-center justify-center  w-20 h-10 md:w-16 md:h-16 z-0">
                   
<svg width="24" height="26" viewBox="0 0 24 26" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20.8516 26L11.2516 13.8L11.1016 13.6L0.401563 -2.02656e-06H3.55156L12.9516 12L13.1016 12.2L24.0016 26H20.8516ZM0.00156255 26L10.9516 12.05L12.4516 13.85L3.05156 26H0.00156255ZM13.3016 13.15L11.8016 11.35L20.5516 -2.02656e-06H23.6016L13.3016 13.15Z" fill="#5B5A5A" fill-opacity="0.41"/>
</svg>  </button>
                    </div>
        </p>
      </div>
      </div>
    </div>
  );
}

export default AdvancedMaterials;
