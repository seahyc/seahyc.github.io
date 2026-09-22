---
title: "Mobile marketplace harvest (MobileCLI)"
description: "Reference for Marketplace Shopping."
slug: "mobile-marketplace-harvest-mobilecli"
aliases:
  - "/skills/marketplace-shopping/references/mobile/"
---

<!-- Generated from seahyc/agent-skills. Do not edit here. -->

Prefer this path for **Taobao, Shopee, and Pinduoduo** when the user has a trusted phone. Desktop web is the fallback (CAPTCHA / masked prices / risk control). AliExpress / Amazon: browser unless the user asks for the app.

Goal: give a reasonable model enough **key steps** to execute a deep sales-sorted harvest and SKU-accurate shortlist — not pixel click-paths.

## Stack

- CLI on the user's Mac: `npx --yes mobilecli@1.0.9` (pin a known-good version; prefer this over a broken local binary if Auto-review blocks installs)
- Device: real iPhone (or Android) with developer trust already set up
- iOS: MobileCLI **Device Kit** agent (not ADB); on Android, use the device bridge supported by the available mobile tooling
- Drive from the Mac that has the phone trusted (USB once, then network OK)

## Prerequisites (do once per session)

1. `npx --yes mobilecli@1.0.9 devices` — target device online
2. Phone **unlocked** (deep links and app launch fail on lock screen)
3. **Auto-Lock → Never** (Settings → Display & Brightness). Automation taps do **not** keep the screen awake
4. Note the device UDID; pass `--device "$DEV"` on every command
5. Confirm control works: `apps foreground` or a screenshot succeeds. If RPC/WDA times out, follow **Device Kit SOP** below — don't thrash Shopee/Taobao taps while the bridge is dead

## Device Kit SOP (iOS bridge)

Device Kit (`com.mobilenext.devicekit-iosUITests.xctrunner`) is an **XCTest runner**, not a normal app. Treat it as infrastructure MobileCLI starts — not something the user babysits.

**Normal path (default)**
1. Unlock phone; leave Device Kit alone (do **not** open it from the Home Screen)
2. Run any MobileCLI command that needs UI (`screenshot`, `dump ui`, `io tap`, …) — MobileCLI starts WebDriverAgent / Device Kit itself
3. Proceed with the harvest

**Do not** tell the user to open Device Kit by hand as a warm-up. SpringBoard often launches then immediately kills the xctrunner; that bounce does **not** prime the bridge.

**When the bridge is dead** (RPC timeout / “timed out waiting for WebDriverAgent”)
1. Confirm phone unlocked + Auto-Lock Never
2. From the Mac, relaunch the runner:  
   `npx --yes mobilecli@1.0.9 apps launch --device "$DEV" com.mobilenext.devicekit-iosUITests.xctrunner`
3. Retry `apps foreground` or `screenshot`
4. Only if Mac-side launch also fails: ask the user to unlock / re-trust the computer. Hand-opening Device Kit is last-ditch and usually still crashes — prefer fixing USB/network trust or reinstalling Device Kit via MobileCLI tooling
5. Pause marketplace taps until a screenshot succeeds

**One phone owner at a time** — don't run two harvests (or a harvest + another automation) against the same device in parallel.

## Command primitives

```bash
DEV=<udid>
MC='npx --yes mobilecli@1.0.9'

$MC apps foreground --device "$DEV"
$MC apps launch --device "$DEV" <bundleId>
$MC apps terminate --device "$DEV" <bundleId>   # after a crash / wedged UI
$MC dump ui --device "$DEV"                      # structured tree with refs
$MC screenshot --device "$DEV" -o /tmp/shot.png
$MC io tap --device "$DEV" '@e12'                 # ref from latest dump ui
$MC io tap --device "$DEV" 120,400                # x,y fallback
$MC io swipe --device "$DEV" x1,y1,x2,y2          # scroll: swipe up = y high→low
$MC url --device "$DEV" '<deeplink>'
```

**Interaction rules**
- Prefer `dump ui` + `@ref` taps over blind coordinates
- Avoid Dynamic Island / status bar (roughly **y ≲ 80–90**)
- After each navigation: dump or screenshot before the next decision
- One phone owner at a time — don't run two harvests against the same device in parallel

## Human-like variability (anti risk-control)

CN apps (especially **淘宝**) flag bursty, perfectly regular automation. Make MobileCLI motion look like a person browsing:

1. **Randomize timing** — never fixed `sleep 1` between every action. Use bands: micro 0.15–0.45s before a tap, short 0.7–1.8s after navigation, read 1.8–3.5s on a new SERP/PDP, and occasional think pauses 3–6s (~10–15% of scrolls).
2. **Jitter taps** — ±4–8px around the target; keep final **y ≥ ~95** (Dynamic Island). Prefer ref taps when the tree is good; jitter still applies to the resolved point.
3. **Variable swipes** — change start/end x (±30px), swipe distance, and pace each scroll. Rarely (~5–10%) do a tiny reverse scroll then continue (as if correcting overshoot).
4. **Don't thrash search** — after a captcha or risk wall, **do not** auto-resubmit search / spam deep links. Prefer: user clears captcha + lands on sales-sorted SERP, then agent only scrolls + opens PDPs.
5. **Pace PDPs** — pause to "read" after open; back out calmly; never open dozens of PDPs in a tight loop without read pauses.
6. **Captcha / slider** — hard stop for the user. Web reCAPTCHA MCPs do **not** cover in-app Taobao/Aliyun sliders; hand-clear, then resume with humanized scroll only.

