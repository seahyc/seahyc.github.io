// @ts-nocheck
export function computeRecommendations(profile, plan, result) {
  const firstRow = result.rows[0];
  const recommendations = [];
  const monthlyGap = Math.max(0, (firstRow.totalSpendAnnual - firstRow.grossIncomeAnnual) / 12);
  const basicGap = Math.max(0, (firstRow.basicSpendAnnual - firstRow.grossIncomeAnnual) / 12);

  recommendations.push({
    title: "Lock in CPF certainty first",
    why: "CPF LIFE remains the lowest-volatility income rung.",
    risk: "Very low",
    confidence: "High",
    shortfallReduction: Math.min(monthlyGap, result.constraints.remainingErsRoom / 160),
    estateImpact: -Math.min(result.constraints.remainingErsRoom, 12000),
    liquidityImpact: -Math.min(result.constraints.remainingErsRoom, 12000),
    tag: "CPF / annuity",
  });

  if (result.familyTopups.some((row) => row.allowedTopup > 0)) {
    recommendations.push({
      title: "Use child top-ups for tax-efficient income support",
      why: "The family can improve payout while harvesting tax relief.",
      risk: "Low",
      confidence: "High",
      shortfallReduction: result.familyTopups.reduce((sum, row) => sum + row.allowedTopup, 0) / 180,
      estateImpact: -result.familyTopups.reduce((sum, row) => sum + row.allowedTopup, 0),
      liquidityImpact: 0,
      tag: "Family / tax",
    });
  }

  recommendations.push({
    title: "Keep a balanced emergency reserve",
    why: "Medical shocks are the main non-discretionary destabilizer with age.",
    risk: "Low",
    confidence: "Medium",
    shortfallReduction: Math.max(0, basicGap * 0.4),
    estateImpact: 0,
    liquidityImpact: -Math.max(0, result.rows[0].emergencyBalanced - result.rows[0].liquidAssets),
    tag: "Liquidity",
  });

  recommendations.push({
    title: "Fund discretionary life intentionally",
    why: "Treat discretionary spend as concrete life goals rather than a floating number.",
    risk: "Low",
    confidence: "High",
    shortfallReduction: Math.min(monthlyGap, profile.discretionarySpendAnnual / 12),
    estateImpact: profile.discretionarySpendAnnual,
    liquidityImpact: 0,
    tag: "Lifestyle",
  });

  recommendations.push({
    title: "Use a conservative income sleeve after CPF and buffer",
    why: "Once CPF and buffers are set, low-volatility yield becomes the next rung.",
    risk: "Moderate",
    confidence: "Medium",
    shortfallReduction: monthlyGap * 0.65,
    estateImpact: -8000,
    liquidityImpact: -6000,
    tag: "Investments",
  });

  return recommendations;
}
