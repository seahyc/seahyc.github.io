import { UNIFIED_INSURANCE_DB } from "../data/insurance-db.js";
const sourceDb = UNIFIED_INSURANCE_DB;
function buildPublicProvider() {
    return {
        plans: {
            medishield: {
                deductible: sourceDb.publicSchemes.medishieldLife.deductible,
                coinsurance: sourceDb.publicSchemes.medishieldLife.coinsurance,
                annualLimit: sourceDb.publicSchemes.medishieldLife.annualLimit,
                setting: "public",
                sourceId: sourceDb.publicSchemes.medishieldLife.sourceId,
            },
        },
    };
}
function wrapProvider(provider) {
    return { plans: provider.plans, sourceId: provider.sourceId };
}
export const LOCAL_INSURANCE_DB = {
    providers: {
        public: buildPublicProvider(),
        ...Object.fromEntries(Object.entries(sourceDb.insurers).map(([providerName, provider]) => [
            providerName,
            wrapProvider(provider),
        ])),
    },
    events: {
        routine: { publicCost: 1200, privateCost: 2800 },
        chronic: { publicCost: 3500, privateCost: 7000 },
        hospitalization: { publicCost: 14000, privateCost: 32000 },
        acute: { publicCost: 22000, privateCost: 52000 },
        frailty: { publicCost: 8000, privateCost: 18000 },
        ltc: { publicCost: 18000, privateCost: 38000 },
        endOfLife: { publicCost: 32000, privateCost: 72000 },
    },
    treatmentClasses: {
        inpatient: { publicCost: 18000, privateCost: 42000, medisavePct: 0.22, emergencyWeight: 0.45 },
        daySurgery: { publicCost: 6500, privateCost: 15000, medisavePct: 0.16, emergencyWeight: 0.18 },
        outpatientCancerDrug: { publicCost: 22000, privateCost: 42000, medisavePct: 0.08, emergencyWeight: 0.12 },
        outpatientCancerNonDrug: { publicCost: 12000, privateCost: 24000, medisavePct: 0.08, emergencyWeight: 0.08 },
        chronicSpecialist: { publicCost: 4200, privateCost: 9800, medisavePct: 0.02, emergencyWeight: 0.02 },
        emergencyAccident: { publicCost: 9000, privateCost: 24000, medisavePct: 0.12, emergencyWeight: 0.4 },
        rehabilitation: { publicCost: 4800, privateCost: 11000, medisavePct: 0.04, emergencyWeight: 0.06 },
        homeRecovery: { publicCost: 2800, privateCost: 7600, medisavePct: 0.02, emergencyWeight: 0.04 },
        mentalHealthInpatient: { publicCost: 8500, privateCost: 19000, medisavePct: 0.1, emergencyWeight: 0.1 },
        longTermCare: { publicCost: 16000, privateCost: 36000, medisavePct: 0.06, emergencyWeight: 0.24 },
    },
    eventTreatmentMix: {
        routine: { chronicSpecialist: 0.72, homeRecovery: 0.18, rehabilitation: 0.1 },
        chronic: { chronicSpecialist: 0.64, rehabilitation: 0.14, homeRecovery: 0.1, daySurgery: 0.12 },
        hospitalization: { inpatient: 0.72, daySurgery: 0.08, rehabilitation: 0.1, homeRecovery: 0.1 },
        acute: { emergencyAccident: 0.42, inpatient: 0.42, rehabilitation: 0.08, homeRecovery: 0.08 },
        frailty: { rehabilitation: 0.26, homeRecovery: 0.22, longTermCare: 0.3, chronicSpecialist: 0.22 },
        ltc: { longTermCare: 0.68, homeRecovery: 0.18, rehabilitation: 0.14 },
        endOfLife: { inpatient: 0.46, longTermCare: 0.24, homeRecovery: 0.18, chronicSpecialist: 0.12 },
    },
};
export function resolveInsurancePlan(insurance) {
    const provider = LOCAL_INSURANCE_DB.providers[insurance.shieldProvider || "public"] ?? { plans: {} };
    return provider.plans[insurance.shieldPlan || "medishield"] ?? provider.plans.medishield ?? Object.values(provider.plans)[0] ?? {};
}
export function getBlendedTreatmentCost(treatmentClass, carePreference = "public") {
    const schedule = LOCAL_INSURANCE_DB.treatmentClasses[treatmentClass] ?? LOCAL_INSURANCE_DB.treatmentClasses.chronicSpecialist;
    const privateWeight = carePreference === "private" ? 0.8 : carePreference === "mixed" ? 0.4 : 0.15;
    return {
        gross: schedule.publicCost * (1 - privateWeight) + schedule.privateCost * privateWeight,
        medisavePct: schedule.medisavePct,
        emergencyWeight: schedule.emergencyWeight,
    };
}
export function getCoverageRule(insurancePlan, treatmentClass) {
    const benefit = insurancePlan?.benefits?.[treatmentClass] || insurancePlan?.benefits?.chronicSpecialist || { coveragePct: 0.25, panelBoost: 1, annualCap: 5000 };
    return {
        coveragePct: benefit.coveragePct ?? 0.25,
        panelBoost: benefit.panelBoost ?? 1,
        annualCap: benefit.annualCap ?? null,
    };
}
export function getClaimPathAdjustments(insurancePlan, carePreference = "public", treatmentClass = "chronicSpecialist") {
    const claimPathRules = (insurancePlan?.claimPathRules || {});
    const prefersPrivate = carePreference === "private";
    const scheduledTreatment = treatmentClass !== "emergencyAccident";
    const panelWeight = prefersPrivate
        ? (insurancePlan?.panelStrength === "high" ? 0.82 : insurancePlan?.panelStrength === "medium" ? 0.68 : 0.55)
        : carePreference === "mixed"
            ? 0.72
            : 0.92;
    const panelFactor = insurancePlan?.panelRequiredForBestTerms
        ? panelWeight * (insurancePlan?.preferredProviderFactor || 1) + (1 - panelWeight) * (insurancePlan?.nonPanelCoveragePenalty || 0.78)
        : 1;
    const preAuthorisationFactor = insurancePlan?.preAuthorisationRequiredForBestTerms
        ? (scheduledTreatment || !insurancePlan?.emergencyPreAuthExempt)
            ? insurancePlan?.preAuthorisationFailurePenalty || (0.9 + (prefersPrivate ? 0.03 : 0.06))
            : 1
        : 1;
    const cancerDrugListFactor = treatmentClass === "outpatientCancerDrug"
        ? (claimPathRules.outpatientCancerDrugCoverage?.includes("cdl-and-non-cdl")
            ? 1
            : 1 - (insurancePlan?.nonCdlCancerPenalty || 0))
        : 1;
    const deductibleWaiverApplies = claimPathRules.deductibleWaiverAppliesTo?.includes(treatmentClass) ?? (treatmentClass === "inpatient" || treatmentClass === "daySurgery");
    const deductibleWaiverFactor = insurancePlan?.deductibleWaiverEligible && deductibleWaiverApplies ? 1.03 : 1;
    const riderCopayApplies = claimPathRules.riderCoPayAppliesTo?.includes(treatmentClass) ?? scheduledTreatment;
    const riderCopayFactor = insurancePlan?.riderCopayPct && riderCopayApplies ? Math.max(0.82, 1 - insurancePlan.riderCopayPct) : 1;
    const scheduledTreatmentFactor = scheduledTreatment
        ? 1
        : insurancePlan?.emergencyPreAuthExempt
            ? 1.02
            : 0.96;
    return {
        panelWeight,
        panelFactor,
        preAuthorisationFactor,
        cancerDrugListFactor,
        deductibleWaiverFactor,
        riderCopayFactor,
        scheduledTreatmentFactor,
    };
}
