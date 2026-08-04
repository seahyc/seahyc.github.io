import assert from "node:assert/strict";
import { access, readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
const output = path.resolve(root, "../../static/reno/twin");
const siteRoot = path.resolve(root, "../..");

const requiredSources = [
  "src/TwinApp.tsx",
  "src/TwinScene.tsx",
  "src/sceneModel.ts",
  "src/twinData.ts",
  "src/types.ts",
];
for (const relative of requiredSources) await access(path.join(root, relative));
await access(path.join(output, "index.html"));

const html = await readFile(path.join(output, "index.html"), "utf8");
assert.match(html, /<script[^>]+type="module"[^>]+src="\/reno\/twin\/assets\//, "Twin HTML should reference its production bundle");
assert.match(html, /<link[^>]+stylesheet[^>]+\/reno\/twin\/assets\//, "Twin HTML should reference its production CSS");

const appSource = await readFile(path.join(root, "src/TwinApp.tsx"), "utf8");
const dataSource = await readFile(path.join(root, "src/twinData.ts"), "utf8");
const sceneSource = await readFile(path.join(root, "src/TwinScene.tsx"), "utf8");
const sceneModelSource = await readFile(path.join(root, "src/sceneModel.ts"), "utf8");
const sourceBundle = `${appSource}\n${dataSource}\n${sceneSource}\n${sceneModelSource}`;

for (const assertion of [
  "localStorage",
  "Export JSON",
  "Export CSV",
  "semanticPath",
  "warrantyUntil",
  "maintenance",
  "hiddenObjects",
  "Hide from scene",
  "asset-details",
  "Focus de Lightings",
  "Voltz Solution",
  "Comfort Home",
  "No unconfirmed loose furniture",
  "Comfort Home render",
  "Render-intent sofa (provisional)",
  "headboard against the right-hand exterior wall",
  "CP · 25 May 2026",
  "12,650 mm × 9,235 mm",
  "3294 mm",
  "2036 mm",
  "Living / dining",
  "Bedroom 2",
  "Household shelter",
  "Air-con ledge",
  "Yard",
  "Registered source stack",
  "Source registration",
  "CH-ELEC-2026-05-25-P1",
  "CH-ELEC-2026-05-25-P2",
  "CH-CARP-2026-05-30-P01-07",
  "CH-CARP-2026-05-30-P08-10",
  "CH-CARP-2026-05-30-P11-17",
  "CH-CARP-2026-05-30-P18-30",
  "CH-VISUAL-CURRENT-P02-20",
  "CHAT-CP-2026-06-18-STUDY-STORAGE",
  "590 mm open shelf",
  "one pocket mechanism",
  "Living feature wall",
  "Kitchen sink and service run",
  "Master-bath vanity",
  "Stacked washer and dryer",
  "Bosch dishwasher",
  "Robot vacuum dock",
  "Paludarium",
  "/reno/field-notes/boba-light/",
  "/reno/field-notes/shower-fitting/",
  "/World/Electrical/Living/BobaLight_Upper",
  "/World/Plumbing/MasterBath/ShowerMixer",
]) assert.ok(sourceBundle.includes(assertion), `Twin sources should include ${assertion}`);

assert.doesNotMatch(sourceBundle, /seahyingcong@gmail\.com|sopisa\.ng@gmail\.com/i, "Public twin must not contain owner emails");
assert.doesNotMatch(sourceBundle, /SG Interior/, "Public twin should use the appointed Comfort Home record");
assert.doesNotMatch(sourceBundle, /QUEEN.?S ROAD|3D V13/i, "Unrelated render archives must not enter the governing twin");

const paths = [...dataSource.matchAll(/path: "(\/World\/[^"]+)"/g)].map((match) => match[1]);
assert.ok(paths.length >= 8, "Twin should include a meaningful semantic scene graph");
assert.equal(new Set(paths).size, paths.length, "Twin-node semantic paths must be unique");

const modelPaths = [...sceneModelSource.matchAll(/path: "(\/World\/[^"]+)"/g)].map((match) => match[1]);
assert.ok(modelPaths.length >= 30, "Registered scene model should contain detailed carpentry and MEP objects");
assert.equal(new Set(modelPaths).size, modelPaths.length, "Registered scene-model paths must be unique");
assert.ok((sceneModelSource.match(/kind: "(run|wardrobe|feature-wall|vanity|storage)"/g) ?? []).length >= 10, "Twin should register at least ten detailed carpentry assemblies");
assert.ok((sceneModelSource.match(/circuit: "/g) ?? []).length >= 20, "Twin should register at least twenty electrical fixtures");

const hub = await readFile(path.join(siteRoot, "static/reno/index.html"), "utf8");
assert.match(hub, /href="\/reno\/twin\/"/);
assert.match(hub, /Whole-home digital twin/);

const assets = await readdir(path.join(output, "assets"));
assert.ok(assets.some((file) => file.endsWith(".js")), "Twin should emit JavaScript assets");
assert.ok(assets.some((file) => file.endsWith(".css")), "Twin should emit CSS assets");
for (const file of assets) {
  const { size } = await stat(path.join(output, "assets", file));
  assert.ok(size < 1_000_000, `${file} should remain below the 1 MB public runtime cap`);
}

console.log(`Verified ${paths.length} authored twin nodes, ${modelPaths.length} registered scene objects, source stitching, public boundary and production assets.`);
