/**
 * useFilteredEngagement — hook for the EngagementReport section.
 *
 * Mirrors useFilteredMembers in academic-metrics
 * (framework/templates/academic-metrics/foundation/src/components/query-context.jsx).
 * Takes the block's `content` object and reads filter state internally
 * via usePageState — section components don't pass arguments other
 * than `content`. The framework decides whether to push the where-object
 * to the source or evaluate it locally based on the site's
 * `fetcher.supports:` declaration.
 *
 * SOW join is the calling section's responsibility, not this hook's.
 * Sections that need invoice → SOW joins compose this hook with a
 * separate useFetched({ path: '/data/sows.json' }) and join client-side
 * via Map. This keeps the hook single-purpose and reusable for SOW
 * reporting (where the join would go the other direction).
 *
 * Returns:
 *   {
 *     records,         // filtered invoice or SOW array (full set when no filter active)
 *     count,           // count of filtered records
 *     sumSubtotals,    // sum of records[].subtotal
 *     sumTotals,       // sum of records[].total
 *     sumOutstanding,  // sum of records[].total where status not in [paid, void]
 *     activeWhere,     // resolved where-object or null
 *     activeLabel,     // human-readable filter description or null
 *     totalCount,      // unfiltered count, for "X of Y" displays
 *     loading          // true while fetch is in flight on first read
 *   }
 */

import { useMemo } from 'react'
import { useFetched } from '@uniweb/kit'
import { computeInvoiceTotals } from '#utils/compute-totals.js'
import {
  composeReportWhere,
  useReportSource,
  useReportDateRange,
  useReportClient,
  useReportStatus,
} from '#components/query-context.jsx'

const PAID_STATUSES = new Set(['paid', 'void'])

function describeFilter({ source, dateRange, client, status }) {
  const parts = [source === 'sows' ? 'SOWs' : 'Invoices']
  if (dateRange?.from || dateRange?.to) {
    parts.push(`${dateRange.from || ''}–${dateRange.to || ''}`)
  }
  if (client) parts.push(client)
  if (status) parts.push(status)
  return parts.length > 1 ? parts.join(' · ') : null
}

function resolveDataPath(source) {
  return source === 'sows' ? '/data/sows.json' : '/data/invoices.json'
}

function resolveSchema(source) {
  return source === 'sows' ? 'sows' : 'invoices'
}

function fallbackRecordsFor(source, content) {
  // The page-level cascade should already have fetched the active
  // collection without a where: clause. Fall back to that when no filter
  // is active — same fetched bytes either way thanks to the cache key
  // matching when supports:[] doesn't split on where:.
  if (source === 'sows') {
    return Array.isArray(content?.data?.sows) ? content.data.sows : []
  }
  return Array.isArray(content?.data?.invoices) ? content.data.invoices : []
}

function aggregate(records, source, taxDefaults, taxRegistry) {
  let sumSubtotals = 0
  let sumTotals = 0
  let sumOutstanding = 0

  if (source === 'invoices') {
    for (const inv of records) {
      const totals = computeInvoiceTotals(inv, taxDefaults, taxRegistry)
      sumSubtotals += totals.subtotal
      sumTotals += totals.total
      if (!PAID_STATUSES.has(String(inv?.status))) sumOutstanding += totals.total
    }
  } else {
    for (const sow of records) {
      const budget = Number(sow?.budget?.total) || 0
      sumTotals += budget
      sumSubtotals += budget
    }
  }

  return {
    sumSubtotals: Math.round(sumSubtotals * 100) / 100,
    sumTotals: Math.round(sumTotals * 100) / 100,
    sumOutstanding: Math.round(sumOutstanding * 100) / 100,
  }
}

export function useFilteredEngagement(content, block) {
  const [source] = useReportSource()
  const [dateRange] = useReportDateRange()
  const [client] = useReportClient()
  const [status] = useReportStatus()

  const cfg = block?.website?.config?.business_docs || {}
  const taxDefaults = cfg.defaults || {}
  const taxRegistry = cfg.registries?.tax || {}

  const activeWhere = useMemo(
    () => composeReportWhere({ dateRange, client, status }),
    [dateRange, client, status],
  )

  const fallback = useMemo(
    () => fallbackRecordsFor(source, content),
    [source, content?.data?.invoices, content?.data?.sows],
  )

  const { data: fetched, loading } = useFetched(
    activeWhere
      ? { path: resolveDataPath(source), schema: resolveSchema(source), where: activeWhere }
      : null,
  )

  const records = activeWhere ? fetched || [] : fallback

  const { sumSubtotals, sumTotals, sumOutstanding } = useMemo(
    () => aggregate(records, source, taxDefaults, taxRegistry),
    [records, source, taxDefaults, taxRegistry],
  )

  return {
    records,
    count: records.length,
    sumSubtotals,
    sumTotals,
    sumOutstanding,
    activeWhere,
    activeLabel: describeFilter({ source, dateRange, client, status }),
    totalCount: fallback.length,
    loading: activeWhere ? loading : false,
  }
}
