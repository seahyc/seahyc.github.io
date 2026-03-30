import { cp, mkdir, rm } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const scriptDir = dirname(fileURLToPath(import.meta.url));
const repoRoot = dirname(dirname(scriptDir));
const plannerDir = join(repoRoot, "static", "projects", "retirement-planning");
const generatedDir = join(repoRoot, ".generated", "retirement-planning");

await rm(generatedDir, { recursive: true, force: true });
await mkdir(generatedDir, { recursive: true });

await execFileAsync(
  join(repoRoot, "node_modules", ".bin", "tsc"),
  ["-p", join(scriptDir, "tsconfig.json")],
  { cwd: repoRoot },
);

await cp(generatedDir, plannerDir, {
  recursive: true,
  force: true,
});

await rm(generatedDir, { recursive: true, force: true });
