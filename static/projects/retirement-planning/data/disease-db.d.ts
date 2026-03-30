import type { DiseaseClaimsPathway, DiseaseProfile, ParsedDisease } from "../types.js";
export declare const DISEASE_DB: Record<string, DiseaseProfile>;
export declare function normalizeDiseaseInput(input: string): string | null;
export declare function getDiseaseProfile(key: string): DiseaseProfile | null;
export declare function parseDiseaseList(rawList: string[]): ParsedDisease[];
export declare function listSupportedDiseases(): {
    key: string;
    label: string;
    category: string;
    surveillanceCadenceMonths: number | null;
    recurrenceWindowYears: number | null;
}[];
export declare function getDiseaseClaimPath(key: string): DiseaseClaimsPathway | null;
