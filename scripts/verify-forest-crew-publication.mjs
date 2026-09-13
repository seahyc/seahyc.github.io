#!/usr/bin/env node
import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { manifests } from "./publish-forest-crew.mjs";

const root = path.resolve(import.meta.dirname, "..");
const publicRoot = path.resolve(root, process.argv[2] ?? "public");
const forbiddenNames = /(^|\/)(?:\.env(?:\..*)?|design|playtests|recordings|server|deploy|\.agent-data|node_modules|\.git)(\/|$)/i;
const secretText = /(?:PLAYTEST_SERVICE_KEY|FOREST_CREW_EDGE_KEY|FOREST_CREW_INVITE_KEY|BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY)/;
const runtimeExtensions = new Set([
  ".bin", ".css", ".glb", ".gltf", ".hdr", ".html", ".ico", ".jpeg", ".jpg",
  ".js", ".json", ".map", ".md", ".mp3", ".ogg", ".png", ".svg", ".task",
  ".txt", ".wasm", ".webm", ".webp", ".woff", ".woff2",
]);

async function filesBelow(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const item = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await filesBelow(item));
    else if (entry.isFile()) files.push(item);
  }
  return files;
}

const errors = [];
for (const build of await manifests()) {
  const route = path.join(publicRoot, "making", build.slug);
  const index = path.join(route, "index.html");
  if (!(await stat(index).catch(() => null))?.isFile()) {
    errors.push(`/making/${build.slug}/: missing index.html`);
    continue;
  }
  const html = await readFile(index, 'utf8');
  if (!html.includes(`/making/${build.slug}/assets/`)) errors.push(`/making/${build.slug}/: missing canonical runtime asset URL`);
  for (const required of ['hand-worker.js', 'models/hand_landmarker.task', 'models/j-toastie-rigged-astronaut-no-pack.glb', 'models/ASTRONAUT-LICENSE.md', 'models/coast-rocks.glb', 'models/COAST-ROCKS-LICENSE.md', 'models/fern-02/fern.gltf', 'models/FERN-LICENSE.md', 'textures/LICENSE.md']) {
    if (!(await stat(path.join(route, required)).catch(() => null))?.isFile()) errors.push(`/making/${build.slug}/${required}: required runtime asset absent`);
  }
  const makingIndex = await readFile(path.join(publicRoot, 'making/index.html'), 'utf8');
  if (!makingIndex.includes(`/making/${build.slug}/`)) errors.push(`/making/${build.slug}/: absent from Making index`);
  const files = await filesBelow(route);
  for (const file of files) {
    const relative = path.relative(route, file).split(path.sep).join("/");
    if (forbiddenNames.test(relative)) errors.push(`/making/${build.slug}/${relative}: private path published`);
    if (!runtimeExtensions.has(path.extname(file).toLowerCase())) {
      errors.push(`/making/${build.slug}/${relative}: file type is outside the public runtime allowlist`);
    }
    if (/\.(?:html|js|css|json|map|txt|md)$/i.test(file)) {
      const text = await readFile(file, "utf8");
      if (secretText.test(text)) errors.push(`/making/${build.slug}/${relative}: server credential marker published`);
    }
  }
}

if (errors.length) throw new Error(`Forest Crew publication verification failed:\n- ${errors.join("\n- ")}`);
console.log("Forest Crew publication routes and privacy boundary verified");
