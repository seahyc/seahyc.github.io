# Evidence dossier — Sub-micron aerostatic stages in Penang

**Dated:** 2026-09-12  
**Decision:** Should a founder build sub-micron aerostatic positioning stages for advanced-packaging/metrology equipment, starting with a captive precision cell in Penang?  
**Scope:** Public sources only; USD scenario economics; no supplier quotes, customer interviews, or proprietary process data.  
**Status:** Research-ready evidence pack, not an investment recommendation.

## Bottom line

The attractive possibility is real but narrower than the supplied thesis. Advanced packaging and wafer/package metrology are growing equipment workloads, and Penang has a credible automation, precision-engineering, semiconductor, and shared-lab ecosystem. But the evidence does **not** establish that sub-2nm lithography requires a startup-made aerostatic stage, that PI leads an oligopoly, or that a $100–250k cell can make and qualify lithography-grade stages.

The investable wedge is a **customer-specified motion subassembly for packaging and optical/3D metrology**: a compact X/Y or Z air-bearing module, or an air-bearing-plus-mechanical hybrid, integrated with the customer’s encoder, controller, vacuum/clean-air, and process tooling. Start with a non-product-contact demonstrator and a paid application test. Do not promise “lithography-grade,” “sub-2nm,” or “nanometer flatness” until the customer defines the measurement budget and the cell reproduces it under temperature, vibration, contamination, and uptime tests.

**Recommendation:** conditional go on a 12–24 month validation program; no heavy captive cell until one anchor OEM signs a paid NRE/specification and the founder has metrology access. Base-case initial spend is closer to **$310k–$620k** for a defensible qualification cell; $100–250k is a lean prototype budget, not a complete qualified product operation.

## 1. Decision frame and falsifiers

### The founder question

Should a new Penang company build and qualify air-bearing positioning modules for advanced-packaging, substrate inspection, optical metrology, and other equipment OEMs, using local precision manufacturing and a captive environmental/metrology cell?

### Desired conclusion

Proceed only if a named buyer will pay for a specific motion module whose value is measurable as lower error motion, higher throughput, lower service burden, or shorter lead time. The first product should be a **replaceable subassembly**, not a general-purpose “stage platform.”

### What would disprove the wedge

- Three or more target OEMs say their current crossed-roller, linear-motor, or magnetic stage already meets the process budget at lower total cost.
- A prototype cannot hold the required error-motion and thermal drift for 1,000 hours, or cannot pass customer contamination/ESD/EMC and integration tests.
- The customer’s true bottleneck is optical head, process recipe, substrate warpage, bonding chemistry, or software rather than motion.
- The customer requires a complete SEMI-compliant tool subsystem, global service, and 24/7 uptime from day one; a small supplier cannot finance or support it.
- Qualification takes 18–36 months and consumes all cash before a second customer exists.

## 2. Hypothesis tree

| ID | Hypothesis | Supporting evidence | Disconfirming evidence / gap | Validation action and stop rule |
|---|---|---|---|---|
| H1 | Advanced packaging and metrology create paid demand for precision motion. | TSMC reports strong CoWoS demand and capacity still insufficient; Intel and Onto describe active 2.5D/3D and package inspection/metrology programs (S1–S4). | Demand may accrue to complete tool makers; no public stage BOM or sub-tier spend. | Interview 10 OEM/system integrators; stop if fewer than 2 share a funded motion problem and measurable spec. |
| H2 | Penang is a useful launch geography. | InvestPenang lists 6,500 suppliers and a precision/ATE ecosystem; its ATE Campus is explicitly designed for co-development and qualification (S10–S12). | Ecosystem breadth is not evidence of nanometer metrology, qualified air-bearing manufacturing, or a ready captive room. | Secure a named lab/cleanroom partner, utility/lease quote, and one local integration pilot before lease. |
| H3 | Air bearings are technically superior for selected scans and measurements. | Vendor and research sources show low friction, no wear, high geometric performance, and sensitivity of stiffness to restrictor/gap design (S5–S9). | They need clean, dry air, preload/constraint, careful restrictor tuning, and suffer pneumatic-hammer/contamination risk; mechanical and magnetic stages can win on stiffness, fail-safe, cost, and vacuum. | Build a 100–300 mm travel module; publish repeatability, straightness, pitch/yaw/roll, stiffness, pressure sensitivity, and drift. Stop if it does not beat incumbent on the customer’s one metric. |
| H4 | A startup can reach packaging/metrology qualification before lithography qualification. | Commercial offerings show 0.1–0.6 µm accuracy/flatness class and low-double-digit-nm repeatability claims for metrology/inspection contexts (S5–S8). | Supplier claims are not independent acceptance data; a complete stage includes servo, encoder, base, environment, safety, and service. | Customer acceptance test with calibrated interferometer/autocollimator and thermal/vibration log. Stop any “lithography-grade” claim without traceable uncertainty budget. |
| H5 | The market is under-served by a PI-led oligopoly. | PI, Aerotech, Newport/MKS, ALIO, IBS and others publicly offer air-bearing components or systems (S5–S9). | No public market-share or lead-time dataset supports “oligopoly”; incumbent expertise and installed-base trust are real. | Obtain 5 comparable quotes and lead times; model switching cost. Treat oligopoly as **unverified** until evidence exists. |
| H6 | A $100–250k captive cell is sufficient. | The number can fund a lean prototype with outsourced machining and rented metrology time. | CMM/interferometer, granite, environmental control, cleanroom, ESD/EMC, staff, and spares can exceed that range. | Quote each line item and test a prototype in a partner lab. No lease or capex based on the headline range alone. |

## 3. Demand chain: where motion is bought

```text
AI/HPC and chiplet demand
  -> more HBM, larger interposers, tighter die/package placement
  -> process steps: lithography/exposure, bonding, placement, inspection, metrology
  -> tool OEMs and OSATs buy motion subsystems
  -> a stage is valuable only when its error budget improves yield, throughput, or uptime
```

**Packaging:** TSMC’s Q1 2024 earnings transcript says CoWoS demand was strong into 2025 and its own capacity was still insufficient, with OSAT partners used to complement it (S1). TSMC’s annual report confirms investment in 2nm and CoWoS capacities but does not quantify an addressable stage market (S2). Intel describes EMIB, Foveros, and Foveros Direct as production or planned packaging architectures, not as a procurement signal for independent stage suppliers (S3). These support the process-demand chain, not a claim that air bearings are the bottleneck.

**Metrology/inspection:** ASML positions YieldStar as integrated optical overlay/focus metrology with nanometer-level process-control value (S4). Onto’s Firefly G5 targets automated inspection and 3D metrology for advanced substrates and panel-level packaging, including HPC/AI applications (S13). KLA’s public filing lists package and wafer inspection/metrology systems (S14). The buyer is usually the tool OEM; the OSAT/fab is the end user and acceptance authority.

**Lithography:** ASML says its High-NA EXE platform uses 0.55 NA optics and supports future architectures starting at the 2nm logic node; it also says the wafer stage positions to a quarter nanometer and sensors check/adjust 20,000 times per second (S15). Its mechanics page describes magnetically levitating wafer tables, up to 7g acceleration and 60-pm position sensing (S16). This is strong evidence that advanced lithography is a demanding motion problem, but it is **counterevidence** to the proposition that a Penang startup can sell an off-the-shelf aerostatic replacement. “Required for sub-2nm lithography” is not established by these pages; the architecture is ASML-specific and magnetic.

## 4. Customer and jobs-to-be-done

| Customer | Job | Buying trigger | Acceptance evidence | Likely incumbent |
|---|---|---|---|---|
| Packaging tool OEM | Scan, place, bond, or inspect a die/panel without adding tilt/runout that consumes process margin. | New large-panel/warped-substrate process; incumbent lead time or drift. | MAM cycle time, position/settle, error map, particle/ESD/EMC, 1,000-hour uptime. | Integrated linear motor + crossed roller, air stage, or in-house module. |
| Optical/3D metrology OEM | Move the sample under a fixed optical head with low velocity ripple and repeatable path. | Higher scan throughput or smaller features. | Straightness/flatness, yaw/pitch/roll, encoder repeatability, thermal drift, measurement uncertainty. | PI, Aerotech, Newport/MKS, ALIO, custom in-house. |
| OSAT/fab process engineering team | Reduce process excursions and maintain tool availability. | Yield loss attributable to motion or long spare lead time. | Correlation to yield/defect map; mean time between service; spare swap. | Existing tool OEM service contract. |
| Precision equipment integrator | Receive a documented, configurable motion subassembly. | Shorter lead time, local service, or unusual geometry. | ICD, calibration report, firmware/API, FMEA, traceability. | Machine-builder engineering team and incumbent catalog stage. |

