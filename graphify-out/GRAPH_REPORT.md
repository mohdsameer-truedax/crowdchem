# Graph Report - .  (2026-04-20)

## Corpus Check
- 107 files · ~56,153 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 189 nodes · 140 edges · 75 communities detected
- Extraction: 89% EXTRACTED · 11% INFERRED · 0% AMBIGUOUS · INFERRED: 15 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_SEO Sitemap|SEO Sitemap]]
- [[_COMMUNITY_Email API Handler|Email API Handler]]
- [[_COMMUNITY_Embed UI|Embed UI]]
- [[_COMMUNITY_Responsive Utils|Responsive Utils]]
- [[_COMMUNITY_Image Translation|Image Translation]]
- [[_COMMUNITY_Form Validation|Form Validation]]
- [[_COMMUNITY_Error Boundary|Error Boundary]]
- [[_COMMUNITY_MDX Utilities|MDX Utilities]]
- [[_COMMUNITY_JSON-LD Schema|JSON-LD Schema]]
- [[_COMMUNITY_App Entry|App Entry]]
- [[_COMMUNITY_Server Config|Server Config]]
- [[_COMMUNITY_Image Component|Image Component]]
- [[_COMMUNITY_Analytics|Analytics]]
- [[_COMMUNITY_Translation Provider|Translation Provider]]
- [[_COMMUNITY_Navigation|Navigation]]
- [[_COMMUNITY_Counter Widget|Counter Widget]]
- [[_COMMUNITY_Embed Processing|Embed Processing]]
- [[_COMMUNITY_Email Validator|Email Validator]]
- [[_COMMUNITY_A11y Checker|A11y Checker]]
- [[_COMMUNITY_Accessible Image|Accessible Image]]
- [[_COMMUNITY_Flex Image Text|Flex Image Text]]
- [[_COMMUNITY_Lang Wrapper|Lang Wrapper]]
- [[_COMMUNITY_Scroll Hook|Scroll Hook]]
- [[_COMMUNITY_Scroll Top|Scroll Top]]
- [[_COMMUNITY_Telemetry|Telemetry]]
- [[_COMMUNITY_Responsive Background|Responsive Background]]
- [[_COMMUNITY_Scroll Hash|Scroll Hash]]
- [[_COMMUNITY_GA Listener|GA Listener]]
- [[_COMMUNITY_Translation Hook|Translation Hook]]
- [[_COMMUNITY_Language Detection|Language Detection]]
- [[_COMMUNITY_Cert Redirect|Cert Redirect]]
- [[_COMMUNITY_News Post|News Post]]
- [[_COMMUNITY_Home Page|Home Page]]
- [[_COMMUNITY_Contact Page|Contact Page]]
- [[_COMMUNITY_Automotive Page|Automotive Page]]
- [[_COMMUNITY_Materials Page|Materials Page]]
- [[_COMMUNITY_Email Handler|Email Handler]]
- [[_COMMUNITY_Send Email|Send Email]]
- [[_COMMUNITY_Sitemap Meta|Sitemap Meta]]
- [[_COMMUNITY_Entry Point|Entry Point]]
- [[_COMMUNITY_ESLint|ESLint]]
- [[_COMMUNITY_Server|Server]]
- [[_COMMUNITY_Vite Types|Vite Types]]
- [[_COMMUNITY_News Content|News Content]]
- [[_COMMUNITY_Analytics Wrapper|Analytics Wrapper]]
- [[_COMMUNITY_Footer|Footer]]
- [[_COMMUNITY_Constants|Constants]]
- [[_COMMUNITY_Translations|Translations]]
- [[_COMMUNITY_HTML Translate|HTML Translate]]
- [[_COMMUNITY_Japanese Lang|Japanese Lang]]
- [[_COMMUNITY_English Lang|English Lang]]
- [[_COMMUNITY_Spanish Lang|Spanish Lang]]
- [[_COMMUNITY_French Lang|French Lang]]
- [[_COMMUNITY_German Lang|German Lang]]
- [[_COMMUNITY_Not Found|Not Found]]
- [[_COMMUNITY_Server Error|Server Error]]
- [[_COMMUNITY_Offline|Offline]]
- [[_COMMUNITY_Industries|Industries]]
- [[_COMMUNITY_Pillars|Pillars]]
- [[_COMMUNITY_Collaborate|Collaborate]]
- [[_COMMUNITY_News|News]]
- [[_COMMUNITY_Hero|Hero]]
- [[_COMMUNITY_Headquarters|Headquarters]]
- [[_COMMUNITY_Form Schema|Form Schema]]
- [[_COMMUNITY_Index|Index]]
- [[_COMMUNITY_Use Studies|Use Studies]]
- [[_COMMUNITY_Cosmetics|Cosmetics]]
- [[_COMMUNITY_Amplify|Amplify]]
- [[_COMMUNITY_Global Types|Global Types]]
- [[_COMMUNITY_Latest Updates|Latest Updates]]
- [[_COMMUNITY_Case Study|Case Study]]
- [[_COMMUNITY_Tests|Tests]]
- [[_COMMUNITY_Backend|Backend]]
- [[_COMMUNITY_Punycode|Punycode]]
- [[_COMMUNITY_Resource|Resource]]

