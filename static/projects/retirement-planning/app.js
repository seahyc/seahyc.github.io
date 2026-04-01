import { AI_MODES, APPENDIX_PRESETS, QUICK_ACTIONS } from "./constants.js";
import { loadState, saveState, wipeState } from "./storage.js";
import { createProfile, duplicateProfile, deleteProfile } from "./profile-manager.js";
import { createPlan, duplicatePlan, deletePlan } from "./plan-manager.js";
import { getActiveProfile, getActivePlan, getPlansForProfile } from "./state.js";
import { validatePlan, getCpfConstraints, normalizePlanToConstraints } from "./policy/cpf-validation.js";
import { getInsuranceCatalogSelection, getRiderOptions, resolveInsurancePlan } from "./policy/medical-schemes.js";
import { runPlan } from "./models/cashflow.js";
import { buildSensitivityDiagnostics, computeRecommendations } from "./models/optimizer.js";
import { buildExpertReview, buildPlanDiffSummary, summarizePanel } from "./models/recommendations.js";
import { buildAppendixRows } from "./models/appendix-ledger.js";
import { renderChart } from "./ui/charts.js";
import { buildAudienceBrief, buildDiffPrompt, buildHandoffPrompt, buildStructuredPayload, detectAiCapabilities, openHandoff } from "./ai/provider.js";
import { UNIFIED_INSURANCE_DB } from "./data/insurance-db.js";
import { listSupportedDiseases } from "./data/disease-db.js";
const currency = new Intl.NumberFormat("en-SG", { style: "currency", currency: "SGD", maximumFractionDigits: 0 });
const percent = new Intl.NumberFormat("en-SG", { style: "percent", maximumFractionDigits: 0 });
const SUPPORTED_DISEASES = listSupportedDiseases();
const ALCOHOL_OPTIONS = [["none", "None"], ["light", "Light"], ["moderate", "Moderate"], ["heavy", "Heavy"]];
const COGNITION_OPTIONS = [["normal", "Normal"], ["mild-issues", "Mild issues"], ["impaired", "Impaired"]];
const MOBILITY_OPTIONS = [["independent", "Independent"], ["some-help", "Some help"], ["limited", "Limited"]];
const FAMILY_LONGEVITY_OPTIONS = [["short-lived", "Short-lived"], ["average", "Average"], ["long-lived", "Long-lived"]];
const LTC_COVER_OPTIONS = [["none", "None"], ["careshield", "CareShield base"], ["supplement", "CareShield supplement"], ["other", "Other / legacy"]];
const FIELD_HELP = {
    oa: "OA (Ordinary Account) is the CPF bucket for housing and approved investments. Check My CPF > Account balances.",
    sa: "SA (Special Account) usually earns higher interest and may be mostly transferred into RA after age 55. Check My CPF > Account balances.",
    ra: "RA (Retirement Account) is created at age 55 to fund CPF LIFE. Check My CPF > Account balances.",
    ma: "MA (MediSave Account) is your CPF medical savings bucket. Check My CPF > Account balances.",
    policyYear: "Leave this as 2026 unless your planner tells you to model a different CPF policy year.",
    observedCpfPayout: "Enter your actual CPF LIFE monthly payout if you already have it. Find it in My CPF > CPF LIFE > Payout details.",
    chronicConditions: "Search by everyday language. Examples: knee pain, sugar, memory, stroke, heart attack.",
    priorSeriousConditions: "Include previous major illnesses or events such as stroke, heart attack, cancer, or surgery-related long-term issues.",
    remainingErsRoom: "ERS is the Enhanced Retirement Sum, the maximum RA target used to maximize CPF LIFE payouts in the selected policy year.",
    bhs: "BHS is the Basic Healthcare Sum, the maximum amount allowed in MediSave before overflow rules apply.",
    frs: "FRS is the Full Retirement Sum, the standard CPF retirement target for the selected policy year.",
};
const CONDITION_SYNONYMS = {
    "osteoarthritis": ["knee", "knee pain", "joint pain", "arthritis"],
    "dementia": ["memory", "memory loss", "forgetful", "confusion"],
    "coronary-artery-disease": ["heart attack", "heart disease", "blocked artery", "chest pain"],
    "stroke": ["stroke", "mini stroke", "weakness", "slurred speech"],
    "diabetes": ["sugar", "high sugar", "blood sugar"],
};
const NUMERIC_FIELD_PATHS = new Set([
    "profile.bankCash",
    "profile.oa",
    "profile.sa",
    "profile.ra",
    "profile.ma",
    "profile.cpfCohortYear",
    "profile.observedCpfPayout",
    "profile.basicSpendMonthly",
    "profile.discretionarySpendAnnual",
    "profile.marketIncomeAnnual",
    "profile.cpfInvestments",
    "plan.payoutStartAge",
    "plan.oneOffTopup",
    "plan.recurringTopupAnnual",
    "plan.monthlySupport",
    "plan.equityAllocationPct",
    "plan.fixedIncomeAllocationPct",
]);
const APPENDIX_COLUMN_LABELS = {
    age: "Age",
    yearOffset: "Years from now",
    mortalityState: "Mortality state",
    survival: "Survival %",
    grossIncomeAnnual: "Income / year",
    basicSpendAnnual: "Basic spend / year",
    discretionaryAnnual: "Discretionary spend / year",
    medicalGross: "Medical gross / year",
    insurerPaid: "Insurer paid / year",
    medisavePaid: "MediSave paid / year",
    medicalCash: "Cash medical / year",
    emergencyExpected: "Expected reserve",
    emergencyBalanced: "Balanced reserve",
    liquidityCoverageMonths: "Liquidity months",
    emergencyCoverageRatio: "Reserve coverage ratio",
    medicalShareOfSpend: "Medical share of spend",
    cpfShareOfIncome: "CPF share of income",
    netAnnual: "Net / year",
    oa: "OA",
    sa: "SA",
    ra: "RA",
    ma: "MA",
    bank: "Bank / cash",
    familyTopup: "Family top-up",
    ownTopup: "Own top-up",
    extraInterestTotal: "Extra CPF interest",
    ers: "ERS",
    frs: "FRS",
    bhs: "BHS",
    cumulativePayouts: "Cumulative CPF payouts",
    premiumEquivalent: "Premium equivalent",
    taxSavingsAnnual: "Tax savings / year",
    estateEquivalent: "Estate equivalent",
    estateMinusEmergency: "Estate after reserve",
    liquidAssets: "Liquid assets",
    cpfPayoutAnnual: "CPF payout / year",
    supportAnnual: "Support / year",
    emergencyConservative: "Conservative reserve",
};
let state = null;
let aiCaps = { browser: false, api: true, chatgpt: true, claude: true };
let activeToast = null;
let toastTimer = null;
let highlightedFieldPaths = new Set();
let highlightTimer = null;
let inlineQuestionState = { question: "", answer: "", loading: false, error: null };
let apiConfig = { endpoint: "https://api.openai.com/v1/responses", model: "gpt-4.1-mini", apiKey: "" };
const app = document.getElementById("retirement-planning-app");
boot();
function requireState() {
    if (!state) {
        throw new Error("Retirement planning state not loaded.");
    }
    return state;
}
async function boot() {
    state = await loadState();
    sanitizeLoadedState(state);
    aiCaps = await detectAiCapabilities();
    apiConfig = loadApiConfig();
    render();
}
function render() {
    if (!state) {
        app.innerHTML = `<div class="rp-card"><div class="rp-card-body">Loading local planner data…</div></div>`;
        return;
    }
    ensureAppChrome();
    const currentState = requireState();
    const profileRecord = getActiveProfile(currentState);
    syncActivePlanConstraints(currentState);
    const syncedProfileRecord = getActiveProfile(currentState);
    const syncedActivePlan = getActivePlan(currentState);
    const profile = syncedProfileRecord.profile;
    const validation = validatePlan(profile, syncedActivePlan);
    const plansForProfile = getPlansForProfile(currentState, syncedProfileRecord.id);
    const planResults = plansForProfile.map((plan) => {
        const normalized = normalizePlanToConstraints(profile, plan);
        Object.assign(profile, normalized.profile);
        Object.assign(plan, normalized.plan);
        const result = runPlan(profile, plan);
        const recommendations = computeRecommendations(profile, plan, result);
        return {
            plan,
            result,
            recommendations,
            panel: summarizePanel(profileRecord, plan, result, recommendations),
            appendix: buildAppendixRows(result),
        };
    });
    const activeBundle = planResults.find((item) => item.plan.id === syncedActivePlan.id) || planResults[0];
    if (!activeBundle) {
        app.innerHTML = `<div class="rp-card"><div class="rp-card-body">No plans found for this profile.</div></div>`;
        return;
    }
    const comparisonBundle = planResults.find((item) => item.plan.id !== activeBundle.plan.id) || null;
    const insuranceCatalog = getInsuranceCatalogSummary(profile);
    const sensitivities = buildSensitivityDiagnostics(profile, activeBundle.plan, activeBundle.result);
    const expertReview = buildExpertReview(syncedProfileRecord, activeBundle.plan, activeBundle.result, activeBundle.recommendations, sensitivities, insuranceCatalog);
    const diffSummary = buildPlanDiffSummary(activeBundle, comparisonBundle);
    const topRecommendation = activeBundle.recommendations[0] ?? null;
    const appRoot = app.querySelector("#rp-app-root");
    if (!appRoot) {
        throw new Error("Retirement planner app root not found.");
    }
    appRoot.innerHTML = `
    <div class="rp-app">
      ${renderBanner(syncedProfileRecord, syncedActivePlan)}
      ${renderStickyMiniBar(syncedProfileRecord, syncedActivePlan, activeBundle)}

      <section class="rp-page-section rp-page-section-inputs">
        <div class="rp-page-section-header">
          <div class="rp-page-section-kicker">Inputs</div>
          <div class="rp-page-section-note">Baseline profile, insurance coverage, plan settings, and quick controls.</div>
        </div>
      </section>

      <section class="rp-manage-inline">
        ${renderStartHereGuide()}
        <details class="rp-inspector-details">
          <summary>
            <span>Manage profiles and plans</span>
            <span class="rp-manage-summary">${escapeHtml(getPersonLabel(syncedProfileRecord.name))} · ${escapeHtml(syncedActivePlan.name)} · ${plansForProfile.length} plan${plansForProfile.length === 1 ? "" : "s"}</span>
          </summary>
          <div class="rp-flex rp-manage-actions">
            <button class="rp-btn accent" data-action="new-profile">New profile</button>
            <button class="rp-btn soft" data-action="duplicate-profile">Duplicate profile</button>
            <button class="rp-btn soft" data-action="new-plan">New plan</button>
            <button class="rp-btn soft" data-action="duplicate-plan">Duplicate plan</button>
          </div>
          <div class="rp-manage-grid">
            <div class="rp-profile-list">${renderProfiles(syncedProfileRecord.id)}</div>
            <div class="rp-plan-list">${renderPlans(plansForProfile, syncedActivePlan.id)}</div>
          </div>
        </details>
      </section>

      <section class="rp-panel-grid rp-setup-grid">
        <div class="rp-card">
          <div class="rp-card-header">
            <div>
              <div class="rp-card-title">Profile baseline</div>
            </div>
          </div>
          <div class="rp-card-body">
            ${renderProfileForm(syncedProfileRecord, syncedActivePlan, validation.constraints)}
          </div>
        </div>
        <div class="rp-section-stack">
          <div class="rp-card">
            <div class="rp-card-header">
              <div>
                <div class="rp-card-title">Plan settings</div>
              </div>
            </div>
            <div class="rp-card-body">
              ${renderPlanForm(syncedActivePlan, profile, validation)}
            </div>
          </div>
          <section class="rp-controls-inline">
            <details class="rp-inspector-details" open>
              <summary>
                <span>Constraints and quick controls</span>
                <span class="rp-manage-summary">Policy status and shortcuts</span>
              </summary>
              <div class="rp-stack">
                <details class="rp-inspector-details">
                  <summary>Policy status</summary>
              ${renderPolicyStatus(activeBundle.result.constraints)}
                </details>
                <details class="rp-inspector-details" open>
                  <summary>Quick controls</summary>
                  ${renderConvenience()}
                </details>
              </div>
            </details>
          </section>
        </div>
      </section>

      <section class="rp-card rp-topline-stack" id="rp-outputs">
        <div class="rp-page-section-header rp-page-section-inline">
          <div class="rp-page-section-kicker">Outputs</div>
          <div class="rp-page-section-note">Decision metrics, charts, recommendations, and concrete consequences.</div>
        </div>
        <div class="rp-card-body">
          ${renderPlainEnglishSummary(syncedProfileRecord, syncedActivePlan, activeBundle)}
          ${renderIncomeGapAlert(activeBundle, topRecommendation)}
          ${renderInsuranceReviewAlert(syncedProfileRecord, activeBundle)}
          <div class="rp-summary-grid">
            ${renderSummary(activeBundle)}
          </div>
          ${renderAiQuickActions(syncedProfileRecord, syncedActivePlan, activeBundle)}
        </div>
      </section>

      <section class="rp-chart-grid">
        ${renderChartCards(activeBundle)}
      </section>

      <section class="rp-panel-grid">
        <div class="rp-card">
          <div class="rp-card-header">
            <div>
              <div class="rp-card-title">Recommended next moves</div>
            </div>
          </div>
          <div class="rp-card-body">
            <div class="rp-action-list">${renderActions(activeBundle.recommendations)}</div>
          </div>
        </div>
        <div class="rp-card">
          <div class="rp-card-header">
            <div>
              <div class="rp-card-title">Medical, buffers, and lifestyle</div>
            </div>
          </div>
          <div class="rp-card-body">
            ${renderMedicalLifestyle(activeBundle)}
          </div>
        </div>
      </section>

      <section class="rp-page-section rp-page-section-appendix">
        <div class="rp-page-section-header rp-page-section-inline">
          <div class="rp-page-section-kicker">Appendix</div>
          <div class="rp-page-section-note">Full ledger, audit trail, source trace, and AI workspace.</div>
        </div>
        <details class="rp-inspector-details rp-appendix-shell">
          <summary>
            <span>Appendix, expert inspector, and AI</span>
            <span class="rp-manage-summary">Open the ledger, audit trace, exports, and assistant tools</span>
          </summary>
          <div class="rp-card rp-appendix-card">
            <div class="rp-card-header">
              <div>
                <div class="rp-card-title">Appendix 损益表</div>
              </div>
              <div class="rp-appendix-toolbar">
                <div class="rp-tabs">
                  ${APPENDIX_PRESETS.map((preset) => `<button class="rp-tab ${currentState.ui.appendixPreset === preset.id ? "active" : ""}" data-appendix="${preset.id}">${preset.label}</button>`).join("")}
                </div>
                <div class="rp-flex">
                  <button class="rp-btn soft" data-action="export-json">Export JSON</button>
                  <button class="rp-btn soft" data-action="wipe-all">Wipe local data</button>
                </div>
              </div>
            </div>
            <div class="rp-card-body">
              ${renderAppendix(activeBundle.appendix, currentState.ui.appendixPreset)}
            </div>
          </div>
          <section class="rp-inspector-grid rp-appendix-audit-grid">
            ${renderExpertInspector(expertReview, sensitivities, diffSummary, comparisonBundle, insuranceCatalog)}
            <div class="rp-card">
              <div class="rp-card-header">
                <div>
                  <div class="rp-card-title">AI workflow</div>
                </div>
              </div>
              <div class="rp-card-body">
                ${renderAiPanel(syncedProfileRecord, syncedActivePlan, activeBundle, comparisonBundle)}
              </div>
            </div>
          </section>
        </details>
      </section>
    </div>
  `;
    bindActions(planResults, activeBundle, comparisonBundle);
    paintCharts(activeBundle);
    paintTransientUi();
    renderToastIntoRoot();
    enhanceDetailsAffordance();
}
function renderBanner(profileRecord, plan) {
    const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const personLabel = getPersonLabel(profileRecord.name);
    return `
    <section class="rp-status-strip" aria-label="Planner status">
      <div class="rp-status-line">
        <strong>${escapeHtml(personLabel)} / ${escapeHtml(plan.name)}</strong>
        <span>Local only: saved in this browser. Export JSON if you want a backup.</span>
        <span>Autosaved ${now}</span>
      </div>
    </section>
  `;
}
function renderStickyMiniBar(profileRecord, plan, bundle) {
    const first = bundle.result.rows[0];
    const monthlyGap = Math.round(((first?.grossIncomeAnnual || 0) - (first?.basicSpendAnnual || 0)) / 12);
    const topAction = bundle.recommendations[0]?.title || "Review recommendations";
    const personLabel = getPersonLabel(profileRecord.name);
    return `
    <section class="rp-mini-bar rp-sticky-bar" aria-label="Current plan summary">
      <div class="rp-mini-pill subdued">${escapeHtml(personLabel)} · ${escapeHtml(plan.name)}</div>
      <div class="rp-mini-pill ${monthlyGap < 0 ? "warning" : "success"}">Income gap: ${currency.format(monthlyGap)}/m</div>
      <div class="rp-mini-pill subdued">Top action: ${escapeHtml(topAction)}</div>
      <a class="rp-btn soft" href="#rp-outputs">Jump to results</a>
    </section>
  `;
}
function renderToast() {
    if (!activeToast)
        return "";
    return `<div class="rp-toast rp-toast-${activeToast.kind}" role="status" aria-live="polite">${escapeHtml(activeToast.message)}</div>`;
}
function ensureAppChrome() {
    if (app.querySelector("#rp-app-root") && app.querySelector("#rp-toast-root"))
        return;
    app.innerHTML = `
    <div id="rp-toast-root" aria-live="polite" aria-atomic="true"></div>
    <div id="rp-app-root"></div>
  `;
}
function renderToastIntoRoot() {
    const toastRoot = app.querySelector("#rp-toast-root");
    if (!toastRoot)
        return;
    toastRoot.innerHTML = renderToast();
}
function enhanceDetailsAffordance() {
    app.querySelectorAll("details summary").forEach((summary) => {
        if (summary.querySelector(".rp-chevron"))
            return;
        const chevron = document.createElement("span");
        chevron.className = "rp-chevron";
        chevron.setAttribute("aria-hidden", "true");
        chevron.textContent = "▾";
        summary.appendChild(chevron);
    });
}
function renderProfiles(activeProfileId) {
    return requireState().profiles.map((profile) => `
    <div class="rp-profile-row">
      <div class="rp-action-top rp-compact-top">
        <div class="rp-compact-copy">
          <strong>${escapeHtml(getPersonLabel(profile.name))}</strong>
          <div class="rp-card-subtitle">${profile.profile.sex} · ${profile.profile.birthDate}</div>
        </div>
        <div class="rp-flex">
          <button class="rp-btn ${profile.id === activeProfileId ? "primary" : "soft"}" data-profile-switch="${profile.id}">${profile.id === activeProfileId ? "Active" : "Open"}</button>
          <button class="rp-btn danger" data-profile-delete="${profile.id}">Delete</button>
        </div>
      </div>
    </div>
  `).join("");
}
function renderStartHereGuide() {
    return `
    <details class="rp-start-guide rp-onboarding">
      <summary>
        <span>Start here</span>
        <span class="rp-manage-summary">CPF balances, core details, then results</span>
      </summary>
      <div class="rp-start-guide-grid">
        <div class="rp-start-guide-step">
          <span>1</span>
          <div><strong>CPF balances</strong><small>cpf.gov.sg → My CPF → Account balances</small></div>
        </div>
        <div class="rp-start-guide-step">
          <span>2</span>
          <div><strong>Core details</strong><small>Bank savings, spending, insurance, and health conditions</small></div>
        </div>
        <div class="rp-start-guide-step">
          <span>3</span>
          <div><strong>Jump to results</strong><small>See your shortfall, top actions, and AI-ready summary</small></div>
        </div>
      </div>
    </details>
  `;
}
function renderPlans(plans, activePlanId) {
    return plans.map((plan) => `
    <div class="rp-plan-row">
      <div class="rp-action-top rp-compact-top">
        <div class="rp-compact-copy">
          <strong>${plan.name}</strong>
          <div class="rp-card-subtitle">${plan.cpfPlan} · age ${plan.payoutStartAge} · ${plan.objective}</div>
        </div>
        <div class="rp-flex">
          <button class="rp-btn ${plan.id === activePlanId ? "primary" : "soft"}" data-plan-switch="${plan.id}">${plan.id === activePlanId ? "Active" : "Open"}</button>
          <button class="rp-btn danger" data-plan-delete="${plan.id}">Delete</button>
        </div>
      </div>
    </div>
  `).join("");
}
function renderExpertInspector(expertReview, sensitivities, diffSummary, comparisonBundle, insuranceCatalog) {
    return `
    <div class="rp-card">
      <div class="rp-card-header">
        <div>
          <div class="rp-card-title">Expert inspector</div>
        </div>
      </div>
      <div class="rp-card-body rp-stack rp-expert-body">
        <details class="rp-inspector-details">
          <summary>Assumptions and findings</summary>
          <div class="rp-insights-list rp-expert-list">
            ${expertReview.assumptions.map((item) => `<div class="rp-insight rp-expert-insight"><strong>Assumption</strong><div>${escapeHtml(item)}</div></div>`).join("")}
            ${expertReview.findings.map((item) => `<div class="rp-insight rp-expert-insight"><strong>Finding</strong><div>${escapeHtml(item)}</div></div>`).join("")}
          </div>
        </details>
        <details class="rp-inspector-details">
          <summary>Insurance catalog</summary>
          <div class="rp-insurance-meta-grid">
            <div class="rp-mini-list">
              <div class="rp-mini-item"><span>Provider</span><strong>${escapeHtml(insuranceCatalog.providerLabel)}</strong></div>
              <div class="rp-mini-item"><span>Plan</span><strong>${escapeHtml(insuranceCatalog.planLabel)}</strong></div>
              <div class="rp-mini-item"><span>Rider</span><strong>${escapeHtml(insuranceCatalog.riderLabel)}</strong></div>
              <div class="rp-mini-item"><span>Plan SKU</span><strong>${escapeHtml(insuranceCatalog.planSku)}</strong></div>
              <div class="rp-mini-item"><span>Rider SKU</span><strong>${escapeHtml(insuranceCatalog.riderSku)}</strong></div>
              <div class="rp-mini-item"><span>Plan effective</span><strong>${escapeHtml(insuranceCatalog.planEffectiveFrom)}</strong></div>
              <div class="rp-mini-item"><span>Rider effective</span><strong>${escapeHtml(insuranceCatalog.riderEffectiveFrom)}</strong></div>
              <div class="rp-mini-item"><span>Catalog version</span><strong>${escapeHtml(insuranceCatalog.generatedAt)}</strong></div>
              <div class="rp-mini-item"><span>Source</span><strong>${escapeHtml(insuranceCatalog.sourceLabel)}</strong></div>
              <div class="rp-mini-item"><span>Provider plans in catalog</span><strong>${insuranceCatalog.planCount}</strong></div>
            </div>
            <div class="rp-mini-list">
              <div class="rp-mini-item"><span>Target coverage</span><strong>${escapeHtml(insuranceCatalog.targetCoverage)}</strong></div>
              <div class="rp-mini-item"><span>Panel strength</span><strong>${escapeHtml(insuranceCatalog.panelStrength)}</strong></div>
              <div class="rp-mini-item"><span>Pre-auth rule</span><strong>${escapeHtml(insuranceCatalog.preAuthSummary)}</strong></div>
              <div class="rp-mini-item"><span>Benefit classes modeled</span><strong>${insuranceCatalog.benefitClassCount}</strong></div>
              <div class="rp-mini-item"><span>Source links in catalog</span><strong>${insuranceCatalog.sourceCount}</strong></div>
              <div class="rp-mini-item"><span>Plan source refs</span><strong>${escapeHtml(insuranceCatalog.planSourceRefs.join(", ") || "n/a")}</strong></div>
              <div class="rp-mini-item"><span>Rider source refs</span><strong>${escapeHtml(insuranceCatalog.riderSourceRefs.join(", ") || "n/a")}</strong></div>
              <div class="rp-mini-item"><span>Compatibility tags</span><strong>${escapeHtml(insuranceCatalog.compatibilityTags.join(", ") || "n/a")}</strong></div>
              <div class="rp-mini-item"><span>Source URL</span><strong class="rp-mini-link">${escapeHtml(insuranceCatalog.sourceUrl)}</strong></div>
            </div>
          </div>
        </details>
        <details class="rp-inspector-details">
          <summary>Top sensitivities</summary>
          <div class="rp-diff-list">
            ${sensitivities.slice(0, 6).map((item) => `
              <div class="rp-insight">
                <strong>${escapeHtml(item.label)} <span class="rp-chip">${escapeHtml(item.signal)}</span></strong>
                <div>${escapeHtml(item.why)}</div>
                <div class="rp-card-subtitle">Impact: ${formatInspectorDelta(item.impact, item.unit)}</div>
              </div>
            `).join("")}
          </div>
        </details>
        <details class="rp-inspector-details">
          <summary>Plan diff ${comparisonBundle ? `vs ${escapeHtml(comparisonBundle.plan.name)}` : "(add another plan to compare)"}</summary>
          <div class="rp-diff-list">
            ${comparisonBundle
        ? diffSummary.map((item) => `
                  <div class="rp-mini-item">
                    <span>${escapeHtml(item.label)}</span>
                    <strong>${formatInspectorDelta(item.delta, item.unit)}</strong>
                  </div>
                `).join("")
        : `<div class="rp-help">Create or duplicate another plan for this profile to see direct metric deltas here.</div>`}
          </div>
        </details>
        <details class="rp-inspector-details">
          <summary>Rationale notes</summary>
          <div class="rp-insights-list">${expertReview.rationale.map((item) => `<div class="rp-insight">${escapeHtml(item)}</div>`).join("")}</div>
        </details>
      </div>
    </div>
  `;
}
function renderAiPanel(profileRecord, plan, bundle, comparisonBundle) {
    const prompt = buildHandoffPrompt(profileRecord, plan, bundle.result);
    const actuaryBrief = buildAudienceBrief("actuary", profileRecord, plan, bundle.result);
    const doctorBrief = buildAudienceBrief("doctor", profileRecord, plan, bundle.result);
    const plannerBrief = buildAudienceBrief("planner", profileRecord, plan, bundle.result);
    const familyBrief = buildAudienceBrief("family", profileRecord, plan, bundle.result);
    const insuranceBrief = buildAudienceBrief("insurance", profileRecord, plan, bundle.result);
    const payload = buildStructuredPayload(profileRecord, plan, bundle.result);
    const diffPrompt = comparisonBundle ? buildDiffPrompt(profileRecord, plan, bundle.result, comparisonBundle.plan, comparisonBundle.result) : "";
    return `
    <div class="rp-field">
      <label>AI mode</label>
      <select class="rp-select" data-field="ui.aiMode">
        ${AI_MODES.map((mode) => `<option value="${mode.id}" ${requireState().ui.aiMode === mode.id ? "selected" : ""}>${mode.label}</option>`).join("")}
      </select>
      <div class="rp-help">
        Browser AI available: ${aiCaps.browser ? "Yes" : "No"}.
        ${aiCaps.browser ? "You can ask directly in this page when Local Browser AI is selected." : "To enable Local Browser AI in supported Chromium builds, turn on on-device model support in browser flags or use Claude/ChatGPT handoff."}
      </div>
    </div>
    ${requireState().ui.aiMode === "api" ? renderApiConfigPanel() : ""}
    <div class="rp-field">
      <label>Ask about this plan</label>
      <textarea class="rp-textarea" rows="4" data-inline-ai-question placeholder="Example: What do I need to do in the next 6 months to close the income gap?">${escapeHtml(inlineQuestionState.question)}</textarea>
      <div class="rp-flex">
        <button class="rp-btn accent" data-inline-ai-run="true">${inlineQuestionState.loading ? "Thinking…" : "Ask AI about my plan"}</button>
        <button class="rp-btn soft" data-inline-ai-suggest="retiree">Explain this for the retiree</button>
        <button class="rp-btn soft" data-inline-ai-suggest="family">What should the family do next?</button>
      </div>
      ${renderInlineAiResponse()}
    </div>
    <div class="rp-flex">
      <button class="rp-btn soft" data-ai-open="chatgpt">Open your plan in ChatGPT</button>
      <button class="rp-btn soft" data-ai-open="claude">Open your plan in Claude</button>
      <button class="rp-btn soft" data-copy-prompt="true">Copy expert prompt</button>
      <button class="rp-btn soft" data-copy-brief="actuary">Copy actuary brief</button>
      <button class="rp-btn soft" data-copy-brief="doctor">Copy doctor brief</button>
      <button class="rp-btn soft" data-copy-brief="planner">Copy planner brief</button>
      <button class="rp-btn soft" data-copy-brief="insurance">Copy insurance brief</button>
      <button class="rp-btn soft" data-copy-brief="family">Copy family brief</button>
      <button class="rp-btn soft" data-copy-payload="true">Copy structured JSON</button>
      ${comparisonBundle ? `<button class="rp-btn soft" data-copy-diff="true">Copy plan diff brief</button>` : ""}
    </div>
    <details class="rp-inspector-details">
      <summary>Expert prompt preview</summary>
      <div class="rp-codebox">${escapeHtml(prompt)}</div>
    </details>
    <details class="rp-inspector-details">
      <summary>Actuary brief preview</summary>
      <div class="rp-codebox">${escapeHtml(actuaryBrief)}</div>
    </details>
    <details class="rp-inspector-details">
      <summary>Doctor brief preview</summary>
      <div class="rp-codebox">${escapeHtml(doctorBrief)}</div>
    </details>
    <details class="rp-inspector-details">
      <summary>Planner brief preview</summary>
      <div class="rp-codebox">${escapeHtml(plannerBrief)}</div>
    </details>
    <details class="rp-inspector-details">
      <summary>Insurance brief preview</summary>
      <div class="rp-codebox">${escapeHtml(insuranceBrief)}</div>
    </details>
    <details class="rp-inspector-details">
      <summary>Family brief preview</summary>
      <div class="rp-codebox">${escapeHtml(familyBrief)}</div>
    </details>
    <details class="rp-inspector-details">
      <summary>Structured payload preview</summary>
      <div class="rp-codebox">${escapeHtml(payload)}</div>
    </details>
    ${comparisonBundle ? `
      <details class="rp-inspector-details">
        <summary>Plan diff prompt preview</summary>
        <div class="rp-codebox">${escapeHtml(diffPrompt)}</div>
      </details>
    ` : ""}
  `;
}
function renderInlineAiResponse() {
    if (inlineQuestionState.loading) {
        return `<div class="rp-help">Generating an answer for this plan…</div>`;
    }
    if (inlineQuestionState.error) {
        return `<div class="rp-alert rp-alert-warning">${escapeHtml(inlineQuestionState.error)}</div>`;
    }
    if (!inlineQuestionState.answer)
        return "";
    return `<div class="rp-codebox rp-inline-ai-answer">${escapeHtml(inlineQuestionState.answer)}</div>`;
}
function renderApiConfigPanel() {
    return `
    <div class="rp-form-grid three rp-api-config-grid">
      ${field("API endpoint", `<input class="rp-input" data-api-config="endpoint" value="${escapeAttr(apiConfig.endpoint)}">`, "OpenAI-compatible Responses API endpoint.")}
      ${field("Model", `<input class="rp-input" data-api-config="model" value="${escapeAttr(apiConfig.model)}">`, "Model name sent to the API endpoint.")}
      ${field("API key", `<input class="rp-input" type="password" data-api-config="apiKey" value="${escapeAttr(apiConfig.apiKey)}" autocomplete="off">`, "Stored in this browser only.")}
    </div>
  `;
}
function renderConvenience() {
    const blocks = Object.entries(QUICK_ACTIONS).map(([key, items]) => `
    <div class="rp-field">
      <label>${key}</label>
      <div class="rp-flex">${items.map((item) => `<button class="rp-btn soft" data-convenience="${item.id}">${item.label}</button>`).join("")}</div>
    </div>
  `);
    return `<div class="rp-section-stack">${blocks.join("")}</div>`;
}
function renderSummary(bundle) {
    const first = bundle.result.rows[0] ?? bundle.result.rows.at(-1);
    if (!first)
        return "";
    const cards = [
        ["CPF LIFE start", `${currency.format(bundle.result.cpfInitialPayout)}/m`, `${bundle.plan.cpfPlan} plan, calibrated to observed payout if one is recorded.`, "neutral"],
        ["Median death age", bundle.result.medianAge.toFixed(1), `Modal ${bundle.result.modalAge.toFixed(1)} · p90 ${bundle.result.p90Age.toFixed(1)}`, "neutral"],
        ["Balanced buffer", currency.format(first.emergencyBalanced), `Recommended reserve based on basic spend and age-adjusted medical risk.`, "positive"],
        ["Medical cash / yr", currency.format(first.medicalCash), `Estimated out-of-pocket after insurer and MediSave contributions.`, "warning"],
        ["Family tax saved / yr", currency.format(first.taxSavingsAnnual), `Estimated from modeled family top-ups and marginal tax rates.`, "positive"],
        ["Estate at median", currency.format(lookupByAge(bundle.result.rows, bundle.result.medianAge)?.estateEquivalent || 0), `Estate-equivalent balance near median life expectancy.`, "positive"],
    ];
    return cards.map(([title, value, note, tone]) => `
    <div class="rp-summary-card ${tone ? `rp-summary-card-${tone}` : ""}">
      <h3>${title}</h3>
      <strong>${value}</strong>
      <p>${note}</p>
    </div>
  `).join("");
}
function renderPlainEnglishSummary(profileRecord, plan, bundle) {
    const first = bundle.result.rows[0];
    if (!first)
        return "";
    const personLabel = "You";
    const verb = "are";
    const monthlyIncome = Math.round(first.grossIncomeAnnual / 12);
    const monthlyBasicSpend = Math.round(first.basicSpendAnnual / 12);
    const monthlyGap = monthlyIncome - monthlyBasicSpend;
    const actions = bundle.recommendations.slice(0, 3).map((item, index) => `${index + 1}. ${item.title}`).join(" ");
    const healthContext = profileRecord.profile.chronicConditions.length
        ? `Health planning matters because of ${profileRecord.profile.chronicConditions.join(", ")}.`
        : "Health planning still matters even without major recorded chronic conditions.";
    return `
    <div class="rp-alert rp-alert-info rp-plain-english-card">
      <strong>Your plan in plain English</strong>
      <div>
        ${monthlyGap < 0
        ? `${escapeHtml(personLabel)} ${verb} currently short by about ${currency.format(Math.abs(monthlyGap))}/month against basic spending.`
        : `${escapeHtml(personLabel)} ${verb} currently ahead of basic spending by about ${currency.format(monthlyGap)}/month.`}
        The current ${escapeHtml(plan.cpfPlan)} CPF LIFE setup starts around ${currency.format(bundle.result.cpfInitialPayout)}/month.
        ${healthContext}
      </div>
      <div><strong>Top 3 actions:</strong> ${escapeHtml(actions)}</div>
    </div>
  `;
}
function renderInsuranceReviewAlert(profileRecord, bundle) {
    const profile = profileRecord.profile;
    const first = bundle.result.rows[0];
    if (!first)
        return "";
    const usingPublicBaseline = !profile.insurance.shieldProvider || profile.insurance.shieldProvider === "public" || !profile.insurance.shieldPlan;
    const age = getAgeFromBirthDate(profile.birthDate);
    if (!usingPublicBaseline || age < 55)
        return "";
    const conditions = profile.chronicConditions.length
        ? profile.chronicConditions.join(", ")
        : "your current health profile";
    return `
    <div class="rp-alert rp-alert-warning rp-insurance-review-card">
      <strong>Insurance review is urgent</strong>
      <div>At age ${age}, with ${escapeHtml(conditions)} and only public-baseline hospital coverage selected, a future hospitalisation could still leave meaningful cash bills. The current model estimates about ${currency.format(first.medicalCash)}/year out of pocket before any major shock.</div>
      <div><strong>What to do Monday morning:</strong> Ask an insurance adviser or provider what Integrated Shield coverage is still available, what exclusions apply, and what the annual premium would be before your next birthday.</div>
    </div>
  `;
}
function renderIncomeGapAlert(bundle, topRecommendation) {
    const first = bundle.result.rows[0];
    if (!first)
        return "";
    const monthlyIncome = Math.round(first.grossIncomeAnnual / 12);
    const monthlyBasicSpend = Math.round(first.basicSpendAnnual / 12);
    const monthlyGap = monthlyIncome - monthlyBasicSpend;
    if (first.netAnnual >= 0 && monthlyGap >= 0)
        return "";
    return `
    <div class="rp-alert rp-alert-warning">
      <strong>Income gap detected</strong>
      <div>Your monthly income (${currency.format(monthlyIncome)}/m) does not cover basic needs (${currency.format(monthlyBasicSpend)}/m). Shortfall: ${currency.format(Math.abs(monthlyGap))}/m.</div>
      ${topRecommendation ? `<div>Top action: ${escapeHtml(topRecommendation.title)}</div>` : ""}
    </div>
  `;
}
function renderAiQuickActions(profileRecord, plan, bundle) {
    const familyPrompt = buildAudienceBrief("family", profileRecord, plan, bundle.result);
    return `
    <div class="rp-ai-cta-strip">
      <div class="rp-ai-cta-copy">
        <strong>Open your plan in AI</strong>
        <div class="rp-card-subtitle">Your current plan state will be preloaded so you can ask a real question immediately.</div>
      </div>
      <div class="rp-flex">
        <button class="rp-btn accent" data-ai-open="claude">Open your plan in Claude</button>
        <button class="rp-btn soft" data-ai-open="chatgpt">Open your plan in ChatGPT</button>
        <button class="rp-btn soft" data-copy-text="${escapeAttr(familyPrompt)}">Copy family brief</button>
      </div>
    </div>
  `;
}
function renderProfileForm(profileRecord, plan, constraints) {
    void plan;
    const p = profileRecord.profile;
    const insurerMap = UNIFIED_INSURANCE_DB.insurers;
    const providerOptions = [["public", "Public baseline"], ...Object.keys(insurerMap).map((provider) => [provider, provider])];
    const selectedProvider = (selectedProviderValue => providerOptions.some(([value]) => value === selectedProviderValue) ? selectedProviderValue : (providerOptions[0]?.[0] ?? ""))(p.insurance.shieldProvider);
    const planOptions = Object.keys(insurerMap[selectedProvider]?.plans ?? {}).map((label) => [label, label]);
    const defaultPlanForProvider = selectedProvider === "public" ? "medishield" : (planOptions[0]?.[0] ?? "");
    const selectedPlan = selectedProvider === "public"
        ? "medishield"
        : (planOptions.some(([value]) => value === p.insurance.shieldPlan) ? p.insurance.shieldPlan : defaultPlanForProvider);
    const riderOptions = getRiderOptions({ shieldProvider: selectedProvider, shieldPlan: selectedPlan }).map((item) => [item.id, item.label]);
    const fallbackRider = p.insurance.rider === "default"
        ? (riderOptions.find(([value]) => value !== "none")?.[0] ?? "none")
        : (riderOptions[0]?.[0] ?? "none");
    const selectedRider = riderOptions.some(([value]) => value === p.insurance.rider) ? p.insurance.rider : fallbackRider;
    const insurancePlan = resolveInsurancePlan({ shieldProvider: selectedProvider, shieldPlan: selectedPlan, rider: selectedRider });
    const insuranceCatalog = getInsuranceCatalogSummary(p);
    const diseaseEntries = SUPPORTED_DISEASES.map((item) => ({
        value: item.key,
        label: `${item.label} · ${item.category}`,
        searchText: [item.label, item.category, item.key, ...(item.aliases || []), ...(CONDITION_SYNONYMS[item.key] || [])].join(" ").toLowerCase(),
    }));
    return `
    <div class="rp-section-stack">
      <div class="rp-inline-section-title">Essentials</div>
      <div class="rp-form-grid three">
        ${field("Name", `<input class="rp-input" data-profile-field="name" value="${escapeAttr(profileRecord.name)}">`)}
        ${field("Birth date", `<input class="rp-input" type="date" data-profile-field="birthDate" value="${escapeAttr(p.birthDate)}">`)}
        ${field("Sex", select("profile.sex", p.sex, [["female", "Female"], ["male", "Male"]]))}
        ${field("Bank / cash", numberInput("profile.bankCash", p.bankCash))}
        ${field("OA", numberInput("profile.oa", p.oa), FIELD_HELP.oa)}
        ${field("SA", numberInput("profile.sa", p.sa), FIELD_HELP.sa)}
        ${field("RA", numberInput("profile.ra", p.ra), `ERS room ${currency.format(constraints.remainingErsRoom)}. ${FIELD_HELP.ra}`)}
        ${field("MA", numberInput("profile.ma", p.ma), `BHS ${currency.format(constraints.bhs)}. ${FIELD_HELP.ma}`)}
        ${field("Policy year", numberInput("profile.cpfCohortYear", p.cpfCohortYear), FIELD_HELP.policyYear)}
        ${field("Observed CPF payout", numberInput("profile.observedCpfPayout", p.observedCpfPayout), FIELD_HELP.observedCpfPayout)}
        ${field("Basic spend / month", numberInput("profile.basicSpendMonthly", p.basicSpendMonthly))}
        ${field("Discretionary spend / year", numberInput("profile.discretionarySpendAnnual", p.discretionarySpendAnnual))}
        ${field("Market income / year", numberInput("profile.marketIncomeAnnual", p.marketIncomeAnnual))}
        ${field("Smoking", select("profile.smoking", p.smoking, [["never", "Never"], ["former", "Former"], ["current", "Current"]]))}
        ${field("Alcohol", select("profile.alcohol", p.alcohol, ALCOHOL_OPTIONS))}
        ${field("Exercise", select("profile.exerciseLevel", p.exerciseLevel, [["low", "Low"], ["moderate", "Moderate"], ["high", "High"]]))}
        ${field("Self-rated health", select("profile.selfRatedHealth", p.selfRatedHealth, [["poor", "Poor"], ["fair", "Fair"], ["good", "Good"]]))}
        ${field("Frailty", select("profile.frailty", p.frailty, [["robust", "Robust"], ["prefrail", "Prefrail"], ["frail", "Frail"]]))}
        ${field("Mobility", select("profile.mobility", p.mobility, MOBILITY_OPTIONS))}
        ${field("Cognition", select("profile.cognition", p.cognition, COGNITION_OPTIONS))}
        ${field("Family longevity", select("profile.familyLongevity", p.familyLongevity, FAMILY_LONGEVITY_OPTIONS))}
        ${field("Chronic conditions", searchableMultiSelect("profile.chronicConditions", p.chronicConditions || [], diseaseEntries), FIELD_HELP.chronicConditions)}
        ${field("Prior serious conditions", searchableMultiSelect("profile.priorSeriousConditions", p.priorSeriousConditions || [], diseaseEntries), FIELD_HELP.priorSeriousConditions)}
      </div>
      <div class="rp-form-section rp-form-span">
        <div class="rp-inline-section-title">Insurance coverage</div>
        <div class="rp-form-grid three">
          ${field("Shield provider", select("profile.insurance.shieldProvider", selectedProvider, providerOptions))}
          ${selectedProvider === "public"
        ? field("Shield plan", `<div class="rp-readonly-row">MediShield Life baseline</div>`)
        : field("Shield plan", select("profile.insurance.shieldPlan", selectedPlan, planOptions))}
          ${field("Rider", select("profile.insurance.rider", selectedRider, riderOptions))}
          ${field("Care preference", select("profile.insurance.carePreference", p.insurance.carePreference, [["public", "Public"], ["mixed", "Mixed"], ["private", "Private"]]))}
          ${field("MediShield Life", select("profile.insurance.medishield", String(p.insurance.medishield), [["true", "Yes"], ["false", "No"]]))}
          ${field("Accident policy", select("profile.insurance.accidentPolicy", String(p.insurance.accidentPolicy), [["true", "Yes"], ["false", "No"]]))}
          ${field("Long-term care", select("profile.insurance.longTermCareCover", p.insurance.longTermCareCover, LTC_COVER_OPTIONS))}
          ${field("Exclusions", `<input class="rp-input" data-profile-field="profile.insurance.exclusions" value="${escapeAttr(p.insurance.exclusions || "")}">`)}
        </div>
        ${renderInsuranceEstimateWarning(p)}
        <div class="rp-mini-list">
          <div class="rp-mini-item"><span>Selected rider</span><strong>${escapeHtml(insurancePlan.selectedRiderLabel || "No rider")}</strong></div>
          <div class="rp-mini-item"><span>Plan SKU</span><strong>${escapeHtml(insuranceCatalog.planSku)}</strong></div>
          <div class="rp-mini-item"><span>Rider SKU</span><strong>${escapeHtml(insuranceCatalog.riderSku)}</strong></div>
          <div class="rp-mini-item"><span>Target coverage</span><strong>${escapeHtml(insurancePlan.targetCoverage || "n/a")}</strong></div>
          <div class="rp-mini-item"><span>Deductible</span><strong>${currency.format(insurancePlan.deductible || 0)}</strong></div>
          <div class="rp-mini-item"><span>Co-insurance</span><strong>${((insurancePlan.coinsurance || 0) * 100).toFixed(0)}%</strong></div>
          <div class="rp-mini-item"><span>Annual limit</span><strong>${currency.format(insurancePlan.annualLimit || 0)}</strong></div>
          <div class="rp-mini-item"><span>Panel strength</span><strong>${escapeHtml(insurancePlan.panelStrength || "n/a")}</strong></div>
          <div class="rp-mini-item"><span>Pre-authorisation</span><strong>${insurancePlan.preAuthorisationRequiredForBestTerms ? "Required for best terms" : "Not required"}</strong></div>
          <div class="rp-mini-item"><span>Outpatient cancer factor</span><strong>${(insurancePlan.outpatientCancerMultiplier || 1).toFixed(2)}x</strong></div>
          <div class="rp-mini-item"><span>Stop-loss / rider cap</span><strong>${currency.format(insurancePlan.stopLossAnnual || insurancePlan.riderStopLossAnnual || 0)}</strong></div>
        </div>
      </div>
      <details class="rp-inspector-details">
        <summary>Advanced profile inputs</summary>
        <div class="rp-form-grid three rp-advanced-grid">
          ${field("CPF investments", numberInput("profile.cpfInvestments", p.cpfInvestments))}
        </div>
      </details>
    </div>
  `;
}
function renderPlanForm(plan, profile, validation) {
    void profile;
    return `
    <div class="rp-form-grid three">
      ${field("Plan name", `<input class="rp-input" data-plan-field="name" value="${escapeAttr(plan.name)}">`)}
      ${field("CPF LIFE plan", select("plan.cpfPlan", plan.cpfPlan, [["standard", "Standard"], ["escalating", "Escalating"], ["basic", "Basic"]]))}
      ${field("Payout start age", numberInput("plan.payoutStartAge", plan.payoutStartAge))}
      ${field("One-off top-up", numberInput("plan.oneOffTopup", plan.oneOffTopup))}
      ${field("Recurring top-up / year", numberInput("plan.recurringTopupAnnual", plan.recurringTopupAnnual))}
      ${field("Monthly support", numberInput("plan.monthlySupport", plan.monthlySupport))}
      ${field("Care setting", select("plan.careSetting", plan.careSetting, [["public", "Public"], ["mixed", "Mixed"], ["private", "Private"]]))}
      ${field("Medical scenario", select("plan.medicalScenario", plan.medicalScenario, [["insurance-default", "Insurance default"], ["conservative-downside", "Conservative downside"], ["private-stress", "Private stress"]]))}
      ${field("Objective", select("plan.objective", plan.objective, [["basic-certainty", "Basic certainty"], ["total-spend", "Total spend certainty"], ["bequest", "Bequest"], ["tax-efficient", "After-tax family utility"]]))}
    </div>
    <details class="rp-inspector-details">
      <summary><span>Advanced planner settings</span><span class="rp-chevron" aria-hidden="true">▾</span></summary>
      <div class="rp-form-grid three">
        ${field("Equity allocation %", numberInput("plan.equityAllocationPct", plan.equityAllocationPct))}
        ${field("Fixed income %", numberInput("plan.fixedIncomeAllocationPct", plan.fixedIncomeAllocationPct))}
        ${field("Child support strategy", select("plan.childSupportStrategy", plan.childSupportStrategy, [["tax-efficient", "Tax-efficient"], ["payout-efficient", "Payout-efficient"], ["split-evenly", "Split evenly"]]))}
      </div>
    </details>
    <div class="rp-details">
      ${validation.issues.length ? validation.issues.map((item) => `<div class="rp-constraint">${item}</div>`).join("") : `<div class="rp-alert rp-alert-success rp-constraint-success"><strong>CPF constraints satisfied</strong><div>Hard CPF constraints are currently satisfied for this plan.</div></div>`}
    </div>
  `;
}
function renderMedicalLifestyle(bundle) {
    const first = bundle.result.rows[0] ?? bundle.result.rows.at(-1);
    if (!first)
        return "";
    const sourcesCount = UNIFIED_INSURANCE_DB.sources.length;
    const providerCount = Object.keys(UNIFIED_INSURANCE_DB.insurers).length;
    const insuranceCatalog = getInsuranceCatalogSummary(getActiveProfile(requireState()).profile);
    return `
    <details class="rp-inspector-details">
      <summary>Medical, buffers, and lifestyle</summary>
      ${renderInsuranceEstimateWarning(getActiveProfile(requireState()).profile)}
      <div class="rp-medical-grid">
        <div class="rp-mini-list">
          <div class="rp-mini-item"><span>Coverage selection</span><strong>${escapeHtml(`${insuranceCatalog.providerLabel} · ${insuranceCatalog.planLabel}`)}</strong></div>
          <div class="rp-mini-item"><span>Rider</span><strong>${escapeHtml(insuranceCatalog.riderLabel)}</strong></div>
          <div class="rp-mini-item"><span>Catalog source</span><strong>${escapeHtml(insuranceCatalog.sourceLabel)}</strong></div>
          <div class="rp-mini-item"><span>Expected medical gross</span><strong>${currency.format(first.medicalGross)}</strong></div>
          <div class="rp-mini-item"><span>Insurer paid</span><strong>${currency.format(first.insurerPaid)}</strong></div>
          <div class="rp-mini-item"><span>Medisave paid</span><strong>${currency.format(first.medisavePaid)}</strong></div>
          <div class="rp-mini-item"><span>Cash out-of-pocket</span><strong>${currency.format(first.medicalCash)}</strong></div>
          <div class="rp-mini-item"><span>Recommended balanced emergency buffer</span><strong>${currency.format(first.emergencyBalanced)}</strong></div>
          <div class="rp-mini-item"><span>Local insurance DB coverage</span><strong>${providerCount} insurers · ${sourcesCount} source links · ${escapeHtml(insuranceCatalog.generatedAt)}</strong></div>
        </div>
        <div class="rp-section-stack">
          <div class="rp-card-title">Discretionary spend equivalents</div>
        <div class="rp-mini-list">
          ${bundle.result.lifestyle.map((item) => `<div class="rp-mini-item"><span>${item.label}</span><strong>${item.trips.toFixed(1)}x / year</strong></div>`).join("")}
        </div>
      </div>
      </div>
    </details>
  `;
}
function getInsuranceCatalogSummary(profile) {
    const insurerMap = UNIFIED_INSURANCE_DB.insurers;
    const providerKey = profile.insurance.shieldProvider === "public" ? "public" : profile.insurance.shieldProvider;
    const selectedPlan = providerKey === "public" ? "MediShield Life baseline" : (profile.insurance.shieldPlan || "Unspecified plan");
    const resolvedPlan = resolveInsurancePlan({
        shieldProvider: providerKey,
        shieldPlan: providerKey === "public" ? "medishield" : profile.insurance.shieldPlan,
        rider: profile.insurance.rider,
    });
    const { planEntry, riderEntry } = getInsuranceCatalogSelection({
        shieldProvider: providerKey,
        shieldPlan: providerKey === "public" ? "medishield" : profile.insurance.shieldPlan,
        rider: profile.insurance.rider,
    });
    const sourceId = resolvedPlan.sourceId || insurerMap[providerKey]?.sourceId || "";
    const source = UNIFIED_INSURANCE_DB.sources.find((item) => item.id === sourceId);
    return {
        providerLabel: providerKey === "public" ? "Public baseline" : providerKey || "Unspecified provider",
        planLabel: selectedPlan,
        riderLabel: resolvedPlan.selectedRiderLabel || (providerKey === "public" ? "Built-in public baseline" : "No rider"),
        planSku: planEntry?.skuId || "n/a",
        riderSku: riderEntry?.skuId || "n/a",
        planEffectiveFrom: planEntry?.effectiveFrom || "n/a",
        riderEffectiveFrom: riderEntry?.effectiveFrom || "n/a",
        planStatus: planEntry ? "catalog matched" : "derived",
        riderStatus: riderEntry ? "catalog matched" : "derived",
        planSourceRefs: planEntry?.sourceRefs || [],
        riderSourceRefs: riderEntry?.sourceRefs || [],
        compatibilityTags: [...(planEntry?.claimPathTags || []), ...(riderEntry?.claimPathTags || [])],
        sourceLabel: source?.label || source?.provider || sourceId || "Catalog source unavailable",
        sourceUrl: source?.url || "n/a",
        generatedAt: UNIFIED_INSURANCE_DB.generatedAt || "Catalog version unavailable",
        sourceCount: UNIFIED_INSURANCE_DB.sources.length,
        planCount: providerKey === "public" ? 1 : Object.keys(insurerMap[providerKey]?.plans || {}).length,
        benefitClassCount: Object.keys(resolvedPlan.benefits || {}).length,
        panelStrength: resolvedPlan.panelStrength || "n/a",
        preAuthSummary: resolvedPlan.preAuthorisationRequiredForBestTerms ? "Pre-authorisation required for best terms" : "No pre-authorisation uplift required",
        targetCoverage: resolvedPlan.targetCoverage || "n/a",
    };
}
function renderActions(actions) {
    return actions.map((item) => `
    <details class="rp-action">
      <summary class="rp-action-top">
        <div>
          <strong>${item.title}</strong>
          <div class="rp-card-subtitle">${item.tag} · ${item.risk} risk · ${item.confidence} confidence</div>
        </div>
        <span class="rp-chip">${item.tag}</span>
        <span class="rp-chevron" aria-hidden="true">▾</span>
      </summary>
      <div class="rp-action-body">
        <div>${item.why}</div>
        <div class="rp-action-explainer"><strong>What this means:</strong> ${escapeHtml(explainRecommendation(item))}</div>
        <div class="rp-action-next-step"><strong>What to do Monday morning:</strong> ${escapeHtml(nextStepForRecommendation(item))}</div>
        <div class="rp-action-metrics">
          ${metric("Shortfall reduction", currency.format(item.shortfallReduction || 0))}
          ${metric("Liquidity impact", currency.format(item.liquidityImpact || 0))}
          ${metric("Estate impact", currency.format(item.estateImpact || 0))}
          ${metric("Confidence", item.confidence)}
        </div>
      </div>
    </details>
  `).join("");
}
function renderPolicyStatus(constraints) {
    return `
    <div class="rp-mini-list">
      <div class="rp-mini-item"><span>Policy year</span><strong>${constraints.year}</strong></div>
      <div class="rp-mini-item"><span>Remaining ERS room</span><strong>${currency.format(constraints.remainingErsRoom)}</strong><button class="rp-inline-help" type="button" data-tooltip="${escapeAttr(FIELD_HELP.remainingErsRoom)}">?</button></div>
      <div class="rp-mini-item"><span>BHS</span><strong>${currency.format(constraints.bhs)}</strong><button class="rp-inline-help" type="button" data-tooltip="${escapeAttr(FIELD_HELP.bhs)}">?</button></div>
      <div class="rp-mini-item"><span>FRS</span><strong>${currency.format(constraints.frs)}</strong><button class="rp-inline-help" type="button" data-tooltip="${escapeAttr(FIELD_HELP.frs)}">?</button></div>
      <div class="rp-mini-item"><span>ERS</span><strong>${currency.format(constraints.ers)}</strong><button class="rp-inline-help" type="button" data-tooltip="${escapeAttr(FIELD_HELP.remainingErsRoom)}">?</button></div>
      <div class="rp-mini-item"><span>Current MA overflow</span><strong>${currency.format(constraints.maOverflow)}</strong></div>
    </div>
  `;
}
function getChartDefinitions(bundle) {
    const rows = bundle.result.rows.slice(0, 20);
    const labels = rows.map((row) => row.age);
    return [
        {
            id: "incomeSpend",
            title: "Income vs spend",
            takeaway: "Will she have enough every month?",
            labels,
            series: [
                { label: "Income / month", color: "#0f6a67", data: rows.map((row) => row.grossIncomeAnnual / 12) },
                { label: "Basic spend / month", color: "#1c5d95", data: rows.map((row) => row.basicSpendAnnual / 12), dashed: true },
                { label: "Total spend / month", color: "#8c661a", data: rows.map((row) => row.totalSpendAnnual / 12) },
                { label: "Net / month", color: "#a53b2f", data: rows.map((row) => row.netAnnual / 12) },
            ],
        },
        {
            id: "assetCpf",
            title: "Asset + CPF trajectory",
            takeaway: "What runs down, what stays protected, and what remains?",
            labels,
            series: [
                { label: "Bank", color: "#245c31", data: rows.map((row) => row.bank) },
                { label: "OA", color: "#1c5d95", data: rows.map((row) => row.oa) },
                { label: "RA", color: "#8c661a", data: rows.map((row) => row.ra) },
                { label: "MA", color: "#a53b2f", data: rows.map((row) => row.ma) },
                { label: "Estate equivalent", color: "#0f6a67", data: rows.map((row) => row.estateEquivalent) },
            ],
        },
        {
            id: "survivalFit",
            title: "Survival + CPF LIFE fit",
            takeaway: "Is this annuity worth it for her likely lifespan?",
            labels,
            series: [
                { label: "Survival %", color: "#241d12", data: rows.map((row) => row.survival * 100) },
                { label: "Cumulative payouts (k)", color: "#0f6a67", data: rows.map((row) => row.cumulativePayouts / 1000) },
                { label: "Premium equivalent (k)", color: "#8c661a", data: rows.map((row) => row.premiumEquivalent / 1000), dashed: true },
            ],
        },
        {
            id: "actionImpact",
            title: "Action ladder impact",
            takeaway: "What should we do next, in what order?",
            kind: "bar",
            labels: bundle.recommendations.map((item) => item.title.split(" ").slice(0, 2).join(" ")),
            series: [
                { label: "Shortfall reduction", color: "#0f6a67", data: bundle.recommendations.map((item) => item.shortfallReduction) },
                { label: "Liquidity impact", color: "#a53b2f", data: bundle.recommendations.map((item) => item.liquidityImpact) },
                { label: "Estate impact", color: "#1c5d95", data: bundle.recommendations.map((item) => item.estateImpact) },
            ],
        },
    ];
}
function renderChartCards(bundle) {
    const hidden = requireState().ui.chartHiddenSeries;
    const chartCards = getChartDefinitions(bundle)
        .filter((chart) => chart.id !== "actionImpact")
        .map(({ id, title, takeaway, series }) => `
    <div class="rp-card rp-chart-card">
      <div class="rp-card-header">
        <div>
          <div class="rp-card-title">${title}</div>
          <div class="rp-card-subtitle">${takeaway}</div>
        </div>
      </div>
      <div class="rp-chart-toolbar">
        <div class="rp-series-toggles">
          ${series.map((item) => {
        const off = (hidden[id] || []).includes(item.label);
        return `<button class="rp-series-toggle ${off ? "off" : "on"}" data-chart-toggle="${id}" data-chart-series="${escapeAttr(item.label)}"><span class="rp-chart-tooltip-dot" style="background:${item.color}"></span>${escapeHtml(item.label)}</button>`;
    }).join("")}
        </div>
        <div class="rp-chart-hint">Hover for values · click to pin · click again or Esc to clear</div>
      </div>
      <div class="rp-chart-stage"><canvas id="chart-${id}" width="760" height="320"></canvas></div>
    </div>
  `).join("");
    return `${chartCards}${renderActionLadder(bundle.recommendations)}`;
}
function renderActionLadder(actions) {
    if (!actions.length)
        return "";
    return `
    <div class="rp-card rp-chart-card rp-action-ladder-card">
      <div class="rp-card-header">
        <div>
          <div class="rp-card-title">Action ladder</div>
          <div class="rp-card-subtitle">What to do next, in order, without making you read a chart.</div>
        </div>
      </div>
      <div class="rp-card-body">
        <div class="rp-action-ladder-list">
          ${actions.slice(0, 4).map((item, index) => `
            <div class="rp-action-ladder-row">
              <div class="rp-action-ladder-rank">Action ${index + 1}</div>
              <div class="rp-action-ladder-copy">
                <strong>${escapeHtml(item.title)}</strong>
                <div>${escapeHtml(explainRecommendation(item))}</div>
              </div>
              <div class="rp-action-ladder-metrics">
                <span>Shortfall ${currency.format(item.shortfallReduction || 0)}/m</span>
                <span>Liquidity ${currency.format(item.liquidityImpact || 0)}</span>
                <span>Estate ${currency.format(item.estateImpact || 0)}</span>
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    </div>
  `;
}
function renderAppendix(rows, preset) {
    const columns = {
        full: ["age", "yearOffset", "mortalityState", "survival", "grossIncomeAnnual", "basicSpendAnnual", "discretionaryAnnual", "medicalGross", "insurerPaid", "medisavePaid", "medicalCash", "emergencyExpected", "emergencyBalanced", "liquidityCoverageMonths", "emergencyCoverageRatio", "medicalShareOfSpend", "cpfShareOfIncome", "netAnnual", "oa", "sa", "ra", "ma", "bank", "familyTopup", "ownTopup", "extraInterestTotal", "ers", "frs", "bhs", "cumulativePayouts", "premiumEquivalent", "taxSavingsAnnual", "estateEquivalent", "estateMinusEmergency", "liquidAssets"],
        cpf: ["age", "cpfPayoutAnnual", "oa", "sa", "ra", "ma", "familyTopup", "ownTopup", "extraInterestTotal", "ers", "frs", "bhs", "cumulativePayouts", "premiumEquivalent"],
        medical: ["age", "medicalGross", "insurerPaid", "medisavePaid", "medicalCash", "medicalShareOfSpend", "emergencyExpected", "emergencyBalanced", "emergencyCoverageRatio", "emergencyConservative"],
        family: ["age", "supportAnnual", "familyTopup", "ownTopup", "taxSavingsAnnual", "cpfPayoutAnnual", "netAnnual"],
    }[preset];
    return `
    <div class="rp-table-wrap">
      <table class="rp-table">
        <thead>
          <tr>${columns.map((column) => `<th>${escapeHtml(APPENDIX_COLUMN_LABELS[column] || column)}</th>`).join("")}</tr>
        </thead>
        <tbody>
          ${rows.map((row) => `
            <tr class="${row.liquidAssets < row.emergencyBalanced ? "buffer-breach" : ""}">
              ${columns.map((column) => formatCell(column, row[column])).join("")}
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}
function bindActions(planResults, activeBundle, comparisonBundle) {
    void planResults;
    if (!state)
        return;
    app.querySelectorAll("[data-profile-switch]").forEach((button) => button.addEventListener("click", async () => {
        if (!state)
            return;
        state.activeProfileId = button.dataset.profileSwitch ?? null;
        state.activePlanId = state.activeProfileId ? getPlansForProfile(state, state.activeProfileId)[0]?.id ?? null : null;
        await persist();
    }));
    app.querySelectorAll("[data-plan-switch]").forEach((button) => button.addEventListener("click", async () => {
        if (!state)
            return;
        state.activePlanId = button.dataset.planSwitch ?? null;
        await persist();
    }));
    app.querySelectorAll("[data-profile-delete]").forEach((button) => button.addEventListener("click", async () => {
        if (!state)
            return;
        if (confirm("Delete this local profile?")) {
            deleteProfile(state, button.dataset.profileDelete ?? null);
            await persist();
        }
    }));
    app.querySelectorAll("[data-plan-delete]").forEach((button) => button.addEventListener("click", async () => {
        if (!state)
            return;
        if (confirm("Delete this local plan?")) {
            deletePlan(state, button.dataset.planDelete ?? null);
            await persist();
        }
    }));
    app.querySelector("[data-action='new-profile']")?.addEventListener("click", async () => { if (!state)
        return; createProfile(state); await persist(); });
    app.querySelector("[data-action='duplicate-profile']")?.addEventListener("click", async () => { if (!state)
        return; duplicateProfile(state, state.activeProfileId); await persist(); });
    app.querySelector("[data-action='new-plan']")?.addEventListener("click", async () => { if (!state)
        return; createPlan(state, state.activeProfileId); await persist(); });
    app.querySelector("[data-action='duplicate-plan']")?.addEventListener("click", async () => { if (!state)
        return; duplicatePlan(state, state.activePlanId); await persist(); });
    app.querySelector("[data-action='wipe-all']")?.addEventListener("click", async () => {
        if (confirm("Wipe all local retirement planner data?")) {
            state = await wipeState();
            render();
        }
    });
    app.querySelector("[data-action='export-json']")?.addEventListener("click", () => {
        exportJson();
        showToast("success", "Plan data exported to JSON.");
    });
    app.querySelectorAll("[data-appendix]").forEach((button) => button.addEventListener("click", async () => {
        if (!state)
            return;
        state.ui.appendixPreset = button.dataset.appendix ?? state.ui.appendixPreset;
        await persist();
    }));
    app.querySelectorAll("[data-ai-open]").forEach((button) => button.addEventListener("click", () => {
        if (!state)
            return;
        openHandoff(button.dataset.aiOpen, buildHandoffPrompt(getActiveProfile(state), getActivePlan(state), activeBundle.result));
    }));
    app.querySelectorAll("[data-copy-prompt='true']").forEach((button) => button.addEventListener("click", async () => {
        if (!state)
            return;
        await copyTextWithFeedback(buildHandoffPrompt(getActiveProfile(state), getActivePlan(state), activeBundle.result), "Expert prompt copied.");
    }));
    app.querySelectorAll("[data-copy-brief]").forEach((button) => button.addEventListener("click", async () => {
        if (!state)
            return;
        const audience = button.dataset.copyBrief;
        if (!audience)
            return;
        await copyTextWithFeedback(buildAudienceBrief(audience, getActiveProfile(state), getActivePlan(state), activeBundle.result), `${capitalize(audience)} brief copied.`);
    }));
    app.querySelectorAll("[data-copy-payload='true']").forEach((button) => button.addEventListener("click", async () => {
        if (!state)
            return;
        await copyTextWithFeedback(buildStructuredPayload(getActiveProfile(state), getActivePlan(state), activeBundle.result), "Structured JSON copied.");
    }));
    app.querySelectorAll("[data-copy-diff='true']").forEach((button) => button.addEventListener("click", async () => {
        if (!state || !comparisonBundle)
            return;
        await copyTextWithFeedback(buildDiffPrompt(getActiveProfile(state), getActivePlan(state), activeBundle.result, comparisonBundle.plan, comparisonBundle.result), "Plan diff brief copied.");
    }));
    app.querySelectorAll("[data-copy-text]").forEach((button) => button.addEventListener("click", async () => {
        const text = button.dataset.copyText;
        if (!text)
            return;
        await copyTextWithFeedback(text, "Copied!");
    }));
    app.querySelectorAll("[data-field='ui.aiMode']").forEach((select) => select.addEventListener("change", async () => {
        if (!state)
            return;
        state.ui.aiMode = select.value;
        await persist();
    }));
    app.querySelectorAll("[data-api-config]").forEach((input) => input.addEventListener("change", () => {
        const key = input.dataset.apiConfig;
        if (!key)
            return;
        apiConfig = { ...apiConfig, [key]: input.value };
        saveApiConfig(apiConfig);
        showToast("success", "API settings saved locally.");
    }));
    app.querySelectorAll("[data-profile-field]").forEach((input) => input.addEventListener("change", async () => {
        if (!state)
            return;
        updateProfileField(getActiveProfile(state), input.dataset.profileField ?? "", getFieldValue(input));
        syncActivePlanConstraints(state);
        await persist();
    }));
    app.querySelectorAll("[data-plan-field]").forEach((input) => input.addEventListener("change", async () => {
        if (!state)
            return;
        updatePlanField(getActivePlan(state), input.dataset.planField ?? "", getFieldValue(input));
        syncActivePlanConstraints(state);
        await persist();
    }));
    app.querySelectorAll("[data-convenience]").forEach((button) => button.addEventListener("click", async () => {
        if (!state)
            return;
        const feedback = applyConvenience(button.dataset.convenience);
        syncActivePlanConstraints(state);
        await persist();
        if (feedback.highlightFields.length)
            highlightFields(feedback.highlightFields);
        showToast("success", feedback.message);
    }));
    app.querySelectorAll("[data-chart-toggle]").forEach((button) => button.addEventListener("click", async () => {
        if (!state)
            return;
        const chartId = button.dataset.chartToggle;
        const seriesLabel = button.dataset.chartSeries;
        if (!chartId || !seriesLabel)
            return;
        const hidden = state.ui.chartHiddenSeries[chartId] || [];
        state.ui.chartHiddenSeries[chartId] = hidden.includes(seriesLabel)
            ? hidden.filter((item) => item !== seriesLabel)
            : [...hidden, seriesLabel];
        await persist();
    }));
    app.querySelectorAll("[data-multiselect-search]").forEach((input) => input.addEventListener("input", () => {
        const root = input.closest("[data-multiselect-root]");
        if (!root)
            return;
        const query = input.value.trim().toLowerCase();
        root.querySelectorAll("[data-token-option]").forEach((option) => {
            const labelNode = option.querySelector("[data-token-label]");
            const rawLabel = labelNode?.dataset.rawLabel || option.textContent || "";
            const searchText = option.dataset.searchText || rawLabel.toLowerCase();
            const matches = !query || searchText.includes(query);
            option.hidden = !matches;
            option.style.display = matches ? "" : "none";
            option.setAttribute("aria-hidden", matches ? "false" : "true");
            if (labelNode) {
                labelNode.innerHTML = matches && query
                    ? highlightSubstring(rawLabel, query)
                    : escapeHtml(rawLabel);
            }
        });
    }));
    app.querySelectorAll("[data-token-remove]").forEach((button) => button.addEventListener("click", async () => {
        if (!state)
            return;
        const path = button.dataset.tokenRemove;
        const value = button.dataset.tokenValue;
        if (!path || !value)
            return;
        const profile = getActiveProfile(state);
        const targetPath = path.replace(/^profile\./, "");
        const source = profile.profile;
        const currentValue = source[targetPath.split(".")[0]];
        if (Array.isArray(currentValue) && targetPath.indexOf(".") === -1) {
            source[targetPath] = currentValue.filter((item) => item !== value);
        }
        else {
            const existing = getNestedArrayValue(source, targetPath);
            setNestedArrayValue(source, targetPath, existing.filter((item) => item !== value));
        }
        syncActivePlanConstraints(state);
        await persist();
    }));
    app.querySelectorAll("[data-inline-ai-suggest]").forEach((button) => button.addEventListener("click", () => {
        inlineQuestionState.question = button.dataset.inlineAiSuggest === "family"
            ? "What should the family do in the next 6 months?"
            : "Explain this plan in plain English for the retiree.";
        inlineQuestionState.error = null;
        render();
    }));
    app.querySelector("[data-inline-ai-run='true']")?.addEventListener("click", async () => {
        if (!state)
            return;
        const questionInput = app.querySelector("[data-inline-ai-question]");
        inlineQuestionState.question = questionInput?.value.trim() || inlineQuestionState.question.trim();
        if (!inlineQuestionState.question) {
            showToast("warning", "Enter a question first.");
            return;
        }
        inlineQuestionState.loading = true;
        inlineQuestionState.error = null;
        inlineQuestionState.answer = "";
        render();
        try {
            const answer = await answerInlineQuestion(requireState(), activeBundle, inlineQuestionState.question);
            inlineQuestionState.answer = answer;
            showToast("success", "AI answer ready.");
        }
        catch (error) {
            inlineQuestionState.error = error instanceof Error ? error.message : "AI answer failed.";
            showToast("error", inlineQuestionState.error);
        }
        finally {
            inlineQuestionState.loading = false;
            render();
        }
    });
}
function applyConvenience(id) {
    if (!state)
        return { message: "No quick control applied.", highlightFields: [] };
    const profile = getActiveProfile(state).profile;
    const plan = getActivePlan(state);
    const constraints = getCpfConstraints(profile, plan);
    switch (id) {
        case "max-topup":
        case "remaining-ers":
            plan.oneOffTopup = constraints.remainingErsRoom;
            return { message: `One-off top-up set to ${currency.format(plan.oneOffTopup)}.`, highlightFields: ["plan.oneOffTopup"] };
        case "basic-gap": {
            const bundle = runPlan(profile, plan);
            const firstRow = bundle.rows[0];
            if (!firstRow)
                break;
            const gap = Math.max(0, firstRow.basicSpendAnnual - firstRow.grossIncomeAnnual);
            plan.oneOffTopup = Math.min(constraints.remainingErsRoom, gap * 4);
            return { message: `One-off top-up set to ${currency.format(plan.oneOffTopup)} for the basic-spend gap.`, highlightFields: ["plan.oneOffTopup"] };
        }
        case "discretionary-gap": {
            const bundle = runPlan(profile, plan);
            const firstRow = bundle.rows[0];
            if (!firstRow)
                break;
            const gap = Math.max(0, firstRow.totalSpendAnnual - firstRow.grossIncomeAnnual);
            plan.oneOffTopup = Math.min(constraints.remainingErsRoom, gap * 4);
            return { message: `One-off top-up set to ${currency.format(plan.oneOffTopup)} for the total-spend gap.`, highlightFields: ["plan.oneOffTopup"] };
        }
        case "ma-cap":
            profile.ma = constraints.bhs;
            return { message: `MA set to the BHS cap at ${currency.format(profile.ma)}.`, highlightFields: ["profile.ma"] };
        case "tax-efficient":
            plan.childSupportStrategy = "tax-efficient";
            return { message: "Child support strategy set to tax-efficient.", highlightFields: ["plan.childSupportStrategy"] };
        case "payout-efficient":
            plan.childSupportStrategy = "payout-efficient";
            return { message: "Child support strategy set to payout-efficient.", highlightFields: ["plan.childSupportStrategy"] };
        case "split-evenly":
            plan.childSupportStrategy = "split-evenly";
            return { message: "Child support strategy set to split evenly.", highlightFields: ["plan.childSupportStrategy"] };
        case "public":
            profile.insurance.carePreference = "public";
            plan.careSetting = "public";
            return { message: "Care setting switched to public care.", highlightFields: ["profile.insurance.carePreference", "plan.careSetting"] };
        case "private":
            profile.insurance.carePreference = "private";
            plan.careSetting = "private";
            return { message: "Care setting switched to private care.", highlightFields: ["profile.insurance.carePreference", "plan.careSetting"] };
        case "insured":
            plan.medicalScenario = "insurance-default";
            return { message: "Medical scenario set to insurance-default.", highlightFields: ["plan.medicalScenario"] };
        case "downside":
            plan.medicalScenario = "conservative-downside";
            return { message: "Medical scenario set to conservative downside.", highlightFields: ["plan.medicalScenario"] };
        case "buffer-min":
            plan.emergencyStyle = "minimum";
            return { message: "Reserve style set to minimum.", highlightFields: ["plan.emergencyStyle"] };
        case "buffer-balanced":
            plan.emergencyStyle = "balanced";
            return { message: "Reserve style set to balanced.", highlightFields: ["plan.emergencyStyle"] };
        case "buffer-conservative":
            plan.emergencyStyle = "conservative";
            return { message: "Reserve style set to conservative.", highlightFields: ["plan.emergencyStyle"] };
        default:
            return { message: "No quick control applied.", highlightFields: [] };
    }
    return { message: "No quick control applied.", highlightFields: [] };
}
function paintCharts(bundle) {
    const hidden = requireState().ui.chartHiddenSeries;
    getChartDefinitions(bundle).forEach((chart) => {
        const visibleSeries = chart.series.filter((item) => !(hidden[chart.id] || []).includes(item.label));
        renderChart(document.getElementById(`chart-${chart.id}`), {
            labels: chart.labels,
            series: visibleSeries.length ? visibleSeries : chart.series,
        });
    });
}
function updateProfileField(profileRecord, path, rawValue) {
    if (path === "name") {
        profileRecord.name = Array.isArray(rawValue) ? rawValue.join(", ") : rawValue;
        return;
    }
    const target = profileRecord.profile;
    assignPath(target, path.replace(/^profile\./, ""), normalizeValue(path, rawValue));
    if (path === "profile.insurance.shieldProvider") {
        const insurerMap = UNIFIED_INSURANCE_DB.insurers;
        const selectedProvider = String(normalizeValue(path, rawValue));
        const nextPlans = Object.keys(insurerMap[selectedProvider]?.plans ?? {});
        target.insurance.shieldPlan = selectedProvider === "public" ? "medishield" : (nextPlans[0] ?? "");
        target.insurance.rider = getRiderOptions({ shieldProvider: selectedProvider, shieldPlan: target.insurance.shieldPlan })[0]?.id ?? "none";
    }
    if (path === "profile.insurance.shieldPlan") {
        target.insurance.rider = getRiderOptions({ shieldProvider: target.insurance.shieldProvider, shieldPlan: String(normalizeValue(path, rawValue)) })[0]?.id ?? "none";
    }
}
function updatePlanField(plan, path, rawValue) {
    assignPath(plan, path.replace(/^plan\./, ""), normalizeValue(path, rawValue));
}
function syncActivePlanConstraints(currentState) {
    const profileRecord = getActiveProfile(currentState);
    const plan = getActivePlan(currentState);
    const normalized = normalizePlanToConstraints(profileRecord.profile, plan);
    profileRecord.profile = normalized.profile;
    Object.assign(plan, normalized.plan);
}
function assignPath(target, path, value) {
    const parts = path.split(".");
    let pointer = target;
    for (let i = 0; i < parts.length - 1; i += 1) {
        const key = parts[i];
        const next = pointer[key];
        if (!next || typeof next !== "object" || Array.isArray(next)) {
            pointer[key] = {};
        }
        pointer = pointer[key];
    }
    const last = parts[parts.length - 1];
    if (Array.isArray(pointer[last])) {
        pointer[last] = String(value).split(",").map((item) => item.trim()).filter(Boolean);
    }
    else {
        pointer[last] = value;
    }
}
function getNestedArrayValue(target, path) {
    const parts = path.split(".");
    let pointer = target;
    for (const key of parts) {
        if (!pointer || typeof pointer !== "object" || Array.isArray(pointer))
            return [];
        pointer = pointer[key];
    }
    return Array.isArray(pointer) ? pointer.map((item) => String(item)) : [];
}
function setNestedArrayValue(target, path, value) {
    const parts = path.split(".");
    let pointer = target;
    for (let i = 0; i < parts.length - 1; i += 1) {
        const key = parts[i];
        const next = pointer[key];
        if (!next || typeof next !== "object" || Array.isArray(next)) {
            pointer[key] = {};
        }
        pointer = pointer[key];
    }
    pointer[parts[parts.length - 1]] = value;
}
function normalizeValue(path, value) {
    if (["profile.chronicConditions", "profile.priorSeriousConditions"].includes(path)) {
        return Array.isArray(value)
            ? value.map((item) => String(item).trim()).filter(Boolean)
            : String(value).split(",").map((item) => item.trim()).filter(Boolean);
    }
    if (["profile.insurance.medishield", "profile.insurance.accidentPolicy"].includes(path))
        return String(value) === "true";
    if (path === "profile.insurance.rider") {
        if (typeof value === "boolean")
            return value ? "default" : "none";
        const normalized = Array.isArray(value) ? value[0] || "none" : String(value || "none");
        return normalized === "true" ? "default" : normalized === "false" ? "none" : normalized;
    }
    if (NUMERIC_FIELD_PATHS.has(path)) {
        const raw = Array.isArray(value) ? value[0] || 0 : value || 0;
        return parseFormattedNumber(raw);
    }
    return Array.isArray(value) ? value.join(", ") : value;
}
async function persist() {
    if (!state)
        return;
    await saveState(state);
    render();
}
function exportJson() {
    if (!state)
        return;
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "retirement-planning-data.json";
    anchor.click();
    URL.revokeObjectURL(url);
}
function renderInsuranceEstimateWarning(profile) {
    const usingDefault = !profile.insurance.shieldProvider || profile.insurance.shieldProvider === "public" || !profile.insurance.shieldPlan;
    if (!usingDefault)
        return "";
    return `
    <div class="rp-alert rp-alert-warning">
      <strong>Insurance estimate warning</strong>
      <div>These medical cost estimates use MediShield Life or public-baseline defaults. Update your actual shield plan and rider above for more accurate results.</div>
    </div>
  `;
}
function field(label, control, help = "") {
    return `
    <div class="rp-field">
      <label class="rp-field-label">
        <span>${label}</span>
        ${help ? `<button class="rp-field-hint" type="button" aria-label="${escapeAttr(help)}" data-tooltip="${escapeAttr(help)}">?</button>` : ""}
      </label>
      ${control}
    </div>
  `;
}
function numberInput(path, value) {
    return `<input class="rp-input" type="text" inputmode="numeric" data-${path.startsWith("plan.") ? "plan" : "profile"}-field="${path}" value="${escapeAttr(formatEditableNumber(value ?? 0, path))}">`;
}
function select(path, current, entries) {
    return `<select class="rp-select" data-${path.startsWith("plan.") ? "plan" : "profile"}-field="${path}">${entries.map(([value, label]) => `<option value="${value}" ${String(current) === String(value) ? "selected" : ""}>${label}</option>`).join("")}</select>`;
}
function searchableMultiSelect(path, current, entries, help = "") {
    const hint = help ? ` title="${escapeAttr(help)}"` : "";
    const normalizedEntries = entries.map((item) => Array.isArray(item) ? { value: item[0], label: item[1], searchText: item[1].toLowerCase() } : item);
    const selected = normalizedEntries.filter((item) => current.includes(item.value));
    const chips = selected.length
        ? selected.map(({ value, label }) => `<span class="rp-token-chip">${escapeHtml(label)}<button type="button" class="rp-token-remove" data-token-remove="${path}" data-token-value="${escapeAttr(value)}" aria-label="Remove ${escapeAttr(label)}">×</button></span>`).join("")
        : `<span class="rp-token-empty">No conditions selected</span>`;
    return `
    <div class="rp-token-picker" data-multiselect-root="${path}"${hint}>
      <div class="rp-token-list">${chips}</div>
      <input class="rp-input rp-token-search" type="search" placeholder="Search conditions (for example: knee pain, sugar, memory)" data-multiselect-search="${path}">
      <div class="rp-token-options">
        ${normalizedEntries.map(({ value, label, searchText }) => `
          <label class="rp-token-option" data-token-option data-search-text="${escapeAttr(searchText || label.toLowerCase())}">
            <input type="checkbox" value="${escapeAttr(value)}" data-${path.startsWith("plan.") ? "plan" : "profile"}-field="${path}" ${current.includes(value) ? "checked" : ""}>
            <span data-token-label data-raw-label="${escapeAttr(label)}">${escapeHtml(label)}</span>
          </label>
        `).join("")}
      </div>
    </div>
  `;
}
function highlightSubstring(label, query) {
    const lower = label.toLowerCase();
    const index = lower.indexOf(query.toLowerCase());
    if (index === -1)
        return escapeHtml(label);
    const before = escapeHtml(label.slice(0, index));
    const match = escapeHtml(label.slice(index, index + query.length));
    const after = escapeHtml(label.slice(index + query.length));
    return `${before}<mark>${match}</mark>${after}`;
}
function getFieldValue(input) {
    if (input instanceof HTMLInputElement && input.type === "checkbox") {
        const field = input.dataset.profileField ?? input.dataset.planField;
        const root = field ? input.closest(`[data-multiselect-root="${field}"]`) : null;
        if (root && field) {
            return Array.from(root.querySelectorAll(`input[type="checkbox"][data-${field.startsWith("plan.") ? "plan" : "profile"}-field="${field}"]:checked`)).map((item) => item.value);
        }
    }
    if (input instanceof HTMLSelectElement && input.multiple) {
        return Array.from(input.selectedOptions).map((option) => option.value);
    }
    return input.value;
}
function metric(label, value) {
    return `<div class="rp-metric-pill"><span>${label}</span><strong>${value}</strong></div>`;
}
function formatInspectorDelta(value, unit) {
    if (!Number.isFinite(value))
        return "n/a";
    if (unit === "years")
        return `${value >= 0 ? "+" : ""}${value.toFixed(1)} years`;
    if (unit === "percent")
        return `${(value * 100).toFixed(0)}%`;
    if (unit === "currency")
        return currency.format(value);
    if (unit === "currency-monthly")
        return `${currency.format(value)}/m`;
    if (unit === "monthly-currency")
        return `${currency.format(value)}/m`;
    return String(value);
}
function lookupByAge(rows, age) {
    return rows.reduce((closest, row) => {
        if (!closest)
            return row;
        return Math.abs(row.age - age) < Math.abs(closest.age - age) ? row : closest;
    }, null);
}
function formatCell(column, value) {
    if (typeof value === "boolean")
        return `<td>${value ? "Yes" : "No"}</td>`;
    if (column === "age" || column === "mortalityState")
        return `<td>${value}</td>`;
    if (column === "survival" && typeof value === "number")
        return `<td>${percent.format(value)}</td>`;
    if (typeof value === "number") {
        const classes = value < 0 ? "is-negative" : value > 0 ? "is-positive" : "";
        return `<td class="${classes}">${currency.format(value)}</td>`;
    }
    return `<td>${value ?? ""}</td>`;
}
function escapeHtml(value) {
    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;");
}
function escapeAttr(value) {
    return escapeHtml(value).replaceAll('"', "&quot;");
}
function showToast(kind, message) {
    activeToast = { kind, message };
    if (toastTimer)
        window.clearTimeout(toastTimer);
    renderToastIntoRoot();
    toastTimer = window.setTimeout(() => {
        activeToast = null;
        renderToastIntoRoot();
    }, 2000);
}
function highlightFields(paths) {
    highlightedFieldPaths = new Set(paths);
    if (highlightTimer)
        window.clearTimeout(highlightTimer);
    render();
    highlightTimer = window.setTimeout(() => {
        highlightedFieldPaths.clear();
        render();
    }, 1800);
}
function paintTransientUi() {
    app.querySelectorAll("[data-profile-field],[data-plan-field]").forEach((input) => {
        const path = input.getAttribute("data-profile-field") || input.getAttribute("data-plan-field");
        const field = input.closest(".rp-field");
        if (!path || !field)
            return;
        field.classList.toggle("rp-field-flash", highlightedFieldPaths.has(path));
    });
}
function sanitizeLoadedState(currentState) {
    currentState.profiles.forEach((profileRecord) => {
        profileRecord.profile.insurance.rider = sanitizeRiderValue(profileRecord.profile.insurance.rider);
        profileRecord.profile.insurance.carePreference = sanitizeCarePreferenceValue(profileRecord.profile.insurance.carePreference);
    });
}
function sanitizeRiderValue(value) {
    if (typeof value === "boolean")
        return value ? "default" : "none";
    const normalized = String(value ?? "").trim().toLowerCase();
    if (!normalized || normalized === "false")
        return "none";
    if (normalized === "true")
        return "default";
    return String(value ?? "none");
}
function sanitizeCarePreferenceValue(value) {
    const normalized = String(value ?? "").trim().toLowerCase();
    if (normalized === "public" || normalized === "mixed" || normalized === "private")
        return normalized;
    return "public";
}
async function copyTextWithFeedback(text, successMessage) {
    try {
        await navigator.clipboard.writeText(text);
        showToast("success", successMessage);
    }
    catch {
        showToast("error", "Clipboard access failed. Select the preview text and copy it manually.");
    }
}
function explainRecommendation(item) {
    if (item.tag.includes("CPF"))
        return "This shifts more of the plan into guaranteed CPF income so monthly cashflow becomes less fragile.";
    if (item.tag.includes("Family"))
        return "This uses allowed family top-ups to improve the retiree's position while also improving tax efficiency.";
    if (item.tag.includes("Liquidity"))
        return "This keeps enough cash accessible so medical or living-cost shocks do not force a bad decision.";
    if (item.tag.includes("Lifestyle"))
        return "This turns discretionary spending into a deliberate choice instead of an invisible leak.";
    return "This is meant to improve the plan after CPF certainty and liquidity are addressed.";
}
function nextStepForRecommendation(item) {
    if (item.tag.includes("CPF"))
        return "Log in to My CPF, check how much more you can still add to your Retirement Account (RA) before hitting the Enhanced Retirement Sum, then decide whether to top up now or in stages.";
    if (item.tag.includes("Family"))
        return "Call the family contributors, agree on support amounts, and confirm the top-up route.";
    if (item.tag.includes("Liquidity"))
        return "Set aside the emergency reserve in accessible cash before making longer-term commitments.";
    if (item.tag.includes("Lifestyle"))
        return "List the discretionary items worth preserving and cut the ones that do not matter.";
    if (item.tag.includes("Insurance"))
        return "Ask an insurer or adviser what hospital coverage is still available for your current conditions, what exclusions apply, and what annual premium you would pay before your next birthday.";
    return "Review the numbers with a planner and convert this recommendation into one concrete next action.";
}
function formatEditableNumber(value, path = "") {
    if (!Number.isFinite(value))
        return "0";
    if (path === "profile.cpfCohortYear")
        return String(Math.trunc(value));
    return new Intl.NumberFormat("en-SG", { maximumFractionDigits: 0 }).format(value);
}
function parseFormattedNumber(value) {
    if (typeof value === "number")
        return Number.isFinite(value) ? value : 0;
    const cleaned = String(value).replace(/[^\d.-]/g, "");
    const parsed = Number(cleaned || 0);
    return Number.isFinite(parsed) ? parsed : 0;
}
function isGenericProfileName(name) {
    return /^profile\s+\d+$/i.test(name.trim());
}
function getPersonLabel(name) {
    if (isGenericProfileName(name))
        return "You";
    return firstName(name);
}
function firstName(name) {
    return name.trim().split(/\s+/)[0] || "You";
}
function getAgeFromBirthDate(birthDate) {
    const date = new Date(birthDate);
    if (Number.isNaN(date.getTime()))
        return 0;
    const now = new Date();
    let age = now.getFullYear() - date.getFullYear();
    const monthDiff = now.getMonth() - date.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < date.getDate()))
        age -= 1;
    return Math.max(0, age);
}
function capitalize(value) {
    return value ? value[0].toUpperCase() + value.slice(1) : value;
}
async function answerInlineQuestion(currentState, bundle, question) {
    const mode = currentState.ui.aiMode;
    const prompt = `${buildHandoffPrompt(getActiveProfile(currentState), getActivePlan(currentState), bundle.result)}\n\nUser question: ${question}\n\nAnswer plainly for a Singapore retiree and supporting family.`;
    if (mode === "chatgpt" || mode === "claude" || mode === "off") {
        openHandoff(mode === "off" ? "claude" : mode, prompt);
        return "Opened this question in the selected AI handoff flow.";
    }
    if (mode === "browser") {
        return runBrowserAi(prompt);
    }
    if (mode === "api") {
        return runApiAi(prompt);
    }
    throw new Error("Select a supported AI mode.");
}
async function runBrowserAi(prompt) {
    const browserWindow = window;
    const ai = browserWindow.ai;
    const sessionFactory = typeof ai?.createTextSession === "function"
        ? ai.createTextSession
        : typeof ai?.languageModel?.create === "function"
            ? (ai?.languageModel).create
            : typeof browserWindow.LanguageModel?.create === "function"
                ? browserWindow.LanguageModel.create
                : null;
    if (typeof ai?.prompt === "function") {
        return String(await ai.prompt(prompt));
    }
    if (!sessionFactory) {
        throw new Error("Local Browser AI is not available in this browser. Use Claude or ChatGPT handoff.");
    }
    const session = await sessionFactory();
    try {
        return String(await session.prompt(prompt));
    }
    finally {
        session.destroy?.();
    }
}
function loadApiConfig() {
    try {
        const raw = window.localStorage.getItem("retirement-planning-ai-config-v1");
        if (!raw)
            return apiConfig;
        const parsed = JSON.parse(raw);
        return {
            endpoint: parsed.endpoint || apiConfig.endpoint,
            model: parsed.model || apiConfig.model,
            apiKey: parsed.apiKey || "",
        };
    }
    catch {
        return apiConfig;
    }
}
function saveApiConfig(next) {
    window.localStorage.setItem("retirement-planning-ai-config-v1", JSON.stringify(next));
}
async function runApiAi(prompt) {
    if (!apiConfig.apiKey.trim()) {
        throw new Error("Add an API key in Bring Your Own API mode before asking a question.");
    }
    const response = await fetch(apiConfig.endpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiConfig.apiKey}`,
        },
        body: JSON.stringify({
            model: apiConfig.model,
            input: prompt,
        }),
    });
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API request failed: ${response.status} ${errorText.slice(0, 180)}`);
    }
    const data = await response.json();
    const outputText = data.output_text
        || data.output?.flatMap((item) => item.content || []).map((item) => item.text || "").join("\n").trim()
        || data.choices?.flatMap((choice) => {
            const content = choice.message?.content;
            if (typeof content === "string")
                return [content];
            return (content || []).map((item) => item.text || "");
        }).join("\n").trim();
    if (!outputText) {
        throw new Error("The API responded without readable text output.");
    }
    return outputText;
}
