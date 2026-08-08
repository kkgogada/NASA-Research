/**
 * Mission, topic and collection cards. Every card that presents a fact also
 * presents the route to its official source, so a reader is never more than one
 * click from primary material.
 *
 * Cards use a stretched-link pattern rather than wrapping the whole card in an
 * anchor: these cards contain their own links (to the NASA source) and buttons
 * (save to board), and nesting interactive elements inside an anchor is invalid
 * HTML and unusable with a keyboard or screen reader. The title is the real
 * link; its ::after overlay makes the surrounding card clickable, and the
 * genuinely interactive children sit above that overlay.
 */

import { href } from '../lib/router.js'
import { STATUS_META } from '../data/missions.js'
import { fallbackFor } from '../data/imagery.js'
import { NasaImage } from './NasaImage.jsx'
import { Icon, Provenance, SaveButton, StatusPill, shortDate } from './ui.jsx'

const heroImage = (key) => (fallbackFor(key) || [])[0] || null

export function MissionCard({ mission, board }) {
  const img = heroImage(mission.imageKey)
  const primarySource = mission.sources[0]

  return (
    <article className="card card-link">
      <div className="card-media">
        <NasaImage item={img} />
      </div>
      <div className="card-body">
        <div className="row row-tight" style={{ justifyContent: 'space-between' }}>
          <span className="card-sub">{mission.kind}</span>
          <StatusPill status={mission.status} meta={STATUS_META} />
        </div>

        <h3 className="card-title">
          <a className="stretch-link" href={href(`/mission/${mission.slug}`)}>
            {mission.name}
          </a>
        </h3>

        <p className="card-text">{mission.purpose}</p>

        <dl className="spec-grid" style={{ marginTop: 4 }}>
          <div className="spec">
            <div className="spec-label">Destination</div>
            <div className="spec-value" style={{ fontSize: 13.5 }}>{mission.destination}</div>
          </div>
          <div className="spec">
            <div className="spec-label">Launched</div>
            <div className="spec-value mono">
              {mission.launch.date ? shortDate(mission.launch.date) : '—'}
            </div>
            {!mission.launch.date && <div className="spec-note">Date not asserted</div>}
          </div>
        </dl>

        <div className="card-foot">
          {primarySource && (
            <a
              className="attribution above"
              href={primarySource.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none' }}
              title={`Official source: ${primarySource.label}`}
            >
              <Provenance kind="official" label="NASA source" />
              <Icon.External />
            </a>
          )}
          <div className="above" style={{ marginLeft: 'auto' }}>
            <SaveButton
              board={board}
              entry={{
                type: 'mission',
                id: mission.slug,
                title: mission.name,
                subtitle: mission.destination,
                href: `/mission/${mission.slug}`,
                sourceUrl: primarySource?.url,
                sourceLabel: primarySource?.label,
                imageUrl: img?.thumb || img?.url || '',
              }}
            />
          </div>
        </div>
      </div>
    </article>
  )
}

export function TopicCard({ topic, board, missionCount }) {
  const img = heroImage(topic.imageKey)
  const primarySource = topic.sources[0]

  return (
    <article className="card card-link">
      <div className="card-media">
        <NasaImage item={img} />
      </div>
      <div className="card-body">
        <span className="card-sub" style={{ color: `var(--${topic.accent})` }}>
          Research area
        </span>

        <h3 className="card-title">
          <a className="stretch-link" href={href(`/topic/${topic.id}`)}>
            {topic.name}
          </a>
        </h3>

        <p className="card-text">{topic.tagline}</p>

        <div className="card-foot">
          <span className="muted">
            {missionCount} linked {missionCount === 1 ? 'mission' : 'missions'}
          </span>
          <div className="above" style={{ marginLeft: 'auto' }}>
            <SaveButton
              board={board}
              entry={{
                type: 'topic',
                id: topic.id,
                title: topic.name,
                subtitle: 'Research area',
                href: `/topic/${topic.id}`,
                sourceUrl: primarySource?.url,
                sourceLabel: primarySource?.label,
                imageUrl: img?.thumb || img?.url || '',
              }}
            />
          </div>
        </div>
      </div>
    </article>
  )
}

export function CollectionCard({ collection }) {
  const img = heroImage(collection.imageKey)
  const count = collection.missions.length + collection.topics.length

  return (
    <article className="card card-link">
      <div className="card-media" style={{ aspectRatio: '21 / 9' }}>
        <NasaImage item={img} />
      </div>
      <div className="card-body">
        <div className="row row-tight">
          <Provenance kind="app" label="Curated by this app" />
        </div>

        <h3 className="card-title">
          <a className="stretch-link" href={href(`/collection/${collection.id}`)}>
            {collection.title}
          </a>
        </h3>

        <p className="card-text">{collection.blurb}</p>

        <div className="card-foot">
          <span className="muted">{count} linked resources</span>
          <span className="link-more" style={{ marginLeft: 'auto', color: 'var(--blue-deep)' }}>
            Open collection →
          </span>
        </div>
      </div>
    </article>
  )
}
