# Futures Engine (Monte Carlo Layer) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a deterministic, seeded Monte Carlo layer over the existing retirement models that turns one deterministic plan run into N simulated futures, aggregated as "X of 100 futures OK" + percentile bands + red-future records — the data spine for the cockpit UI.

**Architecture:** The existing `runPlan()` pipeline stays untouched and deterministic. A new `simulateFutures()` post-processes its `PlanRunResult`: it derives per-year death hazards from the (already risk-adjusted) survival column, then per path draws a death age, yearly medical out-of-pocket variability, and market-return deviations, and tracks its own liquid-assets trajectory. CPF LIFE payouts are guaranteed income and are never perturbed. A pinned seed derived from the inputs makes same-inputs → same-numbers (spec §4, §7).

**Tech Stack:** Plain TypeScript (compiled by `npm run build:retirement-planning` into `static/projects/retirement-planning/`), Node assert verification scripts matching the existing `verify.mjs` pattern. No new dependencies.

**This is Plan 1 of 4.** Later plans (separately): cockpit UI shell (icon array, fan chart, assumption strip), decision rail + zoom ritual, onboarding + ceremonies. Spec: `docs/superpowers/specs/2026-06-11-retirement-cockpit-redesign-design.md`.

## File structure

- Create: `static/projects/retirement-planning/models/rng.ts` — seeded PRNG + distributions (pure, no deps)
- Create: `static/projects/retirement-planning/models/futures.ts` — path simulation + aggregation
- Create: `projects-src/retirement-planning/verify-futures.mjs` — assertion tests (mirrors `verify.mjs`)
- Modify: `package.json` — add `verify:retirement-futures` script
- Modify: `static/projects/retirement-planning/types.ts` — add `futures` to `PlanBundle`
- Modify: `static/projects/retirement-planning/app.ts:166-179` — attach futures to each bundle

Conventions you must follow (from the existing codebase): models import each other with `./name.js` suffixes (TS compiled to ESM); verify scripts import the **compiled** `.js` from `static/projects/retirement-planning/` and run with plain `node`; always `npm run build:retirement-planning` before running a verify script.

---

### Task 1: Seeded RNG module

**Files:**
- Create: `static/projects/retirement-planning/models/rng.ts`
- Create: `projects-src/retirement-planning/verify-futures.mjs`
- Modify: `package.json` (scripts block)

- [ ] **Step 1: Add the npm script**

In root `package.json`, after `"verify:retirement-planning"`, add:

```json
"verify:retirement-futures": "node projects-src/retirement-planning/verify-futures.mjs"
```

- [ ] **Step 2: Write the failing test**

Create `projects-src/retirement-planning/verify-futures.mjs`:

```js
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
```

- [ ] **Step 3: Run test to verify it fails**

Run: `npm run build:retirement-planning && npm run verify:retirement-futures`
Expected: FAIL — `Cannot find module .../models/rng.js`

- [ ] **Step 4: Write the implementation**

Create `static/projects/retirement-planning/models/rng.ts`:

```typescript
export type Rng = () => number;

// FNV-1a 32-bit — stable across sessions, used to pin the seed to the inputs.
export function hashSeed(input: string): number {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < input.length; i += 1) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function mulberry32(seed: number): Rng {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function normal(rng: Rng, mean = 0, sd = 1): number {
  const u1 = Math.max(rng(), 1e-12);
  const u2 = rng();
  return mean + sd * Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
}

// Multiplier with E[x] = 1: exp(N(-sigma^2/2, sigma)).
export function lognormalMultiplier(rng: Rng, sigma: number): number {
  return Math.exp(normal(rng, -(sigma * sigma) / 2, sigma));
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npm run build:retirement-planning && npm run verify:retirement-futures`
Expected: `futures verification passed`

- [ ] **Step 6: Commit**

```bash
git add static/projects/retirement-planning/models/rng.ts projects-src/retirement-planning/verify-futures.mjs package.json
git commit -m "Add seeded RNG module for futures engine"
```

