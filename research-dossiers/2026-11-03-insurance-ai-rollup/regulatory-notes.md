# Regulatory and market-structure notes — insurance AI roll-up

Research cutoff/access date: 2026-11-03. Scope: public primary evidence for Singapore, Hong Kong, Taiwan and a narrow US comparator. This is an evidence pack, not a transaction opinion. Public sources only. No git commands run.

## Decision implications

An acquisition buys an operating intermediary, its contracts, staff and liabilities. It does not itself buy an insurer's claims-paying discretion, a policyholder's underlying legal claim, or an insurer's subrogation recovery right. Keep four businesses separate in the thesis: placement/renewal brokerage; policyholder claims assistance; insurer-side claims administration/recovery under mandate; legal representation. The evidence below supports meaningful regulatory separation; the exact perimeter of a proposed service remains a pre-spend legal question.

Do not model a single Asian acquisition-approval timetable. Singapore has explicit prior control approval at a 20% threshold. Hong Kong's primary broker guidance reviewed here specifies notification after controller changes. Taiwan has its own licensing and management-recognition route. A licence is not a substitute for qualified people, client-money controls, professional indemnity and insurer/client permissions.

## Source ledger

### SG-1 — Entry and timing

- Claim/type: FACT. Companies carrying on insurance broking need MAS registration unless exempt; only Singapore-incorporated companies can apply. MAS assesses financial standing, business plans and fitness/propriety including substantial shareholders and staff.
- Direct source: https://www.mas.gov.sg/regulation/Insurance/Insurance-Broker-Registration-and-Approval
- Source date: page updated 2026-09-04; opened 2026-11-03. Confidence: high.
- Proves: a new licensed operation needs an institutional and personnel application, not just an AI product. Page's processing expectation is no more than six months only for straightforward, complete applications meeting all criteria.
- Does not prove: acquisition approval within six months; guaranteed registration; permission to perform financial advisory activities, legal services or every insurance line.
- Counterevidence/limitation: the page explicitly says complex/incomplete/inaccurate applications take longer. Do not substitute its entry-registration expectation for a change-of-control service level.
- Decision impact: initial operating plan must retain qualified staff and fund a regulatory runway; obtain transaction-specific timing from MAS/counsel.
- Tool evidence: opened page lines 23, 30–38 and 48–50 establish these propositions.

### SG-2 — Control, directors, acquisition structure, premium accounts

- Claim/type: FACT. Registered broker needs MAS approval before acquiring/holding directly or indirectly 20% or more of issued capital or voting power; CEO/director appointments also require prior approval. Toolkit also lists approval before the broker itself acquires 20% or more of another company's voting shares or merges.
- Direct source: https://www.mas.gov.sg/-/media/mas-media-library/regulation/guidance/cmi/compliance-toolkit-for-insurance-brokers/compliance-toolkit-for-ibs-14-nov-2024.pdf
- Source date: actual PDF says version 3.4, issued 2025-11-12, despite its old filename. Opened 2026-11-03. Confidence: high.
- Proves: control and serial-acquisition structure are regulatory design inputs. Page 7 also requires prior approval for insurance broking premium-account withdrawals outside Regulation 7(3).
- Does not prove: holding-company structure exemption; regulator approval duration; that client premiums can fund acquisitions; approval for all ancillary businesses.
- Counterevidence/limitation: toolkit is expressly not exhaustive and excludes bilateral requirements. Its comments on new subsidiaries/JVs/overseas branches warn approval is generally exceptional; do not assume unrestricted subsidiary expansion beneath the licensed broker.
- Decision impact: discuss proposed holding company versus acquisitions by the broker with counsel/MAS before signing. Treat premium balances separately from corporate cash.
- Tool evidence: PDF lines 133–167 (appointments/control), 202–237 (broker investments/new operations), 284–302 (premium withdrawal).

### SG-3 — Register size, not acquisition universe

- Claim/type: OBSERVED CURRENT DIRECTORY SNAPSHOT. MAS Financial Institutions Directory displayed 111 registered insurance brokers, 49 exempt insurance brokers, and one approved insurance broker.
- Direct source: https://eservices.mas.gov.sg/fid
- Date: accessed 2026-11-03; directory is dynamic, not a dated historical series. Confidence: high for displayed counts, medium as durable market-stock evidence.
- Proves: a bounded public starting list exists for target identification.
- Does not prove: 111 independent owner-managed sellers, non-life specialists, profitable companies, separate ultimate owners, or a revenue/commission share. Exempt firms are a separate category, not automatically acquisition targets.
- Counterevidence/limitation: global group subsidiaries and differently authorised businesses may appear; counts can change. Deduplicate group ownership and check business line, company status and accounts manually.
- Tool evidence: opened directory lines 198–216 displayed counts 111 / 49 / 1.

