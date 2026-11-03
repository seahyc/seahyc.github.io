# Visual coverage · A Bookshelf That Argues Back

15 cards including cover; 6 distinct substantive visuals (4 SVGs, 2 generated watercolor illustrations). Every rolling window of 3 cards contains a substantive visual. No repeated asset counted twice. Reference source facts are linked adjacent to each figure in the article. Figures are embedded; no third-party photographs or screenshots reused.

| Card range | Visual and placement | Claim / explanatory job | Provenance and limits | Alpha / readiness |
|---|---|---|---|---|
| cover–02 | advisers.png / cover | Different sources offer different considerations to one decision record | Generated watercolor metaphor; not evidence of efficacy or a real person | Regenerated true cutout; real alpha and transparent corners verified |
| 03–05 | mechanism.svg /03 | Context checking separates retrieval from applied advice | Original proposed process; Brains README + E15 | Transparent SVG canvas; built by build-visuals.py |
| 06–08 | competition.svg /06 | Original concept overlaps several documented alternatives | Reconstructed offering comparison from Google E04, Readwise E05, Delphi E07/E08 and Brains E03; not hands-on ranking | Transparent SVG canvas; built |
| 09–11 | economics.svg /09 | Human service and replacement acquisition determine contribution | Original scenario-model.json E16, USD/month/payer as of 3 Nov2026; inputs assumptions, not customer evidence; linear shared axis includes negative values and zero | Transparent SVG canvas; built |
| 09–11, extra | founder-time.png /11 | Useful small product can be outweighed by founder opportunity cost | Generated watercolor metaphor; no market size claim | Real alpha; 1/255 corner artifact corrected by zeroing alpha below1%, preserving other semitransparency |
| 12–14 | roadmap.svg /12 | Expansion is conditional on renewed paid use | Original proposed research-map E18; dates are planning gates, not forecast | Transparent SVG canvas; built |

## Generation briefs and provenance
Tool: built-in image_gen, 3 November2026, illustration-story. Briefs required rough childlike wobbly ink, translucent watercolor bleeding locally past contours, muted cheerful palette, no lettering, and exactly: “actual transparent alpha; no white, cream, paper texture, gradient, checkerboard, or baked background”. No artist or protected character imitation requested. Model identifier not exposed by tool; no claim about one.

advisers.png: three books offer compass, balance scales and warning flag to a blank decision notebook; threads show competing considerations. Initial generation included a background haze despite alpha and was rejected after perceptual inspection. Regenerated with no people, furniture, ground, shadows or ambient paint haze, requiring empty perimeter and space between objects. Final asset must pass saved-file alpha and rendered review.

founder-time.png: modest bookshelf on a seesaw outweighed by founder hourglass and gardening trowel. Book utility vs scarce time is the nearby allocation judgment. Original generated asset preserved by tool; saved project PNG corrected with ImageMagick `-channel A -fx 'u<0.01?0:u' +channel` to remove nearly invisible residual alpha. No resizing or background compositing.

SVGs: original Python-authored accessible vector documents, canvas600px, smallest text22px. Corpus offerings are source claims; process and roadmap are proposals; economics only calculates assumptions. Copyright: original commissioned/generated illustrations and original diagrams, no external asset licences needed. No cutout is treated as factual evidence.
