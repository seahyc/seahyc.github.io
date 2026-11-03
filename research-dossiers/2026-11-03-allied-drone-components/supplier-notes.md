# Supplier disconfirmation pass — 3 November 2026

Scope: primary supplier documents read directly through web open, including product specifications and caveats. No supplier contacted; no purchase, test, audit or quotation occurred. Company assertions are evidence of an offering or stated plan, not independent validation of origin, capacity or performance.

## Decision implication

**Inference:** A blanket “no non-Chinese motor or ESC exists” premise fails. German motors, Australian ESCs, Taiwanese ESCs and an integrated motor/ESC with vendor-reported Blue UAS Framework approval already exist. **Missing:** equivalent mission-qualified products at a buyer-approved price, quantity, delivery date and upstream-origin standard. “Affordable” needs a price ceiling and measured requirement; public sources do not establish this gap.

The wedge should therefore be a falsifiable procurement hypothesis: one customer-specific propulsion requirement for which existing sources fail cost, delivery, qualification or auditable sub-tier origin. Avoid asserting that every ≥48 V / ≥3 kW product is interchangeable, or multiplying maximum voltage by current to infer a qualified motor shaft-power rating.

## P1 — Plettenberg: established German motor manufacture

- Type/confidence: vendor fact, high confidence in what the pages state; medium in unaudited manufacturing claim. Company page undated, accessed 2026-11-03; datasheet dated 2026-06-15, version 1.4.
- Sources: [company](https://plettenbergmotors.com/company/), [NOVA 15 WK product](https://plettenbergmotors.com/product/nova-15-wk-en/), [exact NOVA 15-50-B4 P30 WK datasheet](https://plettenbergmotors.com/wp-content/uploads/2026/06/Datasheet_NOVA-15-50-B4-P30-WK_Version-1.4.pdf).
- Company says all products are manufactured at German HQ and its quality system is EN 9100:2018 certified. Exact COTS datasheet lists 15 kW peak output, 15–80 V range, 3,200 g, water cooling, IP54; peak torque duration is five seconds. Cooling assumption is 7 litres/minute at a maximum 40°C inlet. No public price obtained.
- Proves: a named high-power BLDC offering from a self-described German manufacturer; not absence of allied motors.
- Does not prove: 15 kW continuously or specifically at 48 V, suitability for a small interceptor, magnet/feedstock country, customer qualification, price, lead time or production capacity. Datasheet options include test reports and qualification, which is not proof every unit already satisfies every customer's test plan.
- Counterevidence/impact: established products and application engineering compete with the proposed qualification service; mass and cooling can make this offering irrelevant to a specific airborne mission.

## P2 — Advanced Power Drives: Australian ESC supply

- Type/confidence: vendor fact, high confidence in published offer; not independently audited. Undated pages accessed 2026-11-03.
- Sources: [product range](https://powerdrives.net/products-1), [UHV technical guide](https://docs.powerdrives.net/products/uhv).
- APD says all controllers/accessories are Australian manufactured. UHV guide specifies 45 kW peak capability; 20S/400A and 28S/300A variants; 0.74 kg; NDAA/DFARS-compliant options on request. Its continuous-current definition is 180 seconds at full throttle with 10 m/s airflow. No current direct supplier price obtained.
- Proves: non-Chinese assembly and compliance options are explicitly offered, conditional on vendor claim.
- Does not prove: all APD SKUs share the compliance option, semiconductor fabrication country, continuous endurance at arbitrary thermal conditions, or buyer-specific qualification/price.
- Counterevidence/impact: a new generic allied ESC faces existing suppliers. Ask for the exact compliant SKU and component-origin declaration, rather than transferring a brand-wide claim to an unspecified BOM.

## P3 — Scorpion: public Taiwanese ESC price and exact thermal caveat

- Type/confidence: vendor fact, high confidence in observed list/specification; origin unaudited. Undated pages accessed 2026-11-03.
- Sources: [Tribunus III 14-220A ESC product](https://www.scorpionsystem.com/catalog/speed_controllers/tribunus_esc/hv_tribunusIII_series/III_14_220/), [manufacturing explanation](https://www.scorpionsystem.com/info/brushless_speed_controllers/).
- Product shows $499.99 (dollar symbol; currency not independently verified), backorder with claimed shipment within two weeks, manufacture in Taiwan and “Western” components. Lists 13–61 V, 220A maximum continuous current, 300A peak, 194g without wires / 294g with wires. Crucial qualification: continuous current is rated at full throttle for only 60 seconds with 35 m/s airflow. General ESC page says predominantly Taiwanese assembly; product-specific page is stronger evidence for this SKU.
- Proves: an actual priced non-Chinese-manufactured ESC offer, subject to supplier assertion.
- Does not prove: affordable to an attritable-drone customer, Chinese-free sub-tier fabrication, export eligibility, funded order, actual lead time, or prolonged low-airflow service. Do not treat “Western components” as a wafer-fab-country declaration.
- Counterevidence/impact: fail a “no affordable source” assertion unless a buyer's precise ceiling and mission envelope exclude this option.

## P4 — Vertiq: integration and qualification already offered

- Type/confidence: product fact / vendor-reported qualification, high confidence in page contents. Product undated; approval post displays January 29 without a year in extracted page. Accessed 2026-11-03; do not invent the year.
- Sources: [81-08 G2 product](https://www.vertiq.co/81-08-g2), [approval announcement](https://www.vertiq.co/blog/vertiq-approved-for-blue-uas-framework).
- Product is an integrated motor plus 60A, 14S ESC; maximum voltage 58.8 V; mass 301–313g depending on configuration. Vendor says this module was added to DIU's Blue UAS Framework and evaluated against relevant NDAA/ASDA requirements. Page has contact-sales rather than a public price.
- Proves: an existing integrated propulsion/qualification competitor.
- Does not prove: ≥3 kW mechanical output, full rare-earth-origin independence, every Vertiq SKU approved, affordable price, or current official-list status independently checked in this slice.
- Counterevidence/impact: qualification evidence is not a vacant business category; a new entrant needs a documented requirement the incumbent cannot meet.

## P5 — CubePilot: allied flight controllers are already documented

- Type/confidence: signed supplier declaration, medium-high; no independent BOM audit. Document undated, accessed 2026-11-03.
- Source: [CubePilot NDAA product declaration](https://discuss.cubepilot.org/uploads/short-url/7VtllWhwlP8OckXPBMBBOa99m8B.pdf).
- Declaration says listed products have no critical components from covered foreign entities, manufacture in Taiwan/US-owned factories, Blue products in Fremont, California and non-Blue products in Taipei. Product table lists Cube Red/Orange+ in Taiwan and Cube Blue/Blue H7 in USA.
- Proves: direct supplier origin/compliance documentation exists, including Asian manufacture.
- Does not prove: every product carrying the brand is covered, every sub-tier material is non-Chinese, or the latest procurement regime accepts that exact declaration. No price obtained.
- Counterevidence/impact: do not call flight controllers categorically unavailable. Product-specific declarations are more useful than corporate nationality.

## P6 — Doodle Labs: radio incumbent and a source-drift warning

- Type/confidence: vendor fact/marketing claim, medium. Undated [supply-chain page](https://doodlelabs.com/capabilities/supply-chain), accessed 2026-11-03.
- Live page claims non-ITAR/NDAA/Blue UAS-compliant supply, 300,000-radio annual capacity, samples under two weeks and production in two to four weeks. Search-index text returned an older 200,000 figure; use the read page if quoting and retain this disagreement.
- Proves: established supplier explicitly markets compliance, supply scale and continuity.
- Does not prove: shipped volume, utilization, every sub-tier country, buyer-specific price/lead time or absence of export restrictions. Non-ITAR is not equivalent to unrestricted export.
- Counterevidence/impact: radios do not appear to be an empty supplier category. Avoid treating supplier capacity claims as market demand.

## P7 — Teledyne FLIR: thermal camera supply exists

- Type/confidence: vendor fact, high in published offer; no origin audit. Undated, accessed 2026-11-03.
- Source: [Boson OEM product](https://oem.flir.com/products/boson/?segment=oem&vertical=lwir).
- Page states NDAA-compliant and ITAR-free Boson thermal modules, with 640×512 and 320×256 detector resolutions. No price or sub-tier-country attestation obtained from the primary product page.
- Proves: non-covered-compliance thermal modules are commercially offered.
- Does not prove: a cheap interceptor's cost budget, unrestricted re-export, all materials outside China or exact SKU clearance. A separate vendor announcement URL found in search returned 404, so its detailed claims are not used here.
- Counterevidence/impact: thermal cameras might have an affordability gap, but public page cannot quantify it.

## P8 — Molicel: Taiwan-manufactured cell alternative, with upstream limits

- Type/confidence: vendor facts/specification, high for stated specifications, medium for unaudited plant claims. [About](https://www.molicel.com/about/) and [P50B datasheet](https://www.molicel.com/wp-content/uploads/Product-Data-Sheet-of-INR-21700-P50B-80122.pdf), accessed 2026-11-03; datasheet version 1.1 has no visible issue date.
- About page identifies manufacturer facilities in Tainan and Kaohsiung and reports P50B mass production. Datasheet lists typical 5,000mAh / 18Wh, nominal 3.6V, maximum mass 71g, and 60A continuous discharge with an 80°C cutoff. It explicitly disclaims a performance guarantee.
- Proves: a named allied cell producer with a high-power cell offering.
- Does not prove: absence of Chinese cathode/anode/feedstock inputs, available quantity, defense-specific qualification, price, pack safety, or equivalent pouch-cell energy/power performance.
- Counterevidence/impact: making a wholly new cell plant is not justified by claiming no non-Chinese cells; pack-level qualification and upstream traceability remain separate questions.

## P9 — PDW: funded-integrator threat must distinguish commitment from delivery

- Type/confidence: company announcement, high in existence of the announced conditional commitment; no independent financial close verification.
- Source: [PDW release dated 2026-07-31](https://www.pdw.ai/posts/pdw-receives-conditional-820-million-loan-commitment-from-us-department-of-war-to-power-americas-drone-arsenal).
- PDW announces a conditional loan commitment of up to $820m for domestic critical-component manufacturing, including propulsion, power/control and vision, intended to supply its own aircraft and other domestic manufacturers. Financial, legal, technical and diligence conditions precede close.
- Proves: an integrator is explicitly trying to become a component supplier, with a financing commitment described as conditional.
- Does not prove: funds disbursed, production online, SKU performance, sale prices, or displacement of a specific startup.
- Counterevidence/impact: generic trusted-component supply can face subsidized, customer-adjacent competitors. A startup needs speed and a customer gap rather than an abstract sovereignty pitch.

## P10 — Red Cat / Unusual Machines: external sourcing can beat a vertical-only thesis

- Type/confidence: issuer press release, medium-high in announced relationship; delivery not verified.
- Source: [Unusual Machines release, 2025-02-26](https://www.newswire.com/news/red-cat-becomes-first-u-s-based-drone-manufacturer-to-source-motors-22525900).
- Issuer says Red Cat placed an initial order for three motor variants and planned interim partner-facility production before its US plant. Cost parity with Chinese motors is explicitly a goal and forward-looking statement, not demonstrated economics.
- Proves: at least one prime/integrator announced outsourced custom motors, so total captive verticalization is too strong a bear claim.
- Does not prove: the order shipped, today's price parity, audited origin or a new entrant's access to the account.
- Counterevidence/impact: supplier opportunities exist, but relationships and customization are already being captured.

## P11 — USA Drone Motors: the proposed business shape has direct competition

- Type/confidence: vendor offering, medium; no factory visit or independent scale verification. [Homepage](https://usadronemotors.com/), undated, accessed 2026-11-03.
- Vendor offers custom motors and claims Los Angeles design/machining/assembly, winding, magnet insertion, balancing and testing, with a four-week custom-motor lead time. “Affordable” is its marketing language, not a quantified price.
- Proves: custom domestic propulsion with manufacturing/testing is an existing pitch.
- Does not prove: production volume, upstream magnet origin, customer acceptances or low cost. No fixed-unit quote obtained.
- Counterevidence/impact: selling proof and outsourced/custom motor delivery is not automatically differentiated.

## Validation requests before selecting a motor/ESC wedge

1. Get one OEM's signed requirements: nominal versus maximum voltage, shaft-power duty cycle, airflow/cooling, mass/volume, vibration/endurance, interfaces, exact upstream-origin rule and annual scheduled releases.
2. Obtain like-for-like quotes from incumbent suppliers above, with full landed price, NRE, MOQ, lead time, warranty and buyer-witnessed acceptance criteria. No outbound messages were sent in this slice.
3. Require lot-specific origin evidence for magnets, rare-earth feedstock, winding/stator, bearings, MCU, PCB and power semiconductors. “Made in,” “NDAA,” “Blue” and “zero China” are distinct propositions.
4. Only proceed if a buyer pays qualification NRE and accepts an explicit price/delivery premium after seeing competing quotes; otherwise the claimed bottleneck is unproven.

## Read failures and boundaries

- EU Motors 2025 product profile URL was found but full open failed due to 17.7MB content-size limit: https://eumotors.eu/wp-content/uploads/2025/08/EU-Motors-product-profile-2025.pdf . Its snippets are not used as verified evidence.
- PDW-linked government release returned 403: https://www.war.gov/News/Releases/Release/Article/4561771/the-office-of-strategic-capital-signs-820-million-conditional-loan-commitment-w/ . Commitment is attributed to PDW, not independently confirmed government text in this slice.
- No paywalled source used. No claim of an exhaustive supplier census, audited China-free upstream BOM or proven price gap.
