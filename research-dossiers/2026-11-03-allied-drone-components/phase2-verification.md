# Phase 2 verification — 3 November 2026

## Final private build

```text
hugo --destination /tmp/fb-allied-drone-components/site --cacheDir /tmp/fb-allied-drone-components/cache --noBuildLock --quiet
[no stdout; exit 0]
```

## Final Playwright output

```text
390x844: cards=18; unique images=6; unloaded=0; docOverflow=False; page errors=0; overflowing cards=0; unreachable endings=0
737x862: cards=18; unique images=6; unloaded=0; docOverflow=False; page errors=0; overflowing cards=0; unreachable endings=0
1440x1000: cards=18; unique images=6; unloaded=0; docOverflow=False; page errors=0; overflowing cards=0; unreachable endings=0
Direct hashes: 18 checked; failures=0
Index entries: 1
```

## Raster checks

```text
sips -g hasAlpha static/images/allied-drone-components/*.png
origin-tree.png: hasAlpha: yes
proof-bench.png: hasAlpha: yes
PIL: both RGBA, 1536x1024; four corner alpha values [0,0,0,0]; extrema (0,254)
```

## Notes

Initial Chromium launch required sandbox escalation after macOS Mach-port denial. First hash loop reused same-page hash transitions without settling; final test independently loads every URL from about:blank. A screenshot attempt timed out while concurrent Hugo watch rebuilds triggered reloads; final server rendered a frozen in-memory build with watch and live reload disabled. Final run exits0. Report-local transparent image backgrounds remove shared image paper rectangles; no shared files changed. Final phone and desktop screenshots inspected.

## Files written or updated by this Phase 2 run

- content/research/allied-drone-components/index.md
- static/images/allied-drone-components/{proof-bench.png,origin-tree.png,power-chain.svg,counter-drone.svg,economics.svg,roadmap.svg}
- dossier corrections: research-map.md, evidence-ledger.md, market-evidence.md, needs-browser.md, scenario-model.json, scenario-arithmetic.md
- reproducible arithmetic updated to preserve correction: calculate-scenarios.py
- new dossier work: build-visuals.py, check.mjs, visual-coverage.md, illustration-prompts.md, report.json, phase2-verification.md, phase2-file-list.txt, release-review.md
- dossier viewport screenshots: 390-, 737-, 1440-card{0,3,6,12,14,15,17}-{top,bottom}.png; actual files enumerated in phase2-file-list.txt

No git commands, publication, shared renderer/style edits or writes to public/. Parent owns publication.

Independent Gate 2: PASS (release-review.md). Final private Hugo rebuild exit0; Hugo memory server stopped with Ctrl+C.
