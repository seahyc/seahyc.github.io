+++
title = "The Part That Comes With Proof"
slug = "the-part-that-comes-with-proof"
aliases = ["/research/allied-drone-components/", "/learning/allied-drone-components/"]
description = "A founder’s Fieldbook on traceable allied drone components: the conditional ESC wedge, counter-drone buyers, qualification economics and the case against building."
date = 2026-11-03
layout = "research-swipe"
body_class = "research-swipe"
main_class = "main-research-swipe"
+++

# THE PART THAT<br>COMES WITH PROOF

### A drone should not become unusable because nobody can qualify its replacement part.

**A founder’s Fieldbook · 3 November 2026 · Seah Ying Cong**

<div style="grid-column:1 / -1;width:100%;min-width:0">
<p style="font-size:max(17px,1rem);line-height:1.58">Imagine an engineer replacing a constrained drone component without starting the aircraft’s evidence trail again. The replacement arrives with its origin, firmware revision, test conditions and production history. The engineer can establish what changed and decide whether to accept it.</p>
<figure style="max-width:560px;margin:1rem auto"><img style="background:transparent" src="/images/allied-drone-components/proof-bench.png" alt="A drone, two replacement circuit boards and a trail of test records: physical interchangeability needs an evidence trail." ><figcaption>Original watercolor metaphor: the useful second source supplies both the part and the evidence needed to evaluate it. No qualification result is implied.</figcaption></figure>
<p style="font-size:max(17px,1rem);line-height:1.58">I would explore a company that makes this ordinary: rent manufacturing, own a repeatable component and its evidence, and charge for buyer-agreed qualification. My provisional wedge is a high-voltage electronic speed controller. The public evidence establishes existing alternatives; it does not yet establish an affordable-supply gap.</p>
</div>

---

## 01 · Start with the engineer

### Resilience becomes real at the replacement decision

A component is useful only inside a working machine. A replacement may fit the connector and still behave differently when hot, at low battery voltage or under a sudden load. Procurement needs a delivery date; engineering needs an operating envelope; compliance needs evidence of the right kind of origin.

I want the founder to take responsibility for that intersection. The customer would be an allied aircraft manufacturer with a failed procurement and a named engineer who can accept a replacement. An authorized interceptor manufacturer could be such a customer. A facility buying drone detection usually is a different prospect.

**The decision:** should a founder build a traceable component second source from Asia, beginning with a buyer-qualified electronic speed controller, or help the buyer qualify an existing supplier?

The second outcome matters. A successful search can kill the new-hardware idea and still solve the customer’s problem. This is a hypothesis about a company worth testing, not evidence of orders already waiting.

---

## 02 · Policy creates friction, not an empty shelf

### The original control is more precise than the headline

