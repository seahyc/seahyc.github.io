# Cockpit Topline (Futures UI Shell) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax.

**Goal:** Render the futures engine in the app: a bilingual "X / 100 futures" hero with a 100-dot icon array, a fan chart with ▶ hypothetical-outcome playback, assumption chips, and a payout-age slider with a live delta callout — inserted at the top of the existing `#rp-outputs` section.

**Architecture:** Pure additions to the existing innerHTML-template render cycle (`render()` at app.ts:152 → `bindActions()` → `paintCharts()`). New `renderFuturesTopline(bundle)` returns an HTML string injected before `renderPlainEnglishSummary()`; a new `paintFuturesFan(bundle)` paints the bands canvas after `paintCharts()`. All numbers come from `bundle.futures` (Plan 1). No frameworks, no new deps.

**Tech Stack:** TypeScript (existing build), Canvas 2D, CSS custom properties added to app.css.

**Depends on:** Plan 1 (`docs/superpowers/plans/2026-06-11-futures-engine.md`) fully landed — `bundle.futures: FuturesSummary` must exist.

**Verification model:** the UI has no DOM test harness; each task gates on `npm run typecheck:retirement-planning && npm run build:retirement-planning && npm run verify:retirement-futures && npm run verify:retirement-planning`, plus grep checks on compiled output where stated. Final visual check happens at integration (team lead).

## File structure

- Modify: `static/projects/retirement-planning/app.css` — futures design tokens + topline styles (append at end; do not touch existing rules)
- Modify: `static/projects/retirement-planning/app.ts` — `renderFuturesTopline()`, `paintFuturesFan()`, HOPs playback binding, delta computation, template insertion at the `#rp-outputs` section (around line 271–283)

---

### Task 1: Futures topline styles

**Files:**
- Modify: `static/projects/retirement-planning/app.css` (append at end of file)

- [ ] **Step 1: Append the styles**

```css
/* ===== Futures topline (cockpit shell) ===== */
.rp-futures {
    --fut-tint: #0a7d6c;
    --fut-tint-soft: rgba(10, 125, 108, 0.09);
    --fut-good: #2f9e57;
    --fut-bad: #d4572e;
    display: grid;
    gap: 1rem;
    padding: 1.4rem 1.5rem;
    border-radius: 1.2rem;
    background: #ffffff;
    border: 1px solid rgba(0, 0, 0, 0.07);
    box-shadow: 0 10px 30px rgba(36, 29, 18, 0.07);
}
.rp-futures-hero {
    font-size: 2.1rem;
    font-weight: 700;
    letter-spacing: -0.02em;
    line-height: 1.25;
    color: var(--rp-ink);
}
.rp-futures-hero b { color: var(--fut-tint); font-size: 2.6rem; }
.rp-futures-hero-en { font-size: 1.05rem; color: var(--rp-muted); font-style: italic; margin-top: 0.2rem; }
.rp-futures-dots {
    display: grid;
    grid-template-columns: repeat(20, minmax(0, 1fr));
    gap: 0.3rem;
    margin: 0.4rem 0;
}
.rp-futures-dots i {
    aspect-ratio: 1;
    border-radius: 50%;
    background: var(--fut-good);
    opacity: 0;
    animation: rp-fut-pop 0.35s ease-out forwards;
}
.rp-futures-dots i.bad { background: var(--fut-bad); }
@keyframes rp-fut-pop { from { opacity: 0; transform: scale(0.2); } to { opacity: 1; transform: scale(1); } }
.rp-futures-legend { display: flex; gap: 1.2rem; font-size: 1rem; color: var(--rp-body); flex-wrap: wrap; }
.rp-futures-legend i { display: inline-block; width: 0.65rem; height: 0.65rem; border-radius: 50%; margin-right: 0.35rem; }
.rp-futures-legend i.good { background: var(--fut-good); }
.rp-futures-legend i.bad { background: var(--fut-bad); }
.rp-futures-fanwrap { position: relative; }
.rp-futures-fanwrap canvas { width: 100%; height: auto; display: block; }
.rp-futures-play {
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
    border: none;
    border-radius: 999px;
    padding: 0.55rem 1.1rem;
    background: var(--fut-tint);
    color: #fff;
    font-size: 1.02rem;
    font-weight: 600;
    cursor: pointer;
    justify-self: start;
}
.rp-futures-play:hover { filter: brightness(1.08); }
.rp-futures-chips { display: flex; flex-wrap: wrap; gap: 0.45rem; }
.rp-futures-chips span {
    font-size: 0.95rem;
    background: rgba(0, 0, 0, 0.045);
    border-radius: 999px;
    padding: 0.3rem 0.85rem;
    color: var(--rp-body);
}
.rp-futures-chips b { color: var(--rp-ink); }
.rp-futures-slider { display: grid; gap: 0.3rem; }
.rp-futures-slider label { font-size: 1.05rem; font-weight: 600; color: var(--rp-ink); }
.rp-futures-slider input[type="range"] { width: 100%; accent-color: var(--fut-tint); }
.rp-futures-ticks { display: flex; justify-content: space-between; font-size: 0.85rem; color: var(--rp-muted); }
.rp-futures-delta {
    background: var(--fut-tint-soft);
    border-radius: 0.9rem;
    padding: 0.7rem 0.95rem;
    font-size: 1.02rem;
    line-height: 1.5;
}
.rp-futures-delta b { color: var(--fut-tint); }
.rp-futures-delta .warn { color: var(--fut-bad); font-weight: 600; }
@media (max-width: 720px) {
    .rp-futures-hero { font-size: 1.6rem; }
    .rp-futures-hero b { font-size: 2rem; }
}
```

