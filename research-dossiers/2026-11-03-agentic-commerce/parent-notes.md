# Parent-supplied evidence and founder steer · 3 November 2026

## A. The founder's own mechanisms (MUST be analysed explicitly, card by card)
The founder, who has marketplace operating experience, specified these mechanisms. The
Fieldbook must evaluate each one on its merits, with evidence, rather than substituting a generic plan:
1. **Demand first, transactions later.** Be the scrappy *primary* MCP/tool that agents call for shopping research, so that
   when marketplaces and agent builders "wake up", buying it is cheaper than building it (counter-positioning).
2. **Own the intent layer early.** Parse natural-language requests into *hard criteria* (deterministic filters) and
   *soft criteria* (probabilistic preferences); capture that structured intent — and the reasons options are rejected —
   very early, before it reaches any retailer. Compare with what answer-engine-optimisation (AEO) vendors are trying to own.
3. **Marketplace mechanisms, made more objective by agents.** Which classic marketplace mechanisms (ranking, reputation,
   promotions/personalised offers, subscriptions, guarantees, take rates) carry over, and which change when the buyer is an
   agent that ignores dark patterns and computes true landed cost?
4. **Later, own the transaction layer despite Stripe and card entrenchment, while minimising fraud.** Evaluate concrete
   routes (single-use virtual cards via issuing platforms, passkey/biometric approval, network tokens, agent-payment
   protocols) and the fraud vectors (prompt injection, unauthorised spend, merchant-side abuse).
5. **Capture post-purchase reviews.** Verified proof-of-purchase, longitudinal check-ins (e.g., day 30/60/90) through the
   user's agent; incentives for users and agent builders; resistance to fake reviews.
6. **Align every economic player** (buyers, agent builders, merchants/brands, marketplaces, payment networks, affiliate
   networks, ad platforms) — and say who gets disrupted — so the network effect compounds before incumbents catch up.

