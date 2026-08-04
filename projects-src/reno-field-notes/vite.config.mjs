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
    // Vite restores photos and fabrication downloads from publicDir after
    // clearing the output, which prevents stale hashed bundles accumulating.
    emptyOutDir: true,
    sourcemap: false,
    chunkSizeWarningLimit: 560,
    rollupOptions: {
      input: {
        "shower-fitting": path.join(root, "shower-fitting/index.html"),
        "boba-light": path.join(root, "boba-light/index.html"),
        "under-bed-cleaner": path.join(root, "under-bed-cleaner/index.html"),
      },
    },
  },
});