### HK-1 — Activity perimeter includes claims advice

- Claim/type: FACT. IA's activity-based regime requires an appropriate licence or exemption for regulated activities; making/settling an insurance claim appears among material decisions and matters of regulated advice.
- Direct source: https://www.ia.org.hk/en/supervision/reg_ins_intermediaries/introduction_of_insurance_intermediaries.html
- Source date: page updated 2024-09-13; opened 2026-11-03. Confidence: high.
- Proves: describing a product as claims assistance or advice does not automatically move it outside intermediary regulation. Broker company and technical representative (broker) are distinct licence types.
- Does not prove: every clerical software task needs a licence; a broker owns claims or may provide legal representation; automatic rights to claims data.
- Counterevidence/limitation: exemptions and exact activity matter. This page is an introduction, not an outsourcing/AI-specific determination.
- Decision impact: licensed staff should own regulated judgments; seek written advice on what an unlicensed software/service entity may actually do.
- Tool evidence: opened page lines 6–30 and 45–54.

### HK-2 — Controller changes: do not import Singapore's approval rule

- Claim/type: FACT. Under section 64ZZD, broker company must notify IA in writing within one month after someone becomes or ceases to be a director or controller; Form N5 with supporting documents is the stated route.
- Direct source: https://www.ia.org.hk/en/legislative_framework/Conduct_in_Focus_Issue_08_05.html
- Source date: December 2023; opened 2026-11-03. Confidence: high.
- Proves: controller changes carry a defined broker notification obligation, including relevant holding-company changes.
- Does not prove: every deal needs prior IA controller approval; no other approvals apply; a shareholder is automatically fit and proper; an acquisition can close unconditionally.
- Counterevidence/limitation: fitness/propriety and transaction-specific conditions still require review. Responsible-officer appointment approval is a separate question. No change-of-control processing promise found.
- Decision impact: legal diligence must distinguish broker notification from insurer-control approval regimes and preserve personnel/licensing continuity.
- Tool evidence: opened page lines 9–23, especially the one-month duty at line 14 and holding-company coordination at line 20.

### HK-3 — Client money, accountability and unlicensed referrals

- Claim/type: FACT. IA states broker companies must maintain capital/net assets and professional indemnity cover; receive client money only in designated client accounts, reconcile them regularly, and submit annual audited accounts and a special compliance report.
- Direct source: https://www.ia.org.hk/en/legislative_framework/Conduct_in_Focus_Issue_09_01.html
- Source date: August 2024 article; page updated 2026-05-26; opened 2026-11-03. Confidence: high.
- Proves: brokerage earnings cannot be measured by cash through client accounts. IA also rejects a mere rubber-stamp/post-box broking model: unlicensed referrers may introduce clients but must not perform regulated advice or activities.
- Does not prove: a ban on AI assistance; approved automation architecture; a minimum capital amount verified in this pass.
- Counterevidence/limitation: article addresses in particular Mainland visitor life insurance referral misconduct, so do not casually extrapolate its commission structures to commercial P&C.
- Decision impact: retain real broker service capacity and audit trail; automation must improve work rather than outsource regulated judgment to unlicensed parties.
- Tool evidence: opened article lines 13–15 (money controls), 41–55 (referral perimeter). Exact monetary capital floor withheld because a supporting IA brochure URL failed (below).

### HK-4 — Dated licence stock

- Claim/type: FACT. IA reports 814 broker companies at 2026-09-30; by licence line: 85 general-only, 32 long-term excluding linked-only, 104 long-term including linked-only, 160 general plus long-term excluding linked, 433 general plus long-term including linked.
- Direct source: https://www.ia.org.hk/en/infocenter/statistics/statistics.html
- Source date: as at 2026-09-30; page updated 2026-10-16; opened 2026-11-03. Confidence: high.
- Proves: 678 companies have general-business permission (85+160+433, calculated); 85 are general-only.
- Does not prove: 678 commercial P&C operating sellers, SME focus, revenue mix, independence, willingness to sell, or market share. Eligibility is not production.
- Counterevidence/limitation: most permitted general brokers also have long-term permission; a headline total masks business-model differences.
- Registry route: https://www.ia.org.hk/en/supervision/reg_ins_intermediaries/registers_of_insurance_intermediaries.html (opened; links public register https://iir.ia.org.hk and active company list dated 2026-09-30).
- Tool evidence: statistics lines 6, 18, 43–50; register page opened successfully.

