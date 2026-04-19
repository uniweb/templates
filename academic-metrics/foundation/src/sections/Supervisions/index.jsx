/**
 * Supervisions — students supervised, grouped by level.
 *
 * One bar per member, each stacked by supervision level. The set of
 * levels is discovered dynamically from the data — any label the
 * content author uses (doctoral, masters, apprentice, ...) becomes
 * a stack layer, capitalised for display.
 *
 * Preview: recharts stacked BarChart.
 * Xlsx: cross-tab (member rows × level columns) + totals row that
 *       sums each level column.
 *
 * Respects the `supervisions` inclusion toggle.
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
  Legend,
} from 'recharts'
import { useDocumentOutput } from '@uniweb/press'
import { Paragraph, Table, Tr, Td } from '@uniweb/press/docx'
import { useSectionIncluded, useFilteredMembers } from '#components/query-context.jsx'

const SECTION_KEY = 'supervisions'

const PALETTE = ['#1e40af', '#0f766e', '#ea580c', '#9333ea', '#be123c', '#0ea5e9']

export default function Supervisions({ content, block }) {
  const included = useSectionIncluded(SECTION_KEY)
  const { members, activeLabel } = useFilteredMembers(content)
  const heading = content?.title || 'Supervisions'

  const { levels, rows, grandTotal } = aggregate(members)

  // Build the xlsx shape: [member, level1, level2, ..., total]
  const headers = ['Member', ...levels.map(titleCase), 'Total']
  const xlsxRows = rows.map((r) => [
    r.member,
    ...levels.map((l) => r.counts[l] || 0),
    r.total,
  ])
  const columnWidths = [28, ...levels.map(() => 12), 10]
  const numberFormats = ['text', ...levels.map(() => 'number'), 'number']
  // Totals row: 'Total' label, SUM per level column, SUM for the total.
  const totalsRow = ['Total', ...levels.map(() => 'sum'), 'sum']

  useDocumentOutput(
    block,
    'xlsx',
    included && rows.length > 0
      ? {
          title: 'Supervisions',
          headers,
          data: xlsxRows,
          columnWidths,
          numberFormats,
          totals: totalsRow,
        }
      : null,
  )

  // Docx: same cross-tab, with column widths distributed evenly.
  const perColWidth = levels.length > 0 ? Math.floor(60 / levels.length) : 60
  const docxWidths = [
    100 - perColWidth * levels.length - 10,
    ...levels.map(() => perColWidth),
    10,
  ]
  // Compute column totals for the docx totals row (docx has no formulas).
  const columnTotals = levels.map((l) =>
    rows.reduce((s, r) => s + (r.counts[l] || 0), 0),
  )
  const docxTotal = rows.reduce((s, r) => s + r.total, 0)

  useDocumentOutput(
    block,
    'docx',
    included && rows.length > 0 ? (
      <>
        <Paragraph
          as="h2"
          data={heading}
          data-heading="HEADING_2"
          data-spacing-before={240}
          data-spacing-after={160}
        />
        <Table widths={docxWidths} borderColor="cbd5e1">
          <Tr header>
            {headers.map((h) => (
              <Td key={h}>{h}</Td>
            ))}
          </Tr>
          {rows.map((r, i) => (
            <Tr key={i}>
              <Td>{r.member}</Td>
              {levels.map((l) => (
                <Td key={l}>{String(r.counts[l] || 0)}</Td>
              ))}
              <Td>{String(r.total)}</Td>
            </Tr>
          ))}
          <Tr>
            <Td emphasis>Total</Td>
            {columnTotals.map((n, i) => (
              <Td key={i} emphasis>
                {String(n)}
              </Td>
            ))}
            <Td emphasis>{String(docxTotal)}</Td>
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
      {rows.length === 0 ? (
        <p className="chart-empty">
          No supervisions recorded for the selected population.
        </p>
      ) : (
        <>
          <p className="chart-query-note">
            Grand total: <strong>{grandTotal}</strong>{' '}
            {grandTotal === 1 ? 'student' : 'students'} across{' '}
            {rows.length} {rows.length === 1 ? 'supervisor' : 'supervisors'}.
          </p>
          <SupervisionsChart rows={rows} levels={levels} />
        </>
      )}
    </section>
  )
}

function SupervisionsChart({ rows, levels }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="chart-container chart-container-placeholder" />
  }

  // recharts' BarChart wants one object per member with keys per level.
  const data = rows.map((r) => {
    const obj = { name: shortName(r.member) }
    for (const l of levels) obj[titleCase(l)] = r.counts[l] || 0
    return obj
  })

  return (
    <div className="chart-container">
      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={data} margin={{ top: 16, right: 24, bottom: 16, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis allowDecimals={false} />
          <Tooltip
            contentStyle={{
              background: 'var(--card)',
              border: '1px solid var(--border)',
              borderRadius: '0.375rem',
            }}
          />
          <Legend wrapperStyle={{ fontSize: '0.875rem' }} />
          {levels.map((l, i) => (
            <Bar
              key={l}
              dataKey={titleCase(l)}
              stackId="supervision"
              fill={PALETTE[i % PALETTE.length]}
              radius={i === levels.length - 1 ? [4, 4, 0, 0] : [0, 0, 0, 0]}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

function aggregate(members) {
  const levelSet = new Set()
  const rows = []
  let grandTotal = 0

  for (const m of members) {
    const sups = Array.isArray(m.supervisions) ? m.supervisions : []
    if (sups.length === 0) continue
    const counts = {}
    for (const s of sups) {
      const level = (s.level || 'other').toLowerCase()
      levelSet.add(level)
      counts[level] = (counts[level] || 0) + 1
    }
    rows.push({
      member: m.name || m.slug || 'Unknown',
      counts,
      total: sups.length,
    })
    grandTotal += sups.length
  }

  // Stable level order: most-used first.
  const totalByLevel = new Map()
  for (const r of rows) {
    for (const [lvl, n] of Object.entries(r.counts)) {
      totalByLevel.set(lvl, (totalByLevel.get(lvl) || 0) + n)
    }
  }
  const levels = [...levelSet].sort(
    (a, b) => (totalByLevel.get(b) || 0) - (totalByLevel.get(a) || 0) || a.localeCompare(b),
  )

  rows.sort((a, b) => b.total - a.total || a.member.localeCompare(b.member))

  return { levels, rows, grandTotal }
}

function titleCase(s) {
  return String(s).charAt(0).toUpperCase() + String(s).slice(1)
}

function shortName(full) {
  // "Charles Darwin" → "C. Darwin" for tighter X-axis labels.
  const parts = String(full).trim().split(/\s+/)
  if (parts.length <= 1) return full
  return `${parts[0][0]}. ${parts[parts.length - 1]}`
}
