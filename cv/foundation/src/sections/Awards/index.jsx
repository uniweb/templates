/**
 * Awards — medals, honours, honorary degrees.
 *
 * Reads `content.data.awards`. Each item: { title, organization,
 * year, start, end, excerpt }. Sorted descending by year. Awards
 * have a single year rather than a date range — the collection
 * items set start === end so the timeline helper's
 * `yearRangeText` renders just "1864" instead of "1864 – 1864".
 *
 * Awards also filter by the download-options dateRange: an award
 * counts if its year falls inside the range.
 */
import { useDocumentOutput } from '@uniweb/press'
import { H2 as DocxH2 } from '@uniweb/press/docx'
import {
  itemToEntry,
  renderTimelinePreview,
  renderTimelineDocx,
} from '#components/timeline.jsx'
import {
  useDocumentOptions,
  yearInRange,
} from '#components/document-options.jsx'

const SECTION_KEY = 'awards'

export default function Awards({ content, block }) {
  const [options] = useDocumentOptions()
  const { dateRange, includedSections } = options
  const sectionIncluded = includedSections[SECTION_KEY] !== false

  const rawItems = content?.data?.awards || []
  const items = rawItems.filter((item) =>
    yearInRange(item.year ?? item.start, dateRange),
  )

  const entries = items
    .slice()
    .sort((a, b) => (b.year ?? b.start ?? 0) - (a.year ?? a.start ?? 0))
    .map((item) =>
      itemToEntry(item, {
        primaryField: 'title',
        secondaryField: 'organization',
      }),
    )

  const heading = content?.title || 'Awards and Honours'

  useDocumentOutput(
    block,
    'docx',
    sectionIncluded ? (
      <>
        <DocxH2 data={heading} data-page-break-before="true" />
        {renderTimelineDocx(entries)}
      </>
    ) : (
      <></>
    ),
  )

  if (!sectionIncluded) return null

  return (
    <div className="max-w-3xl mx-auto py-12">
      <h2 className="text-heading text-3xl font-bold">{heading}</h2>
      {renderTimelinePreview(entries)}
      {entries.length === 0 && rawItems.length > 0 && (
        <p className="mt-6 text-subtle italic">
          No awards in the selected range.
        </p>
      )}
    </div>
  )
}
