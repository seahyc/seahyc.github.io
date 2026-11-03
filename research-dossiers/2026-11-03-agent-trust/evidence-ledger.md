# Evidence ledger — agent trust
Research date/access date for every entry: **2026-11-03**. Phase 1. Primary public sources read through web page bodies/PDF text or Dia, as recorded in market-evidence.md. Confidence refers to the stated narrow claim, not universal effectiveness. Vendor facts mean facts about documented offerings. No customer data, outreach, product trial or employer-private information was used.

## E01 · Practitioner seed supplied and provenance resolved
- Type: **fact about a practitioner statement / experiential opinion**, confidence high for the parent-supplied attribution; not independently re-fetched by the Phase 2 correction agent. Posted 2026-10-30T19:10:13Z; read by the parent on 2026-11-02 via `socialctl x thread` in YC's signed-in X session. Verbatim post and author's KYC reply are preserved in parent-notes.md.
- Direct URL: https://x.com/nikitabier/status/2116246313914479047
- Proves: Nikita Bier advocates in-house risk scoring informed by multiple signals, selective checkpoints and attention to good-user friction; his own reply raises privacy/speech concerns about universal KYC. His account describes fixes lasting 3–12 months and yearly checkpoint reinvention as practitioner experience.
- Does not prove: measured defence lifetimes, universal CAPTCHA obsolescence, near-bulletproof checkpoint efficacy, causal LLM attack-cost changes, market size or willingness to buy a vendor. Counterevidence: existing suppliers still offer adaptive challenges (E15); marketed availability also does not prove effectiveness.
- Impact: attribution may now be used with explicit experiential limits. Paraphrase rather than reproduce the long supplied quotation. The in-house recommendation strengthens the vendor bear case; it does not validate external-vendor demand. Earlier failed Dia reads remain an access-history fact, resolved for the seed by the dated parent handoff.

## E02 · Bot identity protocol deliberately excludes delegation and human authentication
- Type: **fact about draft scope**; confidence high. Publication 2026-10-29, version 01; Internet-Draft, not final standard.
- Direct URL: https://www.ietf.org/ietf-ftp/internet-drafts/draft-ietf-webbotauth-httpsig-protocol-01.html
- Proves: §§4.6, 5 and 7 distinguish signing identity from human authentication, authorization, delegation and trust exchange.
- Does not prove: agent harmlessness, user consent or protocol deployment share. Counterevidence: commerce layers add separate semantics (E06–E07).
- Impact: a signature is an input to a decision, not a safe-action verdict. Version-pin implementations and check replay/content binding.

## E03 · Cloudflare documents Web Bot Auth verification
- Type: **fact about vendor documentation**; confidence high for capability description, untested. Page updated 2026-10-08.
- Direct URL: https://developers.cloudflare.com/bots/reference/bot-verification/web-bot-auth/
- Proves: documented Ed25519 keys, key directories, bot registration, signed requests and verification; implementation limitations are listed.
- Does not prove: universal interoperability, all-agent adoption or abuse reduction. Counterevidence: supported components differ from full RFC 9421.
- Impact: do not sell another basic signature verifier as an uncontested company wedge.

## E04 · Cloudflare bot scores measure automation
- Type: **fact about documented scoring**; confidence high for stated scale. Page updated 2026-08-26.
- Direct URL: https://developers.cloudflare.com/bots/concepts/bot-score/
- Proves: 1–99 score, higher means more likely human; granular scores require Enterprise Bot Management; rules can allow/challenge/block.
- Does not prove: calibrated fraud probability or that a human is safe. Counterevidence: verified automated traffic can be wanted; a score of zero is uncomputed.
- Impact: separate automation, identity, authority and harmful-action risk. Never combine vendor scores without checking direction and calibration.