**Key customer insight:** “Sub-tier demand” is plausible but unproven. A stage supplier does not sell to “the semiconductor industry”; it sells to an OEM with a frozen interface control document, process-specific error budget, and qualification owner.

## 5. Competitors and Southeast Asia ecosystem

### What the public catalogs actually show

| Supplier | Publicly visible offer | Published example | Implication |
|---|---|---|---|
| PI USA | Passive and motorized linear/planar/rotary air-bearing stages, controllers, encoders, dynamic error mapping. | A-110/A-121/A-123 pages cite 1 nm resolution and up to 1 m/s; catalog overview cites 0.25 µm straightness and <0.5 µm/25 mm straightness/flatness class (S5). | Mature integrated supplier; “component only” is not a blank market. |
| Aerotech | Air-bearing direct-drive stages, rotary stages, custom motion systems and controllers. | ABL1500 emphasizes stiffness/geometric characteristics; applications include cleanroom and metrology (S6). | Strong incumbent with system-level integration and support. |
| Newport/MKS | Monolithic SiC and ceramic stages with directly machined air bearings. | SinguLYS S-370: 10 nm minimum incremental motion, ±0.1 µm on-axis accuracy, 10 µrad pitch/yaw/roll; DynamYX Datum: 0.2 µm accuracy, ±25 nm repeatability, 300 Hz natural frequency (S7, S8). | Manufacturing architecture itself is an incumbent moat. |
| ALIO | Planar XY, linear X, rotary, Nano Z, custom 6-D metrology. | Claims ±100 nm bidirectional repeatability and ~1 µm flatness over hundreds of mm for selected systems (S9). | Offers both air and non-air motion; buyer can substitute. |
| IBS Precision Engineering | Air-bearing components/application guidance. | Public guide (S17) is a component-level lead but not an independent performance certification. | Component supply exists; a startup must differentiate with integration/qualification. |

No source located in this pass demonstrates PI-led market share, a severe oligopoly, or a Southeast Asian supply vacuum. The competitive moat is better described as **application qualification, metrology traceability, reliability, and service**, not access to the air-bearing principle.

### Penang / Malaysia

InvestPenang describes a 6,500-supplier E&E network spanning automation, packaging, precision engineering, metalwork, and equipment (S11). Its ATE Campus page lists co-development, shared hardware/software facilities, training, and advanced-packaging capability-map participants (S10). MIDA identifies a Penang Automation Cluster with high-precision parts and fabrication capabilities (S12). This makes Penang credible for supplier discovery, integration, and local customer access.

What is **not** proven: a ready ISO-class metrology room with sub-micron thermal stability, a local air-bearing design house, a calibrated long-travel interferometer, or customer willingness to qualify a new motion supplier. The cell should be colocated with an existing high-end optics/ATE/medical-device facility only after an exact utility, vibration, contamination, access, and insurance review.

## 6. First principles: bearing versus stage

An externally pressurized aerostatic bearing feeds clean gas through restrictors into a small gap. Pressure integrated over pad area carries the load; the pressure field changes with gap, flow, load, and restrictor geometry. A stage adds:

1. constrained bearing pads/preload (pressure-vacuum or opposed pads);
2. a low-CTE, stiff reference structure (granite, SiC, ceramic, or engineered metal);
3. direct-drive linear/torque motor or voice coil;
4. encoder/interferometer and calibration map;
5. servo/controller, cable management, air preparation, safety, and fail-safe landing;
6. metrology, thermal conditioning, vibration isolation, and acceptance documentation.

The equation to keep visible is:

```text
process error = commanded motion
              + encoder/interferometer error
              + bearing error motion (straightness, pitch, yaw, roll)
              + structural deflection
              + thermal drift
              + servo following error
              + payload/process disturbance
              + measurement uncertainty
```

The free J-STAGE paper reports a 130 mm bearing, ~5 ms settling, dynamic compliance below 1 nm/N below 2 Hz, and 10 nm stability for an active restrictor design (S18). That is a research result for a specialized thrust bearing, not a production stage qualification. A 2019 paper reports that reducing restrictor diameter improves stiffness but shrinks the optimum gas gap and makes throttle manufacturing harder; its manufactured guideway reported 0.1 µm straightness over 200 mm (S19). This directly challenges “fluid dynamics is easy” and “nanometer lapping alone is the moat.”

### Minimum architecture for a first product

- **Wedge:** 100–300 mm horizontal X or compact X/Y module, 5–30 kg payload, pressure-vacuum preloaded pads, direct-drive motor, optical encoder, external controller, replaceable landing pads.
- **Avoid:** vacuum lithography wafer tables, 7g dual-stage synchronization, in-tool EUV modules, and any claim of quarter-nanometer absolute positioning.
- **Design outputs:** CAD/ICD, FEA modal and static model, restrictor flow/stiffness map, air-quality specification, pressure-loss behavior, emergency landing, thermal model, FMEA, calibration report, and service/spares plan.
- **Qualification:** static load and stiffness; step-and-settle; velocity ripple; bidirectional repeatability; straightness, flatness, pitch, yaw, roll; thermal drift; air-pressure sensitivity; particle/ESD/EMC; shock and power-loss landing; endurance and contamination exposure.

## 7. Flatness, metrology, servo and environment

### Flatness is not the same as nanometer positioning

Public vendor examples are useful calibration anchors: Newport lists 0.6 µm surface flatness for HybrYX (S20); PI’s older catalog lists 0.25 µm straightness/flatness classes (S5); ALIO describes ~1 µm flatness over hundreds of mm for one planar architecture (S9). ASML’s “tens of picometers” mirror smoothness concerns optical mirrors, not a stage base (S21). The claim “lap granite/ceramic to nanometer-level flatness” therefore needs a defined measurand, area, wavelength, filtering, datum, and uncertainty. A stage can achieve nanometer repeatability while its uncorrected geometric surfaces are micron-class, through metrology and compensation.

### Metrology stack

- Traceable laser interferometer for position/straightness where appropriate;
- autocollimator or angle interferometer for pitch/yaw/roll;
- calibrated granite/ceramic artifact and CMM for geometry;
- temperature probes at base, carriage, payload, and air inlet/outlet;
- accelerometers/velocity sensors for floor and stage vibration;
- pressure, dew point, particle, and flow logging;
- uncertainty budget with repeatability, reproducibility, thermal, instrument, alignment, and compensation terms.

ISO 230-2:2014 specifies direct tests for accuracy and repeatability of numerically controlled axes and requires uncertainty estimation in the related method (S22). NIST’s linear-motion metrology program explicitly identifies instrumentation, environment, setup, and thermal behavior as nanometer-scale uncertainty sources and planned a capability below 5 nm (S23). NIST’s interferometer laboratory describes 20 °C control to ±0.05 °C and below-grade vibration isolation; it gives 0.009 °C as enough to create 0.1 µm uncertainty over a 1 m steel scale under stated assumptions (S24).

### Servo

Air bearings remove friction and stick-slip; they do not remove structural modes, sensor noise, force ripple, latency, or following error. The first controller must expose sampled position, following error, pressure-drop interlock, velocity profile, notch/low-pass filters, and compensation-map version. A 300 Hz natural-frequency claim from an incumbent product is a useful reference, not a target that can be assumed (S7). Customer acceptance should specify settling-time definition, bandwidth, payload, trajectory, and environmental state.

### Cleanroom, air, ESD and vibration

