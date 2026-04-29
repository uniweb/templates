/**
 * SectionToggles — "sections to include in this report" checkbox list.
 *
 * Rendered by Cover next to the QuerySelector. Each checkbox maps to a
 * section key in SECTION_KEYS; toggling it writes to the query-context
 * store, which re-renders every subscribed section. The next download
 * only includes sheets for sections whose key is included.
 *
 * The template ships every section ON by default — users trim what
 * they don't want.
 */
import {
  SECTION_KEYS,
  sectionLabel,
  useSectionToggles,
} from './query-context.jsx'

export default function SectionToggles() {
  const [excludedSections, toggleSection] = useSectionToggles()
  const excludedSet = new Set(excludedSections)

  return (
    <fieldset className="section-toggles">
      <legend className="section-toggles-legend">Sections</legend>
      <div className="section-toggles-list">
        {SECTION_KEYS.map((key) => (
          <label key={key} className="section-toggles-item">
            <input
              type="checkbox"
              checked={!excludedSet.has(key)}
              onChange={() => toggleSection(key)}
            />
            <span>{sectionLabel(key)}</span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}