China’s published motor provision requires a conjunction: rated voltage **at least 48 V**, power **at least 3 kW**, power density **at least 3 kW/kg**, speed **at most 3,000 rpm**, and the stated drone-propeller purpose. The linked ESC clause has voltage and power conditions and a design linkage to those motors; it has no separate density or speed test. The announcement takes effect **18 November 2026**. It requires export permission and names no destination ban. [MOFCOM Announcement 49, clauses 9A901.a–b](https://www.mofcom.gov.cn/zcfb/zc/art/2026/art_b2fa4e60bcd24bdf8c658e476b808785.html)

That is a reason to classify a particular supply route. It does not establish that every small drone motor is unavailable or that licenses will be refused.

It also cuts both ways. A proposed controller within the linked definition is itself a licensable type on a controlled Chinese export leg. Starting in Asia does not exempt the founder from the friction motivating the business.

**My inference:** procurement teams may value another qualified source. Whether they value it enough to fund one remains the central commercial question.

---

## 03 · What an ESC actually does

### Battery energy must become controlled rotation

<figure><img style="background:transparent" src="/images/allied-drone-components/power-chain.svg" alt="Battery power passes through an electronic speed controller to timed motor currents, shaft rotation and propeller thrust; losses and cooling constrain the chain."><figcaption>Original engineering schematic. Electrical input, shaft output and useful thrust are different quantities. No tested product performance is represented.</figcaption></figure>

An electronic speed controller, or ESC, switches battery power into timed currents through the motor. The magnetic field turns the rotor; the shaft turns the propeller. The controller must coordinate with the motor while surviving electrical and thermal stresses.

A catalogue maximum is therefore incomplete. Cooling, load, duration, wiring and firmware belong in the specification. Multiplying a maximum voltage by a maximum current does not establish sustained shaft power.

I would choose a controller only after an aircraft engineer defines those conditions. A system that works briefly in a fast airflow may fail the buyer’s installation without contradicting its advertised rating.

---

## 04 · The missing source has not been found

### Existing controllers are the first experiment

Scorpion lists a Taiwan-manufactured controller at **$499.99**, with currency unverified in this research. Its published **220 A** rating is conditional on **60 seconds** and **35 m/s** airflow. Those are vendor claims, not an independent endurance test or audited sub-tier origin. [Scorpion Tribunus III](https://www.scorpionsystem.com/catalog/speed_controllers/tribunus_esc/hv_tribunusIII_series/III_14_220/)

APD documents Australian manufacture and offers NDAA/DFARS options on request. Its UHV guide uses a different rating condition: **180 seconds** at full throttle and **10 m/s** airflow. A compliance option is not a claim that every variant qualifies. [APD UHV documentation](https://docs.powerdrives.net/products/uhv)

These offerings defeat a categorical claim that non-Chinese controllers do not exist. They do not settle whether the same buyer can obtain a suitably documented component at an acceptable delivered price and date.

My first engineering purchase would be a matched comparison, with written quotations and an agreed test plan. If an incumbent meets the need, I would use it before designing another board.

---

## 05 · Why try the controller first?

### Choose a tractable experiment, then let the buyer overturn it

My provisional choice is an ESC for a buyer-defined **48–60 V nominal** system and **at least 3 kW electrical** requirement. These are discovery filters, not a universal interceptor specification or a claim that the design automatically falls within China’s motor-linked control. Maximum pack voltage and continuous duty still need agreement. [Original research plan](https://github.com/seahyc/seahyc.github.io/blob/main/research-dossiers/2026-11-03-allied-drone-components/research-map.md)

An ESC can plausibly be assembled by a contract electronics manufacturer. It need not contain rotor magnets, though semiconductor and PCB provenance remain. That is my tractability inference, rather than a measured cost advantage.

Other categories already have documented offerings: Plettenberg motors, CubePilot flight controls, Doodle radios, FLIR thermal modules and Molicel cells. Their public documents establish product or sourcing claims, not matched affordability or complete raw-material independence. The magnet category was not substantively verified. [Plettenberg](https://plettenbergmotors.com/company/) · [CubePilot declaration](https://discuss.cubepilot.org/uploads/short-url/7VtllWhwlP8OckXPBMBBOa99m8B.pdf) · [Doodle](https://doodlelabs.com/capabilities/supply-chain) · [FLIR](https://oem.flir.com/products/boson/?segment=oem&vertical=lwir) · [Molicel](https://www.molicel.com/about/)

A buyer’s documented motor bottleneck could overturn my choice. The goal is an accepted replacement, not loyalty to the first component idea.

---

## 06 · Origin is a tree

### Final assembly cannot answer every upstream question

<figure style="max-width:540px;margin:1rem auto"><img style="background:transparent" src="/images/allied-drone-components/origin-tree.png" alt="A technician traces a controller’s branches to a chip, circuit board and copper reel, each with its own origin tag."><figcaption>Original watercolor: a factory location identifies one node in a supply tree. It does not establish every branch’s origin.</figcaption></figure>

“Non-Chinese” can mean a direct supplier’s headquarters, assembly location, sub-component manufacture or the origin of raw materials. Those are different representations. A buyer may require some and accept uncertainty about others.

DIU’s assessment process considers ownership, origin, sourcing and firmware, software and hardware artifacts. A founder needs a product-specific evidence tree that preserves unknowns and tracks changes. A corporate flag cannot fill the gaps. [DIU Recognized Assessors](https://www.diu.mil/latest/diu-seeking-recognized-assessors-to-support-blue-uas-ndaa-compliance)

I would make unresolved origin visible before quoting. Otherwise the company risks paying to qualify a board that its intended customer cannot buy.

---

## 07 · Allied is not the same as eligible

### The US route may require a different company footprint

The FCC notice quotes a National Security Determination that “UAS and UAS critical components must be produced in the United States.” It bases the foreign-production listing on manufacturing location and affects equipment authorization. It also provides a route through specific DoW or DHS determinations. The FAQ describes domestic-end-product treatment under the Buy American standard and Conditional Approvals. None of this is a blanket ban on all foreign-component import or sale. [FCC notice](https://docs.fcc.gov/public/attachments/DA-25-1086A1.pdf) · [Expanded FAQ](https://www.fcc.gov/covered-list-faqs-uas-and-uas-critical-components)

ESCs are not expressly named in the non-exhaustive critical-component list. The FAQ limits the category to items designed and intended primarily for UAS, and says previously exempt devices do not acquire a new authorization requirement. Whether this proposed controller is covered, or requires authorization, is unresolved. [FCC FAQ](https://www.fcc.gov/covered-list-faqs-uas-and-uas-critical-components)

The same FAQ gives conflicting Blue-list exemption dates: **January 2028** and **January 2027**. The original notice contains no expiry date that resolves this. I would obtain the controlling determination before promising eligibility. [FCC FAQ](https://www.fcc.gov/covered-list-faqs-uas-and-uas-critical-components)

Taiwan’s policy supports component localization and testing; it does not confer US eligibility. I would explore an eligible Taiwanese or Australian OEM first, while costing a separate US manufacturing route only against actual demand. [Taiwan Executive Yuan](https://www.ey.gov.tw/Page/5A8A0CB5B41DA11E/97980e62-02ab-4c1f-b727-c51233e2ffc2) · [US domestic-production policy](https://www.whitehouse.gov/presidential-actions/2025/06/unleashing-american-drone-dominance/)

---

## 08 · Sell evidence with a repeatable product

### A qualification package is not a self-issued badge

My proposed deliverable includes a frozen hardware revision, firmware hash, authorized BOM, serial and lot genealogy, buyer-agreed tests, raw logs, instrument records, nonconformance history and change notifications. Independent witnessing belongs in the contract when the buyer requires it.

The customer pays non-recurring engineering, or NRE, for the agreed qualification work. Hardware releases then have their own acceptance and payment terms. A new material, firmware change or manufacturing transfer may reopen qualification; that obligation must have an owner and a price.

Existing assessors already sell conformity work. DIU retains the government decision. Framework components and Cleared platforms are different programme concepts; neither becomes a universal sourcing passport. [DIU assessment process](https://www.diu.mil/latest/diu-seeking-recognized-assessors-to-support-blue-uas-ndaa-compliance) · [Framework and platform distinctions](https://www.diu.mil/latest/blue-uas-refresh-list-and-framework-platforms-and-capabilities-selected)

Vertiq also markets integrated propulsion and reports Framework approval. Its product page is undated; the vendor post does not establish a current listing for every variant. Qualification evidence is already part of incumbent competition. [Vertiq product](https://www.vertiq.co/81-08-g2) · [Vendor approval claim](https://www.vertiq.co/blog/vertiq-approved-for-blue-uas-framework)

---

## 09 · Counter-drone is a chain of decisions

### Seeing a drone does not establish intent or permission to act

<figure><img style="background:transparent" src="/images/allied-drone-components/counter-drone.svg" alt="Detect, track, identify, decide and defeat are separate steps; authority must be established before a mitigation action."><figcaption>Conceptual workflow, not engagement guidance. Each handoff has its own evidence and authority requirements. No range or success-rate claim.</figcaption></figure>

Detection establishes an observation. Tracking connects observations over time. Identification narrows what the object might be; a decision combines that evidence with context and authority. Defeat is an action by a legally authorized operator using an appropriate system.

Radar, RF and optical observations answer different questions. The FAA explicitly warns that detection cannot determine intent. Some sensing can itself raise communications or surveillance issues. A detection installation is not automatically permission to intercept. [FAA guidance](https://www.faa.gov/airports/new_entrants/uas_detection_mitigation_response) · [FBI testimony](https://www.fbi.gov/news/speeches-and-testimony/statement-of-special-agent-in-charge-douglas-olson-to-senate-appropriations)

The component opportunity sits downstream of a particular lawful system choice. Only some of those systems need an interceptor’s propulsion controller.

---

## 10 · Separate the two customer lists

### Detection budgets are not interceptor orders

A civil facility might buy sensing, alerting and escalation. An authorized mitigation integrator might buy physical systems, including interceptors. The former’s site count cannot be multiplied into the latter’s controller demand.

US guidance needs care: newer authority extends to qualified state, local, tribal and territorial law-enforcement bodies under conditions. “Only federal agencies” is incomplete as a current universal US claim. That exception also does not grant ordinary private facilities blanket defeat authority. [FBI testimony](https://www.fbi.gov/news/speeches-and-testimony/statement-of-special-agent-in-charge-douglas-olson-to-senate-appropriations) · [Federal Register rule](https://www.govinfo.gov/content/pkg/FR-2026-07-06/pdf/2026-13609.pdf)

Australia’s regulator prohibits ordinary drone-jammer possession, supply and use. This is a jurisdiction-specific example, not proof of the rules in Singapore, Taiwan or Europe. No cross-country legal census supports a claim about “most countries” here. [ACMA guidance](https://www.acma.gov.au/jammers-are-illegal-australia)

I would keep distinct pipelines: lawful detection customers for sensing suppliers, and authorized aircraft integrators for this component thesis. Each account needs its actual BOM, manufacturing eligibility and planned releases.

---

## 11 · The incumbents can close the gap

### A capable supplier may be the strongest reason to stop

The competitive set includes established controller suppliers, integrated propulsion makers, assessors and OEM-backed domestic manufacturing. It is larger than a contest between a new Asian supplier and Chinese catalogues.

PDW announced an **up-to-US$820 million conditional loan commitment** for domestic components, including intended external supply. This establishes a serious competitive direction, not disbursed financing or operating capacity. [PDW announcement](https://www.pdw.ai/posts/pdw-receives-conditional-820-million-loan-commitment-from-us-department-of-war-to-power-americas-drone-arsenal)

Red Cat’s announced sourcing relationship with Unusual Machines shows that outsourcing also occurs. It does not establish delivered cost parity. Anduril and Skydio require account-specific sourcing investigation; this research does not establish that either makes every critical component internally. [Red Cat sourcing announcement](https://www.newswire.com/news/red-cat-becomes-first-u-s-based-drone-manufacturer-to-source-motors-22525900)

The bear case is forceful: incumbent parts plus an assessor already solve the need; US demand rewards domestic capacity; upstream origin is difficult for everyone; and every customer wants bespoke engineering. The result could be a useful engineering service with little recurring hardware advantage.

---

## 12 · The arithmetic is thin in the middle

### Positive contribution is possible under invented inputs

<figure><img style="background:transparent" src="/images/allied-drone-components/economics.svg" alt="Invented steady-year scenarios show annual contribution after depreciation: low minus 431 thousand dollars, base plus 44 thousand, high plus 1.077 million."><figcaption>USD, original steady-year scenarios as of 3 November 2026. All inputs are invented; rounded chart labels are calculations, not forecasts or market observations. <a href="https://github.com/seahyc/seahyc.github.io/blob/main/research-dossiers/2026-11-03-allied-drone-components/scenario-model.json">Full model and scope</a>.</figcaption></figure>

The unit is an accepted ESC. Failed attempts still consume purchased parts and assembly. The model therefore divides attempt cost by acceptance yield, then adds inspection and a warranty allowance.

| Invented input | Low | Base | High |
|---|---:|---:|---:|
| Accepted units/year | 1,000 | 5,000 | 15,000 |
| USD selling price | 400 | 350 | 300 |
| USD cost/attempt | 240 | 190 | 160 |
| Acceptance yield | 80% | 92% | 97% |
| USD inspection/accepted unit | 25 | 20 | 15 |

All values are [original planning assumptions](https://github.com/seahyc/seahyc.github.io/blob/main/research-dossiers/2026-11-03-allied-drone-components/scenario-model.json). The base price is unanchored and below the observed Scorpion list price; currency and specification equivalence are unverified. This is not evidence that the founder can undercut an incumbent.

---

## 13 · Qualification cannot hide the hardware business

### Pay for engineering once; measure repeat releases separately

In the base scenario, a **2.5% warranty allowance** leaves about **US$114.73 contribution per accepted unit**. Annual fixed expense is **US$500,000**, with **US$60,000** depreciation. Qualification projects add **US$30,000 net**, producing about **US$43,641** annual contribution after depreciation. Without NRE, repeat hardware alone contributes about **US$13,641**. These are calculated scenarios, not achievable margins. [Original model](https://github.com/seahyc/seahyc.github.io/blob/main/research-dossiers/2026-11-03-allied-drone-components/scenario-model.json)

The assumed NRE fee is **US$75,000** against **US$65,000** project cost, across **three projects**. Break-even is **4,620 accepted units** with that NRE contribution, or **4,882** without it. Doubling qualification cost turns the annual result into approximately **minus US$151,359**. [Scenario arithmetic](https://github.com/seahyc/seahyc.github.io/blob/main/research-dossiers/2026-11-03-allied-drone-components/scenario-arithmetic.md)

A controller programme can look healthy while its engineering is subsidized by founders’ time. I would record customer-specific work separately and price a changed board or test programme explicitly.

Renting a factory removes factory ownership. It does not remove the need to earn enough contribution to pay the company.

---

## 14 · What the headline omits

### Capacity, accepted lots and collected cash are different

A **20% selling-price reduction** turns the base annual contribution into about **minus US$297,609**. The base tooling, simplified working-capital screen and NRE cash gap together require about **US$479,445**, before operating losses and excluded shocks. That sum is a financing screen, not a dated cash forecast. [Original scenario model](https://github.com/seahyc/seahyc.github.io/blob/main/research-dossiers/2026-11-03-allied-drone-components/scenario-model.json)

Demand headlines need the same discipline. The current official Gauntlet snapshot sums to **30,000 ordered aircraft**, of which **23,840 were accepted**; all original-order rows were accepted while bonus fulfillment remained incomplete. The displayed snapshot is dated **2 November 2026**. This differs from later articles recounting older delivery states. Aircraft orders still do not establish this ESC’s attach rate or a startup’s receipts. [Official leaderboard](https://dronedominance.mil/leaderboard.html)

I have not used broad budget requests, Taiwan’s historical capacity target or Ukraine’s reported import shift to size the business. Their denominators do not establish eligible component releases. The Bloomberg feature was paywalled and unread.

Import duties, export jurisdiction, technical-data transfers and end use also need actual-item review. Neither “allied” nor “ITAR-free” can substitute for classification. [CBP notice](https://content.govdelivery.com/accounts/USDHSCBP/bulletins/4281ea7) · [BIS classification guidance](https://www.bis.gov/licensing/classify-your-item)

---

## 15 · A plan that buys the next answer

### Rent the infrastructure; own the learning and rights

<figure><img style="background:transparent" src="/images/allied-drone-components/roadmap.svg" alt="Proposed plan: establish paid demand, qualify a limited lot, measure repeat deliveries, then transfer the same product to another buyer or site."><figcaption>Founder-proposed sequence over <a href="https://github.com/seahyc/seahyc.github.io/blob/main/research-dossiers/2026-11-03-allied-drone-components/research-map.md">12–24 months</a>. Every stage depends on evidence from the preceding stage; no procurement or qualification duration is promised.</figcaption></figure>

My opening **30-day** task is **12 interviews across at least four independent OEMs**, supported by failed-procurement records. Engineering owns a common requirement matrix. Operations obtains **two incumbent quotations and two CM bids** for the same scope. Counsel owns eligible manufacture, exports and technical-data routes. These are proposed screening rules. [Original research plan](https://github.com/seahyc/seahyc.github.io/blob/main/research-dossiers/2026-11-03-allied-drone-components/research-map.md)

Then come a paid, buyer-defined qualification lot; accepted releases with frozen revisions; and measured yield, failures, collections and repeat demand. The founder must own or secure durable rights to the design, firmware, test fixtures and transfer package.

Only after repeat paid releases would I fund a second buyer or manufacturing site. A manufacturing transfer has to preserve evidence and reopen the approvals it actually affects.

---

## 16 · Make stopping a successful outcome

### The founder needs rules that survive enthusiasm

My proposed **90-day** gate requires **two independent OEMs**, each funding at least **US$75,000 NRE**, a named accepting engineer and a credible release schedule. Letters of interest do not pass. These are founder-chosen hurdles, not market benchmarks. [Original gates](https://github.com/seahyc/seahyc.github.io/blob/main/research-dossiers/2026-11-03-allied-drone-components/research-map.md)

Stop the shortage claim if **two incumbent quotes** satisfy the same origin, duty, mass, price and delivery requirements. Stop the new SKU if origin cannot be evidenced to the actual buyer rule. Stop if accepted-unit contribution is below the proposed **25%** hurdle or credible releases cannot pay fixed expense and customer engineering. [Original gates](https://github.com/seahyc/seahyc.github.io/blob/main/research-dossiers/2026-11-03-allied-drone-components/research-map.md)

Stop expansion if another customer needs a materially different product without paying its engineering cost. A successful pilot also does not establish long-term reliability: sample sizes and stress profiles belong to the buyer-approved qualification plan.

I like the possibility of making trusted supply less scarce. I would earn conviction through a paid procurement problem, a reproducible accepted lot and a repeat order. Until then, this is a disciplined discovery project.

---

## 17 · Method and sources

### What is known, inferred and still hypothetical

This Fieldbook uses public primary policy, regulator and company documents, plus saved rendered captures for the FCC FAQ, DIU assessor page and official leaderboard. Company pages establish published offerings and claims. They do not establish audited provenance, inventory, actual fulfillment or comparative value. Undated vendor claims remain undated.

The proposed ESC choice is an inference. Buyer demand, test scope, achievable price, yield and repeatability remain hypotheses. No interviews, quotations, paid engineering, hardware tests or regulatory submissions have occurred in this research.

Every financial input is invented. The formula is: **unit contribution = price − attempt cost/yield − acceptance cost − warranty fraction × price**. Annual contribution then adds NRE fees less customer-specific NRE costs, subtracts annual fixed expense and straight-line tooling depreciation. Working capital is treated separately from annual expense. [Model](https://github.com/seahyc/seahyc.github.io/blob/main/research-dossiers/2026-11-03-allied-drone-components/scenario-model.json) · [Reproducible arithmetic](https://github.com/seahyc/seahyc.github.io/blob/main/research-dossiers/2026-11-03-allied-drone-components/calculate-scenarios.py)

Scenarios exclude tax, financing, unbounded liability, major recalls, US localization capex, ramp and concentration effects; duties appear only in an explicit hypothetical sensitivity. Low and high cases are not statistical confidence bounds. [Model scope](https://github.com/seahyc/seahyc.github.io/blob/main/research-dossiers/2026-11-03-allied-drone-components/scenario-model.json)

The source ledger preserves what each claim proves, what it does not prove and the counterevidence. The useful next evidence is private and specific: matched quotations, a buyer-approved test plan and money committed against acceptance. [Evidence ledger](https://github.com/seahyc/seahyc.github.io/blob/main/research-dossiers/2026-11-03-allied-drone-components/evidence-ledger.md)
