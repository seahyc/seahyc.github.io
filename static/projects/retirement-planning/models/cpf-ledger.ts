import { getCurrentPolicyYear, resolveCpfYear } from "../policy/cpf-years.js";
import { CPF_INTEREST, computeExtraInterest } from "../policy/cpf-interest.js";
import { computeCpfLifeInitial, payoutForYear } from "./cpf-life.js";
import type { CpfPolicyResolution, FamilyTopupModel, PlanData, ProfileData } from "../types.js";

export function buildCpfLedger(profile: ProfileData, plan: PlanData, mortalityYears = 35, familyRows: Array<FamilyTopupModel & { activeYears?: number; allowedTopup?: number }> = []) {
  const baseYear = profile.cpfCohortYear || getCurrentPolicyYear();
  const initialPolicy = resolveCpfYear(baseYear);
  let bank = profile.bankCash;
  let oa = profile.oa;
  let sa = profile.sa;
  let ra = profile.ra;
  let ma = Math.min(profile.ma, initialPolicy.bhs);
  let cpfInvestments = profile.cpfInvestments;
  const initialPayout = computeCpfLifeInitial(profile, plan);
  const rows = [];
  const policyTrace: CpfPolicyResolution[] = [];
  let cumulativePayouts = 0;
  let premiumEquivalent = Math.max(0, profile.ra + Math.min(plan.oneOffTopup || 0, Math.max(0, initialPolicy.ers - profile.ra)));

  for (let i = 0; i <= mortalityYears; i += 1) {
    const year = baseYear + i;
    const policyForYear = resolveCpfYear(year);
    if (!policyTrace.length || policyTrace[policyTrace.length - 1]?.year !== policyForYear.year) {
      policyTrace.push({
        year: policyForYear.year ?? year,
        sourceIds: (policyForYear.sources ?? []).map((source) => source.id),
        note: policyForYear.note ?? `Resolved CPF policy for ${year}.`,
      });
    }
    const age = getAge(profile.birthDate) + i;
    const remainingRoom = Math.max(0, policyForYear.ers - ra);
    const familyTopup = familyRows.reduce((sum, row) => sum + (i < (row.activeYears || 0) ? (row.allowedTopup || 0) : 0), 0);
    const ownTopupRequested = i === 0 ? (plan.oneOffTopup || 0) : (plan.recurringTopupAnnual || 0);
    const ownTopup = Math.min(remainingRoom, plan.topupSource === "cash" ? Math.max(0, bank) : remainingRoom, ownTopupRequested);
    const cashTopup = familyTopup + ownTopup;
    const extra = computeExtraInterest({ oa, ra, ma });
    const payoutMonthly = payoutForYear(initialPayout, plan.cpfPlan, age - plan.payoutStartAge);
    const payoutAnnual = payoutMonthly * 12;
    const payoutDeductionAnnual = age >= plan.payoutStartAge ? payoutAnnual : 0;

    const oaInterest = oa * CPF_INTEREST.oa + extra.allocations.oa;
    const saInterest = sa * CPF_INTEREST.ra;
    const raInterest = ra * CPF_INTEREST.ra + extra.allocations.ra;
    const maInterest = ma * CPF_INTEREST.ma + extra.allocations.ma;
    const cpfInvestmentGrowth = cpfInvestments * ((profile.cpfInvestmentReturnPct || CPF_INTEREST.cpfInvestments * 100) / 100);

    oa += oaInterest;
    sa += saInterest;
    ra += raInterest + cashTopup;
    ma += maInterest;

    let maOverflow = 0;
    let maOverflowToRa = 0;
    let maOverflowToSa = 0;
    let maOverflowToOa = 0;
    if (ma > policyForYear.bhs) {
      maOverflow = ma - policyForYear.bhs;
      ma = policyForYear.bhs;
      const raRoom = Math.max(0, policyForYear.frs - ra);
      maOverflowToRa = Math.min(maOverflow, raRoom);
      ra += maOverflowToRa;
      const residualAfterRa = maOverflow - maOverflowToRa;
      maOverflowToOa = Math.max(0, residualAfterRa);
      oa += maOverflowToOa;
      ma = policyForYear.bhs;
    }

    if (age >= plan.payoutStartAge) {
      premiumEquivalent = Math.max(0, premiumEquivalent - payoutDeductionAnnual + cashTopup + raInterest);
      cumulativePayouts += payoutAnnual;
    }

    cpfInvestments += cpfInvestmentGrowth;
    bank = Math.max(0, bank - ownTopup);

    rows.push({
      age,
      oa,
      sa,
      ra,
      ma,
      bank,
      cpfInvestments,
      familyTopup,
      ownTopup,
      payoutMonthly,
      payoutAnnual,
      cumulativePayouts,
      premiumEquivalent,
      ers: policyForYear.ers,
      frs: policyForYear.frs,
      bhs: policyForYear.bhs,
      policyYear: policyForYear.year ?? year,
      policySourceIds: (policyForYear.sources ?? []).map((source) => source.id),
      policyNote: policyForYear.note,
      extraInterestTotal: extra.totalExtra,
      oaInterest,
      saInterest,
      raInterest,
      maInterest,
      maOverflow,
      maOverflowToRa,
      maOverflowToSa,
      maOverflowToOa,
      payoutDeductionAnnual,
      raPayoutDeduction: age >= plan.payoutStartAge ? payoutAnnual : 0,
    });
  }
  return { initialPayout, rows, policyTrace };
}

function getAge(birthDate: string): number {
  const now = new Date();
  const birth = new Date(birthDate);
  let age = now.getFullYear() - birth.getFullYear();
  const monthDiff = now.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birth.getDate())) age -= 1;
  return age;
}
