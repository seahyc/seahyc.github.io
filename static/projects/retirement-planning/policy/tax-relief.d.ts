import type { FamilyContributor } from "../types.js";
export interface TaxReliefEstimate extends FamilyContributor {
    eligible: number;
    taxSaved: number;
}
export declare function estimateTopupTaxSavings(familyContributors: FamilyContributor[]): TaxReliefEstimate[];