(Also stage the compiled `models/rng.js` / `rng.d.ts` if the build copied them into `static/` — match how existing model outputs are committed.)

---

### Task 2: Death-age sampling from the survival column

**Files:**
- Create: `static/projects/retirement-planning/models/futures.ts`
- Modify: `projects-src/retirement-planning/verify-futures.mjs`

- [ ] **Step 1: Write the failing test**

Append to `verify-futures.mjs` (note the fixture pattern copied from `verify.mjs:11-16`):

```js
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
assert.ok(
  Math.abs(medianDeath - result.medianAge) <= 3,
  `sampled median death age (${medianDeath}) should sit within 3y of deterministic medianAge (${result.medianAge})`
);
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run build:retirement-planning && npm run verify:retirement-futures`
Expected: FAIL — `Cannot find module .../models/futures.js`

- [ ] **Step 3: Write the implementation**

Create `static/projects/retirement-planning/models/futures.ts`:

```typescript
import type { CashflowRow, PlanData, PlanRunResult, ProfileData } from "../types.js";
import { hashSeed, lognormalMultiplier, mulberry32, normal, type Rng } from "./rng.js";

// Per-year conditional probability of dying before next row, from the cumulative
// survival column (already risk-adjusted in cashflow.ts:45).
export function deriveHazards(rows: PlanRunResult["rows"]): number[] {
  return rows.map((row, i) => {
    if (i === rows.length - 1) return 1;
    const s0 = row.survival;
    const s1 = rows[i + 1].survival;
    if (s0 <= 0) return 1;
    return Math.min(1, Math.max(0, 1 - s1 / s0));
  });
}

// Walks the hazard ladder; returns the age at the row in which death occurs.
export function sampleDeathAge(hazards: number[], rows: PlanRunResult["rows"], rng: Rng): number {
  for (let i = 0; i < hazards.length; i += 1) {
    if (rng() < hazards[i]) return rows[i].age;
  }
  return rows[rows.length - 1].age;
}

// Pinned seed: same profile+plan always produce the same futures (spec §4).
export function defaultSeed(profile: ProfileData, plan: PlanData): number {
  return hashSeed(JSON.stringify([profile, plan]));
}
```

(`simulateFutures` is added in Task 3 — to keep this step compiling, also add a temporary export:)

```typescript
export function simulateFutures(): never {
  throw new Error("not implemented");
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run build:retirement-planning && npm run verify:retirement-futures`
Expected: `futures verification passed`

- [ ] **Step 5: Commit**

```bash
git add static/projects/retirement-planning/models/futures.ts projects-src/retirement-planning/verify-futures.mjs
git commit -m "Derive yearly hazards and sample death ages from survival curve"
```

---

### Task 3: Path simulation + aggregation (`simulateFutures`)

**Files:**
- Modify: `static/projects/retirement-planning/models/futures.ts`
- Modify: `projects-src/retirement-planning/verify-futures.mjs`

- [ ] **Step 1: Write the failing test**

Append to `verify-futures.mjs`:

```js
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
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run build:retirement-planning && npm run verify:retirement-futures`
Expected: FAIL — `not implemented`

- [ ] **Step 3: Write the implementation**

In `futures.ts`, replace the temporary `simulateFutures` with:

