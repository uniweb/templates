import { useState } from 'react'
import { useDocumentCompile, triggerDownload } from '@uniweb/press'

/**
 * Floating toolbar with two download buttons — .xlsx (spreadsheet view,
 * one sheet per registered section) and .docx (document view, headings
 * and tables). Both buttons run against the same DocumentProvider and
 * pick up the active query + section-inclusion + report options
 * transparently.
 *
 * Must be rendered inside a <DocumentProvider>. Workbook / document
 * metadata (title, creator, subject) flow through compile(format,
 * { ... }). For docx, a small paragraph-style pack is passed too so
 * PublicationsList's entries render with a hanging indent (classic
 * bibliography shape).
 */

const DOCX_PARAGRAPH_STYLES = [
  {
    id: 'bibliography',
    name: 'Bibliography',
    basedOn: 'Normal',
    next: 'Normal',
    quickFormat: true,
    // Run size in half-points (22 = 11pt). paragraph indent in twips
    // (720 = 0.5"). The classic APA / Chicago / Harvard hanging
    // indent shape.
    run: { size: 22 },
    paragraph: {
      indent: { left: 720, hanging: 720 },
      spacing: { before: 0, after: 120 },
    },
  },
]

export default function DownloadBar({
  title = 'Academic Metrics',
  filename = 'academic-metrics',
}) {
  const { compile, isCompiling } = useDocumentCompile()
  const [error, setError] = useState(null)
  const [busy, setBusy] = useState(null) // 'xlsx' | 'docx' | null

  const handleDownload = async (format) => {
    setError(null)
    setBusy(format)
    try {
      const compileOptions = {
        title,
        creator: 'Uniweb',
        subject: 'Academic metrics report',
      }
      if (format === 'docx') {
        compileOptions.paragraphStyles = DOCX_PARAGRAPH_STYLES
      }
      const blob = await compile(format, compileOptions)
      triggerDownload(blob, `${filename}.${format}`)
    } catch (err) {
      console.error('compile failed', err)
      setError(err?.message || String(err))
    } finally {
      setBusy(null)
    }
  }

  const disabled = isCompiling || busy !== null

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => handleDownload('docx')}
          disabled={disabled}
          className="rounded-lg bg-card border border-border px-4 py-2.5 text-body text-sm font-semibold shadow-md transition hover:bg-muted disabled:opacity-50"
        >
          {busy === 'docx' ? 'Generating\u2026' : '\u2193 .docx'}
        </button>
        <button
          type="button"
          onClick={() => handleDownload('xlsx')}
          disabled={disabled}
          className="rounded-lg bg-primary px-5 py-2.5 text-primary-foreground text-sm font-semibold shadow-lg transition hover:opacity-90 disabled:opacity-50"
        >
          {busy === 'xlsx' ? 'Generating\u2026' : '\u2193 .xlsx'}
        </button>
      </div>
      {error && (
        <p className="max-w-xs rounded bg-error-subtle px-3 py-1 text-xs text-error">
          {error}
        </p>
      )}
    </div>
  )
}
