# Market evidence — trust and anti-abuse in the agent era
Research cutoff: 3 November 2026. Phase 1 only. Public first-party evidence; no employer-private data, customer interviews, paid reports, vendor trial, benchmark or production enforcement. No Gemini discovery pass requested or performed.

## Decision-relevant finding
Pursue discovery for **recruiter authority plus scam-exposure prevention** for a narrowly qualified job/worker marketplace. Do not yet build a universal agent passport or generic risk-score company. This is a founder judgment under uncertainty, not an observed commercial result.

The broad options already have suppliers. The vertical option also has competitors and a serious observability problem. Its remaining hypothesis is that a platform will pay for a linked, reviewable determination: whether this person represents this employer, whether this opportunity is consistent with that authority, and whether this contact attempt shows harmful behaviour. A textual “scam score” alone is too easy to substitute.

## Source notes and exact boundaries
All URLs are direct and were accessed 2026-11-03. Short summaries below complement the ledger; claims remain bounded by each entry's limits. Read methods: web search for discovery, then opened primary page bodies/PDF text. Apple was additionally read in an owned Dia tab. No search-only lead is admitted as verified evidence.

### Practitioner seed — provenance resolved by parent
- **E01 — Nikita Bier:** https://x.com/nikitabier/status/2116246313914479047 . Parent supplied the verbatim post and author reply in parent-notes.md, read on 2026-11-02 through `socialctl x thread`; posted 2026-10-30T19:10:13Z. The Phase 1 Dia fetch failed, but the dated parent capture resolves attribution for Phase 2. This is a senior practitioner's stated experience, not an independently measured study. His 3–12-month defence lifetime and annual checkpoint reinvention are experiential claims. His CAPTCHA view and near-bulletproof aspiration are not established efficacy facts. His recommended in-house scoring stack is direct counterevidence to vendor-demand assumptions; his KYC reply adds a privacy/speech trade-off, not a general ban on identity verification. No new fetch was performed for this correction.

### Protocol and infrastructure
- **E02 — IETF draft version 01:** https://www.ietf.org/ietf-ftp/internet-drafts/draft-ietf-webbotauth-httpsig-protocol-01.html . Opened full document; especially §4.6 and §§5.2–5.4. The boundary is unusually explicit: human authentication and authorization/delegation are outside scope. Covered request components and freshness determine replay/content protection; a signature is not necessarily a commitment to an entire action. This is evolving standards work; use the frozen version URL.
- **E03 — Cloudflare Web Bot Auth:** https://developers.cloudflare.com/bots/reference/bot-verification/web-bot-auth/ . Opened setup, registration, signed headers, limitations. Platform verification and generic cryptographic verification are distinct integration choices. Do not claim arbitrary unknown signatures receive trusted-bot status.
- **E04 — Cloudflare score docs:** https://developers.cloudflare.com/bots/concepts/bot-score/ . Opened body, scale, availability and uncomputed case. The variable concerns automation, which is different from recruiter malice. This is also a warning against a universal numerical score API without a clear target outcome.
- **E05 — Pay Per Crawl:** https://developers.cloudflare.com/changelog/post/2025-07-01-pay-per-crawl/ and https://developers.cloudflare.com/ai-crawl-control/features/pay-per-crawl/ . Both opened. Historical private-beta launch and current Beta navigation are distinct from broad adoption. No crawl revenue estimate is used.
- **E06 — Visa:** https://investor.visa.com/news/news-details/2025/Visa-Introduces-Trusted-Agent-Protocol-An-Ecosystem-Led-Framework-for-AI-Commerce/ and https://developer.visa.com/docs/trusted-agent-protocol . Read announcement scope and developer explanation. Commerce recognition includes trust-policy semantics above signing. Verify merchant/network contracts before making liability or interoperability promises; not investigated here.
- **E07 — Mastercard:** https://investor.mastercard.com/investor-news/investor-news-details/2026/Mastercard-Advances-Agentic-Commerce-With-New-Trust-and-Intelligence-Services/default.aspx . Body read. Announcement distinguishes US testing of the initiation score from the wider framework and future intelligence expansion. A probability of agent involvement is not a probability of fraud. No stated future adoption forecast is imported.

