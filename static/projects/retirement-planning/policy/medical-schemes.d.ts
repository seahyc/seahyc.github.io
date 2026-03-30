import type { CarePreference } from "../types.js";
export type TreatmentClass = "inpatient" | "daySurgery" | "outpatientCancerDrug" | "outpatientCancerNonDrug" | "chronicSpecialist" | "emergencyAccident" | "rehabilitation" | "homeRecovery" | "mentalHealthInpatient" | "longTermCare";
export interface CoverageBenefit {
    coveragePct?: number;
    panelBoost?: number;
    annualCap?: number | null;
}
export interface InsurancePlanLike {
    deductible?: number;
    coinsurance?: number;
    annualLimit?: number;
    sourceId?: string;
    setting?: string;
    panelRequiredForBestTerms?: boolean;
    panelStrength?: "low" | "medium" | "high" | string;
    preferredProviderFactor?: number;
    nonPanelCoveragePenalty?: number;
    preAuthorisationRequiredForBestTerms?: boolean;
    preAuthorisationFailurePenalty?: number;
    deductibleWaiverEligible?: boolean;
    deductibleWaiverResetYears?: number;
    riderCoverage?: number;
    riderCopayPct?: number;
    riderCopayCapAnnual?: number;
    riderStopLossAnnual?: number;
    stopLossAnnual?: number;
    outpatientCancerMultiplier?: number;
    nonCdlCancerPenalty?: number;
    benefits?: Partial<Record<TreatmentClass, CoverageBenefit>>;
    [key: string]: unknown;
}
export interface ClaimPathAdjustments {
    panelWeight: number;
    panelFactor: number;
    preAuthorisationFactor: number;
    cancerDrugListFactor: number;
    deductibleWaiverFactor: number;
    riderCopayFactor: number;
    scheduledTreatmentFactor: number;
}
export interface TreatmentClassSchedule {
    publicCost: number;
    privateCost: number;
    medisavePct: number;
    emergencyWeight: number;
}
export interface EventCostSchedule {
    publicCost: number;
    privateCost: number;
}
export interface TreatmentCostSchedule {
    gross: number;
    medisavePct: number;
    emergencyWeight: number;
}
export interface CoverageRule {
    coveragePct: number;
    panelBoost: number;
    annualCap: number | null;
}
type ProviderEntry = {
    plans: Record<string, InsurancePlanLike>;
    sourceId?: string;
};
export declare const LOCAL_INSURANCE_DB: {
    providers: Record<string, ProviderEntry>;
    events: Record<string, EventCostSchedule>;
    treatmentClasses: Record<TreatmentClass, TreatmentClassSchedule>;
    eventTreatmentMix: Record<string, Partial<Record<TreatmentClass, number>>>;
};
export declare function resolveInsurancePlan(insurance: {
    shieldProvider?: string;
    shieldPlan?: string;
}): InsurancePlanLike;
export declare function getBlendedTreatmentCost(treatmentClass: TreatmentClass, carePreference?: CarePreference): TreatmentCostSchedule;
export declare function getCoverageRule(insurancePlan: InsurancePlanLike | undefined, treatmentClass: TreatmentClass): CoverageRule;
export declare function getClaimPathAdjustments(insurancePlan: InsurancePlanLike | undefined, carePreference?: CarePreference, treatmentClass?: TreatmentClass): ClaimPathAdjustments;
export {};
