import { buildBaselineSurvival, getBaseRemainingYears } from "./mortality-baseline.js";
import { computeRiskMultiplier } from "./mortality-risk.js";
import { inferFrailty } from "./frailty.js";
import { summarizeInterventions } from "./interventions.js";
import { estimateMedicalCosts } from "./medical-costs.js";
import { estimateEmergencyBuffer } from "./emergency-buffer.js";
import { buildLifestyleEquivalents } from "./lifestyle-equivalents.js";
import { buildCpfLedger } from "./cpf-ledger.js";
import { getCpfConstraints } from "../policy/cpf-validation.js";
import { normalizeFamilyTopups } from "./family-topups.js";
export function runPlan(profile, plan) {
    const currentAge = getAge(profile.birthDate);
    const frailty = inferFrailty(profile);
    const baseSurvival = buildBaselineSurvival(currentAge, profile.sex);
    const riskMultiplier = computeRiskMultiplier(profile, plan) * frailty.annualMortalityMultiplier;
    const remainingYears = Math.max(4, getBaseRemainingYears(currentAge, profile.sex) / riskMultiplier);
    const modalAge = currentAge + remainingYears * 0.9;
    const medianAge = currentAge + remainingYears;
    const p75Age = currentAge + remainingYears * 1.18;
    const p90Age = currentAge + remainingYears * 1.34;
    const constraints = getCpfConstraints(profile, plan);
    const familyTopups = normalizeFamilyTopups(profile, plan, constraints.remainingErsRoom);
    const cpfLedger = buildCpfLedger(profile, plan, Math.ceil(remainingYears + 12), familyTopups);
    const interventions = summarizeInterventions(plan);
    const rows = cpfLedger.rows.map((cpfRow, index) => {
        const age = cpfRow.age;
        const survivalPoint = baseSurvival.points[Math.min(baseSurvival.points.length - 1, index)];
        const medical = estimateMedicalCosts({ age, profile, frailty });
        const emergency = estimateEmergencyBuffer({ profile, medical });
        const inflation = Math.pow(1.03, index);
        const basicSpendAnnual = profile.basicSpendMonthly * 12 * inflation;
        const discretionaryAnnual = profile.discretionarySpendAnnual * inflation;
        const supportAnnual = (plan.monthlySupport || 0) * 12;
        const investmentIncome = (profile.marketIncomeAnnual || 0) * Math.pow(1.02, index);
        const grossIncomeAnnual = cpfRow.payoutAnnual + supportAnnual + investmentIncome;
        const totalSpendAnnual = basicSpendAnnual + discretionaryAnnual + medical.cashOutOfPocket;
        const netAnnual = grossIncomeAnnual - totalSpendAnnual;
        const liquidAssets = cpfRow.bank + profile.marketAssets + cpfRow.cpfInvestments;
        const estateEquivalent = liquidAssets + cpfRow.oa + cpfRow.ra + cpfRow.ma;
        return {
            yearOffset: index,
            survival: (survivalPoint?.survival ?? 0) ** riskMultiplier,
            mortalityState: frailty.state,
            ...cpfRow,
            cpfPayoutAnnual: cpfRow.payoutAnnual,
            basicSpendAnnual,
            discretionaryAnnual,
            medicalGross: medical.gross,
            insurerPaid: medical.insurerPaid,
            medisavePaid: medical.medisavePaid,
            medicalCash: medical.cashOutOfPocket,
            emergencyExpected: medical.expectedEmergency,
            emergencyMinimum: emergency.minimum,
            emergencyBalanced: emergency.balanced,
            emergencyConservative: emergency.conservative,
            totalSpendAnnual,
            grossIncomeAnnual,
            netAnnual,
            liquidAssets,
            estateEquivalent,
            taxSavingsAnnual: familyTopups.reduce((sum, row) => sum + row.modeledTaxSaved, 0),
            basicCoverage: grossIncomeAnnual >= basicSpendAnnual,
            totalCoverage: grossIncomeAnnual >= totalSpendAnnual,
        };
    });
    const lifestyle = buildLifestyleEquivalents(profile.discretionarySpendAnnual);
    const latestEmergency = rows[0]?.emergencyBalanced || 0;
    const emergencyGap = latestEmergency - (rows[0]?.liquidAssets || 0);
    const principalCrossoverAge = rows.find((row) => row.cumulativePayouts >= row.premiumEquivalent)?.age || null;
    return {
        currentAge,
        frailty,
        constraints,
        familyTopups,
        interventions,
        remainingYears,
        modalAge,
        medianAge,
        p75Age,
        p90Age,
        cpfInitialPayout: cpfLedger.initialPayout,
        policyTrace: cpfLedger.policyTrace,
        principalCrossoverAge,
        rows,
        lifestyle,
        emergencyGap,
        confidence: computeConfidence(profile),
    };
}
function getAge(birthDate) {
    const now = new Date();
    const birth = new Date(birthDate);
    let age = now.getFullYear() - birth.getFullYear();
    const monthDiff = now.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birth.getDate()))
        age -= 1;
    return age;
}
function computeConfidence(profile) {
    const fields = [
        profile.heightCm,
        profile.weightKg,
        profile.selfRatedHealth,
        profile.medications,
        profile.insurance?.shieldProvider,
        profile.familyContributors?.length,
    ];
    const score = fields.filter(Boolean).length / fields.length;
    return score >= 0.83 ? "High" : score >= 0.58 ? "Medium" : "Low";
}
