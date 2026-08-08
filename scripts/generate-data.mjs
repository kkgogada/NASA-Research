/**
 * BUILD-TIME DATA GENERATION
 * --------------------------
 * Two official NASA sources are reachable but send no CORS headers, so a browser
 * cannot call them directly:
 *
 *   - NASA Exoplanet Archive (TAP)  exoplanetarchive.ipac.caltech.edu
 *   - NASA TechPort (API)           techport.nasa.gov
 *
 * Rather than proxy them at runtime, this script queries them here and writes
 * plain data modules into src/data/generated/. That keeps the app's "no other
 * file calls fetch" rule intact, keeps the bundle offline-capable, and makes the
 * provenance explicit: each generated file records the exact query used, the
 * source URL, and when it was produced.
 *
 * Re-run with:  npm run generate-data
 *
 * Nothing here is invented. If a field is missing from the source it is omitted,
 * not filled in.
 */

import { writeFile, mkdir } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const HERE = dirname(fileURLToPath(import.meta.url))
const OUT_DIR = resolve(HERE, '../src/data/generated')

const TAP = 'https://exoplanetarchive.ipac.caltech.edu/TAP/sync'
const TECHPORT = 'https://techport.nasa.gov/api'

const stamp = new Date().toISOString().slice(0, 10)

/* ------------------------------------------------------------------ utils */

async function getJson(url, { timeout = 45000 } = {}) {
  const ctrl = new AbortController()
  const timer = setTimeout(() => ctrl.abort(), timeout)
  try {
    const res = await fetch(url, { signal: ctrl.signal, headers: { Accept: 'application/json' } })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return await res.json()
  } finally {
    clearTimeout(timer)
  }
}

const adql = (query) => `${TAP}?query=${encodeURIComponent(query)}&format=json`

/** Strip the HTML that TechPort embeds in prose fields, and collapse space. */
const clean = (html = '') =>
  html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&#39;/g, '’')
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, ' ')
    .trim()

/** Trim to a whole sentence or word boundary, never mid-word. */
function excerpt(text, max = 260) {
  if (!text || text.length <= max) return text
  const cut = text.slice(0, max)
  const lastStop = cut.lastIndexOf('. ')
  if (lastStop > max * 0.5) return cut.slice(0, lastStop + 1)
  return `${cut.slice(0, cut.lastIndexOf(' '))}…`
}

/** Valid Technology Readiness Levels are 1–9; anything else means "not stated". */
const trl = (v) => (Number.isInteger(v) && v >= 1 && v <= 9 ? v : null)

async function pool(items, size, fn) {
  const out = []
  let i = 0
  const workers = Array.from({ length: size }, async () => {
    while (i < items.length) {
      const idx = i++
      try {
        out[idx] = await fn(items[idx], idx)
      } catch {
        out[idx] = null
      }
    }
  })
  await Promise.all(workers)
  return out.filter(Boolean)
}

/* ------------------------------------------------- NASA Exoplanet Archive */

const PS_NOTE =
  'Counts use the Planetary Systems (ps) table with default_flag=1, which selects one reference row per planet so planets are not double-counted.'

async function generateExoplanets() {
  console.log('· Querying NASA Exoplanet Archive…')

  const queries = {
    total: 'select count(*) as n from ps where default_flag=1',
    byMethod:
      'select discoverymethod, count(*) as n from ps where default_flag=1 group by discoverymethod order by n desc',
    byYear:
      'select disc_year, count(*) as n from ps where default_flag=1 group by disc_year order by disc_year',
    byFacility:
      'select disc_facility, count(*) as n from ps where default_flag=1 group by disc_facility order by n desc',
  }

  const [total, byMethod, byYear, byFacility] = await Promise.all([
    getJson(adql(queries.total)),
    getJson(adql(queries.byMethod)),
    getJson(adql(queries.byYear)),
    getJson(adql(queries.byFacility)),
  ])

  const data = {
    generatedAt: stamp,
    source: {
      label: 'NASA Exoplanet Archive',
      url: 'https://exoplanetarchive.ipac.caltech.edu/',
      note: PS_NOTE,
    },
    queries,
    totalConfirmed: total[0].n,
    byMethod: byMethod.map((r) => ({ method: r.discoverymethod, count: r.n })),
    byYear: byYear.map((r) => ({ year: r.disc_year, count: r.n })),
    byFacility: byFacility.slice(0, 10).map((r) => ({ facility: r.disc_facility, count: r.n })),
  }

  console.log(`  ${data.totalConfirmed} confirmed planets, ${data.byYear.length} years, ${data.byMethod.length} methods`)
  return data
}

/* ------------------------------------------------------------- TechPort */

/* Projects are selected for having complete, renderable records — a title, a
   real description, a status and a lead organisation. No editorialising beyond
   that; the ordering is TechPort's own "recently updated" ordering. */