## God Nodes (most connected - your core abstractions)
1. `handler()` - 9 edges
2. `Map()` - 8 edges
3. `update_file_content()` - 4 edges
4. `MDXErrorBoundary` - 4 edges
5. `reactNodeToText()` - 4 edges
6. `useTranslation()` - 4 edges
7. `calculate_responsive_sizes()` - 3 edges
8. `process_tsx_files()` - 3 edges
9. `textToSlug()` - 3 edges
10. `getElementId()` - 3 edges

## Surprising Connections (you probably didn't know these)
- `getAllowedOrigins()` --calls--> `Map()`  [INFERRED]
  amplify/sendEmail/handler.ts → src/pages/Contact/Map.tsx
- `buildHreflangs()` --calls--> `Map()`  [INFERRED]
  scripts/generateSitemap.ts → src/pages/Contact/Map.tsx
- `configureServer()` --calls--> `configureAPIServer()`  [INFERRED]
  vite.config.ts → src/server/Server.ts
- `handler()` --calls--> `validateRFCEmail()`  [INFERRED]
  src/api/send-email.ts → amplify/sendEmail/handler.ts
- `getAllPosts()` --calls--> `Map()`  [INFERRED]
  src/mdx/loadMdxPosts.ts → src/pages/Contact/Map.tsx

## Communities

### Community 0 - "SEO Sitemap"
Cohesion: 0.14
Nodes (8): Faqs(), buildHreflangs(), generateSitemapIndex(), getLanguages(), run(), getAllPosts(), Map(), highlightText()

### Community 1 - "Email API Handler"
Cohesion: 0.27
Nodes (11): buildCorsHeaders(), errorResponse(), escapeHtml(), getAllowedOrigins(), getErrorMessage(), handler(), parseBody(), sendWithResend() (+3 more)

### Community 2 - "Embed UI"
Cohesion: 0.2
Nodes (0): 

### Community 3 - "Responsive Utils"
Cohesion: 0.28
Nodes (8): calculate_responsive_sizes(), extract_rem_value(), process_tsx_files(), Process all TSX files in the directory, Calculate responsive sizes based on 2xl value, Extract rem value from text like '1.875rem' or '[1.875rem], Update all rem-based properties in the file content, update_file_content()

### Community 4 - "Image Translation"
Cohesion: 0.25
Nodes (4): JsonLoader(), ResponsiveImage(), useTranslation(), TranslationPage()

### Community 5 - "Form Validation"
Cohesion: 0.36
Nodes (5): handleBlur(), handleCategoryChange(), handleSubmit(), validateField(), validateForm()

### Community 6 - "Error Boundary"
Cohesion: 0.4
Nodes (1): MDXErrorBoundary

### Community 7 - "MDX Utilities"
Cohesion: 0.8
Nodes (4): getElementId(), getHeadingId(), reactNodeToText(), textToSlug()

### Community 8 - "JSON-LD Schema"
Cohesion: 0.7
Nodes (4): buildStaticJsonLd(), generateJsonLd(), getLanguages(), run()

### Community 9 - "App Entry"
Cohesion: 0.5
Nodes (0): 

### Community 10 - "Server Config"
Cohesion: 0.5
Nodes (2): configureAPIServer(), configureServer()

### Community 11 - "Image Component"
Cohesion: 0.5
Nodes (2): getAssetUrl(), MdxImage()

### Community 12 - "Analytics"
Cohesion: 0.5
Nodes (2): loadGA(), handleConsent()

### Community 13 - "Translation Provider"
Cohesion: 0.5
Nodes (2): TranslationProvider(), useLanguageSwitcher()

### Community 14 - "Navigation"
Cohesion: 0.67
Nodes (0): 

### Community 15 - "Counter Widget"
Cohesion: 0.67
Nodes (0): 

### Community 16 - "Embed Processing"
Cohesion: 0.67
Nodes (0): 

### Community 17 - "Email Validator"
Cohesion: 1.0
Nodes (0): 

### Community 18 - "A11y Checker"
Cohesion: 1.0
Nodes (0): 

### Community 19 - "Accessible Image"
Cohesion: 1.0
Nodes (0): 

### Community 20 - "Flex Image Text"
Cohesion: 1.0
Nodes (0): 

### Community 21 - "Lang Wrapper"
Cohesion: 1.0
Nodes (0): 