```typescript
export interface FuturesOptions {
  paths?: number;
  seed?: number;
}

export type RedCause = "medical" | "longevity" | "market";

export interface RedFuture {
  deathAge: number;
  breachAge: number;
  minLiquid: number;
  cause: RedCause;
}

export interface FutureBand {
  age: number;
  p10: number;
  p50: number;
  p90: number;
}

export interface SamplePath {
  deathAge: number;
  ok: boolean;
  points: Array<{ age: number; liquid: number }>;
}

export interface FuturesSummary {
  paths: number;
  seed: number;
  okCount: number;
  okOf100: number;
  medianDeathAge: number;
  redFutures: RedFuture[];
  bands: FutureBand[];
  samplePaths: SamplePath[];
}

// What we perturb (and what we never touch): CPF LIFE payouts are guaranteed and
// stay deterministic; uncertainty enters through lifespan, medical out-of-pocket,
// and market deviation around the ledger's baked-in 2% assumption (cashflow.ts:37).
const MARKET_MEAN = 0.02;
const MARKET_SD = 0.1;
const MEDICAL_SIGMA = 0.45;
const SHOCK_FLAG_MULTIPLIER = 2;
const MIN_BAND_PATHS = 20;
const MAX_SAMPLE_PATHS = 100;

export function simulateFutures(
  result: PlanRunResult,
  profile: ProfileData,
  plan: PlanData,
  options: FuturesOptions = {}
): FuturesSummary {
  const paths = options.paths ?? 1000;
  const seed = options.seed ?? defaultSeed(profile, plan);
  const rng = mulberry32(seed);
  const rows = result.rows;
  const hazards = deriveHazards(rows);
  const marketBase = (profile.marketAssets || 0) + (profile.cpfInvestments || 0);

  const liquidByYear: number[][] = rows.map(() => []);
  const redFutures: RedFuture[] = [];
  const samplePaths: SamplePath[] = [];
  const deathAges: number[] = [];
  let okCount = 0;

  for (let p = 0; p < paths; p += 1) {
    const deathAge = sampleDeathAge(hazards, rows, rng);
    deathAges.push(deathAge);
    let liquid = rows[0].liquidAssets;
    let breachAge: number | null = null;
    let minLiquid = liquid;
    let medicalShockAtBreach = false;
    const points: Array<{ age: number; liquid: number }> = [];

    for (let y = 0; y < rows.length && rows[y].age <= deathAge; y += 1) {
      const row = rows[y];
      const medicalDraw = row.medicalCash * lognormalMultiplier(rng, MEDICAL_SIGMA);
      const marketDelta = marketBase * (normal(rng, MARKET_MEAN, MARKET_SD) - MARKET_MEAN);
      const net =
        row.grossIncomeAnnual - row.basicSpendAnnual - row.discretionaryAnnual - medicalDraw + marketDelta;
      liquid += net;
      points.push({ age: row.age, liquid });
      liquidByYear[y].push(liquid);
      if (liquid < minLiquid) minLiquid = liquid;
      if (breachAge === null && liquid < row.emergencyMinimum) {
        breachAge = row.age;
        medicalShockAtBreach = medicalDraw > row.medicalCash * SHOCK_FLAG_MULTIPLIER;
      }
    }

    const ok = breachAge === null;
    if (ok) {
      okCount += 1;
    } else {
      const cause: RedCause = medicalShockAtBreach
        ? "medical"
        : deathAge > result.medianAge + 5
          ? "longevity"
          : "market";
      redFutures.push({ deathAge, breachAge: breachAge as number, minLiquid, cause });
    }
    if (samplePaths.length < MAX_SAMPLE_PATHS) samplePaths.push({ deathAge, ok, points });
  }

  const bands: FutureBand[] = [];
  for (let y = 0; y < rows.length; y += 1) {
    const alive = liquidByYear[y];
    if (alive.length < MIN_BAND_PATHS) break;
    const sorted = [...alive].sort((a, b) => a - b);
    const at = (q: number) => sorted[Math.min(sorted.length - 1, Math.floor(q * sorted.length))];
    bands.push({ age: rows[y].age, p10: at(0.1), p50: at(0.5), p90: at(0.9) });
  }

  const sortedDeaths = [...deathAges].sort((a, b) => a - b);

  return {
    paths,
    seed,
    okCount,
    okOf100: Math.round((okCount / paths) * 100),
    medianDeathAge: sortedDeaths[Math.floor(sortedDeaths.length / 2)],
    redFutures,
    bands,
    samplePaths,
  };
}
```

