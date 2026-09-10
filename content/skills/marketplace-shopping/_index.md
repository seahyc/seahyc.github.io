---
title: "Marketplace Shopping"
description: "A practical agent workflow for comparing real marketplace listings, judging seller trust, and stopping safely at the cart."
skill_bundle: true
---

<!-- Generated from seahyc/agent-skills. Do not edit here. -->

Help the user buy the *right* listing on cluttered Asian marketplaces (Taobao, Shopee, AliExpress, Pinduoduo — and Amazon when asked) where the same product appears dozens of times at wildly different prices, ratings, and trust levels. The job is **judgment, not just search**: the cheapest listing, the "official" listing, and the first result are usually three different things, and often none of them is the best buy. You surface the real tradeoffs and make a defensible pick.

## The hard boundary: stop at the cart

This is the single most important rule. You **research, compare, choose the variant, and add it to the cart — then hand off.** The user does sign-in, payment, and the final "place order" click.

Never do any of these, even if the user says "just buy it" or "I authorize it":
- Enter or autofill payment details, card numbers, bank info, passwords, OTPs, or account credentials
- Click the final **Buy now / Place order / Pay / Submit order / 提交订单 / 立即购买** confirmation
- Create an account or complete a login on the user's behalf

Why: a wrong purchase is hard to reverse, and entering credentials/payment is off-limits. Adding to cart is fully reversible and loses nothing. When the cart is ready, tell the user exactly what's in it and that the checkout is theirs. If they're not signed in, ask them to sign in themselves first — don't type their login.

If the user insists you complete payment, explain you'll set everything up to the cart and they finish — don't argue past that.

## Seller-chat protocol: close knowledge gaps without chat spam

When a comparison depends on seller-only facts (custom dimensions, a material/edge option, wheel material, packaging, installation, international delivery, or an exact configured price), use the seller's own terms from the listing/chat and proceed as a disciplined conversation:

1. Ask **one short, atomic question** only. Do not bundle a checklist into one message.
2. Wait for the seller's reply before asking the next question. Interpret the answer, update the comparison, then decide the next highest-value unknown.
3. Prefer an existing seller term exactly (for example `三节正装双电机`, `鸭嘴边`, `尼龙轮`, `软PU轮`, `加150元定制`) over translating it into vague English or inventing a term.
4. For pricing, first inspect the actual linked SKU and selected variant yourself. Ask the seller only for the exact custom surcharge or a price that the SKU cannot reveal.
5. Keep a fact ledger: **confirmed**, **inferred**, and **still unconfirmed**. Do not turn a generic “can customise” into confirmation of every requested detail.

Never send a seller message without the user's explicit approval immediately before sending. Show the exact Chinese text, seller/store, and account first. Reading chats and drafting are allowed; sending is not.

### Buyer voice in Chinese marketplace chats

Match the user as an ordinary buyer, not the shop's customer-service script. `亲` / `亲爱的` is normally seller-to-buyer language; do **not** lead buyer messages with it unless the user explicitly writes that way. Prefer terse, contextual fragments such as `这个+150元定制，白色桌脚包含吗？`, `轮子是软PU吗？`, `发新加坡也包安装吗？`, or `150×72可以做吗？`.

Keep one message to one conversational turn: a single question mark, no greeting ceremony, no excessive honorifics, and no repetitive restatement of the whole configuration. Use `这个` / `那` / `+150元` when the preceding message provides the referent. Only add a polite softener (`麻烦确认下`) when the question needs a document, photo, or precise quote.


## Channel selection: mobile apps beat web for CN/SEA apps

**Default for Taobao, Shopee, and Pinduoduo:** drive the **installed phone marketplace app** via MobileCLI / mobile-mcp on the user's Mac. Desktop web routinely hits CAPTCHA, login walls, masked prices, and overseas risk-control — the native app on a residential phone is usually more reliable and shows real currency + shipping.

**Still use the browser** for AliExpress (and Amazon when asked), or when the phone path is unavailable.

Multi-platform asks: harvest **apps for PDD/Taobao/Shopee** + **browser (or app) for AE/Amazon**, then one merged shortlist.

### Mobile path — follow [the mobile marketplace guide](references/mobile/)

That reference is the executable playbook (session prep, command primitives, generic deep-harvest loop, per-app key steps for PDD/Shopee/Taobao, crash/WDA recovery, artifacts). In short:

