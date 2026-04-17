/**
 * Shared publication-filter utility.
 *
 * The date range applies to publications by `year`, and intentionally
 * supports an open-ended right side (`end: null`) — some grants,
 * appointments, and supervisions span into the future, so a report
 * window that starts in 2020 and continues forward is a natural shape.
 * For publications we just need the same interpretation: start is a
 * lower bound; missing end is +∞.
 *
 * refereedOnly keeps entries where `refereed === true`. Items without
 * the field are treated as not refereed, so the filter is strict by
 * default — a member with unknown refereed status gets trimmed.
 */

export function filterPublications(publications, options = {}) {
  const { dateRange, refereedOnly } = options
  const start = dateRange?.start != null ? Number(dateRange.start) : null
  const end = dateRange?.end != null && dateRange.end !== ''
    ? Number(dateRange.end)
    : null

  if (!Array.isArray(publications)) return []

  return publications.filter((p) => {
    if (refereedOnly && p?.refereed !== true) return false

    if (start == null && end == null) return true

    const year = Number(p?.year)
    if (!Number.isFinite(year)) return false
    if (start != null && year < start) return false
    if (end != null && year > end) return false
    return true
  })
}

/**
 * Walk the filtered member set, collect publications, apply filters,
 * and annotate each with its author (the member's full name).
 */
export function collectPublications(members, options = {}) {
  if (!Array.isArray(members)) return []
  const out = []
  for (const m of members) {
    const pubs = filterPublications(m?.publications, options)
    for (const p of pubs) {
      out.push({ ...p, _author: m?.name || m?.slug || 'Unknown' })
    }
  }
  return out
}
