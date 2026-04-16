import { useRef } from 'react'
import { DocumentProvider, useDocumentOutput } from '@uniweb/press'
import { Paragraph, TextRun } from '@uniweb/press/docx'
import DownloadBar from '#components/DownloadBar.jsx'

export default function CvLayout({ body, header, page }) {
  const filename =
    (page?.title || 'document').toLowerCase().replace(/\s+/g, '-') + '.docx'

  return (
    <DocumentProvider>
      {header}
      <DocxFooter />
      <div className="max-w-3xl mx-auto px-6 py-12">{body}</div>
      <DownloadBar filename={filename} />
    </DocumentProvider>
  )
}

/**
 * Registers the docx footer (page numbering). This is structural UI,
 * not author content, so it stays in code rather than in a layout
 * section file. The useRef({}).current pattern creates a stable object
 * reference for the WeakMap-based Press registration.
 */
function DocxFooter() {
  const footerKey = useRef({}).current

  const footer = (
    <Paragraph>
      <TextRun
        data-positionaltab-alignment="center"
        data-positionaltab-relativeto="margin"
        data-positionaltab-leader="none"
      >
        {'\t'}
      </TextRun>
      <TextRun>_currentPage</TextRun>
      <TextRun> of </TextRun>
      <TextRun>_totalPages</TextRun>
    </Paragraph>
  )

  useDocumentOutput(footerKey, 'docx', footer, { role: 'footer' })

  return null
}
