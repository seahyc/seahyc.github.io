import type { AppState, PlanData } from "./types.js";
export declare function createPlan(state: AppState, profileId: string | null): PlanData;
export declare function duplicatePlan(state: AppState, planId: string | null): PlanData | null;
export declare function deletePlan(state: AppState, planId: string | null): boolean;
