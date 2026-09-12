+++
title = "The Table That Floats: Precision Motion for Advanced Packaging"
slug = "the-table-that-floats-precision-motion-for-advanced-packaging"
aliases = ["/research/aerostatic-stages/", "/learning/aerostatic-stages/"]
description = "A founder's case for a narrow, qualification-led aerostatic motion wedge in packaging and metrology—and why sub-2nm lithography is the wrong first market."
date = 2026-09-12
layout = "research-swipe"
body_class = "research-swipe"
main_class = "main-research-swipe"

[fieldbook]
theme = "aerostatic"

[fieldbook.illustrations.cover]
src = "/images/aerostatic-stage-cover.png"
alt = "A precision motion table floating on a thin film of air above a granite base"
+++

# THE TABLE THAT FLOATS

### A narrow founder opportunity in packaging and metrology motion

**A Fieldbook for founders and investors | 12 September 2026**<br>
A first-person opportunity narrative, checked against public engineering and company evidence.

> I like machines that make their own impossibility visible. An aerostatic stage appears to float, but the real product is everything that must be true for that floating table to move precisely, repeatedly, cleanly, and on time.

---

## 01 · The table that never touches

# MOTION WITHOUT CONTACT

Imagine moving a fragile package beneath an optical head. The table must travel, stop, reverse, and repeat without the tiny stick-slip events that turn into measurement noise or placement error.

An aerostatic bearing creates a thin film of compressed air between two surfaces. Pressure supports the load, so the surfaces do not rub in ordinary operation. That removes mechanical wear and friction from one part of the motion problem.

