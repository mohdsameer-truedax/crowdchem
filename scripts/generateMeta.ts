import fs from "fs";
import path from "path";
import 'dotenv/config';

const BLOG_DIR = path.join(process.cwd(), "src/mdx/news");
const META_DIR = path.join(process.cwd(), "public/meta"); // put in public so React can fetch it
const ASSET_SERVER_URL = process.env.VITE_ASSET_SERVER_URL;
const BASE_URL = process.env.VITE_BASE_URL;
try {
    if (!fs.existsSync(META_DIR)) fs.mkdirSync(META_DIR, { recursive: true });
} catch (err) {
    console.error("❌ Failed to create META_DIR:", META_DIR, err);
    process.exit(1);
}
// ✅ Format date for sitemap
function formatDateForSitemap(dateStr: string): string {
    if (!dateStr) return new Date().toISOString().split('T')[0];

    const isoDate = new Date(dateStr);
    if (!isNaN(isoDate.getTime()) && dateStr.includes("-")) {
        return dateStr.split("T")[0];
    }

    const match = dateStr.match(/([A-Z]+)\s+(\d{4})/i);
    if (match) {
        const [, monthName, year] = match;
        const months: Record<string, string> = {
            JANUARY: "01", FEBRUARY: "02", MARCH: "03", APRIL: "04", MAY: "05", JUNE: "06",
            JULY: "07", AUGUST: "08", SEPTEMBER: "09", OCTOBER: "10", NOVEMBER: "11", DECEMBER: "12"
        };
        const month = months[monthName.toUpperCase()] || "01";
        return `${year}-${month}-01`;
    }

    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
}

try {
    const files = fs.readdirSync(BLOG_DIR);

    files.forEach((file) => {
        try {
            if (!file.endsWith(".mdx")) return;

            const filePath = path.join(BLOG_DIR, file);
            const content = fs.readFileSync(filePath, "utf-8");
            const match = content.match(/export const frontmatter\s*=\s*({[\s\S]*?});/);
            if (!match) {
                console.warn(`⚠️ No frontmatter found in ${file}`);
                return;
            }

            const sandbox = {
                getAssetUrl: (v: string) => v, // just return the path as string
            };
            let frontmatter;
            try {
                frontmatter = Function("with(this){return " + match[1] + "}").call(sandbox);
            } catch (err) {
                console.error(`❌ Failed to evaluate frontmatter in ${file}:`, err);
                return;
            }
            const img =
                frontmatter.img && !/^https?:\/\//i.test(frontmatter.img)
                    ? `${ASSET_SERVER_URL}${frontmatter.img.startsWith("/") ? "" : "/"}${frontmatter.img}`
                    : frontmatter.img;
            const meta = {
                title: frontmatter.title || frontmatter.desc || "No Title",
                description: frontmatter.desc || "",
                canonical: `${BASE_URL}/news/${file.replace(".mdx", "")}`,
                date: formatDateForSitemap(frontmatter.date) || new Date().toISOString(),
                author: frontmatter.author || "CrowdChem",
                tags: frontmatter.tags || [],
                ogImage: img,
                twitterCard: frontmatter.twitterCard || "summary_large_image",
            };

            fs.writeFileSync(
                path.join(META_DIR, file.replace(".mdx", ".json")),
                JSON.stringify(meta, null, 2)
            );

            console.log(`✅ Metadata generated for ${file}`);
        } catch (fileErr) {
            console.error(`❌ Error processing ${file}:`, fileErr);
        }
    });
} catch (err) {
    console.error("❌ Failed to read BLOG_DIR:", BLOG_DIR, err);
    process.exit(1);
}