Apply this to PDD/Shopee too when sessions run long — Taobao is the strictest.

## Example bundle IDs

| App | Bundle ID |
|---|---|
| Shopee SG | `com.beeasy.shopee.sg` |
| 淘宝 | `com.taobao.taobao4iphone` |
| 拼多多 | `com.xunmeng.pinduoduo` |

## Generic deep-harvest loop (all apps)

Use this loop for every platform. Depth is **inventory-driven**, not a fixed PDP count: precursor SERP until suitable listings **saturate**, then open PDPs against that set (see parent skill **Inventory depth**).

1. **Launch** the marketplace app (or deep-link into search if available)
2. Run **several queries** using the product name, brand, category terms, and relevant variant attributes
3. **Sort by sales** (销量 / Top Sales / orders) — never trust default 综合 / Best Match alone
4. **Precursor SERP pass (no PDPs yet):** scroll until saturation — **3 consecutive screens with 0 new `keep`s**, or long-tail sold floor, or ~40–60 screen hard cap. Record title / sold / headline price / keep|junk|dupe into jsonl. Union keeps across queries → `unique_suitable_keeps`
5. **PDP pass:** if N≤20 open **all** keeps; if larger, open high-sold first + diversity sample and state unverified remainder. On each:
   - Open the SKU / options sheet
   - Select the **exact variant** the user needs (such as size, colour, capacity, region, plug, or protocol)
   - Re-read **after-selection** price + shipping / GST / 集运 / ETA
   - Note any title-to-SKU mismatch where the selected option changes a material requirement or capability
   - Close the sheet / back out — **do not add to cart** until the user confirms the shortlist pick
6. **Persist** `*-harvest.jsonl` + `*-final.md` (+ screenshots) including depth stats (`queries_run`, `serp_screens`, `unique_suitable_keeps`, `saturation`, `pdps_opened`). Merge platforms in the parent skill's comparison table
7. **Hard stops:** lock screen, login/CAPTCHA, payment — hand to user. Never enter passcodes/secrets. Never place order

Headline SERP prices often belong to the cheapest accessory, smallest size, or incomplete bundle — **compare on opened variant prices**.

## Platform key steps

### Pinduoduo (拼多多)

1. Prefer deep link search (phone unlocked):  
   `pinduoduo://com.xunmeng.pinduoduo/search_result.html?search_key=<url-encoded>`
2. Tap **销量** to sort
3. Use category-specific filters when present to remove irrelevant variants
4. Scroll deep; dump UI — prices often show as `约S$` + amount on SG accounts
5. Open PDPs; select the exact requested SKU and record goods + GST/shipping (SG包邮 / 海运 / 集运仓 are common)
6. Explicitly confirm any capability-changing SKU attribute before recommending

### Shopee SG

1. `apps launch` → `com.beeasy.shopee.sg`
2. Search queries in English/Chinese as needed; sort **Top Sales** / highest sold
3. Deep SERP scroll; keep Mall / Preferred / local SG vs CN as trust + shipping signals
4. Open PDPs; select the requested variant via the options / Buy sheet, read all-in SGD + ETA, then **close** (no cart)
5. If the app crashes: `apps terminate` → relaunch → resume from last jsonl (don't restart SERP from zero unless needed)
6. If MobileCLI RPC times out during a crash spiral: fix Device Kit / WDA first, then reopen Shopee

### Taobao (淘宝)

1. Launch 淘宝; search Chinese keywords; sort **销量**
2. Deep scroll across multiple queries using the product and its important variant attributes
3. Open item pages; select the exact requested SKU, prefer the after-coupon price, and note any required accessories or compatibility constraints
4. Record shipping reality: China domestic vs 直邮新加坡 vs 集运 — all-in must include forwarder/GST when relevant
5. For visual/custom goods, still apply parent skill 图集 / 图文详情 evidence rules when those surfaces exist in-app

## Crash & bridge recovery

| Symptom | Action |
|---|---|
| Marketplace app closed / white screen | `apps terminate` + `apps launch`; continue from jsonl |
| `apps foreground` / dump UI RPC timeout | Follow **Device Kit SOP** (CLI `apps launch` of the xctrunner — not hand-open); re-check `devices`; pause harvest until a screenshot succeeds |
| Lock screen | Stop; user unlocks; confirm Auto-Lock Never; resume |
| Repeated CAPTCHA / forced login | Stop; user completes auth in-app; then resume |

## Artifacts & merge

Per platform, write under a task folder — prefer `Desktop/Agent Scratch/<task>/` (or `/tmp`). **Never** dump harvest screenshots/json on the Desktop root:

- `<platform>-<product>-harvest.jsonl` — one object per candidate (title, price, sold, rating, SKU, shipping, screenshot path, source query)
- `<platform>-<product>-final.md` — sales-aware table of keepers
- Screenshots for disputed SKUs / shipping

Then merge with other platforms using the parent skill shortlist format (all-in local currency, rating, sold, trust, shipping, variant stock) and recommend before cart.

## Cart stop

Identical to parent skill: shortlist → user yes → add exact variant to cart → user pays. Mobile does not change that boundary.
