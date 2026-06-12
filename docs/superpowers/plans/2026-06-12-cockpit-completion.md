# Cockpit Completion Plan (language toggle, decision rail + ritual, model fixes, re-skin)

> **For agentic workers:** execute task-by-task with reviewer gates. This plan is contract-level: it fixes interfaces, behaviors, and verification gates; implementers adapt code to the existing conventions in app.ts (innerHTML templates, data-plan-field bindings, persist()→render() cycle). No per-task commits — team lead commits once at the end.

**Spec:** `docs/superpowers/specs/2026-06-11-retirement-cockpit-redesign-design.md`
**Verification gate for every task:** `npm run typecheck:retirement-planning && npm run build:retirement-planning && npm run verify:retirement-futures && npm run verify:retirement-planning` all green.

---

### Task 1: Language toggle — no more mixed-language strings

Contract:
- `type Lang = "zh" | "en"`. `getLang(): Lang` reads localStorage `rp-lang`, default `"zh"`. `setLang(lang)` writes it and calls `render()`.
- Helper `t(zh: string, en: string): string` returns by current lang.
- A small pill toggle `中文 | EN` rendered in: the onboarding card (top-right of `.rp-onb-card`) and the cockpit outputs header (`#rp-outputs` header row). Clicking switches instantly.
- Convert ALL user-facing strings in the NEW surfaces to single-language via `t()`: onboarding (questions, options, hints, buttons, skip, sharpness label), futures topline (hero, legend, play button, fan caption, slider label, delta callout, chips), the "你的退休图 Your picture" section header, and the "资料与设置 Profile & settings" fold summary. No line may contain both languages anymore (CPF LIFE, RA, $ amounts are proper nouns/numbers and stay).
- Legacy expert sections (forms, charts, appendix) remain English in both modes — they are the expert layer; note this in a code comment.
- The zh copy must use CPF's official Chinese terms (公积金终身入息计划 for CPF LIFE where written out; 标准/递增/基本计划).

Verify: build green; with `rp-lang=zh` the topline contains no English sentence fragments (grep rendered template literals); toggle re-renders without console errors.

### Task 2: Model fix — bank must drain with consumption

Today `cpf-ledger.ts` reduces bank only by top-ups; consumption never hits the balance, so deterministic `liquidAssets`/`estateEquivalent` overstate and legacy charts contradict the futures fan.

Contract:
- In `runPlan()` (cashflow.ts), thread cumulative net cashflow into the rows: year y's displayed `bank`/`liquidAssets`/`estateEquivalent` reflect prior years' `netAnnual` accumulation (year 0 unadjusted; year y adds Σ netAnnual[0..y-1]). Bank may go negative — do not clamp (honesty), but add `liquidAssets` floor handling consistent with current row semantics.
- `simulateFutures` then anchors each path on the (now-draining) deterministic `row.liquidAssets` plus accumulated stochastic deltas only: `pathLiquid[y] = row.liquidAssets + Σ((medicalCash−medicalDraw) + marketDelta)[0..y]` — the deterministic path already nets out expected `medicalCash`, so the correction REPLACES it with the drawn cost; a shock (draw > expected) must LOWER liquid. (Sign corrected 2026-06-12 after reviewer2 proved the inverted form raised liquid on uninsured profiles.) Remove the engine's own income−spend drain (no double counting). Update verify-futures assertions accordingly (determinism, bands ordering, ok+red=paths all still hold; add: with zero-variance draws the median band ≈ deterministic liquidAssets within rounding).
- Update any verify.mjs expectation this breaks, preserving each test's intent.

Verify: all four checks green; new assertion comparing band p50 at year 0 ≈ rows[0].liquidAssets.

### Task 3: Model fix — reconcile the two mortality models

`result.medianAge` (≈88.8, `base/riskMultiplier`) vs survival column median (≈77, `survival ** riskMultiplier`) diverge ~12y. For a 64-year-old SG female, official life tables put median death ≈ 87–90, so the survival column is the suspect.

Contract:
- Diagnose root cause in `mortality-baseline.ts` / cashflow.ts:45 (suspects: qx table values, cumulative-survival construction, exponent semantics of riskMultiplier, row-index→age alignment at cashflow.ts:30).
- Fix so the survival column's median (first age where survival ≤ 0.5) lands within ±2y of `getBaseRemainingYears`-implied median for a riskMultiplier=1 profile, and risk multipliers shift it sensibly (multiplier 1.3 → roughly 2–4y earlier, not 12).
- Then derive `medianAge`/`p75Age`/`p90Age`/`modalAge` FROM the survival column (survival ≤ 0.5 / 0.25 / 0.10; modal = max yearly death probability) so there is one mortality model. Keep `remainingYears` = medianAge − currentAge.
- Update the KNOWN DIVERGENCE comment in futures.ts to record the resolution. Update verify-futures' survival-median assertion (it should now ALSO be within ~3y of medianAge — add that back as a cross-check).

