+++
title = "A Bookshelf That Argues Back"
slug = "a-bookshelf-that-argues-back"
aliases = ["/research/ai-advisory-bookshelf/", "/learning/ai-advisory-bookshelf/"]
description = "A cited advisory bookshelf inside your existing AI sounds useful. The harder question is whether it deserves a company—or a small, carefully bounded side project."
date = 2026-11-03
layout = "research-swipe"
body_class = "research-swipe"
main_class = "main-research-swipe"
+++

# A BOOKSHELF THAT ARGUES BACK

<div style="grid-column: 1 / -1; width: 100%; min-width: 0;">
<p style="font-size: max(17px, 1rem); line-height: 1.58;"><strong>A founder’s Fieldbook · 3 November 2026 · Seah Ying Cong</strong></p>
<p style="font-size: max(17px, 1rem); line-height: 1.58;">Imagine asking your AI whether to change your company’s pricing. It brings you a relevant passage, an equally serious objection, and the circumstances that make each useful. Then it asks what evidence would change your mind.</p>
<figure style="max-width: 510px; margin: 1.2rem auto;"><img src="/images/ai-advisory-bookshelf/advisers.png" width="1536" height="1024" alt="Different books bring a compass, balance scale and warning flag to a decision notebook: useful advice supplies competing considerations." style="width:100%;height:auto;background:transparent;"><figcaption>Generated watercolor metaphor: several sources inform a decision; none becomes an oracle.</figcaption></figure>
<p style="font-size: max(17px, 1rem); line-height: 1.58;">I want this tool. I would currently treat it as a <strong>bounded side project, conditional on cheap validation</strong>. The evidence does not justify committing my time to a venture. Useful advice, recurring payment and a defensible business are separate accomplishments.</p>
</div>

---

## 01 · People already bring their problems

### The behaviour is real. The additional budget is unknown.

<figure style="max-width:600px;margin:1rem auto;"><img src="/images/ai-advisory-bookshelf/denominators.svg" alt="Different study denominators prevent a market-size comparison." width="600" style="width:100%;height:auto;background:transparent;"><figcaption>Separate populations and units: these shares cannot be added or compared as market sizes. Sources and denominators in the adjacent text.</figcaption></figure>

