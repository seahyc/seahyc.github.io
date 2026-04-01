export function computeRecommendations(profile, plan, result) {
    void plan;
    const firstRow = result.rows[0];
    if (!firstRow)
        return [];
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
    const needsInsuranceReview = (profile.insurance.shieldProvider === "public" || !profile.insurance.shieldProvider || !profile.insurance.shieldPlan)
        && profile.chronicConditions.length > 0
        && result.currentAge >= 55;
    if (needsInsuranceReview) {
        recommendations.push({
            title: "Review insurance coverage before pre-existing conditions lock you out",
            why: "Hospital coverage becomes harder to improve with age and existing conditions, so delay can permanently narrow the option set.",
            risk: "High",
            confidence: "High",
            shortfallReduction: Math.round((firstRow.medicalCash || 0) / 12),
            estateImpact: -Math.min(6000, Math.round((firstRow.medicalCash || 0) * 1.5)),
            liquidityImpact: -Math.min(3000, Math.round((firstRow.medicalCash || 0) * 0.8)),
            tag: "Insurance",
        });
    }
    if (result.familyTopups.some((row) => (row.allowedTopup || 0) > 0)) {
        recommendations.push({
            title: "Use child top-ups for tax-efficient income support",
            why: "The family can improve payout while harvesting tax relief.",
            risk: "Low",
            confidence: "High",
            shortfallReduction: result.familyTopups.reduce((sum, row) => sum + (row.allowedTopup || 0), 0) / 180,
            estateImpact: -result.familyTopups.reduce((sum, row) => sum + (row.allowedTopup || 0), 0),
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
        liquidityImpact: -Math.max(0, (result.rows[0]?.emergencyBalanced || 0) - (result.rows[0]?.liquidAssets || 0)),
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
export function buildSensitivityDiagnostics(profile, plan, result) {
    const firstRow = result.rows[0];
    if (!firstRow)
        return [];
    const estateAtMedian = result.rows.find((row) => row.age >= result.medianAge)?.estateEquivalent ?? firstRow.estateEquivalent ?? 0;
    const discretionaryMonthly = (profile.discretionarySpendAnnual || 0) / 12;
    const medicalPressure = Math.max(0, (firstRow.medicalCash || 0) / Math.max(1, firstRow.totalSpendAnnual || 1));
    const emergencyGap = Math.max(0, (firstRow.emergencyBalanced || 0) - (firstRow.liquidAssets || 0));
    const ersRoom = result.constraints?.remainingErsRoom ?? 0;
    const survivalToCrossover = result.principalCrossoverAge ? estimateSurvivalAtAge(result.rows, result.principalCrossoverAge) : 0;
    const payoutDelayYears = Math.max(0, (plan.payoutStartAge || 65) - result.currentAge);
    const diagnostics = [
        {
            id: "longevity-risk",
            label: "Longevity tail",
            impact: Math.max(0, result.p90Age - result.medianAge),
            unit: "years",
            signal: (result.p90Age - result.medianAge > 8 ? "High" : "Medium"),
            why: `The p90 life extends about ${(result.p90Age - result.medianAge).toFixed(1)} years beyond median, so plan fragility in late life still matters.`,
        },
        {
            id: "medical-cash-burden",
            label: "Medical cash burden",
            impact: firstRow.medicalCash || 0,
            unit: "currency",
            signal: (medicalPressure > 0.18 ? "High" : medicalPressure > 0.1 ? "Medium" : "Low"),
            why: `Modeled out-of-pocket medical cash is about ${Math.round(medicalPressure * 100)}% of annual spend in the opening years.`,
        },
        {
            id: "cpf-deferral",
            label: "Payout deferral",
            impact: payoutDelayYears,
            unit: "years",
            signal: (payoutDelayYears >= 4 ? "High" : payoutDelayYears >= 2 ? "Medium" : "Low"),
            why: `CPF LIFE is scheduled to start ${payoutDelayYears.toFixed(0)} years from now, which changes near-term liquidity pressure.`,
        },
        {
            id: "ers-headroom",
            label: "Remaining ERS room",
            impact: ersRoom,
            unit: "currency",
            signal: (ersRoom > 20000 ? "High" : ersRoom > 5000 ? "Medium" : "Low"),
            why: `There is ${formatCurrency(ersRoom)} of top-up room still available before the modeled ERS hard stop.`,
        },
        {
            id: "discretionary-spend",
            label: "Discretionary spend sensitivity",
            impact: discretionaryMonthly,
            unit: "monthly-currency",
            signal: (discretionaryMonthly > 1200 ? "High" : discretionaryMonthly > 500 ? "Medium" : "Low"),
            why: `Discretionary spending is about ${formatCurrency(discretionaryMonthly)}/month, which is one of the cleanest knobs for shortfall control.`,
        },
        {
            id: "emergency-buffer",
            label: "Emergency reserve gap",
            impact: emergencyGap,
            unit: "currency",
            signal: (emergencyGap > 10000 ? "High" : emergencyGap > 0 ? "Medium" : "Low"),
            why: emergencyGap > 0
                ? `Liquid assets are short of the balanced emergency buffer by ${formatCurrency(emergencyGap)}.`
                : "Liquid assets currently cover the balanced emergency buffer.",
        },
        {
            id: "annuity-fit",
            label: "Survival to annuity crossover",
            impact: survivalToCrossover,
            unit: "percent",
            signal: (survivalToCrossover >= 0.65 ? "High" : survivalToCrossover >= 0.4 ? "Medium" : "Low"),
            why: result.principalCrossoverAge
                ? `Modeled survival to the principal crossover age is about ${(survivalToCrossover * 100).toFixed(0)}%.`
                : "The modeled annuity does not cross principal within the visible horizon.",
        },
        {
            id: "estate-fragility",
            label: "Estate cushion at median life",
            impact: estateAtMedian,
            unit: "currency",
            signal: (estateAtMedian < 50000 ? "High" : estateAtMedian < 150000 ? "Medium" : "Low"),
            why: `Estate-equivalent balance near median life is about ${formatCurrency(estateAtMedian)}.`,
        },
    ];
    return diagnostics.sort((left, right) => {
        const bySignal = rankSignal(right.signal) - rankSignal(left.signal);
        return bySignal || Math.abs(Number(right.impact) || 0) - Math.abs(Number(left.impact) || 0);
    });
}
function estimateSurvivalAtAge(rows, age) {
    const row = rows.find((item) => item.age >= age) || rows.at(-1);
    return row?.survival || 0;
}
function rankSignal(signal) {
    return { High: 3, Medium: 2, Low: 1 }[signal] || 0;
}
function formatCurrency(value) {
    return new Intl.NumberFormat("en-SG", { style: "currency", currency: "SGD", maximumFractionDigits: 0 }).format(value || 0);
}
