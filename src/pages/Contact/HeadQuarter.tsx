import { useTranslation } from "../../i18n/useTranslation"
// import { Map } from "./Map";

const HeadQuarter = () => {
  const { t } = useTranslation();
  return (
    <div >
      <section className="text-gray-600 body-font pb-20 sm:pb-0 px-4 md:px-8 lg:px-20  xl:px-20 pb-6 md:pb-8 lg:pb-[2.625rem] 2xl:pb-[2.625rem] bg-background1 font-deca">
        <div className="mx-auto  lg:text-[2.375rem] lg:leading-[3.75rem]  tracking-[0.08em] ">
          <div className="text-white" id='headquarters'>
            <h1 className="title-font font-medium text-[1rem] md:text-[1.2500rem] lg:text-[1.4250rem] xl92r:text-[1.5625rem] 2xl:text-[1.875rem] lg:leading-[6.25rem]  tracking-[0.04em]  font-nunito mb-6 sm:mb-0">
              {t('contact.ourheadquarter')}
            </h1>
            <div className='flex flex-wrap mb-8 sm:mb-12'>
               <div className="sm:w-[30vw] lg:w-[25vw] xl:w-[21.70vw] mb-4 sm:mb-0">
            <p className="text-[0.875rem] md:text-[0.8333rem] lg:text-[0.9500rem] xl92r:text-[1.0417rem] 2xl:text-[1.25rem] leading-[1.5] sm:leading-[1.875rem] tracking-[0.08em] font-medium font-deca">
              {t('contact.globalheadquarter')}
            </p>
                        <p className="text-[0.875rem]  md:text-[0.8333rem] lg:text-[0.9500rem] xl92r:text-[1.0417rem] 2xl:text-[1.25rem] leading-[1.5] sm:leading-[1.875rem] tracking-[0.08em] font-light font-deca">CrowdChem Ltd </p>
            <p className="text-[0.875rem] md:text-[0.8333rem] lg:text-[0.9500rem] xl92r:text-[1.0417rem] 2xl:text-[1.25rem] leading-[1.5] sm:leading-[1.875rem] tracking-[0.08em] font-light font-deca">Japan, </p>
            <p className="text-[0.875rem] md:text-[0.8333rem] lg:text-[0.9500rem] xl92r:text-[1.0417rem] 2xl:text-[1.25rem] leading-[1.5] sm:leading-[1.875rem] tracking-[0.08em] font-light font-deca">〒140-0013 Tokyo, </p>
            <p className="text-[0.875rem] md:text-[0.8333rem] lg:text-[0.9500rem] xl92r:text-[1.0417rem] 2xl:text-[1.25rem] leading-[1.5] sm:leading-[1.875rem] tracking-[0.08em] font-light font-deca">Shinagawa City, Minamioi,  </p>
            <p className="text-[0.875rem] md:text-[0.8333rem] lg:text-[0.9500rem] xl92r:text-[1.0417rem] 2xl:text-[1.25rem] leading-[1.5] sm:leading-[1.875rem] tracking-[0.08em] font-light font-deca">6 Chome−16−4 </p>
            <p className="text-[0.875rem] md:text-[0.8333rem] lg:text-[0.9500rem] xl92r:text-[1.0417rem] 2xl:text-[1.25rem] leading-[1.5] sm:leading-[1.875rem] tracking-[0.08em] font-light font-deca">戸浪大森ビル 6F</p>
          </div>
            <div className="h-[35.23vw] w-[92.74vw] sm:w-[55.55vw] sm:h-[37.51vh] overflow-hidden grayscale">
             <iframe
  title="location"
  src="https://maps.google.com/maps?q=35.60651,139.74094&z=15&output=embed"
  width="100%"
  height="100%"
  style={{ border: 0 }}
  allowFullScreen
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
/>

              {/* <Map /> */}
            </div>
           </div>
              <div className='flex flex-wrap'>
               <div className="sm:w-[30vw] lg:w-[25vw] xl:w-[21.70vw] mb-4 sm:mb-0">
            <p className="text-[0.875rem]  md:text-[0.8333rem] lg:text-[0.9500rem] xl92r:text-[1.0417rem] 2xl:text-[1.25rem] leading-[1.5] sm:leading-[1.875rem] tracking-[0.08em] font-medium font-deca">
              {t('contact.europe')}
            </p>
            <p className="text-[0.875rem]  md:text-[0.8333rem] lg:text-[0.9500rem] xl92r:text-[1.0417rem] 2xl:text-[1.25rem] leading-[1.5] sm:leading-[1.875rem] tracking-[0.08em] font-light font-deca">CrowdChem Ltd </p>
            <p className="text-[0.875rem]  md:text-[0.8333rem] lg:text-[0.9500rem] xl92r:text-[1.0417rem] 2xl:text-[1.25rem] leading-[1.5] sm:leading-[1.875rem] tracking-[0.08em] font-light font-deca">17-21 Rue Saint Fiacre </p>
            <p className="text-[0.875rem]  md:text-[0.8333rem] lg:text-[0.9500rem] xl92r:text-[1.0417rem] 2xl:text-[1.25rem] leading-[1.5] sm:leading-[1.875rem] tracking-[0.08em] font-light font-deca">75002 Paris</p>
            <p className="text-[0.875rem]  md:text-[0.8333rem] lg:text-[0.9500rem] xl92r:text-[1.0417rem] 2xl:text-[1.25rem] leading-[1.5] sm:leading-[1.875rem] tracking-[0.08em] font-light font-deca">993 104 355 R.C.S. Paris </p>
          </div>
            <div className="h-[35.23vw] w-[92.74vw]  sm:w-[55.55vw] sm:h-[37.51vh] overflow-hidden grayscale">
             <iframe
  title="location"
  src="https://maps.google.com/maps?q=48.8710,2.3456&z=15&output=embed"
  width="100%"
  height="100%"
  style={{ border: 0 }}
  allowFullScreen
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
/>

              {/* <Map /> */}
            </div>
           </div>
          </div>
        </div>
         <div className="pb-[20vh] sm:pb-[40vh]"></div>
      </section>
     
    </div>
  )
}
// enn

export default HeadQuarter