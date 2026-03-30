import type { FamilyTopupModel, PlanData, ProfileData } from "../types.js";
export interface NormalizedFamilyTopup extends FamilyTopupModel {
    name: string;
    marginalTaxRate: number;
    amount: number;
    cadence: string;
    activeYears: number;
    eligible: number;
    allowedTopup: number;
    modeledTaxSaved: number;
}
export declare function normalizeFamilyTopups(profile: Pick<ProfileData, "familyContributors">, plan: Pick<PlanData, "childSupportStrategy">, remainingErsRoom: number): NormalizedFamilyTopup[];
