import { AI_MODES, APPENDIX_PRESETS, DEFAULT_DESTINATION_COSTS, QUICK_ACTIONS } from "./constants.js";
import { loadState, saveState, wipeState } from "./storage.js";
import { createProfile, duplicateProfile, deleteProfile } from "./profile-manager.js";
import { createPlan, duplicatePlan, deletePlan } from "./plan-manager.js";
import { getActiveProfile, getActivePlan, getPlansForProfile } from "./state.js";
import { validatePlan, getCpfConstraints, normalizePlanToConstraints } from "./policy/cpf-validation.js";
import { getInsuranceCatalogSelection, getRiderOptions, resolveInsurancePlan } from "./policy/medical-schemes.js";
import { runPlan } from "./models/cashflow.js";
import { computeCpfLifeInitial } from "./models/cpf-life.js";
import { buildLifestyleEquivalents } from "./models/lifestyle-equivalents.js";
import { buildBaselineSurvival } from "./models/mortality-baseline.js";
import { buildSensitivityDiagnostics, computeRecommendations } from "./models/optimizer.js";
import { buildExpertReview, buildPlanDiffSummary, summarizePanel } from "./models/recommendations.js";
import { buildAppendixRows } from "./models/appendix-ledger.js";
import { simulateFutures } from "./models/futures.js";
import { renderChart } from "./ui/charts.js";
import { buildAudienceBrief, buildDiffPrompt, buildHandoffPrompt, buildStructuredPayload, detectAiCapabilities, openHandoff } from "./ai/provider.js";
import { UNIFIED_INSURANCE_DB } from "./data/insurance-db.js";
import { listSupportedDiseases } from "./data/disease-db.js";
import type { AiCapabilities, AppState, AppendixPreset, CashflowRow, ConstraintSet, PlanBundle, PlanData, ProfileData, ProfileRecord, Recommendation, ValidationResult } from "./types.js";

