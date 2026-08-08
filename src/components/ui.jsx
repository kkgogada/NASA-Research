/**
 * Shared presentational components.
 *
 * The provenance system lives here. Everything a reader sees falls into exactly
 * one of three categories, and each is given a distinct badge, colour and
 * container:
 *
 *   OFFICIAL SOURCE  — facts drawn from NASA publications, always with a link.
 *   APP SUMMARY      — plain-language explanation written by this project.
 *   PERSONAL NOTE    — text the user wrote themselves.
 *
 * A fourth marker, SAMPLE CONTENT, flags bundled offline data shown because a
 * live API call did not succeed.
 */

import { href } from '../lib/router.js'

/* ------------------------------------------------------------------ Icons */

export const Icon = {
  Search: (p) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...p}>
      <circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" />
    </svg>
  ),
  External: (p) => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M14 4h6v6" /><path d="M20 4l-9 9" /><path d="M18 14v5a1 1 0 01-1 1H5a1 1 0 01-1-1V7a1 1 0 011-1h5" />
    </svg>
  ),
  Bookmark: ({ filled, ...p }) => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinejoin="round" {...p}>
      <path d="M6 3h12a1 1 0 011 1v17l-7-4.5L5 21V4a1 1 0 011-1z" />
    </svg>
  ),
  Verified: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 2l2.4 2.1 3.2-.4 1 3 2.8 1.6-1.2 3 1.2 3-2.8 1.6-1 3-3.2-.4L12 22l-2.4-2.1-3.2.4-1-3L2.6 15.7l1.2-3-1.2-3L5.4 7.1l1-3 3.2.4z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),
  Pencil: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M4 20h4l10-10-4-4L4 16z" /><path d="M13.5 6.5l4 4" />
    </svg>
  ),
  Sparkle: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z" /><path d="M18 16.5l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z" />
    </svg>
  ),
  Compare: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 3v18" /><path d="M6 7H3l3-4 3 4H6zM6 7v10" /><path d="M18 17h3l-3 4-3-4h3zM18 17V7" />
    </svg>
  ),
  Quote: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M7 7H4v5h3l-1 5" /><path d="M17 7h-3v5h3l-1 5" />
    </svg>
  ),
  Clock: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" />
    </svg>
  ),
  Book: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M4 5a2 2 0 012-2h13v16H6a2 2 0 00-2 2z" /><path d="M8 7h7" /><path d="M8 11h7" />
    </svg>
  ),
  Warning: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 4l9 16H3z" /><path d="M12 10v4" /><path d="M12 17.5v.5" />
    </svg>
  ),
}

/* ------------------------------------------------------------ Provenance */

const PROV = {
  official: { cls: 'prov-official', label: 'Official source', I: Icon.Verified },
  app: { cls: 'prov-app', label: 'App summary', I: Icon.Sparkle },
  note: { cls: 'prov-note', label: 'Personal note', I: Icon.Pencil },
  sample: { cls: 'prov-sample', label: 'Sample content', I: Icon.Warning },
}

export function Provenance({ kind = 'official', label, onDark = false, title }) {
  const meta = PROV[kind] || PROV.official
  const I = meta.I
  return (
    <span
      className={`prov ${meta.cls}${onDark ? ' on-dark' : ''}`}
      title={title || PROV_HELP[kind]}
    >
      <I className="prov-icon" />
      {label || meta.label}
    </span>
  )
}

export const PROV_HELP = {
  official: 'Drawn from official NASA publications. A source link is provided.',
  app: 'A plain-language explanation written by this project, not by NASA.',
  note: 'Written by you and stored only in this browser.',
  sample: 'Bundled offline content shown because a live request did not succeed.',
}

/** A content block whose provenance is stated in its own header. */
export function Block({ kind = 'official', title, children, sources, extra }) {
  const meta = PROV[kind] || PROV.official
  return (
    <div className={`block block-${kind === 'sample' ? 'official' : kind}`}>
      <div className="block-head">
        <Provenance kind={kind} />
        <span>{title}</span>
        {extra}
      </div>
      <div className="block-body">
        {children}
        {sources && sources.length > 0 && (
          <div className="mt-m">
            <SourceList sources={sources} compact />
          </div>
        )}
      </div>
    </div>
  )
}

/* --------------------------------------------------------------- Sources */

export function SourceList({ sources = [], compact = false }) {
  if (!sources.length) return null
  return (
    <div className="sources">
      {!compact && (
        <div className="attribution" style={{ marginBottom: 4 }}>
          <Provenance kind="official" label="Official sources" />
        </div>
      )}
      {sources.map((s) => (
        <a key={s.url} className="source-link" href={s.url} target="_blank" rel="noopener noreferrer">
          <Icon.External />
          <span>
            {s.label}
            <span className="src-url">{s.url}</span>
          </span>
        </a>
      ))}
    </div>
  )
}

/* ---------------------------------------------------------------- Status */

export function StatusPill({ status, meta }) {
  const m = meta[status] || { label: status, tone: 'done' }
  return (
    <span className={`pill pill-${m.tone}`}>
      <span className="dot" />
      {m.label}
    </span>
  )
}

/* ------------------------------------------------------------ Save button */

export function SaveButton({ entry, board, onDark = false, label = 'Save' }) {
  const saved = board.isSaved(entry.type, entry.id)
  return (
    <button
      type="button"
      className={`save-btn${saved ? ' saved' : ''}${onDark ? ' on-dark' : ''}`}
      aria-pressed={saved}
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        board.toggle(entry)
      }}
    >
      <Icon.Bookmark filled={saved} />
      {saved ? 'Saved' : label}
    </button>
  )
}

/* ------------------------------------------------------------- Formatting */

export function formatDate(iso) {
  if (!iso) return null
  const d = new Date(`${iso}T00:00:00Z`)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })
}

export function shortDate(iso) {
  if (!iso) return ''
  const d = new Date(`${iso}T00:00:00Z`)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString('en-GB', { month: 'short', year: 'numeric', timeZone: 'UTC' })
}

/* ------------------------------------------------------------- Navigation */

export function Breadcrumb({ trail }) {
  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      {trail.map((t, i) => (
        <span key={t.label} style={{ display: 'contents' }}>
          {i > 0 && <span aria-hidden="true">›</span>}
          {t.to ? <a href={href(t.to)}>{t.label}</a> : <span>{t.label}</span>}
        </span>
      ))}
    </nav>
  )
}

export function SectionHead({ eyebrow, title, note, action, red = false }) {
  return (
    <div className="section-head">
      <div>
        {eyebrow && <div className={`eyebrow${red ? ' red' : ''}`}>{eyebrow}</div>}
        <h2 className="section-title">{title}</h2>
        {note && <p className="section-note">{note}</p>}
      </div>
      {action}
    </div>
  )
}

export function Empty({ title, children, action }) {
  return (
    <div className="empty">
      <h3>{title}</h3>
      <p>{children}</p>
      {action}
    </div>
  )
}
