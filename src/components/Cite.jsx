/**
 * "Cite this" panel.
 *
 * Renders a ready-to-paste citation for each official source attached to a
 * subject, in the student's choice of style. The citation names NASA and the
 * NASA page — never this application — and carries a retrieval date, because
 * these pages are updated over time.
 */

import { useState } from 'react'
import { STYLES, copyText, formatAll } from '../lib/citation.js'
import { Icon, Provenance } from './ui.jsx'

export default function Cite({ sources = [], heading = 'Cite these sources' }) {
  const [style, setStyle] = useState('apa')
  const [copied, setCopied] = useState(false)
  const [open, setOpen] = useState(false)

  if (!sources.length) return null

  const text = formatAll(sources, style)

  const doCopy = async () => {
    const ok = await copyText(text)
    setCopied(ok)
    setTimeout(() => setCopied(false), 2200)
  }

  if (!open) {
    return (
      <button className="btn btn-light btn-sm" onClick={() => setOpen(true)}>
        <Icon.Quote style={{ width: 14, height: 14 }} />
        Cite this
      </button>
    )
  }

  return (
    <div className="cite">
      <div className="cite-head">
        <Provenance kind="official" label="Cites the NASA source" />
        <span style={{ fontWeight: 600, fontSize: 13 }}>{heading}</span>
        <button className="btn btn-light btn-sm" style={{ marginLeft: 'auto' }} onClick={() => setOpen(false)}>
          Close
        </button>
      </div>

      <div className="cite-body">
        <div className="chips" style={{ marginBottom: 12 }}>
          {STYLES.map((s) => (
            <button
              key={s.id}
              className={`chip chip-light${style === s.id ? ' on' : ''}`}
              onClick={() => setStyle(s.id)}
              aria-pressed={style === s.id}
            >
              {s.label}
            </button>
          ))}
        </div>

        <pre className="cite-text">{text}</pre>

        <div className="row mt-s">
          <button className="btn btn-primary btn-sm" onClick={doCopy}>
            {copied ? 'Copied' : `Copy ${STYLES.find((s) => s.id === style).label}`}
          </button>
          <span className="muted">
            {sources.length} {sources.length === 1 ? 'source' : 'sources'} · retrieval date included
          </span>
        </div>

        <p className="muted mt-s" style={{ fontSize: 12 }}>
          Cite the NASA page, not this application. Where NASA does not publish a date on a page, the
          citation uses “n.d.” rather than inventing a year.
        </p>
      </div>
    </div>
  )
}
