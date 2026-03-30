import type { FrailtyState, ProfileData } from "../types.js";
export type MedicalEventMix = Record<"routine" | "chronic" | "hospitalization" | "acute" | "frailty" | "ltc" | "endOfLife", number>;
export declare function estimateMedicalEventMix(age: number, profile: ProfileData, frailtyState: FrailtyState): MedicalEventMix;
