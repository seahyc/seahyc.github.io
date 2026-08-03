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
const sourceBundle = `${appSource}\n${dataSource}\n${sceneSource}`;

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
  "3294 mm",
  "2036 mm",
  "/reno/field-notes/boba-light/",
  "/reno/field-notes/shower-fitting/",
  "/World/Electrical/Living/BobaLight_Upper",
  "/World/Plumbing/MasterBath/ShowerMixer",
]) assert.ok(sourceBundle.includes(assertion), `Twin sources should include ${assertion}`);

assert.doesNotMatch(sourceBundle, /seahyingcong@gmail\.com|sopisa\.ng@gmail\.com/i, "Public twin must not contain owner emails");
assert.doesNotMatch(sourceBundle, /SG Interior/, "Public twin should use the appointed Comfort Home record");

const paths = [...dataSource.matchAll(/path: "(\/World\/[^"]+)"/g)].map((match) => match[1]);
assert.ok(paths.length >= 8, "Twin should include a meaningful semantic scene graph");
assert.equal(new Set(paths).size, paths.length, "Twin-node semantic paths must be unique");

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

console.log(`Verified ${paths.length} semantic nodes, field-note links, public boundary, hub entry and production assets.`);
