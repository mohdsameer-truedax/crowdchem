import { useTranslation } from "../../i18n/useTranslation"
// import { Map } from "./Map";

const HeadQuarter = () => {
  const { t } = useTranslation();
  return (
    <div >
      <section className="text-gray-600 body-font px-4 md:px-8 lg:px-12 xl92r:px-16 pb-6 md:pb-8 lg:pb-[2.625rem] 2xl:pb-[2.625rem] bg-background1 font-deca">
        <div className="mx-auto  lg:text-[2.375rem] lg:leading-[3.75rem]  tracking-[0.08em] ">
          <div className="text-white" id='headquarters'>
            <h1 className="title-font font-medium text-xl md:text-xl md:text-[1.2500rem] lg:text-[1.4250rem] xl92r:text-[1.5625rem] 2xl:text-[1.875rem] lg:leading-[6.25rem]  tracking-[0.04em]  font-nunito">
              {t('contact.ourheadquarter')}
            </h1>
            <div className="h-[52.5rem] max-w-[52.5rem] lg:max-w-[59rem] xl92r:max-w-[65.62rem] 2xl:max-w-[78.75rem] lg:h-[59rem] xl92r:h-[65.62rem] 2xl:h-[78.75rem] rounded-lg overflow-hidden grayscale">
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
            <p className="mt-10 md:mt-16 lg:mt-15 2xl:mt-20 md:text-[0.8333rem] lg:text-[0.9500rem] xl92r:text-[1.0417rem] 2xl:text-[1.25rem] leading-[1.875rem] tracking-[0.08em] font-medium font-deca">
              {t('contact.globalheadquarter')}
            </p>
            <p className="md:text-[0.8333rem] lg:text-[0.9500rem] xl92r:text-[1.0417rem] 2xl:text-[1.25rem] leading-[1.875rem] tracking-[0.08em] font-light font-deca">Japan, </p>
            <p className="md:text-[0.8333rem] lg:text-[0.9500rem] xl92r:text-[1.0417rem] 2xl:text-[1.25rem] leading-[1.875rem] tracking-[0.08em] font-light font-deca">〒140-0013 Tokyo, </p>
            <p className="md:text-[0.8333rem] lg:text-[0.9500rem] xl92r:text-[1.0417rem] 2xl:text-[1.25rem] leading-[1.875rem] tracking-[0.08em] font-light font-deca">Shinagawa City, Minamioi,  </p>
            <p className="md:text-[0.8333rem] lg:text-[0.9500rem] xl92r:text-[1.0417rem] 2xl:text-[1.25rem] leading-[1.875rem] tracking-[0.08em] font-light font-deca">6 Chome−16−4 </p>
            <p className="md:text-[0.8333rem] lg:text-[0.9500rem] xl92r:text-[1.0417rem] 2xl:text-[1.25rem] leading-[1.875rem] tracking-[0.08em] font-light font-deca">戸浪大森ビル 6F</p>
          </div>
        </div>
      </section>
    </div>
  )
}
// enn

export default HeadQuarter