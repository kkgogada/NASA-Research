/**
 * DATA INTEGRITY CHECKS
 * ---------------------
 * This project's credibility rests on a small set of promises: every fact has a
 * working source link, nothing forward-looking is asserted as fact, and every
 * cross-reference resolves. Those promises are easy to keep by hand today and
 * easy to break silently when someone adds mission #19 six months from now.
 *
 * This script turns them into something the machine checks.
 *
 *   npm run check          structural checks only — offline, instant
 *   npm run check:links    the above, plus every external URL is fetched
 *
 * Exit code is non-zero if any ERROR is found. Warnings never fail the run;
 * they flag things worth a human look (a stale data snapshot, an unused term).
 */

import { MISSIONS, STATUS_META } from '../src/data/missions.js'
import { TOPICS } from '../src/data/topics.js'
import { COLLECTIONS, OFFICIAL_PORTALS } from '../src/data/collections.js'
import { GLOSSARY } from '../src/data/glossary.js'
import { FALLBACK_IMAGERY } from '../src/data/imagery.js'

const errors = []
const warnings = []
const err = (m) => errors.push(m)
const warn = (m) => warnings.push(m)

const TODAY = new Date().toISOString().slice(0, 10)
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/

const topicIds = new Set(TOPICS.map((t) => t.id))
const slugs = new Set(MISSIONS.map((m) => m.slug))
const imageKeys = new Set(Object.keys(FALLBACK_IMAGERY))
const terms = new Set(Object.keys(GLOSSARY))

/* ------------------------------------------------------------ helpers */

function checkDate(label, value) {
  if (value == null) return
  if (!ISO_DATE.test(value)) {
    err(`${label}: date "${value}" is not YYYY-MM-DD`)
    return
  }
  if (Number.isNaN(new Date(`${value}T00:00:00Z`).getTime())) {
    err(`${label}: date "${value}" is not a real date`)
    return
  }
  // The core rule: this app never asserts a date that has not happened.
  if (value > TODAY) {
    err(`${label}: date "${value}" is in the future — this project does not assert forward-looking dates`)
  }
}

function checkSources(label, sources) {
  if (!Array.isArray(sources) || sources.length === 0) {
    err(`${label}: has no sources — every factual record must be attributable`)
    return
  }
  for (const s of sources) {
    if (!s.label) err(`${label}: a source is missing a label`)
    if (!s.url) err(`${label}: source "${s.label}" is missing a url`)
    else if (!s.url.startsWith('https://')) err(`${label}: source url is not https — ${s.url}`)
  }
}

/* ------------------------------------------------------------ uniqueness */

const dupes = (list, name) => {
  const seen = new Set()
  for (const v of list) {
    if (seen.has(v)) err(`duplicate ${name}: ${v}`)
    seen.add(v)
  }
}
dupes(MISSIONS.map((m) => m.slug), 'mission slug')
dupes(TOPICS.map((t) => t.id), 'topic id')
dupes(COLLECTIONS.map((c) => c.id), 'collection id')

/* ------------------------------------------------------------ missions */

for (const m of MISSIONS) {
  const at = `mission "${m.slug}"`

  if (!m.name) err(`${at}: missing name`)
  if (!m.purpose) err(`${at}: missing purpose`)
  if (!STATUS_META[m.status]) err(`${at}: unknown status "${m.status}"`)
  if (!imageKeys.has(m.imageKey)) err(`${at}: unknown imageKey "${m.imageKey}"`)

  for (const t of m.topics || []) if (!topicIds.has(t)) err(`${at}: unknown topic "${t}"`)
  for (const r of m.relationships || []) {
    if (!slugs.has(r.slug)) err(`${at}: relationship points at unknown mission "${r.slug}"`)
    if (r.slug === m.slug) err(`${at}: relationship points at itself`)
    if (!r.how) err(`${at}: relationship to "${r.slug}" does not say how they relate`)
  }
  for (const k of m.terms || []) if (!terms.has(k)) err(`${at}: unknown glossary term "${k}"`)

  if (!m.objectives?.length) err(`${at}: has no objectives`)
  if (!m.keyQuestions?.length) err(`${at}: has no key questions`)
  if (!m.instruments?.length) err(`${at}: has no instruments`)
  if (!m.overview) err(`${at}: missing plain-language overview`)

  checkDate(`${at} launch`, m.launch?.date)
  checkDate(`${at} arrival`, m.arrival?.date)
  checkDate(`${at} ended`, m.ended?.date)

  // A missing launch date is allowed, but it must be explained, because the UI
  // renders "not asserted" and needs to tell the reader where to look instead.
  if (!m.launch?.date && !m.launch?.note) {
    err(`${at}: has no launch date and no launch.note explaining why`)
  }

  // Ordering: a mission cannot arrive before it launches, or end before arriving.
  if (m.launch?.date && m.arrival?.date && m.arrival.date < m.launch.date) {
    err(`${at}: arrival ${m.arrival.date} precedes launch ${m.launch.date}`)
  }
  if (m.launch?.date && m.ended?.date && m.ended.date < m.launch.date) {
    err(`${at}: end ${m.ended.date} precedes launch ${m.launch.date}`)
  }

  // Informational: these render with a hatched bar on the timeline.
  if (m.status === 'completed' && !m.ended?.date) {
    warn(`${at}: status is "completed" but no end date is documented (timeline shows it as unstated)`)
  }

  checkSources(at, m.sources)
}

/* ------------------------------------------------------------ topics */