## E05 · Crawl monetisation already has an infrastructure supplier
- Type: **fact about product announcement/docs**; confidence high for offering, not revenue. Launch 2025-07-01; docs accessed 2026-11-03.
- Direct URLs: https://developers.cloudflare.com/changelog/post/2025-07-01-pay-per-crawl/ ; https://developers.cloudflare.com/ai-crawl-control/features/pay-per-crawl/
- Proves: launch was private beta; current docs label Pay Per Crawl Beta. Publishers can select charged crawlers and prices.
- Does not prove: broad paid demand, current general availability or successful exclusion of evasive traffic. Counterevidence: payment cooperation is a different problem from scam prevention.
- Impact: publisher crawl billing is an adjacent market; exclude its revenue from consumer-abuse TAM.

## E06 · Visa supplies a commerce-specific trust layer
- Type: **fact about announcement and technical docs**; confidence high for announced scope. Launch 2025-10-14.
- Direct URLs: https://investor.visa.com/news/news-details/2025/Visa-Introduces-Trusted-Agent-Protocol-An-Ecosystem-Led-Framework-for-AI-Commerce/ ; https://developer.visa.com/docs/trusted-agent-protocol
- Proves: Cloudflare collaboration, signed agent requests, consumer recognition/payment concepts and Visa-approved-agent recognition. Initial release described Visa-network scope.
- Does not prove: a universal Internet trust root, measured scam prevention, adoption or contractual liability allocation. Counterevidence: implementation and commerce policy still needed.
- Impact: partner/interoperate rather than presume a blank agent-commerce identity market. Traffic-growth marketing numbers excluded.

## E07 · Mastercard is adding agent-related intelligence, with testing caveats
- Type: **fact about announcement**; confidence high for statement, untested outcome. Publication 2026-09-30.
- Direct URL: https://investor.mastercard.com/investor-news/investor-news-details/2026/Mastercard-Advances-Agentic-Commerce-With-New-Trust-and-Intelligence-Services/default.aspx
- Proves: Agent Pay Trust Framework covers identity, intent, controls, execution and intelligence; agent-initiation probability score described as rolling out for US testing; Cloudflare/Skyfire work named.
- Does not prove: global GA, probability of maliciousness, or realised fraud savings. Counterevidence: initial testing and planned enhancement.
- Impact: incumbent networks already compete on context as well as identity; KYA is not an unoccupied category.

## E08 · Device attestation supplies narrower evidence
- Type: **fact about platform docs**; confidence high for design, not bypass resistance. Undated live documentation.
- Direct URLs: https://developer.android.com/google/play/integrity/overview ; https://developer.apple.com/documentation/devicecheck/establishing-your-app-s-integrity
- Proves: Play Integrity offers app/device verdicts and recommends additional signals plus observation before enforcement; App Attest certifies an app-instance key with server challenge/assertion validation and availability handling.
- Does not prove: user honesty, recruiter authority, accessible coverage for every device or web browser. Counterevidence: platform scope, unsupported clients and real-device abuse remain.
- Impact: buy/integrate signals where appropriate; do not claim a device certificate certifies a job offer.

## E09 · Passkeys authenticate account access
- Type: **fact about authentication design**; confidence high, owning standards alliance. Undated page.
- Direct URL: https://fidoalliance.org/passkeys/
- Proves: public-key, phishing-resistant authentication offering.
- Does not prove: employer affiliation, a job's existence or benign intent. Counterevidence: a scammer can authenticate to their own account.
- Impact: useful against account compromise; separate from recruiter authorization and scam adjudication.

## E10 · World ID targets proof of human
- Type: **fact about provider design**; confidence high for description, untested efficacy. Undated whitepaper.
- Direct URL: https://whitepaper.world.org/achieving-proof-of-human
- Proves: proposed/deployed proof-of-human architecture uses Orb, multiparty computation and zero-knowledge authentication.
- Does not prove: recruiter authority, local coverage, acceptable user conversion or inability to buy cooperation. Counterevidence: a real person can participate in fraud.
- Impact: consider optional checkpoint only after audience/privacy/availability tests. Do not quote live adoption counts without a dated measurement.

