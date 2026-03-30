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
export declare function getBaseRemainingYears(age: number, sex: Sex): number;
export declare function buildBaselineSurvival(age: number, sex: Sex, horizon?: number): BaselineSurvival;
