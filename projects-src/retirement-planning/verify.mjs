import assert from "node:assert/strict";
import { DEFAULT_PROFILE } from "../../static/projects/retirement-planning/constants.js";
import { getCurrentPolicyYear, resolveCpfYear } from "../../static/projects/retirement-planning/policy/cpf-years.js";
import { getCpfConstraints, normalizePlanToConstraints } from "../../static/projects/retirement-planning/policy/cpf-validation.js";
import { estimateMedicalCosts } from "../../static/projects/retirement-planning/models/medical-costs.js";
import { inferFrailty } from "../../static/projects/retirement-planning/models/frailty.js";

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
