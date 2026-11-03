# Visual pass provenance

Built-in image_gen generation, 3 November 2026. All four scene prompts preserved in visual-pass-image-prompts.json; transparent_background=true for generation and extraction. Project copies saved under static/images/agent-trust/. Existing two watercolors retained unchanged.

- demand-gap: /Users/yingcong/.codex/generated_images/01a1a0a0-07e4-7912-bd28-e96c5c6cf7dd/exec-d6ffa792-8d29-427e-a691-7163868dbff8.png
- owned-trust-roots: /Users/yingcong/.codex/generated_images/01a1a0a0-07e4-7912-bd28-e96c5c6cf7dd/exec-e203a9f0-3611-4fd2-a4b0-64ce1c85d22e.png
- borrowed-badge-original-rejected: /Users/yingcong/.codex/generated_images/01a1a0a0-07e4-7912-bd28-e96c5c6cf7dd/exec-5287c7fd-e5d4-4195-b74d-2cb4220030f5.png
- borrowed-badge-final: /Users/yingcong/.codex/generated_images/01a1a0a0-07e4-7912-bd28-e96c5c6cf7dd/exec-2cbd54f4-7183-4264-9d97-50cc291efd71.png
- right-checkpoint: /Users/yingcong/.codex/generated_images/01a1a0a0-07e4-7912-bd28-e96c5c6cf7dd/exec-217d6b4b-3314-420d-b381-029905948e4d.png

## Borrowed-badge extraction brief

Background extraction and composition repair only for this existing watercolor. Preserve the specific scene, same ink contours and washes: messenger with blank badge and disconnected cord to real agency owner in storefront. Remove ALL background haze and low-opacity rectangular field. Isolate the entire artwork as a clean true alpha cutout, and shrink it within the canvas so every object has generous completely transparent margins on all four sides (currently the messenger touches bottom edge). Do not add shadows, new objects or text. actual transparent alpha; no white, cream, paper texture, gradient, checkerboard, or baked background. Entire empty background alpha must be zero, without broad color haze. Keep rough childlike hand watercolor with sage/coral/ochre.

The rejected version had corner alpha 7/3/15/4 and sampled edge maximum 252; it was never accepted as a final asset. Final regenerated version has corners 0/0/0/0 and passes the required cutout checker. No field is painted to match the paper.

## Demand-gap noise cleanup

The generated file had one corner at alpha 1/255. Only alpha values <=1 were set to zero in the project copy; RGB values and meaningful watercolor transparency were preserved. Final six-raster alpha evidence is in visual-pass-alpha.txt. Original generated files remain intact.

## Diagrams

Four new diagrams are generated in build-visuals.py: competitive-stack.svg, evaluation-design.svg, hidden-costs.svg, pilot-contract.svg. The existing seven outputs remain unchanged in content. All numerical values come from scenario-model.json; no new scenario or source claim was introduced. Standalone SVG measurement is part of the required check-visuals.mjs run.
