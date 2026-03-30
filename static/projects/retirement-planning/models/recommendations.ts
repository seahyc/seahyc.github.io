import type { PanelInsight, PlanBundle, PlanData, PlanRunResult, ProfileRecord, Recommendation } from "../types.js";

interface SensitivityNote {
  label: string;
  why: string;
}

interface DiffSummaryItem {
  label: string;
  current: number;
  comparison: number;
  delta: number;
  unit: "currency-monthly" | "years" | "currency";
}

export function summarizePanel(profile: ProfileRecord, plan: PlanData, result: PlanRunResult, recommendations: Recommendation[]): PanelInsight[] {
  void profile;
  const first = result.rows[0];
  return [
    {
      title: "Actuarial",
      summary: `Median life expectancy lands around age ${result.medianAge.toFixed(1)}, with a ${result.confidence.toLowerCase()} confidence profile.`,
    },
    {
      title: "Medical",
      summary: `Expected annual medical out-of-pocket is about ${formatMoney(first?.medicalCash || 0)}, with a recommended balanced emergency buffer of ${formatMoney(first?.emergencyBalanced || 0)}.`,
    },
    {
      title: "CPF",
      summary: `The ${plan.cpfPlan} plan starts around ${formatMoney(result.cpfInitialPayout)}/month and ${result.principalCrossoverAge ? `crosses principal by age ${result.principalCrossoverAge}.` : "may not cross principal within the modeled horizon."}`,
    },
    {
      title: "Family & tax",
      summary: `Modeled family top-ups create about ${formatMoney(first?.taxSavingsAnnual || 0)} of annual tax savings while improving payout headroom.`,
    },
    {
      title: "Investments",
      summary: recommendations.at(-1)?.why || "Low-volatility income assets become relevant after CPF and reserves are stabilized.",
    },
  ];
}

export function buildExpertReview(profile: ProfileRecord, plan: PlanData, result: PlanRunResult, recommendations: Recommendation[], sensitivities: SensitivityNote[]) {
  const first = result.rows[0];
  const assumptionList = [
    `CPF cohort year anchored to ${profile.profile.cpfCohortYear}.`,
    `Medical scenario is ${plan.medicalScenario} with ${profile.profile.insurance.carePreference} care preference and ${profile.profile.insurance.shieldProvider || "no selected"} shield profile.`,
    `Observed CPF payout anchor is ${formatMoney(profile.profile.observedCpfPayout || 0)} on ${profile.profile.observedCpfPlan || "n/a"}.`,
    `Emergency reserve style is ${plan.emergencyStyle}, with a balanced reserve target of ${formatMoney(first?.emergencyBalanced || 0)}.`,
  ];

  const findings = [
    `Median modeled death age is ${result.medianAge.toFixed(1)} with a modal age of ${result.modalAge.toFixed(1)} and p90 of ${result.p90Age.toFixed(1)}.`,
    `Opening annual medical cash burden is ${formatMoney(first?.medicalCash || 0)} after ${formatMoney(first?.insurerPaid || 0)} insurer support and ${formatMoney(first?.medisavePaid || 0)} Medisave support.`,
    `CPF LIFE starts near ${formatMoney(result.cpfInitialPayout)}/month under the ${plan.cpfPlan} plan, ${result.principalCrossoverAge ? `crossing principal around age ${result.principalCrossoverAge}.` : "without a principal crossover in the visible horizon."}`,
    `Top recommendation: ${recommendations[0]?.title || "No recommendation generated"} because ${recommendations[0]?.why || "no rationale was generated."}`,
  ];

  const rationale = sensitivities.slice(0, 4).map((item) => `${item.label}: ${item.why}`);

  return {
    assumptions: assumptionList,
    findings,
    rationale,
  };
}

export function buildPlanDiffSummary(currentBundle: PlanBundle, comparisonBundle: PlanBundle | null): DiffSummaryItem[] {
  if (!comparisonBundle) return [];
  const currentFirst = currentBundle.result.rows[0];
  const comparisonFirst = comparisonBundle.result.rows[0];
  const currentMedianEstate = currentBundle.result.rows.find((row) => row.age >= currentBundle.result.medianAge)?.estateEquivalent ?? currentFirst?.estateEquivalent ?? 0;
  const comparisonMedianEstate = comparisonBundle.result.rows.find((row) => row.age >= comparisonBundle.result.medianAge)?.estateEquivalent ?? comparisonFirst?.estateEquivalent ?? 0;

  return [
    {
      label: "CPF LIFE start payout",
      current: currentBundle.result.cpfInitialPayout,
      comparison: comparisonBundle.result.cpfInitialPayout,
      delta: currentBundle.result.cpfInitialPayout - comparisonBundle.result.cpfInitialPayout,
      unit: "currency-monthly",
    },
    {
      label: "Median death age",
      current: currentBundle.result.medianAge,
      comparison: comparisonBundle.result.medianAge,
      delta: currentBundle.result.medianAge - comparisonBundle.result.medianAge,
      unit: "years",
    },
    {
      label: "Medical cash / year",
      current: currentFirst?.medicalCash || 0,
      comparison: comparisonFirst?.medicalCash || 0,
      delta: (currentFirst?.medicalCash || 0) - (comparisonFirst?.medicalCash || 0),
      unit: "currency",
    },
    {
      label: "Balanced emergency buffer",
      current: currentFirst?.emergencyBalanced || 0,
      comparison: comparisonFirst?.emergencyBalanced || 0,
      delta: (currentFirst?.emergencyBalanced || 0) - (comparisonFirst?.emergencyBalanced || 0),
      unit: "currency",
    },
    {
      label: "Net annual cashflow",
      current: currentFirst?.netAnnual || 0,
      comparison: comparisonFirst?.netAnnual || 0,
      delta: (currentFirst?.netAnnual || 0) - (comparisonFirst?.netAnnual || 0),
      unit: "currency",
    },
    {
      label: "Estate at median life",
      current: currentMedianEstate,
      comparison: comparisonMedianEstate,
      delta: currentMedianEstate - comparisonMedianEstate,
      unit: "currency",
    },
  ];
}

function formatMoney(value: number) {
  return new Intl.NumberFormat("en-SG", { style: "currency", currency: "SGD", maximumFractionDigits: 0 }).format(value || 0);
}
