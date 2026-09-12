+++
title = "Leak-Proof AI Cold Plates"
slug = "leak-proof-ai-cold-plates"
aliases = ["/research/leakproof-ai-cold-plates/", "/learning/leakproof-ai-cold-plates/"]
description = "A founder's fieldbook on the quiet hardware that keeps dense AI servers alive—and the qualification wedge before a factory."
date = 2026-09-12
layout = "research-swipe"
body_class = "research-swipe"
main_class = "main-research-swipe"

[fieldbook]
theme = "liquid-cooling"

[fieldbook.illustrations.cover]
src = "/images/liquid-cooling-cold-plate-cover.png"
alt = "A hand-drawn copper cold plate carrying heat from an AI processor into a monitored liquid loop"
+++

# LEAK-PROOF AI COLD PLATES

### The small machine that keeps a giant machine alive

### A founder's fieldbook on direct-to-chip cooling, qualification, and the hardware wedge before the factory

**Research edition · 12 September 2026**<br>
A first-person opportunity narrative, checked against public engineering, company, standards, and filing evidence.

> **Working thesis** I would not build a generic cold-plate factory. I would build the qualification layer for one or two real accelerator platforms, have the customer fund the work, and let a contract manufacturer make the metal while I own the evidence that makes it safe to install.

> **Evidence boundary** AI cooling demand is real. The precise market size, 2026 adoption rate, supplier backlog, and procurement rules are not public enough to treat as facts. This is a plan for finding out.

---

## 01 · The heat problem we can feel

# THE RACK IS A ROOM-SIZED HEATER

An AI server is not just a computer in a box. It is a dense electrical machine whose useful work arrives as heat. A rack that is easy to imagine as a row of servers can instead behave like a serious industrial load, with heat arriving at the same place where processors need to stay stable.

ASHRAE's AI data-centre framework says air-cooling limits once thought to be around **25–35 kW per rack** may extend to roughly **40 kW with better design**. It also describes direct-to-chip liquid cooling as the mature path for high-density deployments. Those are design guides, not a universal physical ceiling. [ASHRAE integrated design principles](https://www.ashrae.org/technical-resources/ai-data-center-framework/integrated-design-principles)

The human-scale version is simple: a cooling failure can turn a valuable rack into an expensive service incident. The founder's product is therefore not “a clever block of copper.” It is confidence that a particular platform can run, be serviced, and keep running.

---

## 02 · The water path

# A COLD PLATE IS A CONTROLLED THERMAL LOOP

The cold plate sits on the heat-generating package, separated by a defined thermal interface material and a controlled mounting force. Inside it, channels or fins expose surface area to coolant. Supply and return ports connect to hoses, quick disconnects, a rack manifold, and a coolant distribution unit.

The coolant does not usually go straight into the building's water pipes. The technology cooling system circulates through the rack; a facility water system and CDU move heat onward. The [Open Compute Project cold-plate requirements](https://www.opencompute.org/documents/ocp-acs-liquid-cooling-cold-plate-requirements-pdf) separates those boundaries and names the variables a buyer must measure: heat transfer, flow, pressure, pressure drop, temperatures, active area, filtration, leakage, and material compatibility.

“Micro-fluidic” is not a magic word. Smaller channels can increase area, but they also increase filtering, contamination, pressure-drop, and manufacturing risk. I want the smallest geometry that meets the system requirement—not the smallest geometry that looks impressive in a rendering.

---

## 03 · Why now

# THE COMPUTE PLATFORM IS MAKING THE QUESTION URGENT

NVIDIA's public Vera Rubin NVL72 page describes a rack-scale system with **72 Rubin GPUs**, HBM4, and a **45°C inlet** specification for its stated 100 MW factory configuration. Its public page does not state a 2,300 W GPU TDP. [NVIDIA Vera Rubin NVL72](https://www.nvidia.com/en-au/data-center/vera-rubin-nvl72/)

That is enough to establish a direction: liquid cooling is being designed into the newest dense systems. It is not enough to turn every platform into one sizing number. The mating envelope, heat load, transient behaviour, coolant, allowable pressure drop, and service rules still belong to the actual customer design.

TrendForce's public release forecasts liquid-cooling penetration in AI data centres at **14% in 2024 and 33% in 2025**. It does not establish the supplied **53% in 2026**. A BYD Electronic filing repeats the 33% 2025 figure and contains no 2026 penetration forecast. [TrendForce](https://www.trendforce.com/presscenter/news/20250821-12682.html) · [BYD Electronic HKEX filing](https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0327/2026032702072.pdf)

