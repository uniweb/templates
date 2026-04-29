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
import { Paragraph } from '@uniweb/press/docx'
import { useFilteredMembers } from '#components/query-context.jsx'

export default function Cover({ content, block }) {
  // useFilteredMembers reads the active predicate from page.state and
  // dispatches a where-bound fetch via @uniweb/kit's useFetched. With
  // the site's default `fetcher.supports: []`, the predicate evaluates
  // locally over the cached members.json. With `supports: [where]`, it
  // ships to the backend. Same component code in either mode.
  const { members, activeView, activeLabel, totalCount } = useFilteredMembers(content)

  // Loom-resolved narrative paragraphs — the content handler in
  // foundation.js has already instantiated {COUNT OF members}, etc.,
  // so content.paragraphs arrives as plain strings at this point.
  // These reflect the UNIT as a whole, not the current query filter.
  const narrative = Array.isArray(content?.paragraphs)
    ? content.paragraphs
    : []

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
    activeView?.description ||
    activeLabel ||
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
        activeLabel || 'All members',
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

  // Docx companion: title + subtitle + Loom narrative paragraphs.
  // The live stats strip is UI chrome and doesn't belong in the file.
  useDocumentOutput(
    block,
    'docx',
    <>
      <Paragraph
        as="h1"
        data={title}
        data-heading="HEADING_1"
        data-spacing-after={240}
      />
      <Paragraph
        data={subtitle}
        data-spacing-after={240}
      />
      {narrative.map((p, i) => (
        <Paragraph key={i} data={p} data-spacing-after={160} />
      ))}
    </>,
  )

  return (
    <section className="cover">
      <h1 className="cover-title">{title}</h1>
      <p className="cover-subtitle">{subtitle}</p>
      {narrative.length > 0 && (
        <div className="cover-narrative">
          {narrative.map((p, i) => (
            <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
          ))}
        </div>
      )}
      {activeLabel && (
        <p className="cover-population">
          Population: <strong>{activeLabel}</strong> —{' '}
          {members.length} of {totalCount} members
        </p>
      )}
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
