import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "../../i18n/useTranslation";
import { contactSchema, contactCategories, type ContactFormData } from "./schema/FormSchema";
import { Analytics } from "../../utils/Analytics";

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const Form = () => {
  const { t } = useTranslation();
  // Amplify Function URL for sending email
  const AMPLIFY_FUNCTION_URL = "https://rrizrod4zz76k2i37ujasraqva0ziwaj.lambda-url.eu-north-1.on.aws/";
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    company: "",
    category: "partnerships",
    message: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  // 💡 UTILITY: Maps static category ID to its translated label
  const getTranslatedCategoryLabel = useCallback((category: typeof contactCategories[number]): string => {
      let translationKey: string;
      
      switch (category) {
          case 'partnerships':
              translationKey = 'contact.category1';
              break;
          case 'sales':
              translationKey = 'contact.category2';
              break;
          case 'recruitment':
              translationKey = 'contact.category3';
              break;
          case 'press':
              translationKey = 'contact.category4';
              break;
          default:
              // 🚀 FIXED: Call the new helper function, which expects a string.
              // We pass 'category' which is a string literal, resolving the type error.
              return capitalize(category);
      }
      return t(translationKey);
  }, [t]);

  // ✅ validate a single field on blur
  const validateField = <K extends keyof ContactFormData>(field: K, value: ContactFormData[K]) => {
    const result = contactSchema.pick({ [field]: true }).safeParse({ [field]: value });
    if (!result.success) {
      const firstError = result.error.issues[0]?.message;
      if (firstError) {
        setErrors((prev) => ({ ...prev, [field]: firstError }));
      }
    } else {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }
  };

  // ✅ validate full form on submit
  const validateForm = () => {
    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
      result.error.issues.forEach((issue) => {
        const path = issue.path[0] as keyof ContactFormData;
        if (path) fieldErrors[path] = issue.message;
      });
      setErrors(fieldErrors);
      return false;
    }

    setErrors({});
    return true;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value } as Pick<ContactFormData, keyof ContactFormData>));
  };

 const handleBlur = <K extends keyof ContactFormData>(
  e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
) => {
  const { name, value } = e.target;
  validateField(name as K, value as ContactFormData[K]);
};


  const handleCategoryChange = (categoryId: ContactFormData["category"]) => {
    setFormData((prev) => ({ ...prev, category: categoryId }));
    validateField("category", categoryId);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    const name = formData.name;
    const email = formData.email;

    Analytics.track({ type: "contact_submit", name, email });
    if (!validateForm()) return;

    setLoading(true);
    setSuccess(null);

    try {
      const res = await fetch(AMPLIFY_FUNCTION_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(formData),
        credentials: "include"
      });

      const data = await res.json();
      if (res.ok) {
        setSuccess("✅ Message sent successfully!");
        setFormData({
          name: "",
          email: "",
          company: "",
          category: "partnerships",
          message: "",
        });
      } else {
        const errorMsg = data.message || data.detail || "Failed to send message.";
        setSuccess(`❌ ${errorMsg}`);
      }
    } catch {
      setSuccess("❌ Network error. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = "Contact Us - CrowdChem";
    const meta = document.querySelector("meta[name='description']");
    if (meta)
      meta.setAttribute(
        "content",
        "Get in touch with the CrowdChem team for collaboration and partnership opportunities."
      );
  }, []);

  const isInvalid = Object.keys(errors).length > 0 || !formData.name || !formData.email;

  return (
    <>
    <div className="pt-20 md:pt-26 lg:pt-[6.21vh]  sm:px-4 md:px-8  sm:pl-8 md:pl-12 lg:pl-20  bg-background1 -mb-1 font-deca">
      <div className="w-full lg:pt-[9.03vh]">
      <div className="text-white mb-4 sm:mb-6 md:mb-8 pl-3 sm:pl-0 lg:mb-[7.23vh] text-left" id="contact-hero">
  <h1 className="title-font font-medium 
  text-[1.5rem]
    sm:text-[2.5rem]            
    md:text-[2.5rem]         
    lg:text-[2.85rem]       
    xl92r:text-[3.125rem]       
    2xl:text-[3.75rem]     
    leading-[1]
    sm:leading-[1.67]
     tracking-[0.04em] font-nunito">
    {t("footer.contactUs")}
  </h1>
  <p className="
    text-[0.688rem]            
    sm:text-[1.5rem]         
    md:text-[1.0rem]         
    lg:text-[1.14rem]        
    xl92r:text-[1.25rem]        
    2xl:text-[1.5rem]        
    font-deca leading-[2.5] tracking-[0.08em] font-extralight">
    {t("contact.subtitle")}
  </p>
</div>

        <form
          onSubmit={handleSubmit}
          method="POST"
          action="#"
          className="border border-white mx-auto sm:mx-0 rounded-2xl py-4 md:py-6 lg:py-[1.98vh] p-6 pl-4.5 sm:pl-6 md:pl-12 lg:pl-12 pr-4 sm:pr-8 md:pr-[3.75rem] lg:pr-[3.75rem] shadow-2xl max-w-[89.75vw] md:max-w-[55.21rem] lg:max-w-[62.1rem] xl92r:max-w-[69rem] 2xl:max-w-[82.8125rem] bg-background1 font-deca"
        >
          {/* Category */}
          <div className="mb-4 sm:mb-10 md:mb-16 lg:mb-[4.12vh]">
            <div className="flex flex-col md:flex-row md:flex-wrap gap-2 sm:gap-4 md:gap-16 desktop:gap-26 md:items-center md:justify-start">
              <span className="text-white text-[0.7rem] sm:text-sm md:text-[0.9583rem] lg:text-[1.0925rem] xl92r:text-[1.1979rem] 2xl:text-[1.4375rem] leading-[2.5] tracking-[0.08em] font-extralight">
                {t("contact.category")}
              </span>
              <div className="flex flex-wrap gap-4 md:contents">
                {contactCategories.map((cat) => (
                  <label key={cat} className="flex items-center gap-2 sm:gap-6 cursor-pointer">
                    <input
                      type="radio"
                      name="category"
                      value={cat}
                      checked={formData.category === cat}
                      onChange={() => handleCategoryChange(cat)}
                      className="sr-only"
                    />
                    <div className="w-2.5 h-2.5 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-full border-2 border-white flex items-center justify-center">
                      {formData.category === cat && (
                        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 rounded-full bg-white"></div>
                      )}
                    </div>
                    <span className="text-white text-[0.7rem] sm:text-sm md:text-base md:text-[0.8333rem] lg:text-[0.9500rem] xl92r:text-[1.0417rem] 2xl:text-[1.25rem] leading-[2.5]tracking-[0.08em] font-extralight">
                     {getTranslatedCategoryLabel(cat)}
                    </span>
                  </label>
                ))}
              </div>
            </div>
            {errors.category && <p className="text-red-500 text-xs mt-2">{errors.category}</p>}
          </div>

          {/* Inputs */}
          {["name", "email", "company"].map((field) => (
            <div className="mb-4 md:mb-[1.125rem] 2xl:mb-[1.125rem]" key={field}>
              <label
                htmlFor={field}
                className="block text-white text-[0.7rem] sm:text-sm md:text-base font-normal sm:mb-2 md:mb-3 2xl:mb-3 leading-[2] sm:leading-[3.75] tracking-[0.08em]"
              >
                {t(`contact.${field}`)}
              </label>
              <input
                type={field === "email" ? "email" : "text"}
                id={field}
                name={field}
                value={formData[field as keyof ContactFormData]}
                onChange={handleInputChange}
                onBlur={handleBlur}
                placeholder={`${t("contact.your")} ${t(`contact.${field}`)}`}
                className={`w-full h-[2.96vh] lg:h-[4.76rem] xl92r:h-[5.25rem] 2xl:h-[6.31rem] bg-[#36454F] font-extralight font-deca border rounded-[0.375rem] sm:rounded-[1.375rem] px-2 sm:px-4 md:px-[1.5625rem] 2xl:px-[1.5625rem sm:py-4 md:py-[1.375rem] 2xl:py-[1.375rem] text-white placeholder-gray-400 focus:outline-none transition-colors text-[0.675rem] sm:text-sm md:text-[1.0000rem] lg:text-[1.1400rem] xl92r:text-[1.2500rem] 2xl:text-[1.5rem] sm:leading-[2.5] tracking-[0.08em]
                  ${errors[field as keyof ContactFormData] ? "border-red-500 focus:border-red-500" : "border-background2 focus:border-[#3a5168]"}`}
              />
              {errors[field as keyof ContactFormData] && (
                <p className="text-red-500 text-[0.55rem] sm:text-xs mt-1 sm:mt-2">{errors[field as keyof ContactFormData]}</p>
              )}
            </div>
          ))}

          {/* Message */}
          <div className="mb-3 sm:mb-6 md:mb-8 lg:mb-[2.625rem] 2xl:mb-[2.625rem]">
            <label
              htmlFor="message"
              className="block text-white text-[0.7rem] sm:text-sm md:text-base font-normal sm:mb-2 md:text-[0.8333rem] lg:text-[0.9500rem] xl92r:text-[1.0417rem] 2xl:text-[1.25rem] leading-[2.5] tracking-[0.08em]"
            >
              {t("contact.message")}
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              onBlur={handleBlur}
              placeholder={`${t("contact.your")} ${t("contact.message")}`}
              rows={6}
              className={`w-full h-[14.81vh] sm:h-64 lg:h-[25.84rem]  xl92r:h-[28.33rem] 2xl:h-[34.0rem] font-extralight bg-[#36454F] border rounded-[0.375rem] sm:rounded-[1.375rem] px-2 sm:px-4 py-1 sm:py-4 md:py-5 text-white placeholder-gray-400 focus:outline-none transition-colors resize-none text-[0.675rem] sm:text-sm md:text-[1.4375rem] sm:leading-[2.5] tracking-[0.08em]
                ${errors.message ? "border-red-500 focus:border-red-500" : "border-background2 focus:border-[#3a5168]"}`}
            />
            {errors.message && <p className="text-red-500 text-[0.55rem] sm:text-xs mt-2">{errors.message}</p>}
          </div>

          {/* Submit */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading || isInvalid}
              className={`bg-[#D9D9D9] text-background2 cursor-pointer px-5.5 sm:px-15 py-0.5 md:py-0 rounded-[0.375rem] sm:rounded-[1.125rem] shadow-lg transition-all text-[0.7rem] sm:text-sm md:text-base lg:text-[1.4375rem] leading-[2.5] tracking-[0.08em] font-regular
                ${loading || isInvalid
                  ? "opacity-50 cursor-not-allowed"
                  : ""
                }`}
            >
              {loading ? "Sending..." : t("contact.send")}
            </button>
          </div>

          {success && (
            <p className={`mt-4 text-[0.5rem] sm:text-sm ${success.startsWith("✅") ? "text-green-400" : "text-red-400"}`}>
              {success}
            </p>
          )}
        </form>

      <p className="mt-6 sm:mt-8  pb-8
  sm:pb-10 md:pb-16 lg:pb-[4.125rem] 2xl:pb-[4.125rem] 
  w-[66.66vw] sm:w-full mx-auto sm:mx-0
  text-white text-center md:text-left 
  text-[0.7rem]
  sm:text-[0.958rem]            
  md:text-[0.958rem]         
  lg:text-[1.0925rem]        
  xl92r:text-[1.198rem]         
  2xl:text-[1.4375rem]       
  leading-[1.5]
  sm:leading-[2.5] tracking-[0.08em] font-extralight font-deca">
  {t("contact.description")}{" "}
  <span className="font-semibold cursor-pointer">{t("contact.mail")}</span>
</p>

        <hr className="border-white mx-12 sm:mx-40 pb-10 md:pb-16 lg:pb-[4.6875rem] 2xl:pb-[4.6875rem] " />
      </div>
           
    </div>
    </>
  );
};

export default Form;