## E11 · Stytch already combines device signals, verdicts and agent monitoring
- Type: **fact about marketed offering**; confidence high for feature description, low for efficacy. Undated live page.
- Direct URL: https://stytch.com/fraud
- Proves: device intelligence, allow/block/challenge outputs, rate limiting and AI-agent monitoring are advertised together.
- Does not prove: stated accuracy or latency under target traffic. Counterevidence: no shared evaluation cohort or good-user friction measure.
- Impact: generic score/checkpoint wrapper must demonstrate incremental lift; accuracy superlatives excluded.

## E12 · Persona covers business verification and orchestration
- Type: **fact about vendor documentation**; confidence high for feature description. Undated help page.
- Direct URL: https://help.withpersona.com/articles/3OGe9IwySJmDvXL2DOfV7N/
- Proves: registry checks, business reports, optional individual verification, cases and workflows are offered; certain report fields are US-specific.
- Does not prove: SEA coverage or that a legitimate registry entry establishes a representative's authority. Counterevidence: legitimate-agency details can be impersonated (E20).
- Impact: employer verification is crowded too; require person-to-business authority and contact-attempt evidence, not KYB rebranding.

## E13 · Sift already addresses scam content
- Type: **fact about vendor documentation**; confidence high for feature, untested performance. Undated live help page.
- Direct URL: https://siftscience.zendesk.com/hc/en-us/articles/1500007825722-Text-Clustering-for-Content-Integrity
- Proves: repeated-content clusters, scores, user flags, investigation and bulk action; FAQ describes batch clustering every other day.
- Does not prove: current all-product latency, SEA language quality or fake-recruiter detection lift. Counterevidence: human investigation and workflow remain part of the described product.
- Impact: scam-text classification and graph/cluster UI are not empty competitive spaces. Do not extrapolate this feature's batch timing to all Sift decisions.

## E14 · SEON already combines enrichment, device and scoring; list pricing is scoped
- Type: **fact about docs and public price menu**; confidence high for displayed offering, not target quote. Undated pages.
- Direct URLs: https://docs.seon.io/api-reference/fraud-api ; https://seon.io/pricing/
- Proves: modular email/phone/IP/device/rules/scoring API; Starter displays $699/month for 2,500 checks, Premium custom.
- Does not prove: a marginal API price, all-in verification cost, regional tax/contract terms or a price for this wedge. Counterevidence: modules, allowances and enterprise scope differ.
- Impact: useful buy-versus-build comparator; do not multiply $699/2,500 into a volume quote. Model costs remain assumptions.

## E15 · Castle, Arkose and Fingerprint overlap the broad wedge
- Type: **fact about docs/marketing**; confidence high for offered feature categories, low for untested efficacy. Undated pages.
- Direct URLs: https://docs.castle.io/docs/integration-guide ; https://www.arkoselabs.com/arkose-bot-manager ; https://fingerprint.com/products/bot-detection/
- Proves: Castle offers frontend signals/backend policy verdicts; Arkose markets adaptive challenges and an agent-trust layer; Fingerprint markets bot/agent detection and tier-specific signals.
- Does not prove: current effectiveness, independent comparative quality or a solved abuse problem. Counterevidence: attackers adapt; the named vendors do not establish target-market outcomes.
- Impact: reject universal CAPTCHA-obsolete assertion and claims that agents create an unserved generic scoring market.

## E16 · Singapore 2025 job-scam burden was material
- Type: **fact about reported police statistics**; confidence high for reported counts, not prevalence. Report published 2026-02-25; calendar 2025.
- Direct URL: https://www.police.gov.sg/-/media/SPF/Advisories/Scams/Annual-Scam-and-Cybercrime-Brief-2025.pdf
- Proves: 5,575 job-scam cases (14.9% of 37,308 scam cases), S$123.5m reported job-scam losses (13.5% of S$913.1m total). Cases declined from 9,043 in 2024 to 5,575 in 2025; job-scam losses declined 20.9% year on year.
- Does not prove: incidence on job marketplaces, platform financial exposure or LLM causality. Counterevidence: the year-on-year decline contradicts a growth inference; reporting and classification differ and the category includes task scams.
- Impact: establishes human harm, not revenue or market size. Do not confuse 41,974 scam-plus-cybercrime cases with scam-only denominator.

