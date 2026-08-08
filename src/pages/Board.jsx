/**
 * Saved research board — bookmarks plus personal notes.
 *
 * Notes are always rendered in the amber "personal note" treatment so they can
 * never be mistaken for sourced material or for an app summary. Each saved item
 * keeps the official source link it was saved with, so the board stays citable.
 */

import { useState } from 'react'
import { boardToText } from '../lib/board.js'
import { STYLES, boardBibliography, copyText } from '../lib/citation.js'
import { href } from '../lib/router.js'
import {
  Breadcrumb,
  Empty,
  Icon,
  Provenance,
  SectionHead,
  formatDate,
} from '../components/ui.jsx'

export default function Board({ board }) {
  const { items } = board
  const [confirmClear, setConfirmClear] = useState(false)

  const exportText = () => {
    const blob = new Blob([boardToText(items)], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'nasa-research-board.txt'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const missions = items.filter((i) => i.type === 'mission')
  const topics = items.filter((i) => i.type === 'topic')
  const withNotes = items.filter((i) => i.note && i.note.trim())

  return (
    <div className="wrap">
      <div style={{ paddingTop: 30 }}>
        <Breadcrumb trail={[{ label: 'Explore', to: '/' }, { label: 'Saved research board' }]} />
        <SectionHead
          eyebrow="Saved research"
          title="Your research board"
          note="Bookmarked missions and topics, with space for your own notes. Everything here is stored in this browser only — there is no account and nothing is uploaded."
          action={
            items.length > 0 && (
              <div className="row row-tight">
                <button className="btn btn-ghost btn-sm" onClick={exportText}>
                  Export as text
                </button>
                {confirmClear ? (
                  <>
                    <button
                      className="btn btn-red btn-sm"
                      onClick={() => {
                        board.clearAll()
                        setConfirmClear(false)
                      }}
                    >
                      Delete everything
                    </button>
                    <button className="btn btn-ghost btn-sm" onClick={() => setConfirmClear(false)}>
                      Cancel
                    </button>
                  </>
                ) : (
                  <button className="btn btn-ghost btn-sm" onClick={() => setConfirmClear(true)}>
                    Clear board
                  </button>
                )}
              </div>
            )
          }
        />
      </div>

      {items.length === 0 ? (
        <Empty
          title="Nothing saved yet"
          action={
            <div className="row" style={{ justifyContent: 'center' }}>
              <a className="btn btn-primary" href={href('/missions')}>
                Browse missions
              </a>
              <a className="btn btn-ghost" href={href('/topics')}>
                Browse research topics
              </a>
            </div>
          }
        >
          Use the Save button on any mission, research topic or comparison to add it here. Each saved item
          keeps its official NASA source link, and you can attach your own notes for later review.
        </Empty>
      ) : (
        <>
          <div className="status-strip" style={{ marginBottom: 22 }}>
            <span className="grow">
              <strong style={{ color: '#fff' }}>{items.length}</strong> saved ·{' '}
              {missions.length} {missions.length === 1 ? 'mission' : 'missions'} ·{' '}
              {topics.length} {topics.length === 1 ? 'topic' : 'topics'} ·{' '}
              {withNotes.length} with notes
            </span>
            <Provenance kind="note" onDark label="Notes are yours" />
          </div>

          <Bibliography items={items} />

          <div className="stack">
            {items.map((item) => (
              <BoardItem key={item.key} item={item} board={board} />
            ))}
          </div>

          <div className="status-strip mt-l">
            <Icon.Warning style={{ width: 16, height: 16, flexShrink: 0, color: 'var(--amber)' }} />
            <span className="grow">
              Clearing your browser data will delete this board. Export a text copy if you need to keep it —
              the export includes your notes and every official source link.
            </span>
            <button className="btn btn-ghost btn-sm" onClick={exportText}>
              Export
            </button>
          </div>
        </>
      )}
    </div>
  )
}

/**
 * One bibliography for the whole board, in the student's chosen style.
 * Every entry cites the NASA page the item was saved with — never this app.
 */
function Bibliography({ items }) {
  const [style, setStyle] = useState('apa')
  const [copied, setCopied] = useState(false)
  const [open, setOpen] = useState(false)

  const cited = items.filter((i) => i.sourceUrl)
  if (!cited.length) return null

  const text = boardBibliography(items, style)

  const doCopy = async () => {
    const ok = await copyText(text)
    setCopied(ok)
    setTimeout(() => setCopied(false), 2200)
  }

  if (!open) {
    return (
      <div className="status-strip" style={{ marginBottom: 22 }}>
        <Icon.Quote style={{ width: 16, height: 16, flexShrink: 0 }} />
        <span className="grow">
          Build a bibliography from all {cited.length} saved {cited.length === 1 ? 'source' : 'sources'} in
          APA, MLA, Chicago or BibTeX.
        </span>
        <button className="btn btn-primary btn-sm" onClick={() => setOpen(true)}>
          Generate bibliography
        </button>
      </div>
    )
  }

  return (
    <div className="cite" style={{ marginBottom: 22, marginTop: 0 }}>
      <div className="cite-head">
        <Provenance kind="official" label="Cites the NASA sources" />
        <span style={{ fontWeight: 600, fontSize: 13 }}>
          Bibliography — {cited.length} {cited.length === 1 ? 'source' : 'sources'}
        </span>
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
          <span className="muted">Retrieval date included, as APA and MLA require for pages that change.</span>
        </div>
      </div>
    </div>
  )
}

function BoardItem({ item, board }) {
  const [note, setNote] = useState(item.note || '')
  const [editing, setEditing] = useState(false)
  const dirty = note !== (item.note || '')

  const save = () => {
    board.setNote(item.key, note.trim())
    setEditing(false)
  }

  return (
    <div className="card">
      <div className="board-item">
        <div className="board-thumb">
          {item.imageUrl ? (
            <img src={item.imageUrl} alt="" loading="lazy" />
          ) : (
            <div className="img-fallback" style={{ height: '100%' }} />
          )}
        </div>

        <div className="card-body">
          <div className="row row-tight" style={{ justifyContent: 'space-between' }}>
            <span className="card-sub">
              {item.type === 'mission' ? 'Mission' : 'Research area'}
              {item.subtitle ? ` · ${item.subtitle}` : ''}
            </span>
            <button
              className="btn btn-light btn-sm"
              onClick={() => board.remove(item.key)}
              aria-label={`Remove ${item.title} from board`}
            >
              Remove
            </button>
          </div>

          <h3 className="card-title">
            <a href={href(item.href)} style={{ textDecoration: 'none', color: 'inherit' }}>
              {item.title}
            </a>
          </h3>

          {item.sourceUrl && (
            <a
              className="source-link"
              href={item.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ padding: '9px 11px' }}
            >
              <Icon.External />
              <span>
                {item.sourceLabel || 'Official NASA source'}
                <span className="src-url">{item.sourceUrl}</span>
              </span>
            </a>
          )}

          {/* Personal note — always visually distinct from sourced material */}
          <div className="block block-note" style={{ marginTop: 12 }}>
            <div className="block-head">
              <Provenance kind="note" />
              <span>Your note</span>
              {item.noteUpdatedAt && !editing && (
                <span style={{ marginLeft: 'auto', fontSize: 11.5, fontWeight: 400, opacity: 0.75 }}>
                  updated {new Date(item.noteUpdatedAt).toLocaleDateString('en-GB')}
                </span>
              )}
            </div>
            <div className="block-body">
              {editing || !item.note ? (
                <>
                  <textarea
                    className="note-area"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="What did you want to remember about this? Questions to follow up, how it connects to your assignment, what to check in the source…"
                  />
                  <div className="row mt-s">
                    <button className="btn btn-primary btn-sm" onClick={save} disabled={!dirty}>
                      Save note
                    </button>
                    {item.note && (
                      <button
                        className="btn btn-light btn-sm"
                        onClick={() => {
                          setNote(item.note)
                          setEditing(false)
                        }}
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <p style={{ whiteSpace: 'pre-wrap', margin: 0 }}>{item.note}</p>
                  <div className="row mt-s">
                    <button className="btn btn-light btn-sm" onClick={() => setEditing(true)}>
                      <Icon.Pencil style={{ width: 13, height: 13 }} />
                      Edit note
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="card-foot">
            <span className="muted">
              Saved {formatDate((item.savedAt || '').slice(0, 10)) || '—'}
            </span>
            <a className="link-more" href={href(item.href)} style={{ marginLeft: 'auto', color: 'var(--blue-deep)' }}>
              Open detail page →
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
