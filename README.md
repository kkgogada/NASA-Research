# NASA Research Explorer

An independent, student-built research tool for discovering NASA missions, research areas and
imagery in one organised interface.

> **This is not an official NASA product.** It is not affiliated with, endorsed by, or produced by
> NASA. It does not use NASA's insignia, logotype or official branding. Mission and programme names
> are used descriptively to refer to publicly documented work. Cite the original NASA sources — not
> this application — in academic work.

## Scope

This repository organises independent learning and analysis around publicly available NASA missions
and datasets. Each study should identify its question, source data, method, assumptions and
limitations so results can be checked and reproduced.

The application in this repository is the first such study made interactive: it presents missions and
research areas with their scientific questions, instruments and official sources, and it refuses to
state anything it cannot attribute.

## Research standards

Prefer primary NASA documentation and original datasets. Separate observations from interpretation,
record uncertainty, cite every external source, and avoid presenting exploratory work as a validated
scientific result.

These are not aspirations here — they are enforced by [`npm run check`](#checks).

## Running it

```bash
npm install
```

```bash
npm run dev
```

Then open http://localhost:5180. `npm run build` produces a static bundle in `dist/` that can be
hosted anywhere — routing is hash-based, so no server rewrite rules are needed.

## Sections

| Route | What it does |
| --- | --- |
| `#/` | **Explore** — search, featured missions, recent astronomy imagery, research areas, curated collections |
| `#/missions` | **Missions** — filterable index by research area, status and destination |
| `#/topics` | **Research topics** — eight research areas, cross-referenced against missions |
| `#/timeline` | **Mission timeline** — every dated mission on one scaled time axis, filterable by research area |
| `#/glossary` | **Glossary** — browsable A–Z, each term linked to the missions and areas that use it |
| `#/mission/:slug`, `#/topic/:id` | **Research detail** — overview, key questions, instruments, relationships, imagery, terms, sources, citations |
| `#/compare?a=…&b=…` | **Comparison workspace** — two subjects across 17 attributes, with automatic match detection |
| `#/board` | **Saved research board** — bookmarks, personal notes, text export and a generated bibliography |

## The three-way provenance rule

The core design constraint is that a reader must always be able to tell where a statement came from
without having to read it first. Everything falls into exactly one labelled category:

| Badge | Meaning |
| --- | --- |
| **Official source** (blue) | Drawn from NASA publications. Always accompanied by a link. |
| **App summary** (grey) | Plain-language explanation written by this project. Never presented as NASA text. |
| **Personal note** (amber) | Written by the user, stored only in their browser. |
| **Sample content** (red) | Bundled offline material shown because a live request did not succeed. |

Each category has its own badge, colour and container, and every block of prose on a detail page
carries one in its header.

### Rules the content follows

These are documented at the top of each file in `src/data/`, and checked by `scripts/check.mjs`:

1. Every factual field is verifiable on the official pages listed in that record's `sources`.
2. **Forward-looking dates are not printed.** Where a milestone is scheduled rather than historical,
   the app displays "not asserted" and links to the official page instead of guessing. This applies
   to Artemis II's launch, Europa Clipper's Jupiter arrival and the X-59's flight-test milestones.
3. App-written overviews introduce no facts that are not already present in the sourced fields above
   them on the same page.
4. **No quotations are reproduced**, from NASA or anyone else.
5. No mission facts, findings or source links are generated. All 48 cited source URLs are checked to
   resolve.
6. A mission NASA describes as completed is never drawn as running until today. Where no end date
   is documented, the timeline bar stops at the last attributable milestone and is hatched as
   "end date not asserted" rather than extended by guesswork.

### Capitalisation convention

`program` uses Title Case only for an official NASA programme name (Mars 2020, Artemis, New
Frontiers, Great Observatories, Living With a Star, Landsat, Voyager, Quesst, Surface Water and
Ocean Topography). Where no formal programme name applies it is a sentence-case descriptor
("Flagship astrophysics mission", "International partnership"). Everything else — `kind`,
`destination`, objectives, key questions and all prose — is sentence case; instrument names keep
their official casing. In the UI, uppercase is reserved for short system labels; variable-length
descriptors render in sentence case.

## Citations

Detail pages and the saved board generate ready-to-paste citations in **APA 7, MLA 9, Chicago and
BibTeX**, via `src/lib/citation.js`. Every citation names NASA and the NASA page — never this
application — and carries a retrieval date, which both APA and MLA ask for on content that changes.

Where NASA does not publish a date on a page, the citation uses "n.d." rather than inventing a year.
The BibTeX entry omits `year` for the same reason (a non-numeric year is invalid and breaks some
styles) and supplies `urldate` plus a `note` instead.

## External requests are isolated

All network access lives in `src/lib/nasaApi.js`. No other file calls `fetch`. Every function
resolves to `{ ok, data, source, error }` and never throws, so a failed request degrades one strip of
the page rather than breaking it.

| Endpoint | Key required | Notes |
| --- | --- | --- |
| `images-api.nasa.gov` | No | Official NASA Image and Video Library. CORS-enabled, works from the browser. |
| `api.nasa.gov/planetary/apod` | Yes | Astronomy Picture of the Day. `DEMO_KEY` works for light use but is heavily rate limited. |
| `epic.gsfc.nasa.gov` | **No** | Full-disk Earth imagery from DSCOVR at L1, on the Earth science topic. |
| `gibs.earthdata.nasa.gov` (WMS) | **No** | Six Earth-observing layers with a date picker, on the Earth science topic. |

EPIC is served from two places: `api.nasa.gov/EPIC` (needs a key, rate limited) and
`epic.gsfc.nasa.gov` (no key, CORS-open, same data and the same archive paths). This app uses the
GSFC host, so that panel keeps working when the shared `DEMO_KEY` is exhausted — which, in practice,
it frequently is.

When a request fails, the UI says so explicitly, shows the reason, and falls back to the curated set
in `src/data/imagery.js` under a **Sample content** badge. If APOD is unavailable, the app offers a
field to paste a free key from https://api.nasa.gov/, stored in `localStorage` and sent only to
`api.nasa.gov`.

### GIBS satellite layers

GIBS offers both WMTS (tiles) and **WMS** (one server-composed image). `GibsPanel.jsx` uses WMS, so a
single `<img>` yields a whole-world map — no tile arithmetic and no mapping library. It is a plain
cross-origin image, so it needs no CORS handshake and does not go through `lib/nasaApi.js`: there is
no JSON to parse and no key to hold. A layer with no data for a date fails to decode, `onError`
fires, and the panel says so.

Six layers, each verified to return real imagery rather than an empty frame: true colour, active
fires, aerosols, sea surface temperature, land surface temperature and snow cover. Each links
through to the same layer and date in NASA Worldview.

The map uses `object-fit: contain`, never `cover` — this is a projection with a known extent, and
cropping it would silently misstate what is where.

### Build-time data generation

Two official sources are reachable but send **no CORS headers**, so a browser cannot call them:

| Source | Used for |
| --- | --- |
| [NASA Exoplanet Archive](https://exoplanetarchive.ipac.caltech.edu/) (TAP/ADQL) | Confirmed-exoplanet counts, discoveries per year, detection methods, leading facilities — on the astrophysics topic |
| [NASA TechPort](https://techport.nasa.gov/) | Real funded technology projects with readiness levels — on the space technology topic |

Rather than proxy them at runtime, `scripts/generate-data.mjs` queries them and writes plain modules
into `src/data/generated/`. This keeps the "no other file calls `fetch`" rule intact and keeps the
bundle offline-capable.

```bash
npm run generate-data
```

Each generated file records the exact query used, the source URL, and the date it was produced — and
the UI shows all three, because a number like "6,336 confirmed planets" is meaningless without
knowing what was counted. These panels state that they are dated snapshots, not live feeds.

TechPort descriptions are short excerpts of NASA's own project text, trimmed at a sentence boundary
and linked to the full record — not rewritten and not extended.

Note: `src/data/generated/` is committed on purpose. The snapshots are dated, attributed content the
UI displays and cites, so they must travel with the code that describes them.

### About the fallback imagery

`src/data/imagery.js` is generated data, not placeholder art. Each of its 49 entries is a real asset
from the official NASA Image and Video Library: the IDs, titles, dates and centres were read from
that API, and every URL was verified to resolve. This means the offline state degrades to real,
attributed NASA material rather than to invented images or broken frames. Reuse of NASA imagery is
subject to [NASA's media usage guidelines](https://www.nasa.gov/nasa-brand-center/images-and-media/).

If an image file itself fails to load, a diagram-styled placeholder appears in its place — never a
broken image and never an unattributed substitute.

## Checks

The project's promises are enforced by `scripts/check.mjs` rather than by good intentions:

```bash
npm run check
```

```bash
npm run check:links
```

`check` is offline and instant. `check:links` adds a fetch of every source URL. Both exit non-zero on
error, so either works as a CI gate. Warnings (a stale snapshot, an unreferenced glossary term) are
reported but never fail the run.

What it enforces:

- Every mission and topic carries at least one working `https` source
- **No date in the future is ever asserted** — the rule the whole project rests on
- A mission without a launch date must have a `launch.note` saying where to look instead
- Arrival cannot precede launch; an end cannot precede a launch
- Every topic id, relationship slug, glossary term and imagery key resolves
- No duplicate mission slugs, topic ids or collection ids
- Every bundled image has a title, because an image without attribution must never render
- Generated snapshots carry a `generatedAt` stamp and are flagged when over 180 days old

The checks are verified to bite: injecting a future date, an unknown topic and a dangling
relationship into `missions.js` produces four errors and exit code 1.

## Storage and privacy

The saved board lives in `localStorage` under `nre.board.v1`. There is no account, no server and no
telemetry; nothing the user writes is uploaded. Clearing browser data deletes the board, which is why
the board page offers a text export that includes both notes and every official source link.

## Project structure

```
src/
  data/          Curated reference data — the sourcing rules live in file headers
    missions.js    18 missions with objectives, instruments, timelines, sources
    topics.js      8 research areas
    glossary.js    58 plain-language term definitions
    imagery.js     Generated, verified offline imagery set
    collections.js Editorial reading paths + official NASA entry points
    generated/     Build-time snapshots (Exoplanet Archive, TechPort)
  lib/
    nasaApi.js     The only file that makes network requests
    board.js       localStorage bookmarks and notes
    citation.js    APA / MLA / Chicago / BibTeX formatting
    router.js      Hash router
    search.js      Local search over bundled data (works offline)
  components/
    ui.jsx         Provenance badges, blocks, source lists, save button
    cards.jsx      Mission/topic/collection cards (stretched-link pattern)
    Cite.jsx       "Cite this" panel
    NasaImage.jsx  Images with mandatory attribution
    Timeline.jsx   Per-mission timeline; undated milestones render as undated
    EpicPanel.jsx / GibsPanel.jsx / ExoplanetPanel.jsx / TechPortPanel.jsx
    StarField.jsx  Static canvas star field
    Chrome.jsx     Navigation and the footer disclaimer
  pages/           Explore, Missions, Topics, TimelinePage, Glossary,
                   Detail, Compare, Board
scripts/
  check.mjs        Data integrity and link checks
  generate-data.mjs  Refreshes the build-time snapshots
```

Note the two timelines: `components/Timeline.jsx` is the per-mission milestone list on a detail
page; `pages/TimelinePage.jsx` is the cross-mission scaled chart at `#/timeline`.

## Printing

`@media print` in `src/index.css` drops the navy shell, unsticks the sidebar so it cannot collide
with page breaks, prevents cards and blocks from splitting mid-item, and appends the destination of
every external link in parentheses — a URL you cannot click is useless unless you can read it.

## Design notes

Deep-space navy shell with a restrained static star field; white and cool-grey content surfaces so
prose reads like a document rather than a poster; red and electric-blue accents used sparingly for
status and provenance. Search runs locally, so the app remains usable with no network at all.

Mobile: the layout is verified free of horizontal overflow at 375px across all twelve routes. Hero
units stack image-above-text on narrow screens, because overlaying a title, lede and action row on a
fixed-aspect image clips the text. The comparison grid collapses to one column and names each subject
per cell rather than labelling them "A" and "B", which the reader would otherwise have to map back to
the pickers. The timeline chart scrolls horizontally inside its own container, with a sticky mission
label column.

Contrast: body and label tokens meet WCAG AA. `--ink-400` was darkened from `#7683a1` (3.8:1 on
white, failing at the 10–13px sizes it is used at) to `#5c6880` (5.6:1).

## Extending it

To add a mission, append to `MISSIONS` in `src/data/missions.js` following the shape of the existing
records, then run the checks before committing:

```bash
npm run check:links
```

If you cannot find an official page stating a fact, leave the field out. An incomplete record is
honest; a filled-in one that cannot be sourced is not.

## Roadmap

- [x] Define a source and citation policy
- [x] Establish a consistent data and provenance structure
- [x] Publish the first interactive study with full data provenance
- [x] Add figures, automated checks and plain-language summaries
- [ ] Deploy the application to a public URL
- [ ] Expand mission and topic coverage beyond the current curated set
- [ ] Add reproducible analysis notebooks alongside the application

## Contributing

Corrections, source suggestions, and reproducibility improvements are welcome. Please open an issue
that links to the relevant primary source and explains the proposed change.
