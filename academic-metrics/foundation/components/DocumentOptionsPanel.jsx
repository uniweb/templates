/**
 * DocumentOptionsPanel — the popover revealed by the Options gear
 * button on the floating toolbar. Composes four control groups:
 *
 *   1. Population — saved-view dropdown (QuerySelector)
 *   2. Filter — free-form filter UI (FilterPanel) reading the
 *      `members` query's `queryable:` declaration
 *   3. Report options — date range, refereed-only, citation style
 *   4. Sections — per-section inclusion checkboxes
 *
 * The saved-view dropdown and the filter panel are alternatives —
 * activating one clears the other. See query-context.jsx for the
 * predicate-resolution rules (panel takes precedence when set).
 *
 * The panel renders outside the sections, so it has no
 * content.data.queries of its own. It asks the `queries` query by name:
 * @uniweb/core's resolveFetchConfigs turns the name into a request — the
 * file a static build generates, or a host's live records — and useFetched
 * dispatches it through the site's fetcher.
 */
import { useMemo } from 'react'
import { resolveFetchConfigs } from '@uniweb/core'
import { useFetched, useWebsite } from '@uniweb/kit'
import QuerySelector from './QuerySelector.jsx'
import FilterPanel from './FilterPanel.jsx'
import ReportOptions from './ReportOptions.jsx'
import SectionToggles from './SectionToggles.jsx'

export default function DocumentOptionsPanel() {
  const { website } = useWebsite()
  const request = useMemo(
    () =>
      resolveFetchConfigs([{ query: 'queries', as: 'queries' }], {
        queries: website?.config?.queries ?? null,
        services: website?.config?.services ?? null,
        locale: website?.getActiveLocale?.() ?? null,
        defaultLocale: website?.getDefaultLocale?.() ?? null,
      }).get('queries') ?? null,
    [website],
  )
  const { data } = useFetched(request)
  const queries = Array.isArray(data) ? data : []

  return (
    <div className="w-[min(32rem,calc(100vw-3rem))] max-h-[calc(100vh-8rem)] overflow-y-auto rounded-lg border border-border bg-card p-4 shadow-xl flex flex-col gap-4">
      <QuerySelector queries={queries} />
      <FilterPanel />
      <ReportOptions />
      <SectionToggles />
    </div>
  )
}
