/**
 * DownloadBar — floating toolbar in the top-right corner with an Options
 * gear (opens the compile-time options popover) and a Download button.
 *
 * On click, reads `--font-heading` / `--font-body` off the live :root
 * computed styles so the downloaded .docx inherits the site's theme
 * fonts — the same tokens the web preview uses. Then calls compile()
 * with the paragraph styles + numbering definitions from the style pack.
 */
import React, { useEffect, useRef, useState } from 'react'
import { useDocumentCompile, triggerDownload } from '@uniweb/press'
import { buildStylePack } from './docx-style-pack.js'
import DocumentOptionsPanel from './document-options-panel.jsx'

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

export default function DownloadBar({ title = 'Monograph', filename = 'monograph.docx' }) {
  const { compile, isCompiling } = useDocumentCompile()
  const [error, setError] = useState(null)
  const [panelOpen, setPanelOpen] = useState(false)
  const toolbarRef = useRef(null)

  useEffect(() => {
    if (!panelOpen) return
    const onDocClick = (e) => {
      if (toolbarRef.current && !toolbarRef.current.contains(e.target)) {
        setPanelOpen(false)
      }
    }
    document.addEventListener('mousedown', onDocClick)
    return () => document.removeEventListener('mousedown', onDocClick)
  }, [panelOpen])

  const handleDownload = async () => {
    setError(null)
    try {
      const rootStyle =
        typeof document !== 'undefined'
          ? getComputedStyle(document.documentElement)
          : null
      const readVar = (name) =>
        rootStyle ? rootStyle.getPropertyValue(`--${name}`).trim() : ''

      const stylePack = buildStylePack({ readVar })
      const blob = await compile('docx', {
        title,
        creator: 'Uniweb',
        ...stylePack,
      })
      triggerDownload(blob, filename)
    } catch (err) {
      console.error('compile failed', err)
      setError(err?.message || String(err))
    }
  }

  return (
    <div
      ref={toolbarRef}
      className="fixed top-6 right-6 z-20 flex flex-col items-end gap-2"
    >
      <div className="flex gap-2 items-center">
        <button
          type="button"
          onClick={() => setPanelOpen((v) => !v)}
          aria-expanded={panelOpen}
          aria-label="Download options"
          className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 text-body text-sm font-semibold shadow-md transition hover:bg-muted"
        >
          <GearIcon />
          Options
        </button>
        <button
          type="button"
          onClick={handleDownload}
          disabled={isCompiling}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-primary-foreground text-sm font-semibold shadow-lg shadow-primary/20 transition hover:bg-primary-hover disabled:opacity-60"
        >
          {isCompiling ? (
            <>
              <span className="h-2 w-2 animate-pulse rounded-full bg-primary-foreground" />
              Generating…
            </>
          ) : (
            <>
              <DownloadIcon />
              Download .docx
            </>
          )}
        </button>
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
