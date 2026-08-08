/**
 * Mission timeline.
 *
 * Only milestones with an attributable date are plotted. Where a mission has a
 * scheduled-but-unstated milestone, the entry is rendered as an explicitly
 * undated future step rather than being given a guessed date.
 */

import { formatDate } from './ui.jsx'

export function buildTimeline(mission) {
  const items = []
  if (mission.launch?.date) {
    items.push({
      date: mission.launch.date,
      label: 'Launch',
      detail: [mission.launch.vehicle, mission.launch.site].filter(Boolean).join(' · '),
      note: mission.launch.note,
    })
  } else if (mission.launch?.note) {
    items.push({ date: null, label: 'Launch', detail: mission.launch.note, future: true })
  }

  if (mission.arrival) {
    if (mission.arrival.date) {
      items.push({ date: mission.arrival.date, label: mission.arrival.label })
    } else if (mission.arrival.label) {
      items.push({ date: null, label: 'Arrival', detail: mission.arrival.label, future: true })
    }
  }

  if (mission.ended?.date) {
    items.push({ date: mission.ended.date, label: mission.ended.label, end: true })
  }

  return items
}

export default function Timeline({ mission }) {
  const items = buildTimeline(mission)
  if (!items.length) return null

  return (
    <div className="timeline">
      {items.map((it, i) => (
        <div
          key={i}
          className={`tl-item${it.future ? ' is-future' : ''}${it.end ? ' is-end' : ''}`}
        >
          <span className="tl-dot" />
          <div className="tl-date">{it.date ? formatDate(it.date) : 'Date not asserted'}</div>
          <div className="tl-label">{it.label}</div>
          {it.detail && <div className="tl-detail">{it.detail}</div>}
          {it.note && <div className="tl-detail">{it.note}</div>}
        </div>
      ))}
    </div>
  )
}