## E17 · Latest Singapore half-year data show decline and off-platform pathways
- Type: **fact about reported statistics/pathways**; confidence high for police report. Published 2026-08-26; H1 2026 versus H1 2025.
- Direct URL: https://isomer-user-content.by.gov.sg/537/a4a04eb7-0d38-4cd0-86da-cea81f214ff2/Mid-Year%20Scam%20and%20Cybercrime%20Brief%202026.pdf
- Proves: 2,247 job-scam cases versus 2,717 (−17.3%); losses S$34.9m versus S$64.0m (−45.5%); WhatsApp and Facebook common contact platforms. See the Job Scams subsection.
- Does not prove: an annual 2026 total, platform-addressable share or causal effect of a specific control. Counterevidence: decline contradicts assumed runaway growth.
- Impact: use latest comparable periods; do not annualise into a forecast. Workflow must catch reachable exposure, not promise control of all downstream channels.

## E18 · Indonesian authorities report fake overseas-job content removal
- Type: **fact about ministry statement**; confidence high for stated removal count, not unique scams. Published 2026-09-07; Jan–Aug 2026.
- Direct URL: https://portal.komdigi.go.id/kanal-publik/berita-kini/10526
- Proves: ministry says it and BP2MI removed 7,908 fake overseas-job advertisement contents.
- Does not prove: unique victims, cases, total prevalence, losses, job-board exposure or addressable spending. Counterevidence: takedown intensity changes counts.
- Impact: region-specific harm evidence; never sum this count with Singapore cases or US complaints.

## E19 · Philippines government warns about fake overseas recruitment
- Type: **fact about government advisory reporting**; confidence high for guidance, no prevalence estimate. Published 2026-06-02.
- Direct URL: https://pia.gov.ph/news/dmw-reiterates-warning-vs-fake-work-abroad-offers-on-social-media/
- Proves: DMW warning covers social-media offers, fees, recruiter licensing and personnel registration.
- Does not prove: case count, monetary market, local-job scope or API availability. Counterevidence: cross-border recruitment is a distinct workflow.
- Impact: Philippines expansion needs separate local partners, language and licensing/source checks.

## E20 · Agency existence and face checks do not settle authority
- Type: **fact about specific advisory**; confidence high for reported variant. Published 2026-05-15.
- Direct URL: https://www.police.gov.sg/Media-Hub/News/2026/05/20260515_joint_advisory_on_job_scams_involving_the_impersonation
- Proves: SPF/GovTech describe legitimate-agency impersonation using genuine licence details and social engineering of Singpass contact updates, despite existing security measures.
- Does not prove: biometric bypass, failure rate or identity verification uselessness. Counterevidence: deception induced authorized-looking user actions, rather than defeating every technical control.
- Impact: person-to-company authority and action context deserve a test; stronger identity collection alone is incomplete.

## E21 · US IC3 records employment and AI-related complaints, different categories
- Type: **fact about complaint data**; confidence high for published values, not causal prevalence. 2025 report, accessed 2026-11-03.
- Direct URL: https://www.ic3.gov/AnnualReport/Reports/2025_IC3Report.pdf
- Proves: employment category 24,688 complaints and $362,934,762 adjusted losses; AI-related information across categories 22,364 complaints and $893,346,472. Employment definition and appendices matter.
- Does not prove: overlap equals causality, complete reporting, incremental loss from AI or comparability to Singapore job-scam definitions. Counterevidence: self-report and descriptor ascertainment limits.
- Impact: supporting threat context; no cross-country TAM sum and no assertion that all employment complaints are fake recruiters.

