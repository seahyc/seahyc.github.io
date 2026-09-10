---
title: "Shopee"
description: "Reference for Marketplace Shopping."
---

<!-- Generated from seahyc/agent-skills. Do not edit here. -->

Dominant marketplace in Southeast Asia + Taiwan. Per-country sites (`shopee.sg`, `shopee.com.my`, `shopee.co.id`, `shopee.ph`, `shopee.tw`, `shopee.vn`, `shopee.co.th`). English available on most; pick the user's country site for accurate price, stock, and shipping.

## Search & sort
- Search URL: `https://shopee.sg/search?keyword=<query>` (swap the domain for the user's country).
- Sort tabs: **Relevance** (ad-polluted), **Latest**, **Top Sales** (← use this — the sales-volume sort), **Price**.
- Shopee is heavily app-driven and bot-sensitive; the web flow can throw login walls and sliders/CAPTCHAs. Do **not** solve CAPTCHAs — if one appears, hand back to the user. If a listing page won't load after a couple of tries, tell the user rather than looping.

## Seller / trust tiers
- **Shopee Mall**: official-brand / authorized stores. Authenticity guarantee, easier returns (often 15-day free returns), platform-backed. The strongest trust tier — the Shopee equivalent of Tmall/Certified-Original.
- **Preferred / Preferred+ Seller**: vetted high-performing sellers (good ratings, fast ship, low cancellation). Below Mall but well above plain sellers.
- Plain sellers: judge by rating, rating count, and "sold" count; check the shop's overall rating and response rate.

## Price & vouchers
- Sticker price often isn't the real price: **Shop Vouchers**, **Shopee Coins** cashback, platform-wide vouchers, and **free-shipping vouchers** stack at checkout. Note the after-voucher cost.
- Big sale spikes on double-date days (9.9, 11.11, 12.12) — worth flagging if one is near.

## Reviews
- Filter by star and "With Comments / With Media". SEA reviewers frequently post photos and call out fakes, wrong variants, and sizing — high-signal. Watch for repeated complaints across recent reviews, not the seeded 5-stars.

## Shipping
- ETA and fee show per listing and per the user's address; varies a lot by seller location (local vs overseas/China-direct sellers on Shopee). Overseas listings are cheaper but slower and harder to return — weigh against Mall/local for anything risky.

## Boundary
Same as the main skill: select the variant, add to cart, stop. Checkout (and ShopeePay / card / COD selection) is the user's.
