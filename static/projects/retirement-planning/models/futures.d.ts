import type { PlanData, PlanRunResult, ProfileData } from "../types.js";
import { type Rng } from "./rng.js";
export declare function deriveHazards(rows: PlanRunResult["rows"]): number[];
export declare function sampleDeathAge(hazards: number[], rows: PlanRunResult["rows"], rng: Rng): number;
export declare function defaultSeed(profile: ProfileData, plan: PlanData): number;
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
    points: Array<{
        age: number;
        liquid: number;
    }>;
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
export declare function simulateFutures(result: PlanRunResult, profile: ProfileData, plan: PlanData, options?: FuturesOptions): FuturesSummary;
