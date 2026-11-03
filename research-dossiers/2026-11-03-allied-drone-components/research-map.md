# Allied drone components — research map

3 November 2026. Phase 1 only. Public-evidence research; no buyer interviews, RFQs, orders, engineering tests or regulatory submissions performed.

## Founder decision and present answer

Should a founder build a proof-first second source of traceable, non-Chinese drone components for allied OEMs, starting from Asia with one buyer-qualified high-voltage electronic speed controller (ESC), renting manufacturing and charging paid qualification NRE?

**Present answer: fund a bounded paid-discovery effort; do not launch production yet.** The requested premise—one critical component has no affordable non-Chinese source—has not been established. Existing German motors, Australian ESCs and Taiwanese ESCs contradict categorical absence. Affordability is a relationship between a buyer's required operating envelope, origin rules, delivered price and schedule, not a component category. One priced Taiwanese ESC is material counterevidence. See E09–E15 and supplier-notes.md.

**Provisional single-component wedge:** a documented, buyer-qualified ESC for a specified 48–60 V nominal system and at least 3 kW electrical operating requirement, with the actual maximum pack voltage, continuous duty, cooling, motor compatibility and mass agreed by the buyer. These are proposed discovery filters, not a demonstrated product, a universal interceptor requirement, or a claim to match China's control definition. Start with an allied OEM in Taiwan or Australia with a named procurement programme that accepts the proposed manufacturing location. Singapore is a possible coordination base, not evidence of eligibility or demand. US sales require a separate route-to-market decision and potentially US manufacturing.

**Why ESC first (inference):** contract electronics production and a versioned firmware/BOM/test package fit a rented-manufacturing company better than establishing cells or magnet refining. Unlike a motor, an ESC need not contain a rotor magnet; it still depends on semiconductor and PCB sub-tiers. An ESC also has observable thermal/duty-cycle specification differences that a buyer can evaluate. This is a tractability judgment, not proof that ESCs have the largest shortage or the best margin. A documented motor bottleneck could overturn the ranking.

Desired reader conclusion: allied supply resilience is a serious possibility, but the company must sell a physically reproducible accepted component, together with evidence, rather than sovereignty language or a self-issued compliance badge. Existing assessment firms and suppliers already sell parts of the proof. Buy, distribute or qualify existing products first if that satisfies the customer.

## Actors, geography, incentives and horizon

- OEM engineering owns interface and performance acceptance; procurement owns schedules, landed cost and releases; compliance owns the applicable sourcing regime; an authorized assessor/regulator retains certification decisions.
- Contract manufacturers want stable releases and clear design/change control. Sub-tier suppliers may not disclose wafer/material origin. The founder must own the design rights and transfer package or contract for durable access to them.
- Authorized counter-UAS system integrators may buy propulsion components for interceptors. A civilian facility owner buying detection is a different customer with different hardware and legal authority. Do not count both as ESC demand.
- Allied-country manufacture, non-Chinese direct suppliers, non-Chinese upstream materials, NDAA eligibility, Blue Framework status, FCC equipment authorization and Buy American eligibility are distinct claims. Build a SKU × buyer × jurisdiction matrix.
- Planning horizon: a conditional 12–24 months. Public budget requests, political targets and announced capacity do not constitute a startup order book.

## Hypothesis tree

The supplied brief defines the initial hypotheses below. This written map records the evidence-updated tree; it was consolidated after discovery rather than timestamped before the first source retrieval.

| Branch | Support | Disconfirming evidence | Missing | Validation action |
|---|---|---|---|---|
| H1: supply rules create a paid second-source need | MOFCOM licensing change; EO domestic priority; DIU provenance assessments (E01–E07) | Licensing is not embargo; FCC restrictions cover foreign production generally; existing compliant suppliers | Named buyer's source restriction and rejected alternatives | Founder/compliance lead obtain requirements and legal eligibility matrix before quoting |
| H2: ESC is the most useful initial component | Explicit power/controller controls; published ESC thermal rating caveats; contract-manufacturing fit | APD, Scorpion and Vertiq already offer controllers/integration (E09–E12); no exhaustive supplier census | Comparable written prices, scheduled capacity, exact mission envelope | Engineering lead compare incumbent SKUs on identical acceptance plan; allow a no-build result |
| H3: evidence is scarce enough to sell | DIU requires provenance, firmware/hardware artifacts and independent reports | Recognized Assessors and incumbent suppliers already provide evidence (E07/E12) | Who pays NRE and which tests are transferable | Founder seek two paid pilot scopes with named accepting engineer and nonexclusive data rights |
| H4: renting manufacture preserves attractive economics | Scenario can produce positive contribution at sufficient releases | Scrap, retests, NRE under-recovery and working capital can destroy returns | CM quotes, yield history, fixtures, liability and payment terms | Operations lead obtain two scoped CM bids; include rejected units and supplier deposits |
| H5: allied demand is reachable from Asia | Taiwan policy supports component localization, testing and overseas links (E16); Australian supply precedent | US domestic priority, FCC/onshoring/tariff barriers; ESC coverage/authorization classification unresolved; Buy American and Conditional Approval routes are item-specific; PDW domestic investment; relationships already captured | Buyer permits Asian production, export classification and lawful end use | Compliance counsel and importer sign off each route; stop US route if localization cost exceeds demand |
| H6: counter-drone increases demand for this component | Full-system demand exists; official DDP orders show procurement activity | Detection systems need no interceptor ESC; defeat authority is restricted; some law enforcement exceptions exist | Authorized integrator's actual BOM and annual releases | Separate detection customers from authorized mitigation OEMs; no extrapolation from total C-UAS budget |

