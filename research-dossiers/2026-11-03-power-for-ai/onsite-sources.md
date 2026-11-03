# Phase 1 onsite power for AI — source notes

**Evidence cutoff:** 2026-11-03. Sources below were accessed on 2026-11-03. Publication dates are listed per source; sources dated after the cutoff are excluded. This is an evidence ledger, not a market forecast. Announced orders, capacity slots, planned projects, and target commissioning dates are not treated as delivered generation.

## Key findings and calibration

- **Gas turbines are a dispatchable onsite option with a long OEM queue.** GE Vernova's latest available report at cutoff (2026 Q3, published 2026-10-28) reported 122 GW of gas equipment backlog plus slot reservation agreements, with at least 130 GW targeted by year-end 2026. This is equipment backlog/production capacity, not current site-ready capacity or an individual buyer's delivery date. Siemens Energy said it was sold out through FY2028 and FY2029 slots were filling rapidly in its March 2026 pre-close call; its Nov. 2025 investor presentation likewise reported capacity sold out through FY28. MHI reported 23 large-frame GTCC orders in 1H FY2025, but the reviewed primary release does not quantify a general lead time. Avoid asserting an MHI-wide delivery queue from that source alone.
- **Fuel cells have real, but much smaller, onsite deployment evidence.** Bloom reported Equinix deployments exceeding 100 MW in 19 U.S. data centers, with approximately 75 MW operational and 30 MW under construction as of Feb. 2025. This is a vendor announcement and customer-specific deployment, not proof that the full announced total was operating, or that Bloom can serve all hyperscale demand. Bloom describes its fuel cells as electrochemical and non-combustion, but natural-gas fuel still has upstream emissions and is not carbon-free. Its SEC filing describes fuel flexibility and operating risks; its sustainability report's no-water statement is limited to the fuel cell's steady-state operation, not necessarily the data center cooling system or whole lifecycle.
- **Batteries shift energy across a bounded duration; they do not create energy.** DOE defines discharge duration as stored energy divided by rated power (e.g. 1 MW/4 MWh = 4 hours). A battery can bridge a grid interruption or buffer ramping, but sustained 24/7 load requires replenishment, added energy capacity, or generation. DOE technical assumptions also show lithium-ion duty is constrained by depth of discharge, cycling, and degradation; do not compare a battery's MW rating alone with a generator's continuous fuel-backed output.
- **TMI/Crane is not yet restarted.** As of the cutoff, Constellation's Aug. 2026 update said restart progress continued and cited NRC approval of a fuel-license amendment, while projecting restart in 2027. The NRC facility page, directly readable in Dia and last reviewed 2026-10-08, still labels the unit “Potential Restart.” Detailed licensing/inspection sections were not visible in browser-rendered text during this recheck, so those specifics below rely on indexed NRC content, not a complete browser read. Microsoft's PPA is support for a future restart, not present power delivery from the plant.
- **Geothermal is promising but project timing matters.** Fervo's Sep. 2026 Google PPA covers 396 MW from Cape Station, expected online in 2028; additional capacity is an option and data-center plans remain contingent. This is contracted future output, not currently available onsite generation. Fervo's SEC registration describes its Google framework as non-binding on Google's purchase of proposed projects.
- **Singapore’s Green DC Roadmap is a constrained-growth and efficiency plan, not a blanket moratorium.** IMDA's current overview confirms sustainable continued growth, but its detailed 2024 capacity targets were not fully readable on recheck: the fact sheet/PDF encountered a JS/bot challenge. Treat the 300 MW near-term target as an announcement found in search-indexed primary-source text, and the additional 200 MW as pending full-source verification. Do not imply that a blanket moratorium remains in force in 2026.

## Source ledger

### 1. GE Vernova — gas equipment backlog and manufacturing ramp