## B. Antonio García Martínez (@antoniogm) — public posts read via socialctl/Dia, 3 Nov 2026
Context: ex-Facebook ads product manager (shipped FBX, Facebook's real-time ad exchange), author of *Chaos Monkeys*;
profile at read time: "Director, @base growth. Founder @spindl_xyz (acq. @coinbase)", ~230k followers.
- **"Who wins agentic commerce?"** — X article, 22 Mar 2026 (post https://x.com/antoniogm/status/2035742973258825830 ;
  article https://x.com/i/article/2035723548405227520 ; ~198k views at read time). Responds to Sam Ragsdale's
  "Open Agentic Commerce" (@samrags_, 21 Mar 2026, ~553k views), in light of Stripe/Tempo's MPP announcement. Key points
  (paraphrased): open protocols didn't win the internet's main business model (ads) — Facebook's walled garden did;
  whoever owns the consumer AI experience (e.g., OpenAI as aggregator) need not be open and can make supply standardise
  into its feed; agentic flows assume fungible commodity goods, but big-ticket lifestyle/fashion/travel purchases involve
  humans who *want* to spend time and are swayed by experience; ACP (OpenAI + Stripe) assumes the AI controls the whole
  experience and will bias to one payment rail (MPP), whereas UCP (Shopify-backed) standardises interacting nodes and could
  stay open (e.g., x402); the winner depends on who controls the consumer experience.
- 2 Apr 2026 (https://x.com/antoniogm/status/2039652629874164019): "In ecommerce, the auctions will be the reverse, with
  sellers bidding to be featured in results (or to simply be the thing the agent buys) vía price discrimination and
  personalized offers. They'll resemble ad auctions because that's exactly what they are: ads for AI agents."
- 17 Aug 2026 (https://x.com/antoniogm/status/2089369428412846372): agents doing the buying "will change nothing
  fundamentally" for ads — the visible ad is the tip of an iceberg of targeting, optimisation, attribution and budgeting;
  agents just make the call-to-action machine-readable.
- 18 Jun 2025 (https://x.com/antoniogm/status/1935420005014708248): consumer AI needs a way to inject sponsored content to
  pay for compute, "probably at the MCP level"; 19 Jun 2025 reply
  (https://x.com/antoniogm/status/1935721402952208555): nudging results toward sponsored is phase 1, "'Ads' for AI agents
  (really, programmatic offers)" is phase 2 — "which is why I'd go after the MCP".
What this proves: a credible ads-marketplace operator's public view that (a) agent-facing offers will be auctions/ads,
(b) the MCP layer is where to build, and (c) walled gardens owned by the consumer AI may win. It is opinion, not market data.
Use it in the bear case (aggregator capture) and in the mechanism analysis (reverse auctions / programmatic offers).
Verify ACP, UCP, MPP and x402 from primary sources (OpenAI/Stripe, Shopify/Google, Stripe/Tempo, Coinbase).

## C. Founding principle from the founder (overrides earlier monetisation ideas) — 3 Nov 2026
"The future I want to build is to surface the best products for the consumer — not walled gardens and not who can pay
more for marketing."
Implications the Fieldbook must carry:
1. Thesis = a consumer-fiduciary research layer: ranking is determined only by fit to the buyer's hard/soft criteria,
   verified outcomes and true landed cost. No sponsored placement, no reverse "ads for agents" auctions, no pay-to-rank.
2. Counter-positioning is the moat: incumbents whose revenue is advertising or paid placement (Amazon ads, Google,
   Meta, AI assistants adding ads — verify current status of ads in ChatGPT/Gemini/Perplexity from primary sources)
   cannot credibly copy a no-pay-to-rank promise without damaging their core business (Helmer's counter-positioning).
3. Antonio García Martínez's view (walled gardens and programmatic offers win) becomes the central bear case, argued fairly.
4. Monetisation must be rank-blind. Evaluate with evidence: consumer membership (Consumer Reports, Costco membership
   economics), flat rank-blind take on completed purchases, outcome-verified insight sold to brands after ranking,
   affiliate only with firewalls/rebates (Wirecutter's editorial-independence policy; FTC Endorsement Guides and 2024 fake
   review rule), and what each does to incentives. Show which revenue lines survive the test "can anyone pay to rank?".
5. Design the trust architecture: published ranking method, audit logs, separation of revenue and ranking, verified
   purchases and longitudinal reviews, disclosures; how to prove neutrality to agents and consumers.

## D. Founder emphasis (3 Nov 2026, later): "the curation and selection is key"
The core product is curation and selection, not exhaustive search. Treat it as the heart of the Fieldbook:
- Precedents to evidence: Costco's limited-SKU curation (verify SKU counts and membership economics from its 10-K),
  Wirecutter/RTINGS-style picks with published methods, Trader Joe's private selection, Consumer Reports testing.
- Selection mechanics: how a shortlist is formed and maintained per category (criteria, testing or verified-outcome
  evidence, durability data, landed cost, exclusion rules, refresh cadence, appeals by brands), and how it stays
  rank-blind (section C).
- Why agents make curation more valuable: they can apply a curated shortlist precisely to each buyer's hard/soft
  criteria, so "the best few" beats "everything".
- Make "how we choose" a visible card with a process diagram, and make the wedge's first category a curated shortlist.

## E. Founder request (3 Nov 2026): build the execution case as a "Master Plan", like Tesla's 2006 Secret Master Plan
Make the execution path a staged master plan where each stage proves something, funds the next, and earns the right to
it — with a numeric gate between stages. Cite Tesla's original post (Elon Musk, "The Secret Tesla Motors Master Plan
(just between you and me)", 2 Aug 2006, tesla.com blog) as the structural precedent. Parent's draft (refine with
evidence; change it if the evidence says so):
1. Curate one category better than anyone: small, opinionated shortlist with a public method, exposed as the MCP tool
   agents call; no pay-to-rank. Proves trust; funds stage 2 via rank-blind commission (flat or rebated) + early members.
2. Become the default research tool across adjacent categories, reusing method, pipeline and agent integrations. Proves
   agents prefer it to native search; funds stage 3 via membership + flat take rate.
3. Turn purchases into verified outcomes (proof of purchase + 30/60/90-day agent check-ins): the dataset nobody can buy;
   improves curation; insight sold to brands only after ranking. Proves the moat.
4. Use outcomes to guarantee purchases: passkey-approved single-use checkout + "if it fails your stated criteria, we cover
   it", priced from outcome data. Proves transaction ownership without fighting Stripe.
5. Open the fiduciary standard (published ranking method + outcome protocol) so any agent/merchant integrates;
   ad-funded incumbents can't adopt it without breaking their model.
One-line summary to include: "Curate one category better than anyone; use trust to win the agents; use their purchases to
earn verified outcomes; use outcomes to guarantee purchases; use guarantees to become how agents buy."
Required: a dedicated "Master Plan" card (with a staged diagram) plus one card per stage or stage group within the
≈1/3 execution section, each with: what it proves, how it funds the next stage, gate numbers, key risks.

## F. Founder request (3 Nov 2026): include a PR/FAQ (Amazon "working backwards")
Write `pr-faq.md` in the dossier and include it in the Fieldbook (a "Working backwards" card for the press release plus
FAQ cards or an FAQ appendix card). Format:
- Press release (≈1 page) dated at a plausible stage-1 launch: headline, sub-headline, city/date line, the customer's
  problem, the solution (curated, rank-blind shortlist agents call; consumer-fiduciary), a customer quote and a founder
  quote (clearly labelled illustrative/fictional), how to get started (for a shopper using any agent; for an agent
  builder via MCP).
- External/customer FAQ: how picks are chosen; why we can't be paid to rank; how we make money; what if a pick is wrong;
  privacy; which agents it works with; how brands get considered.
- Internal FAQ: the hardest questions — why won't OpenAI/Google/Amazon/Shopify just do this; unit economics and the
  gate numbers (from scenario-model.json); distribution risk (MCP not concentrating); data/legal risk (scraping, reviews,
  FTC); why curation scales; what would make us stop.
Every factual statement in the PR/FAQ must trace to the ledger; illustrative quotes and future dates must be labelled.
