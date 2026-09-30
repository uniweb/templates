/**
 * Locale-aware formatters for currency, dates, and date ranges. Used by
 * the section components and by the Loom namespace builder so the same
 * locale + currency choices flow through every surface.
 */

export function formatCurrency(amount, { currency = 'CAD', locale = 'en-CA' } = {}) {
  const n = Number(amount)
  if (!Number.isFinite(n)) return ''
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
  }).format(n)
}

export function formatDate(value, { locale = 'en-CA' } = {}) {
  if (!value) return ''
  const d = value instanceof Date ? value : new Date(value)
  if (Number.isNaN(d.getTime())) return String(value)
  // A date written as `2026-05-28` is a calendar day, not an instant: JavaScript reads it as
  // midnight UTC, so formatting it in the reader's zone showed the day before anywhere west of
  // UTC. Such a date is formatted in UTC; a date with a time keeps the reader's zone.
  const dayOnly = typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value)
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...(dayOnly && { timeZone: 'UTC' }),
  }).format(d)
}

export function formatDateRange(period, opts) {
  if (!period) return ''
  const from = formatDate(period.from, opts)
  const to = formatDate(period.to, opts)
  if (from && to) return `${from} – ${to}`
  return from || to
}
