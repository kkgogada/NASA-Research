/**
 * ISOLATED NETWORK LAYER
 * ----------------------
 * Every outbound request in this application goes through this module, and no
 * other file imports `fetch`. That isolation is deliberate:
 *
 *  - Nothing here is required for the app to render. Every function resolves to
 *    a result object with `{ ok, data, source, error }` and never throws.
 *  - When a request fails, times out, or the host is unreachable, callers fall
 *    back to the curated offline data in src/data/imagery.js, which is real,
 *    verified, attributed NASA material — not invented placeholders.
 *  - `source` tells the UI which happened ('live' or 'fallback'), so the
 *    interface can label provenance honestly instead of hiding the difference.
 *
 * Endpoints used:
 *  - images-api.nasa.gov  — official NASA Image and Video Library. No API key,
 *    CORS-enabled, so it works directly from the browser.
 *  - api.nasa.gov/planetary/apod — Astronomy Picture of the Day. Requires an API
 *    key. DEMO_KEY works for light use but is heavily rate limited; a free key
 *    from https://api.nasa.gov/ can be entered in the app and is stored locally.
 */

const IMAGES_ENDPOINT = 'https://images-api.nasa.gov/search'
const APOD_ENDPOINT = 'https://api.nasa.gov/planetary/apod'
const TIMEOUT_MS = 9000
const KEY_STORAGE = 'nre.apiKey'

/* ------------------------------------------------------------------ */
/* API key handling — stored locally in the browser, never transmitted */
/* anywhere except to api.nasa.gov itself.                             */
/* ------------------------------------------------------------------ */

export const getApiKey = () => {
  try {
    return localStorage.getItem(KEY_STORAGE) || 'DEMO_KEY'
  } catch {
    return 'DEMO_KEY'
  }
}

export const setApiKey = (key) => {
  try {
    if (key && key.trim()) localStorage.setItem(KEY_STORAGE, key.trim())
    else localStorage.removeItem(KEY_STORAGE)
  } catch {
    /* storage unavailable (private mode); the app still works with DEMO_KEY */
  }
}

export const usingDemoKey = () => getApiKey() === 'DEMO_KEY'

/* ------------------------------------------------------------------ */
/* Core request helper — timeout, no throwing, uniform result shape.   */
/* ------------------------------------------------------------------ */

async function request(url, { timeout = TIMEOUT_MS } = {}) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeout)
  try {
    const res = await fetch(url, { signal: controller.signal, headers: { Accept: 'application/json' } })
    if (!res.ok) {
      return { ok: false, error: describeStatus(res.status), status: res.status }
    }
    const data = await res.json()
    return { ok: true, data }
  } catch (err) {
    const aborted = err && (err.name === 'AbortError' || String(err).includes('abort'))
    return {
      ok: false,
      error: aborted
        ? 'The request timed out.'
        : 'The service could not be reached from this network.',
    }
  } finally {
    clearTimeout(timer)
  }
}

function describeStatus(status) {
  if (status === 429) return 'Rate limit reached for this API key.'
  if (status === 403) return 'The API rejected this request (often an invalid or exhausted key).'
  if (status >= 500) return `The service returned an error (${status}).`
  return `The request failed (${status}).`
}

/* ------------------------------------------------------------------ */
/* NASA Image and Video Library                                        */
/* ------------------------------------------------------------------ */

/** Normalise one item from the images API into the shape the UI renders. */
function normaliseImageItem(item) {
  const meta = (item.data && item.data[0]) || {}
  const links = item.links || []
  const preview = links.find((l) => l.render === 'image') || links[0]
  if (!preview || !preview.href || !meta.nasa_id) return null
  const href = preview.href.replace(/^http:/, 'https:')
  return {
    id: meta.nasa_id,
    // The search endpoint returns a thumbnail; swap up to a larger rendition
    // where the naming convention allows it, and fall back to the thumbnail.
    url: href.replace('~thumb.jpg', '~medium.jpg'),
    thumb: href,
    title: meta.title || meta.nasa_id,
    date: (meta.date_created || '').slice(0, 10),
    center: meta.center || '',
    credit: meta.photographer || meta.secondary_creator || '',
    desc: (meta.description || meta.description_508 || '').replace(/\s+/g, ' ').slice(0, 400),
  }
}

/**
 * Search the official NASA image library.
 * Always resolves. On failure the caller supplies its own fallback.
 */
export async function searchImages(query, { pageSize = 12 } = {}) {
  const url = `${IMAGES_ENDPOINT}?q=${encodeURIComponent(query)}&media_type=image&page_size=${pageSize}`
  const res = await request(url)
  if (!res.ok) return { ok: false, source: 'fallback', error: res.error, data: [] }

  const items = ((res.data && res.data.collection && res.data.collection.items) || [])
    .map(normaliseImageItem)
    .filter(Boolean)

  if (!items.length) {
    return { ok: false, source: 'fallback', error: 'The search returned no images.', data: [] }
  }
  return { ok: true, source: 'live', data: items }
}

