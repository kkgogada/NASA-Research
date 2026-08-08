/**
 * Comparison workspace.
 *
 * Compares two missions, two research topics, or one of each, across objectives,
 * instruments, destinations, dates and scientific contribution. Rows where the
 * two subjects genuinely share a value are highlighted, because on a comparison
 * page the overlap is usually the interesting part.
 *
 * Selection is held in the URL (?a=…&b=…) so a comparison can be bookmarked or
 * shared with a classmate.
 */

import { MISSIONS, STATUS_META, missionBySlug } from '../data/missions.js'
import { TOPICS, topicById } from '../data/topics.js'
import { fallbackFor } from '../data/imagery.js'
import { href, navigate } from '../lib/router.js'
import { NasaImage } from '../components/NasaImage.jsx'
import {
  Block,
  Breadcrumb,
  Empty,
  Icon,
  Provenance,
  SaveButton,
  SectionHead,
  SourceList,
  StatusPill,
  formatDate,
} from '../components/ui.jsx'

/* Resolve a "type:id" reference into a normalised comparison subject. */
function resolve(ref) {
  if (!ref) return null
  const [type, id] = ref.split(':')
  if (type === 'mission') {
    const m = missionBySlug(id)
    return m ? toMissionSubject(m) : null
  }
  if (type === 'topic') {
    const t = topicById(id)
    return t ? toTopicSubject(t) : null
  }
  return null
}

const YEAR_MS = 365.25 * 24 * 3600 * 1000

/** Operating span in whole years, from documented dates only. */
function durationOf(m) {
  if (!m.launch?.date) return 'Not applicable — no launch date asserted'
  const from = new Date(`${m.launch.date}T00:00:00Z`).getTime()
  const to = m.ended?.date ? new Date(`${m.ended.date}T00:00:00Z`).getTime() : Date.now()
  const years = (to - from) / YEAR_MS
  const rounded = years < 1 ? '<1' : Math.round(years)
  return m.ended?.date ? `${rounded} years (completed)` : `${rounded} years and counting`
}

function toMissionSubject(m) {
  return {
    ref: `mission:${m.slug}`,
    kind: 'mission',
    id: m.slug,
    name: m.name,
    detailHref: `/mission/${m.slug}`,
    imageKey: m.imageKey,
    subtitle: m.program,
    purpose: m.purpose,
    missionType: m.kind,
    programme: m.program,
    status: STATUS_META[m.status]?.label || m.status,
    statusRaw: m.status,
    destination: m.destination,
    destinationClass: m.destinationClass,
    launch: m.launch.date ? formatDate(m.launch.date) : 'Not asserted',
    launchNote: m.launch.date ? m.launch.vehicle : m.launch.note,
    launchSite: m.launch.site || '—',
    arrival: m.arrival?.date ? formatDate(m.arrival.date) : m.arrival?.label || '—',
    ended: m.ended?.date ? `${formatDate(m.ended.date)} — ${m.ended.label}` : 'Ongoing or not applicable',
    duration: durationOf(m),
    agency: m.agency,
    objectives: m.objectives,
    instruments: m.instruments.map((i) => `${i.name} — ${i.role}`),
    instrumentCount: `${m.instruments.length} listed`,
    questions: m.keyQuestions,
    contribution: m.whyItMatters,
    topics: m.topics,
    topicNames: m.topics.map((t) => topicById(t)?.name).filter(Boolean),
    sources: m.sources,
  }
}

function toTopicSubject(t) {
  const missions = MISSIONS.filter((m) => m.topics.includes(t.id))
  return {
    ref: `topic:${t.id}`,
    kind: 'topic',
    id: t.id,
    name: t.name,
    detailHref: `/topic/${t.id}`,
    imageKey: t.imageKey,
    subtitle: 'Research area',
    purpose: t.tagline,
    missionType: 'Research area',
    programme: 'Not applicable — this is a field of study',
    status: `${missions.length} linked missions in this app`,
    statusRaw: null,
    destination: 'Not applicable — this is a field of study',
    destinationClass: null,
    launch: 'Not applicable',
    launchNote: '',
    launchSite: '—',
    arrival: '—',
    ended: '—',
    duration: 'Not applicable — ongoing field of study',
    agency: 'NASA science and research directorates',
    objectives: t.subfields.map((s) => `Area of study: ${s}`),
    instruments: missions.map((m) => `${m.name} — ${m.kind}`),
    instrumentCount: `${missions.length} linked missions`,
    questions: t.keyQuestions,
    contribution: t.whyItMatters,
    topics: [t.id],
    topicNames: [t.name],
    sources: t.sources,
  }
}

