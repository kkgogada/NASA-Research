/**
 * Curated mission reference data.
 *
 * SOURCING RULES FOR THIS FILE — please keep them if you extend it:
 *  1. Every factual field (dates, destinations, instruments, status) must be
 *     verifiable on the official pages listed in `sources`. Nothing here is
 *     invented, paraphrased from memory of a secondary site, or estimated.
 *  2. Where a date or milestone is scheduled rather than historical, `launch.date`
 *     is left null and `launch.note` explains where to check. We do not print a
 *     forward-looking date we cannot attribute.
 *  3. `overview` and `whyItMatters` are APP-GENERATED plain-language summaries
 *     written for students. They are labelled as such everywhere they render and
 *     must never be presented as NASA text. They contain no facts that are not
 *     also present in the attributed fields above them.
 *  4. `quotes` is deliberately absent. This app does not reproduce quotations.
 *
 * CAPITALISATION CONVENTION:
 *  - `program` uses Title Case only for an official NASA programme name
 *    (Mars 2020, Artemis, New Frontiers, Great Observatories, Living With a Star,
 *    Landsat, Voyager, Quesst, Surface Water and Ocean Topography).
 *  - Where no formal programme name applies, `program` is a sentence-case
 *    descriptor ("Flagship astrophysics mission", "International partnership").
 *  - `kind`, `destination`, `objectives`, `keyQuestions` and all prose are
 *    sentence case. Instrument names keep their official casing.
 */

