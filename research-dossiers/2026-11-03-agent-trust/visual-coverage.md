# Visual coverage · visual revision · 3 November 2026

18 cards including cover. 17 distinct substantive figures: 11 original explanatory SVGs and six built-in imagegen watercolor cutouts. Card 17 is the pure evidence/model appendix and uses its existing readable tables. Every other card carries its own unique explanatory figure. No asset counts twice. Six watercolors meet ceil(18/3)=6. All original good figures remain; the argument, facts, sources and model are unchanged. Removing the eight added figure blocks reproduces the saved pre-revision article byte for byte.

| Card | Visual | Explanatory job / nearby claim | Provenance and alpha status |
|---|---|---|---|
| Cover | permission-gate.png | Identity and action permission differ | Existing imagegen metaphor; real alpha, corners zero |
| 01 | demand-gap.png | Cheaper abuse does not establish willingness to pay a vendor | New imagegen metaphor; real alpha, corners zero; alpha 1/255 noise removed without changing RGB |
| 02 | trust-layers.svg | Identity, representative authority, intent and policy need distinct evidence | Original conceptual synthesis E02–E04; transparent SVG |
| 03 | owned-trust-roots.png | Existing networks own distribution relevant to a universal trust root | New imagegen metaphor of established roots and a new seedling; not market shares; real alpha, corners zero |
| 04 | reported-harm.svg | Reported annual harm declined; half-year observations remain separate | SPF E16/E17 reconstruction; zero origin, transparent SVG |
| 05 | borrowed-badge.png | A genuine agency record does not verify the messenger’s mandate | New imagegen metaphor of disconnected authority cord, E20; regenerated to remove haze and add transparent margins; real alpha, corners zero |
| 06 | wedge.svg | Intervene at onboarding, representative change and before contact | Original proposed workflow E24; transparent SVG |
| 07 | right-checkpoint.png | Select a check that resolves the missing fact | New imagegen metaphor of company confirmation versus account/human checks; design option, not efficacy; real alpha, corners zero |
| 08 | authority-link.png | Plausible business, person and offer do not establish their connection | Existing imagegen metaphor E20; real alpha, corners zero |
| 09 | competitive-stack.svg | Generic suppliers, vertical tools and customer context are existing alternatives | New original conceptual comparison E11–E15/E26; overlap, not efficacy; transparent SVG |
| 10 | base-rates.svg | False positives dominate rare-abuse queues | Original invented scenario E25; expected counts, zero origin; transparent SVG |
| 11 | evaluation-design.svg | Decision-time inputs must be separated from future labels and held-out campaigns | New original proposed evaluation design; no pilot; transparent SVG |
| 12 | vendor-economics.svg | Fees must cover review, support and other recurring costs | Original scenario-model.json E25; USD/customer-month; zero-based absolute bars; transparent SVG |
| 13 | hidden-costs.svg | Fee pressure and review/support burden erode contribution | New original reconstruction of existing model sensitivities E25; USD/customer-month, zero origin; transparent SVG |
| 14 | buyer-economics.svg | Vendor profitability and buyer value are independent gates | Original scenario-model.json E25; USD/month, zero origin; transparent SVG |
| 15 | pilot-contract.svg | Reachable workflow, observable outcomes and intervention authority must be discovered | New original discovery framework E24; no inferred addressable share; transparent SVG |
| 16 | roadmap.svg | Expansion requires paid value, repeatability and local validation | Original conditional sequence E24/E25; transparent SVG |
| 17 | Existing evidence, scenario and sensitivity tables | Inspect sources, assumptions, arithmetic and falsifiers | Pure appendix; table exception; original text unchanged |

Every three-card group (cover–02, 03–05, 06–08, 09–11, 12–14, 15–17) is covered; every non-appendix card individually is covered. Source citations remain adjacent in the article and ledger. All diagrams are authored via build-visuals.py at 600px width with minimum 21px text. Charts retain units, dates, model status, honest zero baselines and direct labels. Category and value labels have separate space; no negative bar is used in the new sensitivity chart. Numerical chart values match the existing model/ledger.

## Generation and reuse

Existing watercolor briefs and provenance: image-prompts.md. New complete briefs: visual-pass-image-prompts.json. New generation used the built-in image_gen tool with transparent_background=true, not a CLI or API fallback. Each prompt explicitly requires actual transparent alpha; no white, cream, paper texture, gradient, checkerboard, or baked background. Artwork is an editorial metaphor, never a performance measurement. No third-party media or copyrighted source graphics are copied.

Original generated outputs are retained in the tool’s generated_images directory. Project copies live in static/images/agent-trust/. Provenance details and the targeted borrowed-badge extraction brief are in visual-pass-provenance.md. The first borrowed-badge version failed because a faint field and edge-touching art remained; a built-in image edit removed the field and inset the subject. Final saved files pass the required alpha checker, sips and Pillow corner checks. No paper-matched rectangle is substituted for transparency.

## Verification

- visual-pass-check-visuals.txt: required checker PASS, 18 cards, 17 cards with figures, 11 SVGs, six rasters.
- visual-pass-alpha.txt: sips hasAlpha=yes and zero alpha at all four corners for all six final rasters.
- visual-pass-check-results.json: real per-card evidence at 390×844, 737×862 and 1440×1000; endings reachable, no overflow, images loaded, no page errors, all direct hashes tested.
- visual-pass-<width>-card<number>-top/bottom.png: actual rendered paper cards for manual review.
- visual-pass-release-review.md: independent Gate 2 verdict and rendered evidence.

Private destination/cache only; local preview port 1435. Shared renderer and CSS untouched. Parent publishes; no git commands or publication performed.