Sam Parr described using ChatGPT as a thought partner: supplying personal context and books, asking how an author would approach a problem, and wanting the manual setup automated. The parent research run verified his thread through the signed-in X session. It is an unusually concrete workflow anecdote, rather than customer validation. The complaint is also old enough that changing host capabilities could have addressed part of it. [Parr’s thread](https://x.com/thesamparr/status/1869117964194124071)

There is broader evidence that people ask AI what to do. Anthropic classified roughly **6%** of its filtered conversation sample as personal guidance. Within guidance conversations, **26%** concerned professional or career matters, and **9%** exhibited sycophancy—excessive validation or praise. These are separate denominators; the last figure is neither a harm rate nor evidence that a bookshelf fixes the problem. [Anthropic, April 2026](https://www.anthropic.com/research/claude-personal-guidance)

The OpenAI/NBER usage paper reports roughly **29%** practical guidance, a much broader category including tutoring, how-to help and ideation. Its consumer user-message shares cannot be put beside Anthropic’s personal-guidance conversation share as comparable market sizes. [Study, section 5.2 and Table 3](https://cdn.openai.com/pdf/a253471f-8260-40c6-a2cc-aa93fe9f142e/economic-research-chatgpt-usage-paper.pdf)

My inference is modest: advice is an established AI use. Whether someone will pay an additional provider for better evidence remains unanswered.

---

## 02 · The plumbing is already available

### Give the AI a tool for finding sources

<figure style="max-width:600px;margin:1rem auto;"><img src="/images/ai-advisory-bookshelf/tool-boundary.svg" alt="Retrieval returns notes to a host, while source verification and tool use remain separate checks." width="600" style="width:100%;height:auto;background:transparent;"><figcaption>Conceptual boundary: retrieved notes, original passages and applied advice are different objects; host adoption still needs observation.</figcaption></figure>

A model answering from its internal training can sound authoritative without showing where a particular recommendation came from. Retrieval adds a different step: search an external collection and return material for the model to consider. MCP is the connector through which that collection can offer tools to an existing AI application. Readwise describes this bridge in its own documentation. [Readwise MCP](https://docs.readwise.io/tools/mcp)

The Brains is a useful starting point. Its documented pipeline turns public talks, essays and posts into model-written notes, then searches those notes using BM25, a method that ranks text through word matches and their relative informativeness. Individual collections expose `search_brain` and `list_sources`; an aggregate connector exposes several collections. Hosted access uses email-code authentication; a local option is also documented. [Project README](https://raw.githubusercontent.com/VicPitic/the-brains/main/README.md)

That is reusable infrastructure, with important boundaries. A search result can be a generated note linked to a source rather than the author’s actual passage. The repository describes a public-source policy; this research did not audit every corpus item or execute its hosted tools. Its code licence also distinguishes the software from the underlying authors’ works. [README](https://raw.githubusercontent.com/VicPitic/the-brains/main/README.md), [licence](https://raw.githubusercontent.com/VicPitic/the-brains/main/LICENSE)

The engineering opportunity begins after a search succeeds: determine whether the source actually supports the advice being offered.

---

## 03 · A citation needs a chain of custody

### Keep the author’s words separate from our application

<figure style="max-width:600px;margin:1rem auto;"><img src="/images/ai-advisory-bookshelf/mechanism.svg" alt="Proposed evidence chain: retrieve a source, check its context, compare conditions, record a decision and review its outcome." width="600" style="width:100%;height:auto;background:transparent;"><figcaption>Original proposed process. A source link is the beginning of verification, rather than its completion.</figcaption></figure>

I would return an evidence object containing the original URL, date, passage locator, permitted quotation or clearly marked paraphrase, surrounding context, and conditions under which the argument applies. A distinct field would contain the host AI’s application to the user’s situation. These are proposed product requirements, inspired by the gap between cited notes and original context. [Architecture being extended](https://raw.githubusercontent.com/VicPitic/the-brains/main/README.md)

Consider an invented pricing example. A source recommending simplicity may assume customers have similar needs. Another recommending segmentation may assume their willingness to pay varies substantially. The useful answer identifies which assumption our company needs to test. It does not merely assemble opposed slogans.

The host still has to call the tool and preserve those distinctions in its response. I would inspect actual calls, missed calls and final answers. The presence of a connector cannot establish faithful use. That is a validation requirement, not a capability demonstrated by this research.

---

## 04 · Disagreement is a method

### Make the competing assumptions visible

<figure style="max-width:600px;margin:1rem auto;"><img src="/images/ai-advisory-bookshelf/disagreement.png" alt="A bridge fits a narrow gap while a boat fits deep water: advice differs because conditions differ." width="600" style="width:100%;height:auto;background:transparent;"><figcaption>Generated watercolor metaphor: compare the circumstances that make each recommendation useful, rather than staging a debate.</figcaption></figure>

I like the idea of a bookshelf that resists my preferred answer. It could surface a recommendation I dislike, show its supporting conditions, and ask which facts I am overlooking. But staged argument can become theatre: a model invents contrasting personalities and then congratulates me for choosing between them.

A useful disagreement has a traceable cause. Advisers may optimise different outcomes, face different constraints, expect different customer behaviour, or work over different time horizons. Sometimes their recommendations only appear inconsistent because their circumstances differ. My proposed interface would preserve those distinctions instead of forcing an entertaining debate.

This is already a competitive feature. Delphi’s public fundraising comparison presents **eleven perspectives**, a comparison table and an explicit disagreement section. Its methodology attributes the responses to people’s digital Delphis and the synthesis to Delphi. Those generated responses are not original quotations from the named humans. [Delphi comparison and methodology](https://new.delphi.ai/ask/vcs/q/safe-vs-priced-round)

My inference: disagreement is a quality discipline that a new product should test. Its existence alone is weak differentiation. The trial must compare our evidence against the strongest available substitute, including a well-written prompt that asks the existing AI to challenge us.

---

## 05 · Owning a book is a starting condition

### Access, attribution and permission are different questions

<figure style="max-width:600px;margin:1rem auto;"><img src="/images/ai-advisory-bookshelf/rights.png" alt="A held book, a gated open book and a permission stamp represent ownership, access and reuse permission." width="600" style="width:100%;height:auto;background:transparent;"><figcaption>Generated watercolor metaphor: ownership, access and permission require separate checks; the stamp depicts a question to resolve, not clearance obtained.</figcaption></figure>

The appealing version includes books I already own. Google’s Expert Intelligence announcement makes that possibility concrete: more than **100,000 books**, publisher participation and an ownership requirement through Google Play Books; collaborators need their own copies. This establishes an announced distribution and permission channel, not universal availability or an effectiveness result. [Google, August 2026](https://blog.google/innovation-and-ai/products/gemini-notebook/expert-intelligence-leading-sources/)

I cannot assume that buying a copy elsewhere grants the same rights to a new hosted service. Nor does an MIT software licence clear the source works that software retrieves. The Brains expressly distinguishes the underlying content from its code. [Project licence](https://raw.githubusercontent.com/VicPitic/the-brains/main/LICENSE)

Anthropic’s court-authorized settlement notice specifies a **US$1.5 billion** fund and expressly says the release is not a future licence for the conduct it describes. It does not provide a price list for licensing this product’s corpus or establish the legality of every retrieval workflow. I make no claim here about current settlement finality or the absence of other publisher agreements. [Notice, question 15](https://assets-us-01.kc-usercontent.com/1eeb16db-4934-006e-40a6-38fa91285ebb/ce109a57-390c-4d76-ad65-5807d4830fe5/ANT%20-%20Long-Form%20Notice_Updated%20Deadline%201.8.2026.pdf)

My initial scope would use permission-reviewed public material and opt-in highlights with a documented access policy. Unclear rights exclude a source. A royalty allowance in a spreadsheet is not permission.

---

## 06 · Most of the attractive surface is occupied

### The newcomer must earn a residual job

<figure style="max-width:600px;margin:1rem auto;"><img src="/images/ai-advisory-bookshelf/competition.svg" alt="Documented alternatives: Google for purchased books; Readwise for saved-library MCP; Delphi for people and comparison; The Brains for public-note MCP." width="600" style="width:100%;height:auto;background:transparent;"><figcaption>Offering map checked for this edition. Documented features, not a hands-on quality ranking.</figcaption></figure>

Google has a publisher-backed book channel. Readwise already lets compatible AI clients search highlights and Reader documents, which is different from universal full-book access. Delphi supplies person-based conversations and comparisons. The Brains offers a free cited connector over public-source notes. Each covers part of the original pitch. [Google](https://blog.google/innovation-and-ai/products/gemini-notebook/expert-intelligence-leading-sources/), [Readwise](https://docs.readwise.io/tools/mcp), [Delphi](https://new.delphi.ai/press), [The Brains](https://raw.githubusercontent.com/VicPitic/the-brains/main/README.md)

Delphi also announced a **US$16 million Series A**, with Sequoia confirming it led the round. Financing shows investor interest in an adjacent company, not that a new bookshelf has a viable market. Its premium creator deployment plans are also a different purchase from an end user’s advice subscription. [Company announcement](https://www.delphi.co/blog/delphi-raises-16m-series-a-from-sequoia), [Sequoia](https://sequoiacap.com/article/partnering-with-delphi-meet-your-heroes), [creator plans](https://embed.delphi.ai/premium/plans)

The remaining hypothesis is a maintained decision practice: original-context checking, conditional disagreement, dated action evidence and a user’s own outcome record. Competitors and ordinary documents may reproduce it. This research establishes no exclusive opening.

---

## 07 · What they said, what they did

### Build case files before rating experts

<figure style="max-width:600px;margin:1rem auto;"><img src="/images/ai-advisory-bookshelf/case-file.svg" alt="A case file separates dated statements, actions, explanations, outcomes and missing information." width="600" style="width:100%;height:auto;background:transparent;"><figcaption>Proposed case-file structure. Sequence alone cannot establish causation or validate an expert score.</figcaption></figure>

A track record sounds like the missing ingredient. If someone recommends a strategy, show what happened when they used it. I would want that context beside the advice.

But a successful company does not validate every principle its founder later teaches. Public accounts select memorable successes. Private constraints are missing. An action can precede a good outcome without causing it. A reliable expert score would need a denominator of decisions, including failures, and rules written before the outcomes were known. We have no such dataset. These are methodological limits of the proposed feature, not measured findings about particular people.

I would start with narrower case files: a dated statement; a dated action; any contemporaneous explanation; the observed result; counterexamples; and explicit unknowns. Where the link between saying and doing is inferred, label it. Where the motive is unavailable, leave it unavailable. [Proposed evidence specification](https://github.com/seahyc/seahyc.github.io/blob/main/research-dossiers/2026-11-03-ai-advisory-bookshelf/market-evidence.md)

ShadowBox offers a useful design lesson: learners commit judgments before seeing expert rankings and rationales. Its studied military settings and expert-agreement scores do not establish better founder decisions; the authors flag uncertainty about transfer to job performance. *Accelerated Expertise* supplies related learning-science context, but the full book was not read for this report. Neither justifies advertising a bookshelf as proven expertise training. [ShadowBox paper](https://www.shadowboxtraining.com/wp-content/uploads/2021/05/The_ShadowBox_Approach_to_Cognitive_Skills_Trainin.pdf), [publisher description](https://www.routledge.com/Accelerated-Expertise-Training-for-High-Proficiency-in-a-Complex-World/Hoffman-Ward-Feltovich-DiBello-Fiore-Andrews/p/book/9781848726529)

---

## 08 · Start with a decision, then choose a shelf

### Pricing and packaging for bootstrapped B2B founders

<figure style="max-width:600px;margin:1rem auto;"><img src="/images/ai-advisory-bookshelf/wedge.png" alt="A small curated shelf feeds a pricing decision journal while a large catalogue remains aside." width="600" style="width:100%;height:auto;background:transparent;"><figcaption>Generated watercolor metaphor: curate evidence around one concrete pricing choice before building a broad catalogue.</figcaption></figure>

My proposed first user already uses AI and has a real pricing or packaging decision ahead. The product would stay inside that conversation. It would return a small evidence pack and offer an exportable decision journal, with the user controlling whether anything is retained. This is a customer and workflow hypothesis. [Research map](https://github.com/seahyc/seahyc.github.io/blob/main/research-dossiers/2026-11-03-ai-advisory-bookshelf/research-map.md)

Why this wedge? The question can be made concrete: what are we changing, for whom, under which assumptions, with which observable result? It offers a way to assess missing constraints and useful alternatives rather than simply asking whether an answer feels wise. Yet pricing decisions may occur too infrequently to support a subscription. The very specificity that helps evaluation could undermine retention.

I would curate the evidence manually before building a broad expert catalogue. Compare it against the existing AI with a strong challenge-the-premise prompt, and against the same AI using the user’s existing reading library. Hold user context and available time constant. Log editorial work as a cost.

The paid promise would be a clearer decision and a traceable record of its reasoning. Whether people value that enough to return is the experiment. A delightful demonstration does not answer it.

---

## 09 · Cheap retrieval can support expensive service

### Original scenarios, not observed unit economics

<figure style="max-width:600px;margin:1rem auto;"><img src="/images/ai-advisory-bookshelf/economics.svg" alt="Illustrative monthly net per payer after replacing churned customers: low minus 15.445 dollars, base plus 7.505 dollars, high plus 21.505 dollars; before fixed costs." width="600" style="width:100%;height:auto;background:transparent;"><figcaption>USD per active payer per month, after recurring costs and replacement acquisition, before fixed costs. Chosen scenarios dated 3 November 2026; no customer cohort observed. <a href="https://github.com/seahyc/seahyc.github.io/blob/main/research-dossiers/2026-11-03-ai-advisory-bookshelf/scenario-model.json">Model and assumptions</a>.</figcaption></figure>

The model assumes the user separately pays for the host AI. Our service supplies retrieval and curation, with an allowance for occasional checking. Its assumed monthly prices are **US$9 / US$19 / US$29** across low, base and high cases. Each deducts payment fees, service cost, a rights reserve and support labour, then acquisition and onboarding needed to replace churned customers. [Original model](https://github.com/seahyc/seahyc.github.io/blob/main/research-dossiers/2026-11-03-ai-advisory-bookshelf/scenario-model.json)

In the base case, **US$19 − $0.87 fees − $1.50 service − $2 rights reserve − $3 support = $11.63** contribution. Assumed monthly churn of **5%**, multiplied by **$82.50** acquisition plus onboarding, removes another **$4.125**, leaving **$7.505** before fixed costs. The rights reserve is a sensitivity allowance, with no licence offer behind it. [Full arithmetic](https://github.com/seahyc/seahyc.github.io/blob/main/research-dossiers/2026-11-03-ai-advisory-bookshelf/scenario-arithmetic.md)

The favourable case combines higher price with lower support, acquisition cost and churn. It is deliberately favourable, not an upside forecast. The low case loses money before fixed costs; adding customers compounds that loss. [Scenario inputs and outputs](https://github.com/seahyc/seahyc.github.io/blob/main/research-dossiers/2026-11-03-ai-advisory-bookshelf/scenario-model.json)

---

## 10 · The cost of staying small

### Count the founder even when no salary leaves the bank

<figure style="max-width:600px;margin:1rem auto;"><img src="/images/ai-advisory-bookshelf/break-even.svg" alt="Scenario break-even payer counts distinguish cash costs from founder opportunity cost and support and churn sensitivities." width="600" style="width:100%;height:auto;background:transparent;"><figcaption>Original planning scenarios, not observed demand. Payers needed at break-even; zero-based scale. Model and sensitivity arithmetic linked in the adjacent text.</figcaption></figure>

The original model budgets **US$2,000 monthly** fixed cash costs: **$200** hosting and monitoring, **$1,400** shared editorial maintenance and **$400** administration and rights-review allowance. It adds **$10,000 monthly** as a chosen value of founder opportunity cost. These are planning assumptions, including an untested editorial capacity limit, rather than salary data or supplier quotes. [Model](https://github.com/seahyc/seahyc.github.io/blob/main/research-dossiers/2026-11-03-ai-advisory-bookshelf/scenario-model.json)

With base net contribution, cash break-even needs **267 payers**; including founder opportunity cost needs **1,599**. At **1,000 base payers**, the model produces **$228,000 annual revenue** and **$5,505 monthly** after cash fixed costs, but **−$4,495** after founder opportunity cost. All are conditional arithmetic. [Break-even and worked example](https://github.com/seahyc/seahyc.github.io/blob/main/research-dossiers/2026-11-03-ai-advisory-bookshelf/scenario-arithmetic.md)

Double base support time and economic break-even rises to **2,664 payers**. Double churn and it rises to **3,551**. Neither sensitivity estimates what users will actually do. They identify what we need to measure: recurring human effort, return frequency and acquisition cost. [Sensitivity calculations](https://github.com/seahyc/seahyc.github.io/blob/main/research-dossiers/2026-11-03-ai-advisory-bookshelf/scenario-arithmetic.md)

The model assumes churned users can be replaced at the stated acquisition cost. Growth requires additional spending. Taxes, major disputes, unexpected incidents and contracted book rights beyond the allowance are excluded. A subscription business can look healthy while consuming the founder’s better opportunities.

---

## 11 · A useful project can still be the wrong venture

### My allocation decision is conditional

<figure style="max-width:510px;margin:1rem auto;"><img src="/images/ai-advisory-bookshelf/founder-time.png" width="1774" height="887" alt="A modest bookshelf on a seesaw is outweighed by a founder’s hourglass: the tool’s usefulness must be weighed against scarce time." style="width:100%;height:auto;background:transparent;"><figcaption>Generated watercolor metaphor for opportunity cost. It does not measure market size.</figcaption></figure>

I would not call this market intrinsically tiny. We do not know its reachable payer population. At the assumed base price, **US$10 million annual revenue** would require **43,860 payers**. That reverse calculation is a scale hurdle; it supplies no evidence those buyers exist. [Original revenue screens](https://github.com/seahyc/seahyc.github.io/blob/main/research-dossiers/2026-11-03-ai-advisory-bookshelf/scenario-arithmetic.md)

What we do know is less encouraging for a new venture: documented substitutes cover much of the concept, the differentiated editorial work has continuing cost, and paid repeat demand remains unmeasured. My judgment is that this currently offers insufficient expected value for my full founder attention. That is a decision under uncertainty, not a measured revenue ceiling.

A bounded side project could make sense if I already had cheap access to users, enjoyed the curation, and could keep the time commitment small. Without those conditions, doing nothing is reasonable. Calling it a side project does not make losses or maintenance disappear.

---

## 12 · Buy evidence before building a catalogue

### A bounded trial with explicit hurdles

<figure style="max-width:600px;margin:1rem auto;"><img src="/images/ai-advisory-bookshelf/roadmap.svg" alt="Proposed conditional roadmap: first screen the decision workflow; then test renewals; then build case records; expand only after paid repeat demand." width="600" style="width:100%;height:auto;background:transparent;"><figcaption>Proposed sequence, not achieved milestones. Each stage depends on evidence from the previous one.</figcaption></figure>

The following are chosen operating rules, with no power calculation or validated industry benchmark behind them. The founder owns recruitment and cost logging; an independent source reviewer owns attribution checks. Nothing in the trial has been executed. [Preregistered proposal](https://github.com/seahyc/seahyc.github.io/blob/main/research-dossiers/2026-11-03-ai-advisory-bookshelf/research-map.md)

Recruit **12 founders** already using AI. Continue only if **6** have an upcoming relevant decision and agree to a bounded paid trial. Compare **24 decisions**, counterbalancing order and blinding arm identity for review. Use the same host model/version and user context, with explicit limits on time and context. Record whether tools actually ran. [Chosen sample and design](https://github.com/seahyc/seahyc.github.io/blob/main/research-dossiers/2026-11-03-ai-advisory-bookshelf/research-map.md)

The proposed quality hurdle is a curated-arm win on **16 of 24** comparisons against the stronger substitute, with no material attribution failure. Score source support, missed constraints, viable alternatives and usable next actions; record user preference separately. Repeated participants and a small convenience sample preclude a population claim. [Quality rubric and limits](https://github.com/seahyc/seahyc.github.io/blob/main/research-dossiers/2026-11-03-ai-advisory-bookshelf/research-map.md)

---

## 13 · Earn the next stage

### A conditional path through the next two years

<figure style="max-width:600px;margin:1rem auto;"><img src="/images/ai-advisory-bookshelf/renewal-gate.svg" alt="Day 75 proposed payment, renewal, return and support gates." width="600" style="width:100%;height:auto;background:transparent;"><figcaption>Chosen trial hurdles, not achieved results or validated benchmarks. Payment, renewal, independent return and human effort must each pass.</figcaption></figure>

By **day 75**, the proposed demand gate requires **6 of 12** participants to pay **US$19** for a month, **4** to renew without bundled consulting, and **4** to return for another independent decision. The operational target is median recurring support of **at most 4 minutes per payer per month**, while also reporting tail effort and founder time. Failure means archive the product or keep it as an unpaid personal tool. Passing earns another limited test. [Chosen gates](https://github.com/seahyc/seahyc.github.io/blob/main/research-dossiers/2026-11-03-ai-advisory-bookshelf/research-map.md)

**Months 0–3:** run that screen with manual evidence packs. Build only enough machinery to preserve sources, compare alternatives and export the user’s journal. Keep the host AI people already use. [Proposed roadmap](https://github.com/seahyc/seahyc.github.io/blob/main/research-dossiers/2026-11-03-ai-advisory-bookshelf/research-map.md)

**Months 3–6:** conditional on payment, maintain a permission-reviewed domain and inspect renewal cohorts beyond novelty. **Months 6–12:** test whether opt-in decision records improve repeat use; add failed public cases and explicit missingness, and test a distribution channel against actual contribution. [Proposed roadmap](https://github.com/seahyc/seahyc.github.io/blob/main/research-dossiers/2026-11-03-ai-advisory-bookshelf/research-map.md)

**Months 12–24:** expand into an adjacent recurring decision only if customers pay for it and the editorial process transfers. Reconsider a venture only with observed cohort retention, workable acquisition, positive fully loaded contribution and paid expansion. A permissioned case library or trusted channel might strengthen the thesis; neither has been established. [Conditional expansion rule](https://github.com/seahyc/seahyc.github.io/blob/main/research-dossiers/2026-11-03-ai-advisory-bookshelf/research-map.md)

---

## 14 · What would change my mind

### Keep the tool; make the company earn its existence

<figure style="max-width:600px;margin:1rem auto;"><img src="/images/ai-advisory-bookshelf/falsifiers.svg" alt="Four stop conditions cover substitutes, attribution, rights and contribution." width="600" style="width:100%;height:auto;background:transparent;"><figcaption>Proposed stop rules: a useful tool earns a company only if it survives these tests. No trial outcomes have been collected.</figcaption></figure>

The strongest bear case is straightforward. Users want better answers, their host already owns the conversation, existing services supply much of the source material, and good prompts may reproduce the residual benefit. The valuable human work—context checking, case selection and maintenance—is also the cost centre. Occasional decisions may never produce recurring subscriptions. [Evidence and counterevidence ledger](https://github.com/seahyc/seahyc.github.io/blob/main/research-dossiers/2026-11-03-ai-advisory-bookshelf/evidence-ledger.md)

I would stop the generic bookshelf thesis if it fails to improve on the strongest accessible substitute. I would pause release for a fabricated quotation or material unsupported attribution, exclude sources with unresolved rights, and stop paid expansion if recurring costs and acquisition consume contribution. If users can reproduce the useful result with their existing library and a saved prompt, the tool may still be worth sharing; the standalone business has not earned its place. [Falsifiers](https://github.com/seahyc/seahyc.github.io/blob/main/research-dossiers/2026-11-03-ai-advisory-bookshelf/research-map.md)

**Evidence boundary:** public studies, product documentation, repository documentation, publisher metadata and a court-authorized notice. The Sam Parr anecdote is parent-verified. No product efficacy comparison, customer payment, rights clearance, acquisition channel or actual retention was established. The full *Accelerated Expertise* book and paywalled reporting were not used as hidden evidence. Dollar scenarios and pilot hurdles are original assumptions, separately documented. [Source audit](https://github.com/seahyc/seahyc.github.io/blob/main/research-dossiers/2026-11-03-ai-advisory-bookshelf/market-evidence.md), [model](https://github.com/seahyc/seahyc.github.io/blob/main/research-dossiers/2026-11-03-ai-advisory-bookshelf/scenario-model.json)

My answer today is **a conditional, bounded side project; no venture commitment**. I would enjoy a bookshelf that helps me argue more honestly with myself. Before I give it a company, I want evidence that other people return, pay and make use of something their existing tools cannot readily supply.