The timing is real; the precision is not.

---

## 04 · The corrected market reality

# BIG DEMAND DOES NOT MEAN A BIG, OPEN MARKET

The supplied narrative makes six claims that I would not put in an investment memo as facts:

- **2,300 W** for a Vera Rubin GPU is unverified in the public NVIDIA material reviewed.
- **225 kW** for a Vera rack is not supported by the reviewed primary material; the platform definition and load term matter.
- **53% liquid-cooling penetration in 2026** is not publicly established. The inspected public evidence stops at the 33% 2025 forecast.
- **Severe Taiwanese supplier backlog** is plausible but not demonstrated by the public evidence reviewed.
- A **blanket Western or hyperscaler ban on Chinese cooling hardware** is overbroad. Contract-specific government restrictions do not prove a universal commercial policy.
- **$30k–$80k** is not a complete qualified-business budget. It might fund an outsourced prototype; it does not buy the full test, traceability, clean assembly, working capital, and liability envelope.

I therefore size the opportunity from named platforms, signed design inputs, current lead times, pilot quantities, and prices—not from a single market-report number. Until those arrive, the market is a hypothesis with a healthy physical signal and an unproven capture plan.

---

## 05 · The manufacturing bottleneck

# THE LEAK IS HIDING INSIDE THE PART

The drawing is easy. The repeatable part is hard.

One route machines channels and joins a cover. Another uses controlled-atmosphere brazing. Friction-stir welding can join aluminium without melting it. Skived fins can raise surface area, but they do not solve the sealed liquid path. These are process options, not proof that a job shop can make a reliable product.

The minimum evidence stack is less glamorous than the CAD: alloy and temper traceability; mounting-face flatness and port dimensions; locked joining parameters; destructive cross-sections; 100% pressure/leak testing; 100% flow and pressure-drop testing; calibrated thermal testing; cleanliness and particle checks; coolant compatibility; pressure and thermal cycling; FMEA; gauge repeatability; calibration; and controlled engineering changes.

Boyd's public technical material describes CAB brazing, friction-stir welding, and other cold-plate manufacturing methods. Its release claims **five million** delivered plates and 100% inline thermal/flow and leak testing. That is a company claim, but it shows the bar I would be competing against. [Boyd metal fabrication](https://www.boydcorp.com/about-boyd/boyd-capabilities/manufacturing-capabilities/metal-fabrication.html) · [Boyd five-millionth cold plate](https://www.boydcorp.com/about-boyd/resources/news-and-events/boyd-delivered-5-millionth-liquid-cold-plate-for-ai-cooling.html)

I would never promise “zero leak.” I would specify the leak rate, pressure, duration, detection limit, sample plan, and warranty boundary.

---

## 06 · Qualification is the product

# THE PLATE HAS TO SURVIVE THE WHOLE RACK

Direct-to-chip cooling does not remove every watt from a rack. Vertiv's guide says DTC systems can remove about **70–75%** of equipment heat, leaving **25–30%** for air cooling. Power supplies, memory, storage, networking, hoses, quick disconnects, manifolds, CDUs, sensors, and service access still belong to the system. [Vertiv liquid-cooling deployment guide](https://www.vertiv.com/4926c8/globalassets/documents/white-papers/liquid-cooling/deploying-liquid-cooling-in-the-data-center-a-guide-to-high-density-cooling-white-paper.pdf)

That changes the sale. A plate with excellent thermal resistance can still fail because it has the wrong mounting load, a dirty channel, incompatible seals, a bad quick disconnect, too much pressure drop, or no safe response when a sensor detects a leak. OCP's requirements make leakage intervention and component-level measurements explicit. [OCP ACS cold-plate requirements](https://www.opencompute.org/documents/ocp-acs-liquid-cooling-cold-plate-requirements-pdf)

The buyer should provide the actual accelerator package, heat envelope, TIM, flow, pressure, coolant, life requirement, rack interface, service procedure, and acceptance test. Without those, “we need liquid cooling” is interest—not demand.

---

## 07 · The wedge

# SELL THE EVIDENCE BEFORE THE COPPER

My first customer would be a Tier-2 server OEM, rack integrator, colocation operator, or AI infrastructure builder with a real platform slot and no mature cold-plate development team.

I would offer one narrow package: platform-specific design-for-manufacture, a controlled bill of materials, qualified contract manufacturing, serialised leak/flow/thermal records, material and coolant compatibility, service instructions, and a pilot lot. The customer pays **$75k–$250k of NRE per platform** across design, qualification, and pilot gates. These are operating assumptions to replace with quotes—not market prices.

