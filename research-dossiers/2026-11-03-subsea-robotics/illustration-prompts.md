# Built-in image generation · 3 November 2026

## local-autonomy.png
A small yellow autonomous underwater survey robot shines a fan-shaped sonar beam across a seabed cable; a surface boat has a dashed acoustic connection. Explains local autonomy with sparse surface communication. Hand watercolor, rough childlike wobbly ink lines, translucent washes bleeding past outlines, muted cheerful teal ochre coral; no text. Required: actual transparent alpha; no white, cream, paper texture, gradient, checkerboard, or baked background.
Generated source: exec-54230e09-64e4-4354-b925-43bdcf19a589.png. Built-in tool.

## recovery.png
A small yellow survey robot lifted in a sling by a modest workboat crane; two surveyors compare a chart and instrument. Explains launch/recovery and crew dependence. Rough childlike hand-sketched wobbly ink outlines, imperfect perspective, translucent watercolor washes bleeding beyond outlines, muted cheerful teal ochre coral. No words or numbers. Required: actual transparent alpha; no white, cream, paper texture, gradient, checkerboard, or baked background.
First output exec-25f04071-a86d-4cc3-b7ab-0574cca688e2.png passed corner alpha but had broad gradient haze; rejected perceptually. Replacement prompt: every pixel outside the boat, crane, robot, people and tightly bounded water splash has alpha exactly zero; no ambient haze, background wash, glow, shadow field or colored surroundings; generous transparent margins. Built-in tool. Final source recorded in release-checks.md.

Final recovery source: exec-0314d3c8-5e5f-4813-ab30-c5edc69e2f03.png. Transparent compositing onto #f3eadb verified in recovery-on-paper.png. Raw generated preview shows hidden RGB outside the object; decoded alpha composite shows no haze or rectangular edge. No alpha editing or manual cutout was needed.

## Visual revision: four additional cutouts

Common brief: one landscape hand-watercolor editorial cutout; rough childlike wobbly charcoal ink; translucent washes bleeding beyond lines; muted cheerful teal, ochre yellow and dusty coral. No text or numbers. Isolated composition with generous transparent margins on all four sides. Required: actual transparent alpha; no white, cream, paper texture, gradient, checkerboard, or baked background. Built-in image_gen, transparent_background=true, 3 November 2026. No external reference image supplied.

### navigation.png
Two passes by a yellow underwater robot beside the same seabed rock and cable; overlapping translucent sonar footprints and shifted ghost rock outline explain misregistration.
Source: exec-f8a04780-c409-423e-9aab-b3a462e6aa25.png, generated_images/01a1a0a0-07e8-74a1-9b9c-e506b4126b55. Unedited alpha-preserving copy.

### acceptance.png
Survey and asset engineers compare map sheets with sonar patches, a missing-data gap and a magnifier over a changed cable segment; tiny robot beside them.
Source: exec-8b91cc95-7aab-4eb0-bfb5-1a2527b2aedb.png, generated_images/01a1a0a0-07e8-74a1-9b9c-e506b4126b55. Unedited alpha-preserving copy.

### bear-case.png
Tiny robot dwarfed by blank vessel bills and an elaborate research machine; worried founder balances modest coins against heavy equipment.
Source: exec-2ee6f2b9-f705-4aaa-9e60-674d02ceee24.png, generated_images/01a1a0a0-07e8-74a1-9b9c-e506b4126b55. Unedited alpha-preserving copy.

### decision.png
Engineer compares a newly exposed cable segment with a prior survey; a lamp illuminates that segment while adjacent buried cable remains hidden.
Source: exec-412fba30-7041-43d6-8d7a-a3b81df1284e.png, generated_images/01a1a0a0-07e8-74a1-9b9c-e506b4126b55. Unedited alpha-preserving copy.
