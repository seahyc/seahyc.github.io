// @ts-nocheck
export function summarizeInterventions(plan) {
    const interventions = [];
    if (plan.interventions?.exerciseUpgrade)
        interventions.push({ label: "Exercise upgrade", longevityDelta: 0.9, costDelta: -0.04 });
    if (plan.interventions?.bpControl)
        interventions.push({ label: "Blood pressure control", longevityDelta: 0.5, costDelta: -0.03 });
    if (plan.interventions?.smokingCessation)
        interventions.push({ label: "Smoking cessation", longevityDelta: 1.6, costDelta: -0.09 });
    if (plan.interventions?.sleepTreatment)
        interventions.push({ label: "Sleep treatment", longevityDelta: 0.4, costDelta: -0.02 });
    return interventions;
}
