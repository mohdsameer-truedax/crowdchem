import { useTranslation } from "../../i18n/useTranslation";
import { useNavigate } from 'react-router-dom';

const Collaborate = () => {
  const { t, code } = useTranslation();
  const navigate = useNavigate()
  return (
    <div>
      <section className="body-font " style={{ backgroundColor: "#E5E5E5" }}>
        <div className=" mx-auto flex px-5 py-24 items-center justify-center flex-col">
          <div className="text-center  w-full flex flex-col items-center">
            <h2 className="title-font md:text-[2.625rem] mb-4 sm:mb-6 md:mb-8 lg:mb-10 text-2xl sm:text-3xl md:text-[2.0833rem] lg:text-[2.3750rem] xl92r:text-[2.6042rem] 2xl:text-[3.125rem] lg:leading-[4.75rem] xl92r:leading-[5.2rem] 2xl:leading-[6.25rem]  tracking-[0.00em] text-5xl font-semibold text-black font-nunito"
              style={{ color: "#121212" }}>{t('collaborate.title')}</h2>
            <p className="leading-[3.4375rem] text-black text-[1.25rem] 
    sm:text-[1.25rem] 
    md:text-[1.25rem] 
    lg:text-[1.425rem] 
    xl92r:text-[1.5625rem] 
    2xl:text-[1.875rem] font-deca font-extralight  md:leading-[3.75rem] lg:leading-[3.4375rem] w-full md:max-w-[40rem] lg:max-w-[45rem] xl92r:max-w-[50rem] 2xl:max-w-[62rem] tracking-[0.08em]">
              {t('collaborate.subtitle')}
            </p>
            <br/>
            <p className="mb-4 sm:mb-6 md:mb-8 lg:mb-10 leading-[3.4375rem] text-black  font-deca font-extralight ttext-[1.25rem] 
    sm:text-[1.25rem] 
    md:text-[1.25rem] 
    lg:text-[1.425rem] 
    xl92r:text-[1.5625rem] 
    2xl:text-[1.875rem] md:leading-[3.75rem] lg:leading-[3.4375rem]  tracking-[0.08em]">{t('collaborate.desc')}</p>
            <button onClick={() => { navigate(`/contact?lang=${code || 'eng'}`); }} className="inline-flex font-light cursor-pointer md:text-[1.4583rem] lg:text-[1.6625rem] xl92r:text-[1.8229rem] 2xl:text-[2.1875rem] md:leading-[5.5rem]  tracking-[0.04em] items-center font-deca gap-2 border-3 border-gray-900 px-6 focus:outline-none hover:bg-white rounded-lg text-xl">
              {t('collaborate.cta')}
              <svg width="49" height="23" viewBox="0 0 49 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M48.0607 12.1066C48.6464 11.5208 48.6464 10.571 48.0607 9.98524L38.5147 0.439297C37.9289 -0.14649 36.9792 -0.14649 36.3934 0.439297C35.8076 1.02508 35.8076 1.97483 36.3934 2.56062L44.8787 11.0459L36.3934 19.5312C35.8076 20.117 35.8076 21.0667 36.3934 21.6525C36.9792 22.2383 37.9289 22.2383 38.5147 21.6525L48.0607 12.1066ZM0 11.0459L0 12.5459L47 12.5459V11.0459V9.5459L0 9.5459L0 11.0459Z" fill="#090909" />
              </svg>
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Collaborate