- **Latest source at cutoff:** GE Vernova, “GE Vernova reports strong third quarter 2026 financial performance,” 2026-10-28. [Primary results release](https://www.gevernova.com/news/ge-vernova-reports-strong-third-quarter-2026-financial-performance)
- **Observed:** Q3 reports gas equipment backlog and slot reservation agreements rose from 116 GW to 122 GW; company anticipated at least 130 GW by year-end. Total backlog reached $197B. Q3 does not restate the earlier 20 GW Q3 2026, 24 GW 2028 and 30 GW 2030 annual output targets; those were disclosed in Q2 on 2026-07-22 [Q2 source](https://www.gevernova.com/news/articles/ge-vernova-releases-second-quarter-2026-financial-results). Annual production targets are distinct from cumulative backlog.
- **Type/confidence:** Vendor-reported order book and guidance; high confidence that the company made these disclosures, medium confidence as a proxy for eventual deliveries.
- **Does not establish:** Individual customer delivery dates, project permitting/fuel/pipeline readiness, commissioning, net dependable output, or that booked GW equals turbines already manufactured. Slot reservation agreements should not be conflated with firm delivered units.

### 2. Siemens Energy — backlog, capacity, and sold-out horizon

- **Source:** Siemens Energy, Capital Market Day 2025 Gas Services slides, 2025-11 (presentation dated November 2025). [Primary PDF](https://assets.siemens-energy.com/dam/5fc093ca-4fd8-482c-8390-b39b004f66f3/251120_CMD-2025_Gas_Services_FINAL-pdf_Original%20file.pdf)
- **Observed:** Slide reports roughly 78 GW new-unit backlog; FY25 sold 194 gas turbines versus 100 in FY24; capacity presented as 17 GW FY24, 22 GW average FY25–27, and >30 GW average FY28–30; says capacity sold out until FY28. The backlog footnote includes orders booked in FY24/FY25 and secured orders expected in the next 12 months.
- **Type/confidence:** Company disclosure/projection; high for the stated company view, medium as a deliverability proxy.
- **Does not establish:** A firm universal lead time, customer-specific delivery, or availability of turbines inclusive of EPC, permitting, grid interconnection, and gas infrastructure.

### 3. Siemens Energy — later queue update and bottleneck

- **Source:** Siemens Energy, Q2 FY2026 pre-close group call script, 2026-03-30. [Primary PDF](https://assets.siemens-energy.com/dam/70568add-abb0-4cb7-91bc-b41d01144be8/2026-03-30---Q2-FY26-Pre-close-group-call-script_final-pdf_Original%20file.pdf)
- **Observed:** Management said gas turbine capacity was sold out until FY2028; FY2029 slots were filling quickly, with some FY2030 slots booked. It identified blades and vanes as the main industry bottleneck. The script also notes logistics/shipping could create project delays.
- **Type/confidence:** Management statement; high that this was the company’s queue assessment at the time, medium on schedule outcomes.
- **Does not establish:** Every product family or geography has the same queue; slot reservation is not equivalent to installed generation. FY is Siemens fiscal year, not calendar year.

### 4. Mitsubishi Heavy Industries — order demand evidence

- **Source:** MHI, “Mitsubishi Heavy Industries Announces Order Intake, Revenue, and Profit Growth in Strong 1H FY2025,” 2025-11-07. [Primary source](https://www.mhi.com/news/25110701.html)
- **Observed:** Energy order intake rose mainly on GTCC demand; MHI concluded contracts for 23 large-frame gas turbine units in 1H FY2025, up 14 year over year, mostly from North America and Asia. MHI management explicitly connected U.S. utility capex demand to data-center electricity growth.
- **Type/confidence:** Company-reported orders; high for order count and management commentary.
- **Does not establish:** Delivery dates, commissioning, share of those orders dedicated to AI, or MHI's overall order backlog/lead time. Use this as demand/order evidence, not a delivery forecast.

### 5. Bloom Energy / Equinix — deployed fuel-cell capacity

- **Source:** Bloom Energy, “Bloom Energy Expands Data Center Power Agreement with Equinix Surpassing 100MW,” 2025-02-20. [Primary vendor announcement](https://www.bloomenergy.com/news/bloom-energy-expands-data-center-power-agreement-with-equinix-surpassing-100mw/)
- **Observed:** Bloom says collaboration exceeded 100 MW across 19 U.S. Equinix data centers; about 75 MW was operational and another 30 MW under construction. Bloom says systems supplement grid power.
- **Type/confidence:** Vendor statement about a named customer arrangement; medium. Strong evidence of some operational deployment, not independent metering or complete verification.
- **Does not establish:** 105 MW all operating, standalone baseload replacement, current fuel-cell market capacity, other customer installations, or full lifecycle carbon intensity. “Cleaner” is relative to the comparison baseline and depends on fuel and accounting boundary.

### 6. Bloom Energy — emissions, fuel flexibility, and company risk language

- **Source:** Bloom Energy, Form 10-K for FY ended 2025-12-31, filed 2026. [SEC filing](https://www.sec.gov/Archives/edgar/data/1664703/000162828026006516/be-20251231.htm)
- **Observed:** Bloom describes solid-oxide systems converting natural gas, biogas, hydrogen, or blends electrochemically without combustion and claims lower GHG/criteria-pollutant emissions than conventional fossil generation. The filing also flags forward-looking risks around demand, production capacity, suppliers, financing, customer deployment, incentives, and strategy.
- **Type/confidence:** Company description and risk disclosure; high that these claims/risks appear in the filing; performance comparisons remain vendor claims.
- **Does not establish:** Zero emissions from natural gas, lifecycle carbon neutrality, independent comparative emissions, or guaranteed scale-up. Electrochemical conversion avoids combustion at the device, but methane supply-chain emissions remain relevant.

### 7. Bloom Energy — water boundary

- **Source:** Bloom Energy, 2025 Impact Report, published 2026. [Primary vendor report PDF](https://www.bloomenergy.com/wp-content/uploads/2025-bloom-energy-impact-report.pdf)
- **Observed:** Bloom says fuel cells use no water in steady-state operation and are more water-efficient than traditional thermoelectric generation.
- **Type/confidence:** Vendor claim; medium for device-level operating water boundary.
- **Does not establish:** Zero water for the complete data-center system, cooling plant, fuel extraction/processing, manufacturing, or all startup/shutdown/maintenance modes. Keep generation water and data-center cooling water separate.

### 8. DOE — battery duration and limits

- **Source:** U.S. DOE, Energy Storage Grand Challenge Cost and Performance Assessment 2022, 2022-08. [Primary technical report](https://www.energy.gov/cmei/2022-grid-energy-storage-technology-cost-and-performance-assessment)
- **Observed:** Defines duration as rated energy divided by rated power. The report models 2-, 4-, 6-, 8-, 10-, 24-, and 100-hour systems; notes lithium-ion depth-of-discharge/cycle-life tradeoffs and system rest assumptions that vary by duration.
- **Type/confidence:** Government technical assessment; high for definitions and stated modeled assumptions, but dated 2022.
- **Does not establish:** One universal duration for all commercial batteries in 2026 or that batteries cannot be built for longer duration. The central operational distinction remains that stored energy must be charged from generation/grid supply; duration must be specified along with MW and MWh.

### 9. Microsoft and Constellation / NRC — Three Mile Island Unit 1 / Crane status

- **Sources:** Constellation Q2 2026 results, 2026-08-06 (canonical domain; accessible) [Constellation](https://www.constellationenergy.com/news/2026/08/constellation-reports-second-quarter-2026-results.html); NRC facility restart page, last reviewed 2026-10-08 (current summary status accessible in Dia) [NRC](https://www.nrc.gov/facilities-safety/facility-finder/reactors/ccec); Microsoft 2026 sustainability report [Microsoft](https://www.microsoft.com/en-us/corporate-responsibility/topics/sustainability/report/).
- **Observed:** Constellation says NRC approved a fuel-license amendment and its restart work is progressing toward 2027. NRC calls the plant a “potential restart,” shows its former operating shutdown date of 2019-09-26, and states restart requires restoration of operating licensing basis, component readiness, any necessary upgrades, NRC review, and inspections. Microsoft says its PPA supports the restart.
- **Type/confidence:** Regulatory status is highest-confidence for licensing state; Constellation's 2027 is a company target. Microsoft gives offtake intent, not plant status.
- **Does not establish:** Operating status, completed restart, actual power delivery, or final regulatory approval. The planned plant must not be counted as currently available capacity.

### 10. Fervo Energy / Google — advanced geothermal future supply

- **Source:** Fervo Energy, “Fervo Energy and Google Sign 396 MW PPA,” 2026-09-01. [Primary source](https://fervoenergy.com/fervo-energy-and-google-sign-396-mw-ppa/)
- **Observed:** 396 MW PPA supports Cape Station EGS, expected online in 2028. Google has an option for roughly 600 MW more by June 2030; the source says potential data-center plans remain subject to engineering feasibility, approvals, and commercial conditions. It describes earlier Project Red as online in 2023 and supplying the local grid.
- **Type/confidence:** Vendor/customer announcement; medium for signed PPA and existing pilot status, low-to-medium for future completion targets.
- **Does not establish:** Current 396 MW output, firm data-center siting, successful full-scale replication, or delivery before the project enters operation. PPA is not equivalent to physical onsite generation.

### 11. Fervo — framework agreement caveat

- **Source:** Fervo Energy, Form DRS/A, filed 2026-03-31. [Primary SEC filing](https://ir.fervoenergy.com/static-files/10f6fb98-30b5-477f-84a0-888f20a732e1)
- **Observed:** Fervo describes a framework under which it is to propose at least 1 GW of projects to Google within two years and up to 3 GW over the agreement term; filing says Google has no obligation to accept projects, sign PPAs, or provide financing.
- **Type/confidence:** Company regulatory filing; high for the disclosed contractual caveat.
- **Does not establish:** 1–3 GW of contracted/approved/financed/operating geothermal capacity. Distinguish this framework from the separately announced 396 MW PPA.

### 12. Singapore IMDA — managed DC expansion and green energy conditions

- **Sources:** IMDA, Green Data Centre Roadmap announcement, 2024-05-30 [fact sheet](https://www.imda.gov.sg/resources/press-releases-factsheets-and-speeches/factsheets/2024/charting-green-growth-for-data-centres-in-sg); Roadmap executive summary [PDF](https://www.imda.gov.sg/-/media/imda/files/news-and-events/media-room/media-releases/2024/05/green-dc-roadmap.pdf); current roadmap overview [IMDA](https://www.imda.gov.sg/how-we-can-help/green-dc-roadmap).
- **Observed:** Current overview page was fully readable in Dia; it says at least 300 MW additional capacity in the near term, with more through green-energy deployments, and describes sustainable continued growth. It confirms the refreshed Green Mark, efficiency grant, and SS 715:2025. The specific 200 MW wording and details of eligible green-energy pathways come from the 2024 fact sheet/PDF, which were not readable in this recheck due to JS/bot challenge; those details remain search-indexed claims awaiting direct page verification. Historical moratorium language is from IMDA's 2025 retrospective blog and was not reopened on this pass.
- **Type/confidence:** Government policy statement; high for overview page framing, medium for the 300 MW target as shown on that page, low for extra 200 MW/eligible pathways until direct source access succeeds.
- **Does not establish:** That 300 MW has been fully built by the cutoff, that further 200 MW is guaranteed, or that Singapore has an active blanket moratorium in 2026. Treat 300 MW as an announced near-term target, and extra 200 MW as conditional and pending direct source verification.

## What the headlines omit / unresolved checks

1. Turbine “lead time” is not one number. OEM backlog is not an individual project's delivery date; delivery must be combined with EPC slot, permitting, emissions approvals, gas pipeline capacity, water/cooling, interconnection, and commissioning. Public OEM sources reviewed here do not provide a comparable cross-vendor order-to-commercial-operation dataset.
2. Onsite gas shifts the bottleneck to gas transport and local emissions permitting; it remains fossil generation. Check fuel firmness, methane intensity, NOx controls, and community approvals at the project level.
3. Fuel-cell “onsite” systems can still rely on utility gas and grid imports. Verify fuel source, annual utilization, achieved net output, emissions boundary, interconnection behavior, and maintenance/service availability.
4. Batteries are useful for ride-through, ramping, and time shifting. Report both MW and MWh and state recharge source. They do not solve a multi-day energy deficit without adequate generation or charging supply.
5. Nuclear and geothermal projects should be counted as future pipeline until operating and delivering. A PPA, framework, regulator approval milestone, or announced turbine allocation is not current generation.
6. Singapore roadmap capacity figures are policy targets/options. Check project-level approval, land, power allocation, fuel source, and operating status before treating announced capacity as supply.

## Verification record and limitations

- Web searches were run for official OEM, operator/customer, regulator, DOE, and IMDA sources. On recheck, GE's latest Q3 source (2026-10-28) superseded Q2 for backlog: 122 GW versus 116 GW. Constellation's canonical www-domain Q2 release loaded and confirmed the 2027 restart target. Using Dia browser identity `fb-power-for-ai-onsite`, IMDA's current roadmap overview was fully readable and NRC's current page summary showed “Potential Restart,” reviewed 2026-10-08.
- **Access limitations:** IMDA's 2024 fact sheet/PDF encountered JS/bot challenge; NRC's detailed licensing page returned 403 in web access and only the status summary rendered in Dia. Detailed NRC licensing and inspection caveats above therefore rely on search-indexed page text, not an independent full browser read. The 300 MW target is visible in the current IMDA overview; the 200 MW number and listed energy pathways remain pending direct verification.
- **Unverified:** I did not independently confirm real-time turbine order books with buyers, physical deliveries/commissioning for announced projects beyond each source's reported status, Bloom's output telemetry/emissions, project-level turbine lead times, Fervo construction progress beyond company disclosures, or that Singapore roadmap allocations were all operational by the cutoff.
