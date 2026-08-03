import { fileURLToPath } from "node:url";
import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const root = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root,
  base: "/reno/field-notes/",
  plugins: [react()],
  publicDir: path.join(root, "public"),
  build: {
    outDir: path.join(root, "../../static/reno/field-notes"),
    // Photos and downloadable fabrication files share this public directory
    // with Vite's generated bundles, so the build must preserve them.
    emptyOutDir: false,
    sourcemap: false,
    rollupOptions: {
      input: {
        "shower-fitting": path.join(root, "shower-fitting/index.html"),
        "boba-light": path.join(root, "boba-light/index.html"),
      },
    },
  },
});