const currency = new Intl.NumberFormat("en-SG", { style: "currency", currency: "SGD", maximumFractionDigits: 0 });
const percent = new Intl.NumberFormat("en-SG", { style: "percent", maximumFractionDigits: 0 });
const SUPPORTED_DISEASES = listSupportedDiseases() as Array<{ key: string; label: string; category: string; aliases?: string[] }>;
const ALCOHOL_OPTIONS: Array<[string, string]> = [["none", "None"], ["light", "Light"], ["moderate", "Moderate"], ["heavy", "Heavy"]];
const COGNITION_OPTIONS: Array<[string, string]> = [["normal", "Normal"], ["mild-issues", "Mild issues"], ["impaired", "Impaired"]];
const MOBILITY_OPTIONS: Array<[string, string]> = [["independent", "Independent"], ["some-help", "Some help"], ["limited", "Limited"]];
const FAMILY_LONGEVITY_OPTIONS: Array<[string, string]> = [["short-lived", "Short-lived"], ["average", "Average"], ["long-lived", "Long-lived"]];
const LTC_COVER_OPTIONS: Array<[string, string]> = [["none", "None"], ["careshield", "CareShield base"], ["supplement", "CareShield supplement"], ["other", "Other / legacy"]];
const FIELD_HELP: Record<string, string> = {
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
const CONDITION_SYNONYMS: Record<string, string[]> = {
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
const APPENDIX_COLUMN_LABELS: Record<string, string> = {
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

interface UiToastState {
  kind: "success" | "error" | "warning" | "info";
  message: string;
}

interface InlineQuestionState {
  question: string;
  answer: string;
  loading: boolean;
  error: string | null;
}

interface ApiConfigState {
  endpoint: string;
  model: string;
  apiKey: string;
}

let state: AppState | null = null;
let aiCaps: AiCapabilities = { browser: false, api: true, chatgpt: true, claude: true };
let activeToast: UiToastState | null = null;
let toastTimer: number | null = null;
let highlightedFieldPaths = new Set<string>();
let highlightTimer: number | null = null;
let inlineQuestionState: InlineQuestionState = { question: "", answer: "", loading: false, error: null };
let apiConfig: ApiConfigState = { endpoint: "https://api.openai.com/v1/responses", model: "gpt-4.1-mini", apiKey: "" };

const app = document.getElementById("retirement-planning-app") as HTMLDivElement;

// ===== Language toggle (中文 default / EN) =====
// NOTE: only the NEW cockpit surfaces (onboarding, futures topline, picture
// header, settings-fold summary) are single-language via t(). The legacy expert
// layer (profile/plan forms, charts, recommendations, appendix, AI workspace)
// stays English in both modes — it is the expert layer.
type Lang = "zh" | "en";
const LANG_KEY = "rp-lang";

function getLang(): Lang {
  try {
    return window.localStorage.getItem(LANG_KEY) === "en" ? "en" : "zh";
  } catch {
    return "zh";
  }
}

function setLang(lang: Lang): void {
  try {
    window.localStorage.setItem(LANG_KEY, lang);
  } catch {
    /* private mode: proceed without persisting */
  }
  render();
}

function t(zh: string, en: string): string {
  return getLang() === "en" ? en : zh;
}

function renderLangToggle(): string {
  const lang = getLang();
  return `
    <div class="rp-lang-toggle" role="group" aria-label="Language / 语言">
      <button type="button" class="rp-lang-pill ${lang === "zh" ? "on" : ""}" data-lang="zh" aria-pressed="${lang === "zh"}">中文</button>
      <button type="button" class="rp-lang-pill ${lang === "en" ? "on" : ""}" data-lang="en" aria-pressed="${lang === "en"}">EN</button>
    </div>`;
}

function bindLangToggle(root: ParentNode): void {
  root.querySelectorAll<HTMLButtonElement>("[data-lang]").forEach((btn) => {
    btn.addEventListener("click", () => {
      setLang(btn.dataset.lang === "en" ? "en" : "zh");
    });
  });
}

function futuresPlayLabel(): string {
  return t("▶ 播放 100 个未来", "▶ Play the 100 futures");
}

boot();

function requireState(): AppState {
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

function render(): void {
  if (!state) {
    app.innerHTML = `<div class="rp-card"><div class="rp-card-body">Loading local planner data…</div></div>`;
    return;
  }
  if (futuresPlayTimer !== null) {
    window.clearInterval(futuresPlayTimer);
    futuresPlayTimer = null;
  }
  ensureAppChrome();
  const currentState = requireState();
  if (!isOnboarded()) {
    renderOnboarding();
    return;
  }
  const profileRecord = getActiveProfile(currentState);
  syncActivePlanConstraints(currentState);
  const syncedProfileRecord = getActiveProfile(currentState);
  const syncedActivePlan = getActivePlan(currentState);
  const profile = syncedProfileRecord.profile;
  const validation = validatePlan(profile, syncedActivePlan);
  const plansForProfile = getPlansForProfile(currentState, syncedProfileRecord.id);
  const planResults: PlanBundle[] = plansForProfile.map((plan) => {
    const normalized = normalizePlanToConstraints(profile, plan);
    Object.assign(profile, normalized.profile);
    Object.assign(plan, normalized.plan);
    const result = runPlan(profile, plan);
    const recommendations = computeRecommendations(profile, plan, result);
    const futures = simulateFutures(result, profile, plan);
    return {
      plan,
      result,
      recommendations,
      futures,
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

  const appRoot = app.querySelector<HTMLDivElement>("#rp-app-root");
  if (!appRoot) {
    throw new Error("Retirement planner app root not found.");
  }
  appRoot.innerHTML = `
    <div class="rp-app">
      ${renderBanner(syncedProfileRecord, syncedActivePlan)}
      ${renderStickyMiniBar(syncedProfileRecord, syncedActivePlan, activeBundle)}

      <section class="rp-card rp-topline-stack" id="rp-outputs">
        <div class="rp-page-section-header rp-page-section-inline">
          <div>
            <div class="rp-page-section-kicker">${t("你的退休图", "Your picture")}</div>
            <div class="rp-page-section-note">${t("先看全局，再调整下面的决定。", "Big picture first, decisions below.")}</div>
          </div>
          ${renderLangToggle()}
        </div>
        <div class="rp-card-body">
          ${renderFuturesTopline(activeBundle, profile)}
          ${renderDecisionRail(activeBundle, profile)}
          <div class="rp-output-highlights">
            ${renderIncomeGapAlert(activeBundle)}
          </div>
          ${renderInsuranceReviewAlert(syncedProfileRecord, activeBundle)}
          <div class="rp-summary-grid">
            ${renderSummary(activeBundle)}
          </div>
          ${renderAiQuickActions(syncedProfileRecord, syncedActivePlan, activeBundle)}
        </div>
      </section>

      <details class="rp-inspector-details rp-settings-fold">
        <summary>
          <span>${t("资料与设置", "Profile & settings")}</span>
          <span class="rp-manage-summary">${escapeHtml(getPersonLabel(syncedProfileRecord.name))} · ${escapeHtml(syncedActivePlan.name)} · ${t("修改输入", "edit inputs")}</span>
        </summary>
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
      </details>

      <details class="rp-inspector-details rp-expert-fold" id="rp-expert-fold">
        <summary>
          <span>${t("专家层 · 图表与建议", "Expert layer · charts & analysis")}</span>
          <span class="rp-manage-summary">${t("图表、建议、医疗与缓冲分析", "Charts, recommendations, medical & buffer analysis")}</span>
        </summary>
      ${renderPlainEnglishSummary(syncedProfileRecord, syncedActivePlan, activeBundle)}
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
      </details>

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
  bindDecisionRail(activeBundle, profile);
  // Canvases inside a closed <details> have zero layout size and paint blank, so the
  // expert fold's charts must (re)paint when it opens. Bound fresh each render (innerHTML
  // replaced the element, clearing old listeners) → no leak; paintCharts is idempotent.
  const expertFold = app.querySelector<HTMLDetailsElement>("#rp-expert-fold");
  if (expertFold) {
    expertFold.addEventListener("toggle", () => {
      if (expertFold.open) paintCharts(activeBundle);
    });
  }
  paintCharts(activeBundle);
  paintFuturesFan(activeBundle);
  bindFuturesPlayback(activeBundle);
  paintTransientUi();
  renderToastIntoRoot();
  enhanceDetailsAffordance();
  // First-visit boot can race canvas layout; repaint once after settle.
  window.setTimeout(() => {
    paintCharts(activeBundle);
    paintFuturesFan(activeBundle);
  }, 200);
}

function renderBanner(profileRecord: ProfileRecord, plan: PlanData): string {
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

function renderStickyMiniBar(profileRecord: ProfileRecord, plan: PlanData, bundle: PlanBundle): string {
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

function renderToast(): string {
  if (!activeToast) return "";
  return `<div class="rp-toast rp-toast-${activeToast.kind}" role="status" aria-live="polite">${escapeHtml(activeToast.message)}</div>`;
}

function ensureAppChrome(): void {
  if (app.querySelector("#rp-app-root") && app.querySelector("#rp-toast-root")) return;
  app.innerHTML = `
    <div id="rp-toast-root" aria-live="polite" aria-atomic="true"></div>
    <div id="rp-app-root"></div>
  `;
}

function renderToastIntoRoot(): void {
  const toastRoot = app.querySelector<HTMLDivElement>("#rp-toast-root");
  if (!toastRoot) return;
  toastRoot.innerHTML = renderToast();
}

function enhanceDetailsAffordance(): void {
  app.querySelectorAll<HTMLElement>("details summary").forEach((summary) => {
    if (summary.querySelector(".rp-chevron")) return;
    const chevron = document.createElement("span");
    chevron.className = "rp-chevron";
    chevron.setAttribute("aria-hidden", "true");
    chevron.textContent = "▾";
    summary.appendChild(chevron);
  });
}

function renderProfiles(activeProfileId: string): string {
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

function renderStartHereGuide(): string {
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

function renderPlans(plans: PlanData[], activePlanId: string): string {
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

function renderExpertInspector(
  expertReview: { assumptions: string[]; findings: string[]; rationale: string[] },
  sensitivities: Array<{ label: string; impact: number; unit: string; signal: string; why: string }>,
  diffSummary: Array<{ label: string; current: number; comparison: number; delta: number; unit: string }>,
  comparisonBundle: PlanBundle | null,
  insuranceCatalog: ReturnType<typeof getInsuranceCatalogSummary>,
): string {
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

function renderAiPanel(profileRecord: ProfileRecord, plan: PlanData, bundle: PlanBundle, comparisonBundle: PlanBundle | null): string {
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

function renderInlineAiResponse(): string {
  if (inlineQuestionState.loading) {
    return `<div class="rp-help">Generating an answer for this plan…</div>`;
  }
  if (inlineQuestionState.error) {
    return `<div class="rp-alert rp-alert-warning">${escapeHtml(inlineQuestionState.error)}</div>`;
  }
  if (!inlineQuestionState.answer) return "";
  return `<div class="rp-codebox rp-inline-ai-answer">${escapeHtml(inlineQuestionState.answer)}</div>`;
}

function renderApiConfigPanel(): string {
  return `
    <div class="rp-form-grid three rp-api-config-grid">
      ${field("API endpoint", `<input class="rp-input" data-api-config="endpoint" value="${escapeAttr(apiConfig.endpoint)}">`, "OpenAI-compatible Responses API endpoint.")}
      ${field("Model", `<input class="rp-input" data-api-config="model" value="${escapeAttr(apiConfig.model)}">`, "Model name sent to the API endpoint.")}
      ${field("API key", `<input class="rp-input" type="password" data-api-config="apiKey" value="${escapeAttr(apiConfig.apiKey)}" autocomplete="off">`, "Stored in this browser only.")}
    </div>
  `;
}

function renderConvenience(): string {
  const blocks = Object.entries(QUICK_ACTIONS).map(([key, items]) => `
    <div class="rp-field">
      <label>${key}</label>
      <div class="rp-flex">${items.map((item) => `<button class="rp-btn soft" data-convenience="${item.id}">${item.label}</button>`).join("")}</div>
    </div>
  `);
  return `<div class="rp-section-stack">${blocks.join("")}</div>`;
}

function planTypeLabel(kind: string): string {
  return kind === "standard" ? t("标准", "Standard") : kind === "escalating" ? t("递增", "Escalating") : t("基本", "Basic");
}

function renderSummary(bundle: PlanBundle): string {
  const first = bundle.result.rows[0] ?? bundle.result.rows.at(-1);
  if (!first) return "";
  const perMonth = t("月", "m");
  const cards = [
    [t("CPF LIFE 每月", "CPF LIFE start"), `${currency.format(bundle.result.cpfInitialPayout)}/${perMonth}`, t(`${planTypeLabel(bundle.plan.cpfPlan)}计划，如有实际入息则据此校准。`, `${planTypeLabel(bundle.plan.cpfPlan)} plan, calibrated to observed payout if one is recorded.`), "neutral"],
    [t("预计寿命中位", "Median death age"), bundle.result.medianAge.toFixed(1), t(`众数 ${bundle.result.modalAge.toFixed(1)} · p90 ${bundle.result.p90Age.toFixed(1)}`, `Modal ${bundle.result.modalAge.toFixed(1)} · p90 ${bundle.result.p90Age.toFixed(1)}`), "neutral"],
    [t("平衡缓冲", "Balanced buffer"), currency.format(first.emergencyBalanced), t("按基本开销与年龄调整后的医疗风险建议的储备金。", "Recommended reserve based on basic spend and age-adjusted medical risk."), "positive"],
    [t("每年医疗现金", "Medical cash / yr"), currency.format(first.medicalCash), t("保险与 MediSave 支付后预计的自付部分。", "Estimated out-of-pocket after insurer and MediSave contributions."), "warning"],
    [t("家人节税", "Family tax saved / yr"), currency.format(first.taxSavingsAnnual), t("按家人公积金填补与边际税率估算。", "Estimated from modeled family top-ups and marginal tax rates."), "positive"],
    [t("遗产（中位寿命时）", "Estate at median"), currency.format(lookupByAge(bundle.result.rows, bundle.result.medianAge)?.estateEquivalent || 0), t("接近预计寿命中位时的遗产等值余额。", "Estate-equivalent balance near median life expectancy."), "positive"],
  ];
  return cards.map(([title, value, note, tone]) => `
    <div class="rp-summary-card ${tone ? `rp-summary-card-${tone}` : ""}">
      <h3>${title}</h3>
      <strong>${value}</strong>
      <p>${note}</p>
    </div>
  `).join("");
}

// ===== Step-by-step onboarding (first visit) =====

const ONBOARDED_KEY = "rp-onboarded-v1";

interface OnboardingDraft {
  step: number;
  birthYear: number;
  sex: "female" | "male";
  cpfTotal: number | null;
  spendMonthly: number | null;
}

const onboardingDraft: OnboardingDraft = { step: 0, birthYear: 1962, sex: "female", cpfTotal: null, spendMonthly: null };

function isOnboarded(): boolean {
  try {
    return window.localStorage.getItem(ONBOARDED_KEY) === "1";
  } catch {
    return true;
  }
}

function markOnboarded(): void {
  try {
    window.localStorage.setItem(ONBOARDED_KEY, "1");
  } catch {
    /* private mode: proceed without persisting */
  }
}

function renderOnboarding(): void {
  const appRoot = app.querySelector<HTMLDivElement>("#rp-app-root");
  if (!appRoot) return;
  const d = onboardingDraft;
  const steps = [
    `
      <div class="rp-onb-q">${t("您哪一年出生？是女士还是先生？", "Which year were you born, and are you a woman or a man?")}</div>
      <div class="rp-onb-row">
        <input type="number" class="rp-onb-input" id="rp-onb-year" inputmode="numeric" min="1930" max="1985" value="${d.birthYear}">
        <span class="rp-onb-unit">${t("年出生", "year of birth")}</span>
      </div>
      <div class="rp-onb-opts">
        <button type="button" class="rp-onb-opt ${d.sex === "female" ? "sel" : ""}" data-onb-sex="female">${t("女士", "Woman")}</button>
        <button type="button" class="rp-onb-opt ${d.sex === "male" ? "sel" : ""}" data-onb-sex="male">${t("先生", "Man")}</button>
      </div>`,
    `
      <div class="rp-onb-q">${t("您的公积金里，大约有多少钱？", "Roughly how much is in your CPF?")}</div>
      <div class="rp-onb-hint">${t("💡 打开手机里的 CPF 应用就能看到。不确定？选个大概，随时可改。", "💡 Open the CPF app on your phone to check. Not sure? Pick a rough range — you can change it anytime.")}</div>
      <div class="rp-onb-opts rp-onb-stack">
        <button type="button" class="rp-onb-opt ${d.cpfTotal === 80000 ? "sel" : ""}" data-onb-cpf="80000">${t("少过 $100k", "Under $100k")}</button>
        <button type="button" class="rp-onb-opt ${d.cpfTotal === 200000 ? "sel" : ""}" data-onb-cpf="200000">$100k – $300k</button>
        <button type="button" class="rp-onb-opt ${d.cpfTotal === 400000 ? "sel" : ""}" data-onb-cpf="400000">${t("$300k 以上", "Above $300k")}</button>
      </div>
      <div class="rp-onb-row">
        <span class="rp-onb-unit">${t("✏️ 或输入确切数字：", "✏️ Or enter the exact amount:")}</span>
        <input type="number" class="rp-onb-input" id="rp-onb-cpf-exact" inputmode="numeric" min="0" step="1000" placeholder="$">
      </div>`,
    `
      <div class="rp-onb-q">${t("您每个月大约花多少钱？", "Roughly how much do you spend each month?")}</div>
      <div class="rp-onb-hint">${t("吃饭、水电、交通，全部算进去。", "Food, bills, transport — everything counted.")}</div>
      <div class="rp-onb-opts rp-onb-stack">
        <button type="button" class="rp-onb-opt ${d.spendMonthly === 1500 ? "sel" : ""}" data-onb-spend="1500">${t("约 $1,500 / 月", "About $1,500 / mo")} <small>${t("简单过日子", "simple")}</small></button>
        <button type="button" class="rp-onb-opt ${d.spendMonthly === 2300 ? "sel" : ""}" data-onb-spend="2300">${t("约 $2,300 / 月", "About $2,300 / mo")} <small>${t("舒适", "comfortable")}</small></button>
        <button type="button" class="rp-onb-opt ${d.spendMonthly === 3200 ? "sel" : ""}" data-onb-spend="3200">${t("约 $3,200 / 月", "About $3,200 / mo")} <small>${t("偶尔旅行", "with treats")}</small></button>
      </div>
      <div class="rp-onb-row">
        <span class="rp-onb-unit">${t("✏️ 或输入确切数字：", "✏️ Or enter the exact amount:")}</span>
        <input type="number" class="rp-onb-input" id="rp-onb-spend-exact" inputmode="numeric" min="0" step="100" placeholder="${t("$ / 月", "$ / mo")}">
      </div>`,
  ];
  const isLast = d.step === steps.length - 1;
  appRoot.innerHTML = `
    <div class="rp-onb">
      <div class="rp-onb-card">
        <div class="rp-onb-top">
          <div class="rp-onb-progress">
            ${steps.map((_, i) => `<i class="${i <= d.step ? "on" : ""}"></i>`).join("")}
            <span>${t(`第 ${d.step + 1} 题 / ${steps.length}`, `Question ${d.step + 1} of ${steps.length}`)}</span>
          </div>
          ${renderLangToggle()}
        </div>
        ${steps[d.step]}
        <div class="rp-onb-sharp">
          <div class="rp-onb-sharp-bar"><span style="width:${Math.round(((d.step + 1) / (steps.length + 1)) * 100)}%"></span></div>
          <div class="rp-onb-sharp-lbl">${t("每答一题，预测就更清楚", "Each answer sharpens your picture")}</div>
        </div>
        <div class="rp-onb-actions">
          ${d.step > 0 ? `<button type="button" class="rp-btn soft" data-onb-back>${t("‹ 返回", "‹ Back")}</button>` : ""}
          <button type="button" class="rp-btn accent rp-onb-next" data-onb-next>${isLast ? t("看我的退休图 →", "See my picture →") : t("下一题 →", "Next →")}</button>
        </div>
        <button type="button" class="rp-onb-skip" data-onb-skip>${t("先跳过，用新加坡平均值（随时可改）", "Skip with Singapore averages (change anytime)")}</button>
      </div>
    </div>`;
  bindOnboarding(appRoot);
}

function bindOnboarding(appRoot: HTMLDivElement): void {
  const d = onboardingDraft;
  bindLangToggle(appRoot);
  appRoot.querySelectorAll<HTMLButtonElement>("[data-onb-sex]").forEach((btn) => {
    btn.addEventListener("click", () => {
      d.sex = btn.dataset.onbSex === "male" ? "male" : "female";
      renderOnboarding();
    });
  });
  appRoot.querySelectorAll<HTMLButtonElement>("[data-onb-cpf]").forEach((btn) => {
    btn.addEventListener("click", () => {
      d.cpfTotal = Number(btn.dataset.onbCpf);
      renderOnboarding();
    });
  });
  appRoot.querySelectorAll<HTMLButtonElement>("[data-onb-spend]").forEach((btn) => {
    btn.addEventListener("click", () => {
      d.spendMonthly = Number(btn.dataset.onbSpend);
      renderOnboarding();
    });
  });
  appRoot.querySelector<HTMLButtonElement>("[data-onb-back]")?.addEventListener("click", () => {
    d.step = Math.max(0, d.step - 1);
    renderOnboarding();
  });
  appRoot.querySelector<HTMLButtonElement>("[data-onb-skip]")?.addEventListener("click", () => {
    markOnboarded();
    render();
  });
  appRoot.querySelector<HTMLButtonElement>("[data-onb-next]")?.addEventListener("click", () => {
    const yearInput = appRoot.querySelector<HTMLInputElement>("#rp-onb-year");
    if (yearInput) {
      const year = Number(yearInput.value);
      if (Number.isFinite(year) && year >= 1930 && year <= 1985) d.birthYear = year;
    }
    const cpfExact = appRoot.querySelector<HTMLInputElement>("#rp-onb-cpf-exact");
    if (cpfExact && cpfExact.value) {
      const value = Number(cpfExact.value);
      if (Number.isFinite(value) && value >= 0) d.cpfTotal = value;
    }
    const spendExact = appRoot.querySelector<HTMLInputElement>("#rp-onb-spend-exact");
    if (spendExact && spendExact.value) {
      const value = Number(spendExact.value);
      if (Number.isFinite(value) && value > 0) d.spendMonthly = value;
    }
    if (d.step < 2) {
      d.step += 1;
      renderOnboarding();
      return;
    }
    applyOnboarding();
  });
}

function applyOnboarding(): void {
  const currentState = requireState();
  const profileRecord = getActiveProfile(currentState);
  const profile = profileRecord.profile;
  const d = onboardingDraft;
  profile.birthDate = `${d.birthYear}-06-15`;
  profile.sex = d.sex;
  if (d.cpfTotal !== null) {
    // Retirement-age split: most CPF sits in RA by now; keep MA modest.
    profile.ra = Math.round(d.cpfTotal * 0.7);
    profile.oa = Math.round(d.cpfTotal * 0.2);
    profile.sa = 0;
    profile.ma = Math.round(d.cpfTotal * 0.1);
  }
  if (d.spendMonthly !== null) {
    profile.basicSpendMonthly = d.spendMonthly;
  }
  markOnboarded();
  void persist();
}

function renderFuturesTopline(bundle: PlanBundle, profile: ProfileData): string {
  const fut = bundle.futures;
  const redOf100 = 100 - fut.okOf100;
  const breachAges = fut.redFutures.map((f) => f.breachAge).sort((a, b) => a - b);
  const typicalBreach = breachAges.length ? breachAges[Math.floor(breachAges.length / 2)] : null;
  const dots = Array.from({ length: 100 }, (_, i) =>
    `<i class="${i < fut.okOf100 ? "" : "bad"}" style="animation-delay:${i * 12}ms"></i>`
  ).join("");

  const plan = bundle.plan;
  const planLabel = plan.cpfPlan === "standard"
    ? t("标准计划", "Standard plan")
    : plan.cpfPlan === "escalating"
      ? t("递增计划", "Escalating plan")
      : t("基本计划", "Basic plan");
  const chips = [
    t(`<b>${plan.payoutStartAge} 岁开始领</b>`, `<b>Payouts at ${plan.payoutStartAge}</b>`),
    `<b>${planLabel}</b>`,
    t(`每月生活费 <b>${currency.format(profile.basicSpendMonthly)}</b>`, `Monthly spend <b>${currency.format(profile.basicSpendMonthly)}</b>`),
    t(`锁定 <b>${currency.format(plan.oneOffTopup || 0)}</b>`, `Locked in <b>${currency.format(plan.oneOffTopup || 0)}</b>`),
  ].map((c) => `<span>${c}</span>`).join("");

  const tightensLabel = typicalBreach
    ? t(`约 ${typicalBreach} 岁前变紧`, `tightens before ~${typicalBreach}`)
    : t("变紧", "tightens");

  return `
    <div class="rp-futures" id="rp-futures">
      <div class="rp-futures-main">
        <div>
          <div class="rp-futures-hero">${t(
            `<b>${fut.okOf100}</b> / 100 个未来里，钱够用一辈子`,
            `<b>${fut.okOf100}</b> / 100 futures, your money outlives you`,
          )}</div>
        </div>
        <div class="rp-futures-dots" aria-label="${t("100 个模拟未来", "100 simulated futures")}">${dots}</div>
        <div class="rp-futures-legend">
          <span><i class="good"></i>${t("钱够用", "lasts")} · ${fut.okOf100}</span>
          <span><i class="bad"></i>${tightensLabel} · ${redOf100}${t("（CPF LIFE 仍月月照付）", " (CPF LIFE keeps paying)")}</span>
        </div>
        <button type="button" class="rp-futures-play" id="rp-futures-play">${futuresPlayLabel()}</button>
      </div>
      <div class="rp-futures-side">
        <div class="rp-futures-fanwrap">
          <canvas id="chart-futures-fan" width="760" height="280"></canvas>
        </div>
        <div class="rp-futures-fancaption">${t(
          "100 个未来里 80 个落在绿色范围内 — 也可能落在外面",
          "80 of 100 futures fall inside the band; some fall outside",
        )}</div>
      </div>
      <div class="rp-futures-chips">${chips}</div>
    </div>`;
}

// ===== Decision rail (Task 4): four linked decision cards + per-decision zoom ritual =====
// Every control here mutates the SAME active plan/profile the legacy forms use and goes
// through persist()→render(), so the hero, dots, fan and deltas all re-render together
// (one linked state — no panel left on a stale scenario). All copy via t(); all ritual
// numbers trace to engine outputs (buildBaselineSurvival / profile risk factors /
// bundle.futures.redFutures) with no invented magnitudes.

const PARKED_KEY = "rp-parked";
const DISEASE_LABELS = new Map(SUPPORTED_DISEASES.map((d) => [d.key, d.label] as const));

// zh labels for the conditions a user can actually enter (SUPPORTED_DISEASES). Keeps the
// mom-facing 里面看 ritual single-language in zh; falls back to the English DB label for
// any key not mapped. EN mode always uses the English DB label.
const DISEASE_LABELS_ZH: Record<string, string> = {
  hypertension: "高血压", diabetes: "糖尿病", hyperlipidemia: "高血脂", obesity: "肥胖",
  "coronary-artery-disease": "冠心病", "heart-failure": "心力衰竭", "atrial-fibrillation": "心房颤动",
  "heart-attack": "心脏病发作史", stroke: "中风史", tia: "短暂性脑缺血发作",
  "peripheral-arterial-disease": "周围动脉疾病", "chronic-kidney-disease": "慢性肾病",
  dialysis: "透析依赖性肾病", asthma: "哮喘", copd: "慢性阻塞性肺病", "sleep-apnea": "睡眠呼吸暂停",
  parkinsons: "帕金森病", dementia: "失智症", osteoporosis: "骨质疏松", osteoarthritis: "骨关节炎",
  "rheumatoid-arthritis": "类风湿关节炎", lupus: "系统性红斑狼疮", "chronic-hepatitis": "慢性肝炎",
  cirrhosis: "肝硬化", "breast-cancer": "乳腺癌", "colorectal-cancer": "结直肠癌", "lung-cancer": "肺癌",
  "prostate-cancer": "前列腺癌", "ovarian-cancer": "卵巢癌", "cervical-cancer": "宫颈癌",
  "thyroid-cancer": "甲状腺癌", "liver-cancer": "肝癌", "pancreatic-cancer": "胰腺癌",
  "gastric-cancer": "胃癌", "bladder-cancer": "膀胱癌", "kidney-cancer": "肾癌", "uterine-cancer": "子宫癌",
  "brain-cancer": "脑癌", "nasopharyngeal-cancer": "鼻咽癌", "skin-cancer": "皮肤癌", lymphoma: "淋巴瘤",
  leukemia: "白血病", "multiple-myeloma": "多发性骨髓瘤", cardiomyopathy: "心肌病",
  "valvular-heart-disease": "心脏瓣膜病", "deep-vein-thrombosis": "深静脉血栓/肺栓塞史", epilepsy: "癫痫",
  "multiple-sclerosis": "多发性硬化", depression: "重度抑郁症", schizophrenia: "精神分裂症谱系障碍",
  ibd: "炎症性肠病", psoriasis: "银屑病", gout: "痛风", "spinal-stenosis": "椎管狭窄/退行性脊椎病",
  glaucoma: "青光眼", "macular-degeneration": "黄斑变性", "chronic-liver-failure": "慢性肝衰竭",
};

// zh names for the handful of lifestyle-equivalent destinations (place names, kept as
// proper nouns but localized for the zh sentence). English fallback for any unmapped key.
const DESTINATION_LABELS_ZH: Record<string, string> = {
  japan: "日本", europe: "欧洲", africa: "非洲", us: "美国", sea: "东南亚",
};

function diseaseLabel(key: string): string {
  if (getLang() === "zh") return DISEASE_LABELS_ZH[key] ?? DISEASE_LABELS.get(key) ?? key;
  return DISEASE_LABELS.get(key) ?? key;
}

function getParkedDate(cardId: string): string | null {
  try {
    const map = JSON.parse(window.localStorage.getItem(PARKED_KEY) || "{}") as Record<string, unknown>;
    const value = map[cardId];
    return typeof value === "string" ? value : null;
  } catch {
    return null;
  }
}

function setParkedDate(cardId: string, iso: string): void {
  try {
    const map = JSON.parse(window.localStorage.getItem(PARKED_KEY) || "{}") as Record<string, string>;
    map[cardId] = iso;
    window.localStorage.setItem(PARKED_KEY, JSON.stringify(map));
  } catch {
    /* private mode: skip persistence */
  }
}

function planSparkline(kind: string): string {
  // flat (standard), rising (escalating), falling (basic)
  const path = kind === "escalating" ? "M2,15 L10,9 L18,3" : kind === "basic" ? "M2,4 L10,9 L18,14" : "M2,9 L18,9";
  return `<svg class="rp-rail-spark" viewBox="0 0 20 18" width="32" height="18" aria-hidden="true"><path d="${path}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
}

function renderAgeDelta(bundle: PlanBundle, profile: ProfileData): string {
  const plan = bundle.plan;
  const candidateAge = plan.payoutStartAge >= 70 ? 69 : plan.payoutStartAge + 1;
  if (candidateAge === plan.payoutStartAge) return "";
  const altPlan = { ...plan, payoutStartAge: candidateAge };
  const altResult = runPlan(profile, altPlan);
  const altFut = simulateFutures(altResult, profile, altPlan);
  const okDelta = altFut.okOf100 - bundle.futures.okOf100;
  const payoutDelta = Math.round(altResult.cpfInitialPayout - bundle.result.cpfInitialPayout);
  const altMinLiquid = Math.round(Math.min(...altFut.bands.map((b) => b.p10)));
  const okDeltaStr = `${okDelta >= 0 ? "+" : ""}${okDelta}`;
  const payoutStr = currency.format(Math.abs(payoutDelta));
  const gapWarn = altMinLiquid < 0
    ? t(` — <span class="warn">最差现金缺口 ${currency.format(Math.abs(altMinLiquid))}</span>`, ` — <span class="warn">worst cash gap ${currency.format(Math.abs(altMinLiquid))}</span>`)
    : "";
  return `<div class="rp-futures-delta">${t(
    `改到 ${candidateAge} 岁开始领：<b>${altFut.okOf100}/100</b> 个未来够用（${okDeltaStr}），每月${payoutDelta >= 0 ? "多" : "少"} <b>${payoutStr}</b>${gapWarn}`,
    `Start at ${candidateAge} instead: <b>${altFut.okOf100}/100</b> futures last (${okDeltaStr}), <b>${payoutStr}</b> ${payoutDelta >= 0 ? "more" : "less"}/mo${gapWarn}`,
  )}</div>`;
}

function renderLockDelta(bundle: PlanBundle, profile: ProfileData, maxLock: number): string {
  const plan = bundle.plan;
  const current = plan.oneOffTopup || 0;
  const candidate = current < maxLock ? Math.min(maxLock, current + 50000) : 0;
  if (candidate === current) return "";
  const altPlan = { ...plan, oneOffTopup: candidate };
  const altResult = runPlan(profile, altPlan);
  const altFut = simulateFutures(altResult, profile, altPlan);
  const okDelta = altFut.okOf100 - bundle.futures.okOf100;
  const payoutDelta = Math.round(altResult.cpfInitialPayout - bundle.result.cpfInitialPayout);
  const okDeltaStr = `${okDelta >= 0 ? "+" : ""}${okDelta}`;
  const dir = candidate > current ? t("多锁", "lock") : t("少锁", "unlock");
  const amt = currency.format(Math.abs(candidate - current));
  return `<div class="rp-futures-delta">${t(
    `${dir} <b>${amt}</b> 进 RA：<b>${altFut.okOf100}/100</b> 个未来够用（${okDeltaStr}），每月${payoutDelta >= 0 ? "多" : "少"} <b>${currency.format(Math.abs(payoutDelta))}</b>`,
    `${dir} <b>${amt}</b> into RA: <b>${altFut.okOf100}/100</b> futures last (${okDeltaStr}), <b>${currency.format(Math.abs(payoutDelta))}</b> ${payoutDelta >= 0 ? "more" : "less"}/mo`,
  )}</div>`;
}

function renderZoomRitual(cardId: string, bundle: PlanBundle, profile: ProfileData, isPlan: boolean): string {
  const currentAge = bundle.result.currentAge;
  const sex = profile.sex;
  const who = sex === "male" ? t("先生", "men") : t("女士", "women");

  // 外面看 — UNADJUSTED base rate (reference class before her specifics)
  const base = buildBaselineSurvival(currentAge, sex);
  const survivalAt = (target: number): number | null => base.points.find((p) => p.age === target)?.survival ?? null;
  const s85 = survivalAt(85);
  const s90 = survivalAt(90);
  const outside = (s85 !== null && s90 !== null)
    ? t(
        `100 个像您一样的${who}（${currentAge} 岁）：约 <b>${Math.round(s85 * 100)}</b> 个活过 85，<b>${Math.round(s90 * 100)}</b> 个活过 90。`,
        `Of 100 ${who} like you (age ${currentAge}): about <b>${Math.round(s85 * 100)}</b> live past 85, <b>${Math.round(s90 * 100)}</b> past 90.`,
      )
    : t("基于新加坡同龄人的存活率。", "Based on Singapore peers' survival rates.");

  // 里面看 — named nudges from the SAME fields computeRiskMultiplier reads (direction only)
  const nudges: Array<{ label: string; dir: "up" | "down" }> = [];
  if (profile.smoking === "current") nudges.push({ label: t("现在吸烟", "current smoker"), dir: "up" });
  else if (profile.smoking === "former") nudges.push({ label: t("曾经吸烟", "former smoker"), dir: "up" });
  if (profile.alcohol === "heavy") nudges.push({ label: t("大量饮酒", "heavy drinking"), dir: "up" });
  if (profile.selfRatedHealth === "poor") nudges.push({ label: t("自评健康差", "self-rated poor health"), dir: "up" });
  else if (profile.selfRatedHealth === "good") nudges.push({ label: t("自评健康良好", "self-rated good health"), dir: "down" });
  if (profile.frailty === "frail") nudges.push({ label: t("身体虚弱", "frail"), dir: "up" });
  else if (profile.frailty === "prefrail") nudges.push({ label: t("偏虚弱", "pre-frail"), dir: "up" });
  if (profile.mobility !== "independent") nudges.push({ label: t("行动需协助", "mobility needs help"), dir: "up" });
  if (profile.cognition !== "normal") nudges.push({ label: t("认知有状况", "cognition affected"), dir: "up" });
  (profile.chronicConditions || []).forEach((c) => nudges.push({ label: diseaseLabel(c), dir: "up" }));
  (profile.priorSeriousConditions || []).forEach((c) => nudges.push({ label: `${diseaseLabel(c)}${t("（既往）", " (prior)")}`, dir: "up" }));
  const iv = bundle.plan.interventions;
  if (iv.exerciseUpgrade) nudges.push({ label: t("加强运动计划", "exercise upgrade"), dir: "down" });
  if (iv.bpControl) nudges.push({ label: t("控制血压", "BP control"), dir: "down" });
  if (iv.smokingCessation && profile.smoking === "current") nudges.push({ label: t("戒烟计划", "quit-smoking plan"), dir: "down" });
  const nudgesHtml = nudges.length
    ? nudges.map((n) => `<span class="rp-nudge ${n.dir}">${escapeHtml(n.label)} ${n.dir === "up" ? t("↑风险", "↑ risk") : t("↓风险", "↓ risk")}</span>`).join("")
    : `<span class="rp-help">${t("暂无特别因素 — 使用新加坡平均值。", "No standout factors — using Singapore averages.")}</span>`;

  // 预演失败 — group the ACTUAL red futures by cause (no hardcoded empty buckets)
  const paths = bundle.futures.paths;
  const byCause = new Map<string, number[]>();
  bundle.futures.redFutures.forEach((f) => {
    const arr = byCause.get(f.cause) ?? [];
    arr.push(f.breachAge);
    byCause.set(f.cause, arr);
  });
  const causeMeta: Record<string, { label: string; fix: string }> = {
    medical: { label: t("医疗开销", "medical bills"), fix: t("检查保险与 MediShield 缺口", "review insurance & MediShield gaps") },
    market: { label: t("市场波动", "market swings"), fix: t("保留更多现金缓冲", "keep a bigger cash buffer") },
    longevity: { label: t("特别长寿", "living longer"), fix: t("考虑延后开始领或多锁定 RA", "defer payouts or lock more into RA") },
  };
  const premortemRows = [...byCause.entries()]
    .sort((a, b) => b[1].length - a[1].length)
    .slice(0, 3)
    .map(([cause, breaches]) => {
      const sorted = [...breaches].sort((a, b) => a - b);
      const medBreach = sorted[Math.floor(sorted.length / 2)] ?? 0;
      const pct = Math.round((breaches.length / paths) * 100);
      const meta = causeMeta[cause] ?? { label: cause, fix: "" };
      return { pct, medBreach, label: meta.label, fix: meta.fix };
    });
  const premortemHtml = premortemRows.length
    ? premortemRows.map((r) => `<div class="rp-premortem">${t(
        `约 <b>${r.pct}</b> / 100 个未来因<b>${r.label}</b>在 ${r.medBreach} 岁左右变紧 → ${r.fix}`,
        `~<b>${r.pct}</b> of 100 futures tighten from <b>${r.label}</b> around age ${r.medBreach} → ${r.fix}`,
      )}</div>`).join("")
    : `<div class="rp-help">${t("目前没有变紧的未来 — 很稳。", "No tightening futures right now — solid.")}</div>`;

  const parked = getParkedDate(cardId);
  const commitHtml = `${isPlan
    ? `<button type="button" class="rp-btn soft rp-rail-decide" data-rail-commit="${cardId}" data-rail-plan-final="1">${t("就这样决定", "Decide this")}</button>
       <div class="rp-rail-final" data-rail-final="${cardId}" hidden>
         <span class="warn">${t("🔴 选定 30 天后不能更改。确定吗？", "🔴 Final 30 days after enrolment. Sure?")}</span>
         <button type="button" class="rp-btn accent" data-rail-confirm="${cardId}">${t("确认", "Confirm")}</button>
       </div>`
    : `<button type="button" class="rp-btn soft rp-rail-decide" data-rail-commit="${cardId}">${t("就这样决定", "Decide this")}</button>`}
    <button type="button" class="rp-btn soft" data-rail-park="${cardId}">${t("先放着", "Park for now")}</button>
    <span class="rp-rail-parkchip" data-rail-parkchip="${cardId}" ${parked ? "" : "hidden"}>${parked ? t(`已暂放 · ${parked}`, `Parked · ${parked}`) : ""}</span>`;

  return `
    <details class="rp-rail-zoom rp-inspector-details">
      <summary><span>${t("深入看", "Look deeper")}</span></summary>
      <div class="rp-rail-ritual">
        <div class="rp-ritual-block">
          <div class="rp-ritual-h">${t("外面看 · 像您这样的人", "Outside view · people like you")}</div>
          <div>${outside}</div>
        </div>
        <div class="rp-ritual-block">
          <div class="rp-ritual-h">${t("里面看 · 您的因素", "Inside view · your factors")}</div>
          <div class="rp-nudge-list">${nudgesHtml}</div>
        </div>
        <div class="rp-ritual-block">
          <div class="rp-ritual-h">${t("预演失败 · 钱会怎样变紧", "Premortem · how money tightens")}</div>
          <div class="rp-premortem-list">${premortemHtml}</div>
        </div>
        <div class="rp-ritual-block rp-rail-commit">${commitHtml}</div>
      </div>
    </details>`;
}

function renderDecisionRail(bundle: PlanBundle, profile: ProfileData): string {
  const plan = bundle.plan;
  const maxLock = Math.max(0, Math.min(bundle.result.constraints.remainingErsRoom, profile.bankCash));
  const planTiles = (["standard", "escalating", "basic"] as const).map((kind) => {
    const payout = computeCpfLifeInitial(profile, { ...plan, cpfPlan: kind });
    const label = kind === "standard" ? t("标准", "Standard") : kind === "escalating" ? t("递增", "Escalating") : t("基本", "Basic");
    const selected = plan.cpfPlan === kind;
    return `<button type="button" class="rp-rail-tile ${selected ? "sel" : ""}" data-rail-plan="${kind}" aria-pressed="${selected}">
      <span class="rp-rail-tile-top">${planSparkline(kind)}<b>${label}</b></span>
      <span class="rp-rail-tile-payout">${currency.format(Math.round(payout))}/${t("月", "mo")}</span>
    </button>`;
  }).join("");
  const life = buildLifestyleEquivalents(profile.discretionarySpendAnnual)[0];
  // Destination names (Japan, Europe…) are proper nouns and stay; only the structural
  // words ("day"/"trip") go through t() so the zh sentence isn't mixed-language.
  const dest = life ? DEFAULT_DESTINATION_COSTS[life.key] : undefined;
  const destZh = life ? (DESTINATION_LABELS_ZH[life.key] ?? dest?.label ?? "") : "";
  const lifeSub = life && dest
    ? t(`约 ${life.trips.toFixed(1)} 次 ${dest.duration} 天 ${destZh} 之旅/年`, `~${life.trips.toFixed(1)}× ${dest.duration}-day ${dest.label} trip/yr`)
    : "";

  return `
    <section class="rp-decision-rail" aria-label="${t("决定区", "Decisions")}">
      <div class="rp-rail-grid">
        <div class="rp-rail-card">
          <div class="rp-rail-card-head">
            <div class="rp-rail-card-title">${t("几岁开始领", "When to start")}</div>
            <span class="rp-rail-xn">⟂ ${t("与「锁定多少」联动", "linked to “how much to lock”")}</span>
          </div>
          <div class="rp-rail-value"><b id="rp-futures-age">${plan.payoutStartAge}</b> ${t("岁", "yrs")}</div>
          <input type="range" min="65" max="70" step="1" value="${plan.payoutStartAge}" id="rp-futures-age-slider" data-plan-field="plan.payoutStartAge">
          <div class="rp-futures-ticks"><span>65</span><span>66</span><span>67</span><span>68</span><span>69</span><span>70</span></div>
          ${renderAgeDelta(bundle, profile)}
          ${renderZoomRitual("age", bundle, profile, false)}
        </div>
        <div class="rp-rail-card">
          <div class="rp-rail-card-head">
            <div class="rp-rail-card-title">${t("选哪个计划", "Which plan")}</div>
            <span class="rp-rail-xn">⟂ ${t("与「每月生活费」联动", "linked to “monthly spend”")}</span>
          </div>
          <div class="rp-rail-tiles">${planTiles}</div>
          <div class="rp-rail-lock-note">🔒 ${t("选定 30 天内可改，之后定死 — 一道门。", "Changeable for 30 days after enrolment, then final — a one-way door.")}</div>
          ${renderZoomRitual("plan", bundle, profile, true)}
        </div>
        <div class="rp-rail-card">
          <div class="rp-rail-card-head">
            <div class="rp-rail-card-title">${t("锁定多少进 RA", "How much to lock into RA")}</div>
            <span class="rp-rail-xn">⟂ ${t("与「几岁开始领」联动", "linked to “when to start”")}</span>
          </div>
          <div class="rp-rail-value"><b>${currency.format(plan.oneOffTopup || 0)}</b></div>
          <input type="range" min="0" max="${Math.max(10000, maxLock)}" step="10000" value="${Math.min(plan.oneOffTopup || 0, maxLock)}" data-plan-field="plan.oneOffTopup" ${maxLock <= 0 ? "disabled" : ""}>
          <div class="rp-rail-range-ends"><span>$0</span><span>${currency.format(maxLock)}</span></div>
          ${maxLock > 0
            ? renderLockDelta(bundle, profile, maxLock)
            : `<div class="rp-help">${t("暂无可锁定空间（ERS 已满或现金不足）。", "No room to lock right now (ERS full or low cash).")}</div>`}
          ${renderZoomRitual("lock", bundle, profile, false)}
        </div>
        <div class="rp-rail-card">
          <div class="rp-rail-card-head">
            <div class="rp-rail-card-title">${t("每月生活费", "Monthly spending")}</div>
            <span class="rp-rail-xn">⟂ ${t("与「选哪个计划」联动", "linked to “which plan”")}</span>
          </div>
          <div class="rp-rail-value"><b>${currency.format(profile.basicSpendMonthly)}</b> /${t("月", "mo")}</div>
          <input type="range" min="800" max="6000" step="100" value="${Math.min(6000, Math.max(800, profile.basicSpendMonthly))}" data-profile-field="profile.basicSpendMonthly">
          <div class="rp-rail-range-ends"><span>$800</span><span>$6,000</span></div>
          ${lifeSub ? `<div class="rp-rail-subtitle">${escapeHtml(lifeSub)}</div>` : ""}
          ${renderZoomRitual("spend", bundle, profile, false)}
        </div>
      </div>
    </section>`;
}

function bindDecisionRail(bundle: PlanBundle, profile: ProfileData): void {
  void bundle;
  void profile;
  if (!state) return;
  app.querySelectorAll<HTMLButtonElement>("[data-rail-plan]").forEach((btn) => btn.addEventListener("click", async () => {
    if (!state) return;
    const kind = btn.dataset.railPlan;
    if (kind !== "standard" && kind !== "escalating" && kind !== "basic") return;
    getActivePlan(state).cpfPlan = kind;
    syncActivePlanConstraints(state);
    await persist();
  }));
  app.querySelectorAll<HTMLButtonElement>("[data-rail-commit]").forEach((btn) => btn.addEventListener("click", () => {
    if (btn.dataset.railPlanFinal) {
      const final = app.querySelector<HTMLElement>(`[data-rail-final="${btn.dataset.railCommit}"]`);
      if (final) final.hidden = false;
      return;
    }
    showToast("success", t("已记录 · 随时可改", "Noted — change anytime"));
  }));
  app.querySelectorAll<HTMLButtonElement>("[data-rail-confirm]").forEach((btn) => btn.addEventListener("click", () => {
    showToast("success", t("已记录 · 选定 30 天后不能更改", "Noted — final 30 days after enrolment"));
    const final = app.querySelector<HTMLElement>(`[data-rail-final="${btn.dataset.railConfirm}"]`);
    if (final) final.hidden = true;
  }));
  app.querySelectorAll<HTMLButtonElement>("[data-rail-park]").forEach((btn) => btn.addEventListener("click", () => {
    const id = btn.dataset.railPark;
    if (!id) return;
    const iso = new Date().toISOString().slice(0, 10);
    setParkedDate(id, iso);
    const chip = app.querySelector<HTMLElement>(`[data-rail-parkchip="${id}"]`);
    if (chip) {
      chip.hidden = false;
      chip.textContent = t(`已暂放 · ${iso}`, `Parked · ${iso}`);
    }
    showToast("info", t("已先放着 · 之后再回来看", "Parked — revisit later"));
  }));
}

function renderPlainEnglishSummary(profileRecord: ProfileRecord, plan: PlanData, bundle: PlanBundle): string {
  const first = bundle.result.rows[0];
  if (!first) return "";
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
      <div class="rp-plain-english-copy">
        ${monthlyGap < 0
          ? `${escapeHtml(personLabel)} ${verb} currently short by about ${currency.format(Math.abs(monthlyGap))}/month against basic spending.`
          : `${escapeHtml(personLabel)} ${verb} currently ahead of basic spending by about ${currency.format(monthlyGap)}/month.`}
        The current ${escapeHtml(plan.cpfPlan)} CPF LIFE setup starts around ${currency.format(bundle.result.cpfInitialPayout)}/month.
        ${healthContext}
      </div>
      <div class="rp-plain-english-actions"><strong>Top 3 actions:</strong> ${escapeHtml(actions)}</div>
    </div>
  `;
}

function renderInsuranceReviewAlert(profileRecord: ProfileRecord, bundle: PlanBundle): string {
  const profile = profileRecord.profile;
  const first = bundle.result.rows[0];
  if (!first) return "";
  const usingPublicBaseline = !profile.insurance.shieldProvider || profile.insurance.shieldProvider === "public" || !profile.insurance.shieldPlan;
  const age = getAgeFromBirthDate(profile.birthDate);
  if (!usingPublicBaseline || age < 55) return "";
  const conditions = profile.chronicConditions.length
    ? profile.chronicConditions.map((c) => diseaseLabel(c)).join("、")
    : t("您目前的健康状况", "your current health profile");
  return `
    <div class="rp-alert rp-alert-warning rp-insurance-review-card">
      <strong>${t("保险检视刻不容缓", "Insurance review is urgent")}</strong>
      <div>${t(
        `${age} 岁、有「${escapeHtml(conditions)}」、且只选了公积金公共基础住院保障，未来一次住院仍可能留下不小的现金账单。目前模型估计在重大冲击前每年自付约 ${currency.format(first.medicalCash)}。`,
        `At age ${age}, with ${escapeHtml(conditions)} and only public-baseline hospital coverage selected, a future hospitalisation could still leave meaningful cash bills. The current model estimates about ${currency.format(first.medicalCash)}/year out of pocket before any major shock.`,
      )}</div>
      <div><strong>${t("下一步该做什么：", "What to do Monday morning:")}</strong> ${t(
        "向保险顾问或保险公司询问：现在还能买哪些综合健保计划（Integrated Shield）、有哪些除外条款、以及在下个生日前的年保费是多少。",
        "Ask an insurance adviser or provider what Integrated Shield coverage is still available, what exclusions apply, and what the annual premium would be before your next birthday.",
      )}</div>
    </div>
  `;
}

function renderIncomeGapAlert(bundle: PlanBundle): string {
  const first = bundle.result.rows[0];
  if (!first) return "";
  const monthlyIncome = Math.round(first.grossIncomeAnnual / 12);
  const monthlyBasicSpend = Math.round(first.basicSpendAnnual / 12);
  const monthlyGap = monthlyIncome - monthlyBasicSpend;
  if (first.netAnnual >= 0 && monthlyGap >= 0) return "";
  const m = t("月", "m");
  return `
    <div class="rp-alert rp-alert-warning rp-income-gap-card">
      <strong>${t("收入缺口", "Income gap detected")}</strong>
      <div>${t(
        `每月收入（${currency.format(monthlyIncome)}/${m}）不足以支付基本开销（${currency.format(monthlyBasicSpend)}/${m}）。缺口：${currency.format(Math.abs(monthlyGap))}/${m}。`,
        `Your monthly income (${currency.format(monthlyIncome)}/${m}) does not cover basic needs (${currency.format(monthlyBasicSpend)}/${m}). Shortfall: ${currency.format(Math.abs(monthlyGap))}/${m}.`,
      )}</div>
    </div>
  `;
}

function renderAiQuickActions(profileRecord: ProfileRecord, plan: PlanData, bundle: PlanBundle): string {
  const familyPrompt = buildAudienceBrief("family", profileRecord, plan, bundle.result);
  return `
    <div class="rp-ai-cta-strip">
      <div class="rp-ai-cta-copy">
        <strong>${t("在 AI 里打开您的计划", "Open your plan in AI")}</strong>
        <div class="rp-card-subtitle">${t("会预先载入您当前的计划状态，方便您立刻提问。", "Your current plan state will be preloaded so you can ask a real question immediately.")}</div>
      </div>
      <div class="rp-flex">
        <button class="rp-btn accent" data-ai-open="claude">${t("用 Claude 打开", "Open your plan in Claude")}</button>
        <button class="rp-btn soft" data-ai-open="chatgpt">${t("用 ChatGPT 打开", "Open your plan in ChatGPT")}</button>
        <button class="rp-btn soft" data-copy-text="${escapeAttr(familyPrompt)}">${t("复制家人简报", "Copy family brief")}</button>
      </div>
    </div>
  `;
}

function renderProfileForm(profileRecord: ProfileRecord, plan: PlanData, constraints: ConstraintSet): string {
  void plan;
  const p = profileRecord.profile;
  const insurerMap = UNIFIED_INSURANCE_DB.insurers as Record<string, { plans: Record<string, unknown> }>;
  const providerOptions: Array<[string, string]> = [["public", "Public baseline"], ...Object.keys(insurerMap).map((provider) => [provider, provider] as [string, string])];
  const selectedProvider = (selectedProviderValue => providerOptions.some(([value]) => value === selectedProviderValue) ? selectedProviderValue : (providerOptions[0]?.[0] ?? ""))(p.insurance.shieldProvider);
  const planOptions: Array<[string, string]> = Object.keys(insurerMap[selectedProvider]?.plans ?? {}).map((label) => [label, label]);
  const defaultPlanForProvider = selectedProvider === "public" ? "medishield" : (planOptions[0]?.[0] ?? "");
  const selectedPlan = selectedProvider === "public"
    ? "medishield"
    : (planOptions.some(([value]) => value === p.insurance.shieldPlan) ? p.insurance.shieldPlan : defaultPlanForProvider);
  const riderOptions = getRiderOptions({ shieldProvider: selectedProvider, shieldPlan: selectedPlan }).map((item) => [item.id, item.label] as [string, string]);
  const fallbackRider = p.insurance.rider === "default"
    ? (riderOptions.find(([value]) => value !== "none")?.[0] ?? "none")
    : (riderOptions[0]?.[0] ?? "none");
  const selectedRider = riderOptions.some(([value]) => value === p.insurance.rider) ? p.insurance.rider : fallbackRider;
  const insurancePlan = resolveInsurancePlan({ shieldProvider: selectedProvider, shieldPlan: selectedPlan, rider: selectedRider }) as {
    deductible?: number;
    coinsurance?: number;
    annualLimit?: number;
    panelStrength?: string;
    targetCoverage?: string;
    preAuthorisationRequiredForBestTerms?: boolean;
    outpatientCancerMultiplier?: number;
    riderStopLossAnnual?: number;
    stopLossAnnual?: number;
    selectedRiderLabel?: string;
  };
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

function renderPlanForm(plan: PlanData, profile: ProfileData, validation: ValidationResult): string {
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

function renderMedicalLifestyle(bundle: PlanBundle): string {
  const first = bundle.result.rows[0] ?? bundle.result.rows.at(-1);
  if (!first) return "";
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

function getInsuranceCatalogSummary(profile: ProfileData) {
  const insurerMap = UNIFIED_INSURANCE_DB.insurers as Record<string, { sourceId?: string; plans?: Record<string, unknown> }>;
  const providerKey = profile.insurance.shieldProvider === "public" ? "public" : profile.insurance.shieldProvider;
  const selectedPlan = providerKey === "public" ? "MediShield Life baseline" : (profile.insurance.shieldPlan || "Unspecified plan");
  const resolvedPlan = resolveInsurancePlan({
    shieldProvider: providerKey,
    shieldPlan: providerKey === "public" ? "medishield" : profile.insurance.shieldPlan,
    rider: profile.insurance.rider,
  }) as {
    sourceId?: string;
    selectedRiderLabel?: string;
    targetCoverage?: string;
    panelStrength?: string;
    preAuthorisationRequiredForBestTerms?: boolean;
    benefits?: Record<string, unknown>;
  };
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

function renderActions(actions: Recommendation[]): string {
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

function renderPolicyStatus(constraints: ConstraintSet): string {
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

function getChartDefinitions(bundle: PlanBundle): Array<{
  id: string;
  title: string;
  takeaway: string;
  kind?: "line" | "bar";
  labels: Array<number | string>;
  series: Array<{ label: string; color: string; data: number[]; dashed?: boolean }>;
}> {
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

function renderChartCards(bundle: PlanBundle): string {
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

function renderActionLadder(actions: Recommendation[]): string {
  if (!actions.length) return "";
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

function renderAppendix(rows: CashflowRow[], preset: AppendixPreset): string {
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

function bindActions(planResults: PlanBundle[], activeBundle: PlanBundle, comparisonBundle: PlanBundle | null): void {
  void planResults;
  if (!state) return;
  bindLangToggle(app);
  app.querySelectorAll<HTMLButtonElement>("[data-profile-switch]").forEach((button) => button.addEventListener("click", async () => {
    if (!state) return;
    state.activeProfileId = button.dataset.profileSwitch ?? null;
    state.activePlanId = state.activeProfileId ? getPlansForProfile(state, state.activeProfileId)[0]?.id ?? null : null;
    await persist();
  }));

  app.querySelectorAll<HTMLButtonElement>("[data-plan-switch]").forEach((button) => button.addEventListener("click", async () => {
    if (!state) return;
    state.activePlanId = button.dataset.planSwitch ?? null;
    await persist();
  }));

  app.querySelectorAll<HTMLButtonElement>("[data-profile-delete]").forEach((button) => button.addEventListener("click", async () => {
    if (!state) return;
    if (confirm("Delete this local profile?")) {
      deleteProfile(state, button.dataset.profileDelete ?? null);
      await persist();
    }
  }));

  app.querySelectorAll<HTMLButtonElement>("[data-plan-delete]").forEach((button) => button.addEventListener("click", async () => {
    if (!state) return;
    if (confirm("Delete this local plan?")) {
      deletePlan(state, button.dataset.planDelete ?? null);
      await persist();
    }
  }));

  app.querySelector<HTMLElement>("[data-action='new-profile']")?.addEventListener("click", async () => { if (!state) return; createProfile(state); await persist(); });
  app.querySelector<HTMLElement>("[data-action='duplicate-profile']")?.addEventListener("click", async () => { if (!state) return; duplicateProfile(state, state.activeProfileId); await persist(); });
  app.querySelector<HTMLElement>("[data-action='new-plan']")?.addEventListener("click", async () => { if (!state) return; createPlan(state, state.activeProfileId); await persist(); });
  app.querySelector<HTMLElement>("[data-action='duplicate-plan']")?.addEventListener("click", async () => { if (!state) return; duplicatePlan(state, state.activePlanId); await persist(); });
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

  app.querySelectorAll<HTMLButtonElement>("[data-appendix]").forEach((button) => button.addEventListener("click", async () => {
    if (!state) return;
    state.ui.appendixPreset = (button.dataset.appendix as AppendixPreset | undefined) ?? state.ui.appendixPreset;
    await persist();
  }));

  app.querySelectorAll<HTMLButtonElement>("[data-ai-open]").forEach((button) => button.addEventListener("click", () => {
    if (!state) return;
    openHandoff(button.dataset.aiOpen, buildHandoffPrompt(getActiveProfile(state), getActivePlan(state), activeBundle.result));
  }));

  app.querySelectorAll<HTMLElement>("[data-copy-prompt='true']").forEach((button) => button.addEventListener("click", async () => {
    if (!state) return;
    await copyTextWithFeedback(buildHandoffPrompt(getActiveProfile(state), getActivePlan(state), activeBundle.result), "Expert prompt copied.");
  }));

  app.querySelectorAll<HTMLButtonElement>("[data-copy-brief]").forEach((button) => button.addEventListener("click", async () => {
    if (!state) return;
    const audience = button.dataset.copyBrief as Parameters<typeof buildAudienceBrief>[0] | undefined;
    if (!audience) return;
    await copyTextWithFeedback(buildAudienceBrief(audience, getActiveProfile(state), getActivePlan(state), activeBundle.result), `${capitalize(audience)} brief copied.`);
  }));

  app.querySelectorAll<HTMLElement>("[data-copy-payload='true']").forEach((button) => button.addEventListener("click", async () => {
    if (!state) return;
    await copyTextWithFeedback(buildStructuredPayload(getActiveProfile(state), getActivePlan(state), activeBundle.result), "Structured JSON copied.");
  }));

  app.querySelectorAll<HTMLElement>("[data-copy-diff='true']").forEach((button) => button.addEventListener("click", async () => {
    if (!state || !comparisonBundle) return;
    await copyTextWithFeedback(buildDiffPrompt(getActiveProfile(state), getActivePlan(state), activeBundle.result, comparisonBundle.plan, comparisonBundle.result), "Plan diff brief copied.");
  }));

  app.querySelectorAll<HTMLElement>("[data-copy-text]").forEach((button) => button.addEventListener("click", async () => {
    const text = button.dataset.copyText;
    if (!text) return;
    await copyTextWithFeedback(text, "Copied!");
  }));

  app.querySelectorAll<HTMLSelectElement>("[data-field='ui.aiMode']").forEach((select) => select.addEventListener("change", async () => {
    if (!state) return;
    state.ui.aiMode = select.value as AppState["ui"]["aiMode"];
    await persist();
  }));

  app.querySelectorAll<HTMLInputElement>("[data-api-config]").forEach((input) => input.addEventListener("change", () => {
    const key = input.dataset.apiConfig as keyof ApiConfigState | undefined;
    if (!key) return;
    apiConfig = { ...apiConfig, [key]: input.value };
    saveApiConfig(apiConfig);
    showToast("success", "API settings saved locally.");
  }));

  app.querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>("[data-profile-field]").forEach((input) => input.addEventListener("change", async () => {
    if (!state) return;
    updateProfileField(getActiveProfile(state), input.dataset.profileField ?? "", getFieldValue(input));
    syncActivePlanConstraints(state);
    await persist();
  }));

  app.querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>("[data-plan-field]").forEach((input) => input.addEventListener("change", async () => {
    if (!state) return;
    updatePlanField(getActivePlan(state), input.dataset.planField ?? "", getFieldValue(input));
    syncActivePlanConstraints(state);
    await persist();
  }));

  app.querySelectorAll<HTMLButtonElement>("[data-convenience]").forEach((button) => button.addEventListener("click", async () => {
    if (!state) return;
    const feedback = applyConvenience(button.dataset.convenience);
    syncActivePlanConstraints(state);
    await persist();
    if (feedback.highlightFields.length) highlightFields(feedback.highlightFields);
    showToast("success", feedback.message);
  }));

  app.querySelectorAll<HTMLButtonElement>("[data-chart-toggle]").forEach((button) => button.addEventListener("click", async () => {
    if (!state) return;
    const chartId = button.dataset.chartToggle;
    const seriesLabel = button.dataset.chartSeries;
    if (!chartId || !seriesLabel) return;
    const hidden = state.ui.chartHiddenSeries[chartId] || [];
    state.ui.chartHiddenSeries[chartId] = hidden.includes(seriesLabel)
      ? hidden.filter((item) => item !== seriesLabel)
      : [...hidden, seriesLabel];
    await persist();
  }));

  app.querySelectorAll<HTMLInputElement>("[data-multiselect-search]").forEach((input) => input.addEventListener("input", () => {
    const root = input.closest<HTMLElement>("[data-multiselect-root]");
    if (!root) return;
    const query = input.value.trim().toLowerCase();
    root.querySelectorAll<HTMLElement>("[data-token-option]").forEach((option) => {
      const labelNode = option.querySelector<HTMLElement>("[data-token-label]");
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

  app.querySelectorAll<HTMLButtonElement>("[data-token-remove]").forEach((button) => button.addEventListener("click", async () => {
    if (!state) return;
    const path = button.dataset.tokenRemove;
    const value = button.dataset.tokenValue;
    if (!path || !value) return;
    const profile = getActiveProfile(state);
    const targetPath = path.replace(/^profile\./, "");
    const source = profile.profile as unknown as Record<string, unknown>;
    const currentValue = source[targetPath.split(".")[0]!] as unknown;
    if (Array.isArray(currentValue) && targetPath.indexOf(".") === -1) {
      source[targetPath] = currentValue.filter((item) => item !== value);
    } else {
      const existing = getNestedArrayValue(source, targetPath);
      setNestedArrayValue(source, targetPath, existing.filter((item) => item !== value));
    }
    syncActivePlanConstraints(state);
    await persist();
  }));

  app.querySelectorAll<HTMLButtonElement>("[data-inline-ai-suggest]").forEach((button) => button.addEventListener("click", () => {
    inlineQuestionState.question = button.dataset.inlineAiSuggest === "family"
      ? "What should the family do in the next 6 months?"
      : "Explain this plan in plain English for the retiree.";
    inlineQuestionState.error = null;
    render();
  }));

  app.querySelector<HTMLElement>("[data-inline-ai-run='true']")?.addEventListener("click", async () => {
    if (!state) return;
    const questionInput = app.querySelector<HTMLTextAreaElement>("[data-inline-ai-question]");
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
    } catch (error) {
      inlineQuestionState.error = error instanceof Error ? error.message : "AI answer failed.";
      showToast("error", inlineQuestionState.error);
    } finally {
      inlineQuestionState.loading = false;
      render();
    }
  });
}

function applyConvenience(id: string | undefined): { message: string; highlightFields: string[] } {
  if (!state) return { message: "No quick control applied.", highlightFields: [] };
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
      if (!firstRow) break;
      const gap = Math.max(0, firstRow.basicSpendAnnual - firstRow.grossIncomeAnnual);
      plan.oneOffTopup = Math.min(constraints.remainingErsRoom, gap * 4);
      return { message: `One-off top-up set to ${currency.format(plan.oneOffTopup)} for the basic-spend gap.`, highlightFields: ["plan.oneOffTopup"] };
    }
    case "discretionary-gap": {
      const bundle = runPlan(profile, plan);
      const firstRow = bundle.rows[0];
      if (!firstRow) break;
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

let futuresPlayTimer: number | null = null;

function paintFuturesFan(bundle: PlanBundle, overlayPath?: { points: Array<{ age: number; liquid: number }>; ok: boolean }): void {
  const canvas = document.getElementById("chart-futures-fan") as HTMLCanvasElement | null;
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const bands = bundle.futures.bands;
  if (!bands.length) return;

  // Crisp on retina/desktop: size the bitmap to CSS width × devicePixelRatio.
  const dpr = window.devicePixelRatio || 1;
  const w = canvas.clientWidth || canvas.parentElement?.clientWidth || 760;
  const h = Math.max(180, Math.round(w * 0.36));
  const bw = Math.round(w * dpr);
  const bh = Math.round(h * dpr);
  if (canvas.width !== bw || canvas.height !== bh) {
    canvas.width = bw;
    canvas.height = bh;
    canvas.style.height = `${h}px`;
  }
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  const pad = { left: 56, right: 14, top: 14, bottom: 26 };
  ctx.clearRect(0, 0, w, h);

  const ages = bands.map((b) => b.age);
  const minAge = ages[0] ?? 0;
  const maxAge = ages[ages.length - 1] ?? 0;
  const values = bands.flatMap((b) => [b.p10, b.p90]);
  if (overlayPath) values.push(...overlayPath.points.map((p) => p.liquid));
  const minV = Math.min(0, ...values);
  const maxV = Math.max(...values);
  const x = (age: number) => pad.left + ((age - minAge) / Math.max(1, maxAge - minAge)) * (w - pad.left - pad.right);
  const y = (v: number) => pad.top + (1 - (v - minV) / Math.max(1, maxV - minV)) * (h - pad.top - pad.bottom);

  // axis + zero line
  ctx.strokeStyle = "rgba(0,0,0,0.15)";
  ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(pad.left, y(0)); ctx.lineTo(w - pad.right, y(0)); ctx.stroke();
  ctx.fillStyle = "rgba(0,0,0,0.55)";
  ctx.font = "12px system-ui";
  ctx.fillText(t(`${minAge}岁`, `Age ${minAge}`), pad.left, h - 8);
  ctx.fillText(t(`${maxAge}岁`, `Age ${maxAge}`), w - pad.right - 30, h - 8);
  ctx.fillText(t("存款", "Savings"), 8, pad.top + 10);

  // p10–p90 band
  ctx.beginPath();
  bands.forEach((b, i) => (i === 0 ? ctx.moveTo(x(b.age), y(b.p90)) : ctx.lineTo(x(b.age), y(b.p90))));
  for (let i = bands.length - 1; i >= 0; i -= 1) {
    const b = bands[i];
    if (b) ctx.lineTo(x(b.age), y(b.p10));
  }
  ctx.closePath();
  ctx.fillStyle = "rgba(10,125,108,0.16)";
  ctx.fill();

  // median line
  ctx.beginPath();
  bands.forEach((b, i) => (i === 0 ? ctx.moveTo(x(b.age), y(b.p50)) : ctx.lineTo(x(b.age), y(b.p50))));
  ctx.strokeStyle = "#0a7d6c";
  ctx.lineWidth = 2.5;
  ctx.stroke();

  if (overlayPath) {
    ctx.beginPath();
    overlayPath.points.forEach((p, i) => (i === 0 ? ctx.moveTo(x(p.age), y(p.liquid)) : ctx.lineTo(x(p.age), y(p.liquid))));
    ctx.strokeStyle = overlayPath.ok ? "#2f9e57" : "#d4572e";
    ctx.lineWidth = 1.6;
    ctx.stroke();
  }
}

function bindFuturesPlayback(bundle: PlanBundle): void {
  const btn = document.getElementById("rp-futures-play");
  if (!btn) return;
  btn.addEventListener("click", () => {
    if (futuresPlayTimer !== null) {
      window.clearInterval(futuresPlayTimer);
      futuresPlayTimer = null;
      btn.textContent = futuresPlayLabel();
      paintFuturesFan(bundle);
      return;
    }
    const paths = bundle.futures.samplePaths;
    if (!paths.length) return;
    let index = 0;
    btn.textContent = t("⏸ 停", "⏸ Stop");
    futuresPlayTimer = window.setInterval(() => {
      const path = paths[index % paths.length];
      if (path) paintFuturesFan(bundle, path);
      index += 1;
      if (index >= Math.min(paths.length, 40)) {
        window.clearInterval(futuresPlayTimer as number);
        futuresPlayTimer = null;
        btn.textContent = futuresPlayLabel();
        paintFuturesFan(bundle);
      }
    }, 450);
  });
}

function paintCharts(bundle: PlanBundle): void {
  const hidden = requireState().ui.chartHiddenSeries;
  getChartDefinitions(bundle).forEach((chart) => {
    const visibleSeries = chart.series.filter((item) => !(hidden[chart.id] || []).includes(item.label));
    renderChart(document.getElementById(`chart-${chart.id}`), {
      labels: chart.labels,
      series: visibleSeries.length ? visibleSeries : chart.series,
    });
  });
}

function updateProfileField(profileRecord: ProfileRecord, path: string, rawValue: string | string[]): void {
  if (path === "name") {
    profileRecord.name = Array.isArray(rawValue) ? rawValue.join(", ") : rawValue;
    return;
  }
  const target = profileRecord.profile;
  assignPath(target as unknown as Record<string, unknown>, path.replace(/^profile\./, ""), normalizeValue(path, rawValue));
  if (path === "profile.insurance.shieldProvider") {
    const insurerMap = UNIFIED_INSURANCE_DB.insurers as Record<string, { plans: Record<string, unknown> }>;
    const selectedProvider = String(normalizeValue(path, rawValue));
    const nextPlans = Object.keys(insurerMap[selectedProvider]?.plans ?? {});
    target.insurance.shieldPlan = selectedProvider === "public" ? "medishield" : (nextPlans[0] ?? "");
    target.insurance.rider = getRiderOptions({ shieldProvider: selectedProvider, shieldPlan: target.insurance.shieldPlan })[0]?.id ?? "none";
  }
  if (path === "profile.insurance.shieldPlan") {
    target.insurance.rider = getRiderOptions({ shieldProvider: target.insurance.shieldProvider, shieldPlan: String(normalizeValue(path, rawValue)) })[0]?.id ?? "none";
  }
}

function updatePlanField(plan: PlanData, path: string, rawValue: string | string[]): void {
  assignPath(plan as unknown as Record<string, unknown>, path.replace(/^plan\./, ""), normalizeValue(path, rawValue));
}

function syncActivePlanConstraints(currentState: AppState): void {
  const profileRecord = getActiveProfile(currentState);
  const plan = getActivePlan(currentState);
  const normalized = normalizePlanToConstraints(profileRecord.profile, plan);
  profileRecord.profile = normalized.profile;
  Object.assign(plan, normalized.plan);
}

function assignPath(target: Record<string, unknown>, path: string, value: unknown): void {
  const parts = path.split(".");
  let pointer: Record<string, unknown> = target;
  for (let i = 0; i < parts.length - 1; i += 1) {
    const key = parts[i]!;
    const next = pointer[key];
    if (!next || typeof next !== "object" || Array.isArray(next)) {
      pointer[key] = {};
    }
    pointer = pointer[key] as Record<string, unknown>;
  }
  const last = parts[parts.length - 1]!;
  if (Array.isArray(pointer[last])) {
    pointer[last] = String(value).split(",").map((item) => item.trim()).filter(Boolean);
  } else {
    pointer[last] = value;
  }
}

function getNestedArrayValue(target: Record<string, unknown>, path: string): string[] {
  const parts = path.split(".");
  let pointer: unknown = target;
  for (const key of parts) {
    if (!pointer || typeof pointer !== "object" || Array.isArray(pointer)) return [];
    pointer = (pointer as Record<string, unknown>)[key];
  }
  return Array.isArray(pointer) ? pointer.map((item) => String(item)) : [];
}

function setNestedArrayValue(target: Record<string, unknown>, path: string, value: string[]): void {
  const parts = path.split(".");
  let pointer: Record<string, unknown> = target;
  for (let i = 0; i < parts.length - 1; i += 1) {
    const key = parts[i]!;
    const next = pointer[key];
    if (!next || typeof next !== "object" || Array.isArray(next)) {
      pointer[key] = {};
    }
    pointer = pointer[key] as Record<string, unknown>;
  }
  pointer[parts[parts.length - 1]!] = value;
}

function normalizeValue(path: string, value: string | string[]): string | number | boolean | string[] {
  if (["profile.chronicConditions", "profile.priorSeriousConditions"].includes(path)) {
    return Array.isArray(value)
      ? value.map((item) => String(item).trim()).filter(Boolean)
      : String(value).split(",").map((item) => item.trim()).filter(Boolean);
  }
  if (["profile.insurance.medishield", "profile.insurance.accidentPolicy"].includes(path)) return String(value) === "true";
  if (path === "profile.insurance.rider") {
    if (typeof value === "boolean") return value ? "default" : "none";
    const normalized = Array.isArray(value) ? value[0] || "none" : String(value || "none");
    return normalized === "true" ? "default" : normalized === "false" ? "none" : normalized;
  }
  if (NUMERIC_FIELD_PATHS.has(path)) {
    const raw = Array.isArray(value) ? value[0] || 0 : value || 0;
    return parseFormattedNumber(raw);
  }
  return Array.isArray(value) ? value.join(", ") : value;
}

async function persist(): Promise<void> {
  if (!state) return;
  await saveState(state);
  render();
}

function exportJson(): void {
  if (!state) return;
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "retirement-planning-data.json";
  anchor.click();
  URL.revokeObjectURL(url);
}

function renderInsuranceEstimateWarning(profile: ProfileData): string {
  const usingDefault = !profile.insurance.shieldProvider || profile.insurance.shieldProvider === "public" || !profile.insurance.shieldPlan;
  if (!usingDefault) return "";
  return `
    <div class="rp-alert rp-alert-warning">
      <strong>Insurance estimate warning</strong>
      <div>These medical cost estimates use MediShield Life or public-baseline defaults. Update your actual shield plan and rider above for more accurate results.</div>
    </div>
  `;
}

function field(label: string, control: string, help = ""): string {
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

function numberInput(path: string, value: number): string {
  return `<input class="rp-input" type="text" inputmode="numeric" data-${path.startsWith("plan.") ? "plan" : "profile"}-field="${path}" value="${escapeAttr(formatEditableNumber(value ?? 0, path))}">`;
}

function select(path: string, current: string | number | boolean, entries: Array<[string, string]>): string {
  return `<select class="rp-select" data-${path.startsWith("plan.") ? "plan" : "profile"}-field="${path}">${entries.map(([value, label]) => `<option value="${value}" ${String(current) === String(value) ? "selected" : ""}>${label}</option>`).join("")}</select>`;
}

function searchableMultiSelect(path: string, current: string[], entries: Array<[string, string]> | Array<{ value: string; label: string; searchText?: string }>, help = ""): string {
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

function highlightSubstring(label: string, query: string): string {
  const lower = label.toLowerCase();
  const index = lower.indexOf(query.toLowerCase());
  if (index === -1) return escapeHtml(label);
  const before = escapeHtml(label.slice(0, index));
  const match = escapeHtml(label.slice(index, index + query.length));
  const after = escapeHtml(label.slice(index + query.length));
  return `${before}<mark>${match}</mark>${after}`;
}

function getFieldValue(input: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement): string | string[] {
  if (input instanceof HTMLInputElement && input.type === "checkbox") {
    const field = input.dataset.profileField ?? input.dataset.planField;
    const root = field ? input.closest<HTMLElement>(`[data-multiselect-root="${field}"]`) : null;
    if (root && field) {
      return Array.from(root.querySelectorAll<HTMLInputElement>(`input[type="checkbox"][data-${field.startsWith("plan.") ? "plan" : "profile"}-field="${field}"]:checked`)).map((item) => item.value);
    }
  }
  if (input instanceof HTMLSelectElement && input.multiple) {
    return Array.from(input.selectedOptions).map((option) => option.value);
  }
  return input.value;
}

function metric(label: string, value: string): string {
  return `<div class="rp-metric-pill"><span>${label}</span><strong>${value}</strong></div>`;
}

function formatInspectorDelta(value: number, unit: string): string {
  if (!Number.isFinite(value)) return "n/a";
  if (unit === "years") return `${value >= 0 ? "+" : ""}${value.toFixed(1)} years`;
  if (unit === "percent") return `${(value * 100).toFixed(0)}%`;
  if (unit === "currency") return currency.format(value);
  if (unit === "currency-monthly") return `${currency.format(value)}/m`;
  if (unit === "monthly-currency") return `${currency.format(value)}/m`;
  return String(value);
}

function lookupByAge(rows: CashflowRow[], age: number): CashflowRow | null {
  return rows.reduce<CashflowRow | null>((closest, row) => {
    if (!closest) return row;
    return Math.abs(row.age - age) < Math.abs(closest.age - age) ? row : closest;
  }, null);
}

function formatCell(column: string, value: CashflowRow[keyof CashflowRow]): string {
  if (typeof value === "boolean") return `<td>${value ? "Yes" : "No"}</td>`;
  if (column === "age" || column === "mortalityState") return `<td>${value}</td>`;
  if (column === "survival" && typeof value === "number") return `<td>${percent.format(value)}</td>`;
  if (typeof value === "number") {
    const classes = value < 0 ? "is-negative" : value > 0 ? "is-positive" : "";
    return `<td class="${classes}">${currency.format(value)}</td>`;
  }
  return `<td>${value ?? ""}</td>`;
}

function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function escapeAttr(value: unknown): string {
  return escapeHtml(value).replaceAll('"', "&quot;");
}

function showToast(kind: UiToastState["kind"], message: string): void {
  activeToast = { kind, message };
  if (toastTimer) window.clearTimeout(toastTimer);
  renderToastIntoRoot();
  toastTimer = window.setTimeout(() => {
    activeToast = null;
    renderToastIntoRoot();
  }, 2000);
}

function highlightFields(paths: string[]): void {
  highlightedFieldPaths = new Set(paths);
  if (highlightTimer) window.clearTimeout(highlightTimer);
  render();
  highlightTimer = window.setTimeout(() => {
    highlightedFieldPaths.clear();
    render();
  }, 1800);
}

function paintTransientUi(): void {
  app.querySelectorAll<HTMLElement>("[data-profile-field],[data-plan-field]").forEach((input) => {
    const path = input.getAttribute("data-profile-field") || input.getAttribute("data-plan-field");
    const field = input.closest<HTMLElement>(".rp-field");
    if (!path || !field) return;
    field.classList.toggle("rp-field-flash", highlightedFieldPaths.has(path));
  });
}

function sanitizeLoadedState(currentState: AppState): void {
  currentState.profiles.forEach((profileRecord) => {
    profileRecord.profile.insurance.rider = sanitizeRiderValue(profileRecord.profile.insurance.rider);
    profileRecord.profile.insurance.carePreference = sanitizeCarePreferenceValue(profileRecord.profile.insurance.carePreference);
  });
}

function sanitizeRiderValue(value: unknown): string {
  if (typeof value === "boolean") return value ? "default" : "none";
  const normalized = String(value ?? "").trim().toLowerCase();
  if (!normalized || normalized === "false") return "none";
  if (normalized === "true") return "default";
  return String(value ?? "none");
}

function sanitizeCarePreferenceValue(value: unknown): ProfileData["insurance"]["carePreference"] {
  const normalized = String(value ?? "").trim().toLowerCase();
  if (normalized === "public" || normalized === "mixed" || normalized === "private") return normalized;
  return "public";
}

async function copyTextWithFeedback(text: string, successMessage: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(text);
    showToast("success", successMessage);
  } catch {
    showToast("error", "Clipboard access failed. Select the preview text and copy it manually.");
  }
}

function explainRecommendation(item: Recommendation): string {
  if (item.tag.includes("CPF")) return "This shifts more of the plan into guaranteed CPF income so monthly cashflow becomes less fragile.";
  if (item.tag.includes("Family")) return "This uses allowed family top-ups to improve the retiree's position while also improving tax efficiency.";
  if (item.tag.includes("Liquidity")) return "This keeps enough cash accessible so medical or living-cost shocks do not force a bad decision.";
  if (item.tag.includes("Lifestyle")) return "This turns discretionary spending into a deliberate choice instead of an invisible leak.";
  return "This is meant to improve the plan after CPF certainty and liquidity are addressed.";
}

function nextStepForRecommendation(item: Recommendation): string {
  if (item.tag.includes("CPF")) return "Log in to My CPF, check how much more you can still add to your Retirement Account (RA) before hitting the Enhanced Retirement Sum, then decide whether to top up now or in stages.";
  if (item.tag.includes("Family")) return "Call the family contributors, agree on support amounts, and confirm the top-up route.";
  if (item.tag.includes("Liquidity")) return "Set aside the emergency reserve in accessible cash before making longer-term commitments.";
  if (item.tag.includes("Lifestyle")) return "List the discretionary items worth preserving and cut the ones that do not matter.";
  if (item.tag.includes("Insurance")) return "Ask an insurer or adviser what hospital coverage is still available for your current conditions, what exclusions apply, and what annual premium you would pay before your next birthday.";
  return "Review the numbers with a planner and convert this recommendation into one concrete next action.";
}

function formatEditableNumber(value: number, path = ""): string {
  if (!Number.isFinite(value)) return "0";
  if (path === "profile.cpfCohortYear") return String(Math.trunc(value));
  return new Intl.NumberFormat("en-SG", { maximumFractionDigits: 0 }).format(value);
}

function parseFormattedNumber(value: string | number): number {
  if (typeof value === "number") return Number.isFinite(value) ? value : 0;
  const cleaned = String(value).replace(/[^\d.-]/g, "");
  const parsed = Number(cleaned || 0);
  return Number.isFinite(parsed) ? parsed : 0;
}

function isGenericProfileName(name: string): boolean {
  return /^profile\s+\d+$/i.test(name.trim());
}

function getPersonLabel(name: string): string {
  if (isGenericProfileName(name)) return "You";
  return firstName(name);
}

function firstName(name: string): string {
  return name.trim().split(/\s+/)[0] || "You";
}

function getAgeFromBirthDate(birthDate: string): number {
  const date = new Date(birthDate);
  if (Number.isNaN(date.getTime())) return 0;
  const now = new Date();
  let age = now.getFullYear() - date.getFullYear();
  const monthDiff = now.getMonth() - date.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < date.getDate())) age -= 1;
  return Math.max(0, age);
}

function capitalize(value: string): string {
  return value ? value[0]!.toUpperCase() + value.slice(1) : value;
}

async function answerInlineQuestion(currentState: AppState, bundle: PlanBundle, question: string): Promise<string> {
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

async function runBrowserAi(prompt: string): Promise<string> {
  const browserWindow = window as Window & { LanguageModel?: unknown; ai?: Record<string, unknown> };
  const ai = browserWindow.ai as Record<string, unknown> | undefined;
  const sessionFactory = typeof ai?.createTextSession === "function"
    ? ai.createTextSession
    : typeof (ai?.languageModel as { create?: unknown } | undefined)?.create === "function"
      ? (ai?.languageModel as { create: () => Promise<{ prompt: (input: string) => Promise<string>; destroy?: () => void }> }).create
      : typeof (browserWindow.LanguageModel as { create?: unknown } | undefined)?.create === "function"
        ? (browserWindow.LanguageModel as { create: () => Promise<{ prompt: (input: string) => Promise<string>; destroy?: () => void }> }).create
        : null;
  if (typeof ai?.prompt === "function") {
    return String(await (ai.prompt as (input: string) => Promise<string>)(prompt));
  }
  if (!sessionFactory) {
    throw new Error("Local Browser AI is not available in this browser. Use Claude or ChatGPT handoff.");
  }
  const session = await (sessionFactory as () => Promise<{ prompt: (input: string) => Promise<string>; destroy?: () => void }>)();
  try {
    return String(await session.prompt(prompt));
  } finally {
    session.destroy?.();
  }
}

function loadApiConfig(): ApiConfigState {
  try {
    const raw = window.localStorage.getItem("retirement-planning-ai-config-v1");
    if (!raw) return apiConfig;
    const parsed = JSON.parse(raw) as Partial<ApiConfigState>;
    return {
      endpoint: parsed.endpoint || apiConfig.endpoint,
      model: parsed.model || apiConfig.model,
      apiKey: parsed.apiKey || "",
    };
  } catch {
    return apiConfig;
  }
}

function saveApiConfig(next: ApiConfigState): void {
  window.localStorage.setItem("retirement-planning-ai-config-v1", JSON.stringify(next));
}

async function runApiAi(prompt: string): Promise<string> {
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
  const data = await response.json() as {
    output_text?: string;
    choices?: Array<{ message?: { content?: Array<{ text?: string }> | string } }>;
    output?: Array<{ content?: Array<{ text?: string }> }>;
  };
  const outputText = data.output_text
    || data.output?.flatMap((item) => item.content || []).map((item) => item.text || "").join("\n").trim()
    || data.choices?.flatMap((choice) => {
      const content = choice.message?.content;
      if (typeof content === "string") return [content];
      return (content || []).map((item) => item.text || "");
    }).join("\n").trim();
  if (!outputText) {
    throw new Error("The API responded without readable text output.");
  }
  return outputText;
}
