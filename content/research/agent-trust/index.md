+++
title = "Trust When Agents Arrive"
slug = "trust-when-agents-arrive"
aliases = ["/research/agent-trust/", "/learning/agent-trust/"]
description = "A founder’s Fieldbook on signed agents, risk scores and the narrower opportunity to protect job seekers by verifying recruiter authority before contact."
date = 2026-11-03
layout = "research-swipe"
body_class = "research-swipe"
main_class = "main-research-swipe"
+++

# TRUST WHEN AGENTS ARRIVE

<div style="grid-column:1 / -1;width:100%;min-width:0;">
<p style="font-size:max(17px,1rem);line-height:1.58;"><strong>A founder’s Fieldbook · 3 November 2026 · Seah Ying Cong</strong></p>
<p style="font-size:max(17px,1rem);line-height:1.58;">Imagine asking an assistant to find work for you. It can search, compare and arrange introductions. The marketplace welcomes its help, while checking that the recruiter on the other side actually represents the employer and has a real opportunity to offer.</p>
<p style="font-size:max(17px,1rem);line-height:1.58;">I want that internet: useful automation can enter, and a stranger’s convincing presentation does not automatically earn the right to reach vulnerable people.</p>
<figure style="max-width:560px;margin:1rem auto;"><img src="/images/agent-trust/permission-gate.png" alt="A gatekeeper checks a robot messenger’s key and the permission associated with its parcel, while a human messenger waits." style="width:100%;height:auto;background:transparent;"><figcaption>Identity opens an investigation; permission determines the action. Generated watercolor metaphor, not a deployed system.</figcaption></figure>
<p style="font-size:max(17px,1rem);line-height:1.58;"><strong>My decision:</strong> test recruiter-authority and harmful-contact prevention for job marketplaces. Use signatures, risk scores and checkpoints as components. A company is justified only if it beats existing protection at a price the buyer will renew.</p>
</div>

---

## 01 · A cheaper attacker does not guarantee a company

### Start with the outcome worth protecting

<figure><img src="/images/agent-trust/demand-gap.png" alt="Automated recruitment envelopes arrive at a marketplace desk, while a buyer keeps a closed coin purse beside an empty order tray." style="max-width:600px;width:100%;height:auto;background:transparent;"><figcaption>More automated abuse does not establish vendor demand. Generated watercolor metaphor; no buyer study is implied.</figcaption></figure>

A job seeker should be able to explore an opportunity without becoming an investigator. A small employer should be able to recruit without a burdensome identity ritual. A helpful agent should be able to act within a person’s permission. These goals belong together.