const OPTIONS = [
  ...MISSIONS.map((m) => ({ value: `mission:${m.slug}`, label: `${m.name}`, group: 'Missions' })),
  ...TOPICS.map((t) => ({ value: `topic:${t.id}`, label: t.name, group: 'Research topics' })),
]

export default function Compare({ query, board }) {
  const a = resolve(query.a)
  const b = resolve(query.b)

  const setSide = (side, value) => {
    const next = new URLSearchParams({ ...query })
    if (value) next.set(side, value)
    else next.delete(side)
    navigate(`/compare?${next.toString()}`)
  }

  const swap = () => {
    const next = new URLSearchParams()
    if (query.b) next.set('a', query.b)
    if (query.a) next.set('b', query.a)
    navigate(`/compare?${next.toString()}`)
  }

  return (
    <div className="wrap">
      <div style={{ paddingTop: 30 }}>
        <Breadcrumb trail={[{ label: 'Explore', to: '/' }, { label: 'Comparison workspace' }]} />
        <SectionHead
          eyebrow="Comparison workspace"
          title="Compare two subjects side by side"
          note="Pick any two missions or research areas. Rows where both share a value are highlighted — the overlaps are usually where the interesting questions are."
        />
      </div>

      <div className="panel">
        <div className="grid" style={{ gridTemplateColumns: '1fr auto 1fr', gap: 16, alignItems: 'end' }}>
          <div className="picker">
            <span className="picker-tag a">Subject A</span>
            <Picker value={query.a || ''} onChange={(v) => setSide('a', v)} exclude={query.b} />
          </div>
          <button className="btn btn-ghost" onClick={swap} disabled={!query.a && !query.b} title="Swap sides">
            ⇄
          </button>
          <div className="picker">
            <span className="picker-tag b">Subject B</span>
            <Picker value={query.b || ''} onChange={(v) => setSide('b', v)} exclude={query.a} />
          </div>
        </div>
      </div>

      {!a || !b ? (
        <div className="mt-l">
          <Empty title="Choose two subjects to compare">
            Select a mission or research area on each side. You can also reach this page from the “Compare”
            button on any mission or topic, which pre-fills one side for you.
          </Empty>
          <SuggestedComparisons />
        </div>
      ) : (
        <ComparisonTable a={a} b={b} board={board} />
      )}
    </div>
  )
}

function Picker({ value, onChange, exclude }) {
  const groups = ['Missions', 'Research topics']
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)} aria-label="Choose a subject to compare">
      <option value="">Choose a mission or topic…</option>
      {groups.map((g) => (
        <optgroup key={g} label={g}>
          {OPTIONS.filter((o) => o.group === g && o.value !== exclude).map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </optgroup>
      ))}
    </select>
  )
}

/* ------------------------------------------------------------------ Table */

