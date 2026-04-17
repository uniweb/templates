/**
 * Cover — report summary page, query selector, and top-line aggregates.
 *
 * Renders:
 *   - the report title + (active-query or default) subtitle
 *   - a <QuerySelector> dropdown of saved queries
 *   - a meta strip showing filtered member count, total publications,
 *     total funding, and total supervisions
 *
 * Registers a "Summary" sheet with: report title, active query name,
 * matched / total member counts, and the aggregate totals.
 */
import { useDocumentOutput } from '@uniweb/press'
import QuerySelector from '#components/QuerySelector.jsx'
import { useFilteredMembers } from '#components/query-context.jsx'

export default function Cover({ content, block }) {
  const { members, activeQuery, totalCount, allQueries } =
    useFilteredMembers(content)

  const publicationCount = members.reduce(
    (sum, m) => sum + (Array.isArray(m.publications) ? m.publications.length : 0),
    0,
  )
  const fundingTotal = members.reduce((sum, m) => {
    if (!Array.isArray(m.funding)) return sum
    return sum + m.funding.reduce((s, f) => s + (Number(f.amount) || 0), 0)
  }, 0)
  const supervisionCount = members.reduce(
    (sum, m) => sum + (Array.isArray(m.supervisions) ? m.supervisions.length : 0),
    0,
  )

  const title = content?.title || 'Academic Metrics'
  const subtitle =
    activeQuery?.description ||
    activeQuery?.name ||
    content?.subtitle ||
    'All members'

  useDocumentOutput(block, 'xlsx', {
    title: 'Summary',
    headers: [
      'Report',
      'Population',
      'Matched',
      'Total',
      'Publications',
      'Funding (total)',
      'Supervisions',
    ],
    data: [
      [
        title,
        activeQuery?.name || 'All members',
        members.length,
        totalCount,
        publicationCount,
        fundingTotal,
        supervisionCount,
      ],
    ],
    numberFormats: [
      'text',
      'text',
      'number',
      'number',
      'number',
      'currency',
      'number',
    ],
  })

  return (
    <section className="cover">
      <h1 className="cover-title">{title}</h1>
      <p className="cover-subtitle">{subtitle}</p>
      <QuerySelector
        queries={allQueries}
        matchedCount={members.length}
        totalCount={totalCount}
      />
      <div className="cover-meta" role="list">
        <Stat label="Members" value={members.length} />
        <Stat label="Publications" value={publicationCount} />
        <Stat label="Funding" value={formatCurrency(fundingTotal)} />
        <Stat label="Supervisions" value={supervisionCount} />
      </div>
    </section>
  )
}

function Stat({ label, value }) {
  return (
    <div role="listitem">
      <span className="cover-meta-label">{label}</span>
      <span className="cover-meta-value">{value}</span>
    </div>
  )
}

function formatCurrency(n) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'GBP',
    maximumFractionDigits: 0,
  }).format(n)
}
