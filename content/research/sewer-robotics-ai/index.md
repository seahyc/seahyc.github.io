+++
title = "Robots Below the Street"
slug = "robots-below-the-street"
aliases = ["/research/sewer-robotics-ai/", "/learning/sewer-robotics-ai/"]
description = "Where sewage-pipe robotics and AI could build a valuable company: the physical constraints, crowded inspection market, mission economics, and a concrete path to proof."
date = 2026-11-02
layout = "research-swipe"
body_class = "research-swipe"
main_class = "main-research-swipe"
+++

# ROBOTS BELOW<br>THE STREET

### A city should discover its failing pipes before the street discovers them.

**A Fieldbook for founders and investors · 2 November 2026**

<p style="grid-column:1 / -1">I want a city whose underground infrastructure can be inspected and maintained without asking people to enter dangerous spaces or waiting for sewage to appear where it should not. Small robots could carry our eyes, instruments and tools into that hidden world. AI could turn what they find into useful work.</p>

<figure style="grid-column:1 / -1;margin:0"><img src="/images/sewer-robotics-ai/loop.svg" alt="The full loop: access and clean a pipe, capture useful evidence, earn inspection acceptance, then fund an intervention." style="max-width:680px;background:transparent"><figcaption>The company has to make this whole loop work. A camera journey is one component. Original conceptual diagram; no measured outcome implied.</figcaption></figure>

<p style="grid-column:1 / -1"><strong>My starting bet:</strong> help existing sewer-inspection contractors deliver more accepted work per crew-day. Prove the missing capability on their equipment, then build specialised robotics where the field data justify it. This is a proposal for a bounded experiment; customer demand and margins remain unvalidated.</p>

---

## 01 · An underground world worth improving

### There is a real physical system beneath the pitch