### Checkpoints answer different questions
- **E08 — Google:** https://developer.android.com/google/play/integrity/overview . Opened verdict descriptions, anti-abuse strategy, shadow rollout, content binding and outage considerations. The platform itself recommends complementary signals.
- **E08 — Apple:** https://developer.apple.com/documentation/devicecheck/establishing-your-app-s-integrity . Web open returned a JS shell; read full public article with Dia `text`. Key creation, server attestation, one-time challenges, assertions and reinstall behaviour were visible. Both Apple/seed owned tabs were closed. No device or app was tested.
- **E09 — FIDO:** https://fidoalliance.org/passkeys/ . Opened owning alliance explanation. Authentication strengthens account continuity; it does not establish a business relationship.
- **E10 — World:** https://whitepaper.world.org/achieving-proof-of-human . Opened whitepaper. Treat claims as provider design evidence, not an independent adversarial evaluation. Physical verification, privacy acceptability and audience reach require separate investigation; live adoption counts omitted.
- **Design implication (inference):** choose the least burdensome challenge that answers the missing question. Domain control, a company callback/authorized-admin approval, account reauthentication, and optional identity checks answer different questions. Phone possession is not proof of recruiter authority; face liveness is not proof a job exists. None is claimed to be bulletproof.

### Existing vendor map — buy, partner, configure, then compare
| Provider/source | Documented or advertised job | What an entrant still must demonstrate |
|---|---|---|
| Stytch — https://stytch.com/fraud | Device intelligence, risk verdict, rate limits, agent monitoring | Incremental harmful-contact reduction after tuning, at matched friction |
| Persona — https://help.withpersona.com/articles/3OGe9IwySJmDvXL2DOfV7N/ | Registry/individual checks, case management, decisions | Representative authority and SEA source fit beyond company existence |
| Sift — https://siftscience.zendesk.com/hc/en-us/articles/1500007825722-Text-Clustering-for-Content-Integrity | Related scam/spam content investigations and bulk action | Local multilingual lift and authority linkage versus incumbent configuration |
| SEON — https://docs.seon.io/api-reference/fraud-api | Email/phone/IP/device enrichment and scoring | Workflow value above bought signals; quoted costs for actual use |
| Castle — https://docs.castle.io/docs/integration-guide | Client signals, server policy calls, allow/challenge/deny | A reason to replace or complement an existing integration |
| Arkose — https://www.arkoselabs.com/arkose-bot-manager | Adaptive challenges and advertised agent-trust orchestration | Better measurable outcomes than its current offering |
| Fingerprint — https://fingerprint.com/products/bot-detection/ | Bot/agent detection with plan-dependent signals | Intent/authority value beyond automation detection |

All these page bodies were opened. Their menu claims establish competition, not parity or validated effectiveness. No claim is made that one vendor is the best. No audited accuracy, price comparison or procurement shortlist was obtained.

**Public price anchor:** https://seon.io/pricing/ displayed a Starter plan at $699/month with 2,500 fraud checks and a custom Premium tier. This is a package, not a marginal rate. We do not assume it buys employer authority verification or multiply its allowance into enterprise costs. All unit costs in the scenario are explicitly invented.

