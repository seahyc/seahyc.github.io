import type { CpfPlanType } from "../types.js";
export interface CpfLifePlanConfig {
    label: string;
    type: "level" | "growth" | "basic";
    baseMultiplier: number;
    deferralRatePerYear: number;
    growth?: number;
    residualFactor?: number;
    sourceIds: string[];
}
export interface StandardAnchor {
    balance: number;
    payout: number;
}
export declare const CPF_LIFE_PLANS: Record<CpfPlanType, CpfLifePlanConfig>;
export declare const STANDARD_ANCHORS: StandardAnchor[];
export declare function interpolateStandardPayout(balance: number): number;
export declare function interpolatePlanPayout(planType: CpfPlanType, balance: number): number;
