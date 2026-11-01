import { useEffect } from 'react'
import { useWebsite } from '@uniweb/kit'
import { DocumentProvider } from '@uniweb/press'
import DownloadBar from '#components/DownloadBar.jsx'
import { installReportStatePersistence } from '#components/query-context.jsx'

/**
 * BusinessDocLayout — frame for SOW / invoice / report pages.
 *
 * Wraps page body in <DocumentProvider> so sections register Press
 * fragments via useDocumentOutput. Floating DownloadBar offers each
 * format the foundation declares, for the page on screen. Filter-state
 * persistence is installed unconditionally — it's a no-op on
 * single-record pages.
 */

export default function BusinessDocLayout({ body, page }) {
  const { website } = useWebsite()
  const pageTitle = page?.title || 'Business document'
  const filename = (page?.title || 'document')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

  useEffect(() => installReportStatePersistence(page), [page])

  return (
    <DocumentProvider basePath={website.basePath}>
      <main className="business-docs-body">
        <div className="business-docs-document">{body}</div>
      </main>
      <DownloadBar title={pageTitle} filename={filename} rootPath={page?.route} />
    </DocumentProvider>
  )
}