/* ------------------------------------------------------------------ */
/* Astronomy Picture of the Day                                        */
/* ------------------------------------------------------------------ */

/**
 * Fetch recent Astronomy Picture of the Day entries.
 * APOD explanations are official NASA-published text; the UI attributes them
 * and links to the APOD page rather than rewriting them.
 */
export async function fetchApod({ count = 4 } = {}) {
  const key = getApiKey()
  const url = `${APOD_ENDPOINT}?api_key=${encodeURIComponent(key)}&count=${count}&thumbs=true`
  const res = await request(url)
  if (!res.ok) {
    return {
      ok: false,
      source: 'fallback',
      error: res.error,
      needsKey: res.status === 403 || res.status === 429,
      data: [],
    }
  }
  const list = Array.isArray(res.data) ? res.data : [res.data]
  const items = list
    .filter((d) => d && (d.media_type === 'image' || d.thumbnail_url))
    .map((d) => ({
      id: `apod-${d.date}`,
      url: (d.thumbnail_url || d.url || '').replace(/^http:/, 'https:'),
      hd: (d.hdurl || '').replace(/^http:/, 'https:'),
      title: d.title || 'Astronomy Picture of the Day',
      date: d.date || '',
      credit: d.copyright ? d.copyright.replace(/\s+/g, ' ').trim() : '',
      explanation: d.explanation || '',
      pageUrl: d.date
        ? `https://apod.nasa.gov/apod/ap${d.date.slice(2, 4)}${d.date.slice(5, 7)}${d.date.slice(8, 10)}.html`
        : 'https://apod.nasa.gov/apod/astropix.html',
    }))
  if (!items.length) return { ok: false, source: 'fallback', error: 'No image entries returned.', data: [] }
  return { ok: true, source: 'live', data: items }
}

/* ------------------------------------------------------------------ */
/* EPIC — Earth Polychromatic Imaging Camera on NOAA's DSCOVR           */
/* ------------------------------------------------------------------ */

/**
 * EPIC is served from two places: api.nasa.gov (needs a key, rate limited) and
 * epic.gsfc.nasa.gov (no key, CORS-open, same data and the same archive path).
 * We use the GSFC host, so this panel keeps working even when the shared
 * DEMO_KEY is exhausted — verified: /api/natural returns 200 with
 * Access-Control-Allow-Origin: *, and the archive serves image/jpeg.
 */
const EPIC_ENDPOINT = 'https://epic.gsfc.nasa.gov/api/natural'
const EPIC_ARCHIVE = 'https://epic.gsfc.nasa.gov/archive/natural'

/**
 * Full-disk images of the sunlit face of Earth, taken from the Sun–Earth L1
 * point about 1.5 million km away. EPIC images the whole disk every couple of
 * hours, so the frames from one day show the planet rotating.
 *
 * Needs no API key. Always resolves; the caller falls back to bundled imagery.
 */
export async function fetchEpic({ limit = 4 } = {}) {
  const res = await request(EPIC_ENDPOINT)
  if (!res.ok) {
    return { ok: false, source: 'fallback', error: res.error, data: [] }
  }

  const list = Array.isArray(res.data) ? res.data : []
  if (!list.length) {
    return { ok: false, source: 'fallback', error: 'No EPIC images published for the latest day.', data: [] }
  }

  // Sample across the day rather than taking the first N frames, which are
  // minutes apart and show almost the same view. Spacing them shows rotation.
  const step = Math.max(1, Math.floor(list.length / limit))
  const picked = []
  for (let i = 0; i < list.length && picked.length < limit; i += step) picked.push(list[i])

  const items = picked
    .filter((d) => d && d.image && d.date)
    .map((d) => {
      const [y, m, day] = d.date.slice(0, 10).split('-')
      const time = d.date.slice(11, 16)
      return {
        id: d.identifier || d.image,
        // The archive serves png, jpg and thumbs; jpg is far lighter for display.
        url: `${EPIC_ARCHIVE}/${y}/${m}/${day}/jpg/${d.image}.jpg`,
        title: `Earth at ${time} UTC`,
        date: d.date.slice(0, 10),
        center: 'NASA EPIC / NOAA DSCOVR',
        credit: 'NASA/NOAA',
        desc: d.caption || '',
        lat: d.centroid_coordinates?.lat,
        lon: d.centroid_coordinates?.lon,
        pageUrl: 'https://epic.gsfc.nasa.gov/',
      }
    })

  if (!items.length) return { ok: false, source: 'fallback', error: 'No usable EPIC frames.', data: [] }
  return { ok: true, source: 'live', data: items, day: items[0].date }
}

/** Human-readable note about what the app is currently showing. */
export function provenanceNote(source, error) {
  if (source === 'live') return 'Live results from the official NASA API.'
  return error
    ? `Showing verified offline sample content — ${error}`
    : 'Showing verified offline sample content.'
}