### Official harm evidence — preserve denominator, period and category
- **E16 — Singapore annual 2025:** https://www.police.gov.sg/-/media/SPF/Advisories/Scams/Annual-Scam-and-Cybercrime-Brief-2025.pdf . Read report text, scam-only denominator and job category. The annual stock is historical harm, not a startup's reachable customer budget. Cases fell from 9,043 in 2024 to 5,575 in 2025, and job-scam losses fell 20.9% year on year. Material burden must not be presented as growth.
- **E17 — Singapore H1 2026:** https://isomer-user-content.by.gov.sg/537/a4a04eb7-0d38-4cd0-86da-cea81f214ff2/Mid-Year%20Scam%20and%20Cybercrime%20Brief%202026.pdf . Found through official index https://www.scamshield.gov.sg/resources/scams-and-cybercrime-briefs/ and opened full PDF. Job-scam section gives comparable prior-half-year figures and contact pathways. The leading causal ambiguity is exposure source: a job-board intervention cannot control every unsolicited message.
- **E18 — Indonesia:** https://portal.komdigi.go.id/kanal-publik/berita-kini/10526 . Full ministry body read; publication September 2026, reporting content removals. This measures enforcement activity, not prevalence. Overseas recruitment can involve trafficking and licensing beyond a domestic listing workflow; do not claim transferability.
- **E19 — Philippines:** https://pia.gov.ph/news/dmw-reiterates-warning-vs-fake-work-abroad-offers-on-social-media/ . Full government agency body read. It transmits a DMW warning, not an original case dataset. No Philippine numerical loss claim is made.
- **E20 — Singapore specific mechanism:** https://www.police.gov.sg/Media-Hub/News/2026/05/20260515_joint_advisory_on_job_scams_involving_the_impersonation . Read body and caveats. Authentic agency details are compatible with impersonation. The relevant test is the relationship between claimant, organization and action, not just whether the organization is on a registry.
- **E21 — FBI IC3 2025:** https://www.ic3.gov/AnnualReport/Reports/2025_IC3Report.pdf . Opened report tables, AI section and employment definition. Complaint categories and AI descriptors are different axes and can overlap. “AI-related” is reported information, not a causal experiment or all AI crime. The US evidence does not identify SEA buyer willingness to pay.
- **E22 — Anansi:** https://arxiv.org/abs/2602.24223 . Opened the rendered article and read the author-reported pipeline and infrastructure findings; no independent dataset audit was performed. Authors' infrastructure-reuse findings motivate linked evidence rather than text-only classification. Dataset selection and active engagement differ from a permissioned production feed; no headline recovery total or production performance is imported.
- **E23 — Regulatory scope:** https://www.police.gov.sg/Knowledge-Hub/Legislation/Online-Harms-Act-Overview/Codes-of-Practice and https://www.police.gov.sg/Media-Hub/News/2026/08/20260818_issuance_of_codes_of_practice_under_the_online_criminal_harms_act . Opened list and issuance announcement. Page footer update metadata appears earlier than the described 2026 codes; cite access date and dated announcement. Do not suggest every job board is designated or that this product guarantees compliance.

## Three wedge comparison — original inference, not measured market scoring
| Wedge | Buyer / useful output | Structural difficulty | Research decision |
|---|---|---|---|
| A. Agent identity/KYA | Infrastructure or platform team; known sender and accountable admission policy | Distribution, trust-root ownership, opt-in and compromised signers; major networks/CDNs/vendors already present | Integrate standards as signals. Do not start a universal root without a specific underserved buyer |
| B. Risk scoring + checkpoint | Trust/safety/security lead; incremental loss reduction under a friction budget | Broad incumbents, cold-start labels, model drift, privacy and in-house context | Necessary machinery; weak standalone differentiation without measured lift |
| C. Recruiter authority + scam exposure | Marketplace trust/safety head plus operations/economic sponsor; prevented reachable harmful contact and cheaper investigation | Data rights, outcome visibility, local context, authority checks and review burden | Best discovery candidate; paid pilot required before product build |

SEA is an access and learning hypothesis, not a proven market advantage. The founder's public engineering background can help formulate workflows; it supplies neither permission to use employer data nor evidence of customer need. Prospect any pilot outside private workplace context unless separately authorized. No private company performance, vendor relationship, user record or anecdote appears here.