### TW-1 — Current rules and key-person dependency

- Claim/type: FACT. Current Chinese broker rules require practice licensing, at least one employed qualified broker (adjusted to scale), and prohibit that broker concurrently serving other broker/agent/surveyor firms or banks. Article 14 sets management-change recognition/reporting procedures. Article 19 requires bond and professional liability/bonding cover evidence for company practice licensing.
- Direct source: https://law.fsc.gov.tw/LawContent.aspx?id=FL027603
- Source date: amended 2026-09-30 (ROC 115); opened with web and read via direct Python urllib 2026-11-03. Confidence: high for cited text; medium for application to a particular transaction.
- Proves: qualified staff retention is structural; chairman/general-manager changes require recognition submission within 15 days after selection; listed director/supervisor/branch-manager changes are reported to the trade association within 15 days.
- Does not prove: transaction-specific ownership permissions or foreign-investment timetable. Article 16 capital-adjustment trigger is verified in the Phase 2 correction below.
- Counterevidence/limitation: English page https://law.fsc.gov.tw/EngLawContent.aspx?id=1861&lan=E is dated 2015-06-18. It was opened but must not be used as current law against the 2026 Chinese amendments.
- Decision impact: get Taiwanese insurance and foreign-investment counsel to map ownership approvals separately from management reporting.
- Tool evidence: direct current text extraction printed Articles 7, 14 and 19; Article 7 says companies/banks must employ at least one broker; Article 14 contains 15-day rules.

### TW-2 — Premium handling differs from an assumed floating trust account

- Claim/type: FACT. Article 40 requires premiums collected/transferred under policyholder mandate to be remitted directly and in gross to the insurer, except reinsurance broking; Article 41 requires records and receipt copies retained at least five years.
- Direct source: https://law.fsc.gov.tw/LawContent.aspx?id=FL027603
- Source date: amended 2026-09-30; direct text read 2026-11-03. Confidence: high.
- Proves: customer premiums are subject to specific handling controls; the exception for reinsurance means business line matters.
- Does not prove: the entire Taiwanese client-money account regime or that retention period is always sufficient under other law.
- Counterevidence/limitation: this is narrower than Singapore/HK account language; do not claim all three jurisdictions use the same trust-account mechanics.
- Decision impact: reconcile gross premiums and remittances separately from commission revenue in diligence.
- Tool evidence: direct extraction printed Articles 40–41 in full.

### TW-3 — Subrogation belongs to the insurer after payment, subject to law

- Claim/type: FACT. Taiwan Insurance Act Article 9 defines broker by insured-interest contract negotiation/related service for remuneration; Article 53 permits insurer subrogation after indemnification up to amount paid. Article 10 separately defines insurance surveyor functions.
- Direct source: https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=G0390002
- Source date: amended 2025-06-18; opened 2026-11-03. Confidence: high.
- Proves: broker service authority and insurer recovery rights are different legal concepts. Acquiring a broker is not statutory assignment of insurer subrogation rights.
- Does not prove: assignment arrangements cannot exist; every insurance class has identical subrogation treatment; who may litigate a specific claim.
- Counterevidence/limitation: policy terms, legal mandate and insurance class need separate analysis. Do not apply property indemnity recovery assumptions to life/health.
- Decision impact: insurer-side recovery service needs insurer contracts/data authority and a licensed legal route when litigation is required.
- Tool evidence: opened Act lines 92–98 (broker/surveyor), 324–328 (subrogation).

### TW-4 — Official statistics located, detailed table not fully verified

