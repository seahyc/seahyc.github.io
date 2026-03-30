import { estimateTopupTaxSavings } from "../policy/tax-relief.js";
export function normalizeFamilyTopups(profile, plan, remainingErsRoom) {
    const contributors = estimateTopupTaxSavings(profile.familyContributors || []);
    let runningRoom = remainingErsRoom;
    const rows = contributors.map((contributor) => {
        const allowed = Math.min(runningRoom, contributor.eligible);
        runningRoom -= allowed;
        return {
            ...contributor,
            allowedTopup: allowed,
            modeledTaxSaved: allowed * (contributor.marginalTaxRate || 0),
        };
    });
    const totalAllowed = rows.reduce((sum, row) => sum + row.allowedTopup, 0);
    if (plan.childSupportStrategy === "split-evenly" && rows.length > 1 && totalAllowed > 0) {
        const equal = totalAllowed / rows.length;
        rows.forEach((row) => {
            row.allowedTopup = equal;
            row.modeledTaxSaved = equal * (row.marginalTaxRate || 0);
        });
    }
    return rows;
}
