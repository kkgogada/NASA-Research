/**
 * Application chrome: navigation and footer.
 * The footer carries the independence disclaimer, which appears on every page.
 */

import { useState } from 'react'
import { href } from '../lib/router.js'
import { OFFICIAL_PORTALS } from '../data/collections.js'
import { Icon, PROV_HELP, Provenance } from './ui.jsx'

/* `also` lists the detail-route prefixes that should keep a section lit —
   stated explicitly rather than derived from the label, which was fragile. */
const NAV = [
  { to: '/', label: 'Explore', also: ['/collection/'] },
  { to: '/missions', label: 'Missions', also: ['/mission/'] },
  { to: '/topics', label: 'Research topics', also: ['/topic/'] },
  { to: '/timeline', label: 'Timeline' },
  { to: '/glossary', label: 'Glossary' },
  { to: '/compare', label: 'Compare' },
  { to: '/board', label: 'Saved board' },
]

export function Nav({ route, savedCount }) {
  const [open, setOpen] = useState(false)
  const isActive = (item) => {
    if (item.to === '/') {
      return route.path === '/' || (item.also || []).some((p) => route.path.startsWith(p))
    }
    return route.path === item.to || (item.also || []).some((p) => route.path.startsWith(p))
  }

  return (
    <header className="nav">
      <div className="wrap nav-inner">
        <a className="brand" href={href('/')} onClick={() => setOpen(false)}>
          <span className="brand-mark" />
          <span className="brand-text">
            <span className="brand-title">NASA Research Explorer</span>
            <span className="brand-sub">Independent student project</span>
          </span>
        </a>

        <button
          className="nav-toggle"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Toggle navigation"
        >
          {open ? 'Close' : 'Menu'}
        </button>

        <nav className={`nav-links${open ? ' open' : ''}`}>
          {NAV.map((n) => (
            <a
              key={n.to}
              className={`nav-link${isActive(n) ? ' active' : ''}`}
              href={href(n.to)}
              onClick={() => setOpen(false)}
            >
              {n.label}
              {n.to === '/board' && savedCount > 0 && <span className="nav-count">{savedCount}</span>}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="disclaimer">
          <h4>Independent educational project — not an official NASA product</h4>
          <p>
            NASA Research Explorer is a student research tool built for learning. It is{' '}
            <strong>not affiliated with, endorsed by, or produced by NASA</strong> or any other government
            agency. It does not use NASA’s insignia, logotype or official branding. Names of missions and
            programmes are used descriptively to refer to publicly documented work.
          </p>
          <p>
            Factual content is drawn from official NASA publications and is linked to its source so you can
            verify it yourself. Plain-language overviews are written by this project and are labelled as app
            summaries, not as NASA text. This application does not reproduce quotations, and it does not
            generate mission facts, findings or source links of its own. If a statement here disagrees with an
            official NASA page, the official page is correct — please rely on it.
          </p>
          <p>
            Imagery is retrieved from the{' '}
            <a href="https://images.nasa.gov/" target="_blank" rel="noopener noreferrer">
              NASA Image and Video Library
            </a>
            . Reuse is subject to{' '}
            <a
              href="https://www.nasa.gov/nasa-brand-center/images-and-media/"
              target="_blank"
              rel="noopener noreferrer"
            >
              NASA’s media usage guidelines
            </a>
            . Always cite the original source, not this application, in academic work.
          </p>
        </div>

        <div className="footer-cols">
          <div>
            <h5>How to read this app</h5>
            <ul>
              <li>
                <span className="row row-tight">
                  <Provenance kind="official" onDark />
                </span>
                <div className="muted-dark" style={{ fontSize: 12.5, marginTop: 5 }}>{PROV_HELP.official}</div>
              </li>
              <li>
                <span className="row row-tight">
                  <Provenance kind="app" onDark />
                </span>
                <div className="muted-dark" style={{ fontSize: 12.5, marginTop: 5 }}>{PROV_HELP.app}</div>
              </li>
              <li>
                <span className="row row-tight">
                  <Provenance kind="note" onDark />
                </span>
                <div className="muted-dark" style={{ fontSize: 12.5, marginTop: 5 }}>{PROV_HELP.note}</div>
              </li>
              <li>
                <span className="row row-tight">
                  <Provenance kind="sample" onDark />
                </span>
                <div className="muted-dark" style={{ fontSize: 12.5, marginTop: 5 }}>{PROV_HELP.sample}</div>
              </li>
            </ul>
          </div>

          <div>
            <h5>Start from a primary source</h5>
            <ul>
              {OFFICIAL_PORTALS.slice(0, 5).map((p) => (
                <li key={p.url}>
                  <a href={p.url} target="_blank" rel="noopener noreferrer">
                    {p.label} <Icon.External style={{ display: 'inline', verticalAlign: '-1px' }} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5>Data and archives</h5>
            <ul>
              {OFFICIAL_PORTALS.slice(5).map((p) => (
                <li key={p.url}>
                  <a href={p.url} target="_blank" rel="noopener noreferrer">
                    {p.label} <Icon.External style={{ display: 'inline', verticalAlign: '-1px' }} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5>In this app</h5>
            <ul>
              <li><a href={href('/missions')}>All missions</a></li>
              <li><a href={href('/topics')}>All research topics</a></li>
              <li><a href={href('/timeline')}>Mission timeline</a></li>
              <li><a href={href('/glossary')}>Glossary</a></li>
              <li><a href={href('/compare')}>Comparison workspace</a></li>
              <li><a href={href('/board')}>Saved research board</a></li>
            </ul>
          </div>
        </div>

        <p className="footer-note">
          Your saved items and notes are stored only in this browser’s local storage. Nothing you write is
          uploaded, and this project has no account system and no server of its own. Clearing your browser
          data will delete your board — use the export option on the board page to keep a copy.
        </p>
      </div>
    </footer>
  )
}
