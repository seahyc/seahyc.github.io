// @ts-nocheck
export function estimateEmergencyBuffer({ profile, medical }) {
    const monthlyBasic = profile.basicSpendMonthly;
    const reserveMonths = monthlyBasic < 2200 ? 9 : monthlyBasic < 3500 ? 8 : 6;
    const base = monthlyBasic * reserveMonths;
    const balanced = base + medical.expectedEmergency * 0.6;
    const conservative = base + medical.expectedEmergency * 0.95;
    const minimum = base + medical.expectedEmergency * 0.35;
    return {
        reserveMonths,
        base,
        minimum,
        balanced,
        conservative,
    };
}
