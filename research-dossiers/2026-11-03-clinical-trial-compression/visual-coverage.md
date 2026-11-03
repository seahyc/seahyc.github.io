# Visual coverage · clinical trial compression

3 November 2026. 21 cards including cover; 10 unique substantive visuals (8 original SVGs, 2 generated watercolor cutouts). Minimum ceil(21/3)=7; actual 10. Every rolling window of three cards contains a unique substantive visual. No shared renderer/style edits. Visuals occupy cards 0,2,4,6,8,10,12,14,16,18. No decoration counted and no asset counted twice.

| Consecutive partition | Visual(s) / card | Explanatory job, nearby claim | Evidence / provenance | Alpha |
|---|---|---|---|---|
| cover–02 | evidence-bridge.png /0; critical-path.svg /02 | Organizing evidence creates passage to a real clinical encounter; parallel dependencies govern startup | Original metaphor; original operational synthesis E26 | PNG verified alpha and zero-alpha corners; SVG transparent canvas |
| 03–05 | clocks.svg /04 | Separate historical study clocks; not additive and not removable time | Reconstructed E09, Tufts Table 6, PMC9373886; zero-based bars, days; full cohort 187, not phase-specific denominator | SVG transparent canvas |
| 06–08 | patient-paths.png /06; design.svg /08 | A match can become assessment, refusal or re-review; observed controls/prognosis/randomization differ | Original metaphor E10/E12/E21; guidance conceptual synthesis E04/E07/E16 | PNG verified alpha and zero-alpha corners; paper composite and rendered check passed; SVG transparent canvas |
| 09–11 | wedge.svg /10 | Four bounded deliverables end in sponsor acceptance, clinical execution stays outside scope | Proposed operating scope E26; not a validated offer | SVG transparent canvas |
| 12–14 | economics.svg /12; competition.svg /14 | Positive supplier contribution can coexist with buyer shortfall; roles occupied by competitors | E25 scenario-model.json; E13–E21 official vendor/filing pages linked in article; positioning only | SVG transparent canvas |
| 15–17 | roadmap.svg /16 | Capital follows access, paid delivery, quality/milestone evidence, repeatability | Proposed 0–24 month experiment E27; not prediction | SVG transparent canvas |
| 18–20 | decision.svg /18 | Lawful paid access, quality-preserving milestone movement and buyer/supplier value are sequential gates | Original proposed falsifiers E26–E27 | SVG transparent canvas |

All SVGs are 600px wide with text >=21px. No background rectangle, gradients or copied graphics. Quantities in clocks carry source/date/cohort in article; scenario quantities carry USD, assumptions and arithmetic. Qualifying conceptual diagrams have no implied measured timing. Public captions and descriptive alt text accompany every figure. Authors retain original diagrams; generated images are new assets, not copied third-party media. No sourced photographs used.

## Image generation briefs and provenance

Built-in image_gen, 3 November 2026; style is hand-watercolor with childlike wobbly ink contours, translucent washes bleeding past the lines, muted cheerful sage/coral/ochre, no text. Each brief explicitly required: **actual transparent alpha; no white, cream, paper texture, gradient, checkerboard, or baked background**.

- evidence-bridge.png: researcher organizes tangled trial documents into a bridge toward clinician/patient; evidence preparation supports the human encounter rather than replacing it. Source generation exec-be20ea43-aeff-4f87-b3b1-f154a52de754.png. No factual clinical output asserted. Saved PNG RGBA with corner alpha 0,0,0,0; sips hasAlpha yes. Inspected locally.
- patient-paths.png: final built-in image_gen generation exec-a85d6b0c-71b1-41d7-8d4b-14a4430a8f95.png, 3 November 2026. A medical folder branches toward a patient-clinician conversation, empty chair and return arrow; records can lead to several real-world outcomes. Brief requested sparse rough watercolor with no ambient haze and the exact transparency wording above. This replaces the earlier composition after extraction/re-generation. The raw image preview displayed RGB behind zero-alpha pixels; pixel inspection and an ImageMagick composite on Fieldbook paper confirm those areas are actually transparent. The final near-zero alpha values (<=1/255) were normalized to zero with ImageMagick, preserving RGB and subject geometry. All four saved corners are exactly alpha zero. The card image explicitly uses background:transparent to override the shared image backing. QA composite patient-paths-on-paper.png is internal only; the public PNG retains alpha. Final sips/corner and rendered verification recorded in release-checks.md.

## Source dates and reuse boundary

Evidence date is 3 November 2026. clocks.svg uses historical pre-pandemic Tufts data published online August 2022 / issue 2023, not 2026 performance. Competitor descriptions reflect official pages read in Phase 1; neither market share nor relative measured performance is plotted. All illustrations are editorial metaphors; no clinical data or patient imagery. Final raster alpha results and screenshots are retained in the dossier. Gate 2 independently checks the rendered cards before parent publication.
