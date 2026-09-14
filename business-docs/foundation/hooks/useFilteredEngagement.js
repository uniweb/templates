/**
 * useFilteredEngagement — hook for the EngagementReport section.
 *
 * Mirrors useFilteredMembers in academic-metrics
 * (framework/templates/academic-metrics/foundation/components/query-context.jsx).
 * Takes the block's `content` object and reads filter state internally
 * via usePageState. The page's query (`query: [invoices, sows]`) delivers
 * every invoice and SOW to the section as `content.data.invoices` and
 * `content.data.sows` (main.js declares both keys), and the active
 * where-object narrows the active source's list right here, with
 * @uniweb/core's matchWhere — the language a query's own `where:` uses.
 * Nothing is fetched, so the hook works wherever the records come from.
 *
 * SOW join is the calling section's responsibility, not this hook's.
 * Sections that need invoice → SOW joins read `content.data.sows` and join
 * client-side via Map. This keeps the hook single-purpose and reusable for
 * SOW reporting (where the join would go the other direction).
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
 *     loading          // always false: the filtering is synchronous
 *   }
 */

import { useMemo } from 'react'
import { matchWhere } from '@uniweb/core'
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

function deliveredRecordsFor(source, content) {
  // Every record of the active source, as the page's query delivered it.
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

  const delivered = useMemo(
    () => deliveredRecordsFor(source, content),
    [source, content?.data?.invoices, content?.data?.sows],
  )

  // One delivered list, every filter: narrowing it is work in the browser,
  // not another request.
  const records = useMemo(
    () => (activeWhere ? matchWhere(activeWhere, delivered) : delivered),
    [activeWhere, delivered],
  )

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
    totalCount: delivered.length,
    loading: false,
  }
}