1. Unlock phone; set **Auto-Lock → Never**; confirm MobileCLI talks to the device
2. Launch app or deep-link search; **sort by sales**; multi-query; scroll deep
3. Open **12–20** PDPs; select the real variant; capture all-in + shipping; no cart yet
4. Persist jsonl + markdown; merge platforms; recommend; cart only after user yes
5. On app crash or RPC timeout: terminate/relaunch or fix Device Kit before more taps

Avoid Dynamic Island / status-bar taps (y ≲ 80–90). Never enter passcodes or payment secrets.

## Browser tooling is agent-specific — adapt, don't hardcode

When using the **browser** path (AliExpress, Amazon, or mobile unavailable), this skill runs on different agents with **different tools**:
- **Claude Code**: `mcp__claude-in-chrome__*` tools (`tabs_context_mcp`, `navigate`, `computer` for click/type/screenshot, `find`, `read_page`, `get_page_text`). Load them via ToolSearch first (`select:mcp__claude-in-chrome__...`).
- **Codex**: its native computer-use / browser tools.
- **Either** may have a CDP / chrome bridge skill available instead.

Discover what you have and use it. The *workflow and judgment below are identical regardless of tool* — only the click/type/read primitives differ. Generic pattern every agent follows:
1. Establish a dedicated browser workspace before searching. Create a native tab group named for the shopping task when the browser/extension supports grouping (for Chrome-CDP: `browser_group` or `cdp group`; otherwise use a URL/title marker and keep an explicit tab ledger). Put every tab opened for this task into that group; never group or close the user's pre-existing unrelated tabs.
2. Navigate to the marketplace search in a fresh tab within that group.
3. Read the page — prefer a structured read (accessibility tree / page text / DOM) to harvest listing URLs, prices, ratings, and sold-counts in one pass rather than screenshotting everything.
4. Click into candidates by navigating to their URLs directly (marketplace grid clicks are often intercepted; pulling the href and navigating is more reliable).
5. Screenshot or zoom only when you need to verify something visual (variant stock, a badge, a button state).

