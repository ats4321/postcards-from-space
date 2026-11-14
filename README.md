# Postcards from Space

An interactive, story-driven web app for the 2026 NASA Space Apps Challenge
"Abandoned but not Forgotten: Storytelling about NASA's Discarded Equipment on the Moon and Mars".

Each piece of hardware NASA left behind writes the reader a first-person postcard: what it is,
why it was sent, what it discovered and where it is now. Readers aged 8 to 12 answer one question
per postcard to earn a stamp in their Mission Passport. The app is in English and Spanish.

The full brief (features, file ownership, accuracy rules, voice, visual direction) is in
[CLAUDE.md](CLAUDE.md).

## How to run

You need Node 20 (`nvm use` reads `.nvmrc`).

```bash
npm install
npm run dev        # local dev server
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Start the Vite dev server. |
| `npm run build` | Typecheck, validate content, then build the static site into `dist/`. |
| `npm run preview` | Serve the built site locally. |
| `npm run typecheck` | `tsc --noEmit` over `src/` and `scripts/`. |
| `npm run lint` | ESLint, including the `jsx-a11y` accessibility rules. |
| `npm run validate` | Check all content JSON against the schema and the cross-references. |
| `npm run check-links` | Request every source and image URL and report any that do not answer 200. Needs network. |
| `npm run references` | Regenerate the References section below from the content JSON. |

Before every pull request:

```bash
npm run typecheck && npm run lint && npm run validate && npm run build
```

Deployment is a static build on Vercel (`vercel.json`). There is no backend, no analytics and
no cookies. The language choice and earned stamps are kept in the browser's `localStorage`.

## Where things live

```
src/content/schema.ts              the data contract (zod), source of truth
src/content/items.json             language-neutral facts and sources, one entry per item
src/content/images.json            one entry per picture
src/content/locales/<lang>/items.json   the words for each item, keyed by item id
src/content/locales/<lang>/ui.json      UI strings
src/content/index.ts               the only place components load content from
src/components/                    HardwareList, Postcard, Quiz, Passport, DistanceLadder, Countdown, LanguageToggle
src/styles/tokens.css              colours, type and the 8 px spacing scale
public/img/                        self-hosted images
scripts/                           validate, check-links, references
```

## The data contract

`src/content/schema.ts` is the source of truth. `npm run validate` runs it and stops the build
on any error.

**Item** (`src/content/items.json`, language-neutral)

| Field | Rule |
| --- | --- |
| `id` | kebab-case, unique. Also the deep link: `/#phoenix`. |
| `name`, `locationName` | text |
| `place` | `"Moon"`, `"Mars"`, `"Asteroids"` or `"Deep space"` |
| `launchDate`, `arrivalDate?`, `lastContact?` | ISO dates, `YYYY-MM-DD` |
| `status` | `"working"`, `"resting"` or `"drifting"` |
| `distanceKm`, `distanceNote` | typical distance from Earth in km, and a note saying what the number means |
| `illustration` | fallback drawing: `lander`, `rover`, `orbiter`, `probe` or `instrument` |
| `imageId` | must match an `id` in `images.json` |
| `arizona` | `true` if there is an Arizona connection |
| `nssdcId?` | NSSDCA ID such as `1977-084A` |
| `officialUrl` | https link to the official page |
| `editorNote?` | where to record a conflict between sources (JSON has no comments) |
| `sources` | at least 2 of `{ url, title, supports }`; `supports` says which claims the source backs |

**Item text** (`src/content/locales/<lang>/items.json`, keyed by item id)

| Field | Rule |
| --- | --- |
| `letter` | exactly 3 paragraphs, each at most 320 characters |
| `signOff`, `today` | text |
| `science` | exactly 3 bullets |
| `arizonaNote?`, `worldNote?` | optional text |
| `quiz` | `{ question, options, answerIndex }` with exactly 3 options and `answerIndex` 0, 1 or 2 |

**Image** (`src/content/images.json`)

| Field | Rule |
| --- | --- |
| `id` | kebab-case, unique |
| `file` | `/img/<name>.webp`, or `/img/illustrations/<name>.svg` until a photo is added. The file must exist in `public/`. |
| `alt`, `credit`, `license` | text |
| `sourceUrl` | https link to where the image came from. Required for photos. |

**Cross-checks**

- Every item has text in `locales/en/items.json` and an image entry in `images.json`.
- No text exists for an item that is not in `items.json`.
- Every other locale has the same keys as English. Gaps in Spanish are warnings for now and the
  app falls back to English; remove `es` from `LOCALES_IN_PROGRESS` in `scripts/validate.ts` to
  make them errors.

Accuracy rules for content (what counts as a source, what to do when sources disagree) are in
[CLAUDE.md](CLAUDE.md).

## References

Every source the app cites. This section is generated from `src/content/items.json` and
`src/content/images.json` by `npm run references`; do not edit it by hand.

<!-- references:start -->
### Phoenix Mars Lander

Official page: <https://science.nasa.gov/mission/phoenix/>

- [NSSDCA Master Catalog: Phoenix Mars Lander](https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=2007-034A): NSSDCA ID 2007-034A; launch August 4, 2007; landing May 25, 2008; Peter H. Smith of the University of Arizona as mission principal investigator; last signal received November 2, 2008.
- [NASA Science: Phoenix](https://science.nasa.gov/mission/phoenix/): Landing May 25, 2008 on Vastitas Borealis, the arctic plains of Mars; dug into an ice-rich layer near the surface; bright clumps in a trench were water ice that vaporized after about four days; HiRISE photographed Phoenix under its parachute, the first time one spacecraft photographed another during a planetary landing.
- [NASA JPL news, May 24, 2010: Phoenix Mars Lander is Silent, New Image Shows Damage](https://www.jpl.nasa.gov/news/phoenix-mars-lander-is-silent-new-image-shows-damage/): Mars Odyssey flew over the landing site 61 times in a final attempt to hear from Phoenix; NASA said operations ended in May 2010; ice damage to the solar panels; Peter Smith, principal investigator, at the University of Arizona in Tucson.
- [HiRISE (University of Arizona): Phoenix Lander after One Mars Year](https://www.uahirise.org/ESP_017716_2485): HiRISE image taken May 7, 2010 shows the lander covered in dust with a solar panel that appears to have collapsed; winter carbon dioxide frost weighed the panels down; HiRISE is operated at the University of Arizona.
- [NASA Human Research Program: Hazard: Distance From Earth](https://www.nasa.gov/hrp/hazard-distance-from-earth/): distanceKm: Mars is, on average, 140 million miles from Earth.

### Voyager 1

Official page: <https://science.nasa.gov/mission/voyager/voyager-1/>

- [NSSDCA Master Catalog: Voyager 1](https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1977-084A): NSSDCA ID 1977-084A; launch September 5, 1977.
- [NASA Science: Where Are Voyager 1 and Voyager 2 Now? (page updated Nov. 12, 2026)](https://science.nasa.gov/mission/voyager/where-are-voyager-1-and-voyager-2-now/): Voyager 1 reaches one light-day, 16.094 billion miles (25.902 billion km), on Nov. 18, 2026 at 2:16:07 a.m. PST and is the first human-made object to reach that distance; a light-day is the distance light travels in 24 hours; the magnetometer and plasma wave subsystem are on and the other instruments are off; it flew past Jupiter and Saturn.
- [NASA Science: Voyager 1 (page updated Nov. 12, 2026)](https://science.nasa.gov/mission/voyager/voyager-1/): Launch September 5, 1977; entered interstellar space in August 2012; first human-made object to venture into interstellar space; listed as an active mission.
<!-- references:end -->
