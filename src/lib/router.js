/**
 * Minimal hash router. Hash routing keeps the app dependency-free and means it
 * works from any static host without server rewrite rules.
 *
 * Routes:
 *   #/                       Explore
 *   #/missions               Mission index
 *   #/topics                 Research topic index
 *   #/mission/:slug          Detail page for a mission
 *   #/topic/:id              Detail page for a research topic
 *   #/collection/:id         Curated collection
 *   #/compare?a=…&b=…        Comparison workspace
 *   #/board                  Saved research board
 */

import { useEffect, useState } from 'react'

const parse = () => {
  const raw = window.location.hash.replace(/^#/, '') || '/'
  const [pathPart, queryPart] = raw.split('?')
  const segments = pathPart.split('/').filter(Boolean)
  const query = Object.fromEntries(new URLSearchParams(queryPart || ''))
  return { path: '/' + segments.join('/'), segments, query }
}

export function useRoute() {
  const [route, setRoute] = useState(parse)

  useEffect(() => {
    const onChange = () => {
      setRoute(parse())
      // Reset scroll on navigation, but preserve it when only the query changes
      // (the comparison workspace updates its query in place).
      if (!window.location.hash.includes('?')) window.scrollTo({ top: 0, behavior: 'instant' })
    }
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])

  return route
}

export const navigate = (to) => {
  window.location.hash = to.startsWith('#') ? to : `#${to}`
}

export const href = (to) => `#${to}`
