/**
 * Daily full-disk Earth imagery from EPIC, on the Earth science topic page.
 *
 * This is a live call through the isolated API layer, so it degrades the same
 * way everything else does: on failure it shows bundled, verified NASA imagery
 * under a "Sample content" badge and says why.
 *
 * The sub-solar coordinates under each frame are the point on Earth directly
 * beneath the Sun at that moment — they come from the API, and they are what
 * makes the sequence legible as rotation rather than four similar photos.
 */

import { useEffect, useState } from 'react'
import { fetchEpic, provenanceNote } from '../lib/nasaApi.js'
import { fallbackFor } from '../data/imagery.js'
import { Figure, ImageSkeleton, NasaImage } from './NasaImage.jsx'
import { Icon, Provenance, formatDate } from './ui.jsx'

const coord = (v, pos, neg) =>
  typeof v === 'number' ? `${Math.abs(v).toFixed(1)}° ${v >= 0 ? pos : neg}` : null

export default function EpicPanel() {
  const [state, setState] = useState({ status: 'loading', items: [], error: null, source: null, day: null })

  useEffect(() => {
    let live = true
    fetchEpic({ limit: 4 }).then((res) => {
      if (!live) return
      if (res.ok) setState({ status: 'ready', items: res.data, error: null, source: 'live', day: res.day })
      else setState({ status: 'ready', items: [], error: res.error, source: 'fallback', day: null })
    })
    return () => {
      live = false
    }
  }, [])

  const offline = state.source === 'fallback'
  const fallbackImages = fallbackFor('iss').concat(fallbackFor('earth-science')).slice(0, 4)

  return (
    <div className="block block-official">
      <div className="block-head">
        <Provenance kind={offline ? 'sample' : 'official'} />
        <span>Earth from one million miles away — NASA EPIC</span>
        {state.day && (
          <span style={{ marginLeft: 'auto', fontSize: 11.5, fontWeight: 400 }}>{formatDate(state.day)}</span>
        )}
      </div>

      <div className="block-body">
        <p className="muted" style={{ marginTop: 0 }}>
          EPIC rides on NOAA’s DSCOVR spacecraft at the Sun–Earth L1 point, roughly 1.5 million kilometres
          away, where it sees the entire sunlit face of the planet at once. It photographs the full disk every
          couple of hours, so a single day’s frames show Earth rotating beneath the camera.
        </p>

        {state.status === 'ready' && (
          <p className="muted" style={{ fontSize: 12.5 }}>
            {provenanceNote(state.source, state.error)}
            {' '}
            This feed needs no API key, so it is unaffected by the shared DEMO_KEY rate limit.
          </p>
        )}

        <div className="epic-grid mt-s">
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
                    <Provenance kind="official" onDark label="NASA EPIC" />
                    <span>{item.date}</span>
                  </div>
                  {(item.lat != null || item.lon != null) && (
                    <div className="fig-credit" style={{ marginTop: 4 }}>
                      <span>
                        Sub-solar point {coord(item.lat, 'N', 'S')}, {coord(item.lon, 'E', 'W')}
                      </span>
                    </div>
                  )}
                </figcaption>
              </figure>
            ))
          )}
        </div>

        <div className="mt-m">
          <a className="source-link" href="https://epic.gsfc.nasa.gov/" target="_blank" rel="noopener noreferrer">
            <Icon.External />
            <span>
              NASA EPIC — Earth Polychromatic Imaging Camera
              <span className="src-url">https://epic.gsfc.nasa.gov/</span>
            </span>
          </a>
        </div>
      </div>
    </div>
  )
}
