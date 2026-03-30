import { AI_MODES, APPENDIX_PRESETS, QUICK_ACTIONS } from "./constants.js";
import { loadState, saveState, wipeState } from "./storage.js";
import { createProfile, duplicateProfile, deleteProfile } from "./profile-manager.js";
import { createPlan, duplicatePlan, deletePlan } from "./plan-manager.js";
import { getActiveProfile, getActivePlan, getPlansForProfile } from "./state.js";
import { validatePlan, getCpfConstraints, normalizePlanToConstraints } from "./policy/cpf-validation.js";
import { runPlan } from "./models/cashflow.js";
import { buildSensitivityDiagnostics, computeRecommendations } from "./models/optimizer.js";
import { buildExpertReview, buildPlanDiffSummary, summarizePanel } from "./models/recommendations.js";
import { buildAppendixRows } from "./models/appendix-ledger.js";
import { renderChart } from "./ui/charts.js";
import { buildAudienceBrief, buildDiffPrompt, buildHandoffPrompt, buildStructuredPayload, detectAiCapabilities, openHandoff } from "./ai/provider.js";
import { UNIFIED_INSURANCE_DB } from "./data/insurance-db.js";
const currency = new Intl.NumberFormat("en-SG", { style: "currency", currency: "SGD", maximumFractionDigits: 0 });
const percent = new Intl.NumberFormat("en-SG", { style: "percent", maximumFractionDigits: 0 });
let state = null;
let aiCaps = { browser: false, api: true, chatgpt: true, claude: true };
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
    aiCaps = await detectAiCapabilities();
    render();
}
function render() {
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
    const sensitivities = buildSensitivityDiagnostics(profile, activeBundle.plan, activeBundle.result);
    const expertReview = buildExpertReview(syncedProfileRecord, activeBundle.plan, activeBundle.result, activeBundle.recommendations, sensitivities);
    const diffSummary = buildPlanDiffSummary(activeBundle, comparisonBundle);
    app.innerHTML = `
    <div class="rp-app">
      ${renderBanner(syncedProfileRecord, syncedActivePlan)}

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
          <div class="rp-card">
            <div class="rp-card-header">
              <div>
                <div class="rp-card-title">Constraints and quick controls</div>
              </div>
            </div>
            <div class="rp-card-body rp-stack">
              <details class="rp-inspector-details">
                <summary>Policy status</summary>
                ${renderPolicyStatus(activeBundle.result.constraints)}
              </details>
              <details class="rp-inspector-details">
                <summary>Quick controls</summary>
                ${renderConvenience()}
              </details>
            </div>
          </div>
        </div>
      </section>

      <section class="rp-card rp-topline-stack">
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

      <section class="rp-card">
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
      </section>

      <section class="rp-inspector-grid">
        ${renderExpertInspector(expertReview, sensitivities, diffSummary, comparisonBundle)}
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
    </div>
  `;
    bindActions(planResults, activeBundle, comparisonBundle);
    paintCharts(activeBundle);
}
function renderBanner(profileRecord, plan) {
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
function renderProfiles(activeProfileId) {
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
function renderExpertInspector(expertReview, sensitivities, diffSummary, comparisonBundle) {
    return `
    <div class="rp-card">
      <div class="rp-card-header">
        <div>
          <div class="rp-card-title">Expert inspector</div>
        </div>
      </div>
      <div class="rp-card-body rp-stack">
        <details class="rp-inspector-details">
          <summary>Assumptions and findings</summary>
          <div class="rp-insights-list">
            ${expertReview.assumptions.map((item) => `<div class="rp-insight"><strong>Assumption</strong><div>${escapeHtml(item)}</div></div>`).join("")}
            ${expertReview.findings.map((item) => `<div class="rp-insight"><strong>Finding</strong><div>${escapeHtml(item)}</div></div>`).join("")}
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
function renderProfileForm(profileRecord, plan, constraints) {
    void plan;
    const p = profileRecord.profile;
    const insurerMap = UNIFIED_INSURANCE_DB.insurers;
    const providerOptions = Object.keys(insurerMap).map((provider) => [provider, provider]);
    const selectedProvider = insurerMap[p.insurance.shieldProvider] ? p.insurance.shieldProvider : (providerOptions[0]?.[0] ?? "");
    const planOptions = Object.keys(insurerMap[selectedProvider]?.plans ?? {}).map((label) => [label, label]);
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
      ${field("Exercise", select("profile.exerciseLevel", p.exerciseLevel, [["low", "Low"], ["moderate", "Moderate"], ["high", "High"]]))}
      ${field("Self-rated health", select("profile.selfRatedHealth", p.selfRatedHealth, [["poor", "Poor"], ["fair", "Fair"], ["good", "Good"]]))}
      ${field("Frailty", select("profile.frailty", p.frailty, [["robust", "Robust"], ["prefrail", "Prefrail"], ["frail", "Frail"]]))}
      ${field("Care preference", select("profile.insurance.carePreference", p.insurance.carePreference, [["public", "Public"], ["mixed", "Mixed"], ["private", "Private"]]))}
      ${field("Shield provider", select("profile.insurance.shieldProvider", selectedProvider, providerOptions))}
      ${field("Shield plan", select("profile.insurance.shieldPlan", p.insurance.shieldPlan, planOptions))}
      ${field("Rider", select("profile.insurance.rider", String(p.insurance.rider), [["true", "Yes"], ["false", "No"]]))}
      ${field("Chronic conditions", `<textarea class="rp-textarea" data-profile-field="chronicConditions">${escapeHtml((p.chronicConditions || []).join(", "))}</textarea>`, "Comma-separated. This drives actuarial and medical event priors.")}
      ${field("Prior serious conditions", `<textarea class="rp-textarea" data-profile-field="priorSeriousConditions">${escapeHtml((p.priorSeriousConditions || []).join(", "))}</textarea>`, "E.g. breast-cancer, stroke. Forward-looking risk input, not just history.")}
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
      ${field("Equity allocation %", numberInput("plan.equityAllocationPct", plan.equityAllocationPct))}
      ${field("Fixed income %", numberInput("plan.fixedIncomeAllocationPct", plan.fixedIncomeAllocationPct))}
      ${field("Child support strategy", select("plan.childSupportStrategy", plan.childSupportStrategy, [["tax-efficient", "Tax-efficient"], ["payout-efficient", "Payout-efficient"], ["split-evenly", "Split evenly"]]))}
    </div>
    <div class="rp-details">
      ${validation.issues.length ? validation.issues.map((item) => `<div class="rp-constraint">${item}</div>`).join("") : `<div class="rp-help">Hard CPF constraints are currently satisfied.</div>`}
    </div>
  `;
}
function renderMedicalLifestyle(bundle) {
    const first = bundle.result.rows[0] ?? bundle.result.rows.at(-1);
    if (!first)
        return "";
    const sourcesCount = UNIFIED_INSURANCE_DB.sources.length;
    const providerCount = Object.keys(UNIFIED_INSURANCE_DB.insurers).length;
    return `
    <details class="rp-inspector-details">
      <summary>Medical, buffers, and lifestyle</summary>
      <div class="rp-medical-grid">
        <div class="rp-mini-list">
          <div class="rp-mini-item"><span>Expected medical gross</span><strong>${currency.format(first.medicalGross)}</strong></div>
          <div class="rp-mini-item"><span>Insurer paid</span><strong>${currency.format(first.insurerPaid)}</strong></div>
          <div class="rp-mini-item"><span>Medisave paid</span><strong>${currency.format(first.medisavePaid)}</strong></div>
          <div class="rp-mini-item"><span>Cash out-of-pocket</span><strong>${currency.format(first.medicalCash)}</strong></div>
          <div class="rp-mini-item"><span>Recommended balanced emergency buffer</span><strong>${currency.format(first.emergencyBalanced)}</strong></div>
          <div class="rp-mini-item"><span>Local insurance DB coverage</span><strong>${providerCount} insurers · ${sourcesCount} source links</strong></div>
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
function renderActions(actions) {
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
function renderPolicyStatus(constraints) {
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
      <div class="rp-chart-stage"><canvas id="chart-${id}" width="760" height="360"></canvas></div>
    </div>
  `).join("");
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
    app.querySelector("[data-action='export-json']")?.addEventListener("click", () => exportJson());
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
    app.querySelector("[data-copy-prompt='true']")?.addEventListener("click", async () => {
        if (!state)
            return;
        await navigator.clipboard.writeText(buildHandoffPrompt(getActiveProfile(state), getActivePlan(state), activeBundle.result));
    });
    app.querySelectorAll("[data-copy-brief]").forEach((button) => button.addEventListener("click", async () => {
        if (!state)
            return;
        const audience = button.dataset.copyBrief;
        if (!audience)
            return;
        await navigator.clipboard.writeText(buildAudienceBrief(audience, getActiveProfile(state), getActivePlan(state), activeBundle.result));
    }));
    app.querySelector("[data-copy-payload='true']")?.addEventListener("click", async () => {
        if (!state)
            return;
        await navigator.clipboard.writeText(buildStructuredPayload(getActiveProfile(state), getActivePlan(state), activeBundle.result));
    });
    app.querySelector("[data-copy-diff='true']")?.addEventListener("click", async () => {
        if (!state || !comparisonBundle)
            return;
        await navigator.clipboard.writeText(buildDiffPrompt(getActiveProfile(state), getActivePlan(state), activeBundle.result, comparisonBundle.plan, comparisonBundle.result));
    });
    app.querySelectorAll("[data-field='ui.aiMode']").forEach((select) => select.addEventListener("change", async () => {
        if (!state)
            return;
        state.ui.aiMode = select.value;
        await persist();
    }));
    app.querySelectorAll("[data-profile-field]").forEach((input) => input.addEventListener("change", async () => {
        if (!state)
            return;
        updateProfileField(getActiveProfile(state), input.dataset.profileField ?? "", input.value);
        syncActivePlanConstraints(state);
        await persist();
    }));
    app.querySelectorAll("[data-plan-field]").forEach((input) => input.addEventListener("change", async () => {
        if (!state)
            return;
        updatePlanField(getActivePlan(state), input.dataset.planField ?? "", input.value);
        syncActivePlanConstraints(state);
        await persist();
    }));
    app.querySelectorAll("[data-convenience]").forEach((button) => button.addEventListener("click", async () => {
        if (!state)
            return;
        applyConvenience(button.dataset.convenience);
        syncActivePlanConstraints(state);
        await persist();
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
}
function applyConvenience(id) {
    if (!state)
        return;
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
            if (!firstRow)
                break;
            const gap = Math.max(0, firstRow.basicSpendAnnual - firstRow.grossIncomeAnnual);
            plan.oneOffTopup = Math.min(constraints.remainingErsRoom, gap * 4);
            break;
        }
        case "discretionary-gap": {
            const bundle = runPlan(profile, plan);
            const firstRow = bundle.rows[0];
            if (!firstRow)
                break;
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
        profileRecord.name = rawValue;
        return;
    }
    const target = profileRecord.profile;
    assignPath(target, path.replace(/^profile\./, ""), normalizeValue(path, rawValue));
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
function normalizeValue(path, value) {
    if (["profile.chronicConditions", "profile.priorSeriousConditions"].includes(path)) {
        return String(value).split(",").map((item) => item.trim()).filter(Boolean);
    }
    if (["profile.insurance.rider"].includes(path))
        return value === "true";
    if (/Cash|oa|ra|ma|Spend|Annual|Pct|Age|Support|Topup|payout|weight|height|Income|amount/i.test(path)) {
        return Number(value || 0);
    }
    return value;
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
function field(label, control, help = "") {
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
function numberInput(path, value) {
    return `<input class="rp-input" type="number" data-${path.startsWith("plan.") ? "plan" : "profile"}-field="${path}" value="${value ?? 0}">`;
}
function select(path, current, entries) {
    return `<select class="rp-select" data-${path.startsWith("plan.") ? "plan" : "profile"}-field="${path}">${entries.map(([value, label]) => `<option value="${value}" ${String(current) === String(value) ? "selected" : ""}>${label}</option>`).join("")}</select>`;
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
