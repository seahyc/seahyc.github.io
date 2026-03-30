import type { CpfPlanType, PlanData, ProfileData } from "../types.js";
export declare function computeCpfLifeInitial(profile: ProfileData, plan: PlanData): number;
export declare function payoutForYear(initialMonthly: number, planType: CpfPlanType, yearsFromStart: number): number;
