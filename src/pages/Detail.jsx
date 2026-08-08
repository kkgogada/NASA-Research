/**
 * Research detail pages — missions, research topics and curated collections.
 *
 * Layout rule for this file: every block of prose sits inside a <Block> whose
 * header states where it came from. A reader scanning the page can tell at a
 * glance which paragraphs are sourced from NASA and which are this project’s
 * own plain-language explanation, without having to read the text first.
 */

import { useEffect, useState } from 'react'
import { MISSIONS, STATUS_META, missionBySlug } from '../data/missions.js'
import { TOPICS, topicById } from '../data/topics.js'
import { COLLECTIONS } from '../data/collections.js'
import { defineTerm, termLabel } from '../data/glossary.js'
import { fallbackFor } from '../data/imagery.js'
import { provenanceNote, searchImages } from '../lib/nasaApi.js'
import { href } from '../lib/router.js'
import { Figure, ImageSkeleton, NasaImage } from '../components/NasaImage.jsx'
import Cite from '../components/Cite.jsx'
import ExoplanetPanel from '../components/ExoplanetPanel.jsx'
import TechPortPanel from '../components/TechPortPanel.jsx'
import EpicPanel from '../components/EpicPanel.jsx'
import GibsPanel from '../components/GibsPanel.jsx'
import Timeline, { buildTimeline } from '../components/Timeline.jsx'
import { MissionCard, TopicCard } from '../components/cards.jsx'
import {
  Block,
  Breadcrumb,
  Empty,
  Icon,
  Provenance,
  SaveButton,
  SectionHead,
  SourceList,
  StatusPill,
  formatDate,
} from '../components/ui.jsx'

/* ==================================================================== */
/* Mission detail                                                        */
/* ==================================================================== */

