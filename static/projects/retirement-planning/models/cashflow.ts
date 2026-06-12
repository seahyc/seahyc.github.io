import { buildBaselineSurvival, type BaselineSurvivalPoint } from "./mortality-baseline.js";
import { computeRiskMultiplier } from "./mortality-risk.js";
import { inferFrailty } from "./frailty.js";
import { summarizeInterventions } from "./interventions.js";
import { estimateMedicalCosts } from "./medical-costs.js";
import { estimateEmergencyBuffer } from "./emergency-buffer.js";
import { buildLifestyleEquivalents } from "./lifestyle-equivalents.js";
import { buildCpfLedger } from "./cpf-ledger.js";
import { getCpfConstraints } from "../policy/cpf-validation.js";
import { normalizeFamilyTopups } from "./family-topups.js";
import type { PlanData, PlanRunResult, ProfileData } from "../types.js";

// Build the baseline curve out to ~age 113 so even low-risk (long-lived) profiles
// have their p90 landmark captured before the ledger horizon truncates it.
const MORTALITY_HORIZON = 50;

// Apply the risk multiplier in hazard form: each year's mortality probability is
// scaled (qx·m), then survival is the running product Π(1 − min(0.99, qx·m)). This is
// the correct hazard semantics — unlike survival**m it does not compound the penalty
// non-physically across the horizon. Index 0 is currentAge with survival 1.
function buildAdjustedSurvival(points: BaselineSurvivalPoint[], multiplier: number): number[] {
  const out: number[] = [];
  let survival = 1;
  points.forEach((point, index) => {
    if (index > 0) survival *= Math.max(0, 1 - Math.min(0.99, point.qx * multiplier));
    out.push(survival);
  });
  return out;
}

// First age at which cumulative survival has dropped to/below the threshold:
// 0.5 → median death age, 0.25 → p75, 0.10 → p90.
function survivalQuantileAge(ages: number[], survival: number[], threshold: number): number {
  for (let i = 0; i < survival.length; i += 1) {
    if ((survival[i] ?? 1) <= threshold) return ages[i] ?? ages[ages.length - 1] ?? 0;
  }
  return ages[ages.length - 1] ?? 0;
}

// Modal death age = the age with the highest single-year death probability
// (largest drop survival[i-1] − survival[i]).
function modalDeathAge(ages: number[], survival: number[]): number {
  let bestDrop = -1;
  let bestAge = ages[0] ?? 0;
  for (let i = 1; i < survival.length; i += 1) {
    const drop = (survival[i - 1] ?? 0) - (survival[i] ?? 0);
    if (drop > bestDrop) {
      bestDrop = drop;
      bestAge = ages[i] ?? bestAge;
    }
  }
  return bestAge;
}

export function runPlan(profile: ProfileData, plan: PlanData): PlanRunResult {
  const currentAge = getAge(profile.birthDate);
  const frailty = inferFrailty(profile);
  // ONE reconciled mortality model (resolves the prior survival-column vs medianAge
  // divergence). The baseline curve is calibrated so its median matches the SingStat
  // remaining-years table; we then adjust it by riskMultiplier in HAZARD form (per-year
  // qx·m, NOT survival**m which compounds the penalty non-physically across the
  // horizon), and read every mortality landmark off this single adjusted column.
  const riskMultiplier = computeRiskMultiplier(profile, plan) * frailty.annualMortalityMultiplier;
  const baseSurvival = buildBaselineSurvival(currentAge, profile.sex, MORTALITY_HORIZON);
  const survivalAges = baseSurvival.points.map((point) => point.age);
  const adjustedSurvival = buildAdjustedSurvival(baseSurvival.points, riskMultiplier);
  const medianAge = survivalQuantileAge(survivalAges, adjustedSurvival, 0.5);
  const p75Age = survivalQuantileAge(survivalAges, adjustedSurvival, 0.25);
  const p90Age = survivalQuantileAge(survivalAges, adjustedSurvival, 0.1);
  const modalAge = modalDeathAge(survivalAges, adjustedSurvival);
  const remainingYears = Math.max(4, medianAge - currentAge);
  const constraints = getCpfConstraints(profile, plan);
  const familyTopups = normalizeFamilyTopups(profile, plan, constraints.remainingErsRoom);
  const cpfLedger = buildCpfLedger(profile, plan, Math.ceil(remainingYears + 12), familyTopups);
  const interventions = summarizeInterventions(plan);

  // Bank must drain with consumption. The CPF ledger only reduces its `bank` by
  // top-ups, so on its own the displayed bank/liquidAssets/estateEquivalent never
  // fall as the retiree spends. We thread cumulative net cashflow into the rows:
  // year 0 is unadjusted; year y carries Σ netAnnual[0..y-1]. Bank may go negative
  // (honest) — we deliberately do NOT clamp. The futures engine then re-anchors on
  // this now-draining liquidAssets and adds ONLY stochastic deltas (see futures.ts),
  // so consumption is never double-counted.
  let carryNet = 0;
  const rows = cpfLedger.rows.map((cpfRow, index) => {
    const age = cpfRow.age;
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
    // cpfRow.bank already reflects this year's top-up drain; add the accumulated
    // net cashflow from all prior years (year 0 carryNet === 0). Not clamped.
    const bank = cpfRow.bank + carryNet;
    const liquidAssets = bank + profile.marketAssets + cpfRow.cpfInvestments;
    const estateEquivalent = liquidAssets + cpfRow.oa + cpfRow.ra + cpfRow.ma;
    carryNet += netAnnual;
    return {
      yearOffset: index,
      survival: adjustedSurvival[Math.min(adjustedSurvival.length - 1, index)] ?? 0,
      mortalityState: frailty.state,
      ...cpfRow,
      bank,
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

function getAge(birthDate: string): number {
  const now = new Date();
  const birth = new Date(birthDate);
  let age = now.getFullYear() - birth.getFullYear();
  const monthDiff = now.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birth.getDate())) age -= 1;
  return age;
}

function computeConfidence(profile: ProfileData): string {
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
