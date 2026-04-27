import { useEffect, useRef, useState } from 'react'
import { compileDocument, triggerDownload } from '@uniweb/press'
import { useWebsite } from '@uniweb/kit'
import foundation from '../foundation.js'

/**
 * Floating download menu in the top-right of the layout. One pill button
 * with a dropdown of available formats. The foundation declares
 * `outputs:` (pdf, docx, xlsx); this component reads the keys from
 * foundation.outputs and renders one menu item per format.
 *
 * Filename is `<filename>.<ext>` where ext comes from
 * foundation.outputs[format].extension.
 */

const FORMAT_LABELS = {
  pdf: { label: 'PDF', ext: 'pdf' },
  pagedjs: { label: 'HTML (Paged.js)', ext: 'html' },
  docx: { label: 'Word', ext: 'docx' },
  xlsx: { label: 'Excel', ext: 'xlsx' },
}

export default function DownloadBar({ title = 'Document', filename = 'document' }) {
  const { website } = useWebsite()
  const [busy, setBusy] = useState(null)
  const [error, setError] = useState(null)
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!open) return
    const onDocClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onDocClick)
    return () => document.removeEventListener('mousedown', onDocClick)
  }, [open])

  const formats = Object.keys(foundation.outputs || {}).filter((f) => FORMAT_LABELS[f])

  const handleDownload = async (format) => {
    setError(null)
    setBusy(format)
    setOpen(false)
    try {
      const blob = await compileDocument(website, { format, foundation, title })
      const ext = foundation.outputs?.[format]?.extension || FORMAT_LABELS[format]?.ext || format
      triggerDownload(blob, `${filename}.${ext}`)
    } catch (err) {
      console.error('compile failed', err)
      setError(err?.message || String(err))
    } finally {
      setBusy(null)
    }
  }

  return (
    <div ref={ref} className="business-docs-download">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        disabled={busy !== null}
        aria-expanded={open}
        aria-haspopup="menu"
      >
        {busy ? `Generating ${busy}…` : 'Download'}
      </button>
      {open && (
        <div role="menu" className="business-docs-download-menu">
          {formats.map((format) => (
            <button
              key={format}
              type="button"
              role="menuitem"
              onClick={() => handleDownload(format)}
            >
              <span>{FORMAT_LABELS[format].label}</span>
              <span className="business-docs-download-ext">.{FORMAT_LABELS[format].ext}</span>
            </button>
          ))}
        </div>
      )}
      {error && <p className="business-docs-download-error">{error}</p>}
    </div>
  )
}
