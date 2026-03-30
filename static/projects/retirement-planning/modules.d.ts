declare module "./policy/cpf-validation.js" {
  import type { ConstraintSet, PlanData, ProfileData, ValidationResult } from "./types.js";
  export function validatePlan(profile: ProfileData, plan: PlanData): ValidationResult;
  export function getCpfConstraints(profile: ProfileData, plan: PlanData): ConstraintSet;
}

declare module "./models/cashflow.js" {
  import type { PlanData, PlanRunResult, ProfileData } from "./types.js";
  export function runPlan(profile: ProfileData, plan: PlanData): PlanRunResult;
}

declare module "./models/optimizer.js" {
  import type { PlanData, PlanRunResult, ProfileData, Recommendation } from "./types.js";
  export function computeRecommendations(profile: ProfileData, plan: PlanData, result: PlanRunResult): Recommendation[];
}

declare module "./models/recommendations.js" {
  import type { PanelInsight, PlanData, PlanRunResult, ProfileRecord, Recommendation } from "./types.js";
  export function summarizePanel(profileRecord: ProfileRecord, plan: PlanData, result: PlanRunResult, recommendations: Recommendation[]): PanelInsight[];
}

declare module "./models/appendix-ledger.js" {
  import type { CashflowRow, PlanRunResult } from "./types.js";
  export function buildAppendixRows(result: PlanRunResult): CashflowRow[];
}

declare module "./ui/charts.js" {
  import type { ChartConfig } from "./types.js";
  export function renderChart(canvas: HTMLCanvasElement | null, config: ChartConfig): void;
}

declare module "./ai/provider.js" {
  import type { AiCapabilities, PlanData, PlanRunResult, ProfileRecord } from "./types.js";
  export function detectAiCapabilities(): Promise<AiCapabilities>;
  export function buildHandoffPrompt(profileRecord: ProfileRecord, plan: PlanData, result: PlanRunResult): string;
  export function openHandoff(mode: string | undefined, prompt: string): void;
}

declare module "./data/insurance-db.js" {
  import type { InsuranceDb } from "./types.js";
  export const UNIFIED_INSURANCE_DB: InsuranceDb;
}
