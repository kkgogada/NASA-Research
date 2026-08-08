/**
 * Curated study collections — app-generated groupings of the reference data in
 * missions.js and topics.js. These are editorial selections made by this project,
 * not NASA groupings, and are labelled as app-generated in the interface.
 */

export const COLLECTIONS = [
  {
    id: 'search-for-life',
    title: 'The search for life beyond Earth',
    blurb:
      'How several missions approach the same question from different angles — ancient Mars, an icy moon’s ocean, and material returned from an asteroid.',
    missions: ['perseverance', 'europa-clipper', 'osiris-rex', 'curiosity'],
    topics: ['planetary-science'],
    imageKey: 'europa-clipper',
  },
  {
    id: 'looking-back-in-time',
    title: 'Looking back in time',
    blurb:
      'Why distance is the same thing as history in astronomy, and how two observatories split the work between visible and infrared light.',
    missions: ['webb', 'hubble'],
    topics: ['astrophysics'],
    imageKey: 'jwst',
  },
  {
    id: 'return-to-the-moon',
    title: 'Returning humans to the Moon',
    blurb:
      'The step-by-step logic of the Artemis programme, and the long-duration health research aboard the space station that underpins it.',
    missions: ['artemis-i', 'artemis-ii', 'iss'],
    topics: ['human-spaceflight', 'space-technology'],
    imageKey: 'artemis',
  },
  {
    id: 'measuring-our-planet',
    title: 'Measuring our own planet',
    blurb:
      'Earth observation treated as planetary science: consistent global measurements of land and water, repeated for long enough that change becomes visible.',
    missions: ['swot', 'landsat-9', 'iss'],
    topics: ['earth-science'],
    imageKey: 'earth-science',
  },
  {
    id: 'edge-of-the-solar-system',
    title: 'To the edge of the solar system',
    blurb:
      'Spacecraft that kept going: the outer-planet tour, the first close look at Pluto, and the boundary where the Sun’s influence ends.',
    missions: ['voyager', 'new-horizons', 'cassini'],
    topics: ['planetary-science', 'heliophysics'],
    imageKey: 'voyager',
  },
  {
    id: 'flight-research',
    title: 'Flight research, on two planets',
    blurb:
      'Aeronautics as an experimental science — quieting a sonic boom over Earth, and proving powered flight is possible in the thin air of Mars.',
    missions: ['x-59', 'ingenuity'],
    topics: ['aeronautics', 'robotics'],
    imageKey: 'aeronautics',
  },
]

/** Official NASA entry points, offered as primary-source starting points. */
export const OFFICIAL_PORTALS = [
  { label: 'NASA Science', url: 'https://science.nasa.gov/', note: 'Mission pages and science division overviews.' },
  { label: 'NASA — main site', url: 'https://www.nasa.gov/', note: 'News, programmes and mission directorates.' },
  { label: 'NASA Image and Video Library', url: 'https://images.nasa.gov/', note: 'Searchable official media archive. This app queries its public API.' },
  { label: 'Astronomy Picture of the Day', url: 'https://apod.nasa.gov/apod/astropix.html', note: 'Daily image with an explanation written by professional astronomers.' },
  { label: 'NASA Earthdata', url: 'https://www.earthdata.nasa.gov/', note: 'Open Earth science data archives.' },
  { label: 'NASA Open APIs', url: 'https://api.nasa.gov/', note: 'Public API catalogue, including APOD. Free API keys are issued here.' },
  { label: 'NASA Space Science Data Coordinated Archive', url: 'https://nssdc.gsfc.nasa.gov/', note: 'Archival spacecraft and mission records.' },
  { label: 'NASA media usage guidelines', url: 'https://www.nasa.gov/nasa-brand-center/images-and-media/', note: 'Terms for reusing NASA imagery.' },
]
