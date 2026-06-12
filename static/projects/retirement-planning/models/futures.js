import { hashSeed, lognormalMultiplier, mulberry32, normal } from "./rng.js";
// Per-year conditional probability of dying before next row, from the cumulative
// survival column.
//
// RESOLVED (was KNOWN DIVERGENCE): the survival column and result.medianAge now come
// from ONE reconciled mortality model. cashflow.ts calibrates the baseline curve so its
// median matches the SingStat remaining-years table, applies riskMultiplier in hazard
// form (per-year qx·m, not survival**m), and derives medianAge/p75/p90/modalAge from
// that same adjusted column. So the survival-curve median and result.medianAge agree
// (within rounding), and the sampled futures median death tracks medianAge — the
// verify-futures cross-check enforces this. This engine still anchors on the survival
// column it samples from; that column is now consistent with medianAge by construction.
export function deriveHazards(rows) {
    return rows.map((row, i) => {
        if (i === rows.length - 1)
            return 1;
        const s0 = row.survival;
        const s1 = rows[i + 1]?.survival ?? 0;
        if (s0 <= 0)
            return 1;
        return Math.min(1, Math.max(0, 1 - s1 / s0));
    });
}
// Walks the hazard ladder; returns the age at the row in which death occurs.
export function sampleDeathAge(hazards, rows, rng) {
    const last = rows[rows.length - 1];
    for (let i = 0; i < hazards.length; i += 1) {
        if (rng() < (hazards[i] ?? 1))
            return rows[i]?.age ?? last?.age ?? 0;
    }
    return last?.age ?? 0;
}
// Pinned seed: same profile+plan always produce the same futures (spec §4).
export function defaultSeed(profile, plan) {
    return hashSeed(JSON.stringify([profile, plan]));
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
export function simulateFutures(result, profile, plan, options = {}) {
    const paths = options.paths ?? 1000;
    const seed = options.seed ?? defaultSeed(profile, plan);
    const rng = mulberry32(seed);
    const rows = result.rows;
    const hazards = deriveHazards(rows);
    const marketBase = (profile.marketAssets || 0) + (profile.cpfInvestments || 0);
    const liquidByYear = rows.map(() => []);
    const redFutures = [];
    const samplePaths = [];
    const deathAges = [];
    let okCount = 0;
    for (let p = 0; p < paths; p += 1) {
        const deathAge = sampleDeathAge(hazards, rows, rng);
        deathAges.push(deathAge);
        // Re-anchor on the deterministic, now-draining liquidAssets (cashflow.ts threads
        // Σ netAnnual into each row). The income−spend drain therefore lives entirely in
        // rows[y].liquidAssets; here we add ONLY the stochastic deviations around it —
        // medical out-of-pocket above/below its expected cash, and market deviation
        // around the ledger's baked-in 2% — so consumption is never double-counted.
        let cumDelta = 0;
        let breachAge = null;
        let minLiquid = rows[0]?.liquidAssets ?? 0;
        let medicalShockAtBreach = false;
        const points = [];
        for (let y = 0; y < rows.length; y += 1) {
            const row = rows[y];
            if (!row || row.age > deathAge)
                break;
            const medicalDraw = row.medicalCash * lognormalMultiplier(rng, MEDICAL_SIGMA);
            const marketDelta = marketBase * (normal(rng, MARKET_MEAN, MARKET_SD) - MARKET_MEAN);
            // The anchor row.liquidAssets already drains the deterministic medicalCash (via
            // netAnnual). The stochastic adjustment REPLACES that with the actual medicalDraw:
            // contribution = −medicalDraw − (−medicalCash) = (medicalCash − medicalDraw). A
            // shock (medicalDraw > medicalCash) therefore lowers liquid, as it must — never
            // double-counting or inverting the drain.
            cumDelta += (row.medicalCash - medicalDraw) + marketDelta;
            const liquid = row.liquidAssets + cumDelta;
            points.push({ age: row.age, liquid });
            liquidByYear[y]?.push(liquid);
            if (liquid < minLiquid)
                minLiquid = liquid;
            if (breachAge === null && liquid < row.emergencyMinimum) {
                breachAge = row.age;
                medicalShockAtBreach = medicalDraw > row.medicalCash * SHOCK_FLAG_MULTIPLIER;
            }
        }
        const ok = breachAge === null;
        if (ok) {
            okCount += 1;
        }
        else {
            const cause = medicalShockAtBreach
                ? "medical"
                : deathAge > result.medianAge + 5
                    ? "longevity"
                    : "market";
            redFutures.push({ deathAge, breachAge: breachAge, minLiquid, cause });
        }
        if (samplePaths.length < MAX_SAMPLE_PATHS)
            samplePaths.push({ deathAge, ok, points });
    }
    const bands = [];
    for (let y = 0; y < rows.length; y += 1) {
        const alive = liquidByYear[y] ?? [];
        if (alive.length < MIN_BAND_PATHS)
            break;
        const sorted = [...alive].sort((a, b) => a - b);
        const at = (q) => sorted[Math.min(sorted.length - 1, Math.floor(q * sorted.length))] ?? 0;
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
