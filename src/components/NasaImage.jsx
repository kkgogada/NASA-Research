/**
 * Image display with mandatory attribution.
 *
 * No image renders in this app without a caption stating where it came from and
 * a link back to its record in the official NASA Image and Video Library. If the
 * file itself fails to load, a diagram-styled placeholder appears in its place
 * rather than a broken image or an unattributed substitute.
 */

import { useState } from 'react'
import { nasaImageSourceUrl } from '../data/imagery.js'
import { Icon, Provenance } from './ui.jsx'

export function NasaImage({ item, aspect, className = '', useThumb = false }) {
  const [failed, setFailed] = useState(false)
  if (!item) return null

  if (failed) {
    return (
      <div className={`img-fallback ${className}`} style={aspect ? { aspectRatio: aspect } : undefined}>
        <div>
          <strong style={{ display: 'block', color: 'var(--sky-300)', marginBottom: 6 }}>Image unavailable offline</strong>
          {item.title}
        </div>
      </div>
    )
  }

  return (
    <img
      className={className}
      src={useThumb && item.thumb ? item.thumb : item.url}
      alt={item.title}
      loading="lazy"
      onError={() => setFailed(true)}
      // Height must come from the aspect ratio, not `height: 100%`. Filling the
      // parent's height makes the image consume the whole <figure>, pushing the
      // attribution caption outside the box, where `overflow: hidden` clips it —
      // and an image whose credit has been cropped off is exactly what this app
      // must never render.
      style={aspect ? { aspectRatio: aspect, width: '100%', objectFit: 'cover' } : undefined}
    />
  )
}

/** Full figure: image plus its attribution block. */
export function Figure({ item, isSample = false, aspect = '4 / 3' }) {
  if (!item) return null
  const sourceUrl = item.pageUrl || nasaImageSourceUrl(item.id)
  return (
    <figure className="figure">
      <NasaImage item={item} aspect={aspect} />
      <figcaption className="figcaption">
        <strong>{item.title}</strong>
        <div className="fig-credit">
          <Provenance kind={isSample ? 'sample' : 'official'} onDark label={isSample ? 'Sample content' : 'NASA'} />
          {item.date && <span>{item.date}</span>}
          {item.center && <span>· {item.center}</span>}
          {item.credit && <span>· Credit: {item.credit}</span>}
        </div>
        <div style={{ marginTop: 7 }}>
          <a href={sourceUrl} target="_blank" rel="noopener noreferrer">
            View official record <Icon.External style={{ display: 'inline', verticalAlign: '-1px' }} />
          </a>
        </div>
      </figcaption>
    </figure>
  )
}

export function ImageSkeleton({ count = 4 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="figure">
          <div className="img-skeleton" />
        </div>
      ))}
    </>
  )
}
