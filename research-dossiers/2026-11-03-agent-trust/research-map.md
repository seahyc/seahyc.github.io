# Research map — agent trust
Date: 2026-11-03. Phase 1, public evidence only. Initial hypotheses written before source collection.

## Founder decision
Should a founder build an abuse-defence company for consumer platforms, starting with agent identity, generic risk scoring plus checkpoints, or scam/fake-recruiter detection for Southeast Asian job marketplaces?

Desired conclusion: identify a narrow paid validation experiment, rather than assume cheaper AI attacks automatically create a new vendor category. Geography: Singapore-first discovery; Indonesia and Philippines require independent local validation. Horizon: conditional 12–24 months.

## Initial hypothesis tree
| Branch | Support to seek | Disconfirming evidence to seek | Missing | Validation action |
|---|---|---|---|---|
| AI changes abuse economics | Primary measured attack costs and real loss reports | Abuse predates agents; no causal attribution | Cost per successful harmful interaction | Compare held-out real workflows with and without model assistance |
| Agent identity is a company wedge | Deployed signed traffic, buyer spend | Platforms/CDNs own roots; signature does not establish intent | Buyer portability and willingness to pay | Interview platforms about unknown-agent policy |
| Generic scoring/checkpoint layer wins | Unserved workflow and evaluated lift | Mature vendors and in-house feature/label advantages | Incremental lift at fixed good-user friction | Shadow evaluation against incumbent |
| SEA fake recruiters is a wedge | Official job-scam data and platform workflow obligations | Loss occurs off-platform; low platform-captured benefit | Labels, buyer budget, content rights, attribution | Paid employer-onboarding/listing/contact pilot |
| Economics support a company | Paid repeated benefit and bounded review labour | Custom services, false positives, bundling | Real quotes and recurring support burden | Low/base/high model then paid validation |

## Core assumptions to test
The buyer can supply permissioned events and outcomes; the intervention can occur before harmful contact; legitimate-user friction can be measured; the platform captures enough benefit to pay; integrations repeat across buyers. None is established by this map.

## Initial bear case
Platforms control account state, policy, labels and enforcement. Existing vendors bundle device, identity, risk and challenges. Agent signatures can authenticate malicious or compromised senders. Job scams migrate to messaging/payment channels. A founder may inherit expensive review and liability without owning a durable trust root.

## Initial falsifiers and next action
Founder owns 30-day buyer and data-access discovery, followed by a bounded 90-day paid shadow/pilot comparison. Stop if no permissioned outcome data, no named budget owner or no credible intervention before loss. Numeric gates will be explicitly proposed assumptions, not industry standards. No outreach or external actions authorised/performed by this research.

## Research conclusion — supersedes initial open choice
**Recommendation: fund customer/data discovery and a bounded paid test of C, using B as machinery and A as one signal.** The proposed company helps job/worker marketplaces establish recruiter authority and prevent reachable scam exposure. It does not sell a universal proof that a human or AI is trustworthy.

This recommendation is weaker than a build/launch recommendation: there is no validated budget, customer, performance result or right to a useful dataset. The aspiration is a job seeker who can explore real work without having to investigate every recruiter. The company must prove the platform captures enough value to pay for that outcome.

### Exact initial wedge
- Customer hypothesis: a consumer job/worker marketplace with an existing manual employer/listing review queue, permissioned first-contact metadata, a named trust/safety owner and enough confirmed outcomes to evaluate incremental benefit.
- Economic sponsor hypothesis: head of operations/trust plus a GM or product leader who owns review cost, customer experience and paid-employer retention. Security is an integration partner; not necessarily budget owner.
- Initial surface: employer onboarding, representative changes, listing publication and the first outbound recruiter contact. Exclude candidate employability decisions, universal background checks, surveillance of private third-party messages and automated accusations.
- Output: evidence packet connecting claimed company, representative authority, account history, listing, linked infrastructure and observed contact behaviour; proposed allow/limited exposure/review/checkpoint action plus an appeal path.
- Integration: server policy hook and review queue; optional bought device/enrichment signals, attestation/passkeys or signed-agent identity. A verified known agent may be allowed a useful action without certifying every future action.
- Differentiation hypothesis: fewer successful harmful contacts and less investigation work at fixed legitimate-employer friction, because authority and action context are considered together. This may prove to be an incumbent configuration project; accept that result.

