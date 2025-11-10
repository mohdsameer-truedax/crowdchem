import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import FlexSearch from "flexsearch";
import natural from "natural";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ---------- Paths ----------
// The source file for your embed data
const EMBED_DATA_PATH = path.resolve(__dirname, "../src/data/LatestUpdates.tsx");
const TRANSLATIONS_DIR = path.resolve(__dirname, "../src/i18n/translations");
const OUT_DIR = path.join(__dirname, "../public/search");

// ---------- FlexSearch & Phonetic ----------
const { Metaphone } = natural;
const metaphoneInstance = new Metaphone();

// ---------- Types ----------

// Define a type for the Post data from LatestUpdates.tsx for clarity
interface EmbedPost {
  id: number;
  slug: string;
  date: string;
  type: 'twitter' | 'linkedin' | string;
  caption: string;
  hashtags?: string[];
  author?: string;
  url: string;
  publicUrl?: string;
}

// Updated SearchDoc to reflect the new searchable fields
interface SearchDoc {
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
  caseIndex: number;
  lang: string;
  [key: string]: string | number;
}

// ---------- Process Embeds from src/data/LatestUpdates.tsx (FIXED FOR .TSX) ----------
async function processEmbeds(): Promise<SearchDoc[]> {
  const docs: SearchDoc[] = [];

  if (!fs.existsSync(EMBED_DATA_PATH)) {
    console.warn(`⚠️ Embed data file not found at: ${EMBED_DATA_PATH}`);
    return docs;
  }
  
  // FIX: Read the TSX file content as a string because Node.js cannot import .tsx directly.
  const fileContent = fs.readFileSync(EMBED_DATA_PATH, "utf8");

  // Regex to extract the array content of 'getAllPosts'. 
  const match = fileContent.match(/export\s+const\s+getAllPosts:\s+Post\[\]\s+=\s+(\[[\s\S]*?\n\])/m);

  if (!match || match.length < 2) {
      console.error("❌ Could not find 'getAllPosts' array data in LatestUpdates.tsx.");
      return docs;
  }

  let jsonString = match[1].trim();
  
  // Remove trailing commas before closing braces/brackets
  jsonString = jsonString.replace(/,(\s*[\]}])/g, '$1');

  try {
      const allPosts: EmbedPost[] = JSON.parse(jsonString);

      for (const post of allPosts) {
          const flattenedKeywords = (post.hashtags || []).join(" ").replace(/#/g, ''); // Remove # for cleaner searching
          
          const pagePath = `/${post.type}/${post.slug}`;
          const author = post.author || post.type;

          docs.push({
              id: `embed-${post.id}`,
              sourceId: post.id,
              page: pagePath,
              anchor: post.slug,
              title: post.caption.split(/\s+/).slice(0, 8).join(" ") + (post.caption.length > 40 ? "..." : ""),
              caption: post.caption,
              author: author,
              keywords: flattenedKeywords,
              phonetic: "",
              excerpt: post.caption.split(".").slice(0, 2).join(".").slice(0, 200),
              url: post.url,
              publicUrl: post.publicUrl || post.url,
              caseIndex: 0,   // default for embeds
              lang: ""        // default empty lang for embeds
          });
      }
  } catch (e) {
      console.error("❌ Failed to parse post data from LatestUpdates.tsx. Check if the array structure is valid JSON.", e);
  }

  return docs;
}

