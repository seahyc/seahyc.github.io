import type { PlanData, PlanRunResult, ProfileData } from "../types.js";
import { hashSeed, lognormalMultiplier, mulberry32, normal, type Rng } from "./rng.js";

// Per-year conditional probability of dying before next row, from the cumulative
// survival column (already risk-adjusted in cashflow.ts:45).
//
// KNOWN DIVERGENCE: this survival column and result.medianAge use different mortality
// models — the column raises base survival to riskMultiplier (cashflow.ts:45) while
// medianAge divides remaining years by it (cashflow.ts:18-20). For the default profile
// they sit ~12y apart (survival-curve median ~76-77 vs medianAge ~88.8). The futures
// engine intentionally anchors on the survival column it samples from; do NOT "fix" it
// against medianAge. Reconciling the two mortality models is a separate, pre-existing
// concern tracked outside this engine.
export function deriveHazards(rows: PlanRunResult["rows"]): number[] {
  return rows.map((row, i) => {
    if (i === rows.length - 1) return 1;
    const s0 = row.survival;
    const s1 = rows[i + 1]?.survival ?? 0;
    if (s0 <= 0) return 1;
    return Math.min(1, Math.max(0, 1 - s1 / s0));
  });
}

// Walks the hazard ladder; returns the age at the row in which death occurs.
export function sampleDeathAge(hazards: number[], rows: PlanRunResult["rows"], rng: Rng): number {
  const last = rows[rows.length - 1];
  for (let i = 0; i < hazards.length; i += 1) {
    if (rng() < (hazards[i] ?? 1)) return rows[i]?.age ?? last?.age ?? 0;
  }
  return last?.age ?? 0;
}

// Pinned seed: same profile+plan always produce the same futures (spec §4).
export function defaultSeed(profile: ProfileData, plan: PlanData): number {
  return hashSeed(JSON.stringify([profile, plan]));
}

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
    let liquid = rows[0]?.liquidAssets ?? 0;
    let breachAge: number | null = null;
    let minLiquid = liquid;
    let medicalShockAtBreach = false;
    const points: Array<{ age: number; liquid: number }> = [];

    for (let y = 0; y < rows.length; y += 1) {
      const row = rows[y];
      if (!row || row.age > deathAge) break;
      const medicalDraw = row.medicalCash * lognormalMultiplier(rng, MEDICAL_SIGMA);
      const marketDelta = marketBase * (normal(rng, MARKET_MEAN, MARKET_SD) - MARKET_MEAN);
      const net =
        row.grossIncomeAnnual - row.basicSpendAnnual - row.discretionaryAnnual - medicalDraw + marketDelta;
      liquid += net;
      points.push({ age: row.age, liquid });
      liquidByYear[y]?.push(liquid);
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
    const alive = liquidByYear[y] ?? [];
    if (alive.length < MIN_BAND_PATHS) break;
    const sorted = [...alive].sort((a, b) => a - b);
    const at = (q: number) => sorted[Math.min(sorted.length - 1, Math.floor(q * sorted.length))] ?? 0;
    bands.push({ age: rows[y]?.age ?? 0, p10: at(0.1), p50: at(0.5), p90: at(0.9) });
  }

  const sortedDeaths = [...deathAges].sort((a, b) => a - b);

  return {
    paths,
    seed,
    okCount,
    okOf100: Math.round((okCount / paths) * 100),
    medianDeathAge: sortedDeaths[Math.floor(sortedDeaths.length / 2)] ?? 0,
    redFutures,
    bands,
    samplePaths,
  };
}
