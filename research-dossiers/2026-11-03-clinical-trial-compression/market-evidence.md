# Market evidence and source notes

3 November 2026. Phase-one research. Public primary evidence only. Research teammate covered competitors and filings in competitor-source-notes.md; lead re-opened the principal sources. No customer conversations, quotes, paid proprietary datasets, hospital chart access or trial interventions occurred. Search results located sources; material claims come from opened pages, public abstracts, full papers, guidance PDFs or saved registry API data.

## 1. What exactly can be compressed?

A trial answers whether an intervention causes a useful, sufficiently safe outcome in a defined population. Faster candidate generation leaves this question unanswered. Operational time can sometimes be reduced by removing duplicated review, contradictory protocol versions, unsuitable sites or avoidable visits. The time needed to observe an endpoint may remain. A single “trial speed” percentage hides these distinctions.

The relevant comparison is the accepted clinical milestone under a valid protocol and comparable quality, including failed attempts. Mechanistically, total elapsed time is governed by dependent tasks and parallel branches, not the sum of task-hours. If contracting or drug supply finishes after the improved document workflow, document speed may save labor without advancing FPFV. This is an original operational inference, not a measured effect size.

**Potential intervention map:** protocol design addresses unnecessary burden and feasibility; feasibility tests accessible population and actual site capacity; matching prioritizes chart review; decentralized elements alter where visits happen; external controls alter the comparison design; document assistance improves evidence assembly/review. These interventions have different users, validity tests, access rights and routes to adoption. Bundle only after the first bottleneck is proved.

## 2. AI case studies: observed task effects and missing outcomes

