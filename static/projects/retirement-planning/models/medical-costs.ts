// @ts-nocheck
import { resolveInsurancePlan, LOCAL_INSURANCE_DB, getBlendedTreatmentCost, getClaimPathAdjustments, getCoverageRule } from "../policy/medical-schemes.js";
import { estimateMedicalEventMix } from "./medical-events.js";
import { parseDiseaseList } from "../data/disease-db.js";

export function estimateMedicalCosts({ age, profile, frailty }) {
  const eventMix = estimateMedicalEventMix(age, profile, frailty.state);
  const insurancePlan = resolveInsurancePlan(profile.insurance || {});
  const carePreference = profile.insurance?.carePreference || "public";
  const treatmentTotals = {};
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
    diseaseOverhead += disease.chronicCostAnnual + disease.surveillanceCostAnnual;
    expectedEmergency += disease.emergencyMedicalWeight * 6000;
    Object.entries(disease.treatmentMix || {}).forEach(([treatmentClass, treatmentWeight]) => {
      const schedule = getBlendedTreatmentCost(treatmentClass, carePreference);
      const weightedCost = schedule.gross * treatmentWeight * disease.hospitalizationMultiplier;
      treatmentTotals[treatmentClass] = (treatmentTotals[treatmentClass] || 0) + weightedCost;
      expectedEmergency += weightedCost * schedule.emergencyWeight * 0.5;
    });
    if (key === "breast-cancer") {
      const surveillanceWeight = age < 75 ? 1 : 0.7;
      diseaseOverhead += 2200 * surveillanceWeight;
      expectedEmergency += 1800 * surveillanceWeight;
    }
  });
  gross += diseaseOverhead;
  const riderFactor = profile.insurance?.rider ? (insurancePlan.riderCoverage || 0.75) : 0;
  const deductible = insurancePlan.deductible || 2500;
  const panelFactor = insurancePlan.panelRequiredForBestTerms && carePreference === "private"
    ? (insurancePlan.preferredProviderFactor || 1)
    : 1;
  const annualLimit = insurancePlan.annualLimit || gross;
  const claimPathTotals = {
    panelPenalty: 0,
    preAuthorisationPenalty: 0,
    cancerDrugPenalty: 0,
  };
  let insurerPaid = 0;
  let remainingDeductible = deductible;
  Object.entries(treatmentTotals).forEach(([treatmentClass, classGrossRaw]) => {
    const classGross = classGrossRaw * frailty.annualMedicalLoadMultiplier;
    const coverage = getCoverageRule(insurancePlan, treatmentClass);
    const claimPath = getClaimPathAdjustments(insurancePlan, carePreference, treatmentClass);
    const planBoost = treatmentClass.startsWith("outpatientCancer")
      ? (insurancePlan.outpatientCancerMultiplier || 1)
      : 1;
    const afterDeductible = Math.max(0, classGross - remainingDeductible);
    remainingDeductible = Math.max(0, remainingDeductible - classGross);
    const coveredBeforeCap = afterDeductible
      * coverage.coveragePct
      * panelFactor
      * claimPath.panelFactor
      * claimPath.preAuthorisationFactor
      * claimPath.cancerDrugListFactor
      * claimPath.deductibleWaiverFactor
      * planBoost
      * coverage.panelBoost;
    const riderCovered = afterDeductible * riderFactor * (insurancePlan.coinsurance || 0.1);
    const cappedCovered = Math.min(coverage.annualCap || coveredBeforeCap + riderCovered, coveredBeforeCap + riderCovered);
    insurerPaid += cappedCovered;
    claimPathTotals.panelPenalty += afterDeductible * (1 - claimPath.panelFactor);
    claimPathTotals.preAuthorisationPenalty += afterDeductible * (1 - claimPath.preAuthorisationFactor);
    claimPathTotals.cancerDrugPenalty += afterDeductible * (1 - claimPath.cancerDrugListFactor);
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
  };
}
