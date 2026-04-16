import { useDocumentOutput } from '@uniweb/press'
import { Paragraph, TextRun } from '@uniweb/press/docx'

/**
 * Registers the docx document header from layout content. The content
 * author controls the institution name and document label by editing
 * site/layout/header.md — no code changes needed to rebrand.
 *
 * Renders nothing visible on the web page (a docusite has no web
 * chrome). The layout's body and download bar are the only visible UI.
 */
export default function PageBranding({ content, block }) {
  const { title, subtitle } = content

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
