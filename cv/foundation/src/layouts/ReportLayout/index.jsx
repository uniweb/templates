import React, { useEffect, useRef, useState } from 'react'
import {
  DocumentProvider,
  useDocumentCompile,
  triggerDownload,
} from '@uniweb/press'
import { buildStylePack } from '#components/docx-style-pack.js'
import {
  DocumentOptionsProvider,
  useDocumentOptions,
} from '#components/document-options.jsx'
import DocumentOptionsPanel from '#components/document-options-panel.jsx'

/**
 * ReportLayout — the frame for a faculty annual report docusite.
 *
 * A docusite is a Uniweb URL whose content is also a downloadable
 * document. This layout wraps the page body in <DocumentProvider>
 * so every section component inside it can register a docx fragment
 * via useDocumentOutput, and also in <DocumentOptionsProvider> so
 * sections can read download-time options (date range, citation
 * style, section inclusion) via the useDocumentOptions() hook.
 *
 * There is no site-wide navigation, no hero, no marketing chrome.
 * A docusite is a document, not a website — the only UI beyond the
 * report content is the download toolbar in the top-right corner:
 * an Options gear that opens a popover, plus the Download button.
 */

function computeFileName(page, personal, dateRange) {
  const slug = [personal?.first_name, personal?.family_name]
    .filter(Boolean)
    .map((s) => s.toLowerCase().replace(/\s+/g, '-'))
    .join('-')
  const base = slug || page?.route?.replace(/^\//, '') || 'report'
  const { start, end } = dateRange || {}
  const suffix =
    start != null && end != null
      ? `-${start}-${end}`
      : start != null
        ? `-from-${start}`
        : end != null
          ? `-to-${end}`
          : ''
  return `${base}${suffix}.docx`
}

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

function DownloadControls({ page, personal }) {
  const { compile, isCompiling } = useDocumentCompile()
  const [options] = useDocumentOptions()
  const [error, setError] = useState(null)
  const [panelOpen, setPanelOpen] = useState(false)
  const toolbarRef = useRef(null)

  // Close the options panel on click outside.
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
      // Read the live theme's typography tokens so the downloaded
      // .docx inherits the site's font choices, not just the preview.
      // This is the bridge between theme.yml and Word — same tokens,
      // different consumer.
      const rootStyle =
        typeof document !== 'undefined'
          ? getComputedStyle(document.documentElement)
          : null
      const readVar = (name) =>
        rootStyle ? rootStyle.getPropertyValue(`--${name}`).trim() : ''
      const stylePack = buildStylePack({ readVar })

      const blob = await compile('docx', {
        title: page?.title || 'Annual Report',
        creator: [personal?.first_name, personal?.family_name]
          .filter(Boolean)
          .join(' '),
        // Named paragraph styles and numbering configs available to
        // section components. Publications uses `data-style="bibliography"`
        // which resolves here; Cover uses `cover-title` / `cover-subtitle`.
        ...stylePack,
      })
      triggerDownload(blob, computeFileName(page, personal, options.dateRange))
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
              Download
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

export default function ReportLayout({ page, body }) {
  // The personal collection is fetched at the page level via `data: personal`
  // in the page frontmatter. We grab the resolved item here so the download
  // filename and docx metadata can use the real name, matching what each
  // individual section component does internally.
  const personal =
    (page?.content?.data?.personal && page.content.data.personal[0]) || {}

  return (
    <DocumentOptionsProvider>
      <DocumentProvider>
        <div className="min-h-screen bg-section text-body">
          <DownloadControls page={page} personal={personal} />
          <main className="mx-auto max-w-5xl px-6 py-12">{body}</main>
        </div>
      </DocumentProvider>
    </DocumentOptionsProvider>
  )
}
