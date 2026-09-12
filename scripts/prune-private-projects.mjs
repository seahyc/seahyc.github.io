import { readFile, readdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(new URL("..", import.meta.url).pathname);
const contentDir = path.join(root, "content", "projects");
const publicDir = path.resolve(process.argv[2] || path.join(root, "public"));

function frontMatter(text) {
  const match = text.match(/^---\n([\s\S]*?)\n---/);
  if (!match) throw new Error("missing front matter");
  return Object.fromEntries(
    match[1].split("\n").flatMap((line) => {
      const field = line.match(/^([a-z_]+):\s*["']?([^"'].*?)["']?\s*$/);
      return field ? [[field[1], field[2]]] : [];
    }),
  );
}

function outputPath(urlPath) {
  const relative = urlPath.replace(/^\/+|\/+$/g, "");
  const target = path.resolve(publicDir, relative);
  if (target !== publicDir && !target.startsWith(`${publicDir}${path.sep}`)) {
    throw new Error(`unsafe project output path: ${urlPath}`);
  }
  return target;
}

const privateUrls = [];
const unlistedUrls = [];
for (const filename of await readdir(contentDir, { recursive: true })) {
  if (!filename.endsWith(".md") || filename === "_index.md") continue;
  const metadata = frontMatter(await readFile(path.join(contentDir, filename), "utf8"));
  if (!new Set(["public", "private", "unlisted"]).has(metadata.visibility)) {
    throw new Error(`${filename}: visibility must be public, private or unlisted`);
  }
  if (metadata.visibility === "public") continue;

  const slug = filename.replace(/(?:\/index)?\.md$/, "");
  const routes = metadata.visibility === "private" ? privateUrls : unlistedUrls;
  routes.push(`/projects/${slug}/`);
  if (metadata.link?.startsWith("/")) routes.push(metadata.link);
}

for (const urlPath of privateUrls) {
  await rm(outputPath(urlPath), { recursive: true, force: true });
}

const sitemapPath = path.join(publicDir, "sitemap.xml");
let sitemap = await readFile(sitemapPath, "utf8");
for (const urlPath of [...privateUrls, ...unlistedUrls]) {
  const escaped = urlPath.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  sitemap = sitemap.replace(new RegExp(`<url>\\s*<loc>[^<]*${escaped}</loc>[\\s\\S]*?</url>`, "g"), "");
}
await writeFile(sitemapPath, sitemap);

console.log(`pruned ${privateUrls.length} private project route(s)`);
