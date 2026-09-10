---
title: "Mobile marketplace harvest (MobileCLI)"
description: "Reference for Marketplace Shopping."
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
5. Confirm control works: `apps foreground` or a screenshot succeeds. If RPC/WDA times out, restart Device Kit / re-open the MobileCLI agent on-device, then retry — don't thrash Shopee/Taobao taps while the bridge is dead

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

## Example bundle IDs

| App | Bundle ID |
|---|---|
| Shopee SG | `com.beeasy.shopee.sg` |
| 淘宝 | `com.taobao.taobao4iphone` |
| 拼多多 | `com.xunmeng.pinduoduo` |

## Generic deep-harvest loop (all apps)

Use this loop for every platform. Depth bar matches the parent skill: **exhaustive by default** (≈10–20 genuine candidates, not the first 3).

1. **Launch** the marketplace app (or deep-link into search if available)
2. Run **several queries** using the product name, brand, category terms, and relevant variant attributes
3. **Sort by sales** (销量 / Top Sales / orders) — never trust default 综合 / Best Match alone
4. **SERP pass:** scroll multiple screens; capture title, headline price, sold/rating, and variant hints into a jsonl. Filter out accessories, incomplete bundles, and bait variants that do not match the request
5. **PDP pass:** open **12–20** unique high-signal listings (volume + protocol fit). On each:
   - Open the SKU / options sheet
   - Select the **exact variant** the user needs (such as size, colour, capacity, region, plug, or protocol)
   - Re-read **after-selection** price + shipping / GST / 集运 / ETA
   - Note any title-to-SKU mismatch where the selected option changes a material requirement or capability
   - Close the sheet / back out — **do not add to cart** until the user confirms the shortlist pick
6. **Persist** `*-harvest.jsonl` + `*-final.md` (+ screenshots). Merge platforms in the parent skill's comparison table
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
| `apps foreground` / dump UI RPC timeout | Screenshot if possible; restart MobileCLI Device Kit on phone; re-check `devices`; pause harvest until bridge is healthy |
| Lock screen | Stop; user unlocks; confirm Auto-Lock Never; resume |
| Repeated CAPTCHA / forced login | Stop; user completes auth in-app; then resume |

## Artifacts & merge

Per platform, write under a known folder (e.g. Desktop or task workspace):

- `<platform>-<product>-harvest.jsonl` — one object per candidate (title, price, sold, rating, SKU, shipping, screenshot path, source query)
- `<platform>-<product>-final.md` — sales-aware table of keepers
- Screenshots for disputed SKUs / shipping

Then merge with other platforms using the parent skill shortlist format (all-in local currency, rating, sold, trust, shipping, variant stock) and recommend before cart.

## Cart stop

Identical to parent skill: shortlist → user yes → add exact variant to cart → user pays. Mobile does not change that boundary.
