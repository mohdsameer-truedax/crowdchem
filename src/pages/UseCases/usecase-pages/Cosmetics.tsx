import React, { useState } from 'react';
import { type CaseStudy } from '../../../data/CaseStudy';
import { ResponsiveImage } from '../../../utils/ResponsiveImage';
import { FiX } from 'react-icons/fi';
// Import custom components/hooks
import { useTranslation } from '../../../i18n/TranslationContext'; 
import { TranslateHtml } from '../../../i18n/TranslateHtml';
import { translations } from '../../../i18n/translations';
import { FaChevronDown, FaMinus } from 'react-icons/fa';


const Cosmetics = ({ caseStudy, onClose }: { caseStudy: CaseStudy; onClose: (caseStudy: CaseStudy) => void }) => {
  // Access the translation function
  const { t, code, language } = useTranslation();
 const [moreMobileButon, setMoreMobileButon] = useState(false)

  interface TableRow {
    area: string;
    process: string;
    after: string;
  }
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const currentTranslation = translations[language] as any;
  const tableData: TableRow[] = currentTranslation?.cosmetics?.caseStudy?.finalResults?.table?.rows || [];
  
  const tableTypes = ['triangle', 'cross', 'cross', 'cross', 'triangle'];
  
  // Define common text styles
  const baseTextStyle = 'ml-2 text-[#000000] font-deca leading-[1.5] sm:leading-[2.1875rem] tracking-[0.03em]';

  // Component to define the styling for the bolded text (interpolation component)
  const BoldText = <span className='font-light' />;

  // Helper for translating simple list items (no interpolation needed)
  const renderSimpleListItem = (keyPath: string, index: number) => (
    <li className={`text-xs sm:text-sm md:text-base lg:text-lg xl92r:text-[1.125rem] 2xl:text-[1.3125rem] font-extralight ${baseTextStyle} mt-1 ml-4`}>
      {t(`cosmetics.caseStudy.${keyPath}.list.${index}`)}
    </li>
  );

  // Helper for list items that require interpolation (using <1>, <2> markers)
  const renderInterpListItem = (keyPath: string, index: number) => (
    <li className={`text-xs sm:text-sm md:text-base lg:text-lg xl92r:text-[1.125rem] 2xl:text-[1.3125rem] font-extralight ${baseTextStyle} mt-4 ml-4`}>
      <TranslateHtml
        i18nKey={`cosmetics.caseStudy.${keyPath}.list.${index}`}
        // The '1' component replaces the <1>...</1> markers
        components={{ 1: BoldText, 2: BoldText }} 
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
                   className="w-full h-[27.25vh] sm:h-[25rem] lg:h-[34.5rem] 2xl:h-[47rem] rounded-[2.9375rem]"
                 />
                 <div className="absolute sm:hidden inset-0 flex items-center rounded-[2.9375rem] justify-center bg-black/40 opacity-100 transition-all duration-500">
                           <h3 className="text-white text-[1.125rem] font-deca font-medium text-center px-4">
                             {`${caseStudy.title}`
                               .split(' ')
                               .map((word, i) => (
                               <span
         key={i}
         className="block
           text-[1.125rem] leading-tight sm:leading-snug md:leading-normal lg:leading-relaxed xl92r:leading-[3.5rem] 2xl:leading-[4.0625rem]"
       >
         {word}
       </span>
                               ))}
                           </h3>
                             <button
                                         onClick={() => onClose(caseStudy)}
                                           className={`absolute cursor-pointer w-[4.625rem] h-[4.625rem] text-background4 bg-white lg:text-background4 lg:bg-white   rounded-full flex items-center justify-center  transition-colors bottom-4 right-4 sm:bottom-12 sm:right-12 z-0`}
                                           >
                                             <FaMinus className="w-4 h-5 " />
                                      
                                         </button>
                         </div>
               </div>
        {/* Right Column: Case Study Details & Close Button */}
        <div className="w-full sm:w-1/2 text-[#000000] pt-4 sm:pt-0 2xl:pt-20">
          {/* Close Button Group (No translation needed) */}
          <div className="hidden sm:flex justify-end">
            <button onClick={() => onClose(caseStudy)} className="cursor-pointer text-gray-600 flex items-center justify-center right-4 top-0 w-14 h-14 md:w-16 md:h-16 z-0">
              <FiX className="w-6 md:w-[5.9375rem] h-auto" style={{ color: '#5B5A5A69' }} />
            </button>
          </div>

          {/* Text Content Group */}
          <div className='w-[95%] pl-1.5 sm:pl-0'>
            {/* CASE INDEX */}
            <p className="text-xs sm:text-lg md:text-xl lg:text-[1.5rem] md:text-[1.2500rem] lg:text-[1.4250rem] xl92r:text-[1.5625rem] 2xl:text-[1.875rem] ml-2 text-[#272626] lg:leading-[100%] tracking-[0.00em] font-light sm:font-normal font-deca" style={{ color: '#272626' }}>
              {t('cosmetics.caseStudy.indexPrefix')} {caseStudy.index}
            </p>

            {/* TITLE (Prop) */}
            <p className="text-xs sm:text-xl pt-1 sm:pt-0 md:text-2xl lg:text-[2rem] md:text-[2.0000rem] lg:text-[2.2800rem] xl92r:text-[2.5000rem] 2xl:text-[3rem] ml-2 lg:leading-[100%] tracking-[0.05em] font-semibold sm:font-medium font-nunito md:mt-6">
              {caseStudy.title}
            </p>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm md:text-base lg:text-lg md:text-[1.0833rem] lg:text-[1.2350rem] xl92r:text-[1.3542rem] 2xl:text-[1.625rem] ml-2 text-[#000000] font-medium font-deca leading-[1.5] sm:leading-[2.375rem] mt-2 sm:mt-8 tracking-[0.01em]">
              {t('cosmetics.caseStudy.subtitle')}
            </p>

            {/* Overview Heading */}
            <p className={`text-xs sm:text-sm md:text-base lg:text-lg md:text-[0.9583rem] lg:text-[1.0925rem] xl92r:text-[1.1979rem] 2xl:text-[1.4375rem] font-normal ${baseTextStyle} mt-4 sm:mt-8`}>
              {t('cosmetics.caseStudy.overview.heading')}
            </p>
            {/* Overview Content (FIXED with TranslateHtml) */}
            <p className={`text-xs sm:text-sm md:text-base lg:text-lg md:text-[0.9583rem] lg:text-[1.0925rem] xl92r:text-[1.1979rem] 2xl:text-[1.4375rem] font-extralight ${baseTextStyle} tracking-[0.03em]`}>
              <TranslateHtml
                i18nKey="cosmetics.caseStudy.overview.content"
                components={{ 1: BoldText, 2: BoldText, 3: BoldText }}
              />
            </p>
          </div>
        </div>
      </div>

      {/* Challenge Section */}
      <p className={`text-xs px-2 sm:px-0 sm:text-sm md:text-base lg:text-lg xl92r:text-[1.125rem] 2xl:text-[1.3125rem] font-regular ${baseTextStyle} mt-4`}>
        {t('cosmetics.caseStudy.challenge.heading')}
      </p>
      {/* Challenge Content (FIXED with TranslateHtml) */}
      <p className={`text-xs px-2 sm:px-0 sm:text-sm md:text-base lg:text-lg xl92r:text-[1.125rem] 2xl:text-[1.3125rem] font-extralight ${baseTextStyle} mt-0`}>
        <TranslateHtml
          i18nKey="cosmetics.caseStudy.challenge.content"
          components={{ 1: BoldText }}
        />
      </p>

      {/* Objective Section */}
      <p className={`text-xs px-2 sm:px-0 sm:text-sm md:text-base lg:text-lg xl92r:text-[1.125rem] 2xl:text-[1.3125rem] font-regular ${baseTextStyle} mt-4`}>
        {t('cosmetics.caseStudy.objective.heading')}
      </p>
      <p className={`text-xs pl-2 sm:pl-0 pr-4 sm:pr-0 sm:text-sm md:text-base lg:text-lg xl92r:text-[1.125rem] 2xl:text-[1.3125rem] font-extralight ${baseTextStyle} mt-0`}>
        {t('cosmetics.caseStudy.objective.content')}
      </p>
      <div className={`morebutton flex ${moreMobileButon ? 'hidden' : ''} items-center justify-center gap-x-1 cursor-pointer text-[0.875rem] sm:hidden font-deca text-center text-[#676767] mt-4`} onClick={()=> setMoreMobileButon(true)}>
        MORE <FaChevronDown  />
      </div>
<div className={`more sm:block ${moreMobileButon ? 'block' : 'hidden'}`}>
      {/* Importance Section */}
      <div className=''>
        <p className={`text-xs sm:text-sm md:text-base lg:text-lg xl92r:text-[1.125rem] 2xl:text-[1.3125rem] font-regular ${baseTextStyle} mt-4`}>
          {t('cosmetics.caseStudy.importance.heading')}
        </p>
        <p className={`text-xs sm:text-sm md:text-base lg:text-lg xl92r:text-[1.125rem] 2xl:text-[1.3125rem] font-extralight ${baseTextStyle} mt-4`}>
          {t('cosmetics.caseStudy.importance.context')}
        </p>
        <ul className="list-disc ml-6">
          {renderSimpleListItem('importance', 0)}
          {renderSimpleListItem('importance', 1)}
          {renderSimpleListItem('importance', 2)}
          {renderSimpleListItem('importance', 3)}
        </ul>
      </div>

      {/* R&D and Levers Section (Flex Container) */}
      <div className="flex gap-2 md:gap-4 pt-6">
        {/* Left Sub-Column: How we get you to your desired result */}
        <div className='w-1/2'>
          <p className={`text-xs sm:text-sm md:text-base lg:text-lg xl92r:text-[1.125rem] 2xl:text-[1.3125rem] font-regular ${baseTextStyle} mt-4`}>
            {t('cosmetics.caseStudy.rdAssistance.heading')}
          </p>
          <p className={`text-xs sm:text-sm md:text-base lg:text-lg xl92r:text-[1.125rem] 2xl:text-[1.3125rem] font-extralight ${baseTextStyle} mt-4`}>
            {t('cosmetics.caseStudy.rdAssistance.content')}
          </p>
          <ul className="list-disc ml-6">
            <li className={`text-xs sm:text-sm md:text-base lg:text-lg xl92r:text-[1.125rem] 2xl:text-[1.3125rem] font-extralight ${baseTextStyle} mt-4`}>
              {t('cosmetics.caseStudy.rdAssistance.list.0')}
            </li>
            {/* R&D Assistance List 1 (FIXED with TranslateHtml) */}
            <li className={`text-xs sm:text-sm md:text-base lg:text-lg xl92r:text-[1.125rem] 2xl:text-[1.3125rem] font-extralight ${baseTextStyle} mt-4`}>
              <TranslateHtml
                i18nKey="cosmetics.caseStudy.rdAssistance.list.1"
                components={{ 1: BoldText }}
              />
            </li>
          </ul>
          {/* R&D Assistance Context (FIXED with TranslateHtml) */}
          <p className={`text-xs sm:text-sm md:text-base lg:text-lg xl92r:text-[1.125rem] 2xl:text-[1.3125rem] font-extralight ${baseTextStyle} mt-4`}>
            <TranslateHtml
              i18nKey="cosmetics.caseStudy.rdAssistance.context"
              components={{ 1: BoldText }}
            />
          </p>
        </div>

        {/* Right Sub-Column: The levers that move the needle */}
        <div className='w-1/2'>
          <p className={`text-xs sm:text-sm md:text-base lg:text-lg xl92r:text-[1.125rem] 2xl:text-[1.3125rem] font-regular ${baseTextStyle} mt-4`}>
            {t('cosmetics.caseStudy.levers.heading')}
          </p>
          <ul className="list-disc ml-6">
            {/* Levers List Items (FIXED with TranslateHtml) */}
            {renderInterpListItem('levers', 0)}
            {renderInterpListItem('levers', 1)}
            {renderInterpListItem('levers', 2)}
            {renderInterpListItem('levers', 3)}
            {renderInterpListItem('levers', 4)}
          </ul>
        </div>
      </div>

      {/* Keep it private and traceable Section */}
      <p className={`text-xs sm:text-sm md:text-base lg:text-lg xl92r:text-[1.125rem] 2xl:text-[1.3125rem] font-regular ${baseTextStyle} mt-4`}>
        {t('cosmetics.caseStudy.traceability.heading')}
      </p>
      <p className={`text-xs sm:text-sm md:text-base lg:text-lg xl92r:text-[1.125rem] 2xl:text-[1.3125rem] font-extralight ${baseTextStyle} mt-0`}>
        {t('cosmetics.caseStudy.traceability.content')} 
        {/* NOTE: If the original content had bolding here, we would use TranslateHtml. 
                 The extraction shows bolding in the middle, but the key is a single string.
                 For now, we leave it as t() and rely on the full key text: 
                 "Your raw data stays on your side; only the model learnings move. This means lineage end-to-end..." */}
      </p>

      {/* What are we looking for Section */}
      <p className={`text-xs sm:text-sm md:text-base lg:text-lg xl92r:text-[1.125rem] 2xl:text-[1.3125rem] font-regular font-deca leading-[2.4375rem] mt-4 tracking-[0.03em] ml-2 text-[#000000]`}>
        {t('cosmetics.caseStudy.whatWeAreLookingFor.heading')}
      </p>
      <ul className="list-disc ml-6">
        {renderSimpleListItem('whatWeAreLookingFor', 0)}
        {renderSimpleListItem('whatWeAreLookingFor', 1)}
        {renderSimpleListItem('whatWeAreLookingFor', 2)}
        {renderSimpleListItem('whatWeAreLookingFor', 3)}
      </ul>
      <p className={`text-xs sm:text-sm md:text-base lg:text-lg xl92r:text-[1.125rem] 2xl:text-[1.3125rem] font-extralight font-deca leading-[2.4375rem] mt-4 tracking-[0.03em] ml-2 text-[#000000]`}>
        {t('cosmetics.caseStudy.targetStyleWindows.heading')}
      </p>
      <ul className="list-disc ml-6">
        {renderSimpleListItem('targetStyleWindows', 0)}
        {renderSimpleListItem('targetStyleWindows', 1)}
        {renderSimpleListItem('targetStyleWindows', 2)}
      </ul>
      
      {/* How it looks with our AI platform Section */}
      <p className={`text-xs sm:text-sm md:text-base lg:text-lg xl92r:text-[1.125rem] 2xl:text-[1.3125rem] font-regular font-deca leading-[2.4375rem] mt-4 tracking-[0.03em] ml-2 text-[#000000]`}>
        {t('cosmetics.caseStudy.aiPlatformLook.heading')}
      </p>
      <ul className="list-disc ml-6">
        {/* AI Platform List 1 (FIXED with TranslateHtml) */}
        <li className={`text-xs sm:text-sm md:text-base lg:text-lg xl92r:text-[1.125rem] 2xl:text-[1.3125rem] font-extralight ml-4 ${baseTextStyle} mb-2`}>
          <TranslateHtml
            i18nKey="cosmetics.caseStudy.aiPlatformLook.list.0"
            components={{ 1: BoldText }}
          />
        </li>
      </ul>
        {code === "Japanese"?  <ResponsiveImage id="cosmeticsj1" alt="cosmeticsj1" className='w-full h-full py-10' /> : <ResponsiveImage id="cosmetics1" alt="cosmetics1" className='w-full h-full py-10' />} 
  

      <ul className="list-disc ml-6">
        {/* Explainable shortlist (FIXED with TranslateHtml) */}
        <li className={`text-xs sm:text-sm md:text-base lg:text-lg xl92r:text-[1.125rem] 2xl:text-[1.3125rem] font-extralight font-deca leading-[2.4375rem] mt-4 tracking-[0.03em] ml-4 text-[#000000]`}>
          <TranslateHtml
            i18nKey="cosmetics.caseStudy.aiPlatformLook.list.1"
            components={{ 1: BoldText }}
          />
        </li>
        
        {/* Operating window + guardrails (FIXED with TranslateHtml) */}
        <li className={`text-xs sm:text-sm md:text-base lg:text-lg xl92r:text-[1.125rem] 2xl:text-[1.3125rem] font-extralight font-deca leading-[2.4375rem] mt-4 tracking-[0.03em] ml-4 text-[#000000]`}>
          <TranslateHtml
            i18nKey="cosmetics.caseStudy.aiPlatformLook.list.2"
            components={{ 1: BoldText }}
          />
        </li>
      </ul>

      {/* Image and Caption Group */}
      <div className='flex flex-col items-center justify-center mt-20'>
        <ResponsiveImage id="cosmetics2" alt="cosmetics2" className='w-full h-full pt-10' />
        <p className="text-xs sm:text-sm md:text-[0.75rem] lg:text-[0.8125rem] xl92r:text-[0.875rem] 2xl:text-[0.9375rem] ml-2 text-[#000000] font-extralight font-deca pb-10 leading-[2.4375rem] mt-4 tracking-[0.03em] max-w-4xl text-center">
          {t('cosmetics.caseStudy.imageCaption')}
        </p>
      </div>

      {/* What does this mean? Section */}
      <p className={`text-xs sm:text-sm md:text-base lg:text-lg xl92r:text-[1.25rem] 2xl:text-[1.4375rem] font-regular ${baseTextStyle} mt-4`}>
        {t('cosmetics.caseStudy.meaning.heading')}
      </p>
      <ul className="list-disc ml-6">
        {/* Meaning list items (FIXED with TranslateHtml) */}
        <li className={`text-xs sm:text-sm md:text-base lg:text-lg xl92r:text-[1.25rem] 2xl:text-[1.4375rem] font-extralight ${baseTextStyle} ml-4 mt-0`}>
          <TranslateHtml
            i18nKey="cosmetics.caseStudy.meaning.list.0"
            components={{ 1: BoldText }}
          />
        </li>
        <li className={`text-xs sm:text-sm md:text-base lg:text-lg xl92r:text-[1.25rem] 2xl:text-[1.4375rem] font-extralight ${baseTextStyle} ml-4 mt-0`}>
          <TranslateHtml
            i18nKey="cosmetics.caseStudy.meaning.list.1"
            components={{ 1: BoldText }}
          />
        </li>
      </ul>

      {/* Results in manufacturing Section */}
      <p className={`text-xs sm:text-sm md:text-base lg:text-lg xl92r:text-[1.25rem] 2xl:text-[1.4375rem] font-regular ${baseTextStyle} mt-4`}>
        {t('cosmetics.caseStudy.targetResults.heading')}
      </p>
      <ul className="list-disc ml-6">
        {renderSimpleListItem('targetResults', 0)}
        {renderSimpleListItem('targetResults', 1)}
        {renderSimpleListItem('targetResults', 2)}
        {renderSimpleListItem('targetResults', 3)}
      </ul>

      {/* Quote 1 */}
      <div className='flex justify-center my-10'>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl md:text-[1.6667rem] lg:text-[1.9000rem] xl92r:text-[2.0833rem] 2xl:text-[2.5rem] text-[#000000B2] italic font-bold font-nunito leading-[2.4375rem] mt-4 tracking-[0.01em] text-center">
          {t('cosmetics.caseStudy.quote1')}
        </p>
      </div>

      {/* Product choices Section (Business Results) */}
      <p className={`text-xs sm:text-sm md:text-base lg:text-lg xl92r:text-[1.25rem] 2xl:text-[1.4375rem] font-regular ${baseTextStyle} mt-4`}>
        {t('cosmetics.caseStudy.businessResults.heading')}
      </p>
      <ul className="list-disc ml-6">
        {/* Business Results (FIXED with TranslateHtml) */}
        {renderInterpListItem('businessResults', 0)}
        {renderInterpListItem('businessResults', 1)}
        {renderInterpListItem('businessResults', 2)}
        {renderInterpListItem('businessResults', 3)}
      </ul>

      {/* Final Results Section */}
      <p className={`text-xs sm:text-sm md:text-base lg:text-lg xl92r:text-[1.25rem] 2xl:text-[1.4375rem] font-regular ${baseTextStyle} mt-10`}>
        {t('cosmetics.caseStudy.finalResults.heading')}
      </p>
     
<div className="overflow-hidden rounded-xl border border-gray-800 w-full 2xl:w-[75rem] mx-auto">
<table className="min-w-full table-fixed border border-gray-800 rounded-lg overflow-hidden divide-y divide-gray-800">

        {/* Table Header */}
        <thead>
          <tr className="divide-x divide-gray-800 "> 
            <th 
              scope="col"
              className="w-1/3 px-2 sm:px-3 md:px-4 lg:px-5 xl92r:px-6 py-2 text-left text-xs sm:text-sm md:text-base lg:text-lg md:text-[0.9583rem] lg:text-[1.0925rem] xl92r:text-[1.1979rem] 2xl:text-[1.4375rem] font-medium text-gray-800 opacity-58 xl92r:tracking-[0.07em] xl92r:leading-[2.3125rem]"
            >
              {t('cosmetics.caseStudy.finalResults.table.headers.area')}
            </th>
            <th 
              scope="col"
              className="w-1/3 px-2 sm:px-3 md:px-4 lg:px-5 xl92r:px-6 py-2 text-left text-xs sm:text-sm md:text-base lg:text-lg md:text-[0.9583rem] lg:text-[1.0925rem] xl92r:text-[1.1979rem] 2xl:text-[1.4375rem] font-medium text-gray-800 opacity-58 xl92r:tracking-[0.07em] xl92r:leading-[2.3125rem]"
            >
              {t('cosmetics.caseStudy.finalResults.table.headers.before')}
            </th>
            <th 
              scope="col"
              className="w-1/3 px-2 sm:px-3 md:px-4 lg:px-5 xl92r:px-6 py-2 text-left text-xs sm:text-sm md:text-base lg:text-lg md:text-[0.9583rem] lg:text-[1.0925rem] xl92r:text-[1.1979rem] 2xl:text-[1.4375rem] font-medium text-gray-800 opacity-58 xl92r:tracking-[0.07em] xl92r:leading-[2.3125rem]"
            >
              {t('cosmetics.caseStudy.finalResults.table.headers.after')}
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
              <td className=" px-0 sm:px-1 md:px-2 lg:px-4 xl92r:px-6 py-2 text-xs sm:text-sm md:text-base lg:text-lg md:text-[1.0000rem] lg:text-[1.1400rem] xl92r:text-[1.2500rem] 2xl:text-[1.5rem] font-light text-black text-center opacity-100">
                {row.area}
              </td>

              {/* Column 2: Before (Image 1/4 + Text 3/4 Layout) */}
              <td className="px-0 py-2 font-light text-black opacity-100">
                <div className="flex items-center">
                  <div className="w-1/4 flex justify-center items-center">
                    <ResponsiveImage id={tableTypes[index]} alt='type'/>
                  </div>
                  <div className="w-3/4 text-xs sm:text-sm md:text-base lg:text-lg md:text-[1.0000rem] lg:text-[1.1400rem] xl92r:text-[1.2500rem] 2xl:text-[1.5rem] text-left">
                    {row.process}
                  </div>
                </div>
              </td>

              {/* Column 3: After (Image 1/4 + Text 3/4 Layout) */}
              <td className="px-0 py-2 font-light text-black opacity-100">
                <div className="flex items-center">
                  <div className="w-1/4 flex justify-center items-center">
                    <ResponsiveImage id='tick' alt='tick'/>
                  </div>
                  <div className="w-3/4 text-xs sm:text-sm md:text-base lg:text-lg md:text-[0.8333rem] lg:text-[0.9500rem] xl92r:text-[1.0417rem] 2xl:text-[1.25rem] text-left">
                    {row.after}
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
</div>

      {/* Final Quote */}
      <div className='flex justify-center mt-4'>
        <p className="text-base sm:text-lg md:text-xl lg:text-[1.5rem] md:text-[1.4583rem] lg:text-[1.6625rem] xl92r:text-[1.8229rem] 2xl:text-[2.1875rem] ml-2 text-[#000000B2] italic max-w-6xl pb-40 font-bold font-nunito leading-[100%] mt-4 tracking-[0.02em] text-center">
          {t('cosmetics.caseStudy.finalQuote')}
        </p>
      </div>
      </div>
    </div>
  );
}

export default Cosmetics;