function ComparisonTable({ a, b, board }) {
  const sharedTopics = a.topics.filter((t) => b.topics.includes(t))

  /* Scalar rows compare their own values, so a match is detected rather than
     hand-declared per row. "Not applicable" on both sides is not a match — two
     things being equally inapplicable tells the reader nothing. */
  const NOT_A_MATCH = /^(—|not applicable|not asserted|ongoing or not applicable)/i
  const rows = [
    { label: 'Purpose', get: (s) => s.purpose },
    { label: 'Type', get: (s) => s.missionType, match: true },
    { label: 'Programme', get: (s) => s.programme, match: true },
    {
      label: 'Status',
      get: (s) => s.status,
      node: (s) => (s.statusRaw ? <StatusPill status={s.statusRaw} meta={STATUS_META} /> : s.status),
      match: true,
    },
    // Two rows, because the specific destination and the broad class match at
    // different rates: Cassini and Europa Clipper are both "outer planets" but
    // Saturn is not Jupiter. Tagging the specific row as shared would be wrong.
    { label: 'Destination', get: (s) => s.destination },
    { label: 'Destination class', get: (s) => s.destinationClass || 'Not applicable', match: true },
    { label: 'Research areas', list: (s) => s.topicNames },
    { label: 'Launch date', get: (s) => s.launch, sub: (s) => s.launchNote, mono: true },
    { label: 'Launch site', get: (s) => s.launchSite, match: true },
    { label: 'Arrival', get: (s) => s.arrival, mono: true },
    { label: 'Mission end', get: (s) => s.ended },
    { label: 'Operating span', get: (s) => s.duration },
    { label: 'Instruments listed', get: (s) => s.instrumentCount, match: true },
    { label: 'Managed by', get: (s) => s.agency, match: true },
    { label: 'Objectives', list: (s) => s.objectives },
    { label: 'Instruments', list: (s) => s.instruments },
    { label: 'Key questions', list: (s) => s.questions },
    { label: 'Scientific contribution', get: (s) => s.contribution, app: true },
  ]

  const isMatch = (row) => {
    if (!row.match || !row.get) return false
    const va = String(row.get(a) ?? '').trim()
    const vb = String(row.get(b) ?? '').trim()
    if (!va || !vb || NOT_A_MATCH.test(va)) return false
    return va.toLowerCase() === vb.toLowerCase()
  }

  const comparable = rows.filter((r) => r.match)
  const matched = comparable.filter(isMatch)

  return (
    <>
      <div className="grid grid-2 mt-l">
        {[a, b].map((s, i) => (
          <SubjectHeader key={s.ref} subject={s} side={i === 0 ? 'A' : 'B'} board={board} />
        ))}
      </div>

      <div className="status-strip mt-m">
        <Provenance kind="app" onDark label="App observation" />
        <span className="grow">
          <strong style={{ color: '#fff' }}>
            {matched.length} of {comparable.length}
          </strong>{' '}
          directly comparable attributes match
          {matched.length > 0 && <> — {matched.map((r) => r.label.toLowerCase()).join(', ')}</>}.
          {sharedTopics.length > 0 && (
            <>
              {' '}Both sit in{' '}
              <strong style={{ color: '#fff' }}>
                {sharedTopics.map((t) => topicById(t)?.name).filter(Boolean).join(', ')}
              </strong>
              .
            </>
          )}{' '}
          Grouping into research areas is this app’s own organisation, not a NASA classification.
        </span>
      </div>

      <div className="block block-official mt-m" style={{ marginTop: 22 }}>
        <div className="block-head">
          <Provenance kind="official" />
          <span>Side-by-side comparison — sourced fields</span>
          <span style={{ marginLeft: 'auto', fontSize: 12, fontWeight: 400 }}>
            <span className="cmp-key-swatch" /> shared value
          </span>
        </div>
        <div className="compare-grid">
          {rows.map((row) => (
            <Row key={row.label} row={row} a={a} b={b} shared={isMatch(row)} />
          ))}
        </div>
      </div>

      <div className="grid grid-2 mt-m">
        {[a, b].map((s) => (
          <Block key={s.ref} kind="official" title={`Sources — ${s.name}`}>
            <SourceList sources={s.sources} compact />
          </Block>
        ))}
      </div>

      <p className="muted-dark mt-m" style={{ fontSize: 12.5 }}>
        The “scientific contribution” row is a plain-language summary written by this app. Every other row is
        drawn from the official sources listed above. This comparison is a study aid — it is not a NASA
        assessment of either subject’s importance.
      </p>
    </>
  )
}

