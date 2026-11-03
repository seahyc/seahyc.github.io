# Gate 1 independent evidence review

**Verdict: pass.** Reviewed 3 November 2026, Phase 1 only. This is a pass of the bounded evidence/decision pack, not an endorsement that an acquisition is available, financeable, legally approved or economically attractive. Public sources only. No git commands, outreach, filings or other communications performed. Only this review file written.

## Material findings and independent source checks

- **Taiwan market denominator is correctly calibrated.** Independently downloaded [TII Table 20](https://www.tii.org.tw/tii/export/sites/tii/information/files/20_202605.pdf) with Python urllib and piped PDF bytes directly into `pdftotext -layout - -`. The 2025 row independently reads 431 total; 48 non-life; 79 life; 304 both. The original unit is NT$ thousand; non-life written premium 66,105,954 and commission 7,432,572 therefore become NT$66.105954bn and NT$7.432572bn. Stated non-life channel share is 23.05%. Footnote explicitly includes personal and corporate forms. Independent ratio: **11.243423%**. Pack correctly refuses to interpret these as independent commercial seller counts or a representative deal commission rate.
- **Hong Kong counts are permissions.** Independently opened [IA licence statistics](https://www.ia.org.hk/en/infocenter/statistics/statistics.html), dated 30 September 2026. Page lists 814 broker companies; eligible general rows 85, 160 and 433 sum to **678**. Pack correctly separates general-only, mixed permissions, ownership and willingness to sell.
- **Singapore premium claims checked.** Independently opened [GIA 2025 results release](https://gia.org.sg/agents/media-center/company-news/592-gi-results-2025.html), body lines 58 and 62: S$6.09bn domestic and S$11.2bn domestic plus offshore general GWP. Neither is broker net revenue or acquisition TAM in this pack.
- **Singapore control route checked.** Independently opened [MAS toolkit](https://www.mas.gov.sg/-/media/mas-media-library/regulation/guidance/cmi/compliance-toolkit-for-insurance-brokers/compliance-toolkit-for-ibs-14-nov-2024.pdf). Actual version is 3.4, issued 12 November 2025. PDF page 4 requires prior approval for CEO/director appointments and direct/indirect 20% capital/vote control; pages 5–6 cover broker investments/new operations and premium-account withdrawals. Pack correctly distinguishes holding-company design questions and protects client cash. Independently opened [MAS registration page](https://www.mas.gov.sg/regulation/Insurance/Insurance-Broker-Registration-and-Approval): conditional six-month expectation concerns complete straightforward registration applications, not acquisition approval. Financial standing, qualified people and Singapore incorporation are explicit.
- **Hong Kong control distinction checked.** Independently opened [IA controller guidance](https://www.ia.org.hk/en/legislative_framework/Conduct_in_Focus_Issue_08_05.html), body lines 14 and 26. It specifies notification within one month after becoming/ceasing director/controller; controller includes at least 15% capital/votes or ultimate management control. Pack does not turn this into Singapore-style prior approval or imply all other conditions disappear.
- **Taiwan current-law route checked narrowly.** Web fetch timed out; direct public urllib fetch of [current Chinese FSC rules](https://law.fsc.gov.tw/LawContent.aspx?id=FL027603) succeeded (24,358 characters after text normalization). It prints amendment date ROC115/09/30, Article14's applicable 15-day management/recognition/reporting duties, Article40's direct gross premium remittance with reinsurance exception, and Article41's minimum five-year receipt records subject to other law. These support the bounded pack claims, not an acquisition/foreign-investment timetable. The pack expressly leaves ownership route unresolved before a Taiwan commitment.
- **Aon valuation bases independently checked.** [Issuer announcement](https://aon.mediaroom.com/2026-08-31-Aon-to-acquire-USI-to-establish-the-premier-U-S-middle-market-platform), lines 46–50, reports USD17bn gross, USD16.7bn after tax attributes and 14.5x synergized TTM adjusted EBITDA. Independently opened [SEC prospectus](https://www.sec.gov/Archives/edgar/data/1556748/000119312526392131/d89499d424b5.htm), lines 331–341: USD17bn cash inclusive of net debt and USD756m standalone TTM adjusted EBITDA. Independent division is **22.486772x**. Pack clearly labels the two incompatible bases and does not use either as a startup transaction quote. SEC text describes expected Q4 closing. Independent attempts to reread the 28 October issuer page timed out/returned 403; its later status claim is therefore supported by the transaction researcher's recorded primary read, not independently refreshed by this verifier. The pack already limits status to latest verified disclosure and does not assert current completion.

## Gate criteria

**Headline and causal calibration: pass.** Facts, arithmetic, inferences and scenarios are visibly marked in the ledger. Premiums, licences, earnings, EV, common equity and personal cash are kept separate. AI task capability and real incumbent service offerings are not converted into observed margin, retention or recovery uplift. Preferred operator route and wider-APAC scale search are conditional inferences; no buyable earnings TAM is invented.

**Strongest bear: pass.** Research map directly confronts small-market/search-fund economics, expensive sellers, incumbent tools and service, producer flight, country-level overhead, separate recovery rights and sponsor dilution. Market evidence additionally covers soft pricing, integration expense, uncertain buyer liquidity and limits of public adviser price data.

**Wedge and falsifier: pass.** One Singapore specialty commercial anchor, permissioned claims/renewal service and retained licensed operator form an identifiable starting wedge. Predeclared gates include 50-name map, 10 owner discussions, three diligence-ready sellers, paid/budgeted partners, 100-file cost/error screening and 95% normalized renewal retention. Rare errors are correctly not declared solved by 100 files. Failed access, unproved existing-book debt service or an unworkable authority/money structure stops acquisition funding.

**Concrete execution: pass.** Execution path covers sequential operating/acquisition/replication stages; six budget lines totaling USD150k; owners, artifacts and dates; seller/buyer/rights-holder requests; access channels without fabricated warm introductions; licensed operator, claims, compliance, CFO, counsel and engineering requirements; and first full renewal-cycle proof before bolt-ons. Aon/Howden offerings make bundled competition real; Howden ownership and Baldwin earnouts are mechanisms rather than causal guarantees. SIRC is dated and not treated as an available past registration opportunity. Capital progression explicitly requires external equity rather than consultancy self-funding. Regulatory and cross-border advice are conditions precedent; founder salaries/dividends/secondary/promote/recap paths distinguish lawful realizable cash from EV.

## Actual model verification

Executed `build-model.py` through Python `runpy`, intercepting `Path.write_text` in memory so the source JSON was not edited. The regenerated object was **identical** to the saved JSON. Script assertions passed. Recalculated acquisition uses, revenues, EBITDA, taxes, debt cash, recovery/software contribution and promote using independent equations; all checked values passed.

```text
anchor low  revenue 7.24  EBITDA 1.2408  post-debt cash 0.0346  EBITDA coverage 1.212
anchor base revenue 8.48  EBITDA 1.9312  post-debt cash 0.5524  EBITDA coverage 1.886
anchor high revenue 9.516 EBITDA 2.5774  post-debt cash 1.0370  EBITDA coverage 2.517
claims contributions USD: -200000 / 100000 / 500000
claims break-even success: 0.2333 / 0.1500 / 0.1000
software annual contributions USD: -231000 / -51000 / 471000
software break-even customers: 134 / 20 / 11
14x / 25% exit: EBITDA 71.428571m; revenue 285.714286m
JSON reproduction identical: True
Independent equation checks PASS
```

`arithmetic.md` was reread after its addition and agrees with these calculations, including 12x/14x entry-equity sensitivity, nonannual recovery cohorts and alternative, nonadditive personal waterfalls. After the lead added cash-tax-adjusted coverage, reran the model with writes intercepted: **Updated JSON identical: True**; independently asserted the new coverage fields equal (EBITDA minus modeled cash tax)/(interest plus principal). Reread updated research-map and execution-path: both explicitly require actual cash coverage after tax, required capex, working capital, earned seller payments and other senior cash obligations. This resolves the potential coverage-presentation ambiguity.

## Nonblocking diligence omissions and required limits

1. **EBITDA coverage is not CFADS debt-service coverage.** The printed metric is correctly labeled EBITDA/(interest + principal). After only the modeled tax deduction, independent cash coverage is **1.033789 / 1.539453 / 2.012715**. Base headroom above 1.5x is only **USD40,400**, before capex, incremental working capital, earnouts or other excluded commitments. The final model prints the cash-tax-adjusted field, arithmetic calls out the USD40,400 headroom, and the final stage gates require actual loan definitions and all commitments before closing. Preserve this distinction in Phase 2; do not advertise 1.886x as spendable cash coverage.
2. Model checks confirm equations, not feasibility. Historic EBITDA, 8x offer, debt terms, staffing, AI realization, recovery yield/fees/costs/lag, software buyers and exit multiples are unvalidated assumptions. Acquisition uses need a real EV-to-equity/net-debt/working-capital bridge, financing fees, maximum earnouts and actual required regulatory capital before an offer. Simplified post-debt cash cannot support a dividend promise.
3. No seller-level ownership/earnings sum, producer/carrier continuity proof, signed equity/lender offer, regulated recovery fee opinion or taxable founder waterfall exists. These are explicitly named future diligence gates; public precedent cannot substitute for them. Taiwan ownership/foreign-investment and current entity-specific licence requirements remain open. No complete transaction legal opinion is implied by this pass.
4. Current AI/outsourcing guidance and source-access leads must be refreshed before implementation; the pack marks newer 2026 guidance as unread and does not claim unrestricted AI use. Prior template references to unresearched privacy are superseded by the dated regulatory extension, which should remain readable as such.

`needs-browser.md` reread after it landed: unresolved HK aggregate premiums, recovery fee procurement, PSC valuation classification and underlying privacy clauses are correctly treated as unread or narrowly substituted; no unsupported headline depends on them. They are not blocking for this conditional Phase 1 decision. Newer AI guidance and Taiwan ownership route remain implementation gates.

No blocking defect found within this Phase 1 scope.

---
# Gate 1 (parent-run, cross-model) · PASS · 3 November 2026
Independent Claude verifier (read-only). Reopened: Aon–USI release (USD17.0bn, ~14.5x synergized TTM adj. EBITDA, pending); SEC 424B5 (USI TTM adj. EBITDA USD756m → ~22.5x unsynergized, kept separate); MarshBerry multiples (advisor source, flagged); MAS broker registration page and MAS compliance toolkit v3.4 (20% control trigger, prior approval); HK IA statistics (814 licensed broker companies, via Dia); Taiwan TII Table 20 (2025: 431 broker organisations/persons; non-life commission/premium 11.24%); Taiwan FSC Insurance Broker Management Rules (amended 2026-09-30); Aon Singapore claims advocacy page (direct competition). Arithmetic recomputed — all match. Bear case, fact labels, wedge, numeric stop rules and a concrete execution path present. Confidentiality: PASS (public sources only).
Required in Phase 2 (non-blocking):
1. Taiwan: add FSC rules Art. 14 (15-day reporting of management changes), Art. 16 (cumulative equity transfer ≥50% → capital adjustment within 6 months), Art. 45 as FACT; narrow the "not verified" statement to what remains unverified.
2. Cite the MAS compliance toolkit (not the registration page) for control prior approval.
3. Replace legacy provenance phrasing with "public sources only" (transaction-notes.md, regulatory-notes.md, evidence-review.md).
4. HK one-month controller notification (s64ZZD/Form N5): re-check via browser before asserting as verified, or present as per regulatory-notes with attribution.
5. Keep Aon–USI as "announced/pending" everywhere.

---
# Gate 2 (parent-run, cross-model) · PASS · 3 November 2026
Independent Claude release reviewer: check-visuals PASS; 18 cards at 390/737/1440, no errors/overflow, endings reachable, 18/18 hashes; charts unambiguous; 6 clean watercolors; numbers match arithmetic.md; Gate 1 corrections landed; execution path 6/18 incl. PE-backed founder payout. CONFIDENTIALITY: clean (no founder, pitch, fund conversations or private figures). Parent applied the Article 45 wording nit.