The geography can be Southeast Asian manufacturing, but country is not assurance. I need audited process capability, a country-of-origin map, export-control review, and a second-source plan. The provenance message is “buyer-requested, auditable non-PRC manufacturing and component provenance” where a buyer actually requires it.

U.S. defense acquisition rules can restrict prohibited sources in a contract. They do not establish a blanket commercial hyperscaler ban on passive cooling parts. [DFARS prohibited sources](https://www.acquisition.gov/dfars/subpart-225.7-prohibited-sources)

---

## 08 · The first business is qualification

# ECONOMICS BEFORE THE FACTORY

These are illustrative decision scenarios for one platform-specific plate, outsourced machining/joining, 100% testing, freight, and a warranty reserve. They are not a market-price forecast and exclude founder salary and corporate tax.

| Case | Annual units | ASP / unit | Variable cost / unit | Fixed validation and operations | Annual contribution before NRE |
|---|---:|---:|---:|---:|---:|
| Low · small pilot | 100 | $650 | $520 | $120k | **-$107k** |
| Base · repeat pilot | 1,000 | $575 | $325 | $180k | **$70k** |
| High · qualified niche | 5,000 | $475 | $220 | $350k | **$925k** |

The equation is `units × (ASP − variable cost) − fixed validation/operations`. At low volume, I am running a qualification and evidence business. At the base case, a self-funded $150k programme takes roughly 2.1 years to recover before financing and founder compensation; paid NRE changes the risk materially.

The lean validation-first route is more plausibly **$135k–$390k** once test equipment, supplier audits, clean assembly access, scrap, working capital, and warranty reserve are counted. A **$500k** automation cell might be possible after repeat orders; it is not a safe all-in number for validated AI production.

---

## 09 · The incumbents have the hard years

# THIS IS NOT A COMMODITY COPPER MARKET

CoolIT offers cold plates, loops, manifolds, and CDUs, and publicly advertises a validated **15 kW** cold plate. Boyd claims five million delivered plates and inline testing. Delta markets liquid-to-air and liquid-to-liquid CDUs and cold-plate loops. Asetek's D2C ingredient cooler integrates a pump and cold plate, reducing connections. Vertiv sells system-level cooling, monitoring, and deployment services.

These are company claims and product positions, not a complete market-share census. They still tell me what not to do: do not begin by competing on volume, generic thermal performance, or a broad “we can machine copper” promise.

The opening is narrower. An integrator may need a second source for one platform, faster engineering iteration, an evidence pack it can hand to its platform customer, or a local service and provenance path. If none of those pains are real, the incumbent wins before my first purchase order. [CoolIT cold plates](https://www.coolitsystems.com/coldplates-2/) · [CoolIT server products](https://www.coolitsystems.com/products-services/server-products/) · [Delta data-centre cooling](https://www.deltaww.com/en-US/products/data-center-cooling) · [Asetek D2C ingredient coolers](https://www.asetek.com/company/about-asetek/asetek-heritage-technology/data-center/technology-for-data-centers/d2c-ingredient-coolers/)

---

## 10 · The path of attack

# FOUR GATES, TWO YEARS, MANY WAYS TO STOP

**Months 0–3 · prove the buyer.** Select one platform. Obtain a signed design-input sheet and paid feasibility NRE. Audit three manufacturers. **Stop** if there is only generic interest, no platform data, or no paid feasibility.

**Months 3–6 · prove the process.** Make 10–20 prototypes. Measure thermal resistance, flow, pressure drop, flatness, and repeatability. Lock the joining process and establish 100% leak and flow records. **Stop** if leaks remain unexplained or the partner cannot control the required process.

**Months 6–12 · prove qualification.** Run a 30–50-piece lot with destructive samples and environmental/pressure-cycle tests. Deliver the serialised data pack. Seek a paid 100–500-unit pilot with explicit warranty boundaries. **Stop** if the buyer wants system liability without NRE, test access, or a realistic price.

**Months 12–24 · prove repeatability.** Add a second source and only then consider a captive clean assembly/test cell. Expand to adjacent platforms only when the interface is genuinely reusable. **Stop** below 500 units with high engineering churn or incumbent price and lead-time parity.

The company earns the right to scale by meeting evidence gates, not by buying machines early.

---

## 11 · What the headline omits

# THE PLATE CAN WORK AND THE SYSTEM CAN STILL FAIL

The true bottleneck may be the entire cooling loop: quick disconnects, manifolds, CDU redundancy, facility water, leak detection, commissioning, service labour, contamination, and field replacement. Direct-to-chip leaves residual air responsibility, so a plate startup does not own the whole rack's thermal outcome unless its contract says so.

The bear case is serious:

- The platform owner bundles the plate and leaves no second-source slot.
- A two-phase, immersion, rear-door, or revised cold-plate architecture makes my tooling obsolete.
- CoolIT, Boyd, Delta, or a system integrator cuts price or lead time before I qualify.
- One leak creates customer downtime and an unbounded liability problem.
- Contract-manufacturer quality drifts across lots or after an engineering change.
- The non-PRC provenance premise turns out not to matter to the buyer.
- AI capital spending slows before the pilot becomes a repeat order.

My mitigations are equally concrete: platform-specific contracts, reversible tooling, independent insurance counsel, serialised records, dual sourcing, paid NRE, and adjacent HPC or power-electronics applications only after the first platform is profitable.

---

## 12 · The founder decision

# WOULD I BUILD IT?

Yes—but only as a qualification-led company, not as a speculative factory.

I would start when one named integrator supplies a real thermal test vehicle, signs the design inputs, funds feasibility NRE, and agrees to staged acceptance. I would outsource non-critical machining first while keeping configuration control, test fixtures, data, and customer evidence in-house.

I would walk away if customers ask for free prototypes; if no buyer reports a meaningful second-source or qualification-delay problem; if a 30–50-piece lot cannot achieve repeatable leak, flow, and thermal results; if contribution stays negative at 1,000 units; or if the customer will not accept clear system-liability boundaries.

The opportunity is not proven by a market-size headline. It is proven when a real rack runs safely, a buyer signs the release, and the next lot repeats the result.

### Research receipts

- [NVIDIA Vera Rubin NVL72](https://www.nvidia.com/en-au/data-center/vera-rubin-nvl72/) — 72 GPUs, HBM4, 45°C inlet for the stated 100 MW factory configuration; no public 2,300 W GPU TDP on the reviewed page.
- [NVIDIA Vera Rubin platform announcement](https://nvidianews.nvidia.com/news/nvidia-vera-rubin-platform) — rack-scale platform context and liquid-cooled infrastructure.
- [ASHRAE integrated design principles](https://www.ashrae.org/technical-resources/ai-data-center-framework/integrated-design-principles) — air-cooling transition range and DTC guidance.
- [ASHRAE introduction and purpose](https://www.ashrae.org/technical-resources/ai-data-center-framework/introduction-and-purpose) — liquid-temperature class vocabulary.
- [Schneider Electric reference design](https://download.schneider-electric.com/files?p_Doc_Ref=RD99DSR0_EN&p_enDocType=EDMS) — a 40 kW air-cooled reference scenario, not an industry-wide maximum.
- [OCP ACS liquid-cooling cold-plate requirements](https://www.opencompute.org/documents/ocp-acs-liquid-cooling-cold-plate-requirements-pdf) — metrics, pressure/leakage, filtration, compatibility, and hybrid-cooling boundaries.
- [Vertiv liquid-cooling deployment guide](https://www.vertiv.com/4926c8/globalassets/documents/white-papers/liquid-cooling/deploying-liquid-cooling-in-the-data-center-a-guide-to-high-density-cooling-white-paper.pdf) — DTC heat-removal guidance and system integration.
- [Boyd five-millionth cold plate release](https://www.boydcorp.com/about-boyd/resources/news-and-events/boyd-delivered-5-millionth-liquid-cold-plate-for-ai-cooling.html) — company-reported scale and testing claims.
- [Boyd metal fabrication](https://www.boydcorp.com/about-boyd/boyd-capabilities/manufacturing-capabilities/metal-fabrication.html) — CAB, FSW, skived-fin, and fabrication options.
- [CoolIT cold plates](https://www.coolitsystems.com/coldplates-2/) — incumbent product and validation benchmark.
- [TrendForce public penetration release](https://www.trendforce.com/presscenter/news/20250821-12682.html) — public 14% 2024 / 33% 2025 estimate; no 53% 2026 figure.
- [BYD Electronic HKEX filing](https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0327/2026032702072.pdf) — repeats the 33% 2025 figure and contains no 2026 penetration forecast.
- [DFARS prohibited sources](https://www.acquisition.gov/dfars/subpart-225.7-prohibited-sources) — narrow government/defense provenance context, not a blanket commercial ban.
