+++
title = "Pipeline in a Person"
slug = "pipeline-in-a-person"
aliases = ["/research/pipeline-in-a-person/"]
description = "Can one technical founder build a valuable therapeutic asset with AI and outsourced laboratories? The real opportunity, the evidence gaps, and a staged path to proof."
date = 2026-10-30
layout = "research-swipe"
body_class = "research-swipe"
main_class = "main-research-swipe"

[fieldbook]
theme = "biotech"
+++

# PIPELINE<br>IN A PERSON

### A small company can rent a laboratory. Can it earn the right to build a medicine?

**A Fieldbook for founders and investors · 30 October 2026**

<p style="grid-column:1 / -1">I find the possibility difficult to ignore: a technical founder, working with a few exceptional scientists and laboratories around the world, might create something that changes the course of a rare disease.</p>

<p style="grid-column:1 / -1">The founder would own the question, the experiments, the evidence and the rights. Most of the physical infrastructure would belong to somebody else.</p>

<figure style="grid-column:1 / -1;margin:0"><img src="/images/pipeline-in-a-person/distributed-lab.svg" alt="A founder and scientific lead coordinate design, contract laboratories and independent evidence review; the output is a transferable asset." style="max-width:680px;background:transparent"><figcaption>One decision centre, several specialist partners. Outsourcing changes who owns the equipment; it does not remove scientific responsibility. Conceptual diagram.</figcaption></figure>

<blockquote style="grid-column:1 / -1"><p>My thesis: a lean, expert-led therapeutic company is plausible. A dependable shortcut from twenty AI designs to a lucrative mouse-data exit is not established.</p></blockquote>

---

## 01 · What is becoming possible

### The company can be smaller than its laboratory

A therapeutic asset is more than a molecule. It is a specific candidate, a proposed medical use, the evidence supporting it, and rights another company can acquire or license.