ISO 14644-1 classifies airborne cleanliness by particle concentration from 0.1–5 µm but does not characterize chemical, radiological, or physical contamination (S25). A cell therefore needs a customer-selected ISO class plus surface, outgassing, oil, particle, humidity, and ESD rules. SEMI E78 is a current paid guide for equipment electrostatic compatibility and notes that charge can attract particles and harm product/equipment (S26). IEST-RP-CC024 covers measuring/reporting vibration in microelectronics facilities and metrology laboratories (S27). Cleanroom class alone cannot establish a nanometer-usable environment.

**Practical captive-cell minimum:** isolated slab or validated vibration-isolation table; stable temperature (initial target ±0.05 °C at the artifact, tighter only if the uncertainty budget demands it); dry, filtered oil-free air with dew-point and pressure monitoring; local mini-environment around the stage; ESD-safe surfaces and grounding; particle counting; controlled HVAC flow; calibrated instruments; documented access/cleaning/maintenance. This is a qualification lab, not merely rented cleanroom floor.

## 8. Realistic captive-cell model

### Lean prototype versus defensible qualification cell

| Line item (USD) | Lean prototype | Base qualification cell | High / customer-ready cell | Notes |
|---|---:|---:|---:|---|
| Stage materials, pads, restrictors, motors, encoders | 35k | 75k | 150k | Prototype can outsource most precision parts. |
| Granite/SiC base, isolation, fixtures | 20k | 55k | 100k | Size, lapping, transport and installation dominate. |
| Metrology access/equipment | 30k | 140k | 280k | Rental is viable initially; interferometer/autocollimator/CMM ownership is expensive. |
| Air preparation, controls, safety, data acquisition | 15k | 35k | 65k | Include dew point, pressure, filtration, interlocks. |
| Environmental cell / clean mini-environment | 20k | 80k | 180k | Existing partner room can move this to opex. |
| ESD/particle/vibration qualification | 5k | 25k | 55k | External lab and repeat tests. |
| Engineering labour and documentation, 12 months | 60k | 160k | 300k | 2–4 precision/mechatronics/controls staff plus QA. |
| Spares, rework, insurance, contingency | 20k | 60k | 120k | 20–30% is prudent for first hardware. |
| **Total cash need** | **205k** | **630k** | **1.25m** | Scenario estimate, not a quote. |

The original $100–250k range can cover a **prototype** if metrology and cleanroom capacity are rented and the founder accepts a research demonstrator. It does not cover a staffed, instrumented, customer-qualification cell. A captive lease is practical only if the host supplies validated HVAC, floor/vibration data, utilities, access control, and a metrology partner; otherwise the “captive” cell simply hides facility capex.

### Staffing and site gates

Before signing a lease, obtain: host floor spectrum and isolation data; temperature/humidity history; air pressure/dew point/oil specification; particle/ESD records; instrument calibration certificates; utility redundancy; insurance and liability terms; export-control/customer IP policy; and a written boundary of what the host may access. Penang’s ecosystem supports the search, but InvestPenang’s supplier counts do not substitute for these documents (S10–S12).

## 9. Low/base/high economics

These are an operator model, not market forecasts. A module’s contribution is:

```text
annual gross profit = units × (ASP − variable build/test/service cost)
                     − fixed engineering/quality/site cost
```

| Case | Paid modules in year 2 | ASP | Variable cost/module | Annual fixed cost | Year-2 revenue | Year-2 operating contribution |
|---|---:|---:|---:|---:|---:|---:|
| Low | 2 | $55k | $38k | $330k | $110k | **−$296k** |
| Base | 8 | $85k | $48k | $420k | $680k | **−$124k** |
| High | 18 | $125k | $60k | $600k | $2.25m | **+$570k** |

Break-even units are fixed cost / (ASP − variable cost): approximately 20 low-case units, 12 base-case units, and 10 high-case units. The high case requires a repeatable platform, customer-funded NRE, and a support path; it is not a reasonable first-year plan. NRE should be separately priced to cover application engineering, fixtures, qualification cycles, and documentation. A one-off $85k stage with $420k fixed cost is not a venture-scale business until multiple customers share a platform.

**Sensitivity:** the dominant variables are paid design wins, qualification time, yield/rework, ASP, and whether the host provides metrology/environmental infrastructure. A 6-month qualification slip can consume roughly $150–250k of extra engineering/site burn in the base staffing model. A 20% rework rate reduces contribution far more than a 10% machining price reduction. Do not substitute a large “precision motion market” TAM for this unit model.

## 10. Wedge and 12–24 month attack plan

### Months 0–3 — customer specification, not machining

- Map 20 packaging/metrology OEMs and Penang/Kulim/ASEAN integrators.
- Secure 10 technical calls; request anonymized error budgets, payloads, travel, duty cycle, air/vacuum state, environment, and acceptance tests.
- Select one use case where incumbent motion is a documented constraint.
- Obtain two incumbent quotes and a customer-signed paid feasibility/NRE letter.
- **Go gate:** two credible design-ins or one paid NRE above $50k; otherwise pivot to integration/service or stop.

### Months 3–6 — demonstrator

- Use an established precision machine shop for base/carriage and an air-bearing specialist for pads if necessary.
- Build 100–300 mm single-axis module with interchangeable payload plate and landing safety.
- Rent interferometer/autocollimator/CMM time; create a versioned error map and uncertainty budget.
- **Go gate:** repeatability and geometric error meet 80% of customer spec at target payload and air pressure over 24–72 hours.

### Months 6–12 — application pilot

- Integrate encoder/controller and customer fixture; run scan and step-and-settle trajectories.
- Measure particle, ESD, vibration, thermal drift, pressure loss, and power-loss recovery.
- Run 1,000-hour endurance with failure logging and service procedure.
- **Go gate:** paid pilot passes customer acceptance and creates a second application, not merely a lab demo.

### Months 12–18 — captive cell only if pulled by demand

- Lease a validated room inside an existing optics/ATE/medical-device host; buy only instruments that are used weekly and difficult to rent.
- Add documented incoming inspection, clean assembly, calibration, FMEA, serial traceability, and spare-pad/encoder strategy.
- Qualify one platform variant and publish a narrow performance envelope.

### Months 18–24 — repeatable product

- Ship 5–10 modules across two customers; track field uptime, drift, service hours, yield/rework, and gross margin.
- Add SEMI communication/diagnostic interfaces only if demanded by the integrator; do not build an entire tool-control stack speculatively.
- **Scale gate:** gross contribution above 40% after rework/service, 90%+ on-time delivery, and one customer willing to nominate the module in a production tool.

## 11. Strongest bear case

The founder is mistaking a visible precision requirement for a vacant component market. In lithography, ASML owns the stage architecture, controls, metrology loop, and qualification history; a startup cannot sell an isolated aerostatic slide into that system. In packaging/metrology, the incumbent may already meet the real error budget with crossed rollers, magnetic levitation, or a hybrid architecture. The end customer buys throughput, yield, uptime, integration, and service—not an air film.

Even if the bearing works, cleanroom installation, air quality, pressure failure, landing behavior, thermal drift, sensor calibration, software integration, EMC/ESD, and 24/7 service create a complete-tool liability. Penang helps with manufacturing and talent, but the proposed $100–250k capex omits the metrology and environmental infrastructure needed to prove the claim. A startup could spend 24 months becoming a custom engineering shop with one customer and negative contribution.

**Response:** sell a paid, narrow motion subassembly into packaging/metrology where the buyer owns the process specification; rent or partner for metrology; keep the stage modular; and make qualification evidence the product. If no buyer will share a quantified error budget, do not build.

## 12. Public/paywall boundary

Public, directly inspected sources support: TSMC’s CoWoS demand/capacity statement (S1–S2); Intel’s packaging architectures (S3); ASML’s stage architecture and performance descriptions (S15–S16, S21); vendor product capabilities (S5–S9); Penang ecosystem descriptions (S10–S12); ISO/SEMI/IEST scope statements (S22, S25–S27); and open-access J-STAGE technical results (S18).