export function MissionDetail({ slug, board }) {
  const mission = missionBySlug(slug)
  if (!mission) return <NotFound what="mission" />

  const hero = fallbackFor(mission.imageKey)[0]
  const primarySource = mission.sources[0]
  const timeline = buildTimeline(mission)

  return (
    <div className="wrap">
      <div style={{ paddingTop: 26 }}>
        <Breadcrumb
          trail={[
            { label: 'Explore', to: '/' },
            { label: 'Missions', to: '/missions' },
            { label: mission.name },
          ]}
        />
      </div>

      <div className="hero">
        <NasaImage item={hero} className="hero-img" />
        <div className="hero-scrim">
          <div className="hero-meta">
            <StatusPill status={mission.status} meta={STATUS_META} />
            <span className="prov prov-app on-dark">{mission.kind}</span>
            <span className="muted-dark" style={{ fontSize: 12 }}>{mission.program}</span>
          </div>
          <h1 className="hero-title">{mission.name}</h1>
          <p className="lede" style={{ marginTop: 10 }}>{mission.purpose}</p>
          <div className="row mt-s">
            <SaveButton
              onDark
              board={board}
              label="Save to board"
              entry={{
                type: 'mission',
                id: mission.slug,
                title: mission.name,
                subtitle: mission.destination,
                href: `/mission/${mission.slug}`,
                sourceUrl: primarySource?.url,
                sourceLabel: primarySource?.label,
                imageUrl: hero?.thumb || hero?.url || '',
              }}
            />
            <a className="btn btn-ghost btn-sm" href={href(`/compare?a=mission:${mission.slug}`)}>
              <Icon.Compare style={{ width: 14, height: 14 }} />
              Compare
            </a>
            {primarySource && (
              <a className="btn btn-ghost btn-sm" href={primarySource.url} target="_blank" rel="noopener noreferrer">
                Official NASA page <Icon.External />
              </a>
            )}
          </div>
          {hero && (
            <p className="attribution on-dark mt-s" style={{ fontSize: 11 }}>
              Image: {hero.title} · {hero.center} · {hero.date} — NASA Image and Video Library
            </p>
          )}
        </div>
      </div>

      <div className="detail-layout mt-l">
        <div>
          {/* --- Key facts ------------------------------------------------ */}
          <Block kind="official" title="Mission facts, as documented by NASA">
            <dl className="spec-grid">
              <Spec label="Status" value={STATUS_META[mission.status]?.label || mission.status} />
              <Spec label="Type" value={mission.kind} />
              <Spec label="Destination" value={mission.destination} />
              <Spec
                label="Launch date"
                value={mission.launch.date ? formatDate(mission.launch.date) : 'Not asserted'}
                note={mission.launch.date ? mission.launch.note : mission.launch.note}
                mono={!!mission.launch.date}
              />
              {mission.launch.vehicle && <Spec label="Launch vehicle" value={mission.launch.vehicle} />}
              {mission.launch.site && <Spec label="Launch site" value={mission.launch.site} />}
              {mission.arrival?.date && (
                <Spec label="Arrival" value={formatDate(mission.arrival.date)} note={mission.arrival.label} mono />
              )}
              {mission.ended?.date && (
                <Spec label="Mission end" value={formatDate(mission.ended.date)} note={mission.ended.label} mono />
              )}
              <Spec label="Managed by" value={mission.agency} />
            </dl>
            <p className="muted mt-s" style={{ fontSize: 12.5 }}>
              Where a milestone is scheduled rather than completed, this app deliberately shows “not asserted”
              and links to the official page instead of printing a date it cannot attribute.
            </p>
          </Block>

          {/* --- Plain-language overview ---------------------------------- */}
          <Block kind="app" title="Plain-language overview — written by this app, not by NASA">
            <p className="serif">{mission.overview}</p>
            <p className="serif" style={{ marginTop: 14 }}>
              <strong>Why it matters. </strong>
              {mission.whyItMatters}
            </p>
            <p className="muted mt-s" style={{ fontSize: 12.5 }}>
              This summary is an explanation written for students. It introduces no facts beyond those in the
              sourced sections on this page. For NASA’s own wording, follow the official links below.
            </p>
          </Block>

          {/* --- Objectives ----------------------------------------------- */}
          <Block kind="official" title="Scientific objectives">
            <ul className="obj-list">
              {mission.objectives.map((o) => (
                <li key={o}>{o}</li>
              ))}
            </ul>
          </Block>

          {/* --- Key questions -------------------------------------------- */}
          <Block kind="official" title="Key scientific questions this mission addresses">
            <ol className="q-list">
              {mission.keyQuestions.map((q, i) => (
                <li key={q}>
                  <span className="q-num">{i + 1}</span>
                  <span>{q}</span>
                </li>
              ))}
            </ol>
          </Block>

          {/* --- Instruments ---------------------------------------------- */}
          <Block kind="official" title="Instruments and major systems">
            <div>
              {mission.instruments.map((ins) => (
                <div key={ins.name} className="instrument">
                  <div className="instrument-name">{ins.name}</div>
                  <div className="instrument-role">{ins.role}</div>
                </div>
              ))}
            </div>
          </Block>

          {/* --- Timeline -------------------------------------------------- */}
          {timeline.length > 0 && (
            <Block kind="official" title="Mission timeline">
              <Timeline mission={mission} />
            </Block>
          )}

          {/* --- Imagery --------------------------------------------------- */}
          <RelatedImagery
            query={`${mission.name} ${mission.program}`}
            fallbackKey={mission.imageKey}
            title={`Imagery — ${mission.name}`}
          />

          {/* --- Sources --------------------------------------------------- */}
          <Block kind="official" title="Official sources for everything above">
            <SourceList sources={mission.sources} compact />
            <p className="muted mt-s" style={{ fontSize: 12.5 }}>
              Cite these pages, not this application, in academic work. If anything here disagrees with them,
              the official page is authoritative.
            </p>
            <div className="mt-s">
              <Cite sources={mission.sources} heading={`Sources for ${mission.name}`} />
            </div>
          </Block>
        </div>

        {/* --- Sidebar ----------------------------------------------------- */}
        <aside className="sidebar">
          <RelationshipsPanel mission={mission} />
          <TopicsPanel topicIds={mission.topics} />
          <TermsPanel terms={mission.terms} />
          <ComparePanel selfRef={`mission:${mission.slug}`} />
        </aside>
      </div>

      <RelatedMissions mission={mission} board={board} />
    </div>
  )
}

/* ==================================================================== */
/* Topic detail                                                          */
/* ==================================================================== */

/**
 * Some topics have a real dataset behind them, generated at build time from an
 * official NASA source (see scripts/generate-data.mjs). Where one exists it is
 * rendered below the topic's open questions.
 */
