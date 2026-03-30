import type { FamilyTopupModel, PlanData, ProfileData } from "../types.js";
export declare function buildCpfLedger(profile: ProfileData, plan: PlanData, mortalityYears?: number, familyRows?: Array<FamilyTopupModel & {
    activeYears?: number;
    allowedTopup?: number;
}>): {
    initialPayout: number;
    rows: {
        age: number;
        oa: number;
        sa: number;
        ra: number;
        ma: number;
        bank: number;
        cpfInvestments: number;
        familyTopup: number;
        ownTopup: number;
        payoutMonthly: number;
        payoutAnnual: number;
        cumulativePayouts: number;
        premiumEquivalent: number;
        ers: number;
        frs: number;
        bhs: number;
        extraInterestTotal: number;
        oaInterest: number;
        saInterest: number;
        raInterest: number;
        maInterest: number;
    }[];
};
