import type { AiCapabilities, PlanData, PlanRunResult, ProfileRecord } from "../types.js";

type BrowserAiSurface = Window & {
  LanguageModel?: unknown;
  ai?: {
    languageModel?: unknown;
    prompt?: unknown;
    createTextSession?: unknown;
  };
};

export async function detectAiCapabilities(): Promise<AiCapabilities> {
  const browserWindow = window as BrowserAiSurface;
  const browserPrompt = Boolean(browserWindow.LanguageModel || browserWindow.ai?.languageModel || browserWindow.ai?.prompt || browserWindow.ai?.createTextSession);
  return {
    browser: browserPrompt,
    api: true,
    chatgpt: true,
    claude: true,
  };
}

export function buildHandoffPrompt(profile: ProfileRecord, plan: PlanData, result: PlanRunResult): string {
  return buildAudienceBrief("expert", profile, plan, result);
}

export function buildAudienceBrief(audience: "expert" | "actuary" | "doctor" | "planner" | "family", profile: ProfileRecord, plan: PlanData, result: PlanRunResult): string {
  const firstRow = result.rows[0];
  const intro = {
    expert: "You are reviewing a retirement plan as a multidisciplinary expert panel.",
    actuary: "You are reviewing a retirement plan as an actuary. Focus on longevity, cashflow durability, annuity fit, and reserve adequacy.",
    doctor: "You are reviewing a retirement plan as a family physician. Focus on disease burden, frailty, care setting, and future medical-cost realism.",
    planner: "You are reviewing a retirement plan as a financial planner. Focus on solvency, liquidity, emergency reserves, spending sustainability, and product fit.",
    family: "You are reviewing a retirement plan for a family discussion. Explain the key risks, tradeoffs, and next actions in plain English.",
  }[audience];
  if (!firstRow) {
    return `${intro}\n\nProfile summary:\n- Name: ${profile.name}\n- CPF LIFE plan: ${plan.cpfPlan}\n- Payout start age: ${plan.payoutStartAge}\n- Observed payout anchor: ${profile.profile.observedCpfPayout || "n/a"}\n- Median death age: ${result.medianAge.toFixed(1)}\n\nPlease critique the plan, state the main risks, and suggest a better alternative if one exists.`;
  }
  return `${intro}\n\nProfile summary:\n- Name: ${profile.name}\n- CPF LIFE plan: ${plan.cpfPlan}\n- Payout start age: ${plan.payoutStartAge}\n- Observed payout anchor: ${profile.profile.observedCpfPayout || "n/a"}\n- Median death age: ${result.medianAge.toFixed(1)}\n- Basic spend annual: ${firstRow.basicSpendAnnual.toFixed(0)}\n- Total spend annual: ${firstRow.totalSpendAnnual.toFixed(0)}\n- Balanced emergency buffer: ${firstRow.emergencyBalanced.toFixed(0)}\n- Medical cash annual: ${firstRow.medicalCash.toFixed(0)}\n- Estate equivalent opening: ${(firstRow.estateEquivalent || 0).toFixed(0)}\n- Prior serious conditions: ${(profile.profile.priorSeriousConditions || []).join(", ") || "none recorded"}\n\nPlease critique the plan, state the main risks, and suggest a better alternative if one exists.`;
}

export function buildStructuredPayload(profile: ProfileRecord, plan: PlanData, result: PlanRunResult): string {
  const firstRow = result.rows[0];
  return JSON.stringify({
    profile: {
      name: profile.name,
      sex: profile.profile.sex,
      birthDate: profile.profile.birthDate,
      chronicConditions: profile.profile.chronicConditions,
      priorSeriousConditions: profile.profile.priorSeriousConditions,
      carePreference: profile.profile.insurance.carePreference,
    },
    plan: {
      name: plan.name,
      cpfPlan: plan.cpfPlan,
      payoutStartAge: plan.payoutStartAge,
      medicalScenario: plan.medicalScenario,
      objective: plan.objective,
    },
    output: {
      medianAge: result.medianAge,
      p90Age: result.p90Age,
      cpfInitialPayout: result.cpfInitialPayout,
      principalCrossoverAge: result.principalCrossoverAge,
      openingMedicalCash: firstRow?.medicalCash ?? null,
      balancedEmergencyBuffer: firstRow?.emergencyBalanced ?? null,
      openingNetAnnual: firstRow?.netAnnual ?? null,
    },
  }, null, 2);
}

export function buildDiffPrompt(
  profile: ProfileRecord,
  currentPlan: PlanData,
  currentResult: PlanRunResult,
  comparisonPlan: PlanData,
  comparisonResult: PlanRunResult,
): string {
  const currentFirst = currentResult.rows[0];
  const comparisonFirst = comparisonResult.rows[0];
  return `You are comparing two retirement plans for the same person.\n\nProfile:\n- Name: ${profile.name}\n- Prior serious conditions: ${(profile.profile.priorSeriousConditions || []).join(", ") || "none recorded"}\n\nPlan A:\n- Name: ${currentPlan.name}\n- CPF LIFE plan: ${currentPlan.cpfPlan}\n- Payout start age: ${currentPlan.payoutStartAge}\n- CPF payout start: ${currentResult.cpfInitialPayout.toFixed(0)}\n- Median death age: ${currentResult.medianAge.toFixed(1)}\n- Opening medical cash: ${(currentFirst?.medicalCash || 0).toFixed(0)}\n- Balanced buffer: ${(currentFirst?.emergencyBalanced || 0).toFixed(0)}\n- Opening net annual: ${(currentFirst?.netAnnual || 0).toFixed(0)}\n\nPlan B:\n- Name: ${comparisonPlan.name}\n- CPF LIFE plan: ${comparisonPlan.cpfPlan}\n- Payout start age: ${comparisonPlan.payoutStartAge}\n- CPF payout start: ${comparisonResult.cpfInitialPayout.toFixed(0)}\n- Median death age: ${comparisonResult.medianAge.toFixed(1)}\n- Opening medical cash: ${(comparisonFirst?.medicalCash || 0).toFixed(0)}\n- Balanced buffer: ${(comparisonFirst?.emergencyBalanced || 0).toFixed(0)}\n- Opening net annual: ${(comparisonFirst?.netAnnual || 0).toFixed(0)}\n\nCompare the two plans, say which is stronger for solvency, which is stronger for flexibility, and which assumptions are driving the difference.`;
}

export function openHandoff(mode: "chatgpt" | "claude" | string | undefined, prompt: string): void {
  const encoded = encodeURIComponent(prompt);
  if (mode === "chatgpt") {
    window.open(`https://chatgpt.com/?model=gpt-4o&q=${encoded}`, "_blank", "noopener");
  } else if (mode === "claude") {
    window.open(`https://claude.ai/new?q=${encoded}`, "_blank", "noopener");
  }
}
