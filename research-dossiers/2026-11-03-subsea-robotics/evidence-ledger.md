# Evidence ledger — subsea robotics

Cutoff/access date throughout: 2026-11-03. Primary page bodies read unless explicitly marked blocked. Facts about vendor descriptions establish the offer, not independently verified performance. Assumptions and scenarios have no external evidentiary source; their direct artifacts are identified rather than fabricated URLs. No buyer interviews, quotes or field measurements obtained.

## E01 — Cable faults are mostly an ordinary protection problem as well as a security concern
- Type: fact about ICPC industry estimate; confidence high for attribution, medium for representativeness.
- Direct URL: https://www.iscpc.org/news/media-enquiries/ (undated live FAQ).
- Claim: ICPC estimates roughly 150–200 faults annually; approximately 70–80% from human activity, primarily fishing and anchors. It says owner route/fault records are confidential and ICPC does not investigate causes.
- Proves: a baseline failure burden and limitations on public incident data.
- Does not prove: current state attribution, a rising sabotage rate, paid inspection volume or a robotics TAM.
- Counterevidence: ICPC holds no state-sabotage data and says, anecdotally, it knows of no verified state-sponsored case since World War II. It places deliberate damage or incidents with unverifiable intent below 1% of global cable damage annually. This is an industry counterweight to NATO's security framing, not an adjudication of any incident. Total deployed length has grown while annual fault count is relatively stable in this account.
- Decision impact: prioritize actual operator loss/action histories; never multiply all faults by an assumed robot contract.

## E02 — NATO launched Baltic Sentry
- Type: fact; confidence high.
- Direct URL: https://www.nato.int/en/news-and-events/articles/news/2025/01/14/nato-launches-baltic-sentry-to-increase-critical-infrastructure-security (2025-01-14).
- Claim: launch includes frigates, maritime patrol aircraft, new technologies including naval drones, and integration of surveillance assets.
- Proves: an official military protection activity.
- Does not prove: an AUV purchase order, underwater-drone allocation or a Singapore startup procurement channel.
- Counterevidence: surface/air surveillance and enforcement are explicit parts of the response; underwater autonomy is only one possible layer.
- Decision impact: separate defence protection budgets from civil condition-survey budgets.

## E03 — Surface information can support undersea protection
- Type: fact about government deployment; confidence high.
- Direct URL: https://www.gov.uk/government/news/joint-expeditionary-force-activates-uk-led-reaction-system-to-track-threats-to-undersea-infrastructure-and-monitor-russian-shadow-fleet (2025-01-06).
- Claim: Nordic Warden uses AIS and other data to assess vessel risk and send warnings.
- Proves: an alternative/complement focused on vessels above the infrastructure.
- Does not prove: warning accuracy, prevented damage or AIS completeness.
- Counterevidence: AIS may not supply every relevant observation; the release gives no controlled prevention result.
- Decision impact: do not assume the right prevention tool must live on the seabed.

## E04 — Matsu lost both cable paths, with constrained microwave fallback
- Type: fact about operator incident report; confidence high.
- Direct URL: https://www.cht.com.tw/zh-tw/home/cht/messages/2023/20230208_1232 (2023-02-08, Chinese body read).
- Claim: Chunghwa reported cable breaks on February 2 and 8, 2023; voice and specified circuits moved to microwave, while limited bandwidth caused congestion in other services. The second break was suspected cargo-vessel damage.
- Proves: correlated physical route failure can affect users despite backup.
- Does not prove: total isolation, state intent, permanent causation findings or a patrol's ability to prevent it.
- Counterevidence: backup preserved some services; do not write that the entire island had no communications.
- Decision impact: redundancy/repair and inspection solve different parts of resilience.

## E05 — Taiwan's 2025 incident analysis differentiates nearshore from offshore
- Type: fact about ministry analysis; confidence high for reported cohort.
- Direct URL: https://ipfs.moda.gov.tw/en/press/press-releases/19392.html (created 2026-04-07; updated 2026-04-28).
- Claim: MODA reports seven coastal incidents in 2025, three involving anchor dragging; offshore damage is primarily earthquake-related submarine landslides in its account. It describes multi-layer resilience and enforcement measures.
- Proves: geography and cause affect the protection design; this is a Taiwan-specific incident cohort.
- Does not prove: global rates or that every anchor incident is deliberate or state-sponsored. This source is MODA, not NCC.
- Counterevidence: local denominator differs from ICPC global faults; prevention benefits of inspection are not measured.
- Decision impact: select the observable failure mode before selecting a robot.

