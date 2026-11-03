# Visual coverage · visual revision · 3 November 2026

15 cards; 15 unique substantive visuals: 10 SVGs and 5 generated watercolor illustrations. Every card including cover has its own explanatory visual. Existing six good visuals retained. Original prose and claims unchanged (figure-stripped invariant passed).

| Card | Visual | Explanatory job | Provenance / limits | Alpha |
|---|---|---|---|---|
| Cover | advisers.png | Several sources inform one decision, none is an oracle | Existing generated watercolor metaphor | RGBA; corners 0 |
| 01 | denominators.svg | Different populations and units prevent market-share comparison | New original diagram; existing adjacent Anthropic and OpenAI/NBER citations; ledger | Transparent SVG |
| 02 | tool-boundary.svg | Retrieval, host adoption and original context are separate checks | New proposed process; existing Brains and Readwise documentation | Transparent SVG |
| 03 | mechanism.svg | Original source → context → conditions → decision → outcome | Existing proposed process, not efficacy evidence | Transparent SVG |
| 04 | disagreement.png | Bridge and boat fit different circumstances; conditions explain disagreement | New generated editorial metaphor, not factual evidence | RGBA; corners 0 |
| 05 | rights.png | Ownership, access and reuse permission need separate checks | New generated metaphor; stamp represents unresolved permission, not clearance | RGBA; corners 0 |
| 06 | competition.svg | Existing products occupy different parts of pitch | Existing documented-offering comparison; no hands-on efficacy ranking | Transparent SVG |
| 07 | case-file.svg | Separate statement, action, explanation, result, counterexamples, unknowns | New proposed case-file diagram; sequence is not causation | Transparent SVG |
| 08 | wedge.png | Curate a small evidence shelf around one real pricing decision | New generated metaphor; customer/workflow remain hypotheses | RGBA; corners 0 |
| 09 | economics.svg | Recurring contribution after replacement acquisition | Existing zero-based scenario chart; not measured economics | Transparent SVG |
| 10 | break-even.svg | Cash versus founder-time cost and support/churn sensitivities | New zero-based chart; existing JSON and arithmetic, chosen assumptions | Transparent SVG |
| 11 | founder-time.png | Useful tool competes for scarce founder time | Existing generated metaphor, no market-size claim | RGBA; corners 0 |
| 12 | roadmap.svg | Each stage must earn the next | Existing proposed calendar, not forecast | Transparent SVG |
| 13 | renewal-gate.svg | Payment, renewal, return and support must each pass | New proposed operating hurdles from research-map; not achieved results | Transparent SVG |
| 14 | falsifiers.svg | Substitution, attribution, rights and contribution can stop thesis | New original decision diagram; existing research-map and ledger | Transparent SVG |

## Generation and reproducibility

Built-in image_gen tool used for each new illustration, 3 November 2026. Use case: illustration-story. Shared brief: Hand-watercolor editorial illustration for a founder Fieldbook. Rough childlike wobbly dark ink contours, translucent washes bleeding locally past lines, faded cheerful sage green, dusty blue, ochre and rust. Simple isolated cutout composition, no lettering, no symbols resembling text. **actual transparent alpha; no white, cream, paper texture, gradient, checkerboard, or baked background**. Generous transparent margin, no atmospheric glow or drop shadow.

- disagreement.png: two open books; bridge across narrow gap versus boat across deeper water, their paths informing one decision notebook. Different circumstances explain different solutions; no debating personalities.
- rights.png: held closed book, gated open book, permission stamp and separate pages. Tentative dashed paths and gaps; no legal conclusion.
- wedge.png: founder choosing a blank price tag over product boxes; tiny curated shelf feeds a decision journal while large catalogue stays disconnected.

Generated files copied from tool output without pixel editing. Existing artwork retained; no third-party images reproduced. Watercolor illustrations are illustrative, not evidence or real people. Captions identify metaphors and limits. New SVGs reproduced by `python3 research-dossiers/2026-11-03-ai-advisory-bookshelf/build-visual-pass.py`; existing four by `build-visuals.py`. All SVG text >=21px at 600px width. Category and value labels occupy separate space; zero-based quantitative scales.

## Verification

`check-visuals.mjs`: cards 15 · visuals on cards 15 · svg 10 · raster 5 (need ≥5); PASS. Checks include SVG text bounding boxes and raster edge alpha. `sips -g hasAlpha`: yes for all five raster assets. PIL: RGBA, all four corners exactly zero for each file. New watercolors inspected on rendered paper cards at 390px and desktop: no background rectangles or halos.

Private Hugo build and three-viewport report: see `visual-pass-results.md`, `report.json`, `check-visual-pass.mjs` and viewport screenshots. Direct hashes tested with a fresh reload (same-document hash assignment is not a direct-page-load test). No shared renderer/CSS edits; publication belongs to parent.
