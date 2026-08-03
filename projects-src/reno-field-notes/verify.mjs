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
];

for (const relative of required) await access(path.join(output, relative));

for (const relative of ["shower-fitting/index.html", "boba-light/index.html"]) {
  const html = await readFile(path.join(output, relative), "utf8");
  assert.match(html, /<script[^>]+type="module"[^>]+src="\/reno\/field-notes\/assets\//, `${relative} should reference the shared Vite bundle`);
  assert.match(html, /<link[^>]+stylesheet[^>]+\/reno\/field-notes\/assets\//, `${relative} should reference built CSS`);
}

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

console.log(`Verified ${required.length} field-note outputs and source caveats.`);
