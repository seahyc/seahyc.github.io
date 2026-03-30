import { estimateTopupTaxSavings } from "../policy/tax-relief.js";
import type { ChildSupportStrategy, FamilyTopupModel, PlanData, ProfileData } from "../types.js";

export interface NormalizedFamilyTopup extends FamilyTopupModel {
  name: string;
  marginalTaxRate: number;
  amount: number;
  cadence: string;
  activeYears: number;
  eligible: number;
  allowedTopup: number;
  modeledTaxSaved: number;
}

export function normalizeFamilyTopups(profile: Pick<ProfileData, "familyContributors">, plan: Pick<PlanData, "childSupportStrategy">, remainingErsRoom: number): NormalizedFamilyTopup[] {
  const contributors = estimateTopupTaxSavings(profile.familyContributors || []);
  let runningRoom = remainingErsRoom;
  const rows: NormalizedFamilyTopup[] = contributors.map((contributor) => {
    const allowed = Math.min(runningRoom, contributor.eligible);
    runningRoom -= allowed;
    return {
      ...contributor,
      allowedTopup: allowed,
      modeledTaxSaved: allowed * (contributor.marginalTaxRate || 0),
    };
  });
  const totalAllowed = rows.reduce((sum, row) => sum + row.allowedTopup, 0);
  if ((plan.childSupportStrategy as ChildSupportStrategy) === "split-evenly" && rows.length > 1 && totalAllowed > 0) {
    const equal = totalAllowed / rows.length;
    rows.forEach((row) => {
      row.allowedTopup = equal;
      row.modeledTaxSaved = equal * (row.marginalTaxRate || 0);
    });
  }
  return rows;
}
