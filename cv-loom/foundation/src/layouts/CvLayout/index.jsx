import { useRef } from 'react'
import {
  DocumentProvider,
  useDocumentCompile,
  useDocumentOutput,
  triggerDownload,
} from '@uniweb/press'
import { Paragraph, TextRun } from '@uniweb/press/docx'

export default function CvLayout({ body }) {
  return (
    <DocumentProvider>
      <DocxBranding />
      <div className="max-w-3xl mx-auto px-6 py-12">{body}</div>
      <DownloadBar />
    </DocumentProvider>
  )
}

function DocxBranding() {
  const headerKey = useRef({}).current
  const footerKey = useRef({}).current

  const header = (
    <Paragraph>
      <TextRun bold>Down House Natural History</TextRun>
      <TextRun
        data-positionaltab-alignment="right"
        data-positionaltab-relativeto="margin"
        data-positionaltab-leader="none"
      >
        {'\t'}
      </TextRun>
      <TextRun italics>Curriculum Vitae</TextRun>
    </Paragraph>
  )

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

  useDocumentOutput(headerKey, 'docx', header, { role: 'header' })
  useDocumentOutput(footerKey, 'docx', footer, { role: 'footer' })

  return null
}

function DownloadBar() {
  const { compile, isCompiling } = useDocumentCompile()

  const handleDownload = async () => {
    const blob = await compile('docx', {
      title: 'Curriculum Vitae',
      creator: 'Uniweb',
      paragraphStyles: [
        {
          id: 'cover-title',
          name: 'Cover Title',
          basedOn: 'Normal',
          next: 'Normal',
          run: { size: 72, bold: true },
          paragraph: {
            alignment: 'center',
            spacing: { before: 960, after: 240 },
          },
        },
        {
          id: 'cover-subtitle',
          name: 'Cover Subtitle',
          basedOn: 'Normal',
          next: 'Normal',
          run: { size: 40, color: '555555' },
          paragraph: {
            alignment: 'center',
            spacing: { before: 0, after: 480 },
          },
        },
      ],
    })
    triggerDownload(blob, 'darwin-cv.docx')
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={handleDownload}
        disabled={isCompiling}
        className="bg-primary text-white px-5 py-2.5 rounded-lg shadow-lg hover:opacity-90 transition-opacity disabled:opacity-50 text-sm font-medium"
      >
        {isCompiling ? 'Generating\u2026' : '\u2193 Download .docx'}
      </button>
    </div>
  )
}
