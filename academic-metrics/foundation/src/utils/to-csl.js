/**
 * Normalize a flat publication record into CSL-JSON.
 *
 * Members' publications are stored YAML-flat (`year`, `publisher`,
 * `journal`) with an author implied by the containing member. citestyle
 * expects canonical CSL-JSON (`issued.date-parts`, `author`,
 * `container-title`). This helper is the boundary — author comes in
 * through the caller as `defaultAuthor` (each member contributes its
 * own name when the publications are collected).
 */

function parseFullName(full) {
  const parts = String(full || '').trim().split(/\s+/)
  if (parts.length === 0) return { family: 'Unknown', given: '' }
  if (parts.length === 1) return { family: parts[0], given: '' }
  const family = parts[parts.length - 1]
  const given = parts.slice(0, -1).join(' ')
  return { family, given }
}

export function publicationToCsl(item, { defaultAuthor } = {}) {
  if (!item) return null

  const author =
    item.authors && item.authors.length
      ? item.authors
      : defaultAuthor
      ? [defaultAuthor]
      : [{ family: 'Unknown', given: '' }]

  const csl = {
    id: item.id || `${(item.title || 'pub').slice(0, 24)}-${item.year || 'xx'}`,
    type: item.type || 'book',
    title: item.title || '',
    author,
  }

  if (item.year != null) {
    csl.issued = { 'date-parts': [[Number(item.year) || item.year]] }
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

/**
 * Convert a list of collected publications (each one carrying _author
 * set by collectPublications) into CSL-JSON.
 */
export function publicationsToCsl(items) {
  if (!Array.isArray(items)) return []
  return items
    .map((item) => {
      const defaultAuthor = item._author ? parseFullName(item._author) : undefined
      return publicationToCsl(item, { defaultAuthor })
    })
    .filter(Boolean)
}
