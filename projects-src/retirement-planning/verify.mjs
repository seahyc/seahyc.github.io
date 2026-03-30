import assert from "node:assert/strict";
import { DEFAULT_PROFILE } from "../../static/projects/retirement-planning/constants.js";
import { getCurrentPolicyYear, resolveCpfYear } from "../../static/projects/retirement-planning/policy/cpf-years.js";
import { getCpfConstraints, normalizePlanToConstraints } from "../../static/projects/retirement-planning/policy/cpf-validation.js";
import { computeExtraInterest } from "../../static/projects/retirement-planning/policy/cpf-interest.js";
import { estimateMedicalCosts } from "../../static/projects/retirement-planning/models/medical-costs.js";
import { inferFrailty } from "../../static/projects/retirement-planning/models/frailty.js";
import { computeCpfLifeInitial } from "../../static/projects/retirement-planning/models/cpf-life.js";
import { buildCpfLedger } from "../../static/projects/retirement-planning/models/cpf-ledger.js";

const profile = structuredClone(DEFAULT_PROFILE.profile);
const plan = {
  ...structuredClone(DEFAULT_PROFILE.plans[0]),
  id: "verify-plan",
  profileId: "verify-profile",
};

assert.equal(getCurrentPolicyYear(), new Date().getFullYear(), "policy year should default to the current browser/runtime year");

const constraints = getCpfConstraints(profile, plan);
assert.equal(constraints.year, profile.cpfCohortYear, "constraints should resolve against the active cohort/policy year");
assert.ok(constraints.remainingErsRoom >= 0, "ERS room should never be negative");

const normalized = normalizePlanToConstraints(profile, {
  ...plan,
  payoutStartAge: 72,
  oneOffTopup: 9_999_999,
});
assert.equal(normalized.plan.payoutStartAge, 70, "payout age should clamp at CPF maximum");
assert.equal(normalized.plan.oneOffTopup, normalized.constraints.topupCashCap, "cash top-up should clamp to remaining room and available cash");

const policy = resolveCpfYear(profile.cpfCohortYear);
const overflowProfile = { ...profile, ma: policy.bhs + 10_000 };
const overflowConstraints = getCpfConstraints(overflowProfile, plan);
assert.equal(overflowConstraints.maOverflow, 10_000, "MA overflow should be tracked against the active BHS");

const extraInterest = computeExtraInterest({ oa: 50_000, ra: 80_000, ma: 10_000 });
assert.equal(extraInterest.basis.oaEligible, 20_000, "OA should only count up to 20k for extra interest eligibility");
assert.ok(extraInterest.allocations.ra >= extraInterest.allocations.oa, "extra interest should be allocated to RA before OA");

const payoutAt65 = computeCpfLifeInitial(profile, { ...plan, payoutStartAge: 65, cpfPlan: "standard" });
const payoutAt70 = computeCpfLifeInitial(profile, { ...plan, payoutStartAge: 70, cpfPlan: "standard" });
assert.ok(payoutAt70 > payoutAt65, "deferring payout age should increase CPF LIFE payout");

const ledgerOverflow = buildCpfLedger({ ...profile, ma: policy.bhs + 12_000 }, plan, 1);
assert.ok(ledgerOverflow.rows[0].maOverflow >= 12_000, "ledger should preserve and grow MA overflow after interest crediting");
assert.equal(ledgerOverflow.rows[0].maOverflowToOa, ledgerOverflow.rows[0].maOverflow, "for retirement-age profiles, MA overflow should route to OA");
assert.equal(ledgerOverflow.rows[0].maOverflowToSa, 0, "retirement-age MA overflow should not route to SA");

const frailty = inferFrailty(profile);
const baseMedical = estimateMedicalCosts({ age: 68, profile, frailty });
const cancerMedical = estimateMedicalCosts({
  age: 68,
  profile: { ...profile, priorSeriousConditions: ["breast-cancer"] },
  frailty,
});
assert.ok(cancerMedical.gross > baseMedical.gross, "prior breast cancer should increase projected medical burden");
assert.ok(cancerMedical.expectedEmergency > baseMedical.expectedEmergency, "prior breast cancer should raise emergency reserve expectations");

const privateProfile = {
  ...profile,
  insurance: {
    ...profile.insurance,
    carePreference: "private",
    shieldProvider: "Income",
    shieldPlan: "Enhanced IncomeShield Preferred",
    rider: true,
  },
};
const privateMedical = estimateMedicalCosts({ age: 68, profile: privateProfile, frailty });
assert.ok(privateMedical.claimPathTotals.panelPenalty >= 0, "claim-path penalties should be tracked for private claim routes");
assert.ok(privateMedical.insurerPaid > 0, "insurer-aware adjudication should produce non-zero covered amounts");

console.log("retirement-planning verification passed");
