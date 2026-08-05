import assert from "node:assert/strict";
import { access, readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
const output = path.resolve(root, "../../static/reno/orientation");
const siteRoot = path.resolve(root, "../..");

for (const source of ["index.html", "src/main.ts", "src/style.css", "vite.config.mjs", "tsconfig.json", "public/neighbourhood-model.json", "scripts/build-neighbourhood-model.mjs"]) {
  await access(path.join(root, source));
}
await access(path.join(output, "index.html"));

const source = await readFile(path.join(root, "src/main.ts"), "utf8");
const css = await readFile(path.join(root, "src/style.css"), "utf8");
const authoredHtml = await readFile(path.join(root, "index.html"), "utf8");
const html = await readFile(path.join(output, "index.html"), "utf8");
const sourceBundle = `${source}\n${authoredHtml}`;
const privateWorker = await readFile(path.join(siteRoot, "worker/reno-private-api/index.js"), "utf8");

assert.match(html, /<script[^>]+type="module"[^>]+src="\/reno\/orientation\/assets\//, "Production HTML should reference the bundled model module");
assert.match(html, /<link[^>]+stylesheet[^>]+\/reno\/orientation\/assets\//, "Production HTML should reference the bundled model CSS");

for (const expected of [
  "InstancedMesh",
  "OrbitControls",
  "mergeGeometries",
  "createGeoNeighbourhood",
  "neighbourhood-model.json",
  "createAtmosphere",
  "createWind",
  "createRain",
  "createGeoBuildings",
  "createBishanRidgesBuilding",
  "createGeoHomeVignette",
  "clipSegmentToCircle",
  "homeFacadeNormal",
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
  "1:1 proportions",
  "data.gov.sg",
  "/reno/twin/?entry=window",
  "zoom-neighbourhood",
  "focusNeighbourhood",
]) assert.ok(sourceBundle.includes(expected), `Atmosphere source should include ${expected}`);

assert.ok((source.match(/new THREE\.InstancedMesh/g) ?? []).length >= 4, "Repeated windows, trees, wind and rain should use instancing");
assert.doesNotMatch(sourceBundle, /data-scenario|SCENARIOS|SphereGeometry\(11\.2|globeMaterial/, "The model should not expose fake weather scenarios or a glass globe");
assert.doesNotMatch(source, /windRibbons|rebuildWindRibbons/, "Wind should use short directional particles instead of camera-angle line artifacts");
assert.match(source, /neighbourhood\.radius - \.035/, "Linear map layers should be clipped inside the model edge");
assert.match(source, /0xd5a62e/, "Bishan Ridges blocks should retain their distinctive mustard-yellow accent");
assert.match(sourceBundle, /Weather follows live observations/, "Weather should be visibly locked to live observations");
assert.match(css, /@media \(max-width: 520px\)/, "Model should include a compact phone composition");
assert.match(css, /prefers-reduced-motion/, "Model should respect reduced motion");
assert.doesNotMatch(source, /@gmail\.com/i, "Public source must not contain owner emails");
assert.doesNotMatch(sourceBundle, /postal(?:Address|Code)|block(?:Number|Identifier)|unit(?:Number|Identifier)|stack(?:Number|Identifier)|storey(?:Label|Number)|exact address/i, "Public source must not expose exact home identifiers");
assert.match(privateWorker, /CF-Access-Authenticated-User-Email/, "Private marker endpoint should require an Access identity");
assert.match(privateWorker, /HOME_MARKER_JSON/, "Private marker endpoint should read normalized geometry from a secret");
assert.match(privateWorker, /buildingIndex/, "Private marker endpoint should select the anonymous home footprint only after authentication");
assert.doesNotMatch(privateWorker, /@gmail\.com|postal(?:Address|Code)|block(?:Number|Identifier)|unit(?:Number|Identifier)|stack(?:Number|Identifier)|storey(?:Label|Number)/i, "Private Worker source must not commit home identifiers or owner emails");

const hub = await readFile(path.join(siteRoot, "static/reno/index.html"), "utf8");
assert.match(hub, /href="\/reno\/orientation\/"/, "Renovation hub should link to the weather model");

const modelSource = await readFile(path.join(root, "public/neighbourhood-model.json"), "utf8");
const model = JSON.parse(modelSource);
assert.equal(model.radius, 10, "Neighbourhood model should cover a one-kilometre radius at one unit per 100 m");
assert.ok(model.buildings.length > 1000, "Neighbourhood model should include the full 1 km building context");
assert.ok(model.roads.length > 1000 && model.rails.length > 20, "Neighbourhood model should include proportional roads and rail geometry");
assert.ok(model.landmarks?.depot && model.landmarks?.rainGauge, "Neighbourhood model should spatially anchor the depot and rain gauge");
assert.ok(model.buildings.every((building) => ["measured", "levels", "estimated"].includes(building.heightSource)), "Public height provenance must not single out the protected home footprint");
assert.doesNotMatch(modelSource, /postal(?:Address|Code)|block(?:Number|Identifier)|unit(?:Number|Identifier)|stack(?:Number|Identifier)|storey(?:Label|Number)|latitude|longitude/i, "Coordinate-free public model must not identify the home or expose absolute coordinates");
assert.doesNotMatch(modelSource, /homeBuildingIndex|privateHome/i, "Public model must not identify which anonymous footprint is home");

const assets = await readdir(path.join(output, "assets"));
assert.ok(assets.some((file) => file.endsWith(".js")), "Build should emit JavaScript");
assert.ok(assets.some((file) => file.endsWith(".css")), "Build should emit CSS");
for (const file of assets) {
  const { size } = await stat(path.join(output, "assets", file));
  assert.ok(size < 700_000, `${file} should remain below the 700 KB raw runtime cap`);
}
const modelAsset = await stat(path.join(output, "neighbourhood-model.json"));
assert.ok(modelAsset.size < 700_000, "Coordinate-free neighbourhood model should remain below the raw map payload cap");

console.log("Verified the live Three.js neighbourhood model, anchored geospatial systems, protected home footprint, responsive composition and production assets.");
