// @ts-nocheck
import { parseDiseaseList } from "../data/disease-db.js";
export function estimateMedicalEventMix(age, profile, frailtyState) {
    const priorSerious = profile.priorSeriousConditions || [];
    const chronicCount = profile.chronicConditions?.length || 0;
    const eventMix = {
        routine: 0.24,
        chronic: 0.28 + chronicCount * 0.03,
        hospitalization: 0.15 + Math.max(0, age - 70) * 0.004,
        acute: 0.07 + Math.max(0, age - 72) * 0.003,
        frailty: frailtyState === "frail" ? 0.16 : frailtyState === "prefrail" ? 0.1 : 0.05,
        ltc: Math.max(0.02, age >= 80 ? 0.1 : age >= 75 ? 0.06 : 0.03),
        endOfLife: age >= 85 ? 0.05 : 0.015,
    };
    parseDiseaseList([...(profile.chronicConditions || []), ...priorSerious]).forEach(({ profile: disease }) => {
        eventMix.chronic += disease.emergencyMedicalWeight * 0.5;
        eventMix.hospitalization += disease.emergencyMedicalWeight * 0.35;
        eventMix.acute += disease.emergencyMedicalWeight * 0.15;
    });
    const total = Object.values(eventMix).reduce((sum, value) => sum + value, 0);
    return Object.fromEntries(Object.entries(eventMix).map(([key, value]) => [key, value / total]));
}
