import type { FrailtySummary, ProfileData } from "../types.js";
import type { TreatmentClass } from "../policy/medical-schemes.js";
export declare function estimateMedicalCosts({ age, profile, frailty }: {
    age: number;
    profile: ProfileData;
    frailty: FrailtySummary;
}): {
    eventMix: import("./medical-events.js").MedicalEventMix;
    gross: number;
    insurerPaid: number;
    medisavePaid: number;
    cashOutOfPocket: number;
    expectedEmergency: number;
    diseaseOverhead: number;
    treatmentTotals: Partial<Record<TreatmentClass, number>>;
    insuranceFeatures: {
        panelRequiredForBestTerms: boolean;
        preAuthorisationRequiredForBestTerms: boolean;
        deductibleWaiverEligible: boolean;
        stopLossAnnual: number | null;
        outpatientCancerMultiplier: number;
    };
    claimPathTotals: {
        panelPenalty: number;
        preAuthorisationPenalty: number;
        cancerDrugPenalty: number;
        deductibleWaiverGain: number;
        riderCopayPenalty: number;
        scheduledTreatmentAdjustment: number;
    };
    diseaseBreakdown: {
        key: string;
        category: string;
        gross: number;
        surveillanceCadenceMonths: number;
        recurrenceIntensity: number;
        surveillanceCost: number;
        recurrenceCost: number;
        pathwayTreatmentCost: number;
        claimsPathway: unknown;
    }[];
};
