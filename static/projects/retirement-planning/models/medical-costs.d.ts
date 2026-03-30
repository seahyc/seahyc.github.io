export declare function estimateMedicalCosts({ age, profile, frailty }: {
    age: any;
    profile: any;
    frailty: any;
}): {
    eventMix: {
        [k: string]: number;
    };
    gross: number;
    insurerPaid: number;
    medisavePaid: number;
    cashOutOfPocket: number;
    expectedEmergency: number;
    diseaseOverhead: number;
    treatmentTotals: {};
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
    diseaseBreakdown: any[];
};
