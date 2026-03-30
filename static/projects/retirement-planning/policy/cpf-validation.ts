import { getCurrentPolicyYear, resolveCpfYear } from "./cpf-years.js";
import type { ConstraintSet, PlanData, ProfileData, ValidationResult } from "../types.js";

export function getCpfConstraints(profile: ProfileData, plan: PlanData, year = profile.cpfCohortYear || getCurrentPolicyYear()): ConstraintSet {
  const policy = resolveCpfYear(year);
  const normalizedRa = Math.max(0, profile.ra);
  const normalizedMa = Math.max(0, profile.ma);
  const totalTopupRoom = Math.max(0, policy.ers - normalizedRa);
  const topupCashCap = Math.max(0, Math.min(profile.bankCash, totalTopupRoom));
  const maOverflow = Math.max(0, normalizedMa - policy.bhs);
  return {
    year,
    remainingErsRoom: totalTopupRoom,
    totalTopupRoom,
    topupCashCap,
    maOverflow,
    brs: policy.brs,
    bhs: policy.bhs,
    ers: policy.ers,
    frs: policy.frs,
    payoutAgeValid: plan.payoutStartAge >= 65 && plan.payoutStartAge <= 70,
  };
}

export function validatePlan(profile: ProfileData, plan: PlanData, year = profile.cpfCohortYear || getCurrentPolicyYear()): ValidationResult {
  const constraints = getCpfConstraints(profile, plan, year);
  const issues: string[] = [];
  const allocationTotal = (plan.fixedIncomeAllocationPct || 0) + (plan.equityAllocationPct || 0);
  const recurringRequested = Math.max(0, plan.recurringTopupAnnual || 0);
  const oneOffRequested = Math.max(0, plan.oneOffTopup || 0);
  if (!constraints.payoutAgeValid) issues.push("Payout age must be between 65 and 70.");
  if (profile.oa < 0 || profile.sa < 0 || profile.ra < 0 || profile.ma < 0 || profile.bankCash < 0) issues.push("CPF and cash balances cannot be negative.");
  if (oneOffRequested > constraints.remainingErsRoom) issues.push("One-off top-up exceeds remaining ERS room.");
  if (oneOffRequested > constraints.topupCashCap && plan.topupSource === "cash") issues.push("One-off cash top-up exceeds available cash or remaining ERS room.");
  if (recurringRequested > Math.max(constraints.remainingErsRoom, constraints.topupCashCap)) issues.push("Recurring top-up assumption exceeds current plausible annual room.");
  if (allocationTotal > 100) issues.push("Fixed income and equity allocation cannot exceed 100%.");
  if (profile.observedCpfPayout > 0 && profile.observedCpfPlan && profile.observedCpfPlan !== plan.cpfPlan) issues.push("Observed CPF payout anchor does not match the selected CPF LIFE plan.");
  if (constraints.maOverflow > 0) issues.push("MA exceeds BHS and will be normalized through overflow routing.");
  return { constraints, issues };
}

export function normalizePlanToConstraints(profile: ProfileData, plan: PlanData, year = profile.cpfCohortYear || getCurrentPolicyYear()): { profile: ProfileData; plan: PlanData; constraints: ConstraintSet } {
  const constraints = getCpfConstraints(profile, plan, year);
  const normalizedProfile: ProfileData = {
    ...profile,
    bankCash: Math.max(0, profile.bankCash),
    oa: Math.max(0, profile.oa),
    sa: Math.max(0, profile.sa),
    ra: Math.max(0, profile.ra),
    ma: Math.max(0, profile.ma),
  };
  const normalizedPlan: PlanData = {
    ...plan,
    payoutStartAge: clamp(plan.payoutStartAge, 65, 70),
    oneOffTopup: clamp(plan.oneOffTopup, 0, plan.topupSource === "cash" ? constraints.topupCashCap : constraints.remainingErsRoom),
    recurringTopupAnnual: clamp(plan.recurringTopupAnnual, 0, Math.max(constraints.remainingErsRoom, constraints.topupCashCap)),
    fixedIncomeAllocationPct: clamp(plan.fixedIncomeAllocationPct, 0, 100),
    equityAllocationPct: clamp(plan.equityAllocationPct, 0, 100),
  };
  if ((normalizedPlan.fixedIncomeAllocationPct + normalizedPlan.equityAllocationPct) > 100) {
    normalizedPlan.equityAllocationPct = Math.max(0, 100 - normalizedPlan.fixedIncomeAllocationPct);
  }
  return {
    profile: normalizedProfile,
    plan: normalizedPlan,
    constraints: getCpfConstraints(normalizedProfile, normalizedPlan, year),
  };
}

function clamp(value: number, low: number, high: number): number {
  return Math.min(high, Math.max(low, Number.isFinite(value) ? value : low));
}
