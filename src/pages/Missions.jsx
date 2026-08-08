/**
 * Mission index with filtering by research area, status and destination class.
 */

import { useMemo, useState } from 'react'
import { MISSIONS, STATUS_META } from '../data/missions.js'
import { TOPICS } from '../data/topics.js'
import { MissionCard } from '../components/cards.jsx'
import { Breadcrumb, Empty, Provenance, SectionHead } from '../components/ui.jsx'

export default function Missions({ board }) {
  const [topic, setTopic] = useState('all')
  const [status, setStatus] = useState('all')
  const [dest, setDest] = useState('all')

  const destinations = useMemo(
    () => Array.from(new Set(MISSIONS.map((m) => m.destinationClass))).sort(),
    [],
  )

  const filtered = MISSIONS.filter(
    (m) =>
      (topic === 'all' || m.topics.includes(topic)) &&
      (status === 'all' || m.status === status) &&
      (dest === 'all' || m.destinationClass === dest),
  )

  const reset = () => {
    setTopic('all')
    setStatus('all')
    setDest('all')
  }
  const anyFilter = topic !== 'all' || status !== 'all' || dest !== 'all'

  return (
    <div className="wrap">
      <div style={{ paddingTop: 30 }}>
        <Breadcrumb trail={[{ label: 'Explore', to: '/' }, { label: 'Missions' }]} />
        <SectionHead
          eyebrow="Mission index"
          title="Missions"
          note="Every entry states its purpose, status, destination, launch date where one is documented, scientific objectives, instruments and official sources. Nothing on these pages is inferred or estimated."
        />
      </div>

      <div className="panel" style={{ marginBottom: 26 }}>
        <div className="stack">
          <FilterRow label="Research area">
            <button className={`chip${topic === 'all' ? ' on' : ''}`} onClick={() => setTopic('all')}>
              All
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
          </FilterRow>

          <FilterRow label="Status">
            <button className={`chip${status === 'all' ? ' on' : ''}`} onClick={() => setStatus('all')}>
              All
            </button>
            {Object.entries(STATUS_META).map(([k, v]) => {
              const n = MISSIONS.filter((m) => m.status === k).length
              if (!n) return null
              return (
                <button key={k} className={`chip${status === k ? ' on' : ''}`} onClick={() => setStatus(k)}>
                  {v.label} <span style={{ opacity: 0.6 }}>{n}</span>
                </button>
              )
            })}
          </FilterRow>

          <FilterRow label="Destination">
            <button className={`chip${dest === 'all' ? ' on' : ''}`} onClick={() => setDest('all')}>
              All
            </button>
            {destinations.map((d) => (
              <button key={d} className={`chip${dest === d ? ' on' : ''}`} onClick={() => setDest(d)}>
                {d}
              </button>
            ))}
          </FilterRow>
        </div>
      </div>

      <div className="row" style={{ marginBottom: 18, justifyContent: 'space-between' }}>
        <span className="muted-dark">
          Showing {filtered.length} of {MISSIONS.length} missions
        </span>
        <span className="row row-tight">
          <Provenance kind="official" onDark label="All facts sourced" />
          {anyFilter && (
            <button className="btn btn-ghost btn-sm" onClick={reset}>
              Clear filters
            </button>
          )}
        </span>
      </div>

      {filtered.length === 0 ? (
        <Empty
          title="No missions match those filters"
          action={
            <button className="btn btn-primary" onClick={reset}>
              Clear filters
            </button>
          }
        >
          This app covers a curated selection rather than NASA’s full mission catalogue. Try loosening a
          filter, or browse the official NASA Science site linked in the footer for the complete list.
        </Empty>
      ) : (
        <div className="grid grid-3">
          {filtered.map((m) => (
            <MissionCard key={m.slug} mission={m} board={board} />
          ))}
        </div>
      )}
    </div>
  )
}

function FilterRow({ label, children }) {
  return (
    <div>
      <div className="spec-label" style={{ color: 'var(--sky-500)', marginBottom: 8 }}>
        {label}
      </div>
      <div className="chips">{children}</div>
    </div>
  )
}
