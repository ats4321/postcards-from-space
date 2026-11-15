# Postcards from Space — project brief

## What we are building
An interactive, story-driven web app for the 2026 NASA Space Apps Challenge
"Abandoned but not Forgotten: Storytelling about NASA's Discarded Equipment on the Moon and Mars".
Audience: kids aged 8–12, their teachers and parents. Team based in Phoenix, Arizona.
Each piece of hardware NASA left behind writes the reader a first-person postcard:
what it is, why it was sent, what it discovered, where it is now. Kids answer one question
per postcard to earn a stamp in a Mission Passport.
Deadline: submission closes Sunday Nov 15, 2026, 11:59 pm Arizona time (MST, UTC-7).

## Core features (all must work on phone, tablet, laptop)
1. Hardware list with filters: place (Moon, Mars, Asteroids, Deep space), status, "Arizona connection".
2. Postcard view: first-person letter (3 short paragraphs), real image with credit, "Science I made possible",
   "Where I am today" with a link to the official page, optional "Arizona connection" and "Around the world".
3. Quiz of one question per postcard (3 options) that awards a stamp.
4. Mission Passport: one stamp slot per item, progress, a completion badge.
5. Distance ladder: log-scale strip from Earth to Voyager 1; clicking a point opens that postcard.
6. Voyager 1 countdown to one light-day: 2026-11-18T10:16:07Z (NASA). After it passes, show "more than one light-day away".
7. Read-aloud button (Web Speech API, fails quietly when unsupported).
8. English and Spanish, switchable at any time, remembered per browser.
9. Deep links: /#phoenix opens that postcard.

## Stack (do not change without a reason in the PR)
- Vite + React 18 + TypeScript (strict). No UI framework; CSS modules or one global CSS file with tokens.
- Content as JSON validated by zod at build time (`npm run validate`).
- Images self-hosted in /public/img as WebP (max 1200 px wide, under 200 KB each).
- Deploy target: Vercel, static build. No backend, no analytics, no cookies.

## File ownership (prevents merge conflicts between workspaces)
- src/content/items.json, src/content/locales/en/items.json  -> Content agent only
- src/content/locales/es/*                                  -> Spanish agent only
- public/img/*, src/content/images.json                     -> Imagery agent only
- src/components/*, src/styles/*, src/App.tsx               -> UI agent only
- src/content/schema.ts, scripts/*                          -> Foundation agent; others may only add fields in a separate commit
- src/content/locales/en/ui.json                            -> UI agent (English UI strings)

## Data contract (src/content/schema.ts is the source of truth)
Item (language-neutral, items.json):
  id (kebab-case), name, place: "Moon"|"Mars"|"Asteroids"|"Deep space", locationName,
  launchDate, arrivalDate?, lastContact?, status: "working"|"resting"|"drifting",
  distanceKm (typical, with distanceNote), illustration fallback key, imageId,
  arizona: boolean, nssdcId?, officialUrl, sources: [{ url, title, supports }]
Item text (locales/<lang>/items.json, keyed by id):
  letter: [p1, p2, p3], signOff, science: [3 bullets], today, arizonaNote?, worldNote?,
  quiz: { question, options: [a, b, c], answerIndex }
Image (images.json): id, file, alt, credit, sourceUrl, license note.

## Accuracy rules (accuracy is a judging criterion; the challenge says "Accuracy is important")
- Every number, date, name and "first" claim must be supported by an entry in that item's sources,
  and the `supports` field says which claim it backs.
- Source priority: NSSDCA > science.nasa.gov / nasa.gov / jpl.nasa.gov > university instrument sites
  (LROC at ASU, HiRISE at UArizona) > reputable press. Never Wikipedia as a final source.
- Current status ("still working", instruments on, record holders) needs a 2026 source.
- If sources conflict, use NSSDCA and note the conflict in a code comment.
- If you cannot verify a fact, cut it. Never invent quotes, dates or distances.

## Voice
- First person from the hardware, warm and curious, short sentences, grade 4–6 reading level.
- No jokes at the expense of failure; ended missions are "resting", not "dead".
- Units: show km and miles for distances; dates as "May 25, 2008".

## Visual direction
- Night-sky navy #0B1328, warm paper #F2EDE4, NASA red #E03C31 (stamps, postmarks), yellow #FFCF3F
  (one accent per view), Earth blue #A9C4E4. Inter Tight (UI and headings), IBM Plex Mono (data labels).
- Postcards look printed: airmail border, real perforated stamp, restrained postmark. Strict 8 px grid.
- Avoid: emoji as icons, gradients as decoration, scattered stars, wide-tracked filler captions.

## Quality bar (check before every PR)
- `npm run typecheck && npm run lint && npm run validate && npm run build` all pass.
- Keyboard reachable, visible focus, alt text on every image, respects prefers-reduced-motion,
  axe shows 0 serious issues, Lighthouse mobile >= 90 for performance and accessibility.
- Works at 360 px wide. No horizontal scroll.
