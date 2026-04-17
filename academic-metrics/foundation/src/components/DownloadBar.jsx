import { useEffect, useRef, useState } from 'react'
import { useDocumentCompile, triggerDownload } from '@uniweb/press'
import DocumentOptionsPanel from './DocumentOptionsPanel.jsx'

/**
 * Floating toolbar in the top-right. Two pill-shaped buttons:
 *
 *   - Options (gear icon) — opens a popover with the Population
 *     selector, Report options (date range / refereed / citation
 *     style), and Sections checkboxes.
 *   - Download — opens a format menu; picking Excel or Word triggers
 *     the matching compile path.
 *
 * Must be rendered inside a <DocumentProvider>. Workbook / document
 * metadata (title, creator, subject) flow through compile(format,
 * { ... }). For docx, a bibliography paragraph-style pack is passed
 * so PublicationsList entries render with the classic hanging indent.
 */

const DOCX_PARAGRAPH_STYLES = [
  {
    id: 'bibliography',
    name: 'Bibliography',
    basedOn: 'Normal',
    next: 'Normal',
    quickFormat: true,
    run: { size: 22 }, // 11pt
    paragraph: {
      indent: { left: 720, hanging: 720 }, // 0.5" hanging
      spacing: { before: 0, after: 120 },
    },
  },
]

function GearIcon() {
  return (
    <svg
      aria-hidden="true"
      className="doc-bar-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  )
}

function DownloadIcon() {
  return (
    <svg
      aria-hidden="true"
      className="doc-bar-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3v12" />
      <path d="m7 10 5 5 5-5" />
      <path d="M5 21h14" />
    </svg>
  )
}

function ChevronDown() {
  return (
    <svg
      aria-hidden="true"
      className="doc-bar-icon-sm"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}

export default function DownloadBar({
  title = 'Academic Metrics',
  filename = 'academic-metrics',
}) {
  const { compile, isCompiling } = useDocumentCompile()
  const [error, setError] = useState(null)
  const [busy, setBusy] = useState(null) // 'xlsx' | 'docx' | null
  const [panelOpen, setPanelOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const toolbarRef = useRef(null)

  // Click-outside dismissal for both popovers.
  useEffect(() => {
    if (!panelOpen && !menuOpen) return
    const onDocClick = (e) => {
      if (toolbarRef.current && !toolbarRef.current.contains(e.target)) {
        setPanelOpen(false)
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', onDocClick)
    return () => document.removeEventListener('mousedown', onDocClick)
  }, [panelOpen, menuOpen])

  const handleDownload = async (format) => {
    setError(null)
    setBusy(format)
    setMenuOpen(false)
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
    <div
      ref={toolbarRef}
      className="fixed top-6 right-6 z-40 flex flex-col items-end gap-2"
    >
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => {
            setPanelOpen((v) => !v)
            setMenuOpen(false)
          }}
          aria-expanded={panelOpen}
          aria-label="Report options"
          className="doc-bar-button doc-bar-button-secondary"
        >
          <GearIcon />
          <span>Options</span>
        </button>

        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setMenuOpen((v) => !v)
              setPanelOpen(false)
            }}
            disabled={disabled}
            aria-expanded={menuOpen}
            aria-haspopup="menu"
            className="doc-bar-button doc-bar-button-primary"
          >
            {busy ? (
              <>
                <span className="doc-bar-spinner" />
                <span>Generating…</span>
              </>
            ) : (
              <>
                <DownloadIcon />
                <span>Download</span>
                <ChevronDown />
              </>
            )}
          </button>

          {menuOpen && (
            <div role="menu" className="doc-bar-menu">
              <button
                type="button"
                role="menuitem"
                onClick={() => handleDownload('xlsx')}
                className="doc-bar-menu-item"
              >
                <span className="doc-bar-menu-label">Excel</span>
                <span className="doc-bar-menu-ext">.xlsx</span>
              </button>
              <button
                type="button"
                role="menuitem"
                onClick={() => handleDownload('docx')}
                className="doc-bar-menu-item"
              >
                <span className="doc-bar-menu-label">Word</span>
                <span className="doc-bar-menu-ext">.docx</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {panelOpen && <DocumentOptionsPanel />}

      {error && (
        <p className="max-w-xs rounded bg-error-subtle px-3 py-1 text-xs text-error">
          {error}
        </p>
      )}
    </div>
  )
}
