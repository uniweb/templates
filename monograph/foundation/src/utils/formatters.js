/**
 * Small shared formatters. None of these are monograph-specific in
 * principle — if any accumulate generic utility across docusites,
 * Press may absorb them later.
 */

/**
 * Format a small decimal with a fixed decimal count. Uses tabular
 * number formatting appearance in CSS; here we only control the digits.
 */
export function fmtNumber(value, decimals = 1) {
  if (value == null || value === '') return ''
  const n = typeof value === 'number' ? value : parseFloat(value)
  if (Number.isNaN(n)) return String(value)
  return n.toLocaleString('en-GB', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
}

/**
 * Humanise an array of strings into a comma-separated list with an
 * Oxford comma.
 *
 *   listOf(['Isabela', 'Santa Cruz'])                → 'Isabela and Santa Cruz'
 *   listOf(['Isabela', 'Santa Cruz', 'Española'])    → 'Isabela, Santa Cruz, and Española'
 */
export function listOf(items) {
  const arr = (items || []).filter(Boolean)
  if (arr.length === 0) return ''
  if (arr.length === 1) return arr[0]
  if (arr.length === 2) return `${arr[0]} and ${arr[1]}`
  return `${arr.slice(0, -1).join(', ')}, and ${arr[arr.length - 1]}`
}
