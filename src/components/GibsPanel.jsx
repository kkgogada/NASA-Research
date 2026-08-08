/**
 * NASA Worldview / GIBS satellite layers, on the Earth science topic page.
 *
 * GIBS (Global Imagery Browse Services) publishes NASA's Earth-observing
 * imagery as map layers. It offers both WMTS (tiles) and WMS (a single composed
 * image); this uses WMS, so one <img> gets a whole-world view and the app needs
 * neither tile arithmetic nor a mapping library.
 *
 * The image is a plain cross-origin <img>, so no CORS handshake is involved and
 * nothing here goes through lib/nasaApi.js — there is no JSON response to parse
 * and no key to hold. A failed layer simply fires onError and the panel says so.
 *
 * Layer IDs and satellites are official. The one-line "what you are looking at"
 * descriptions are written by this project and labelled as app summaries.
 */

import { useMemo, useState } from 'react'
import { Icon, Provenance, formatDate } from './ui.jsx'

const WMS = 'https://gibs.earthdata.nasa.gov/wms/epsg4326/best/wms.cgi'

/* Every layer below was checked to return real imagery, not an empty tile. */
const LAYERS = [
  {
    id: 'MODIS_Terra_CorrectedReflectance_TrueColor',
    name: 'True colour',
    instrument: 'MODIS on Terra',
    blurb:
      'Roughly what the human eye would see from orbit. Cloud, dust and smoke all show up, which makes it the layer to start from before switching to a measurement.',
  },
  {
    id: 'VIIRS_SNPP_Thermal_Anomalies_375m_Day',
    name: 'Active fires',
    instrument: 'VIIRS on Suomi NPP',
    blurb:
      'Points where the sensor detected heat consistent with active burning. It flags wildfires, agricultural burning and gas flares alike — the instrument sees heat, not intent.',
  },
  {
    id: 'MODIS_Terra_Aerosol',
    name: 'Aerosols',
    instrument: 'MODIS on Terra',
    blurb:
      'Aerosol optical depth: how much dust, smoke and pollution is suspended in the air column. Higher values mean more particles between the satellite and the ground.',
  },
  {
    id: 'GHRSST_L4_MUR_Sea_Surface_Temperature',
    name: 'Sea surface temperature',
    instrument: 'Multi-sensor analysis (MUR)',
    blurb:
      'A gap-filled daily analysis combining several satellites. Ocean currents, upwelling and the warm western edges of ocean basins become visible as temperature structure.',
  },
  {
    id: 'MODIS_Terra_Land_Surface_Temp_Day',
    name: 'Land surface temperature',
    instrument: 'MODIS on Terra',
    blurb:
      'The temperature of the ground itself, not the air above it. Bare desert can read far hotter than any air-temperature map would suggest.',
  },
  {
    id: 'MODIS_Terra_NDSI_Snow_Cover',
    name: 'Snow cover',
    instrument: 'MODIS on Terra',
    blurb:
      'Snow identified by how brightly a surface reflects visible light compared with shortwave infrared — snow is bright in one and dark in the other. Coverage swings hugely with the seasons.',
  },
]

/* GIBS publishes with a processing lag, so "today" is usually not available. */
const daysAgo = (n) => {
  const d = new Date()
  d.setUTCDate(d.getUTCDate() - n)
  return d.toISOString().slice(0, 10)
}

const DEFAULT_DATE = daysAgo(3)
const MAX_DATE = daysAgo(1)
const MIN_DATE = '2015-01-01' // safe lower bound for every layer offered here

