/**
 * MetricsLayout — frame for the academic-metrics docusite.
 *
 * Wraps the page body in <DocumentProvider> so every section that
 * renders inside can register xlsx fragments via useDocumentOutput.
 * Renders a floating DownloadBar in the bottom-right.
 *
 * Filename is computed from the page title, following the convention
 * established by cv-loom / monograph.
 */
import { useWebsite } from '@uniweb/kit'
import { DocumentProvider } from '@uniweb/press'
import DownloadBar from '#components/DownloadBar.jsx'
import { QueryProvider } from '#components/query-context.jsx'

export default function MetricsLayout({ body, page }) {
  const { website } = useWebsite()
  const pageTitle = page?.title || 'Academic Metrics'
  // filename is the stem — DownloadBar appends the format extension.
  const filename =
    (page?.title || 'academic-metrics')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')

  return (
    <QueryProvider>
      <DocumentProvider basePath={website.basePath}>
        <main className="metrics-body mx-auto max-w-5xl px-6 pb-16">
          <div className="metrics-report">{body}</div>
        </main>
        <DownloadBar title={pageTitle} filename={filename} />
      </DocumentProvider>
    </QueryProvider>
  )
}
