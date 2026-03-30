export interface ExtraInterestAllocations {
    ra: number;
    oa: number;
    ma: number;
}
export interface ExtraInterestInput {
    oa: number;
    ra: number;
    ma: number;
}
export interface ExtraInterestResult {
    totalExtra: number;
    allocations: ExtraInterestAllocations;
    basis: {
        oaEligible: number;
        combinedEligible: number;
        first30k: number;
        next30k: number;
    };
}
export declare const CPF_INTEREST: {
    readonly oa: 0.025;
    readonly ra: 0.04;
    readonly ma: 0.04;
    readonly cpfInvestments: 0.04;
    readonly extraFirst30k: 0.02;
    readonly extraNext30k: 0.01;
    readonly oaExtraCap: 20000;
};
export declare function computeExtraInterest({ oa, ra, ma }: ExtraInterestInput): ExtraInterestResult;
