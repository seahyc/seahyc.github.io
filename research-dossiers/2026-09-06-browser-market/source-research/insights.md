# Assessment

Scope update: the user subsequently clarified that the goal is a durable infrastructure company comparable in shape to Supabase, Tailscale or Cloudflare. The ranking below answers the earlier, broader niche-business question. Use [infrastructure-thesis.md](infrastructure-thesis.md) for the current recommendation; it supersedes the ranking below without changing the source-post findings.

The post validates an existing managed scraping purchase, not an unmet stateful anti-bot API market. Levels reports retaining ScrapingBee at $99/month and explicitly says he is happy with it. Most of his stated workload is Google search results. No logs were available to diagnose his failures, and no multi-page procurement or SDR workflow was described.

The proposed feature gap is overstated. Browserbase, Steel and Bright Data already advertise relevant managed-browser capabilities. Persistent browser state is also different from persistent business progress: knowing whether an order was accepted, retaining a draft through a review pause, and preventing duplicate work require application-level guarantees. Skyvern already markets some of these workflow features. A new product therefore needs demonstrated superiority on a particular supported workflow rather than a general claim of novelty.

Commercial evidence is sufficient to justify customer discovery. ScrapingBee reached a reported $5M ARR and an eight-figure acquisition; Browserbase reports substantial session volume. These establish company-scale opportunities but do not establish this proposed wedge's market size. See [sources](sources.md).

## Ranked hypotheses

Ranked by a combination of buyer value, differentiation potential and YC's plausible access to customers. These are discovery priorities, not validated market gaps.

1. **A narrow recruiting-data quality and change product.** Sell a verified stream of material hiring changes for a defined customer segment and geography, with source evidence, record matching and freshness commitments. Buyer: recruiting software or staffing teams. YC's domain experience could help identify errors buyers actually care about. Existing competition includes Coresignal and TheirStack; validate a specific coverage or quality deficit on the customer's real sample before building.
2. **One authorized procurement or finance portal workflow.** Start with retrieving and reconciling supplier documents or order status across a small shared set of portals. Buyer: operations teams with recurring manual work. Value comes from checked business outputs and resolution of exceptions. Browserbase, Skyvern, RPA and existing integrations are alternatives; only pursue with repeatable workflows across multiple buyers.
3. **Independent browser-workflow verification and regression monitoring.** Validate that a supported workflow reached its intended business result, measure cost and human intervention, and flag regressions across providers. A logs/replay product alone overlaps incumbents. Buyer willingness to add another tool and permit testing is unresolved.
4. **Domain-specific public-data change intelligence.** Pick a narrow commercial decision such as supplier catalog changes or tender amendments. Sell normalized changes with evidence, history and delivery into the buyer's workflow. Generic scraping and extraction are already supplied by Apify, Context.dev and others; distribution and domain interpretation must justify the purchase.
5. **Verified-agent access for a specific portal ecosystem.** Enable site-approved automation with permissions and auditability. Potentially durable, but needs access to portal owners and agents; Browserbase's identity partnerships are direct competitive evidence. Unattractive as a generic new identity network without anchor partners.

Deprioritize a generic scraper, generic search API, generic replay dashboard, and the proposed broad bypass wrapper. None currently has a demonstrated buyer-specific advantage in this research.

## Economics and validation

Illustrative revenue arithmetic, not market estimates:

- 842 customers at $99/month produce about $1M ARR; 8,418 produce about $10M.
- 100 customers at $2,500/month produce $3M ARR.
- 334 customers at $2,500/month produce about $10M ARR.

Higher prices require higher proven value and usually higher sales/support effort. Measure cost per accepted business result, including upstream services, retries, review labor and support. Do not treat API gross margin before exception handling as the full margin.

Suggested two-week discovery test: interview 12-15 actual buyers across the top two niches; inspect their recent failures and accepted/rejected outputs; identify current spend and labor; compare existing services on a customer-approved workload; secure three paid pilots for the same narrow outcome. Proposed continuation criteria: recurring pain, material measured improvement over the buyer's baseline, reuse across pilots, and acceptable contribution margin after human work. Stop or narrow if an existing supplier solves the issue through ordinary configuration, willingness to pay is weak, or each customer requires unrelated custom development.

The most valuable missing evidence is a buyer who already pays for the available tools and can show a costly, recurring, still-unsolved problem. That buyer is more informative than additional engagement on the source post.

[Research index](index.md)
