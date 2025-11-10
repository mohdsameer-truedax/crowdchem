// scripts/index.ts
import { fileURLToPath, pathToFileURL } from 'url';
import { dirname, resolve } from 'path';

// Get __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function main() {
  try {
    console.log('📦 Running all build scripts...');

    const scripts = [
      './generateSitemap',
      './generateJsonld',
      './generateIndices',
      // './generateMeta'
    ];

    for (const script of scripts) {
      console.log(`➡️ Running ${script}...`);
      // Convert absolute path to file:// URL for Windows ESM
      const scriptPath = pathToFileURL(resolve(__dirname, script + '.ts')).href;
      const module = await import(scriptPath);
      if (module.default) {
        await module.default();
      }
    }

    console.log('✅ All scripts completed successfully!');
  } catch (error) {
    console.error('❌ Error running scripts:', error);
    process.exit(1);
  }
}

main();
