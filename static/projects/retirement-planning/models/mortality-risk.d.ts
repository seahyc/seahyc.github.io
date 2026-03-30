import type { PlanData, ProfileData } from "../types.js";
export declare function computeRiskMultiplier(profile: Pick<ProfileData, "smoking" | "alcohol" | "selfRatedHealth" | "frailty" | "mobility" | "cognition" | "chronicConditions" | "priorSeriousConditions">, plan: Pick<PlanData, "interventions">): number;
