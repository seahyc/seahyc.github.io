# Visual coverage · visual revision · 3 November 2026

18 cards, 18 unique substantive visuals: 12 SVGs and 6 generated watercolor cutouts. Every card, including cover and appendix, has its own figure. Existing eight figures retained. No asset counted twice; no shared renderer or CSS changes.

| Card | Visual | Explanatory job | Provenance / evidence | Alpha |
|---|---|---|---|---|
| Cover | power-chain.svg | Mechanism: source → service → equipment → computing | Original conceptual synthesis | Transparent SVG canvas; ≥21px labels |
| 01 | local-site-watercolor.png | Local connection blocks distant power | Generated editorial metaphor | RGBA; sips yes; corners 0,0,0,0; checker edge pass |
| 02 | company-choice-watercolor.png | Four distinct founding capabilities | Generated editorial comparison | RGBA; sips yes; corners 0,0,0,0; checker edge pass |
| 03 | equipment.svg | Separate equipment classes and historical lead times | DOE / Wood Mackenzie, E06–E07 | Transparent SVG canvas; ≥21px labels |
| 04 | power-chain-watercolor.png | Missing connection determines readiness | Existing generated editorial metaphor | RGBA; sips yes; corners 0,0,0,0; checker edge pass |
| 05 | queue-outcomes.svg | Generation cohort is not a load-success probability | LBNL Queued Up 2026, E04 | Transparent SVG canvas; ≥21px labels |
| 06 | nuclear-gates.svg | Criticality and dependable electricity are distinct | DOE milestones, E16/E24 | Transparent SVG canvas; ≥21px labels |
| 07 | reactor-watercolor.png | Heat requires conversion before useful electricity | Existing generated conceptual metaphor | RGBA; sips yes; corners 0,0,0,0; checker edge pass |
| 08 | project-record.svg | Keep project evidence fields separate | Original diligence schema, E16–E25 | Transparent SVG canvas; ≥21px labels |
| 09 | smr-boundaries.svg | Design, project permissions and delivery differ | Conceptual interpretation, E19/E20/E23/E25 | Transparent SVG canvas; ≥21px labels |
| 10 | deal-map.svg | Offtake, restart/uprate and development differ | Meta / Constellation / Kairos, E15/E19/E26 | Transparent SVG canvas; ≥21px labels |
| 11 | geography-watercolor.png | Local authority must assess local supply | Generated metaphor, E28/E31 | RGBA; sips yes; corners 0,0,0,0; checker edge pass |
| 12 | economics.svg | Annual residual includes downside and overhead | Original invented model, E30 | Transparent SVG canvas; ≥21px labels |
| 13 | cost-boundary.svg | Incomplete model excludes dependable-service costs | Original model boundary, E30 | Transparent SVG canvas; ≥21px labels |
| 14 | bear-case.svg | Supply and incumbent responses can erase wedge | Conceptual bear mechanism, existing card14 | Transparent SVG canvas; ≥21px labels |
| 15 | roadmap.svg | Conditional execution sequence | Original proposed plan, E29/E30 | Transparent SVG canvas; ≥21px labels |
| 16 | validation-watercolor.png | Engineering acceptance and paid pilots before expansion | Generated metaphor, proposed E29/E30 gates | RGBA; sips yes; corners 0,0,0,0; checker edge pass |
| 17 | model-boundary.svg | Arithmetic does not validate assumptions | Original model methodology, E30 | Transparent SVG canvas; ≥21px labels |

## Provenance and boundaries

Original SVGs: build-visuals.py. Added SVGs: build-extra-visuals.py. All conceptual figures are identified as such; queue outcomes repeat only the two sourced percentages already in the report. Economics remains the original invented scenario with zero shown. No third-party artwork copied. Images are generated editorial metaphors, not engineering layouts, real installations, measured customer demand, or project permission. Source URLs remain beside the original claims. New image prompts and origins: visual-pass-illustration-provenance.json.

All four new briefs require: “actual transparent alpha; no white, cream, paper texture, gradient, checkerboard, or baked background”. Original prompts remain in illustration-provenance.json.

## Verification

check-visuals.mjs: PASS, 18 cards / 18 illustrated / 12 SVG / 6 raster. sips and PIL checks saved in visual-pass-alpha-check.txt. Required three-viewport Playwright output: visual-pass-check-output.txt; detailed measurements: visual-pass-self-check.json. All endings reachable, images loaded, no page errors, no horizontal overflow, all 18 direct hashes pass at each viewport. Screenshots of all four new watercolor compositions on phone and desktop show paper grain through their transparent surroundings with no halos or rectangles. Original prose and all eight original figures verified unchanged by stripping only the ten inserted figure elements and comparing with visual-pass-original.md.
