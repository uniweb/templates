/**
 * MetricsLayout — frame for the academic-metrics docusite.
 *
 * Wraps the page body in <DocumentProvider> so every section that
 * renders inside can register xlsx fragments via useDocumentOutput.
 * Renders a floating DownloadBar in the bottom-right.
 *
 * Filename is computed from the page title, following the convention
 * established by cv-loom / monograph.
 *
 * Installs query-state persistence on mount — seeds page.state from
 * localStorage and subscribes to write-back on change.
 */
import { useEffect } from 'react'
import { useWebsite } from '@uniweb/kit'
import { DocumentProvider } from '@uniweb/press'
import DownloadBar from '#components/DownloadBar.jsx'
import { installQueryStatePersistence } from '#components/query-context.jsx'

export default function MetricsLayout({ body, page }) {
  const { website } = useWebsite()
  const pageTitle = page?.title || 'Academic Metrics'
  const filename =
    (page?.title || 'academic-metrics')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')

  useEffect(() => installQueryStatePersistence(page), [page])

  // Each section subscribes to the active selection via
  // useFilteredMembers (which itself subscribes to page.state.slug and
  // page.state.panelWhere via usePageState). When either changes, the
  // affected sections re-render, and their useFetched call dispatches
  // a fresh fetch (or returns the cached result for the new predicate).
  // The layout no longer needs to drive the cascade.

  return (
    <DocumentProvider basePath={website.basePath}>
      <main className="metrics-body mx-auto max-w-5xl px-6 pb-16">
        <div className="metrics-report">{body}</div>
      </main>
      <DownloadBar title={pageTitle} filename={filename} />
    </DocumentProvider>
  )
}