The possibility is valuable because advanced packages are getting larger and more complicated while inspection and placement margins get smaller. TSMC reports strong AI-related demand, investment in 2-nanometer and CoWoS capacity, and continued development of advanced packaging. That proves a growing process environment—not a guaranteed market for an independent stage. [TSMC 2024 Annual Report](https://investor.tsmc.com/static/annualReports/2024/english/index.html)

My question is therefore not “can air bearings float?” It is: can a small company turn that physical trick into a customer-accepted motion module?

## 02 · A bearing is not a stage

# THE AIR FILM IS ONLY THE BEGINNING

The air film is one layer in a complete stage:

```text
air supply and restrictors → opposed/preloaded bearing pads
                           → stiff, stable base and carriage
                           → direct-drive motor
                           → encoder or interferometer
                           → controller and compensation map
                           → payload, tooling, safety, and service
```

The stage error is the sum of bearing error motion, structural deflection, sensor error, servo following error, thermal drift, payload disturbance, and measurement uncertainty. A low-friction bearing does not erase those terms.

Research makes the tradeoff concrete. An open precision-engineering paper reports a 130 mm active-restrictor thrust bearing with about 5 ms settling, dynamic compliance below 1 nm/N below 2 Hz, and 10 nm stability. That is valuable evidence that restrictor and feedback design matter; it is not a production stage qualification. [J-STAGE paper](https://www.jstage.jst.go.jp/article/jjspe1986/56/8/56_8_1431/_article/-char/en)

The first product should be a replaceable motion subassembly, not a promise that one bearing solves lithography.

## 03 · Where the money moves

# PACKAGING AND METROLOGY

The demand chain is indirect:

```text
AI and chiplet demand → more packaging steps
                     → placement, bonding, inspection, metrology
                     → tool OEMs and integrators buy motion
                     → fabs and OSATs accept the result through yield and uptime
```

Intel describes EMIB, Foveros, and Foveros Direct packaging architectures. Onto’s Firefly G5 targets automated inspection and 3D metrology for advanced substrates and panel-level packaging. These are real workflows, but neither page publishes a bill of materials saying that an aerostatic stage is the bottleneck. [Intel Foundry packaging](https://www.intel.com/content/www/us/en/foundry/packaging.html) [Onto Firefly G5](https://ontoinnovation.com/products/firefly-g5/)

That distinction matters. The buyer is usually a tool OEM or system integrator. The fab or OSAT is the acceptance authority. A founder wins only when motion improves a named process metric: error motion, settling, scan throughput, yield excursion, service interval, or lead time.

## 04 · The lithography trap

# DO NOT SELL TO A FANTASY

Sub-2nm lithography is a spectacular demonstration of precision—and a poor first wedge.

ASML says its High-NA EXE systems use 0.55 numerical aperture optics and support future nodes beginning at the 2 nm logic node. Its public mechanics description says wafer stages use magnetic levitation, move at up to 7g, and are measured around 20,000 times per second with sensors accurate to about 60 picometers. Its EUV page says the wafer stage positions the wafer to within a quarter nanometer for each exposure. [ASML EUV systems](https://www.asml.com/en/products/euv-lithography-systems) [ASML mechanics and mechatronics](https://www.asml.com/en/technology/lithography-principles/mechanics-and-mechatronics)

This is evidence of an extraordinary, integrated machine—not evidence that a Penang startup can sell an aerostatic replacement into it. The unsupported shortcuts are explicit:

- sub-2nm lithography does **not** establish that an aerostatic stage is required;
- ASML’s public architecture is magnetic and sensor-rich, not a generic air-bearing platform;
- “nanometer flatness” is not a substitute for a complete uncertainty budget;
- the $100k–$250k headline is not enough for a staffed, qualified lithography cell.

I would keep lithography as a distant technical reference. I would sell first into packaging and optical/3D metrology, where a smaller module can be tested without pretending to replace the mechanical heart of an EUV tool.

## 05 · The first customer

# FIND THE ERROR BUDGET

The first customer is not “semiconductor.” It is one equipment team with one measurable problem.

For a packaging tool OEM, that problem might be a scan over a warped panel, a placement axis whose tilt consumes bonding margin, or an incumbent stage with a long spare lead time. For an optical-metrology OEM, it might be velocity ripple or straightness that limits measurement repeatability.

I would ask for the interface-control document, payload and travel, duty cycle, air/vacuum state, encoder, thermal environment, cleanliness, ESD/EMC rules, service procedure, and acceptance test. I would ask which metric is actually losing money.

The first demonstrator would be a 100–300 mm single-axis or compact X/Y module with a replaceable payload plate and safe landing on air loss. It would be integrated with the customer’s controller and tooling. The customer would pay a feasibility NRE; a friendly conversation about “future demand” would not count.

The stop rule is simple: if three target OEMs say their crossed-roller, magnetic, or hybrid stage already meets the process budget at lower total cost, I stop building the product.

## 06 · Qualification is product

# PROVE EVERY NANOMETER

Repeatability, accuracy, and flatness are different things.

**Repeatability** asks whether the stage returns to the same position. **Accuracy** asks how close that position is to the commanded or calibrated position. **Flatness/straightness** describes geometric surfaces or paths over a stated area and datum. A compensation map can improve measured motion without making an uncorrected granite surface nanometer-flat.

Public anchors are much less magical than the pitch. Newport lists 0.6 µm surface flatness for one hybrid stage; PI’s catalog lists micron-class straightness/flatness examples; ALIO publishes roughly 1 µm flatness over hundreds of millimetres for a selected planar architecture. These are useful benchmarks, not universal limits. [Newport HybrYX](https://www.newport.com/p/HybrYX) [PI air-bearing stages](https://www.pi-usa.us/en/products/air-bearings-ultra-high-precision-stages/air-bearing-linear-stages-linear-air-bearings) [ALIO air-bearing systems](https://alioindustries.com/air-bearing-systems/)

My qualification pack would include:

- position repeatability and accuracy with the exact payload and trajectory;
- straightness, flatness, pitch, yaw, and roll;
- stiffness, pressure sensitivity, velocity ripple, and step-and-settle;
- thermal drift and measurement uncertainty;
- particle, ESD/EMC, vibration, air-quality, power-loss landing, and endurance tests;
- a serialised calibration report, FMEA, change-control record, and service procedure.

The phrase “lithography-grade” stays out of the brochure until a named customer defines the measurand and witnesses the test.

## 07 · The room is part of the machine

# AIR, TEMPERATURE AND VIBRATION

At nanometer scales, the lab is part of the instrument.

NIST’s length-scale interferometer describes a below-grade, vibration-isolated room, 20°C control at ±0.05°C, and a more tightly controlled interferometer enclosure. It also shows that a 0.009°C temperature uncertainty can produce 0.1 µm length uncertainty over a one-metre steel scale under stated assumptions. [NIST Length Scale Interferometer](https://nvlpubs.nist.gov/nistpubs/jres/104/3/html/j43bee.htm)

Cleanroom class is necessary but not sufficient. ISO 14644-1 concerns airborne particle concentration; it does not specify vibration, ESD, outgassing, chemical contamination, or thermal stability. SEMI E78 addresses equipment electrostatic discharge and electrostatic attraction, while IEST-RP-CC024 provides a framework for measuring and reporting vibration in microelectronics facilities. [ISO 14644-1](https://www.iso.org/standard/53394.html) [SEMI E78](https://store-us.semi.org/products/e07800-semi-e78-guide-to-assess-and-control-electrostatic-discharge-esd-and-electrostatic-attraction-esa-for-equipment) [IEST-RP-CC024](https://www.iest.org/Standards-RPs/Recommended-Practices/IEST-RP-CC024)

The cell needs stable temperature at the artifact, dry filtered oil-free air, pressure and dew-point logging, local particle control, ESD-safe grounding, vibration data, calibrated interferometry, and a written maintenance boundary. Renting a room does not make those conditions true.

## 08 · Penang is a search advantage

# RENT THE CAPABILITY

Penang is attractive because it compresses the distance between precision suppliers, semiconductor equipment companies, automation talent, and potential test partners. InvestPenang describes an ATE Campus for co-development, shared facilities, training, and qualification. MIDA describes high-precision parts and fabrication capability in the local machinery and metal ecosystem. [InvestPenang ATE Campus](https://investpenang.gov.my/penang-ate-campus/) [MIDA machinery and metal engineering](https://www.mida.gov.my/industries/manufacturing/machinery-metal/machinery-metal-engineering-support-industry/)

That is an ecosystem thesis, not a qualification certificate. I would not sign a captive-cell lease until a host provides floor-spectrum and isolation data, temperature and humidity history, air pressure/dew-point/oil specifications, particle and ESD records, instrument calibration certificates, utility redundancy, access control, IP boundaries, and insurance terms.

The fastest path is likely a partner cell: outsource the base and carriage, rent interferometer and autocollimator time, and keep the acceptance test, configuration control, and data pack under startup control. Buy equipment only when its utilization and customer pull are visible.

## 09 · Small volumes are a service business

# THE ECONOMICS BEFORE THE FACTORY

The supplied $100k–$250k cell can fund a lean prototype when metrology and cleanroom capacity are rented. It does not fund a complete customer-qualification operation. The dossier’s scenario estimate puts a lean prototype at about $205k, a base qualification cell at $630k, and a high/customer-ready cell at $1.25m. These are estimates, not quotes.

The module model is more revealing than a large market-size claim:

| Case | Paid modules in year 2 | ASP | Variable cost/module | Fixed annual cost | Revenue | Operating contribution |
|---|---:|---:|---:|---:|---:|---:|
| Low | 2 | $55k | $38k | $330k | $110k | **−$296k** |
| Base | 8 | $85k | $48k | $420k | $680k | **−$124k** |
| High | 18 | $125k | $60k | $600k | $2.25m | **+$570k** |

`Operating contribution = units × (ASP − variable cost) − fixed engineering/quality/site cost.` Break-even is approximately 20, 12, and 10 modules in the three cases. The high case needs repeatable design, paid NRE, and a service path; it is not a sensible first-year forecast.

I would quote NRE separately for application engineering, fixtures, qualification cycles, and documentation. If the buyer will not fund that work, the “product” is probably an unfunded custom project.

## 10 · The moat is trust

# INCUMBENTS ALREADY EXIST

There is no blank market waiting for the first air-bearing idea. PI offers integrated air-bearing stages, encoders, controllers, and error mapping. Aerotech offers air-bearing linear and rotary systems. Newport/MKS offers monolithic SiC and ceramic stages. ALIO offers planar and custom systems. IBS publishes component-level application guidance. [PI](https://www.pi-usa.us/en/products/air-bearings-ultra-high-precision-stages/air-bearing-linear-stages-linear-air-bearings) [Aerotech](https://www.aerotech.com/products/stages-actuators-products/) [Newport SinguLYS](https://www.newport.com/p/SinguLYS-S-370) [ALIO](https://alioindustries.com/air-bearing-systems/) [IBS air-bearing guide](https://www.ibspe.com/hubfs/Documents/Knowledge%20library/04.0%20Components/401%20Air%20Bearing%20Application%20Guide.pdf)

The public evidence does not establish a PI-led oligopoly. Multiple credible suppliers and architectures compete, and a buyer can choose crossed rollers, magnetic levitation, or a hybrid. The founder’s moat must instead be application qualification, traceable metrology, reliable local service, and a design that fits an unusual process.

This is why the initial company may look more like a high-consequence engineering supplier than a component startup. The customer is paying to reduce uncertainty.

## 11 · Earn the right to scale

# TWENTY-FOUR MONTHS OF GATES

**Months 0–3: specify.** Speak with 10 OEMs and integrators. Secure an error budget, one real interface, two incumbent quotes, and a paid feasibility NRE. Stop if nobody owns a funded motion problem.

**Months 3–6: demonstrate.** Build one 100–300 mm module with outsourced precision parts. Rent interferometry. Measure geometry, stiffness, pressure sensitivity, thermal drift, and servo behavior. Stop if the module cannot reach 80% of the customer’s target at payload and pressure.

**Months 6–12: qualify.** Integrate the customer fixture and controller. Run particle, ESD/EMC, vibration, power-loss, and 1,000-hour endurance tests. Deliver serialised calibration, FMEA, and service documentation. Stop if the customer will not witness acceptance or issue a paid pilot.

**Months 12–18: rent before buying.** Lease a validated room inside an existing optics, ATE, or medical-device host only if the host can provide the environmental and liability evidence. Add a captive cell when weekly instrument use and repeat orders justify it.

**Months 18–24: repeat.** Ship 5–10 modules across two customers. Track field uptime, drift, rework, service hours, on-time delivery, and gross contribution. Scale only when one customer nominates the module in a production tool and contribution remains above 40% after rework and service.

## 12 · What the headline omits

# CONDITIONAL GO

The strongest bear case is not that air bearings fail. It is that the founder mistakes a visible precision requirement for a vacant market.

In lithography, ASML owns a magnetic stage architecture, sensors, control loops, metrology, and qualification history. In packaging and metrology, an incumbent may already meet the real error budget with a crossed-roller, magnetic, or hybrid stage. Even a perfect bearing does not provide clean installation, pressure stability, fail-safe landing, thermal control, software integration, EMC/ESD, field service, or 24/7 uptime.

So I would make a **conditional go** decision: pursue a customer-specified packaging/metrology subassembly with paid NRE and a partner qualification cell. I would not build a generic “sub-micron stage factory,” claim that PI is an oligopoly, imply that sub-2nm lithography needs aerostatic stages, use “nanometer flatness” as a shortcut, or spend $100k–$250k expecting a fully qualified cell.

The wedge is disproved if three OEMs prefer existing stages at lower total cost; if the prototype misses its error, drift, contamination, or uptime budget; if the customer’s real bottleneck is optics, recipe, warpage, chemistry, or software; if qualification consumes 18–36 months before a second customer; or if no buyer will pay NRE and accept a witness test.

That is a good opportunity shape: ambitious enough to matter, narrow enough to test, and honest enough to stop.

## 13 · The first ninety days

# LEARN, THEN ASK FOR THE DRAWING

The follow-up execution is not “buy a cell and start machining.” It is a short learning path that turns a vague precision idea into a paid, falsifiable specification.

**Days 0–30 — learn the language.** I would study preload, restrictor flow, servo following error, thermal expansion, uncertainty, and service economics. Then I would speak with motion-control engineers, metrologists, and tool-service engineers and map 20 packaging/metrology OEMs and integrators. The output is a glossary, a hypothesis tree, a draft error-budget packet, and a shortlist of safe partner labs. If three experts cannot point to a motion metric that could affect yield, throughput, uptime, or lead time, I stop the air-bearing thesis—not the learning.

**Days 31–60 — ask buyers, not the internet.** Run ten technical discovery calls. Ask for an anonymised payload, travel, duty cycle, trajectory, air/vacuum state, incumbent architecture, acceptance test, service burden, and procurement owner. Obtain five comparable incumbent quotes or catalog alternatives. A polite “interesting” is not urgency. I need a measurable problem and a named acceptance owner.

**Days 61–90 — sell the experiment.** Convert the strongest packet into a statement of work: deliverables, customer inputs, safety boundary, test method, acceptance criteria, IP, change control, and payment milestones. Audit a candidate host and line up external accredited metrology. I only build a demonstrator with paid feasibility NRE (a planning placeholder is $25k–$60k, not a market quote) or equivalent customer-funded access.

The first proof is therefore a signed specification and paid test—not a beautiful CAD model.

## 14 · The buyer packet

# FIND THE ERROR BUDGET OWNER

The customer is one equipment team with one process constraint. The discovery packet should force clarity:

| Buyer | Questions | Evidence before proposal |
|---|---|---|
| Tool OEM systems engineer | Which axis, payload, trajectory, and process step are constrained? Which error term fails? | Anonymised ICD, trajectory, payload, air/vacuum state, and acceptance test. |
| Fab/OSAT process owner | Is the excursion motion-related rather than optics, recipe, warpage, chemistry, or software? What correlation matters? | Baseline data, measurand/datum, uncertainty budget, and witness-test owner. |
| Manufacturing/quality | What inspection, calibration, FMEA, traceability, ESD/EMC, particle, and change-control records are mandatory? | Supplier-quality checklist and sample report pack. ISO 9001 is a quality-management framework, not stage qualification ([ISO 9001](https://www.iso.org/standard/9001)). |
| Service/operations | What does air, encoder, pad, or controller failure do to the tool? How fast must a spare arrive? | Failure modes, landing/recovery procedure, spare policy, response-time and uptime target. |
| Procurement/finance | Is the choice about price, lead time, single-source risk, service, or compliance? Who funds NRE? | Incumbent TCO/lead-time comparison, NRE terms, warranty boundary, and design-change owner. |

The packet records travel, speed, acceleration, duty cycle, settling definition, straightness/flatness/pitch/yaw/roll, temperature, vibration, pressure, particle, ESD/EMC, cleanliness, calibration method, uncertainty, controller ownership, uptime, spares, and service. “Nanometer” is not a requirement until the measurand, datum, bandwidth, payload, and test method are named.

## 15 · Demonstrator to qualified module

# MEASURE SAFELY, THEN MAKE THE CLAIM

The first hardware is a guarded, low-energy engineering demonstrator with an inert payload. It can use rented instruments and report repeatability and error trends as engineering data. It does not touch production substrates, run unreviewed high pressure or vacuum, or claim lithography performance.

A qualified module is different: it meets a customer ICD under stated payload and trajectory, uses calibrated instruments with a traceable uncertainty budget, survives the agreed pressure-loss/power-loss behavior, and ships with serialised calibration, FMEA, change control, and service documentation. ISO/IEC 17025 describes competence, impartiality, and consistent operation for testing and calibration laboratories ([ISO/IEC 17025](https://www.iso.org/standard/66912.html)); ILAC says the accreditation scope must cover the specific calibration ([ILAC P10](https://ilac.org/?ddownload=123220)). SAC-SINGLAS and Malaysia’s SAMM are regional routes, but each certificate is scope-specific ([SAC](https://www.sac-accreditation.gov.sg/services/accreditation-services/laboratories/), [Standards Malaysia](https://www.jsm.gov.my/component/content/article/252-skim-akreditasi-makmal-malaysia-samm?Itemid=448&catid=12&highlight=WyJzYW1tIiwiYWNjcmVkaXRlZCIsImxhYm9yYXRvcnkiLCJtYWxheXNpYSJd)).

Thermal and contouring tests should be agreed before design freeze. ISO 230-3 covers environmental temperature variation and thermal distortion of moving axes; ISO 230-4 covers circular and coordinated-axis contouring tests ([ISO 230-3](https://www.iso.org/standard/73291.html), [ISO 230-4](https://www.iso.org/standard/79155.html)). The test setup, uncertainty, and customer witness matter more than a screenshot of a controller.

Safety is a hard boundary. Pressure relief, guarding, interlocks, emergency landing, and power-loss behavior need a documented hazard review. ISO 12100 provides a machinery risk-assessment framework, and ISO 13849-1 addresses safety-related control-system design ([ISO 12100](https://www.iso.org/standard/51528.html), [ISO 13849-1](https://www.iso.org/standard/73481.html)). I would not recommend casual DIY high-energy, high-pressure, vacuum, or high-speed precision machinery.

## 16 · NRE, make/buy, and the service business

# EARN THE RIGHT TO OWN THE CELL

Quote the work in paid stages: discovery/ICD ($5k–$15k planning placeholder), feasibility/design ($25k–$60k), prototype and witnessed test ($80k–$200k), then qualification and sustaining service. Each SOW names customer-furnished data, excluded claims, pressure and energy limits, instrument responsibility, acceptance and retest rules, IP, warranty, and the payment event. A free prototype before an acceptance owner shares the risk is a bad business.

Buy or partner for air pads, restrictors, motors, encoders, precision bases, and calibration while volume and yield are unknown. Consider making a component only when a paid platform repeats across customers, the supplier’s yield or lead time is the bottleneck, the process is measurable in-house, and the utilisation pays for the tooling. Cost-down starts with removing specification ambiguity and rework; only then test rough/finish supplier separation, near-net-shape processes, in-line metrology, or upstream material contracts. Gemini’s cost-down sequence is a useful hypothesis, not evidence of Chinese parity.

The service ledger is part of the product: uptime, mean time to repair, intervention hours, spare-pad/encoder/controller lead time, calibration interval, safe landing recovery, warranty reserve, and return-material analysis. SEMI E10 offers a common RAM/utilisation vocabulary for supplier-user performance and service negotiations ([SEMI E10](https://www.semi.org/en/standards-watch-2021March/e-ramp-standard-updated)); it does not provide a target for this stage.

At every review, compare air against crossed-roller, magnetic, voice-coil, and hybrid alternatives on error budget, stiffness, vacuum/cleanliness, fail-safe behavior, installed cost, lead time, service, and qualification time. If a hybrid wins the customer’s budget, sell the hybrid or stop. The company’s job is to remove process risk, not to defend an air-bearing identity.

The final captive-cell gate is evidence: a paid specification, safe demonstrator, external metrology path, witnessed acceptance test, repeat demand, and a host audit covering floor spectrum, temperature, air, particles, ESD, calibration scope, data control, insurance, and liability. Until then, rent capability.

### Research receipts

- [TSMC 2024 Annual Report](https://investor.tsmc.com/static/annualReports/2024/english/index.html)
- [Intel Foundry packaging](https://www.intel.com/content/www/us/en/foundry/packaging.html)
- [Onto Firefly G5](https://ontoinnovation.com/products/firefly-g5/)
- [ASML EUV systems](https://www.asml.com/en/products/euv-lithography-systems)
- [ASML mechanics and mechatronics](https://www.asml.com/en/technology/lithography-principles/mechanics-and-mechatronics)
- [J-STAGE active-restrictor bearing paper](https://www.jstage.jst.go.jp/article/jjspe1986/56/8/56_8_1431/_article/-char/en)
- [NIST Length Scale Interferometer](https://nvlpubs.nist.gov/nistpubs/jres/104/3/html/j43bee.htm)
- [ISO 14644-1](https://www.iso.org/standard/53394.html)
- [SEMI E78](https://store-us.semi.org/products/e07800-semi-e78-guide-to-assess-and-control-electrostatic-discharge-esd-and-electrostatic-attraction-esa-for-equipment)
- [IEST-RP-CC024](https://www.iest.org/Standards-RPs/Recommended-Practices/IEST-RP-CC024)
- [InvestPenang ATE Campus](https://investpenang.gov.my/penang-ate-campus/)
- [MIDA machinery and metal engineering](https://www.mida.gov.my/industries/manufacturing/machinery-metal/machinery-metal-engineering-support-industry/)
- [PI air-bearing stages](https://www.pi-usa.us/en/products/air-bearings-ultra-high-precision-stages/air-bearing-linear-stages-linear-air-bearings)
- [Aerotech stages](https://www.aerotech.com/products/stages-actuators-products/)
- [Newport SinguLYS S-370](https://www.newport.com/p/SinguLYS-S-370)
- [ALIO air-bearing systems](https://alioindustries.com/air-bearing-systems/)
- [IBS air-bearing application guide](https://www.ibspe.com/hubfs/Documents/Knowledge%20library/04.0%20Components/401%20Air%20Bearing%20Application%20Guide.pdf)
- [ISO/IEC 17025 testing and calibration laboratories](https://www.iso.org/standard/66912.html)
- [ILAC MRA and Signatories](https://ilac.org/ilac-mra-and-signatories/)
- [Singapore Accreditation Council laboratories](https://www.sac-accreditation.gov.sg/services/accreditation-services/laboratories/)
- [Standards Malaysia SAMM](https://www.jsm.gov.my/component/content/article/252-skim-akreditasi-makmal-malaysia-samm?Itemid=448&catid=12&highlight=WyJzYW1tIiwiYWNjcmVkaXRlZCIsImxhYm9yYXRvcnkiLCJtYWxheXNpYSJd)
- [ISO 230-3 thermal effects](https://www.iso.org/standard/73291.html)
- [ISO 230-4 circular tests](https://www.iso.org/standard/79155.html)
- [ISO 12100 machinery risk assessment](https://www.iso.org/standard/51528.html)
- [ISO 13849-1 safety-related control systems](https://www.iso.org/standard/73481.html)
- [SEMI E10 RAM and utilization](https://www.semi.org/en/standards-watch-2021March/e-ramp-standard-updated)
