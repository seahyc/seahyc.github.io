import { readdir, rm, stat } from "node:fs/promises";
import { dirname, extname, join } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const repoRoot = dirname(dirname(scriptDir));
const publishRoot = join(repoRoot, "public", "projects", "retirement-planning");
const blockedExtensions = new Set([".ts"]);
const blockedNames = new Set(["tsconfig.json"]);
const blockedDirectories = new Set(["tools"]);

async function prune(targetDir) {
  const entries = await readdir(targetDir, { withFileTypes: true });
  await Promise.all(entries.map(async (entry) => {
    const fullPath = join(targetDir, entry.name);
    if (entry.isDirectory()) {
      if (blockedDirectories.has(entry.name)) {
        await rm(fullPath, { recursive: true, force: true });
        return;
      }
      await prune(fullPath);
      return;
    }

    if (blockedNames.has(entry.name) || entry.name.endsWith(".d.ts") || blockedExtensions.has(extname(entry.name))) {
      await rm(fullPath, { force: true });
    }
  }));
}

const publishStats = await stat(publishRoot).catch(() => null);
if (!publishStats?.isDirectory()) {
  throw new Error(`Publish root not found: ${publishRoot}`);
}

await prune(publishRoot);