The attractive change is that a founder can buy pieces of the discovery process. Commercial laboratories offer protein production and measurements of how molecules interact. GenScript, for example, sells surface plasmon resonance and biolayer interferometry services: instruments that help measure binding. Availability is real; project cost and scientific adequacy still require a scoped proposal. [GenScript service menu](https://www.genscript.com/bli-spr-real-time-affinity-measurement-services.html)

AI adds another piece: a way to generate and rank molecular candidates. That combination could make it cheaper to ask a narrow biological question before building a large organisation.

I would pursue that opening as a **small scientific company**, with a technical founder and an accountable translational scientist—the person connecting laboratory findings to a plausible medicine. “Pipeline in a person” describes concentrated coordination. It does not describe the total expertise required.

---

## 02 · The seductive version breaks

### Three shortcuts that do not survive scrutiny

The original proposition makes a powerful promise: choose a single-gene disease, generate binders, buy physical validation, then sell the asset. Three substitutions make it sound easier than it is.

**A known cause becomes a solved intervention.** Knowing which gene causes disease does not establish whether a particular treatment can reverse damage, reach the relevant tissue, or avoid harmful effects.

**Binding becomes therapeutic function.** A molecule can attach beautifully to a protein without changing the process that makes a patient ill. Sometimes blocking that protein is exactly the wrong action.

**A positive experiment becomes a buyer.** Buyers also need differentiation, reproducibility, rights, and a credible development path. A report carrying a respected laboratory’s name cannot supply those automatically.

Human genetics remains useful. A 2024 retrospective study estimated **2.6 times greater clinical-development success** for mechanisms with genetic support. That is a relative association across studied programmes, varying by phase and therapeutic area. It is neither certainty nor a success probability for a new founder. [Minikel and colleagues](https://pmc.ncbi.nlm.nih.gov/articles/PMC11096124/)

The opening survives. The claim of zero biological risk does not.

---

## 03 · Match the molecule to the job

### A missing brake is not the same as a missing engine

Proteins perform different jobs: they cut other molecules, carry signals, build structures, or hold other proteins together. A binder is a molecule that attaches to a target. Attachment matters only if it changes the right job in the right direction.

Consider hereditary angioedema associated with deficient or dysfunctional C1 inhibitor. Loss of normal regulation permits excess activity in a blood-borne pathway. Lanadelumab, an approved antibody, inhibits plasma kallikrein and reduces excess bradykinin generation. It acts elsewhere in the pathway rather than simply binding the missing inhibitor. [FDA mechanism description, historical label](https://www.accessdata.fda.gov/drugsatfda_docs/label/2022/761090s003lbl.pdf)

<figure><img src="/images/pipeline-in-a-person/mechanism.svg" alt="C1 inhibitor normally restrains kallikrein. Loss of restraint increases bradykinin and swelling; an inhibitory antibody can act on kallikrein downstream." style="max-width:680px;background:transparent"><figcaption>Simplified pathway, reconstructed from the FDA label. A therapeutic strategy must specify which activity changes, not merely which protein is bound.</figcaption></figure>

This example validates a mechanism, not an available startup niche: an approved incumbent already occupies it.

There are also sophisticated ways to restore missing function. Emicizumab bridges activated factor IX and factor X to substitute for a role of missing activated factor VIII in haemophilia A. That engineered two-target action is much more specific than “make a binder.” [FDA mechanism description, historical label](https://www.accessdata.fda.gov/drugsatfda_docs/label/2021/761083s011lbl.pdf)

---

## 04 · What AI has actually proved

### The design frontier has moved; the finish line has not

I would not dismiss computational protein design as a beautiful-screen-image business. There is physical evidence.

The BindCraft study tested designs across **12 targets**, reporting experimental binding success ranging from **10% to 100%**, with a mean of **46.3%**. Affinities were predominantly nanomolar. The researchers also demonstrated selected functional effects, including reduced allergen interaction with patient-derived antibodies. [Original study](https://pmc.ncbi.nlm.nih.gov/articles/PMC12507698/)

That is an encouraging result for the studied targets and workflows. It does not establish that twenty designs against an arbitrary disease target will produce two or three sub-nanomolar therapeutic leads. Target accessibility, molecular format and the definition of a successful experiment matter.

A nanobody is a compact antibody binding domain. A designed miniprotein is another kind of small protein. Neither label supplies adequate exposure, low immune response or a manufacturable product.

My interpretation is that AI has made candidate generation a more credible starting point. A founder still has to build the evidence that connects a candidate to a useful treatment. I would measure progress in **reproducible functional leads per dollar and month**, rather than sequences generated.

---

## 05 · The tool stack has an ownership stack

### Commercial rights start before the first design

The model’s name is not a licence. Code, weights, outputs, hosted access and dependencies can carry different terms. As checked on 30 October 2026:

| Tool or artifact | What the owning source says | Founder implication |
|---|---|---|
| RFdiffusion | BSD licence explicitly covers code and referenced downloadable weights | Permissive terms are useful; still audit dependencies and patent rights |
| AlphaFold 3 | Official README identifies a commercial cloud route; public/local output terms restrict commercial use | Choose the authorised access route before using outputs commercially |
| `biohub/esm3-sm-open-v1` | Current model card identifies MIT licensing | Record this exact artifact/version; do not extrapolate to every ESM service |

Sources: [RFdiffusion licence](https://github.com/RosettaCommons/RFdiffusion/blob/main/LICENSE), [AF3 README](https://github.com/google-deepmind/alphafold3), [AF3 output terms](https://github.com/google-deepmind/alphafold3/blob/main/OUTPUT_TERMS_OF_USE.md), [named ESM3 model card](https://huggingface.co/biohub/esm3-sm-open-v1), [linked ESM licence](https://github.com/Biohub/esm/blob/main/LICENSE.md).

I would retain an audit trail of model version, input provenance, access terms and human design decisions. Open model access is not freedom to operate: another party may still hold relevant patents, and outsourced work needs clear ownership terms.

A language model can help organise this work. Scientific and legal accountability remain with the people running the programme.

---

## 06 · The evidence ladder

### Every rung answers a different question

The early funnel should be designed backwards from the uncertainty a buyer would need resolved.

<figure><img src="/images/pipeline-in-a-person/evidence-ladder.svg" alt="Evidence ladder: plausible design, measured binding, relevant function, adequate exposure, meaningful disease evidence, then reproducible transferable package. Every stage can stop the program." style="max-width:680px;background:transparent"><figcaption>A proposed decision framework, not a guaranteed sequence or universal regulatory checklist. Each rung can invalidate the candidate.</figcaption></figure>

Binding assays ask whether and how molecules attach. Functional experiments ask whether they change a relevant biological activity. Exposure work asks whether enough active molecule reaches and remains at the place it must work. Disease evidence asks whether that produces an outcome that matters.

A final transfer test asks whether someone else can reproduce the result from the materials, methods and raw data supplied. These questions can overlap and send the programme back to an earlier stage.

A **sub-nanomolar dissociation constant**, written K<sub>D</sub> &lt; 1 nM, indicates tight binding under the measurement conditions. It is not a universal threshold for therapeutic value. The relevant potency, selectivity and exposure requirements depend on the mechanism.

I would select the next experiment by its ability to change the decision. Repeating an attractive binding result is poor use of capital if function is the unresolved question.

---

## 07 · Biology as a service, with state

### The purchase order needs a scientific acceptance test

The API metaphor is useful for finding capacity. It becomes misleading when it suggests interchangeable, predictable calls.

For each outsourced task I would want three agreements: what material and method are being supplied; what result constitutes a technically valid experiment; and what conclusion that result can support. A failed biological hypothesis can emerge from a perfectly executed service.

The founder and scientific lead should agree on comparator choice, quality checks, repeat policy and raw-data delivery before work begins. Contracts should address samples, methods, intellectual property, publication, subcontracting and the ability to transfer work to another laboratory.

The minimum team is a **coverage map**, not a headcount target: disease biology, protein engineering, translational pharmacology, experimental statistics, and IP/contracts all need named owners. Some can be part-time specialists; some roles may overlap.

The founder’s engineering advantage is real here: versioning materials, tracing results to decisions, tracking exceptions and preventing silent scope changes. It compounds scientific judgment. It cannot replace it.

---

## 08 · A mouse is evidence, not an exit certificate

### Ask what the model can establish about a human medicine

A disease model is useful only for the question it represents. A result can depend on the species, the engineered disease, the measured endpoint, or exposure that would be impractical in people.

I would ask an independent reviewer whether the model, comparator and analysis could distinguish a meaningful biological effect from a misleading one. Randomisation, blinding, justified sample size and uncertainty reporting are basic design issues, not optional decoration around a positive graph. [NC3Rs design guidance](https://nc3rs.org.uk/3rs-resources/key-elements-well-designed-experiment)

The regulatory direction also complicates the original mouse-first story. FDA is advancing human-relevant alternatives; its checked monoclonal-antibody safety guidance remains **draft, not for implementation**, and concerns particular nonclinical safety questions. That is not a blanket waiver or a claim that any cell assay replaces disease evidence. [FDA draft status and scope](https://www.fda.gov/regulatory-information/search-fda-guidance-documents/monoclonal-antibodies-streamlined-nonclinical-safety-studies), [April 2026 progress report](https://www.fda.gov/news-events/press-announcements/fda-achieves-year-1-goals-reducing-animal-testing-drug-development)

Exploratory efficacy, a development candidate, and an investigational-new-drug application package are different milestones. This Fieldbook proposes an early evidence programme; it does not price or promise the complete package needed to begin human trials.

---

## 09 · Budget for learning, including failure

### These are cash envelopes to interrogate, not laboratory quotations

I could not validate the original **$15,000–$35,000 in-vitro** and **$40,000–$80,000 mouse-study** packages as complete, transferable market prices. They might purchase scoped work in some circumstances. They are not a supported end-to-end budget.

Here is an original allocation model for a capped early research programme. The columns are **illustrative low/base/high planning envelopes**, not cost estimates for a selected target. All amounts are USD thousands.

<figure><img src="/images/pipeline-in-a-person/budget.svg" alt="Illustrative research cash allocations: narrow 225 thousand dollars, base 600 thousand, rework-heavy 1.5 million. Bars begin at zero; these are scenarios, not quotes." style="max-width:680px;background:transparent"><figcaption>Original scenario model, 30 October 2026. The high case is not a ceiling; difficult programmes can exceed it. Underlying allocations follow.</figcaption></figure>

| Allocation, $000 | Low | Base | High |
|---|---:|---:|---:|
| Scientific leadership and programme management | 40 | 100 | 220 |
| Design, synthesis, expression and quality checks | 30 | 70 | 180 |
| Functional assays and independent repeats | 40 | 110 | 260 |
| Exposure and fit-for-purpose disease evidence | 50 | 150 | 400 |
| IP, contracts and diligence preparation | 20 | 50 | 100 |
| Failure, rework and contingency reserve | 45 | 120 | 340 |
| **Total** | **225** | **600** | **1,500** |

These envelopes exclude founder salary, taxes, financing costs, full clinical-entry manufacturing/toxicology work and trials. Early stopping spends less. None guarantees a usable lead. Replace every row with scoped bids before committing capital.

---

## 10 · What the cheap headline omits

### A component price is not the price of an answer

Twist advertises gene fragments from **$0.07 per base pair** and clonal genes from **$0.09**, with scope and minimum-price conditions. Those are DNA products. They do not include the chain of expressed protein, reliable functional experiments, exposure and disease evidence. [Twist menu](https://www.twistbioscience.com/products/genes)

ProteoGenix illustrates a subtler trap: the checked page body advertises antibody production from **$100**, while the footnote ties that price to **7,000 antibodies produced in parallel**. Its page title still says $296. Neither headline prices a twenty-candidate therapeutic campaign. [Service page and footnote](https://us.proteogenix.science/custom-antibody/recombinant-antibody-production-services/)

Before comparing quotes, normalise the scope: quantities and quality; failed-expression policy; assay development versus routine measurement; controls and repeat runs; raw data; sample shipping; timelines; transfer rights; and what remains excluded.

The sensitivity is straightforward. More design rounds increase production and assay spend. A method that does not transfer consumes both cash and calendar time. A lead with inadequate exposure can require molecular redesign and renewed validation.

I would seek two comparable written bids for the next decision, plus a funded repeat. A low starting price matters only if the resulting work answers the programme’s question.

---

## 11 · The strongest bear case

### You can buy every task and still buy the wrong programme

Imagine the founder executes flawlessly. Sequences arrive. Proteins are made. Binding is excellent. A disease-model graph moves in the desired direction.

Then diligence reveals the problem: the relevant human tissue is inaccessible, the effect requires impractical exposure, the comparator was weak, the molecule aggregates, the patent position is narrow, or an incumbent already delivers the desired benefit more conveniently.

None of those failures requires an incompetent CRO. They can follow from a bad initial product hypothesis.

The company also has a concentration problem. One founder can become the bottleneck for contracts, scientific interpretation, fundraising and vendor coordination. A single-asset strategy concentrates technical and financing risk; generating many similar designs does not diversify a mistaken mechanism.

My answer is to pay for contradiction early. A retained scientific lead must have authority to stop the work. An independent reviewer should see negative findings and raw data. The programme should have an explicit capital cap and a predefined reason to abandon it.

That discipline may produce fewer companies. It should produce better reasons to build the ones that remain.

---

## 12 · Choose a wedge, not an orphan label

### The first product is a testable improvement

I would screen for an extracellular **inhibitory mechanism** with strong human support, a quantitative functional readout, accessible exposure, and a specific advantage over the best available alternative. This is a hypothesis about tractability, not a validated commercial opening.

<figure><img src="/images/pipeline-in-a-person/wedge.svg" alt="Proposed target gates: right mechanism, measurable function, meaningful differentiation and transferable rights. Failure of any gate stops synthesis." style="max-width:680px;background:transparent"><figcaption>Proposed screening gates. Passing these earns a feasibility experiment, not a therapeutic claim.</figcaption></figure>

“Rare” is not enough. US orphan designation generally concerns conditions affecting fewer than **200,000** people, with an alternative cost-recovery route; it is separate from approval. The original twenty-thousand-patient rule is a founder’s arbitrary filter, not a regulatory definition. [FDA designation framework](https://www.fda.gov/industry/medical-products-rare-diseases-and-conditions/designating-orphan-product-drugs-and-biological-products)

Hereditary angioedema offers an example of downstream inhibition, but also an approved competitor. Haemophilia A shows functional substitution can work, but requires sophisticated molecular action. A missing enzyme may call for replacement rather than another inhibitor. These are mechanism lessons, not a disease shortlist.

**Disproof:** if an expert cannot connect the proposed modality to a measurable, clinically relevant improvement over a named comparator, I would stop before ordering candidates. No target has passed that test in this research.

---

## 13 · Where the company can earn its place

### Models and laboratories are suppliers; differentiation is the business

A founder competes with more than other virtual biotechs.

| Alternative | What it already brings | What an entrant must add |
|---|---|---|
| Approved therapy and its developer | Human evidence and an established product | A meaningful advantage for a defined patient group |
| Academic programme or spinout | Mechanistic depth, assays and sometimes exclusive IP | A better development path or partnership |
| Protein-design company | Design capability and experimental learning | Target-specific insight or access it lacks |
| CRO-led discovery service | Execution capacity and established workflows | Ownership of the product decision and resulting asset |
| Better-funded biotech | Specialists, runway and parallel programmes | A narrower question it can answer unusually well |

For me, the promising advantage is a combination: unusually good disease access, a clear product hypothesis, an assay that predicts something useful, and disciplined iteration. None is established merely by using frontier models.

If the founder has no disease advantage but discovers a repeatable bottleneck in experiment traceability or procurement, that may suggest a different software business. It would need its own customer validation. Building an asset company is not automatically the best way to monetise engineering skill.

---

## 14 · What buyers actually buy

### Real transactions prove possibility, not a founder’s expected return

There are buyers for early assets. The important question is what came with the asset.

| Transaction | Evidence stage and package at announcement | Disclosed economics |
|---|---|---|
| AbbVie / Mitokinin, 2023 | Discovery-stage PINK1 programme; prior collaboration; company founded in 2013 | $110m at closing; up to $545m further milestones, plus royalties |
| Novartis / DTx Pharma, 2023 | Preclinical programmes plus proprietary RNA-delivery platform | Price omitted here: gross cash consideration and net acquired-cash accounting differ |
| Sanofi / Dren DR-0201, 2025 | Antibody in ongoing phase 1 studies, with preclinical and early clinical evidence | $600m upfront; up to $1.3bn future milestones |

Sources: [AbbVie buyer release](https://news.abbvie.com/2023-10-05-AbbVie-Exercises-Exclusive-Right-to-Acquire-Mitokinin,-Further-Strengthening-Neuroscience-Pipeline), [Novartis SEC filing, note 3](https://www.sec.gov/Archives/edgar/data/1114448/000137036823000068/a231024-99_2.htm), [Sanofi buyer release](https://www.sanofi.com/en/media-room/press-releases/2025/2025-03-20-06-00-00-3045945).

These are selected winners with different modalities, teams and stages. They supply no denominator of unsold programmes, no reliable time-to-sale estimate and no valuation for one new binder. Milestones are conditional, not cash in the bank.

I would begin with relevant biopharma partners. The checked evidence does not justify underwriting frontier AI labs as the default acquirer of a solo founder’s mouse-validated asset.

---

## 15 · The economics of an option

### Stop/go decisions matter more than the biggest exit headline

To make the risk visible, consider a deliberately invented staged model. These inputs are **stress-test assumptions, not measured success rates or vendor prices**. It is separate from the full-package budget envelopes.

Spend $60,000 initially. Assume a 30% chance of earning a $120,000 follow-on experiment. Of those successes, assume 25% earn $300,000 of further translational work. Of that group, assume 20% eventually secure a transaction returning $5m net upfront cash to the project.

<figure><img src="/images/pipeline-in-a-person/option-tree.svg" alt="Invented sequential gate probabilities: 30 percent function, then 25 percent translation, then 20 percent sale. Joint sale probability is 1.5 percent; expected spend is 118,500 dollars." style="max-width:680px;background:transparent"><figcaption>Illustrative decision tree. Conditional probabilities multiply along this assumed path; they are not calibrated biotech base rates.</figcaption></figure>

Expected research spend is $60k + 0.30 × $120k + 0.30 × 0.25 × $300k = **$118.5k**. Joint transaction probability is 0.30 × 0.25 × 0.20 = **1.5%**. Expected upfront proceeds are **$75k**, leaving **−$43.5k** before omitted costs and the time value of money.

This is not a forecast of failure. It shows how an impressive conditional payout can coexist with unattractive expected economics. The real decision requires target-specific evidence to replace these invented inputs.

---

## 16 · The sensitivity that should change your mind

### Price, probability and capital are different uncertainties

Holding the illustrative expected spend of $118.5k fixed, what joint probability of receiving net upfront cash would break even?

| Net upfront if sold, assumed | Break-even joint probability |
|---|---:|
| $1m | 11.85% |
| $5m | 2.37% |
| $10m | 1.185% |

Equation: **break-even probability = expected spend ÷ net upfront proceeds**. These payout values are sensitivity inputs, not valuation estimates. The calculation excludes royalties, discounting, founder pay and tax. Changing gate probabilities would also change expected spend, so this table holds it fixed only to isolate payout sensitivity.

Expected spend is not cash runway. A programme that passes both research gates in the preceding example spends **$480k** before a transaction, and may still never sell. A founder needs financing for the successful path and a repeat reserve, not just the probability-weighted average.

I would finance the next resolved uncertainty: capped personal capital for feasibility, then a suitable foundation, specialist investor or partner if the evidence earns it. Those are proposed funding routes; eligibility, terms and availability have not been checked. I would not depend on an unawarded grant to finish committed work.

Nor are twenty designs twenty independent lottery tickets. They may share the same incorrect mechanism, inaccessible binding site or assay artifact. The binding yield from a published study cannot be substituted for the probability of licensing a therapeutic.

---

## 17 · Protect the evidence you create

### A clean data room begins with the first contract

A useful virtual data room lets a reviewer trace each claim back to a material, method and result. I would include candidate provenance; batch and quality records; methods and raw data; analysis decisions; failed experiments; comparator evidence; exposure findings; and the remaining development plan.

The rights folder is equally important: consultant and CRO assignments, material-transfer restrictions, model/access terms, patent work and the ability to transfer the programme. These are proposed diligence requirements, not a universal buyer checklist.

A US provisional application is **not examined and does not itself become a granted patent**. Preserving its priority benefit requires sufficient disclosure and timely follow-on filing, generally within twelve months. [USPTO filing explanation](https://www.uspto.gov/patents/basics/apply)

Patentability and freedom to operate ask different questions. Owning a potentially patentable improvement does not automatically clear other parties’ rights. AI use also does not remove inventorship analysis; the USPTO’s current resource page points to November 2025 guidance applying the same legal standard to AI-assisted inventions. [USPTO current guidance](https://www.uspto.gov/initiatives/artificial-intelligence/artificial-intelligence-resources)

I would resolve these issues with qualified counsel before assuming the package is transferable or publishing enabling details.

---

## 18 · A 12–24 month path of attack

### Earn each increment of capital

This is a proposed sequence for reaching a decision-quality early evidence package. It is not a timeline guarantee, and a negative result should end it early.

<figure><img src="/images/pipeline-in-a-person/roadmap.svg" alt="Proposed roadmap: months 0–2 choose and price the question; 2–6 test function; 6–12 test exposure and relevance; 12–24 reproduce and prepare partner diligence. Stop gates separate phases." style="max-width:680px;background:transparent"><figcaption>A proposed development sequence. Methods, access, contracting and failed iterations can extend the calendar.</figcaption></figure>

**Months 0–2: choose and price the question.** Founder and retained scientific lead compare three target-product profiles, review incumbents and rights, and obtain comparable bids. Continue only with a measurable differentiation claim and a funded next gate.

**Months 2–6: establish function.** The scientific lead owns a benchmarked design–test loop. Continue only when a technically valid result changes the relevant function and survives a predefined repeat criterion. Binding alone does not release the next tranche.

**Months 6–12: establish relevance.** A translational specialist selects fit-for-purpose exposure and disease-evidence work. Continue only if the intended product remains plausible at relevant exposure and against the chosen comparator.

**Months 12–24: test transferability.** Independent reproduction, rights review and diligence challenge the package. A partner discussion, financing decision or termination is an acceptable outcome. Sale is not a scheduled milestone.

---

## 19 · The first thirty days

### Buy an informed no before an expensive maybe

I would make the first month a feasibility project. No synthesis or animal work needs to begin to answer its most important questions.

The founder drafts three one-page target-product profiles: patient subgroup, mechanism, modality, best comparator, intended advantage, measurable readout and plausible buyer. A retained disease/translational scientist challenges each one.

For the strongest candidate, obtain two scoped assay-feasibility proposals, an initial IP/contracts assessment, and feedback from relevant development or partnering specialists. These are future actions; no such conversations or quotations were obtained for this Fieldbook.

The deliverable is one decision memo with a named scientific owner, a capped next-stage budget, a repeat reserve, and a test that could kill the programme. A useful metric is comparator-relative functional improvement under a prespecified acceptance criterion; the actual threshold must come from the selected mechanism and expert review.

**Stop** if the mechanism requires the wrong modality, the readout cannot distinguish success from artifact, rights cannot transfer, no credible advantage exists, or the next gate cannot be funded with reserve.

My current decision: fund this feasibility work before funding a therapeutic company. The ambition is a medicine. The immediate product is a trustworthy reason to take the next step.

---

## 20 · Evidence, assumptions and open work

### A compact research appendix

**Evidence boundary.** Research checked 30 October 2026, with a US-oriented regulatory lens. No specific target, vendor quote, patent landscape, grant eligibility, buyer appetite or clinical-entry plan was validated. Selected public deals cannot establish sale probability. No outreach, purchase, grant application, filing or experiment was performed.

| Material claim | Status | Direct evidence or model |
|---|---|---|
| AI can generate experimental binders | Demonstrated for studied workflows; not therapeutic yield | [BindCraft](https://pmc.ncbi.nlm.nih.gov/articles/PMC12507698/) |
| Human genetics helps target selection | Retrospective relative association; not certainty | [Minikel et al.](https://pmc.ncbi.nlm.nih.gov/articles/PMC11096124/) |
| Outsourced binding measurements exist | Vendor offering, not proof of project success | [GenScript](https://www.genscript.com/bli-spr-real-time-affinity-measurement-services.html) |
| Rare disease remains a development programme | Regulatory guidance, not a universal study list | [FDA rare-disease guidance](https://www.fda.gov/media/119757/download) |
| Early-stage acquisition is possible | Selected transactions; missing failure denominator | [AbbVie](https://news.abbvie.com/2023-10-05-AbbVie-Exercises-Exclusive-Right-to-Acquire-Mitokinin,-Further-Strengthening-Neuroscience-Pipeline), [Novartis filing](https://www.sec.gov/Archives/edgar/data/1114448/000137036823000068/a231024-99_2.htm) |
| Small expert-led wedge can work | Founder hypothesis | Mechanism, function, differentiation and rights gates on card 12 |
| Cash envelopes and option returns | Original scenarios; no inferred market prices | Allocations on card 09; equations on cards 15–16 |

**Disagreement log.** The supplied playbook’s zero-risk biology, universal sub-nanomolar milestone, all-in budgets and routine exit expectation were rejected or left unverified. Vendor starting prices differ by scope; the ProteoGenix title/body mismatch is disclosed. Model licences are artifact- and access-specific. Historical drug labels support mechanism only; current dosing and indications are not asserted.

**Public/private boundary.** This investigation uses public original research, regulators, owning licences, service menus, buyer announcements and a filing. It does not infer private CRO quotes, paid database contents or unpublished buyer requirements. Open research copies were checked through EuropePMC when publisher/PMC browser access was restricted. No access controls were bypassed.

**Falsification and next collection.** The scientific lead must reject an incoherent intervention; assay review must reject an uninformative endpoint; competing-product review must reject an undifferentiated candidate; counsel must challenge rights; comparable bids must replace cost allocations. The thirty-day feasibility memo owns these checks.

I remain interested because the company can be unusually small. I would proceed only when its evidence becomes unusually strong.
