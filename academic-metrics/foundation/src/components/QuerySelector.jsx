/**
 * QuerySelector — a dropdown of saved queries plus an "All members"
 * default. Rendered inside the Cover section (which has content.data.queries).
 *
 * Writing to the selected-query context here re-renders every section
 * that uses useFilteredMembers, so the web preview updates live. The
 * next compile('xlsx') walks the refreshed registrations, so the
 * downloaded workbook matches what the reader sees.
 */
import { useSelectedQuery, ALL_MEMBERS } from './query-context.jsx'

export default function QuerySelector({ queries = [], matchedCount, totalCount }) {
  const [slug, setSlug] = useSelectedQuery()

  const handleChange = (e) => {
    setSlug(e.target.value)
  }

  return (
    <div className="query-selector" role="group" aria-label="Query selector">
      <label className="query-selector-label" htmlFor="academic-metrics-query">
        Population
      </label>
      <select
        id="academic-metrics-query"
        className="query-selector-control"
        value={slug}
        onChange={handleChange}
      >
        <option value={ALL_MEMBERS}>All members ({totalCount})</option>
        {queries.map((q) => (
          <option key={q.slug} value={q.slug}>
            {q.name || q.slug}
          </option>
        ))}
      </select>
      <span className="query-selector-count">
        {matchedCount} of {totalCount}
      </span>
    </div>
  )
}
