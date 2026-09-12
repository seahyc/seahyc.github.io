# Evidence pack — strain-wave gear reducers

_Research date: 2026-09-12. Founder question: should a founder build aerospace/robotics-grade strain-wave ("harmonic") reducers for Western customers, beginning with outsourced Asian pilots and in-house fatigue/metrology validation?_

## Executive decision

**Do not fund an aerospace-qualified reducer factory on the strength of the supplied market story. Fund a 90-day, customer-led validation cell only if a named robotics or space-equipment customer supplies a load spectrum, interfaces, paid NRE, and permission to test against its incumbent.** The wedge is a documented, traceable second source for a narrow, non-flight robotics axis or space-ground-test actuator—not “30–40 reducers per humanoid” and not an assumed Western legal exclusion of China.

The mechanical opportunity is real: a strain-wave gear uses an elliptical wave generator to deflect a thin flexspline into a circular spline, delivering high single-stage reduction, low/no backlash, compactness and high torque density. But the market and moat are misstated. A major pure-play incumbent, Harmonic Drive Systems (HDS), reported FY2024 consolidated sales of ¥55.645bn, while Nabtesco reported ¥79.3bn for its recast Component Solutions segment in FY2025; neither is a disclosed strain-wave market total. Nabtesco’s famous RV product is a planocentric/cycloidal reducer, although its German subsidiary now sells a separate strain-wave line. Figure says its humanoid actuators are vertically integrated. DoD restrictions attach to USML/600-series items and Chinese military-company status, not every Chinese reducer.

The go/no-go metric is not a press release or a life-test headline. It is a customer-witnessed evidence package: measured lost motion/backlash, torsional stiffness, efficiency, thermal behavior, NVH, contamination control, load-spectrum life, failure analysis, full material/process traceability, and an agreed qualification/acceptance plan. If a pilot cannot meet the customer’s incumbent performance at a landed price that leaves at least 35% gross margin after scrap and test, stop.

## Hypothesis tree

### H1 — A large, reachable strain-wave market exists

* **Support:** HDS calls HarmonicDrive® strain-wave gearing a core technology for industrial robots, semiconductor equipment, medical and aerospace; Nabtesco reports 2024/25 precision-reducer sales and a global ~60% share for medium/large industrial-robot precision reduction gears (company estimate). IFR's public World Robotics page confirms that annual industrial-robot installations are counted in the hundreds of thousands, but the precise 2024 value was not independently readable on that public page.
* **Disconfirming evidence:** HDS does not disclose a strain-wave-only market size; Nabtesco’s share is for precision reduction gears, principally its RV family, not strain-wave units; humanoid production remains uncertain and many firms integrate actuators.
* **Missing evidence:** annual global strain-wave units/ASP by application, Western serviceable segment, lead-time data and qualification conversion rates.
* **Validation:** obtain 10 customer BOMs/quotes and 3 incumbent lead-time/price comparisons; reconcile units × ASP against public supplier revenue.
* **Falsifier:** fewer than 5 qualified Western buyers will provide a target specification or paid sample order, or the reachable segment is < $25m annual revenue at sustainable pricing.

### H2 — The founder can reproduce incumbent fatigue life

* **Support:** HDS catalog ratings state infinite flexspline fatigue life only within rated conditions and show L10 wave-generator bearing lives of 7,000 h (CSF) and 10,000 h (CSG); research identifies diaphragm/tooth-root fatigue and lubricant/wear as difficult failure modes.
* **Disconfirming evidence:** published research says strength calculations remain difficult; a space tribology study found in-vacuum life significantly shorter than in-air life; competitor HDS installation guidance says >70% of its manufactured products are specials, implying application-specific engineering.
* **Missing evidence:** the candidate material, heat-treatment window, residual stress, surface finish, runout, tooth profile, assembly preload, grease and actual customer spectrum.
* **Validation:** destructive metallography plus instrumented torque/angle endurance on statistically meaningful lots; test both nominal and worst-case tolerances; perform root-cause teardown after failure.
* **Falsifier:** any repeatable crack, tooth wear, ratcheting or drift before the customer’s required life at the agreed spectrum, or Cpk < 1.33 on critical dimensions after process lock.

### H3 — Outsourced Asian pilot production is a credible first step

* **Support:** Taiwan has precision gear houses advertising aerospace/robotics and AS9100 capability; Malaysia has AS9100-certified micro-precision gear manufacturing; HDS itself operates global production/sales entities and says it supports suppliers through “development purchasing.”
* **Disconfirming evidence:** ordinary precision gear capability does not prove thin-wall flexspline manufacture, wave-generator bearing integration, or protected process know-how. Nabtesco’s strain-wave offering claims IATF 16949, traceability and patented processes.
* **Missing evidence:** supplier audit, equipment list, heat-treatment records, ownership of drawings/tooling, export-control classification, non-disclosure/enforcement, lot genealogy and willingness to permit customer witness testing.
* **Validation:** audit two suppliers against a process-control plan; order identical lots from two sources; retain first-article, material certs and destructive samples in the founder’s custody.
* **Falsifier:** no supplier will provide raw-data access and change notification, or pilot yield is <70% after two controlled iterations.

### H4 — Western “China exclusion” creates pricing power

