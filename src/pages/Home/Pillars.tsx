//pillars
import { useTranslation } from "../../i18n/useTranslation";
import { ResponsiveImage } from "../../utils/ResponsiveImage";

const Pillars = () => {
  const { t } = useTranslation();

  return (
    <div>
      <section className="body-font  px-[1.31rem] sm:px-12 md:px-8 xl92r:px-14  2xl:pl-[4.375rem] pb-6 sm:pb-12"
      style={{backgroundColor:"#091B37"}}>
        <div className="py-[1.25rem] lg:py-[2.7rem] xl92r:py-[3rem] 2xl:py-[3.625rem] mx-auto flex flex-wrap items-center">
          <div id='pillars'>
            <h1 className="title-font font-semibold text-[1.125rem] leading-[2.5rem] md:text-[1.4583rem] lg:text-[1.6625rem] xl92r:text-[1.8229rem] 2xl:text-[2.1875rem] md:text-[2.5000rem] lg:text-[2.8500rem] xl92r:text-[3.1250rem] 2xl:text-[3.75rem] lg:leading-[6.25rem]  tracking-[0.05em] font-nunito text-white">{t('pillars.title')} </h1>
          </div>
        </div>
        <div className="mx-auto font-deca">
          <div className="flex items-center lg:w-3/5 mx-auto  mb-[2.75rem] lg:mb-[2.7rem] xl92r:mb-[3rem] 2xl:mb-[3.625rem] border-gray-200 sm:flex-row flex-col">
            <div className="sm:mr-10  inline-flex items-center justify-center rounded-full text-indigo-500 shrink-0"
             >
              <ResponsiveImage id='neural' alt="neural" className="h-[5.4375rem] w-[5.4375rem] lg:h-[10.73rem] lg:w-[10.73rem] xl92r:h-[11.77rem] xl92r:w-[11.77rem] 2xl:h-[14.125rem] 2xl:w-[14.125rem] "/>
            </div>
            <div className="flex-grow sm:text-left  text-center mt-[0.8125rem] sm:mt-0 text-white">
              <h2 className="text-[0.875rem] md:text-[0.8333rem] lg:text-[0.9500rem] xl92r:text-[1.0417rem] 2xl:text-[1.25rem] md:text-[1.1667rem] lg:text-[1.3300rem] xl92r:text-[1.4583rem] 2xl:text-[1.75rem] leading-[1.5rem] xl92r:leading-[1.875rem] 2xl:leading-[3rem] tracking-[0.08em] title-font font-medium mb-0 2xl:mb-2">{t('pillars.gnn')}</h2>
              <p className="text-[0.875rem]  w-[19rem] md:w-full xl:w-[37.66rem] xl92r:w-[41.29rem] 2xl:w-[49.56rem] md:text-[0.8333rem] lg:text-[0.9500rem] xl92r:text-[1.0417rem] 2xl:text-[1.25rem] md:text-[0.8750rem] lg:text-[0.9975rem] xl92r:text-[1.0938rem] 2xl:text-[1.3125rem] leading-[1.5rem] xl92r:leading-[1.875rem] 2xl:leading-[2.1875rem] tracking-[0.08em] rounded-lg font-light">{t('pillars.gnnDesc')}</p>
            </div>
          </div>
           <div className="flex items-center lg:w-3/5 mx-auto  mb-[2.75rem] lg:mb-[2.7rem] xl92r:mb-[3rem] 2xl:mb-[3.625rem] border-gray-200 sm:flex-row flex-col">
            <div className="sm:mr-10  inline-flex items-center justify-center rounded-full  text-indigo-500 shrink-0"
             >
                 <ResponsiveImage
                       id="pillar2" alt="neural" className="h-[5.4375rem] w-[5.4375rem] lg:h-[10.73rem] lg:w-[10.73rem] xl92r:h-[11.77rem] xl92r:w-[11.77rem] 2xl:h-[14.125rem] 2xl:w-[14.125rem]"/>
            </div>
            <div className="flex-grow sm:text-left text-center mt-[0.8125rem] sm:mt-0 text-white">
              <h2 className="text-[0.875rem] md:text-[0.8333rem] lg:text-[0.9500rem] xl92r:text-[1.0417rem] 2xl:text-[1.25rem] md:text-[1.1667rem] lg:text-[1.3300rem] xl92r:text-[1.4583rem] 2xl:text-[1.75rem] leading-[1.5rem] xl92r:leading-[1.875rem] 2xl:leading-[3rem] tracking-[0.08em] title-font font-medium mb-0 2xl:mb-2">{t('pillars.data')}</h2>
              <p className="text-[0.875rem] w-[19rem] md:w-full xl:w-[37.66rem] xl92r:w-[41.29rem] 2xl:w-[49.56rem] md:text-[0.8333rem] lg:text-[0.9500rem] xl92r:text-[1.0417rem] 2xl:text-[1.25rem] md:text-[0.8750rem] lg:text-[0.9975rem] xl92r:text-[1.0938rem] 2xl:text-[1.3125rem] leading-[1.5rem] xl92r:leading-[1.875rem] 2xl:leading-[2.1875rem] tracking-[0.08em]  rounded-lg  font-light">{t('pillars.dataDesc')}</p>
            </div>
          </div>
           <div className="flex items-center lg:w-3/5 mx-auto mb-[1.125rem]  sm:mb-10 border-gray-200 sm:flex-row flex-col">
            <div className=" sm:mr-10 inline-flex items-center justify-center rounded-full  text-indigo-500 shrink-0"
             >
              <ResponsiveImage
                       id="pillar3" alt="neural" className="h-[5.4375rem] w-[5.4375rem] lg:h-[10.73rem] lg:w-[10.73rem] xl92r:h-[11.77rem] xl92r:w-[11.77rem] 2xl:h-[14.125rem] 2xl:w-[14.125rem]"/>
            </div>
            <div className="flex-grow sm:text-left text-center mt-[0.8125rem] sm:mt-0 text-white">
              <h2 className="text-[0.875rem] md:text-[0.8333rem] lg:text-[0.9500rem] xl92r:text-[1.0417rem] 2xl:text-[1.25rem] md:text-[1.1667rem] lg:text-[1.3300rem] xl92r:text-[1.4583rem] 2xl:text-[1.75rem] leading-[1.5rem] xl92r:leading-[1.875rem] 2xl:leading-[3rem] tracking-[0.08em] title-font font-medium mb-0 2xl:mb-2">{t('pillars.analysis')}</h2>
              <p className="text-[0.875rem]  w-[19rem] md:w-full xl:w-[37.66rem] xl92r:w-[41.29rem] 2xl:w-[49.56rem] md:text-[0.8333rem] lg:text-[0.9500rem] xl92r:text-[1.0417rem] 2xl:text-[1.25rem] md:text-[0.8750rem] lg:text-[0.9975rem] xl92r:text-[1.0938rem] 2xl:text-[1.3125rem] leading-[1.5rem] xl92r:leading-[1.875rem] 2xl:leading-[2.1875rem] tracking-[0.08em]  rounded-lg  font-light">{t('pillars.analysisDesc')}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Pillars