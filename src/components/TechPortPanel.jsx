/**
 * Real NASA technology development projects, for the space-technology topic.
 *
 * Sourced from NASA TechPort via scripts/generate-data.mjs (TechPort sends no
 * CORS headers, so it cannot be queried from the browser). Descriptions are
 * short excerpts of NASA's own project text — not rewritten and not extended —
 * each linked to its full public record.
 *
 * TRL (Technology Readiness Level) is NASA's own 1–9 scale for how far a
 * technology has progressed from concept to flight-proven, so the meter is a
 * sourced figure rather than an editorial judgement.
 */

import { TECHPORT } from '../data/generated/techport.js'
import { Icon, Provenance, formatDate } from './ui.jsx'

const TRL_MEANING = {
  1: 'Basic principles observed',
  2: 'Technology concept formulated',
  3: 'Proof of concept',
  4: 'Validated in the laboratory',
  5: 'Validated in a relevant environment',
  6: 'Demonstrated in a relevant environment',
  7: 'Demonstrated in an operational environment',
  8: 'System complete and qualified',
  9: 'Flight proven in a successful mission',
}

function TrlMeter({ current, begin, end }) {
  if (!current) return null
  return (
    <div className="trl">
      <div className="trl-head">
        <span className="spec-label" style={{ margin: 0 }}>Technology readiness</span>
        <span className="trl-num">TRL {current}</span>
      </div>
      <div className="trl-track" role="img" aria-label={`Technology readiness level ${current} of 9`}>
        {Array.from({ length: 9 }, (_, i) => i + 1).map((n) => (
          <span
            key={n}
            className={`trl-step${n <= current ? ' on' : ''}`}
            title={`TRL ${n} — ${TRL_MEANING[n]}`}
          />
        ))}
      </div>
      <div className="trl-cap">{TRL_MEANING[current]}</div>
      {begin != null && end != null && begin !== end && (
        <div className="trl-cap" style={{ opacity: 0.75 }}>
          Project scope: TRL {begin} → {end}
        </div>
      )}
    </div>
  )
}

export default function TechPortPanel() {
  const d = TECHPORT
  if (!d?.projects?.length) return null

  return (
    <div className="block block-official">
      <div className="block-head">
        <Provenance kind="official" />
        <span>Active technology projects — NASA TechPort</span>
        <span style={{ marginLeft: 'auto', fontSize: 11.5, fontWeight: 400 }}>
          snapshot taken {formatDate(d.generatedAt)}
        </span>
      </div>

      <div className="block-body">
        <p className="muted" style={{ marginTop: 0 }}>
          {d.source.note}
        </p>

        <div className="tp-list">
          {d.projects.map((p) => (
            <article key={p.id} className="tp-card">
              <div className="tp-head">
                <span className={`pill ${p.status === 'Active' ? 'pill-live' : 'pill-done'}`}>
                  <span className="dot" />
                  {p.status}
                </span>
                {p.programmeAcronym && (
                  <span className="tp-prog" title={p.programme}>
                    {p.programmeAcronym}
                  </span>
                )}
                <span className="tp-dates">
                  {p.started}
                  {p.ended ? ` – ${p.ended}` : ''}
                </span>
              </div>

              <h4 className="tp-title">
                <a href={p.url} target="_blank" rel="noopener noreferrer">
                  {p.title}
                  <Icon.External style={{ display: 'inline', verticalAlign: '-1px', marginLeft: 5 }} />
                </a>
              </h4>

              <div className="tp-centre">
                {p.leadOrganisation}
                {p.directorate ? ` · ${p.directorate}` : ''}
              </div>

              <p className="tp-desc">{p.description}</p>

              {p.benefits && (
                <p className="tp-benefit">
                  <strong>Why NASA is funding it: </strong>
                  {p.benefits}
                </p>
              )}

              <TrlMeter current={p.trlCurrent} begin={p.trlBegin} end={p.trlEnd} />
            </article>
          ))}
        </div>

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
          Descriptions above are excerpts of NASA’s own project text, shortened at a sentence boundary and
          linked to the full record. This is a snapshot taken on {formatDate(d.generatedAt)}; TechPort is
          updated continually.
        </p>
      </div>
    </div>
  )
}
