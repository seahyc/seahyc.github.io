import { fileURLToPath } from "node:url";
import path from "node:path";
import { defineConfig, loadEnv } from "vite";

const root = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, root, "RENO_");
  const localMarker = env.RENO_PRIVATE_HOME_MARKER;
  const localMarkerPlugin = localMarker ? {
    name: "private-home-marker-local-preview",
    configureServer(server) {
      server.middlewares.use("/reno/api/private-home-marker", (_request, response) => {
        try {
          const marker = JSON.parse(localMarker);
          response.statusCode = 200;
          response.setHeader("Content-Type", "application/json; charset=utf-8");
          response.setHeader("Cache-Control", "private, no-store");
          response.end(JSON.stringify({ marker }));
        } catch {
          response.statusCode = 503;
          response.end(JSON.stringify({ error: "Invalid local preview marker" }));
        }
      });
    },
  } : null;

  return {
    root,
    base: "/reno/orientation/",
    plugins: localMarkerPlugin ? [localMarkerPlugin] : [],
    build: {
      outDir: path.join(root, "../../static/reno/orientation"),
      emptyOutDir: true,
      sourcemap: false,
      target: "es2022",
      chunkSizeWarningLimit: 560,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("/node_modules/three/")) return "three-runtime";
          },
        },
      },
    },
  };
});