### Community 22 - "Scroll Hook"
Cohesion: 1.0
Nodes (0): 

### Community 23 - "Scroll Top"
Cohesion: 1.0
Nodes (0): 

### Community 24 - "Telemetry"
Cohesion: 1.0
Nodes (0): 

### Community 25 - "Responsive Background"
Cohesion: 1.0
Nodes (0): 

### Community 26 - "Scroll Hash"
Cohesion: 1.0
Nodes (0): 

### Community 27 - "GA Listener"
Cohesion: 1.0
Nodes (0): 

### Community 28 - "Translation Hook"
Cohesion: 1.0
Nodes (0): 

### Community 29 - "Language Detection"
Cohesion: 1.0
Nodes (0): 

### Community 30 - "Cert Redirect"
Cohesion: 1.0
Nodes (0): 

### Community 31 - "News Post"
Cohesion: 1.0
Nodes (0): 

### Community 32 - "Home Page"
Cohesion: 1.0
Nodes (0): 

### Community 33 - "Contact Page"
Cohesion: 1.0
Nodes (0): 

### Community 34 - "Automotive Page"
Cohesion: 1.0
Nodes (0): 

### Community 35 - "Materials Page"
Cohesion: 1.0
Nodes (0): 

### Community 36 - "Email Handler"
Cohesion: 1.0
Nodes (0): 

### Community 37 - "Send Email"
Cohesion: 1.0
Nodes (0): 

### Community 38 - "Sitemap Meta"
Cohesion: 1.0
Nodes (0): 

### Community 39 - "Entry Point"
Cohesion: 1.0
Nodes (0): 

### Community 40 - "ESLint"
Cohesion: 1.0
Nodes (0): 

### Community 41 - "Server"
Cohesion: 1.0
Nodes (0): 

### Community 42 - "Vite Types"
Cohesion: 1.0
Nodes (0): 

### Community 43 - "News Content"
Cohesion: 1.0
Nodes (0): 

### Community 44 - "Analytics Wrapper"
Cohesion: 1.0
Nodes (0): 

### Community 45 - "Footer"
Cohesion: 1.0
Nodes (0): 

### Community 46 - "Constants"
Cohesion: 1.0
Nodes (0): 

### Community 47 - "Translations"
Cohesion: 1.0
Nodes (0): 

### Community 48 - "HTML Translate"
Cohesion: 1.0
Nodes (0): 

### Community 49 - "Japanese Lang"
Cohesion: 1.0
Nodes (0): 

### Community 50 - "English Lang"
Cohesion: 1.0
Nodes (0): 

### Community 51 - "Spanish Lang"
Cohesion: 1.0
Nodes (0): 

### Community 52 - "French Lang"
Cohesion: 1.0
Nodes (0): 

### Community 53 - "German Lang"
Cohesion: 1.0
Nodes (0): 

### Community 54 - "Not Found"
Cohesion: 1.0
Nodes (0): 

### Community 55 - "Server Error"
Cohesion: 1.0
Nodes (0): 

### Community 56 - "Offline"
Cohesion: 1.0
Nodes (0): 

### Community 57 - "Industries"
Cohesion: 1.0
Nodes (0): 

### Community 58 - "Pillars"
Cohesion: 1.0
Nodes (0): 

### Community 59 - "Collaborate"
Cohesion: 1.0
Nodes (0): 

### Community 60 - "News"
Cohesion: 1.0
Nodes (0): 

### Community 61 - "Hero"
Cohesion: 1.0
Nodes (0): 

### Community 62 - "Headquarters"
Cohesion: 1.0
Nodes (0): 

### Community 63 - "Form Schema"
Cohesion: 1.0
Nodes (0): 

### Community 64 - "Index"
Cohesion: 1.0
Nodes (0): 

### Community 65 - "Use Studies"
Cohesion: 1.0
Nodes (0): 

### Community 66 - "Cosmetics"
Cohesion: 1.0
Nodes (0): 

### Community 67 - "Amplify"
Cohesion: 1.0
Nodes (0): 

### Community 68 - "Global Types"
Cohesion: 1.0
Nodes (0): 

### Community 69 - "Latest Updates"
Cohesion: 1.0
Nodes (0): 

### Community 70 - "Case Study"
Cohesion: 1.0
Nodes (0): 

### Community 71 - "Tests"
Cohesion: 1.0
Nodes (0): 

### Community 72 - "Backend"
Cohesion: 1.0
Nodes (0): 

### Community 73 - "Punycode"
Cohesion: 1.0
Nodes (0): 

### Community 74 - "Resource"
Cohesion: 1.0
Nodes (0): 