**Anthropic, 27 October 2026**, opened [original announcement](https://www.anthropic.com/research/early-progress-drug-development). BMS reports clinical study-plan assessment using proprietary data. The post describes early work and intended expansion, not prospective trial-duration results. Enveda's summarized human-review reduction is 89%, from over 25 hours to under 3; drafting examples are separate tasks. Do not present review, first draft and sponsor/regulator acceptance as interchangeable milestones.

**Enveda technical report**, same date, opened [full report](https://enveda.com/CMC-Document-Processor/). Four batch records from one Phase II manufacturing campaign contain 1,061 pages. Aggregate matching of the 11 human actionable findings occurs across runs; seven additional adjudicated findings are reported. The article describes a 9.4-fold reduction in the quality-check comparison. Its compliance section explicitly says the system is not validated as a GMP computerized system and is advisory. Human quality units retain batch disposition. Small self-evaluation, no demonstrated full-trial acceleration; use as a mechanism example, not a general accuracy or ROI benchmark.

**TrialGPT**, [original Nature Communications study](https://www.nature.com/articles/s41467-024-53081-z), 2024. Web fetch hit publisher cookie authorization; Dia successfully exposed the full paper. The practical pilot used six oncology trials, six semi-synthetic clinical vignettes and two medical doctors in balanced assisted/unassisted screening. Its 42.6% timing reduction belongs to that comparison. It does not show contactability, consent, actual enrollment or retention. The paper explicitly retains human recruiters and asks for larger prospective evaluation. Patient-to-trial recommendation also differs from sponsor-side search through hospital charts.

## 3. Regulator sources: enabling paths, bounded claims

Read FDA primary pages plus linked guidance PDFs. Status checked as of 3 November 2026, not guessed from the title/year.

| Source | Status and relevant sections | Practical meaning / limit |
|---|---|---|
| [Externally controlled trials](https://www.fda.gov/regulatory-information/search-fda-guidance-documents/considerations-design-and-conduct-externally-controlled-trials-drug-and-biological-products), [PDF](https://www.fda.gov/media/164960/download) | February 2023 draft, not for implementation. III design/comparability/analysis | Plan sources, endpoints, index dates and analyses prospectively. Unmeasured confounding remains. More credible with large effects on well-characterized outcomes; modest effects can be unsuitable. Not a blanket replacement for randomization |
| [RWE considerations](https://www.fda.gov/regulatory-information/search-fda-guidance-documents/considerations-use-real-world-data-and-real-world-evidence-support-regulatory-decision-making-drug), [PDF](https://www.fda.gov/media/171667/download) | August 2023 final; III.B transparency, access, monitoring and sponsor responsibilities | Data provenance, prespecification and ability to provide/verify relevant patient/source records matter. A deidentified query interface alone may not confer necessary regulatory access. Applicable evidence standards remain |
| [Decentralized elements PDF](https://www.fda.gov/media/167696/download) | September 2024 final; introduction and III | Some trial activities can occur through telehealth, home visits or local HCPs; requirements remain the same. Home tests and patient choice of assessment setting can introduce variability/bias. Adds logistics and oversight obligations |
| [E6(R3)](https://www.fda.gov/regulatory-information/search-fda-guidance-documents/e6r3-good-clinical-practice-gcp), [PDF](https://www.fda.gov/media/169090/download) | September 2025 FDA final; principles, 2.3 and 3.6 | Risk-proportionate design/technology compatible with GCP; qualified people and sponsors retain oversight/accountability. No claim here about Annex 2's current status or identical adoption dates elsewhere |
| [NAM announcement](https://www.fda.gov/news-events/press-announcements/fda-announces-plan-phase-out-animal-testing-requirement-monoclonal-antibodies-and-other-drugs), [roadmap](https://www.fda.gov/media/186092/download) | April 10, 2025; preclinical safety roadmap | Context-specific validation and phased adoption of human-relevant alternatives. Does not remove need for clinical evidence or establish realized clinical trial compression |

Guidances contain nonbinding recommendations and must be distinguished from underlying law. This dossier maps business constraints; program-specific regulatory strategy needs qualified professionals and the appropriate regulator interactions.

**External-control taxonomy:** historical/concurrent controls use observed outcomes outside the treated trial; synthetic controls may construct a weighted comparison from observed records; digital twins predict prognosis from models; prognostic covariate adjustment in a randomized trial need not replace randomized controls. These terms are not interchangeable claims of causal identification. No vendor feature page in this pack proves every use acceptable to FDA.

## 4. Duration, amendments and cost: preserve denominators

**Tufts duration study**, [Getz et al. full paper](https://pmc.ncbi.nlm.nih.gov/articles/PMC9373886/), online August 2022 / 2023 issue. Data from 187 pre-pandemic protocols across 20 participating organizations. Table 6 gives Phase II mean initiation (final protocol–FPFV) 130.0 days, enrollment 438.5 days and total final protocol–database lock 1,027.9 days. These are distinct historical cohort measures, not a promise to save their entirety. The authors flag wide variation and indication differences; reported intervals/means are not an additive bill of materials.

**Tufts amendment update**, [Getz et al. public author abstract](https://pubmed.ncbi.nlm.nih.gov/38438658/), March 4, 2024. Sixteen organizations, 950 protocols and 2,188 amendments; 76% prevalence and 77% amendments deemed unavoidable. Mean need-identified-to-last-approval duration is 260 days. Pandemic involvement and changing strategy/regulator requests undermine a simplistic “prevent all amendments” pitch. Correlation does not identify a preventable causal delay.

**Historical cost context**, [Tufts 2016 public abstract](https://pubmed.ncbi.nlm.nih.gov/30227022/), read through Dia after incomplete web extraction. Direct-cost estimates use a 52-protocol subset: median substantial-amendment costs $141,000 for Phase II and $535,000 for Phase III. Old nominal costs; not current quotes. [Moore et al. 2018 public abstract](https://pubmed.ncbi.nlm.nih.gov/30264133/) estimates costs for 138 pivotal trials supporting 59 FDA approvals in 2015–2016: median $19.0m, IQR $12.2m–$33.1m. Software cost model, approval-selected sample; not total development cost or current typical Phase II price. Neither enters the commercial model as a fee benchmark.

**Enrollment failures**, [Baldi et al. full cardiovascular registry paper](https://pmc.ncbi.nlm.nih.gov/articles/PMC5577897/), June 2017; Dia overcame bot-check extraction. Starts 2006–2015, registry as of March 27, 2016. Of 8,900 closed trials, 11% terminated; poor accrual accounted for 41% of terminated trials. Missing reasons and geographic registration differences limit inference. The denominator is terminated cardiovascular studies, not all clinical research. Antidote's [homepage](https://www.antidote.me/) separately advertises an over-80% delay claim without a source visible in the checked text; excluded as a universal benchmark.

## 5. Registry evidence and capacity funnel

[ClinicalTrials.gov API docs](https://clinicaltrials.gov/data-api/api) were read in Dia; raw responses retrieved through public API. collect-registry.py saves registry-sample.json and registry-summary.json with URL, retrieval timestamp, version and SHA-256. Snapshot retrieved 2026-11-03 04:10 UTC; source dataTimestamp 2026-11-02T10:00:05, API 2.0.5.

The deliberately broad atopic-dermatitis / RECRUITING query returned 182 hits; only the first 10 records were saved. These include observational and non-Phase-II studies. It is a tool demonstration and lead-source sample, **not a market cohort, complete export, current site-capacity measure or buyer list**. A record marked recruiting can have an old update date. No outcome/cost/delay estimate was computed from it.

A prospective target-cohort extraction would require explicit filters for interventional, Phase II, relevant indication, industry sponsor and time period; deduplicate sponsor/program records, verify investigational product and true site recruitment, and inspect record histories where planned/actual dates matter. Sponsor class is not company size. Registry completion dates alone cannot identify avoidable recruitment delay.

Transferable capacity funnel: listed sites → sites with the indication and necessary assessments → sites with qualified staff/time and approved access → documented reachable eligible people → clinically confirmed/consenting patients → randomized → retained with usable endpoint data. Each step can shrink the previous stock. ClinicalTrials.gov contains no hospital-level patient roster; TriNetX network records are also not a consented recruitment cohort.

## 6. Competition and market structure

See competitor-source-notes.md for the detailed first-party financial excerpts and page dates. [IQVIA FY2025 10-K](https://www.sec.gov/Archives/edgar/data/1478242/000162828026008322/iqv-20251231.htm) establishes $8,896m R&DS revenue and $32.7bn backlog, with cancellation/timing qualifications. [Medpace FY2025 10-K](https://www.sec.gov/Archives/edgar/data/1668397/000166839726000006/medp-20251231.htm) establishes $2,530.2m revenue, $3,027.2m backlog, and small/mid biopharma competition. Incumbents already sell clinical execution. Segment accounting includes different cost and pass-through structures; revenue is neither software spend nor a clean capture opportunity.

[ICON 2025 results](https://investor.iconplc.com/news-releases/news-release-details/icon-reports-fourth-quarter-and-full-year-2025-results-and), May 27, 2026, separates accounting restatements from backlog policy changes. [SEC 20-F](https://www.sec.gov/Archives/edgar/data/1060955/000162828026045649/iconplc2025annualreport20-f.pdf) was opened by teammate; parent web fetch hit file-size limit. Results independently verify approximately $8,251m revenue; notes retain precise filing value. Do not mix $14.9bn accounting obligations with $21.8bn revised backlog. No total CRO TAM is asserted.

| Competitor / direct official source | Occupied surface | Implication; evidence limit |
|---|---|---|
| [Unlearn](https://www.unlearn.ai/) | Prognosis/digital twins and design decisions | Statistical method and regulatory expertise needed; no blanket approval or independent effect size used |
| [Medidata](https://www.medidata.com/en/clinical-trial-products/unified-platform/) | Protocol/feasibility, EDC, CTMS, patient and data workflow | Platform distribution and validation surface already exist; not a measured comparison |
| [Paradigm Health](https://www.paradigmhealth.ai/solutions/sponsors) | Provider-integrated design, activation, enrollment, capture | Closely overlaps proposed integrated thesis; vendor-described scope, not independently proven results |
| [TriNetX](https://trinetx.com/) | RWD network, analytics and site/patient insight | Network/data advantage; counts omitted because metrics are vendor claims and site descriptions differ |
| [Formation Bio](https://www.formation.bio/) | Acquires/develops clinical assets using technology | Captures therapeutic asset value; different risk and financing from tools/services |
| [Antidote](https://www.antidote.me/) | Recruitment service and patient-facing search | Matching is established; validate downstream randomization/retention rather than referral traffic |

Defensibility hypothesis: an accepted, indication-specific operating workflow with trusted site relationships and reusable evidence/QA could matter. Generic document drafting is readily available and may be bundled. Whether service can achieve repeatable margin, or software has better economics with existing distribution, is unanswered.

## 7. Singapore / SEA angle

[HSA CTA/CTN application](https://www.hsa.gov.sg/other-regulations/clinical-trials/application/apply-cta-ctn/), page updated October 31, 2026: standard CTA 30 working days; qualifying Phase I exceptions 15, Class 2 CTGTP 60, CTN 5. These apply to different routes. CTA can run alongside IRB submission; CTN follows IRB approval. Stop-clock clarification periods are excluded. These are processing windows, not full startup timelines.

[HSA sponsor guidance](https://www.hsa.gov.sg/other-regulations/clinical-trials/conducting-clinical-trials/sponsor/) retains sponsor responsibility when services transfer; local sponsor should be an ACRA-registered entity. Supplying software does not automatically make the vendor that sponsor. Singapore offers a concrete regulatory/process context for discovery; no evidence here establishes available dermatology cohorts, cheaper sites, SEA-wide harmonization, local EHR access, recruitment superiority or cost advantage. Treat each country and institution separately. Do not extrapolate Singapore's clock to SEA.

## Provider-disagreement and claim-calibration log

| Apparent conflict | Resolution / disposition |
|---|---|
| “89% faster regulatory documents” versus Enveda technical scope | Keep batch-record quality-review timing distinct from first drafts and end-to-end regulatory/clinical delivery. Explicit advisory/unvalidated status controls stronger compliance wording in abstract |
| “All 11 issues caught” versus report's run qualification | Aggregate across runs, two matches required explanation. Never claim perfect single-run sensitivity |
| 2016 avoidable amendment share 45% versus 2024 unavoidable share 77% | Different cohorts/periods, pandemic effects and classification. Do not combine into universal preventable share or multiply by old costs |
| “41% recruitment failure” versus actual denominator | 41% of terminated cardiovascular trials; only 11% of closed terminated in that historical study |
| Vendor claims “80% delayed” versus scoped published failures | Different outcome/denominator and unsupported homepage sourcing. Exclude general 80% slogan |
| Digital twins versus externally observed controls | Prognosis/simulation, covariate adjustment and nonrandomized replacement need different arguments. Use explicit method names |
| NAM headline versus clinical development | Preclinical safety policy, not human efficacy replacement |
| ICON investor link labeled 2025 redirects to 2023 | Reject redirected PDF; use report-specific SEC source and official FY2025 release |
| ICON $14.9bn vs $21.8bn | Accounting performance obligations versus revised-method backlog. Keep distinct; $3.9bn policy adjustment prevents naive trend chart |
| TriNetX page describes more than 13,000 sites and later 14,200+ | Vendor's own differing descriptions; omit scale numbers, do not resolve by guessing |
| Service supplier profitable in base versus customer value | Different equations; base modeled customer value fails fee. Both must pass before investment |

## Public / inaccessible / paywalled boundary

- Open FDA/HSA sources, full Tufts duration/TrialGPT/cardiovascular papers, SEC or company public filings/pages, registry API, and public Tufts cost/amendment abstracts were read.
- Tufts CSDD subscription Impact Reports and paid proprietary trial benchmarking datasets were not purchased or accessed. No inaccessible table/cost breakdown inferred from previews. Abstract-supported numbers are marked as such; deeper methodological questions remain.
- Full publisher text of the 2016 and 2024 Tufts amendment papers was not used; available abstracts support the bounded numbers. Paywall status beyond public abstract was not independently tested, so no assertion about the unseen text.
- The optional Tufts DCT white-paper URL failed web fetching. It is logged in needs-browser.md; no claim depends on its contents. No paywall/auth bypass attempted.
- Dia provided the four sources noted above, each in a task-owned tab subsequently closed. No other agent's tabs were touched. Browser access succeeded; there is no general sandbox browser block.

## Most valuable next evidence

Actual protocol-to-startup timestamp records, competing-trial/site workloads, medical/QA review corrections and hours, buyer-approved avoidable cash, paid procurement terms, cancellation/indemnity/insurance costs, and legal access rights. A paper about document speed cannot substitute for these commercial and clinical-operational measurements. Owners, timing and stop/go rules are in research-map.md; all commercial arithmetic and sensitivity assumptions are in scenario-model.json and scenario-arithmetic.md.


## Phase 2 Gate 1 corrections · 3 November 2026

Applied before narrative drafting. E05 drops the legal characterization “nonbinding”; the public narrative describes final-guidance status and continuing responsibilities. E10 flags the source inconsistency: study text gives 2006–2015, Table 2 gives 2005–2015; the public narrative uses a historical cardiovascular cohort without choosing between them. E11 detailed TrialGPT percentages/sample counts are omitted from the public narrative; no fresh full-text reconfirmation is claimed. E02 remains company-reported and manufacturing-review-specific. E08–E09 remain sampled observational historical cohorts; their separately defined intervals are never added. Original source notes remain research history, not permission to publish excluded numbers.
