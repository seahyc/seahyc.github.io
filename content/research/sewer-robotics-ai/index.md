+++
title = "Robots Below the Street"
slug = "robots-below-the-street"
aliases = ["/research/sewer-robotics-ai/", "/learning/sewer-robotics-ai/"]
description = "A founder’s case for owning a sewer-inspection service, its robots and AI: real buyers, incumbent competition, mission economics, and a staged path to proof."
date = 2026-11-02
layout = "research-swipe"
body_class = "research-swipe"
main_class = "main-research-swipe"
+++

# ROBOTS BELOW<br>THE STREET

### A city should discover its failing pipes before the street discovers them.

**A Fieldbook for founders and investors · 2 November 2026 · Revised edition**

<p style="grid-column:1 / -1">I want a city whose underground infrastructure can be inspected and maintained without asking people to enter dangerous spaces or waiting for sewage to appear where it should not. Small robots could carry our eyes, instruments and tools into that hidden world. AI could turn what they find into useful work.</p>

<figure style="grid-column:1 / -1;margin:0"><img src="/images/sewer-robotics-ai/loop.svg" alt="The full loop: access and clean a pipe, capture useful evidence, earn inspection acceptance, then fund an intervention." style="max-width:680px;background:transparent"><figcaption>The company has to make this whole loop work. A camera journey is one component. Original conceptual diagram; no measured outcome implied.</figcaption></figure>

<p style="grid-column:1 / -1"><strong>My starting bet:</strong> build a better sewer-inspection operator. Own the crew, equipment choices, AI workflow and delivery responsibility; sell a completed inspection rather than a robot or software licence. Start with existing equipment and competent operating partners, then develop proprietary robotics around a proven bottleneck. This company model is a hypothesis to test; its economics remain unvalidated.</p>

---

## 01 · An underground world worth improving

### There is a real physical system beneath the pitch

