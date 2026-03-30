import type { Sex } from "../types.js";

export interface BaselineSurvivalPoint {
  age: number;
  qx: number;
  survival: number;
}

export interface BaselineSurvival {
  medianAge: number;
  points: BaselineSurvivalPoint[];
}
type RemainingYearsTable = Record<number, number>;

const FEMALE_BASE_REMAINING: RemainingYearsTable = { 55: 29.8, 60: 25.9, 65: 22.7, 70: 18.8, 75: 15.2, 80: 11.9, 85: 8.9, 90: 6.3 };
const MALE_BASE_REMAINING: RemainingYearsTable = { 55: 25.9, 60: 22.4, 65: 19.5, 70: 16.0, 75: 12.8, 80: 9.9, 85: 7.3, 90: 5.2 };

function interpolate(table: RemainingYearsTable, age: number): number {
  const ages = Object.keys(table).map(Number).sort((a, b) => a - b);
  const firstAge = ages[0];
  const lastAge = ages[ages.length - 1];
  if (firstAge === undefined || lastAge === undefined) return 0;
  if (age <= firstAge) return table[firstAge] ?? 0;
  if (age >= lastAge) return table[lastAge] ?? 0;
  for (let i = 1; i < ages.length; i += 1) {
    const prevAge = ages[i - 1];
    const nextAge = ages[i];
    if (prevAge === undefined || nextAge === undefined) continue;
    if (age <= nextAge) {
      const ratio = (age - prevAge) / (nextAge - prevAge);
      const prev = table[prevAge] ?? 0;
      const next = table[nextAge] ?? prev;
      return prev + ratio * (next - prev);
    }
  }
  return table[lastAge] ?? 0;
}

export function getBaseRemainingYears(age: number, sex: Sex): number {
  return interpolate(sex === "male" ? MALE_BASE_REMAINING : FEMALE_BASE_REMAINING, age);
}

export function buildBaselineSurvival(age: number, sex: Sex, horizon = 35): BaselineSurvival {
  const remainingYears = getBaseRemainingYears(age, sex);
  const medianAge = age + remainingYears;
  const qScale = sex === "male" ? 0.083 : 0.077;
  const points: BaselineSurvivalPoint[] = [];
  let survival = 1;
  for (let i = 0; i <= horizon; i += 1) {
    const currentAge = age + i;
    const qx = Math.min(0.62, qScale * Math.exp((currentAge - age - remainingYears / 2) / 10));
    survival *= i === 0 ? 1 : Math.max(0, 1 - qx);
    points.push({ age: currentAge, qx, survival });
  }
  return { medianAge, points };
}
