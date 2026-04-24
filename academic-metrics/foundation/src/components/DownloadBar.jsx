import { useEffect, useRef, useState } from 'react'
import { compileDocument, triggerDownload } from '@uniweb/press'
import { useWebsite } from '@uniweb/kit'
import foundation from '../foundation.js'
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
 * metadata and paragraph styles live on the foundation's outputs
 * declaration (src/foundation.js + src/compile-options.js); this
 * component just maps UI intent to format, calls compileDocument,
 * triggers the download.
 */

function GearIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4"
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
      className="h-4 w-4"
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
      className="h-3.5 w-3.5"
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
  const { website } = useWebsite()
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
      const blob = await compileDocument(website, {
        format,
        foundation,
        title,
      })
      const ext = foundation.outputs?.[format]?.extension || format
      triggerDownload(blob, `${filename}.${ext}`)
    } catch (err) {
      console.error('compile failed', err)
      setError(err?.message || String(err))
    } finally {
      setBusy(null)
    }
  }

  const disabled = busy !== null

  return (
    <div
      ref={toolbarRef}
      className="fixed top-6 right-6 z-40 flex flex-col items-end gap-2"
    >
      <div className="flex gap-2 items-center">
        <button
          type="button"
          onClick={() => {
            setPanelOpen((v) => !v)
            setMenuOpen(false)
          }}
          aria-expanded={panelOpen}
          aria-label="Report options"
          className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 text-body text-sm font-semibold shadow-md transition hover:bg-muted"
        >
          <GearIcon />
          Options
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
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-primary-foreground text-sm font-semibold shadow-lg shadow-primary/20 transition hover:bg-primary-hover disabled:opacity-60"
          >
            {busy ? (
              <>
                <span className="h-2 w-2 animate-pulse rounded-full bg-primary-foreground" />
                Generating…
              </>
            ) : (
              <>
                <DownloadIcon />
                Download
                <ChevronDown />
              </>
            )}
          </button>

          {menuOpen && (
            <div
              role="menu"
              className="absolute right-0 top-full mt-2 min-w-48 rounded-lg border border-border bg-card p-1.5 shadow-xl flex flex-col gap-0.5"
            >
              <button
                type="button"
                role="menuitem"
                onClick={() => handleDownload('xlsx')}
                className="flex items-center justify-between gap-4 rounded-md px-3 py-2 text-sm text-body text-left hover:bg-muted hover:text-heading"
              >
                <span className="font-medium">Excel</span>
                <span className="text-xs text-subtle tabular-nums">.xlsx</span>
              </button>
              <button
                type="button"
                role="menuitem"
                onClick={() => handleDownload('docx')}
                className="flex items-center justify-between gap-4 rounded-md px-3 py-2 text-sm text-body text-left hover:bg-muted hover:text-heading"
              >
                <span className="font-medium">Word</span>
                <span className="text-xs text-subtle tabular-nums">.docx</span>
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
