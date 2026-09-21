/**
 * QuerySelector — saved-view dropdown (Pattern B in the demo).
 *
 * Picking a saved view writes its slug to page.state.slug and clears
 * any active panel filter (page.state.panelWhere = null). The shared
 * useFilteredMembers hook resolves the active predicate on each
 * section's render and keeps the members it matches.
 *
 * The dropdown shows "All members" plus one option per saved view — a
 * record of the `queries` query (declared under `queries:` in site.yml,
 * one file per view in records/queries/). A view's `where:` field is
 * the predicate applied when it is picked.
 */
import { useSelectedQuery, usePanelFilter, ALL_MEMBERS, handleOf } from './query-context.jsx'

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
          <option key={handleOf(q)} value={handleOf(q)}>
            {q.name || handleOf(q)}
          </option>
        ))}
      </select>
    </div>
  )
}
