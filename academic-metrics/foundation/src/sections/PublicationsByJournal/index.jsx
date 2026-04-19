/**
 * PublicationsByJournal — publications aggregated by venue.
 *
 * "Venue" = journal for articles, publisher for books. Treating them
 * uniformly lets the section work across mixed publication shapes
 * without the author having to pre-classify.
 *
 * Preview: recharts horizontal bar chart (long venue names readable).
 * Xlsx: Venue / Count rows, sorted descending, totals row.
 *
 * Respects the `publications-by-journal` inclusion toggle — when off,
 * the xlsx registration is skipped and the preview returns null.
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

const SECTION_KEY = 'publications-by-journal'
const TOP_N = 10

const HEADERS = ['Venue', 'Count']
const COLUMN_WIDTHS = [48, 10]
const NUMBER_FORMATS = ['text', 'number']

export default function PublicationsByJournal({ content, block }) {
  const included = useSectionIncluded(SECTION_KEY)
  const { members, activeLabel } = useFilteredMembers(content)
  const [reportOpts] = useReportOptions()
  const heading = content?.title || 'Publications by journal'

  const counts = aggregateByVenue(members, TOP_N, reportOpts)

  // Always call useDocumentOutput so the hook order is stable across
  // renders. Registering an empty fragment is fine — the adapter skips
  // sections with no headers/data.
  useDocumentOutput(
    block,
    'xlsx',
    included && counts.length > 0
      ? {
          title: 'Publications by Journal',
          headers: HEADERS,
          data: counts.map(({ venue, count }) => [venue, count]),
          columnWidths: COLUMN_WIDTHS,
          numberFormats: NUMBER_FORMATS,
          totals: ['Total', 'sum'],
        }
      : null,
  )

  const totalForDocx = counts.reduce((s, r) => s + r.count, 0)
  useDocumentOutput(
    block,
    'docx',
    included && counts.length > 0 ? (
      <>
        <Paragraph
          as="h2"
          data={heading}
          data-heading="HEADING_2"
          data-spacing-before={240}
          data-spacing-after={160}
        />
        <Table widths={[82, 18]} borderColor="cbd5e1">
          <Tr header>
            <Td>Venue</Td>
            <Td>Count</Td>
          </Tr>
          {counts.map(({ venue, count }, i) => (
            <Tr key={i}>
              <Td>{venue}</Td>
              <Td>{String(count)}</Td>
            </Tr>
          ))}
          <Tr>
            <Td emphasis>Total</Td>
            <Td emphasis>{String(totalForDocx)}</Td>
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
      {counts.length === 0 ? (
        <p className="chart-empty">No publications in the selected population.</p>
      ) : (
        <JournalBars counts={counts} />
      )}
    </section>
  )
}

function JournalBars({ counts }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="chart-container chart-container-placeholder" />
  }

  const data = counts.map((c) => ({ name: c.venue, value: c.count }))
  // Height scales with bar count so labels don't crowd.
  const height = Math.max(240, data.length * 44)

  return (
    <div className="chart-container">
      <ResponsiveContainer width="100%" height={height}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 8, right: 32, bottom: 8, left: 16 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis type="number" allowDecimals={false} />
          <YAxis
            type="category"
            dataKey="name"
            width={240}
            tick={{ fontSize: 12 }}
          />
          <Tooltip
            contentStyle={{
              background: 'var(--card)',
              border: '1px solid var(--border)',
              borderRadius: '0.375rem',
            }}
          />
          <Bar dataKey="value" fill="#1e40af" radius={[0, 4, 4, 0]}>
            <LabelList dataKey="value" position="right" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

function aggregateByVenue(members, topN, reportOpts) {
  const tally = new Map()
  for (const m of members) {
    const pubs = filterPublications(m.publications, reportOpts)
    for (const p of pubs) {
      const venue = (p.journal || p.publisher || 'Unknown').trim()
      if (!venue) continue
      tally.set(venue, (tally.get(venue) || 0) + 1)
    }
  }
  return [...tally.entries()]
    .map(([venue, count]) => ({ venue, count }))
    .sort((a, b) => b.count - a.count || a.venue.localeCompare(b.venue))
    .slice(0, topN)
}
