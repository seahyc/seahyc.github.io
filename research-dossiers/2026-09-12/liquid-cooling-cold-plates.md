# Fieldbook evidence pack: leak-proof direct-to-chip cold plates

_Research date: 2026-09-12 (Asia/Singapore)_  
_Decision: Should a founder build leak-proof direct-to-chip cold plates for AI racks, starting with Southeast Asian contract manufacturing and QA/thermal validation for Western Tier-2 integrators?_

## Decision in one page

The opportunity is real, but the supplied narrative overstates both the market certainty and the ease of entry. A founder should pursue a **qualification-led, platform-specific wedge** only if a named integrator supplies a real server/GPU interface, pays non-recurring engineering (NRE), and accepts a staged qualification plan. The founder should not begin by building a generic “micro-fluidic” cold-plate factory or by assuming that a Southeast Asian contract manufacturer is already qualified.

The most defensible starting product is a validated cold-plate loop for one or two specific accelerator/server platforms, with a controlled bill of materials, thermal/hydraulic test data, pressure/leak records, material-compatibility dossier, traceability, and field-service instructions. The customer buys reduced qualification and deployment risk—not copper alone.

The thesis is **conditionally investable** when:

- a Tier-2 server or data-centre integrator has an actual design slot and can provide the mating envelope, allowable pressure drop, coolant, flow, temperature and reliability requirements;
- the customer funds NRE and gives access to a thermal test vehicle, rather than asking a startup to self-finance a speculative design;
- the manufacturing partner can demonstrate process capability, clean assembly, joining control and repeatable leak/thermal test data;
- the startup owns validation, configuration control, test fixtures and customer evidence, while outsourcing non-critical machining initially.

It is **not yet proven** that 2,300 W is the Vera Rubin GPU TDP, that a Vera rack is 225 kW, that liquid penetration rises from 33% to 53% in 2026, that Taiwan suppliers are uniformly backlogged, or that Western hyperscalers categorically refuse Chinese cooling hardware. These statements should not be used in an investment memo without customer or primary-source confirmation.

## What the supplied claims get right—and wrong

| Supplied claim | Evidence judgement | Correction for the founder |
|---|---|---|
| Air cooling caps at ~35 kW/rack | **Too absolute.** ASHRAE’s 2026 AI framework says air limits were once viewed as 25–35 kW but may be around 40 kW with better design; Schneider publishes a 40 kW maximum air-cooled reference design. | Treat 30–40 kW as a design-dependent transition band, not a law. Inlet temperature, airflow, containment, chassis layout and residual heat matter. |
| Vera Rubin GPU is 2,300 W | **Unverified.** NVIDIA’s public Vera Rubin NVL72 page gives 72 GPUs, HBM4, bandwidth, 45°C factory inlet and performance figures, but no 2,300 W GPU TDP in the material reviewed. | Use the customer’s platform-specific thermal design power and transient/EDP envelope. Do not repeat 2,300 W as fact. |
| Vera rack is 225 kW | **Not supported by reviewed primary material.** NVIDIA DSX currently describes Vera Rubin NVL72 cabinet TDP scaling to 330 kW and a TCS design flow of at least 1.5 LPM/kW. | Build against the actual reference design and SKU. A 225 kW number may describe another configuration, but it needs a source and definition (IT load, cabinet TDP or facility load). |
| Liquid penetration goes 33% in 2025 to 53% in 2026 | **Only the 2025 point was located publicly.** TrendForce publicly forecasts 14% in 2024 and 33% in 2025. Neither the supplied 53% for 2026 nor an earlier claimed 40% for 2026 was supported by the inspected filing. | Model scenarios rather than a single 2026 penetration point. Adoption is heterogeneous by rack power, generation and retrofit constraints. |
| Taiwanese suppliers are severely backlogged | **Plausible but not demonstrated here.** Public TrendForce research describes urgent demand, but the detailed supply/backlog dataset is not public in the reviewed page. | Ask target integrators for current lead times, allocation and approved-vendor gaps. Do not infer a universal Taiwan shortage. |
| US hyperscalers refuse Chinese cooling hardware | **Overbroad.** U.S. federal procurement has restrictions on named Chinese telecommunications/video-surveillance equipment and defense procurement has prohibited-source rules; this does not establish a blanket commercial hyperscaler ban on passive cooling parts. | Sell “auditable, non-PRC supply chain” only where the buyer’s policy requires it, with a written country-of-origin and component declaration. |
| Initial CapEx is $30k–$80k | **Too low for a qualified product business.** It may fund prototypes and outsourced machining, but not a complete clean, traceable pressure/thermal QA capability. | A lean validation cell is more plausibly $120k–$250k if test equipment is bought; lease equipment and outsource machining to lower cash needs. |
| A $500k automated facility can be built in 18 months | **Unknown and likely incomplete.** The number excludes building services, metrology, clean assembly, joining qualification, automation, EHS, validation fixtures and working capital. | Treat $500k as a possible small machining/assembly cell only after the process is proven; budget a separate qualification and working-capital tranche. |

## Hypothesis tree

### H1 — There is paid demand for an independent cold-plate supplier

- **Support:** AI rack power is moving above the practical air-cooling range; NVIDIA’s Vera Rubin architecture is explicitly liquid-cooled and its DSX guidance calls out 198–330 kW cabinet TDP and at least 1.5 LPM/kW TCS flow. OCP and ASHRAE now provide terminology, classes and comparison metrics.
- **Disconfirming evidence:** Integrators may already have approved suppliers (CoolIT, Boyd, Delta, Asetek, OEM-owned designs), and the cold plate may be bundled into the server OEM’s qualification. A smaller buyer may prefer a complete liquid-cooling system, not a standalone plate.
- **Missing evidence:** Named buyer, platform, annual volume, current lead time, target price, and a documented second-source gap.
- **Validation action:** Interview 10 integrators/OEM thermal leads; secure three written requirement sheets and one paid NRE proposal.

### H2 — Southeast Asian contract manufacturing can meet the quality bar

- **Support:** Precision CNC, brazing and friction-stir-welding capabilities exist across the region; outsourcing is technically possible in principle.
- **Disconfirming evidence:** Capability is not the same as validated process control. A cold plate has hidden channels, joining defects, contamination, corrosion and pressure-cycle risk. The incumbent supply chain has decades of field data and test infrastructure.
- **Missing evidence:** Supplier audits, sample Cpk, joining qualification, cleanliness, helium/pressure leak method, thermal repeatability, traceability and change-control records.
- **Validation action:** Run a paid supplier audit and a 30–50-piece process lot; test every part and retain destructive samples.

### H3 — A startup can win on validation and speed, not scale cost

