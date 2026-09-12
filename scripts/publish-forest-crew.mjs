#!/usr/bin/env node
import { cp, mkdir, readFile, readdir, rm, stat } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import path from "node:path";
import process from "node:process";

const root = path.resolve(import.meta.dirname, "..");
const sourceRoot = process.env.FOREST_CREW_SOURCE_ROOT
  ? path.resolve(process.env.FOREST_CREW_SOURCE_ROOT)
  : path.join(root, "projects-src", "forest-crew");
const stagingRoot = process.env.FOREST_CREW_STAGING_ROOT
  ? path.resolve(process.env.FOREST_CREW_STAGING_ROOT)
  : path.join(root, ".build", "forest-crew");
const slugPattern = /^forest-crew-[a-z0-9]+(?:-[a-z0-9]+)*$/;

export async function manifests() {
  const entries = await readdir(sourceRoot, { withFileTypes: true }).catch(() => []);
  const builds = [];
  for (const entry of entries.filter((item) => item.isDirectory()).sort((a, b) => a.name.localeCompare(b.name))) {
    const directory = path.join(sourceRoot, entry.name);
    const manifestPath = path.join(directory, "publication.json");
    let raw;
    try { raw = await readFile(manifestPath, "utf8"); } catch (error) {
      if (error.code === "ENOENT") continue;
      throw error;
    }
    const manifest = JSON.parse(raw);
    const allowed = new Set(["slug", "outputDir"]);
    const unexpected = Object.keys(manifest).filter((key) => !allowed.has(key));
    if (unexpected.length) throw new Error(`${path.relative(root, manifestPath)}: unsupported keys: ${unexpected.join(", ")}`);
    if (!slugPattern.test(manifest.slug)) throw new Error(`${path.relative(root, manifestPath)}: invalid slug`);
    if (manifest.outputDir !== "dist-public") throw new Error(`${path.relative(root, manifestPath)}: outputDir must be dist-public`);
    if (entry.name !== manifest.slug.replace(/^forest-crew-/, "")) {
      throw new Error(`${path.relative(root, manifestPath)}: directory must match slug suffix`);
    }
    for (const required of ["package.json", "package-lock.json"]) {
      if (!(await stat(path.join(directory, required)).catch(() => null))?.isFile()) {
        throw new Error(`${path.relative(root, manifestPath)}: missing ${required}`);
      }
    }
    const projectPage = path.join(root, "content", "projects", `${manifest.slug}.md`);
    const projectText = await readFile(projectPage, "utf8").catch(() => "");
    if (!projectText.includes(`slug: "${manifest.slug}"`) || !projectText.includes(`link: "/making/${manifest.slug}/"`)) {
      throw new Error(`${path.relative(root, manifestPath)}: missing matching public Making entry`);
    }
    builds.push({ ...manifest, directory, manifestPath });
  }
  if (!builds.length) throw new Error("No Forest Crew publication manifests found");
  const duplicate = builds.find((build, index) => builds.findIndex((other) => other.slug === build.slug) !== index);
  if (duplicate) throw new Error(`Duplicate Forest Crew slug: ${duplicate.slug}`);
  return builds;
}

function run(command, args, cwd) {
  const result = spawnSync(command, args, { cwd, stdio: "inherit", env: process.env });
  if (result.status !== 0) throw new Error(`${command} ${args.join(" ")} failed in ${path.relative(root, cwd)}`);
}

async function buildAll(builds) {
  await rm(stagingRoot, { recursive: true, force: true });
  for (const build of builds) {
    run("npm", ["ci"], build.directory);
    run("npm", ["run", "build:public"], build.directory);
    const output = path.join(build.directory, build.outputDir);
    if (!(await stat(path.join(output, "index.html")).catch(() => null))?.isFile()) {
      throw new Error(`${path.relative(root, output)}: missing index.html after build`);
    }
    await mkdir(path.join(stagingRoot, build.slug), { recursive: true });
    await cp(output, path.join(stagingRoot, build.slug), { recursive: true });
  }
}

async function publishAll(builds, publicDirectory) {
  for (const build of builds) {
    const staged = path.join(stagingRoot, build.slug);
    if (!(await stat(path.join(staged, "index.html")).catch(() => null))?.isFile()) {
      throw new Error(`${path.relative(root, staged)}: staged build is missing; run build first`);
    }
    const target = path.join(publicDirectory, "making", build.slug);
    await rm(target, { recursive: true, force: true });
    await mkdir(target, { recursive: true });
    await cp(staged, target, { recursive: true });
  }
}

if (process.argv[1] === import.meta.filename) {
  const [command, destination = "public"] = process.argv.slice(2);
  const builds = await manifests();
  if (command === "check") console.log(`Forest Crew manifests verified: ${builds.map((build) => build.slug).join(", ")}`);
  else if (command === "build") await buildAll(builds);
  else if (command === "publish") await publishAll(builds, path.resolve(root, destination));
  else throw new Error("Usage: node scripts/publish-forest-crew.mjs <check|build|publish> [public-directory]");
}