Singapore’s PUB describes a reticulation network of about **3,600 kilometres of public sewers and 100,000 sewer manholes**. It inspects older sewers and rehabilitates defective ones to restore integrity and reduce infiltration and pollution. Those are maintainable assets, not an addressable revenue estimate. [PUB public sewers](https://www.pub.gov.sg/Professionals/Requirements/Used-Water/Sewer-Rehabilitation/Public-Sewers)

The attractive future is straightforward: inspect a pipe, identify a consequential defect, locate it accurately, decide what to do, and return to verify the work. A company could take responsibility for that entire job, using robotics and AI internally to improve its cost and quality.

There are three possible company boundaries: sell tools to contractors, sell processed inspection data, or operate the inspection service itself. I want to evaluate the third seriously. It gives the founder control over field execution and learning, while also making staffing, recovery, working capital and customer acceptance the founder’s problem.

**Founder decision:** should we build a technology-enabled sewer-inspection operator, beginning with one repeatable job type, and fund differentiated robotics from the contribution of completed work?

Singapore is the proposed first learning environment. Expansion would require new customers, local standards and operating competence; it is not a multiple applied to Singapore’s pipe stock.

---

## 02 · The buyer buys a completed job

### Separate the customer from the accepting authority

A builder might pay for an inspection; a Qualified Person, or QP, coordinates the relevant professional work; PUB sets requirements for the public sewer. Selling a service means understanding each role rather than treating “the municipality” as a single buyer.

PUB’s **March 2025 Code**, section 2.2.2, requires pre- and post-construction CCTV for specified activities in public sewer corridors, with explicit exceptions. It requires registered CCTV contractors. That creates a construction-linked customer channel to investigate, not a requirement for every building project. [PUB 2025 Code, section 2.2.2](https://www.pub.gov.sg/-/media/PUB/PDF/Code-of-Practice-on-Sewerage-and-Sanitary-Works-3rd-Edition--Mar-2025.pdf)

My proposed first paying customer is a builder or main contractor with a recurring, eligible inspection need. A registered operating partner could help establish the baseline and deliver early authorised jobs. Owning the service later would require the company’s own appropriate registration, competent staff and operating systems; a partnership does not confer them automatically. [PUB contractor registration](https://www.pub.gov.sg/Professionals/Requirements/Used-Water/Registration-of-CCTV-Contractors)

The offer would be a defined inspection scope, competent report and traceable evidence, with clear terms for access, cleaning, rework and payment. The authority retains its acceptance decision.

The missing evidence is buyer access, repeat volume, price, collection time and the cost of failed jobs. The first interviews need job records and actual purchasing behaviour.

---

## 03 · A pipe is an operating envelope

### Water and recovery shape the machine

<figure><img src="/images/sewer-robotics-ai/physics.svg" alt="Camera above water, sonar below murky water, traction through deposits, and retrieval after power loss are separate engineering functions." style="max-width:680px;background:transparent"><figcaption>Conceptual capability map. Sensor functions differ; this is not a tested robot design or a claim that sonar reveals optical crack detail.</figcaption></figure>

A small dry pipe, a partly full sewer and a deep tunnel are different workplaces. A camera sees exposed surfaces; dirty water can hide the surface entirely. A tether carries power and data but adds drag and can snag. Deposits can defeat traction. A robot that gets in still needs a credible route out after a failure.

RedZone’s commercial SOLO illustrates the importance of the envelope: its published specification lists **200–300 mm pipes and water up to quarter-bore**. It does not establish autonomous coverage of arbitrary sewers. [SOLO product specification](https://redzone.com/our-technology/solo/)

Before selecting motors or models, I would define diameter, bends, flow, deposits, access opening, mission distance, sensing requirements and recovery method. Anything outside that envelope is an excluded mission until tested.

---

## 04 · Autonomy already exists, within limits

### Robots and integrated operators are already here

SOLO offers panoramic inspection and autonomous traversal with obstacle retries and return. RedZone advertises **4,500 feet per day per deployment crew using multiple units**. That is a vendor claim with an unspecified site mix, neither an independent benchmark nor a single-robot rate. [SOLO](https://redzone.com/our-technology/solo/)

RedZone also sells the whole job. Its **ASAP** service sequences initial assessment, asset-location and cleaning work, then revisits and final inspection. This is a direct precedent for the company I am considering: robots, crews, data and coordinated execution. It also means that the full-stack business model is already competitive territory. [ASAP service](https://redzone.com/services/asap-accelerated-system-assessment-program/)

I would measure the day from arrival to accepted output: access preparation, cleaning, launch, capture, recovery, travel, processing and corrections. A different cleaning sequence can change economics, but it must comply with the job’s requirements. PUB’s published guide requires hydraulic cleaning and repeat inspection where the view is unclear; a foreign vendor’s service model cannot override that. [PUB CCTV guide](https://www.pub.gov.sg/-/media/PUB/PDF/Sewer_CCTV_Guidebook_Oct-2023.pdf)

The persuasive comparison includes every attempted job, aborted mission and recovery event. The startup has to improve that denominator.

---

## 05 · What AI can actually contribute

### Detection needs a useful unit of evaluation

The 2021 **Sewer-ML** research dataset contains about 1.3 million labelled images from three utilities over nine years. Its reported benchmark achieved **55.11% class-importance-weighted F2** for defects and **90.94% normal-pipe F1**. These are different metrics, not a single accuracy score; neither describes the current state of commercial systems. [Sewer-ML paper](https://arxiv.org/abs/2103.10895)

The important lesson is methodological. Finding normal frames can look impressive while rare, consequential defects remain difficult. Consecutive frames from one pipe also resemble each other, so a careless train/test split can flatter a model.

My evaluation would hold out entire jobs, camera systems and sites. A competent reviewer would adjudicate critical defects, their location and the completeness of the record. The system would flag uncertainty and retain source footage rather than silently turning a plausible label into a repair instruction.

AI could assist image-quality checks, defect review, evidence retrieval and report drafting. Whether it saves money depends on the human review that remains and the field visits it actually prevents. **The economically relevant score is useful accepted work at a lower full cost.**

---

## 06 · The crowded part of the map

### Compete with tools and with operators

<figure><img src="/images/sewer-robotics-ai/wedge.svg" alt="Three company boundaries: sell software tools, sell processed inspection data, or own the field service. All must beat existing alternatives." style="max-width:680px;background:transparent"><figcaption>Choosing what the company owns changes its control and obligations. It does not create an empty market. Original strategic comparison.</figcaption></figure>

SewerAI and Vapar already sell AI assessment and planning tools. SewerAI’s **QAI** checks headers, assets, distance, camera speed and optical quality. [SewerAI](https://www.sewerai.com/) · [Vapar](https://www.vapar.co/) · [QAI](https://www.sewerai.com/products/qai)

**WinCan** belongs in this comparison too. Its current product offers AI coding, a human-QA option, usage credits and mapped output, and names WRc among supported classification standards. Local classification support cannot simply be assumed to be a gap in incumbent products. [WinCan AI](https://www.wincan.com/product/wincan-ai/)

In the field-service market, Sourcewell’s public RedZone contract covers inspection, cleaning, jetting, reporting, cloud software and AI coding. Buyers can already purchase an integrated offering. [Sourcewell contract 111125-REDZ](https://www.sourcewell-mn.gov/cooperative-purchasing/111125-redz)

My differentiation hypothesis is a better complete operation on a narrow job mix: dependable scheduling, fewer repeat visits, useful evidence and lower full cost. Buying the right software may be part of that advantage. Rebuilding every layer would add cost before proving a reason to exist.

---

## 07 · The first product I would test

### Sell a bounded outcome, improve the machinery inside

The first product would be a completed inspection service for one well-defined task: named assets, a stated operating envelope, agreed capture and cleaning requirements, competent review, and an auditable report package. Scope exclusions and rework responsibility belong in the contract. I would not promise blanket regulatory compliance or automatic authority acceptance.

Inside the operation, AI would check asset and distance records, flag unusable coverage before demobilisation, assist defect review and assemble the evidence package. Humans would retain supervision and competent sign-off while the system earns trust.

The hypothesis is that controlling both field capture and review lets the company fix a bad observation before the crew leaves, instead of sending instructions between separate suppliers. That coordination could be valuable even with bought robots and licensed AI. It must outperform the best incumbent workflow on comparable jobs.

A tenfold improvement is an ambition to define, not a number to claim. Ten times more accepted output, one tenth the full cost and ten times faster turnaround are different propositions. The first trial should identify which constraint is actually changeable; the near-term screening gate remains a more modest, measurable 20% cost improvement.

A possible long-term asset is permissioned knowledge linking operating conditions, capture failures, repairs and accepted results. Equipment ownership alone does not create those data rights.

---

## 08 · The tempting specialised robot

### Sampling is a concrete need with a small disclosed base

PUB’s **closed 2023 sewer-sampling challenge** described an existing crawler that collected vertically falling top-saddle discharge, averaging **24 deployments a year**. It sought a tethered, human-controlled platform able to sample other lateral connections without contamination. The requested envelope included 300–600 mm pipes, up to 400 m horizontal reach and five separate 250 ml samples. These were requirements, not demonstrated new-system performance. [PUB sampling challenge](https://www.pub.gov.sg/Industry/Events-and-Programmes/Global-Innovation-Challenge/Challenges/2023/Sewer-Sampling-Robot)

I like the specificity: collect the right liquid from the right connection, keep it uncontaminated, and bring it back. It is a manipulation and evidence-quality problem with a clear customer purpose.

But 24 historical deployments are poor support for a standalone venture. The page does not establish current unmet demand, an open tender or future volume. Additional uses and buyers would need independent validation.

I would investigate a modular sampling payload on a proven crawler only after finding repeat paid missions. AI could assist positioning or evidence review, while operators retain control of collection. A future platform might handle several tasks, but their revenue cannot be counted before their operating envelopes and buyers are established.

---

## 09 · The number that matters

### Cost per accepted metre, including the bad days

<figure><img src="/images/sewer-robotics-ai/economics.svg" alt="Invented low, base and high cases cost 4.54, 2.10 and 1.36 Singapore dollars per accepted metre; assumed selling price is 2.50." style="max-width:680px;background:transparent"><figcaption>Illustrative service-cell model in SGD, not quotations or prevailing prices. Zero-based cost scale. Includes a replacement allowance and recovery reserve; excludes company-level costs.</figcaption></figure>

Here is a stress test for an eventual company-operated inspection cell, not a justification to buy one. Assume **S$2.50 per accepted metre**, S$1,400 variable cost per paid day, S$20,000 annual fixed cell cost, and S$120,000 equipment depreciated over four years with no residual value.

| Invented case | Paid days/year | Accepted m/day | Cell cost/m | Annual contribution after depreciation |
|---|---:|---:|---:|---:|
| Low | 120 | 400 | S$4.54 | −S$98,000 |
| Base | 180 | 800 | S$2.10 | S$58,000 |
| High | 220 | 1,200 | S$1.36 | S$302,000 |

The spread comes from two assumptions: enough paying days and enough accepted output on those days. **All three input sets are invented.** Equipment quotes, contract prices and observed utilisation must replace them before any investment decision.

---

## 10 · Where the margin disappears

### A service cell must fund the company around it

The daily S$1,400 assumption comprises S$900 crew cost, S$250 vehicle/access/cleaning allocation, S$100 processing and supervision, and S$150 maintenance and recovery reserve. Separately purchased cleaning or traffic management could exceed those allocations.

Annual cell cost is **paid days × S$1,400 + S$20,000 fixed cost + S$30,000 depreciation**. At 180 paid days and S$2.50/m, break-even is about **671 accepted metres/day**. At 800 m/day, break-even price is about **S$2.10/m**. Cut output 20% to 640 m/day with the same daily costs and annual contribution falls from S$58,000 to **−S$14,000**.

That S$58,000 is not yet money available for founder income and robotics development. Add an **invented S$100,000 annual central-management and R&D charge**: one base cell produces **−S$42,000**; two identical base cells produce **S$16,000**, before extra scaling costs, tax and financing. This illustrates a threshold, not a staffing or salary forecast.

Base cash contribution before depreciation is S$88,000, implying a simple 1.36-year equipment payback under steady assumed demand. Company costs and working capital are excluded. Wages and suppliers may need payment before customers settle invoices.

The test for a self-funded company is stronger than positive job margin: **can repeat collections support competent operations, management, replacement reserves and a bounded R&D budget?**

---

## 11 · What the headline omits

### Real awards establish purchasing, not startup margins

The Ministry of Finance’s open procurement dataset records two item awards on **24 February 2026** for PUB’s Phase 6 CCTV survey of big and small diameter sewers, tender **PUB000ETT25000102**:

| Recorded supplier | Item award value |
|---|---:|
| O Liner Technology Pte Ltd | S$2,731,900 |
| Sam Lain Equipment Services Pte Ltd | S$3,988,888 |

[Official MOF procurement dataset](https://data.gov.sg/datasets/d_acde1106003906a75c3fa052592f2fcb/view)

These historical rows establish actual procurement and named competing operators. They do **not** disclose the quantities or duration needed to derive a price per metre, annual revenue, margin or total market. Awarded value is not payment received, and the work is not an open opportunity for a new entrant.

This is stronger evidence of a buying category than a broad infrastructure forecast. The EPA’s US$630.1 billion needs estimate spans multiple clean-water categories over twenty years; it is not a robotics market. [EPA scope](https://www.epa.gov/cwns/clean-watersheds-needs-survey-cwns-2022-report-and-data)

A reachable market still has to be built from named buyers, eligible annual job volume, contracted prices and a realistically won share. Then subtract mobilisation, failures, sales cost and collection risk. Transparent procurement helps us research the market; it does not establish easy entry.

---

## 12 · A path of attack

### Earn each increase in ownership

<figure><img src="/images/sewer-robotics-ai/roadmap.svg" alt="Proposed sequence: baseline and buyer access, sell a narrow authorised service, fund one physical improvement, then replicate only after repeat contribution." style="max-width:680px;background:transparent"><figcaption>Proposed 12–24 month sequence. Owning the operation is a deliberate company choice; proprietary hardware is earned through repeated paid needs.</figcaption></figure>

**Months 0–3:** observe complete jobs with registered operators. Interview builders, main contractors and QPs; obtain permissioned failure logs, equipment quotes and buying/payment terms. Compare manual, incumbent and proposed workflows.

**Months 3–6:** deliver one narrow, authorised service using existing equipment and competent staff. Choose the appropriate operating structure and registrations. Seek repeat signed scopes at a price that covers review, support and management time. Count cash collected, not just invoices issued.

**Months 6–12:** use measured contribution to justify one repeated physical improvement. Lease or buy locomotion where practical; prototype a sensor or payload around an observed bottleneck. Require safe retrieval and evidence quality across the stated envelope.

**Months 12–24:** replicate with a second buyer cohort or jurisdiction. Recheck standards, operating competence, working capital and demand density. Scale a fleet only after the complete operation repeats profitably. A business that cannot fund replacement and its next learning cycle has not yet proved this model.

---

## 13 · The field experiment that could kill it

### Compare against the best available alternative

I would pre-register an economic screening gate: across **30 matched paid crew-days**, reduce full cost per accepted metre by **at least 20%** against the best available manual or incumbent workflow, with no observed increase in critical misses or acceptance failures. The 20% hurdle is my proposed margin of improvement, not an industry standard.

Match or stratify jobs by diameter, material, water, camera, accessibility and task. Count failed attempts and revisits. Measure interventions per mission, recovery time, supervision hours, uptime, acceptance rate and the time until submission acceptance. Do not silently remove difficult sites.

An independent reviewer should examine critical defects and disagreements, with the source record preserved. Thirty crew-days can reject a weak economic thesis; they cannot prove rare-event safety, universal defect recall or autonomous reliability. Larger blinded validation and customer-specific acceptance would still be necessary.

**Stop or change direction** if the incumbent performs equally well at lower full cost, the savings come only from easier job selection, the customer cannot pay, or the contractor has no legal right to supply the needed footage.

The key result is a cheaper complete job on the same task mix. A faster model is supporting evidence.

---

## 14 · Why the company might still fail

### Owning the service transfers obligations too

Full-stack ownership can remove the need to persuade an incumbent contractor to change its workflow: the founder can change the company’s own operation. It still requires persuading a customer to trust a new supplier. Registration, safety, procurement, contractual acceptance and payment collection remain.

A model cannot open an inaccessible manhole or create a traffic permit. If access and cleaning dominate cost, better coding may produce little additional output. If a buyer pays for a fixed programme, faster execution may compress prices rather than expand margins.

The incumbent can respond with a similar tool, a better purchasing channel or a bundled service. Permissioned outcome data, route density and dependable crews might reinforce an advantage; none follows automatically from buying robots. The company receives service revenue and also assumes downtime, recovery and contractual downside.

US OSHA guidance describes unpredictable sewer atmospheres and surge conditions. It establishes the physical hazard, not Singapore legal requirements. Local safety assessment, access approval and equipment suitability remain prerequisites. [OSHA, US context](https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.146AppE)

The strongest bear case is an ordinary inspection contractor with extra R&D costs. A profitable service can still be worthwhile, but exceptional technology returns require evidence of a compounding operating advantage.

---

## 15 · The larger prize

### From seeing defects to completing physical work

<figure><img src="/images/sewer-robotics-ai/decision.svg" alt="Three gates: establish a repeated paid problem, compare existing offerings, then prove the whole service improves enough to fund continued operation." style="max-width:680px;background:transparent"><figcaption>The expansion rule: prove demand, test substitution, then measure the complete intervention. Original decision framework.</figcaption></figure>

A successful operator could add adjacent sewer tasks: place a sensor, collect a sample, clear a specific obstruction, then verify the result. Existing customer access and field knowledge might help, but each new mission needs its own demand, hardware envelope and liability assessment.

The European **PIPEON** project is pursuing integrated robotics, manipulation, sensing and AI. Its 26 October 2026 brief labels tenfold inspection/cost improvements and 30% spill reduction as **targets awaiting staged validation**, not achieved commercial outcomes. [PIPEON brief](https://pipeon.eu/first-policy-brief-released-on-sewer-robotics-and-pollution-prevention/)

The attraction is the connection between perception and action. Detection alone does not prevent a spill; somebody must fund and complete the right intervention, then verify the network outcome.

Roads, bridges and railways are separate opportunities. This research has not established that sewer robots, standards, permissions or customer relationships transfer to them cheaply. I would earn expansion one mission at a time.

---

## 16 · Evidence notes and disagreements

### What is verified, and what remains a thesis

This revised edition uses public primary evidence accessed on **2 November 2026**. Earlier exploratory research supplied ideas to test; every material factual addition was checked separately.

| Evidence | What it establishes | What remains open |
|---|---|---|
| [PUB 2025 Code](https://www.pub.gov.sg/-/media/PUB/PDF/Code-of-Practice-on-Sewerage-and-Sanitary-Works-3rd-Edition--Mar-2025.pdf) · [registration](https://www.pub.gov.sg/Professionals/Requirements/Used-Water/Registration-of-CCTV-Contractors) | Specified construction-linked work, exceptions and operator requirements | Current job scope, buyer access and costs |
| [MOF open award data](https://data.gov.sg/datasets/d_acde1106003906a75c3fa052592f2fcb/view) | Historical named procurement and suppliers | Quantities, term, payments and margin |
| [RedZone ASAP](https://redzone.com/services/asap-accelerated-system-assessment-program/) · [Sourcewell](https://www.sourcewell-mn.gov/cooperative-purchasing/111125-redz) | Integrated service and procurement precedent | Startup differentiation and economics |
| [QAI](https://www.sewerai.com/products/qai) · [Vapar](https://www.vapar.co/) · [WinCan](https://www.wincan.com/product/wincan-ai/) | Existing software alternatives | Matched local comparison and full cost |
| [Sewer-ML](https://arxiv.org/abs/2103.10895) | A research benchmark | Current local deployment reliability |
| [PUB sampling](https://www.pub.gov.sg/Industry/Events-and-Programmes/Global-Innovation-Challenge/Challenges/2023/Sewer-Sampling-Robot) · [PIPEON](https://pipeon.eu/first-policy-brief-released-on-sewer-robotics-and-pollution-prevention/) | Historical need and explicit research targets | Repeat paid volume and validated outcomes |

**Disagreement log:** service ownership does not prove easier procurement or software-like margins. Vendor accuracy cannot be compared with research F2 without a common task and human-review definition. A closed challenge is not an order book; an award is not collected revenue; a cost-reduction target is not a result.

Customer interviews, field trials, current equipment quotes, licensed manuals and proprietary performance data remain unavailable. No paid research was used.

---

## 17 · The founder’s next ninety days

### Build the operation that makes the machine necessary

My recommendation is a bounded test of an **owned inspection-service business**. Start with one repeatable customer problem, existing equipment and competent operators. Compare bought tools before building them. The first robotics investment should follow a repeated physical failure that customers already pay to resolve.

The founder owns ten structured buyer/operator interviews, permissioned baseline collection with two registered contractors, equipment and insurance quotes, signed pilot scopes and payment terms. The contractor owns authorised early site operations; an independent competent reviewer adjudicates output. The 30-paid-crew-day comparison screens the economics. None of those external actions has been performed by this report.

**Model appendix:** annual contribution after depreciation = paid days × (accepted metres/day × price − daily variable cost) − annual fixed cell cost − equipment cost/useful life. Company contribution then subtracts management, R&D and other central costs. Receivables, deposits and payment timing require a separate cash model.

**Sensitivity:** at the base inputs, reducing either price or accepted output by 20% makes annual cell contribution **−S$14,000**. Two base cells produce only **S$16,000** after the illustrative S$100,000 central charge, before additional scaling costs. Repeat demand and pricing could overturn the thesis quickly.

I remain optimistic about machines that make buried infrastructure easier to maintain. The ambition is an exceptional operator whose technology improves with every completed job. **Sell a useful outcome, prove the full economics, then build the robot the evidence calls for.**
