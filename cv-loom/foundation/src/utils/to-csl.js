/**
 * Normalize a flat publication record into CSL-JSON.
 *
 * The darwin.yml profile stores publications in a YAML-friendly flat
 * shape (`year`, `publisher`, `journal`, optional `authors` list).
 * citestyle expects canonical CSL-JSON (`issued.date-parts`, `author`,
 * `container-title`). This helper is the boundary — data stays clean
 * for authors, the formatting boundary converts to CSL-JSON on demand.
 *
 * Conventions:
 *
 *   - Implicit author: if no `authors:` list is provided, Darwin is
 *     the sole author. This keeps the YAML terse — coauthored papers
 *     declare their author list explicitly; everything else is Darwin.
 *
 *   - Container title: articles use `journal:`, books don't need one.
 *     Publisher maps to CSL `publisher`.
 *
 *   - Year: `year:` (number) → `issued: { date-parts: [[year]] }`.
 *
 * The default author is parameterizable because this template could
 * easily be retargeted at any profile, not just Darwin.
 */

const DEFAULT_AUTHOR = [{ family: 'Darwin', given: 'Charles' }]

export function publicationToCsl(item, { defaultAuthor = DEFAULT_AUTHOR } = {}) {
  if (!item) return null

  const csl = {
    id: item.id,
    type: item.type,
    title: item.title,
    author: item.authors || defaultAuthor,
  }

  if (item.year != null) {
    csl.issued = { 'date-parts': [[item.year]] }
  }
  if (item.journal) {
    csl['container-title'] = item.journal
  }
  if (item.publisher) {
    csl.publisher = item.publisher
  }
  if (item.DOI) {
    csl.DOI = item.DOI
  }

  return csl
}

export function publicationsToCsl(items, options) {
  if (!Array.isArray(items)) return []
  return items.map((item) => publicationToCsl(item, options)).filter(Boolean)
}