- [ ] **Step 2: Verify build is clean**

Run: `npm run typecheck:retirement-planning && npm run build:retirement-planning && npm run verify:retirement-futures && npm run verify:retirement-planning`
Expected: all pass (CSS isn't compiled by tsc; this guards against accidental file damage).

- [ ] **Step 3: Commit**

```bash
git add static/projects/retirement-planning/app.css
git commit -m "Add futures topline styles"
```

---

### Task 2: `renderFuturesTopline()` + template insertion

**Files:**
- Modify: `static/projects/retirement-planning/app.ts`

- [ ] **Step 1: Add the render function**

Place it next to `renderPlainEnglishSummary()` (app.ts:703). It computes the one-step deferral delta inline (cheap: one extra `runPlan` + `simulateFutures` per render):

```typescript
function renderFuturesTopline(bundle: PlanBundle, profile: ProfileData): string {
  const fut = bundle.futures;
  const red = fut.paths - fut.okCount;
  const redOf100 = 100 - fut.okOf100;
  const breachAges = fut.redFutures.map((f) => f.breachAge).sort((a, b) => a - b);
  const typicalBreach = breachAges.length ? breachAges[Math.floor(breachAges.length / 2)] : null;
  const dots = Array.from({ length: 100 }, (_, i) =>
    `<i class="${i < fut.okOf100 ? "" : "bad"}" style="animation-delay:${i * 12}ms"></i>`
  ).join("");

  const plan = bundle.plan;
  const candidateAge = plan.payoutStartAge >= 70 ? 69 : plan.payoutStartAge + 1;
  let deltaHtml = "";
  if (candidateAge !== plan.payoutStartAge) {
    const altPlan = { ...plan, payoutStartAge: candidateAge };
    const altResult = runPlan(profile, altPlan);
    const altFut = simulateFutures(altResult, profile, altPlan);
    const okDelta = altFut.okOf100 - fut.okOf100;
    const payoutDelta = Math.round((altResult.cpfInitialPayout - bundle.result.cpfInitialPayout));
    const altMinLiquid = Math.round(Math.min(...altFut.bands.map((b) => b.p10)));
    deltaHtml = `<div class="rp-futures-delta">如果 ${candidateAge} 岁才开始领：<b>${altFut.okOf100} / 100</b> 个未来够用（${okDelta >= 0 ? "+" : ""}${okDelta}），每月${payoutDelta >= 0 ? "多" : "少"} <b>$${Math.abs(payoutDelta)}</b>${altMinLiquid < 0 ? ` — <span class="warn">但最差情况现金跌到 $${altMinLiquid}</span>` : ""}<br><span style="font-size:.9em;color:var(--rp-muted)">If you start at ${candidateAge} instead — drag the slider to try it.</span></div>`;
  }

  const chips = [
    `基于 based on: <b>${plan.payoutStartAge} 岁开始领</b>`,
    `<b>${plan.cpfPlan === "standard" ? "标准" : plan.cpfPlan === "escalating" ? "递增" : "基本"}计划</b>`,
    `每月生活费 <b>${currency.format(profile.basicSpendMonthly)}</b>`,
    `锁定 <b>${currency.format(plan.oneOffTopup || 0)}</b>`,
  ].map((c) => `<span>${c}</span>`).join("");

  return `
    <div class="rp-futures" id="rp-futures">
      <div>
        <div class="rp-futures-hero"><b>${fut.okOf100}</b> / 100 个未来里，钱够用一辈子</div>
        <div class="rp-futures-hero-en">In ${fut.okOf100} of 100 simulated futures, your money outlives you.</div>
      </div>
      <div class="rp-futures-dots" aria-label="100 simulated futures">${dots}</div>
      <div class="rp-futures-legend">
        <span><i class="good"></i>钱够用 lasts · ${fut.okOf100}</span>
        <span><i class="bad"></i>${typicalBreach ? `约 ${typicalBreach} 岁前变紧` : "变紧"} tightens · ${redOf100}（CPF LIFE 仍月月照付 payouts never stop）</span>
      </div>
      <div class="rp-futures-fanwrap">
        <canvas id="chart-futures-fan" width="760" height="280"></canvas>
      </div>
      <button type="button" class="rp-futures-play" id="rp-futures-play">▶ 播放 100 个未来 play the futures</button>
      <div class="rp-futures-slider">
        <label>几岁开始领 CPF LIFE？ Start payouts at: <b id="rp-futures-age">${plan.payoutStartAge}</b> 岁</label>
        <input type="range" min="65" max="70" step="1" value="${plan.payoutStartAge}" id="rp-futures-age-slider">
        <div class="rp-futures-ticks"><span>65</span><span>66</span><span>67</span><span>68</span><span>69</span><span>70</span></div>
      </div>
      ${deltaHtml}
      <div class="rp-futures-chips">${chips}</div>
    </div>`;
}
```

If `currency` or `ProfileData` identifiers differ at that scope, match the conventions already used inside `renderSummary()` (app.ts:683) — `currency.format` exists there.

- [ ] **Step 2: Insert into the outputs template**

In the `render()` template (app.ts:271–283), inside `<section class="rp-card rp-topline-stack" id="rp-outputs">`, insert `${renderFuturesTopline(bundle, profile)}` immediately BEFORE the existing call to `renderPlainEnglishSummary(...)` output. Keep everything else untouched. (`bundle` and `profile` are in scope there; if names differ, use the ones the surrounding template interpolations use.)

- [ ] **Step 3: Typecheck, build, verify, grep**

Run: `npm run typecheck:retirement-planning && npm run build:retirement-planning && npm run verify:retirement-futures && npm run verify:retirement-planning`
Expected: pass.
Run: `grep -c "rp-futures-hero" static/projects/retirement-planning/app.js`
Expected: ≥1 (compiled output contains the new section).

- [ ] **Step 4: Commit**

```bash
git add static/projects/retirement-planning/app.ts static/projects/retirement-planning/app.js static/projects/retirement-planning/app.d.ts
git commit -m "Render futures topline with icon array, chips, and deferral delta"
```

---

### Task 3: Fan chart painter + HOPs playback

**Files:**
- Modify: `static/projects/retirement-planning/app.ts`

- [ ] **Step 1: Add the painter and playback**

Add near `paintCharts()` (app.ts:1452):

```typescript
let futuresPlayTimer: number | null = null;

function paintFuturesFan(bundle: PlanBundle, overlayPath?: { points: Array<{ age: number; liquid: number }>; ok: boolean }): void {
  const canvas = document.getElementById("chart-futures-fan") as HTMLCanvasElement | null;
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const bands = bundle.futures.bands;
  if (!bands.length) return;

  const w = canvas.width;
  const h = canvas.height;
  const pad = { left: 56, right: 14, top: 14, bottom: 26 };
  ctx.clearRect(0, 0, w, h);

  const ages = bands.map((b) => b.age);
  const minAge = ages[0];
  const maxAge = ages[ages.length - 1];
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
  ctx.fillText(`${minAge}岁`, pad.left, h - 8);
  ctx.fillText(`${maxAge}岁`, w - pad.right - 30, h - 8);
  ctx.fillText("存款 savings", 8, pad.top + 10);

  // p10–p90 band
  ctx.beginPath();
  bands.forEach((b, i) => (i === 0 ? ctx.moveTo(x(b.age), y(b.p90)) : ctx.lineTo(x(b.age), y(b.p90))));
  for (let i = bands.length - 1; i >= 0; i -= 1) ctx.lineTo(x(bands[i].age), y(bands[i].p10));
  ctx.closePath();
  ctx.fillStyle = "rgba(10,125,108,0.16)";
  ctx.fill();

  // median line
  ctx.beginPath();
  bands.forEach((b, i) => (i === 0 ? ctx.moveTo(x(b.age), y(b.p50)) : ctx.lineTo(x(b.age), y(b.p50))));
  ctx.strokeStyle = "#0a7d6c";
  ctx.lineWidth = 2.5;
  ctx.stroke();

  // band honesty label (spec: bands must not read as boundaries)
  ctx.fillStyle = "rgba(0,0,0,0.55)";
  ctx.fillText("100 个未来里 80 个落在绿色范围内 — 也可能落在外面", pad.left + 8, pad.top + 12);

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
      btn.textContent = "▶ 播放 100 个未来 play the futures";
      paintFuturesFan(bundle);
      return;
    }
    const paths = bundle.futures.samplePaths;
    if (!paths.length) return;
    let index = 0;
    btn.textContent = "⏸ 停 stop";
    futuresPlayTimer = window.setInterval(() => {
      paintFuturesFan(bundle, paths[index % paths.length]);
      index += 1;
      if (index >= Math.min(paths.length, 40)) {
        window.clearInterval(futuresPlayTimer as number);
        futuresPlayTimer = null;
        btn.textContent = "▶ 播放 100 个未来 play the futures";
        paintFuturesFan(bundle);
      }
    }, 450);
  });
}
```

- [ ] **Step 2: Hook into the render cycle**

In `render()` (app.ts:152), immediately after the existing `paintCharts(...)` call (line 364), add for the active bundle (same bundle variable the topline used):

```typescript
paintFuturesFan(bundle);
bindFuturesPlayback(bundle);
```

Also clear any running timer at the top of `render()` so re-renders don't leak intervals:

```typescript
if (futuresPlayTimer !== null) {
  window.clearInterval(futuresPlayTimer);
  futuresPlayTimer = null;
}
```

- [ ] **Step 3: Typecheck, build, verify**

Run: `npm run typecheck:retirement-planning && npm run build:retirement-planning && npm run verify:retirement-futures && npm run verify:retirement-planning`
Expected: pass.

- [ ] **Step 4: Commit**

```bash
git add static/projects/retirement-planning/app.ts static/projects/retirement-planning/app.js static/projects/retirement-planning/app.d.ts
git commit -m "Paint futures fan chart with hypothetical-outcome playback"
```

---

### Task 4: Payout-age slider wiring + final verification

**Files:**
- Modify: `static/projects/retirement-planning/app.ts`

- [ ] **Step 1: Wire the slider**

Find how the existing payout start age input persists its change (search `payoutStartAge` inside the render template and the change handler around app.ts:1277–1289 — there is an established convention mapping inputs to `plan.payoutStartAge`). Bind the topline slider the same way; if the convention is attribute-based, give the slider the same attributes. Fallback if the convention can't be reused directly — add an explicit listener in `bindActions()`:

```typescript
const futSlider = document.getElementById("rp-futures-age-slider") as HTMLInputElement | null;
if (futSlider) {
  futSlider.addEventListener("change", () => {
    const value = Math.min(70, Math.max(65, Number(futSlider.value)));
    activePlan.payoutStartAge = value;   // use the same plan object reference the form handler mutates
    void persist();                       // persist() saves state and re-renders (app.ts:1556)
  });
}
```

The label `#rp-futures-age` updates on re-render automatically. Use `change` (not `input`) so the full re-render only fires on release.

- [ ] **Step 2: Typecheck, build, both verify suites**

Run: `npm run typecheck:retirement-planning && npm run build:retirement-planning && npm run verify:retirement-futures && npm run verify:retirement-planning`
Expected: pass.

- [ ] **Step 3: Hugo production build**

Run: `npx hugo --gc --minify 2>&1 | tail -5` (from repo root)
Expected: builds with no errors; `public/projects/retirement-planning/index.html` exists.

- [ ] **Step 4: Compiled-output sanity greps**

Run: `grep -c "rp-futures-age-slider" static/projects/retirement-planning/app.js && grep -c "chart-futures-fan" static/projects/retirement-planning/app.js`
Expected: ≥1 each.

- [ ] **Step 5: Commit**

```bash
git add static/projects/retirement-planning/app.ts static/projects/retirement-planning/app.js static/projects/retirement-planning/app.d.ts
git commit -m "Wire payout-age slider into futures topline"
```

---

## Done means

The app renders a futures topline above the plain-English summary: hero frequency headline (中文 + English), animated 100-dot icon array, fan chart with honesty label and ▶ playback of individual sample futures, assumption chips, payout-age slider whose release re-runs the engine and updates everything together (one linked state), and a deferral delta callout. All four npm checks green; Hugo production build green.