Verify: all four checks green; print the default profile's new medianAge in the task handoff message (expect ~85–90).

### Task 4: Decision rail — four cards, interrelations, zoom ritual

Replace the single slider block with a decision rail of 4 cards (new section directly under the futures topline, full width; cards stack on mobile, 2×2 on desktop):

1. **几岁开始领** — the existing 65–70 slider + delta callout (move here).
2. **选哪个计划** — three selectable tiles (标准/递增/基本) bound to `plan.cpfPlan` via the existing data-plan-field convention; each tile shows that plan's initial monthly payout (`computeCpfLifeInitial(profile, {...plan, cpfPlan: x})`) and a tiny shape sparkline (flat/rising/falling SVG). Below: 🔒 reversibility note (30-day finality, 一道门).
3. **锁定多少进 RA** — slider 0 → min(remainingErsRoom, bank cash) step $10k bound to `plan.oneOffTopup`; delta callout recomputed like the age slider (okOf100 change + payout change).
4. **每月生活费** — slider around basicSpendMonthly ($800–$6,000 step $100) bound to the profile field using the existing profile-field binding convention; subtitle shows the lifestyle equivalent from `buildLifestyleEquivalents`.

Each card has a ⟂ interrelation chip naming which other card it pulls on (age↔lock liquidity; plan↔spending level). All copy through `t()`.

**Zoom ritual:** each card title row has a 深入看 chevron expanding (details element) a per-decision ritual computed from the engine:
- 外面看 outside view: icon-mini-array sentence — "100 个像您一样的{女性/男性}（{age} 岁）：约 {n85} 个活过 85" from `buildBaselineSurvival` (riskMultiplier=1 base rate).
- 里面看 named nudges: list the profile factors currently moving her riskMultiplier (smoking/self-rated health/chronic conditions/interventions), each with direction (+/−), from the inputs to `computeRiskMultiplier` (qualitative labels fine; no invented numbers).
- 预演失败 premortem: top red-future causes from `bundle.futures.redFutures` grouped by cause with counts and typical breach age, each with its one-line mitigation (medical → insurance review; market → buffer; longevity → defer/lock more).
- 决定/暂放: two buttons — 就这样决定 (toast 已记录·随时可改 or, for plan choice, a confirm step restating 30-day finality before the toast) and 先放着 (stores a revisit note in localStorage, shows date chip).

Verify: four checks green; in the browser every slider/tile updates hero+dots+fan+deltas together (one linked state) with no console errors; ritual sections populate from engine data.

### Task 5: Fold the legacy expert layer away (glass box) + re-skin

The old English expert surfaces (chart grid: Income vs spend / Asset+CPF / Survival+CPF LIFE fit / Action ladder; "Recommended next moves"; "Medical, buffers, and lifestyle" panels) must STOP appearing open on the main page. Per spec §3/§4 they are the deepest layer.

Contract:
- Wrap the chart grid section AND the panel grid section (recommended moves + medical/buffers/lifestyle) in a single collapsed `<details class="rp-inspector-details rp-expert-fold">` titled via `t("专家层 · 图表与建议", "Expert layer · charts & analysis")`, placed AFTER the decision rail, BEFORE the appendix section (which is already a fold).
- When the fold is opened, charts must paint (hook the details `toggle` event to `paintCharts(activeBundle)` — canvases inside a closed details have zero size and paint blank).
- Main page after this task = mini bar → cockpit (#rp-outputs with topline + decision rail) → 资料与设置 fold → 专家层 fold → appendix fold. Nothing else open by default.
- CSS pass on the folds + legacy cards inside: white background, hairline border `rgba(0,0,0,.07)`, same radius/shadow family as `.rp-futures`. No markup restructuring inside the legacy sections beyond the wrapper.

Verify: build green; fresh-visit full-page screenshot shows ONLY cockpit content open; opening the expert fold paints all four charts (non-zero canvas pixels); no console errors.

---

## Done means
Single-language UI per toggle (default 中文), one reconciled mortality model, draining bank consistent between ledger and futures, a four-card decision rail with working zoom rituals, harmonized visual skin — all checks green and browser-verified before the final commit.
