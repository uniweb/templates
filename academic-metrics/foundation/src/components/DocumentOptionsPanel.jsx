/**
 * DocumentOptionsPanel — the popover revealed by the Options gear
 * button on the floating toolbar. Composes three control groups:
 *
 *   1. Population — saved-query dropdown (QuerySelector)
 *   2. Report options — date range, refereed-only, citation style
 *   3. Sections — per-section inclusion checkboxes
 *
 * The panel fetches /data/queries.json itself rather than reading
 * the queries collection through a section's content.data — it
 * lives at layout scope, outside any section's data cascade. One
 * fetch on mount, cached in state.
 */
import { useEffect, useState } from 'react'
import { useWebsite } from '@uniweb/kit'
import QuerySelector from './QuerySelector.jsx'
import ReportOptions from './ReportOptions.jsx'
import SectionToggles from './SectionToggles.jsx'

export default function DocumentOptionsPanel() {
  const { website } = useWebsite()
  const [queries, setQueries] = useState([])

  useEffect(() => {
    const base = website?.basePath || '/'
    const url = `${base}data/queries.json`
    let cancelled = false
    fetch(url)
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => {
        if (cancelled) return
        setQueries(Array.isArray(data) ? data : [])
      })
      .catch(() => {
        if (!cancelled) setQueries([])
      })
    return () => {
      cancelled = true
    }
  }, [website?.basePath])

  return (
    <div className="w-[min(32rem,calc(100vw-3rem))] max-h-[calc(100vh-8rem)] overflow-y-auto rounded-lg border border-border bg-card p-4 shadow-xl flex flex-col gap-4">
      <QuerySelector queries={queries} />
      <ReportOptions />
      <SectionToggles />
    </div>
  )
}
