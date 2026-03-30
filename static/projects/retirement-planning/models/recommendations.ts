// @ts-nocheck
export function summarizePanel(profile, plan, result, recommendations) {
  const first = result.rows[0];
  return [
    {
      title: "Actuarial",
      summary: `Median life expectancy lands around age ${result.medianAge.toFixed(1)}, with a ${result.confidence.toLowerCase()} confidence profile.`,
    },
    {
      title: "Medical",
      summary: `Expected annual medical out-of-pocket is about ${formatMoney(first.medicalCash)}, with a recommended balanced emergency buffer of ${formatMoney(first.emergencyBalanced)}.`,
    },
    {
      title: "CPF",
      summary: `The ${plan.cpfPlan} plan starts around ${formatMoney(result.cpfInitialPayout)}/month and ${result.principalCrossoverAge ? `crosses principal by age ${result.principalCrossoverAge}.` : "may not cross principal within the modeled horizon."}`,
    },
    {
      title: "Family & tax",
      summary: `Modeled family top-ups create about ${formatMoney(first.taxSavingsAnnual)} of annual tax savings while improving payout headroom.`,
    },
    {
      title: "Investments",
      summary: recommendations.at(-1)?.why || "Low-volatility income assets become relevant after CPF and reserves are stabilized.",
    },
  ];
}

function formatMoney(value) {
  return new Intl.NumberFormat("en-SG", { style: "currency", currency: "SGD", maximumFractionDigits: 0 }).format(value || 0);
}