## Knowledge Gaps
- **4 isolated node(s):** `Calculate responsive sizes based on 2xl value`, `Extract rem value from text like '1.875rem' or '[1.875rem]`, `Update all rem-based properties in the file content`, `Process all TSX files in the directory`
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Email Validator`** (2 nodes): `validateRFCEmail()`, `emailValidator.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `A11y Checker`** (2 nodes): `MDXAccessibilityChecker()`, `MDXAccessibilityChecker.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Accessible Image`** (2 nodes): `AccessibleImage()`, `Image.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Flex Image Text`** (2 nodes): `FlexImageText()`, `FlexIamgeText.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Lang Wrapper`** (2 nodes): `LangWrapper()`, `LangWrapper.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Scroll Hook`** (2 nodes): `useScroll.tsx`, `useScrollToId()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Scroll Top`** (2 nodes): `ScrollToTop()`, `ScrolltoTop.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Telemetry`** (2 nodes): `telemetry.tsx`, `logEvent()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Responsive Background`** (2 nodes): `ResponsiveBackground()`, `ResponsiveBackground.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Scroll Hash`** (2 nodes): `ScrollToHash()`, `ScrollToHash.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `GA Listener`** (2 nodes): `GAListener()`, `GAListener.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Translation Hook`** (2 nodes): `useTranslation.tsx`, `useTranslation()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Language Detection`** (2 nodes): `detectLanguageFromBrowser()`, `languageDetector.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Cert Redirect`** (2 nodes): `CertRedirect()`, `CertRedirect.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `News Post`** (2 nodes): `NewsPost()`, `NewsPost.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Home Page`** (2 nodes): `Home()`, `index.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Contact Page`** (2 nodes): `Contact()`, `Index.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Automotive Page`** (2 nodes): `renderTransListItem()`, `Automotive.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Materials Page`** (2 nodes): `renderInterpListItem()`, `AdvancedMaterials.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Email Handler`** (2 nodes): `sendEmail()`, `EmailHandler.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Send Email`** (2 nodes): `handler()`, `sendEmail.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Sitemap Meta`** (2 nodes): `formatDateForSitemap()`, `generateMeta.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Entry Point`** (2 nodes): `main()`, `index.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `ESLint`** (1 nodes): `eslint.config.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Server`** (1 nodes): `server.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Vite Types`** (1 nodes): `vite-env.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `News Content`** (1 nodes): `NewsContent.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Analytics Wrapper`** (1 nodes): `AnalyticsWrapper.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Footer`** (1 nodes): `Footer.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Constants`** (1 nodes): `constant.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Translations`** (1 nodes): `translations.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `HTML Translate`** (1 nodes): `TranslateHtml.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Japanese Lang`** (1 nodes): `Japanese.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `English Lang`** (1 nodes): `English.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Spanish Lang`** (1 nodes): `Spanish.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `French Lang`** (1 nodes): `French.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `German Lang`** (1 nodes): `Deutsch.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Not Found`** (1 nodes): `NotFound.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Server Error`** (1 nodes): `ServerError.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Offline`** (1 nodes): `Offline.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Industries`** (1 nodes): `Industries.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Pillars`** (1 nodes): `Pillars.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Collaborate`** (1 nodes): `Collaborate.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `News`** (1 nodes): `News.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Hero`** (1 nodes): `Hero.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Headquarters`** (1 nodes): `HeadQuarter.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Form Schema`** (1 nodes): `FormSchema.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Index`** (1 nodes): `index.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Use Studies`** (1 nodes): `UseStudies.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Cosmetics`** (1 nodes): `Cosmetics.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Amplify`** (1 nodes): `amplify.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Global Types`** (1 nodes): `global.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Latest Updates`** (1 nodes): `LatestUpdates.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Case Study`** (1 nodes): `CaseStudy.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Tests`** (1 nodes): `loadMdxPosts.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Backend`** (1 nodes): `backend.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Punycode`** (1 nodes): `punycode.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Resource`** (1 nodes): `resource.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Map()` connect `SEO Sitemap` to `Email API Handler`, `Image Translation`, `MDX Utilities`?**
  _High betweenness centrality (0.039) - this node is a cross-community bridge._
- **Why does `getAllowedOrigins()` connect `Email API Handler` to `SEO Sitemap`?**
  _High betweenness centrality (0.020) - this node is a cross-community bridge._
- **Why does `TranslationPage()` connect `Image Translation` to `SEO Sitemap`?**
  _High betweenness centrality (0.014) - this node is a cross-community bridge._
- **Are the 7 inferred relationships involving `Map()` (e.g. with `getAllPosts()` and `reactNodeToText()`) actually correct?**
  _`Map()` has 7 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Calculate responsive sizes based on 2xl value`, `Extract rem value from text like '1.875rem' or '[1.875rem]`, `Update all rem-based properties in the file content` to the rest of the system?**
  _4 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `SEO Sitemap` be split into smaller, more focused modules?**
  _Cohesion score 0.14 - nodes in this community are weakly interconnected._