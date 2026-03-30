import type { InterventionSummary, PlanData } from "../types.js";
export declare function summarizeInterventions(plan: Pick<PlanData, "interventions">): InterventionSummary[];
