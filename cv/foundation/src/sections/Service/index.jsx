/**
 * Service — society memberships, committees, civic roles.
 *
 * Reads `content.data.service`. Each item: { title (role),
 * organization, start, end, excerpt }. Sorted descending by start
 * year. Rendered via the shared timeline helper with `title` as
 * primary and `organization` as secondary.
 */
import { useDocumentOutput } from '@uniweb/press'
import { H2 as DocxH2 } from '@uniweb/press/docx'
import {
  itemToEntry,
  renderTimelinePreview,
  renderTimelineDocx,
} from '#components/timeline.jsx'
import { useDocumentOptions } from '#components/document-options.jsx'

const SECTION_KEY = 'service'

export default function Service({ content, block }) {
  const [options] = useDocumentOptions()
  const sectionIncluded = options.includedSections[SECTION_KEY] !== false

  const items = content?.data?.service || []

  const entries = items
    .slice()
    .sort((a, b) => (b.start ?? 0) - (a.start ?? 0))
    .map((item) =>
      itemToEntry(item, {
        primaryField: 'title',
        secondaryField: 'organization',
      }),
    )

  const heading = content?.title || 'Service'

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