* **Support:** DFARS 225.770 bars DoD acquisition of USML/600-series items through a Communist Chinese military company; some primes impose customer-specific provenance and cybersecurity rules.
* **Disconfirming evidence:** the regulation says covered items must be USML/600-series and source must be a Chinese military company; it expressly says ordinary components/parts are not covered unless themselves listed. There is no public evidence that Tesla, Figure, or all DoD buyers are legally barred from every Chinese reducer.
* **Missing evidence:** each target buyer’s approved-vendor list, item classification, ownership screening and flow-down clauses.
* **Validation:** have export counsel classify the exact reducer and have each customer issue written sourcing requirements.
* **Falsifier:** target customers accept Chinese-origin commercial reducers or price the second source below the founder’s traceable cost.

### H5 — $300–500k creates a credible in-house aerospace-grade line

* **Support:** public used/new 5-axis listings range from roughly $138k to $391k base-machine examples; a public vacuum-furnace listing shows $100–400k. A small outsourced pilot can be much cheaper.
* **Disconfirming evidence:** one machine is not a process: tooling, gear measurement, CMM/roundness, heat treatment, test dyno, clean assembly, calibration, facilities, quality system, personnel, scrap and working capital are omitted.
* **Missing evidence:** actual quotations for thin-wall spline tooling, gear-grinding/shaping, vacuum heat treatment, dynamic test equipment and customer qualification.
* **Validation:** obtain three itemized quotations and a facility/quality-system budget before capex.
* **Falsifier:** installed validation capability cannot be funded below $750k without buying away the critical tests or traceability the wedge sells.

## What is verified, what is not

| Supplied claim | Finding as of 2026-09-12 | Decision treatment |
|---|---|---|
| “Global market ~$4.8bn in 2026, $7.8bn+ by 2030” | **Not verified.** No primary source found that defines a strain-wave-only market and supports both figures. Public market-report snippets are proprietary syntheses with unclear inclusion of actuators, RV/cycloidal and planetary products. | Treat as an ungrounded scenario, not TAM. Use supplier revenue and bottom-up customer units. |
| “HDS and Nabtesco are the aerospace-grade strain-wave oligopoly” | **Incorrect as written.** HDS is a strain-wave incumbent. Nabtesco’s flagship RV is planocentric/cycloidal; Nabtesco Precision Europe also now advertises a separate strain-wave portfolio. Harmonic Drive SE, Leaderdrive, Nidec-Shimpo and other suppliers exist. | Map by mechanism, torque class, provenance and qualification; do not aggregate RV and SWG. |
| “Tesla, Figure and DoD are legally barred from Chinese reducers” | **Not verified / overbroad.** DFARS 225.770 is conditional on USML/600-series coverage and Chinese military-company status. Figure publicly says it vertically integrated critical actuators; this is a design/supply-chain choice, not legal proof. | Require buyer-specific written provenance rules; never market a blanket legal moat. |
| “Physics patent expired in the 1950s” | **Misleading.** Musser’s foundational US 2,906,143 was filed in 1955 and issued 1959; Google Patents shows expired-lifetime status. Later tooth-profile, materials, manufacturing and product patents can still matter. | Freedom-to-operate is a claim chart, not an assumption based on the original patent. |
| “A standard shop fails in 100 hours” | **Not verified.** No controlled public comparison supports 100 h. Fatigue is highly load-, material-, surface-, lubricant-, geometry- and environment-dependent. | Design a comparative endurance test; use no 100 h claim. |
| “Moat is 10,000+ h dynamic payload fatigue” | **Partly grounded, wrong unit of proof.** HDS publishes 7,000/10,000 h L10 bearing ratings and infinite flexspline fatigue at catalog-rated conditions; that is not a universal 10,000 h dynamic payload demonstration. | Quote life only against an agreed load spectrum and confidence/reliability basis. |
| “Each humanoid needs 30–40 reducers” | **Not verified.** Figure publishes a 35-DoF action space, not reducer count, and says actuators are designed in-house; DoF is not equivalent to an SWG because hands can be underactuated and transmissions can be belts, screws, gears or direct drive. | Obtain actual actuator BOMs. Model 0–20 SWGs/robot until verified. |
| “Initial in-house capex $300–500k” | **Likely insufficient for aerospace-grade in-house manufacturing; plausible only for a narrow outsourced pilot/validation cell.** Public equipment prices alone can consume the range. | Stage $60–180k outsourced pilot, then $250–700k validation cell, then $1.5–4m integrated production as scenario estimates. |

## Mechanism and engineering reality

The three basic elements are (1) an elliptical wave generator, usually an oval hub and thin-race bearing, (2) a thin alloy-steel flexspline with external teeth, and (3) a rigid circular spline with internal teeth. As the wave generator rotates, the flexspline engages the circular spline at the major axis; a tooth-count difference produces the reduction. The same elastic deformation that enables compactness creates alternating stress in the cup/diaphragm, tooth-root stress, bearing loads, sensitivity to assembly tolerances and a failure mode after overload (“ratcheting”). HDS says up to 30% of teeth can engage simultaneously with its S-tooth design; do not assume that profile is freely reproducible.

