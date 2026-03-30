import type { PlanData, PlanRunResult, ProfileData, Recommendation } from "../types.js";
interface SensitivityDiagnostic {
    id: string;
    label: string;
    impact: number;
    unit: "years" | "currency" | "monthly-currency" | "percent";
    signal: "High" | "Medium" | "Low";
    why: string;
}
export declare function computeRecommendations(profile: ProfileData, plan: PlanData, result: PlanRunResult): Recommendation[];
export declare function buildSensitivityDiagnostics(profile: ProfileData, plan: PlanData, result: PlanRunResult): SensitivityDiagnostic[];
export {};