The following remain boundaries, not facts: actual market share, ASPs, lead times, vendor failure rates, internal customer specifications, CoWoS equipment BOMs, qualification cycle times, and Southeast Asian air-bearing installed base. The ScienceDirect paper on multi-degree-of-freedom air-bearing error motion was blocked by a 403/paywall or fetch error in this pass (S28). The NIST ultra-precision metrology PDF URL returned an internal fetch error; its program summary was not used as sole proof where the NIST HTML interferometer paper sufficed (S23–S24). ISO 230-2 and SEMI E78 are paid standards; only their public abstracts/scope were used. A final batch spot-open intermittently returned internal errors for PI, InvestPenang, Onto Innovation, and ISO 230-2, although each of PI/InvestPenang/Onto/ISO 230-2 had opened successfully earlier in the same research session; treat those URLs as requiring a repeat check before publication.

## 13. Visual evidence briefs

### Visual A — “The stage is a system, not a bearing”

- **Nearby claim:** A bearing becomes a saleable stage only with preload, structure, motor, sensor, servo, environment, and qualification.
- **Why:** A cutaway can prevent the reader from treating a catalog bearing as a complete lithography subsystem.
- **Source:** PI linear-air-bearing page, https://www.pi-usa.us/en/products/air-bearings-ultra-high-precision-stages/air-bearing-linear-stages-linear-air-bearings; Newport brochure, https://www.newport.com/medias/sys_master/images/images/h0d/h6b/8797212835870/Motion-PL30-Brochure.pdf
- **Owner/date:** PI USA and MKS Newport; pages accessed 2026-09-12.
- **Treatment:** Original diagram, reconstructed from product architecture; factual evidence plus editorial labels; do not copy product photography; link sources in caption.
- **Caption:** “The air film is one layer in a closed-loop motion system; the acceptance test is the product.”
- **Uncertainty:** Vendor architecture and headline specs are public; internal tolerances and reliability data are not.

### Visual B — “What sub-2nm actually means in public evidence”

- **Nearby claim:** ASML links High-NA EUV to 2nm-class logic but describes a magnetic, dual-stage, sensor-rich architecture.
- **Why:** Separates node label from a generic air-bearing opportunity.
- **Source:** https://www.asml.com/en/products/euv-lithography-systems and https://www.asml.com/en/technology/lithography-principles/mechanics-and-mechatronics
- **Owner/date:** ASML; accessed 2026-09-12.
- **Treatment:** Faithful process-chain reconstruction (optics → magnetic wafer stage → interferometric/in-scanner metrology); no copied graphics; sourced diagram.
- **Caption:** “Sub-2nm is a process/system label, not proof that an aerostatic stage is the purchased bottleneck.”
- **Uncertainty:** ASML discloses selected performance, not the full stage BOM or supplier map.

### Visual C — “Penang launch path”

- **Nearby claim:** Penang offers a supplier and ATE ecosystem, but a cell still needs validated metrology/environmental infrastructure.
- **Why:** Maps the shortest path from supplier cluster to a customer-accepted module.
- **Source:** https://investpenang.gov.my/penang-ate-campus/ and https://www.mida.gov.my/industries/manufacturing/machinery-metal/machinery-metal-engineering-support-industry/
- **Owner/date:** InvestPenang/MIDA; accessed 2026-09-12.
- **Treatment:** Original schematic map/flow, not geographic proof of a specific host; illustrative with source-backed ecosystem labels.
- **Caption:** “Cluster access lowers search and integration cost; it does not waive qualification.”
- **Uncertainty:** Supplier list and campus plans can change; host availability requires field confirmation.

## 14. Source ledger

