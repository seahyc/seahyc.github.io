import type { FamilyContributor } from "../types.js";

export interface TaxReliefEstimate extends FamilyContributor {
  eligible: number;
  taxSaved: number;
}

export function estimateTopupTaxSavings(familyContributors: FamilyContributor[]): TaxReliefEstimate[] {
  return familyContributors.map((item) => {
    const eligible = Math.max(0, item.amount || 0);
    const taxSaved = eligible * Math.max(0, item.marginalTaxRate || 0);
    return {
      ...item,
      eligible,
      taxSaved,
    };
  });
}