## E06 — Singapore facilitates cable landing growth, within a permissioned corridor system
- Type: fact about policy; confidence high.
- Direct URLs: https://www.imda.gov.sg/how-we-can-help/digital-connectivity-blueprint (body read in Dia; content updated 2025-07-02); https://www.imda.gov.sg/-/media/imda/files/programme/digital-connectivity-blueprint/digital-connectivity-blueprint-report.pdf (2023 blueprint reference); https://www.mpa.gov.sg/api/media/4d47db69-15e4-4a51-b8c6-b47ac221d269 (guidelines specify as of February 2026).
- Claim: blueprint plans capacity to enable submarine cable landings to double within its ten-year horizon; deployment guide identifies Changi Site 1A, Tuas West and Tuas South, and multi-agency approvals.
- Proves: enabling capacity policy and designated landing/deployment process.
- Does not prove: actual doubling, annual inspection spend, open tenders, or permission for survey robots. Ten-year clock is not restarted in November 2026.
- Counterevidence: scarce land/sea space and approvals constrain deployment; landing capacity is not actual cable count.
- Decision impact: Singapore is a plausible access base, not a quantified local market.

## E07 — Hydrographic survey permissions need explicit treatment
- Type: fact about published form; confidence high for form, medium for applicability to a specific job.
- Direct URL: https://www.mpa.gov.sg/docs/mpalibraries/mpa-documents-files/hydrographic/conducting-hydrographic-surveys/spn-application-form.pdf?sfvrsn=c7f5245c_0 (form marked March 2023).
- Claim: application for hydrographic survey within Singapore territorial waters requests survey limits and submission at least five working days before commencement.
- Proves: a published approval route exists.
- Does not prove: guaranteed approval within five days, a complete autonomous-operation approval list or applicability to every underwater inspection.
- Counterevidence: job-specific authority consultation still required; deployment guidelines E06 address cables, not robot trials.
- Decision impact: permissioned contractor trials; calendar is conditional.

## E08 — Acoustic links have constrained useful throughput
- Type: fact about WHOI technical documentation; confidence high for named modem, no universal ceiling claimed.
- Direct URL: https://acomms.whoi.edu/micro-modem (undated live technical documentation).
- Claim: Micromodem lists 80–5,400 bps packet rates and explicitly distinguishes them from system throughput; a stated one-channel no-ACK example reaches 3,343 bps. Page states PSK hardware domestic-only availability because of export restrictions.
- Proves: ordinary broadband assumptions fail for this documented link and supply can be constrained.
- Does not prove: all underwater links share these rates, current worldwide modem availability, or every acoustic module is ITAR-controlled.
- Counterevidence: tethered fibre and short-range other links are different architectures; throughput depends on link/system conditions.
- Decision impact: mission must tolerate sparse communications; verify procurement of actual modem, not just published specs.

## E09 — Sound propagation imposes latency
- Type: fact plus calculation; confidence high.
- Direct URL: https://oceanservice.noaa.gov/facts/sound.html (undated NOAA explainer).
- Claim: typical sound speed about 1,500 m/s, varying with ocean conditions. Derived example: 1,500 m / 1,500 m/s = 1 second one-way propagation, before packet/processing delays.
- Proves: physical latency in a stated acoustic range example.
- Does not prove: no remote control at any range, mission failure, or a fixed throughput.
- Counterevidence: a tether changes the data path; acoustic latency alone is not a commercial moat.
- Decision impact: autonomous safe behaviour after link loss is a requirement to test.

