export declare const INSURANCE_SOURCE_MANIFEST: {
    id: string;
    provider: string;
    label: string;
    url: string;
    kind: string;
}[];
export declare const UNIFIED_INSURANCE_DB: {
    generatedAt: string;
    sources: {
        id: string;
        provider: string;
        label: string;
        url: string;
        kind: string;
    }[];
    publicSchemes: {
        medishieldLife: {
            sourceId: string;
            deductible: number;
            coinsurance: number;
            annualLimit: number;
            note: string;
        };
        careShieldLife: {
            sourceId: string;
            payoutMonthly: number;
            note: string;
        };
    };
    insurers: {
        AIA: {
            sourceId: string;
            plans: {
                "HealthShield Gold Max A": any;
                "HealthShield Gold Max B": any;
                "HealthShield Gold Max B Lite": any;
                "HealthShield Gold Max Standard": any;
            };
        };
        "Great Eastern": {
            sourceId: string;
            plans: {
                "GREAT SupremeHealth P Plus": any;
                "GREAT SupremeHealth A Plus": any;
                "GREAT SupremeHealth B Plus": any;
                "GREAT SupremeHealth Standard": any;
            };
        };
        Prudential: {
            sourceId: string;
            plans: {
                "PRUShield Premier": any;
                "PRUShield Plus": any;
                "PRUShield Standard": any;
            };
        };
        Income: {
            sourceId: string;
            plans: {
                "Enhanced IncomeShield Preferred": any;
                "Enhanced IncomeShield Advantage": any;
                "Enhanced IncomeShield Basic": any;
                "IncomeShield Standard Plan": any;
            };
        };
        Singlife: {
            sourceId: string;
            plans: {
                "Singlife Shield Plan 1": any;
                "Singlife Shield Plan 2": any;
                "Singlife Shield Plan 3": any;
                "Singlife Shield Standard Plan": any;
                "Singlife Shield Starter": any;
            };
        };
        "HSBC Life": {
            sourceId: string;
            plans: {
                "HSBC Life Shield Plan A": any;
                "HSBC Life Shield Plan B": any;
                "HSBC Life Shield Standard Plan": any;
            };
        };
        Raffles: {
            sourceId: string;
            plans: {
                "Raffles Shield Private": any;
                "Raffles Shield A": any;
                "Raffles Shield B": any;
                "Raffles Shield Standard Plan": any;
            };
        };
    };
};
