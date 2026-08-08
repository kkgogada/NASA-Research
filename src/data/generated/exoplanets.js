/**
 * GENERATED FILE — do not edit by hand.
 *
 * Produced by scripts/generate-data.mjs from NASA Exoplanet Archive
 * (https://exoplanetarchive.ipac.caltech.edu/) on 2026-08-08.
 *
 * Regenerate with:  npm run generate-data
 *
 * Counts use the Planetary Systems (ps) table with default_flag=1, which selects one reference row per planet so planets are not double-counted.
 */

export const EXOPLANETS = {
  "generatedAt": "2026-08-08",
  "source": {
    "label": "NASA Exoplanet Archive",
    "url": "https://exoplanetarchive.ipac.caltech.edu/",
    "note": "Counts use the Planetary Systems (ps) table with default_flag=1, which selects one reference row per planet so planets are not double-counted."
  },
  "queries": {
    "total": "select count(*) as n from ps where default_flag=1",
    "byMethod": "select discoverymethod, count(*) as n from ps where default_flag=1 group by discoverymethod order by n desc",
    "byYear": "select disc_year, count(*) as n from ps where default_flag=1 group by disc_year order by disc_year",
    "byFacility": "select disc_facility, count(*) as n from ps where default_flag=1 group by disc_facility order by n desc"
  },
  "totalConfirmed": 6336,
  "byMethod": [
    {
      "method": "Transit",
      "count": 4676
    },
    {
      "method": "Radial Velocity",
      "count": 1197
    },
    {
      "method": "Microlensing",
      "count": 282
    },
    {
      "method": "Imaging",
      "count": 98
    },
    {
      "method": "Transit Timing Variations",
      "count": 40
    },
    {
      "method": "Eclipse Timing Variations",
      "count": 17
    },
    {
      "method": "Orbital Brightness Modulation",
      "count": 9
    },
    {
      "method": "Pulsar Timing",
      "count": 8
    },
    {
      "method": "Astrometry",
      "count": 6
    },
    {
      "method": "Pulsation Timing Variations",
      "count": 2
    },
    {
      "method": "Disk Kinematics",
      "count": 1
    }
  ],
  "byYear": [
    {
      "year": 1992,
      "count": 2
    },
    {
      "year": 1994,
      "count": 1
    },
    {
      "year": 1995,
      "count": 1
    },
    {
      "year": 1996,
      "count": 6
    },
    {
      "year": 1997,
      "count": 1
    },
    {
      "year": 1998,
      "count": 6
    },
    {
      "year": 1999,
      "count": 13
    },
    {
      "year": 2000,
      "count": 16
    },
    {
      "year": 2001,
      "count": 12
    },
    {
      "year": 2002,
      "count": 29
    },
    {
      "year": 2003,
      "count": 22
    },
    {
      "year": 2004,
      "count": 27
    },
    {
      "year": 2005,
      "count": 36
    },
    {
      "year": 2006,
      "count": 32
    },
    {
      "year": 2007,
      "count": 52
    },
    {
      "year": 2008,
      "count": 62
    },
    {
      "year": 2009,
      "count": 87
    },
    {
      "year": 2010,
      "count": 93
    },
    {
      "year": 2011,
      "count": 142
    },
    {
      "year": 2012,
      "count": 144
    },
    {
      "year": 2013,
      "count": 128
    },
    {
      "year": 2014,
      "count": 869
    },
    {
      "year": 2015,
      "count": 155
    },
    {
      "year": 2016,
      "count": 1504
    },
    {
      "year": 2017,
      "count": 152
    },
    {
      "year": 2018,
      "count": 308
    },
    {
      "year": 2019,
      "count": 195
    },
    {
      "year": 2020,
      "count": 234
    },
    {
      "year": 2021,
      "count": 564
    },
    {
      "year": 2022,
      "count": 367
    },
    {
      "year": 2023,
      "count": 323
    },
    {
      "year": 2024,
      "count": 260
    },
    {
      "year": 2025,
      "count": 245
    },
    {
      "year": 2026,
      "count": 248
    }
  ],
  "byFacility": [
    {
      "facility": "Kepler",
      "count": 2784
    },
    {
      "facility": "Transiting Exoplanet Survey Satellite (TESS)",
      "count": 919
    },
    {
      "facility": "K2",
      "count": 549
    },
    {
      "facility": "Multiple Observatories",
      "count": 354
    },
    {
      "facility": "La Silla Observatory",
      "count": 309
    },
    {
      "facility": "W. M. Keck Observatory",
      "count": 193
    },
    {
      "facility": "KMTNet",
      "count": 139
    },
    {
      "facility": "SuperWASP",
      "count": 122
    },
    {
      "facility": "OGLE",
      "count": 111
    },
    {
      "facility": "HATSouth",
      "count": 73
    }
  ]
}