## E10 — Autonomous infrastructure inspection already has a commercial precedent
- Type: fact about participating supplier case study; confidence high for published account, medium for independent performance.
- Direct URL: https://www.eiva.com/about/case-studies/cable-pipe-and-asset-inspections/autonomous-pipeline-inspection-software-development-project (2018–2019 project; undated case-study page).
- Claim: EIVA reports an unmanned commercial inspection of 175 km of Equinor pipe with HUGIN AUV and SEA-KIT USV, covering launch/recovery and onboard workflow development.
- Proves: direct competitive/engineering precedent beyond a laboratory demonstration.
- Does not prove: present cost/km, general operating autonomy or comparable telecom-cable visibility.
- Counterevidence: a pipe is not a small partly buried cable; no campaign invoice or acceptance data disclosed.
- Decision impact: don't pitch autonomous pipe following as new.

## E11 — Kongsberg and Saab already cover long-range and resident approaches
- Type: fact about vendor claims; confidence high for offers, unverified operating performance.
- Direct URLs: https://www.kongsberg.com/what-we-do/ocean-space/autonomous-and-uncrewed-solutions/auv/hugin/ ; https://www.kongsberg.com/what-we-do/ocean-space/autonomous-and-uncrewed-solutions/auv/autonomous-underwater-vehicle-hugin-endurance/ ; https://www.saabseaeye.com/solutions/underwater-vehicles/sabertooth-double-hull (undated product pages).
- Claim: HUGIN supports multi-sensor survey and shore/vessel deployment; Endurance advertises up to 15 days and 2,200 km mission range. Sabertooth offers hybrid AUV/ROV operation and a docking/resident concept with charging/data transfer.
- Proves: substantial offered capability and existing service/support ecosystems.
- Does not prove: routine achieved range, accepted cable coverage, delivered price or elimination of every vessel day. Do not mix product configurations into one vehicle.
- Counterevidence: local launch/recovery, dock infrastructure and specific sensor capability still matter.
- Decision impact: buy/partner is a required baseline; no blank-slate hardware thesis.

## E12 — A Singapore competitor already offers the proposed broad workflow
- Type: fact about vendor offer plus buyer-confirmed contract; confidence high for existence, low for unmeasured savings.
- Direct URLs: https://www.beex.sg/ (live); https://www.dsta.gov.sg/docs/default-source/news-releases/dsta-partners-local-start-up-beex-to-deliver-advanced-underwater-capabilities-for-the-saf.pdf?sfvrsn=946673f_1 (2025-10-06).
- Claim: BeeX advertises planning, autonomous capture, anomaly snapshots and georeferenced/time-stamped reports; DSTA confirms a MINDEF acquisition contract and co-development work involving HAUVs.
- Proves: direct local competition and a real local defence procurement relationship.
- Does not prove: public contract value, margins, equivalent performance on the chosen cable job, or availability of its stack to the founder.
- Counterevidence: government contract contradicts an absolute 'startups cannot sell to defence' claim; overlap contradicts an empty local autonomy/reporting gap.
- Decision impact: obtain an incumbent proposal before investing in the selected wedge.

## E13 — Mature subsea services can capture value, with material unused capacity
- Type: fact about company financial disclosure; confidence high.
- Direct URL: https://www.sec.gov/Archives/edgar/data/73756/000007375626000152/exhibit_991x8kx3qx2026.htm (2026-10-21; quarter ended 2026-09-30).
- Claim: Oceaneering reports Subsea Robotics revenue about US$233m, operating income US$75.4m, 32% operating margin, ROV utilisation 65% and ROV revenue per utilised day US$11,781 in Q3 2026.
- Proves: realised mature segment economics and a utilisation denominator.
- Does not prove: AUV standalone margin, small Asian survey pricing or vessel-inclusive customer day rate. Segment revenue includes more than the ROV day-rate metric.
- Counterevidence: release expects mobilisation/geographic mix and lower utilisation to affect following-quarter operating income; corporate unallocated expenses are separate.
- Decision impact: maintain separate job contribution, depreciation and company costs; never divide segment revenue by ROV days to price the startup.

