import { CREATE_PLAN_NAME, CREATE_PROFILE_NAME } from "./constants.js";
import { deepClone, newId } from "./storage.js";
export function createProfile(state) {
    const profileId = newId("profile");
    const planId = newId("plan");
    const existingCount = state.profiles.length;
    const templateProfile = state.profiles[0];
    const templatePlan = state.plans.find((item) => item.profileId === state.activeProfileId) ?? state.plans[0];
    const profile = {
        id: profileId,
        name: CREATE_PROFILE_NAME(existingCount),
        profile: deepClone(templateProfile.profile),
        createdAt: new Date().toISOString(),
    };
    const plan = {
        ...deepClone(templatePlan),
        id: planId,
        profileId,
        name: CREATE_PLAN_NAME(0),
        createdAt: new Date().toISOString(),
    };
    state.profiles.push(profile);
    state.plans.push(plan);
    state.activeProfileId = profileId;
    state.activePlanId = planId;
    return profile;
}
export function duplicateProfile(state, profileId) {
    const sourceProfile = state.profiles.find((item) => item.id === profileId);
    if (!sourceProfile)
        return null;
    const targetProfileId = newId("profile");
    const plans = state.plans.filter((item) => item.profileId === profileId);
    const duplicatedPlans = plans.map((plan, index) => ({
        ...deepClone(plan),
        id: newId("plan"),
        profileId: targetProfileId,
        name: index === 0 ? `${plan.name} copy` : plan.name,
    }));
    const duplicatedProfile = {
        ...deepClone(sourceProfile),
        id: targetProfileId,
        name: `${sourceProfile.name} copy`,
    };
    state.profiles.push(duplicatedProfile);
    state.plans.push(...duplicatedPlans);
    state.activeProfileId = targetProfileId;
    state.activePlanId = duplicatedPlans[0]?.id ?? null;
    return duplicatedProfile;
}
export function deleteProfile(state, profileId) {
    if (state.profiles.length === 1 || !profileId)
        return false;
    state.profiles = state.profiles.filter((item) => item.id !== profileId);
    state.plans = state.plans.filter((item) => item.profileId !== profileId);
    if (state.activeProfileId === profileId) {
        state.activeProfileId = state.profiles[0]?.id ?? null;
        state.activePlanId = state.plans.find((item) => item.profileId === state.activeProfileId)?.id ?? null;
    }
    return true;
}
