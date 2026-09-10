---
title: "Taobao / Tmall (淘宝 / 天猫)"
description: "Reference for Marketplace Shopping."
---

<!-- Generated from seahyc/agent-skills. Do not edit here. -->

China's largest marketplace. Chinese-language UI. Two storefronts share infrastructure: **Taobao** (mixed C2C + B2C) and **Tmall / 天猫** (B2C, brand & flagship stores, higher trust). Often the cheapest source for OEM/electronics, but cross-border buyers usually need a **forwarding agent** (集运/代购) since many sellers don't ship internationally.

## Search & sort
- Search at `https://s.taobao.com/search?q=<query>` (URL-encode Chinese).
- Sort controls (tabs near the top of results):
  - **综合** = Best Match (promotion-polluted — avoid for ranking)
  - **销量** = sales volume — the one to use, same logic as AliExpress "Orders"
  - **价格** = price (toggle asc/desc)
  - **信用** = seller credit
- Login wall: Taobao aggressively requires login/QR scan to view full results or item pages. If you hit it, tell the user to sign in themselves (don't enter their credentials). Logged-out scraping is often blocked.

## Seller / trust tiers
- **天猫 / Tmall flagship (旗舰店)**: brand-operated official store, strongest authenticity + return guarantees. The Taobao equivalent of "official + Mall".
- **专卖店 / 专营店**: authorized reseller / category store — still vetted, slightly below flagship.
- **金牌卖家 / high 信誉 (crown/diamond icons)**: C2C seller reputation tiers. More positive ratings = safer.
- Watch DSR scores (描述/服务/物流 — description/service/logistics) shown as red/green vs category average.

## Price & coupons
- 券 (vouchers/coupons), 满减 (spend-X-save-Y), 88VIP member prices, and 预售 (pre-sale deposits) all distort the sticker price. Note the *after-coupon* price.
- 销量 counts can be gamed (刷单/brushing) — cross-check with review quality, not just the number.

## Reviews
- 累计评价 / 宝贝评价 = cumulative reviews; 追评 = follow-up reviews (most honest — written after weeks of use). Skim 追评 and filtered "有图" (with-photo) reviews for real failure modes.
- **Weight 88VIP reviewers heavily.** Reviews from buyers with an **88VIP** badge next to their name (Tmall/Taobao's paid premium membership, gated on annual spend/credit) are far harder to fake or brush than anonymous accounts — treat them as the highest-signal reviews. (This is the real form of the "VIP" tip — the badge reads `88VIP`, not "VIP100".)
- **Use the sentiment filter tags.** Above the review list Taobao shows auto-extracted theme tags with counts, e.g. 性价比很高 (great value), 品质好 (good quality), 功能齐全 (full-featured), 物流服务好, 商家服务好, 外观设计好看. Click the dimension you actually care about to jump straight to reviews on it — a fast way to sanity-check quality/value claims instead of reading top-to-bottom.
- Cross-border traffic frequently trips a **slide-to-verify CAPTCHA** on search/item pages. Do NOT solve it — hand back to the user to verify in their own session, then continue.

## Cross-border reality
- Most Taobao sellers ship domestic China only. The realistic flow: add to cart → user (or a forwarder service like 集运) consolidates and reships internationally. Flag this to the user up front if they're outside China — it changes total cost and ETA materially.
- Stop-at-cart still applies; payment (Alipay) and any forwarder setup are the user's.