export const MISSIONS = [
  {
    slug: 'perseverance',
    name: 'Perseverance',
    program: 'Mars 2020',
    agency: 'NASA / Jet Propulsion Laboratory',
    status: 'active',
    kind: 'Rover',
    destination: 'Mars — Jezero Crater',
    destinationClass: 'Mars',
    launch: { date: '2020-07-30', vehicle: 'Atlas V 541', site: 'Cape Canaveral, Florida' },
    arrival: { date: '2021-02-18', label: 'Landed in Jezero Crater' },
    topics: ['planetary-science', 'robotics', 'space-technology'],
    imageKey: 'perseverance-rover',
    purpose:
      'Search Jezero Crater for signs of ancient microbial life, and collect and cache rock and regolith samples for potential return to Earth.',
    objectives: [
      'Look for habitable conditions in Mars’ ancient past.',
      'Search rocks for signs of past microbial life (biosignatures).',
      'Collect and cache rock and regolith samples for a possible future return to Earth.',
      'Test technologies that would help prepare for human exploration of Mars.',
    ],
    instruments: [
      { name: 'Mastcam-Z', role: 'Stereo, zoomable camera system for panoramas and mineralogy.' },
      { name: 'SuperCam', role: 'Fires a laser to study rock chemistry and mineralogy at a distance.' },
      { name: 'PIXL', role: 'X-ray fluorescence instrument that maps elemental chemistry at fine scale.' },
      { name: 'SHERLOC', role: 'Ultraviolet spectrometer that searches for organics and minerals.' },
      { name: 'RIMFAX', role: 'Ground-penetrating radar that images structure below the surface.' },
      { name: 'MEDA', role: 'Weather station measuring temperature, wind, pressure, humidity and dust.' },
      { name: 'MOXIE', role: 'Technology demonstration that produced oxygen from Martian atmospheric CO₂.' },
    ],
    keyQuestions: [
      'Did Jezero Crater once hold a lake and river delta capable of supporting life?',
      'Do the rocks preserve biosignatures — chemical or textural traces of past life?',
      'Which samples are the highest priority to bring back to Earth laboratories?',
      'Can resources on Mars, such as atmospheric CO₂, be converted into usable oxygen?',
    ],
    relationships: [
      { slug: 'ingenuity', how: 'Carried the Ingenuity helicopter to Mars and served as its base station.' },
      { slug: 'curiosity', how: 'Shares heritage in landing system and chassis design with Curiosity.' },
    ],
    terms: ['biosignature', 'regolith', 'delta', 'in-situ-resource-utilization'],
    overview:
      'Perseverance is a car-sized robotic rover exploring Jezero Crater, a basin that shows the shape of an ancient river delta. Deltas are made of fine sediment that settles out of slow water, and on Earth that kind of sediment is unusually good at preserving traces of microbial life. The rover studies rocks with cameras, lasers and X-rays, then drills cores and seals them in sample tubes so that a future mission could carry them to laboratories on Earth — instruments far larger and more sensitive than anything that can be flown to Mars.',
    whyItMatters:
      'Almost everything we know about Mars comes from instruments we sent there. Returning physical samples would let scientists re-examine the same rock for decades with new techniques, the way lunar samples from Apollo are still producing results today.',
    sources: [
      { label: 'NASA Science — Mars 2020 Perseverance', url: 'https://science.nasa.gov/mission/mars-2020-perseverance/' },
      { label: 'NASA Science — Perseverance instruments', url: 'https://science.nasa.gov/mission/mars-2020-perseverance/rover-components/' },
    ],
  },

  {
    slug: 'curiosity',
    name: 'Curiosity',
    program: 'Mars Science Laboratory',
    agency: 'NASA / Jet Propulsion Laboratory',
    status: 'active',
    kind: 'Rover',
    destination: 'Mars — Gale Crater',
    destinationClass: 'Mars',
    launch: { date: '2011-11-26', vehicle: 'Atlas V 541', site: 'Cape Canaveral, Florida' },
    arrival: { date: '2012-08-06', label: 'Landed in Gale Crater' },
    topics: ['planetary-science', 'robotics'],
    imageKey: 'curiosity-rover',
    purpose:
      'Determine whether Mars ever offered environmental conditions favourable to microbial life, by studying the layered rocks of Gale Crater and Mount Sharp.',
    objectives: [
      'Assess whether Gale Crater ever had environments able to support microbial life.',
      'Characterise the chemical building blocks of life, including carbon compounds.',
      'Study the geology and layered rock record of Mount Sharp.',
      'Measure surface radiation relevant to future human missions.',
    ],
    instruments: [
      { name: 'ChemCam', role: 'Laser-induced breakdown spectroscopy for remote rock chemistry.' },
      { name: 'SAM', role: 'Sample Analysis at Mars — chemistry lab that searches for carbon compounds.' },
      { name: 'CheMin', role: 'X-ray diffraction instrument that identifies minerals in drilled powder.' },
      { name: 'MAHLI', role: 'Hand-lens imager on the arm for close-up rock texture.' },
      { name: 'RAD', role: 'Radiation Assessment Detector, measuring the radiation environment.' },
      { name: 'REMS', role: 'Environmental monitoring station for weather data.' },
    ],
    keyQuestions: [
      'Did Gale Crater once hold a long-lived lake system?',
      'Are organic carbon compounds preserved in Martian mudstone?',
      'What does the layer-by-layer record of Mount Sharp say about how Mars dried out?',
      'How much radiation would a human crew face on the Martian surface?',
    ],
    relationships: [
      { slug: 'perseverance', how: 'Shares the sky-crane landing approach and rover chassis heritage.' },
    ],
    terms: ['mudstone', 'stratigraphy', 'organic-compound'],
    overview:
      'Curiosity landed in Gale Crater in 2012 and has been climbing Mount Sharp, a mountain of layered rock in the middle of the crater, ever since. Each layer was laid down at a different time, so driving uphill is a way of reading Martian history in order. The rover carries a small chemistry laboratory that can bake drilled rock powder and identify the gases that come off, which is how it studies carbon-bearing compounds.',
    whyItMatters:
      'Curiosity moved the question about Mars from “was there ever water?” to “was the water habitable, and for how long?” — a shift that shaped every Mars mission designed after it.',
    sources: [
      { label: 'NASA Science — Curiosity (Mars Science Laboratory)', url: 'https://science.nasa.gov/mission/msl-curiosity/' },
    ],
  },

  {
    slug: 'ingenuity',
    name: 'Ingenuity',
    program: 'Technology demonstration',
    agency: 'NASA / Jet Propulsion Laboratory',
    status: 'completed',
    kind: 'Rotorcraft',
    destination: 'Mars — Jezero Crater',
    destinationClass: 'Mars',
    launch: { date: '2020-07-30', vehicle: 'Atlas V 541 (with Perseverance)', site: 'Cape Canaveral, Florida' },
    arrival: { date: '2021-04-19', label: 'First powered, controlled flight on another planet' },
    topics: ['robotics', 'space-technology', 'planetary-science', 'aeronautics'],
    imageKey: 'ingenuity',
    purpose:
      'Demonstrate that powered, controlled flight is possible in the thin atmosphere of Mars.',
    objectives: [
      'Achieve powered, controlled flight in an atmosphere about 1% as dense as Earth’s at sea level.',
      'Prove that a rotorcraft can survive Martian nights and operate autonomously.',
      'Show that aerial scouting can support surface rover operations.',
    ],
    instruments: [
      { name: 'Navigation camera', role: 'Downward-looking black-and-white camera used for flight control.' },
      { name: 'Colour camera', role: 'Horizon-facing colour imager for terrain reconnaissance.' },
      { name: 'Solar array and battery', role: 'Recharged between flights and kept electronics warm overnight.' },
    ],
    keyQuestions: [
      'Can rotors generate enough lift in an atmosphere this thin?',
      'Can a small aircraft navigate autonomously with a radio round-trip time of many minutes?',
      'Does aerial scouting meaningfully help surface exploration?',
    ],
    relationships: [
      { slug: 'perseverance', how: 'Travelled to Mars attached to Perseverance, which relayed its commands and data.' },
    ],
    terms: ['atmospheric-density', 'autonomy'],
    overview:
      'Ingenuity was a small solar-powered helicopter carried to Mars underneath the Perseverance rover. Flying on Mars is hard because the atmosphere is extremely thin, so the rotors had to spin far faster than a helicopter’s on Earth. Radio signals take minutes to reach Mars, which means no one could pilot it live — each flight ran autonomously from instructions uploaded in advance. It flew far more times than the handful of flights it was designed for, before rotor damage ended flight operations.',
    whyItMatters:
      'Ingenuity turned aerial exploration of other worlds from a proposal into demonstrated engineering, which is why later mission concepts can treat flight as an available tool rather than an unproven risk.',
    sources: [
      {
        label: 'NASA Science — Ingenuity Mars Helicopter',
        url: 'https://science.nasa.gov/mission/mars-2020-perseverance/ingenuity-mars-helicopter/',
      },
    ],
  },

  {
    slug: 'webb',
    name: 'James Webb Space Telescope',
    program: 'Flagship astrophysics mission',
    agency: 'NASA with ESA and CSA',
    status: 'active',
    kind: 'Space telescope',
    destination: 'Sun–Earth L2 Lagrange point',
    destinationClass: 'Deep space',
    launch: { date: '2021-12-25', vehicle: 'Ariane 5 (ESA)', site: 'Kourou, French Guiana' },
    arrival: { date: '2022-01-24', label: 'Arrived at its orbit around the L2 point' },
    topics: ['astrophysics', 'planetary-science', 'space-technology'],
    imageKey: 'jwst',
    purpose:
      'Observe the universe in infrared light to study the first galaxies, star and planet formation, and the atmospheres of planets around other stars.',
    objectives: [
      'Search for the light of the first galaxies formed after the Big Bang.',
      'Study how galaxies assembled and evolved over cosmic time.',
      'Observe the birth of stars and protoplanetary systems inside dust clouds.',
      'Measure the composition of exoplanet atmospheres and study planetary systems.',
    ],
    instruments: [
      { name: 'NIRCam', role: 'Near-infrared camera; also used for aligning the mirror segments.' },
      { name: 'NIRSpec', role: 'Near-infrared spectrograph; can take spectra of many objects at once.' },
      { name: 'MIRI', role: 'Mid-infrared instrument; camera and spectrograph for cooler, dustier objects.' },
      { name: 'FGS/NIRISS', role: 'Fine guidance sensor plus near-infrared imager and slitless spectrograph.' },
    ],
    keyQuestions: [
      'What did the earliest galaxies look like, and when did they form?',
      'How do stars and planetary systems take shape inside clouds of gas and dust?',
      'What are the atmospheres of exoplanets made of?',
      'How did the chemical ingredients associated with life become distributed through the universe?',
    ],
    relationships: [
      { slug: 'hubble', how: 'Complementary observatory — Hubble covers ultraviolet and visible light, Webb the infrared.' },
    ],
    terms: ['infrared', 'redshift', 'lagrange-point', 'spectroscopy', 'exoplanet'],
    overview:
      'Webb is an infrared observatory with a segmented primary mirror roughly 6.5 metres across, folded for launch and unfolded in space. It sits near the Sun–Earth L2 point, about 1.5 million kilometres from Earth on the night side, where a tennis-court-sized sunshield keeps it extremely cold. Cold matters because the telescope is looking for faint heat: warm optics would drown the signal. Infrared is also the light that matters most for the early universe, because the expansion of space stretches ancient visible light into infrared wavelengths by the time it reaches us.',
    whyItMatters:
      'The most distant galaxies and the interiors of star-forming dust clouds are effectively invisible at the wavelengths Hubble was built for. Webb opened those two regimes at high resolution at the same time.',
    sources: [
      { label: 'NASA Science — James Webb Space Telescope', url: 'https://science.nasa.gov/mission/webb/' },
      { label: 'NASA Science — Webb science goals', url: 'https://science.nasa.gov/mission/webb/science-overview/' },
    ],
  },

  {
    slug: 'hubble',
    name: 'Hubble Space Telescope',
    program: 'Great Observatories',
    agency: 'NASA with ESA',
    status: 'active',
    kind: 'Space telescope',
    destination: 'Low Earth orbit',
    destinationClass: 'Earth orbit',
    launch: { date: '1990-04-24', vehicle: 'Space Shuttle Discovery (STS-31)', site: 'Kennedy Space Center, Florida' },
    arrival: null,
    topics: ['astrophysics', 'space-technology'],
    imageKey: 'hubble',
    purpose:
      'Observe the universe in ultraviolet, visible and near-infrared light from above the blurring effect of Earth’s atmosphere.',
    objectives: [
      'Image astronomical objects at high resolution, free of atmospheric distortion.',
      'Measure distances and expansion of the universe.',
      'Study the life cycles of stars, galaxies and the material between them.',
      'Support long-term observing programmes across many fields of astronomy.',
    ],
    instruments: [
      { name: 'WFC3', role: 'Wide Field Camera 3 — ultraviolet, visible and near-infrared imaging.' },
      { name: 'ACS', role: 'Advanced Camera for Surveys — wide-field visible imaging.' },
      { name: 'COS', role: 'Cosmic Origins Spectrograph — ultraviolet spectroscopy.' },
      { name: 'STIS', role: 'Space Telescope Imaging Spectrograph — spectroscopy across UV and visible light.' },
    ],
    keyQuestions: [
      'How fast is the universe expanding?',
      'How do galaxies change over billions of years?',
      'What happens in the environments around black holes and dying stars?',
    ],
    relationships: [
      { slug: 'webb', how: 'Overlapping science with Webb at shorter wavelengths; the two are often used together.' },
    ],
    terms: ['ultraviolet', 'deep-field', 'spectroscopy'],
    overview:
      'Hubble is a 2.4-metre telescope in low Earth orbit that has been observing since 1990. Its defining advantage is being above the atmosphere, which otherwise smears fine detail and blocks ultraviolet light entirely. Because it orbits close to Earth, it was designed to be serviced by astronauts, and Space Shuttle crews repaired and upgraded it across five servicing missions — the reason a telescope launched in 1990 still carries comparatively modern instruments.',
    whyItMatters:
      'Long-exposure Hubble images of apparently empty sky revealed thousands of distant galaxies in a single frame, which reframed public and scientific understanding of how much universe there is to count.',
    sources: [
      { label: 'NASA Science — Hubble Space Telescope', url: 'https://science.nasa.gov/mission/hubble/' },
      { label: 'NASA Science — Hubble observatory and servicing', url: 'https://science.nasa.gov/mission/hubble/observatory/' },
    ],
  },

  {
    slug: 'artemis-i',
    name: 'Artemis I',
    program: 'Artemis',
    agency: 'NASA',
    status: 'completed',
    kind: 'Uncrewed test flight',
    destination: 'The Moon — distant retrograde orbit',
    destinationClass: 'Moon',
    launch: { date: '2022-11-16', vehicle: 'Space Launch System (SLS)', site: 'Kennedy Space Center, Florida' },
    arrival: null,
    // Splashdown is the end of this mission, not an arrival — recording it as
    // `ended` keeps the flight's true 25-day span on the timeline.
    ended: { date: '2022-12-11', label: 'Orion splashdown in the Pacific Ocean' },
    topics: ['human-spaceflight', 'space-technology'],
    imageKey: 'artemis',
    purpose:
      'Test the Space Launch System rocket and the Orion spacecraft together on an uncrewed flight around the Moon before crewed missions.',
    objectives: [
      'Demonstrate the SLS rocket and Orion spacecraft performance in flight.',
      'Test Orion’s heat shield at the high speeds of a return from the Moon.',
      'Verify ground systems, navigation, communications and recovery operations.',
    ],
    instruments: [
      { name: 'Orion crew module', role: 'Spacecraft designed to carry astronauts on later Artemis missions.' },
      { name: 'European Service Module', role: 'ESA-provided module supplying propulsion, power, water and air.' },
      { name: 'CubeSat secondary payloads', role: 'Small satellites deployed to carry out independent experiments.' },
    ],
    keyQuestions: [
      'Does the heat shield protect a crew capsule returning from lunar distance?',
      'Do the rocket, spacecraft and ground systems work together as designed?',
      'What does an uncrewed flight reveal before people are aboard?',
    ],
    relationships: [
      { slug: 'artemis-ii', how: 'Artemis I was the uncrewed flight test that precedes the crewed Artemis II mission.' },
    ],
    terms: ['distant-retrograde-orbit', 'heat-shield', 'reentry'],
    overview:
      'Artemis I was an uncrewed test flight: the first time the Space Launch System rocket and the Orion spacecraft flew together. Orion travelled out to the Moon, entered a wide orbit that runs opposite to the Moon’s own direction of travel, and then returned. The most important part of the flight was the end of it — returning from the Moon means hitting the atmosphere far faster than returning from low Earth orbit, and the heat shield had never been tested at that speed with this vehicle.',
    whyItMatters:
      'Uncrewed test flights exist so that failures happen with no one aboard. Artemis I is what makes it reasonable to put a crew on the next flight.',
    sources: [
      { label: 'NASA — Artemis I', url: 'https://www.nasa.gov/mission/artemis-i/' },
    ],
  },

  {
    slug: 'artemis-ii',
    name: 'Artemis II',
    program: 'Artemis',
    agency: 'NASA with CSA',
    status: 'planned',
    kind: 'Crewed test flight',
    destination: 'The Moon — crewed lunar flyby',
    destinationClass: 'Moon',
    launch: {
      date: null,
      note: 'Scheduled mission. This project does not print a launch date it cannot attribute — check the official mission page for NASA’s current target.',
    },
    arrival: null,
    topics: ['human-spaceflight', 'space-technology'],
    imageKey: 'artemis',
    purpose:
      'Carry a crew around the Moon and back to test Orion’s life-support and crew systems in deep space.',
    objectives: [
      'Fly a crew beyond low Earth orbit for the first time in the Artemis programme.',
      'Test Orion’s life support, displays and manual handling qualities with astronauts aboard.',
      'Demonstrate deep-space communications and navigation with a crew.',
    ],
    instruments: [
      { name: 'Orion crew module', role: 'Carries the crew, with life-support systems active for the first time in flight.' },
      { name: 'European Service Module', role: 'ESA-provided propulsion, power, water and air.' },
    ],
    keyQuestions: [
      'Do Orion’s life-support systems perform as designed with a crew aboard?',
      'How do astronauts and mission control operate together at lunar distance?',
    ],
    relationships: [
      { slug: 'artemis-i', how: 'Builds directly on the uncrewed Artemis I flight test.' },
    ],
    terms: ['free-return-trajectory', 'life-support'],
    overview:
      'Artemis II is planned as the first crewed flight of the Artemis programme: astronauts aboard Orion travelling around the Moon and returning without landing. The point is not the destination but the systems — life support, crew displays, manual control and deep-space communication all have to be demonstrated with people aboard before a landing mission is reasonable.',
    whyItMatters:
      'A flyby with a crew is the step between testing hardware and trusting it with a landing.',
    sources: [
      { label: 'NASA — Artemis II', url: 'https://www.nasa.gov/mission/artemis-ii/' },
      { label: 'NASA — Artemis programme', url: 'https://www.nasa.gov/artemis/' },
    ],
  },

  {
    slug: 'parker-solar-probe',
    name: 'Parker Solar Probe',
    program: 'Living With a Star',
    agency: 'NASA / Johns Hopkins Applied Physics Laboratory',
    status: 'active',
    kind: 'Solar probe',
    destination: 'The Sun — solar corona',
    destinationClass: 'The Sun',
    launch: { date: '2018-08-12', vehicle: 'Delta IV Heavy', site: 'Cape Canaveral, Florida' },
    arrival: null,
    topics: ['heliophysics', 'space-technology'],
    imageKey: 'parker',
    purpose:
      'Fly through the Sun’s outer atmosphere to study how the corona is heated and how the solar wind is accelerated.',
    objectives: [
      'Trace the flow of energy that heats the solar corona and accelerates the solar wind.',
      'Determine the structure and dynamics of the magnetic fields at the sources of the solar wind.',
      'Explore how energetic particles are accelerated and transported.',
    ],
    instruments: [
      { name: 'FIELDS', role: 'Measures electric and magnetic fields, plasma waves and radio emission.' },
      { name: 'SWEAP', role: 'Counts and characterises electrons, protons and helium ions in the solar wind.' },
      { name: 'WISPR', role: 'Wide-field imager that photographs the corona and solar wind structures.' },
      { name: 'IS☉IS', role: 'Measures energetic particles across a broad range of energies.' },
    ],
    keyQuestions: [
      'Why is the Sun’s corona far hotter than its visible surface?',
      'What accelerates the solar wind out into the solar system?',
      'How are the highest-energy solar particles produced?',
    ],
    relationships: [],
    terms: ['corona', 'solar-wind', 'plasma', 'space-weather'],
    overview:
      'Parker Solar Probe flies repeatedly through the Sun’s outer atmosphere, protected by a carbon-composite heat shield that keeps the instruments behind it at workable temperatures. It uses gravity assists at Venus to tighten its orbit and get progressively closer. The core puzzle it was built for is that the Sun’s surface is thousands of degrees while the thin corona above it is millions — energy is somehow being deposited in the outer atmosphere, and measuring the plasma directly is the way to find out how.',
    whyItMatters:
      'The solar wind and solar storms drive space weather, which affects satellites, power grids, aviation routes and astronauts. Better physics of the corona is the basis for better forecasts.',
    sources: [
      { label: 'NASA Science — Parker Solar Probe', url: 'https://science.nasa.gov/mission/parker-solar-probe/' },
    ],
  },

  {
    slug: 'juno',
    name: 'Juno',
    program: 'New Frontiers',
    agency: 'NASA / Jet Propulsion Laboratory',
    status: 'active',
    kind: 'Orbiter',
    destination: 'Jupiter — polar orbit',
    destinationClass: 'Outer planets',
    launch: { date: '2011-08-05', vehicle: 'Atlas V 551', site: 'Cape Canaveral, Florida' },
    arrival: { date: '2016-07-04', label: 'Entered orbit around Jupiter' },
    topics: ['planetary-science'],
    imageKey: 'juno',
    purpose:
      'Study Jupiter’s interior structure, atmosphere and magnetosphere to understand how the planet formed.',
    objectives: [
      'Determine how much water is in Jupiter’s atmosphere, a clue to how the planet formed.',
      'Map the gravity and magnetic fields to reveal the deep interior structure.',
      'Study the polar magnetosphere and Jupiter’s auroras.',
    ],
    instruments: [
      { name: 'MWR', role: 'Microwave radiometer that sees below the visible cloud tops.' },
      { name: 'Magnetometer (MAG)', role: 'Maps Jupiter’s magnetic field.' },
      { name: 'JunoCam', role: 'Visible-light camera; its targets have involved public participation.' },
      { name: 'JIRAM', role: 'Infrared imager and spectrometer studying auroras and atmosphere.' },
      { name: 'Gravity Science', role: 'Uses radio tracking to measure the planet’s gravity field.' },
    ],
    keyQuestions: [
      'Does Jupiter have a solid core, and how large is it?',
      'How much water — and therefore oxygen — is in Jupiter’s deep atmosphere?',
      'What powers Jupiter’s enormous auroras?',
    ],
    relationships: [
      { slug: 'europa-clipper', how: 'Both study the Jupiter system; Juno has also observed Europa during flybys.' },
    ],
    terms: ['magnetosphere', 'aurora', 'gravity-assist'],
    overview:
      'Juno orbits Jupiter in a long, looping polar orbit that dives close to the cloud tops and then swings far out again. The far part of the orbit matters: it keeps the spacecraft out of the harshest radiation belts for most of each circuit. Rather than photographing clouds, most of its instruments are aimed at what is underneath — microwaves that penetrate the cloud deck, and precise tracking of the spacecraft’s motion that reveals how mass is distributed deep inside the planet.',
    whyItMatters:
      'Jupiter formed early and holds most of the material left over from the Sun’s formation, so its interior composition constrains how the whole solar system came together.',
    sources: [
      { label: 'NASA Science — Juno', url: 'https://science.nasa.gov/mission/juno/' },
    ],
  },

  {
    slug: 'europa-clipper',
    name: 'Europa Clipper',
    program: 'Flagship planetary science mission',
    agency: 'NASA / Jet Propulsion Laboratory and APL',
    status: 'in-transit',
    kind: 'Orbiter with flyby campaign',
    destination: 'Jupiter — repeated flybys of Europa',
    destinationClass: 'Outer planets',
    launch: { date: '2024-10-14', vehicle: 'Falcon Heavy', site: 'Kennedy Space Center, Florida' },
    arrival: {
      date: null,
      label: 'Jupiter arrival is scheduled — see the official mission page for the current date.',
    },
    topics: ['planetary-science', 'space-technology'],
    imageKey: 'europa-clipper',
    purpose:
      'Investigate whether Europa, an icy moon of Jupiter, has conditions that could support life in the ocean beneath its ice shell.',
    objectives: [
      'Determine the thickness of the ice shell and its interaction with the ocean below.',
      'Investigate the composition of the surface and any material erupting from below.',
      'Characterise the geology to understand how the surface is renewed.',
    ],
    instruments: [
      { name: 'REASON', role: 'Ice-penetrating radar to probe the shell and search for water.' },
      { name: 'EIS', role: 'Europa Imaging System — high-resolution cameras for surface geology.' },
      { name: 'MISE', role: 'Infrared spectrometer mapping surface composition, including salts and organics.' },
      { name: 'E-THEMIS', role: 'Thermal imager to find warm areas that hint at recent activity.' },
      { name: 'MASPEX / SUDA', role: 'Mass spectrometer and dust analyser that sample material around the moon.' },
      { name: 'ECM', role: 'Magnetometer, used to infer the depth and saltiness of the subsurface ocean.' },
    ],
    keyQuestions: [
      'How thick is Europa’s ice shell, and does liquid water reach near the surface?',
      'Is the subsurface ocean salty, and does it touch the rocky interior?',
      'Does Europa have the chemical ingredients and energy sources life would require?',
    ],
    relationships: [
      { slug: 'juno', how: 'Follows Juno’s observations of the Jupiter system, including Europa flybys.' },
      { slug: 'cassini', how: 'Builds on Cassini’s finding that icy moons can host subsurface oceans and plumes.' },
    ],
    terms: ['subsurface-ocean', 'habitability', 'induced-magnetic-field', 'tidal-heating'],
    overview:
      'Europa Clipper is designed to study a moon it will not orbit. Jupiter’s radiation environment is severe enough that a spacecraft parked around Europa would degrade quickly, so instead the spacecraft orbits Jupiter on a wide loop and makes repeated close flybys of Europa, spending most of its time outside the worst radiation. Its instruments are aimed at one question: whether the ocean thought to lie beneath Europa’s ice has the chemistry and energy that life needs.',
    whyItMatters:
      'If a small, cold moon far from the Sun turns out to be habitable, it widens where life could plausibly exist — in this solar system and around other stars.',
    sources: [
      { label: 'NASA Science — Europa Clipper', url: 'https://science.nasa.gov/mission/europa-clipper/' },
      { label: 'NASA Science — Europa Clipper spacecraft and instruments', url: 'https://science.nasa.gov/mission/europa-clipper/spacecraft-instruments/' },
    ],
  },

  {
    slug: 'cassini',
    name: 'Cassini–Huygens',
    program: 'Flagship outer-planets mission',
    agency: 'NASA with ESA and ASI',
    status: 'completed',
    kind: 'Orbiter and probe',
    destination: 'Saturn, its rings and moons',
    destinationClass: 'Outer planets',
    launch: { date: '1997-10-15', vehicle: 'Titan IVB/Centaur', site: 'Cape Canaveral, Florida' },
    arrival: { date: '2004-07-01', label: 'Entered orbit around Saturn' },
    ended: { date: '2017-09-15', label: 'Grand Finale — deliberate entry into Saturn’s atmosphere' },
    topics: ['planetary-science'],
    imageKey: 'cassini',
    purpose:
      'Study Saturn, its ring system and its moons over many years, and deliver ESA’s Huygens probe to the surface of Titan.',
    objectives: [
      'Study Saturn’s atmosphere, magnetosphere and ring system in detail.',
      'Investigate the moons, especially Titan and Enceladus.',
      'Deliver the Huygens probe through Titan’s atmosphere to its surface.',
    ],
    instruments: [
      { name: 'ISS (imaging)', role: 'Cameras for wide- and narrow-angle imaging of Saturn and its moons.' },
      { name: 'CIRS', role: 'Infrared spectrometer measuring temperature and composition.' },
      { name: 'INMS', role: 'Ion and neutral mass spectrometer that sampled material directly.' },
      { name: 'RADAR', role: 'Radar mapper that saw through Titan’s haze to the surface.' },
      { name: 'Huygens probe (ESA)', role: 'Descent probe that landed on Titan on 14 January 2005.' },
    ],
    keyQuestions: [
      'What is Titan’s thick atmosphere made of, and what is on its surface?',
      'Where does the material in Enceladus’ plumes come from?',
      'How do Saturn’s rings behave, and how old are they?',
    ],
    relationships: [
      { slug: 'europa-clipper', how: 'Cassini’s discovery of an active icy moon shaped the case for exploring Europa.' },
      { slug: 'voyager', how: 'Followed up on the Saturn system first surveyed by the Voyager flybys.' },
    ],
    terms: ['plume', 'tidal-heating', 'moon', 'grand-finale'],
    overview:
      'Cassini was a large orbiter that studied the Saturn system for over a decade, carrying ESA’s Huygens probe, which parachuted through Titan’s hazy atmosphere and landed on its surface in January 2005. Late in the mission, running low on fuel, the spacecraft was deliberately flown between Saturn and its rings and then into the planet — a disposal chosen so that it could not later contaminate a potentially habitable moon.',
    whyItMatters:
      'Cassini turned Saturn’s moons from points of light into places with weather, geology and, in the case of Enceladus, water venting into space.',
    sources: [
      { label: 'NASA Science — Cassini', url: 'https://science.nasa.gov/mission/cassini/' },
    ],
  },

  {
    slug: 'voyager',
    name: 'Voyager 1 and 2',
    program: 'Voyager',
    agency: 'NASA / Jet Propulsion Laboratory',
    status: 'active',
    kind: 'Flyby spacecraft, now interstellar',
    destination: 'Outer planets, now interstellar space',
    destinationClass: 'Interstellar',
    launch: { date: '1977-09-05', vehicle: 'Titan IIIE-Centaur', site: 'Cape Canaveral, Florida', note: 'Voyager 1 launch date. Voyager 2 launched earlier, on 20 August 1977, on a slower trajectory.' },
    arrival: null,
    topics: ['planetary-science', 'heliophysics'],
    imageKey: 'voyager',
    purpose:
      'Survey the outer planets and continue outward to study the boundary between the Sun’s influence and interstellar space.',
    objectives: [
      'Conduct close flybys of the outer planets and their moons.',
      'Study the heliosphere — the bubble of solar wind surrounding the solar system.',
      'Measure the interstellar medium beyond the Sun’s influence.',
    ],
    instruments: [
      { name: 'Plasma Wave Subsystem', role: 'Detects waves in the surrounding plasma; used to measure its density.' },
      { name: 'Magnetometer', role: 'Measures magnetic fields along the spacecraft’s path.' },
      { name: 'Cosmic Ray Subsystem', role: 'Measures energetic particles from the Sun and from beyond it.' },
    ],
    keyQuestions: [
      'Where does the Sun’s influence end and interstellar space begin?',
      'What is the density and magnetic structure of the interstellar medium?',
      'What did the outer planets and their moons look like up close?',
    ],
    relationships: [
      { slug: 'cassini', how: 'Voyager’s Saturn flybys motivated the long-duration Cassini orbiter.' },
      { slug: 'new-horizons', how: 'Both are outer-solar-system spacecraft now travelling beyond the planets.' },
    ],
    terms: ['heliosphere', 'heliopause', 'interstellar-medium', 'gravity-assist'],
    overview:
      'The two Voyager spacecraft launched in 1977 and used a rare alignment of the outer planets to swing from one to the next, gaining speed at each. After the planetary tour they kept going. Voyager 1 crossed into interstellar space in 2012 and Voyager 2 in 2018 — meaning they passed the boundary where the solar wind gives way to the material between the stars. They remain the most distant human-made objects, still returning data on a shrinking power budget.',
    whyItMatters:
      'Voyager provides the only in-place measurements ever made of the interstellar medium, and it is the reason we know where the Sun’s bubble of influence actually ends.',
    sources: [
      { label: 'NASA Science — Voyager', url: 'https://science.nasa.gov/mission/voyager/' },
      { label: 'NASA — Voyager mission status', url: 'https://science.nasa.gov/mission/voyager/where-are-they-now/' },
    ],
  },

  {
    slug: 'new-horizons',
    name: 'New Horizons',
    program: 'New Frontiers',
    agency: 'NASA / Johns Hopkins Applied Physics Laboratory',
    status: 'active',
    kind: 'Flyby spacecraft',
    destination: 'Pluto and the Kuiper Belt',
    destinationClass: 'Kuiper Belt',
    launch: { date: '2006-01-19', vehicle: 'Atlas V 551', site: 'Cape Canaveral, Florida' },
    arrival: { date: '2015-07-14', label: 'Closest approach to Pluto' },
    topics: ['planetary-science'],
    imageKey: 'new-horizons',
    purpose:
      'Perform the first close reconnaissance of Pluto and its moons, then study objects in the Kuiper Belt.',
    objectives: [
      'Map the surface composition and geology of Pluto and its moon Charon.',
      'Characterise Pluto’s atmosphere and how it escapes.',
      'Study smaller objects in the Kuiper Belt beyond Pluto.',
    ],
    instruments: [
      { name: 'LORRI', role: 'Long-range telescopic camera used for approach imaging.' },
      { name: 'Ralph', role: 'Visible and infrared imager and spectrometer for composition mapping.' },
      { name: 'Alice', role: 'Ultraviolet spectrometer used to study the atmosphere.' },
      { name: 'SWAP / PEPSSI', role: 'Instruments measuring the solar wind and energetic particles.' },
    ],
    keyQuestions: [
      'What does Pluto’s surface look like, and is it geologically active?',
      'How does Pluto’s thin atmosphere behave and escape?',
      'What are Kuiper Belt objects made of, and what do they say about the early solar system?',
    ],
    relationships: [
      { slug: 'voyager', how: 'Continues the outward exploration begun by the Voyager spacecraft.' },
    ],
    terms: ['kuiper-belt', 'dwarf-planet', 'flyby'],
    overview:
      'New Horizons flew past Pluto in July 2015 after a nine-year cruise, returning the first detailed images of a world that had until then been a few pixels across in the best telescopes. Because it was moving too fast to stop, the entire encounter was a single pass, with data trickling back to Earth over many months afterwards. It went on to fly past a small, distant Kuiper Belt object on 1 January 2019 and continues outward.',
    whyItMatters:
      'Pluto turned out to have varied terrain and signs of geological activity, which was not what a small, cold, distant body was expected to look like.',
    sources: [
      { label: 'NASA Science — New Horizons', url: 'https://science.nasa.gov/mission/new-horizons/' },
    ],
  },

  {
    slug: 'osiris-rex',
    name: 'OSIRIS-REx',
    program: 'New Frontiers',
    agency: 'NASA / Goddard Space Flight Center',
    status: 'completed',
    kind: 'Sample return',
    destination: 'Asteroid Bennu',
    destinationClass: 'Small bodies',
    launch: { date: '2016-09-08', vehicle: 'Atlas V 411', site: 'Cape Canaveral, Florida' },
    arrival: { date: '2018-12-03', label: 'Arrived at asteroid Bennu' },
    ended: { date: '2023-09-24', label: 'Sample capsule returned to Earth in the Utah desert' },
    topics: ['planetary-science', 'space-technology'],
    imageKey: 'osiris-rex',
    purpose:
      'Collect a sample from the near-Earth asteroid Bennu and return it to Earth for laboratory study.',
    objectives: [
      'Return a sample of regolith from a carbon-rich asteroid.',
      'Map Bennu’s surface, composition and physical properties before sampling.',
      'Measure the forces that change the orbits of near-Earth asteroids.',
    ],
    instruments: [
      { name: 'TAGSAM', role: 'Sampling arm that touched the surface and puffed nitrogen to lift regolith.' },
      { name: 'OCAMS', role: 'Camera suite used for mapping and for guiding the sampling attempt.' },
      { name: 'OLA', role: 'Laser altimeter that produced a detailed 3-D shape model of Bennu.' },
      { name: 'OVIRS / OTES', role: 'Spectrometers identifying minerals and organic material.' },
    ],
    keyQuestions: [
      'What are carbon-rich asteroids made of at the molecular level?',
      'Do asteroids like Bennu carry organic compounds and water-bearing minerals?',
      'What non-gravitational forces alter the orbits of near-Earth asteroids?',
    ],
    relationships: [],
    terms: ['regolith', 'near-earth-object', 'sample-return', 'organic-compound'],
    overview:
      'OSIRIS-REx spent roughly two years surveying the asteroid Bennu, then briefly touched its surface in a manoeuvre that released a burst of nitrogen gas to stir up loose material into a collection head. The spacecraft never landed — it made contact for a few seconds and backed away. In September 2023 it released a capsule that parachuted into the Utah desert, delivering the asteroid material to laboratories on Earth.',
    whyItMatters:
      'Asteroids like Bennu are leftovers from the solar system’s formation. Studying returned material in a laboratory allows measurements no spacecraft instrument can make, and the same sample can be re-analysed as techniques improve.',
    sources: [
      { label: 'NASA Science — OSIRIS-REx', url: 'https://science.nasa.gov/mission/osiris-rex/' },
    ],
  },

  {
    slug: 'iss',
    name: 'International Space Station',
    program: 'International partnership',
    agency: 'NASA, Roscosmos, JAXA, ESA and CSA',
    status: 'active',
    kind: 'Crewed orbital laboratory',
    destination: 'Low Earth orbit',
    destinationClass: 'Earth orbit',
    launch: { date: '1998-11-20', vehicle: 'Proton (Zarya module)', site: 'Baikonur Cosmodrome', note: 'Date of the first module launch; the station was assembled over many subsequent flights.' },
    arrival: { date: '2000-11-02', label: 'Beginning of continuous human presence aboard' },
    topics: ['human-spaceflight', 'earth-science', 'space-technology', 'robotics'],
    imageKey: 'iss',
    purpose:
      'Operate a permanently crewed laboratory in low Earth orbit for research in microgravity and for observing Earth.',
    objectives: [
      'Conduct research in microgravity across biology, physics, materials and medicine.',
      'Study the effects of long-duration spaceflight on the human body.',
      'Host Earth-observing instruments and technology demonstrations.',
      'Sustain international cooperation in human spaceflight operations.',
    ],
    instruments: [
      { name: 'Canadarm2', role: 'Robotic arm used to capture visiting spacecraft and support spacewalks.' },
      { name: 'Destiny, Columbus, Kibō laboratories', role: 'Research modules provided by the United States, ESA and JAXA.' },
      { name: 'External Earth-observing payloads', role: 'Instruments mounted outside that monitor Earth systems.' },
    ],
    keyQuestions: [
      'How does the human body adapt to months of weightlessness, and what reverses on return?',
      'What can be learned from physical and biological processes without gravity-driven convection?',
      'How do you keep a complex habitat running continuously for decades?',
    ],
    relationships: [
      { slug: 'artemis-ii', how: 'Long-duration ISS research informs crew health planning for deep-space missions.' },
    ],
    terms: ['microgravity', 'low-earth-orbit', 'expedition'],
    overview:
      'The International Space Station is a laboratory the size of a large building, assembled in orbit from modules launched separately by several countries. It has been continuously occupied since November 2000. Its scientific value comes from a condition that cannot be sustained on Earth: continuous free fall, which removes the convection and settling that dominate ordinary experiments, and which stresses the human body in measurable, repeatable ways.',
    whyItMatters:
      'The station is the main source of long-duration human health data used to plan missions where a crew cannot return home quickly.',
    sources: [
      { label: 'NASA — International Space Station', url: 'https://www.nasa.gov/international-space-station/' },
      { label: 'NASA — ISS research and technology', url: 'https://www.nasa.gov/international-space-station/space-station-research-and-technology/' },
    ],
  },

  {
    slug: 'swot',
    name: 'SWOT',
    program: 'Surface Water and Ocean Topography',
    agency: 'NASA with CNES (France), CSA and UKSA',
    status: 'active',
    kind: 'Earth-observing satellite',
    destination: 'Earth orbit',
    destinationClass: 'Earth orbit',
    launch: { date: '2022-12-16', vehicle: 'Falcon 9', site: 'Vandenberg Space Force Base, California' },
    arrival: null,
    topics: ['earth-science', 'space-technology'],
    imageKey: 'swot',
    purpose:
      'Survey the height of water across nearly all of Earth’s ocean surface, lakes, reservoirs and rivers.',
    objectives: [
      'Measure the height of ocean surfaces at much finer scales than earlier altimeters.',
      'Survey lakes, reservoirs and rivers worldwide to track freshwater storage.',
      'Improve understanding of how the ocean and atmosphere exchange heat and carbon.',
    ],
    instruments: [
      { name: 'KaRIn', role: 'Ka-band Radar Interferometer — two antennas that map water-surface height in wide swaths.' },
      { name: 'Nadir altimeter', role: 'Conventional altimeter providing measurements directly below the spacecraft.' },
      { name: 'Radiometer', role: 'Corrects radar measurements for water vapour in the atmosphere.' },
    ],
    keyQuestions: [
      'How much fresh water is stored in the world’s lakes and rivers, and how is it changing?',
      'How do small-scale ocean features move heat and carbon?',
      'How can water-height data improve flood and drought planning?',
    ],
    relationships: [],
    terms: ['altimetry', 'interferometry', 'hydrology', 'swath'],
    overview:
      'SWOT measures the height of water. Earlier satellite altimeters worked along a single line beneath the spacecraft; SWOT’s radar interferometer uses two antennas on a boom to map a wide strip at once, which is what makes it possible to survey individual lakes and river reaches rather than just the open ocean. The result is a global inventory of surface water — both salt and fresh — measured repeatedly over time.',
    whyItMatters:
      'Fresh water availability and small-scale ocean circulation are both poorly measured globally, and both matter directly for climate models and for water management.',
    sources: [
      { label: 'NASA Science — SWOT', url: 'https://science.nasa.gov/mission/swot/' },
    ],
  },

  {
    slug: 'landsat-9',
    name: 'Landsat 9',
    program: 'Landsat',
    agency: 'NASA with the U.S. Geological Survey',
    status: 'active',
    kind: 'Earth-observing satellite',
    destination: 'Earth orbit',
    destinationClass: 'Earth orbit',
    launch: { date: '2021-09-27', vehicle: 'Atlas V 401', site: 'Vandenberg Space Force Base, California' },
    arrival: null,
    topics: ['earth-science'],
    imageKey: 'earth-science',
    purpose:
      'Continue the Landsat record of Earth’s land surface, the longest continuous space-based record of its kind.',
    objectives: [
      'Extend an uninterrupted multi-decade record of global land cover.',
      'Support monitoring of agriculture, forests, water use, glaciers and urban growth.',
      'Provide freely available imagery for research and public use.',
    ],
    instruments: [
      { name: 'OLI-2', role: 'Operational Land Imager 2 — visible, near-infrared and shortwave-infrared imaging.' },
      { name: 'TIRS-2', role: 'Thermal Infrared Sensor 2 — measures surface temperature.' },
    ],
    keyQuestions: [
      'How is land cover changing across decades, and where fastest?',
      'How much water does irrigated agriculture actually consume?',
      'How are glaciers, coastlines and forests changing over time?',
    ],
    relationships: [
      { slug: 'swot', how: 'Complementary Earth observation — Landsat images land surfaces, SWOT measures water height.' },
    ],
    terms: ['remote-sensing', 'multispectral', 'time-series'],
    overview:
      'Landsat satellites have imaged Earth’s land surface continuously since the 1970s, and Landsat 9 continues that record. The value is less in any single image than in the length and consistency of the series: because comparable measurements exist for decades, researchers can measure change directly rather than inferring it. The data is distributed free of charge, which is a large part of why the record is so widely used.',
    whyItMatters:
      'A consistent, open, multi-decade image record is what makes it possible to say how much a forest, glacier or city has actually changed, rather than how much it appears to have changed.',
    sources: [
      { label: 'NASA — Landsat 9', url: 'https://science.nasa.gov/mission/landsat-9/' },
      { label: 'NASA Landsat Science', url: 'https://landsat.gsfc.nasa.gov/' },
    ],
  },

  {
    slug: 'x-59',
    name: 'X-59',
    program: 'Quesst',
    agency: 'NASA / Armstrong Flight Research Center',
    status: 'in-testing',
    kind: 'Experimental aircraft',
    destination: 'Earth’s atmosphere — flight test',
    destinationClass: 'Aeronautics',
    launch: {
      date: null,
      note: 'Not a launched spacecraft. This is an experimental aircraft in flight test; see the official mission page for current flight-test milestones.',
    },
    arrival: null,
    topics: ['aeronautics', 'space-technology'],
    imageKey: 'aeronautics',
    purpose:
      'Demonstrate supersonic flight that produces a quiet thump instead of a loud sonic boom, and gather community response data for regulators.',
    objectives: [
      'Fly supersonically while shaping the shock waves to reduce noise heard on the ground.',
      'Measure the sound that actually reaches the ground during flight tests.',
      'Collect community response data to inform future rules on overland supersonic flight.',
    ],
    instruments: [
      { name: 'Shaped airframe', role: 'The long, narrow shape itself is the experiment — it spreads out shock waves.' },
      { name: 'eXternal Vision System', role: 'Forward-facing camera display, because the nose shape leaves no forward window.' },
      { name: 'Ground and airborne acoustic sensors', role: 'Measure the noise signature produced during test flights.' },
    ],
    keyQuestions: [
      'Can an aircraft’s shape reduce a sonic boom to a sound people find acceptable?',
      'What noise level do communities on the ground actually tolerate?',
      'Should rules banning overland supersonic flight be based on speed, or on measured noise?',
    ],
    relationships: [
      { slug: 'ingenuity', how: 'Both are aeronautics research vehicles, one in Earth’s atmosphere and one in Mars’.' },
    ],
    terms: ['sonic-boom', 'shock-wave', 'supersonic'],
    overview:
      'Overland supersonic passenger flight is restricted largely because of the noise a sonic boom makes on the ground. The X-59 tests an alternative premise: that shaping an aircraft carefully can spread its shock waves so that what reaches the ground is a soft thump rather than a bang. The aircraft is a research vehicle, not a prototype airliner — its purpose is to generate measured noise data and recorded community reactions that regulators could use to write noise-based rather than speed-based rules.',
    whyItMatters:
      'If the rule can be written around measured noise instead of a speed limit, quiet supersonic travel over land becomes a regulatory possibility rather than a prohibited one.',
    sources: [
      { label: 'NASA — Quesst mission', url: 'https://www.nasa.gov/mission/quesst/' },
      { label: 'NASA — X-59 aircraft', url: 'https://www.nasa.gov/x-59/' },
    ],
  },
  {
    slug: 'apollo-11',
    name: 'Apollo 11',
    program: 'Apollo',
    agency: 'NASA',
    status: 'completed',
    kind: 'Crewed lunar landing',
    destination: 'The Moon — Mare Tranquillitatis',
    destinationClass: 'Moon',
    launch: { date: '1969-07-16', vehicle: 'Saturn V', site: 'Kennedy Space Center, Florida' },
    arrival: { date: '1969-07-20', label: 'Lunar module Eagle landed in the Sea of Tranquility' },
    ended: { date: '1969-07-24', label: 'Splashdown in the Pacific Ocean' },
    topics: ['human-spaceflight'],
    imageKey: 'apollo-11',
    purpose:
      'Land astronauts on the Moon, carry out surface science, and return them safely to Earth.',
    objectives: [
      'Perform the first crewed landing on the surface of the Moon.',
      'Collect lunar rock and soil samples for study on Earth.',
      'Deploy a small package of scientific instruments on the surface.',
      'Demonstrate that a crew could land, work outside, launch again and return safely.',
    ],
    instruments: [
      { name: 'Lunar module (Eagle)', role: 'Carried two astronauts to the surface and back to lunar orbit.' },
      { name: 'Command and service module (Columbia)', role: 'Remained in lunar orbit with the third crew member and returned the crew to Earth.' },
      { name: 'Passive seismic experiment', role: 'Listened for moonquakes and meteoroid impacts after the crew departed.' },
      { name: 'Laser ranging retroreflector', role: 'A mirror array still used from Earth to measure the distance to the Moon.' },
      { name: 'Solar wind composition experiment', role: 'A foil sheet exposed on the surface to catch particles streaming from the Sun.' },
    ],
    keyQuestions: [
      'Can a crew land on another world, work on its surface and return alive?',
      'What is the Moon made of, and what does that say about how it formed?',
      'Is the Moon geologically active, or seismically quiet?',
      'How precisely can the Earth–Moon distance be measured?',
    ],
    relationships: [
      { slug: 'artemis-i', how: 'Artemis is the programme returning crews to the Moon more than half a century later.' },
    ],
    terms: ['regolith', 'sample-return', 'seismometer'],
    overview:
      'Apollo 11 put two people on the Moon and brought all three crew members home. Two flew the lunar module down to a basaltic plain called the Sea of Tranquility while the third stayed in orbit aboard the command module. The surface stay was short — a single excursion — but it was not only symbolic: the crew collected rock and soil, and left instruments behind that kept working after they had gone. One of them, a mirror array for bouncing lasers off, is still in use today, which makes it among the longest-running experiments in planetary science.',
    whyItMatters:
      'The returned samples are still being re-analysed with techniques that did not exist in 1969 — the clearest demonstration of why bringing material back is worth the difficulty.',
    sources: [
      { label: 'NASA — Apollo 11', url: 'https://www.nasa.gov/mission/apollo-11/' },
      { label: 'NASA — The Apollo Program', url: 'https://www.nasa.gov/the-apollo-program/' },
    ],
  },

  {
    slug: 'chandra',
    name: 'Chandra X-ray Observatory',
    program: 'Great Observatories',
    agency: 'NASA / Smithsonian Astrophysical Observatory',
    status: 'active',
    kind: 'Space telescope',
    destination: 'High Earth orbit',
    destinationClass: 'Earth orbit',
    launch: { date: '1999-07-23', vehicle: 'Space Shuttle Columbia (STS-93)', site: 'Kennedy Space Center, Florida' },
    arrival: null,
    topics: ['astrophysics'],
    imageKey: 'chandra',
    purpose:
      'Observe the universe in X-rays to study the hottest and most energetic processes in the cosmos.',
    objectives: [
      'Image X-ray sources at high angular resolution.',
      'Study the remnants of exploded stars and the hot gas that fills galaxy clusters.',
      'Observe matter falling towards black holes and neutron stars.',
      'Measure the composition and temperature of hot cosmic plasma through X-ray spectroscopy.',
    ],
    instruments: [
      { name: 'ACIS', role: 'Advanced CCD Imaging Spectrometer — images and measures the energy of each X-ray.' },
      { name: 'HRC', role: 'High Resolution Camera — the finest spatial detail Chandra can achieve.' },
      { name: 'HETG / LETG', role: 'Transmission gratings that spread X-rays into a spectrum for detailed chemistry.' },
    ],
    keyQuestions: [
      'What happens to matter as it falls into a black hole?',
      'How is the hot gas between galaxies in a cluster distributed and heated?',
      'What elements are forged and scattered when a massive star explodes?',
    ],
    relationships: [
      { slug: 'hubble', how: 'Companion Great Observatory; the two often observe the same object at different wavelengths.' },
      { slug: 'spitzer', how: 'Both are Great Observatories covering wavelengths the human eye cannot see.' },
    ],
    terms: ['spectroscopy', 'plasma', 'x-ray'],
    overview:
      'X-rays do not reflect off mirrors the way visible light does — strike a mirror head-on and they are absorbed. Chandra therefore uses nested mirrors set almost parallel to the incoming light, so X-rays graze off them at a shallow angle and are funnelled to a focus. Because Earth’s atmosphere blocks X-rays entirely, this can only be done from space. What it reveals is the violent universe: gas at millions of degrees, matter spiralling into black holes, and the debris of exploded stars.',
    whyItMatters:
      'Much of the ordinary matter in the universe is not in stars at all but in hot, thin gas that emits only in X-rays — invisible to every other kind of telescope.',
    sources: [
      { label: 'NASA Science — Chandra X-ray Observatory', url: 'https://science.nasa.gov/mission/chandra/' },
      { label: 'Chandra X-ray Center', url: 'https://chandra.harvard.edu/' },
    ],
  },

  {
    slug: 'kepler',
    name: 'Kepler',
    program: 'Discovery',
    agency: 'NASA / Ames Research Center',
    status: 'completed',
    kind: 'Space telescope',
    destination: 'Earth-trailing solar orbit',
    destinationClass: 'Deep space',
    launch: { date: '2009-03-07', vehicle: 'Delta II', site: 'Cape Canaveral, Florida' },
    arrival: null,
    ended: { date: '2018-10-30', label: 'Retired after running out of fuel' },
    topics: ['astrophysics'],
    imageKey: 'kepler',
    purpose:
      'Determine how common Earth-sized planets are by watching a single patch of sky for the tiny dimmings caused by planets crossing their stars.',
    objectives: [
      'Survey a large sample of stars continuously for planetary transits.',
      'Measure how many stars host planets, and of what sizes and orbital periods.',
      'Find planets in the habitable zone, where liquid water could exist on a surface.',
    ],
    instruments: [
      { name: 'Photometer', role: 'A wide-field telescope that measured tiny changes in the brightness of many stars at once.' },
    ],
    keyQuestions: [
      'How common are planets around other stars?',
      'How many stars have a planet roughly the size of Earth in the habitable zone?',
      'What range of planet sizes and orbits actually exists?',
    ],
    relationships: [
      { slug: 'tess', how: 'TESS extended the transit search to the whole sky and to nearer, brighter stars.' },
      { slug: 'webb', how: 'Webb can study the atmospheres of planets first found by transit surveys.' },
    ],
    terms: ['exoplanet', 'transit-method', 'habitability'],
    overview:
      'Kepler answered a question by staring. It pointed at one patch of sky towards Cygnus and Lyra and measured the brightness of about 150,000 stars continuously, looking for the fractional dip that occurs when a planet passes in front of its star. Any single dip means little; a dip that repeats on a regular period is a planet. When two of its reaction wheels failed, the spacecraft could no longer hold that steady stare, and it was repurposed as K2, surveying along the plane of Earth’s orbit until its fuel ran out.',
    whyItMatters:
      'Before Kepler, nobody knew whether planetary systems were common or rare. Afterwards it was clear that planets outnumber stars, which reframed the search for life from a long shot to a statistical question.',
    sources: [
      { label: 'NASA Science — Kepler', url: 'https://science.nasa.gov/mission/kepler/' },
      { label: 'NASA Exoplanet Archive', url: 'https://exoplanetarchive.ipac.caltech.edu/' },
    ],
  },

  {
    slug: 'tess',
    name: 'TESS',
    program: 'Explorers',
    agency: 'NASA / MIT',
    status: 'active',
    kind: 'Space telescope',
    destination: 'High Earth orbit in resonance with the Moon',
    destinationClass: 'Earth orbit',
    launch: { date: '2018-04-18', vehicle: 'Falcon 9', site: 'Cape Canaveral, Florida' },
    arrival: null,
    topics: ['astrophysics'],
    imageKey: 'tess',
    purpose:
      'Survey almost the entire sky for planets transiting nearby bright stars, producing targets that other telescopes can study in detail.',
    objectives: [
      'Search bright, nearby stars across nearly the whole sky for transiting planets.',
      'Find planets close enough and bright enough for follow-up atmospheric study.',
      'Measure the sizes and orbits of the planets it detects.',
    ],
    instruments: [
      { name: 'Four wide-field cameras', role: 'Together they observe a tall strip of sky at once, moving sector by sector.' },
    ],
    keyQuestions: [
      'Which nearby stars host transiting planets?',
      'Which of those planets are the best candidates for atmospheric study?',
      'How do planetary systems around nearby stars compare with our own?',
    ],
    relationships: [
      { slug: 'kepler', how: 'Successor in method — the same transit technique, applied to the whole sky rather than one patch.' },
      { slug: 'webb', how: 'Supplies bright, nearby targets whose atmospheres Webb can then examine.' },
    ],
    terms: ['exoplanet', 'transit-method'],
    overview:
      'Kepler measured how common planets are; TESS finds the ones close enough to study. It surveys the sky in sectors, watching bright nearby stars for transits. The distinction matters because atmospheric study needs photons: a planet around a faint, distant star may be confirmed but can never be characterised, whereas one around a bright neighbour can have its atmosphere probed by a telescope like Webb. Its orbit is unusual — a long ellipse locked in a two-to-one resonance with the Moon, which keeps it stable with almost no fuel.',
    whyItMatters:
      'Nearly every exoplanet whose atmosphere is now being examined in detail started as a transit signal from a survey like this one.',
    sources: [
      { label: 'NASA Science — TESS', url: 'https://science.nasa.gov/mission/tess/' },
    ],
  },

  {
    slug: 'spitzer',
    name: 'Spitzer Space Telescope',
    program: 'Great Observatories',
    agency: 'NASA / Jet Propulsion Laboratory',
    status: 'completed',
    kind: 'Space telescope',
    destination: 'Earth-trailing solar orbit',
    destinationClass: 'Deep space',
    launch: { date: '2003-08-25', vehicle: 'Delta II', site: 'Cape Canaveral, Florida' },
    arrival: null,
    ended: { date: '2020-01-30', label: 'Mission concluded and spacecraft placed in safe mode' },
    topics: ['astrophysics'],
    imageKey: 'spitzer',
    purpose:
      'Observe the universe in infrared light, seeing through dust to reach objects too cool or too obscured for visible-light telescopes.',
    objectives: [
      'Study star formation inside dust clouds that block visible light.',
      'Observe cool objects such as brown dwarfs and dusty discs around young stars.',
      'Detect and characterise light from exoplanets.',
      'Survey distant galaxies whose light has been stretched into the infrared.',
    ],
    instruments: [
      { name: 'IRAC', role: 'Infrared Array Camera — imaging at four infrared wavelengths.' },
      { name: 'IRS', role: 'Infrared Spectrograph — split infrared light to identify materials.' },
      { name: 'MIPS', role: 'Multiband Imaging Photometer — imaging at longer, cooler infrared wavelengths.' },
    ],
    keyQuestions: [
      'What is happening inside the dust clouds where stars are born?',
      'What are the coolest objects in the galaxy made of?',
      'What can infrared light reveal about planets around other stars?',
    ],
    relationships: [
      { slug: 'webb', how: 'Webb continues and greatly extends infrared astronomy from space.' },
      { slug: 'chandra', how: 'Both are Great Observatories, covering opposite ends of the spectrum.' },
    ],
    terms: ['infrared', 'spectroscopy', 'exoplanet'],
    overview:
      'Spitzer trailed behind Earth in its orbit around the Sun, drifting slowly further away each year. That was deliberate: away from Earth’s heat, the telescope could stay extremely cold, which is essential for infrared work because a warm telescope glows in the very light it is trying to detect. It carried liquid helium to keep its instruments cold; when that ran out in 2009 the mission continued in a warm phase using the two shortest-wavelength channels, which needed less cooling.',
    whyItMatters:
      'Spitzer demonstrated that infrared space telescopes could study exoplanet atmospheres at all — a capability that shaped what Webb was designed to do.',
    sources: [
      { label: 'NASA Science — Spitzer Space Telescope', url: 'https://science.nasa.gov/mission/spitzer/' },
    ],
  },

  {
    slug: 'sdo',
    name: 'Solar Dynamics Observatory',
    program: 'Living With a Star',
    agency: 'NASA / Goddard Space Flight Center',
    status: 'active',
    kind: 'Solar observatory',
    destination: 'Geosynchronous Earth orbit',
    destinationClass: 'Earth orbit',
    launch: { date: '2010-02-11', vehicle: 'Atlas V 401', site: 'Cape Canaveral, Florida' },
    arrival: null,
    topics: ['heliophysics'],
    imageKey: 'sdo',
    purpose:
      'Observe the Sun continuously at high cadence and resolution to understand how its magnetic field drives solar activity.',
    objectives: [
      'Image the Sun in many wavelengths at high time resolution, without interruption.',
      'Map the Sun’s surface magnetic field and probe its interior through helioseismology.',
      'Measure the Sun’s extreme-ultraviolet output, which drives changes in Earth’s upper atmosphere.',
    ],
    instruments: [
      { name: 'AIA', role: 'Atmospheric Imaging Assembly — images the solar atmosphere in several ultraviolet wavelengths every few seconds.' },
      { name: 'HMI', role: 'Helioseismic and Magnetic Imager — maps surface magnetic fields and motions to probe the interior.' },
      { name: 'EVE', role: 'EUV Variability Experiment — measures the Sun’s extreme-ultraviolet output.' },
    ],
    keyQuestions: [
      'How is the Sun’s magnetic field generated and reorganised?',
      'What triggers a solar flare or a coronal mass ejection?',
      'How does the Sun’s changing output affect Earth’s upper atmosphere?',
    ],
    relationships: [
      { slug: 'parker-solar-probe', how: 'SDO watches the whole Sun from a distance while Parker samples the corona directly.' },
    ],
    terms: ['corona', 'space-weather', 'plasma', 'geosynchronous-orbit'],
    overview:
      'SDO sits in an orbit that keeps it in near-constant view of both the Sun and a single ground station, so it can return an enormous, uninterrupted stream of images. It photographs the Sun every few seconds in multiple ultraviolet wavelengths, each of which corresponds to gas at a different temperature — so switching between them is effectively switching between layers of the solar atmosphere. The result is less a set of photographs than a continuous film of the Sun’s magnetic behaviour running for over a decade.',
    whyItMatters:
      'Space-weather forecasting depends on watching the Sun continuously; a gap in coverage is a gap in warning.',
    sources: [
      { label: 'NASA Science — Solar Dynamics Observatory', url: 'https://science.nasa.gov/mission/sdo/' },
    ],
  },

  {
    slug: 'mms',
    name: 'Magnetospheric Multiscale',
    program: 'Solar Terrestrial Probes',
    agency: 'NASA / Goddard Space Flight Center',
    status: 'active',
    kind: 'Four-spacecraft formation',
    destination: 'Earth’s magnetosphere',
    destinationClass: 'Earth orbit',
    launch: { date: '2015-03-12', vehicle: 'Atlas V 421', site: 'Cape Canaveral, Florida' },
    arrival: null,
    topics: ['heliophysics'],
    imageKey: 'mms',
    purpose:
      'Study magnetic reconnection — the process by which magnetic field lines break and reconnect, releasing energy — by flying four spacecraft in tight formation.',
    objectives: [
      'Measure magnetic reconnection directly, at the small scale where it actually happens.',
      'Determine how reconnection converts magnetic energy into particle energy.',
      'Study the boundary where the solar wind meets Earth’s magnetic field.',
    ],
    instruments: [
      { name: 'FIELDS suite', role: 'Measures electric and magnetic fields across all four spacecraft.' },
      { name: 'Fast Plasma Investigation', role: 'Samples electrons and ions far faster than earlier instruments could.' },
      { name: 'Hot Plasma Composition Analyser', role: 'Identifies which ion species are present and how energetic they are.' },
    ],
    keyQuestions: [
      'How exactly do magnetic field lines break and reconnect?',
      'Where does the released energy go, and how quickly?',
      'How does reconnection at Earth’s magnetic boundary drive space weather?',
    ],
    relationships: [
      { slug: 'sdo', how: 'Reconnection studied at Earth is the same process that powers flares SDO observes on the Sun.' },
      { slug: 'parker-solar-probe', how: 'Both study how magnetic fields transfer energy to charged particles.' },
    ],
    terms: ['magnetic-reconnection', 'magnetosphere', 'plasma', 'space-weather'],
    overview:
      'Magnetic reconnection is the process behind solar flares, auroras and many space-weather disturbances, but it happens in a region only a few kilometres across, and it happens fast. A single spacecraft flying through cannot tell whether a change it measures is happening in time or simply moving past it in space. MMS solves that with four identical spacecraft flying in a pyramid formation, sometimes only a few kilometres apart, sampling the same region at once so the structure can be reconstructed in three dimensions.',
    whyItMatters:
      'Reconnection converts stored magnetic energy into fast particles throughout the universe — in solar flares, around other stars and inside fusion reactors on Earth.',
    sources: [
      { label: 'NASA Science — Magnetospheric Multiscale', url: 'https://science.nasa.gov/mission/mms/' },
    ],
  },

  {
    slug: 'icesat-2',
    name: 'ICESat-2',
    program: 'Earth Systematic Missions',
    agency: 'NASA / Goddard Space Flight Center',
    status: 'active',
    kind: 'Earth-observing satellite',
    destination: 'Polar Earth orbit',
    destinationClass: 'Earth orbit',
    launch: { date: '2018-09-15', vehicle: 'Delta II', site: 'Vandenberg Space Force Base, California' },
    arrival: null,
    topics: ['earth-science'],
    imageKey: 'icesat-2',
    purpose:
      'Measure the changing height of Earth’s ice sheets, glaciers and sea ice with a photon-counting laser altimeter.',
    objectives: [
      'Track how the elevation of the Greenland and Antarctic ice sheets is changing.',
      'Measure the thickness of floating sea ice.',
      'Measure vegetation canopy height to estimate how much carbon forests store.',
    ],
    instruments: [
      { name: 'ATLAS', role: 'Advanced Topographic Laser Altimeter System — fires 10,000 laser pulses a second and times individual returning photons.' },
    ],
    keyQuestions: [
      'How fast are the ice sheets losing or gaining mass, and where?',
      'How is the thickness of Arctic sea ice changing, not just its area?',
      'How much carbon is held in the world’s forests?',
    ],
    relationships: [
      { slug: 'swot', how: 'Complementary altimetry — ICESat-2 measures ice and land elevation, SWOT measures water height.' },
      { slug: 'landsat-9', how: 'Landsat images what the surface looks like; ICESat-2 measures how tall it is.' },
    ],
    terms: ['altimetry', 'cryosphere', 'time-series'],
    overview:
      'ICESat-2 measures height by timing light. Its laser fires ten thousand pulses a second, and the instrument is sensitive enough to time the return of individual photons — enough to detect a change in ice elevation smaller than the width of a pencil. Sea ice matters especially: satellites have tracked its area for decades, but area alone hides the story. Ice can cover the same extent while being far thinner, and thickness is what determines how much is actually there.',
    whyItMatters:
      'Ice-sheet loss is the largest uncertainty in sea-level projections, and it is a question of elevation change measured over years — precisely what this instrument was built to do.',
    sources: [
      { label: 'NASA Science — ICESat-2', url: 'https://science.nasa.gov/mission/icesat-2/' },
    ],
  },

  {
    slug: 'pace',
    name: 'PACE',
    program: 'Earth Systematic Missions',
    agency: 'NASA / Goddard Space Flight Center',
    status: 'active',
    kind: 'Earth-observing satellite',
    destination: 'Polar Earth orbit',
    destinationClass: 'Earth orbit',
    launch: { date: '2024-02-08', vehicle: 'Falcon 9', site: 'Cape Canaveral, Florida' },
    arrival: null,
    topics: ['earth-science'],
    imageKey: 'pace',
    purpose:
      'Study ocean colour, aerosols and clouds to understand how the ocean and atmosphere exchange carbon and energy.',
    objectives: [
      'Identify the types of phytoplankton in the ocean, not just how much there is.',
      'Measure aerosols and clouds to reduce uncertainty in how they affect climate.',
      'Track ocean health, harmful algal blooms and the ocean’s role in the carbon cycle.',
    ],
    instruments: [
      { name: 'OCI', role: 'Ocean Colour Instrument — a hyperspectral sensor measuring the colour of the ocean in fine detail.' },
      { name: 'SPEXone', role: 'Polarimeter measuring how aerosols scatter and polarise light.' },
      { name: 'HARP2', role: 'Wide-angle polarimeter viewing each scene from many directions at once.' },
    ],
    keyQuestions: [
      'Which kinds of phytoplankton live where, and how is that changing?',
      'How do aerosols and clouds interact, and how much do they cool or warm the planet?',
      'How much carbon does the ocean take up, and what controls it?',
    ],
    relationships: [
      { slug: 'terra', how: 'Continues and refines the ocean-colour and aerosol record begun by MODIS.' },
      { slug: 'swot', how: 'Both study the ocean — PACE its biology and colour, SWOT its surface height and circulation.' },
    ],
    terms: ['ocean-colour', 'remote-sensing', 'multispectral'],
    overview:
      'The colour of the ocean is a measurement, not an aesthetic. Different microscopic organisms absorb and reflect light differently, so the precise shade of a patch of sea carries information about what is living in it. Earlier instruments saw a handful of colour bands and could estimate how much plant life was present; PACE sees a continuous spectrum, which allows it to distinguish between kinds of phytoplankton. Since those organisms sit at the base of the marine food web and draw down carbon dioxide, knowing which ones are where matters for both ecology and climate.',
    whyItMatters:
      'Aerosol and cloud behaviour remains one of the largest uncertainties in climate projections, and this mission measures both alongside the ocean biology they interact with.',
    sources: [
      { label: 'NASA Science — PACE', url: 'https://science.nasa.gov/mission/pace/' },
    ],
  },

  {
    slug: 'terra',
    name: 'Terra',
    program: 'Earth Observing System',
    agency: 'NASA with Japan and Canada',
    status: 'active',
    kind: 'Earth-observing satellite',
    destination: 'Polar Earth orbit',
    destinationClass: 'Earth orbit',
    launch: { date: '1999-12-18', vehicle: 'Atlas IIAS', site: 'Vandenberg Space Force Base, California' },
    arrival: null,
    topics: ['earth-science'],
    imageKey: 'terra',
    purpose:
      'Observe Earth’s land, oceans, atmosphere and energy budget together, as a connected system, over decades.',
    objectives: [
      'Measure how much sunlight Earth reflects and how much heat it radiates.',
      'Monitor land cover, vegetation, fires, snow and ice worldwide.',
      'Track clouds, aerosols and atmospheric pollution.',
      'Maintain a consistent long-term record for climate research.',
    ],
    instruments: [
      { name: 'MODIS', role: 'Images nearly the entire planet daily in 36 wavelength bands — the source of many NASA Worldview layers.' },
      { name: 'ASTER', role: 'High-resolution imaging of land surface temperature, elevation and reflectance.' },
      { name: 'CERES', role: 'Measures Earth’s radiation budget — the balance of incoming and outgoing energy.' },
      { name: 'MISR', role: 'Views each scene from nine angles to study aerosols and cloud structure.' },
      { name: 'MOPITT', role: 'Measures carbon monoxide in the troposphere.' },
    ],
    keyQuestions: [
      'Is Earth absorbing more energy than it radiates back to space?',
      'How are land cover, vegetation and fire regimes changing worldwide?',
      'How do aerosols and clouds interact across the whole planet?',
    ],
    relationships: [
      { slug: 'landsat-9', how: 'Landsat images land at fine detail; Terra covers the whole planet daily at coarser scale.' },
      { slug: 'pace', how: 'PACE extends the ocean-colour and aerosol measurements MODIS pioneered.' },
    ],
    terms: ['remote-sensing', 'multispectral', 'time-series', 'radiation-budget'],
    overview:
      'Terra was built to study Earth as one system rather than as separate subjects, carrying five instruments that observe land, ocean, atmosphere and radiation simultaneously. Its MODIS instrument images nearly the whole planet every day, and those images underpin a great many of the daily global layers people now take for granted — including several shown on the Earth science page of this app. Designed for six years, it has operated for more than two decades, which is what turned it from an observing mission into a climate record.',
    whyItMatters:
      'A measurement becomes a climate record only when the same instrument keeps measuring the same way for decades; Terra is one of the few that has.',
    sources: [
      { label: 'NASA Science — Terra', url: 'https://science.nasa.gov/mission/terra/' },
      { label: 'NASA Worldview (Terra imagery)', url: 'https://worldview.earthdata.nasa.gov/' },
    ],
  },

  {
    slug: 'dart',
    name: 'DART',
    program: 'Planetary defence',
    agency: 'NASA / Johns Hopkins Applied Physics Laboratory',
    status: 'completed',
    kind: 'Kinetic impactor test',
    destination: 'Dimorphos, a moonlet of asteroid Didymos',
    destinationClass: 'Small bodies',
    launch: { date: '2021-11-24', vehicle: 'Falcon 9', site: 'Vandenberg Space Force Base, California' },
    arrival: { date: '2022-09-26', label: 'Deliberate impact into Dimorphos' },
    ended: { date: '2022-09-26', label: 'Spacecraft destroyed on impact, as designed' },
    topics: ['planetary-science', 'space-technology'],
    imageKey: 'dart',
    purpose:
      'Test whether deliberately crashing a spacecraft into an asteroid can measurably change its orbit.',
    objectives: [
      'Strike a small asteroid moonlet at high speed and change its orbital period.',
      'Measure the change from Earth using telescopes, to confirm the technique works.',
      'Demonstrate autonomous navigation onto a body never seen close up before.',
    ],
    instruments: [
      { name: 'DRACO', role: 'The only instrument — a camera used both for science and for autonomously steering the spacecraft into its target.' },
      { name: 'SMART Nav', role: 'Autonomous navigation software that identified and tracked the target in the final hour.' },
      { name: 'LICIACube (ASI)', role: 'A small Italian cubesat released beforehand to photograph the impact and its debris.' },
    ],
    keyQuestions: [
      'Can a kinetic impact measurably change an asteroid’s orbit?',
      'How much does ejected debris add to the push, beyond the impact itself?',
      'Can a spacecraft navigate itself onto a target too small to be resolved until minutes before arrival?',
    ],
    relationships: [
      { slug: 'osiris-rex', how: 'Both are small-body missions; OSIRIS-REx sampled an asteroid, DART deflected one.' },
    ],
    terms: ['kinetic-impactor', 'planetary-defence', 'near-earth-object', 'autonomy'],
    overview:
      'DART was a test with a deliberately simple design: fly a spacecraft into a small asteroid and see whether the impact changes its orbit by a measurable amount. The target, Dimorphos, orbits a larger asteroid called Didymos, which made the experiment possible — measuring a change in a small moonlet’s orbit around its companion is far easier from Earth than measuring a change in an asteroid’s orbit around the Sun. Neither body posed any threat; the point was to find out whether the technique works before it is ever needed.',
    whyItMatters:
      'It moved asteroid deflection from a calculation to a demonstrated capability — the only natural disaster humans might in principle prevent entirely.',
    sources: [
      { label: 'NASA Science — DART', url: 'https://science.nasa.gov/mission/dart/' },
      { label: 'NASA — Planetary Defense Coordination Office', url: 'https://science.nasa.gov/planetary-defense/' },
    ],
  },

  {
    slug: 'insight',
    name: 'InSight',
    program: 'Discovery',
    agency: 'NASA / Jet Propulsion Laboratory',
    status: 'completed',
    kind: 'Stationary lander',
    destination: 'Mars — Elysium Planitia',
    destinationClass: 'Mars',
    launch: { date: '2018-05-05', vehicle: 'Atlas V 401', site: 'Vandenberg Space Force Base, California' },
    arrival: { date: '2018-11-26', label: 'Landed on Elysium Planitia' },
    ended: {
      date: null,
      label: 'Operations ended in December 2022 as dust on the solar panels cut available power. This project does not assert a specific end date — see the official mission page.',
    },
    topics: ['planetary-science', 'robotics'],
    imageKey: 'insight',
    purpose:
      'Study the deep interior of Mars by listening for marsquakes and measuring how the planet wobbles and conducts heat.',
    objectives: [
      'Detect and locate marsquakes to map the interior structure of the planet.',
      'Measure the size, composition and state of the core, mantle and crust.',
      'Measure how much heat still flows out of the planet’s interior.',
    ],
    instruments: [
      { name: 'SEIS', role: 'An extremely sensitive seismometer, placed on the ground by the lander’s arm and shielded from wind.' },
      { name: 'HP³', role: 'A self-hammering probe intended to burrow below the surface and measure heat flow.' },
      { name: 'RISE', role: 'Radio science experiment tracking the lander’s position to measure how Mars wobbles as it spins.' },
    ],
    keyQuestions: [
      'Does Mars have a liquid core, and how large is it?',
      'How thick is the crust, and how is the interior layered?',
      'Is Mars still seismically active, and how often?',
    ],
    relationships: [
      { slug: 'curiosity', how: 'Curiosity reads Mars’ surface history; InSight listened to its interior.' },
      { slug: 'perseverance', how: 'Both are Mars surface missions, one mobile and one deliberately stationary.' },
    ],
    terms: ['marsquake', 'seismometer', 'stratigraphy'],
    overview:
      'Almost every Mars mission before InSight studied the surface. InSight deliberately did not move at all: a stationary lander is a stable platform, and stability is exactly what a seismometer needs. By recording marsquakes and timing how their waves travelled through the planet, it inferred the structure of the crust, mantle and core — the same technique used to map Earth’s interior. Its heat-flow probe, designed to hammer several metres down, could not get purchase in the unexpectedly clumpy soil and never reached its target depth.',
    whyItMatters:
      'How a rocky planet is layered inside records how it formed, and Mars is the only other rocky planet whose interior has been measured this way.',
    sources: [
      { label: 'NASA Science — InSight', url: 'https://science.nasa.gov/mission/insight/' },
    ],
  },
]

export const STATUS_META = {
  active: { label: 'Active', tone: 'live' },
  'in-transit': { label: 'In transit', tone: 'transit' },
  'in-testing': { label: 'In flight test', tone: 'transit' },
  planned: { label: 'Planned', tone: 'planned' },
  completed: { label: 'Completed', tone: 'done' },
}

export const missionBySlug = (slug) => MISSIONS.find((m) => m.slug === slug)