| ID | Material claim | Type/status | Direct source and date | Evidence quality | Proves | Does not prove / counterevidence | Falsifier / decision impact |
|---|---|---|---|---|---|---|---|
| S1 | CoWoS demand was strong into 2025 and TSMC capacity was insufficient. | Fact; high | TSMC Q1 2024 transcript, 2024-04-18: https://investor.tsmc.com/english/encrypt/files/encrypt_file/reports/2024-04/34ff75e23e53246302ce3a8d90d0423c57c6b120/TSMC%201Q24%20Transcript.pdf | Primary earnings transcript | Direct executive statement and use of OSAT partners. | Does not identify motion spend or 2026 demand. | New customer interviews show no motion constraint; H1 weakens. |
| S2 | TSMC is investing in 2nm and advanced packaging capacity. | Fact; high | TSMC 2024 annual report: https://investor.tsmc.com/static/annualReports/2024/english/index.html | Primary annual report | Structural demand/capacity investment. | Does not imply third-party air-bearing demand. | Capex cancellation or packaging substitution; demand chain narrows. |
| S3 | Intel has EMIB/Foveros advanced packaging architectures. | Fact; high | Intel Foundry packaging: https://www.intel.com/content/www/us/en/foundry/packaging.html | Primary product page | Technical packaging pathways and production status labels. | No supplier demand signal. | Customer says motion not a constraint; H1 fails for that use case. |
| S4 | Wafer/package metrology is a real process-control workload. | Fact; high | ASML YieldStar 500: https://www.asml.com/en/products/metrology-and-inspection-systems/yieldstar-500 | Primary product page | Standalone optical metrology and customized stage value. | Does not disclose stage procurement or market size. | No funded metrology tool programs; wedge shrinks. |
| S5 | PI offers integrated air-bearing stages and example geometry/resolution specs. | Fact; high | https://www.pi-usa.us/en/products/air-bearings-ultra-high-precision-stages/air-bearing-linear-stages-linear-air-bearings; catalog https://www.pi-usa.us/fileadmin/user_upload/pi_us/files/catalogs/PI_Motion_Positioning_Product_Overview.pdf | Primary catalog/page | Mature component + controller + mapping offer. | Marketing specs, not independent acceptance data; no market share. | Quotes show no availability or price advantage; wedge must differentiate. |
| S6 | Aerotech offers air-bearing linear/rotary and custom motion systems for metrology/clean applications. | Fact; high | https://www.aerotech.com/products/stages-actuators-products/ and https://www.aerotech.com/product/linear-rotary-air-bearing-system/ | Primary supplier pages | Incumbent breadth and application fit. | No prices, margins, or regional lead times. | Two OEMs prefer Aerotech on service/qualification; startup must add integration value. |
| S7 | Newport/MKS SinguLYS example: ±0.1 µm accuracy, 10 nm minimum incremental motion, 10 µrad angular specs. | Fact; high | https://www.newport.com/p/SinguLYS-S-370 | Primary product page | Public performance anchor for packaging/metrology-grade discussion. | Not lithography-grade; no independent test. | Customer requires tighter spec than product and no integration path; out of wedge. |
| S8 | Newport DynamYX Datum example: 0.2 µm accuracy, ±25 nm repeatability, 300 Hz natural frequency. | Fact; medium | https://www.newport.com/p/DYNAMYX-DATUM | Primary product page | Incumbent performance/architecture anchor. | Vendor claim; no price or full uncertainty budget. | Startup cannot beat customer’s incumbent metric. |
| S9 | ALIO advertises ±100 nm repeatability and ~1 µm flatness in selected planar systems. | Fact; medium | https://alioindustries.com/air-bearing-systems/ | Primary supplier page | Competing air-bearing and non-air architecture. | Configuration-specific marketing claims. | Customer accepts crossed-roller/hybrid instead; air bearing is not required. |
| S10 | Penang ATE Campus targets co-development, shared facilities, training, and qualification. | Fact; high | https://investpenang.gov.my/penang-ate-campus/ | Government/state agency page | Ecosystem and potential partnership route. | Campus availability, room specs, and access terms unverified. | Host cannot provide required environment; no captive cell. |
| S11 | Penang has a broad E&E/precision supplier network. | Fact; medium | https://investpenang.gov.my/electrical-electronics/ | State agency page | Supplier-search rationale. | Self-reported count; not nanometer capability proof. | Due diligence finds no relevant vendors; geography loses advantage. |
| S12 | MIDA identifies a Penang high-precision parts/fabrication cluster. | Fact; medium | https://www.mida.gov.my/industries/manufacturing/machinery-metal/machinery-metal-engineering-support-industry/ | Government agency page | Local manufacturing lead. | Not evidence of air-bearing qualification. | Quotes fail material/flatness/traceability needs. |
| S13 | Onto Firefly G5 targets advanced substrate/panel packaging inspection and 3D metrology. | Fact; high | https://ontoinnovation.com/products/firefly-g5/ | Primary supplier page | Specific customer workflow and tool category. | No stage BOM or sub-tier supplier demand. | Motion is not in customer’s pain point; pivot. |
| S14 | KLA lists package and wafer inspection/metrology systems. | Fact; medium | https://ir.kla.com/sec-filings/all-sec-filings/content/0000319201-19-000021/ex101cy18.htm | Company filing | Confirms broad competitive tool ecosystem. | 2018-era filing; not current market share. | No current program; use only as ecosystem context. |
| S15 | ASML High-NA EXE uses 0.55 NA and supports future nodes starting at 2nm; NXE supports 2nm. | Fact; high | https://www.asml.com/en/products/euv-lithography-systems | Primary product page | Node/optics/stage context. | Does not say aerostatic stages are required or outsourceable. | Architecture/spec mismatch falsifies lithography wedge. |
| S16 | ASML describes magnetic levitation, 7g, 60-pm sensing, and synchronized stages. | Fact; high | https://www.asml.com/en/technology/lithography-principles/mechanics-and-mechatronics | Primary technical page | Lithography-grade motion difficulty and architecture. | Selected marketing narrative, not full procurement map. | No path to qualification; stay out of lithography. |
| S17 | IBS publishes air-bearing component/application guidance. | Fact; medium | https://www.ibspe.com/hubfs/Documents/Knowledge%20library/04.0%20Components/401%20Air%20Bearing%20Application%20Guide.pdf | Supplier technical guide; opened 2026-09-12 | Component market exists; application considerations. | Supplier guide, not independent performance certification; no numeric use. | Replace with customer/independent evidence before relying. |
| S18 | Active restrictor paper reports high stiffness/dynamic response in a specialized bearing. | Fact; high | https://www.jstage.jst.go.jp/article/jjspe1986/56/8/56_8_1431/_article/-char/en | Open journal | First-principles proof that restrictor/feedback design matters. | Thrust-bearing research, not a production stage. | Prototype cannot reproduce response; design risk rises. |
| S19 | Restrictor optimization trades stiffness against smaller gaps/manufacturing difficulty; 0.1 µm/200 mm guideway result. | Fact; medium | https://journals.sagepub.com/doi/10.1177/0954406218819559 | Abstract + restricted full text | Technical tradeoff and realistic geometric anchor. | Paywall; limited context and test conditions. | Independently measured result misses spec; no product claim. |
| S20 | Newport HybrYX example lists 0.6 µm surface flatness. | Fact; high | https://www.newport.com/p/HybrYX | Primary product page | Flatness calibration anchor; hybrid alternative. | Configuration-specific. | Flatness requirement is looser/tighter than assumed; re-scope. |
| S21 | ASML says optical mirrors are smooth to tens of picometers. | Fact; high | https://www.asml.com/technology/lithography-principles/lenses-and-mirrors | Primary technical page | Distinguishes optics surface from stage base. | Does not support “nanometer-lapped stage.” | Any pitch conflating mirror and stage is rejected. |
| S22 | ISO 230-2 covers axis accuracy/repeatability and uncertainty methods. | Fact; high | https://www.iso.org/standard/55295.html | Official standard abstract; paid | Acceptance-test framework. | Full standard requires purchase; no customer-specific limit. | Customer refuses traceable test; qualification risk. |
| S23 | NIST program identifies metrology/environment/thermal uncertainty and a sub-5 nm target. | Fact; medium | https://www.nist.gov/system/files/documents/el/melprograms10.pdf | NIST PDF; inaccessible spot-open | Shows metrology burden is real. | URL returned internal fetch error in this pass. | Treat as lead; verify through accessible NIST lab or customer. |
| S24 | NIST interferometer lab controls 20 °C ±0.05 °C and isolates vibration. | Fact; high | https://nvlpubs.nist.gov/nistpubs/jres/104/3/html/j43bee.htm | NIST open paper | Concrete environmental and thermal example. | Specific lab/instrument, not universal stage requirement. | Customer uncertainty budget demands tighter control. |
| S25 | ISO 14644-1 classifies airborne particle concentration from 0.1–5 µm and excludes chemical/physical attributes. | Fact; high | https://www.iso.org/standard/53394.html | Official standard abstract; paid | Cleanroom class scope. | Does not prescribe vibration/temp/ESD. | Host’s ISO class alone fails qualification. |
| S26 | SEMI E78 addresses equipment ESD/ESA and particle attraction risk. | Fact; high | https://store-us.semi.org/products/e07800-semi-e78-guide-to-assess-and-control-electrostatic-discharge-esd-and-electrostatic-attraction-esa-for-equipment | SEMI paid product page | Relevant equipment qualification dimension. | Full guide is paid; no customer limit. | ESD/EMC test failure blocks deployment. |
| S27 | IEST RP-CC024 covers vibration measurement/reporting in microelectronics/metrology facilities. | Fact; medium | https://www.iest.org/Standards-RPs/Recommended-Practices/IEST-RP-CC024 | Standards body page | Vibration is a measured facility variable. | Recommended practice, not performance requirement. | Floor spectrum outside budget; host rejected. |
| S28 | Multi-DOF air-bearing error motions can be measured and angular errors may dominate. | Fact; medium | https://www.sciencedirect.com/science/article/abs/pii/S0141635905000978 | Abstract; 403/paywall | Directly supports error-motion focus. | Full paper inaccessible; no numeric use beyond abstract. | Independent test required before design freeze. |
| S29 | ISO/IEC 17025 sets competence, impartiality, and consistent-operation requirements for testing and calibration laboratories. | Fact; high | https://www.iso.org/standard/66912.html | Official ISO page | Basis for choosing an external calibration/testing partner. | Accreditation is scope-specific; it does not prove the lab can measure this stage. | Partner scope/uncertainty does not cover the measurand; reject the lab. |
| S30 | ILAC MRA recognition depends on an accreditation body’s peer evaluation and a laboratory’s relevant accredited scope. | Fact; high | https://ilac.org/ilac-mra-and-signatories/ and https://ilac.org/?ddownload=123220 | ILAC pages/P10 guidance | International recognition and traceability route. | Does not set the customer’s acceptance limit or make an unsuitable method suitable. | Certificate lacks relevant scope, mark, or traceability statement; use another lab. |
| S31 | SAC-SINGLAS assesses technical competence and grants reports only for specific accredited tests/calibrations. | Fact; high | https://www.sac-accreditation.gov.sg/services/accreditation-services/laboratories/ | Singapore government accreditation body | A concrete regional route for external metrology. | No claim that a particular stage calibration is in the directory. | Host cannot show exact scope and current certificate. |
| S32 | Malaysia’s SAMM scheme covers testing and calibration under MS ISO/IEC 17025 and pursues international acceptance through ILAC/APAC arrangements. | Fact; high | https://www.jsm.gov.my/component/content/article/252-skim-akreditasi-makmal-malaysia-samm?Itemid=448&catid=12&highlight=WyJzYW1tIiwiYWNjcmVkaXRlZCIsImxhYm9yYXRvcnkiLCJtYWxheXNpYSJd | Standards Malaysia page | A Penang/Malaysia search route for accredited labs. | Scheme existence is not proof of a local lab’s length/angle/force scope. | No matching scope or available booking; use Singapore/NMI/other ILAC route. |
| S33 | ISO 230-3 defines tests for environmental temperature variation and thermal distortion of moving axes. | Fact; high | https://www.iso.org/standard/73291.html | Official ISO page | A public test-method anchor for thermal drift and compensation uncertainty. | Full standard is paid; not a customer-specific acceptance limit. | Requirements cannot be mapped to a reproducible test; negotiate the method before design freeze. |
| S34 | ISO 230-4 specifies tests for bi-directional circular, radial, and coordinated-axis contouring errors. | Fact; high | https://www.iso.org/standard/79155.html | Official ISO page | A public test-method anchor for multi-axis demonstrator behavior. | Full standard is paid; circular performance is not the complete process error budget. | Test setup or calibrated instrument is unavailable; do not claim contouring performance. |
| S35 | ISO 12100 provides a methodology for machinery hazard identification, risk assessment, and risk reduction. | Fact; high | https://www.iso.org/standard/51528.html | Official ISO page | Safety-review framework for a pressurised moving demonstrator. | It does not define the customer’s required protective measures or certify a machine. | Unresolved hazard or missing risk record; stop the test. |
| S36 | ISO 13849-1 covers design/integration methodology for safety-related control-system parts, including pneumatic and mechanical energy. | Fact; high | https://www.iso.org/standard/73481.html | Official ISO page | Safety-control design reference for interlocks and landing behavior. | It does not specify the required performance level for this application. | Safety function/PLr is undefined; obtain customer/competent safety review. |
| S37 | SEMI E10 supplies common RAM/utilisation metrics and supports equipment performance requirements and service negotiations. | Fact; high | https://www.semi.org/en/standards-watch-2021March/e-ramp-standard-updated | SEMI explanatory page; underlying standard paid | Service-economics and uptime vocabulary for a semiconductor customer. | No stage-specific target, price, or guarantee. | Customer cannot map module events to RAM states; define an agreed metric first. |
| S38 | ISO 9001 provides a general quality-management framework for customer and applicable requirements; certification is not stage qualification. | Fact; high | https://www.iso.org/standard/9001 | Official ISO page | Frames QMS/process control as distinct from technical acceptance. | Does not certify metrology, stage performance, safety, or customer-specific process capability. | Buyer requires technical evidence beyond QMS; add tests and traceability. |

