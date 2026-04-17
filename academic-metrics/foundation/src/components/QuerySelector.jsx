/**
 * QuerySelector — saved-query dropdown.
 *
 * Lives inside DocumentOptionsPanel; the panel owns the queries list
 * (fetched from /data/queries.json) and passes it in as a prop.
 * Writing to the selected-query context re-renders every section
 * that uses useFilteredMembers, so the web preview updates live and
 * the next compile('xlsx' | 'docx') walks the refreshed registrations.
 */
import { useSelectedQuery, ALL_MEMBERS } from './query-context.jsx'

export default function QuerySelector({ queries = [] }) {
  const [slug, setSlug] = useSelectedQuery()

  return (
    <div className="query-selector">
      <label className="query-selector-label" htmlFor="academic-metrics-query">
        Population
      </label>
      <select
        id="academic-metrics-query"
        className="query-selector-control"
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
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
