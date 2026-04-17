/**
 * Cover — report summary page.
 *
 * Renders a cover with the report title and a meta strip showing the
 * number of members, total publications, total funding amount, and
 * total supervisions across the member set.
 *
 * Registers a "Summary" sheet in the downloadable workbook with the
 * same aggregate numbers in a single row.
 */
import { useDocumentOutput } from '@uniweb/press'

export default function Cover({ content, block }) {
  const members = content?.data?.members || []
  const memberCount = members.length

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
  const subtitle = content?.subtitle || 'Aggregate report across selected members'

  useDocumentOutput(block, 'xlsx', {
    title: 'Summary',
    headers: ['Report', 'Members', 'Publications', 'Funding (total)', 'Supervisions'],
    data: [[title, memberCount, publicationCount, fundingTotal, supervisionCount]],
    numberFormats: ['text', 'number', 'number', 'currency', 'number'],
  })

  return (
    <section className="cover">
      <h1 className="cover-title">{title}</h1>
      <p className="cover-subtitle">{subtitle}</p>
      <div className="cover-meta" role="list">
        <Stat label="Members" value={memberCount} />
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
