import React from 'react';
import { type CaseStudy } from '../../../data/CaseStudy';
import { ResponsiveImage } from '../../../utils/ResponsiveImage';
import { FiX } from 'react-icons/fi';
// FIX: Using the correct import path for the custom hook
import { useTranslation } from '../../../i18n/TranslationContext'; 
// FIX: Importing the custom interpolation component
import { TranslateHtml } from '../../../i18n/TranslateHtml';
import { translations } from '../../../i18n/translations';


const Automotive = ({ caseStudy, onClose }: { caseStudy: CaseStudy; onClose: (caseStudy: CaseStudy) => void }) => {
  // Access the translation function
  const { t, code, language } = useTranslation();

  interface TableRow {
    area: string;
    process: string;
    after: string;
  }
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const currentTranslation = translations[language] as any;
  const tableData: TableRow[] = currentTranslation?.automotive?.caseStudy?.finalResults?.table?.rows || [];
  
  const tableTypes = ['triangle', 'cross', 'cross', 'cross', 'triangle', 'cross'];
  
  // Define common text styles
  const baseTextStyle = 'ml-2 text-[#000000] font-deca leading-[2.1875rem] tracking-[0.03em]';

  // Component to define the styling for the bolded text (interpolation component)
  const BoldText = <span className='font-light' />;

  // Component to handle list items that contain bolded text
  const renderTransListItem = (keyPath: string, index: number) => (
    <li className={`text-xs sm:text-sm md:text-base lg:text-lg xl92r:text-[1.25rem] 2xl:text-[1.4375rem] font-extralight ${baseTextStyle} ml-4 mt-0`}>
      {/* Now correctly using the TranslateHtml component */}
      <TranslateHtml
        i18nKey={`automotive.caseStudy.${keyPath}.list.${index}`}
        // The '1' component replaces the <1>...</1> markers in the translation file
        components={{ 1: BoldText }}
      />
    </li>
  );

  return (
    <div>
      {/* Main content container */}
      <div id={caseStudy.id} className="flex gap-2 md:gap-4 ">
        {/* Left Column: Image */}
        <div className="w-1/2 pt-10">
          <ResponsiveImage
            id={caseStudy.id}
            alt={t('alt.applicationImage')}
            className="w-full h-[25rem] lg:h-[34.5rem] 2xl:h-[47rem] rounded-2xl lg:rounded-[2.9375rem]"
          />
        </div>

        {/* Right Column: Case Study Details & Close Button */}
        <div className="w-1/2 text-[#000000] pt-0 2xl:pt-20">
          {/* Close Button is structural, no text to translate */}
          <div className="flex justify-end">
            <button onClick={() => onClose(caseStudy)} className="cursor-pointer text-gray-600 flex items-center justify-center right-4 top-0 w-14 h-14 md:w-16 md:h-16 z-0">
              <FiX className="w-6 md:w-[5.9375rem] h-auto" style={{ color: '#5B5A5A69' }} />
            </button>
          </div>

          {/* Text Content Group */}
          <div className='w-[95%]'>
            {/* CASE INDEX */}
            <p className="text-base sm:text-lg md:text-xl lg:text-[1.5rem] md:text-[1.2500rem] lg:text-[1.4250rem] xl92r:text-[1.5625rem] 2xl:text-[1.875rem] ml-2 text-[#272626] lg:leading-[100%] tracking-[0.00em] font-normal font-deca" style={{ color: '#272626' }}>
              {t('automotive.caseStudy.indexPrefix')} {caseStudy.index}
            </p>

            {/* TITLE (Prop) */}
            <p className="text-lg sm:text-xl md:text-2xl lg:text-[2rem] md:text-[2.0000rem] lg:text-[2.2800rem] xl92r:text-[2.5000rem] 2xl:text-[3rem] ml-2 lg:leading-[100%] tracking-[0.05em] font-medium font-nunito md:mt-6">
              {caseStudy.title}
            </p>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm md:text-base lg:text-lg md:text-[1.0833rem] lg:text-[1.2350rem] xl92r:text-[1.3542rem] 2xl:text-[1.625rem] ml-2 text-[#000000] font-medium font-deca leading-[2.375rem] mt-8 tracking-[0.01em]">
              {t('automotive.caseStudy.subtitle')}
            </p>

            {/* Overview Heading */}
            <p className={`text-xs sm:text-sm md:text-base lg:text-lg md:text-[0.9583rem] lg:text-[1.0925rem] xl92r:text-[1.1979rem] 2xl:text-[1.4375rem] font-normal ${baseTextStyle} mt-8`}>
              {t('automotive.caseStudy.overview.heading')}
            </p>
            {/* Overview Content */}
            <p className={`text-xs w-[33.6vw] sm:text-sm md:text-base lg:text-lg xl92r:text-[1.25rem] 2xl:text-[1.4375rem] font-extralight ${baseTextStyle} tracking-[0.03em]`}>
              {t('automotive.caseStudy.overview.content')}
            </p>
          </div>
        </div>
      </div>

      {/* Challenge Section */}
      <p className={`text-xs sm:text-sm md:text-base lg:text-lg xl92r:text-[1.125rem] 2xl:text-[1.3125rem] font-regular ${baseTextStyle} mt-4`}>
        {t('automotive.caseStudy.challenge.heading')}
      </p>
      <p className={`text-xs sm:text-sm md:text-base lg:text-lg xl92r:text-[1.125rem] 2xl:text-[1.3125rem] font-extralight ${baseTextStyle} mt-0`}>
        {t('automotive.caseStudy.challenge.content')}
      </p>

      {/* Objective Section */}
      <p className={`text-xs sm:text-sm md:text-base lg:text-lg xl92r:text-[1.125rem] 2xl:text-[1.3125rem] font-regular ${baseTextStyle} mt-4`}>
        {t('automotive.caseStudy.objective.heading')}
      </p>
      <p className={`text-xs sm:text-sm md:text-base lg:text-lg xl92r:text-[1.125rem] 2xl:text-[1.3125rem] font-extralight ${baseTextStyle} mt-0`}>
        {t('automotive.caseStudy.objective.content')}
      </p>

      {/* R&D and Levers Section (Flex Container) */}
      <div className="flex gap-2 md:gap-4 pt-6">
        {/* Left Sub-Column: How can we assist your R&D */}
        <div className='w-1/2'>
          <p className={`text-xs sm:text-sm md:text-base lg:text-lg xl92r:text-[1.125rem] 2xl:text-[1.3125rem] font-regular ${baseTextStyle} mt-4`}>
            {t('automotive.caseStudy.rdAssistance.heading')}
          </p>
          <p className={`text-xs sm:text-sm md:text-base lg:text-lg xl92r:text-[1.125rem] 2xl:text-[1.3125rem] font-extralight ${baseTextStyle} my-4`}>
            {t('automotive.caseStudy.rdAssistance.content')}
          </p>
          <ul className="list-disc ml-6 space-y-4">
            {/* Using renderTransListItem which utilizes TranslateHtml */}
            {renderTransListItem('rdAssistance', 0)}
            {renderTransListItem('rdAssistance', 1)}
            {renderTransListItem('rdAssistance', 2)}
          </ul>
        </div>

        {/* Right Sub-Column: The levers that move the needle */}
        <div className='w-1/2'>
          <p className={`text-xs sm:text-sm md:text-base lg:text-lg xl92r:text-[1.125rem] 2xl:text-[1.3125rem] font-regular ${baseTextStyle} mt-4`}>
            {t('automotive.caseStudy.levers.heading')}
          </p>
          {/* Using TranslateHtml for Levers Content paragraph */}
          {/* <p className={`text-sm md:text-[1.3125rem] font-extralight ${baseTextStyle} mt-4`}>
            <TranslateHtml
              i18nKey="automotive.caseStudy.levers.content"
              components={{ 1: BoldText }}
            />
          </p> */}
          <ul className="list-disc ml-6 space-y-4">
            {/* List 1 (No bolding in original) */}
             {renderTransListItem('levers', 0)}
             {renderTransListItem('levers', 1)}
             {renderTransListItem('levers', 2)}
             {renderTransListItem('levers', 3)}
          
          </ul>
        </div>
      </div>

      {/* Keep it private and traceable Section */}
      <p className={`text-xs sm:text-sm md:text-base lg:text-lg xl92r:text-[1.125rem] 2xl:text-[1.3125rem] font-regular ${baseTextStyle} mt-4`}>
        {t('automotive.caseStudy.traceability.heading')}
      </p>
      {/* Using TranslateHtml for Traceability Content */}
      <p className={`text-xs sm:text-sm md:text-base lg:text-lg xl92r:text-[1.125rem] 2xl:text-[1.3125rem] font-extralight ${baseTextStyle} mt-0`}>
        <TranslateHtml
          i18nKey="automotive.caseStudy.traceability.content"
          components={{ 1: BoldText }}
        />
      </p>

      {/* How it looks with our AI platform Section */}
      <p className={`text-xs sm:text-sm md:text-base lg:text-lg xl92r:text-[1.125rem] 2xl:text-[1.3125rem] font-regular font-deca leading-[2.4375rem] mt-10 tracking-[0.03em] ml-2 text-[#000000]`}>
        {t('automotive.caseStudy.aiPlatform.heading')}
      </p>
      <ul className="list-disc ml-6">
        {/* AI Platform List 1 (Importance map) */}
        <li className={`text-xs  sm:text-sm md:text-base lg:text-lg xl92r:text-[1.125rem] 2xl:text-[1.3125rem] font-extralight ml-4 ${baseTextStyle} mb-10`}>
          {t('automotive.caseStudy.aiPlatform.list.0')}
        </li>
      </ul>
        {code === "Japanese"?  <ResponsiveImage id="automotivej1" alt="automotivej1" className=' w-full h-full py-10' /> :  <ResponsiveImage id="automotive1" alt="automotive1" className='w-full h-full py-10' />}
       <ul className="list-disc ml-6">

        {/* Using TranslateHtml for AI Platform List 2 */}
        <li className={`text-xs sm:text-sm md:text-base lg:text-lg xl92r:text-[1.125rem] 2xl:text-[1.3125rem] font-extralight font-deca leading-[2.4375rem] mt-4 tracking-[0.03em] ml-4 text-[#000000]`}>
          <TranslateHtml
            i18nKey="automotive.caseStudy.aiPlatform.list.1"
            components={{ 1: BoldText }}
          />
        </li>
        
        {/* Using TranslateHtml for AI Platform List 3 */}
       <li className={`
  text-[0.958rem]
  md:text-[0.958rem]
  lg:text-[1.0925rem]
  xl92r:text-[1.198rem]
  2xl:text-[1.4375rem]
  font-extralight font-deca leading-[2.4375rem] mt-4 tracking-[0.03em] ml-4 text-[#000000]`}>
  <TranslateHtml
    i18nKey="automotive.caseStudy.aiPlatform.list.2"
    components={{ 1: BoldText }}
  />
</li>
      </ul>

      {/* Image and Caption Group */}
      <div className='flex flex-col items-center justify-center mt-20'>
        <ResponsiveImage id="automotive2" alt="automotive2" className='w-full h-full pt-10' />
        <p className="text-xs sm:text-sm md:text-[0.75rem] lg:text-[0.8125rem] xl92r:text-[0.875rem] 2xl:text-[0.9375rem] ml-2 text-[#000000] font-extralight font-deca pb-10 leading-[2.4375rem] mt-4 tracking-[0.03em] max-w-4xl text-center">
          {t('automotive.caseStudy.imageCaption')}
        </p>
      </div>

      {/* What does this mean? Section */}
      <p className={`text-xs sm:text-sm md:text-base lg:text-lg xl92r:text-[1.25rem] 2xl:text-[1.4375rem] font-regular ${baseTextStyle} mt-4`}>
        {t('automotive.caseStudy.meaning.heading')}
      </p>
      <ul className="list-disc ml-6">
        {/* Simple items, direct t() call is fine */}
        <li className={`text-xs sm:text-sm md:text-base lg:text-lg xl92r:text-[1.25rem] 2xl:text-[1.4375rem] ml-4 font-extralight ${baseTextStyle} mt-0`}>
          {t('automotive.caseStudy.meaning.list.0')}
        </li>
        <li className={`text-xs sm:text-sm md:text-base lg:text-lg xl92r:text-[1.25rem] 2xl:text-[1.4375rem] ml-4 font-extralight ${baseTextStyle} mt-0`}>
          {t('automotive.caseStudy.meaning.list.1')}
        </li>
      </ul>

      {/* Results in manufacturing Section */}
      <p className={`text-xs sm:text-sm md:text-base lg:text-lg xl92r:text-[1.25rem] 2xl:text-[1.4375rem] font-regular ${baseTextStyle} mt-4`}>
        {t('automotive.caseStudy.resultsManufacturing.heading')}
      </p>
      <ul className="list-disc ml-6">
        {/* Simple items, direct t() call is fine */}
          {renderTransListItem('resultsManufacturing', 0)}
            {renderTransListItem('resultsManufacturing', 1)}
              {renderTransListItem('resultsManufacturing', 2)}
        {/* <li className={`text-sm md:text-[1.4375rem] font-extralight ml-4 ${baseTextStyle} mt-0`}>
          {t('automotive.caseStudy.resultsManufacturing.list.0')}
        </li>
        <li className={`text-sm md:text-[1.4375rem] font-extralight ml-4 ${baseTextStyle} mt-0`}>
          {t('automotive.caseStudy.resultsManufacturing.list.1')}
        </li>
        <li className={`text-sm md:text-[1.4375rem] font-extralight ml-4 ${baseTextStyle} mt-0`}>
          {t('automotive.caseStudy.resultsManufacturing.list.2')}
        </li> */}
      </ul>

      {/* Quote 1 */}
      <div className='flex justify-center my-10'>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl md:text-[1.6667rem] lg:text-[1.9000rem] xl92r:text-[2.0833rem] 2xl:text-[2.5rem] text-[#000000B2] italic font-bold font-nunito leading-[2.4375rem] mt-4 tracking-[0.01em] text-center">
          {t('automotive.caseStudy.quote1')}
        </p>
      </div>

      {/* Product choices Section */}
      <p className={`text-xs sm:text-sm md:text-base lg:text-lg xl92r:text-[1.25rem] 2xl:text-[1.4375rem] font-regular ${baseTextStyle} mt-4`}>
        {t('automotive.caseStudy.productChoices.heading')}
      </p>
      <ul className="list-disc ml-6">
        {/* Using renderTransListItem for Product Choices */}
        {renderTransListItem('productChoices', 0)}
        {renderTransListItem('productChoices', 1)}
        {renderTransListItem('productChoices', 2)}
      </ul>

      {/* Quote 2 */}
      <div className='flex justify-center my-10'>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl92r:text-[2rem] 2xl:text-[2.5rem] ml-2 text-[#000000B2] italic font-bold font-nunito leading-[2.4375rem] mt-4 tracking-[0.01em] text-center">
          {t('automotive.caseStudy.quote2')}
        </p>
      </div>

      {/* Business Value Section */}
      <p className={`text-xs sm:text-sm md:text-base lg:text-lg xl92r:text-[1.25rem] 2xl:text-[1.4375rem] font-regular ${baseTextStyle} mt-4`}>
        {t('automotive.caseStudy.businessValue.heading')}
      </p>
      <ul className="list-disc ml-6">
        {/* Using renderTransListItem for Business Value */}
        {renderTransListItem('businessValue', 0)}
        {renderTransListItem('businessValue', 1)}
        {renderTransListItem('businessValue', 2)}
      </ul>

      {/* Final Results Section */}
      <p className={`text-xs sm:text-sm md:text-base lg:text-lg xl92r:text-[1.25rem] 2xl:text-[1.4375rem] font-regular ${baseTextStyle} mt-10`}>
        {t('automotive.caseStudy.finalResults.heading')}
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
              {t('automotive.caseStudy.finalResults.table.headers.area')}
            </th>
            <th 
              scope="col"
              className="w-1/3 px-2 sm:px-3 md:px-4 lg:px-5 xl92r:px-6 py-2 text-left text-xs sm:text-sm md:text-base lg:text-lg md:text-[0.9583rem] lg:text-[1.0925rem] xl92r:text-[1.1979rem] 2xl:text-[1.4375rem] font-medium text-gray-800 opacity-58 xl92r:tracking-[0.07em] xl92r:leading-[2.3125rem]"
            >
              {t('automotive.caseStudy.finalResults.table.headers.before')}
            </th>
            <th 
              scope="col"
              className="w-1/3 px-2 sm:px-3 md:px-4 lg:px-5 xl92r:px-6 py-2 text-left text-xs sm:text-sm md:text-base lg:text-lg md:text-[0.9583rem] lg:text-[1.0925rem] xl92r:text-[1.1979rem] 2xl:text-[1.4375rem] font-medium text-gray-800 opacity-58 xl92r:tracking-[0.07em] xl92r:leading-[2.3125rem]"
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
              <td className=" px-0 sm:px-1 md:px-2 lg:px-4 xl92r:px-6 py-2 text-xs sm:text-sm md:text-base lg:text-lg md:text-[1.0000rem] lg:text-[1.1400rem] xl92r:text-[1.2500rem] 2xl:text-[1.5rem] font-light text-black text-center opacity-100">
                {row.area}
              </td>

              {/* Column 2: Before (Image 1/4 + Text 3/4 Layout) */}
              <td className="px-0 py-2 font-light text-black opacity-100">
                <div className="flex items-center">
                  <div className="w-1/4 flex justify-center items-center">
                    <ResponsiveImage id={tableTypes[index]} alt='type'/>
                  </div>
                  <div className="w-3/4 text-xs sm:text-sm md:text-base lg:text-lg md:text-[0.8333rem] lg:text-[0.9500rem] xl92r:text-[1.0417rem] 2xl:text-[1.25rem] text-left">
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
      <div className='flex justify-center mt-20 mb-10'>
        <p className="text-base sm:text-lg md:text-xl lg:text-[1.5rem] md:text-[1.4583rem] lg:text-[1.6625rem] xl92r:text-[1.8229rem] 2xl:text-[2.1875rem] ml-2 text-[#000000B2] italic max-w-6xl pb-40 font-bold font-nunito leading-[100%] mt-4 tracking-[0.02em] text-center">
          {t('automotive.caseStudy.finalQuote')}
        </p>
      </div>
    </div>
  );
}

export default Automotive;