## E14 — Components can be a business, but consolidated margins hide mix and capital
- Type: fact about issuer report; confidence high for reported values.
- Direct URL: https://www.krakenrobotics.com/news-releases/kraken-robotics-reports-2025-financial-results/ (2026-04-16; FY2025 historical).
- Claim: C$102.2m revenue, 62.1% reported gross margin, C$25.0m adjusted EBITDA and C$30.3m capex/intangibles purchased; product/service revenue C$61.7m/C$40.5m. Report attributes growth to batteries/SAS and services, including acquisition effects.
- Proves: another value-capture route with material capital and mixed activities.
- Does not prove: a battery-only or new subsystem gross margin, current combined-company scope, or current 2026 guidance. Adjusted EBITDA is non-IFRS, not net income or free cash.
- Counterevidence: product revenue declined overall despite selected categories growing; service mix/acquisitions matter.
- Decision impact: qualified subsystem alternative deserves OEM discovery, not copied mature margins.

## E15 — Cable following remains task- and environment-specific
- Type: fact about authors' reported field result; confidence medium, preprint.
- Direct URL: https://arxiv.org/abs/2606.23606 (2026-06-22; body includes paper text).
- Claim: authors describe Smarty200 trials recovering from tracking loss and visually inspecting up to 59% of a 120 m test cable; burial, misclassification and control can interrupt tracking.
- Proves: a concrete partial field result and an explicit need to recover/reacquire.
- Does not prove: industry-wide capability ceiling, commercial failure rate or transferable Singapore performance. '59%' is not detection accuracy or mission success.
- Counterevidence: E10 covers long pipes with a different system; sonar/magnetic/sub-bottom payloads observe different things.
- Decision impact: count accepted coverage, abstentions and revisits; do not equate kilometres travelled with inspection completed.

## E16 — Ghost Shark is a supported multi-year procurement, not a unit-price datapoint
- Type: fact about official announcement; confidence high.
- Direct URL: https://www.minister.defence.gov.au/media-releases/2025-09-10/equipping-royal-australian-navy-next-generation-autonomous-undersea-vehicles (2025-09-10).
- Claim: Australia announced A$1.7bn for a fleet with delivery, maintenance and continued development over five years; approximately A$140m had already been invested in platform/payload/facilities since 2022.
- Proves: a real large defence commitment and sustained industrial effort.
- Does not prove: price per vehicle, full fleet number in this release, cheap attritable economics, startup eligibility or Ghost Shark/Dive-XL contractual identity.
- Counterevidence: prior development/facilities and domestic supply-chain investment are part of the story.
- Decision impact: no dividing the headline by an assumed fleet count; no conflating inspection with strike requirements.

## E17 — US small-UUV procurement has a prototype-to-production route
- Type: fact about official programme account; confidence high.
- Direct URL: https://www.diu.mil/2024-annual-report-files/ (page body reports FY2023 despite URL).
- Claim: SCUUV entry lists HII, US Navy/USMC/Naval Special Warfare transition partners, US$10.7m prototype award and a FAR-based transition agreement ceiling of US$347.8m on 2023-09-28. Official product catalogue: https://www.diu.mil/solutions/portfolio/catalog/a0Tt0000009En3nEAC-a0h830000004uaoAAA .
- Proves: a funded transition precedent and modular payload/software priorities.
- Does not prove: all options exercised, sales received, per-unit cost or an open solicitation for this founder today.
- Counterevidence: this is an established supplier and successful selected programme; no success-probability denominator.
- Decision impact: identify named requirement/sponsor before a naval product, not defence TAM alone.

## E18 — Exail is a substantial integrated competitor
- Type: fact about issuer presentation; confidence high for reported metrics, not independently audited here.
- Direct URL: https://www.exail-technologies.com/wp-content/uploads/2026/03/exail-technologies-fy-2025-results-presentation.pdf (FY2025 presentation, March 2026; printed slides 14 and 19).
- Claim: approximately €560m maritime-robotics order intake; combined Navigation and Maritime Robotics €373m revenue and €84m current EBITDA, 23% margin.
- Proves: incumbent scope, order-based business and combined navigation/system value capture.
- Does not prove: all orders delivered, underwater inspection-only revenue, comparable GAAP margin or standalone AUV profit.
- Counterevidence: navigation, mine-hunting, consumables and surface systems are different businesses; orders are lumpy.
- Decision impact: compete with full systems and buyer relationships; don't label the sector unoccupied.