Note the import of `CashflowRow` becomes unnecessary if unused — remove it from the import line if `tsc` flags it.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run build:retirement-planning && npm run verify:retirement-futures`
Expected: `futures verification passed`

- [ ] **Step 5: Run the existing suite to confirm nothing regressed**

Run: `npm run verify:retirement-planning`
Expected: `retirement-planning verification passed`

- [ ] **Step 6: Commit**

```bash
git add static/projects/retirement-planning/models/futures.ts projects-src/retirement-planning/verify-futures.mjs
git commit -m "Simulate seeded futures with bands, red-future records, and sample paths"
```

---

### Task 4: Expose futures on PlanBundle

**Files:**
- Modify: `static/projects/retirement-planning/types.ts` (PlanBundle, lines 302–308)
- Modify: `static/projects/retirement-planning/app.ts:166-179`
- Modify: `projects-src/retirement-planning/verify-futures.mjs`

- [ ] **Step 1: Write the failing test**

Append to `verify-futures.mjs`:

```js
// --- pinned default behavior used by the app layer ---
const futDefault = simulateFutures(result, profile, plan);
assert.equal(futDefault.paths, 1000, "app-layer default is 1000 paths");
assert.equal(futDefault.seed, defaultSeed(profile, plan), "app-layer default seed is pinned to inputs");
```

- [ ] **Step 2: Run test to verify it fails or passes**

Run: `npm run build:retirement-planning && npm run verify:retirement-futures`
Expected: PASS already (defaults were implemented in Task 3) — this test locks the contract the UI will rely on. If it fails, fix `simulateFutures` defaults, not the test.

- [ ] **Step 3: Add the type**

In `types.ts`, add to the imports section nothing (FuturesSummary lives in models); instead, to avoid a types→models import cycle, declare the field structurally on `PlanBundle`:

```typescript
import type { FuturesSummary } from "./models/futures.js";

export interface PlanBundle {
  plan: PlanData;
  result: PlanRunResult;
  recommendations: Recommendation[];
  panel: PanelInsight[];
  appendix: CashflowRow[];
  futures: FuturesSummary;
}
```

(`models/futures.ts` imports only `type` from `../types.js`, so the cycle is type-only and safe under `tsc` ESM output.)

- [ ] **Step 4: Wire into app.ts**

At `app.ts:166-179`, add the import at the top of the file with the other model imports:

```typescript
import { simulateFutures } from "./models/futures.js";
```

and extend the bundle construction:

```typescript
const result = runPlan(profile, plan);
const recommendations = computeRecommendations(profile, plan, result);
const futures = simulateFutures(result, profile, plan);
return {
  plan,
  result,
  recommendations,
  futures,
  panel: summarizePanel(profileRecord, plan, result, recommendations),
  appendix: buildAppendixRows(result),
};
```

- [ ] **Step 5: Typecheck, build, run both suites**

Run: `npm run typecheck:retirement-planning && npm run build:retirement-planning && npm run verify:retirement-futures && npm run verify:retirement-planning`
Expected: all pass. If `tsc` reports other constructors of `PlanBundle`, add the `futures` field there the same way.

- [ ] **Step 6: Sanity-check the live app**

Run: `npm run build:retirement-planning`, then open the local site (hugo serve or open `public/projects/retirement-planning/index.html` per repo workflow) and confirm the app still renders with no console errors — futures is computed but not yet displayed (that's Plan 2).

- [ ] **Step 7: Commit**

```bash
git add static/projects/retirement-planning/types.ts static/projects/retirement-planning/app.ts projects-src/retirement-planning/verify-futures.mjs
git commit -m "Attach pinned-seed futures summary to every plan bundle"
```

---

## Done means

`npm run verify:retirement-futures` and `npm run verify:retirement-planning` both pass; `simulateFutures(result, profile, plan)` returns an identical `FuturesSummary` for identical inputs across runs and sessions; every `PlanBundle` carries `futures` with `okOf100`, ordered bands, cause-tagged red futures, and ≤100 sample paths ready for the cockpit UI (Plan 2).
