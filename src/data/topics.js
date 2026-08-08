/**
 * Research topic areas.
 *
 * Same sourcing rules as missions.js: `overview` and `whyItMatters` are
 * app-generated plain-language summaries for students and are labelled as such
 * wherever they render. Every topic links to official NASA landing pages so a
 * reader can go straight to primary material.
 */

export const TOPICS = [
  {
    id: 'planetary-science',
    name: 'Planetary science',
    tagline: 'Worlds, moons, asteroids and how the solar system formed',
    accent: 'rust',
    imageKey: 'juno',
    overview:
      'Planetary science studies the objects that orbit the Sun — planets, moons, asteroids and comets — and asks how they formed and why they turned out so differently from one another. Most of the evidence comes from spacecraft: orbiters that map a whole world, landers and rovers that examine one place in detail, and sample-return missions that bring material back to laboratories on Earth. A recurring theme is comparison. Mars, Venus and Earth started with broadly similar ingredients and ended up radically different, so explaining the differences is a way of understanding all three.',
    whyItMatters:
      'Understanding how planets form and change is the only way to put Earth in context — including how a planet can lose an atmosphere, or hold liquid water for billions of years.',
    keyQuestions: [
      'How did the solar system form, and why are the planets so different from each other?',
      'Was Mars ever habitable, and did life ever begin there?',
      'Do icy moons such as Europa and Enceladus have habitable oceans beneath their crusts?',
      'What do asteroids and comets preserve from the earliest solar system?',
    ],
    subfields: ['Mars exploration', 'Outer planets and icy moons', 'Small bodies', 'Planetary geology', 'Astrobiology'],
    terms: ['biosignature', 'regolith', 'tidal-heating', 'subsurface-ocean', 'sample-return'],
    sources: [
      { label: 'NASA Science — Planetary Science division', url: 'https://science.nasa.gov/planetary-science/' },
      { label: 'NASA Science — Solar System exploration', url: 'https://science.nasa.gov/solar-system/' },
    ],
  },
  {
    id: 'astrophysics',
    name: 'Astrophysics',
    tagline: 'Stars, galaxies, black holes and the history of the universe',
    accent: 'violet',
    imageKey: 'jwst',
    overview:
      'Astrophysics studies everything beyond the solar system, and it works almost entirely by collecting light. Different wavelengths reveal different physics — visible light shows stars, infrared sees through dust and reaches the most distant galaxies, ultraviolet and X-rays trace hot and violent processes — which is why NASA operates several telescopes rather than one. Because light takes time to travel, looking further away is also looking further back in time, so a deep image is a record of the universe at an earlier stage.',
    whyItMatters:
      'Astrophysics is how we know the universe has a history: an age, an expansion, and a sequence in which elements, stars and galaxies came into being.',
    keyQuestions: [
      'How did the first stars and galaxies form after the Big Bang?',
      'How fast is the universe expanding, and why does the rate appear to disagree between methods?',
      'What are dark matter and dark energy?',
      'Are there planets around other stars with atmospheres like Earth’s?',
    ],
    subfields: ['Cosmology', 'Exoplanets', 'Stellar evolution', 'High-energy astrophysics', 'Galaxy formation'],
    terms: ['redshift', 'spectroscopy', 'exoplanet', 'deep-field', 'infrared'],
    sources: [
      { label: 'NASA Science — Astrophysics division', url: 'https://science.nasa.gov/astrophysics/' },
      { label: 'NASA Science — Universe', url: 'https://science.nasa.gov/universe/' },
    ],
  },
  {
    id: 'earth-science',
    name: 'Earth science',
    tagline: 'Studying our own planet as a connected system',
    accent: 'teal',
    imageKey: 'earth-science',
    overview:
      'NASA studies Earth the same way it studies other planets — from orbit, with instruments that measure the whole system repeatedly over time. Satellites track land cover, ice, sea level, water storage, air quality and the movement of heat and carbon. The defining advantage is consistency: the same instrument measuring the same way for years produces a record in which change can actually be distinguished from noise. Much of this data is distributed openly and is used well beyond NASA, in agriculture, disaster response and water management.',
    whyItMatters:
      'Long, consistent global measurements are what turn arguments about environmental change into questions that can be settled with data.',
    keyQuestions: [
      'How are ice sheets, sea level and global temperature changing, and how quickly?',
      'Where is fresh water stored, and how is that distribution shifting?',
      'How do the ocean and atmosphere exchange heat and carbon?',
      'How can satellite data improve forecasting of floods, drought and wildfire?',
    ],
    subfields: ['Climate and radiation', 'Hydrology', 'Cryosphere', 'Atmospheric composition', 'Land cover change'],
    terms: ['remote-sensing', 'altimetry', 'multispectral', 'time-series', 'hydrology'],
    sources: [
      { label: 'NASA Science — Earth Science division', url: 'https://science.nasa.gov/earth-science/' },
      { label: 'NASA Earthdata — open Earth science data', url: 'https://www.earthdata.nasa.gov/' },
    ],
  },
  {
    id: 'heliophysics',
    name: 'Heliophysics',
    tagline: 'The Sun, the solar wind and space weather',
    accent: 'amber',
    imageKey: 'parker',
    overview:
      'Heliophysics studies the Sun and its influence throughout the solar system. The Sun continuously releases charged particles — the solar wind — that fill a vast bubble called the heliosphere, and it occasionally releases far more violent bursts. When those reach Earth they interact with our magnetic field, producing auroras and, at the strong end, disturbances to satellites, navigation signals and power grids. The field connects a star’s physics to practical infrastructure on the ground.',
    whyItMatters:
      'Space weather is a natural hazard with economic consequences, and forecasting it requires understanding the physics of the corona and solar wind.',
    keyQuestions: [
      'Why is the Sun’s corona hotter than its visible surface?',
      'What accelerates the solar wind?',
      'How can solar storms that affect Earth be predicted further in advance?',
      'Where does the Sun’s influence end and interstellar space begin?',
    ],
    subfields: ['Solar physics', 'Space weather', 'Magnetospheric science', 'Heliosphere boundary studies'],
    terms: ['corona', 'solar-wind', 'space-weather', 'magnetosphere', 'heliosphere', 'plasma'],
    sources: [
      { label: 'NASA Science — Heliophysics division', url: 'https://science.nasa.gov/heliophysics/' },
      { label: 'NASA Science — Sun', url: 'https://science.nasa.gov/sun/' },
    ],
  },
  {
    id: 'human-spaceflight',
    name: 'Human spaceflight',
    tagline: 'Keeping people alive, healthy and productive off Earth',
    accent: 'red',
    imageKey: 'iss',
    overview:
      'Human spaceflight is as much a biology and life-support problem as an engineering one. Weightlessness causes measurable changes to bone, muscle, the cardiovascular system and vision; radiation beyond Earth’s magnetic field is a long-term health risk; and every consumable a crew needs has to be carried, recycled or produced locally. The International Space Station supplies most of the long-duration human data we have, and the Artemis programme extends the problem to distances where a quick return to Earth is not possible.',
    whyItMatters:
      'The further a crew travels from Earth, the less an emergency return is an option — so the health and life-support questions have to be solved in advance.',
    keyQuestions: [
      'How does long-duration weightlessness change the human body, and what recovers?',
      'How can crews be protected from radiation beyond Earth’s magnetic field?',
      'How can air, water and food be recycled or produced far from Earth?',
      'What can be built from resources already present on the Moon or Mars?',
    ],
    subfields: ['Space medicine', 'Life support systems', 'Extravehicular activity', 'Lunar exploration', 'Crew operations'],
    terms: ['microgravity', 'life-support', 'in-situ-resource-utilization', 'low-earth-orbit'],
    sources: [
      { label: 'NASA — Humans in Space', url: 'https://www.nasa.gov/humans-in-space/' },
      { label: 'NASA — Artemis programme', url: 'https://www.nasa.gov/artemis/' },
    ],
  },
  {
    id: 'robotics',
    name: 'Robotics and autonomy',
    tagline: 'Machines that operate where instructions arrive minutes late',
    accent: 'blue',
    imageKey: 'robotics',
    overview:
      'Distance makes robotics in space fundamentally different from robotics on Earth. A signal to Mars takes minutes each way, so nothing can be driven live — a rover must be given a goal and work out the details itself, including hazards it will encounter after the command was written. That constraint drives the field toward autonomy: onboard navigation, self-diagnosis and the ability to keep working safely without a human in the loop. Robotic arms on the space station work the other way, with operators nearby, and are built for precision handling instead.',
    whyItMatters:
      'Autonomy is what allows exploration at distances where remote control is physically impossible.',
    keyQuestions: [
      'How can a vehicle navigate safely without real-time human control?',
      'How should robots and astronauts share tasks and workspace?',
      'How can a machine detect and recover from its own faults millions of kilometres away?',
      'What can be assembled or repaired robotically in orbit?',
    ],
    subfields: ['Autonomous navigation', 'Robotic arms and manipulation', 'Sampling systems', 'Aerial and subsurface robots'],
    terms: ['autonomy', 'teleoperation', 'fault-protection'],
    sources: [
      { label: 'NASA — Robotics', url: 'https://www.nasa.gov/robotics/' },
      { label: 'NASA Science — Mars rovers', url: 'https://science.nasa.gov/mars/' },
    ],
  },
  {
    id: 'space-technology',
    name: 'Space technology',
    tagline: 'The engineering that makes new missions possible',
    accent: 'blue',
    imageKey: 'europa-clipper',
    overview:
      'Space technology is the work of making capabilities exist before a mission needs them. Propulsion, power generation far from the Sun, heat shields, precision landing, optical communications, deployable structures and radiation-tolerant electronics all have to be demonstrated somewhere before a flagship mission can assume them. Technology demonstrations — small, deliberately risk-tolerant flights like Ingenuity or MOXIE — exist specifically to move an idea from plausible to proven.',
    whyItMatters:
      'Most mission designs are limited by what has already been demonstrated, so technology work quietly determines what missions can even be proposed.',
    keyQuestions: [
      'How can spacecraft generate power far from the Sun?',
      'How can landings be made precise enough to reach scientifically chosen sites?',
      'Can resources found in place be turned into fuel, oxygen or structures?',
      'How can far more data be returned across interplanetary distances?',
    ],
    subfields: ['Propulsion', 'Power systems', 'Entry, descent and landing', 'Optical communications', 'In-space manufacturing'],
    terms: ['in-situ-resource-utilization', 'heat-shield', 'fault-protection', 'reentry'],
    sources: [
      { label: 'NASA — Space Technology Mission Directorate', url: 'https://www.nasa.gov/space-technology-mission-directorate/' },
      { label: 'NASA — Technology', url: 'https://www.nasa.gov/technology/' },
    ],
  },
  {
    id: 'aeronautics',
    name: 'Aeronautics',
    tagline: 'The first A in NASA — flight research within the atmosphere',
    accent: 'teal',
    imageKey: 'aeronautics',
    overview:
      'Aeronautics is NASA’s oldest line of work and it concerns flight inside an atmosphere rather than outside it. Current research concentrates on making aviation quieter, cleaner and more efficient: shaping aircraft so supersonic flight does not produce a disruptive boom, testing electrified propulsion, and improving how air traffic is managed. Much of the output is not an aircraft anyone will buy but measured data that manufacturers and regulators can build on.',
    whyItMatters:
      'Aviation rules and designs change slowly and need independent evidence; flight research produces the measurements that make a change defensible.',
    keyQuestions: [
      'Can supersonic flight be made quiet enough to be allowed over land?',
      'How can aircraft emissions and fuel use be reduced?',
      'What role can electrified propulsion play in aviation?',
      'How can airspace safely accommodate new kinds of aircraft?',
    ],
    subfields: ['Supersonic research', 'Sustainable flight', 'Advanced air mobility', 'Airspace operations'],
    terms: ['sonic-boom', 'shock-wave', 'supersonic'],
    sources: [
      { label: 'NASA — Aeronautics Research Mission Directorate', url: 'https://www.nasa.gov/aeronautics/' },
      { label: 'NASA — Quesst mission', url: 'https://www.nasa.gov/mission/quesst/' },
    ],
  },
]

export const topicById = (id) => TOPICS.find((t) => t.id === id)