## E19 — Large UUV integration can consume years
- Type: fact about independent government audit; confidence high.
- Direct URL: https://www.gao.gov/assets/gao-26-108457.pdf (2026-07-02; printed pp.159–160, PDF pp.165–166).
- Claim: GAO says Orca prototype incurred approximately five years of delays related to materials/pressure-vessel construction; first prototype delivered September 2025; remaining four expected January 2027 as of its January 2026 review.
- Proves: realised programme integration delays and audit-time planned dates.
- Does not prove: every UUV takes this long, actual January 2027 delivery or a delay forecast for the chosen small inspection service.
- Counterevidence: E12/E17 show other procurement routes; large mine-laying UUV scope differs.
- Decision impact: hard bear case for capital-intensive naval-first development.

## E20 — Offshore-wind insurance headlines depend on cohort and denominator
- Type: fact about insurer analyses, not a universal market statistic; confidence high for document, medium for representativeness.
- Direct URLs: https://lmalloyds.com/wp-content/uploads/2026/10/Offshore-Wind-Claims-Bulletin-2026-.pdf (2026-10-27 release, PDF p.2); https://ore.catapult.org.uk/products-services/subsea-cables (undated current service page).
- Claim: JNRC bulletin's AXIS cohort (loss dates January 2021–September 2025) reports 57% of claims by count from turbines, 14% inter-array cables, 6% export cables; export average claim US$18.8m. ORE's service page instead describes cables as the bulk of claims without that cohort definition.
- Proves: severe cable losses can coexist with turbine-dominated claim frequency in one dataset.
- Does not prove: wind fleet-wide failure probability, cable-inspection TAM, preventability by external imaging, or comparability to historical UK '75–80%' claims statements.
- Counterevidence: datasets, years, insurer portfolios, frequency/severity and construction/operation mix differ; do not average the headlines.
- Decision impact: wind is a credible adjacent buyer class, not a reason to promise inspection prevents internal electrical/design failure.

## E21 — Export/technical-transfer requirements are configuration-specific
- Type: fact about current published controls; confidence high for text, no product classification offered.
- Direct URLs: https://www.ecfr.gov/current/title-22/chapter-I/subchapter-M/part-121/section-121.1 (Category XX).
- Singapore direct URL: https://www.customs.gov.sg/permits-and-licences/trade-controls-and-prohibitions/strategic-goods-control/permit-and-registration-requirements/intangible-transfer-of-technology/ (updated 2026-06-08).
- Claim: USML Category XX enumerates military submersible categories and specified uncrewed vessels; Singapore ITT guidance covers controlled software/technology transmitted electronically or made available to foreign access from a server in Singapore.
- Proves: civil/military label and physical export are insufficient to determine the full compliance boundary.
- Does not prove: all AUVs/components are ITAR-controlled, any particular permit is required/available, or exemption eligibility. EAR and other origin-country controls require separate actual-item review.
- Counterevidence: exemptions and configuration thresholds exist; commercial systems can fall under different regimes.
- Decision impact: classify actual BOM/software/end users with competent counsel and supplier documentation before cross-border trials or technical access.

## E22 — Singapore has an announced upcoming control-list change
- Type: fact about announced rule timing; confidence high.
- Direct URL: https://www.customs.gov.sg/permits-and-licences/trade-controls-and-prohibitions/strategic-goods-control/strategic-goods-control-overview/ (updated 2026-10-02).
- Claim: Strategic Goods (Control) Order 2026 takes effect 1 December 2026.
- Proves: the date-specific classification checklist must be refreshed for trials after that date.
- Does not prove: it is already effective on this dossier's 3 November cutoff or how a particular component is classified.
- Counterevidence: do not apply old historical Category 8 search results as current law.
- Decision impact: counsel owns date/configuration-specific review.

