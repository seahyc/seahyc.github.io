# Gate 1 · independent evidence review
Verdict: **pass**
Dated 3 November 2026. Separate verifier agent, read-only review; did not edit the dossier or ledger. Saved by the lead from the returned review. This is an evidence gate, not a release review or customer validation. Phase 2 has not started.

## Source-specific verification returned
- Independently reopened https://www.anthropic.com/research/claude-personal-guidance . E01 correctly reports approximately 639,000 unique-user-filtered conversations, approximately 38,000 guidance conversations, roughly 6% guidance incidence, 26% professional/career within guidance, and 9% sycophancy within guidance. Denominators preserved; no inference of paid demand.
- Independently reopened https://cdn.openai.com/pdf/a253471f-8260-40c6-a2cc-aa93fe9f142e/economic-research-chatgpt-usage-paper.pdf . Section 5.2 states roughly 29%; Table 3 includes how-to, tutoring, creative ideation and health/fitness/beauty/self-care. Figure 7 concerns consumer user-message shares. E02 distinguishes Anthropic's taxonomy and excludes unverified decimal precision.
- Independently reopened https://blog.google/innovation-and-ai/products/gemini-notebook/expert-intelligence-leading-sources/ . Confirmed 27 August 2026 launch, more than 100,000 books, named publishers, Google Play Books ownership requirement and separate collaborator ownership. E04 states announced competition, not tested availability or efficacy.
- Independently reopened https://new.delphi.ai/ask/vcs/q/safe-vs-priced-round . Eleven perspectives, 29 October update, comparison table and disagreement section present. Methodology attributes responses to each person's Delphi; synthesis to Delphi. E08 does not misattribute generated responses as original human quotations.
- Additional checks: https://embed.delphi.ai/premium/plans lists USD5,000/10,000 yearly creator plans; https://www.delphi.co/blog/delphi-raises-16m-series-a-from-sequoia confirms USD16m/date; https://docs.readwise.io/tools/mcp confirms Highlights and Reader access; https://www.shadowboxtraining.com/wp-content/uploads/2021/05/The_ShadowBox_Approach_to_Cognitive_Skills_Trainin.pdf confirms reported 28%/21% expert-ranking alignment and N=59/30. Implications appropriately confined.
- Independently recalculated all scenario contributions, replacement economics, integer break-even, revenue screens and sensitivities with read-only Python; all matched. No verifier file writes.

## Judgment returned
Strong bear case, named substitutes, rights limits, founder opportunity cost, explicit assumptions and operational falsifiers are present. Pricing/packaging wedge is credible as a bounded experiment; commercial validity remains expressly unproven. No required corrections or Gate 1 blockers.

Excluded unresolved leads are not dependencies: Sam Parr's post; Founders Fund seed participation; absolute absence of Anthropic publisher deals; current settlement finality. These must remain excluded unless separately verified.

## Lead verification
Executed calculate-scenarios.py and independently recomputed JSON outputs without rerunning the generator. Both checks passed. Required four phase-1 files present. No public article or public image directory for this slug existed at completion. No Hugo build was needed for phase 1; no git commands executed.

---
# Gate 1 (parent-run, cross-model) · PASS · 3 November 2026
Independent Claude verifier (read-only, no file writes, no git). Reopened via WebFetch: Anthropic personal-guidance study (E01 matches incl. denominators), Google Expert Intelligence (E04), Delphi multi-perspective page (E08), Delphi creator plans (E07, creator-side not ARPU), Readwise MCP docs (E05), the-brains LICENSE (E14). Recomputed scenario arithmetic with a no-write script: low C -3.07 / N -15.445; base 11.63 / 7.505 (break-even 267 cash / 1599 economic); high 22.33 / 21.505 (94 / 559); churn-doubled 3.38 / 3551; rights reserve 5 → 2664 — all match. Bear case, wedge (curated cited decision journal for pricing/packaging decisions of bootstrapped B2B founders) and numeric pre-registered falsifiers present; fact/inference separation visible.
Required before Phase 2 (minor): (1) reconcile Sam Parr status — parent-notes.md supplies the verbatim thread; update E13 and market-evidence §1 to "parent-verified via socialctl, anecdote of revealed workflow only"; (2) mark competitor-source-notes.md ShadowBox/Readwise/Delphi snippet notes as superseded; (3) keep Founders Fund seed and "no Anthropic publisher deals" excluded.
