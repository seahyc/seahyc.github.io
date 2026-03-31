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
import type { AiCapabilities, AppState, AppendixPreset, CashflowRow, ConstraintSet, PlanBundle, PlanData, ProfileData, ProfileRecord, Recommendation, ValidationResult } from "./types.js";

const currency = new Intl.NumberFormat("en-SG", { style: "currency", currency: "SGD", maximumFractionDigits: 0 });
const percent = new Intl.NumberFormat("en-SG", { style: "percent", maximumFractionDigits: 0 });
const SUPPORTED_DISEASES = listSupportedDiseases();
const ALCOHOL_OPTIONS: Array<[string, string]> = [["none", "None"], ["light", "Light"], ["moderate", "Moderate"], ["heavy", "Heavy"]];
const COGNITION_OPTIONS: Array<[string, string]> = [["normal", "Normal"], ["mild-issues", "Mild issues"], ["impaired", "Impaired"]];
const MOBILITY_OPTIONS: Array<[string, string]> = [["independent", "Independent"], ["some-help", "Some help"], ["limited", "Limited"]];
const FAMILY_LONGEVITY_OPTIONS: Array<[string, string]> = [["short-lived", "Short-lived"], ["average", "Average"], ["long-lived", "Long-lived"]];
const LTC_COVER_OPTIONS: Array<[string, string]> = [["none", "None"], ["careshield", "CareShield base"], ["supplement", "CareShield supplement"], ["other", "Other / legacy"]];

let state: AppState | null = null;
let aiCaps: AiCapabilities = { browser: false, api: true, chatgpt: true, claude: true };

const app = document.getElementById("retirement-planning-app") as HTMLDivElement;

boot();

function requireState(): AppState {
  if (!state) {
    throw new Error("Retirement planning state not loaded.");
  }
  return state;
}

async function boot() {
  state = await loadState();
  aiCaps = await detectAiCapabilities();
  render();
}

