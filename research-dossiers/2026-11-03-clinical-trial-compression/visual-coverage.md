# Visual coverage · clinical trial compression · visual revision

3 November 2026. 21 cards including cover; 21 distinct substantive visuals, one per card: 14 SVGs and 7 generated watercolor cutouts. Required watercolor minimum: ceil(21/3) = 7. Every asset counts once. Original facts and argument retained; only figures and captions added. Shared renderer and CSS untouched. The parent handles publication.

All diagrams are transparent SVG canvases, 600px wide, minimum text 21px. All PNGs are genuine RGBA cutouts with zero-alpha corners and outer-edge alpha at most 14/255; final checks in visual-pass-alpha.txt and visual-pass-checks.txt. No sourced photographs or third-party artwork reused.

| Card | Visual | Job / provenance | Alpha status |
|---|---|---|---|
| Cover | evidence-bridge.png | Existing original metaphor: preparation bridges to human encounter | RGBA; corners 0 |
| 01 | question-to-study.png | New watercolor: molecule → protocol → clinical question, not clinical success | RGBA; corners 0 |
| 02 | critical-path.svg | Existing conceptual parallel dependency diagram; no measured timing | Transparent SVG |
| 03 | clinic-fit.png | New watercolor: protocol requirements meet clinic capacity and participant obligations | RGBA; corners 0 |
| 04 | clocks.svg | Existing zero-based historical Tufts means, Table 6 PMC9373886, not additive | Transparent SVG |
| 05 | ai-boundary.svg | Company-reported batch review result does not establish whole-trial acceleration; Anthropic/Enveda linked on card | Transparent SVG |
| 06 | patient-paths.png | Existing record → assessment/decline/review metaphor, no conversion claims | RGBA; corners 0 |
| 07 | visit-network.png | New watercolor: remote and home activity return evidence to accountable clinic; FDA guidance linked on card | RGBA; corners 0 |
| 08 | design.svg | Existing comparison-design distinctions, FDA guidance | Transparent SVG |
| 09 | approval-path.svg | HSA CTA and ethics may proceed in parallel; site readiness is separate; HSA linked on card | Transparent SVG |
| 10 | wedge.svg | Existing proposed readiness package and qualified acceptance boundary | Transparent SVG |
| 11 | service-learning.png | New watercolor: service reveals reusable module, while awkward customization remains | RGBA; corners 0 |
| 12 | economics.svg | Existing base USD scenario: supplier contribution vs buyer value; scenario-model.json | Transparent SVG |
| 13 | scenario-range.svg | Low/base/high USD per-package supplier and buyer results from scenario-model.json, common zero/scale | Transparent SVG |
| 14 | competition.svg | Existing official vendor role map, no comparative performance claims | Transparent SVG |
| 15 | hidden-work.png | New watercolor: small drafting task rests on access, experts and responsibility; sizes are not cost shares | RGBA; corners 0 |
| 16 | roadmap.svg | Existing proposed evidence-gated sequence, not forecast | Transparent SVG |
| 17 | measurement.svg | All attempts → separate waiting/work/review/external dependencies → accepted and patient milestones; original proposed method | Transparent SVG |
| 18 | decision.svg | Existing founder-selected stop/go gates, not medical standards | Transparent SVG |
| 19 | model-equations.svg | Supplier and buyer equations, faithful to existing scenario model; invented inputs | Transparent SVG |
| 20 | evidence-boundary.svg | Regulations/cohorts/company reports/scenarios prove different things; customer results remain missing | Transparent SVG |

## New asset provenance

Built-in image_gen, 3 November 2026. Five separate new illustrations, each requested with rough childlike wobbly ink, translucent washes bleeding past lines, muted cheerful sage/coral/ochre, no text. Each brief explicitly required **actual transparent alpha; no white, cream, paper texture, gradient, checkerboard, or baked background**. The five images are editorial mechanisms/metaphors, not clinical evidence. No image editing or inferred scientific outcomes. Exact generation output paths are in visual-pass-generation.json. Copies saved to static/images/clinical-trial-compression; originals retained. Paper composites and live-card screenshots are internal QA only.

Six added SVGs are reproduced by add-visuals.py. Original eight remain reproduced by build-visuals.py. Both generators use only the existing report/dossier claims; the scenario generator reads scenario-model.json directly. Public figure captions calibrate each new asset. Narrative equality after stripping figure blocks is checked in visual-pass-checks.txt.

## Image generation briefs and provenance

Built-in image_gen, 3 November 2026; style is hand-watercolor with childlike wobbly ink contours, translucent washes bleeding past the lines, muted cheerful sage/coral/ochre, no text. Each brief explicitly required: **actual transparent alpha; no white, cream, paper texture, gradient, checkerboard, or baked background**.

- evidence-bridge.png: researcher organizes tangled trial documents into a bridge toward clinician/patient; evidence preparation supports the human encounter rather than replacing it. Source generation exec-be20ea43-aeff-4f87-b3b1-f154a52de754.png. No factual clinical output asserted. Saved PNG RGBA with corner alpha 0,0,0,0; sips hasAlpha yes. Inspected locally.
- patient-paths.png: final built-in image_gen generation exec-a85d6b0c-71b1-41d7-8d4b-14a4430a8f95.png, 3 November 2026. A medical folder branches toward a patient-clinician conversation, empty chair and return arrow; records can lead to several real-world outcomes. Brief requested sparse rough watercolor with no ambient haze and the exact transparency wording above. This replaces the earlier composition after extraction/re-generation. The raw image preview displayed RGB behind zero-alpha pixels; pixel inspection and an ImageMagick composite on Fieldbook paper confirm those areas are actually transparent. The final near-zero alpha values (<=1/255) were normalized to zero with ImageMagick, preserving RGB and subject geometry. All four saved corners are exactly alpha zero. The card image explicitly uses background:transparent to override the shared image backing. QA composite patient-paths-on-paper.png is internal only; the public PNG retains alpha. Final sips/corner and rendered verification recorded in release-checks.md.

## Source dates and reuse boundary

Evidence date is 3 November 2026. clocks.svg uses historical pre-pandemic Tufts data published online August 2022 / issue 2023, not 2026 performance. Competitor descriptions reflect official pages read in Phase 1; neither market share nor relative measured performance is plotted. All illustrations are editorial metaphors; no clinical data or patient imagery. Final raster alpha results and screenshots are retained in the dossier. Gate 2 independently checks the rendered cards before parent publication.
