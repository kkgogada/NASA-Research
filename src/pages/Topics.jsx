/**
 * Research topic index — the eight areas this app organises content into.
 */

import { MISSIONS } from '../data/missions.js'
import { TOPICS } from '../data/topics.js'
import { href } from '../lib/router.js'
import { TopicCard } from '../components/cards.jsx'
import { Breadcrumb, Provenance, SectionHead } from '../components/ui.jsx'

export default function Topics({ board }) {
  return (
    <div className="wrap">
      <div style={{ paddingTop: 30 }}>
        <Breadcrumb trail={[{ label: 'Explore', to: '/' }, { label: 'Research topics' }]} />
        <SectionHead
          eyebrow="Research areas"
          title="Research topics"
          note="NASA’s work is organised into research areas. Each page here gives a plain-language overview, the open questions the field is working on, the missions connected to it, and links to the official division pages."
        />
      </div>

      <div className="grid grid-3">
        {TOPICS.map((t) => (
          <TopicCard
            key={t.id}
            topic={t}
            board={board}
            missionCount={MISSIONS.filter((m) => m.topics.includes(t.id)).length}
          />
        ))}
      </div>

      <section>
        <SectionHead
          eyebrow="Cross-reference"
          title="Which missions sit in which area"
          note="Most missions contribute to more than one area — a Mars rover is planetary science and robotics at the same time."
        />
        <div className="grid grid-2">
          {TOPICS.map((t) => {
            const list = MISSIONS.filter((m) => m.topics.includes(t.id))
            if (!list.length) return null
            return (
              <div key={t.id} className="panel">
                <div className="row" style={{ justifyContent: 'space-between', marginBottom: 12 }}>
                  <a href={href(`/topic/${t.id}`)} style={{ textDecoration: 'none' }}>
                    <span style={{ color: `var(--${t.accent})`, fontWeight: 700, fontSize: 15 }}>{t.name}</span>
                  </a>
                  <span className="muted-dark">{list.length}</span>
                </div>
                <ul className="panel-list">
                  {list.map((m) => (
                    <li key={m.slug}>
                      <a href={href(`/mission/${m.slug}`)}>
                        <span>{m.name}</span>
                        <span className="muted-dark" style={{ fontSize: 11.5 }}>{m.kind}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </section>

      <div className="status-strip mt-l">
        <Provenance kind="app" onDark />
        <span className="grow">
          The grouping of missions into research areas is this project’s own organisation, made to help you
          navigate. NASA’s own division structure is described on the official pages linked from each topic.
        </span>
      </div>
    </div>
  )
}
