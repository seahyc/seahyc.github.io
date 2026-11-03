# Visual revision verification · 3 November 2026

18 cards; 18 unique explanatory visuals; 12 SVGs and six generated watercolors. Twelve new visuals, all six existing visuals retained. Original prose, facts and numerical argument unchanged. New captions identify scenarios, metaphors and limits. No git commands or publication. Shared renderer/CSS untouched. Private build destination/cache only.

## Real command results

`hugo --destination /tmp/fb-subsea-robotics/site --cacheDir /tmp/fb-subsea-robotics/cache --noBuildLock --quiet`: exit 0, no output. See visual-qa/build-alpha-output.txt for command transcript and full sips results.

`node ~/.agents/skills/fieldbook/scripts/check-visuals.mjs content/research/subsea-robotics/index.md`:
```
cards 18 · visuals on cards 18 · svg 12 · raster 6 (need ≥6)
PASS
```

`FB_SKIP_SCREENSHOTS=1 node research-dossiers/2026-11-03-subsea-robotics/check-visual-pass.mjs`: exit 0. Full JSON: visual-qa/report.json. Screenshots from same settled content, captured by the same script before final DOM-only rerun. Final detector selects last visible content element and checks its nonempty text and actual bounding box at maximum card offset, rather than a non-rendering trailing element.

```
390x844: 18 cards; 18 images loaded; ending/overflow/hash failures=0; page errors=0
737x862: 18 cards; 18 images loaded; ending/overflow/hash failures=0; page errors=0
1440x1000: 18 cards; 18 images loaded; ending/overflow/hash failures=0; page errors=0
acceptance.png: hasAlpha: yes; corner alpha=[0, 0, 1, 0]
bear-case.png: hasAlpha: yes; corner alpha=[0, 0, 0, 1]
decision.png: hasAlpha: yes; corner alpha=[1, 0, 0, 0]
local-autonomy.png: hasAlpha: yes; corner alpha=[0, 0, 0, 0]
navigation.png: hasAlpha: yes; corner alpha=[0, 0, 0, 0]
recovery.png: hasAlpha: yes; corner alpha=[0, 0, 0, 0]
```

## Perceptual and independent checks

New watercolors inspected as actual alpha composites on #f3eadb and on phone, tablet and desktop cards: no rectangular edges or broad haze. Source PNG hidden RGB looks hazy in some raw previews; rendered alpha composites are clean. New cutout corners have 0–1/255 alpha. Existing cutouts all four corners 0. Skill checker edge checks pass.

Independent reviewer caught missing blank lines before inserted Markdown separators; fixed. First QA used wrong /research/title route; corrected to canonical /learning/eyes-beneath-the-shipping-lanes/ and asserted exactly 18 slides. A bulk screenshot capture timed out; reduced redundant captures and completed all three viewports. Reviewer identified trailing-element ending detector weakness; replaced it with visible-content detection and reran all 54 card/viewport combinations successfully. These were verification defects, resolved before reporting completion.

Independent review and fresh direct-hash evidence: visual-release-review.md. No new research, outreach, operational trials or measured vehicle claims. Asset manifest: visual-pass-files.txt.