- Direct source: https://www.ib.gov.tw/uploaddowndoc?file=endownload%2F202511281516250.pdf&filedisplay=114%E5%B9%B49%E6%9C%88%E9%87%8D%E8%A6%81%E6%8C%87%E6%A8%99_Value.pdf&flag=doc
- Source date: September 2025 Indicators of Insurance; publication 2025-11-30 printed on cover. Opened PDF 2026-11-03. Confidence: high on document identity; insufficient on full table/footnote interpretation.
- Proves: Insurance Bureau supplies Table 20 broker business statistics with premium, commission and channel-share measures (search discovery lead).
- Does not prove: independently verified company/seller total or channel share in this pass. Search-rendered 2024 row suggests 430 brokers, but its footnote says count includes personal and company forms; do NOT publish 430 as corporate acquisition targets.
- Counterevidence/limitation: subsequent PDF table opens timed out; direct download returned non-PDF response. Table cells/denominators were not fully inspected. Use as a follow-up source, not a confirmed number here.
- Decision impact: obtain/download the complete official table and its footnotes before building a Taiwan channel model. Channel share is not independent ownership share.

### US-1 — Claims advocacy comparator is separately licensed and state-specific

- Claim/type: FACT. Texas regulator says licensed public adjusters can negotiate with insurer for insured, may charge up to 10% of total claim payment (not merely disputed uplift), and may not practise law/give legal advice or work on healthcare claims.
- Direct source: https://www.tdi.texas.gov/tips/public-adjusters.html?os=ios
- Source date: updated 2025-03-25; opened 2026-11-03. Confidence: high, Texas only.
- Proves: a US percentage-of-recovery model exists within a particular licensing perimeter; public adjusting and legal work are distinct.
- Does not prove: Asia permits contingency claims advocacy; Texas rules represent all US states; broker commissions and adjuster contingency fees are interchangeable.
- Counterevidence/limitation: total-settlement fee base may produce client costs even without incremental recovery; this is not evidence of incremental value or attractive margins.
- Decision impact: benchmark workflow and economic incentives, not presumed portability of legal permissions.
- Tool evidence: opened page lines 20–24 and 42–46.

### US-2 — Legal contingency is a lawyer/client fee arrangement

- Claim/type: FACT. California State Bar describes contingency fees as percentage of recovery on win/settlement, with expense obligations potentially surviving a loss and written terms covering percentage/cost treatment.
- Direct source: https://www.calbar.ca.gov/public/legal-resources/working-attorney/what-expect-regarding-fees-and-billing
- Date: undated current page; opened 2026-11-03. Confidence: high for California consumer guidance.
- Proves: legal contingency economics require explicit fee/cost terms and differ from commission brokerage.
- Does not prove: a technology firm can practise law, share lawyer fees, own a law practice, acquire claims, or import this model to Singapore/HK/Taiwan.
- Counterevidence/limitation: this pass has not established non-lawyer ownership/fee-sharing rules in each jurisdiction. Do not model a legal contingency subsidiary as automatically permissible.
- Tool evidence: opened page lines 36–42.

## What the headline omits / unresolved gates

1. **Independence is not a licence category.** No defensible independent-broker revenue share for SG/HK/Taiwan was established. Build a group-ownership map from registers and corporate records; separate general-only from life-heavy operations. Do not infer fragmentation or acquisition availability solely from licence counts.
2. **No universal approval timetable.** SG new-registration six-month expectation is conditional and not a control-approval SLA. HK/Taiwan acquisition time remains unverified. Transaction counsel should provide a written conditions-precedent matrix and regulator engagement plan before a binding bid.
3. **Authority map required.** For every automated claims step, identify client, payer, data controller, rights holder, settlement signer, litigation counsel, mandated entity and fee basis. Broker client relationship does not establish insurer recovery authority.
4. **Client cash is not acquisition finance.** Reconstruct premium/client accounts, earned commissions, remittances, aged receivables, audit qualifications and historic errors before accepting EBITDA or free-cash-flow claims.
5. **AI-specific outsourcing/data rules unresearched here.** Privacy, cross-border processing, insurer confidentiality, professional indemnity AI exclusions, cyber controls and recordkeeping need a separate source-backed review; no blanket AI permission inferred.
6. **Seller-specific diligence.** Obtain licence conditions, ownership chart, regulator correspondence, key-person employment terms, carrier agreements/change-of-control clauses, client mandates, complaint/E&O history and client-account reconciliation. Owner retirement alone is not evidence relationships or renewals transfer.

## Access boundaries and verification record

