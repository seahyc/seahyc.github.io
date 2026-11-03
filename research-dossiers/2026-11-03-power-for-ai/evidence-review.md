# Gate 1 independent evidence review

**Verdict: pass.** Evidence cutoff and review date: 3 November 2026. This verdict covers the Phase 1 dossier and calibrated master ledger, including the late E16 geographic qualification and E31 addition. It authorizes no subsequent phase. No report, visuals, build or publication reviewed or performed.

Reviewed research-map.md, evidence-ledger.md, market-evidence.md, scenario-model.json, scenario-arithmetic.md and model.py, plus nuclear-sources.md, onsite-sources.md and needs-browser.md. The reviewer edited none of those files. Supplemental notes are discovery records; their explicitly superseding qualifications and the master ledger control what may be asserted.

## Independent primary-source checks

- **E01–E02 demand:** Opened [IEA 2025 summary](https://www.iea.org/reports/energy-and-ai/executive-summary), paragraphs covering consumption, forecast and uncertainty. It supports 415 TWh in 2024, around 945 TWh in 2030 and 700–1,700 TWh across 2035 cases. Opened [IEA 16 April 2026 update](https://www.iea.org/news/data-centre-electricity-use-surged-in-2025-even-with-tightening-bottlenecks-driving-a-scramble-for-solutions): 17% 2025 growth, tightening equipment supply, early-stage onsite projects and load-swing constraints are present. Ledger correctly separates estimates, scenarios, AI-focused facilities and all data centres.
- **E04 queue:** Opened [LBNL Queued Up 2026](https://emp.lbl.gov/queues/), summary and coverage. It confirms approximately 8,200 projects, 1,312 GW generation, 749 GW storage, a 10% fall in active volume, over-five-year median for completed 2025 projects with available records, and 13% operation/75% withdrawal for the specified historical capacity cohort. Dossier correctly refuses to call this an AI-load queue, available firm generation or an individual site's wait probability.
- **E06/E08 equipment:** Opened [DOE supply-chain page](https://www.energy.gov/oe/supply-chain-and-market-analysis) and [26 October refurbishment article](https://www.energy.gov/oe/articles/innovative-solutions-grid-equipment-shortages). Historical distribution lead times and over 80,000 varieties are present; recent article identifies assurance/testing/documentation barriers. These support testing reconciliation work, not a proven startup savings rate or interchangeable equipment.
- **E11 competitor:** Opened [GridUnity large-load product](https://www.gridunity.com/gridinterconnect-for-large-load). Discovery-to-energisation lifecycle, intake evidence and milestone workflows materially overlap the proposed boundary. The dossier appropriately treats the offering as competition, without validating marketing speedups or regulatory assertions.
- **E12 gas supply:** Opened [GE Vernova Q3 release, 28 October 2026](https://www.gevernova.com/news/ge-vernova-reports-strong-third-quarter-2026-financial-performance). Its highlights explicitly increase combined equipment backlog and slot reservations from 116 to 122 GW. Ledger correctly uses Q3 and does not relabel the combined book as firm delivered turbines or customer-ready power.
- **E16 deadline and Valar:** Opened [DOE 18 June Valar release](https://www.energy.gov/articles/department-energy-celebrates-second-advanced-reactor-achieving-criticality), [25 July fact sheet](https://www.energy.gov/articles/fact-sheet-golden-era-american-nuclear-energy-has-arrived) and [program overview](https://www.energy.gov/ne/us-department-energy-reactor-pilot-program). Valar's zero-power criticality and DOE's four-reactor tally are supported. The overview's outside-national-laboratories condition conflicts with treating the INL-inclusive tally as literal proof of every original condition. Updated E16/map/market and the supplemental superseding qualification explicitly retain this discrepancy. Pass depends on retaining that attribution and qualification.
- **E22 Radiant:** Independently opened [29 October primary release at non-www domain](https://radiantnuclear.com/news/radiant-secure-doe-approval-for-full-power-operations), after two www web timeouts and a direct HTTP 403. Body says readiness review precedes fueling and nuclear operations. Planned test duration and 2028 deliveries are future claims; dossier does not turn the headline into operating evidence.
- **E31 Singapore:** Opened [MDDI 7 October 2026 speech](https://www.mddi.gov.sg/newsroom/closing-speech-by-sms-tan-kiat-how-for-the-second-reading-of-the-digital-infrastructure-bill/). Historical paragraph confirms pause in 2019 and selective allocations since 2022. Capacity paragraph explicitly distinguishes IT load from whole-facility power and warns that overlapping figures cannot be added. Updated ledger is faithful to those boundaries.

## Independent arithmetic verification

Ran separate Python calculations directly from scenario-model.json; did not run model.py because it rewrites the reviewed artifacts. Assertions checked each case's direct cost, after-CAC contribution, annual residual, break-even count and delivery capacity; all five sensitivities; gas annual energy, capital charge and partial cost. Actual output:

```text
low 46000.0 -14000.0 -384000.0 None 16.0
base 33750.0 35250.0 123000.0 9 22.857143
high 26000.0 70000.0 1100000.0 5 32.0
gas low_cost 157680.0 82.57274908
gas base 140160.0 144.1126328
gas high_cost 105120.0 247.10789717
sensitivity base 35250.0 123000.0
sensitivity fee -20% 21000.0 -48000.0
sensitivity engineer hours +50% 24750.0 -3000.0
sensitivity CAC doubled 29250.0 51000.0
sensitivity projects halved 35250.0 -88500.0
fee break even 64210.52631578947 reserve 142500.0 battery hours 4.0 one day MWh 480
PASS independent arithmetic; no artifacts modified
```

These are conditional economics, not evidence of price acceptance. Gas exclusions prevent a firm-power LCOE claim. Delivery labor versus central overhead and potential idle-payroll exposure are explicitly bounded.

## Gate assessment and remaining boundaries

Strongest bear case is substantive: physical infrastructure may dominate; incumbents add supply; experienced EPCs and competing software may already satisfy the job; demand may disappoint; bespoke engineering, acquisition and liability may consume margin. Facts about issuer disclosures, forecasts, original inferences and invented scenarios are visibly distinct.

The initial wedge is credible **as a bounded test**, not an established market: a named developer buyer, responsible engineer, site-specific deliverable and authority boundaries exist. The 90-day gate tests actual avoidable errors, two paid pilots, engineer acceptance, collected fee, measured contribution, repeatability and incumbent comparison. It can conclude no venture or consultancy only. Its numeric thresholds are openly proposed rather than industry benchmarks.

No required fixes remain for this Phase 1 gate. NRC details, Last Energy body, ERCOT specifics, underlying NREL PDF, conditional extra Singapore roadmap capacity and private quotes/customer evidence remain limited or pending. The master ledger excludes or narrows those claims; they do not prevent use of this dossier within its stated scope. Any later narrative must preserve these exclusions or resolve the relevant source before promoting a pending detail into a material claim.

---
# Gate 1 (parent-run, cross-model) · PASS · 3 November 2026
Independent Claude verifier (read-only). Reopened: DOE Valar criticality release (Ward 250 zero-power criticality 18 Jun 2026, no electricity); Valar "Ward 250 By the Numbers" (HTGR/TRISO, 100 kWt 30 EFPD, 250 kWt ≤1 day, "July XX" placeholder); DOE Golden Era fact sheet (4 reactors critical by 4 Jul; electricity "2027 and following years"); DOE Reactor Pilot Program page ("outside of the national laboratories" — 3 of 4 tallied were at INL); DOE OE supply-chain page (distribution transformers 3–6 → 12–30 months, 2019→2023); Wood Mackenzie webinar (GSU/power transformers ~2–3 years); GE Vernova Q3 2026 (gas backlog + slots 122 GW, ≥130 GW by YE); IEA data-centre electricity +17% in 2025. LBNL Queued Up blocked (403/captcha); 13%/75%/~8,200 corroborated by search only. Arithmetic recomputed by hand — all match incl. gas comparator.
Required before Phase 2 (non-blocking):
1. E04: do not state ">5-year median request-to-operation" unless re-read directly from LBNL; otherwise attribute to LBNL and show only 13% operating / 75% withdrawn / ~8,200 projects with attribution.
2. E06/E07: keep distribution-transformer (DOE, 2023) and large/GSU transformer (WoodMac webinar 2–3 yrs) separate in any chart; do not present 2–3 years as a measured current quote.
3. E16: keep the reactor-pilot scope mismatch visible; "goal exceeded" only as DOE's claim.
4. Label 12/yr throughput and $300k overhead as scenario inputs, not benchmarks.