function render(): void {
  if (!state) {
    app.innerHTML = `<div class="rp-card"><div class="rp-card-body">Loading local planner data…</div></div>`;
    return;
  }
  const currentState = requireState();
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

  app.innerHTML = `
    <div class="rp-app">
      ${renderBanner(syncedProfileRecord, syncedActivePlan)}

      <section class="rp-page-section rp-page-section-inputs">
        <div class="rp-page-section-header">
          <div class="rp-page-section-kicker">Inputs</div>
          <div class="rp-page-section-note">Baseline profile, insurance coverage, plan settings, and quick controls.</div>
        </div>
      </section>

      <section class="rp-manage-inline">
        <details class="rp-inspector-details">
          <summary>
            <span>Manage profiles and plans</span>
            <span class="rp-manage-summary">${escapeHtml(syncedProfileRecord.name)} · ${escapeHtml(syncedActivePlan.name)} · ${plansForProfile.length} plan${plansForProfile.length === 1 ? "" : "s"}</span>
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
            <details class="rp-inspector-details">
              <summary>
                <span>Constraints and quick controls</span>
                <span class="rp-manage-summary">Policy status and shortcuts</span>
              </summary>
              <div class="rp-stack">
                <details class="rp-inspector-details">
                  <summary>Policy status</summary>
                  ${renderPolicyStatus(activeBundle.result.constraints)}
                </details>
                <details class="rp-inspector-details">
                  <summary>Quick controls</summary>
                  ${renderConvenience()}
                </details>
              </div>
            </details>
          </section>
        </div>
      </section>

      <section class="rp-card rp-topline-stack">
        <div class="rp-page-section-header rp-page-section-inline">
          <div class="rp-page-section-kicker">Outputs</div>
          <div class="rp-page-section-note">Decision metrics, charts, recommendations, and concrete consequences.</div>
        </div>
        <div class="rp-card-body">
          <div class="rp-summary-grid">
            ${renderSummary(activeBundle)}
          </div>
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
}

function renderBanner(profileRecord: ProfileRecord, plan: PlanData): string {
  const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  return `
    <section class="rp-status-strip" aria-label="Planner status">
      <div class="rp-status-line">
        <strong>${escapeHtml(profileRecord.name)} / ${escapeHtml(plan.name)}</strong>
        <span>Local only</span>
        <span>Autosaved ${now}</span>
      </div>
    </section>
  `;
}

function renderProfiles(activeProfileId: string): string {
  return requireState().profiles.map((profile) => `
    <div class="rp-profile-row">
      <div class="rp-action-top rp-compact-top">
        <div class="rp-compact-copy">
          <strong>${profile.name}</strong>
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
  const payload = buildStructuredPayload(profileRecord, plan, bundle.result);
  const diffPrompt = comparisonBundle ? buildDiffPrompt(profileRecord, plan, bundle.result, comparisonBundle.plan, comparisonBundle.result) : "";
  return `
    <div class="rp-field">
      <label>AI mode</label>
      <select class="rp-select" data-field="ui.aiMode">
        ${AI_MODES.map((mode) => `<option value="${mode.id}" ${requireState().ui.aiMode === mode.id ? "selected" : ""}>${mode.label}</option>`).join("")}
      </select>
      <div class="rp-help">Browser AI available: ${aiCaps.browser ? "Yes" : "No"} · API mode is user-supplied · ChatGPT/Claude work as handoff flows.</div>
    </div>
    <div class="rp-flex">
      <button class="rp-btn soft" data-ai-open="chatgpt">Open in ChatGPT</button>
      <button class="rp-btn soft" data-ai-open="claude">Open in Claude</button>
      <button class="rp-btn soft" data-copy-prompt="true">Copy expert prompt</button>
      <button class="rp-btn soft" data-copy-brief="actuary">Copy actuary brief</button>
      <button class="rp-btn soft" data-copy-brief="doctor">Copy doctor brief</button>
      <button class="rp-btn soft" data-copy-brief="planner">Copy planner brief</button>
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

function renderConvenience(): string {
  const blocks = Object.entries(QUICK_ACTIONS).map(([key, items]) => `
    <div class="rp-field">
      <label>${key}</label>
      <div class="rp-flex">${items.map((item) => `<button class="rp-btn soft" data-convenience="${item.id}">${item.label}</button>`).join("")}</div>
    </div>
  `);
  return `<div class="rp-section-stack">${blocks.join("")}</div>`;
}

function renderSummary(bundle: PlanBundle): string {
  const first = bundle.result.rows[0] ?? bundle.result.rows.at(-1);
  if (!first) return "";
  const cards = [
    ["CPF LIFE start", `${currency.format(bundle.result.cpfInitialPayout)}/m`, `${bundle.plan.cpfPlan} plan, observed-calibrated if anchor exists.`],
    ["Median death age", bundle.result.medianAge.toFixed(1), `Modal ${bundle.result.modalAge.toFixed(1)} · p90 ${bundle.result.p90Age.toFixed(1)}`],
    ["Balanced buffer", currency.format(first.emergencyBalanced), `Recommended reserve based on basic spend and age-conditional medical EV.`],
    ["Medical cash / yr", currency.format(first.medicalCash), `Out-of-pocket after insurer and Medisave contributions.`],
    ["Family tax saved / yr", currency.format(first.taxSavingsAnnual), `Estimated based on modeled allowed child top-ups and marginal rates.`],
    ["Estate at median", currency.format(lookupByAge(bundle.result.rows, bundle.result.medianAge)?.estateEquivalent || 0), `Estate-equivalent balance near median life expectancy.`],
  ];
  return cards.map(([title, value, note]) => `
    <div class="rp-summary-card">
      <h3>${title}</h3>
      <strong>${value}</strong>
      <p>${note}</p>
    </div>
  `).join("");
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
  return `
    <div class="rp-form-grid three">
      ${field("Name", `<input class="rp-input" data-profile-field="name" value="${escapeAttr(profileRecord.name)}">`)}
      ${field("Birth date", `<input class="rp-input" type="date" data-profile-field="birthDate" value="${escapeAttr(p.birthDate)}">`)}
      ${field("Sex", select("profile.sex", p.sex, [["female", "Female"], ["male", "Male"]]))}
      ${field("Bank / cash", numberInput("profile.bankCash", p.bankCash))}
      ${field("OA", numberInput("profile.oa", p.oa))}
      ${field("SA", numberInput("profile.sa", p.sa))}
      ${field("RA", numberInput("profile.ra", p.ra), `ERS room ${currency.format(constraints.remainingErsRoom)}`)}
      ${field("MA", numberInput("profile.ma", p.ma), `BHS ${currency.format(constraints.bhs)}`)}
      ${field("Policy year", numberInput("profile.cpfCohortYear", p.cpfCohortYear), "Defaults to the current browser year unless explicitly overridden.")}
      ${field("CPF investments", numberInput("profile.cpfInvestments", p.cpfInvestments))}
      ${field("Observed CPF payout", numberInput("profile.observedCpfPayout", p.observedCpfPayout), "Used as a calibration anchor when plan matches.")}
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
      ${field("Chronic conditions", searchableMultiSelect("profile.chronicConditions", p.chronicConditions || [], SUPPORTED_DISEASES.map((item) => [item.key, `${item.label} · ${item.category}`])), "Normalized disease list used by mortality and medical models.")}
      ${field("Prior serious conditions", searchableMultiSelect("profile.priorSeriousConditions", p.priorSeriousConditions || [], SUPPORTED_DISEASES.map((item) => [item.key, `${item.label} · ${item.category}`])), "Forward-looking disease history. Use canonical entries instead of free text.")}
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
      ${field("Equity allocation %", numberInput("plan.equityAllocationPct", plan.equityAllocationPct))}
      ${field("Fixed income %", numberInput("plan.fixedIncomeAllocationPct", plan.fixedIncomeAllocationPct))}
      ${field("Child support strategy", select("plan.childSupportStrategy", plan.childSupportStrategy, [["tax-efficient", "Tax-efficient"], ["payout-efficient", "Payout-efficient"], ["split-evenly", "Split evenly"]]))}
    </div>
    <div class="rp-details">
      ${validation.issues.length ? validation.issues.map((item) => `<div class="rp-constraint">${item}</div>`).join("") : `<div class="rp-help">Hard CPF constraints are currently satisfied.</div>`}
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
    <div class="rp-action">
      <div class="rp-action-top">
        <div>
          <strong>${item.title}</strong>
          <div class="rp-card-subtitle">${item.tag} · ${item.risk} risk · ${item.confidence} confidence</div>
        </div>
        <span class="rp-chip">${item.tag}</span>
      </div>
      <div>${item.why}</div>
      <div class="rp-action-metrics">
        ${metric("Shortfall reduction", currency.format(item.shortfallReduction || 0))}
        ${metric("Liquidity impact", currency.format(item.liquidityImpact || 0))}
        ${metric("Estate impact", currency.format(item.estateImpact || 0))}
        ${metric("Confidence", item.confidence)}
      </div>
    </div>
  `).join("");
}

function renderPolicyStatus(constraints: ConstraintSet): string {
  return `
    <div class="rp-mini-list">
      <div class="rp-mini-item"><span>Policy year</span><strong>${constraints.year}</strong></div>
      <div class="rp-mini-item"><span>Remaining ERS room</span><strong>${currency.format(constraints.remainingErsRoom)}</strong></div>
      <div class="rp-mini-item"><span>BHS</span><strong>${currency.format(constraints.bhs)}</strong></div>
      <div class="rp-mini-item"><span>FRS</span><strong>${currency.format(constraints.frs)}</strong></div>
      <div class="rp-mini-item"><span>ERS</span><strong>${currency.format(constraints.ers)}</strong></div>
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
  return getChartDefinitions(bundle).map(({ id, title, takeaway, series }) => `
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
          <tr>${columns.map((column) => `<th>${column}</th>`).join("")}</tr>
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
  app.querySelector("[data-action='export-json']")?.addEventListener("click", () => exportJson());

  app.querySelectorAll<HTMLButtonElement>("[data-appendix]").forEach((button) => button.addEventListener("click", async () => {
    if (!state) return;
    state.ui.appendixPreset = (button.dataset.appendix as AppendixPreset | undefined) ?? state.ui.appendixPreset;
    await persist();
  }));

  app.querySelectorAll<HTMLButtonElement>("[data-ai-open]").forEach((button) => button.addEventListener("click", () => {
    if (!state) return;
    openHandoff(button.dataset.aiOpen, buildHandoffPrompt(getActiveProfile(state), getActivePlan(state), activeBundle.result));
  }));

  app.querySelector("[data-copy-prompt='true']")?.addEventListener("click", async () => {
    if (!state) return;
    await navigator.clipboard.writeText(buildHandoffPrompt(getActiveProfile(state), getActivePlan(state), activeBundle.result));
  });

  app.querySelectorAll<HTMLButtonElement>("[data-copy-brief]").forEach((button) => button.addEventListener("click", async () => {
    if (!state) return;
    const audience = button.dataset.copyBrief as Parameters<typeof buildAudienceBrief>[0] | undefined;
    if (!audience) return;
    await navigator.clipboard.writeText(buildAudienceBrief(audience, getActiveProfile(state), getActivePlan(state), activeBundle.result));
  }));

  app.querySelector("[data-copy-payload='true']")?.addEventListener("click", async () => {
    if (!state) return;
    await navigator.clipboard.writeText(buildStructuredPayload(getActiveProfile(state), getActivePlan(state), activeBundle.result));
  });

  app.querySelector("[data-copy-diff='true']")?.addEventListener("click", async () => {
    if (!state || !comparisonBundle) return;
    await navigator.clipboard.writeText(buildDiffPrompt(getActiveProfile(state), getActivePlan(state), activeBundle.result, comparisonBundle.plan, comparisonBundle.result));
  });

  app.querySelectorAll<HTMLSelectElement>("[data-field='ui.aiMode']").forEach((select) => select.addEventListener("change", async () => {
    if (!state) return;
    state.ui.aiMode = select.value as AppState["ui"]["aiMode"];
    await persist();
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
    applyConvenience(button.dataset.convenience);
    syncActivePlanConstraints(state);
    await persist();
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
      const matches = !query || rawLabel.toLowerCase().includes(query);
      option.hidden = !matches;
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
}

function applyConvenience(id: string | undefined): void {
  if (!state) return;
  const profile = getActiveProfile(state).profile;
  const plan = getActivePlan(state);
  const constraints = getCpfConstraints(profile, plan);
  switch (id) {
    case "max-topup":
    case "remaining-ers":
      plan.oneOffTopup = constraints.remainingErsRoom;
      break;
    case "basic-gap": {
      const bundle = runPlan(profile, plan);
      const firstRow = bundle.rows[0];
      if (!firstRow) break;
      const gap = Math.max(0, firstRow.basicSpendAnnual - firstRow.grossIncomeAnnual);
      plan.oneOffTopup = Math.min(constraints.remainingErsRoom, gap * 4);
      break;
    }
    case "discretionary-gap": {
      const bundle = runPlan(profile, plan);
      const firstRow = bundle.rows[0];
      if (!firstRow) break;
      const gap = Math.max(0, firstRow.totalSpendAnnual - firstRow.grossIncomeAnnual);
      plan.oneOffTopup = Math.min(constraints.remainingErsRoom, gap * 4);
      break;
    }
    case "ma-cap":
      profile.ma = constraints.bhs;
      break;
    case "tax-efficient":
      plan.childSupportStrategy = "tax-efficient";
      break;
    case "payout-efficient":
      plan.childSupportStrategy = "payout-efficient";
      break;
    case "split-evenly":
      plan.childSupportStrategy = "split-evenly";
      break;
    case "public":
      profile.insurance.carePreference = "public";
      plan.careSetting = "public";
      break;
    case "private":
      profile.insurance.carePreference = "private";
      plan.careSetting = "private";
      break;
    case "insured":
      plan.medicalScenario = "insurance-default";
      break;
    case "downside":
      plan.medicalScenario = "conservative-downside";
      break;
    case "buffer-min":
      plan.emergencyStyle = "minimum";
      break;
    case "buffer-balanced":
      plan.emergencyStyle = "balanced";
      break;
    case "buffer-conservative":
      plan.emergencyStyle = "conservative";
      break;
    default:
      break;
  }
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
  if (/Cash|oa|ra|ma|Spend|Annual|Pct|Age|Support|Topup|payout|weight|height|Income|amount/i.test(path)) {
    return Number(Array.isArray(value) ? value[0] || 0 : value || 0);
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

function field(label: string, control: string, help = ""): string {
  return `
    <div class="rp-field">
      <label class="rp-field-label">
        <span>${label}</span>
        ${help ? `<button class="rp-field-hint" type="button" aria-label="${escapeAttr(help)}" title="${escapeAttr(help)}">?</button>` : ""}
      </label>
      ${control}
    </div>
  `;
}

function numberInput(path: string, value: number): string {
  return `<input class="rp-input" type="number" data-${path.startsWith("plan.") ? "plan" : "profile"}-field="${path}" value="${value ?? 0}">`;
}

function select(path: string, current: string | number | boolean, entries: Array<[string, string]>): string {
  return `<select class="rp-select" data-${path.startsWith("plan.") ? "plan" : "profile"}-field="${path}">${entries.map(([value, label]) => `<option value="${value}" ${String(current) === String(value) ? "selected" : ""}>${label}</option>`).join("")}</select>`;
}

function searchableMultiSelect(path: string, current: string[], entries: Array<[string, string]>, help = ""): string {
  const hint = help ? ` title="${escapeAttr(help)}"` : "";
  const selected = entries.filter(([value]) => current.includes(value));
  const chips = selected.length
    ? selected.map(([value, label]) => `<span class="rp-token-chip">${escapeHtml(label)}<button type="button" class="rp-token-remove" data-token-remove="${path}" data-token-value="${escapeAttr(value)}" aria-label="Remove ${escapeAttr(label)}">×</button></span>`).join("")
    : `<span class="rp-token-empty">No conditions selected</span>`;
  return `
    <div class="rp-token-picker" data-multiselect-root="${path}"${hint}>
      <div class="rp-token-list">${chips}</div>
      <input class="rp-input rp-token-search" type="search" placeholder="Search conditions" data-multiselect-search="${path}">
      <div class="rp-token-options">
        ${entries.map(([value, label]) => `
          <label class="rp-token-option" data-token-option>
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
