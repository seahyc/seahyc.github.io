export function getCurrentPolicyYear() {
    return new Date().getFullYear();
}
export const CPF_POLICY_BY_YEAR = {
    2025: { brs: 106500, frs: 213000, ers: 426000, bhs: 75500 },
    2026: { brs: 110200, frs: 220400, ers: 440800, bhs: 79000 },
};
const DEFAULT_POLICY_2026 = { brs: 110200, frs: 220400, ers: 440800, bhs: 79000 };
const GROWTH_ASSUMPTIONS = {
    brs: 1.0347,
    frs: 1.0347,
    ers: 1.0347,
    bhs: 1.0464,
};
export function resolveCpfYear(year) {
    const exactPolicy = CPF_POLICY_BY_YEAR[year];
    if (exactPolicy)
        return exactPolicy;
    const knownYears = Object.keys(CPF_POLICY_BY_YEAR).map(Number).sort((a, b) => a - b);
    const baseYear = knownYears[knownYears.length - 1] ?? 2026;
    const fallbackPolicy = CPF_POLICY_BY_YEAR[2026] ?? DEFAULT_POLICY_2026;
    const basePolicy = CPF_POLICY_BY_YEAR[baseYear] ?? fallbackPolicy;
    if (year <= baseYear)
        return basePolicy;
    let current = { ...basePolicy };
    for (let currentYear = baseYear + 1; currentYear <= year; currentYear += 1) {
        current = {
            brs: roundCpf(current.brs * GROWTH_ASSUMPTIONS.brs),
            frs: roundCpf(current.frs * GROWTH_ASSUMPTIONS.frs),
            ers: roundCpf(current.ers * GROWTH_ASSUMPTIONS.ers),
            bhs: roundCpf(current.bhs * GROWTH_ASSUMPTIONS.bhs),
        };
    }
    return current;
}
function roundCpf(value) {
    return Math.round(value / 100) * 100;
}