The seed for this investigation was Nikita Bier’s account of consumer-app abuse. He recommends internally built risk scoring, selective checkpoints and close attention to the friction imposed on legitimate users. His estimate that fixes last **three to twelve months** is practitioner experience, not a measured industry survival curve. His own reply raises the privacy and speech costs of universal identity checks. [Bier’s post and reply](https://x.com/nikitabier/status/2116246313914479047)

That is a useful problem description. It is also a warning to a startup: his recommendation is to build in-house. It supplies no evidence that a platform wants to buy a new vendor.

My hypothesis is narrower than “AI makes fraud bigger.” A specialist might assemble evidence about recruiter authority and a proposed contact faster than a marketplace can today. Neither demand nor that performance advantage has been demonstrated here.

---

## 02 · A signature answers one question

### Who sent this request?

A cryptographic signature lets a recipient check that a request was signed using a particular key. A directory connects that key to an identity. This can let an agent identify itself rather than pretend to be a browser operated by a human.

<figure><img style="background:transparent;" src="/images/agent-trust/trust-layers.svg" alt="Four distinct questions: signing identity, representative authority, harmful intent and the platform’s action policy." width="600" height="532"><figcaption>Original conceptual diagram. These are separate claims requiring different evidence; no universal trust score is implied.</figcaption></figure>

The Web Bot Auth working draft explicitly leaves human authentication, authorization and delegation outside its scope. A signed sender can still lack permission, be compromised or behave dishonestly. This is work in progress, rather than a final standard. [IETF protocol draft](https://www.ietf.org/ietf-ftp/internet-drafts/draft-ietf-webbotauth-httpsig-protocol-01.html)

**My inference:** verifying signatures is useful infrastructure. The commercial opportunity must explain what better decision follows from knowing the signer.

---

## 03 · The trust roots already have owners

### A universal agent passport faces powerful distribution

<figure><img src="/images/agent-trust/owned-trust-roots.png" alt="Established trees shelter web, shopping and payment gateways; a founder considers where a new seedling could grow among their roots." style="max-width:600px;width:100%;height:auto;background:transparent;"><figcaption>An incumbent’s distribution is part of the competitive constraint. Generated watercolor metaphor, not a market-share chart.</figcaption></figure>

Cloudflare already documents signed-request verification through Web Bot Auth. Its Pay Per Crawl offering addresses a separate question: whether a cooperating crawler pays for access. Recognition, payment and permission are related, but they are different products. [Web Bot Auth](https://developers.cloudflare.com/bots/reference/bot-verification/web-bot-auth/), [Pay Per Crawl, labelled Beta](https://developers.cloudflare.com/ai-crawl-control/features/pay-per-crawl/)

Visa’s Trusted Agent Protocol adds commerce recognition and payment context. Mastercard describes a framework covering identity, intent, controls, execution and intelligence; its agent-initiation score was announced for US testing, which does not establish global availability or fraud reduction. [Visa protocol](https://developer.visa.com/docs/trusted-agent-protocol), [Mastercard announcement](https://investor.mastercard.com/investor-news/investor-news-details/2026/Mastercard-Advances-Agentic-Commerce-With-New-Trust-and-Intelligence-Services/default.aspx)

These sources establish offerings and announced scope, not independently tested effectiveness. They do establish a difficult starting position for a newcomer hoping to become everybody’s trust root.

I would revisit a standalone agent-identity company only when a named buyer pays for a portable admission decision the networks and existing suppliers cannot serve. Until then, I would integrate the protocol and spend engineering effort closer to the harmful action.

---

## 04 · The human harm is real—and declining

### Do not make rising scams a premise

Singapore recorded **5,575 job-scam cases and S$123.5 million in losses in 2025**. Cases fell from **9,043 in 2024**, and losses declined **20.9%**. These are reported police categories, not a census of all fraud. [SPF annual brief](https://www.police.gov.sg/-/media/SPF/Advisories/Scams/Annual-Scam-and-Cybercrime-Brief-2025.pdf)

<figure><img style="background:transparent;" src="/images/agent-trust/reported-harm.svg" alt="Singapore annual job-scam cases fell from 9,043 in 2024 to 5,575 in 2025. Separately, first-half cases fell from 2,717 to 2,247." width="600" height="530"><figcaption>Reconstructed from SPF reports. Annual bars start at zero; half-year observations remain separate.</figcaption></figure>

The latest comparable half-year also improved: **2,247 cases and S$34.9 million losses in H1 2026**, versus **2,717 and S$64.0 million in H1 2025**. WhatsApp and Facebook are common contact pathways. [SPF mid-year brief](https://isomer-user-content.by.gov.sg/537/a4a04eb7-0d38-4cd0-86da-cea81f214ff2/Mid-Year%20Scam%20and%20Cybercrime%20Brief%202026.pdf)

Important harm remains. These numbers do not reveal which exposure a job marketplace can prevent, what AI caused, or what a platform will pay. National victim losses cannot be treated as fraud-software revenue.

---

## 05 · The bottleneck is a relationship

### A real company can be impersonated

<figure><img src="/images/agent-trust/borrowed-badge.png" alt="A messenger holds a plausible agency badge, but its cord does not connect to the real agency owner." style="max-width:600px;width:100%;height:auto;background:transparent;"><figcaption>A genuine agency record leaves the representative’s authority unresolved. Generated watercolor metaphor for the advisory’s failure mode.</figcaption></figure>

Suppose a recruiter provides a genuine agency licence number. Checking the registry establishes that the agency exists. It does not establish that this account belongs to someone authorized to recruit for it.

A joint SPF/GovTech advisory describes impersonation using legitimate employment-agency details and social engineering around Singpass contact updates. This supports an authority gap. It does not establish a biometric bypass or prove that identity checks are useless. [SPF/GovTech advisory](https://www.police.gov.sg/Media-Hub/News/2026/05/20260515_joint_advisory_on_job_scams_involving_the_impersonation)

The proposed product asks: **does this person represent this business for this action, and does the contact behaviour fit the claimed purpose?** A company record, recruiter account, listing and contact attempt become an evidence packet whose connections can be checked and challenged.

Even a genuine authorized recruiter can behave dishonestly. Authority verification therefore needs action context and a route for complaints. It can reduce uncertainty without certifying that every job is safe.

This is my wedge hypothesis. The public evidence identifies a failure mode; it does not prove a new vendor can resolve it cheaply or better than the customer.

---

## 06 · Intervene before the first harmful contact

### Sell a useful decision inside an existing queue

My proposed first customer is a job or worker marketplace with a manual employer-review queue, permissioned contact metadata and confirmed outcomes. The operating sponsor is its trust or operations lead; a product or business owner must also recognize the economic value.

<figure><img style="background:transparent;" src="/images/agent-trust/wedge.svg" alt="Proposed employer onboarding and representative-change workflow: link authority, evaluate listing or contact, limit reach or review, and return decisions and appeals." width="600" height="532"><figcaption>Proposed workflow, not a product trial. The platform retains the decision and enforcement authority.</figcaption></figure>

Start at employer onboarding, representative changes, listing publication and first outbound contact. Return evidence and a proposed allow, limit, review or checkpoint action. Put the case in the customer’s existing workflow, with a reason and an appeal route.

I would exclude candidate employability judgments and private third-party message surveillance. The product needs a permissioned place to act before exposure, rather than an unbounded promise to police the internet.

If the buyer cannot observe outcomes or act early enough, this wedge fails before the model matters.

---

## 07 · Choose the checkpoint for the missing fact

### More identification is not always more useful evidence

<figure><img src="/images/agent-trust/right-checkpoint.png" alt="A gatekeeper chooses a call to a company administrator from among authentication and proof-of-human checks." style="max-width:600px;width:100%;height:auto;background:transparent;"><figcaption>Choose the check that answers the missing question. Generated watercolor metaphor for a proposed design option, not tested efficacy.</figcaption></figure>

Device attestation can help establish that a request came from an expected app and device environment. Google recommends combining Play Integrity with other signals and observing effects before enforcement. Apple’s App Attest uses an app-instance key and server validation. Neither certifies a recruiter’s authority. [Google documentation](https://developer.android.com/google/play/integrity/overview), [Apple documentation](https://developer.apple.com/documentation/devicecheck/establishing-your-app-s-integrity)

Passkeys strengthen account authentication; World ID targets proof of human. A scammer can authenticate to their own account, and a real human can participate in fraud. These controls answer useful but narrower questions. [FIDO](https://fidoalliance.org/passkeys/), [World whitepaper](https://whitepaper.world.org/achieving-proof-of-human)

For the proposed workflow, a known company administrator confirming a representative may answer a different question from a face check. Reauthentication may help when an established account changes control. These are design options to test, not proven defenses in this report.

I would choose the least burdensome check that resolves the uncertainty, measure legitimate-user abandonment and keep a human route for exceptions. Bier’s checkpoint recommendation is a starting pattern; categorical CAPTCHA obsolescence and near-bulletproof replacement are not established efficacy findings. [Bier](https://x.com/nikitabier/status/2116246313914479047)

---

## 08 · The authority link must stay inspectable

### Give reviewers evidence they can dispute

<figure><img src="/images/agent-trust/authority-link.png" alt="An investigator examines the broken connection between a real storefront, a person with a badge and a job-offer envelope." style="max-width:560px;width:100%;height:auto;background:transparent;"><figcaption>The business, person and offer can each look plausible while the connection is missing. Generated watercolor metaphor, not evidence of product performance.</figcaption></figure>

I would make each link explicit: what source supports the company’s existence, what supports the representative’s mandate, when it was checked, and which action it covers. Missing evidence should remain missing, rather than silently become a reassuring score.

Contact behaviour and reused infrastructure may add context. The Anansi researchers describe linked messages, domains and payment infrastructure in message-based job scams. Their collection differs from passive marketplace screening; it supplies a research lead, not a production recall benchmark. [Anansi preprint](https://arxiv.org/abs/2602.24223)

The difficult product work is handling ambiguity. Agencies delegate work; representatives move; small legitimate employers may lack polished records. A poisoned report or mistaken link can harm an innocent business. Appeals, source provenance and reversible limits belong in the initial design.

---

## 09 · The generic stack is crowded

### Compare against a competent incumbent

<figure><img src="/images/agent-trust/competitive-stack.svg" alt="Generic signals, vertical investigation workflows and customer-owned context overlap in the proposed product." style="max-width:600px;width:100%;height:auto;background:transparent;"><figcaption>Original conceptual comparison of the documented offerings discussed here. Overlap does not establish comparative efficacy.</figcaption></figure>

Stytch advertises device intelligence, risk decisions and agent monitoring. SEON documents email, phone, IP, device and scoring inputs. Castle connects client signals with backend decisions. Arkose and Fingerprint also market bot or agent defenses. These menus establish overlap; they do not establish comparable efficacy. [Stytch](https://stytch.com/fraud), [SEON](https://docs.seon.io/api-reference/fraud-api), [Castle](https://docs.castle.io/docs/integration-guide), [Arkose](https://www.arkoselabs.com/arkose-bot-manager), [Fingerprint](https://fingerprint.com/products/bot-detection/)

The vertical layer is crowded too. Persona offers business verification and workflows. Sift documents related-content investigation and bulk action. SEEK describes internal advertiser screening, while Australia’s job-scam fusion-cell report documents coordinated disruption. [Persona](https://help.withpersona.com/articles/3OGe9IwySJmDvXL2DOfV7N/), [Sift](https://siftscience.zendesk.com/hc/en-us/articles/1500007825722-Text-Clustering-for-Content-Integrity), [SEEK](https://au.seek.com/career-advice/article/ways-to-spot-a-job-scam), [NASC report](https://www.nasc.gov.au/system/files/nasc-job-scam-fusion-cell-final-report-2025.pdf)

My strongest bear case is that the platform owns the useful context and an incumbent already supplies the missing tools. The proposed authority workflow may be configuration work or a specialist investigation service, rather than a scalable company. The pilot must compare against those alternatives, not an empty baseline.

---

## 10 · A good-looking score can make a bad queue

### Rare events punish small false-positive rates

A score is meaningful only when its target is defined. Cloudflare’s documented bot score runs from **1 to 99**, with higher values more likely human; **zero means not computed**. It measures automation, not recruiter honesty. [Cloudflare score documentation](https://developers.cloudflare.com/bots/concepts/bot-score/)

<figure><img style="background:transparent;" src="/images/agent-trust/base-rates.svg" alt="Invented base-rate example: at 80 true flags, reducing the false-positive rate from 0.10% to 0.01% reduces expected false flags from 99.90 to 9.99." width="600" height="540"><figcaption>Original scenario arithmetic, not a classifier test. Green marks true flags; coral marks false flags. Assumptions and equation appear in the <a href="#card-17-evidence-and-model">model appendix</a>.</figcaption></figure>

In this example, precision rises from **44.47% to 88.90%** without changing recall. The difference is the burden placed on legitimate traffic. These are expected event counts; they do not equal the percentage of distinct employers denied. [Planning model](#card-17-evidence-and-model)

Measure harmful exposures, investigation time, good-employer approval, appeal reversals and useful agents wrongly blocked. A convincing dashboard of blocked requests is insufficient evidence of value.

---

## 11 · Prove incremental benefit without leaking the answer

### The evaluation is part of the product

<figure><img src="/images/agent-trust/evaluation-design.svg" alt="Decision-time inputs are separated from later outcomes, with held-out campaigns and sampled allowed traffic." style="max-width:600px;width:100%;height:auto;background:transparent;"><figcaption>Proposed evaluation design. Held-out campaigns and independent outcomes test incremental value; no pilot was run.</figcaption></figure>

The proposed comparison uses the same eligible traffic, decision time, review effort and legitimate-user friction budget as the customer’s tuned existing process. Future complaints and takedown outcomes must not leak into inputs used to replay an earlier decision.

Hold out later periods and whole employers or campaigns. Repeated templates from the same campaign should not make the system appear to generalize. Sample allowed traffic to estimate misses; a queue containing only flagged cases cannot reveal what passed undetected.

The primary proposed outcome is independently adjudicated harmful first-contact exposure per eligible contact. Record uncertainty, label delays and unresolved cases. Stratify by language, employer type, channel and account history. A statistics owner must choose sample size after measuring baseline rates and campaign clustering; this research establishes no statistical power.

A shadow study can show predictive lift and operating cost. It cannot by itself demonstrate prevented losses. Any live test should add approved protection rather than deliberately release known harm. If the study cannot distinguish useful improvement from noise, it has not passed.

These are proposed evaluation requirements, not measurements from a pilot. No customer integration or experiment was performed.

---

## 12 · Review labour decides the vendor economics

### Positive contribution is possible in the model

<figure><img style="background:transparent;" src="/images/agent-trust/vendor-economics.svg" alt="Invented monthly vendor scenarios compare fees and recurring costs: low 2,000 versus 3,567 dollars; base 5,000 versus 2,283; high 8,000 versus 1,633." width="600" height="595"><figcaption>Original USD planning scenarios. Review burden, support and fee vary together; these are economic cases, not probability bands. <a href="#card-17-evidence-and-model">Model inputs and equations</a></figcaption></figure>

At **100,000 scored events per customer-month**, assumed fees of **$2,000 / $5,000 / $8,000** produce recurring contributions of approximately **−$1,567 / $2,717 / $6,367**. None of these inputs is a quote or observed market price. [Planning model](#card-17-evidence-and-model)

The base contribution margin is **54.33%**, before central overhead. With assumed central costs of **$30,000 per month**, it takes **twelve identical base customers** to cover them. Actual staffing and support capacity may step upward as customers arrive. [Planning model](#card-17-evidence-and-model)

The cost boundary includes screening, enrichment, selected checkpoints, manual review, direct support and an incident reserve. It excludes tax, financing, bad debt, extra legal/security work and catastrophic liability beyond that reserve. This is contribution arithmetic, not an audited software gross margin.

---

## 13 · The expensive part can hide behind the API

### Price pressure and bespoke work compound

<figure><img src="/images/agent-trust/hidden-costs.svg" alt="Base recurring contribution is compared with fee, review and support shocks and their combined effect." style="max-width:600px;width:100%;height:auto;background:transparent;"><figcaption>Original sensitivity arithmetic in USD per customer-month; all inputs are invented. <a href="#card-17-evidence-and-model">Model assumptions</a></figcaption></figure>

In the base scenario, review share doubling reduces contribution margin to **37.67%**. Combining that with doubled support and a **20% fee reduction** leaves approximately **$333 per month**, or **8.33% contribution**. These are sensitivity calculations, not forecasts. [Planning model](#card-17-evidence-and-model)

Acquisition and onboarding matter separately. Assumed acquisition cost of **$10,000** plus **$1,800 onboarding** takes **4.34 months** to recover at base recurring contribution, assuming immediate steady billing and no churn or payment delay. Those assumptions are favourable. [Planning model](#card-17-evidence-and-model)

The public SEON Starter package displays **$699 per month for 2,500 checks**, with custom pricing above it. That is a scoped menu, not a marginal rate or a quote for this workflow. I have not extrapolated it into the model. [SEON pricing](https://seon.io/pricing/)

I would price the real integration, review work and support before building a proprietary signal stack. Defensibility would need to emerge from repeatable evidence assembly and better decisions, with permissioned outcomes. A growing pile of custom investigations may create a good service business while failing the software thesis.

---

## 14 · The buyer has a different equation

### A profitable vendor can sell an unattractive purchase

The platform captures review savings, buyer-borne harm reduction and documented business benefit, then pays the friction cost and the fee. Victims’ national losses are not automatically part of that benefit.

<figure><img style="background:transparent;" src="/images/agent-trust/buyer-economics.svg" alt="Invented buyer benefit of 1,500, 6,500 and 13,750 dollars per month versus a proposed 10,000-dollar continuation hurdle at a 5,000-dollar fee." width="600" height="552"><figcaption>Original buyer scenarios. Only the high case clears the proposed benefit hurdle; the base case fails. <a href="#card-17-evidence-and-model">Assumptions and equation</a></figcaption></figure>

The base case saves **160 review hours at $25/hour**, reduces a **$12,000 buyer-captured harm baseline by 25%**, and incurs **$500 friction cost**: **$6,500 benefit before a $5,000 fee**. That is **1.30×**, below my proposed **2× continuation hurdle**. [Planning model](#card-17-evidence-and-model)

Holding the other base inputs fixed, that hurdle requires a **$26,000 monthly buyer-captured harm baseline**, or a lower fee. Finance must validate that baseline without double-counting review savings. Social value is a reason to investigate; customer economics determines whether this buyer can sustain the company. [Planning model](#card-17-evidence-and-model)

---

## 15 · What the headline omits

### The missing denominator is reachable harm

<figure><img src="/images/agent-trust/pilot-contract.svg" alt="Reachable workflow, visible outcomes and permission to intervene are separate discovery gates." style="max-width:600px;width:100%;height:auto;background:transparent;"><figcaption>Original discovery framework: public harm totals do not establish permissioned, observable exposure inside a buyer’s workflow.</figcaption></figure>

No source here establishes how much LLMs lower the cost of a successful scam in the proposed workflow. Cheaper message generation may matter, but account access, distribution, cooperation and cash-out can still constrain success. I would not model a causal AI loss multiplier.

Regional evidence also has incompatible units. Indonesia reports **7,908 fake overseas-job advertisement contents removed during January–August 2026**; this counts content removals, not victims or software budgets. The Philippines advisory concerns fake overseas recruitment and licensing. Neither establishes transferability from a Singapore pilot. [Komdigi](https://portal.komdigi.go.id/kanal-publik/berita-kini/10526), [Philippine government advisory](https://pia.gov.ph/news/dmw-reiterates-warning-vs-fake-work-abroad-offers-on-social-media/)

US employment complaints and AI-related complaint information are separate dimensions; their overlap cannot establish that AI caused employment losses. [FBI IC3 report](https://www.ic3.gov/AnnualReport/Reports/2025_IC3Report.pdf)

The founder must discover how much harm begins inside the buyer’s reachable workflow, which outcomes become visible, and who can authorize an intervention. Public concern supplies none of those answers. Data permissions, retention, appeals and resistance to poisoned evidence are operating work, not details to defer until scale.

---

## 16 · A path that earns the next stage

### Invest in evidence before expanding the surface

<figure><img style="background:transparent;" src="/images/agent-trust/roadmap.svg" alt="Proposed months zero to twenty-four path: prove paid value, repeat with another buyer, productise shared work and expand only after local validation." width="600" height="532"><figcaption>Founder-selected planning sequence and gates, not a forecast. The calendar advances only when the evidence does. <a href="#card-17-evidence-and-model">Planning assumptions</a></figcaption></figure>

The founder’s first discovery target is **twelve interviews across at least four independent platforms**, leading to **two permissioned design partners** with named budget owners. Without those commitments, stop the product-build decision. [Proposed gates](#card-17-evidence-and-model)

The customer trust lead and an independent adjudicator then own the matched pilot. Proposed success means **at least 25% less harmful-contact exposure**, **no more than 0.5 percentage points lost good-employer approval**, and **at least 30% less total customer review time**. An inconclusive interval does not pass; the statistical plan must be chosen from actual baseline data. [Proposed gates](#card-17-evidence-and-model)

Finance and the founder should require **two paying pilots seeking renewal**, the **2× buyer-benefit hurdle**, **at least 50% recurring vendor contribution**, and **no more than 24 direct onboarding hours per client** at measured scope. These are chosen investment gates, not industry benchmarks. [Proposed gates](#card-17-evidence-and-model)

If incumbent configuration wins, use it. If work stays bespoke or outcomes remain invisible, narrow or stop. The ambition is safer access to real work; the company must earn its role in delivering it.

---

## 17 · Evidence and model

### A compact appendix for the decision

**Evidence boundary.** Public research checked for this edition on 3 November 2026. The seed post and reply came from a dated parent capture of the signed-in X thread; its operational estimates remain experiential. No employer-private information, customer interview, vendor trial, scoped quote or performance measurement supports this thesis. No paywalled contents were inferred.

| Claim | Status and direct basis |
|---|---|
| Signed identity excludes authorization and delegation | Draft scope, not final standard: [IETF](https://www.ietf.org/ietf-ftp/internet-drafts/draft-ietf-webbotauth-httpsig-protocol-01.html) |
| Job-scam harm remains material while declining | Reported counts/losses: [SPF annual](https://www.police.gov.sg/-/media/SPF/Advisories/Scams/Annual-Scam-and-Cybercrime-Brief-2025.pdf), [mid-year](https://isomer-user-content.by.gov.sg/537/a4a04eb7-0d38-4cd0-86da-cea81f214ff2/Mid-Year%20Scam%20and%20Cybercrime%20Brief%202026.pdf) |
| Agency existence does not settle representative authority | Specific impersonation advisory: [SPF/GovTech](https://www.police.gov.sg/Media-Hub/News/2026/05/20260515_joint_advisory_on_job_scams_involving_the_impersonation) |
| Generic and vertical workflows already have suppliers | Documented offerings, untested efficacy: [Stytch](https://stytch.com/fraud), [Persona](https://help.withpersona.com/articles/3OGe9IwySJmDvXL2DOfV7N/), [Sift](https://siftscience.zendesk.com/hc/en-us/articles/1500007825722-Text-Clustering-for-Content-Integrity), [SEEK](https://au.seek.com/career-advice/article/ways-to-spot-a-job-scam) |
| Authority plus contact context makes a company | Founder hypothesis; paid comparator study required |

**Provider disagreement.** Identity, humanness, automation and malicious intent have different targets. Vendor product claims do not resolve comparative performance. Bier’s CAPTCHA judgment and adaptive-challenge product menus establish opposing views, rather than a decisive efficacy test. His in-house preference strengthens the vendor bear case. Falling police totals contradict a simple “agents mean rising harm” premise. Removal counts, complaints and police cases cannot be summed into a market estimate.

**Original planning model, USD.** Every input in the following calculations is invented, not measured or quoted. Each customer-month contains 100,000 billable risk events, not distinct people. Common costs: screening 100,000 × $0.002; enrichment 2,000 × $0.10; selected checkpoints 200 × $1; reviews × four minutes ÷ sixty × $25/hour; support hours × $75; incident reserve 5% of fee.

| Case | Fee | Review share | Support h | Onboarding h | Recurring contribution |
|---|---:|---:|---:|---:|---:|
| Low | $2,000 | 1.0% | 16 | 40 | −$1,566.67 |
| Base | $5,000 | 0.5% | 8 | 24 | $2,716.67 |
| High | $8,000 | 0.2% | 4 | 16 | $6,366.67 |

Contribution = fee − all common costs above. Recurring break-even fee = costs excluding reserve ÷ 0.95: low/base/high $3,649.12 / $2,140.35 / $1,298.25. Base contribution $2,716.67 ÷ $5,000 = 54.33%. Central overhead is assumed $30,000/month; ceiling($30,000 ÷ $2,716.67) = twelve base customers. This excludes tax, financing, FX, bad debt, extra legal/security costs and catastrophic liability beyond the reserve.

Onboarding costs hours × $75. Acquisition costs an assumed $10,000/customer. Base payback = ($10,000 + 24 × $75) ÷ $2,716.67 = 4.34 months, with immediate steady billing, no churn and no delayed collection. The reserve is not insurance or a maximum liability.

| Base sensitivity | Contribution/month | Margin |
|---|---:|---:|
| Fee −20% | $1,766.67 | 44.17% |
| Review share doubles | $1,883.33 | 37.67% |
| Support doubles | $2,116.67 | 42.33% |
| All three together | $333.33 | 8.33% |

Each extra hundred four-minute reviews costs $166.67. At the base fee and support load, recurring contribution reaches zero near 2.13% review share. Doubled screening cost subtracts another $200/month.

**Buyer equation:** benefit before fee = net review hours saved × loaded hourly cost + incremental reduction × buyer-captured harm baseline − incremental friction cost. All buyer cases assume $25/hour and a $5,000 fee.

| Buyer case | Hours saved | Harm baseline | Reduction | Friction cost | Benefit before fee |
|---|---:|---:|---:|---:|---:|
| Low | 80 | $5,000 | 10% | $1,000 | $1,500 |
| Base | 160 | $12,000 | 25% | $500 | $6,500 |
| High | 240 | $20,000 | 40% | $250 | $13,750 |

The proposed benefit hurdle is twice the fee. At base hours, friction and reduction: ($10,000 − $4,000 + $500) ÷ 25% = $26,000 required buyer-captured monthly harm baseline. Count only finance-approved buyer benefit; avoid double-counting review savings and national victim losses.

**Base-rate example:** 100,000 events × 0.1% assumed abuse × 80% recall = 80 true flags. False flags = 99,900 legitimate events × false-positive rate. Rates of 0.10% and 0.01% produce 99.90 and 9.99 expected false flags. Precision = true flags ÷ all flags = 44.47% and 88.90%. These are fractional expected counts, not observed results.

**Proposed gates and ownership.** Founder: within thirty days, twelve interviews across at least four platforms; require two permissioned partners and budget owners. Technical lead/customer data owner: define consented fields, source rights, deletion, event timing and scoped quotes. Trust lead/independent adjudicator/statistics owner: matched comparison, sampled allowed traffic, campaign/time holdouts, uncertainty and pre-registered sample plan. Proposed ninety-day targets: ≥25% less harmful-contact exposure; ≤0.5 percentage points lost good-employer approval; ≥30% fewer total customer review hours. Missing outcomes or inconclusive evidence do not pass. Finance/founder: two paying pilots seeking renewal, ≥2× buyer benefit/fee, ≥50% recurring contribution and ≤24 direct onboarding hours/client.

**Conditional attack plan.** Months 0–3 establish access, comparator and paid evidence; months 4–6 repeat with another independent customer; months 6–12 productise evidence assembly, appeals and drift monitoring; months 12–24 expand one adjacent country or segment only after local sources, language validation, data review and paid demand. These are proposed allocations, not completion claims.

**Falsifiers and next collection.** Stop if the buyer cannot supply permissioned outcome data, intervene before harm, capture sufficient benefit or outperform a competent incumbent at matched friction. Stop expansion if integrations and investigation remain bespoke. The founder’s next deliverable is a consented access memo and scoped paid-pilot proposals naming the comparator, independent adjudicator, observable exposure, costs and sample plan. No outreach, purchase, enforcement or pilot was performed by this research.
