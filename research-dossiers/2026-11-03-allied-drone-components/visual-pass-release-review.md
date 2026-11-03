# Independent visual-pass release review

Verdict: **pass**. 3 November 2026. Scope: the requested visual-only revision; no publication performed.

## Evidence fidelity

Read the report, evidence-ledger.md, scenario-model.json and build-visual-pass.py. The added captions and diagrams preserve the report's argument and distinguish published policy, unaudited vendor claims, a provisional wedge, invented economics and missing private validation. The base arithmetic shown in card 13 reconciles to the model. Card 14 uses aircraft counts from ledger E24 and explicitly avoids inferring ESC attach rate or startup receipts. Its `$0 evidenced` annotation is an evidence-status statement, not a claim that the market earns no revenue.

## Independent rendered inspection

Used the actual Hugo server at `http://127.0.0.1:1432/learning/the-part-that-comes-with-proof/` in headless Chromium. Independently captured cards 1, 4, 5, 8, 11, 13, 14 and 16 at 390x844, 737x862 and 1440x1000. Each viewport returned 18 cards and zero page errors; every inspected figure loaded and had computed background `rgba(0, 0, 0, 0)`. Also captured and inspected cover and cards 2, 6, 7, 10 and 17 at 390x844. Screenshots are saved as `reviewer-<width>-card<index>.png`.

All four new watercolors composite cleanly on the paper card at the required widths: no halos, opaque rectangles or clipped illustrated objects. The retained cover and origin-tree watercolor also blend cleanly in the phone inspection. The illustrations explain their individual claims rather than repeating generic drone art. New diagrams remain readable at 390px and separate category/value labels.

Two issues found during review were repaired before this verdict: the first Scorpion box's top rule crossed the comparison heading; it now sits below the heading. Card 14's inner empty bar crossed the `$0 evidenced` label; the inner bar was removed. The final cache-busted card 14 render was independently refreshed and inspected in `reviewer-390-card14-final.png`; the label now occupies a clear lane inside the outer callout.

## Required checks

Independently reran the mandatory visual checker after the last repair. Real output:

```text
cards 18 · visuals on cards 18 · svg 12 · raster 6 (need ≥6)
PASS
```

Read the saved final `visual-pass-report.json` and `visual-pass-verification.txt`. They record the complete per-card ending, image, overflow and direct-hash checks, plus the private Hugo build and alpha checks:

```text
390x844: cards=18 images=18 overflow=0 unreachable=0 unloaded=0 errors=0 PASS
737x862: cards=18 images=18 overflow=0 unreachable=0 unloaded=0 errors=0 PASS
1440x1000: cards=18 images=18 overflow=0 unreachable=0 unloaded=0 errors=0 PASS
Direct hashes: 18 checked; failures=0
18 cards / 18 unique visuals / 12 SVG / 6 watercolor cutouts
```

The private Hugo command exited 0. All six raster assets have `hasAlpha: yes` and four corner pixels `[0, 0, 0, 0]`; new raster sampled edge maxima are zero. The complete ending/hash suite was performed by the lead and inspected here; this reviewer independently exercised the rendered figures and reran the mandatory visual checker.

No remaining release blocker found within this visual-only scope. No git commands, shared renderer edits, shared CSS edits or external publication were performed by this reviewer.
