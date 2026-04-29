/**
 * MonographLayout — the frame for the monograph docusite.
 *
 * Wraps the page body in <DocumentProvider> (so every section that
 * renders inside can register Press fragments via useDocumentOutput)
 * and in <DocumentOptionsProvider> (so sections can read compile-time
 * options — citation style, figure inclusion, chapter toggles).
 *
 * Renders:
 *   - A docx footer with centred page numbers ("X of Y") — structural,
 *     registered in code rather than as author content.
 *   - The layout's `header` region (where `PageBranding` registers the
 *     docx header from author-editable markdown).
 *   - The `body` region containing all chapter sections.
 *   - The floating DownloadBar toolbar in the top-right.
 */
import React, { useRef } from 'react'
import { useWebsite } from '@uniweb/kit'
import { DocumentProvider, useDocumentOutput } from '@uniweb/press'
import { Paragraph, TextRun } from '@uniweb/press/docx'
import DownloadBar from '#components/DownloadBar.jsx'
import { DocumentOptionsProvider } from '#components/document-options.jsx'

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

export default function MonographLayout({ body, header, page }) {
  const { website } = useWebsite()
  const pageTitle = page?.title || 'Monograph'
  const filename =
    (page?.title || 'monograph')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') + '.docx'

  return (
    <DocumentOptionsProvider>
      <DocumentProvider basePath={website.basePath}>
        <DocxFooter />
        {header}
        <main className="monograph-body mx-auto max-w-5xl px-6 pb-16">
          {body}
        </main>
        <DownloadBar title={pageTitle} filename={filename} />
      </DocumentProvider>
    </DocumentOptionsProvider>
  )
}
