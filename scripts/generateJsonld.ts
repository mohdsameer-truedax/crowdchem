import fs from "fs-extra";
import path from "path";
import "dotenv/config";
import { pathToFileURL } from "url";

const DIST_DIR = path.join(process.cwd(), "public/jsonld");
const BASE_URL = process.env.VITE_BASE_URL;

interface Language {
  code: string;
  native: string;
}

const I18N_DIR = path.join(process.cwd(), "src/i18n/translations");

//
// ✅ Load available languages dynamically
//
async function getLanguages(): Promise<Language[]> {
  const files = await fs.readdir(I18N_DIR);
  const langs: Language[] = [];

  for (const file of files) {
    if (!file.endsWith(".ts")) continue;
    const code = path.basename(file, ".ts");
    const filePath = path.join(I18N_DIR, file);
    const moduleUrl = pathToFileURL(filePath).href;

    try {
      const mod = await import(moduleUrl);
      const obj = mod.default || mod[code];
      const native = obj?.native?.lang || code;
      langs.push({ code, native });
    } catch (err) {
      console.warn(`⚠️ Could not import ${file}:`, err);
    }
  }

  return langs;
}



//
// ✅ Build Static Page JSON-LD
//
function buildStaticJsonLd(page: string, lang: Language) {
  const urlPath = page || "/";
  const langParam = `?lang=${lang.code.toLowerCase().slice(0,3)}`;
  const fullUrl = `${BASE_URL}${urlPath}${langParam}`;
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "url": fullUrl,
    "inLanguage": lang.code,
    "name": page === "" ? "Home" : page.replace("/", ""),
    "isPartOf": {
      "@type": "WebSite",
      "name": "CrowdChem",
      "url": BASE_URL,
    },
  };
}

//
// ✅ Generate JSON-LD files
//
async function generateJsonLd(langs: Language[]) {
  await fs.ensureDir(DIST_DIR);
  const allEntries: string[] = [];

  //
  // 🌐 STATIC PAGES (localized)
  //
  for (const lang of langs) {
    const langCode = lang.code.toLowerCase().slice(0, 3);
    const langDir = path.join(DIST_DIR, langCode);
    await fs.ensureDir(langDir);

    const staticPages = ["", "/usecases", "/contact"];
    for (const page of staticPages) {
      const jsonld = buildStaticJsonLd(page, lang);
      const fileName = page === "" ? "index.json" : `${page.replace("/", "")}.json`;
      const filePath = path.join(langDir, fileName);
      await fs.writeJson(filePath, jsonld, { spaces: 2 });
      allEntries.push(`${langCode}/${fileName}`);
    }
  }

  //
  // 🧩 Write Global Index File
  //
  const indexPath = path.join(DIST_DIR, "index.json");
  await fs.writeJson(indexPath, allEntries, { spaces: 2 });

  console.log(`✅ JSON-LD generated for ${langs.length} languages (${allEntries.length} files).`);
  console.log(`📦 Index written at: ${indexPath}`);
}

//
// ✅ Run Everything
//
async function run() {
  const langs = await getLanguages();
  await generateJsonLd(langs);
}

run().catch((err) => {
  console.error("❌ JSON-LD generation failed:", err);
  process.exit(1);
});
