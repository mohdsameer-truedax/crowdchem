import { useEffect } from 'react';
import { useTranslation } from '../i18n/useTranslation';
import { useLocation, useSearchParams } from 'react-router-dom';

const JsonLoader = () => {
  const { code } = useTranslation(); // e.g. 'English', 'French', etc.
  const location = useLocation();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    let jsonUrl = '';
    const path = location.pathname.toLowerCase();
    const langCode = code.toLowerCase().slice(0, 3); // e.g. 'eng', 'jap', 'fre'

    // 📰 NEWS pages
    if (path.startsWith('/news/')) {
      const slug = path.split('/').pop(); // e.g. "first-post"
      jsonUrl = `/jsonld/news/${slug}.json`;
    } 
    // 🌐 Static site pages (localized)
    else {
      const pathParts = path.split('/').filter(Boolean); // ['contact'] or []
      let page = 'index';

      if (pathParts.length >= 1) page = pathParts[0]; // e.g. 'contact', 'usecases', etc.

      jsonUrl = `/jsonld/${langCode}/${page}.json`;
    }


    fetch(jsonUrl)
      .then(res => {
        if (!res.ok) throw new Error('JSON-LD file not found');
        return res.json();
      })
      .then(jsonLdData => {
        // Remove any existing JSON-LD
        const existing = document.querySelector(`script[data-jsonld]`);
        if (existing) existing.remove();

        // Inject new JSON-LD
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.dataset.jsonld = 'true';
        script.text = JSON.stringify(jsonLdData);
        document.head.appendChild(script);
      })
      .catch(err => console.warn("JSON-LD error:", err));
  }, [location.pathname, searchParams, code]);

  return null;
};

export default JsonLoader;