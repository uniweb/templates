/**
 * Funding — research funding aggregated by source.
 *
 * One row per funding source with Count (number of grants) and Total
 * (GBP). The xlsx sheet uses the adapter's currency number-format
 * keyword on the Total column; the totals row under `totals` mixes
 * 'sum' formulas for the two numeric columns with a literal label.
 *
 * Respects the `funding` inclusion toggle.
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
import { useSectionIncluded, useFilteredMembers } from '#components/query-context.jsx'

const SECTION_KEY = 'funding'

const HEADERS = ['Source', 'Grants', 'Total (GBP)']
const COLUMN_WIDTHS = [32, 10, 18]
const NUMBER_FORMATS = ['text', 'number', 'currency']

const POUND = new Intl.NumberFormat('en-GB', {
  style: 'currency',
  currency: 'GBP',
  maximumFractionDigits: 0,
})

export default function Funding({ content, block }) {
  const included = useSectionIncluded(SECTION_KEY)
  const { members, activeLabel } = useFilteredMembers(content)
  const heading = content?.title || 'Funding received'

  const bySource = aggregateFunding(members)
  const grandTotal = bySource.reduce((s, r) => s + r.total, 0)

  useDocumentOutput(
    block,
    'xlsx',
    included && bySource.length > 0
      ? {
          title: 'Funding',
          headers: HEADERS,
          data: bySource.map(({ source, count, total }) => [source, count, total]),
          columnWidths: COLUMN_WIDTHS,
          numberFormats: NUMBER_FORMATS,
          totals: ['Total', 'sum', 'sum'],
        }
      : null,
  )

  const totalGrants = bySource.reduce((s, r) => s + r.count, 0)
  useDocumentOutput(
    block,
    'docx',
    included && bySource.length > 0 ? (
      <>
        <Paragraph
          as="h2"
          data={heading}
          data-heading="HEADING_2"
          data-spacing-before={240}
          data-spacing-after={160}
        />
        <Table widths={[55, 15, 30]} borderColor="cbd5e1">
          <Tr header>
            <Td>Source</Td>
            <Td>Grants</Td>
            <Td>Total (GBP)</Td>
          </Tr>
          {bySource.map(({ source, count, total }, i) => (
            <Tr key={i}>
              <Td>{source}</Td>
              <Td>{String(count)}</Td>
              <Td>{POUND.format(total)}</Td>
            </Tr>
          ))}
          <Tr>
            <Td emphasis>Total</Td>
            <Td emphasis>{String(totalGrants)}</Td>
            <Td emphasis>{POUND.format(grandTotal)}</Td>
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
      {bySource.length === 0 ? (
        <p className="chart-empty">
          No funding records for the selected population.
        </p>
      ) : (
        <>
          <p className="chart-query-note">
            Grand total: <strong>{POUND.format(grandTotal)}</strong> across{' '}
            {bySource.reduce((s, r) => s + r.count, 0)} grants from{' '}
            {bySource.length}{' '}
            {bySource.length === 1 ? 'source' : 'sources'}.
          </p>
          <FundingBars rows={bySource} />
        </>
      )}
    </section>
  )
}

function FundingBars({ rows }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="chart-container chart-container-placeholder" />
  }

  const data = rows.map((r) => ({ name: r.source, total: r.total }))
  const height = Math.max(240, data.length * 56)

  return (
    <div className="chart-container">
      <ResponsiveContainer width="100%" height={height}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 8, right: 80, bottom: 8, left: 16 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis
            type="number"
            tickFormatter={(v) => POUND.format(v)}
            tick={{ fontSize: 11 }}
          />
          <YAxis
            type="category"
            dataKey="name"
            width={200}
            tick={{ fontSize: 12 }}
          />
          <Tooltip
            formatter={(v) => POUND.format(v)}
            contentStyle={{
              background: 'var(--card)',
              border: '1px solid var(--border)',
              borderRadius: '0.375rem',
            }}
          />
          <Bar dataKey="total" fill="#be123c" radius={[0, 4, 4, 0]}>
            <LabelList
              dataKey="total"
              position="right"
              formatter={(v) => POUND.format(v)}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

function aggregateFunding(members) {
  const tally = new Map()
  for (const m of members) {
    const grants = Array.isArray(m.funding) ? m.funding : []
    for (const g of grants) {
      const source = (g.source || 'Unknown').trim()
      const amount = Number(g.amount) || 0
      if (!tally.has(source)) {
        tally.set(source, { source, count: 0, total: 0 })
      }
      const row = tally.get(source)
      row.count += 1
      row.total += amount
    }
  }
  return [...tally.values()].sort(
    (a, b) => b.total - a.total || a.source.localeCompare(b.source),
  )
}