- **Support:** OCP explicitly lists heat-transfer performance, pressure, pressure drop, flow, temperature, filtration and material compatibility as cold-plate metrics. Buyers need evidence packages and serviceability, not only a drawing.
- **Disconfirming evidence:** CoolIT advertises in-house prototyping/validation and multi-gigawatt production; Boyd claims five million delivered cold plates and 100% inline thermal/flow testing. A startup cannot beat those suppliers on volume immediately.
- **Missing evidence:** The buyer’s actual cost of qualification delay and whether a startup’s data package is accepted by the platform owner.
- **Validation action:** Sell a narrow “qualification pack + pilot lot” with acceptance criteria written by the buyer before tooling.

### H4 — The business can reach positive contribution before a factory is needed

- **Support:** Machining, joining and some test capacity can be rented or subcontracted; NRE can fund tooling and engineering.
- **Disconfirming evidence:** Low volume carries fixture, inspection, scrap, logistics, warranty and engineering costs. Every design change can restart qualification.
- **Missing evidence:** Actual quote stack, yield, cycle time, labor, shipping, coolant compatibility and warranty reserve.
- **Validation action:** Obtain three supplier quotes and build a 100-, 500- and 2,000-unit costed pilot plan before committing equipment.

## Grounded demand drivers and standards

### Demand drivers that survive scrutiny

1. **Heat density:** ASHRAE’s AI framework discusses high-power requirements often at 30–100+ kW/rack and says air limits may be around 40 kW with better design. Its retrofit guidance recommends hybrid DTC liquid cooling above 50 kW/rack while retaining air for residual heat. These are design guidance, not universal thresholds.
2. **Rack-scale liquid architectures:** NVIDIA’s public Vera Rubin page describes 72 Rubin GPUs per NVL72, 20.7 TB HBM4 and 1,400 TB/s aggregate memory bandwidth, with a 45°C inlet specification for the 100 MW factory configuration. NVIDIA’s DSX infrastructure guide describes a 1.5 LPM/kW minimum TCS flow and cabinet TDP from 198 to 330 kW. The public DSX page is partly access-controlled; exact design limits must be confirmed with the buyer.
3. **Hybrid operation:** OCP defines hybrid cooling as liquid on high-density components with air still used on lower-power components. Vertiv says DTC commonly removes 70–75% of rack heat, leaving air cooling for power supplies, capacitors, storage and networking. A “cold plate removes all rack heat” pitch is wrong for most deployments.
4. **Operational risk:** OCP requires a leak-prevention strategy plus detection and intervention. Vertiv highlights dripless QDs, flow monitoring and advanced leak detection. The value proposition includes uptime and serviceability, not merely thermal resistance.
5. **Standards maturity:** OCP’s ACS Liquid Cooling Cold Plate Requirements document is an open baseline. It defines the TCS (technology cooling system) and FWS (facility water system), component metrics, fluid categories, pressure safety, sensors, leakage intervention and comparison fields. ASHRAE W17/W27/W32/W40/W45/W+ classes encode maximum facility supply-liquid temperature; they do not certify a particular plate.

### Standards and qualification hooks

- **OCP cold-plate metrics:** thermal performance (W/m²°C or °C/W), operating pressure, pressure drop, flow, inlet/outlet temperature, active area and filtration requirement.
- **Pressure:** OCP quotes typical TCS operating pressure of 140–450 kPa (20–65 psi) for in-rack/row CDUs, and notes IEC 62368-1 leak testing at 3× normal operating pressure, 2× under abnormal/single-fault conditions, versus ASME B31.3 at 1.5× design pressure. Confirm the applicable code and buyer test method with counsel and the integrator.
- **Leak detection:** indirect (pressure/flow/temperature analytics) and direct (spot or cable sensors); intervention can be manual or automatic de-energization and fluid shutoff.
- **Fluids:** water with additives, glycol-based, dielectric and refrigerant systems each change thermal performance, viscosity, corrosion and compatibility. Never qualify a plate without naming the coolant and additives.
- **Certification:** OCP notes local requirements such as UL/FCC in the U.S. and CE in Europe. A passive metal part may not itself need every system mark, but the integrated assembly and installation can.

## Cold-plate architecture and manufacturing reality

### Architecture

The baseline is a copper or aluminum heat spreader attached to the accelerator package with a defined TIM and mounting load. Internal channels or fins expose area to the TCS fluid. Supply and return ports connect via hoses and dripless QDs to a server loop and rack manifold; the CDU separates the TCS from facility water and controls flow, pressure, temperature and leak signals.

“Micro-fluidic” is not automatically better. OCP says a micro-channel design raises heat-transfer area but also increases complexity, filtering requirements and cost; a simpler internal-pipe block is preferable if it meets the thermal requirement. The design target is system-level junction/case temperature, pressure drop and maintainability at the specified flow—not the smallest channel.

### Process options

- **CNC machining + cover/join:** flexible for prototypes and low-volume variants; inspect channel geometry and joining surfaces carefully.
- **Vacuum or controlled-atmosphere brazing (CAB):** creates a bonded assembly but requires alloy/flux control, fixturing, atmosphere control, void control and destructive process qualification. Boyd’s technical paper describes CAB aluminum cold plates and a nitrogen atmosphere.
- **Friction-stir welding (FSW):** solid-state joining suited to aluminum cold plates; Boyd describes FSW on CNC equipment as useful for prototype and production volume. Validate tool wear, weld path, defects and post-weld distortion.
- **Skived fins:** a one-piece base/fin process that cuts and folds fins to increase area; useful for heat transfer but does not by itself solve a sealed liquid path. It is a process option, not a complete cold-plate architecture.
- **Assembly:** controlled cleaning, particulate control, sealing, ports/QDs, TIM and packaging. Coolant compatibility includes metals, seals, hoses, brazing flux, inhibitors and biocides.

### Minimum QA/reliability stack

1. Incoming material and alloy/temper verification; lot traceability for plate, cover, filler, seals and QDs.
2. Dimensional/CMM inspection of mounting face, flatness, port position and channel-critical features.
3. Joining process qualification with cross-sections/destructive coupons and parameter lock.
4. 100% pressure/leak test to the customer’s code and method (pressure decay, air-under-water, helium mass spectrometry or equivalent); retain serialised records.
5. 100% flow and pressure-drop test against a reference curve; reject blocked or underperforming parts.
6. Thermal test on a calibrated heater/thermal test vehicle at inlet temperature, flow and heat load; report thermal resistance, spatial temperature uniformity and uncertainty.
7. Cleanliness/flush/particle test and coolant-material compatibility; OCP calls out filters because particles can foul microchannels.
8. Pressure-cycle, thermal-cycle, vibration/handling, QD-cycle and corrosion/aging tests appropriate to the customer’s life requirement.
9. Failure-mode and effects analysis (FMEA), control plan, gauge R&R, calibration schedule, nonconformance process and engineering-change control.
10. Packaging, drain/dry/flush, nitrogen charge where specified, shipping orientation and field replacement instructions. Vertiv’s logistics guidance requires coolant identification and test records for shipped assemblies.