async function generateTechPort(want = 9) {
  console.log('· Querying NASA TechPort…')

  // NOTE: TechPort ignores ?limit and returns its entire index (20,000+ ids),
  // so the cap has to be applied here. The list is ordered most-recently-updated
  // first, so the head of it is the active end of the catalogue.
  const CANDIDATES = 60

  const list = await getJson(`${TECHPORT}/projects`)
  const all = (list.projects || []).map((p) => p.projectId)
  const ids = all.slice(0, CANDIDATES)
  console.log(`  ${all.length} projects in the index; inspecting the ${ids.length} most recently updated`)

  const details = await pool(ids, 6, async (id) => {
    const raw = await getJson(`${TECHPORT}/api/projects/${id}`.replace('/api/api/', '/api/'))
    return raw.project || raw
  })

  const usable = details.filter(
    (p) =>
      p &&
      p.projectId &&
      p.title &&
      clean(p.description).length > 120 &&
      p.leadOrganization?.organizationName &&
      (p.status === 'Active' || p.status === 'Completed'),
  )

  console.log(`  ${usable.length} projects with complete records`)

  // Prefer one project per lead centre so the set shows breadth rather than
  // nine entries from the same facility.
  const seenCentres = new Set()
  const picked = []
  for (const p of usable) {
    const centre = p.leadOrganization.organizationName
    if (seenCentres.has(centre)) continue
    seenCentres.add(centre)
    picked.push(p)
    if (picked.length >= want) break
  }
  for (const p of usable) {
    if (picked.length >= want) break
    if (!picked.includes(p)) picked.push(p)
  }

  const projects = picked.map((p) => ({
    id: p.projectId,
    title: p.title.trim(),
    acronym: p.acronym || '',
    status: p.status,
    started: p.startDateString || '',
    ended: p.endDateString || '',
    // Leads are not always NASA centres — TechPort also funds companies and
    // universities, so this field is deliberately not called "centre".
    leadOrganisation: p.leadOrganization.organizationName,
    leadType: p.leadOrganization.organizationType || '',
    leadAcronym: p.leadOrganization.acronym || '',
    programme: p.program?.title || '',
    programmeAcronym: p.program?.acronym || '',
    directorate: p.program?.responsibleMd?.organizationName || '',
    // TRL: NASA's Technology Readiness Level, 1 (idea) to 9 (flight proven).
    // TechPort stores 0 (and sometimes null) for "not stated" — normalise both
    // to null so the UI can omit the meter instead of rendering a level that
    // does not exist on the scale.
    trlBegin: trl(p.trlBegin),
    trlCurrent: trl(p.trlCurrent),
    trlEnd: trl(p.trlEnd),
    // Short excerpt of NASA's own project description, attributed and linked.
    // Not rewritten, not extended.
    description: excerpt(clean(p.description), 280),
    benefits: excerpt(clean(p.benefits), 220),
    url: `https://techport.nasa.gov/projects/${p.projectId}`,
  }))

  return {
    generatedAt: stamp,
    source: {
      label: 'NASA TechPort',
      url: 'https://techport.nasa.gov/',
      note: 'TechPort is NASA’s public database of its technology development projects. Descriptions below are short excerpts of NASA’s own project text, each linked to its full record.',
    },
    projects,
  }
}

/* ------------------------------------------------------------------ write */

const banner = (name, source) => `/**
 * GENERATED FILE — do not edit by hand.
 *
 * Produced by scripts/generate-data.mjs from ${source.label}
 * (${source.url}) on ${stamp}.
 *
 * Regenerate with:  npm run generate-data
 *
 * ${source.note}
 */

export const ${name} = `

async function main() {
  await mkdir(OUT_DIR, { recursive: true })

  const results = await Promise.allSettled([generateExoplanets(), generateTechPort()])

  const [exo, tech] = results

  if (exo.status === 'fulfilled') {
    await writeFile(
      resolve(OUT_DIR, 'exoplanets.js'),
      `${banner('EXOPLANETS', exo.value.source)}${JSON.stringify(exo.value, null, 2)}\n`,
    )
    console.log('✓ wrote src/data/generated/exoplanets.js')
  } else {
    console.error('✗ exoplanets failed:', exo.reason?.message)
  }

  if (tech.status === 'fulfilled') {
    await writeFile(
      resolve(OUT_DIR, 'techport.js'),
      `${banner('TECHPORT', tech.value.source)}${JSON.stringify(tech.value, null, 2)}\n`,
    )
    console.log('✓ wrote src/data/generated/techport.js')
  } else {
    console.error('✗ techport failed:', tech.reason?.message)
  }

  if (results.some((r) => r.status === 'rejected')) process.exitCode = 1
}

main()