function Row({ row, a, b, shared }) {
  /* data-subject drives the per-cell heading that appears once the grid
     collapses to one column on narrow screens — the subject's actual name,
     rather than a bare "A"/"B" the reader has to map back to the pickers. */
  const cell = (s, side) => {
    const common = {
      className: `cmp-cell${shared ? ' shared' : ''}`,
      'data-subject': s.name,
      'data-side': side,
    }

    if (row.list) {
      const items = row.list(s) || []
      return (
        <div {...common}>
          {shared && <span className="cmp-shared-tag">Shared</span>}
          {items.length ? (
            <ul>
              {items.slice(0, 7).map((it) => (
                <li key={it}>{it}</li>
              ))}
            </ul>
          ) : (
            <span className="muted">—</span>
          )}
          {items.length > 7 && <span className="muted">+{items.length - 7} more on the detail page</span>}
        </div>
      )
    }

    return (
      <div {...common}>
        {shared && <span className="cmp-shared-tag">Same</span>}
        <span style={row.mono ? { fontFamily: 'var(--font-mono)', fontSize: 13.5 } : undefined}>
          {row.node ? row.node(s) : row.get(s)}
        </span>
        {row.sub && row.sub(s) && <div className="muted" style={{ marginTop: 4 }}>{row.sub(s)}</div>}
        {row.app && (
          <div style={{ marginTop: 8 }}>
            <Provenance kind="app" />
          </div>
        )}
      </div>
    )
  }

  return (
    <>
      <div className="cmp-label">{row.label}</div>
      {cell(a, 'a')}
      {cell(b, 'b')}
    </>
  )
}

function SubjectHeader({ subject, side, board }) {
  const img = fallbackFor(subject.imageKey)[0]
  return (
    <div className="card">
      <div className="card-media" style={{ aspectRatio: '21 / 9' }}>
        <NasaImage item={img} />
      </div>
      <div className="card-body">
        <span className="card-sub" style={{ color: side === 'A' ? 'var(--blue-deep)' : 'var(--red)' }}>
          Subject {side} · {subject.kind === 'mission' ? 'Mission' : 'Research area'}
        </span>
        <h3 className="card-title">{subject.name}</h3>
        <p className="card-text">{subject.purpose}</p>
        <div className="card-foot">
          <a className="btn btn-light btn-sm" href={href(subject.detailHref)}>
            Open detail page
          </a>
          <div style={{ marginLeft: 'auto' }}>
            <SaveButton
              board={board}
              entry={{
                type: subject.kind,
                id: subject.id,
                title: subject.name,
                subtitle: subject.subtitle,
                href: subject.detailHref,
                sourceUrl: subject.sources[0]?.url,
                sourceLabel: subject.sources[0]?.label,
                imageUrl: img?.thumb || img?.url || '',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function SuggestedComparisons() {
  const suggestions = [
    {
      a: 'mission:webb',
      b: 'mission:hubble',
      title: 'Webb vs Hubble',
      why: 'Two observatories that divide the spectrum between them — infrared against ultraviolet and visible.',
    },
    {
      a: 'mission:perseverance',
      b: 'mission:curiosity',
      title: 'Perseverance vs Curiosity',
      why: 'Two Mars rovers with related engineering but different scientific questions.',
    },
    {
      a: 'mission:europa-clipper',
      b: 'mission:cassini',
      title: 'Europa Clipper vs Cassini',
      why: 'How a finding from one mission becomes the premise of the next.',
    },
    {
      a: 'topic:aeronautics',
      b: 'topic:space-technology',
      title: 'Aeronautics vs Space technology',
      why: 'Two engineering research areas with different constraints and timescales.',
    },
  ]

  return (
    <section>
      <SectionHead eyebrow="Suggested" title="Comparisons worth starting with" />
      <div className="grid grid-2">
        {suggestions.map((s) => (
          <a key={s.title} className="card" href={href(`/compare?a=${s.a}&b=${s.b}`)}>
            <div className="card-body">
              <div className="row row-tight">
                <Icon.Compare style={{ width: 16, height: 16, color: 'var(--blue-deep)' }} />
                <h3 className="card-title">{s.title}</h3>
              </div>
              <p className="card-text">{s.why}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