The phrase “zero leak” should be replaced with a measurable leak rate, test pressure, test duration, sample size, detection limit and warranty boundary.

## Value chain, competitors and geography

### Where value accrues

Chip/platform owner → server/OEM integrator → cold-plate loop and manifold supplier → CDU/facility integrator → data-centre operator. The highest leverage sits at the interface and qualification boundary: a plate that is thermally excellent but fails a server fit, QD, coolant or service requirement is unsellable.

### Visible competitors and implications

- **CoolIT Systems (Canada + Asia):** offers cold plates, cold-plate loops, rack manifolds and CDUs; states that Canada and Taiwan engineering/innovation centres support custom cold plates and that it has global manufacturing. Its 15 kW validated cold plate and co-innovation positioning make it a direct benchmark.
- **Boyd (U.S. with global manufacturing):** claims five million liquid cold plates delivered to hyperscalers, 100% inline thermal/flow testing and 100% leak testing. This is a company claim, not independently audited market share, but it demonstrates the incumbent quality/volume bar.
- **Delta Electronics (Taiwan/global):** markets liquid-to-air and liquid-to-liquid CDUs and cold-plate loops for AI/HPC; its public materials show system-level breadth and an established Taiwan manufacturing base.
- **Asetek (Denmark/global):** its D2C “ingredient cooler” integrates pump and cold plate, highlighting a competing architecture with fewer connections and a lower-pressure loop.
- **Vertiv and other system integrators:** sell CDUs, rack and facility cooling, leak monitoring and deployment services. A plate startup must fit into these systems and avoid displacing the integrator’s service margin.

### Southeast Asian starting geography

Malaysia, Vietnam, Thailand, Singapore and Taiwan-adjacent supply chains offer access to CNC, electronics and data-centre customers, but public evidence in this pass does not prove that any particular job shop is qualified for high-reliability AI cold plates. Country location is not supply-chain assurance. The founder needs a written country-of-origin map, process audit, export-control review where relevant, and contingency for a second source.

The geopolitical wedge should be phrased as **“buyer-requested, auditable non-PRC manufacturing and component provenance”**, not “the West is barred from Chinese cooling.” Federal and defense rules can be narrower or broader depending on the contract; commercial hyperscaler policies are customer-specific and often private.

## Buyer qualification

Prioritise Tier-2 server OEMs, rack integrators, colocation operators and AI infrastructure builders that have a platform customer but lack a mature cold-plate development team. Avoid selling first to a hyperscaler procurement queue with no design owner.

Ask each buyer for:

- exact accelerator/CPU package, mechanical envelope, keep-outs, mounting load and TIM;
- sustained and transient heat load, junction/case limit, allowable spatial gradient and target thermal resistance;
- TCS fluid chemistry, supply/return temperature, flow range, pressure and maximum pressure drop;
- rack manifold/QD standard, service procedure, drip/spillage limit and sensor interfaces;
- desired reliability life, pressure/thermal cycles, vibration, corrosion and field-replacement requirement;
- applicable OCP/ASHRAE/IEC/ASME, UL/CE and internal qualification documents;
- annual volume, pilot lot size, target price, warranty/liability terms and change-control rules;
- whether NRE is paid and whether the customer provides a thermal test vehicle.

Buyer acceptance should be a signed design-input document and a paid test plan. A verbal “we need liquid cooling” is not demand.

## Capital plan and NRE model

These are **illustrative operator estimates, not public price quotes**. Replace them with three supplier quotes before spending.

### Lean validation-first route

| Item | Cash range (USD) | Notes |
|---|---:|---|
| Design/CFD/fixtures and first tooling | 20k–60k | Outsource simulation and machine time initially. |
| Thermal test vehicle, heaters, sensors, DAQ | 30k–80k | Needed to produce customer-grade evidence. |
| Pressure/leak/flow/particle test | 20k–60k | Method and detection limit depend on buyer. |
| CMM/flatness/clean assembly access | 20k–70k | Lease or shared lab can reduce upfront cash. |
| Supplier audits, samples, certification/legal | 15k–40k | Includes travel, documentation and EHS. |
| Working capital and scrap/warranty reserve | 30k–80k | Do not omit inventory and repeat lots. |
| **Lean total** | **135k–390k** | A $30k–$80k prototype budget is possible; it is not a qualified production business. |

### NRE structure

Propose customer-funded NRE of **$75k–$250k per platform** in three gates: design/DFM, qualification lot and pilot release. Tooling remains paid-for and documented; test data and fixtures are reusable only to the extent the contract permits. A founder should not finance an open-ended platform design against a non-binding LOI.

### When to build a cell

A $500k facility could cover a modest machining/assembly automation cell in a low-cost building, but it is not a safe all-in number for validated AI production. Add facility utilities, EHS, clean assembly, metrology, joining equipment, automation, software traceability, calibration, spares and 6–12 months working capital. Commit only after repeat orders or a customer volume reservation.

## Illustrative unit economics

The following model is a decision tool, not a market price forecast. It assumes one platform-specific plate, outsourced machining/joining, 100% test, freight and a warranty reserve. It excludes founder salary and corporate tax; NRE is shown separately.

| Case | Annual units | ASP/unit | Variable cost/unit | Gross contribution/unit | Fixed validation/ops | Annual contribution before NRE |
|---|---:|---:|---:|---:|---:|---:|
| Low: small pilot | 100 | $650 | $520 | $130 | $120k | **-$107k** |
| Base: repeat pilot | 1,000 | $575 | $325 | $250 | $180k | **$70k** |
| High: qualified niche | 5,000 | $475 | $220 | $255 | $350k | **$925k** |

Equation: `annual contribution = units × (ASP − variable cost) − fixed validation/operations`; subtract NRE-funded engineering only when the customer does not pay it. The largest sensitivities are yield/rework, test labor, liability/warranty, actual volume, customer price pressure and whether the plate is sold standalone or bundled in a higher-margin loop.

At the base case, a $150k self-funded qualification program takes about 2.1 years to recover before financing and founder compensation; a paid NRE gate changes the picture materially. At low volume the business is a services/qualification business, not a manufacturing margin story.

## 12–24 month attack plan

### Months 0–3: prove the buyer and the interface

- Select one platform with a real integrator design owner.
- Obtain a signed design-input sheet and customer-paid feasibility NRE.
- Audit three contract manufacturers; reject any without traceability, joining evidence and leak/flow test capability.
- Build the acceptance matrix and failure budget before CAD freeze.

**Go metric:** one paid NRE, one test vehicle, three qualified manufacturing candidates. **Stop:** only generic interest, no platform data or no paid feasibility by month 3.

### Months 3–6: make and test the first lot

