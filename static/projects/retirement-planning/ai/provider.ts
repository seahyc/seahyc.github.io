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

export function buildAudienceBrief(audience: "expert" | "actuary" | "doctor" | "planner" | "family" | "insurance", profile: ProfileRecord, plan: PlanData, result: PlanRunResult): string {
  const firstRow = result.rows[0];
  const conditions = profile.profile.chronicConditions?.join(", ") || "none recorded";
  const priorConditions = profile.profile.priorSeriousConditions?.join(", ") || "none recorded";
  const shieldProvider = profile.profile.insurance.shieldProvider || "Unspecified provider";
  const shieldPlan = profile.profile.insurance.shieldPlan || "Unspecified plan";
  const rider = formatRiderLabel(profile.profile.insurance.rider);
  const carePreference = formatCarePreference(profile.profile.insurance.carePreference);
  const openingNetAnnual = firstRow?.netAnnual ?? 0;
  const openingNetMonthly = openingNetAnnual / 12;
  const topQuestions = {
    expert: [
      "Answer the retiree's core question holistically: given her finances, health, and desired lifestyle, what should she do next?",
      "List the top 3 actions for the next 12 months, in priority order, with rationale and tradeoffs.",
      "Explain the biggest risk if she does nothing."
    ],
    actuary: [
      `At what age does the ${plan.cpfPlan} CPF LIFE plan break even against its premium equivalent?`,
      `Is the longevity tail to p90 age ${result.p90Age.toFixed(1)} adequately funded?`,
      "What reserve or payout change would you recommend to reduce late-life solvency risk?"
    ],
    doctor: [
      `Given chronic conditions (${conditions}) and prior serious conditions (${priorConditions}), what medical trajectory is realistic from age 75 to 85?`,
      `How should care setting (${carePreference}) affect expected treatment intensity and follow-up?`,
      "What should the family monitor in the next 12 months?"
    ],
    planner: [
      `Given OA ${profile.profile.oa}, SA ${profile.profile.sa}, RA ${profile.profile.ra}, and MA ${profile.profile.ma}, what is the best top-up and liquidity sequence?`,
      `How should she address an opening net cashflow of ${openingNetAnnual.toFixed(0)} annual (${openingNetMonthly.toFixed(0)} monthly)?`,
      "What would you do first, second, and third if you were her planner?"
    ],
    family: [
      "In exactly 3 bullet points, what should the family do in the next 6 months?",
      "For each bullet: include action, rough cost, owner, and deadline.",
      "Keep the language non-technical."
    ],
    insurance: [
      `She currently shows ${shieldProvider} / ${shieldPlan} / ${rider} with care preference ${carePreference}.`,
      `Given chronic conditions (${conditions}) and prior serious conditions (${priorConditions}), what realistic hospital and rider options remain?`,
      "What exclusions, pre-existing condition limitations, premium expectations, and rider terms should she verify with an insurance agent?"
    ],
  }[audience];
  const intro = {
    expert: "You are reviewing a retirement plan as a multidisciplinary expert panel.",
    actuary: "You are reviewing a retirement plan as an actuary. Focus on longevity, cashflow durability, annuity fit, and reserve adequacy.",
    doctor: "You are reviewing a retirement plan as a family physician. Focus on disease burden, frailty, care setting, and future medical-cost realism.",
    planner: "You are reviewing a retirement plan as a financial planner. Focus on solvency, liquidity, emergency reserves, spending sustainability, and product fit.",
    family: "You are reviewing a retirement plan for a family discussion. Explain the key risks, tradeoffs, and next actions in plain English.",
    insurance: "You are reviewing a retirement plan as an insurance agent. Focus on shield coverage, riders, pre-existing conditions, exclusions, and claims realism.",
  }[audience];
  const closingInstruction = {
    expert: "Give one integrated recommendation set, ordered by urgency, with clear tradeoffs and a direct answer to what she should do next.",
    actuary: "End with a solvency verdict, the main longevity risk, and the single reserve or annuity change you would recommend.",
    doctor: "End with the most likely health risks over the next decade and what the family should prepare for first.",
    planner: "End with a practical first-90-days action plan in order, using plain language where possible.",
    family: "End with a calm, plain-English summary the family can read out loud together.",
    insurance: "End with the exact questions she should ask insurers next and the coverage tradeoff she is most likely to face.",
  }[audience];
  if (!firstRow) {
    return `${intro}\n\nProfile summary:\n- Name: ${profile.name}\n- CPF LIFE plan: ${plan.cpfPlan}\n- Payout start age: ${plan.payoutStartAge}\n- Observed payout anchor: ${profile.profile.observedCpfPayout || "n/a"}\n- Median death age: ${result.medianAge.toFixed(1)}\n- Conditions: ${conditions}\n\nQuestions to answer:\n- ${topQuestions.join("\n- ")}\n\n${closingInstruction}`;
  }
  return `${intro}

Profile summary:
- Name: ${profile.name}
- Birth date: ${profile.profile.birthDate}
- CPF LIFE plan: ${plan.cpfPlan}
- Payout start age: ${plan.payoutStartAge}
- Policy year: ${profile.profile.cpfCohortYear}
- Observed payout anchor: ${profile.profile.observedCpfPayout || "n/a"}
- Median death age: ${result.medianAge.toFixed(1)} | p90 age: ${result.p90Age.toFixed(1)}
- OA: ${profile.profile.oa}
- SA: ${profile.profile.sa}
- RA: ${profile.profile.ra}
- MA: ${profile.profile.ma}
- Bank / cash: ${profile.profile.bankCash}
- Market income annual: ${profile.profile.marketIncomeAnnual}
- Basic spend annual: ${firstRow.basicSpendAnnual.toFixed(0)}
- Total spend annual: ${firstRow.totalSpendAnnual.toFixed(0)}
- Opening net annual: ${openingNetAnnual.toFixed(0)}
- Balanced emergency buffer: ${firstRow.emergencyBalanced.toFixed(0)}
- Medical cash annual: ${firstRow.medicalCash.toFixed(0)}
- Estate equivalent opening: ${(firstRow.estateEquivalent || 0).toFixed(0)}
- Shield provider: ${shieldProvider}
- Shield plan: ${shieldPlan}
- Rider: ${rider}
- Long-term care: ${profile.profile.insurance.longTermCareCover}
- Care preference: ${carePreference}
- Chronic conditions: ${conditions}
- Prior serious conditions: ${priorConditions}
- Medical scenario: ${plan.medicalScenario}
- One-off top-up: ${plan.oneOffTopup}
- Recurring top-up annual: ${plan.recurringTopupAnnual}
- Monthly support: ${plan.monthlySupport}
- Objective: ${plan.objective}

Questions to answer:
- ${topQuestions.join("\n- ")}

${closingInstruction}`;
}

