import { parseDiseaseList } from "../data/disease-db.js";
import type { FrailtyState, ParsedDisease, ProfileData } from "../types.js";

export type MedicalEventMix = Record<"routine" | "chronic" | "hospitalization" | "acute" | "frailty" | "ltc" | "endOfLife", number>;

export function estimateMedicalEventMix(age: number, profile: ProfileData, frailtyState: FrailtyState): MedicalEventMix {
  const priorSerious = profile.priorSeriousConditions || [];
  const chronicCount = profile.chronicConditions?.length || 0;
  const eventMix: MedicalEventMix = {
    routine: 0.24,
    chronic: 0.28 + chronicCount * 0.03,
    hospitalization: 0.15 + Math.max(0, age - 70) * 0.004,
    acute: 0.07 + Math.max(0, age - 72) * 0.003,
    frailty: frailtyState === "frail" ? 0.16 : frailtyState === "prefrail" ? 0.1 : 0.05,
    ltc: Math.max(0.02, age >= 80 ? 0.1 : age >= 75 ? 0.06 : 0.03),
    endOfLife: age >= 85 ? 0.05 : 0.015,
  };
  parseDiseaseList([...(profile.chronicConditions || []), ...priorSerious]).forEach(({ profile: disease }: ParsedDisease) => {
    const claimsPath = disease.claimsPathway || {};
    const recurrencePeak = Array.isArray(disease.recurrenceWeightByYears) && disease.recurrenceWeightByYears.length
      ? disease.recurrenceWeightByYears[0]?.recurrenceWeight || disease.emergencyMedicalWeight
      : disease.emergencyMedicalWeight;
    const agePressure = age >= 80 ? 1.2 : age >= 75 ? 1.08 : age >= 70 ? 1.02 : 0.96;
    const diseasePressure = recurrencePeak * agePressure;
    const pathBias = claimsPath.pathBias || {};
    eventMix.routine += diseasePressure * 0.03;
    eventMix.chronic += diseasePressure * (0.42 + (pathBias.chronicSpecialist || 0) * 0.22);
    eventMix.hospitalization += diseasePressure * (0.28 + (pathBias.inpatient || 0) * 0.2);
    eventMix.acute += diseasePressure * (0.1 + (pathBias.emergencyAccident || 0) * 0.18);
    eventMix.frailty += diseasePressure * ((pathBias.homeRecovery || 0) * 0.18 + (pathBias.rehabilitation || 0) * 0.12);
    eventMix.ltc += diseasePressure * ((pathBias.longTermCare || 0) * 0.22 + (claimsPath.recurrenceIntensity || 0) * 0.08);
    eventMix.endOfLife += diseasePressure * ((pathBias.palliative || 0) * 0.22 + (disease.hospitalizationMultiplier > 1.2 ? 0.03 : 0));
    if (disease.category === "cancer") {
      eventMix.hospitalization += diseasePressure * 0.04;
      eventMix.acute += diseasePressure * 0.03;
      eventMix.endOfLife += diseasePressure * 0.04;
    }
    if (disease.category === "neurologic") {
      eventMix.frailty += diseasePressure * 0.06;
      eventMix.ltc += diseasePressure * 0.05;
    }
    if (disease.category === "renal") {
      eventMix.ltc += diseasePressure * 0.06;
      eventMix.hospitalization += diseasePressure * 0.05;
    }
  });
  const total = Object.values(eventMix).reduce((sum, value) => sum + value, 0);
  return Object.fromEntries(Object.entries(eventMix).map(([key, value]) => [key, value / total])) as MedicalEventMix;
}
