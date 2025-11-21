import { useState, useRef, useEffect, useCallback, type ChangeEvent, useMemo } from "react";
// import {type ReactNode } from "react";
import FlexSearch, { Document as FlexDocument } from "flexsearch";
import debounce from "lodash.debounce";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useTranslation } from "../i18n/useTranslation";
// import TranslationPage from "../i18n/TranslationPage";
import { ResponsiveImage } from "../utils/ResponsiveImage";
import Footer from "./Footer";

type SearchDoc = {
  id: string;
  sourceId: number;
  page: string;
  anchor: string;
  title: string;
  caption: string;
  author: string;
  keywords: string;
  phonetic: string;
  excerpt: string;
  url: string;
  publicUrl: string;
  caseIndex?: number;
  lang?: string;
}

interface SearchBlock {
  field: string;
  result: string[];
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, code } = useTranslation();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchDoc[]>([]);
  
  const params = new URLSearchParams(location.search);
  const qLang = params.get("lang");
  const currentLang = qLang || (code || "English").toLowerCase().slice(0, 3);

  // Build route with ?lang preserved/updated (skip for English)
  const buildRoute = (path: string) => {
    const cleanedPath = path.replace(/^\/+/, "");
    const base = `/${cleanedPath}`.replace(/\/+/g, "/");
    
    // Don't add lang param for English
    if (currentLang === 'eng' || currentLang === 'en' || code === 'English') {
      return base;
    }
    
    const next = new URLSearchParams(location.search);
    next.set("lang", currentLang);
    const qs = next.toString();
    return qs ? `${base}?${qs}` : base;
  };

  const indexRef = useRef<FlexDocument<SearchDoc, false, false> | null>(null);
  const docsRef = useRef<SearchDoc[] | null>(null);
  const loadedLangRef = useRef<string | null>(null);

  const normalize = (s: string) => s.toLowerCase().replace(/[^a-z\s]/g, "");

  const loadIndex = useCallback(async (): Promise<void> => {
        if (loadedLangRef.current === code) return;

        const [, docsResp]: [unknown, SearchDoc[]] = await Promise.all([
            fetch("/search/index.json").then((r) => r.json()),
            fetch("/search/docs.json").then((r) => r.json()),
        ]);
        
        const filteredDocs = docsResp.filter((doc) => 
            !doc.lang || doc.lang === code
        );

        // 4. Initialize FlexSearch Index
        const idx = new FlexSearch.Document<SearchDoc>({
            document: {
                id: "id",
                index: ["title", "caption", "author", "keywords", "phonetic"],
                store: ["id", "sourceId", "page", "anchor", "title", "excerpt", "author", "caption"],
            },
            tokenize: "forward",
            resolution: 9,
        });

        // 5. Add only the filtered documents to the index
        filteredDocs.forEach((doc) => {
            const phonetic = doc.phonetic
                ? normalize(doc.phonetic)
                : normalize(doc.title);
            idx.add({ ...doc, phonetic } as SearchDoc);
        });

        indexRef.current = idx;
        docsRef.current = filteredDocs.map((doc) => ({
            ...doc,
            phonetic: doc.phonetic ? normalize(doc.phonetic) : normalize(doc.title),
        }));
        loadedLangRef.current = code;
    }, [code]);
  const runSearch = useMemo(
    () =>
      debounce(async (q: string) => {
        if (!q.trim()) {
          setResults([]);
          return;
        }

        await loadIndex();
        if (!indexRef.current || !docsRef.current) return;

        const idx = indexRef.current;
        const docs = docsRef.current;

        const normalizedQuery = normalize(q);
        let textRes: SearchBlock[] = [];
        let phonRes: SearchBlock[] = [];

        try {
          textRes = (await idx.searchAsync(q, {
            field: ["title", "caption", "author", "keywords"],
            limit: 30,
          })) as SearchBlock[];
        } catch (err) {
          console.error("❌ textRes search error:", err);
        }

        try {
          phonRes = (await idx.searchAsync(normalizedQuery, {
            field: ["phonetic"],
            limit: 30,
          })) as SearchBlock[];
        } catch (err) {
          console.error("❌ phonRes search error:", err);
        }

        const usecaseKeywords = ["use", "studies"];
        const isUsecaseSearch = usecaseKeywords.some((word) =>
          normalizedQuery.includes(word)
        );

        let merged: SearchDoc[];

        if (isUsecaseSearch) {
          merged = docs.filter((d) => d.page === "/usecases");
        } else {
          const idSet = new Set<string>();
          [...textRes, ...phonRes].forEach((block) => {
            block.result.forEach((id) => idSet.add(id));
          });

          const allResults = Array.from(idSet)
            .slice(0, 25)
            .map((id) => docs.find((d) => d.id === id))
            .filter((d): d is SearchDoc => d !== undefined);

          // Separate by type: Use Cases, LinkedIn, Twitter, Others
          const useCases = allResults.filter((d) => d.page === "/usecases");
          const linkedin = allResults.filter((d) => d.page.includes('/linkedin/'));
          const twitter = allResults.filter((d) => d.page.includes('/twitter/'));
          const others = allResults.filter((d) => 
            d.page !== "/usecases" && 
            !d.page.includes('/linkedin/') && 
            !d.page.includes('/twitter/')
          );

          // Combine: Use Cases first, then LinkedIn, then Twitter, then others
          merged = [...useCases, ...linkedin, ...twitter, ...others];
        }

        setResults(merged);
      }, 220),
    [loadIndex]
  );

  useEffect(() => {
    runSearch(query);
    return () => runSearch.cancel();
  }, [query, runSearch]);

  const handleSelect = useCallback(
    (result: SearchDoc) => {
      if (result.page === '/usecases' && result.caseIndex) {
        onClose();
        const langParam = code === "English" ? "" : `?lang=${currentLang}`;
        navigate(`/usecases${langParam}#${result.anchor}`, { 
          state: { openCaseIndex: result.caseIndex, searchQuery: query } 
        });
        return;
      }

      if (result.page.includes('/twitter/') || result.page.includes('/linkedin/')) {
        window.open(result.publicUrl, '_blank');
        onClose();
        return;
      }

      if (window.location.pathname === new URL(result.page, window.location.origin).pathname) {
        const el = document.getElementById(result.anchor);
        if (el) {
          onClose();
          el.scrollIntoView({ behavior: "smooth", block: "center" });
          return;
        }
      }
      
      onClose();
      const langParam = code === "English" ? "" : `?lang=${currentLang}`;
      navigate(`${result.page}${langParam}#${result.anchor}`);
    },
    [navigate, onClose, currentLang, code, query]
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      loadIndex();
    } else {
      document.body.style.overflow = "unset";
      setQuery("");
      setResults([]);
      
      // Remove lang param from URL if English when closing modal
      if (code === 'English' || currentLang === 'eng' || currentLang === 'en') {
        const params = new URLSearchParams(location.search);
        if (params.has('lang')) {
          params.delete('lang');
          const newSearch = params.toString();
          const newUrl = `${location.pathname}${newSearch ? `?${newSearch}` : ''}${location.hash}`;
          navigate(newUrl, { replace: true });
        }
      }
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, loadIndex, code, currentLang, location, navigate]);

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 bg-background1 overflow-y-auto h-full min-h-screen">
      {/* Header */}

      <div className="flex items-start  sm:items-center justify-between px-2 sm:px-0 p-6 sm:p-6 lg:p-8 xl92r:p-0 px-0 sm:px-4 lg:px-8 xl92r:px-12 2xl:px-16">
        <Link to={buildRoute("/")} onClick={onClose}>
          <ResponsiveImage
            id="logo" 
            alt={t("alt.logo")}
            className="h-8 w-auto sm:h-20 sm:w-60 lg:h-auto lg:w-[20rem] xl92r:h-auto xl92r:w-[21.25rem] 2xl:h-auto 2xl:w-[22.75rem] transition-all duration-200"
          />
        </Link>
        <div className="flex items-center space-x-6 pr-4 sm:pr-0">
          <div  onClick={onClose} className="text-[1.15rem] sm:text-[3.75rem] pt-2 sm:pt-0 xl92r:text-[4.0625rem] font-deca font-light cursor-pointer text-[#FCA311] hover:text-yellow-800 leading-[1] sm:leading-[1.5] transition-colors duration-200">X</div>
          {/* <FiX
           
            className="text-[60px] xl:text-[65px] font-deca font-light cursor-pointer text-yellow-600 hover:text-yellow-800 transition-colors duration-200"
          /> */}
         {/* <div className="pt-1 sm:pt-0"> <TranslationPage /></div> */}

        </div>
      </div>

      {/* Search Content */}
      <div className="px-4  md:px-6 lg:px-12 xl92r:px-16 py-2 sm:py-10">
        <h1 className="font-regular text-[0.69rem] md:text-[2.0833rem] lg:text-[2.3750rem] xl92r:text-[2.6042rem] 2xl:text-[3.125rem] sm:leading-[3.75rem] tracking-[0.08em] mb-0.5 sm:mb-6 text-white font-nunito">
          {t("search.title")}
        </h1>

        <div className="searchbox font-deca">
          <input
            type="search"
            aria-label="Search the site"
            placeholder="Search"
            value={query}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setQuery(e.target.value)
            }
            className="w-[83.84vw] sm:w-full bg-[#36454F] font-extralight border border-yellow-600 rounded-lg pl-1 sm:px-4 py-1 sm:py-4 md:py-5 text-white placeholder-gray-400 focus:outline-none transition-colors text-[0.63rem] sm:text-[1.875rem] md:text-[1.6667rem] lg:text-[1.9000rem] xl92r:text-[2.0833rem] 2xl:text-[2.5rem] sm:leading-[3.75rem] tracking-[0.08em] [&::-webkit-search-cancel-button]:scale-50 sm:[&::-webkit-search-cancel-button]:scale-100"
            autoFocus
          />

          <div className="sm:mt-10 mt-5 grid sm:gap-6 font-nunito">
            {query.length > 0 && (
              results.length === 0 ? (
                <p className="text-white text-[0.7rem] md:text-[1.6667rem] lg:text-[1.9000rem] xl92r:text-[2.0833rem] 2xl:text-[2.5rem] text-center sm:leading-[3.75rem] tracking-0.08em font-semibold">
                  {t("search.noresult")} “{query.toLocaleUpperCase()}”...
                </p>
              ) : (
                <p className="text-white text-[0.7rem] md:text-[1.6667rem] lg:text-[1.9000rem] xl92r:text-[2.0833rem] 2xl:text-[2.5rem] sm:leading-[3.75rem] tracking-0.08em font-semibold">
                  {t("search.result")} “{query.toLocaleUpperCase()}”...
                </p>
              )
            )}

            {results.map((r) => {
              const highlightText = (text: string) => {
                if (!query.trim()) return text;
                const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
                const parts = text.split(regex);
                return parts.map((part, i) => 
                  regex.test(part) ? <mark key={i} className="bg-yellow-400 text-black">{part}</mark> : part
                );
              };
              
              return (
                <div
                  key={r.id}
                  onClick={() => handleSelect(r)}
                  className="hover:text-yellow-600 transition-all mt-5 sm:mt-0 duration-300 text-white cursor-pointer"
                >
                  <h2 className="text-[0.75rem] sm:text-3xl font-nunito font-bold sm:mb-2 md:text-[2.0833rem] lg:text-[2.3750rem] xl92r:text-[2.6042rem] 2xl:text-[3.125rem] sm:leading-[3.75rem] tracking-0.08em">
                    {r.page === '/usecases' ? <>USE CASES</> : 
                     r.page.includes('/twitter/') ? <>TWITTER</> :
                     r.page.includes('/linkedin/') ? <>LINKEDIN</> : <>OTHER</>}
                     {/*i resolved the home page bug , all three use case padding is done from my side and i started working on mobile
                      responsiveness for usecase page.
                     */}
                  </h2>
                  <h2 className="text-[0.75rem] sm:text-3xl font-deca font-medium mb-3 sm:mb-2 md:text-[1.875rem] lg:text-[2.1375rem] xl92r:text-[2.3438rem] 2xl:text-[2.8125rem] leading-[1.75] sm:leading-[3.75rem] tracking-0.08em">
                    {highlightText(r.title)}
                  </h2>
                  <p className="text-[0.75rem] sm:text-lg mb-4 font-deca md:text-[1.6667rem] lg:text-[1.9000rem] xl92r:text-[2.0833rem] 2xl:text-[2.5rem] leading-[1.75] sm:leading-12 tracking-0.08em font-light">
                    {highlightText(r.excerpt)}...
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      
      </div>
      <div className={`${!results || results.length === 0 ? "mt-[100%]" : "mt-10 sm:mt-[20%]"}`}>
        <Footer/>
      </div>  
    </div>
  );
}