import type { InsuranceCatalogEntry, InsuranceDb, InsuranceDbSource } from "../types.js";
import type { InsurancePlanLike, InsuranceRiderOption } from "../policy/medical-schemes.js";
type SourceKind = "html" | "pdf";
type ProviderPlans = {
    sourceId: string;
    plans: Record<string, InsurancePlanLike>;
};
type RiderSeed = InsuranceRiderOption & {
    sku: string;
    effectiveFrom: string;
    effectiveTo?: string | null;
    sourceRefs: string[];
    compatibility: NonNullable<InsuranceCatalogEntry["compatibility"]>;
    claimPathTags?: string[];
    notes?: string[];
    planHints?: string[];
};
export declare const INSURANCE_SOURCE_MANIFEST: Array<InsuranceDbSource & {
    provider: string;
    label: string;
    kind: SourceKind;
}>;
export declare const INSURANCE_RIDER_CATALOG: Record<string, RiderSeed[]>;
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
