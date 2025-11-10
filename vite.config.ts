import { defineConfig, loadEnv, type ViteDevServer } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@mdx-js/rollup";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import path from "path";
import { configureAPIServer } from "./src/server/Server";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  
  process.env = { ...process.env, ...env };

  return {
    plugins: [
      react(),
      tailwindcss(),
      mdx({
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeHighlight],
      }),
      {
        name: "api-middleware",
        configureServer(server: ViteDevServer) {
          configureAPIServer(server);
        },
      },
    ],

    server: {
      port: 5173,
    },

    resolve: {
      alias: {
        "@src": path.resolve(__dirname, "src"),
        "@components": path.resolve(__dirname, "src/components"),
        "@pages": path.resolve(__dirname, "src/pages"),
        "@utils": path.resolve(__dirname, "src/utils"),
        "@assets": path.resolve(__dirname, "src/assets"),
      },
    },

    // ✅ Optionally define variables for runtime access (build-time constants)
    define: {
      "import.meta.env.VITE_GA_MEASUREMENT_ID": JSON.stringify(env.VITE_GA_MEASUREMENT_ID),
      "import.meta.env.MODE": JSON.stringify(mode),
    },
  };
});
