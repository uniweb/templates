import { useMemo } from 'react'
import { useDocumentOutput } from '@uniweb/press'
import { H1, Paragraph, Table, TextRun, Tr, Td } from '@uniweb/press/docx'
import { useFilteredEngagement } from '../../hooks/useFilteredEngagement.js'
import { useReportSource } from '#components/query-context.jsx'
import { computeInvoiceTotals } from '#utils/compute-totals.js'
import { formatCurrency, formatDate, formatDateRange } from '#utils/format.js'

/**
 * EngagementReport — filtered report across invoices or SOWs.
 *
 * Composes useFilteredEngagement for the active source with the SOWs the
 * page's query delivers (`content.data.sows`), so the invoice rows can show
 * a "% of contract billed" column joined client-side. The hook itself
 * stays single-purpose; joining invoices to SOWs lives in the section.
 *
 * The page's table, cards and text are also its Word file and its print
 * page, and its records are a spreadsheet: every format the foundation
 * declares in `outputs`, so each item of the Download menu has something
 * to compile.
 */

const COLUMNS = {
  invoices: {
    headers: ['Number', 'Date', 'Client', 'Period', 'Status', 'Total', 'SOW', '% billed'],
    wordWidths: [17, 12, 14, 19, 9, 13, 8, 8],
  },
  sows: {
    headers: ['Number', 'Issued', 'Client', 'Title', 'Status', 'Budget'],
    wordWidths: [15, 13, 20, 27, 11, 14],
  },
}

export default function EngagementReport({ content, params, block }) {
  const cfg = block?.website?.config?.business_docs || {}
  const defaults = cfg.defaults || {}
  const taxRegistry = cfg.registries?.tax || {}
  const currency = defaults.currency || 'CAD'
  const locale = defaults.locale || 'en-CA'
  const fmtMoney = (n) => formatCurrency(n, { currency, locale })
  const fmtDate = (d) => formatDate(d, { locale })

  const [source] = useReportSource(params?.records)
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
  } = useFilteredEngagement(content, block, source)

  // SOW lookup, only when the active source is invoices and the section
  // wants the "% of contract billed" column — over every SOW the page's
  // query delivered.
  const allSows = isInvoices ? content?.data?.sows : null
  const sowIndex = useMemo(() => buildSowIndex(allSows), [allSows])

  const enriched = useMemo(
    () => (isInvoices ? records.map((inv) => enrichInvoice(inv, sowIndex, defaults, taxRegistry)) : records),
    [records, isInvoices, sowIndex, defaults, taxRegistry],
  )

  // Two sheets, so one registration: a second call under this block would replace the first.
  useDocumentOutput(block, 'xlsx', [
    // Records — one row per filtered record.
    {
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
    },
    // Summary — aggregates broken down by client and status.
    {
      title: 'Summary',
      headers: ['Group', 'Bucket', 'Count', 'Subtotal', 'Total', 'Outstanding'],
      data: buildSummaryRows(enriched, isInvoices),
      numberFormats: ['text', 'text', 'number', 'currency', 'currency', 'currency'],
    },
  ])

  const title = content?.title || (isInvoices ? 'Invoice report' : 'SOW report')
  const subtitle = activeLabel || content?.subtitle || (isInvoices ? 'All invoices' : 'All SOWs')
  const population = `${count} of ${totalCount} ${isInvoices ? 'invoices' : 'SOWs'}`
  // Loom has already resolved these, in the foundation's content handler.
  const narrative = Array.isArray(content?.paragraphs) ? content.paragraphs : []

  const stats = [
    ['Records', String(count)],
    ['Subtotal', fmtMoney(sumSubtotals)],
    ['Total', fmtMoney(sumTotals)],
    ...(isInvoices ? [['Outstanding', fmtMoney(sumOutstanding)]] : []),
  ]

  const { headers, wordWidths } = isInvoices ? COLUMNS.invoices : COLUMNS.sows
  const rows = enriched.map((r) => ({
    key: r.$name || r.number,
    cells: isInvoices
      ? [
          r.number,
          fmtDate(r.issued),
          r.client?.organization || '',
          r.period ? formatDateRange(r.period, { locale }) : '',
          r.status,
          fmtMoney(r._totals?.total ?? 0),
          r.sow_ref || '',
          r._percentBilled != null ? `${r._percentBilled.toFixed(1)}%` : '',
        ]
      : [
          r.number,
          fmtDate(r.issued),
          r.client?.organization || '',
          r.title,
          r.status,
          fmtMoney(Number(r.budget?.total) || 0),
        ],
  }))

  useDocumentOutput(
    block,
    'docx',
    <>
      <H1 data={title} data-spacing-after={120} />
      <Paragraph data-spacing-after={60}>{subtitle}</Paragraph>
      <Paragraph data-spacing-after={200}>{population}</Paragraph>
      {narrative.map((p, i) => (
        <Paragraph key={i} data={p} data-spacing-after={160} />
      ))}
      <Table borderColor="cbd5e1">
        <Tr header>
          {stats.map(([label]) => (
            <Td key={label}>{label}</Td>
          ))}
        </Tr>
        <Tr>
          {stats.map(([label, value]) => (
            <Td key={label}>{value}</Td>
          ))}
        </Tr>
      </Table>
      <Paragraph data-spacing-after={120} />
      <Table widths={wordWidths} borderColor="cbd5e1">
        <Tr header>
          {headers.map((h) => (
            <RecordCell key={h}>
              <TextRun bold>{h}</TextRun>
            </RecordCell>
          ))}
        </Tr>
        {rows.map((row) => (
          <Tr key={row.key}>
            {row.cells.map((cell, i) => (
              <RecordCell key={i}>{cell}</RecordCell>
            ))}
          </Tr>
        ))}
      </Table>
    </>,
  )

  // The print page and the screen share this JSX, as SOW and Invoice do.
  const sectionJsx = (
    <section className="engagement-report">
      <header>
        <h1>{title}</h1>
        <p className="engagement-report-subtitle">{subtitle}</p>
        <p className="engagement-report-population">{population}</p>
      </header>

      {narrative.map((p, i) => (
        <p key={i} className="engagement-report-narrative" dangerouslySetInnerHTML={{ __html: p }} />
      ))}

      <div className="engagement-report-cards" role="list">
        {stats.map(([label, value]) => (
          <Stat key={label} label={label} value={value} />
        ))}
      </div>

      {loading && <p className="engagement-report-loading">Loading…</p>}

      {/* A table wider than the screen scrolls in this box, not the page. It can be focused so a
          keyboard can scroll it too. */}
      <div className="engagement-report-table-scroll" role="region" aria-label={title} tabIndex={0}>
        <table className="engagement-report-table">
          <thead>
            <tr>
              {headers.map((h) => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.key}>
                {row.cells.map((cell, i) => (
                  <td key={i}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )

  useDocumentOutput(block, 'html', sectionJsx)

  return sectionJsx
}

// Eight columns share a portrait page in Word, so a record's cell is smaller and tighter than the
// text around it (`report-cell`, compile-options.js). Tr hands it the column; Td takes it from here.
function RecordCell({ children, ...tr }) {
  return (
    <Td {...tr} data-margins-left={60} data-margins-right={60}>
      <Paragraph role="report-cell">{children}</Paragraph>
    </Td>
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
    if (s?.$name) idx.set(s.$name, s)
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