export function buildStructuredPayload(profile: ProfileRecord, plan: PlanData, result: PlanRunResult): string {
  const firstRow = result.rows[0];
  return JSON.stringify({
    profile: {
      name: profile.name,
      sex: profile.profile.sex,
      birthDate: profile.profile.birthDate,
      cpfBalances: {
        oa: profile.profile.oa,
        sa: profile.profile.sa,
        ra: profile.profile.ra,
        ma: profile.profile.ma,
      },
      bankCash: profile.profile.bankCash,
      marketIncomeAnnual: profile.profile.marketIncomeAnnual,
      basicSpendMonthly: profile.profile.basicSpendMonthly,
      discretionarySpendAnnual: profile.profile.discretionarySpendAnnual,
      chronicConditions: profile.profile.chronicConditions,
      priorSeriousConditions: profile.profile.priorSeriousConditions,
      insuranceStatus: {
            shieldProvider: profile.profile.insurance.shieldProvider,
            shieldPlan: profile.profile.insurance.shieldPlan,
            rider: formatRiderLabel(profile.profile.insurance.rider),
            medishield: profile.profile.insurance.medishield,
            longTermCareCover: profile.profile.insurance.longTermCareCover,
            carePreference: formatCarePreference(profile.profile.insurance.carePreference),
          },
        },
    plan: {
      name: plan.name,
      cpfPlan: plan.cpfPlan,
      payoutStartAge: plan.payoutStartAge,
      medicalScenario: plan.medicalScenario,
      objective: plan.objective,
      oneOffTopup: plan.oneOffTopup,
      recurringTopupAnnual: plan.recurringTopupAnnual,
      monthlySupport: plan.monthlySupport,
      childSupportStrategy: plan.childSupportStrategy,
    },
    output: {
      medianAge: result.medianAge,
      p90Age: result.p90Age,
      cpfInitialPayout: result.cpfInitialPayout,
      principalCrossoverAge: result.principalCrossoverAge,
      openingMedicalCash: firstRow?.medicalCash ?? null,
      balancedEmergencyBuffer: firstRow?.emergencyBalanced ?? null,
      openingNetAnnual: firstRow?.netAnnual ?? null,
      openingGrossIncomeAnnual: firstRow?.grossIncomeAnnual ?? null,
      openingBasicSpendAnnual: firstRow?.basicSpendAnnual ?? null,
      openingTotalSpendAnnual: firstRow?.totalSpendAnnual ?? null,
    },
  }, null, 2);
}

function formatRiderLabel(value: unknown): string {
  if (typeof value === "boolean") return value ? "Rider selected" : "No rider";
  const normalized = String(value ?? "").trim();
  if (!normalized || normalized === "none" || normalized === "false") return "No rider";
  if (normalized === "true") return "Rider selected";
  if (normalized === "default") return "Default rider";
  return normalized;
}

function formatCarePreference(value: unknown): string {
  const normalized = String(value ?? "").trim().toLowerCase();
  if (!normalized || normalized === "nan" || normalized === "undefined" || normalized === "null") return "Not specified";
  if (normalized === "public") return "Public";
  if (normalized === "mixed") return "Mixed";
  if (normalized === "private") return "Private";
  return normalized;
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