## Mechanism and product boundary

An ESC switches battery power into timed motor currents. A motor turns electrical input into shaft work; the propeller creates thrust. A catalogue peak is not a guarantee of continuous useful operation. Evidence must specify cooling, duty cycle, temperatures, wiring, firmware, load and the buyer's failure criteria. This first-principles explanation is engineering synthesis, not a measured design result.

Proposed paid deliverable: one frozen SKU/revision; authorized BOM and sub-tier declarations with unresolved origin explicitly marked; serial/lot genealogy; firmware hash and change history; buyer-agreed test plan, raw logs and calibrated-instrument records; independently witnessed acceptance where contracted; nonconformance/rework records; and replacement/change notification obligations. Qualification belongs to the named buyer/programme. The startup cannot certify itself onto a government list.

Counter-UAS conceptual chain: **detect → track → identify → decide → defeat**. Sensors establish observations, tracking associates them over time, identification and human/rules assessment inform a decision, and authorized effectors act. Detection alone does not determine intent. Each handoff can fail; no universal detection range or interception success rate is asserted. See E18–E20. This report covers the procurement/component layer, not tactical engagement or effector design.

## Strongest bear case

The founder sees a policy-driven shortage just as governments subsidize domestic incumbents and OEMs integrate or lock in suppliers. The apparent origin gap may already be solved by an APD/Scorpion/Vertiq SKU plus an assessor. If the actual bottleneck is magnets or cells, an ESC company solves the wrong problem. If origin must extend through every material, affordable qualifying supply may not exist for the founder either. If Asian production is ineligible for the largest programme, a US site erases the capital-light premise. A service-heavy qualification business can have positive project margin without repeat manufacturing economics. NRE may buy one bespoke project, not recurring purchase orders. ESCs are not expressly named in the FCC list; coverage and authorization remain open questions. China’s linked ESC definition can also create licensing friction for the founder’s own supply chain. Falling drone price targets can compress component budgets while qualification obligations remain.

Anduril, Skydio and Red Cat are leads for competitive/customer work, not grounds for asserting every OEM has vertically integrated every component. PDW explicitly plans external component supply; Red Cat's announced sourcing relationship is evidence that outsourcing also occurs (E14/E15).

## Falsifiers and proposed gates

All numeric gates here are founder-chosen screening rules, not sourced industry standards or observed outcomes.

1. Stop the shortage claim if two incumbent quotes meet the same origin, duty, mass, price and delivery envelope. Offer distribution/qualification only if paid demand survives.
2. Stop the new-SKU effort if no two independent OEMs will each commit at least USD75,000 qualification NRE, a named accepting engineer and a credible release schedule within 90 days. Letters of interest without money do not pass.
3. Stop if sub-tier origin cannot be evidenced to the buyer's actual rule; do not replace unknown with non-Chinese.
4. Stop if the measured/quoted accepted-unit contribution is below 25%, or credible releases do not cover annual fixed cost and customer-specific engineering. Recompute from quotes rather than treating scenario values as targets suppliers must meet.
5. Stop expansion if a second customer needs a materially different board/firmware/test programme without paying its incremental NRE. Do not hide engineering services in unit gross margin.
6. A successful pilot is not long-term reliability certification. Require buyer-approved sample sizes and stress profiles; count failures and rework. This research prescribes no universal qualification duration.

## Next action with owner, time, metric and rule

**Founder, next 30 days:** 12 structured interviews across at least four independent allied OEMs; request recent failed procurements and incumbent quotes, not forecasts alone. Engineering lead creates one common requirement matrix. Compliance counsel identifies permitted manufacturing and data-transfer routes before controlled technical work. Obtain two incumbent quotations and two CM bids for the same scope, including origin evidence, acceptance, yield, NRE and payment terms. No outreach has been sent by this research.

**By day 90:** the founder owns two paid, legally eligible qualification scopes and a cash plan; engineering owns the pre-agreed incumbent comparison; operations owns version/lot traceability and supplier terms. Go only if paid scopes satisfy the gates above, a buyer-confirmed shortage survives the comparison, and finance can fund the downside cash exposure. Otherwise stop new hardware, change component based on documented pain, or become an honest qualification/distribution service.

## Conditional 12–24 month attack plan

- Months 0–3: establish an actual gap; collect NRE; compare existing components first; choose one manufacturing jurisdiction and rights structure.
- Months 3–6: produce a limited buyer-defined qualification lot through a contracted manufacturer; secure independent assessment as required; publish no unearned qualification claim.
- Months 6–12: deliver accepted paid releases on frozen revisions; measure first-pass yield, accepted-unit cost, rework, field returns, collection time and customer concentration.
- Months 12–24: transfer the same qualified SKU to a second OEM or qualify a second manufacturing site only when paid demand funds it. Revalidate origin, changes, export eligibility and working capital. Buy manufacturing assets only after measured utilization justifies ownership.

## Phase boundary

No narrative, images, public build or publication in Phase 1. Missing canonical example: research-dossiers/2026-11-02-sewer-robotics/market-evidence.md does not exist; its ledger and other requested examples were studied. Gate 1 evidence-review.md must come from an independent verifier; a pass does not resolve explicitly excluded source gaps.
