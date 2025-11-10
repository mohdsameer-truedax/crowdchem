import fs from "fs-extra";
import path from "path";
import 'dotenv/config';
import { pathToFileURL } from "url";

const DIST_DIR = path.join(process.cwd(), "dist");
const BASE_URL = process.env.VITE_BASE_URL;

interface Language {
  code: string;   // e.g., "en"
  native: string; // e.g., "English"
}

const I18N_DIR = path.join(process.cwd(), "src/i18n/translations");

// ✅ Dynamically load all available language files
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



// ✅ Build hreflangs
function buildHreflangs(urlPath: string, langs: Language[]) {
  return langs
    .map(
      (lang) => `    <xhtml:link rel="alternate" hreflang="${lang.code}" href="${BASE_URL}${urlPath}?lang=${lang.code.toLowerCase().slice(0,3)}" />`
    )
    .join("\n");
}


// ✅ Generate sitemap.xml (static pages + news.xml)
async function generateSitemapIndex(langs: Language[]) {
  const now = new Date().toISOString().split("T")[0];
  const staticPages = ["", "/usecases", "/contact"];

  const staticUrls = langs
    .flatMap((lang) =>
      staticPages.map((page) => {
        const urlPath = page || "/";
        const langCode = lang.code.toLowerCase().slice(0,3);
        return `  <url>
    <loc>${BASE_URL}${urlPath}?lang=${langCode}</loc>
${buildHreflangs(urlPath, langs)}
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
      })
    )
    .join("\n");

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${staticUrls}
</urlset>`;

  const out = path.join(DIST_DIR, "sitemap.xml");
  await fs.writeFile(out, sitemap, "utf-8");
  console.log("✅ sitemap.xml generated with language variants at", out);
}

// ✅ Main runner
async function run() {
  const langs = await getLanguages();
  // const posts = await getAllPostsFromFs();
  // await generateNewsSitemap(posts, langs);
  await generateSitemapIndex(langs);
}

run().catch((err) => {
  console.error("❌ Sitemap generation failed:", err);
  process.exit(1);
});
