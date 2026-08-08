/**
 * Explore — the discovery surface.
 *
 * Search runs locally over bundled data so it works offline. Two network-backed
 * strips (recent astronomy imagery and a live image search) are isolated: each
 * reports its own state and falls back to verified offline content, clearly
 * marked, without affecting the rest of the page.
 */

import { useEffect, useMemo, useState } from 'react'
import { MISSIONS } from '../data/missions.js'
import { TOPICS } from '../data/topics.js'
import { COLLECTIONS } from '../data/collections.js'
import { fallbackFor } from '../data/imagery.js'
import { searchAll, SUGGESTED_QUERIES } from '../lib/search.js'
import { fetchApod, getApiKey, provenanceNote, searchImages, setApiKey, usingDemoKey } from '../lib/nasaApi.js'
import { href } from '../lib/router.js'
import { CollectionCard, MissionCard, TopicCard } from '../components/cards.jsx'
import { Figure, ImageSkeleton, NasaImage } from '../components/NasaImage.jsx'
import { Empty, Icon, Provenance, SectionHead, StatusPill } from '../components/ui.jsx'
import { STATUS_META } from '../data/missions.js'

const FEATURED = ['perseverance', 'webb', 'europa-clipper', 'artemis-i']

export default function Explore({ board }) {
  const [query, setQuery] = useState('')
  const results = useMemo(() => searchAll(query), [query])
  const searching = query.trim().length > 0

  return (
    <div className="wrap">
      <Hero />

      <section id="search" style={{ marginTop: 44 }}>
        <SearchPanel query={query} setQuery={setQuery} />
        {searching ? (
          <SearchResults results={results} query={query} board={board} />
        ) : (
          <Discovery board={board} />
        )}
      </section>
    </div>
  )
}

/* -------------------------------------------------------------------- Hero */

