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
import {
  installQueryStatePersistence,
  useSelectedQuery,
} from '#components/query-context.jsx'

export default function MetricsLayout({ body, page }) {
  const { website } = useWebsite()
  const pageTitle = page?.title || 'Academic Metrics'
  const filename =
    (page?.title || 'academic-metrics')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')

  useEffect(() => installQueryStatePersistence(page), [page])

  // Subscribe to the active query slug at the layout level so that
  // changing it re-renders the whole report body. The cascade reaches
  // every BlockRenderer, which re-runs prepareProps, which re-runs the
  // foundation's `data` handler with the new slug — every section ends
  // up with freshly filtered `content.data.members` without needing
  // its own subscription. See foundation.js for the simulator notes.
  useSelectedQuery()

  return (
    <DocumentProvider basePath={website.basePath}>
      <main className="metrics-body mx-auto max-w-5xl px-6 pb-16">
        <div className="metrics-report">{body}</div>
      </main>
      <DownloadBar title={pageTitle} filename={filename} />
    </DocumentProvider>
  )
}