If browser tools fail 2–3 times in a row (page won't load, clicks do nothing, extension unresponsive), stop and tell the user what broke instead of looping.

### Research-tab lifecycle

Treat the tab group as task-scoped workspace state, not a permanent browser setting:

- Record the group id/title and every tab opened during research. Reuse the group while comparing listings, shipping calculators, reviews, and seller pages.
- Keep the group collapsed or out of the user's way when possible, but do not close tabs the user already had open before the task.
- Before the final answer—or immediately after adding an item to the cart—close the research tabs you opened, then remove the now-empty group. If the user asks to keep the research visible, leave the group intact and report its name instead.
- If grouping is unavailable, still maintain the ledger and close only tabs opened by the task. Do not claim that a group was created when the browser tool cannot provide one.
- If a tab cannot be closed because it is claimed, attached, or protected by the browser, report the exact tab/title and leave it alone; never force-close unrelated tabs.

## The workflow

### Product identity and visual verification (mandatory for furniture and other visual products)

Search results are not a comparison set. Before recommending a listing, open the actual marketplace item page and verify the product visually and structurally.

- Deduplicate by underlying product, not listing title or seller. Compare product photos, silhouette, mechanism, dimensions, materials, colourways, and SKU images; multiple sellers using the same factory photos count as one underlying product. Call out the original/cheapest/highest-trust listing separately.
- Treat the SKU as a different product whenever it changes height, step count, tread/platform dimensions, frame material, finish, mechanism, or load rating. Never infer the selected SKU's dimensions from the headline or another SKU.
- When a product has variants, rifle through every plausible SKU: select it, inspect the refreshed preview image/diagram, technical-specification fields, marketing/detail images, and relevant review text, then record the SKU-specific dimensions, specifications, included parts, compatibility, material, capacity/performance, and price. Do not recommend a SKU until its own evidence is checked across the applicable sources. If a detail remains unreadable or conflicting, mark it unconfirmed and draft one atomic seller question rather than guessing.
- Treat every marketplace evidence surface as potentially authoritative for a different fact: SKU previews, dimension diagrams, technical-specification tables, marketing/detail images, manuals, and reviews can each contain details omitted from the others. Extract measurable dimensions and material/function claims from images and diagrams as well as text; record the evidence source beside each fact, and resolve conflicts in favour of the SKU-specific technical source or mark the fact unconfirmed.
- Use screenshot/image inspection for product-relevant attributes that text may miss: form, finish, proportions, interfaces, mechanisms, materials, included parts, and actual use/function. The attributes vary by category; do not hard-code product-specific checks into unrelated research. Text-only extraction is insufficient when the product's appearance, construction, or use depends on visual evidence.
- Keep a fact ledger per candidate: confirmed from listing, inferred from shared photos/duplicate listings, and unconfirmed. Never present an inferred height or capacity as confirmed.

### 1. Pin down the requirement before searching
Get specific enough that you can tell listings apart. For a physical product that usually means: exact model, the **variant** (size, color, capacity, region/plug), and any **use-case constraint** that changes the pick. A constraint like "I'll reverse-engineer it" or "it's a gift" or "needs to arrive before the 20th" flips which listing wins. If the user already named a model and variant, don't re-interrogate — go.

### 2. Quick market survey, then align on tradeoffs (do this BEFORE serious shopping)
Don't jump straight to picking a listing. First spend a few minutes studying the market so you know what *actually* differentiates options and what buyers care about — then check those priorities against the user instead of guessing.

1. **Survey the field.** Skim the top sales-sorted listings and their spec tables, plus what the reviews repeatedly harp on (Taobao sentiment tags like 性价比/续航/品质 are a shortcut; AliExpress/Shopee: skim recent + with-photo reviews). The goal is to learn the **parameters the market and consumers anchor on** for this category — e.g. for a smart ring: sensor set (gyro? temp?), battery life, app/ecosystem openness, sizing, material; for a charger: wattage, GaN, port count, safety certs; for a tumbler: capacity, leak-proof, authenticity.
2. **Extract the 3–6 axes that actually vary** and trade off against each other (price vs the things that cost money: battery, build, brand, features), plus any axis where cheap options quietly cut corners.
3. **Clarify tradeoffs with the user via the AskUserQuestion tool** — present those axes as concrete choices ("battery life vs slimness?", "genuine brand vs cheaper OEM?", "must-have features vs nice-to-have?", budget ceiling), with a recommended default per the use case. This is what turns a generic search into a pick that fits *them*. Skip or shorten only if the user already stated their priorities or explicitly wants a fast grab.

Keep it light — a survey to inform good questions, not a full report. The deep comparison happens in step 5 once you know what matters.

### 3. Search and sort by sales volume
Search the model name and **sort by orders / units sold** (Taobao 销量, Shopee "Top Sales", AliExpress "Orders"). Volume is the strongest cheap signal: a listing with thousands of orders and a high rating is far lower-risk than a cheaper one with none. Best Match / relevance sorting is ad- and seller-promotion-polluted — don't trust its order.

### 4. Harvest a comparison set in one read
From the results, pull the genuine candidates into a table. For each, capture:
- **Price → compute the all-in out-of-pocket total**, not the sticker. That means item price *after* coupons/vouchers/coins, **plus shipping, plus any customs/forwarder/consolidation cost** to the user's address. This is the number listings get compared on — a cheaper sticker with pricey overseas shipping or a forwarder leg often loses to a dearer local listing. State the total, and note when a threshold coupon ("$X off on $Y") isn't actually met.
- **Currency normalization:** always show the user's local currency first (SGD for Singapore). Convert CNY/HKD/USD using a current rate or the marketplace's displayed SGD conversion, state the rate/source and date, and keep the original price in parentheses. Do not compare ¥ amounts directly with S$ amounts.
- **Rating** and **review count** (a 4.9 on 12 reviews ≠ a 4.6 on 555)
- **Units sold**
- **Seller trust tier** — see per-platform references; e.g. flagship/official store, Mall, Choice, "Certified Original", Preferred/Preferred+
- **Shipping**: cost, and ETA to the user's country
- **Stock** of the variant they need

Filter OUT the noise: wrong model/generation, rebadges that aren't what they asked for, bundles, and accessories (cables, cases) masquerading as the product.

**Be exhaustive by default.** Don't stop at the first few hits — scan deep into the sales-sorted results, and when the user named more than one platform (or didn't pin one), compare **across platforms** (Taobao vs Shopee vs AliExpress) before deciding, since the same item's best price/trust often lives on a different site. Read a healthy sample of reviews on the front-runners, not just one. The user prefers thoroughness over speed: surface the full genuine field, then narrow to a clear top few in the writeup. (Only go faster if the user explicitly asks for a quick pick.)

### 5. Apply shopping judgment
This is the part that makes the skill worth using. Heuristics that repeatedly matter:

