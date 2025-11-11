import { useTranslation } from "../../i18n/useTranslation";

import { ResponsiveImage } from "../../utils/ResponsiveImage";
import FeedEmbed from "./FeedEmbed";


const News = () => {
  const { t } = useTranslation();
  return (
    <section className="px-4 md:px-6 lg:px-10 xl92r:px-12 pt-4 pb-6 border-t-14 border-b-14 border-[#FCA311] bg-white overflow-hidden">
      {/* Header */}
      <div className=" items-center mb-8 flex-wrap gap-4">
        <div className="flex justify-between items-center" id='news'>
          <p className="text-xl md:text-[1.25rem] lg:text-[1.4250rem] xl92r:text-[1.5625rem] 2xl:text-[1.875rem] lg:leading-[6.25rem]  tracking-[0.00em] font-deca font-normal"
          style={{color:"#363636"}}>{t("news.subtitle")}</p>
          <div className="inline-flex cursor-pointer gap-2">
            <a href="https://www.linkedin.com/company/crowdchem" target="_blank" rel="noopener noreferrer">
              <ResponsiveImage id="linkedln" alt="linkedln" className="rounded-xl p-4 w-auto h-12 sm:h-10 md:h-[3.12rem] lg:h-[3.51rem] xl92r:h-[3.9rem] 2xl:h-[4.6875rem] bg-background2"/>
            </a>
            <a href="https://x.com/CrowdChem" target="_blank" rel="noopener noreferrer">
              <ResponsiveImage id="cross" alt="cross" className="rounded-xl p-4 w-auto  h-12 sm:h-10 md:h-[3.12rem] lg:h-[3.51rem] xl92r:h-[3.9rem] 2xl:h-[4.6875rem] bg-background2"/>
            </a>
          </div>
        </div>
      </div>
<FeedEmbed/>
     
    </section>
  );
};

export default News;
