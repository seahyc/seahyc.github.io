# Retirement Planning OS — "安心 An Xin" Decision Cockpit Redesign

**Date:** 2026-06-11
**Status:** Approved direction (visual language + architecture validated via mockups)
**For:** seahyingcong.com/projects/retirement-planning — redesigned for YC's mom (64, Singaporean, 中文-first, phone/tablet, thinks in natural frequencies)

## 1. Problem

The current app is an expert-grade actuarial tool: a 24-field profile form, CPF jargon (OA/SA/RA/MA, ERS, BHS), a 30+ column ledger, single-path deterministic outputs, and uncertainty buried in an "Expert Inspector" panel. Mom cannot use it. The redesign must make it intuitive for her **without deleting any intelligence** — every model is kept and re-layered, and genuine uncertainty (longevity, medical shocks, markets) becomes the spine of the UX rather than a footnote.

Two reusable Claude Code skills are extracted as part of this work:
- `superforecasting` — Tetlock's forecasting craft, formalized for any decision under uncertainty
- `decision-support-ux` — the design corpus for complex-data decision tools (Tufte, Gigerenzer, Victor, Shneiderman, Hullman, Kahneman/Thaler, NN/g)

The app is the first consumer of both.

## 2. Users & usage model

- **Primary:** Mom — drives day-to-day on phone/tablet, prefers Chinese (official CPF terminology, e.g. 公积金终身入息计划 — never machine-translated register), comfortable with frequencies ("100 个里有 91 个") not percentages, money amounts vivid, jargon fatal.
- **Secondary:** YC — sets up initially, on call when stuck, uses the expert layer.
- **Decisions in scope:** everything a Singaporean retiree decides: CPF LIFE plan type + payout start age, top-ups/liquidity (incl. children's top-ups), insurance posture (Shield plan/rider, care preference, LTC), monthly lifestyle/spending level.

## 3. Architecture: four layers, one state

```
① Onboarding (gradual engagement)
        ↓
② Decision Cockpit (home — big picture + all levers, one screen)
        ↓ tap a decision
③ Zoom view (per-decision superforecaster ritual)
        ↓ tap any number
④ Glass box (provenance, full ledger, sensitivities — the entire current expert layer)
```

One global scenario state; every visible element re-renders together on any change (brushing & linking). Two visually distinct modes: **exploration is loudly consequence-free**; the few irreversible real-world actions (CPF LIFE plan choice — final 30 days after enrolment) get a one-way-door ceremony.

### ① Onboarding — "three questions, then a live picture"

- 3 questions to first render: birth year + sex; CPF balance (range buttons: <$100k / $100k–300k / >$300k / exact-entry option); monthly spending (slider with SG presets).
- Renders a live cockpit in <1 minute using labeled defaults (SG female cohort mortality, CPF LIFE Standard at 65, 3% inflation, MediShield Life baseline).
- **Sharpness meter** (the existing confidence score, promoted to first-class UI): every additional fact (health, insurance, family) visibly sharpens the picture — "加上健康状况 → 更准". Skippable at every step; no intake form.
- Every default is visibly labeled as a default with an edit affordance (an unmarked default silently becomes her decision).

### ② Decision Cockpit (home)

Single scrollable screen, three zones:

1. **Headline:** "100 个未来里，91 个钱够用" + 10×10 icon-array of futures (green = lasts, red/persimmon = tightens before age X). Dual-framed always (green AND red counts together). ▶ button plays individual futures one-by-one (hypothetical outcome plots): which year a hospital bill lands, market drop, how long she lives. Red futures honestly framed: CPF LIFE keeps paying — "failure" = lifestyle cuts, not destitution.
2. **Fan chart:** savings trajectory 64→95, frequency-labeled bands ("100 个未来里 80 个落在这范围"), explicit "can fall outside", worst-10 path drawn in the same red as the red dots. Persistent **assumption strip** (chips: 65 岁开始 · 标准计划 · 每月 $2,750 · ✏️) on every screen — recognition over recall.
3. **Decision rail:** all 4 decision cards visible together, each with: current value (big, right-aligned), inline direct-manipulation control (slider/segmented), sparkline of its effect shape, **delta callout** on change ("拖到 67 岁 → 94/100 个未来够用，每月多 $210 — 但 2027 年现金最低剩 $18k"), and **⟂ interrelation chips** pointing at the other cards it pulls on (deferral ↔ top-up liquidity, plan type ↔ spending level). Engine re-renders <100ms.

Never more than 3 alternatives at a decision point (choice overload); "compare more" behind disclosure.

### ③ Zoom view — the superforecaster ritual (per decision)

Every commit walks six steps:
1. **外面看 Outside view first** — base rate as icon array: "100 个像您一样的新加坡女性：62 个活过 85" (reference class before her specifics).
2. **里面看 Inside view** — her health/family adjustments as named, visible nudges ("不抽烟 +2 · 妈妈活到 93 +1"); never silent. (Existing mortality multiplier 0.58–2.2x, finally surfaced.)
3. **比较 Compare** — Tufte small multiples on shared scale; CPF LIFE plans framed as **monthly spending money at 70/80/90** (consumption frame, never IRR/money's-worth).
4. **预演失败 Premortem** — "想象 2036 年钱不够了——发生了什么？" Engine surfaces the 3 most common failure paths from the actual red futures, each with its mitigation (insurance answer, buffer answer).
5. **决定或暂放 Commit / Park** — reversibility labeled (🟢 随时可改 vs 🔴 30 天后定死). One-way doors get ceremony: distinct color, "cannot be undone" notice, "和孩子们一起看" share/print summary, deliberate friction. Parked decisions get a revisit date.
6. **记分 Keep score** — quarterly check-in compares past predictions vs actuals ("三个月前预测存款 $182k，实际 $179k"); the app keeps an honest calibration scoreboard of itself. Updates feed back into the sharpness meter.

"问规划师 Ask the planner" button on every zoom view = existing AI briefs (actuary/doctor/planner/family/insurance personas), answering in her language; numbers always from the engine, never from the model.

### ④ Glass box

Tap any number → provenance sheet: how it was computed, which assumptions, which sources (CPF Board rates, SG life tables — cited inline). Deepest layer = the entire current expert surface (30-column ledger, sensitivity rankings, plan diff, insurance catalog metadata) — unchanged in power, translated in language. Tufte micro/macro: detail rewards whoever leans in.

## 4. Engine changes

- **Monte Carlo layer** over the existing deterministic models: market returns, medical event timing/severity, longevity draws → N simulated futures (N=1000 internally; UI always speaks in "out of 100"). **Pinned seed**: same inputs → same numbers every visit (a headline that flickers 91→89 between visits reads as broken/dishonest).
- Existing deterministic models (CPF LIFE payouts, frailty, medical costs, buffers, family top-ups, recommendations) remain the per-path machinery inside each simulated future.
- Failure semantics: a "red future" records when money tightens, how deep, and what continues (CPF LIFE income floor) — feeding the premortem and the honest "lifestyle cuts, not destitution" framing.
- Existing localStorage/IndexedDB persistence, profiles/plans, JSON export all stay.

## 5. Visual language — Apple-grade (validated mockup: `cockpit-apple.html`)

- System type stack: SF Pro / PingFang SC (-apple-system). Hero numerals ~54pt/700/-0.035em; body ≥17px; nothing <12.5px; touch targets ≥48px; contrast ≥7:1.
- One tint (deep teal `#0a7d6c`) carries all interactivity; green/red reserved exclusively for good/bad futures; gold only for liquidity-tension warnings.
- White cards on hairlines + soft shadows, no borders; generous air; iOS-Settings-style rows with chevrons; spring-pop cascade on the futures grid.
- No gauges, no 3D, no chartjunk, no "senior mode" — one interface, full depth.
- 中文 first with English echo line beneath; official CPF Chinese terminology throughout.

## 6. What maps to what (nothing deleted)

| Current | Becomes |
|---|---|
| 24-field profile form | Onboarding (3 Qs) + sharpness-meter progressive capture |
| 6 summary cards + 3 charts | Cockpit headline + fan chart |
| Plan settings form | Decision rail + zoom views |
| Quick controls (Fill ERS room…) | Delta-callout suggestions inside zoom views |
| Expert Inspector, appendix ledger | Glass box layer |
| Confidence score | Sharpness meter |
| Sensitivity diagnostics | Premortem failure paths + ⟂ interrelation chips |
| AI briefs/handoff | 问规划师 button (engine-grounded) |
| Plan compare (2 plans) | Small-multiples compare inside zoom views |

## 7. Error handling & trust

- Engine numbers only — the AI layer may explain, never compute.
- Same inputs → same outputs (pinned seed); assumption strip everywhere; every default labeled; sources cited inline.
- Input tolerance: accept "$1,000" / "1000" / ranges; plain-language recovery, no error codes.
- Offline-first as today (browser-only, no server).

## 8. Testing

- Model layer: golden-file tests for Monte Carlo aggregation (fixed seed) + existing deterministic model invariants (CPF payout monotonicity in RA balance, ERS caps, BHS caps).
- UI: scenario snapshot tests — toggling each decision updates headline/fan/deltas coherently (no two panels on different states).
- Copy: every user-facing string has 中文 + English; CPF terms checked against CPF Board's official Chinese glossary.
- Usability gate: mom completes onboarding unaided in <3 minutes; can answer "if I start at 67 what happens" by direct manipulation.

## 9. Build order (high level)

1. Monte Carlo layer + pinned seed + futures aggregation (engine only, tested).
2. Cockpit shell: headline + icon array + fan chart + assumption strip on the new visual language.
3. Decision rail with live deltas + interrelation chips.
4. Zoom views with the six-step ritual (one decision first: payout start age).
5. Onboarding + sharpness meter.
6. One-way-door ceremony + keep-score check-ins.
7. Glass box re-skin of the expert layer.

## 10. Out of scope (this phase)

- Server-side anything; multi-user sync; push notifications (check-ins are in-app).
- Rebuilding the deterministic models (they are kept as-is).
- Native app packaging.
