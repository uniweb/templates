/**
 * Employment — chronological list of professional positions.
 *
 * Reads `content.data.employment` — an array of collection items with
 * { role, organization, location, start, end, excerpt, ... }. Sorted
 * descending by start year for the preview (most recent first), then
 * rendered via the shared timeline helper in foundation/src/components/.
 */
import { useDocumentOutput } from '@uniweb/press'
import { H2 as DocxH2 } from '@uniweb/press/docx'
import {
  itemToEntry,
  renderTimelinePreview,
  renderTimelineDocx,
} from '#components/timeline.jsx'
import { useDocumentOptions } from '#components/document-options.jsx'

const SECTION_KEY = 'employment'

export default function Employment({ content, block }) {
  const [options] = useDocumentOptions()
  const sectionIncluded = options.includedSections[SECTION_KEY] !== false

  const items = content?.data?.employment || []

  const entries = items
    .slice()
    .sort((a, b) => (b.start ?? 0) - (a.start ?? 0))
    .map((item) =>
      itemToEntry(item, {
        primaryField: 'role',
        secondaryField: 'organization',
      }),
    )

  const heading = content?.title || 'Employment'

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
    </div>
  )
}