// ---------- Process Use Cases from translations ----------
async function processUseCases(): Promise<SearchDoc[]> {
  const docs: SearchDoc[] = [];
  
  if (!fs.existsSync(TRANSLATIONS_DIR)) {
    console.warn(`⚠️ Translations directory not found at: ${TRANSLATIONS_DIR}`);
    return docs;
  }

  const langFiles = fs.readdirSync(TRANSLATIONS_DIR).filter(f => f.endsWith('.ts'));
  
  const sectionMap: Record<string, number> = {
    "automotive": 1,
    "advancedMaterials": 2,
    "cosmetics": 3
  };

  for (const langFile of langFiles) {
    const filePath = path.join(TRANSLATIONS_DIR, langFile);
    const fileContent = fs.readFileSync(filePath, "utf8");
    
    const langCodeMatch = fileContent.match(/code:\s*"([^"]+)"/);
    const langNameMatch = fileContent.match(/lang:\s*"([^"]+)"/);
    const langCode = langCodeMatch ? langCodeMatch[1] : langFile.replace('.ts', '').toLowerCase().slice(0, 2);
    const langName = langNameMatch ? langNameMatch[1] : langFile.replace('.ts', '');

    const caseStudyMatches = fileContent.matchAll(/"(\w+)":\s*\{[\s\S]*?"caseStudy":\s*\{([\s\S]*?)\}\s*\}(?=,?\s*(?:"\w+":|\};))/g);
    
    for (const match of caseStudyMatches) {
      const sectionKey = match[1];
      const caseStudyContent = match[2];
      const anchorIndex = sectionMap[sectionKey] || Object.keys(sectionMap).length + 1;
      
      const allTextParts: string[] = [];
      const allStringMatches = caseStudyContent.matchAll(/"\w+":\s*"([^"]+)"/g);
      for (const m of allStringMatches) {
        allTextParts.push(m[1]);
      }
      
      const listMatches = caseStudyContent.matchAll(/"list":\s*\[([\s\S]*?)\]/g);
      for (const listMatch of listMatches) {
        const items = listMatch[1].matchAll(/"([^"]+)"/g);
        for (const item of items) {
          allTextParts.push(item[1]);
        }
      }
      
      const subtitleMatch = caseStudyContent.match(/"subtitle":\s*"([^"]+)"/);
      const title = subtitleMatch ? subtitleMatch[1] : sectionKey;
      const fullText = allTextParts.join(" ").replace(/<[^>]+>/g, '').replace(/\\n/g, ' ').replace(/\s+/g, ' ').trim();
      
      docs.push({
        id: `usecase-${sectionKey}-${langCode}`,
        sourceId: docs.length + 1,
        page: `/usecases`,
        anchor: `application${anchorIndex}`,
        title: title,
        caption: fullText,
        author: "CrowdChem",
        keywords: `${sectionKey} ${title}`,
        phonetic: "",
        excerpt: fullText.slice(0, 200),
        url: `/usecases#application${anchorIndex}`,
        publicUrl: `/usecases#application${anchorIndex}`,
        lang: langName,
        caseIndex: anchorIndex
      });
    }
  }

  return docs;
}



// ---------- Build Index ----------
(async function build(): Promise<void> {
  const allDocs: SearchDoc[] = [];

  const index = new (FlexSearch as typeof FlexSearch).Document<SearchDoc, string>({
    document: {
      id: "id",
      index: ["title", "caption", "author", "keywords", "phonetic"], 
      store: ["id", "sourceId", "page", "anchor", "title", "excerpt", "author", "caption", "url", "publicUrl"],
    },
    tokenize: "forward",
    encode: (str: string) => str.toLowerCase().split(/\s+/),
    resolution: 9,
  });

  let globalId = 1;

  // --- 1. Process Embed Posts ---
  console.log("Processing social media embed posts...");
  const embedDocs = await processEmbeds();
  
  // --- 1.5. Process Use Cases ---
  console.log("Processing use cases...");
  const useCaseDocs = await processUseCases();
  
  for (const doc of embedDocs) {
    // Ensure unique ID across all sources
    doc.id = `doc-${globalId++}`;
    
    // Generate phonetic key using all searchable fields
    const phon = metaphoneInstance.process(
        `${doc.title} ${doc.caption} ${doc.author} ${doc.keywords}`.slice(0, 400)
    );
    doc.phonetic = phon;
    
    index.add(doc);
    allDocs.push(doc);
  }

  for (const doc of useCaseDocs) {
    doc.id = `doc-${globalId++}`;
    const phon = metaphoneInstance.process(
        `${doc.title} ${doc.caption} ${doc.keywords}`.slice(0, 400)
    );
    doc.phonetic = phon;
    index.add(doc);
    allDocs.push(doc);
  }


  // --- 2. Load Static Pages (If any) ---
 

  // --- 3. Write Output ---
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const exportedData: Record<string, unknown> = {};
  await index.export((key: string, data: unknown) => {
    exportedData[key] = data;
  });

  fs.writeFileSync(path.join(OUT_DIR, "index.json"), JSON.stringify(exportedData, null, 2));
  fs.writeFileSync(path.join(OUT_DIR, "docs.json"), JSON.stringify(allDocs, null, 2));

  console.log(
    `✅ Built search index for ${allDocs.length} total docs (${embedDocs.length} Embeds + ${useCaseDocs.length} Use Cases).`
  );
})();