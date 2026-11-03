# Competitor and evidence source notes

> SUPERSEDED collection artifact: the Readwise changelog snippet, Delphi funding snippet/sparse-fetch limitation, and ShadowBox abstract-only notes below are historical collection status, not final evidence. The lead subsequently read primary Readwise docs, Delphi investor/company pages and the open ShadowBox paper; evidence-ledger.md E05–E12 and market-evidence.md govern all public claims. The unrelated acceleratedexpertise.com course is excluded. Founders Fund seed participation and the absolute claim of no Anthropic publisher deals remain excluded.

Research checked 2026-11-03. These notes report retrieved source text, not claims inferred from inaccessible material. “Fetched” means the browser tool returned page text; some pages expose only abstracts or rendered search snippets.

## Readwise MCP

### Official documentation
- URL: https://docs.readwise.io/tools/mcp
- Title: “Readwise MCP Server - Readwise Docs”
- Date: No publication/update date displayed in the fetched documentation. Search index marked crawled today (2026-11-03); this is crawl metadata, not a publication date.
- Retrieval: Fully fetched HTML (265 lines). Relevant returned text: lines 32 onward state MCP gives Claude, ChatGPT, Cursor, or compatible AI access to the user's Highlights library and Reader documents; it can search notes, use reading history as context, and make Reader changes. The tool catalog includes document search/export, document metadata, highlights and library operations. FAQ says indexing updates automatically as content changes; old Highlights-only MCP is being deprecated in favor of the newer one covering both Reader and Readwise.
- Claim supported: Readwise is a personal reading-library retrieval/context integration, with write actions as well as search. It is not itself evidence that a system trains a user's judgment or provides a human expert's advice.
- Limits: Product documentation is first-party feature description, not independent evaluation of answer quality, provenance fidelity, or learning outcomes. “Direct access” describes integration capability; it does not establish that every generated answer is grounded correctly.

### Official dated launch/changelog
- URL: https://docs.readwise.io/changelog
- Title: “Readwise Highlights & Reader Changelog”
- Date: The search-retrieved page includes a dated entry “March 20, 2026” announcing the new Readwise MCP; the snippet says it gives AI clients access to Highlights and full text of Reader documents. Also notes new CLI and prebuilt workflows (book review aware of related vault context, quiz mode, etc.).
- Retrieval: Search-result text fetched, not independently opened to the dated section in this pass. Treat launch date and wording as snippet-supported, not full-page-verified.

## Delphi

### Official product positioning
- URL: https://new.delphi.ai/press
- Title: “Press · Delphi”
- Date: Page has no publication date. It includes press links dated Sep 2026 through 2025 and a current footer © 2026.
- Retrieval: Fully fetched HTML (66 lines). Lines 11–14 describe Delphi as a network to find people with relevant lived experience; conversations are by chat or voice; “Every Delphi is one real person” who controls what goes into it; answers show where they come from and the system says when it does not know. Lines 14 and 42 describe free profiles and the founder's origin story building a Digital Mind of his grandfather from his memoir in order to ask for advice.
- Claim supported: Advice/consultation is an explicit intended use and positioning, based on an identified person's lived experience and contributed materials. This is distinct from a training system whose primary action is teaching a learner to make better decisions independently.
- Limits: This is company-authored positioning; it does not independently establish advice accuracy, fidelity to a person's judgment, efficacy, safeguards, or downstream outcomes.

### Official funding announcement
- URL: https://www.delphi.co/blog/delphi-raises-16m-series-a-from-sequoia
- Title: “Delphi Raises $16M Series A from Sequoia Capital to Pioneer ‘Digital Minds’”
- Date: Published June 24, 2025.
- Retrieval: Search result returned article text (snippet) including headline, date, the founder's description of Delphi as a “conversational library of human expertise,” and the claim of a $16M Series A led by Sequoia, with named participating investors. Opening the canonical URL returned sparse HTML/navigation text only (39 lines), so details here are snippet-supported rather than fully retrievable from opened page.
- Claim supported: The company announced a $16M Series A on June 24, 2025, led by Sequoia; company source. Do not treat the announcement’s “2,000+ experts” or usage statements as independently audited.
- Limits: Does not establish current valuation, current revenue, or later rounds. Third-party CB Insights result was not used as evidence because details are partly paywalled/obscured.

