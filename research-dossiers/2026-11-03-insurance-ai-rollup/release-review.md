# Gate 2 independent release review

**Verdict: pass.** 3 November 2026. Independent reviewer inspected the actual rendered local report and topic evidence pack. No narrative, shared engine or asset edits made by this reviewer. No git commands or publishing. Public sources only.

Reviewed destination: `http://127.0.0.1:1418/learning/the-broker-behind-the-promise/`. The shared site permalink uses `/learning/`, with topic aliases separately declared. The rendered learning index contains exactly one link to the title-derived destination. This is a local release-readiness verdict, not proof of live publication.

## Fidelity and decision

The report follows evidence-ledger E01–E46, scenario-model.json, execution-path.md and Gate 1 corrections. Market premium, licence counts and commissions remain different denominators. No independently buyable earnings TAM is invented. Broker advocacy and insurer recovery rights are separated; recovery mandates, fee legality, collection incrementality and data authority are conditions. AI is a proposed workflow and cash-realization experiment, with no observed retention or margin uplift claimed. Singapore control prior approval cites the MAS toolkit. Hong Kong notification is expressly attributed to IA guidance. Taiwan Article 16 is restricted to companies licensed before the March 2021 amendment, with its capital-adjustment trigger and remaining foreign-investment permissions separately described. Aon–USI stays announced/pending.

The preferred route is conditional broker ownership, compared explicitly with US recovery agency and software alternatives. Strong bear includes expensive/small seller supply, multinational competition, talent flight, country overhead, unproved savings and exit-market timing. Six of eighteen cards (12–17) develop execution: first tranche and budget, buyer/seller access, credibility and team, legal route, capital and founder payout, replication, and falsifiers. Service cash is not claimed to self-fund the anchor equity cheque. Exit EV is not personal cash; common participation, management promote, secondary and recap remain alternative scenarios with preferences, dilution, tax and approval limits.

Independent arithmetic output:

```text
low 7.24 1.2408 0.0346 1.033789
base 8.48 1.9312 0.5524 1.539453
high 9.516 2.57736 1.03702 2.012715
Independent acquisition, recovery and software arithmetic PASS
AI bridge 50000.0
Founder common 20.4 34.0 68.0 promote 21.0
```

Columns above are net revenue, EBITDA, simplified post-tax/debt cash (USD millions), and cash-tax-adjusted coverage before other cash uses. The article preserves the base $40,400 headroom warning and does not turn the EBITDA coverage diagnostic into CFADS. Model verification proves equations, not market feasibility.

## Rendered verification

Ran local headless Chromium via repository Playwright. For each viewport, individually loaded all 18 direct hashes with a unique query to ensure actual direct-load initialization, verified the matching active card, checked images and document overflow, and scrolled incrementally until the final substantive card element was above the reading boundary without advancing the card. Real output:

```text
{"viewport":"390x844","directHashes":18,"endingsReachable":18,"loadedImages":18,"pageErrors":[],"failures":[]}
{"viewport":"737x862","directHashes":18,"endingsReachable":18,"loadedImages":18,"pageErrors":[],"failures":[]}
{"viewport":"1440x1000","directHashes":18,"endingsReachable":18,"loadedImages":18,"pageErrors":[],"failures":[]}
```

An initial test used too-short same-document hash waits and sampled desktop transition state; rerunning with fresh direct loads resolved those apparent failures. They were checker timing errors, not ignored release defects.

The first independent cover screenshot exposed 10px prose nested in the raw cover div. Lead repaired cover paragraphs without shared CSS changes. Reviewer refreshed and verified:

```text
cover fonts [ '17px', '17px', '17px', '17px' ]
```

`review-phone-cover-fixed.png` shows the repaired type. The full phone/tablet/desktop loop above followed the repair. The longer cover is scrollable; fitting all prose at once is not required.

Independent final visual checker:

```text
cards 18 · visuals on cards 18 · svg 12 · raster 6 (need ≥6)
PASS
```

All eighteen unique assets have explanatory jobs. Generated watercolors explain the service loop, distinct recovery rights, assisted review, relationship transfer, complementary team and staged replication. They are not counted merely as covers or decorative logos. Charts and diagrams explain denominators, scenarios, legal distinctions and decision gates. Eyeballed both bar charts at 390px (`review-chart-cash-390.png`, `review-chart-scale-390.png`): direct values clearly belong to their own rows, baseline starts at zero, units and assumptions are readable, no collisions. Other SVGs passed geometry inspection. Reviewed raster images directly; watercolor cutouts have no baked rectangular background.

Independent raster decoder output:

```text
ai.png alpha RGBA corners [0, 0, 0, 0]
cover.png alpha RGBA corners [0, 0, 0, 0]
expansion.png alpha RGBA corners [0, 0, 0, 0]
retention.png alpha RGBA corners [0, 0, 0, 0]
rights.png alpha RGBA corners [0, 0, 0, 0]
team.png alpha RGBA corners [0, 0, 0, 0]
```

The required visual checker also passed raster edge sampling. Captured phone charts and the repaired cover provide rendered evidence. No shared renderer/style changes were part of this topic, so cross-report regression is outside this gate.

## Limits

Gate 1 source readings were audited through the source-specific dossier and review, not all fetched again in Gate 2. Actual seller access, producer/carrier continuity, AI/recovery outcomes, finance offers, specific legal clearance and taxable founder payout remain unverified and are stated as future gates. No live publication was performed or verified; parent publishes under the user brief.

Final selected phone screenshots were additionally taken after fresh unique-query direct loads and a 650ms settled wait: `review-fresh-card-07-the-cash-test-top.png`, `review-fresh-card-14-design-the-permissions-before-the-platform-top.png`, `review-fresh-card-15-negotiate-the-founder-outcome-in-the-waterfall-top.png`. Each active card id matched its filename; cash-card screenshot was viewed and visibly shows card 07 and its chart without a tilted incoming card.

## Final width-cap refinement — independent recheck

PASS remains after all twelve SVG img tags acquired the canonical `max-width:680px;background:transparent` styling. No factual or narrative change accompanied this refinement. Fresh unique-query loads at 1440×1000 of cards 07, 14 and 15 were checked at top and end; all six screenshots were independently viewed. Chart/diagram widths are 680px, labels are readable, prose and citations remain reachable, no incoming tilted card is shown and no horizontal overflow or page error occurs. Screenshots are `review-final-width-card-{07-the-cash-test,14-design-the-permissions-before-the-platform,15-negotiate-the-founder-outcome-in-the-waterfall}-{top,end}.png`.

```text
{"id":"card-07-the-cash-test","imageWidth":680,"imageLoaded":true,"overflow":false,"bottom":968.00439453125,"finalActive":"card-07-the-cash-test","endingReachable":true}
{"id":"card-14-design-the-permissions-before-the-platform","imageWidth":680,"imageLoaded":true,"overflow":false,"bottom":967.9968872070312,"finalActive":"card-14-design-the-permissions-before-the-platform","endingReachable":true}
{"id":"card-15-negotiate-the-founder-outcome-in-the-waterfall","imageWidth":680,"imageLoaded":true,"overflow":false,"bottom":968.0031127929688,"finalActive":"card-15-negotiate-the-founder-outcome-in-the-waterfall","endingReachable":true}
pageErrors []
```
