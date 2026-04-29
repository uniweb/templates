/**
 * Invoice line-item math. Pure functions — no React, no Loom — so they
 * can be reused from the Loom-namespace builder, the EngagementReport
 * aggregates, and tests.
 *
 * The numbers feeding this module already came out of YAML (parsed
 * to JS Number where present). null / undefined / empty strings collapse
 * to 0; anything else is coerced via Number() and treated as 0 if NaN.
 */

import { computeTaxAmount, resolveTaxEntry } from './tax-registry.js'

function toAmount(n) {
  if (n == null || n === '') return 0
  const v = Number(n)
  return Number.isFinite(v) ? v : 0
}

export function computeLineAmount(item) {
  return toAmount(item?.qty) * toAmount(item?.unit_price)
}

export function computeSubtotal(items) {
  if (!Array.isArray(items)) return 0
  return Math.round(items.reduce((s, i) => s + computeLineAmount(i), 0) * 100) / 100
}

/**
 * Resolve the tax block for an invoice. Honours per-record overrides
 * (rate, amount) and falls back to the registry entry for the
 * jurisdiction.
 *
 * Returns:
 *   { jurisdiction, rate, amount, label }
 *
 * Either rate or amount may be 0 — the caller decides whether to render
 * the tax row based on the `amount > 0` rule from the plan.
 */
export function computeTaxBlock(invoice, defaults = {}, registryOverrides = {}) {
  const subtotal = computeSubtotal(invoice?.items)
  const jurisdiction =
    invoice?.tax?.jurisdiction || defaults.tax_jurisdiction || null

  if (!jurisdiction) {
    return { jurisdiction: null, rate: 0, amount: 0, label: '' }
  }

  const entry = resolveTaxEntry(jurisdiction, registryOverrides)
  const rate = invoice?.tax?.rate != null ? Number(invoice.tax.rate) : entry.rate
  const amount =
    invoice?.tax?.amount != null
      ? Number(invoice.tax.amount)
      : Math.round(subtotal * rate * 100) / 100

  return { jurisdiction, rate, amount, label: entry.label }
}

export function computeInvoiceTotals(invoice, defaults = {}, registryOverrides = {}) {
  const subtotal = computeSubtotal(invoice?.items)
  const tax = computeTaxBlock(invoice, defaults, registryOverrides)
  const total = Math.round((subtotal + tax.amount) * 100) / 100
  return {
    subtotal,
    tax_amount: tax.amount,
    tax_rate: tax.rate,
    tax_label: tax.label,
    tax_jurisdiction: tax.jurisdiction,
    total,
  }
}

export { computeTaxAmount }
