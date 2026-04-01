import { mkdir, writeFile } from "node:fs/promises";
import { createWriteStream } from "node:fs";
import path from "node:path";
import { pipeline } from "node:stream/promises";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const dataDir = path.join(projectRoot, "static/projects/retirement-planning/data/sources");
const dbModule = await import(path.join(projectRoot, "static/projects/retirement-planning/data/insurance-db.js"));
const manifest = dbModule.INSURANCE_SOURCE_MANIFEST;

await mkdir(dataDir, { recursive: true });

for (const source of manifest) {
  const ext = source.kind === "pdf" ? "pdf" : "html";
  const target = path.join(dataDir, `${source.id}.${ext}`);
  const response = await fetch(source.url);
  if (!response.ok) {
    console.error(`Failed ${source.id}: ${response.status} ${response.statusText}`);
    continue;
  }
  if (source.kind === "pdf") {
    await pipeline(response.body, createWriteStream(target));
  } else {
    const text = await response.text();
    await writeFile(target, text, "utf8");
  }
  console.log(`Saved ${target}`);
}