## E23 — Eagle S legal posture must not be frozen at the 2025 dismissal
- Type: fact about published judicial decisions; confidence high for decisions, finality after the appellate decision unverified.
- Direct URLs: https://www.tuomioistuimet.fi/ajankohtaista/tiedotteet/karajaoikeuden-ratkaisu-eagles-alukseen-liittyvassa-rikosasiassa/ (2025-10-03); https://www.finlex.fi/en/case-law/courts-of-appeal/2026/helsinki/10512110 (2026-08-27).
- Claim: district court dismissed on jurisdiction in October 2025; on 27 August 2026 the Court of Appeal reversed and remitted. Finlex judicial summary was read in Dia after ordinary web open returned a shell. This is a jurisdiction ruling, not a guilt verdict; subsequent appeal/finality is not established here.
- Proves: source/date discipline needed; 2025 dismissal alone cannot establish current impunity.
- Does not prove: guilt, state direction, final appellate status or that underwater surveillance would have prevented damage.
- Counterevidence: the later appellate decision contradicts treating the 2025 dismissal as the latest posture. Police pages returned 403 and Dia bot check; not used for physical measurements.
- Decision impact: if used, attribute the dated jurisdiction decision and disclose unverified later finality. Do not infer a state sabotage campaign or current legal impunity.

## E24 — Asia has real marine survey procurement, with established local delivery
- Type: fact about contractor announcement; confidence high for account, not contract economics.
- Direct URL: https://www.fugro.com/news/business-news/2025/fugro-secures-a-major-geotechnical-site-investigation-contract-for-offshore-wind-farm-in-taiwan (2025-08-06).
- Claim: Fugro reports a Shinfox Youde wind-project geotechnical contract, local laboratory and Taiwan-flagged vessel.
- Proves: local infrastructure work and an established delivery channel.
- Does not prove: recurring O&M demand, AUV work, open opportunity or transferable Singapore operating permission. Announced completion target is not independently checked completion.
- Counterevidence: geotechnical site investigation is not condition inspection.
- Decision impact: regional geography does not erase local assets/permissions/incumbents; no regional spending sum inferred.

## E25 — Selected inspection service and defensibility
- Type: inference/hypothesis; confidence low until paid comparison.
- Direct evidence: synthesis of E01, E06–E15, E20; full decision and falsifiers in research-map.md.
- Claim: a repeat, permissioned route-change service might earn an advantage through accepted evidence, fewer vessel/revisit days and reusable same-route data rights.
- Proves: a testable company boundary, not demand.
- Does not prove: underserved buyers, a technical moat, savings, scale or customer data ownership rights.
- Counterevidence: direct incumbent workflow overlap and buried-cable limits.
- Decision impact: paid matched pilot and buy-versus-build gate before hardware.

## E26 — Economic scenarios and decision thresholds
- Type: assumptions/scenario; confidence high for checked arithmetic, low for inputs.
- Direct artifacts: scenario-model.json, model-arithmetic.md, model.py, research-map.md in this dossier. No external market source exists for invented inputs.
- Claim: low/base/high cases stress accepted throughput, days and annual demand; all prices, charter costs, capital, reserves, collection timing and threshold choices are planning assumptions.
- Proves: mathematical feasibility conditions and capital exposure under explicit inputs.
- Does not prove: quoted market price, expected margins, achievable utilisation or appropriate insurance reserve.
- Counterevidence: base case cannot fund the assumed company; scale can increase fixed cost, not simply replicate contribution. The $4,000 vessel day is uncalibrated and potentially optimistic: doubled/tripled charter stresses are included; no model input is a market cost benchmark.
- Decision impact: replace inputs with actual bids/logs and signed repeat scopes before investment.

## E27 — Navigation needs more than submerged GPS
- Type: fact about institutional technical descriptions; confidence high.
- Direct URLs: https://oceanexplorer.noaa.gov/expedition-feature/technology-development-partnerships-ex1904-logs-july25-2/ (2019 demonstration account); https://www.noc.ac.uk/our-work/marine-technology/ocean-vehicles/autonomous-underwater-vehicles (undated current institutional page).
- Claim: NOAA describes surface GPS aiding an INS-based submerged navigation solution; NOC describes acoustic beacons, inertial navigation and seafloor mapping where GPS cannot penetrate.
- Proves: positioning is an integrated sensing problem; surface GPS is not a continuous underwater solution.
- Does not prove: an accuracy bound for a proposed vehicle, affordable sensor cost or reliable cable georegistration under local currents/turbidity.
- Counterevidence: navigation aids and maps can improve performance; uncertainty depends on mission/system.
- Decision impact: compare positional uncertainty and accepted georegistered evidence, not distance travelled alone.