function Hero() {
  const img = fallbackFor('jwst')[0]
  return (
    <section style={{ marginTop: 34 }}>
      <div className="hero">
        <NasaImage item={img} className="hero-img" />
        <div className="hero-scrim">
          <div className="hero-meta">
            <Provenance kind="official" onDark label="NASA imagery" />
            <span className="muted-dark" style={{ fontSize: 12 }}>
              {img?.title} · {img?.center} · {img?.date}
            </span>
          </div>
          <h1 className="hero-title">Find the mission behind the question</h1>
          <p className="lede" style={{ marginTop: 12, marginBottom: 4 }}>
            A study tool for NASA missions and research areas — plain-language explanations, the scientific
            questions each mission was built to answer, and a direct link to the official source for every
            fact. Built by a student, not by NASA.
          </p>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ Search */

function SearchPanel({ query, setQuery }) {
  return (
    <>
      <div className="searchbar">
        <Icon.Search />
        <input
          type="search"
          value={query}
          placeholder="Search missions, research areas, instruments, terms…"
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search missions and research topics"
        />
        {query && (
          <button className="search-clear" onClick={() => setQuery('')}>
            Clear
          </button>
        )}
      </div>
      <div className="row mt-s" style={{ gap: 8 }}>
        <span className="muted-dark" style={{ fontSize: 12.5 }}>Try:</span>
        <div className="chips">
          {SUGGESTED_QUERIES.map((q) => (
            <button key={q} className={`chip${query === q ? ' on' : ''}`} onClick={() => setQuery(q)}>
              {q}
            </button>
          ))}
        </div>
      </div>
      <p className="muted-dark mt-s" style={{ fontSize: 12.5 }}>
        Search runs entirely in your browser over this app’s reference data, so it keeps working when the
        network does not.
      </p>
    </>
  )
}

function SearchResults({ results, query, board }) {
  if (!results.total) {
    return (
      <div className="mt-l">
        <Empty title={`No matches for “${query}”`}>
          This app covers a curated set of missions and research areas rather than everything NASA does. Try a
          broader word, or browse the full mission list — and for anything not covered here, start from the
          official NASA Science site linked in the footer.
        </Empty>
      </div>
    )
  }

  return (
    <div className="mt-l">
      <p className="muted-dark" style={{ marginBottom: 20 }}>
        {results.total} {results.total === 1 ? 'match' : 'matches'} for <strong style={{ color: '#fff' }}>“{query}”</strong>
      </p>

      {results.missions.length > 0 && (
        <>
          <SectionHead eyebrow="Missions" title={`${results.missions.length} matching missions`} />
          <div className="grid grid-3">
            {results.missions.map((m) => (
              <MissionCard key={m.slug} mission={m} board={board} />
            ))}
          </div>
        </>
      )}

      {results.topics.length > 0 && (
        <section>
          <SectionHead eyebrow="Research areas" title={`${results.topics.length} matching topics`} />
          <div className="grid grid-3">
            {results.topics.map((t) => (
              <TopicCard
                key={t.id}
                topic={t}
                board={board}
                missionCount={MISSIONS.filter((m) => m.topics.includes(t.id)).length}
              />
            ))}
          </div>
        </section>
      )}

      {results.collections.length > 0 && (
        <section>
          <SectionHead eyebrow="Collections" title="Matching collections" />
          <div className="grid grid-2">
            {results.collections.map((c) => (
              <CollectionCard key={c.id} collection={c} />
            ))}
          </div>
        </section>
      )}

      {results.terms.length > 0 && (
        <section>
          <SectionHead
            eyebrow="Glossary"
            title={`${results.terms.length} matching terms`}
            note="Definitions written by this project to make source material easier to read."
          />
          <div className="terms-list">
            {results.terms.slice(0, 8).map((t) => (
              <div key={t.key} className="term">
                <dt>{t.label}</dt>
                <dd>{t.definition}</dd>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

/* --------------------------------------------------------------- Discovery */

function Discovery({ board }) {
  const featured = FEATURED.map((s) => MISSIONS.find((m) => m.slug === s)).filter(Boolean)

  return (
    <>
      <section>
        <SectionHead
          eyebrow="Featured missions"
          title="Start with a mission"
          note="Each mission page states its purpose, objectives, instruments and the questions it was designed to answer — with the official NASA source alongside."
          action={<a className="link-more" href={href('/missions')}>All {MISSIONS.length} missions →</a>}
        />
        <div className="grid grid-3">
          {featured.map((m) => (
            <MissionCard key={m.slug} mission={m} board={board} />
          ))}
        </div>
      </section>

      <ApodStrip />

      <section>
        <SectionHead
          eyebrow="Research areas"
          title="Or start with a field of study"
          note="Eight areas covering what NASA researches, from aeronautics inside our atmosphere to astrophysics beyond the galaxy."
          action={<a className="link-more" href={href('/topics')}>All research areas →</a>}
        />
        <div className="grid grid-4">
          {TOPICS.map((t) => (
            <TopicCard
              key={t.id}
              topic={t}
              board={board}
              missionCount={MISSIONS.filter((m) => m.topics.includes(t.id)).length}
            />
          ))}
        </div>
      </section>

      <ImageStrip />

      <section>
        <SectionHead
          eyebrow="Curated collections"
          title="Themed reading paths"
          red
          note="Groupings assembled by this project to show how separate missions approach a shared question. These are editorial selections, not NASA groupings."
        />
        <div className="grid grid-2">
          {COLLECTIONS.map((c) => (
            <CollectionCard key={c.id} collection={c} />
          ))}
        </div>
      </section>

      <MissionStatusStrip />
    </>
  )
}

/* ------------------------------------------------- Network-backed sections */

function ApodStrip() {
  const [state, setState] = useState({ status: 'loading', items: [], error: null, source: null })
  const [keyInput, setKeyInput] = useState('')
  const [savedKey, setSavedKey] = useState(getApiKey())

  useEffect(() => {
    let live = true
    setState((s) => ({ ...s, status: 'loading' }))
    fetchApod({ count: 4 }).then((res) => {
      if (!live) return
      if (res.ok) setState({ status: 'ready', items: res.data, error: null, source: 'live' })
      else setState({ status: 'ready', items: [], error: res.error, source: 'fallback' })
    })
    return () => {
      live = false
    }
  }, [savedKey])

  const applyKey = () => {
    setApiKey(keyInput)
    setSavedKey(getApiKey())
    setKeyInput('')
  }

  const offline = state.status === 'ready' && state.source === 'fallback'
  const fallbackImages = fallbackFor('hubble').concat(fallbackFor('jwst')).slice(0, 4)

  return (
    <section>
      <SectionHead
        eyebrow="Recent astronomy imagery"
        title="Astronomy Picture of the Day"
        note="Retrieved live from NASA’s public APOD API. Each entry links to its original page, where the explanation is written by professional astronomers."
        action={
          <a className="link-more" href="https://apod.nasa.gov/apod/astropix.html" target="_blank" rel="noopener noreferrer">
            Visit APOD <Icon.External style={{ display: 'inline', verticalAlign: '-1px' }} />
          </a>
        }
      />

      <div className="status-strip" style={{ marginBottom: 18 }}>
        {state.status === 'loading' ? (
          <span>Contacting the NASA APOD API…</span>
        ) : (
          <>
            <Provenance kind={offline ? 'sample' : 'official'} onDark />
            <span className="grow">{provenanceNote(state.source, state.error)}</span>
            {offline && (
              <>
                <input
                  type="text"
                  value={keyInput}
                  onChange={(e) => setKeyInput(e.target.value)}
                  placeholder="Your api.nasa.gov key"
                  aria-label="NASA API key"
                />
                <button className="btn btn-ghost btn-sm" onClick={applyKey} disabled={!keyInput.trim()}>
                  Use key
                </button>
                <a className="link-more" href="https://api.nasa.gov/" target="_blank" rel="noopener noreferrer">
                  Get a free key
                </a>
              </>
            )}
          </>
        )}
      </div>

      {offline && (
        <p className="muted-dark" style={{ marginTop: -6, marginBottom: 16, fontSize: 13 }}>
          {usingDemoKey()
            ? 'The shared DEMO_KEY is rate limited and may be blocked on some networks. '
            : ''}
          Showing verified images from the NASA Image and Video Library instead — these are real, attributed
          NASA assets bundled with this app, not today’s APOD entries.
        </p>
      )}

      <div className="grid grid-4">
        {state.status === 'loading' ? (
          <ImageSkeleton count={4} />
        ) : offline ? (
          fallbackImages.map((img) => <Figure key={img.id} item={img} isSample aspect="1 / 1" />)
        ) : (
          state.items.map((item) => (
            <figure key={item.id} className="figure">
              <NasaImage item={item} aspect="1 / 1" />
              <figcaption className="figcaption">
                <strong>{item.title}</strong>
                <div className="fig-credit">
                  <Provenance kind="official" onDark label="NASA APOD" />
                  <span>{item.date}</span>
                  {item.credit && <span>· {item.credit}</span>}
                </div>
                <div style={{ marginTop: 7 }}>
                  <a href={item.pageUrl} target="_blank" rel="noopener noreferrer">
                    Read the official explanation <Icon.External style={{ display: 'inline', verticalAlign: '-1px' }} />
                  </a>
                </div>
              </figcaption>
            </figure>
          ))
        )}
      </div>
    </section>
  )
}

function ImageStrip() {
  const TOPIC_QUERIES = [
    { label: 'Mars surface', query: 'Mars surface rover', key: 'perseverance-rover' },
    { label: 'Earth from orbit', query: 'Earth from space station', key: 'iss' },
    { label: 'Outer planets', query: 'Jupiter Saturn spacecraft', key: 'juno' },
  ]
  const [active, setActive] = useState(0)
  const [state, setState] = useState({ status: 'loading', items: [], error: null, source: null })

  useEffect(() => {
    let live = true
    setState({ status: 'loading', items: [], error: null, source: null })
    searchImages(TOPIC_QUERIES[active].query, { pageSize: 4 }).then((res) => {
      if (!live) return
      if (res.ok) setState({ status: 'ready', items: res.data.slice(0, 4), error: null, source: 'live' })
      else
        setState({
          status: 'ready',
          items: fallbackFor(TOPIC_QUERIES[active].key).slice(0, 4),
          error: res.error,
          source: 'fallback',
        })
    })
    return () => {
      live = false
    }
  }, [active])

  const offline = state.source === 'fallback'

  return (
    <section>
      <SectionHead
        eyebrow="Imagery archive"
        title="Search the official image library"
        note="Live results from the NASA Image and Video Library API. Every image keeps its title, centre, date and a link to its official record."
        action={
          <a className="link-more" href="https://images.nasa.gov/" target="_blank" rel="noopener noreferrer">
            Open images.nasa.gov <Icon.External style={{ display: 'inline', verticalAlign: '-1px' }} />
          </a>
        }
      />

      <div className="row" style={{ marginBottom: 16 }}>
        <div className="chips">
          {TOPIC_QUERIES.map((t, i) => (
            <button key={t.label} className={`chip${active === i ? ' on' : ''}`} onClick={() => setActive(i)}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {state.status === 'ready' && (
        <div className="status-strip" style={{ marginBottom: 18 }}>
          <Provenance kind={offline ? 'sample' : 'official'} onDark />
          <span className="grow">{provenanceNote(state.source, state.error)}</span>
        </div>
      )}

      <div className="grid grid-4">
        {state.status === 'loading' ? (
          <ImageSkeleton count={4} />
        ) : (
          state.items.map((img) => <Figure key={img.id} item={img} isSample={offline} aspect="1 / 1" />)
        )}
      </div>
    </section>
  )
}

/* -------------------------------------------------------- Status overview */

function MissionStatusStrip() {
  const groups = ['active', 'in-transit', 'in-testing', 'planned', 'completed']
  return (
    <section>
      <SectionHead
        eyebrow="At a glance"
        title="Mission status across this collection"
        note="Status reflects what the official mission pages describe. Where a schedule is forward-looking, this app links to the source rather than printing a date."
      />
      <div className="grid grid-4">
        {groups.map((g) => {
          const list = MISSIONS.filter((m) => m.status === g)
          if (!list.length) return null
          return (
            <div key={g} className="panel">
              <div className="row row-tight" style={{ marginBottom: 12 }}>
                <StatusPill status={g} meta={STATUS_META} />
                <span className="muted-dark">{list.length}</span>
              </div>
              <ul className="panel-list">
                {list.map((m) => (
                  <li key={m.slug}>
                    <a href={href(`/mission/${m.slug}`)}>
                      <span>{m.name}</span>
                      <span className="muted-dark" style={{ fontSize: 11.5 }}>{m.destinationClass}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>
    </section>
  )
}
