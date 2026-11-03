# Market evidence — the research layer for agentic commerce

Cutoff/access: 2026-11-03. Primary original bodies read through web search/open and, for JS/restricted fetches, task-owned Dia tabs. Search results were discovery, not proof. Companion demand-source-notes.md and platform-source-notes.md contain source-by-source notes. No customer, affiliate account, production tool, buying workflow or paid database was tested.

## Decision-relevant findings

The research job is real; an empty research layer is not. [ChatGPT's November 2025 product](https://openai.com/index/chatgpt-shopping-research/) already elicits requirements and learns from rejected options. [Current help](https://help.openai.com/en/articles/11128490-shopping-with-chatgpt-search) admits unverified review summaries and potentially stale/nonminimum prices. An entrant must prove an improvement on a defined task, not contrast itself with an imaginary agent that cannot research.

An independently checked compatibility answer can be useful without a transaction. A tool can preserve the evidence behind “this dock supports this laptop/display configuration” and distinguish it from a vague favorable review. A trusted answer may become an input to several agents. Whether clients repeatedly select it, and whether anyone pays, remains entirely unvalidated.

## Primary-source reading notes: capability and constraints

### OpenAI / Stripe: research and checkout already meet

- [Instant Checkout launch](https://openai.com/index/buy-it-in-chatgpt/), 2025-09-29; [Stripe corroboration](https://stripe.com/newsroom/news/stripe-openai-instant-checkout). Launch describes restricted US availability, merchant fulfillment/returns, confirmation and delegated tokens. A small seller fee is described without a public numerical rate. Do not turn planned Shopify coverage at launch into observed merchants or transactions.
- [Shopping Research launch](https://openai.com/index/chatgpt-shopping-research/), 2025-11-24. Original body paragraphs 46–53 and 93–110 in web extraction cover constraints, feedback and limits. Direct overlap with the proposed intent/rejection thesis; no independent task-quality score obtained.
- [Current shopping help](https://help.openai.com/en/articles/11128490-shopping-with-chatgpt-search), relative update four days before access. Original body includes price lag, final tax/shipping checks and review verification limits. Live Shopify Catalog integration is described. These admissions establish possible failure modes, never their frequency.

### Google: AP2 and UCP are different jobs

- [AP2 announcement](https://cloud.google.com/blog/products/ai-machine-learning/announcing-agents-to-payments-ap2-protocol), 2025-09-16 as displayed in the opened body (the requested September 17 correction conflicts with it). Signed mandate chain addresses authorization/authenticity. Historical terminology is not asserted to be the latest spec. A signed intent is not evidence that the recommendation is good.
- [UCP technical walkthrough](https://developers.googleblog.com/under-the-hood-universal-commerce-protocol-ucp/), 2026-01-11. Full original read in Dia after repeated web fetch timeouts. Capability discovery, MCP/API/A2A bindings, cart discount example, merchant role and Merchant Center integration show broad coverage. A worked flower-store example is not proof of production adoption.

### Shopify: access is conditional, and cannot simply become owned data

[Catalog docs](https://shopify.dev/docs/agents/catalog), live at cutoff: global vs per-store endpoints implement UCP; some fields are inferred; results cannot be cached and images cannot be repurposed/cached. API endpoints and rate limits can change. The root independently fetched full docs and checked guidelines at lines 363–370. This materially constrains the moat: segregate live catalog discovery from a separately permissioned knowledge base. [June transition notice](https://shopify.dev/changelog/posts/storefront-mcp-cart-tools-are-being-deprecated-in-favour-of-ucp-cart-mcp) prevents a stale old-endpoint recommendation.

### Networks and signed agents

[Visa protocol](https://corporate.visa.com/en/sites/visa-perspectives/newsroom/visa-unveils-trusted-agent-protocol-for-ai-commerce.html), 2025-10-14, and [Mastercard Agent Pay](https://www.mastercard.com/global/en/news-and-trends/press/2025/april/mastercard-unveils-agent-pay-pioneering-agentic-payments-technology-to-power-commerce-in-the-age-of-ai.html), 2025-04-29, describe agent trust/token mechanisms. [Cloudflare signed agents](https://blog.cloudflare.com/signed-agents/), 2025-08-28, supplies request classification. Treat network reach and collaboration lists as potential reach. Identity, purchase authorization, catalog access and evidence truth remain separate; none grants a universal license to merchant data.

### Meta, xAI, Instinct; Amazon and Perplexity

Official [Muse Japanese newsroom launch](https://about.fb.com/ja/news/2026/09/introducing-muse-personal-ai-agent/) (2026-09-09; US announcement September 8) confirms browser actions and purchase approval. [Grok Bot](https://x.ai/news/introducing-grok-bot) (2026-08-11) confirms beta agents with computers. [Instinct](https://instinct.com/) describes a separate assistant. These names are verified; no primary evidence obtained that Amazon specifically blocked Muse. Exclude that allegation rather than substituting Comet facts.

Amazon's [Buy for Me launch](https://www.aboutamazon.com/news/retail/amazon-shopping-app-buy-for-me-brands) is a restricted April 2025 beta; its [mutable overview](https://www.aboutamazon.com/news/retail/amazon-agentic-ai-gen-ai-shopping) says Rufus became Alexa for Shopping on May 13, 2026. Do not silently date retained “this year” usage statistics to this year. Perplexity's two original shopping announcements (URLs in E13) were read through a task-owned Dia tab. They establish past launch scope, not a measured current merchant universe. Public rollout announcements are not end-to-end product trials.

### Retailer access: include the appeal

[Official Ninth Circuit opinion, August 4, 2026](https://cdn.ca9.uscourts.gov/datastore/opinions/2026/08/04/26-1444.pdf), docket 26-1444, lower case 3:25-cv-09514-MMC. Read official PDF including procedural history, narrow access analysis and final footnote. Court vacated/remanded the preliminary injunction. It expressly preserved private terms and limited its holding to access statutes on the record before it. No final full-merits/current docket representation is made. GovInfo rendering intermittently timed out and Dia PDF returned empty text; court-hosted copy succeeded. Use the opinion, not the parties' allegation or a March-only headline, as the legal-status anchor. Counsel must assess the proposed architecture and data-use terms separately.

## Wedge grounding

- [Apple M2 Air specifications](https://support.apple.com/en-ie/111867), original display-support section: native external-display limit is explicit. That doesn't rule out driver-mediated alternatives; the input must specify whether those are allowed.
- [CalDigit compatibility article](https://www.caldigit.com/caldigit-docks-and-apple-m1-pro-m1-max-compatibility/), updated 2026-03-03: distinguishes chip/host/lid conditions. It is a manufacturer's guide, not exhaustive independent testing.
- [USB-IF cables guidance](https://www.usb.org/cable_connector): connector shape is insufficient; different certified cables support different functions. [Product search](https://usb.org/products), read in Dia, is member-maintained and certification-limited, defaults to a recent date range and warns about older certifications. Its presence establishes an evidence source, not unrestricted dataset licensing or long-term durability.
- [Keepa official API](https://keepa.com/api-docs/) and [MCP](https://keepa.com/api-docs/mcp.html): an existing paid product-data service already reaches assistants. This is the clearest nearby precedent and substitute. No pricing scraped from third-party articles, no subscription purchased, and no commercial sublicense assumed.
- [RTINGS revenue model](https://www.rtings.com/company/how-we-make-money) describes buying test units and an editorial/revenue separation. [Actual website terms](https://www.rtings.com/company/terms-of-use) restrict commercial database reuse; separate content-licensing marketing is not a license to all measurements. Borrow the incentive principle, obtain rights or create evidence yourself.

## Demand and economics: interpretation rules

Use the latest [Adobe September observation](https://business.adobe.com/blog/ai-traffic-higher-revenue-per-visit-retail-holiday), not an older spectacular referral-growth base. No absolute share or addressable revenue follows. [Worldpay 2026](https://worldpay.com/en/insights/articles/agentic-commerce-report-2026-out-now) has filtered willingness denominators and unresolved full methodology. [Salesforce holiday analysis](https://www.salesforce.com/news/stories/2025-holiday-shopping-data/) counts broad AI influence; it is not an autonomous-checkout share. See detailed notes for exact cohorts.

Affiliate revenue requires valid referral, eligibility, contracted rate, attributed sale, reversal survival and settlement. [Impact's AI page](https://impact.com/ai/) places transacting-agent onboarding on a roadmap; [CJ docs](https://docs.cj.com/docs/advertiserlookup-api) distinguish rate sources; [Rakuten policies](https://rakutenadvertising.com/legal-notices/affiliate-network-policies/) updated July 13, 2026 require designated tracking and genuine referral, and prohibit tiered subnetworks. A builder revenue-share arrangement must be checked against those structures; a hypothetical share is not approval to operate a subnetwork. Visibility measurement and AI campaign administration are competitor offerings, not proof shoppers' agents can collect fees.

No transferable realized commission rate or real cost per useful task was obtained; one platform-specific preview base rate is documented below. The model's rates are intentionally assumptions. Include all free/no-sale research and failed tasks in cost. Intelligence buyers must renew for truthful aggregated decisions; favorable rankings are excluded from the product. Independence is a product constraint, not a claim that competitors lack it.

## Provider-disagreement and calibration log

| Tempting interpretation | Evidence resolution | Consequence |
|---|---|---|
| AI referral lift is universal growth/adoption | Adobe period/cohort comparison; no absolute channel share | Do not size from relative growth |
| Salesforce 20% means autonomous buying | Includes recommendations/engagement, extrapolated | Omit autonomous-GMV claim |
| Worldpay's payment percentages apply to everyone | 2026 article explicitly filters AI-open respondents | Retain denominator; do not blend waves |
| A reported 61/56/31 trio can substitute for verified survey figures | Primary support not established | Drop those numbers |
| Amazon permanently banned all user agents | August appeal vacated narrow injunction; private terms remain | Architecture and permission remain separate |
| Muse/Amazon allegation proves blocks | Muse product verified; particular blocking allegation not verified | Exclude claim |
| Generic intent/rejection graph is unique | Native Shopping Research already uses feedback | Require independently useful cross-client outcome evidence |
| MCP counts prove demand concentration | Registry self-reported metadata and client subregistries | No invocation statistic asserted |
| Catalog API permits owned historical corpus | Shopify explicitly prohibits search caching | Separate fresh discovery from licensed/own evidence |
| Public reviews can be resold freely | RTINGS actual terms constrain reuse | License or independently test |
| AI administration tools admit shopper agents | Impact roadmap / CJ and Rakuten rules do not grant universal permission | Written program-specific approval and settled receipts |
| FTC rule measures prevalence / bans any AI wording | Rule targets specified deception and incentives | No fake-review fraction or blanket ban |

## What the headline omits

A research request costs money even when the shopper never buys. Rich comparisons increase latency, freshness work, source licensing and QA. A merchant may pay the agent platform or network, leaving the research supplier unpaid. Consumers may opt out of retention; platforms and publishers may retain the same signals; negative product evidence can be commercially unpopular. A small dock niche may not contain enough intelligence budgets to subsidize a free tool. The hypothetical high case assumes several favorable variables together; base loses money. There is no evidence of a global default tool, exclusive intent, repeatable unit margin or a dividend stream yet.

## Public / paywalled / inaccessible boundary

No paid research, affiliate account terms, merchant private contracts, customer chats, employer data, subscription review measurements or private operating metrics are used. Public owning documentation and original vendor analyses are the evidence surface. Missing full Worldpay report methodology is not inferred from landing-page marketing. No paywall was bypassed. Law360 search results were not used as substantive evidence. RTINGS member results were not accessed. Public APIs were read as documentation, never authenticated or exercised. Private discovery material is not reproduced or attributed in any repository artifact.

## Tool/evidence verification record

Root re-opened original Adobe/Worldpay-2026/Shopify/CJ/Impact/Rakuten/Salesforce/FTC/Muse/Grok/MCP/Cloudflare/Mastercard/Visa sources after receiving source-slice notes. Re-ran scenario calculator; see verification.txt for exact output. Worldpay 2025 PDF independently re-opened by root returned 502 after researcher had read original; retain narrow historical release note with this retrieval limitation. No current claim depends on that failed root re-fetch.

Dia root tabs: USB-IF 5629A70A (rendered product list read, closed); GovInfo PDF 66201A20 (empty text, closed); PDPC 5C33F917 (full public guide landing read, closed); Google UCP 32660AD8 (full walkthrough read, closed). Researcher Perplexity tab 35441A91 was closed. Only task-owned tabs were used. No browser connection failure occurred; unresolved requests are listed in needs-browser.md.

## Gate 1 repair: native Shopify monetization

[Promoted placements documentation](https://shopify.dev/docs/agents/catalog/promoted-placement), live 2026-11-03, was independently opened by root after verifier identified this omission. Invite-led Developer Preview exposes a 0.3% base commission, seven-day last-non-direct-click attribution and higher merchant-funded rates conditional on Shop completion. Enrollment, preserved attributed URLs, hold/qualification, reversals and disclosures apply. Cart/Checkout MCP do not yet carry attribution through to orders in these docs. This is native competition and a possible partner route, not approval or realized revenue. Paid-placement blending must not silently change the proposed buyer-fit ranking; compatibility of the program with that product promise remains unresolved. The calculator includes a rate-only sensitivity; all other parameters remain assumptions.

## Additional mechanism source checks

- [Stripe MPP announcement](https://stripe.com/blog/machine-payments-protocol), 2026-03-18: original body lines 280–325 read; open standard coauthored with Tempo, cards/fiat and stablecoins, resource/MCP payment request flow. Does not make ACP a single mandatory payment rail or establish our goods checkout.
- [Coinbase x402 original](https://www.coinbase.com/developer-platform/discover/launches/x402), 2025-05-06, and [foundation launch](https://www.linuxfoundation.org/press/linux-foundation-announces-operational-launch-of-x402-foundation-to-standardize-internet-native-payments-for-ai-agents-and-applications), 2026-07-14: original bodies read. HTTP payment mechanism and governance exist; omit transaction and latency marketing as retail-adoption evidence.
- [Stripe Issuing controls](https://docs.stripe.com/issuing/controls/spending-controls), live: original 91-line markdown read. Category/country/amount controls, private-preview merchant-ID limits, best-effort aggregation and later-charge caveats. No claim of turnkey single-use SKU binding or a new company's eligibility.
- Public opinion originals [April post](https://x.com/antoniogm/status/2039652629874164019) and [March article](https://x.com/i/article/2035723548405227520) read in task-owned Dia tab BBE60CC4, then closed. The opinions inform the offer-auction and consumer-interface bear case. Owning protocol documents override technical generalizations. No engagement metrics or profile details copied into the public argument. See mechanism-analysis.md.

Canonical reading note: all three requested articles and both reference dossiers were read; the requested sewer dossier market-evidence.md does not exist at that path. Its research-map/evidence-ledger/scenario/visual/build files were used for format, without borrowing claims. Current skill's every-card visual and at-least-one-third watercolor requirements take precedence over their older minimum coverage. Phase 1 creates no visual assets or article.

## Consumer-fiduciary topup — 3 November 2026

The product constraint is no pay-to-rank: selection by buyer fit, verified outcomes and landed cost. Evidence supports testing this promise, but does not establish an uncopiable moat. [OpenAI’s current shopping help](https://help.openai.com/en/articles/11128490-shopping-with-chatgpt-search) says product results are independent of partnerships; its [August advertising update](https://openai.com/index/expanding-access-to-ai-with-chatgpt-ads/) says ads are separate from answers. [Google’s AI Search ad help](https://support.google.com/google-ads/answer/18826097) likewise asserts organic-response independence. These are vendor policies, not independently audited outcomes (E36–37/E44). The claim to prove is a stronger, observable separation—public criteria, commission-blind ranking inputs, logged exclusions and outcome evidence—not that incumbents cannot utter or adopt the same promise.

Product boundaries matter. AI Mode is Google Search, not the Gemini app. [Alphabet’s April29 transcript p19](https://s206.q4cdn.com/479360582/files/doc_events/2026/Apr/29/2026_Q1_Earnings_Transcript.pdf) describes Gemini app free-tier/subscription focus and leaves later ads open; this dated statement does not prove November ad absence (E38). Perplexity’s [original advertising experiment](https://www.perplexity.ai/hub/blog/why-we-re-experimenting-with-advertising) is historical and also promised unbiased answers. Secondary reports of a 2026 withdrawal were found, but fresh primary confirmation was not established here; neither ads-live nor company-wide ads-absent is justified at cutoff (E39).

[Consumer Reports’ funding page](https://www.consumerreports.org/cro/about-us/our-partners/index.htm) lists members, donors, foundations and strategic partnerships. Its [commercial-partner policy](https://www.consumerreports.org/about-us/partners-and-major-gifts/commercial-partners/) permits service/affiliate fees while explicitly prohibiting retailers buying product placement, reviews or ratings (E40). This is a relevant governance precedent, not proof membership alone funds the organization. [Wirecutter’s owning-company help page](https://thenewyorktimeshelpcenter.helpjuice.com/21870729656596-Wirecutter-Product-Recommendations) describes picks based on testing/editorial standards, affiliate commissions, and editors/writers kept unaware of retailer relationships (E42). The direct editorial-standards original was blocked, so no proxy or snippet is represented as an original body read.

The [latest Costco 10-K](https://www.sec.gov/Archives/edgar/data/909832/000090983226000093/cost-20260830.htm), FY2026, reports $5.907bn membership revenue and $9.226bn net income, with fewer than 4,000 warehouse SKUs versus 9,000–11,000 online (E41). This supports paid membership and selection at scale. Fees are revenue, not profit; the filing does not allocate net income causally to memberships, and retail cost structure is unlike research software.

For rank-blind fees, [Instant Checkout’s launch](https://openai.com/index/buy-it-in-chatgpt/) explicitly says seller fees on completed purchases do not influence product results. It separately allows checkout availability among same-product merchant-ordering factors (E44). This is a narrow product-ranking precedent, not evidence of a uniform fee or completely transaction-blind merchant ranking. A proposed flat take must prevent rate, eligibility and conversion propensity leaking into product selection; rebates can reduce net conflict but do not alone prove neutrality. Membership is compatible only if members buy research service, never product priority. Brand insight is a proposed downstream revenue line, not a proven neutral business: prohibit advance access, suppression rights and favorable-ranking commitments.

[FTC Endorsement Guides Q&A](https://www.ftc.gov/business-guidance/resources/ftcs-endorsement-guides-what-people-are-asking) distinguishes guidance from Section5 enforcement and requires material connections to be understandable (E43). [2024 rule Q&A](https://www.ftc.gov/business-guidance/resources/consumer-reviews-testimonials-rule-questions-answers) confirms October21 effectiveness, prohibits sentiment-conditioned review incentives, and explains that honest sentiment-neutral incentives are not categorically prohibited but may need disclosure (E18). Receipt verification proves a purchase, not use, identity uniqueness or review truth. Longitudinal agent check-ins must preserve actual user experience and negative reports; no fraud-prevalence estimate or legal safe harbor follows.

Calibration: E45 adds June2025/Aug2026 García Martínez arguments solely from parent author-read notes; these strengthen the bear case, never establish inevitability. E46 limits the AEO comparison to previously read CJ/Impact materials; no dedicated AEO-vendor landscape is claimed. E02’s Worldpay date is publication metadata, not survey fieldwork; E14’s April3,2025 date is original JSON-LD; AP2’s opened body says September16,2025, so the conflicting September17 request is explicitly unresolved rather than silently substituted.
