# Final factual-source audit

Audited 15 November 2026 by a fresh subagent that had not seen how the content
was written. It was given only `src/content/items.json` and
`src/content/locales/en/items.json` and the instruction: "For every factual
sentence, open the cited source and mark it SUPPORTED, UNSUPPORTED or
CONTRADICTED, quoting the supporting phrase (under 15 words)." It fetched all
67 unique source URLs (all HTTP 200) and covered all 16 items.
Per-item verdicts are summarised below.

## Result

| Verdict | Count |
|---|---|
| SUPPORTED | all other sentences (all 16 items) |
| UNSUPPORTED | 2 (both Ingenuity) |
| CONTRADICTED | 0 |
| Source unreachable | 0 |

## Fixed (English and Spanish in the same commit)

| Item / field | Sentence | Problem | Fix |
|---|---|---|---|
| Ingenuity `today` | "resting among sand ripples" | Source says "sand dunes surrounding it"; "ripples" not on any cited page. | "sand dunes" / "dunas de arena" |
| Ingenuity `arizonaNote` | "Its pictures are credited to Arizona State University along with NASA and other partners" | Cited Mastcam-Z page shows no credit line. | Cut the credit claim; kept the supported claim that the team shares the pictures from an ASU website. |

## Fixed before the audit (source annotations, `items.json` only)

During link replacement, three `sources[].supports` notes claimed more than the
page says and were trimmed: Phoenix (NASA chronology PDF no longer claimed to
name Peter Smith), Ingenuity (nasa.gov release no longer claimed to carry the
Mastcam-Z credit) and InSight ("ran out of energy" became "mission ended after
more than four years").

## Low-severity notes (verdict SUPPORTED, no change)

- Phoenix: "Tucson" comes from the HiRISE page address; NSSDCA says only "University of Arizona".
- Voyager 1: the `officialUrl` page still lists four working instruments; the text follows the April 2026 NASA status table (two on).
- Surveyor 3: "two and a half years later" is approximate (NASA: "nearly two-and-a-half years").
- Pioneer 10: NSSDCA says launch March 3, 1972 and science.nasa.gov says March 2; the letter says only "March 1972" and `editorNote` records the conflict.
- Apollo 11 reflector: "still at work" rests on the 2026 LPSC abstract saying LOLA "successfully ranged" to the array.
- NASA SP-4037 attributes HiRISE to Odyssey (source error); the Phoenix text is correct.

## Replaced links

Phoenix, Ingenuity and InSight now cite nasa.gov copies instead of jpl.nasa.gov.
Ingenuity and InSight pages were fetched and the quoted claims (72 flights,
rotor-blade damage, 1,319 marsquakes, last contact Dec. 15, dust on panels)
found. Phoenix cites NASA SP-4037 (2010 chronology) for the 61 Odyssey passes,
May 2010 end of operations and broken solar arrays.
