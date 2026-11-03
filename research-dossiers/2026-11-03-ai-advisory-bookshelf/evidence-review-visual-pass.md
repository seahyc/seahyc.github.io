# Independent release review — visual revision

Verdict: **PASS**

Scope: visual-only revision, reviewed 3 November 2026. Reviewer did not edit the article, shared renderer or stylesheet during this review. This verifies the revision against the pre-revision article and existing dossier, rather than reopening the original research gate.

## Claim faithfulness and coverage

I compared `pre-visual-pass.md` with the integrated article after removing figure blocks and normalising whitespace. Exact output:

```text
Narrative unchanged after stripping figures: True
Original figures: 6 Current figures: 15
```

The original argument, numbers, citations, uncertainty qualifications and conclusion remain intact. The added diagram figures are explanatory: separate guidance-study denominators, retrieval/host verification boundary, case-file anatomy, scenario break-even sensitivity, chosen renewal gates and stop rules. All numerical additions match the existing article and scenario model. New watercolors illustrate conditional disagreement, distinct ownership/access/permission questions, and a pricing decision before catalogue building; captions label them generated metaphors and avoid claiming validation or clearance.

Independently reran the required checker:

```text
cards 15 · visuals on cards 15 · svg 10 · raster 5 (need ≥5)
PASS
```

Thus all 15 cards have distinct visuals, including the cover; five watercolor cutouts meet the one-third requirement. The checker reported no SVG text collisions or clipping and no raster alpha failures.

## Actual rendered-page evidence

Independently loaded `http://127.0.0.1:1431/learning/a-bookshelf-that-argues-back/` in headless Chromium. At each viewport I traversed every card, checked image loading and content-element bounds, moved the card to its maximum reading offset to test its ending, and directly navigated to every card hash. Exact output:

```json
{"viewport":"390x844","cards":15,"unreachable":0,"overflow":0,"unloaded":0,"hashFail":0,"docOverflow":false,"errors":[]}
{"viewport":"737x862","cards":15,"unreachable":0,"overflow":0,"unloaded":0,"hashFail":0,"docOverflow":false,"errors":[]}
{"viewport":"1440x1000","cards":15,"unreachable":0,"overflow":0,"unloaded":0,"hashFail":0,"docOverflow":false,"errors":[]}
```

Chromium launch required sandbox escalation because macOS denied MachPort bootstrap registration inside the sandbox; the escalated read-only local checks succeeded.

I also visually inspected the saved rendered screenshots `390-card4-top.png`, `390-card5-top.png`, `390-card8-top.png` and their 1440px counterparts. The three new watercolors blend cleanly into the paper card: no opaque rectangles, checkerboards, white fringes or halos visible. Their rough ink and muted wash treatment is consistent with the existing cover and founder-time illustrations, which I inspected at `390-card0-top.png` and `390-card11-top.png`.

Phone screenshots `390-card9-top.png`, `390-card10-top.png` and `390-card13-top.png` show readable economic labels, separate category/value positions, a clear negative contribution bar with room to its left, an honest zero-based break-even chart, and legible demand-gate rows. No overlapping or clipped labels were visible.

No release blockers found within this visual-revision scope. Publication remains the parent workflow's responsibility; this reviewer performed no deployment or git operations.
