export const CPF_INTEREST = {
    oa: 0.025,
    ra: 0.04,
    ma: 0.04,
    cpfInvestments: 0.04,
    extraFirst30k: 0.02,
    extraNext30k: 0.01,
    oaExtraCap: 20000,
};
export function computeExtraInterest({ oa, ra, ma }) {
    const oaEligible = Math.min(Math.max(oa, 0), CPF_INTEREST.oaExtraCap);
    const balances = {
        ra: Math.max(0, ra),
        oa: Math.max(0, oaEligible),
        ma: Math.max(0, ma),
    };
    const combined = balances.oa + balances.ra + balances.ma;
    const first30 = Math.min(combined, 30000);
    const next30 = Math.max(0, Math.min(combined, 60000) - 30000);
    const firstExtra = first30 * CPF_INTEREST.extraFirst30k;
    const nextExtra = next30 * CPF_INTEREST.extraNext30k;
    const allocations = allocateExtraInterest(balances, firstExtra + nextExtra);
    const totalExtra = firstExtra + nextExtra;
    return {
        totalExtra,
        allocations,
        basis: {
            oaEligible,
            combinedEligible: combined,
            first30k: first30,
            next30k: next30,
        },
    };
}
function allocateExtraInterest(balances, totalExtra) {
    const remainingBalances = { ...balances };
    const allocations = { ra: 0, oa: 0, ma: 0 };
    let distributable = totalExtra;
    ["ra", "oa", "ma"].forEach((account) => {
        if (distributable <= 0)
            return;
        const balance = remainingBalances[account];
        if (balance <= 0)
            return;
        const alloc = Math.min(balance, distributable);
        allocations[account] += alloc;
        distributable -= alloc;
    });
    if (distributable > 0) {
        allocations.ra += distributable;
    }
    return allocations;
}