- All factual sources above were opened/read, rather than relying only on search snippets, except TW-4 detailed statistics explicitly withheld.
- Blocked source: Singapore Statutes Online https://sso.agc.gov.sg/SL/IA1966-RG16?ProvIds=P1II- returned 403; used current MAS toolkit for narrow premium-account assertion instead.
- Blocked/absent IA documents: https://www.ia.org.hk/en/supervision/reg_ins_intermediaries/files/P6_SN_Eng_2021_update.pdf returned 404; https://www.ia.org.hk/sc/supervision/reg_ins_intermediaries/files/New_regime_brochure_Eng.pdf returned 403. No numeric HK capital floor asserted from snippets.
- PERMA recovery-services lead https://www.permarisk.gov/resources/vendors-services/subrogation-recovery/ returned 404; no claim depends on it.
- No browser session used; blocked requests were recorded rather than repeatedly bypassed. Public sources only; no paywalled material, outreach or mutations.

## Extension — recovered market table, subrogation and privacy (2026-11-03)

This extension supersedes TW-4's missing-table status. It also supersedes the earlier blanket statement that no browser session was used: after reading the browserctrl skill, a task-owned Dia background tab was used for public PDPC/PCPD pages when web fetching failed. No authenticated/private pages or messaging were accessed.

### TW-5 — TII Table 20 recovered and fully read

- FACT; direct PDF: https://www.tii.org.tw/tii/export/sites/tii/information/files/20_202605.pdf
- Discovery/index: https://www.tii.org.tw/tii/english/rd/importantIndices/ — Table **20**, Business Statistics of Insurance Brokers, index dated 2026-07-22. Table 21 is surveyors, not brokers. Opened PDF via its actual index link; direct urllib download returned 83,098 PDF bytes and `pdftotext -layout` printed the complete single-page bilingual table including headers and both footnotes. Confidence: high for table figures/units.
- 2025 row: 431 total organisations/persons; 48 non-life only, 79 life only, 304 both. Footnote explicitly includes personal and corporate forms; do not call these 431 corporate acquisition targets. Salespersons 155,965; this is registration-based, not necessarily unique full-time workers.

| 2025 Table 20 measure | Non-life | Life | Total |
|---|---:|---:|---:|
| Written premium income, NT$bn | 66.105954 | 347.146108 | 413.252062 |
| Stated market share, % | 23.05 | 13.23 | not given |
| Commission income, NT$bn | 7.432572 | 35.178293 | 42.610865 |

- Proves: premium volume and brokerage commission revenue are separately reported. Units are NT$ thousand in the original, converted to billions above by dividing by 1,000,000. Premium is not broker revenue. The stated shares are channel premium shares, not independent ownership shares or shares of broker revenue.
- Does not prove: independence, sellers, profitability, commercial P&C share, unique salesperson headcount, or the precise market-share denominator methodology beyond the table labels. Do not add life and non-life shares.
- Counterevidence: 2024 commissions are revised in this newer table to NT$39.628419bn total, including NT$7.108468bn non-life and NT$32.519951bn life; older official/table copies can differ. Use one vintage consistently. No reason for revision is supplied here.
- Decision impact: Taiwan has measurable commission-channel revenue; addressable roll-up revenue still requires segment and ownership mapping. Table-derived average commissions per counted entity would be highly skewed and not representative deal economics.
- Verification evidence: web PDF lines 51–52 show 2024/2025 figures; lines 65–82 show footnotes; independent in-memory `pdftotext -layout` output confirms column alignment. Screenshot fetch timed out, but full text extraction succeeded. No extra files written.

### SG-4 — Actual motor-insurance subrogation litigation

- FACT; court primary source: https://www.elitigation.sg/gd/s/2016_SGHC_83 — **Ng Kong Choon v Tang Wee Goh [2016] SGHC 83**, judgment 2016-04-29; opened 2026-11-03. Confidence: high for this case.
- Proves: court describes insurer Allianz instituting a subrogation action **in the insured's name** to recover vehicle repair costs after paying the insured. Opening paragraphs identify parallel uninsured-loss/personal-injury settlements and the legal danger of dividing claims/releasing rights.
- Does not prove: broker ownership of recoveries, permission for an unlicensed agent to litigate, every claim being recoverable, or current procedural details in all courts.
- Counterevidence/limitation: recoveries interact with the insured's own losses and discharge wording. A claims workflow that settles one component can prejudice another. Marine statute cannot simply be treated as universal non-marine law.
- Decision impact: an insurer-side recovery engine needs explicit insurer mandate, rights-preservation controls and counsel, rather than presumed broker authority.
- Tool evidence: opened court lines 63–68 identify insurer, insured-name action, repair recovery and competing settlements.
- Additional primary statute lead: https://sso.agc.gov.sg/Act/MIA1906 (Marine Insurance Act 1906 section 79), but opening returned 403; no claim here relies on its search snippet. An accessible separate court discussion is https://www.elitigation.sg/gdviewer/gd/2021_SGHC_152/pdf (Sompo v RSA), discovered but not fully read in this extension.

