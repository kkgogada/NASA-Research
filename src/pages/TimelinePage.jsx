/**
 * Cross-mission timeline.
 *
 * A scaled chronological view of every mission that has an attributable launch
 * date, from Voyager in 1977 to the present. Bars run launch → mission end, or
 * launch → today for missions still operating.
 *
 * The honesty rule is load-bearing here rather than inconvenient: missions whose
 * milestones are scheduled but not yet dated by NASA cannot be placed on a time
 * axis without guessing, so they are listed separately in an explicitly undated
 * group instead of being quietly positioned.
 */

import { useMemo, useState } from 'react'
import { MISSIONS, STATUS_META } from '../data/missions.js'
import { TOPICS, topicById } from '../data/topics.js'
import { href } from '../lib/router.js'
import {
  Breadcrumb,
  Icon,
  Provenance,
  SectionHead,
  StatusPill,
  formatDate,
} from '../components/ui.jsx'

const YEAR_MS = 365.25 * 24 * 3600 * 1000

const parse = (iso) => (iso ? new Date(`${iso}T00:00:00Z`).getTime() : null)

export default function TimelinePage() {
  const [topic, setTopic] = useState('all')

  const now = Date.now()

  const { dated, undated, start, end } = useMemo(() => {
    const pool = MISSIONS.filter((m) => topic === 'all' || m.topics.includes(topic))

    const dated = pool
      .filter((m) => m.launch?.date)
      .map((m) => {
        const launch = parse(m.launch.date)
        const ended = parse(m.ended?.date)
        const arrival = parse(m.arrival?.date)

        // A mission NASA describes as completed did not run until today, so its
        // bar must not be drawn to today. Without a documented end date the bar
        // stops at the last milestone we can attribute and is flagged as having
        // an unstated end, rather than being extended by guesswork.
        const unknownEnd = !ended && m.status === 'completed'
        const stop = ended ?? (unknownEnd ? Math.max(arrival ?? launch, launch) : now)

        return { m, launch, ended, arrival, stop, unknownEnd, open: !ended && !unknownEnd }
      })
      .sort((a, b) => a.launch - b.launch)

    const undated = pool.filter((m) => !m.launch?.date)

    // Pad the axis to whole years so the gridlines land on round numbers.
    const minLaunch = dated.length ? Math.min(...dated.map((d) => d.launch)) : now
    const start = Date.UTC(new Date(minLaunch).getUTCFullYear(), 0, 1)
    const end = Date.UTC(new Date(now).getUTCFullYear() + 1, 0, 1)

    return { dated, undated, start, end }
  }, [topic, now])

  const span = end - start
  const pct = (t) => ((t - start) / span) * 100

  // Tick every 5 years, plus the first and last year.
  const ticks = useMemo(() => {
    const first = new Date(start).getUTCFullYear()
    const last = new Date(end).getUTCFullYear()
    const out = []
    for (let y = Math.ceil(first / 5) * 5; y <= last; y += 5) out.push(y)
    if (out[0] !== first) out.unshift(first)
    return out
  }, [start, end])

  const accentOf = (m) => {
    const t = topicById(m.topics[0])
    return t ? `var(--${t.accent})` : 'var(--blue)'
  }

  return (
    <div className="wrap">
      <div style={{ paddingTop: 30 }}>
        <Breadcrumb trail={[{ label: 'Explore', to: '/' }, { label: 'Timeline' }]} />
        <SectionHead
          eyebrow="Mission timeline"
          title="Every mission on one time axis"
          note="Bars run from launch to mission end, or to today for missions still operating. Only dates documented by NASA are plotted — nothing here is estimated."
        />
      </div>

      <div className="panel" style={{ marginBottom: 20 }}>
        <div className="spec-label" style={{ color: 'var(--sky-500)', marginBottom: 8 }}>
          Filter by research area
        </div>
        <div className="chips">
          <button className={`chip${topic === 'all' ? ' on' : ''}`} onClick={() => setTopic('all')}>
            All areas
          </button>
          {TOPICS.map((t) => {
            const n = MISSIONS.filter((m) => m.topics.includes(t.id)).length
            if (!n) return null
            return (
              <button key={t.id} className={`chip${topic === t.id ? ' on' : ''}`} onClick={() => setTopic(t.id)}>
                {t.name} <span style={{ opacity: 0.6 }}>{n}</span>
              </button>
            )
          })}
        </div>
      </div>

      <div className="row" style={{ justifyContent: 'space-between', marginBottom: 14 }}>
        <div className="tlc-legend">
          <span className="tlc-key"><i style={{ background: 'var(--blue)' }} /> Operating period</span>
          <span className="tlc-key"><i className="dot" style={{ background: 'var(--sky-100)' }} /> Arrival</span>
          <span className="tlc-key"><i className="dot" style={{ background: 'var(--red-bright)' }} /> Mission end</span>
          <span className="tlc-key"><i className="rule" /> Today</span>
          <span className="tlc-key"><i className="hatch" /> End date not asserted</span>
        </div>
        <Provenance kind="official" onDark label="Dates from NASA sources" />
      </div>

      <div className="tlc-wrap">
        <div className="tlc" style={{ '--tlc-label': '190px' }}>
          <div className="tlc-axis">
            <div className="tlc-axis-spacer" />
            <div className="tlc-track">
              {ticks.map((y) => (
                <div key={y} className="tlc-tick" style={{ left: `${pct(Date.UTC(y, 0, 1))}%` }}>
                  <span>{y}</span>
                </div>
              ))}
              {/* Unlabelled: "today" sits within a few months of the final year
                  tick, so a text label here would overlap it. The legend names
                  the line instead. */}
              <div className="tlc-now" style={{ left: `${pct(now)}%` }} />
            </div>
          </div>

          {dated.map(({ m, launch, ended, arrival, stop, open, unknownEnd }) => {
            const left = pct(launch)
            const width = Math.max(pct(stop) - left, 0.4)
            const years = (stop - launch) / YEAR_MS
            return (
              <div key={m.slug} className="tlc-row">
                <div className="tlc-label">
                  <a href={href(`/mission/${m.slug}`)}>{m.name}</a>
                  <span className="tlc-dest">
                    {m.destinationClass}
                    {' · '}
                    {unknownEnd
                      ? 'end date not asserted'
                      : `${years >= 1 ? `${Math.round(years)} yr` : '<1 yr'}${open ? '+' : ''}`}
                  </span>
                </div>
                <div className="tlc-lane">
                  <div className="tlc-grid">
                    {ticks.map((y) => (
                      <div key={y} className="tlc-tick" style={{ left: `${pct(Date.UTC(y, 0, 1))}%` }} />
                    ))}
                  </div>
                  <div className="tlc-now" style={{ left: `${pct(now)}%` }} />
                  <div
                    className={`tlc-bar${open ? ' is-open' : ''}${unknownEnd ? ' is-unknown' : ''}`}
                    style={{ left: `${left}%`, width: `${width}%`, '--bar': accentOf(m) }}
                    title={`${m.name} — launched ${formatDate(m.launch.date)}${
                      ended
                        ? `, ended ${formatDate(m.ended.date)}`
                        : unknownEnd
                          ? '. Mission is complete, but this project does not assert an end date — see the official page.'
                          : ', still operating'
                    }`}
                  />
                  {arrival != null && (
                    <span
                      className="tlc-point is-arrival"
                      style={{ left: `${pct(arrival)}%` }}
                      title={`${m.arrival.label} — ${formatDate(m.arrival.date)}`}
                    />
                  )}
                  {ended != null && (
                    <span
                      className="tlc-point is-end"
                      style={{ left: `${pct(ended)}%` }}
                      title={`${m.ended.label} — ${formatDate(m.ended.date)}`}
                    />
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <p className="muted-dark mt-s" style={{ fontSize: 12.5 }}>
        Scroll the chart sideways to see the full span. Hover a bar for its dates, or select a mission name to
        open its detail page.
      </p>

      {undated.length > 0 && (
        <section>
          <SectionHead
            eyebrow="Not on the axis"
            title="Scheduled, or not applicable"
            red
            note="These cannot be placed on a time axis without inventing a date, so they are listed rather than plotted. Follow the official mission page for current scheduling."
          />
          <div className="grid grid-3">
            {undated.map((m) => (
              <div key={m.slug} className="panel">
                <div className="row row-tight" style={{ justifyContent: 'space-between', marginBottom: 10 }}>
                  <StatusPill status={m.status} meta={STATUS_META} />
                  <Icon.Clock style={{ width: 15, height: 15, color: 'var(--sky-500)' }} />
                </div>
                <a href={href(`/mission/${m.slug}`)} style={{ textDecoration: 'none' }}>
                  <div style={{ fontWeight: 700, fontSize: 16, color: '#fff', marginBottom: 5 }}>{m.name}</div>
                </a>
                <p className="muted-dark" style={{ fontSize: 13, margin: 0 }}>
                  {m.launch?.note || 'No attributable date.'}
                </p>
                <div style={{ marginTop: 12 }}>
                  <a className="link-more" href={m.sources[0]?.url} target="_blank" rel="noopener noreferrer">
                    Check the official page <Icon.External style={{ display: 'inline', verticalAlign: '-1px' }} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="status-strip mt-l">
        <Provenance kind="app" onDark label="App-generated view" />
        <span className="grow">
          The chart itself is this project’s visualisation. Every date plotted on it comes from the official
          NASA sources listed on each mission’s detail page.
        </span>
      </div>
    </div>
  )
}
