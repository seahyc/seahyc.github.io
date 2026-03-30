export function buildAppendixRows(result) {
    return result.rows.map((row) => ({
        ...row,
        cpfPayoutMonthly: row.payoutMonthly ?? (row.payoutAnnual || row.cpfPayoutAnnual || 0) / 12,
        cpfPayoutAnnual: row.payoutAnnual,
        supportAnnual: (row.familyTopup || 0) + (row.ownTopup || 0),
        investmentIncomeAnnual: row.grossIncomeAnnual - row.payoutAnnual - ((row.familyTopup || 0) + (row.ownTopup || 0)),
        liquidityCoverageMonths: (row.liquidAssets || 0) / Math.max(1, (row.basicSpendAnnual || 0) / 12),
        emergencyCoverageRatio: (row.liquidAssets || 0) / Math.max(1, row.emergencyBalanced || 0),
        medicalShareOfSpend: (row.medicalCash || 0) / Math.max(1, row.totalSpendAnnual || 0),
        cpfShareOfIncome: (row.payoutAnnual || row.cpfPayoutAnnual || 0) / Math.max(1, row.grossIncomeAnnual || 0),
        estateMinusEmergency: (row.estateEquivalent || 0) - (row.emergencyBalanced || 0),
    }));
}