## Resolved hypothesis tree
| Branch | Supporting evidence | Disconfirming evidence | Still missing | Validation action |
|---|---|---|---|---|
| AI changes the threat enough to alter buying | E21 documents AI-related complaint information; E02/E06/E07 show response infrastructure | No causal wedge-specific attack-cost series; E17 shows reported job harm falling | Incremental successful attack cost and actual buyer urgency | Collect costed real incident workflows; interview buyers about last budget decision |
| A standalone agent passport wins | E02/E03 demonstrate cryptographic identification; commerce systems E06/E07 | Roots and distribution already controlled by major networks; identity excludes authority/intent | Buyer who needs portable unknown-agent admission and will pay a newcomer | Ask for failed admission decisions and incumbents considered; no universal-root build absent proof |
| Generic scoring/checkpoint wins | E04/E08–E15 show purchasable components and standard patterns | Crowded competition; platform labels/context and in-house integration may dominate | Incremental lift over configured incumbent and internal rules | Same feed, same policy/friction budget, time-split shadow evaluation |
| C has a better initial job | E16–E20 establish relevant harms and specific authority gap | Much reported harm starts outside job platforms; Persona/Sift already overlap | Reachable share, budget, permissioned labels, language cohorts | Pre-contact workflow study; paid authority + contact-risk pilot |
| Context creates reusable advantage | E20 highlights person/company/action mismatch; E22 motivates linked signals | Real authorized recruiters can scam; graph/label poisoning and sparse histories | Transfer without raw cross-customer pooling or bespoke logic | Hold out whole employers/campaigns and later time periods; replicate with second buyer |
| Company economics can work | Scenario base has positive vendor contribution | Scenario low loses money; base buyer fails proposed benefit hurdle | Quotes, actual review/support hours, retained-client economics | Measured pilot workload, paid fee and finance-approved customer benefit |

## Strongest bear case after research
Nikita Bier's parent-supplied practitioner post (E01) explicitly recommends an in-house risk-scoring stack. That is evidence of a build-in-house preference, not external-vendor demand. His stated 3–12-month defence lifetime is experiential, rather than a measured industry benchmark.

The platform's own workflow and data are the moat; a vendor receives a thin or stale event feed. Existing providers already sell identity, bot/agent detection, risk decisions and scam content tools. A legitimate business can have a dishonest recruiter; a valid agent can act maliciously; a real human can cooperate with a scam. The practical “authority graph” may become slow manual investigation with sensitive data and frequent appeals.

Many national job-scam losses are task scams on social/messaging channels rather than exposures the buyer could prevent. Social benefit therefore may not convert into platform ROI. Stronger checks can reject small informal employers and make legitimate recruitment worse. A platform may prefer in-house rules or an incumbent contract, and adversaries can change channels after deployment. This could be a useful specialist service without a scalable defensible company.

## Actors and incentives
- Job seekers want safe access to opportunity with minimal identity collection and a way to contest errors.
- Honest employers/recruiters want reach, fast onboarding and reliable business representation; delegated recruiting and agencies complicate authority.
- Marketplace trust teams want earlier detection, evidence and manageable queues; they may be rewarded for case closure rather than reduced exposure.
- Economic sponsors pay for operational savings, documented revenue/retention benefit and buyer-borne losses, not all national losses.
- Identity/device/cloud vendors own useful signals and distribution; standards bodies supply interoperability rather than commercial adoption.
- Attackers seek reach, trusted presentation and conversion; they may use humans, bots, signed agents or compromised genuine accounts interchangeably.
- Regulators' incentives and powers differ by country/service. E23 is context; it is not a universal mandate for the wedge.

## Falsifiers with owners and gates
All numeric goals below are **founder-selected planning assumptions**, not observed rates, statistical power calculations or industry standards. Gates are conjunctive. Missing evidence is not a pass.

