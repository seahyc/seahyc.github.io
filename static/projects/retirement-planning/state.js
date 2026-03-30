export function getActiveProfile(state) {
    return state.profiles.find((item) => item.id === state.activeProfileId) ?? state.profiles[0];
}
export function getActivePlan(state) {
    return state.plans.find((item) => item.id === state.activePlanId) ?? state.plans[0];
}
export function getPlansForProfile(state, profileId) {
    return state.plans.filter((item) => item.profileId === profileId);
}