Singapore’s PUB describes a reticulation network of about **3,600 kilometres of public sewers and 100,000 sewer manholes**. It inspects older sewers and rehabilitates defective ones to restore integrity and reduce infiltration and pollution. Those are maintainable assets, not an addressable revenue estimate. [PUB public sewers](https://www.pub.gov.sg/Professionals/Requirements/Used-Water/Sewer-Rehabilitation/Public-Sewers)

The attractive future is straightforward: inspect a pipe, identify a consequential defect, locate it accurately, decide what to do, and return to verify the work. The difficult transition is from a recorded observation to an intervention that somebody accepts and pays for.

I would start in Singapore because the buyer requirements and contractor channel can be studied closely. That is a research choice, not evidence that Singapore is an easy sales market. A small home market would eventually require repeatable expansion into other jurisdictions, each with its own standards and buying process.

**Founder decision:** should we build a robotics-enabled inspection business for contractors, beginning with the journey from field capture to an accepted report?

---

## 02 · The buyer buys a completed job

### Useful footage has obligations attached

PUB’s current contractor-registration page says that reports from unregistered CCTV contractors will be rejected. Its published October 2023 guide requires competent contractor staff to prepare reports, specifies defect classification, and requires permission before public-sewer work. The exact current tender and latest applicable requirements must be checked before designing a product around them. [PUB registration](https://www.pub.gov.sg/Professionals/Requirements/Used-Water/Registration-of-CCTV-Contractors) · [Published CCTV guide, printed pp. 6–8](https://www.pub.gov.sg/-/media/PUB/PDF/Sewer_CCTV_Guidebook_Oct-2023.pdf)

That suggests three distinct customers in one job. The contractor’s operations lead cares about crew time and repeat visits. The competent reviewer cares about defensible evidence. The asset owner or project authority decides whether the deliverable meets the contract.

My proposed first buyer is the contractor’s operations lead. The offer would be concrete: catch a missing observation while the crew is still there, connect footage to the correct asset and distance, and reduce avoidable report rework.

The missing evidence is equally concrete. I have not obtained rejected-job logs, review costs, paid contract rates or willingness to pay. A rule that permits rejection does not tell us how often rejection happens. **The first customer conversation must produce a baseline, not merely enthusiasm.**

---

## 03 · A pipe is an operating envelope

### Water and recovery shape the machine

<figure><img src="/images/sewer-robotics-ai/physics.svg" alt="Camera above water, sonar below murky water, traction through deposits, and retrieval after power loss are separate engineering functions." style="max-width:680px;background:transparent"><figcaption>Conceptual capability map. Sensor functions differ; this is not a tested robot design or a claim that sonar reveals optical crack detail.</figcaption></figure>

A small dry pipe, a partly full sewer and a deep tunnel are different workplaces. A camera sees exposed surfaces; dirty water can hide the surface entirely. A tether carries power and data but adds drag and can snag. Deposits can defeat traction. A robot that gets in still needs a credible route out after a failure.

RedZone’s commercial SOLO illustrates the importance of the envelope: its published specification lists **200–300 mm pipes and water up to quarter-bore**. It does not establish autonomous coverage of arbitrary sewers. [SOLO product specification](https://redzone.com/our-technology/solo/)

Before selecting motors or models, I would define diameter, bends, flow, deposits, access opening, mission distance, sensing requirements and recovery method. Anything outside that envelope is an excluded mission until tested.

---

## 04 · Autonomy already exists, within limits

### The robot is not the discovery

SOLO already offers panoramic inspection and autonomous traversal with obstacle retries and return. RedZone advertises **4,500 feet per day per deployment crew using multiple units**. That is a vendor claim about a crew, with an unspecified site mix; it is neither independent productivity evidence nor a single-robot rate. [RedZone](https://redzone.com/our-technology/solo/)

That precedent changes the startup question. A new entrant needs to show which mission existing equipment cannot complete economically, or which part of the surrounding workflow it can improve materially.

I would measure the day from arrival to accepted output: access preparation, cleaning, launch, capture, recovery, travel, processing and corrections. Saving ten minutes of traversal has little value if a buried cover or repeat cleaning consumes the afternoon. This is an engineering hypothesis to test with time records, not a measured claim about typical crews.

The most persuasive robot demo would therefore come with a denominator: all attempted jobs, including aborted missions and recovery events, divided by paid crew time. A montage of successful pipe journeys leaves out the costs that determine the business.

---

## 05 · What AI can actually contribute

### Detection needs a useful unit of evaluation

The 2021 **Sewer-ML** research dataset contains about 1.3 million labelled images from three utilities over nine years. Its reported benchmark achieved **55.11% class-importance-weighted F2** for defects and **90.94% normal-pipe F1**. These are different metrics, not a single accuracy score; neither describes the current state of commercial systems. [Sewer-ML paper](https://arxiv.org/abs/2103.10895)

The important lesson is methodological. Finding normal frames can look impressive while rare, consequential defects remain difficult. Consecutive frames from one pipe also resemble each other, so a careless train/test split can flatter a model.

My evaluation would hold out entire jobs, camera systems and sites. A competent reviewer would adjudicate critical defects, their location and the completeness of the record. The system would flag uncertainty and retain source footage rather than silently turning a plausible label into a repair instruction.

AI could assist image-quality checks, defect review, evidence retrieval and report drafting. Whether it saves money depends on the human review that remains and the field visits it actually prevents. **The economically relevant score is useful accepted work at a lower full cost.**

---

## 06 · The crowded part of the map

### Quality assurance is already a product

<figure><img src="/images/sewer-robotics-ai/wedge.svg" alt="Generic coding and inspection QA already have incumbents; local workflow integration and custom payloads are conditional hypotheses." style="max-width:680px;background:transparent"><figcaption>Competitive screening, not market-share analysis. Existing offerings constrain the wedge; no incumbent capability gap in Singapore has yet been demonstrated.</figcaption></figure>

SewerAI markets coding, risk and rehabilitation workflows; Vapar markets AI CCTV assessment and asset-renewal planning. A startup offering “AI that finds sewer defects” enters an established category. [SewerAI](https://www.sewerai.com/) · [Vapar](https://www.vapar.co/)

More awkwardly for my initial thesis, SewerAI’s **QAI** already checks inspection headers, asset matching, distance counters, camera speed and optical quality. Quality assurance itself is not an unoccupied niche. [QAI capabilities](https://www.sewerai.com/products/qai)

A possible advantage would have to come from a specific local integration or field intervention that these products do not deliver economically for the first customer. I would try to buy or partner for existing capabilities before rebuilding them. If an incumbent solves the customer’s problem at lower total cost, that is a successful research result and a reason to change the company thesis.

---

## 07 · The first product I would test

### Make the next visit unnecessary

The prototype would run alongside a registered contractor’s existing capture workflow. It would check that the intended asset and distance are recorded, identify unusable or missing coverage for review before demobilisation, and assemble an auditable report package. Competent staff would retain the final judgment and submission responsibility.

That is a **proposed workflow**, not a claim of PUB approval or autonomous compliance. The published guide also describes an existing portal that validates submissions; the startup would need to improve what happens before a failed capture becomes an expensive return visit. [PUB guide](https://www.pub.gov.sg/-/media/PUB/PDF/Sewer_CCTV_Guidebook_Oct-2023.pdf)

I would start with two contractors, one repeated job type and their current equipment. Compare three alternatives: manual practice, a suitably configured incumbent, and the prototype. Include configuration, training, upload, review and support time in each comparison.

A defensible asset might emerge from permissioned records linking field conditions to capture failures, corrections and accepted outcomes. Data rights and customer trust must be obtained explicitly. An exclusive dataset cannot simply be assumed because the startup processes somebody else’s footage.

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

### A service cell is not the whole company

The daily S$1,400 assumption comprises S$900 crew cost, S$250 for vehicle/access/cleaning allocation, S$100 processing and supervision, and S$150 maintenance and recovery reserve. These allocations might be badly wrong for a given site; separately purchased cleaning or traffic management could exceed them.

Annual cell cost is:

**paid days × S$1,400 + S$20,000 fixed cost + S$30,000 depreciation.**

At 180 paid days and S$2.50/m, break-even is about **671 accepted metres per paid day**. At 800 m/day, break-even price is about **S$2.10/m**. Cut accepted output by 20% to 640 m/day, holding paid days and daily cost fixed, and annual contribution falls from S$58,000 to **−S$14,000**.

Base annual cash contribution before depreciation is S$88,000. Dividing the assumed S$120,000 purchase by that figure gives a simple **1.36-year cell payback**. That calculation excludes financing, working capital, company R&D, sales, taxes and central overhead, and assumes steady repeat demand. It is not a company payback forecast.

The model exposes the diligence question: who pays for an aborted mission, extra cleaning, a lost robot or a rejected deliverable? A service-level promise can transfer those costs to the startup faster than software reduces them.

---

## 11 · What the headline omits

### Infrastructure need does not become startup revenue automatically

The US EPA’s 2022 survey reports **US$630.1 billion** of clean-water infrastructure needs over twenty years, in 2022 dollars. Its categories include treatment, stormwater, nonpoint-source controls and decentralised wastewater systems. This is not a sewer-robotics market estimate. [EPA survey and scope](https://www.epa.gov/cwns/clean-watersheds-needs-survey-cwns-2022-report-and-data) · [Report to Congress](https://www.epa.gov/system/files/documents/2024-05/2022-cwns-report-to-congress.pdf)

A useful market model starts with specific jobs and reachable buyers: contracted annual volume × price × realistically won share. Then subtract deployment support, field failures and acquisition cost. Singapore’s pipe stock is useful context; it does not reveal annual inspection spending or an obtainable share.

There are other missing denominators. Vendor accuracy claims need a task definition, critical-defect recall and human-review contribution. SewerAI’s operational documentation describes AutoCode as a combination of AI and human-powered work. [Operational documentation](https://help.sewerai.com/articles/4260144241-managing-your-inspections)

A founder should want the documents that public marketing rarely contains: rejected-job histories, job-level margins, recovery incidents, buyer acceptance terms and equipment replacement costs. Those are the records that could turn this opportunity from an appealing story into a financeable company.

---

## 12 · A path of attack

### Earn each increase in ambition

<figure><img src="/images/sewer-robotics-ai/roadmap.svg" alt="Proposed staged plan: baseline and compare in months zero to three, sell workflow in months three to six, isolate a physical bottleneck in months six to twelve, replicate or stop in months twelve to twenty-four." style="max-width:680px;background:transparent"><figcaption>Proposed 12–24 month sequence. Each phase depends on evidence and buyer access; procurement timing is not predictable from this research.</figcaption></figure>

**Months 0–3:** observe complete jobs, obtain permissioned failure logs and quotes, and compare manual, incumbent and prototype workflows. Founder and contractor operations lead own the baseline; an independent competent reviewer adjudicates output.

**Months 3–6:** sell the narrow workflow with existing equipment. Seek repeat orders at a price that covers support and review. Stop if savings disappear when founder labour is priced properly.

**Months 6–12:** choose one repeated physical bottleneck and test a minimal sensor or payload modification. Buy locomotion where practical. Require safe retrieval and evidence quality across the stated operating envelope.

**Months 12–24:** replicate with a second buyer cohort or jurisdiction. Confirm local standards, data rights, service cost and repeat demand. Build a fleet only when multiple customers and measured utilisation support it. A useful local service is a valid outcome even if the venture-scale platform never appears.

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

### The binding constraint may belong to somebody else

A model cannot open an inaccessible manhole, create a traffic permit or remove every deposit. If access and cleaning dominate cost, improved coding may generate little additional paid throughput. If the buyer pays for a fixed annual programme, faster work may compress the contract price rather than expand the supplier’s margin.

The competitor can respond, too. A feature discovered in one contractor workflow may be easy for an established platform or equipment supplier to add. Local integration is initially an execution advantage; it becomes durable only if repeat distribution, permissioned outcome data and dependable service reinforce one another.

Robotics also changes the downside. US OSHA guidance describes sewer atmospheres and surge conditions as unpredictable hazards; this establishes the physical problem, not Singapore legal requirements. Local safety assessment, access approval and equipment suitability remain prerequisites for any field deployment. [OSHA sewer-entry guidance, US context](https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.146AppE)

My strongest bear case is that the startup becomes an ordinary inspection contractor with extra software expenses. That can still be a viable business, but it would undermine the thesis that proprietary robotics and AI create exceptional returns.

---

## 15 · The larger prize

### From seeing defects to maintaining the network

<figure><img src="/images/sewer-robotics-ai/decision.svg" alt="Three sequential decisions: establish customer loss, compare existing products, then prove improvement to the whole job. Stop or change the thesis if a gate fails." style="max-width:680px;background:transparent"><figcaption>The expansion rule: prove demand, test substitution, then measure the complete intervention. Original decision framework.</figcaption></figure>

If reliable inspection becomes cheaper, the next ambition is targeted maintenance: place a sensor, collect a sample, clear a specific obstruction, then verify the result. The business could move from selling observations to delivering a maintained asset within an explicit operating envelope.

The European **PIPEON** project is pursuing integrated robotics, manipulation, sensing and AI. Its 26 October 2026 brief explicitly calls the tenfold inspection/cost improvements and 30% spill reduction **targets to be assessed through staged laboratory and field validation**. They are not established commercial outcomes. [PIPEON policy brief](https://pipeon.eu/first-policy-brief-released-on-sewer-robotics-and-pollution-prevention/)

That direction is exciting because it links perception to physical work. It is also a warning: much of the integration remains research. Detection alone does not prevent a spill. An organisation must choose, fund and complete the right intervention, and verify the network outcome.

---

## 16 · Evidence notes and disagreements

### What I would trust, and what I would still ask for

This edition uses public primary evidence accessed on **2 November 2026**. It separates published requirements, vendor product descriptions, research results and original scenarios. It does not include customer interviews, a field trial, private tender prices or paid research. Licensed classification manuals and proprietary performance data were not available.

| Evidence | What it establishes | What remains open |
|---|---|---|
| [PUB registration and guide](https://www.pub.gov.sg/Professionals/Requirements/Used-Water/Registration-of-CCTV-Contractors) · [guide](https://www.pub.gov.sg/-/media/PUB/PDF/Sewer_CCTV_Guidebook_Oct-2023.pdf) | Contractor channel and published deliverable rules | Latest contract, rejection rates, cost of rework |
| [RedZone SOLO](https://redzone.com/our-technology/solo/) | Commercial autonomous crawler and stated envelope | Independent full-job productivity and losses |
| [SewerAI QAI](https://www.sewerai.com/products/qai) · [Vapar](https://www.vapar.co/) | Existing software alternatives | Local comparison, prices and integration cost |
| [Sewer-ML](https://arxiv.org/abs/2103.10895) | A labelled research benchmark | Current local deployment reliability |
| [PUB sampling brief](https://www.pub.gov.sg/Industry/Events-and-Programmes/Global-Innovation-Challenge/Challenges/2023/Sewer-Sampling-Robot) | Historical need and narrow disclosed activity | Current award status, paid demand beyond that base |
| [PIPEON brief](https://pipeon.eu/first-policy-brief-released-on-sewer-robotics-and-pollution-prevention/) | Research direction and explicit targets | Validated fleet economics and network outcomes |

**Disagreement log:** headline vendor accuracy cannot be reconciled with a research F2 score without a common task, cohort and human-review definition. A closed buyer challenge is not an open order book. A project’s cost-reduction target is not a measured result. None of these gaps is filled by averaging the numbers.

---

## 17 · The founder’s next ninety days

### Build the evidence that makes the machine necessary

My recommendation is to explore this opportunity with a contractor partner and a capped validation budget. The next step is access to complete job records and a fair incumbent comparison. It is too early to order a custom crawler.

The founder owns ten structured buyer/operator interviews, permissioned baseline collection with two contractors, equipment and insurance quotations, and the 30-crew-day comparison. The contractor owns authorised site operations. A competent independent reviewer owns adjudication. None of those external actions has been performed by this report.

**Model appendix:** annual contribution after depreciation = paid days × (accepted metres/day × price − daily variable cost) − annual fixed cost − equipment cost/useful life. Accepted metres exclude rejected work; paid-day costs must include repeat attempts. Unpaid standby is represented by fixed cost and reduced paid days and must be reconciled against real staffing terms.

**Sensitivity:** at the base inputs, reducing price 20% to S$2/m makes annual cell contribution **−S$14,000**; reducing accepted output 20% does the same. The base arithmetic is fragile enough that contracted prices and observed rejection costs could reverse the recommendation quickly.

I remain optimistic about machines that make buried infrastructure easier to maintain. The company worth building will have a specific reason it can complete that work better. **Find the costly repeated failure, prove the improvement, then build the robot the evidence calls for.**
