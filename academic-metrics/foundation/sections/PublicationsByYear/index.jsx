/**
 * PublicationsByYear — timeline of publication counts by year.
 *
 * Preview: recharts vertical bar chart, oldest year leftmost.
 * Xlsx: Year / Count / Cumulative columns (so the spreadsheet answers
 *       both "how many in year N?" and "how many by year N?").
 *
 * Respects the `publications-by-year` inclusion toggle.
 */
import { useEffect, useState } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from 'recharts'
import { useDocumentOutput } from '@uniweb/press'
import { Paragraph, Table, Tr, Td } from '@uniweb/press/docx'
import {
  useReportOptions,
  useSectionIncluded,
  useFilteredMembers,
} from '#components/query-context.jsx'
import { filterPublications } from '#utils/publication-filters.js'

const SECTION_KEY = 'publications-by-year'

const HEADERS = ['Year', 'Count', 'Cumulative']
const COLUMN_WIDTHS = [10, 10, 12]
const NUMBER_FORMATS = ['number', 'number', 'number']

export default function PublicationsByYear({ content, block }) {
  const included = useSectionIncluded(SECTION_KEY)
  const { members, activeLabel } = useFilteredMembers(content)
  const [reportOpts] = useReportOptions()
  const heading = content?.title || 'Publications by year'

  const { series, total } = aggregateByYear(members, reportOpts)

  useDocumentOutput(
    block,
    'xlsx',
    included && series.length > 0
      ? {
          title: 'Publications by Year',
          headers: HEADERS,
          data: series.map((row) => [row.year, row.count, row.cumulative]),
          columnWidths: COLUMN_WIDTHS,
          numberFormats: NUMBER_FORMATS,
          totals: ['Total', 'sum', total],
        }
      : null,
  )

  useDocumentOutput(
    block,
    'docx',
    included && series.length > 0 ? (
      <>
        <Paragraph
          as="h2"
          data={heading}
          data-heading="HEADING_2"
          data-spacing-before={240}
          data-spacing-after={160}
        />
        <Table widths={[30, 35, 35]} borderColor="cbd5e1">
          <Tr header>
            <Td>Year</Td>
            <Td>Count</Td>
            <Td>Cumulative</Td>
          </Tr>
          {series.map((row, i) => (
            <Tr key={i}>
              <Td>{String(row.year)}</Td>
              <Td>{String(row.count)}</Td>
              <Td>{String(row.cumulative)}</Td>
            </Tr>
          ))}
          <Tr>
            <Td emphasis>Total</Td>
            <Td emphasis>{String(total)}</Td>
            <Td emphasis>{String(total)}</Td>
          </Tr>
        </Table>
      </>
    ) : null,
  )

  if (!included) return null

  return (
    <section className="chart-section">
      <h2 className="chart-title">{heading}</h2>
      {activeLabel && (
        <p className="chart-query-note">
          Across <em>{activeLabel}</em> ({members.length}{' '}
          {members.length === 1 ? 'member' : 'members'}).
        </p>
      )}
      {series.length === 0 ? (
        <p className="chart-empty">No publications in the selected population.</p>
      ) : (
        <YearBars series={series} />
      )}
    </section>
  )
}

function YearBars({ series }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="chart-container chart-container-placeholder" />
  }

  const data = series.map((r) => ({ year: String(r.year), value: r.count }))

  return (
    <div className="chart-container">
      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={data} margin={{ top: 16, right: 16, bottom: 16, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis dataKey="year" tick={{ fontSize: 12 }} />
          <YAxis allowDecimals={false} />
          <Tooltip
            contentStyle={{
              background: 'var(--card)',
              border: '1px solid var(--border)',
              borderRadius: '0.375rem',
            }}
          />
          <Bar dataKey="value" fill="#0f766e" radius={[4, 4, 0, 0]}>
            <LabelList dataKey="value" position="top" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

function aggregateByYear(members, reportOpts) {
  const tally = new Map()
  for (const m of members) {
    const pubs = filterPublications(m.publications, reportOpts)
    for (const p of pubs) {
      const year = Number(p.year)
      if (!Number.isFinite(year)) continue
      tally.set(year, (tally.get(year) || 0) + 1)
    }
  }
  const series = [...tally.entries()]
    .map(([year, count]) => ({ year, count }))
    .sort((a, b) => a.year - b.year)

  let running = 0
  for (const row of series) {
    running += row.count
    row.cumulative = running
  }
  return { series, total: running }
}
