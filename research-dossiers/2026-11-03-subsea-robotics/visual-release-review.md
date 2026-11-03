# Independent visual release review · 3 November 2026

Scope: visual-only revision of `content/research/subsea-robotics/index.md`. No independent re-research of the unchanged public claims. Read-only review except this file; no git commands or publication.

## Checks independently performed

Required visual checker, run independently with local Chromium:

```text
cards 18 · visuals on cards 18 · svg 12 · raster 6 (need ≥6)
PASS
```

The settled rendered page independently contained exactly 18 `.story-slide` elements, each with one image. Source inspection confirms 18 unique assets: six watercolor cutouts and twelve SVGs. Each visual explains its own card's claim: product boundaries, permission filter, underwater control, positional uncertainty, sensing envelope, launch/recovery logistics, accepted comparison, incumbent offers, annual economics, charter sensitivity, cash inventory, buyer paths, claims cohort, bear case, staged plan, stop rules and bounded final thesis. No duplicated artwork is counted.

All four new watercolor alpha composites on the actual paper colour were inspected, together with their phone screenshots. No rectangular background, broad haze or edge halo was visible. Existing cover and recovery composites retain the report's teal/ochre/coral watercolor language. The new illustrations remain explanatory metaphors rather than claimed field evidence.

Quantitative visuals were compared with the existing adjacent prose and scenario model. Annual contributions remain −910/−448/+332 thousand USD. Charter stresses remain +21/+1/−19 thousand USD per campaign for assumed 4/8/12 thousand USD vessel days. Cash components remain 300,000 + approximately 177,534 + 300,000 USD. Selected claims categories remain 57%, 14%, 6%, with US$18.8 million mean export-cable claim. Cohort, dates, invented-input status, exclusions and differing denominators are visible. Zero baselines and category/value spacing are intact; no clipped or colliding SVG labels were found.

Fresh direct loads from `about:blank` were independently tested for all 18 card hashes:

```text
{"freshDirectHashes":18,"failures":[],"pageErrors":[]}
```

An earlier same-document test with only a 60ms delay caught animation states; it was discarded and replaced by fresh direct loads.

## Rendered evidence inspected

Inspected phone screenshots for cover, navigation uncertainty, accepted comparison, annual economics, charter sensitivity, claims cohort, bear case, final thesis and final card ending; tablet screenshots for product boundaries and accepted comparison; desktop screenshots for claims cohort and bear case. Labels remain readable at phone width, watercolors composite cleanly, and no unwanted horizontal spill is visible.

The parent-produced full DOM report was inspected. It reports all 18 cards and 18 loaded unique images at 390×844, 737×862 and 1440×1000, with zero page errors, document overflow, card-content overflow or hash mismatches. The reviewer identified that the initial final-element detector measured a non-rendering element (`lastBottom: 0`, empty final text), requested a visible-content detector, and withheld the final ending verdict until that was rerun.

Two defects caught during review were repaired by the lead: missing blank lines before Markdown card separators, and the ineffective ending detector. The resulting settled page has 18 cards. No report or asset was edited by this reviewer.

## Verdict

**PASS.** The corrected report measures the last visible content element and requires nonempty final text. All 18 actual endings are reachable at each of 390×844, 737×862 and 1440×1000; no failures remain. The review is limited to the authorized visual revision, not a fresh validation of the underlying research. Publication remains with the parent as instructed.
