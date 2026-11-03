pass

Independent Fieldbook Gate 1 review, 3 November 2026. Reviewed the settled research map, evidence ledger including E32/E21 addendum, market evidence, execution path, scenario JSON/arithmetic and collection-note boundaries. No research-pack edits made by this reviewer. This verdict permits phase 2 only when instructed; it is not clinical endorsement, legal clearance, customer validation or release approval.

## Source-specific verification

- **FDA rejection and the drug bear case:** independently opened the [actual CRL](https://download.open.fda.gov/crl/CRL_NDA215455_20240808.pdf). The signature page is dated 8 August 2024. Pages 2–4 identify safety-event collection/reliability, insufficient durable-effect evidence and selection/expectancy concerns, then recommend a new controlled trial with long-term blinded follow-up. E16 is faithful and does not infer permanent modality failure. Pages 5 and 8 also make clear that additional safety work and an eventual approval decision remain necessary.
- **Lilly headline:** the [SEC-filed July announcement](https://www.sec.gov/Archives/edgar/data/2081043/000114036126028604/ef20078103_ex99-1.htm) explicitly distinguishes approximately $2.8bn upfront equity value from approximately $1bn potential CVR value. It identifies intranasal BPL-003 as 5-MeO-DMT for TRD, initiated Phase 3 activities, and EMP-01 as an (R)-MDMA program in Phase 2 social-anxiety development. The [29 October SEC exhibit](https://www.sec.gov/Archives/edgar/data/59478/000005947826000104/q326lillysalesandearningsp.htm), first-page business-development bullet, confirms completed acquisition. The dossier does not borrow those valuations for its service or assert an unverified 2029 readout.
- **Australia:** independently opened [current TGA psychiatrist guidance](https://www.tga.gov.au/resources/guidance/accessing-mdma-34-methylenedioxy-methamphetamine-and-psilocybine-psychiatrist). It supports specialist psychiatrist/HREC/AP access for MDMA PTSD and psilocybine TRD, unapproved-goods status, no take-home protocol, additional state requirements, no PBS listing and public promotion restrictions. The dossier distinguishes access from marketing approval and from relationship enhancement, and separates current June 2026 guidance from the scheme's 2023 origin.
- **Compounding:** independently opened [FDA Q&A](https://www.fda.gov/drugs/human-drug-compounding/compounding-and-fda-questions-and-answers). It supports the central unapproved-compounded-product distinction. E13's pharmacy/formulation/API/state-specific uncertainty is retained; this review does not clear any supplier or formulation.
- **Human oxytocin translation:** independently checked the [Sikich author abstract](https://pubmed.ncbi.nlm.nih.gov/34644471/), especially results lines 243–245: 290 randomized/enrolled, 277 modified ITT, primary difference −0.2 with CI −1.5 to 1.0 and P=.61. The dossier correctly limits the null to the pediatric-autism study and does not call it a direct couples trial. Small acute effects and replication/delivery concerns are not conflated with durable relationship efficacy.
- **Couple-specific MDMA evidence:** independently read the [2020 author PDF](https://www.coupletherapyforptsd.com/wp-content/uploads/Monson-et-al-2020.pdf), including abstract/method context. It is an uncontrolled six-couple protocol, both partners treated, with no serious adverse events reported. The dossier does not interpret that tiny denominator as broad safety or isolate an incremental drug effect.
- **Strongest drug bull case:** E32 was added before the pack settled. Independently opened the [MAPP2 author abstract](https://pubmed.ncbi.nlm.nih.gov/37709999/) and [MAPP1 primary archive](https://pmc.ncbi.nlm.nih.gov/articles/PMC8205851/). MAPP2 abstract supports 104 participants and CAPS-5 changes −23.7 versus −14.8 with identical therapy, P<.001; MAPP1 primary archive and bibliographic record support the 90-person earlier study. E32 correctly acknowledges controlled PTSD evidence while declining to transfer it to pair-bond/conjoint/divorce outcomes or override the CRL. Nature direct repeat access was blocked, so no independent full-table or correction audit is claimed here.
- **Active conjoint trial:** independently fetched the [official CT.gov API](https://clinicaltrials.gov/api/v2/studies/NCT06044675). Exact design/status fields match E08; the sample is estimated individuals, not completed couples, and no results are posted.
- **Direct competition:** independently opened [OurRelationship's therapist page](https://www.ourrelationship.com/therapists/). Its explicit waitlist, pre-therapy and homework uses overlap the proposed starting job. The pack presents that as the main commercial threat and a reason to stop, rather than claiming an empty market or validated willingness to pay.

## Read-only arithmetic verification

Independently recomputed each case from JSON inputs rather than running the generating script. Real output:

```text
low -155.9 None
base 129.05 2325
high 249.03 1205
budget 60000
revenue 100m required 334449
trial RECRUITING {'date': '2026-08-19', 'type': 'ACTUAL'}
enrollmentInfo {'count': 60, 'type': 'ESTIMATED'}
allocation RANDOMIZED; interventionModel CROSSOVER; masking NONE
hasResults False
pilot2026 failure HTTP Error 503:
```

The case calculation subtracts loaded support, platform/payment, refund reserve and acquisition before fixed costs; positive contribution break-even uses ceil($300k/contribution). Negative contribution correctly has no volume break-even. Model inputs, stage budgets, founder draw and payout arithmetic are visibly scenarios, not quotes, achieved margins or expected valuations. No recurring LTV or automatic service-funded drug program is assumed.

## Execution and scope findings

The execution path meets Gate 1: a bounded non-drug service is selected from all four requested routes; stages, accountable owners, first-quarter spending, buyer types and channels, trust-building, skills/team, capital eligibility, jurisdiction-specific legal gates, founder compensation and falsifiers are concrete. Incumbent offerings, clinical research, training/funding rules and pharmaceutical-asset deals are sourced precedents with explicitly different implications. Day-90 commercial renewal and day-120–150 full support/outcome observation are distinguished. Consent/privacy failure can stop the program; healthy separation is allowed as a successful outcome. Venture scale remains unproved.

## Boundaries that must survive phase 2

The 2026 Morland pilot is collection-agent abstract-level evidence; this review's Europe PMC repeat returned 503 and PubMed yielded no usable body. No exact effect-size or broad-safety headline may be based on it. Current DSM-5-TR classification, original clip audio/panel context, exact compounder compliance, full Singapore statutory exemptions, buyer demand and supplier quotes remain expressly unverified. Doss abstract repeat retrieval failed in this review; its narrower functioning-versus-breakup claim was read by the lead and is transparently abstract-level in the pack. These are disclosed boundaries, not facts silently treated as verified-current. Do not broaden them during writing.

No material source/calibration or execution-path blocker remains in the settled pack. Phase 2 still requires its own narrative fidelity, visual coverage and release review.

---
# Gate 1 (parent-run, cross-model) · PASS · 3 November 2026
Independent Claude verifier (read-only; 14 primary sources opened). Confirmed: Lilly–AtaiBeckley SEC release ($6.75 + CVR ≤$2.50; ~$2.8bn + ≤$1.0bn; TRD assets; nothing on couples); Lilly Q3 (combined $4.2bn IPR&D with Curevo — not a price); Sikich NEJM 2021 null (n=290); Walum 2016 low power; Ditzen 2009 (47 couples, marginal p); Pitocin label (injectable, obstetric) contradicting "totally unregulated"; Singapore NDF Syntocinon POM; FDA compounding Q&A; Monson MDMA-CBCT pilot (6 couples, uncontrolled); NCT06044675 status; FDA CRL to Lykos (reliability of safety data); Doss 2020 (742 couples, no breakup reduction at 6 months); CDC divorce 2.4/1,000 (provisional 2023). Arithmetic recomputed — all match. execution-path.md meets the new Gate 1 requirement.
Required in Phase 2 (non-blocking):
1. No couples-distress/lifetime-divorce denominator in dossier: keep explicit "no TAM/distress denominator" language publicly; never imply market size from the divorce count.
2. Tie any CRL "durability/expectancy" wording to the specific letter sections, or limit to the confirmed reliability-of-safety-data finding.
3. Keep "learning service, not self-financing" visible (month-12 gate = 100 paid enrolments vs 2,325/yr break-even).
4. OurRelationship $249/$99/$79 labelled as collected by research agent, not re-verified; don't cite Lilly's $4.2bn IPR&D as the deal price.
