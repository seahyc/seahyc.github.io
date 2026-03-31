import type { PanelInsight, PlanBundle, PlanData, PlanRunResult, ProfileRecord, Recommendation } from "../types.js";
interface SensitivityNote {
    label: string;
    why: string;
}
interface DiffSummaryItem {
    label: string;
    current: number;
    comparison: number;
    delta: number;
    unit: "currency-monthly" | "years" | "currency";
}
interface InsuranceInspectorContext {
    providerLabel: string;
    planLabel: string;
    riderLabel: string;
    planSku: string;
    riderSku: string;
    planEffectiveFrom: string;
    riderEffectiveFrom: string;
    sourceLabel: string;
    sourceUrl: string;
    generatedAt: string;
    planCount: number;
    benefitClassCount: number;
    panelStrength: string;
    preAuthSummary: string;
    targetCoverage: string;
}
export declare function summarizePanel(profile: ProfileRecord, plan: PlanData, result: PlanRunResult, recommendations: Recommendation[]): PanelInsight[];
export declare function buildExpertReview(profile: ProfileRecord, plan: PlanData, result: PlanRunResult, recommendations: Recommendation[], sensitivities: SensitivityNote[], insuranceContext?: InsuranceInspectorContext): {
    assumptions: string[];
    findings: string[];
    rationale: string[];
};
export declare function buildPlanDiffSummary(currentBundle: PlanBundle, comparisonBundle: PlanBundle | null): DiffSummaryItem[];
export {};
