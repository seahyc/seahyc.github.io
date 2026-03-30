export const CPF_LIFE_PLANS = {
    standard: {
        label: "Standard",
        type: "level",
        baseMultiplier: 1,
        deferralRatePerYear: 0.07,
        sourceIds: ["cpf-life-2025", "cpf-life-2026"],
    },
    escalating: {
        label: "Escalating",
        type: "growth",
        growth: 0.02,
        baseMultiplier: 0.53,
        deferralRatePerYear: 0.07,
        sourceIds: ["cpf-life-2025", "cpf-life-2026"],
    },
    basic: {
        label: "Basic",
        type: "basic",
        baseMultiplier: 0.82,
        residualFactor: 0.38,
        deferralRatePerYear: 0.065,
        sourceIds: ["cpf-life-2025", "cpf-life-2026"],
    },
};
export const STANDARD_ANCHORS = [
    { balance: 110200, payout: 890 },
    { balance: 220400, payout: 1780 },
    { balance: 440800, payout: 3440 },
];
export function interpolateStandardPayout(balance) {
    const first = STANDARD_ANCHORS[0];
    if (!first)
        return 0;
    if (balance <= first.balance) {
        return (balance / first.balance) * first.payout;
    }
    for (let i = 1; i < STANDARD_ANCHORS.length; i += 1) {
        const prev = STANDARD_ANCHORS[i - 1];
        const next = STANDARD_ANCHORS[i];
        if (!prev || !next)
            continue;
        if (balance <= next.balance) {
            const ratio = (balance - prev.balance) / (next.balance - prev.balance);
            return prev.payout + ratio * (next.payout - prev.payout);
        }
    }
    const last = STANDARD_ANCHORS[STANDARD_ANCHORS.length - 1];
    if (!last)
        return 0;
    return last.payout + ((balance - last.balance) / last.balance) * 0.72 * last.payout;
}
export function interpolatePlanPayout(planType, balance) {
    const standard = interpolateStandardPayout(balance);
    const plan = CPF_LIFE_PLANS[planType];
    if (!plan)
        return standard;
    return standard * plan.baseMultiplier;
}