### Current official paid plan page
- URL: https://embed.delphi.ai/premium/plans (the fetched https://embed.delphi.ai/pricing redirected here)
- Title: “Premium Plans and Pricing · Delphi”
- Date: No page date shown; footer © 2026.
- Retrieval: Fully fetched HTML (106 lines). Lines 14–37 list Scaler at $5k/year and Scaler + API at $10k/year; Scaler includes 12M training words, integrations, pro voice, actions/developer platform, Slack, and product recommendations; Scaler + API adds API, SSO, onboarding, 20M training words, unlimited integrations, priority support. Lines 51–68 say Immortal has tailored pricing and includes unlimited training words, WhatsApp/text and advanced mind architecture. Lines 71–77 distinguish free Delphi on Delphi's network from paid plans that put it on the creator's own channels/tools.
- Claim supported: Current fetched product pricing is yearly $5k/$10k, plus tailored Immortal pricing. Paid tier is positioned around deployment/distribution and larger training-word allowance.
- Limits: Prices/features can change; no access to checkout was attempted. Another search result for the older `/pricing` page showed $79/month Builder and $299/month Scaler plus 1M/5M/12M training words. That is a conflicting, likely stale/prior pricing page (search crawl says two months ago) and should not be presented as current alongside the live premium page. The current page itself does not show the free tier's quota.

## Accelerated expertise and ShadowBox

### ShadowBox empirical study (primary academic source, abstract only)
- URL: https://journals.sagepub.com/doi/10.1177/1555343416636515
- Title: “The ShadowBox Approach to Cognitive Skills Training” — Gary Klein and Joseph Borders.
- Date: 2016 (journal citation and publication metadata in source title/search indexing; page abstract fetched).
- Retrieval: Publisher page fully fetched as an abstract/metadata page, but article full text is gated. Abstract lines 32–34 states it trained warfighters in social cognitive skills for civilian encounters, evaluated in two studies: three hours nonfacilitated paper training for Marines (N=59), reported 28% improvement in match to SME rankings vs control; one-hour Android tablet training for soldiers (N=30), reported 21% improvement. Abstract calls both results statistically significant. Lines 35–39 show full access requires access/purchase.
- Claim supported: There is a published evaluation of expert-model/scenario-based training, measured against matching subject-matter expert rankings in military settings. This supports a training/skill-development model, not an always-available expert-advice service.
- Limits: Only abstract was fetched; do not infer unreported methods, uncertainty intervals, follow-up/transfer, generalization to other domains, or comparative commercial performance. The percentages are abstract-reported outcomes, not independently recalculated here.

### ShadowBox method description (primary government report summarizing the method)
- URL: https://assets.publishing.service.gov.uk/media/5a7eb33540f0b6230268af9e/RR337_-_Clinical_Judgement_and_Decision-Making_in_Childrens_Social_Work.pdf
- Title: “Clinical Judgement and Decision-Making in Children’s Social Work” (Research Report 337; UK government PDF).
- Date: Search index gives publication circa 2014 / 12.5 years ago; exact cover date not verified in this retrieval.
- Retrieval: PDF text fully fetched (1,121 lines). Lines 725–735 discuss expert perception, the ShadowBox approach, scenario-based exercises and cognitive-task-analysis material, experts’ decisions and rationales, and learner comparison at decision points. It says delivery does not require an expert to be present; it also reports prior per-scenario preparation/admin time of 30–80 minutes as a drawback. Lines 707–721 describe practice, experience, feedback, and reflection as components of developing expertise.
- Claim supported: ShadowBox operationalizes teaching expert perception and rationale through structured scenarios, then feedback/comparison; it is a learner training method, not merely replaying an expert's answer on demand.
- Limits: Government report discusses potential use in social work and summarizes prior work; it is not itself a controlled evaluation of ShadowBox efficacy in that setting. Avoid presenting its proposed trial as demonstrated outcome.

### “Accelerated Expertise” phrase/product disambiguation
- URL: https://acceleratedexpertise.com/
- Title: “Accelerated Expertise by Stuart Tan”
- Date: The site footer says © 2013, 2017, 2021; the offer includes a coupon expiring May 31 (year presented as 2022), so current offer/pricing is stale and unverified.
- Retrieval: Search result snippet only. It describes a paid 10-module home-study system about a reading/learning process, application, memory, digital reading, assignments, webinars and a completion certificate; snippet displayed $97 against $497.
- Claim supported: “Accelerated Expertise” also names a reading/self-study course; do not conflate it with the academic concept/book or the ShadowBox method. The visible course appears focused on learning/application, not expert advice delivered by a digital replica.
- Limits: Site not fully opened in this pass; price is stale snippet evidence, not current commercial pricing. No independent outcome evidence retrieved.

## Comparison boundary for synthesis

- Readwise MCP: retrieval and use of the user's own saved material as context; may help recommend what to read, but available evidence here is product documentation, not evidence of improved decision skill.
- Delphi: conversational access to a specific person's contributed experience/perspective, explicitly positioned for asking and receiving advice; current paid plans sell creator distribution/deployment and content capacity.
- ShadowBox: structured practice that exposes a learner to expert decision rationales and feedback with the goal of developing cognitive skill; published abstract reports improvement in alignment with expert rankings in military cohorts, with generalization limits.
- “Accelerated Expertise”: ambiguous phrase spanning a learning-science book/concept and a commercial reading course. Keep these separate from Delphi and ShadowBox unless the main dossier defines a narrower intended referent.
