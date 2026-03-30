import { CPF_LIFE_PLANS, interpolatePlanPayout } from "../policy/cpf-life-plans.js";
import type { CpfPlanType, PlanData, ProfileData } from "../types.js";

const MOM_RA_ANCHOR = 227688;

export function computeCpfLifeInitial(profile: ProfileData, plan: PlanData): number {
  const annuityBase = profile.ra + Math.max(0, plan.oneOffTopup || 0);
  const planConfig = CPF_LIFE_PLANS[plan.cpfPlan];
  let payout = interpolatePlanPayout(plan.cpfPlan, annuityBase);
  const deferralYears = Math.max(0, plan.payoutStartAge - 65);
  const deferralRate = planConfig?.deferralRatePerYear ?? 0.07;
  payout *= Math.pow(1 + deferralRate, deferralYears);
  if (profile.observedCpfPayout > 0 && profile.observedCpfPlan === plan.cpfPlan) {
    const distance = Math.abs((profile.ra || 0) - MOM_RA_ANCHOR);
    const calibrationWeight = distance <= 5000 ? 1 : distance <= 20000 ? 0.5 : 0.2;
    payout = payout * (1 - calibrationWeight) + profile.observedCpfPayout * calibrationWeight;
  }
  return Math.max(0, payout);
}

export function payoutForYear(initialMonthly: number, planType: CpfPlanType, yearsFromStart: number): number {
  if (yearsFromStart < 0) return 0;
  if (planType === "escalating") return initialMonthly * Math.pow(1.02, yearsFromStart);
  if (planType === "basic") {
    const softDecay = Math.max(0.78, 1 - yearsFromStart * 0.0035);
    return initialMonthly * softDecay;
  }
  return initialMonthly;
}
