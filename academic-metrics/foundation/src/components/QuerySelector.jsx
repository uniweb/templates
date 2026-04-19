/**
 * QuerySelector — saved-view dropdown (Pattern B in the demo).
 *
 * Picking a saved view writes its slug to page.state.slug and clears
 * any active panel filter (page.state.panelWhere = null). The shared
 * useFilteredMembers hook resolves the active predicate on each
 * section's render and dispatches a where-bound fetch via useFetched —
 * the framework handles the rest.
 *
 * The dropdown shows "All members" plus one option per record in the
 * `views` collection (declared in site.yml as `collections.queries:`).
 * Each record's `where:` field is what gets handed to useFetched when
 * activated.
 */
import { useSelectedQuery, usePanelFilter, ALL_MEMBERS } from './query-context.jsx'

export default function QuerySelector({ queries = [] }) {
  const [slug, setSlug] = useSelectedQuery()
  const [, setPanelWhere] = usePanelFilter()

  const onChange = (next) => {
    setSlug(next)
    setPanelWhere(null) // Saved-view selection clears the panel.
  }

  return (
    <div className="query-selector">
      <label className="query-selector-label" htmlFor="academic-metrics-query">
        Population
      </label>
      <select
        id="academic-metrics-query"
        className="query-selector-control"
        value={slug}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value={ALL_MEMBERS}>All members</option>
        {queries.map((q) => (
          <option key={q.slug} value={q.slug}>
            {q.name || q.slug}
          </option>
        ))}
      </select>
    </div>
  )
}
