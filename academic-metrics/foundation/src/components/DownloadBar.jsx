import { useState } from 'react'
import { useDocumentCompile, triggerDownload } from '@uniweb/press'

/**
 * Floating download button that compiles every registered xlsx
 * fragment in the current <DocumentProvider> into a single workbook
 * (one sheet per block) and triggers a browser download.
 *
 * Must be rendered inside a <DocumentProvider>. Workbook metadata
 * (title, creator, subject) flow through compile('xlsx', { ... }).
 *
 * @param {Object} props
 * @param {string} [props.title='Academic Metrics'] - workbook title metadata
 * @param {string} [props.filename='academic-metrics.xlsx'] - downloaded filename
 */
export default function DownloadBar({
  title = 'Academic Metrics',
  filename = 'academic-metrics.xlsx',
}) {
  const { compile, isCompiling } = useDocumentCompile()
  const [error, setError] = useState(null)

  const handleDownload = async () => {
    setError(null)
    try {
      const blob = await compile('xlsx', {
        title,
        creator: 'Uniweb',
        subject: 'Academic metrics report',
      })
      triggerDownload(blob, filename)
    } catch (err) {
      console.error('compile failed', err)
      setError(err?.message || String(err))
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      <button
        type="button"
        onClick={handleDownload}
        disabled={isCompiling}
        className="rounded-lg bg-primary px-5 py-2.5 text-primary-foreground text-sm font-semibold shadow-lg transition hover:opacity-90 disabled:opacity-50"
      >
        {isCompiling ? 'Generating\u2026' : '\u2193 Download .xlsx'}
      </button>
      {error && (
        <p className="max-w-xs rounded bg-error-subtle px-3 py-1 text-xs text-error">
          {error}
        </p>
      )}
    </div>
  )
}