export default function GibsPanel() {
  const [layerId, setLayerId] = useState(LAYERS[0].id)
  const [date, setDate] = useState(DEFAULT_DATE)
  const [status, setStatus] = useState('loading')

  const layer = LAYERS.find((l) => l.id === layerId)

  const src = useMemo(
    () =>
      `${WMS}?SERVICE=WMS&REQUEST=GetMap&VERSION=1.3.0&LAYERS=${layerId}` +
      `&CRS=EPSG:4326&BBOX=-90,-180,90,180&WIDTH=1536&HEIGHT=768&FORMAT=image/png&TIME=${date}`,
    [layerId, date],
  )

  const worldviewUrl = `https://worldview.earthdata.nasa.gov/?v=-180,-90,180,90&l=${layerId}&t=${date}`

  const pick = (id) => {
    if (id === layerId) return
    setStatus('loading')
    setLayerId(id)
  }

  const changeDate = (value) => {
    if (!value) return
    setStatus('loading')
    setDate(value)
  }

  return (
    <div className="block block-official">
      <div className="block-head">
        <Provenance kind="official" />
        <span>Earth-observing layers — NASA Worldview / GIBS</span>
        <span style={{ marginLeft: 'auto', fontSize: 11.5, fontWeight: 400 }}>{formatDate(date)}</span>
      </div>

      <div className="block-body">
        <p className="muted" style={{ marginTop: 0 }}>
          GIBS publishes NASA’s Earth-observing imagery as map layers, most of them updated daily. Switch
          layer or date to see the same planet measured different ways.
        </p>

        <div className="chips" style={{ marginBottom: 12 }}>
          {LAYERS.map((l) => (
            <button
              key={l.id}
              className={`chip chip-light${l.id === layerId ? ' on' : ''}`}
              onClick={() => pick(l.id)}
              aria-pressed={l.id === layerId}
            >
              {l.name}
            </button>
          ))}
        </div>

        <div className="gibs-controls">
          <label className="gibs-date">
            <span className="spec-label" style={{ margin: 0 }}>Date</span>
            <input
              type="date"
              value={date}
              min={MIN_DATE}
              max={MAX_DATE}
              onChange={(e) => changeDate(e.target.value)}
            />
          </label>
          <button className="btn btn-light btn-sm" onClick={() => changeDate(DEFAULT_DATE)} disabled={date === DEFAULT_DATE}>
            Most recent
          </button>
          <span className="muted" style={{ fontSize: 12 }}>
            Imagery is published with a short processing delay, so the last day or two is usually not
            available yet.
          </span>
        </div>

        <figure className="gibs-figure">
          {status === 'loading' && <div className="gibs-loading">Loading {layer.name.toLowerCase()} for {formatDate(date)}…</div>}
          {status === 'error' ? (
            <div className="img-fallback" style={{ aspectRatio: '2 / 1' }}>
              <div>
                <strong style={{ display: 'block', color: 'var(--sky-300)', marginBottom: 6 }}>
                  This layer has no imagery for {formatDate(date)}
                </strong>
                Try another date or another layer — coverage varies by instrument and by day.
              </div>
            </div>
          ) : (
            <img
              key={src}
              className="gibs-img"
              src={src}
              alt={`${layer.name} — global ${layer.instrument} imagery for ${date}`}
              onLoad={() => setStatus('ready')}
              onError={() => setStatus('error')}
              style={{ display: status === 'loading' ? 'none' : 'block' }}
            />
          )}

          <figcaption className="figcaption">
            <strong>
              {layer.name} — {formatDate(date)}
            </strong>
            <div className="fig-credit">
              <Provenance kind="official" onDark label="NASA GIBS" />
              <span>{layer.instrument}</span>
              <span>· Equirectangular, whole globe</span>
            </div>
            <div className="fig-credit" style={{ marginTop: 6 }}>
              <Provenance kind="app" onDark label="App summary" />
            </div>
            <p style={{ margin: '6px 0 0', color: 'var(--sky-300)' }}>{layer.blurb}</p>
            <div style={{ marginTop: 8 }}>
              <a href={worldviewUrl} target="_blank" rel="noopener noreferrer">
                Open this layer and date in NASA Worldview{' '}
                <Icon.External style={{ display: 'inline', verticalAlign: '-1px' }} />
              </a>
            </div>
          </figcaption>
        </figure>

        <p className="muted mt-s" style={{ fontSize: 12.5 }}>
          Blank areas are missing data, not an absence of the thing being measured — a polar-orbiting
          instrument only sees what passed beneath it in daylight, and cloud blocks many measurements
          entirely. Layer IDs and instruments above are GIBS’ own; the plain-language descriptions are
          written by this project.
        </p>

        <div className="mt-s">
          <a className="source-link" href="https://worldview.earthdata.nasa.gov/" target="_blank" rel="noopener noreferrer">
            <Icon.External />
            <span>
              NASA Worldview — browse and compare these layers
              <span className="src-url">https://worldview.earthdata.nasa.gov/</span>
            </span>
          </a>
        </div>
      </div>
    </div>
  )
}
