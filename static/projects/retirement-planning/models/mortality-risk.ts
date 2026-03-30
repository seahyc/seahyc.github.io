import type { PlanData, ProfileData } from "../types.js";
import { parseDiseaseList } from "../data/disease-db.js";

const clamp = (value: number, low: number, high: number): number => Math.min(high, Math.max(low, value));

export function computeRiskMultiplier(profile: Pick<ProfileData, "smoking" | "alcohol" | "selfRatedHealth" | "frailty" | "mobility" | "cognition" | "chronicConditions" | "priorSeriousConditions">, plan: Pick<PlanData, "interventions">): number {
  let multiplier = 1;
  if (profile.smoking === "current") multiplier *= 1.45;
  if (profile.smoking === "former") multiplier *= 1.12;
  if (profile.alcohol === "heavy") multiplier *= 1.1;
  if (profile.selfRatedHealth === "poor") multiplier *= 1.24;
  if (profile.selfRatedHealth === "good") multiplier *= 0.94;
  if (profile.frailty === "frail") multiplier *= 1.33;
  if (profile.frailty === "prefrail") multiplier *= 1.12;
  if (profile.mobility !== "independent") multiplier *= 1.15;
  if (profile.cognition !== "normal") multiplier *= 1.18;
  parseDiseaseList([...(profile.chronicConditions || []), ...(profile.priorSeriousConditions || [])]).forEach((item: { profile: { mortalityMultiplier: number } }) => {
    const disease = item.profile;
    multiplier *= disease.mortalityMultiplier;
  });
  if (plan?.interventions?.exerciseUpgrade) multiplier *= 0.95;
  if (plan?.interventions?.bpControl) multiplier *= 0.97;
  if (plan?.interventions?.smokingCessation && profile.smoking === "current") multiplier *= 0.88;
  return clamp(multiplier, 0.58, 2.2);
}
