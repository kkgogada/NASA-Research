/**
 * Local search across the curated reference data. Runs entirely in the browser
 * over the data bundled with the app, so search keeps working when the network
 * does not.
 */

import { MISSIONS } from '../data/missions.js'
import { TOPICS } from '../data/topics.js'
import { COLLECTIONS } from '../data/collections.js'
import { GLOSSARY, termLabel } from '../data/glossary.js'

const norm = (s) => (s || '').toLowerCase()

const missionHaystack = (m) =>
  norm(
    [
      m.name, m.program, m.destination, m.destinationClass, m.kind, m.purpose, m.agency,
      m.overview, m.whyItMatters,
      ...(m.objectives || []),
      ...(m.keyQuestions || []),
      ...(m.instruments || []).map((i) => `${i.name} ${i.role}`),
      ...(m.topics || []),
    ].join(' '),
  )

const topicHaystack = (t) =>
  norm(
    [t.name, t.tagline, t.overview, t.whyItMatters, ...(t.keyQuestions || []), ...(t.subfields || [])].join(' '),
  )

export function searchAll(rawQuery) {
  const q = norm(rawQuery).trim()
  if (!q) return { missions: [], topics: [], collections: [], terms: [], total: 0 }

  const tokens = q.split(/\s+/)
  const matches = (hay) => tokens.every((t) => hay.includes(t))

  const missions = MISSIONS.filter((m) => matches(missionHaystack(m)))
  const topics = TOPICS.filter((t) => matches(topicHaystack(t)))
  const collections = COLLECTIONS.filter((c) => matches(norm(`${c.title} ${c.blurb}`)))
  const terms = Object.entries(GLOSSARY)
    .filter(([k, v]) => matches(norm(`${termLabel(k)} ${v}`)))
    .map(([k, v]) => ({ key: k, label: termLabel(k), definition: v }))

  return {
    missions,
    topics,
    collections,
    terms,
    total: missions.length + topics.length + collections.length + terms.length,
  }
}

/** Suggested searches shown before the user types anything. */
export const SUGGESTED_QUERIES = [
  'Mars',
  'ocean',
  'telescope',
  'sample return',
  'radiation',
  'supersonic',
  'Jupiter',
  'ice',
]