An engineering process hypothesis for a serious pilot is: freeze the load spectrum and interfaces; select a certified alloy and blank process; rough-machine or form the cup; stabilize and heat-treat under a controlled recipe; finish-machine the diaphragm and tooth geometry; finish-grind/hone the circular spline; manufacture or source the wave-generator bearing; wash and inspect; assemble with controlled grease, preload and concentricity; measure backlash/lost motion, torsional stiffness, torque ripple, efficiency and noise; then run instrumented endurance and teardown. The exact flexspline forming and heat-treatment route is a supplier/process secret and must be discovered by audit, not copied from a generic CNC workflow.

QA must include material heat/lot certificates; hardness and case-depth or microstructure where applicable; CMM/roundness/tooth-profile/runout; surface finish and burr control; calibrated torque-angle and speed measurement; grease lot and fill mass; assembly torque/preload; serialised genealogy; nonconformance and change-control records; and destructive first-article analysis. “Zero backlash” is a marketing shorthand—measure lost motion under a specified torque, temperature and fixture.

## Market sizing without invented TAM

### Observable anchors

* IFR's public World Robotics 2025 page confirms the scale and geography of industrial-robot installations, but the exact 2024 installation count in the paid report was not independently readable in this pass. Treat it as directional context, not a reducer-demand input.
* HDS FY2024 consolidated sales were **¥55.645bn** (~$370m at a rounded ¥150/$), but the company sells speed reducers and mechatronics; its report does not isolate strain-wave revenue.
* Nabtesco FY2025 recast Component Solutions sales were **¥79.3bn** after the hydraulic-equipment business was classified as a discontinued operation from Q3. Its results material separately attributes ¥11.7bn year-on-year sales growth to precision reduction gears, but does not disclose an SWG-only subtotal. [Official FY2025 results](https://www.nabtesco.com/en/news/20260218-17670/)
* Figure’s official Figure 03 release says BotQ’s first-generation line targets up to **12,000 humanoids/year** and 100,000 over four years; the same release says critical actuators, batteries, sensors, structures and electronics were designed in-house. This is one company’s target, not a global forecast.

### Illustrative serviceable-demand model (not a market fact)

The model intentionally separates robot units from reducer units:

`annual SWG units = named customer robots × verified SWGs/robot + replacement/service units + non-humanoid units`

| Case (12–24 month reachable wedge) | Named annual robot-equivalent units | SWGs per unit (assumption) | SWG units/year | Founder ASP (assumption) | Implied annual sales | Confidence |
|---|---:|---:|---:|---:|---:|---|
| Low: two pilots, no production design-in | 1,000 | 4 | 4,000 | $350 | $1.4m | Low; customer units and attach rate unverified |
| Base: one mid-volume robotics axis plus service/automation | 10,000 | 8 | 80,000 | $500 | $40m | Low/medium; requires written BOMs and a passed qualification |
| High: multiple designs-in, including a humanoid program | 50,000 | 12 | 600,000 | $650 | $390m | Low; explicitly not supported by public unit-per-robot evidence |

These are decision scenarios, not substitutes for the missing market report. A $4.8bn market at a $500 ASP would imply 9.6m units/year before mix and channel discounts—far beyond the 542k annual industrial-robot installation anchor and therefore likely includes many other mechanisms, actuators or services. That arithmetic is a reason to reject the headline, not evidence that the opportunity is small.

## Competitor and geography map

| Supplier / geography | Publicly evidenced offer | What it means for a founder |
|---|---|---|
| HDSI, Japan; Harmonic Drive LLC, US; Harmonic Drive SE, Germany; Shanghai group | Strain-wave reducers, actuators and component sets; global manufacturing/sales network; >70% specials stated by US subsidiary. | Strong incumbent in engineering, applications and qualification. A generic copy has weak differentiation. |
| Nabtesco, Japan | RV planocentric/cycloidal reducer; company claims ~60% share of precision reduction gears for medium/large industrial robot joints. German Precision Europe now lists strain-wave products, automotive/IATF production and patented manufacturing processes. | Do not call Nabtesco only a SWG oligopolist; it is also a formidable alternative mechanism and entrant. |
| Leaderdrive, China | Cup/hat/ultra-flat strain-wave products and a patented “third harmonic” Model Y; claims high-torque variants. | Proves Chinese technical supply exists; quality, provenance and flight qualification remain product/customer-specific. |
| Nidec-Shimpo, Japan/US | Public corporate product literature should be checked for current SWG range and ratings before inclusion in a target list. | Potential competitor; no unsupported share claim. |
| Six Star, Taiwan; Saynen, Taiwan; Ohta Precision, Malaysia | Publicly advertise precision gear, aerospace/robotics work and AS9100/ISO capabilities (claims are supplier self-descriptions). | Useful audit leads for splines, shafts, housings and possibly pilot sub-processes; not yet validated flexspline suppliers. |
| Western primes and robotics OEMs | Figure publicly describes vertical integration and a partner network; HDS positions aerospace, semiconductor, medical and robots as target applications. | The buyer may want a complete actuator or qualified second source, not a bare reducer. Sell evidence and integration support. |

Geography is a qualification variable. Taiwan/Korea/Malaysia can provide skilled gear and heat-treatment capacity, but “Asian” is not a provenance category. Record actual manufacturer, beneficial ownership, material origin, process location, subcontractors and change notification. For a DoD customer, DFARS requires identifying the actual manufacturer/source in many supply contexts; obtain counsel before accepting a flow-down.

## Qualification timelines and customer wedge

There is no universal “aerospace reducer certification.” IAQG’s 9100 is a QMS standard usable across the aviation, space and defense supply chain. NASA’s public product-verification guidance distinguishes qualification (design/environment extremes, normally once if design is unchanged) from acceptance (a smaller test subset on every flight unit), and NASA-STD-7001C addresses payload vibroacoustics—not aircraft gearboxes and not every program. Customer-specific drawings, environmental envelopes, traceability, special processes, source approvals and certification authority determine the schedule.

Planning ranges below are operating assumptions, not promises:

* **0–3 months:** customer specification, FTO/export screen, supplier audit, FMEA, test plan, paid NRE and first-article design.
* **3–9 months:** two pilot lots, metrology correlation, torque/angle and thermal tests, accelerated endurance, teardown and design iteration.
* **9–18 months:** customer witness testing, process capability, acceptance data package, non-flight robotics or ground equipment design-in.
* **18–36+ months:** aerospace/space qualification, environmental testing and program certification where required. A flight design change restarts the relevant verification/qualification logic.

The best initial customer is a Western robot or motion-control OEM that has: an incumbent with >16-week lead time or a documented dual-source mandate; a stable axis specification; annual demand of 1,000–20,000 units; no immediate flight-critical liability; and willingness to pay NRE and witness tests. The wedge is “traceable, tested, configurable second source,” not “cheaper Japanese gear.”

## Capex and supplier plan

All numbers in this section are founder planning estimates in USD, not supplier quotes.

| Stage | What is purchased/outsourced | Planning cash | Gate |
|---|---|---:|---|
| Fabless learning lot | Design/FEM, tooling, 50–200 sets, external heat treatment, CMM/tooth measurement, dyno rental, destructive tests, travel/audit and working capital | $60k–180k | Paid NRE and two audited suppliers |
| Captive validation cell | Used/new 5-axis or turning, calibrated CMM/roundness/tooth measurement, torque dyno, environmental instrumentation, clean assembly, metrology software and QA hire; keep heat treatment outsourced | $250k–700k | Repeatable lot data and customer witness pass |
| Integrated aerospace-grade cell | Gear shaping/grinding, vacuum heat treatment or NADCAP subcontract plus incoming verification, metrology lab, dyno/environmental chambers, 9100 system, facility, tooling, operators and inventory | $1.5m–4m+ | Customer-funded qualification and production forecast |

The supplied $300–500k figure is therefore plausible for a modest validation cell or heavily outsourced robotics pilot, but not credible as a complete aerospace-grade in-house line. Public listings are directional only: a Taiwan listing shows a new 5-axis center at ~$391k base price; a US dealer lists a large 5-axis gantry at $1.4m; a public vacuum-furnace listing shows $100–400k. Installation, tooling, calibration, utilities, software, freight, import duties and maintenance are excluded. The first capital should buy measurement and learning, not irreversible process equipment.

## 12–24 month attack plan

### Months 0–3 — earn the right to test

1. Interview 20 motion-control, robotics, eVTOL/space-ground and defense-prime engineers; secure 3 written target specifications and 1 paid NRE.
2. Choose one torque/diameter family and one non-flight application. Freeze load spectrum, duty cycle, life, temperature, allowable lost motion, stiffness, efficiency, NVH, lubricant and provenance.
3. Build FTO claim charts around later tooth profiles, manufacturing and materials patents; engage export counsel on the exact part and customer flow-down.
4. Audit Taiwan/Korea/Malaysia suppliers; require material/process genealogy, calibration records, change notification, IP ownership and destructive-sample access.

### Months 3–9 — produce evidence, not samples

1. Run two identical pilot lots and one deliberately tolerance-stressed lot. Keep supplier names and serial genealogy in the founder’s system.
2. Correlate supplier and founder metrology; measure lost motion/backlash under load, torsional stiffness, ratio error, efficiency, temperature, vibration and noise.
3. Run instrumented endurance to the customer spectrum, with at least one teardown at planned intervals and failure analysis. Do not extrapolate 100 h to 10,000 h without a fatigue model and statistical basis.
4. Report yield, scrap, Cpk/Ppk for CTQs, warranty reserve and landed cost. If evidence is not improving after two iterations, stop.

### Months 9–18 — convert one design-in

1. Conduct customer-witnessed comparison against incumbent; sign a design-in or supply-development agreement.
2. Implement serialised acceptance data packages, calibration schedule, nonconformance/RCCA and supplier change-control.
3. Add only the measurement/test equipment that removes a demonstrated bottleneck; keep heat treatment and specialized grinding outsourced until volume and recipe control justify ownership.
4. Seek 9100 gap assessment only when a named aerospace customer requires it; certification without a customer requirement is not a moat.

### Months 18–24 — decide whether to scale

Scale only with a 12-month forecast, >35% gross margin after scrap/test/warranty, pilot yield >90%, demonstrated life at the customer spectrum, and a second qualified source for every critical process. Otherwise remain an engineering/test business or stop. A flight-critical program should be a separate financing and quality plan.

## Unit economics: low / base / high

Illustrative contribution model for a standardized robotics reducer. It excludes financing and corporate overhead; test and warranty reserves are explicit.

| Case | ASP | Variable manufacturing + outsourced processes | Test/QA + freight | Warranty/scrap reserve | Contribution/unit | Annual volume | Annual contribution before fixed cost |
|---|---:|---:|---:|---:|---:|---:|---:|
| Low | $350 | $245 (70%) | $35 | $28 (8%) | $42 | 4,000 | $168k |
| Base | $500 | $275 (55%) | $40 | $25 (5%) | $160 | 80,000 | $12.8m |
| High | $650 | $260 (40%) | $45 | $20 (3%) | $325 | 600,000 | $195m |

These cases are **scenarios**, not observed prices or volumes. Low case does not support a serious validation team; base case supports scale only after qualification and working-capital financing; high case is not credible without customer BOM evidence. At $500 ASP, a $1.5m validation/integration program needs ~9,375 contribution units at $160 each before sales and overhead. Price compression, incumbent retaliation, customer concentration, rejected lots and one field failure can dominate the arithmetic.

## Strongest bear case

The founder is entering a mature, application-engineered component market whose “gap” is actually a qualification and integration gap. HDS has decades of process data, global support and a large special-product mix; Nabtesco supplies an alternative high-rigidity mechanism and is expanding its own strain-wave range; Leaderdrive and other Asian suppliers already compete on cost. The supposed Western supply vacuum may be a procurement preference rather than an unmet product need. Humanoids may use vertically integrated actuators, roller screws, belts, cycloidal or direct-drive architectures, so reducer attach rates can collapse. Aerospace buyers can take years to qualify a new source and may demand special processes, ITAR/DFARS controls, insurance and acceptance evidence that a startup cannot finance. Outsourcing the hard processes can leak the very know-how the company claims as its moat; buying them in-house destroys the proposed low capex. A single flexspline crack or undocumented material substitution creates field liability. Under this bear case, the startup becomes a low-volume broker with test overhead, or spends millions to discover that the incumbent’s lead time is acceptable.

**Response:** make the first sale a paid evidence and integration program; choose a non-flight axis with a measurable incumbent pain; maintain dual-source and provenance control; and set a hard stop after two failed pilot iterations or no customer design-in by month 18.

## What the headline omits

* HDS’s FY2024 operating profit was only ¥6m after a 94.4% fall despite ¥55.645bn sales—evidence that a large incumbent revenue number does not automatically mean attractive current margins.
* “Aerospace-grade” is a customer/program designation, not a material adjective. Flight acceptance is per unit; qualification is design/environment-specific.
* Life is spectrum-dependent. Bearing L10 hours are not flexspline crack life; in-vacuum lubrication can materially change wear.
* Bare gear ASP is not actuator ASP. Motors, encoders, bearings, seals, controller, integration and warranty may capture more value.
* Installed robot count does not reveal reducer mechanism, attach rate, replacement cadence, or Western serviceable demand.
* The customer may value traceability and risk transfer more than a nominally lower price, while requiring supplier audit rights that undermine a simple fabless model.

## Public / paywall boundary

Public evidence used here consists of official company pages/reports, government acquisition rules, NASA/IAQG guidance, IFR public statistics, patent records and openly accessible papers. The following remain unavailable or not independently verified: paid market-report definitions behind the $4.8bn/$7.8bn figures; supplier quotes and lead times; HDS/Nabtesco strain-wave-only unit economics and market share; Tesla’s current actuator BOM; Figure’s reducer BOM; customer approved-vendor lists; and proprietary flexspline materials, heat-treatment recipes, tooth-generation math and test datasets. Paywalled papers were used only where their public abstract supports a narrow statement; no paywalled synthesis is promoted to fact.

## Visual evidence briefs

1. **Mechanism cutaway:** wave generator → elliptical flexspline → circular spline; annotate the two engagement lobes, tooth-count difference, elastic cup and the diaphragm/tooth-root fatigue hotspot. Source the mechanism from the HDS technology page and the original Musser patent; label any profile-specific claim as HDS’s claim.
2. **Claim-calibration map:** four columns—HDS SWG, Nabtesco RV cycloidal, Nabtesco SWG (Germany), Leaderdrive SWG—with mechanism, public product evidence, geography, stated quality system and unknowns. This prevents the “HDS + Nabtesco oligopoly” category error.
3. **Evidence funnel:** 542k industrial-robot installations → named customer robots → verified SWGs/robot → passed qualification → profitable units. Put “unknown” labels on every transition not backed by a BOM or test report.
4. **Failure-and-test loop:** load spectrum → FEM/design → pilot lot → metrology → endurance → teardown → corrective action → customer-witnessed acceptance. Include ratcheting, vacuum lubrication and flexspline fatigue as separate branches.
5. **Capex staircase:** fabless pilot ($60–180k estimate) → validation cell ($250–700k estimate) → integrated line ($1.5–4m+ estimate), with the public machine/furnace listings marked “directional, not quotes.”

## Source ledger

| Claim | Type | Direct source / date | Confidence | What it proves | What it does not prove | Counterevidence / limitation | Decision impact | Falsifier |
|---|---|---|---|---|---|---|---|---|
| Musser foundational strain-wave patent filed 1955, issued 1959 | Fact | [US2906143A, Google Patents](https://patents.google.com/patent/US2906143A/en), accessed 2026-09-12 | High | Foundational mechanism and dates; public patent record marks expired-lifetime status | Freedom to operate for later claims | Later profiles/materials/process patents may be active | Supports mechanism availability, not easy manufacturing | Active blocking claim reads on intended design |
| HDS mechanism has three parts and flexspline elastic mechanics | Fact/company claim | [HDS technology](https://www.harmonicdrive.net/technology/harmonicdrive), accessed 2026-09-12 | High for product description | Wave generator, flexspline, circular spline; compact/high-ratio/no-backlash design intent | Independent performance or universal zero backlash | HDS marketing; profile and ratings are product-specific | Defines technical benchmark | Incumbent teardown or customer test contradicts stated construction |
| HDS catalog life and fatigue ratings | Fact/company technical catalog | [HDS CSF Mini catalog PDF](https://www.harmonicdrive.net/_hd/content/catalogs/pdf/csf-mini-5-14.pdf), accessed 2026-09-12 | High for stated catalog values | Infinite flexspline fatigue at rated conditions; L10 7,000/10,000 h bearing ratings; ratcheting warning | 10,000 h dynamic payload life for a new design | One product family; L10 is statistical bearing life, not system life | Sets test language and prevents overclaim | Customer spectrum fails within required reliability/confidence |
| HDS has >70% specials and assembly sensitivity | Fact/company guidance | [HDS installation considerations](https://www.harmonicdrive.net/technology/installation-considerations), accessed 2026-09-12 | High for stated company claims | Most products made to order; tolerances/contamination/radii matter | Startup can reproduce know-how | Company self-report | Favors application-specific wedge | Standardized product cannot achieve target yield |
| HDS FY2024 sales ¥55.645bn and capex ¥3.7bn | Fact/company report | [HDS Report 2025 data/profile PDF](https://www.hds.co.jp/Portals/0/files/csr/HDSreport/2025/HDSREPORT2025_EN_05DataProfile.pdf), report period FY2024, accessed 2026-09-12 | High | Scale and financial boundary; consolidated business includes speed reducers/mechatronics | SWG-only revenue or market size | Operating profit was ¥6m; mixed products/geographies | Reject $4.8bn inference from incumbent sales | Segment disclosure shows SWG-only sales materially different |
| Nabtesco RV is planocentric/cycloidal and ~60% share estimate | Fact/company claim | [Nabtesco precision reduction gears](https://www.nabtesco.com/en/products/robot/), accessed 2026-09-12; [RV catalog](https://precision.nabtesco.com/img/area/leaflet_pdf/en/en_cat_product-guide.pdf), accessed 2026-09-12 | High for mechanism; medium for share | RV mechanism, applications and company’s stated share | SWG market share or aerospace-grade SWG dominance | Share is Nabtesco’s estimate and applies to medium/large industrial robots | Corrects oligopoly framing | Independent market data excludes/contradicts claimed share |
| Nabtesco now sells strain-wave products in Germany | Fact/company claim | [Nabtesco Precision Europe strain-wave gears](https://www.nabtesco.de/en/products/strain-wave-gears), accessed 2026-09-12 | High | Separate SWG product family, IATF 16949, traceability/patented process claims | Volume, market share, aerospace qualification | Marketing claims; German entity’s exact production split unknown | Adds a serious competitor and process benchmark | Supplier audit shows only relabeling/no production capability |
| Leaderdrive offers multiple SWG families | Fact/company claim | [Leaderdrive strain-wave products](https://www.leaderdrive.com/product/list-6-1.html), accessed 2026-09-12 | High for offer existence | Chinese supply and claimed high-torque/third-harmonic variants | Reliability, provenance acceptability or aerospace qualification | Vendor claims; no independent endurance dataset | Disproves “no Chinese capability” | Customer test fails or product unavailable at required volumes |
| Figure targets 12k/year and vertically integrates actuators | Fact/company announcement | [Figure 03](https://www.figure.ai/news/introducing-figure-03), 2025-10-09, accessed 2026-09-12 | High for announcement | One humanoid OEM’s production target and actuator integration choice | Global production or reducer attach rate | Plans may not be realized; actuator architecture is not full BOM | Weakens 30–40 SWG/robot thesis | Released BOM shows 30–40 purchased SWGs |
| Figure reports 35-DoF action space | Fact/company announcement | [Figure Helix](https://www.figure.ai/news/helix), 2025-02-20, accessed 2026-09-12 | High | 35-DoF upper-body control claim | 35 reducers; a DoF may use another transmission or shared actuator | Hands/underactuation and integrated actuator unknowns | Do not convert DoF to reducer units | Customer BOM verifies a fixed SWG count |
| Annual industrial-robot installations are in the hundreds of thousands; exact 2024 count not independently readable on the public page | Directional statistic | [IFR World Robotics 2025](https://ifr.org/worldrobotics/report-2025), published 2025-09-25, accessed 2026-09-12 | Low–Medium | Industrial robot installation context and geography | Exact count, SWG attach rate, humanoid demand or serviceable market | Full report is paywalled; public page did not expose the precise cited count to the verifier | Context only; do not use in market arithmetic | Accessible IFR table or dataset provides a materially different scale |
| Nabtesco FY2025 recast Component Solutions sales were ¥79.3bn after hydraulic equipment became a discontinued operation | Fact/company filing | [Nabtesco FY2025 results](https://www.nabtesco.com/en/news/20260218-17670/), published 2026-02-18, accessed 2026-09-12 | High | Segment scale and recast basis | Strain-wave-only revenue or market share | Segment includes businesses beyond strain-wave products | Prevents false market sizing and hydraulic-business misclassification | Audited filing reports a different recast basis |
| DoD Chinese-source prohibition is conditional | Fact/regulation | [DFARS Subpart 225.7](https://www.acquisition.gov/dfars/subpart-225.7-prohibited-sources), change effective 2026-05-07, accessed 2026-09-12 | High | USML/600-series and Chinese military-company conditions; exceptions/waivers | Ban on every Chinese reducer or private Chinese supplier | Exact item classification and ownership require counsel | Reject blanket “legally barred” claim | Written customer clause applies to target reducer |
| NASA distinguishes qualification and acceptance | Fact/guidance | [NASA Product Verification 5.3](https://www.nasa.gov/reference/5-3-product-verification/), accessed 2026-09-12 | High | Qualification once per unchanged design; acceptance each flight unit; evidence hierarchy | Universal aerospace timeline or reducer-specific test plan | Program-tailored and customer authority-specific | Sets qualification plan and schedule uncertainty | Customer program specifies a different regime |
| 9100 is aerospace/space/defense QMS | Fact/standard body | [IAQG 9100](https://iaqg.org/standard/9100-qms-requirements-for-aviation-space-and-defense-organizations/), accessed 2026-09-12 | High | QMS applicability and supply-chain role | Product qualification or customer approval | Standard text/implementation may require licensed access | Budget QMS only when wedge requires it | Customer requires another QMS/special process |
| NASA-STD-7001C scope is payload vibroacoustics | Fact/standard | [NASA-STD-7001](https://standards.nasa.gov/standard/nasa/nasa-std-7001), version C dated 2026-07-14, accessed 2026-09-12 | High | Public environmental-test standard and scope/exclusions | Complete gearbox qualification | Applies to spaceflight payload hardware; excludes aircraft/launch vehicles/GSE | Avoid claiming one standard covers aerospace reducers | Customer invokes another standard |
| Flexspline diaphragm fatigue is a difficult research problem | Fact/research | [Li, Mechanism and Machine Theory](https://www.sciencedirect.com/science/article/pii/S0094114X16300866), 2016, accessed 2026-09-12 | Medium/high | Public abstract supports stress measurement/FEM and fatigue hotspot framing | Candidate design life or production recipe | Landing page exposes abstract/metadata; full text is paywalled | Justifies destructive testing and FEA correlation | Replicated test fails to identify dominant hotspot |
| Vacuum can shorten SWG life via lubricant/wear | Fact/research | [Ueura et al., Tribological aspects](https://journals.sagepub.com/doi/10.1243/13506501JET415), 2008, accessed 2026-09-12 | Medium/high | Public abstract reports shorter in-vacuum life and wave-generator/flexspline wear mechanism | Every vacuum design’s life or exact grease | Journal full text may be paywalled; application-specific | Aerospace/space must have environment-specific validation | Vacuum test shows no differential under same setup |
| Public equipment prices make $300–500k narrow | Estimate/market lead | [Taiwan 5-axis listing](https://www.equipt.com/listings/11744-new-2025-pinnacle-ax500-vertical-machining-centers-in-taiwan), accessed 2026-09-12; [APEC 5-axis listing](https://direcmachinetool.com/equipment/8174172-apec-mt1530-5s-5-axis-gantry-machining-centers-incld-bridge-and-double-column), accessed 2026-09-12; [vacuum furnace listing](https://www.made-in-china.com/price/prodetail_Furnace_iwDAeWscQdpF.html), accessed 2026-09-12 | Low/medium | Directional public asking prices | Delivered/installed quotes or suitability for flexsplines | Listings can be stale, incomplete or non-equivalent | Use staged capex and demand quotes | Three quotes show materially lower all-in cost |
| Taiwan/Malaysia supplier capability leads | Supplier claim/lead | [Six Star Taiwan](https://www.sixstar.com.tw/en/index.html), accessed 2026-09-12; [Saynen Taiwan](https://www.saynen.com.tw/webls-en-us/index.html), accessed 2026-09-12; [Ohta Precision Malaysia](https://www.ohtaprecision.com/), accessed 2026-09-12 | Low/medium | Advertised gear, aerospace/robotics and AS9100/ISO capabilities | Flexspline competence, capacity, customer approvals or independence | Self-reported capabilities; audit required | Supplier shortlist only | Audit fails or no controlled pilot access |

## Falsification tests and next data collection

1. **Market test (weeks 0–6):** secure 10 BOM/quote disclosures; record mechanism, units/year, ASP, lead time, source restrictions and incumbent failure/shortage. Stop if no paid NRE or no specification access.
2. **FTO/provenance test (weeks 0–8):** claim-chart later patents; classify the exact reducer under ITAR/EAR/DFARS; screen ownership and all subcontractors. Stop if a required buyer cannot accept the proposed source chain.
3. **Process test (weeks 4–16):** audit two suppliers and produce two lots; blind-measure CTQs; calculate yield/Cpk and inspect microstructure. Stop if genealogy/change-control is unavailable.
4. **Life test (weeks 8–36):** run customer spectrum, overload/ratcheting, thermal and environmental variants; tear down statistically selected units. Stop on repeatable early crack/wear or unbounded test-to-test drift.
5. **Economic test (weeks 12–40):** price delivered units including scrap, test labor, warranty, freight, financing and customer audit; compare against incumbent quotes. Stop if contribution is <35% gross margin at a volume supported by a signed forecast.
6. **Qualification test (months 9–24):** obtain a customer-owned verification/acceptance matrix, witness test and design-in decision. Stop the aerospace branch if no certifying authority and acceptance plan are named.

## Assumptions, sensitivity and disagreement log

### Model assumptions

* Currency conversion uses a rounded ¥150 = $1 only to communicate scale; no FX forecast is implied.
* Revenue scenarios use `units × SWGs per unit × ASP`; they exclude replacements unless explicitly included in the named-unit assumption.
* Contribution uses `ASP − manufacturing − test/QA/freight − warranty/scrap`; fixed engineering, sales, financing and tax remain outside the table.
* Yield, customer volume, mechanism attach rate and ASP are the highest-leverage unknowns. Every value not sourced to an actual quote/BOM is an assumption.

### Base-case sensitivity (80,000 units/year)

| Change from base ($500 ASP, $275 manufacturing, $40 test, $25 reserve) | Contribution/unit | Annual contribution before fixed cost |
|---|---:|---:|
| Base | $160 | $12.8m |
| ASP −20% ($400) | $60 | $4.8m |
| Manufacturing cost +20% ($330) | $105 | $8.4m |
| 85% saleable yield (effective 68,000 units) | $160 | $10.88m |
| ASP −20% and manufacturing +20% | $0 | $0 |

The last row is the warning: modest price compression plus process-cost overrun can erase the apparent scale economics before fixed cost, warranty tail or customer concentration is counted.

### Provider disagreement log

| Provider | Statement | Independent reconciliation |
|---|---|---|
| HDS | HarmonicDrive® is a high-precision, zero-backlash strain-wave technology; its catalog uses infinite flexspline fatigue at rated conditions and specified bearing L10 hours. | Accepted as a product claim and engineering benchmark; not generalized to all suppliers or arbitrary payloads. |
| Nabtesco | RV has ~60% of medium/large industrial-robot precision-reducer market and is the world’s top-share precision reducer; its German subsidiary separately advertises strain-wave products. | The share is company-estimated and mechanism scope is RV/precision reducers, not SWG-only. The two statements coexist and disprove “Nabtesco is only an SWG oligopolist.” |
| Leaderdrive | Chinese cup/hat/ultra-flat and third-harmonic SWGs are offered, with higher-torque variants. | Accepted only as evidence of product availability; no independent life, qualification or provenance evidence was found. |
| Figure | 35-DoF control and 12,000 humanoid/year target; critical actuators designed in-house. | Accepted as company announcements, but neither is converted to reducer units. |
| Market-report snippets | $4.8bn in 2026 and $7.8bn+ in 2030. | No definition, primary dataset or reproducible unit/ASP bridge found; excluded from factual sizing. |

## Annotated bibliography

* **Harmonic Drive Systems / Harmonic Drive LLC technical pages and catalog.** Primary product mechanism, installation sensitivities, ratings and life equations. Strong for what the incumbent claims; not independent proof of market size or a new entrant’s performance.
* **HDS Report 2025.** Primary financial and corporate-history boundary. It explicitly says FY2024 reporting, gives ¥55.645bn consolidated sales and positions strain-wave technology across many applications. It does not isolate SWG revenue.
* **Nabtesco product and IR materials.** Primary evidence for RV’s planocentric mechanism, its company-estimated robot share, FY2025 segment sales and a separate German SWG line. This is the central correction to the oligopoly claim.
* **Leaderdrive product pages.** Primary evidence that Chinese strain-wave products and design variants exist. Vendor claims require independent life, metrology and provenance checks.
* **Figure AI Figure 03 and Helix announcements.** Primary evidence for actuator vertical integration, a 12k/year manufacturing target and 35-DoF control. Neither provides a reducer BOM; they are deliberately not converted into SWG demand.
* **IFR World Robotics 2025.** Best public industrial-robot installation anchor found. It is not a reducer market report and should not be multiplied by a guessed attach rate.
* **DFARS 225.7 and NASA/IAQG guidance.** Primary regulatory and quality/verification boundaries. These are why “aerospace-grade” must be customer/program-specific and why the legal China claim is too broad.
* **Musser patent and fatigue/tribology research.** Patent history and independent technical rationale for treating the flexspline, tooth root and lubrication environment as first-order engineering risks. The ScienceDirect and Sage articles have paywall boundaries; only public abstracts/open manuscripts were used for narrow claims.

## Source-access audit

Every URL in the source ledger was opened during research on 2026-09-12. The browser research pass could read the official HDS, Harmonic Drive, Nabtesco, Leaderdrive, Figure, IFR, Acquisition.gov/DFARS, NASA, IAQG, Google Patents, supplier and equipment pages. A direct curl spot-open returned HTTP 403 for IAQG, DFARS, Equipt, ScienceDirect and Sage (anti-bot/paywall responses) and HTTP 404 for an earlier Shimane manuscript URL; that manuscript URL was removed from the ledger and is not used as proof. The HDS full 25 MB integrated-report PDF exceeded the web reader’s fetch limit, so official section PDFs were used instead. ScienceDirect and Sage landing pages exposed abstracts/metadata but not full text; those paywall boundaries are recorded above.
