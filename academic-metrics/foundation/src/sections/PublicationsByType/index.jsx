/**
 * PublicationsByType — aggregate section: one entry per publication type.
 *
 * Reads the filtered member set via the shared query context, walks each
 * member's publications[], groups by `type`, and emits:
 *
 *   - Preview: a recharts PieChart with one slice per type, plus a
 *     small legend listing the counts. Chart rendering is mount-guarded
 *     so prerender doesn't crash on the DOM-dependent ResponsiveContainer.
 *   - Xlsx: a new "Publications by Type" sheet. Rows are [type, count].
 *     The `totals: true` hint adds an auto-summed total row at the foot.
 *
 * This is the canonical "different shape per medium" section — the same
 * aggregate drives a chart in the browser and a flat table in the file.
 */
import { useEffect, useState } from 'react'
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { useDocumentOutput } from '@uniweb/press'
import {
  useFilteredMembers,
  useSectionIncluded,
} from '#components/query-context.jsx'

const SECTION_KEY = 'publications-by-type'

const PALETTE = [
  '#1e40af', // primary
  '#be123c', // accent
  '#0f766e', // teal
  '#9333ea', // violet
  '#ea580c', // orange
  '#0ea5e9', // sky
  '#64748b', // slate (fallback)
]

const HEADERS = ['Publication type', 'Count']
const COLUMN_WIDTHS = [24, 10]
const NUMBER_FORMATS = ['text', 'number']

export default function PublicationsByType({ content, block }) {
  const included = useSectionIncluded(SECTION_KEY)
  const { members, activeQuery } = useFilteredMembers(content)
  const heading = content?.title || 'Publications by type'

  const counts = aggregateByType(members)

  useDocumentOutput(
    block,
    'xlsx',
    included && counts.length > 0
      ? {
          title: 'Publications by Type',
          headers: HEADERS,
          data: counts.map(({ type, count }) => [titleCase(type), count]),
          columnWidths: COLUMN_WIDTHS,
          numberFormats: NUMBER_FORMATS,
          totals: ['Total', 'sum'],
        }
      : null,
  )

  if (!included) return null

  return (
    <section className="chart-section">
      <h2 className="chart-title">{heading}</h2>
      {activeQuery && (
        <p className="chart-query-note">
          Across <em>{activeQuery.name}</em> ({members.length}{' '}
          {members.length === 1 ? 'member' : 'members'}).
        </p>
      )}
      {counts.length === 0 ? (
        <p className="chart-empty">
          No publications for the selected population.
        </p>
      ) : (
        <PublicationsPie counts={counts} />
      )}
    </section>
  )
}

function PublicationsPie({ counts }) {
  // Recharts' ResponsiveContainer reads DOM measurements on mount —
  // during prerender there is no DOM, so render nothing until we're
  // mounted on the client. The xlsx registration is already placed
  // above this, so the download path doesn't depend on the chart.
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="chart-container chart-container-placeholder" />
  }

  const data = counts.map(({ type, count }) => ({
    name: titleCase(type),
    value: count,
  }))

  return (
    <div className="chart-container">
      <ResponsiveContainer width="100%" height={320}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={110}
            paddingAngle={2}
            stroke="var(--card)"
            strokeWidth={2}
            label={({ name, value }) => `${name} (${value})`}
          >
            {data.map((_, i) => (
              <Cell key={i} fill={PALETTE[i % PALETTE.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              background: 'var(--card)',
              border: '1px solid var(--border)',
              borderRadius: '0.375rem',
            }}
          />
          <Legend
            verticalAlign="bottom"
            height={36}
            wrapperStyle={{ fontSize: '0.875rem' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

function aggregateByType(members) {
  const tally = new Map()
  for (const m of members) {
    const pubs = Array.isArray(m.publications) ? m.publications : []
    for (const p of pubs) {
      const type = (p.type || 'other').toLowerCase()
      tally.set(type, (tally.get(type) || 0) + 1)
    }
  }
  return [...tally.entries()]
    .map(([type, count]) => ({ type, count }))
    .sort((a, b) => b.count - a.count)
}

function titleCase(str) {
  return String(str).charAt(0).toUpperCase() + String(str).slice(1)
}