### HK-5 — Actual insurer wording reserves recovery/control to insurer

- FACT about one contract, not universal legislation; direct primary insurer document: https://qnect.qbe.com/mil/assets/pdf/Single%20Travelon%20Policy%20Wording_UWD.PTRBS.C.V1.2102.pdf
- QBE Hongkong & Shanghai Single Trip Insurance, code UWD.PTRBS.C.V1.2102; document title metadata 2021-03-01, privacy notice dated August 2020; opened 2026-11-03. Confidence: high for displayed Chinese wording; medium for interpreting a policy subject to an English-prevails clause.
- Proves: clause 6.17 gives insurer discretion to take over/defend/settle third-party claims and pursue recovery in insured's name before or after indemnification. Clause 6.6 restricts insured admission/negotiation without insurer written agreement. Clause 6.13 applies Hong Kong law/jurisdiction.
- Does not prove: same terms across commercial P&C, universal post-payment prerequisite, a broker's power to sign settlement, or current version sold to every customer.
- Counterevidence: this contractual wording expressly contemplates recovery before or after payment; therefore a broad statement “all recovery rights arise only after payment” is unsafe. Its Chinese translation states English prevails; verify operative English policy before transaction advice.
- Decision impact: mandate and policy wording control the attainable recovery workflow. Acquisition of the broker does not confer the insurer's contractual control rights.
- Tool evidence: opened PDF page 7, lines 967–970, 987–988, 1001–1014. Page 8 also expressly contemplates claim/recovery-related transfers to service providers including legal/claims specialists, subject to its terms; this is a concrete example, not blanket authority for AI training.

### SG-5 — PDPA applies to AI and overseas processing

- FACT; primary sources: https://www.pdpc.gov.sg/overview-of-pdpa/the-legislation/personal-data-protection-act/data-protection-obligations (published/updated 2023-04-03; read in Dia 2026-11-03) and https://www.pdpc.gov.sg/-/media/files/pdpc/pdf-files/advisory-guidelines/advisory-guidelines-on-the-use-of-personal-data-in-ai-recommendation-and-decision-systems.pdf (issued 2024-03-01; direct PDF read 2026-11-03). Confidence: high for baseline obligations; specific exemption application requires review.
- Proves: overseas personal-data transfers require prescribed comparable-protection safeguards unless exempted. Consent/notification, purpose limitation, accuracy, security and retention also apply. AI guidance discusses meaningful consent or conditional exceptions, data minimisation, privacy-by-design, and external developers' data-intermediary role.
- Does not prove: AI is banned, all processing must stay in Singapore, every business-improvement use is exempt, or buying a brokerage permits unrestricted reuse for training.
- Counterevidence: consent exceptions exist, and pseudonymisation is encouraged rather than a universal substitute for legal authority. 2024 AI guidance is not a complete account of potentially newer GenAI-specific guidance; a 2026 GenAI source was discovered but not independently read here.
- Decision impact: map every transfer/subprocessor and purpose; contractually control training reuse, retention and security. Separate performing the client's insurance service from creating a shared proprietary training corpus.
- Tool evidence: Dia `text` returned Transfer Limitation paragraph requiring comparable protection; direct urllib returned 468,849 PDF bytes and `pdftotext` showed paras 1.3–1.4, 7.1–7.7 (consent/exceptions, intermediary obligations, minimisation/security/privacy attacks).

### HK-6 — Binding privacy principles and AI guidance differ

