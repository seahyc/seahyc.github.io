import assert from "node:assert/strict";
import { access, readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
const output = path.resolve(root, "../../static/reno/field-notes");

const required = [
  "shower-fitting/index.html",
  "boba-light/index.html",
  "shower-fitting/observed-master-bath.jpg",
  "shower-fitting/comparison-other-bto.jpg",
  "shower-fitting/product-scale-drawing.jpg",
  "boba-light/installed.jpg",
  "boba-light/downloads/deep-collar-socket.scad",
  "boba-light/downloads/tool-build-guide.md",
  "under-bed-cleaner/index.html",
];

for (const relative of required) await access(path.join(output, relative));

const builtHtmlByPage = new Map();
for (const relative of ["shower-fitting/index.html", "boba-light/index.html"]) {
  const html = await readFile(path.join(output, relative), "utf8");
  builtHtmlByPage.set(relative, html);
  assert.match(html, /<script[^>]+type="module"[^>]+src="\/reno\/field-notes\/assets\//, `${relative} should reference the shared Vite bundle`);
  assert.match(html, /<link[^>]+stylesheet[^>]+\/reno\/field-notes\/assets\//, `${relative} should reference built CSS`);
}

const cleanerHtml = await readFile(path.join(output, "under-bed-cleaner/index.html"), "utf8");
builtHtmlByPage.set("under-bed-cleaner/index.html", cleanerHtml);
assert.match(cleanerHtml, /<script[^>]+type="module"[^>]+src="\/reno\/field-notes\/assets\//, "Cleaner should reference a bundled Three.js module");
assert.match(cleanerHtml, /Apartment twin/);
assert.match(cleanerHtml, /overflow-x:\s*hidden/, "Cleaner controls should not create horizontal overflow");
assert.match(cleanerHtml, /@media \(max-width:\s*480px\)/, "Cleaner should include a narrow-phone layout");
assert.match(cleanerHtml, /grid-template-columns:\s*repeat\(2,\s*minmax\(0,\s*1fr\)\)/, "Cleaner grids should shrink safely on narrow phones");
for (const [page, html] of builtHtmlByPage) {
  const assets = [...html.matchAll(/\/reno\/field-notes\/(assets\/[^"']+)/g)].map((match) => match[1]);
  for (const asset of new Set(assets)) await access(path.join(output, asset));
}
const cleanerSource = await readFile(path.join(root, "under-bed-cleaner/scene_v6.js"), "utf8");
for (const fact of ["540 mm", "10 mm", "steerable wrist", "Robotic side track", "compact ? 1.35"]) assert.ok(cleanerSource.includes(fact), `Cleaner source should retain ${fact}`);

const showerSource = await readFile(path.join(root, "src/ShowerPage.tsx"), "utf8");
assert.match(showerSource, /150 ±12mm/);
assert.match(showerSource, /52 ±1mm/);
assert.match(showerSource, /Conceptual reconstruction, not an as-built survey/);

const bobaSource = await readFile(path.join(root, "src/BobaPage.tsx"), "utf8");
assert.match(bobaSource, /Owner-memory estimates/);
assert.match(bobaSource, /Provisional visualization only/);

for (const relative of required.filter((item) => item.endsWith(".jpg"))) {
  const { size } = await stat(path.join(output, relative));
  assert.ok(size < 1_200_000, `${relative} should remain mobile-friendly (${size} bytes)`);
}

console.log(`Verified ${required.length} field-note outputs, scale navigation and source caveats.`);
