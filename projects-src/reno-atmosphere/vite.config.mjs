import { fileURLToPath } from "node:url";
import path from "node:path";
import { defineConfig } from "vite";

const root = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root,
  base: "/reno/orientation/",
  build: {
    outDir: path.join(root, "../../static/reno/orientation"),
    emptyOutDir: true,
    sourcemap: false,
    target: "es2022",
    chunkSizeWarningLimit: 800,
  },
});