- FACT; primary binding-law explanation: https://www.pcpd.org.hk/english/data_privacy_law/ordinance_at_a_Glance/ordinance.html (undated current regulator page; read Dia 2026-11-03). Confidence: high.
- Proves: data processors are controlled through data-user contractual/other safeguards; DPP1 requires necessary/non-excessive collection and disclosure of purpose/transferee classes; DPP3 bars unrelated new use without express voluntary consent; DPP2/DPP4 require processor retention/security controls. These apply to personal data used in a broker AI operation.
- Does not prove: all company records are personal data, every reuse is a new purpose, or a categorical ban on cross-border processing.
- Counterevidence: exemptions exist and must be evaluated case by case. Regulator distinguishes DPP contravention from offences under particular sections; do not label every DPP breach criminal.
- Decision impact: legal basis and processor restrictions follow acquired data; group acquisition does not erase purpose limitations.
- Primary AI explanation: https://www.pcpd.org.hk/english/news_events/newspaper/newspaper_20240815.html — Privacy Commissioner's August 2024 article, read in full in Dia 2026-11-03. It says technology-neutral PDPO applies to AI and describes the June 2024 Model Framework as recommendations/best practices: governance, risk-based human oversight, data minimisation, testing, monitoring and stakeholder communication.
- Scope limit: this article does not establish the contents of a newer August 2026 agentic-AI supplement. That newer document was visible in the guidance index but not fully read. Do not call the 2024 framework the latest or treat every recommendation as statutory law.
- Tool evidence: Dia output included DPP1/2/3/4 text and the Commissioner's four-part explanation; web fetches were empty/blocked, so browser evidence is the substantive basis.

### HK-7 — Cross-border contractual route, without overstating section 33

- FACT; primary regulator release: https://www.pcpd.org.hk/english/news_events/media_statements/press_20220512.html — 2022-05-12, read Dia 2026-11-03. Confidence: high for issued guidance, not a fresh statutory commencement opinion.
- Proves: PCPD recommends two clause sets for data-user-to-user and user-to-processor transfers, including Hong Kong-controlled transfers between overseas entities. They cover purpose-only use, agreed onward transfers, security, necessary retention and erasure.
- Does not prove: clauses are universally mandatory; adoption cures all purpose/consent defects; section 33 commencement status in November 2026.
- Counterevidence/limitation: historic statements that section 33 was not commenced were found, but no current primary commencement determination was verified; leave that status to counsel instead of asserting unrestricted transfers.
- Decision impact: use a documented data-transfer/processor contract and evaluate onward processors. Cross-border status alone is not the whole privacy analysis.
- Underlying clauses PDF https://www.pcpd.org.hk/english/resources_centre/publications/files/guidance_model_contractual_clauses.pdf remained unreadable by web/direct download; primary release itself was read and supports the narrower claims above.

### Extension verification and residual work

- TII download was processed entirely in memory, with no extra artifact written. Only this notes file changed.
- Browser public reads recovered PDPC obligations and PCPD AI/privacy/transfer pages. The initially guessed PCPD `/data_protection_principles/` URL was a genuine not-found page; actual `/6_data_protection_principles/` and linked `/ordinance_at_a_Glance/` routes were used. No substantive claim relies on the not-found URL.
- Still required before implementation: transaction-specific data-transfer basis, insurer/client consent and contracts, exact newer 2026 GenAI/agentic guidance, local legal-services/fee-sharing perimeter, Taiwanese foreign/control acquisition route, and relevant licence-specific conditions.

## Gate 1 corrections applied — Phase 2, 3 November 2026
Public sources only. FSC current Chinese rules re-fetched directly with urllib/BeautifulSoup, Articles 14, 16 and 45 read in full. FACT: Article 14 requires applicable management recognition/reporting within 15 days (recipient and event differ by role). FACT: Article 16 requires companies licensed before the 3 March 2021 amendment whose cumulative equity/capital transfers reach at least 50% to adjust capital within six months from the day following the relevant closing/transfer; inheritance exception applies. Current minimum paid-in capital is NT$20m for insurance OR reinsurance brokerage and NT$30m for both. This is a capital-adjustment trigger, not a universal acquisition approval threshold. FACT: Article 45 requires practice through the relevant professional/trade association membership; entity/type details follow the Chinese text. Foreign-investment route, transaction-specific permissions and processing timetable remain unverified. Primary: https://law.fsc.gov.tw/LawContent.aspx?id=FL027603 (amended 30 September 2026).
Singapore control claims cite MAS compliance toolkit v3.4, not entry registration: https://www.mas.gov.sg/-/media/mas-media-library/regulation/guidance/cmi/compliance-toolkit-for-insurance-brokers/compliance-toolkit-for-ibs-14-nov-2024.pdf . Hong Kong notification is attributed to IA guidance already recorded in regulatory-notes (s64ZZD/Form N5); it is not claimed newly browser-verified in Phase 2. Aon–USI remains announced/pending in this report; latest verified issuer status is 28 October 2026.
