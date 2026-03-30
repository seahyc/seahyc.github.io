import type { ConstraintSet, PlanData, ProfileData, ValidationResult } from "../types.js";
export declare function getCpfConstraints(profile: ProfileData, plan: PlanData, year?: number): ConstraintSet;
export declare function validatePlan(profile: ProfileData, plan: PlanData, year?: number): ValidationResult;
export declare function normalizePlanToConstraints(profile: ProfileData, plan: PlanData, year?: number): {
    profile: ProfileData;
    plan: PlanData;
    constraints: ConstraintSet;
};
