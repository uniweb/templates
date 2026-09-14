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
 * content.data.queries of its own: it reads the saved views with
 * useFetched, from the file a build generates for the `queries` query.
 */
import { useFetched } from '@uniweb/kit'
import QuerySelector from './QuerySelector.jsx'
import FilterPanel from './FilterPanel.jsx'
import ReportOptions from './ReportOptions.jsx'
import SectionToggles from './SectionToggles.jsx'

export default function DocumentOptionsPanel() {
  // Kit hooks take explicit path:/url: — the `query:` shorthand is
  // build-time only, so this names the generated file itself.
  const { data } = useFetched({ path: '/data/queries.json', as: 'queries' })
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
