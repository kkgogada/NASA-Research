/**
 * Live-ish exoplanet statistics for the astrophysics topic page.
 *
 * The numbers come from the NASA Exoplanet Archive via scripts/generate-data.mjs
 * (the archive sends no CORS headers, so it cannot be queried from the browser).
 * They are therefore a snapshot with a stated date, not a live feed — the panel
 * says so plainly and links to the archive so a reader can check the current
 * figure themselves.
 *
 * The exact ADQL query is shown, because "6,336 planets" means nothing without
 * knowing what was counted.
 */

import { useState } from 'react'
import { EXOPLANETS } from '../data/generated/exoplanets.js'
import { Icon, Provenance, formatDate } from './ui.jsx'

const NUM = new Intl.NumberFormat('en-GB')

export default function ExoplanetPanel() {
  const [showQuery, setShowQuery] = useState(false)
  const d = EXOPLANETS

  const maxYear = Math.max(...d.byYear.map((y) => y.count))
  const topMethods = d.byMethod.slice(0, 6)
  const maxMethod = topMethods[0]?.count || 1

  return (
    <div className="block block-official">
      <div className="block-head">
        <Provenance kind="official" />
        <span>Confirmed exoplanets — NASA Exoplanet Archive</span>
        <span style={{ marginLeft: 'auto', fontSize: 11.5, fontWeight: 400 }}>
          snapshot taken {formatDate(d.generatedAt)}
        </span>
      </div>

      <div className="block-body">
        <div className="stat-row">
          <div className="stat-big">
            <div className="stat-num">{NUM.format(d.totalConfirmed)}</div>
            <div className="stat-cap">confirmed planets beyond the solar system</div>
          </div>
          <div className="stat-side">
            <div>
              <div className="spec-label">First confirmed</div>
              <div className="spec-value mono">{d.byYear[0]?.year}</div>
            </div>
            <div>
              <div className="spec-label">Detection methods</div>
              <div className="spec-value mono">{d.byMethod.length}</div>
            </div>
            <div>
              <div className="spec-label">Leading facility</div>
              <div className="spec-value" style={{ fontSize: 14 }}>
                {d.byFacility[0]?.facility}
              </div>
            </div>
          </div>
        </div>

        {/* ---------------------------------------------------- by year --- */}
        <h4 className="mini-head">Discoveries per year</h4>
        <div className="ychart-wrap">
          <div className="ychart" role="img" aria-label={`Bar chart of exoplanet discoveries per year from ${d.byYear[0]?.year} to ${d.byYear[d.byYear.length - 1]?.year}`}>
            {d.byYear.map((y) => (
              <div key={y.year} className="ybar-col" title={`${y.year}: ${NUM.format(y.count)} planets`}>
                <div className="ybar" style={{ height: `${Math.max((y.count / maxYear) * 100, 1.5)}%` }} />
                {y.year % 5 === 0 && <span className="ybar-label">{String(y.year).slice(2)}</span>}
              </div>
            ))}
          </div>
        </div>
        <p className="muted" style={{ fontSize: 12.5, marginTop: 8 }}>
          The two tall columns are Kepler data releases, when large batches of candidates were confirmed at
          once — a reminder that discovery counts track survey schedules, not just how many planets exist.
        </p>

        {/* -------------------------------------------------- by method --- */}
        <h4 className="mini-head" style={{ marginTop: 22 }}>How they were found</h4>
        <div className="mbars">
          {topMethods.map((m) => (
            <div key={m.method} className="mbar-row">
              <span className="mbar-name">{m.method}</span>
              <span className="mbar-track">
                <span className="mbar-fill" style={{ width: `${(m.count / maxMethod) * 100}%` }} />
              </span>
              <span className="mbar-num">{NUM.format(m.count)}</span>
            </div>
          ))}
        </div>

        {/* --------------------------------------------------- sourcing --- */}
        <div className="mt-m">
          <a className="source-link" href={d.source.url} target="_blank" rel="noopener noreferrer">
            <Icon.External />
            <span>
              {d.source.label}
              <span className="src-url">{d.source.url}</span>
            </span>
          </a>
        </div>

        <p className="muted mt-s" style={{ fontSize: 12.5 }}>
          {d.source.note} These figures are a snapshot generated on {formatDate(d.generatedAt)}, not a live
          feed — the archive is updated continually, so check it for the current count.
        </p>

        <button className="btn btn-light btn-sm mt-s" onClick={() => setShowQuery((v) => !v)}>
          {showQuery ? 'Hide' : 'Show'} the queries used
        </button>
        {showQuery && (
          <pre className="cite-text" style={{ marginTop: 10 }}>
            {Object.entries(d.queries)
              .map(([k, q]) => `-- ${k}\n${q}`)
              .join('\n\n')}
          </pre>
        )}
      </div>
    </div>
  )
}