- Produce 10–20 prototypes; instrument thermal resistance, pressure drop, flow distribution and flatness.
- Run destructive sections and joining review; iterate once with documented change control.
- Establish 100% leak and flow test records and a clean/flush procedure.

**Go metric:** customer-defined thermal and hydraulic limits met with repeatability; no unexplained leak failures. **Stop:** the design requires exotic process capability the partner cannot control.

### Months 6–12: qualification and pilot

- Produce a 30–50-piece qualification lot, including environmental and pressure-cycle samples.
- Deliver a digital data pack: serial traceability, test curves, calibration, material declarations, FMEA, control plan and field-service instructions.
- Secure an integrator pilot of 100–500 units with a clear warranty and return-analysis process.

**Go metric:** written qualification release and paid pilot purchase order. **Stop:** customer demands system liability while refusing NRE, test access or realistic price.

### Months 12–24: scale the proven variant

- Add a second source and, only after demand, a captive clean assembly/test cell.
- Automate serialised leak/flow/thermal screening where the cycle-time economics justify it.
- Expand to adjacent accelerator platforms only when the mounting/TIM/fluid interface is genuinely reusable.
- Negotiate approved-vendor status with one system integrator; avoid becoming a one-customer bespoke shop.

**Go metric:** 2,000+ annualised units, first-pass yield above the customer’s threshold, positive contribution after warranty and a second source. **Stop:** volumes remain below 500 with high engineering churn or incumbent price/lead-time parity.

## Execution appendix: turn interest into a qualified shipment

The Gemini thread was useful as a question generator, not as evidence. Its most valuable lead was that a founder must prove the fatigue, buyer specification, and manufacturing process personally before asking an experienced engineer to trust the plan. I accept that operating principle. I reject its unsupported prices, named-company targeting as if it were access, exact robotics specifications, “desperate” buyers, and any promise that a cheap benchtop rig can certify a production life. The following is the execution plan I would actually run.

### First 30 / 60 / 90 days

| Window | Work that must happen | Artifact and decision gate |
|---|---|---|
| Days 0–30 · buyer and interface | Interview at least 12 people across thermal engineering, server/rack integration, procurement, field service, and manufacturing quality. Ask each for the platform, fluid, flow/pressure envelope, life test, QD/manifold, service and country-of-origin requirements. Request a redacted drawing or thermal test vehicle, not a generic “liquid is coming” opinion. | A scored requirements matrix, one named design owner, and one written paid-feasibility proposal. **Stop** if nobody will share a platform constraint or introduce procurement/quality. |
| Days 31–60 · process and test | Audit three contract manufacturers (CMs) for alloy traceability, joining records, cleanliness, CMM access, pressure/leak, flow, thermal test, calibration and engineering-change control. Run one representative coupon and one sacrificial plate through each candidate. Freeze the first test method with the buyer. | Supplier audit reports, a draft control plan, calibrated bench bill of materials, and a signed design-input/acceptance matrix. **Stop** if no CM can show repeatable joining and 100% end-of-line leak/flow capability. |
| Days 61–90 · paid feasibility | Build 3–5 geometries only after the interface is frozen. Measure thermal resistance versus flow, pressure drop, flatness, leak rate, cleanliness and connector fit. Put the data in a serialised report and review it with the buyer. | Customer acceptance of the feasibility report plus a paid NRE statement of work for the next lot. **Stop** if the result is technically interesting but no buyer funds the next gate. |

This is intentionally asset-light: outsource machining and joining, rent or share metrology, and own the fixture design, configuration control, acceptance data and customer relationship. “Asset-light” does not mean “test-light.” A plate that cannot produce traceable pressure, flow, thermal and cleanliness records is a prototype, not a product.

### Who to interview, and what would count as evidence

Do not invent exact people or rely on a founder title. Find the current role through a target integrator’s public organization, warm introduction, or the buyer’s own contact. The minimum panel is:

1. **Platform thermal or mechanical owner.** Ask: What package and TIM are fixed? What are sustained and transient heat loads, inlet temperature, allowable junction/case temperature, flow range and pressure-drop budget? Which dimensions and mounting loads are non-negotiable? What test vehicle can be made available?
2. **Rack/CDU or data-centre integration owner.** Ask: Where does the TCS/FWS boundary sit? Which manifold, QD, CDU, BMS and Redfish signals are required? How is a leak isolated and who is allowed to shut down power or liquid? What residual air load remains and who owns it?
3. **Procurement and supplier-quality owner.** Ask: What is the approved-vendor list and current lead time? Is a second source actually authorized? Which process audits, first-article inspections, PPAP-like records, warranty caps and country-of-origin declarations are required? What price and annual volume would justify qualification?
4. **Field-service and operations owner.** Ask: What does a technician replace in the rack? How are a drained plate, coolant, QDs and contaminated parts packaged? What records must follow a serial number? What is the acceptable intervention time after a leak alert?

Evidence is a signed design-input sheet, a buyer-supplied test vehicle or drawing, a written acceptance method, an approved-vendor gap, and a paid next step. An enthusiastic call, a LinkedIn reply, or a public request for more liquid cooling is not demand.

### What a paid NRE/SOW must contain

The NRE is not a vague “custom prototype” invoice. It should name the platform revision and include:

