# Built-in imagegen briefs · 21 November 2026
Five rasters regenerated with Codex built-in image generation (codex exec, image_gen tool) with transparent_background=true, to match the house style of the agent-trust and pair-bond-medicine Fieldbooks. No API fallback, flood-fill or external image source used. No text in any image. Generated artwork is editorial metaphor, not evidence. Saved paths: static/images/open-source-beeper-agents/{agent-as-you,two-meis,incumbent-giant,stepping-stones,go-stop-gate}.png. Previous ad-hoc versions backed up outside the repo at /tmp/old-beeper/.

## agent-as-you
Use case: illustration-story. Create a hand-watercolor editorial cutout for a rigorous founder Fieldbook. A friendly small robot holds a wooden puppeteer's cross-bar with loose strings running down to a smartphone that shows blank speech bubbles, while a small ordinary person's silhouette-free identity card hangs beside the phone. Explain acting as someone else: an agent that sends as the user pulls the strings of a real identity. Sparse simple composition, rough childlike wobbly dark ink contours, imperfect perspective, translucent sage green, muted coral and ochre washes bleeding outside lines, warm cheerful restraint. No text, no letters, no numbers, no logos. Actual transparent alpha; no white, cream, paper texture, gradient, checkerboard, or baked background. Leave generous empty transparent space around all objects.

Tool output: /Users/yingcong/.codex/generated_images/01a1fe2e-a7fc-7b02-8afc-0711ef051ebc/exec-33e7c8e9-3b3f-410e-ace7-4a507bd0833d.png

## two-meis
Use case: illustration-story. Create a hand-watercolor editorial cutout for a rigorous founder Fieldbook. A friendly small robot stands on a fork in a little path with one raised stop hand, between two identical blank contact cards that each show the same smiling woman's face and a question mark. Explain ambiguity: when two contacts match, the system must stop and ask instead of guessing. Sparse simple composition, rough childlike wobbly dark ink contours, imperfect perspective, translucent sage green, muted coral and ochre washes bleeding outside lines, warm cheerful restraint. No text, no letters, no numbers, no logos. Actual transparent alpha; no white, cream, paper texture, gradient, checkerboard, or baked background. Leave generous empty transparent space around all objects.

Tool output: /Users/yingcong/.codex/generated_images/01a1fe2e-a7fa-7da3-9227-65a08f9eb6e8/exec-77037471-1c97-4b95-b9ac-3e6172d30049.png

## incumbent-giant
Use case: illustration-story. Create a hand-watercolor editorial cutout for a rigorous founder Fieldbook. A giant friendly-looking bear-faced robot strides past a tiny founder who pulls a little wagon of mismatched parts, the giant casually carrying a big blank approval stamp. Explain the bear case: the incumbent can add features faster than a newcomer can build them. Sparse simple composition, rough childlike wobbly dark ink contours, imperfect perspective, exaggerated scale, translucent sage green, muted coral and ochre washes bleeding outside lines, warm cheerful restraint. No text, no letters, no numbers, no logos. Actual transparent alpha; no white, cream, paper texture, gradient, checkerboard, or baked background. Leave generous empty transparent space around all objects.

Tool output: /Users/yingcong/.codex/generated_images/01a1fe2e-a7fa-72b0-a4bd-39038d014219/exec-d5a6b3d6-3507-4b3a-82dc-afee93a0d36a.png

## stepping-stones
Use case: illustration-story. Create a hand-watercolor editorial cutout for a rigorous founder Fieldbook. A small hiker with a backpack stands on the second of four stepping stones across a little stream, heading toward a small flag on the far bank; the first stone is solid and the last two are still unreached. Explain staged de-risking: earn each stone before stepping onto the next. Sparse simple composition, rough childlike wobbly dark ink contours, imperfect perspective, translucent sage green, muted coral and ochre washes bleeding outside lines, warm cheerful restraint. No text, no letters, no numbers, no logos. Actual transparent alpha; no white, cream, paper texture, gradient, checkerboard, or baked background. Leave generous empty transparent space around all objects.

Tool output: /Users/yingcong/.codex/generated_images/01a1fe2e-a86e-7090-9c40-21c0d6f7fa8b/exec-93cf4c45-58aa-4c92-b021-32450d3fa3f7.png

## go-stop-gate
Use case: illustration-story. Create a hand-watercolor editorial cutout for a rigorous founder Fieldbook. A friendly small robot stands beside a simple railway-crossing signal with one green lamp, one red lamp and a raised barrier arm, studying the signal before moving on. Explain deciding go and stop conditions before building. Sparse simple composition, rough childlike wobbly dark ink contours, imperfect perspective, translucent sage green, muted coral and ochre washes bleeding outside lines, warm cheerful restraint. No text, no letters, no numbers, no logos. Actual transparent alpha; no white, cream, paper texture, gradient, checkerboard, or baked background. Leave generous empty transparent space around all objects.

Tool output: /Users/yingcong/.codex/generated_images/01a1fe2e-a870-7441-bf22-f29bb343e130/exec-bc9b47e8-29cc-404c-b565-c3aea72c8fb9.png

Correction (all five): alpha-only removal of near-transparent corner noise (alpha <= 2 set to 0) and Lanczos downscale to 1200 px wide. RGB untouched; no cutout, matte or flood-fill. Raw generator sizes were 1536x1024 or 1774x887, all RGBA. Corner alpha of every final file is 0,0,0,0 (stepping-stones raw had one pixel at alpha 1). This is a cutout cleanup, not a new illustration or measured result.
