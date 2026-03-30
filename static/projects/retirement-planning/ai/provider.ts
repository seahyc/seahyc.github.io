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
  const firstRow = result.rows[0];
  if (!firstRow) {
    return `You are reviewing a retirement plan.\n\nProfile summary:\n- Name: ${profile.name}\n- CPF LIFE plan: ${plan.cpfPlan}\n- Payout start age: ${plan.payoutStartAge}\n- Observed payout anchor: ${profile.profile.observedCpfPayout || "n/a"}\n- Median death age: ${result.medianAge.toFixed(1)}\n\nPlease critique the plan, state the main risks, and suggest a better alternative if one exists.`;
  }
  return `You are reviewing a retirement plan.\n\nProfile summary:\n- Name: ${profile.name}\n- CPF LIFE plan: ${plan.cpfPlan}\n- Payout start age: ${plan.payoutStartAge}\n- Observed payout anchor: ${profile.profile.observedCpfPayout || "n/a"}\n- Median death age: ${result.medianAge.toFixed(1)}\n- Basic spend annual: ${firstRow.basicSpendAnnual.toFixed(0)}\n- Total spend annual: ${firstRow.totalSpendAnnual.toFixed(0)}\n- Balanced emergency buffer: ${firstRow.emergencyBalanced.toFixed(0)}\n\nPlease critique the plan, state the main risks, and suggest a better alternative if one exists.`;
}

export function openHandoff(mode: "chatgpt" | "claude" | string | undefined, prompt: string): void {
  const encoded = encodeURIComponent(prompt);
  if (mode === "chatgpt") {
    window.open(`https://chatgpt.com/?model=gpt-4o&q=${encoded}`, "_blank", "noopener");
  } else if (mode === "claude") {
    window.open(`https://claude.ai/new?q=${encoded}`, "_blank", "noopener");
  }
}