| Timeframe / owner | Action and metric | Stop/go rule |
|---|---|---|
| Days 1–30 / founder | 12 interviews across at least four independent prospective platforms; include incumbent users and in-house teams; reconstruct recent investigations and budget choices | Continue only if two platforms offer permissioned data access, a named operating/budget owner and willingness to discuss a paid pilot. Otherwise stop the broad build |
| Days 15–45 / technical lead + customer data owner | Define event schema, minimum retained fields, allowed use, deletion, labeled outcome and intervention timing; obtain scope-matched signal/verification quotes | Stop if data rights, protected access, actionable timing or independent outcome adjudication cannot be arranged |
| Days 30–60 / customer trust lead + independent adjudicator | Shadow comparison versus tuned incumbent/internal rules, stratified by language, employer type, channel, new/returning account and agent/human status | No enforcement based on unvalidated model. Stop if improvement vanishes after matching cohort, review effort and friction |
| Days 45–90 / trust lead + experiment/statistics owner | Pre-register primary outcome: independently adjudicated harmful first-contact exposures per eligible contact, plus detection lead time; sample unflagged traffic; report uncertainty | Target ≥25% relative reduction versus comparator, while good-employer approval falls by ≤0.5 percentage points and total customer review hours fall ≥30%. Inconclusive intervals extend a bounded test or stop; they do not pass |
| Day 90 / finance sponsor + founder | Validate captured operational/revenue/harm benefit, incremental friction, actual fee, vendor review/support costs | Go only if two paying pilots seek renewal, buyer benefit before fee ≥2× fee, vendor recurring contribution ≥50%, and onboarding ≤24 direct hours per client at measured scope. Otherwise reprice/narrow/stop |
| Continuous / customer owner | Appeals, reports of user harm, unauthorized data use, language/employer skew, decision evidence and reversible response | Pause automated enforcement on boundary breach or material unexplained good-user harm; maintain an investigation/appeal route |

## Evaluation design and sample sufficiency
Use explicit consent and approved data access. Replay preserves the original decision time: no future reports or takedown labels in model input. Split by time and by whole employer/campaign so duplicate templates and linked domains do not leak between train and evaluation. Reviewers see source evidence but are blinded to which system proposed the flag where practical; adjudicate disagreements separately.

Accuracy and flagged-case precision alone are inadequate. Sample unflagged/allowed traffic to estimate misses; label appeal reversals and legitimate-agent denials. Measure account/person-level friction separately from event-level counts. Record missing telemetry and unresolved cases, rather than quietly calling them safe. External loss ascertainment will remain incomplete; do not equate zero observed loss with safety.

Choose sample sizes only after measuring baseline exposure rate, reporting delay and campaign clustering. The statistics owner must pre-register the minimum detectable effect, acceptable errors, confidence intervals, clustering and stopping/extension rules. Repeated events from one campaign are not independent evidence. A 90-day window can be insufficient for rare outcomes; no sample size or statistical power has been established by this research.

Safe live comparison can randomize additional review or delayed exposure within existing approved protections; do not deliberately release known harmful content. If only a shadow study is feasible, report predictive lift and operational cost, not causal prevented losses. Randomised policy effects and retrospective replay answer different questions.

## Conditional 12–24 month attack plan
- **Months 0–3:** founder owns access, buyer and incumbent comparison; technical lead owns minimal integration; customer trust lead owns adjudication. Deliver the gated paid experiment or stop. No industry-wide identity network yet.
- **Months 4–6:** repeat the same employer/listing/contact workflow with a second independent customer. Measure cohort-specific false denials, renewal, direct labour and actual collections. Reuse integrations only where data semantics agree.
- **Months 6–12:** productise repeatable evidence assembly, policy changes, drift monitoring and appeals. Evaluate malicious humans, helpful agents and compromised legitimate accounts separately. Add bought signals only when they improve the agreed frontier of cost, missed harm and friction.
- **Months 12–24:** expand one neighbouring country or marketplace segment only after local authority sources, language validation, data/legal review and paid demand. Treat portable agent attestations as an interoperability feature where customers ask for it. Widen scope only with repeatable contribution and retained customers.

## What would change the recommendation
Prefer A if a specific buyer pays for an unserved portable-admission job and standards/network alternatives fail it. Prefer B if matched evaluations show a general risk engine wins across unrelated workflows with little custom work. Stop C if actual preventable exposure is too small, labels unavailable, authority verification too costly, buyer benefit below fee, or incumbent configuration meets the goal. Do not keep C merely because the social harm is important.

## Next action
**Owner: founder. Timeframe: next 30 days.** Produce a consented discovery/data-access memo and two scoped paid-pilot proposals, each naming buyer, comparator, costs, observable exposure, false-positive budget, independent adjudicator and sample plan. Metric and stopping rule: two qualified design partners or no product-build commitment. No contact, send, procurement, signup, enforcement or pilot was executed by this research.

Additional bear-case evidence: E26 documents existing internal job-platform screening and government/industry job-scam coordination. The C pilot comparator must include the buyer's current authority/impersonation procedures, not merely bot-score tuning. No “first anti-fake-recruiter workflow” claim is supportable.
