import { useMemo } from 'react'
import { useDocumentOutput } from '@uniweb/press'
import { useFetched } from '@uniweb/kit'
import { useFilteredEngagement } from '../../hooks/useFilteredEngagement.js'
import { useReportSource } from '#components/query-context.jsx'
import { computeInvoiceTotals } from '#utils/compute-totals.js'
import { formatCurrency, formatDate, formatDateRange } from '#utils/format.js'

/**
 * EngagementReport — filtered report across invoices or SOWs.
 *
 * Composes useFilteredEngagement for the active source with a separate
 * useFetched for the SOW collection so the invoice rows can show a
 * "% of contract billed" column joined client-side. The hook itself
 * stays single-purpose; cross-collection joining lives in the section.
 */

export default function EngagementReport({ content, block }) {
  const cfg = block?.website?.config?.business_docs || {}
  const defaults = cfg.defaults || {}
  const taxRegistry = cfg.registries?.tax || {}
  const currency = defaults.currency || 'CAD'
  const locale = defaults.locale || 'en-CA'
  const fmtMoney = (n) => formatCurrency(n, { currency, locale })
  const fmtDate = (d) => formatDate(d, { locale })

  const [source] = useReportSource()
  const isInvoices = source !== 'sows'

  const {
    records,
    count,
    sumSubtotals,
    sumTotals,
    sumOutstanding,
    activeLabel,
    totalCount,
    loading,
  } = useFilteredEngagement(content, block)

  // SOW lookup, only when the active source is invoices and the section
  // wants the "% of contract billed" column. Cached the same way as the
  // page-level cascade — same path, same key.
  const { data: allSows } = useFetched(
    isInvoices ? { path: '/data/sows.json', schema: 'sows' } : null,
  )
  const sowIndex = useMemo(() => buildSowIndex(allSows), [allSows])

  const enriched = useMemo(
    () => (isInvoices ? records.map((inv) => enrichInvoice(inv, sowIndex, defaults, taxRegistry)) : records),
    [records, isInvoices, sowIndex, defaults, taxRegistry],
  )

  // Records sheet — one row per filtered record.
  useDocumentOutput(block, 'xlsx', {
    title: 'Records',
    headers: isInvoices
      ? ['Number', 'Date', 'Client', 'Period', 'Status', 'Currency', 'Subtotal', 'Tax', 'Total', 'SOW ref']
      : ['Number', 'Issued', 'Status', 'Client', 'Title', 'Fee model', 'Budget'],
    data: enriched.map((r) =>
      isInvoices
        ? [
            r.number,
            r.issued || '',
            r.client?.organization || '',
            r.period ? formatDateRange(r.period, { locale }) : '',
            r.status || '',
            r.currency || currency,
            r._totals?.subtotal ?? 0,
            r._totals?.tax_amount ?? 0,
            r._totals?.total ?? 0,
            r.sow_ref || '',
          ]
        : [
            r.number,
            r.issued || '',
            r.status || '',
            r.client?.organization || '',
            r.title || '',
            r.fee_model || '',
            Number(r.budget?.total) || 0,
          ],
    ),
    numberFormats: isInvoices
      ? ['text', 'date', 'text', 'text', 'text', 'text', 'currency', 'currency', 'currency', 'text']
      : ['text', 'date', 'text', 'text', 'text', 'text', 'currency'],
  })

  // Summary sheet — aggregates broken down by client and status.
  useDocumentOutput(block, 'xlsx', {
    title: 'Summary',
    headers: ['Group', 'Bucket', 'Count', 'Subtotal', 'Total', 'Outstanding'],
    data: buildSummaryRows(enriched, isInvoices),
    numberFormats: ['text', 'text', 'number', 'currency', 'currency', 'currency'],
  })

  const title = content?.title || (isInvoices ? 'Invoice report' : 'SOW report')
  const subtitle = activeLabel || content?.subtitle || (isInvoices ? 'All invoices' : 'All SOWs')

  return (
    <section className="engagement-report">
      <header>
        <h1>{title}</h1>
        <p className="engagement-report-subtitle">{subtitle}</p>
        <p className="engagement-report-population">
          {count} of {totalCount} {isInvoices ? 'invoices' : 'SOWs'}
        </p>
      </header>

      <div className="engagement-report-cards" role="list">
        <Stat label="Records" value={count} />
        <Stat label="Subtotal" value={fmtMoney(sumSubtotals)} />
        <Stat label="Total" value={fmtMoney(sumTotals)} />
        {isInvoices && <Stat label="Outstanding" value={fmtMoney(sumOutstanding)} />}
      </div>

      {loading && <p className="engagement-report-loading">Loading…</p>}

      <table className="engagement-report-table">
        <thead>
          <tr>
            {isInvoices ? (
              <>
                <th>Number</th>
                <th>Date</th>
                <th>Client</th>
                <th>Period</th>
                <th>Status</th>
                <th>Total</th>
                <th>SOW</th>
                <th>% billed</th>
              </>
            ) : (
              <>
                <th>Number</th>
                <th>Issued</th>
                <th>Client</th>
                <th>Title</th>
                <th>Status</th>
                <th>Budget</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {enriched.map((r) =>
            isInvoices ? (
              <tr key={r.slug || r.number}>
                <td>{r.number}</td>
                <td>{fmtDate(r.issued)}</td>
                <td>{r.client?.organization || ''}</td>
                <td>{r.period ? formatDateRange(r.period, { locale }) : ''}</td>
                <td>{r.status}</td>
                <td>{fmtMoney(r._totals?.total ?? 0)}</td>
                <td>{r.sow_ref || ''}</td>
                <td>{r._percentBilled != null ? `${r._percentBilled.toFixed(1)}%` : ''}</td>
              </tr>
            ) : (
              <tr key={r.slug || r.number}>
                <td>{r.number}</td>
                <td>{fmtDate(r.issued)}</td>
                <td>{r.client?.organization || ''}</td>
                <td>{r.title}</td>
                <td>{r.status}</td>
                <td>{fmtMoney(Number(r.budget?.total) || 0)}</td>
              </tr>
            ),
          )}
        </tbody>
      </table>
    </section>
  )
}

function Stat({ label, value }) {
  return (
    <div role="listitem" className="engagement-report-card">
      <span className="engagement-report-card-label">{label}</span>
      <span className="engagement-report-card-value">{value}</span>
    </div>
  )
}

function buildSowIndex(sows) {
  const idx = new Map()
  if (!Array.isArray(sows)) return idx
  for (const s of sows) {
    if (s?.slug) idx.set(s.slug, s)
    if (s?.number != null) idx.set(String(s.number), s)
  }
  return idx
}

function enrichInvoice(invoice, sowIndex, defaults, taxRegistry) {
  const totals = computeInvoiceTotals(invoice, defaults, taxRegistry)
  const sow = invoice?.sow_ref ? sowIndex.get(String(invoice.sow_ref)) : null
  const budget = Number(sow?.budget?.total) || 0
  const percentBilled = budget > 0 ? (totals.total / budget) * 100 : null
  return { ...invoice, _totals: totals, _percentBilled: percentBilled }
}

function buildSummaryRows(records, isInvoices) {
  const byClient = new Map()
  const byStatus = new Map()
  const bump = (map, key, totals) => {
    const cur = map.get(key) || { count: 0, subtotal: 0, total: 0, outstanding: 0 }
    cur.count += 1
    cur.subtotal += totals.subtotal
    cur.total += totals.total
    cur.outstanding += totals.outstanding
    map.set(key, cur)
  }
  for (const r of records) {
    const totals = isInvoices
      ? {
          subtotal: r._totals?.subtotal ?? 0,
          total: r._totals?.total ?? 0,
          outstanding: ['paid', 'void'].includes(r.status) ? 0 : r._totals?.total ?? 0,
        }
      : {
          subtotal: Number(r.budget?.total) || 0,
          total: Number(r.budget?.total) || 0,
          outstanding: 0,
        }
    bump(byClient, r.client?.organization || '(no client)', totals)
    bump(byStatus, r.status || '(no status)', totals)
  }
  const rows = []
  for (const [k, v] of byClient) rows.push(['Client', k, v.count, v.subtotal, v.total, v.outstanding])
  for (const [k, v] of byStatus) rows.push(['Status', k, v.count, v.subtotal, v.total, v.outstanding])
  return rows
}

