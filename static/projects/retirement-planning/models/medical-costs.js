import { resolveInsurancePlan, LOCAL_INSURANCE_DB, getBlendedTreatmentCost, getClaimPathAdjustments, getCoverageRule } from "../policy/medical-schemes.js";
import { estimateMedicalEventMix } from "./medical-events.js";
import { parseDiseaseList } from "../data/disease-db.js";
function blendWeightMaps(baseMix = {}, overrideMix = {}) {
    const blended = { ...baseMix };
    Object.entries(overrideMix).forEach(([key, value]) => {
        blended[key] = (blended[key] || 0) + value;
    });
    const total = Object.values(blended).reduce((sum, value) => sum + value, 0) || 1;
    return Object.fromEntries(Object.entries(blended).map(([key, value]) => [key, value / total]));
}
function recurrenceWeightForAge(age, disease) {
    const approximateYearsSinceDiagnosis = Math.max(0, age - 60);
    const weights = disease.recurrenceWeightByYears || [];
    if (!weights.length)
        return disease.claimsPathway?.recurrenceIntensity || disease.emergencyMedicalWeight || 0;
    const match = weights.find((item) => approximateYearsSinceDiagnosis <= (item.year ?? item.yearsSince ?? 0));
    return match?.recurrenceWeight ?? weights.at(-1)?.recurrenceWeight ?? 0;
}
export function estimateMedicalCosts({ age, profile, frailty }) {
    const eventMix = estimateMedicalEventMix(age, profile, frailty.state);
    const insurancePlan = resolveInsurancePlan(profile.insurance || {});
    const carePreference = profile.insurance?.carePreference || "public";
    const treatmentTotals = {};
    const diseaseBreakdown = [];
    let gross = 0;
    let expectedEmergency = 0;
    Object.entries(eventMix).forEach(([event, probability]) => {
        const treatmentMix = LOCAL_INSURANCE_DB.eventTreatmentMix[event] || { chronicSpecialist: 1 };
        Object.entries(treatmentMix).forEach(([treatmentClass, treatmentWeight]) => {
            const schedule = getBlendedTreatmentCost(treatmentClass, carePreference);
            const weightedCost = schedule.gross * probability * treatmentWeight;
            treatmentTotals[treatmentClass] = (treatmentTotals[treatmentClass] || 0) + weightedCost;
            gross += weightedCost;
            expectedEmergency += weightedCost * schedule.emergencyWeight;
        });
    });
    gross *= frailty.annualMedicalLoadMultiplier;
    let diseaseOverhead = 0;
    parseDiseaseList([...(profile.chronicConditions || []), ...(profile.priorSeriousConditions || [])]).forEach(({ key, profile: disease }) => {
        const claimsPath = disease.claimsPathway || {};
        const cadenceMonths = claimsPath.surveillanceCadenceMonths || 12;
        const followUpMultiplier = Math.max(1, 12 / cadenceMonths);
        const pathwayMix = blendWeightMaps(disease.treatmentMix || {}, claimsPath.pathBias || {});
        const recurrenceIntensity = Math.max(claimsPath.recurrenceIntensity || 0, recurrenceWeightForAge(age, disease));
        const diseaseGrossStart = diseaseOverhead;
        const surveillanceCost = disease.surveillanceCostAnnual * followUpMultiplier;
        const recurrenceCost = disease.chronicCostAnnual * recurrenceIntensity;
        diseaseOverhead += disease.chronicCostAnnual + surveillanceCost + recurrenceCost;
        expectedEmergency += disease.emergencyMedicalWeight * 6000 * followUpMultiplier;
        expectedEmergency += recurrenceIntensity * 4200;
        let pathwayTreatmentCost = 0;
        Object.entries(pathwayMix).forEach(([treatmentClass, treatmentWeight]) => {
            const schedule = getBlendedTreatmentCost(treatmentClass, carePreference);
            const weightedCost = schedule.gross * treatmentWeight * disease.hospitalizationMultiplier * (1 + recurrenceIntensity * 0.35);
            treatmentTotals[treatmentClass] = (treatmentTotals[treatmentClass] || 0) + weightedCost;
            pathwayTreatmentCost += weightedCost;
            expectedEmergency += weightedCost * schedule.emergencyWeight * 0.5;
        });
        if (key === "breast-cancer") {
            const surveillanceWeight = age < 75 ? 1 : 0.7;
            diseaseOverhead += 2200 * surveillanceWeight;
            expectedEmergency += 1800 * surveillanceWeight;
        }
        diseaseBreakdown.push({
            key,
            category: disease.category,
            gross: diseaseOverhead - diseaseGrossStart,
            surveillanceCadenceMonths: cadenceMonths,
            recurrenceIntensity,
            surveillanceCost,
            recurrenceCost,
            pathwayTreatmentCost,
            claimsPathway: claimsPath,
        });
    });
    gross += diseaseOverhead;
    const riderFactor = insurancePlan.riderCoverage || 0;
    const deductible = insurancePlan.deductible || 2500;
    const claimPathRules = (insurancePlan.claimPathRules || {});
    const annualLimit = insurancePlan.annualLimit || gross;
    const claimPathTotals = {
        panelPenalty: 0,
        preAuthorisationPenalty: 0,
        cancerDrugPenalty: 0,
        deductibleWaiverGain: 0,
        riderCopayPenalty: 0,
        scheduledTreatmentAdjustment: 0,
    };
    let insurerPaid = 0;
    let remainingDeductible = deductible;
    Object.entries(treatmentTotals).forEach(([treatmentClass, classGrossRaw]) => {
        const treatmentKey = treatmentClass;
        const classGross = classGrossRaw * frailty.annualMedicalLoadMultiplier;
        const coverage = getCoverageRule(insurancePlan, treatmentKey);
        const claimPath = getClaimPathAdjustments(insurancePlan, carePreference, treatmentKey);
        const planBoost = treatmentClass.startsWith("outpatientCancer")
            ? (insurancePlan.outpatientCancerMultiplier || 1)
            : 1;
        const afterDeductible = Math.max(0, classGross - remainingDeductible);
        remainingDeductible = Math.max(0, remainingDeductible - classGross);
        const coveredBeforeCap = afterDeductible
            * coverage.coveragePct
            * claimPath.panelFactor
            * claimPath.preAuthorisationFactor
            * claimPath.cancerDrugListFactor
            * claimPath.deductibleWaiverFactor
            * claimPath.riderCopayFactor
            * claimPath.scheduledTreatmentFactor
            * planBoost
            * coverage.panelBoost;
        const riderCovered = afterDeductible * riderFactor * (insurancePlan.coinsurance || 0.1) * claimPath.riderCopayFactor;
        const nonPanelCap = claimPathRules.extendedPanelAnnualCap || coverage.annualCap;
        const cappedCovered = Math.min(nonPanelCap || coveredBeforeCap + riderCovered, coveredBeforeCap + riderCovered);
        insurerPaid += cappedCovered;
        claimPathTotals.panelPenalty += afterDeductible * (1 - claimPath.panelFactor);
        claimPathTotals.preAuthorisationPenalty += afterDeductible * (1 - claimPath.preAuthorisationFactor);
        claimPathTotals.cancerDrugPenalty += afterDeductible * (1 - claimPath.cancerDrugListFactor);
        claimPathTotals.deductibleWaiverGain += afterDeductible * (claimPath.deductibleWaiverFactor - 1);
        claimPathTotals.riderCopayPenalty += afterDeductible * (1 - claimPath.riderCopayFactor);
        claimPathTotals.scheduledTreatmentAdjustment += afterDeductible * (1 - claimPath.scheduledTreatmentFactor);
    });
    insurerPaid = Math.min(annualLimit, insurerPaid);
    const medisaveCapacity = Object.entries(treatmentTotals).reduce((sum, [treatmentClass, classGrossRaw]) => {
        const schedule = getBlendedTreatmentCost(treatmentClass, carePreference);
        return sum + classGrossRaw * schedule.medisavePct;
    }, 0);
    const medisavePaid = Math.min(profile.ma, medisaveCapacity);
    const cashOutOfPocket = Math.max(0, gross - insurerPaid - medisavePaid);
    return {
        eventMix,
        gross,
        insurerPaid,
        medisavePaid,
        cashOutOfPocket,
        expectedEmergency,
        diseaseOverhead,
        treatmentTotals,
        insuranceFeatures: {
            panelRequiredForBestTerms: Boolean(insurancePlan.panelRequiredForBestTerms),
            preAuthorisationRequiredForBestTerms: Boolean(insurancePlan.preAuthorisationRequiredForBestTerms),
            deductibleWaiverEligible: Boolean(insurancePlan.deductibleWaiverEligible),
            stopLossAnnual: insurancePlan.stopLossAnnual || insurancePlan.riderStopLossAnnual || null,
            outpatientCancerMultiplier: insurancePlan.outpatientCancerMultiplier || 1,
        },
        claimPathTotals,
        diseaseBreakdown,
    };
}