const TOPIC_DATA_PANELS = {
  astrophysics: [ExoplanetPanel],
  'space-technology': [TechPortPanel],
  'earth-science': [GibsPanel, EpicPanel],
}

export function TopicDetail({ id, board }) {
  const topic = topicById(id)
  if (!topic) return <NotFound what="research topic" />
  const dataPanels = TOPIC_DATA_PANELS[id] || []

  const hero = fallbackFor(topic.imageKey)[0]
  const missions = MISSIONS.filter((m) => m.topics.includes(topic.id))
  const primarySource = topic.sources[0]

  return (
    <div className="wrap">
      <div style={{ paddingTop: 26 }}>
        <Breadcrumb
          trail={[
            { label: 'Explore', to: '/' },
            { label: 'Research topics', to: '/topics' },
            { label: topic.name },
          ]}
        />
      </div>

      <div className="hero">
        <NasaImage item={hero} className="hero-img" />
        <div className="hero-scrim">
          <div className="hero-meta">
            <span className="prov prov-app on-dark">Research area</span>
            <span className="muted-dark" style={{ fontSize: 12 }}>
              {missions.length} linked {missions.length === 1 ? 'mission' : 'missions'}
            </span>
          </div>
          <h1 className="hero-title">{topic.name}</h1>
          <p className="lede" style={{ marginTop: 10 }}>{topic.tagline}</p>
          <div className="row mt-s">
            <SaveButton
              onDark
              board={board}
              label="Save to board"
              entry={{
                type: 'topic',
                id: topic.id,
                title: topic.name,
                subtitle: 'Research area',
                href: `/topic/${topic.id}`,
                sourceUrl: primarySource?.url,
                sourceLabel: primarySource?.label,
                imageUrl: hero?.thumb || hero?.url || '',
              }}
            />
            <a className="btn btn-ghost btn-sm" href={href(`/compare?a=topic:${topic.id}`)}>
              <Icon.Compare style={{ width: 14, height: 14 }} />
              Compare
            </a>
            {primarySource && (
              <a className="btn btn-ghost btn-sm" href={primarySource.url} target="_blank" rel="noopener noreferrer">
                Official NASA page <Icon.External />
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="detail-layout mt-l">
        <div>
          <Block kind="app" title="Plain-language overview — written by this app, not by NASA">
            <p className="serif">{topic.overview}</p>
            <p className="serif" style={{ marginTop: 14 }}>
              <strong>Why it matters. </strong>
              {topic.whyItMatters}
            </p>
          </Block>

          <Block kind="official" title="Open questions in this field">
            <ol className="q-list">
              {topic.keyQuestions.map((q, i) => (
                <li key={q}>
                  <span className="q-num">{i + 1}</span>
                  <span>{q}</span>
                </li>
              ))}
            </ol>
          </Block>

          <Block kind="official" title="Areas of study within this field">
            <div className="chips">
              {topic.subfields.map((s) => (
                <span key={s} className="chip" style={{ cursor: 'default', color: 'var(--ink-700)', background: 'var(--paper-2)', borderColor: 'var(--line)' }}>
                  {s}
                </span>
              ))}
            </div>
          </Block>

          {dataPanels.map((Panel, i) => (
            <Panel key={i} />
          ))}

          <RelatedImagery
            query={topic.name}
            fallbackKey={topic.imageKey}
            title={`Imagery — ${topic.name}`}
          />

          <Block kind="official" title="Official sources">
            <SourceList sources={topic.sources} compact />
            <div className="mt-s">
              <Cite sources={topic.sources} heading={`Sources for ${topic.name}`} />
            </div>
          </Block>
        </div>

        <aside className="sidebar">
          <div className="panel">
            <h4>Missions in this area</h4>
            <ul className="panel-list">
              {missions.map((m) => (
                <li key={m.slug}>
                  <a href={href(`/mission/${m.slug}`)}>
                    <span>{m.name}</span>
                    <span className="muted-dark" style={{ fontSize: 11.5 }}>{m.destinationClass}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <TermsPanel terms={topic.terms} />
          <ComparePanel selfRef={`topic:${topic.id}`} />
        </aside>
      </div>

      {missions.length > 0 && (
        <section>
          <SectionHead eyebrow="Linked missions" title={`Missions contributing to ${topic.name.toLowerCase()}`} />
          <div className="grid grid-3">
            {missions.map((m) => (
              <MissionCard key={m.slug} mission={m} board={board} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

/* ==================================================================== */
/* Collection detail                                                     */
/* ==================================================================== */

export function CollectionDetail({ id, board }) {
  const collection = COLLECTIONS.find((c) => c.id === id)
  if (!collection) return <NotFound what="collection" />

  const hero = fallbackFor(collection.imageKey)[0]
  const missions = collection.missions.map(missionBySlug).filter(Boolean)
  const topics = collection.topics.map(topicById).filter(Boolean)

  return (
    <div className="wrap">
      <div style={{ paddingTop: 26 }}>
        <Breadcrumb trail={[{ label: 'Explore', to: '/' }, { label: collection.title }]} />
      </div>

      <div className="hero">
        <NasaImage item={hero} className="hero-img" />
        <div className="hero-scrim">
          <div className="hero-meta">
            <Provenance kind="app" onDark label="Curated by this app" />
          </div>
          <h1 className="hero-title">{collection.title}</h1>
          <p className="lede" style={{ marginTop: 10 }}>{collection.blurb}</p>
        </div>
      </div>

      <div className="wrap-narrow" style={{ padding: 0, margin: '0 auto' }}>
        <Block kind="app" title="About this collection">
          <p>
            This is a reading path assembled by this project — a grouping of missions and research areas that
            speak to a shared question. The grouping itself is editorial. Every mission and topic inside it
            keeps its own official sources, which is where the facts come from.
          </p>
        </Block>
      </div>

      {missions.length > 0 && (
        <section>
          <SectionHead eyebrow="Missions in this collection" title="Missions" />
          <div className="grid grid-3">
            {missions.map((m) => (
              <MissionCard key={m.slug} mission={m} board={board} />
            ))}
          </div>
        </section>
      )}

      {topics.length > 0 && (
        <section>
          <SectionHead eyebrow="Research areas" title="Related fields of study" />
          <div className="grid grid-3">
            {topics.map((t) => (
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

      {missions.length >= 2 && (
        <div className="status-strip mt-l">
          <Icon.Compare style={{ width: 16, height: 16, flexShrink: 0 }} />
          <span className="grow">
            Comparing two of these side by side is often the fastest way to see how differently they approach
            the same question.
          </span>
          <a
            className="btn btn-primary btn-sm"
            href={href(`/compare?a=mission:${missions[0].slug}&b=mission:${missions[1].slug}`)}
          >
            Compare {missions[0].name} and {missions[1].name}
          </a>
        </div>
      )}
    </div>
  )
}

/* ==================================================================== */
/* Shared pieces                                                         */
/* ==================================================================== */

function Spec({ label, value, note, mono }) {
  return (
    <div className="spec">
      <div className="spec-label">{label}</div>
      <div className={`spec-value${mono ? ' mono' : ''}`}>{value}</div>
      {note && <div className="spec-note">{note}</div>}
    </div>
  )
}

function RelationshipsPanel({ mission }) {
  if (!mission.relationships?.length) return null
  return (
    <div className="panel">
      <h4>Mission relationships</h4>
      <ul className="panel-list">
        {mission.relationships.map((r) => {
          const target = missionBySlug(r.slug)
          if (!target) return null
          return (
            <li key={r.slug}>
              <a href={href(`/mission/${r.slug}`)} style={{ display: 'block' }}>
                <span style={{ fontWeight: 600 }}>{target.name}</span>
                <span className="rel-how">{r.how}</span>
              </a>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

function TopicsPanel({ topicIds }) {
  const topics = topicIds.map(topicById).filter(Boolean)
  if (!topics.length) return null
  return (
    <div className="panel">
      <h4>Research areas</h4>
      <ul className="panel-list">
        {topics.map((t) => (
          <li key={t.id}>
            <a href={href(`/topic/${t.id}`)}>
              <span style={{ color: `var(--${t.accent})` }}>{t.name}</span>
              <span aria-hidden="true">→</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

function TermsPanel({ terms }) {
  if (!terms?.length) return null
  const defined = terms.map((t) => ({ key: t, label: termLabel(t), def: defineTerm(t) })).filter((t) => t.def)
  if (!defined.length) return null
  return (
    <div className="panel">
      <h4>Important terms</h4>
      <div className="row row-tight" style={{ marginBottom: 10 }}>
        <Provenance kind="app" onDark label="App definitions" />
      </div>
      <dl style={{ margin: 0, display: 'grid', gap: 11 }}>
        {defined.map((t) => (
          <div key={t.key}>
            <dt style={{ fontWeight: 700, fontSize: 13.5, color: 'var(--sky-100)' }}>{t.label}</dt>
            <dd style={{ margin: '3px 0 0', fontSize: 13, color: 'var(--sky-300)', lineHeight: 1.5 }}>{t.def}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

function ComparePanel({ selfRef }) {
  return (
    <div className="panel">
      <h4>Comparison workspace</h4>
      <p className="muted-dark" style={{ fontSize: 13, marginTop: 0, marginBottom: 12 }}>
        Put this beside another mission or topic to compare objectives, instruments, destinations, dates and
        scientific contribution.
      </p>
      <a className="btn btn-primary btn-sm" href={href(`/compare?a=${selfRef}`)}>
        <Icon.Compare style={{ width: 14, height: 14 }} />
        Open comparison
      </a>
    </div>
  )
}

/** Live imagery for the subject, degrading to verified bundled images. */
function RelatedImagery({ query, fallbackKey, title }) {
  const [state, setState] = useState({ status: 'loading', items: [], error: null, source: null })

  useEffect(() => {
    let live = true
    setState({ status: 'loading', items: [], error: null, source: null })
    searchImages(query, { pageSize: 6 }).then((res) => {
      if (!live) return
      if (res.ok) setState({ status: 'ready', items: res.data.slice(0, 3), error: null, source: 'live' })
      else
        setState({
          status: 'ready',
          items: fallbackFor(fallbackKey).slice(0, 3),
          error: res.error,
          source: 'fallback',
        })
    })
    return () => {
      live = false
    }
  }, [query, fallbackKey])

  const offline = state.source === 'fallback'

  return (
    <div className="block block-official" style={{ background: 'var(--navy-800)', borderColor: 'rgba(179,193,228,0.16)' }}>
      <div className="block-head" style={{ background: 'rgba(179,193,228,0.07)', borderBottom: '1px solid rgba(179,193,228,0.14)', color: 'var(--sky-300)' }}>
        <Provenance kind={offline ? 'sample' : 'official'} onDark />
        <span>{title}</span>
      </div>
      <div className="block-body">
        {state.status === 'ready' && (
          <p className="muted-dark" style={{ fontSize: 12.5, marginTop: 0, marginBottom: 14 }}>
            {provenanceNote(state.source, state.error)}
          </p>
        )}
        <div className="grid grid-3">
          {state.status === 'loading' ? (
            <ImageSkeleton count={3} />
          ) : state.items.length ? (
            state.items.map((img) => <Figure key={img.id} item={img} isSample={offline} />)
          ) : (
            <p className="muted-dark">No imagery available for this subject.</p>
          )}
        </div>
      </div>
    </div>
  )
}

function RelatedMissions({ mission, board }) {
  const related = MISSIONS.filter(
    (m) => m.slug !== mission.slug && m.topics.some((t) => mission.topics.includes(t)),
  ).slice(0, 3)
  if (!related.length) return null

  return (
    <section>
      <SectionHead
        eyebrow="Continue researching"
        title="Related missions"
        note="Missions that share a research area with this one."
      />
      <div className="grid grid-3">
        {related.map((m) => (
          <MissionCard key={m.slug} mission={m} board={board} />
        ))}
      </div>
    </section>
  )
}

export function NotFound({ what = 'page' }) {
  return (
    <div className="wrap" style={{ paddingTop: 60 }}>
      <Empty
        title={`That ${what} isn’t in this collection`}
        action={
          <a className="btn btn-primary" href={href('/')}>
            Back to Explore
          </a>
        }
      >
        This app covers a curated selection of missions and research areas rather than everything NASA does.
        For the full catalogue, start from the official NASA Science site linked in the footer.
      </Empty>
    </div>
  )
}
