---
title: "AliExpress"
description: "Reference for Marketplace Shopping."
---

<!-- Generated from seahyc/agent-skills. Do not edit here. -->

Cross-border marketplace, English UI, ships worldwide. The site we used to buy the COLMI ring.

## Search & sort
- Search URL pattern: `https://www.aliexpress.com/w/wholesale-<query>.html`
- Sort by orders: append `?SortType=total_tranpro_desc` (or click "Orders" on the results page). Also `Price ↑/↓` and "Best Match" (ad-polluted — avoid for ranking).
- Direct item URL: `https://www.aliexpress.com/item/<itemId>.html`. The item IDs and current prices are in the search page's link hrefs and `pdp_ext_f` params — read the page structure once to harvest them, then navigate to each item directly (grid clicks are frequently intercepted).

## Seller / trust tiers
- **Choice** ("AliExpress commitment / Shipped by AliExpress"): platform-fulfilled. Faster, consolidated shipping and the smoothest returns/refunds. Prefer for electronics or anything that could be DOA.
- **Certified Original / Brand+**: authenticity guarantee; often the brand's official store. Best signal you're getting the genuine item (not a rebadge) — but frequently priced at a premium over equally-genuine high-volume third parties.
- Plain third-party stores: fine when volume + rating are high. Check the store rating and years active if it's a no-name with few followers.

## Price gotchas
- The big number is usually the *sale* price; there's a struck-through list price. Real cost may drop further with **"SG$X off on SG$Y"** thresholds and **+% off with coins** applied at checkout — note these but don't rely on hitting the threshold.
- **Price and "Only N left" change when you select the variant** (size/color). Re-read after picking the variant.

## Shipping
- ETA and cost are on the right rail ("Delivery: <date range>", often "Free shipping"). Choice items usually show tighter, sooner windows.
- Confirm the destination country (top-right region selector) matches the user before trusting the ETA.

## Gotchas seen in practice
- The **same brand** can run multiple listings at very different prices (e.g. an "official store" listing at ~70% more than the brand's own higher-volume listing). Always compare within-brand, not just the first official-looking one.
- A variant (e.g. size 8) can be greyed out / out of stock in one color but available in another — switch color to check before concluding it's unavailable.
- Decline the notifications / app-download popups (privacy-preserving) before interacting.