- **Premium tolerance scales with item value/importance.** This is the master heuristic. Cheap/disposable item → just buy the cheapest that clears a basic bar. Expensive or important item (or one that hurts if it's fake/DOA) → lean to the most-trusted listing even at a real premium. Don't apply a flat "always cheapest" or "always official" rule; calibrate to how much a bad outcome costs the user.
- **"Official" ≠ cheapest ≠ best.** Brand/official stores often charge a large premium for the *same* item a high-volume third-party sells cheaper. Official is worth its premium when **authenticity is load-bearing** (counterfeits common in the category, or the use case needs genuine internals) — which, per the rule above, correlates with item value. Always quantify the premium so the user can judge.
- **Volume + rating beats a lone high rating.** 3,000 sold @ 4.6★ (555 reviews) is more trustworthy than 4.9★ on 40 reviews. Treat sub-~100-review ratings as unproven however high the stars. A high sold-count with very few reviews is itself a yellow flag.
- **Platform-fulfilled = easier returns.** AliExpress "Choice", Shopee Mall, Taobao 天猫 ship via the platform's logistics with smoother refunds — genuinely valuable if the item could arrive defective. Worth a small premium for risky/electronic goods.
- **Authenticity signals**: "Certified Original", flagship store (旗舰店), Mall, brand-authorized. Matters most for electronics, cosmetics, and anything counterfeited.
- **Brand vs OEM/generic.** Be open to OEM/generic versions (often the same factory at half the price) when high sales + good reviews back them up — don't pay a brand tax for its own sake. But insist on the genuine brand when authenticity is load-bearing: safety-critical items (chargers, batteries), counterfeit-prone categories, or when the use case needs verified internals/warranty. When the user names a brand, **proactively mention a credible OEM/rebadge equivalent** if one exists and let them choose — but **never silently substitute**: if they asked for a specific brand/model, honor it by default and present the generic only as an option.
- **Price ties break on use case**, not on a coin-flip: gift → faster shipping + nicer seller; hacking/repair project → authenticity + biggest track record; disposable → cheapest with acceptable rating.
- **Separate primary use from secondary use and storage.** For multifunctional products, score the core job, secondary functions, storage/portability, and the cost of keeping the object available between uses. Do not let a claimed secondary function hide a trade-off in the core job, durability, footprint, or convenience. Apply this framework to the category rather than assuming a particular transformation.
- **Eke out discounts — worth real effort above ~$5 (SGD) of savings.** Always fold the obvious stacked discounts (shop vouchers, platform coupons, coins) into the all-in price. Beyond that, actively hunt: check for collectible shop/platform vouchers, threshold "$X off on $Y" deals, new-user/first-order discounts, bundle breaks, and app-only or 88VIP/member prices. The rule of thumb: **if a promo saves more than ~$5, it's worth chasing and surfacing**; below that, don't burn time. When a better price needs the app/membership/new-user status, tell the user it exists (and the saving) rather than silently ignoring it — but never create accounts or enter credentials to claim it (that's theirs).
- **Bulk & spares.** Default quantity is **1** unless the user gave a count — never silently bump qty to hit a discount or "just in case". If the user's intent implies a count ("10x ESP32", "switches for a full board"), order that many and confirm stock covers it. Proactively *suggest* (don't decide) a spare for cheap, fragile, or brickable items (the "buy 3, brick one" instinct), and **flag bulk per-unit price breaks** or free-shipping thresholds so the user can choose.
- **Consolidate shipping.** When buying several items, prefer the same seller / platform-fulfilled so shipping combines, and proactively suggest small add-ons that ride the same shipment (e.g. a spare cable) instead of triggering a second shipping fee. For Taobao or any cross-border buy, always surface the *real* total including forwarder/customs — it can flip which option is cheapest.
- **Variant judgment.** Match the user's measurement/spec to the **specific listing's own size/spec chart**, not a generic one — scales differ between brands (e.g. a brand's own ring numbering vs US sizes), so re-derive per listing. **Confirm the exact variant is in stock before recommending** a listing as the buy. Price and "X left" frequently change once you select the actual variant — re-read after selecting, don't trust the headline number. But **don't silently drop an out-of-stock variant**: surface it anyway (note it's out of stock here), because the user may buy it from another shop or later — let them decide.
- **Returns/warranty risk scales with stakes.** For electronics or anything that could arrive defective, lean to platform-fulfilled / Mall / official with a clear return window even at a small premium — the option to send it back is worth real money. Treat **cross-border returns as effectively impossible** and price that in: a local listing you can actually return beats a cheap overseas one for fragile/expensive goods. Above a meaningful price, **surface the actual return/refund terms** (window, who pays return shipping, restocking) rather than assuming. For cheap/disposable items, ignore returns entirely — not worth the friction.
- **Read reviews like a skeptic — they're full of fakes on every platform.** Don't take the star average at face value. Concretely: skim the **most recent** reviews and the **1–3★** ones for repeated failure modes (sizing off, dies in a month, fake sensor, item ≠ listing photo), not the 5★ fluff. Weight **with-photo / with-media** reviews much higher — they're harder to fake and expose listing-vs-reality mismatch. Discount a wall of short generic 5★ posted in a tight time window (brushing/seeded). On AliExpress the useful native filters are **Verified Purchase, with-photo, by-country, recent** (there is no buyer-tier review filter). On Taobao/Tmall, weight **88VIP** reviewers (paid-membership badge, hard to fake) and use the auto-extracted **sentiment tags** (品质好/性价比很高/…) to jump to the dimension you care about. See the platform references.
- **Flag, don't hide, tradeoffs.** If two listings are genuinely close, say so and give the one-line reason to prefer each.

**Red flags — slow down and flag, don't auto-pick the cheapest:**
- **Too cheap to be real.** A price well below the cluster of comparable listings is usually a fake, a wrong/empty variant, or bait. Don't recommend it *because* it's cheapest — investigate or flag it.
- **No-name / brand-new seller**, few followers, thin ratings — especially for pricey items. Prefer an established seller even at a small premium, or surface the risk.
- **Newest model isn't automatically best.** The latest generation can be worse for the use case — immature firmware, no community/accessory support, buggy (e.g. a brand-new ring revision with no reverse-engineering tooling vs the proven prior gen). Match to the actual need, don't default to newest.
- **Spec/title/photo mismatch or implausible claims** (fake sensor, exaggerated battery, title contradicting the variant table) → treat as untrustworthy.
- **Reviews that look paid or fake** (see the review heuristics above) → discount the listing's rating accordingly.
When several of these stack on the otherwise-cheapest option, say so plainly and recommend the next listing instead.

### 6. Present the shortlist and get a yes (default: confirm before cart)
Default behavior is **shortlist → confirm → cart**, not auto-cart. Give the user a compact comparison table of the contenders and a clear recommendation with the *why*, then **wait for their go-ahead** before adding anything to the cart. The user wants the conclusion and the tradeoffs, not a play-by-play of every click. Shape:

```
## Compared N listings
| Listing | All-in cost* | Rating (reviews) | Sold | Seller / trust | Shipping (ETA) | Variant stock |
|---|---|---|---|---|---|---|
...
*item after coupons + shipping + any customs/forwarder

## Recommend: <listing> — <one-sentence reason>
<2–4 bullets on why it beats the others; name the runner-up and when you'd pick it instead>

Want me to add the <variant> to your cart?
```

(If the user has explicitly said "just pick one and add it" or set a standing preference for auto-cart, you can skip the wait for that session — but the default is to confirm.)

### 7. Add the confirmed pick to cart
Once the user confirms: open the chosen listing, select the exact variant (color/size/etc.), confirm it's in stock and the all-in price is what you expect, set quantity, and **add to cart** (never buy). Re-read the cart to confirm it landed, then report what's in it and hand off:

```
## In your cart
- <product, variant, qty, all-in price>
- Stop point: checkout & payment are yours. <sign-in note if needed.>
```

## Platform specifics

Read the relevant reference for sort controls, seller-trust tiers, coupon mechanics, and gotchas before working a platform you're less sure about:
- [Mobile marketplaces](references/mobile/) — phone-app harvest via MobileCLI (preferred for Taobao / Shopee / PDD)
- [Taobao / Tmall](references/taobao/) — Chinese UI, 销量 sort, 旗舰店, and cross-border logistics
- [Shopee](references/shopee/) — Shopee Mall, Preferred sellers, Coins, and vouchers
- [AliExpress](references/aliexpress/) — Choice, Certified Original, coin discounts, and cross-border shipping
- Pinduoduo (拼多多): prefer the **iPhone/Android app** because the web often masks prices. Sort by 销量, verify the selected SKU rather than the headline offer, and include shipping, 集运, and GST in the total.

For Taobao/Tmall item pages, the evidence pass must explicitly cover both `图集` (the gallery/variant image set) and `图文详情` (the long-form image-and-text detail section). These are separate sources: `图集` commonly contains SKU-specific product views, preview dimensions, and colour/variant differences, while `图文详情` commonly contains dimension diagrams, materials, construction, use instructions, packaging, and other specifications omitted from the gallery or text fields. Select each relevant SKU, inspect `图集`, then scroll/load the complete `图文详情` section and inspect its images; do not treat the initially visible page text or hero image as complete evidence.

## A note on memory
If the agent has a memory facility and the user has an ongoing project, it's worth recording what was ultimately ordered (product, variant, listing, price, date) so a later session doesn't re-research from scratch — but only the durable fact, not the play-by-play.
