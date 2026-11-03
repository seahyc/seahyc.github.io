# Visual coverage · 3 November 2026
18 cards including cover. Nine unique qualifying assets: seven original explanatory SVGs and two built-in imagegen watercolor editorial illustrations. No third-party media copied. Figures use adjacent captions and alt text. SVGs are 600px wide with minimum 21px authored text, transparent canvases and directly labelled units/source/model status. Annual count chart is zero-based; H1 observations kept separate. Model charts are explicitly invented planning scenarios, not measurements.

| Ordered group | Visual / card | Nearby claim and explanatory job | Provenance and status |
|---|---|---|---|
| Cover, 01, 02 | permission-gate.png / cover; trust-layers.svg /02 | Key identity and action permission are different; four layers of trust | Imagegen conceptual metaphor; original SVG synthesis of E02–E04. PNG alpha verified after removal of near-zero alpha noise |
| 03, 04, 05 | reported-harm.svg /04 | Material reported harm is declining; annual and half-year periods differ | Reconstructed SPF E16/E17; no prevalence/AI inference |
| 06, 07, 08 | wedge.svg /06; authority-link.png /08 | Locate intervention before contact; inspect person/company/action links | Original proposed workflow E24; imagegen metaphor E20. PNG alpha verified |
| 09, 10, 11 | base-rates.svg /10 | Small false-positive rates can dominate a rare-abuse queue | Original model E25, expected counts, not results |
| 12, 13, 14 | vendor-economics.svg /12; buyer-economics.svg /14 | Vendor contribution and buyer benefit are separate gates | scenario-model.json, E25. Zero-based absolute bars; direct labels |
| 15, 16, 17 | roadmap.svg /16 | Expansion follows permission, evaluated value and renewal | Founder-selected conditional sequence E24/E25, no forecast |

Every rolling window of three cards also includes a visual, since assets appear at cover/02/04/06/08/10/12/14/16. No repeated asset is counted twice. Minimum required ceil(18/3)=6; present 9. Cover counts because it explains identity versus permission, rather than providing atmosphere. Even excluding both editorial illustrations, the seven evidence/process SVGs exceed the total quota; the cover group contains trust-layers.svg.

## Source / reuse and capture boundary
Original SVGs authored in build-visuals.py, source status and dates stated in each SVG/caption. Source URLs remain adjacent in the report and in evidence-ledger.md. All numerical chart values match scenario-model.json or SPF sources. No screenshot, logo, product image or unlicensed photograph is embedded.

## Raster provenance and alpha
Generated with the built-in image_gen tool, not a CLI fallback, on 3 November 2026. Full generation briefs: image-prompts.md. Images were copied from the tool's generated_images outputs into static/images/agent-trust. Tool output paths recorded there. They are explanatory editorial metaphors, not factual or experimental evidence.

permission-gate.png originally had near-zero alpha noise at one corner (alpha 1/255); an ImageMagick alpha-only subtraction of 0.8% removed this noise under the requested cutout correction. No RGB content was repainted. Final alpha extrema (0,252); all four corner pixels alpha 0. authority-link.png alpha extrema (0,255); all four corners alpha 0. sips verifies hasAlpha=yes for both. Final raster checks and rendered-card inspection are recorded in verification-phase2.txt and release review. No opaque rectangle or painted checkerboard is accepted.

## Render checks
Private Hugo destination/cache only. check.mjs visits each card at 390×844, 737×862 and 1440×1000, moves to the maximum reader offset, checks final content reachability, image loading, paragraph/heading/image overflow, document overflow and page errors, then reloads every direct card hash. check-results.json preserves per-card evidence; screenshots show cover, all diagram types, both illustrations and appendix. Shared renderer and CSS were not edited.
