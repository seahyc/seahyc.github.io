import type { InsuranceDb, InsuranceDbSource } from "../types.js";
import type { InsurancePlanLike } from "../policy/medical-schemes.js";
type SourceKind = "html" | "pdf";
type ProviderPlans = {
    sourceId: string;
    plans: Record<string, InsurancePlanLike>;
};
export declare const INSURANCE_SOURCE_MANIFEST: Array<InsuranceDbSource & {
    provider: string;
    label: string;
    kind: SourceKind;
}>;
export declare const UNIFIED_INSURANCE_DB: InsuranceDb & {
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
    insurers: Record<string, ProviderPlans>;
};
export {};
