// @ts-nocheck
const FEMALE_BASE_REMAINING = { 55: 29.8, 60: 25.9, 65: 22.7, 70: 18.8, 75: 15.2, 80: 11.9, 85: 8.9, 90: 6.3 };
const MALE_BASE_REMAINING = { 55: 25.9, 60: 22.4, 65: 19.5, 70: 16.0, 75: 12.8, 80: 9.9, 85: 7.3, 90: 5.2 };
function interpolate(table, age) {
    const ages = Object.keys(table).map(Number).sort((a, b) => a - b);
    if (age <= ages[0])
        return table[ages[0]];
    if (age >= ages[ages.length - 1])
        return table[ages[ages.length - 1]];
    for (let i = 1; i < ages.length; i += 1) {
        const prevAge = ages[i - 1];
        const nextAge = ages[i];
        if (age <= nextAge) {
            const ratio = (age - prevAge) / (nextAge - prevAge);
            return table[prevAge] + ratio * (table[nextAge] - table[prevAge]);
        }
    }
    return table[ages[ages.length - 1]];
}
export function getBaseRemainingYears(age, sex) {
    return interpolate(sex === "male" ? MALE_BASE_REMAINING : FEMALE_BASE_REMAINING, age);
}
export function buildBaselineSurvival(age, sex, horizon = 35) {
    const remainingYears = getBaseRemainingYears(age, sex);
    const medianAge = age + remainingYears;
    const qScale = sex === "male" ? 0.083 : 0.077;
    const points = [];
    let survival = 1;
    for (let i = 0; i <= horizon; i += 1) {
        const currentAge = age + i;
        const qx = Math.min(0.62, qScale * Math.exp((currentAge - age - remainingYears / 2) / 10));
        survival *= i === 0 ? 1 : Math.max(0, 1 - qx);
        points.push({ age: currentAge, qx, survival });
    }
    return { medianAge, points };
}
