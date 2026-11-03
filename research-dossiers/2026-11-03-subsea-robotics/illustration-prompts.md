# Built-in image generation · 3 November 2026

## local-autonomy.png
A small yellow autonomous underwater survey robot shines a fan-shaped sonar beam across a seabed cable; a surface boat has a dashed acoustic connection. Explains local autonomy with sparse surface communication. Hand watercolor, rough childlike wobbly ink lines, translucent washes bleeding past outlines, muted cheerful teal ochre coral; no text. Required: actual transparent alpha; no white, cream, paper texture, gradient, checkerboard, or baked background.
Generated source: exec-54230e09-64e4-4354-b925-43bdcf19a589.png. Built-in tool.

## recovery.png
A small yellow survey robot lifted in a sling by a modest workboat crane; two surveyors compare a chart and instrument. Explains launch/recovery and crew dependence. Rough childlike hand-sketched wobbly ink outlines, imperfect perspective, translucent watercolor washes bleeding beyond outlines, muted cheerful teal ochre coral. No words or numbers. Required: actual transparent alpha; no white, cream, paper texture, gradient, checkerboard, or baked background.
First output exec-25f04071-a86d-4cc3-b7ab-0574cca688e2.png passed corner alpha but had broad gradient haze; rejected perceptually. Replacement prompt: every pixel outside the boat, crane, robot, people and tightly bounded water splash has alpha exactly zero; no ambient haze, background wash, glow, shadow field or colored surroundings; generous transparent margins. Built-in tool. Final source recorded in release-checks.md.

Final recovery source: exec-0314d3c8-5e5f-4813-ab30-c5edc69e2f03.png. Transparent compositing onto #f3eadb verified in recovery-on-paper.png. Raw generated preview shows hidden RGB outside the object; decoded alpha composite shows no haze or rectangular edge. No alpha editing or manual cutout was needed.