## Provider-disagreement and claim-calibration log
| Apparent conflict | Resolution | Consequence |
|---|---|---|
| Bier says CAPTCHAs obsolete; Arkose still markets adaptive challenges | Parent-supplied post establishes his view; neither practitioner experience nor a vendor product menu establishes universal efficacy | Attribute and calibrate his view; neither categorical obsolescence nor a bulletproof replacement is admitted as fact |
| KYA marketing says “trust”; IETF explicitly excludes authority/delegation | Different protocol layers and trust policies | Explain identity, permission and harmful intent separately |
| Bier recommends an in-house scoring stack; a startup might infer vendor demand | Recommendation is a practitioner design preference, not procurement evidence | Strengthen the in-house bear case; require paid buyer validation |
| A single 0–100 risk score sounds portable; Cloudflare scores automation in the opposite direction from many risk scores | Score meaning, direction and calibration differ | Define the target and evaluate thresholds on local traffic |
| “Agent era means rising scams”; latest SG job-scam data decline | Threat capability and realised harm are different quantities | No monotonic growth premise; preventive controls may be working |
| Registry verification versus genuine-licence impersonation | Entity existence does not establish an individual's mandate | Test authority linkage and recheck sensitive changes |
| Vendor accuracy superlatives versus a rare-abuse production cohort | Missing common denominator, class mix and friction definition | No cross-vendor numeric ranking; use prospective matched comparison |
| SG cases, ID removed content and US complaints | Different units and collection processes | Never aggregate into a regional market number |
| Visa announcement and Mastercard launch language | One is a protocol, another includes services under US testing | Mark announced/tested/observed separately; no global-GA inference |
| Older static Sift documents versus live help page | Documentation can describe one feature, not all current product behaviour | Do not claim whole-product batch delay or missing capability |

## Public/paywalled/private boundary
No paywalled or paid analyst report was needed or accessed. No private procurement quotes, pricing beyond public menus, representative-language benchmark, conversion lift, customer labels, renewal data or internal fraud records were obtained. We infer none of their contents. Public vendor cases are selected marketing evidence; no ROI claim from them is used. Original webpage media are linked, not copied for publication. No access control was bypassed.

The seed X post and reply failed in the Phase 1 Dia attempt; the parent subsequently supplied the dated verbatim source in parent-notes.md, resolving that handoff. Its factual/experiential limits are recorded in E01. A nonessential OJK portal timed out in web fetch; no claim from it is admitted. Persona/Sift guessed product URLs failed in web fetch, but the actual first-party help pages above were opened and read. Apple required Dia and succeeded.

## What the headline omits
1. **Attack cost is not cost per successful scam.** No measured before/after agent cost was found for this wedge. Human cooperation, accounts, distribution, cash-out and enforcement may still bind success.
2. **The payer may not bear the victim's loss.** Establish platform-captured value separately from societal harm. A marketplace may have little direct refund exposure.
3. **Labels arrive late and selectively.** Reports and confirmed bad accounts overrepresent caught attacks. Random sampling of unflagged traffic and independent adjudication matter.
4. **Stopping a bot can stop a good customer.** Evaluate beneficial recruiting/job-search agents and accessibility uses. A human scammer passes many humanness tests.
5. **Review, appeal and integration are part of cost.** A scoring API without an operating owner transfers work rather than removes it.
6. **Trust data creates its own responsibility.** Minimise retained personal content; define consent/legal basis, retention, access, deletion, security and local data transfers with appropriate counsel. This is a proposed design workstream, not a legal conclusion.
7. **Defensibility requires permission and outcomes.** A cross-platform graph is not automatically lawful, available or valuable. No cross-customer blacklist is assumed. A source/label-poisoning attack can damage an innocent employer.

## Next evidence to buy with founder time
Request historical investigations, ordinary accepted listings, recruiter authorization checks, contact-change histories, appeal outcomes and the last incumbent evaluation from explicitly consenting pilot organizations. Interview the person owning both trust operations and budget. Obtain actual signal/checkpoint quotes at the proposed volume. Compare configuration of existing vendors and a competent internal rules baseline before building new models. Nothing has been requested externally in this phase.

## Additional direct bear-case check (E26)
Opened https://au.seek.com/career-advice/article/ways-to-spot-a-job-scam and https://www.nasc.gov.au/system/files/nasc-job-scam-fusion-cell-final-report-2025.pdf . These establish internal screening and coordinated job-scam disruption/intelligence work. The proposed authority/contact workflow must improve on an existing vertical operation, not just a generic bot detector. This is Australian public context; no private SEA employer operation is inferred. No takedown counts or selected victim anecdote is treated as causal product ROI.
