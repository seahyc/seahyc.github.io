import type { AppState, PlanData, ProfileRecord } from "./types.js";
export declare function getActiveProfile(state: AppState): ProfileRecord;
export declare function getActivePlan(state: AppState): PlanData;
export declare function getPlansForProfile(state: AppState, profileId: string): PlanData[];