## E22 · Research suggests infrastructure linkage is useful, not a commercial benchmark
- Type: **fact about authors' reported research**; confidence medium; preprint, not independently reproduced. Posted 2026-02-27.
- Direct URL: https://arxiv.org/abs/2602.24223
- Proves: Anansi authors describe automated engagement and reused messages/domains/wallet infrastructure in message-based job scams.
- Does not prove: target-language production recall, safe live scammer engagement, buyer demand or economic gains.
- Counterevidence: research collection differs from passive marketplace deployment. Impact: test linked behavioural/infrastructure features; no autonomous scammer engagement is proposed or performed.

## E23 · Singapore codes apply to designated services, not automatically every marketplace
- Type: **fact about regulator's published service lists**; confidence high for list, no legal advice. Live page with inconsistent update metadata; accessed 2026-11-03.
- Direct URLs: https://www.police.gov.sg/Knowledge-Hub/Legislation/Online-Harms-Act-Overview/Codes-of-Practice ; https://www.police.gov.sg/Media-Hub/News/2026/08/20260818_issuance_of_codes_of_practice_under_the_online_criminal_harms_act
- Proves: 2026 messaging, social-media and e-commerce codes are described with named designated services; issuance announcement dated 2026-08-18.
- Does not prove: blanket job-platform duty, startup compliance certification or universal biometric requirement. Counterevidence: service-specific scope and updated requirements need counsel/current review.
- Impact: potential buyer incentive, not a fabricated compliance deadline or forced market.

## E24 · Choose recruiter authority plus harmful-contact workflow as the first experiment
- Type: **inference / founder hypothesis**, confidence low until paid test. Date 2026-11-03.
- Source basis: E02–E04, E11–E15, E17, E20; original synthesis in research-map.md. No independent source URL can prove this recommendation.
- Proves: a coherent testable proposal, not product-market fit. Missing: budget, labels, representational authority ground truth, cross-customer repeatability.
- Counterevidence: incumbent configuration or in-house review may already be sufficient; real companies/recruiters can still scam.
- Impact: bounded paid validation only, no broad-platform build commitment.

## E25 · Economics, sample goals and stop/go thresholds are invented planning inputs
- Type: **assumptions / scenarios**, confidence high in checked arithmetic, low in inputs. Date 2026-11-03.
- Sources: scenario-model.json, scenario-arithmetic.md, build-model.py and research-map.md (original local artifacts; no external price evidence implied).
- Proves: sensitivities, break-even and explicitly proposed gates. Does not prove: achievable margins, willingness to pay, measured attack costs or a safety guarantee.
- Counterevidence: low case loses money; base buyer fails proposed benefit hurdle. Impact: quote and measure before building or investing.

## Material claims deliberately not admitted
CAPTCHAs are all obsolete; checkpoints can be near-bulletproof; every defence lasts a fixed number of months; KYC is universally too invasive; LLMs caused the observed scam totals; SEA losses are a fraud-software TAM; a verified human or company makes a job safe; cryptographic identity alone conveys consent; advertised vendor accuracy transfers to this wedge. None is established here.

## E26 · Job platforms and government already do vertical anti-scam work
- Type: **fact about platform disclosure and government report**; confidence high for reported activity, not quantified effectiveness. NASC report May 2025; SEEK page updated 2026-09-30, accessed 2026-11-03.
- Direct URLs: https://au.seek.com/career-advice/article/ways-to-spot-a-job-scam ; https://www.nasc.gov.au/system/files/nasc-job-scam-fusion-cell-final-report-2025.pdf
- Proves: SEEK describes an internal team screening advertisers/ads; NASC describes job-scam intelligence sharing, disruption and SEEK contribution (printed pp23–24).
- Does not prove: SEA readiness, an unmet vendor budget, procurement preference or causal reduction attributable to one participant. Counterevidence: coordinated anti-impersonation and verification work already exists.
- Impact: even the vertical wedge is not new; benchmark internal and coordinated workflows. Differentiation must survive this stronger comparator.
