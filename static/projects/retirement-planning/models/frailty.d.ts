import type { FrailtyState, ProfileData } from "../types.js";
export interface FrailtySummary {
    state: FrailtyState;
    annualMedicalLoadMultiplier: number;
    annualMortalityMultiplier: number;
}
export declare function inferFrailty(profile: Pick<ProfileData, "chronicConditions" | "priorSeriousConditions" | "frailty">): FrailtySummary;
