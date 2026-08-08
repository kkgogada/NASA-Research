/**
 * Glossary.
 *
 * The definitions are written by this project to make NASA source material
 * easier to read, so they carry the app-summary label throughout. Each entry
 * lists the missions and research areas that use the term, which turns the
 * glossary into a second way of navigating the collection rather than a
 * dead-end appendix.
 */

import { useMemo, useState } from 'react'
import { GLOSSARY, termLabel } from '../data/glossary.js'
import { MISSIONS } from '../data/missions.js'
import { TOPICS } from '../data/topics.js'
import { href } from '../lib/router.js'
import { Breadcrumb, Empty, Icon, Provenance, SectionHead } from '../components/ui.jsx'

/* Which missions and topics reference each term. */
const USAGE = Object.keys(GLOSSARY).reduce((acc, key) => {
  acc[key] = {
    missions: MISSIONS.filter((m) => (m.terms || []).includes(key)),
    topics: TOPICS.filter((t) => (t.terms || []).includes(key)),
  }
  return acc
}, {})

export default function Glossary() {
  const [query, setQuery] = useState('')

  const entries = useMemo(() => {
    const q = query.trim().toLowerCase()
    return Object.entries(GLOSSARY)
      .map(([key, definition]) => ({ key, label: termLabel(key), definition }))
      .filter((e) => !q || `${e.label} ${e.definition}`.toLowerCase().includes(q))
      .sort((a, b) => a.label.localeCompare(b.label))
  }, [query])

  const groups = useMemo(() => {
    const map = new Map()
    for (const e of entries) {
      const letter = e.label[0].toUpperCase()
      if (!map.has(letter)) map.set(letter, [])
      map.get(letter).push(e)
    }
    return [...map.entries()]
  }, [entries])

  const present = new Set(groups.map(([l]) => l))
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

  return (
    <div className="wrap">
      <div style={{ paddingTop: 30 }}>
        <Breadcrumb trail={[{ label: 'Explore', to: '/' }, { label: 'Glossary' }]} />
        <SectionHead
          eyebrow="Glossary"
          title="Terms worth knowing"
          note={`${Object.keys(GLOSSARY).length} plain-language definitions written for this project, each linked to the missions and research areas that use it.`}
        />
      </div>

      <div className="searchbar" style={{ marginBottom: 16 }}>
        <Icon.Search />
        <input
          type="search"
          value={query}
          placeholder="Filter terms…"
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Filter glossary terms"
        />
        {query && (
          <button className="search-clear" onClick={() => setQuery('')}>
            Clear
          </button>
        )}
      </div>

      <div className="status-strip" style={{ marginBottom: 20 }}>
        <Provenance kind="app" onDark />
        <span className="grow">
          These definitions are explanations written by this project, not NASA text. They are deliberately
          short — follow the linked missions and research areas for the sourced detail.
        </span>
      </div>

      {!query && (
        <nav className="gl-jump" aria-label="Jump to letter" style={{ marginBottom: 8 }}>
          {alphabet.map((l) =>
            present.has(l) ? (
              <a key={l} href={`#/glossary`} onClick={(e) => {
                e.preventDefault()
                document.getElementById(`gl-${l}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }}>
                {l}
              </a>
            ) : (
              <span key={l}>{l}</span>
            ),
          )}
        </nav>
      )}

      {entries.length === 0 ? (
        <div className="mt-l">
          <Empty title={`No terms match “${query}”`}>
            Try a shorter word, or clear the filter to browse all {Object.keys(GLOSSARY).length} terms.
          </Empty>
        </div>
      ) : (
        groups.map(([letter, items]) => (
          <section key={letter} id={`gl-${letter}`} className="gl-group">
            <h2 className="gl-letter">{letter}</h2>
            <div className="grid grid-2">
              {items.map((e) => {
                const use = USAGE[e.key] || { missions: [], topics: [] }
                const refs = [
                  ...use.topics.map((t) => ({ label: t.name, to: `/topic/${t.id}` })),
                  ...use.missions.map((m) => ({ label: m.name, to: `/mission/${m.slug}` })),
                ]
                return (
                  <div key={e.key} className="gl-card">
                    <div className="gl-term">{e.label}</div>
                    <p className="gl-def">{e.definition}</p>
                    {refs.length > 0 && (
                      <div className="gl-used">
                        <span className="gl-used-label">Used in</span>
                        {refs.slice(0, 6).map((r) => (
                          <a key={r.to} className="gl-ref" href={href(r.to)}>
                            {r.label}
                          </a>
                        ))}
                        {refs.length > 6 && <span className="muted">+{refs.length - 6} more</span>}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </section>
        ))
      )}
    </div>
  )
}
