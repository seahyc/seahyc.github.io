import { CREATE_PLAN_NAME } from "./constants.js";
import { deepClone, newId } from "./storage.js";
export function createPlan(state, profileId) {
    const resolvedProfileId = profileId ?? state.activeProfileId ?? state.profiles[0].id;
    const source = state.plans.find((plan) => plan.profileId === resolvedProfileId) ?? state.plans[0];
    const count = state.plans.filter((plan) => plan.profileId === resolvedProfileId).length;
    const plan = {
        ...deepClone(source),
        id: newId("plan"),
        profileId: resolvedProfileId,
        name: CREATE_PLAN_NAME(count),
        createdAt: new Date().toISOString(),
    };
    state.plans.push(plan);
    state.activePlanId = plan.id;
    return plan;
}
export function duplicatePlan(state, planId) {
    const source = state.plans.find((plan) => plan.id === planId);
    if (!source)
        return null;
    const plan = {
        ...deepClone(source),
        id: newId("plan"),
        name: `${source.name} copy`,
        createdAt: new Date().toISOString(),
    };
    state.plans.push(plan);
    state.activePlanId = plan.id;
    return plan;
}
export function deletePlan(state, planId) {
    const target = state.plans.find((plan) => plan.id === planId);
    if (!target)
        return false;
    const siblings = state.plans.filter((plan) => plan.profileId === target.profileId);
    if (siblings.length === 1)
        return false;
    state.plans = state.plans.filter((plan) => plan.id !== planId);
    if (state.activePlanId === planId) {
        state.activePlanId = state.plans.find((plan) => plan.profileId === target.profileId)?.id ?? null;
    }
    return true;
}
