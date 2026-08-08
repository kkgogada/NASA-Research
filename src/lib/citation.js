/**
 * Citation formatting.
 *
 * Citations always point at the ORIGINAL NASA page, never at this application.
 * That is the whole point: a student's bibliography should credit the primary
 * source, and a reader following the citation should land on NASA's own words.
 *
 * Nothing here is generated or inferred — every field is reformatted from data
 * already held in `sources` entries. Where NASA does not publish a dated byline
 * on a page, the citation uses "n.d." (no date) rather than inventing a year,
 * and carries a retrieval date instead, which is what APA and MLA both ask for
 * on content that can change.
 */

const AUTHOR_FULL = 'National Aeronautics and Space Administration'
const AUTHOR_SHORT = 'NASA'

/* MLA abbreviates all months except May, June and July. */
const MLA_MONTHS = [
  'Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'June',
  'July', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.',
]

const MONTHS_FULL = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

/**
 * Source labels in this project follow "Site — Page title" (e.g.
 * "NASA Science — Mars 2020 Perseverance"). Split that into the two fields a
 * citation needs. Labels without a separator are treated as the page title.
 */
export function splitLabel(label = '') {
  const parts = label.split(/\s+[—–]\s+/)
  if (parts.length >= 2) {
    return { site: parts[0].trim(), title: parts.slice(1).join(' — ').trim() }
  }
  return { site: AUTHOR_SHORT, title: label.trim() }
}

const today = () => new Date()

export function formatApa(source, when = today()) {
  const { site, title } = splitLabel(source.label)
  const retrieved = `${MONTHS_FULL[when.getMonth()]} ${when.getDate()}, ${when.getFullYear()}`
  return `${AUTHOR_FULL}. (n.d.). ${title}. ${site}. Retrieved ${retrieved}, from ${source.url}`
}

export function formatMla(source, when = today()) {
  const { site, title } = splitLabel(source.label)
  const accessed = `${when.getDate()} ${MLA_MONTHS[when.getMonth()]} ${when.getFullYear()}`
  return `${AUTHOR_SHORT}. "${title}." ${site}, ${source.url}. Accessed ${accessed}.`
}

export function formatChicago(source, when = today()) {
  const { site, title } = splitLabel(source.label)
  const accessed = `${MONTHS_FULL[when.getMonth()]} ${when.getDate()}, ${when.getFullYear()}`
  return `${AUTHOR_FULL}. "${title}." ${site}. Accessed ${accessed}. ${source.url}.`
}

/** Stable, valid BibTeX key: nasa_<slug-ish>_<year>. */
function bibKey(source, when) {
  const { title } = splitLabel(source.label)
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .split('_')
    .slice(0, 4)
    .join('_')
  return `nasa_${slug || 'source'}_${when.getFullYear()}`
}

export function formatBibtex(source, when = today()) {
  const { site, title } = splitLabel(source.label)
  const accessed = `${when.getFullYear()}-${String(when.getMonth() + 1).padStart(2, '0')}-${String(when.getDate()).padStart(2, '0')}`
  // `year` is omitted rather than set to "n.d." — a non-numeric year is not
  // valid BibTeX and breaks some styles. `urldate` is the biblatex field for a
  // retrieval date; `note` carries the same information for plain BibTeX.
  return [
    `@misc{${bibKey(source, when)},`,
    `  author       = {{${AUTHOR_FULL}}},`,
    `  title        = {${title}},`,
    `  howpublished = {${site}},`,
    `  url          = {${source.url}},`,
    `  urldate      = {${accessed}},`,
    `  note         = {Accessed ${accessed}}`,
    '}',
  ].join('\n')
}

export const STYLES = [
  { id: 'apa', label: 'APA 7', format: formatApa },
  { id: 'mla', label: 'MLA 9', format: formatMla },
  { id: 'chicago', label: 'Chicago', format: formatChicago },
  { id: 'bibtex', label: 'BibTeX', format: formatBibtex },
]

export const formatSource = (source, styleId, when) => {
  const style = STYLES.find((s) => s.id === styleId) || STYLES[0]
  return style.format(source, when)
}

/** Format every source of a subject in one style, newline-separated. */
export function formatAll(sources, styleId, when = today()) {
  const sep = styleId === 'bibtex' ? '\n\n' : '\n'
  return sources.map((s) => formatSource(s, styleId, when)).join(sep)
}

/**
 * Bibliography for the whole saved board. Board entries store the source label
 * and URL they were saved with, so the board is citable without re-deriving
 * anything.
 */
export function boardBibliography(items, styleId, when = today()) {
  const sources = items
    .filter((i) => i.sourceUrl)
    .map((i) => ({ label: i.sourceLabel || i.title, url: i.sourceUrl }))
  if (!sources.length) return ''
  const body = formatAll(sources, styleId, when)
  if (styleId === 'bibtex') return body
  return body
}

/** Clipboard write with a graceful fallback for non-secure contexts. */
export async function copyText(text) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text)
      return true
    }
  } catch {
    /* fall through to the textarea approach */
  }
  try {
    const ta = document.createElement('textarea')
    ta.value = text
    ta.setAttribute('readonly', '')
    ta.style.position = 'fixed'
    ta.style.opacity = '0'
    document.body.appendChild(ta)
    ta.select()
    const ok = document.execCommand('copy')
    document.body.removeChild(ta)
    return ok
  } catch {
    return false
  }
}
