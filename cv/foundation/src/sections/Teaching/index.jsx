/**
 * Teaching — supervisory, mentorship, and collaborative activity.
 *
 * Reads `content.data.teaching` — an array of collection items with
 * { title (name), relationship, topic, start, end, excerpt }. Sorted
 * descending by start year (most recent first). Rendered through
 * the shared timeline helper, mapping `title` to the primary heading
 * and `topic` to the secondary heading. The `relationship` field is
 * currently shown via the excerpt; a future pass could surface it
 * explicitly if timeline entries ever grow a dedicated meta line.
 *
 * Respects the download options: filters by the dateRange (overlap
 * semantics) and skips registration when the section is excluded.
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
  intervalOverlapsRange,
} from '#components/document-options.jsx'

const SECTION_KEY = 'teaching'

export default function Teaching({ content, block }) {
  const [options] = useDocumentOptions()
  const { dateRange, includedSections } = options
  const sectionIncluded = includedSections[SECTION_KEY] !== false

  const rawItems = content?.data?.teaching || []
  const items = rawItems.filter((item) =>
    intervalOverlapsRange(item.start, item.end, dateRange),
  )

  const entries = items
    .slice()
    .sort((a, b) => (b.start ?? 0) - (a.start ?? 0))
    .map((item) =>
      itemToEntry(item, {
        primaryField: 'title',
        secondaryField: 'topic',
      }),
    )

  const heading = content?.title || 'Teaching and Mentorship'

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
          No entries match the current date range.
        </p>
      )}
    </div>
  )
}
