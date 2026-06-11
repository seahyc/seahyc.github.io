import assert from "node:assert/strict";
import { hashSeed, mulberry32, normal, lognormalMultiplier } from "../../static/projects/retirement-planning/models/rng.js";

// --- rng: determinism and sanity ---
const a = mulberry32(42);
const b = mulberry32(42);
const seqA = Array.from({ length: 5 }, () => a());
const seqB = Array.from({ length: 5 }, () => b());
assert.deepEqual(seqA, seqB, "same seed must produce identical sequences");
assert.ok(seqA.every((x) => x >= 0 && x < 1), "uniform draws must be in [0,1)");
assert.notDeepEqual(seqA, Array.from({ length: 5 }, mulberry32(43)), "different seeds must diverge");

assert.equal(hashSeed("abc"), hashSeed("abc"), "hashSeed must be stable");
assert.notEqual(hashSeed("abc"), hashSeed("abd"), "hashSeed must be input-sensitive");

const rng = mulberry32(7);
const normals = Array.from({ length: 4000 }, () => normal(rng, 0, 1));
const mean = normals.reduce((s, x) => s + x, 0) / normals.length;
assert.ok(Math.abs(mean) < 0.1, `normal() sample mean should be ~0, got ${mean}`);

const rng2 = mulberry32(8);
const mults = Array.from({ length: 4000 }, () => lognormalMultiplier(rng2, 0.45));
const mMean = mults.reduce((s, x) => s + x, 0) / mults.length;
assert.ok(mults.every((x) => x > 0), "lognormal multipliers must be positive");
assert.ok(Math.abs(mMean - 1) < 0.08, `lognormalMultiplier mean should be ~1, got ${mMean}`);

console.log("futures verification passed");
