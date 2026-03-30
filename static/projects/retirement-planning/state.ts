import type { AppState, PlanData, ProfileRecord } from "./types.js";

export function getActiveProfile(state: AppState): ProfileRecord {
  return state.profiles.find((item) => item.id === state.activeProfileId) ?? state.profiles[0]!;
}

export function getActivePlan(state: AppState): PlanData {
  return state.plans.find((item) => item.id === state.activePlanId) ?? state.plans[0]!;
}

export function getPlansForProfile(state: AppState, profileId: string): PlanData[] {
  return state.plans.filter((item) => item.profileId === profileId);
}
