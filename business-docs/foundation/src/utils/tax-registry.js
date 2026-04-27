/**
 * Built-in tax-jurisdiction registry for the business-docs foundation.
 *
 * Authors override or extend the registry from site.yml / document.yml:
 *
 *   business_docs:
 *     registries:
 *       tax:
 *         VAT-EU: { rate: 0.20, label: VAT }
 *
 * The site/document override is shallow-merged on top of these defaults
 * — same key replaces the built-in entry, missing keys leave the default
 * intact.
 */

export const DEFAULT_TAX_REGISTRY = {
  // Canada
  GST: { rate: 0.05, label: 'GST' },
  PST: { rate: 0.07, label: 'PST' },
  HST: { rate: 0.13, label: 'HST' },
  QST: { rate: 0.09975, label: 'QST' },
  // Common single-rate VAT placeholders. Authors override per jurisdiction.
  VAT: { rate: 0.2, label: 'VAT' },
  NONE: { rate: 0, label: '' },
}

export function resolveTaxEntry(jurisdiction, registryOverrides = {}) {
  const merged = { ...DEFAULT_TAX_REGISTRY, ...registryOverrides }
  if (!jurisdiction) return merged.NONE
  return merged[jurisdiction] || merged.NONE
}

export function computeTaxAmount(subtotal, jurisdiction, registryOverrides) {
  const entry = resolveTaxEntry(jurisdiction, registryOverrides)
  return Math.round(subtotal * entry.rate * 100) / 100
}