## 15. Provider disagreement and claim calibration log

- **“Sub-2nm requires aerostatic stages”:** user thesis = unsupported; ASML public evidence points to magnetic levitation and in-scanner metrology (S15–S16). Status: **falsified as a general claim; unverified for any specific non-ASML tool**.
- **“CoWoS is the primary advanced-packaging bottleneck”:** TSMC confirms strong demand and capacity shortfall in 2024; current universal/2026 wording is not proven by TSMC alone. Status: **supported for the cited period, extrapolation unverified**.
- **“PI-led oligopoly”:** multiple credible suppliers publish competing air-bearing systems (S5–S9). Status: **not established; treat incumbent trust/qualification as moat instead**.
- **“Nanometer-level lapped granite/ceramic”:** vendor pages show micron-class surface/flatness examples, while NIST/ASML show that nanometer measurement needs environmental control and uncertainty accounting. Status: **overbroad; measurand and datum required**.
- **“$100–250k initial capex”:** feasible for prototype with rented infrastructure; not for complete qualification cell. Status: **prototype-supported, production-cell claim rejected**.
- **“Penang captive cell is fastest”:** ecosystem evidence supports search and co-development; no host/lease/instrument evidence was found. Status: **plausible but unverified**.

## 16. Next data collection and field experiment

1. **Owner:** founder + applications engineer; **when:** first 30 days; **data:** 10 OEM interviews, 5 incumbent quotes, 3 customer error budgets; **metric:** one paid NRE and one acceptance test; **stop:** no paid quantified problem.
2. **Owner:** controls/mechatronics lead; **when:** months 2–6; **data:** prototype error map, stiffness, pressure, thermal, vibration, and servo logs; **metric:** ≥80% of target spec over 72 h; **stop:** no repeatability/geometry margin.
3. **Owner:** QA/host partner; **when:** months 6–12; **data:** particle/ESD/EMC, endurance, power-loss landing, calibration uncertainty; **metric:** customer witness acceptance and 1,000-hour log; **stop:** unresolved drift or contamination.
4. **Owner:** finance/operations; **when:** months 3–9; **data:** room lease, utilities, instrument rental, machining quotes, staff salaries, insurance; **metric:** base-case runway ≥18 months and module gross contribution ≥40%; **stop:** cell requires >$750k before second design-in.

## 17. Execution appendix — the follow-up questions that decide whether this becomes a company

### 17.1 Gemini lead triage: accepted, rejected, unknown

The linked Gemini thread is useful as a prompt for execution, not as evidence. It describes a generic precision-component cost-down path: move material closer to net shape, separate rough work from scarce finishing capacity, use in-process metrology to improve yield, and negotiate upstream material only after volume exists. Those are **hypotheses to test** for an aerostatic-stage module. They do not establish a Penang wage advantage, tariff treatment, Chinese scrap rate, 100,000-unit market, or a four-year path to a $120 cost basis.

For this opportunity I accept four leads as questions: (1) can a supplier form or otherwise reduce waste in the carriage/base or restrictor subassembly; (2) can rough machining, precision finishing, lapping, coating, and calibration be routed to different vendors without losing traceability; (3) can in-process geometry/flow checks reduce rework; and (4) when does a material or restrictor vendor warrant a dedicated tool? I reject any plan that assumes cheap qualified cells, casual high-pressure machinery, or a volume curve before a customer has paid for a design-in.

**Still unknown:** the customer’s actual stage BOM and annual volume; the share of cost in base, pads, restrictors, motor, encoder, controls, calibration, and service; local supplier capability and yield; landed cost to the customer’s factory; and whether a lower-cost hybrid or magnetic stage makes the air-bearing premise irrelevant. These require quotes, drawings, witnessed tests, and field data—not more desk research.

### 17.2 A 30/60/90-day founder learning path

| Window | Founder work | Tangible artifact | Go / stop rule |
|---|---|---|---|
| Days 0–30: learn and map | Learn bearing preload, restrictor flow, servo following error, thermal expansion, uncertainty, and customer equipment economics. Speak with 3 motion-control engineers, 2 metrologists, and 2 tool-service engineers. Map 20 packaging/metrology OEMs and integrators without claiming demand. | One-page glossary; hypothesis tree; initial 20-account map; draft error-budget packet; list of safe partner labs. | Continue only if at least 3 experts identify a motion metric that can plausibly affect yield, throughput, uptime, or lead time. Otherwise stop the air-bearing thesis, not the learning. |
| Days 31–60: specify with buyers | Run 10 technical discovery calls. Ask for anonymised payload/travel/duty-cycle data, interface constraints, air/vacuum state, environment, incumbent architecture, acceptance test, service burden, and procurement owner. Obtain 5 comparable incumbent quotes or documented catalog alternatives. | Three completed buyer/spec packets; two alternative architectures; five quote/lead-time records; named qualification owner for one account. | No machining if nobody will share a measurable problem and an acceptance owner. No invented urgency from a polite exploratory call. |
| Days 61–90: earn a paid experiment | Convert one packet into a written SOW: deliverables, customer inputs, safety boundary, test method, acceptance criteria, schedule, change control, IP, and payment milestones. Audit a candidate host and line up external accredited metrology. | Signed paid feasibility/NRE or a written no-go; host-audit report; demonstrator test plan; cash/runway model. | Go to a demonstrator only with paid NRE (planning placeholder: $25k–$60k) or equivalent customer-funded access. Stop if the buyer will not fund the uncertainty it wants removed. |

The founder’s learning target is not “become a master machinist in 90 days.” It is to become fluent enough to translate a buyer’s process loss into a falsifiable motion specification, price the risk, and know which measurements must be independent.

### 17.3 Buyer personas, interview questions, and the error-budget packet

| Persona | Questions that reveal a real buying problem | Evidence required before a proposal |
|---|---|---|
| Tool OEM systems/application engineer | Which axis, payload, trajectory, and process step are constrained? What is the current error budget and what term is failing? What stays in the OEM controller and ICD? | An anonymised ICD, trajectory, payload, air/vacuum state, and named acceptance test. |
| Metrology/process owner at fab or OSAT | Which measurement uncertainty, defect map, or excursion is motion-related rather than optics, recipe, warpage, chemistry, or software? What correlation would justify a change? | Baseline data, measurand/datum, uncertainty budget, and a witness-test owner. |
| Manufacturing/quality engineer | What incoming inspection, calibration, FMEA, traceability, ESD/EMC, particles, and change-control records are mandatory? | Supplier-quality checklist and sample report pack; no claim that ISO 9001 alone qualifies a stage. |
| Service/operations owner | What does a failed air supply, encoder, pad, or controller do to the tool? How fast must a spare arrive? What is the allowed intervention window? | Failure modes, safe landing/recovery procedure, spare policy, response-time and uptime target. |
| Procurement/finance | Is the decision driven by price, lead time, single-source risk, service, or customer compliance? What NRE is reimbursable, and who owns design changes? | Incumbent quote/lead-time comparison, NRE terms, warranty boundary, and total-cost-of-ownership model. |

