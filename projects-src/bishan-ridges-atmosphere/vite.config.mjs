import { fileURLToPath } from "node:url";
import path from "node:path";
import { defineConfig } from "vite";

const root = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root,
  base: "/projects/bishan-ridges-atmosphere/",
  publicDir: path.join(root, "../reno-atmosphere/public"),
  define: { __PUBLIC_PROJECT__: "true" },
  build: {
    outDir: path.join(root, "../../static/projects/bishan-ridges-atmosphere"),
    emptyOutDir: true,
    sourcemap: false,
    target: "es2022",
    chunkSizeWarningLimit: 560,
    rollupOptions: { output: { manualChunks(id) { if (id.includes("/node_modules/three/")) return "three-runtime"; } } },
  },
});
