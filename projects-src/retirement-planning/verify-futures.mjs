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

import { DEFAULT_PROFILE } from "../../static/projects/retirement-planning/constants.js";
import { runPlan } from "../../static/projects/retirement-planning/models/cashflow.js";
import { deriveHazards, sampleDeathAge, simulateFutures, defaultSeed } from "../../static/projects/retirement-planning/models/futures.js";

const profile = structuredClone(DEFAULT_PROFILE.profile);
const plan = {
  ...structuredClone(DEFAULT_PROFILE.plans[0]),
  id: "verify-plan",
  profileId: "verify-profile",
};
const result = runPlan(profile, plan);

// --- hazards: derived from the (risk-adjusted) survival column ---
const hazards = deriveHazards(result.rows);
assert.equal(hazards.length, result.rows.length, "one hazard per ledger row");
assert.ok(hazards.every((h) => h >= 0 && h <= 1), "hazards must be probabilities");
assert.equal(hazards[hazards.length - 1], 1, "final hazard must be 1 (no path outlives the ledger)");

// --- death sampling: deterministic given a seed, distribution centered near medianAge ---
const draw1 = mulberry32(123);
const draw2 = mulberry32(123);
assert.equal(sampleDeathAge(hazards, result.rows, draw1), sampleDeathAge(hazards, result.rows, draw2), "same seed, same death age");

const drawMany = mulberry32(99);
const deaths = Array.from({ length: 2000 }, () => sampleDeathAge(hazards, result.rows, drawMany)).sort((x, y) => x - y);
const medianDeath = deaths[Math.floor(deaths.length / 2)];
// One reconciled mortality model (Task 3): the survival column and result.medianAge are
// now derived from the SAME adjusted curve, so the sampled median death must agree with
// BOTH the survival-curve median AND result.medianAge.
const survivalMedian = (result.rows.find((r) => r.survival <= 0.5) ?? result.rows[result.rows.length - 1]).age;
assert.ok(
  Math.abs(medianDeath - survivalMedian) <= 3,
  `sampled median death age (${medianDeath}) should sit within 3y of the survival-curve median (${survivalMedian})`
);
assert.ok(
  Math.abs(survivalMedian - result.medianAge) <= 3,
  `survival-curve median (${survivalMedian}) and result.medianAge (${result.medianAge}) must agree within 3y (single reconciled model)`
);
// Default SG-female profile: median death should land in the life-table range, not the
// old ~77 the miscalibrated baseline produced.
assert.ok(
  result.medianAge >= 85 && result.medianAge <= 91,
  `default-profile medianAge (${result.medianAge}) should sit in the SingStat range [85,91]`
);

// --- simulateFutures: determinism, structure, honesty ---
const fut1 = simulateFutures(result, profile, plan, { paths: 500, seed: 2026 });
const fut2 = simulateFutures(result, profile, plan, { paths: 500, seed: 2026 });
assert.deepEqual(fut1, fut2, "same seed must produce an identical FuturesSummary (pinned-seed requirement)");

const futOther = simulateFutures(result, profile, plan, { paths: 500, seed: 2027 });
assert.notDeepEqual(fut1.okCount, undefined, "okCount present");
assert.notEqual(JSON.stringify(fut1.bands), JSON.stringify(futOther.bands), "different seeds should differ somewhere");

assert.equal(fut1.paths, 500);
assert.ok(fut1.okOf100 >= 0 && fut1.okOf100 <= 100, "okOf100 must be a frequency out of 100");
assert.equal(fut1.okCount + fut1.redFutures.length, fut1.paths, "every path is either ok or a red future");

// bands: one per ledger age (while enough paths alive), ordered p10 <= p50 <= p90
assert.ok(fut1.bands.length >= 10, "bands should cover the early decades");
for (const band of fut1.bands) {
  assert.ok(band.p10 <= band.p50 && band.p50 <= band.p90, `band at age ${band.age} must be ordered`);
}
assert.equal(fut1.bands[0].age, result.rows[0].age, "bands start at the first ledger age");

// Re-anchoring sanity (Task 2): at year 0 the only stochastic deltas are
// (medicalDraw − medicalCash), which has ~zero expectation, and marketDelta, which
// is mean-zero — so the median band must sit on the deterministic, now-draining
// rows[0].liquidAssets. This is the guard against the futures engine re-introducing
// its own income−spend drain (which would shift p50 off the ledger anchor).
const anchor0 = result.rows[0].liquidAssets;
assert.ok(
  Math.abs(fut1.bands[0].p50 - anchor0) <= 0.05 * Math.max(1, Math.abs(anchor0)),
  `year-0 band p50 (${fut1.bands[0].p50}) must sit within 5% of rows[0].liquidAssets (${anchor0})`
);

// red futures carry when/how-bad (spec: never a bare success score)
for (const red of fut1.redFutures.slice(0, 5)) {
  assert.ok(red.breachAge >= result.rows[0].age, "red future must record when it breaches");
  assert.ok(["medical", "longevity", "market"].includes(red.cause), "red future must record a cause");
}

// sample paths for HOPs playback
assert.ok(fut1.samplePaths.length > 0 && fut1.samplePaths.length <= 100, "decimated sample paths for playback");
assert.ok(fut1.samplePaths[0].points.length > 0, "sample paths carry per-age liquid points");

// default seed is pinned to inputs
assert.equal(defaultSeed(profile, plan), defaultSeed(structuredClone(profile), structuredClone(plan)), "defaultSeed depends only on input values");

// --- pinned default behavior used by the app layer ---
const futDefault = simulateFutures(result, profile, plan);
assert.equal(futDefault.paths, 1000, "app-layer default is 1000 paths");
assert.equal(futDefault.seed, defaultSeed(profile, plan), "app-layer default seed is pinned to inputs");

console.log("futures verification passed");
