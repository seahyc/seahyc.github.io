# Phase 2 release checks

3 November 2026. Resumed existing draft; parent publishes. Gate 1 corrections preserved. Independent Gate 2: pass (release-review.md). No git commands or shared layout/style changes.

## Private build

```text
$ hugo --destination /tmp/fb-clinical-trial-compression/site --cacheDir /tmp/fb-clinical-trial-compression/cache --noBuildLock --quiet
Exit code: 0
```

## Final Playwright command output

```json
{
  "screenshotWarnings": [],
  "hashesPassed": 21,
  "hashesTotal": 21,
  "indexCount": 1,
  "viewports": [
    {
      "width": 390,
      "height": 844,
      "cards": 21,
      "images": 10,
      "uniqueImages": 10,
      "unloaded": [],
      "docOverflow": false,
      "errors": [],
      "badLinks": [],
      "overflows": [],
      "unreachable": []
    },
    {
      "width": 737,
      "height": 862,
      "cards": 21,
      "images": 10,
      "uniqueImages": 10,
      "unloaded": [],
      "docOverflow": false,
      "errors": [],
      "badLinks": [],
      "overflows": [],
      "unreachable": []
    },
    {
      "width": 1440,
      "height": 1000,
      "cards": 21,
      "images": 10,
      "uniqueImages": 10,
      "unloaded": [],
      "docOverflow": false,
      "errors": [],
      "badLinks": [],
      "overflows": [],
      "unreachable": []
    }
  ]
}
```

## Saved raster alpha checks

```text
/Users/yingcong/Code/seahyc.github.io/static/images/clinical-trial-compression/evidence-bridge.png
  hasAlpha: yes
/Users/yingcong/Code/seahyc.github.io/static/images/clinical-trial-compression/patient-paths.png
  hasAlpha: yes
evidence-bridge.png: size=(1774, 887), corner alpha=[0, 0, 0, 0], alpha extrema=(0, 255)
patient-paths.png: size=(1536, 1024), corner alpha=[0, 0, 0, 0], alpha extrema=(0, 254)
```

21 cards (cover plus 20 numbered cards); 10 unique substantive visuals: 8 authored SVGs and 2 image_gen watercolors. Minimum 7. Every rolling three-card window covered. Patient PNG regenerated; alpha <=1/255 normalized to zero. Inline transparent backing avoids shared CSS rectangle. See visual-coverage.md for provenance.

## Files

Full topic deliverable inventory: files-written.txt. Includes retained Phase 1 inputs, Phase 2 article/assets/scripts/reviews/checks/screenshots. This resume changed article alt/background, patient PNG, check.mjs, visual-coverage.md and render outputs; added alpha/build logs, release checks, independent review and manifest.
