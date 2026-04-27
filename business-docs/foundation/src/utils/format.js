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
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(d)
}

export function formatDateRange(period, opts) {
  if (!period) return ''
  const from = formatDate(period.from, opts)
  const to = formatDate(period.to, opts)
  if (from && to) return `${from} – ${to}`
  return from || to
}
