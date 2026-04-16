import { useDocumentOutput } from '@uniweb/press'
import { H2 as DocxH2 } from '@uniweb/press/docx'
import {
  itemToEntry,
  renderTimelinePreview,
  renderTimelineDocx,
} from '#components/timeline.jsx'

export default function Section({ content, block, params }) {
  const { dataField, primaryField = 'title', secondaryField } = params || {}

  const profile = content?.data?.profile?.[0] || {}
  const items = dataField ? (profile[dataField] || []) : []
  const heading = content?.title || ''

  const entries = items
    .slice()
    .sort((a, b) => (b.start ?? 0) - (a.start ?? 0))
    .map((item) =>
      itemToEntry(item, { primaryField, secondaryField })
    )

  const docxBody = (
    <>
      {heading && (
        <DocxH2
          data={heading}
          data-pagebreakbefore="true"
          data-spacing-before={480}
          data-spacing-after={120}
        />
      )}
      {renderTimelineDocx(entries)}
    </>
  )

  useDocumentOutput(block, 'docx', docxBody)

  return (
    <div className="max-w-3xl mx-auto py-8">
      {heading && (
        <h2 className="text-heading text-3xl font-bold">{heading}</h2>
      )}
      {renderTimelinePreview(entries)}
    </div>
  )
}