- **Scope and inputs:** drawing revision, package/TIM, heat-load points, fluid chemistry, supply/return temperatures, flow/pressure limits, QD/manifold, mechanical loads, environmental profile, applicable OCP/IEC/ASME/customer standards and the exclusions (CDU, facility loop, residual air and rack controls unless explicitly included).
- **Deliverables:** controlled CAD/BOM, DFM review, fixture drawings, material certificates, process-flow and control plan, FMEA, test procedure, calibrated raw data, serialised reports, nonconformance log, service instructions and a change log.
- **Acceptance:** numeric thermal-resistance and spatial-uniformity limits, pressure-drop/flow curve, leak detection limit and test duration, hydrostatic pressure and cycle conditions, cleanliness/particle limit, corrosion/compatibility evidence, connector fit, sample sizes and re-test rules. OCP’s qualification guidance requires the thermal test to record case temperature, inlet-liquid temperature, applied power, flow and pressure drop, and it calls for X-ray or equivalent inspection, hydrostatic tests and fluid-compatibility work. [OCP cold-plate development and qualification](https://www.opencompute.org/documents/ocp-cold-plate-development-and-qualification-with-integrated-comments-pdf)
- **Commercial terms:** milestone payments (design freeze, first article, qualification report, pilot release), customer-owned or licensed tooling, who pays for redesigns, long-lead material, rejected lots, freight and destructive samples, and what triggers a change order.
- **Risk allocation:** warranty start, field-return analysis, maximum liability, consequential-damage exclusion, insurance requirements, export/country-of-origin representations, confidentiality and the exact boundary between plate, loop, CDU, rack and facility responsibility.

The $25,000 prototype figure suggested in Gemini is rejected as a universal price. It can be a customer-specific quote after scope is known; it is not evidence that five prototypes and qualification fit that budget.

### Test stack: enough to learn, not enough to pretend certification

| Layer | Minimum first-pass test | Production/qualification implication |
|---|---|---|
| Geometry and joining | CMM/flatness, port and connector fit, X-ray or equivalent for voids/debris/weld quality, destructive cross-sections on coupons. | Lock the joining parameters and retain lot and operator traceability. |
| Leak and pressure | Pressure-decay or bubble/helium method selected with the buyer; hydrostatic test at operating and specified over-pressure conditions. OCP gives example checks at maximum operating pressure and 3× maximum operating pressure under IEC 62368-1 guidance. | Report detection limit, pressure, duration, temperature, fixture serial and result for every part; never say “zero leak.” |
| Thermal and hydraulic | Representative board/heater and specified TIM; remove bubbles; sweep flow; record `R=(Tc−TL)/Q`, inlet/return temperatures, applied power and pressure drop. | Publish the full resistance/flow and pressure-drop/flow curves, uncertainty and calibration records, not one peak watt number. |
| Fluid/material | Name the water/glycol or other fluid and inhibitor/biocide; run corrosion, elastomer compatibility, leach/particle and post-test inspection. | Requalify after coolant, seal, alloy, joining, QD or cleaning changes. OCP’s active workstreams show that coolant and quick-disconnect interoperability remain moving targets. [OCP cold-plate workstreams](https://www.opencompute.org/wiki/Cooling_Environments/Cold_Plate) |
| Reliability and service | Pressure/thermal cycling, vibration/handling, QD cycles, shipping, drain/flush/dry, and a controlled leak-response drill with rack/BMS owner. | A plate passing a bench test does not prove system life. NVIDIA’s GB200/GB300 documentation describes tray-, rack- and data-centre-level leak signals; validate the actual response path. [NVIDIA BMS integration](https://docs.nvidia.com/mission-control/docs/nmc-software-installation-guide/2.2.0/integration-of-bms-with-bcm.html) |

The Gemini suggestion of a roughly $1,500 accelerated-life rig is rejected as a production qualification claim. A low-cost dynamometer can be an internal learning tool if a qualified engineer defines the load spectrum, instrumentation and failure analysis; it cannot compress an unknown fatigue mechanism into a guaranteed service life. The first cold-plate work should use buyer-defined pressure, thermal, contamination and environmental tests, with destructive samples and an independent lab where the contract requires it.

### CM first; captive cell only after evidence

The first manufacturing model is a controlled network, not a factory: one CM for machining/joining, one backup for the critical operation, and startup-owned fixtures, gauges, test software, serial records and release authority. Select on demonstrated process capability and traceability, not country alone. Country-of-origin declarations should cover plate, cover, filler, seals, QDs, coolant-contact materials and any imported blanks.

Treat a captive clean assembly/test cell as a gated option. The internal go/no-go test is: two paid platform programmes; two repeat lots with stable leak, flow and thermal distributions; a measured test cycle time that does not erase contribution; a second-source plan; and customer acceptance of the startup’s records. These are proposed operating gates, not public benchmarks. Until then, the captive cell adds fixed cost while the platform, fluid and QD may still change. Do not use Gemini’s $500,000 facility figure as a budget; obtain equipment, utilities, metrology, EHS, calibration and working-capital quotes.

### System-supplier and NVIDIA/OEM integration risk

The cold plate is inserted into an architecture owned by someone else. NVIDIA’s public GB300 NVL72 reference describes a liquid-cooled MGX rack, integrated tray/rack leak detection, eight 33 kW power shelves and a full rack up to 142 kW—useful proof that cooling, power, management and service are a single integration problem, not a component-only sale. [NVIDIA NVL72 AI Factory components](https://docs.nvidia.com/enterprise-reference-architectures/nvl72-ai-factory/latest/components.html)

NVIDIA’s management documentation shows a three-level leak model (cold-plate/inner-manifold sensors at tray level, sensing rope/spot sensors at rack level, and CDU/datacentre sensors), with BMS responsible for rack-level response. [NVIDIA Mission Control leak detection](https://docs.nvidia.com/mission-control/docs/systems-administration-guide/2.0.0/leak-detection.html) A startup that promises a “leak-proof plate” but cannot map its signals, QDs, shutoff sequence, telemetry and service procedure into the integrator’s system will be rejected or forced to assume unpriced liability. NVIDIA also documents firmware-update edge cases in which leak-detector settings can reset, and recommends standard Redfish leak-detection endpoints rather than raw sensor voltage. [NVIDIA DGX GB300 known issues](https://docs.nvidia.com/dgx/dgxgb300nvl72-release-notes/known-issues.html)

The commercial risk is equally real: the system supplier may own the approved-vendor list, bundle the plate, or require one accountable warranty. The wedge is to be the integrator’s qualified second source and evidence owner; move into a loop/manifold module only when the buyer pays for that interface; and offer commissioning/service only under a system-level SOW with explicit liability and BMS boundaries.

### Path from plate to thermal subsystem, and the cost-down proof

1. **Platform plate:** one package and one fluid, outsourced machining/joining, paid NRE, serialised data.
2. **Qualified plate family:** reuse only proven mounting/TIM/flow interfaces; add a second CM and a controlled pilot lot.
3. **TCS subassembly:** integrate plate, hose/QD and manifold only when the integrator supplies the rack interface and acceptance test. Price the added pressure-drop, leak, service and field-return responsibility.
4. **Thermal subsystem:** add CDU controls, leak telemetry, commissioning and residual-air coordination only with a system partner. This is a different liability and support business, not a natural “next SKU.”

Cost-down comes from measured yield, cycle time, material utilization, tool life, test automation and committed volume. The sequence is: quote three CMs → run a representative lot → measure first-pass yield and rework → redesign for manufacturability → negotiate material and capacity → automate only the bottleneck. A Chinese-price target is not a plan; it needs a buyer quote, a process capability study and a tested costed BOM. If cost-down requires unverified 80%→99% yield, a $40,000 lathe, or sub-$150 ASP, label it as a scenario and do not underwrite the company to it.

### Gemini lead audit and unresolved questions

**Accepted leads:** prove fatigue and process control hands-on; interview engineering, procurement, incumbent-insider and service personas; use customer-provided geometry and acceptance tests; start with paid platform-specific NRE; treat non-PRC provenance as a buyer requirement to verify; model the complete system rather than copper alone.

**Rejected or downgraded leads:** exact robotics torque/backlash/weight specs without a named platform source; claims of “desperate” Western buyers; a public RFP for bleeding-edge humanoid or AI hardware; a universal $25k NRE; a <$1,500 life-certification rig; 20–40% geopolitical premiums; China/Vietnam/Mexico labor-rate comparisons; 80%→99% yield; 30-second flow forming; $500k factory; 100,000-unit steel contracts; and any assertion that a specific person will take a meeting. The Gemini conversation is a useful set of hypotheses, not customer evidence.

Unknowns that must be resolved before capital is committed: the actual platform SKU and thermal envelope; approved-vendor and second-source policy; buyer-paid NRE and pilot quantity; accepted leak/pressure/thermal/corrosion methods; CM Cpk, yield and cycle time; country-of-origin scope; field liability and insurance; system-supplier margin and integration control; and whether the buyer will pay for a plate, a tested subassembly, or a full thermal subsystem.

## Bear case and mitigations

- **The platform owner bundles the plate:** Mitigation is to become the integrator’s qualified second source or sell test/validation and service kits; otherwise exit.
- **Liquid cooling architecture changes:** Two-phase, immersion, rear-door or cold-plate-loop designs can displace a specific plate. Keep the company interface/qualification-centric and avoid irreversible tooling.
- **Incumbents cut price or lead time:** Compete on a named shortage, faster qualification and evidence package; do not compete on commodity copper.
- **A leak causes catastrophic customer loss:** Cap liability contractually, retain serialised records, use independent insurance counsel, and implement conservative pressure/thermal-cycle and field-monitoring design.
- **Southeast Asian supplier quality drifts:** dual-source critical operations, lock parameters, audit periodically and keep incoming/100% end-of-line testing under startup control.
- **Geopolitical premise is wrong:** Make provenance an optional documented attribute, not the only reason to buy.
- **AI capex slows:** target HPC, sovereign compute, networking and power electronics cold plates with similar validation needs, but only after the first platform is profitable.

## What the headline omits

The bottleneck may be the entire TCS—not the plate: QDs, manifolds, CDU redundancy, facility water, leak detection, service labor and commissioning can dominate failure risk. Direct-to-chip usually leaves 10–30% residual heat for air. A small plate company is also exposed to platform redesigns, customer concentration, qualification liability, long payment terms, field returns, coolant chemistry and a buyer’s preference for a single accountable system supplier.

The paid-research questions are therefore: What is the buyer’s current lead time and failure rate? What price is justified by avoided qualification delay? What evidence is accepted by the platform owner? What percentage of the rack value is the plate versus CDU/manifold/service? What is the real first-pass yield at the contract manufacturer? What happens to warranty liability when the integrator changes coolant or QD?

## Public versus paywalled boundary

The public record supports the direction of travel and the engineering qualification requirements, but not a precise 2026 market size, universal supplier backlog, hyperscaler procurement policy or a 53% adoption number. TrendForce’s public press release supports 33% AI-data-centre liquid-cooling penetration in 2025; its detailed supply-chain research is offered as a paid report. A Hong Kong-listed company filing repeats that 33% figure but contains no 2026 penetration forecast. NVIDIA DSX design collateral has an NVOnline access gate; the public summary is useful, but buyer-specific design requirements remain unverified.

## Falsification tests and next data collection

| Question | Test | Falsifier / stop rule |
|---|---|---|
| Is there a second-source gap? | Get current approved-vendor list and lead-time quotes from five integrators. | No buyer reports a material gap or they will not qualify a new source. |
| Can the CM repeat the process? | 30–50-piece lot, 100% leak/flow test, blinded repeatability analysis, destructive coupons. | Any unexplained leak, flow drift or joining defect after corrective action. |
| Does validation create willingness to pay? | Offer a paid NRE + qualification pack with fixed acceptance criteria. | Buyers request free prototypes only or reject the data pack. |
| Is economics real? | Replace assumptions with three quotes and actual labor/test cycle times. | Contribution remains negative at 1,000 units or warranty reserve is unbounded. |
| Is provenance a wedge? | Ask for written country-of-origin and security requirements. | No target buyer has a policy or they accept China-origin supply without friction. |
| Does the product survive the system? | Pilot in a live integrator rack with CDU, QDs, coolant and residual-air controls. | Thermal, leak, service or contamination incident; no repeat order. |

## Visual briefs

1. **“The heat path, not just the plate”** — cross-section from accelerator die/TIM/cold plate to TCS, QD, rack manifold, CDU and facility water; show residual air heat in a contrasting path. Annotate measured variables: heat load, flow, pressure drop, inlet/return temperature and leak sensors.
2. **“From drawing to serialised evidence”** — swimlane from material receipt → CNC/FSW/CAB → cleaning → CMM → leak/pressure → flow → thermal test → pack/traceability → field service. Mark 100% gates versus sample/destructive gates.
3. **“Founder wedge versus incumbent stack”** — matrix comparing generic plate, qualified platform module, full loop/CDU and validation-as-a-service on qualification burden, capex, buyer value, and defensibility.

## Evidence ledger

| Claim | Type | Source/date | Confidence | What it proves | What it does not prove / counterevidence | Impact | Falsifier |
|---|---|---|---|---|---|---|---|
| Vera Rubin NVL72 has 72 GPUs; public page lists HBM4, bandwidth and 45°C inlet for a 100 MW factory configuration | fact | NVIDIA Vera Rubin NVL72, accessed 2026-09-12, https://www.nvidia.com/en-au/data-center/vera-rubin-nvl72/ | High | Platform scale and a liquid-cooling design point are real | No public 2,300 W GPU TDP on page; 45°C is a stated factory configuration, not every deployment | Supports demand but requires SKU-specific inputs | NVIDIA/customer datasheet shows materially lower power or air-cooled configuration |
| Vera Rubin cabinet TDP scales 198–330 kW; TCS flow at least 1.5 LPM/kW | fact, access-controlled summary | NVIDIA DSX Facilities Infrastructure Reference Design Overview, accessed 2026-09-12, https://docs.nvidia.com/dsx/facilities-infra/reference-design-overview | Medium | Stronger demand signal and sizing inputs | Public summary may omit configuration conditions; page returned an open error in this pass, so direct design collateral is unverified | Use as a lead, not a final quote | NVOnline design document contradicts or narrows the values |
| Air limits may be around 40 kW with good design; 30–100+ kW racks are in scope for AI integrators | fact/guidance | ASHRAE AI Data Center Framework, accessed 2026-09-12, https://www.ashrae.org/technical-resources/ai-data-center-framework/integrated-design-principles | High | Refutes a universal 35 kW cap and grounds high-density demand | Not a guarantee for any rack, climate or inlet condition | Calibrates market narrative | Controlled deployment cools target rack reliably with air at materially higher density |
| Schneider reference design lists max air-cooled 40 kW and max liquid-cooled 73 kW | fact/design scenario | Schneider Electric Reference Design 99, accessed 2026-09-12, https://download.schneider-electric.com/files?p_Doc_Ref=RD99DSR0_EN&p_enDocType=EDMS | Medium | Shows 35 kW is not a universal physical ceiling | One reference design, not industry-wide maximum | Useful benchmark for buyer conversations | Multiple credible designs show materially lower limits under same conditions |
| OCP distinguishes hybrid and full liquid cooling; hybrid keeps air for low-power components | fact | OCP ACS Liquid Cooling Cold Plate Requirements Rev 1.0, 2019, https://www.opencompute.org/documents/ocp-acs-liquid-cooling-cold-plate-requirements-pdf | High | Product must be scoped as part of a hybrid/system architecture | Does not establish market adoption or price | Prevents overclaiming full-rack capture | Target platform is proven full-liquid and eliminates residual-air requirement |
| OCP cold-plate metrics include heat transfer, pressure, pressure drop, flow, temperature, active area and filtration | fact | OCP ACS document, 2019, same URL | High | Defines engineering and QA acceptance fields | Does not set one universal numeric limit | Forms customer requirements and data pack | Buyer specification omits these metrics and accepts only qualitative claims |
| Typical TCS operating pressure 140–450 kPa; OCP discusses IEC 62368 and ASME B31.3 test multipliers | fact/guidance | OCP ACS document, 2019, same URL | High | Grounds pressure/leak qualification planning | Local code and buyer interpretation control; not legal advice | Raises test/QA cost above prototype assumptions | Buyer code requires a different validated method |
| Leak prevention plus direct/indirect detection and manual/automatic intervention are required design considerations | fact/guidance | OCP ACS document, 2019, same URL | High | Leak-proof means a system risk plan, not a marketing adjective | Does not guarantee any sensor catches every leak | Supports validation wedge | Customer has an accepted alternative with lower risk/cost |
| ASHRAE liquid classes W17/W27/W32/W40/W45/W+ encode max supply liquid temperature | fact | ASHRAE AI Data Center Framework, accessed 2026-09-12, https://www.ashrae.org/technical-resources/ai-data-center-framework/introduction-and-purpose | High | Provides temperature vocabulary and design boundaries | Class compliance depends on full performance and facility design | Helps qualify warm-water designs | Customer specification uses another standard and rejects class mapping |
| DTC commonly removes 70–75% of rack heat, leaving residual air load | estimate/guidance | Vertiv, “Liquid Cooling” white paper, accessed 2026-09-12, https://www.vertiv.com/49d8ee/globalassets/documents/white-papers/vertiv-liquid-cooling-wp-en-na-sl-70807-web_332687_0.pdf | Medium | Calibrates hybrid architecture and CDU sizing | Vendor estimate varies by platform | Prevents full-liquid overclaim | Measured pilot captures materially different fraction |
| CoolIT offers custom cold plates, loops, manifolds and CDUs, with prototyping/validation and Asia manufacturing | fact/company claim | CoolIT server products, accessed 2026-09-12, https://www.coolitsystems.com/products-services/server-products/ | High | Shows incumbent breadth and direct competition | Does not prove market share or customer concentration | Startup must differentiate on wedge, not generic capability | Buyer has no incumbent qualification or lead-time pain |
| CoolIT advertises a validated 15 kW cold plate and Taiwan/Canada engineering | fact/company claim | CoolIT cold plates, accessed 2026-09-12, https://www.coolitsystems.com/coldplates-2/ | High | Sets a public benchmark for productization | Performance is vendor-stated and platform-specific | Benchmark test plan and competitive bar | Independent test fails to reproduce claimed capacity |
| Boyd claims five million cold plates delivered and 100% inline thermal/flow and leak testing | company claim | Boyd release, 2025-09-08, https://www.boydcorp.com/about-boyd/resources/news-and-events/boyd-delivered-5-millionth-liquid-cold-plate-for-ai-cooling.html | Medium | Demonstrates incumbent scale and QA bar | No independent audit or market-share denominator | Makes commodity entry unattractive | Customer evidence shows Boyd scale/QA claim materially false |
| Boyd describes skived fins, CAB brazing and FSW as manufacturing options | fact/company technical material | Boyd manufacturing pages/paper, accessed 2026-09-12, https://www.boydcorp.com/about-boyd/boyd-capabilities/manufacturing-capabilities/metal-fabrication.html and https://info.boydcorp.com/hubfs/Resources/Resource-Center/Final_Submission_1v0_ieee_compliant-branded.pdf | Medium | Grounds process alternatives | Vendor materials are not independent process qualification | Identifies equipment/skill needs | CM cannot demonstrate equivalent process capability |
| Vertiv calls for dripless QDs, flow monitoring, leak detection and material compatibility | fact/guidance | Vertiv liquid-cooling guide, accessed 2026-09-12, https://www.vertiv.com/4926c8/globalassets/documents/white-papers/liquid-cooling/deploying-liquid-cooling-in-the-data-center-a-guide-to-high-density-cooling-white-paper.pdf | High | Grounds reliability and system-integration requirements | Vendor guide does not set buyer-specific acceptance limits | Expands product scope beyond metal block | Pilot shows QD/system risk dominates plate risk |
| Vertiv logistics guidance requires flushing, drying/sealing and coolant/test records | fact/guidance | OCP Logistics and Integration white paper hosted by Vertiv, accessed 2026-09-12, https://www.vertiv.com/en-ca/about/news-and-insights/articles/white-papers/redirect-liquid-cooling-integration-and-logistics-white-paper/ | High | Supports packaging, cleanliness and traceability work | Does not price logistics or prove field incidents | Adds real operating cost and differentiation | Buyer accepts unflushed/untracked shipments |
| TrendForce publicly forecast 14% penetration in 2024 and 33% in 2025 | estimate | TrendForce press release, 2025-08-21, https://www.trendforce.com/presscenter/news/20250821-12682.html | Medium | Supports adoption direction | Secondary forecast; no 53% 2026 figure in public page | Use scenarios, not headline certainty | Later measured installed-base data contradicts forecast |
| A listed-company filing repeats TrendForce's 33% forecast for 2025 | estimate/company-cited | HKEX filing, accessed 2026-09-12, https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0327/2026032702072.pdf | Low | Corroborates that the 33% figure circulated in supplier disclosures | Does not contain a 2026 penetration figure and is not independent measurement | Removes the unsupported 40%/53% precision | Measured installed-base data contradicts the forecast |
| U.S. defense acquisition rules restrict certain prohibited sources | fact/regulation | Acquisition.gov DFARS 225.7, accessed 2026-09-12, https://www.acquisition.gov/dfars/subpart-225.7-prohibited-sources | High | Grounds a defense/government provenance conversation | Does not create a blanket commercial hyperscaler ban or cover every passive plate | Sell policy-specific provenance, not certainty | Contract/legal review shows plate is outside restriction |
| OCP 2019 document says UL/FCC/CE and local requirements vary | fact/guidance | OCP ACS document, 2019, same URL | High | Requires compliance scoping | A passive component’s marking obligations differ from complete rack | Adds buyer/legal work | Integrator confirms no applicable certification |
| $30k–$80k prototype and $500k plant numbers | assumption/estimate | Supplied prompt; no public quote located, accessed 2026-09-12 | Low | Defines a budget hypothesis to test | Excludes validation, working capital, utilities and liability | Must be replaced with supplier quotes | Three quotes and customer NRE support a lower total |

## Bibliography and access notes

Primary/standards and vendor sources used above:

- [NVIDIA Vera Rubin NVL72](https://www.nvidia.com/en-au/data-center/vera-rubin-nvl72/) — opened; accessible.
- [NVIDIA DSX Facilities Infrastructure Reference Design Overview](https://docs.nvidia.com/dsx/facilities-infra/reference-design-overview) — search result surfaced the relevant summary; direct open returned an internal error in this pass. Treat values as provisional until NVOnline access or a customer datasheet is obtained.
- [NVIDIA Vera Rubin press release](https://nvidianews.nvidia.com/news/nvidia-vera-rubin-platform) — opened via search; accessible.
- [ASHRAE AI framework: integrated design principles](https://www.ashrae.org/technical-resources/ai-data-center-framework/integrated-design-principles) — opened; accessible.
- [ASHRAE AI framework: introduction and purpose](https://www.ashrae.org/technical-resources/ai-data-center-framework/introduction-and-purpose) — search result accessible; use for W-class summary.
- [OCP ACS Liquid Cooling Cold Plate Requirements Rev 1.0](https://www.opencompute.org/documents/ocp-acs-liquid-cooling-cold-plate-requirements-pdf) — opened PDF; accessible.
- [OCP Cold Plate Sub-Project](https://www.opencompute.org/wiki/Cooling_Environments/Cold_Plate) — opened; accessible and useful for current workstreams.
- [OCP MGX Accelerated Computing Rack and Trays Specification](https://www.opencompute.org/documents/mgx-accelerated-computing-rack-and-trays-specification-1-1-pdf-1) — search result surfaced 120 kW/85%/pressure examples; direct open returned an internal error in this pass, so not used as a headline claim.
- [Vertiv liquid-cooling deployment guide](https://www.vertiv.com/4926c8/globalassets/documents/white-papers/liquid-cooling/deploying-liquid-cooling-in-the-data-center-a-guide-to-high-density-cooling-white-paper.pdf) — opened PDF; accessible.
- [Vertiv leak detection/intervention white paper](https://www.vertiv.com/498ec3/globalassets/documents/white-papers/acs_cold_plate__leak_detection_and_intervention_white_paper_329948_0.pdf) — search result accessible; direct open returned an internal error in this pass; use as a lead only.
- [Vertiv/OCP logistics and integration white paper](https://www.vertiv.com/en-ca/about/news-and-insights/articles/white-papers/redirect-liquid-cooling-integration-and-logistics-white-paper/) — opened PDF; accessible.
- [CoolIT server products](https://www.coolitsystems.com/products-services/server-products/) and [cold plates](https://www.coolitsystems.com/coldplates-2/) — opened; accessible.
- [Boyd five-millionth cold plate release](https://www.boydcorp.com/about-boyd/resources/news-and-events/boyd-delivered-5-millionth-liquid-cold-plate-for-ai-cooling.html) — opened; accessible, company claim.
- [Boyd metal fabrication](https://www.boydcorp.com/about-boyd/boyd-capabilities/manufacturing-capabilities/metal-fabrication.html) and [CAB technical paper](https://info.boydcorp.com/hubfs/Resources/Resource-Center/Final_Submission_1v0_ieee_compliant-branded.pdf) — opened/search surfaced; technical/vendor evidence.
- [Delta data-centre cooling](https://www.deltaww.com/en-US/products/data-center-cooling) — opened; accessible.
- [Asetek D2C ingredient coolers](https://www.asetek.com/company/about-asetek/asetek-heritage-technology/data-center/technology-for-data-centers/d2c-ingredient-coolers/) — search result accessible; competing architecture.
- [TrendForce penetration release](https://www.trendforce.com/presscenter/news/20250821-12682.html) — opened/search surfaced; public secondary forecast.
- [HKEX listed-company filing](https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0327/2026032702072.pdf) — search result surfaced; public company-cited forecast.
- [Acquisition.gov DFARS prohibited sources](https://www.acquisition.gov/dfars/subpart-225.7-prohibited-sources) — search result accessible; narrow government/defense evidence only.
- [OCP cold-plate development and qualification](https://www.opencompute.org/documents/ocp-cold-plate-development-and-qualification-with-integrated-comments-pdf) — opened PDF; representative thermal, hydraulic, X-ray, hydrostatic, cleanliness and compatibility methods.
- [OCP Cold Plate Sub-Project](https://www.opencompute.org/wiki/Cooling_Environments/Cold_Plate) — opened; current fluid, quick-disconnect and interoperability workstreams.
- [NVIDIA NVL72 AI Factory components](https://docs.nvidia.com/enterprise-reference-architectures/nvl72-ai-factory/latest/components.html) — opened; GB300 rack architecture, power shelves and integrated leakage detection.
- [NVIDIA Mission Control BMS integration](https://docs.nvidia.com/mission-control/docs/nmc-software-installation-guide/2.2.0/integration-of-bms-with-bcm.html) — opened; tray-, rack- and datacentre-level leak sensing and BMS boundary.
- [NVIDIA Mission Control leak detection](https://docs.nvidia.com/mission-control/docs/systems-administration-guide/2.0.0/leak-detection.html) — opened; cold-plate/manifold leak metrics and rack liquid-isolation signals.
- [NVIDIA DGX GB300 release notes](https://docs.nvidia.com/dgx/dgxgb300nvl72-release-notes/known-issues.html) — opened; Redfish leak-detection guidance and firmware-update caveat.
- [ASHRAE Handbook Chapter 20](https://handbook.ashrae.org/Handbooks/A23/SI/A23_Ch20/a23_ch20_si.aspx) — opened; hybrid DTC/air architecture and liquid-loop redundancy considerations.
- [OCP advanced liquid cooling design](https://www.opencompute.org/documents/an-advanced-liquid-cooling-design-for-data-center-final-v3-1-pdf) — opened; pressure-drop/thermal-resistance trade-off and flow-dependent cold-plate design.

Paywall/access boundary: TrendForce’s detailed “AI Server Liquid Cooling Surge: Taiwan Supply Chain Insights 2025” page is visible as a paid research product ([link](https://www.trendforce.com/research/download/RP250624FN)); no private charts were treated as facts. NVIDIA DSX’s validated partner list and detailed reference design require NVOnline access; only the public summary was used and marked medium confidence.
