const FEMALE_BASE_REMAINING = { 55: 29.8, 60: 25.9, 65: 22.7, 70: 18.8, 75: 15.2, 80: 11.9, 85: 8.9, 90: 6.3 };
const MALE_BASE_REMAINING = { 55: 25.9, 60: 22.4, 65: 19.5, 70: 16.0, 75: 12.8, 80: 9.9, 85: 7.3, 90: 5.2 };
function interpolate(table, age) {
    const ages = Object.keys(table).map(Number).sort((a, b) => a - b);
    const firstAge = ages[0];
    const lastAge = ages[ages.length - 1];
    if (firstAge === undefined || lastAge === undefined)
        return 0;
    if (age <= firstAge)
        return table[firstAge] ?? 0;
    if (age >= lastAge)
        return table[lastAge] ?? 0;
    for (let i = 1; i < ages.length; i += 1) {
        const prevAge = ages[i - 1];
        const nextAge = ages[i];
        if (prevAge === undefined || nextAge === undefined)
            continue;
        if (age <= nextAge) {
            const ratio = (age - prevAge) / (nextAge - prevAge);
            const prev = table[prevAge] ?? 0;
            const next = table[nextAge] ?? prev;
            return prev + ratio * (next - prev);
        }
    }
    return table[lastAge] ?? 0;
}
export function getBaseRemainingYears(age, sex) {
    return interpolate(sex === "male" ? MALE_BASE_REMAINING : FEMALE_BASE_REMAINING, age);
}
// Gompertz log-hazard growth (qx roughly doubles every ln2/g ≈ 7.3 years in old age),
// consistent with SingStat elderly mortality slope. Only the LEVEL is profile-specific
// and is solved per call so the curve's median matches the remaining-years table.
const GOMPERTZ_SLOPE = 0.095;
export function buildBaselineSurvival(age, sex, horizon = 35) {
    const remainingYears = getBaseRemainingYears(age, sex);
    const medianAge = age + remainingYears;
    // Calibrate the hazard LEVEL q0 so cumulative survival crosses 0.5 EXACTLY at the
    // life-table median (age + remainingYears). The previous fixed qScale produced a
    // curve whose median sat ~10y below its own remaining-years input — the survival
    // column was internally inconsistent and far too pessimistic (e.g. 63F median 77 vs
    // table-implied 87). Shape is Gompertz qx(i)=q0·exp(g·i); q0 found by bisection.
    const g = GOMPERTZ_SLOPE;
    const survivalAtMedian = (q0) => {
        let survival = 1;
        let prevAge = age;
        for (let i = 1; i <= horizon; i += 1) {
            const qx = Math.min(0.99, q0 * Math.exp(g * i));
            const next = survival * Math.max(0, 1 - qx);
            const currentAge = age + i;
            if (currentAge >= medianAge) {
                const span = currentAge - prevAge || 1;
                const ratio = (medianAge - prevAge) / span;
                return survival + ratio * (next - survival);
            }
            survival = next;
            prevAge = currentAge;
        }
        return survival;
    };
    let lo = 1e-5;
    let hi = 0.5;
    for (let iter = 0; iter < 60; iter += 1) {
        const mid = (lo + hi) / 2;
        // Higher q0 → more hazard → lower survival at the median. Bisect toward s=0.5.
        if (survivalAtMedian(mid) > 0.5)
            lo = mid;
        else
            hi = mid;
    }
    const q0 = (lo + hi) / 2;
    const points = [];
    let survival = 1;
    for (let i = 0; i <= horizon; i += 1) {
        const currentAge = age + i;
        const qx = i === 0 ? 0 : Math.min(0.99, q0 * Math.exp(g * i));
        survival *= Math.max(0, 1 - qx);
        points.push({ age: currentAge, qx, survival });
    }
    return { medianAge, points };
}