for (const t of TOPICS) {
  const at = `topic "${t.id}"`
  if (!t.name) err(`${at}: missing name`)
  if (!t.overview) err(`${at}: missing overview`)
  if (!t.keyQuestions?.length) err(`${at}: has no key questions`)
  if (!imageKeys.has(t.imageKey)) err(`${at}: unknown imageKey "${t.imageKey}"`)
  for (const k of t.terms || []) if (!terms.has(k)) err(`${at}: unknown glossary term "${k}"`)
  checkSources(at, t.sources)
}

/* ------------------------------------------------------------ collections */

for (const c of COLLECTIONS) {
  const at = `collection "${c.id}"`
  if (!imageKeys.has(c.imageKey)) err(`${at}: unknown imageKey "${c.imageKey}"`)
  for (const s of c.missions) if (!slugs.has(s)) err(`${at}: unknown mission "${s}"`)
  for (const t of c.topics) if (!topicIds.has(t)) err(`${at}: unknown topic "${t}"`)
  if (c.missions.length + c.topics.length < 2) warn(`${at}: has fewer than two entries`)
}

/* ------------------------------------------------------------ imagery */

for (const [key, items] of Object.entries(FALLBACK_IMAGERY)) {
  if (!items.length) err(`imagery key "${key}": has no images`)
  for (const im of items) {
    if (!im.url?.startsWith('https://')) err(`imagery "${im.id}": url is not https`)
    if (!im.title) err(`imagery "${im.id}": missing title — every image must carry attribution`)
  }
}

/* ------------------------------------------------------------ orphans */

const usedTerms = new Set([
  ...MISSIONS.flatMap((m) => m.terms || []),
  ...TOPICS.flatMap((t) => t.terms || []),
])
for (const t of terms) {
  if (!usedTerms.has(t)) warn(`glossary term "${t}" is never referenced by a mission or topic`)
}

const usedImages = new Set([
  ...MISSIONS.map((m) => m.imageKey),
  ...TOPICS.map((t) => t.imageKey),
  ...COLLECTIONS.map((c) => c.imageKey),
])
for (const k of imageKeys) {
  if (!usedImages.has(k)) warn(`imagery key "${k}" is never used`)
}

/* --------------------------------------------------- generated snapshots */

const SNAPSHOT_STALE_DAYS = 180

async function checkGenerated() {
  const files = [
    ['exoplanets', '../src/data/generated/exoplanets.js', 'EXOPLANETS'],
    ['techport', '../src/data/generated/techport.js', 'TECHPORT'],
  ]
  for (const [name, path, key] of files) {
    try {
      const mod = await import(path)
      const data = mod[key]
      if (!data?.generatedAt) {
        err(`generated/${name}: missing generatedAt stamp`)
        continue
      }
      const age = Math.round((Date.now() - new Date(`${data.generatedAt}T00:00:00Z`).getTime()) / 86400000)
      if (age > SNAPSHOT_STALE_DAYS) {
        warn(`generated/${name}: snapshot is ${age} days old — run "npm run generate-data" to refresh`)
      }
      if (!data.source?.url) err(`generated/${name}: missing source url`)
    } catch {
      warn(`generated/${name}: not present — run "npm run generate-data"`)
    }
  }
}

/* ------------------------------------------------------------ link check */

async function head(url, timeout = 25000) {
  const ctrl = new AbortController()
  const timer = setTimeout(() => ctrl.abort(), timeout)
  try {
    const res = await fetch(url, {
      redirect: 'follow',
      signal: ctrl.signal,
      headers: { 'User-Agent': 'nasa-research-explorer-linkcheck' },
    })
    return res.status
  } catch (e) {
    return `ERR ${e.name === 'AbortError' ? 'timeout' : e.message.slice(0, 40)}`
  } finally {
    clearTimeout(timer)
  }
}

async function checkLinks() {
  const urls = new Set()
  MISSIONS.forEach((m) => m.sources.forEach((s) => urls.add(s.url)))
  TOPICS.forEach((t) => t.sources.forEach((s) => urls.add(s.url)))
  OFFICIAL_PORTALS.forEach((p) => urls.add(p.url))

  const list = [...urls]
  process.stdout.write(`\nChecking ${list.length} source URLs`)

  let checked = 0
  const results = []
  const workers = Array.from({ length: 5 }, async () => {
    while (checked < list.length) {
      const url = list[checked++]
      const status = await head(url)
      if (status !== 200) results.push([status, url])
      process.stdout.write('.')
    }
  })
  await Promise.all(workers)
  process.stdout.write('\n')

  for (const [status, url] of results) err(`source URL returned ${status} — ${url}`)
  if (!results.length) console.log(`✓ all ${list.length} source URLs resolve`)
}

/* ------------------------------------------------------------ report */

async function main() {
  await checkGenerated()
  if (process.argv.includes('--links')) await checkLinks()

  console.log('')
  console.log(`missions ${MISSIONS.length} · topics ${TOPICS.length} · collections ${COLLECTIONS.length} · glossary ${terms.size} · imagery ${Object.values(FALLBACK_IMAGERY).flat().length}`)

  if (warnings.length) {
    console.log(`\n${warnings.length} warning${warnings.length === 1 ? '' : 's'}:`)
    warnings.forEach((w) => console.log(`  ! ${w}`))
  }

  if (errors.length) {
    console.log(`\n${errors.length} error${errors.length === 1 ? '' : 's'}:`)
    errors.forEach((e) => console.log(`  ✗ ${e}`))
    console.log('')
    process.exit(1)
  }

  console.log(`\n✓ all checks passed${process.argv.includes('--links') ? '' : '  (run "npm run check:links" to verify every source URL)'}`)
}

main()
