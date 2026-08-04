import assert from "node:assert/strict";
import { access, readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
const output = path.resolve(root, "../../static/reno/orientation");
const siteRoot = path.resolve(root, "../..");

for (const source of ["index.html", "src/main.ts", "src/style.css", "vite.config.mjs", "tsconfig.json"]) {
  await access(path.join(root, source));
}
await access(path.join(output, "index.html"));

const source = await readFile(path.join(root, "src/main.ts"), "utf8");
const css = await readFile(path.join(root, "src/style.css"), "utf8");
const authoredHtml = await readFile(path.join(root, "index.html"), "utf8");
const html = await readFile(path.join(output, "index.html"), "utf8");
const sourceBundle = `${source}\n${authoredHtml}`;
const privateWorker = await readFile(path.join(siteRoot, "worker/reno-private-api/index.js"), "utf8");

assert.match(html, /<script[^>]+type="module"[^>]+src="\/reno\/orientation\/assets\//, "Production HTML should reference the bundled globe module");
assert.match(html, /<link[^>]+stylesheet[^>]+\/reno\/orientation\/assets\//, "Production HTML should reference the bundled globe CSS");

for (const expected of [
  "InstancedMesh",
  "OrbitControls",
  "SphereGeometry(11.2",
  "createNeighbourhood",
  "createAtmosphere",
  "createWind",
  "createRain",
  "createHomeBlock",
  "createHomeVignette",
  "PRIVATE_HOME_ENDPOINT",
  "Yingcong + Sopisa",
  "air-temperature",
  "relative-humidity",
  "four-day-outlook",
  "weather?api=lightning",
  "weather?api=wbgt",
  "Bishan",
  "S109",
  "S217",
  "0.30–0.40 km",
  "2.9–3.1 km",
  "pressure-driven",
  "data.gov.sg",
]) assert.ok(sourceBundle.includes(expected), `Atmosphere source should include ${expected}`);

assert.ok((source.match(/new THREE\.InstancedMesh/g) ?? []).length >= 4, "Repeated windows, trees, wind and rain should use instancing");
assert.match(css, /@media \(max-width: 520px\)/, "Globe should include a compact phone composition");
assert.match(css, /prefers-reduced-motion/, "Globe should respect reduced motion");
assert.doesNotMatch(source, /seahyingcong@gmail\.com|sopisa\.ng@gmail\.com/i, "Public source must not contain owner emails");
assert.doesNotMatch(sourceBundle, /532B|32-118|stack\s*118|storey\s*32|unit number|exact address/i, "Public source must not expose exact home identifiers");
assert.match(privateWorker, /CF-Access-Authenticated-User-Email/, "Private marker endpoint should require an Access identity");
assert.match(privateWorker, /HOME_MARKER_JSON/, "Private marker endpoint should read normalized geometry from a secret");
assert.doesNotMatch(privateWorker, /532B|32-118|stack\s*118|storey\s*32|seahyingcong@gmail\.com|sopisa\.ng@gmail\.com/i, "Private Worker source must not commit home identifiers or owner emails");

const hub = await readFile(path.join(siteRoot, "static/reno/index.html"), "utf8");
assert.match(hub, /href="\/reno\/orientation\/"/, "Renovation hub should link to the weather globe");

const assets = await readdir(path.join(output, "assets"));
assert.ok(assets.some((file) => file.endsWith(".js")), "Build should emit JavaScript");
assert.ok(assets.some((file) => file.endsWith(".css")), "Build should emit CSS");
for (const file of assets) {
  const { size } = await stat(path.join(output, "assets", file));
  assert.ok(size < 700_000, `${file} should remain below the 700 KB raw runtime cap`);
}

console.log("Verified the live Three.js weather globe, instanced scene systems, public boundary, responsive composition and production assets.");
