/**
 * QuerySelector — saved-query dropdown.
 *
 * Lives inside DocumentOptionsPanel; the panel owns the queries list
 * (fetched from /data/queries.json) and passes it in as a prop.
 *
 * Writing to the selected-query slot of page.state propagates through
 * the layout's useSelectedQuery() subscription, which re-renders every
 * section. Each section's BlockRenderer re-runs the foundation's data
 * handler with the new slug, so `content.data.members` is freshly
 * filtered and the next compile('xlsx' | 'docx') walks the refreshed
 * registrations. See foundation.js for the simulator explanation.
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
