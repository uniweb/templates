/**
 * PageBranding — registers the docx document header from author-
 * editable markdown (site/layout/header.md). Renders nothing visible
 * on the web page; the docusite has no web chrome apart from the
 * floating download toolbar.
 *
 * Edit the markdown H1/H2 to rebrand the Word output — no code change.
 */
import { useDocumentOutput } from '@uniweb/press'
import { Paragraph, TextRun } from '@uniweb/press/docx'

export default function PageBranding({ content, block }) {
  const { title, subtitle } = content || {}

  const header = (
    <Paragraph>
      {title && <TextRun bold>{title}</TextRun>}
      <TextRun
        data-positionaltab-alignment="right"
        data-positionaltab-relativeto="margin"
        data-positionaltab-leader="none"
      >
        {'\t'}
      </TextRun>
      {subtitle && <TextRun italics>{subtitle}</TextRun>}
    </Paragraph>
  )

  useDocumentOutput(block, 'docx', header, { role: 'header' })

  return null
}

PageBranding.className = 'p-0'
