/**
 * Filter state for the EngagementReport — date range, client, status,
 * and which collection (invoices or sows) is the active source.
 *
 * Lives on `page.state` so values survive SPA navigation without being
 * re-hydrated on every mount, and so multiple sections on the same
 * report page subscribe per-key (only the subscribing component
 * re-renders when one slot changes). Mirrors the academic-metrics
 * pattern in framework/templates/academic-metrics/foundation/src/components/query-context.jsx.
 */

import { usePageState } from '@uniweb/kit'

const STORAGE_KEY = 'business-docs/report-options'

const DEFAULTS = {
  source: 'invoices',
  dateRange: { from: null, to: null },
  client: null,
  status: null,
}

const PERSISTED_KEYS = Object.keys(DEFAULTS)

function readPersisted() {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    return {
      source: parsed.source || DEFAULTS.source,
      dateRange: parsed.dateRange && typeof parsed.dateRange === 'object'
        ? { from: parsed.dateRange.from || null, to: parsed.dateRange.to || null }
        : DEFAULTS.dateRange,
      client: parsed.client || null,
      status: parsed.status || null,
    }
  } catch {
    return null
  }
}

function writePersisted(page) {
  if (typeof window === 'undefined') return
  const snapshot = {}
  for (const key of PERSISTED_KEYS) {
    snapshot[key] = page.state.get(key) ?? DEFAULTS[key]
  }
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot))
  } catch {
    // Quota or disabled — state stays in memory.
  }
}

const persistedPages = new WeakSet()

export function installReportStatePersistence(page) {
  if (!page || !page.state) return () => {}
  if (persistedPages.has(page)) return () => {}
  persistedPages.add(page)

  const seed = readPersisted() || DEFAULTS
  for (const key of PERSISTED_KEYS) {
    if (!page.state.has(key)) page.state.set(key, seed[key])
  }
  const write = () => writePersisted(page)
  const unsubs = PERSISTED_KEYS.map((key) => page.state.subscribe(key, write))
  return () => unsubs.forEach((fn) => fn())
}

export function useReportSource() {
  return usePageState('source', DEFAULTS.source)
}

export function useReportDateRange() {
  return usePageState('dateRange', DEFAULTS.dateRange)
}

export function useReportClient() {
  return usePageState('client', DEFAULTS.client)
}

export function useReportStatus() {
  return usePageState('status', DEFAULTS.status)
}

/**
 * Compose a where-object from the active filter slots. Returns null when
 * no filter is active (so the EngagementReport hook can short-circuit
 * the where-bound fetch and return the full set).
 */
export function composeReportWhere({ dateRange, client, status }) {
  const conditions = []
  if (dateRange?.from) conditions.push({ issued: { gte: dateRange.from } })
  if (dateRange?.to) conditions.push({ issued: { lte: dateRange.to } })
  if (client) conditions.push({ 'client.organization': client })
  if (status) conditions.push({ status })
  if (conditions.length === 0) return null
  if (conditions.length === 1) return conditions[0]
  return { and: conditions }
}
