/**
 * Small foundation-level helpers shared across report sections.
 *
 * Tiny, opinionated, and foundation-specific — if any of these
 * generalize enough to serve multiple docusites, they can later
 * move into a package. For now they live next to the section
 * components that use them.
 */

const CURRENCY_SYMBOLS = {
  GBP: '£',
  USD: '$',
  EUR: '€',
  CAD: 'CA$',
}

/**
 * Format a numeric amount as a currency string with thousands
 * separators and two decimal places.
 *
 * Example: fmtCurrency(1000, 'GBP') → '£1,000.00'
 *
 * @param {number|string} amount
 * @param {string} currency  ISO 4217 code (GBP, USD, EUR, CAD, ...)
 * @returns {string}
 */
export function fmtCurrency(amount, currency = 'USD') {
  const n = typeof amount === 'number' ? amount : parseFloat(amount)
  if (Number.isNaN(n)) return String(amount || '')
  const formatted = n.toLocaleString('en-GB', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
  const symbol = CURRENCY_SYMBOLS[currency] || `${currency} `
  return `${symbol}${formatted}`
}

/**
 * Format a start/end pair as a human-readable year range.
 *
 * Example:
 *   yearRangeText(1837, 1843) → '1837 – 1843'
 *   yearRangeText(1859, 1859) → '1859'
 *   yearRangeText(1825, null) → '1825'
 *   yearRangeText(null, 1836) → '1836'
 *
 * @param {number|string|null|undefined} start
 * @param {number|string|null|undefined} end
 * @returns {string}
 */
export function yearRangeText(start, end) {
  const s = start != null ? String(start) : ''
  const e = end != null ? String(end) : ''
  if (s && e) return s === e ? s : `${s} – ${e}`
  return s || e
}

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

/**
 * Format a date value as human-readable text.
 *
 * Accepts multiple input shapes because frontmatter parsers vary:
 *   - an ISO string like '1809-02-12' or '1809-02-12T00:00:00.000Z'
 *   - a plain YYYY-MM-DD string (YAML 1.2 strict mode)
 *   - a JS Date object (YAML implicit tag resolution)
 *
 * Returns one of:
 *   - 'long'      → '12 February 1809'
 *   - 'iso-date'  → '1809-02-12' (default — safe, compact, unambiguous)
 *   - 'year'      → '1809'
 *
 * Defensive against bad input: returns the stringified input if it
 * can't parse a valid date. Exists because YAML sometimes resolves
 * `born: 1809-02-12` to a Date object that stringifies as a full
 * ISO timestamp with a time-of-day component, which is not what a
 * CV wants to show. Content authors should quote the value in
 * frontmatter (`born: '1809-02-12'`) to avoid the implicit date
 * coercion in the first place; this helper is the defensive layer.
 *
 * @param {string|Date|number} input
 * @param {{ format?: 'long' | 'iso-date' | 'year' }} [options]
 * @returns {string}
 */
export function formatDate(input, { format = 'iso-date' } = {}) {
  if (input == null || input === '') return ''

  if (typeof input === 'number') {
    // A bare number is almost certainly a year.
    return String(input)
  }

  // Fast path: if the string starts with YYYY-MM-DD, parse the fields
  // directly without constructing a Date (which introduces timezone
  // drift around midnight UTC).
  if (typeof input === 'string') {
    const match = input.match(/^(\d{4})-(\d{2})-(\d{2})/)
    if (match) {
      const [, y, m, day] = match
      if (format === 'year') return y
      if (format === 'iso-date') return `${y}-${m}-${day}`
      if (format === 'long') {
        const monthIdx = parseInt(m, 10) - 1
        const monthName = MONTH_NAMES[monthIdx] || m
        return `${parseInt(day, 10)} ${monthName} ${y}`
      }
    }
  }

  // Fallback: Date object or parseable string.
  const d = input instanceof Date ? input : new Date(input)
  if (Number.isNaN(d.getTime())) return String(input)

  const y = d.getUTCFullYear()
  const m = String(d.getUTCMonth() + 1).padStart(2, '0')
  const day = String(d.getUTCDate()).padStart(2, '0')
  if (format === 'year') return String(y)
  if (format === 'iso-date') return `${y}-${m}-${day}`
  if (format === 'long') {
    return `${d.getUTCDate()} ${MONTH_NAMES[d.getUTCMonth()]} ${y}`
  }
  return String(input)
}

/**
 * Sum a numeric field across an array of items, ignoring non-numeric
 * entries. Returns the total as a plain number.
 *
 * @param {Array<Object>} items
 * @param {string} field
 * @returns {number}
 */
export function sumField(items, field) {
  let total = 0
  for (const item of items || []) {
    const v = item?.[field]
    const n = typeof v === 'number' ? v : parseFloat(v)
    if (!Number.isNaN(n)) total += n
  }
  return total
}