The packet sent after an interview should contain: (a) application and payload; (b) travel, speed, acceleration, duty cycle, and settling definition; (c) straightness/flatness/pitch/yaw/roll and position requirements, each with datum and bandwidth; (d) thermal, vibration, pressure, particle, ESD/EMC, and cleanliness limits; (e) interface-control document and controller ownership; (f) calibration method and uncertainty budget; (g) uptime, spare, service, and change-control requirements; and (h) the incumbent and substitution baseline. A customer’s assertion that a stage is “nanometer” is not a specification until these fields exist.

### 17.4 Demonstrator versus metrology-qualified module

| Boundary | Benchtop demonstrator | Metrology-qualified module |
|---|---|---|
| Purpose | Test bearing/preload/servo hypotheses with an inert, guarded payload. | Meet a customer ICD and witnessed acceptance test in the stated environment. |
| Measurement | Rented or partner instruments; repeatability and error trends are engineering data. | Calibrated instruments with a traceable uncertainty budget; use an external ISO/IEC 17025 laboratory when the result is customer-critical. ISO/IEC 17025 sets competence, impartiality, and consistent-operation requirements for testing/calibration labs ([ISO](https://www.iso.org/standard/66912.html)); ILAC says the accreditation scope must cover the specific calibration ([ILAC P10](https://ilac.org/?ddownload=123220)). |
| Environment | Low-pressure, low-speed, non-production tests inside guards; no customer product, vacuum, or unreviewed stored-energy experiment. | Customer-selected clean/air/thermal/vibration/ESD conditions; serialised calibration, FMEA, change control, and service procedure. |
| Safety | Follow a documented hazard review; pressure relief, interlocks, emergency landing, guarding, and power-loss behavior are mandatory. Do not improvise high-energy/high-pressure precision machinery. | Safety functions and risk reduction are designed and documented against the applicable customer and machinery requirements; ISO 12100 provides the risk-assessment framework and ISO 13849-1 covers safety-related control-system design ([ISO 12100](https://www.iso.org/standard/51528.html), [ISO 13849-1](https://www.iso.org/standard/73481.html)). |
| Claim allowed | “Engineering demonstrator; results are not a product guarantee.” | Only the measured, scoped claim: e.g. repeatability/error motion under named payload, trajectory, temperature, pressure, and test method. Never “lithography-grade” by analogy. |

The safe sequence is instrument access first, a guarded low-energy demonstrator second, and customer qualification only after the hazard analysis and acceptance method are agreed. A rented cleanroom is not permission to run a pressurised or high-speed machine without a competent host review.

### 17.5 Paid NRE and statement-of-work shape

Quote the risk as work packages, not as an underpriced promise to “build a stage.” The figures below are **planning placeholders**, not market quotes:

1. **Discovery and ICD (about $5k–$15k):** confirm payload/trajectory, architecture alternatives, interface, test method, and data rights. Deliverable: signed requirements and assumptions register.
2. **Feasibility and design (about $25k–$60k):** restrictor/preload model, thermal/structural analysis, supplier plan, safety concept, and demonstrator design. Deliverable: design review and go/no-go report.
3. **Prototype and witnessed test (about $80k–$200k):** precision parts, controller integration, fixtures, calibrated measurement, rework allowance, and acceptance report. Deliverable: serialised module, raw data, uncertainty budget, and failure log.
4. **Qualification and sustaining (priced separately):** customer environmental tests, endurance, software/API changes, spares, field service, and engineering-change notices. Deliverable: qualification matrix and service pack.

Every SOW should identify customer-furnished data and fixtures, excluded claims, pressure and energy limits, instrument responsibility, acceptance and retest rules, warranty boundary, IP ownership, export/customer confidentiality, and the event that releases the next payment. If a buyer wants a free prototype before sharing an acceptance owner, the answer is no.

### 17.6 Exact host / captive-cell audit

Do not call a room a qualification cell until the host can produce evidence for every row:

| Audit item | Evidence to request | Fail condition |
|---|---|---|
| Metrology | Instrument model/serial, current calibration certificate, uncertainty and scope; external lab’s ISO/IEC 17025 accreditation and ILAC/SAC/SAMM recognition where applicable. SAC notes accreditation is only for specific tests/calibrations ([SAC](https://www.sac-accreditation.gov.sg/services/accreditation-services/laboratories/)); Malaysia’s SAMM scheme is based on MS ISO/IEC 17025 and ILAC/APAC recognition ([Standards Malaysia](https://www.jsm.gov.my/component/content/article/252-skim-akreditasi-makmal-malaysia-samm?Itemid=448&catid=12&highlight=WyJzYW1tIiwiYWNjcmVkaXRlZCIsImxhYm9yYXRvcnkiLCJtYWxheXNpYSJd)). | Certificate scope does not cover the actual length/angle/force/temperature calibration, or calibration is expired. |
| Geometry and thermal drift | Artifact/datum definition, instrument setup, temperature history, warm-up, and drift method. ISO 230-3 explicitly addresses environmental temperature variation and thermal distortion of moving axes ([ISO 230-3](https://www.iso.org/standard/73291.html)). | Host offers “CMM access” but cannot state uncertainty, thermal conditions, or setup repeatability. |
| Circular/contouring behavior | Ball-bar/laser or equivalent method, calibration, test parameters, and feedback-vs-external measurement distinction. ISO 230-4 provides public methods for circular and contouring tests ([ISO 230-4](https://www.iso.org/standard/79155.html)). | Only a controller screenshot or vendor repeatability number is available. |
| Facility | Floor spectrum/isolation data, temperature/humidity history, HVAC flow, particle/oil/outgassing limits, ESD grounding, pressure/dew point/flow logs, and utility redundancy. | Host supplies an ISO room class only; vibration, thermal, air, or ESD evidence is missing. |
| Governance and liability | Access control, IP segregation, insurance, incident response, maintenance/cleaning boundary, export-control policy, and who signs the test report. | Startup cannot control raw data/configuration, or host disclaims all responsibility for a customer acceptance test. |

The first external metrology partner should be chosen by **scope and uncertainty**, not by a logo or proximity. Accreditation does not make an unsuitable measurement suitable; the actual artifact, range, method, and uncertainty still have to fit the customer’s error budget.

### 17.7 Make/buy gates and long-term cost-down

| Work package | Buy/partner initially when… | Consider making in-house only when… |
|---|---|---|
| Air pads/restrictors | A specialist has repeatable flow/stiffness data and the startup lacks process history. | A paid platform repeats across customers and the startup can instrument flow, geometry, and yield without losing traceability. |
| Granite/SiC base and precision carriage | A qualified shop can hold the drawing and provide inspection records; capacity is intermittent. | Utilisation is high enough to amortise tooling and inspection, and the shop’s yield/lead time is the bottleneck. |
| Motors, encoders, controller | A catalog component meets the packet and has a service path. | Customer volume, interface ownership, or lifecycle availability creates a documented reason to redesign; never vertically integrate for prestige. |
| Calibration and qualification | Rent or use an external accredited lab; preserve raw data and acceptance ownership. | Weekly use, stable demand, and instrument utilisation justify ownership; buy the difficult-to-rent instrument first. |
| Clean assembly and service | Use a validated host while volumes and contamination controls are unknown. | Repeat orders, documented process capability, and service response data support a controlled cell. |

The cost-down order is deliberate: first remove specification ambiguity and rework, then separate rough/finish suppliers, then validate near-net-shape or dedicated tooling against measured volume, and only then negotiate upstream material. In-line metrology is valuable if it closes a control loop; buying a scanner without a response plan is decoration. No stage cost model should assume China-parity economics until it has actual yield, cycle-time, material, calibration, freight, and service data.

### 17.8 Service economics and substitution risk

Track the customer’s total cost of ownership, not only the module invoice:

```text
annual customer value = avoided downtime + avoided rework/yield loss
                      + throughput value + service/lead-time value
                      − module price − utilities − spares − integration
                      − calibration − planned maintenance − failure reserve
```

For the startup, track `contribution = ASP + paid NRE amortisation + service revenue − build/test − rework − warranty reserve − field support − allocated cell cost`. Report the result by serialised module and customer. Service should include spare-pad/encoder/controller lead time, remote diagnostics, safe landing recovery, calibration interval, mean time to repair, intervention hours, and return-material analysis. SEMI E10 is a useful customer vocabulary for reliability, availability, maintainability, utilisation, and supplier-user performance negotiation ([SEMI](https://www.semi.org/en/standards-watch-2021March/e-ramp-standard-updated)); it does not supply a stage-specific target.

The substitution test runs at every design review: compare the proposed air stage with crossed-roller, magnetic, voice-coil, and hybrid alternatives on error budget, stiffness, vacuum/cleanliness, fail-safe behavior, installed cost, lead time, service, and qualification time. Air wins only if it creates a measurable advantage in the customer’s process. If a hybrid is cheaper and meets the budget, sell the hybrid or stop; protecting the air-bearing identity is not a business objective.

### 17.9 Execution falsifiers and unknowns

- **Customer falsifier:** three qualified OEMs provide a comparable incumbent that meets the process budget at lower TCO, including service and qualification.
- **Technical falsifier:** independent measurement cannot reproduce the required error motion, thermal drift, pressure sensitivity, or endurance at the stated payload and trajectory.
- **Cell falsifier:** no host can provide instrument scope, uncertainty, environmental records, liability, and raw-data control; do not sign a lease.
- **Economic falsifier:** paid NRE and service cannot cover rework, cell utilisation, and field support before a second design-in; do not vertically integrate.
- **Safety falsifier:** pressure-loss, power-loss, landing, guarding, or control-system hazards remain unresolved; stop testing and use a competent external facility.

This appendix changes the practical recommendation from “build a cell” to “buy evidence.” The company earns the right to own a cell only after a paid specification, a safe demonstrator, an external metrology path, a witnessed acceptance test, and repeat demand.

## 18. Bibliography (direct URLs)

1. TSMC, Q1 2024 earnings transcript — https://investor.tsmc.com/english/encrypt/files/encrypt_file/reports/2024-04/34ff75e23e53246302ce3a8d90d0423c57c6b120/TSMC%201Q24%20Transcript.pdf
2. TSMC, 2024 annual report — https://investor.tsmc.com/static/annualReports/2024/english/index.html
3. Intel Foundry, Advanced Packaging — https://www.intel.com/content/www/us/en/foundry/packaging.html
4. ASML YieldStar 500 — https://www.asml.com/en/products/metrology-and-inspection-systems/yieldstar-500
5. PI USA air-bearing linear stages — https://www.pi-usa.us/en/products/air-bearings-ultra-high-precision-stages/air-bearing-linear-stages-linear-air-bearings
6. Aerotech stages and actuators — https://www.aerotech.com/products/stages-actuators-products/
7. Newport/MKS SinguLYS S-370 — https://www.newport.com/p/SinguLYS-S-370
8. Newport/MKS DynamYX Datum — https://www.newport.com/p/DYNAMYX-DATUM
9. ALIO air-bearing systems — https://alioindustries.com/air-bearing-systems/
10. InvestPenang ATE Campus — https://investpenang.gov.my/penang-ate-campus/
11. InvestPenang E&E ecosystem — https://investpenang.gov.my/electrical-electronics/
12. MIDA Machinery & Metal engineering support — https://www.mida.gov.my/industries/manufacturing/machinery-metal/machinery-metal-engineering-support-industry/
13. Onto Innovation Firefly G5 — https://ontoinnovation.com/products/firefly-g5/
14. KLA package/metrology filing — https://ir.kla.com/sec-filings/all-sec-filings/content/0000319201-19-000021/ex101cy18.htm
15. ASML EUV systems — https://www.asml.com/en/products/euv-lithography-systems
16. ASML mechanics and mechatronics — https://www.asml.com/en/technology/lithography-principles/mechanics-and-mechatronics
17. IBS Precision Engineering air-bearing guide — https://www.ibspe.com/hubfs/Documents/Knowledge%20library/04.0%20Components/401%20Air%20Bearing%20Application%20Guide.pdf
18. Mizumoto et al., J-STAGE active restrictor bearing — https://www.jstage.jst.go.jp/article/jjspe1986/56/8/56_8_1431/_article/-char/en
19. Lai et al., aerostatic equipment optimization — https://journals.sagepub.com/doi/10.1177/0954406218819559
20. Newport HybrYX — https://www.newport.com/p/HybrYX
21. ASML lenses and mirrors — https://www.asml.com/technology/lithography-principles/lenses-and-mirrors
22. ISO 230-2 — https://www.iso.org/standard/55295.html
23. NIST Ultra-Precision Linear Motion Metrology — https://www.nist.gov/system/files/documents/el/melprograms10.pdf
24. NIST Length Scale Interferometer — https://nvlpubs.nist.gov/nistpubs/jres/104/3/html/j43bee.htm
25. ISO 14644-1 — https://www.iso.org/standard/53394.html
26. SEMI E78 — https://store-us.semi.org/products/e07800-semi-e78-guide-to-assess-and-control-electrostatic-discharge-esd-and-electrostatic-attraction-esa-for-equipment
27. IEST-RP-CC024 — https://www.iest.org/Standards-RPs/Recommended-Practices/IEST-RP-CC024
28. Gao et al., multi-degree-of-freedom error motions — https://www.sciencedirect.com/science/article/abs/pii/S0141635905000978
29. ISO/IEC 17025:2017 — https://www.iso.org/standard/66912.html
30. ILAC MRA and Signatories — https://ilac.org/ilac-mra-and-signatories/
31. ILAC P10, metrological traceability — https://ilac.org/?ddownload=123220
32. Singapore Accreditation Council, Laboratories — https://www.sac-accreditation.gov.sg/services/accreditation-services/laboratories/
33. Standards Malaysia, SAMM — https://www.jsm.gov.my/component/content/article/252-skim-akreditasi-makmal-malaysia-samm?Itemid=448&catid=12&highlight=WyJzYW1tIiwiYWNjcmVkaXRlZCIsImxhYm9yYXRvcnkiLCJtYWxheXNpYSJd
34. ISO 230-3:2020, thermal effects — https://www.iso.org/standard/73291.html
35. ISO 230-4:2022, circular tests — https://www.iso.org/standard/79155.html
36. ISO 12100:2010, machinery risk assessment — https://www.iso.org/standard/51528.html
37. ISO 13849-1:2023, safety-related control systems — https://www.iso.org/standard/73481.html
38. ISO 9001 quality-management systems — https://www.iso.org/standard/9001
39. SEMI E10 RAM/utilization overview — https://www.semi.org/en/standards-watch-2021March/e-ramp-standard-updated

## 19. Verification record

Required local checks run after writing:

```text
test -s research-dossiers/2026-09-12/aerostatic-stages.md
rg -n '^## |https?://|fail|falsif|Counter|Confidence' research-dossiers/2026-09-12/aerostatic-stages.md | head -80
wc -l -w research-dossiers/2026-09-12/aerostatic-stages.md
```

Spot-open results for every relied-on URL are recorded in the ledger. Successfully opened in this revision: S29–S38 (ISO/IEC 17025, ILAC MRA/P10, SAC, Standards Malaysia/SAMM, ISO 230-3, ISO 230-4, ISO 12100, ISO 13849-1, ISO 9001, and SEMI E10); these are public primary or standards-body pages, with the underlying standards marked paid where applicable. Earlier sources S1–S22, S24–S27 were opened at least once in the prior research pass; intermittent errors for PI (S5), InvestPenang (S10–S11), Onto (S13), and ISO 230-2 (S22) remain a repeat-check item. Inaccessible or incomplete: **S23 NIST PDF (internal fetch error), S28 ScienceDirect abstract (403/paywall/fetch error)**. S23/S28 are not used as sole support for a headline conclusion; replace them with customer or independent evidence before investment.
