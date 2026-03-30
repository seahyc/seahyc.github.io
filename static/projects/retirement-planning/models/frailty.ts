import type { FrailtyState, ProfileData } from "../types.js";

export interface FrailtySummary {
  state: FrailtyState;
  annualMedicalLoadMultiplier: number;
  annualMortalityMultiplier: number;
}

export function inferFrailty(profile: Pick<ProfileData, "chronicConditions" | "priorSeriousConditions" | "frailty">): FrailtySummary {
  const conditions = profile.chronicConditions?.length || 0;
  const priorSerious = profile.priorSeriousConditions?.length || 0;
  let state: FrailtyState = profile.frailty || "robust";
  if (conditions + priorSerious >= 3 && state === "robust") state = "prefrail";
  return {
    state,
    annualMedicalLoadMultiplier:
      state === "frail" ? 1.55 : state === "prefrail" ? 1.18 : 1,
    annualMortalityMultiplier:
      state === "frail" ? 1.26 : state === "prefrail" ? 1.08 : 1,
  };
}
