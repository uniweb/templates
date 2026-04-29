/**
 * FilterPanel — free-form filter UI driven by collection.queryable.
 *
 * Pattern A demo: the foundation reads the queryable-surface metadata
 * declared by the author in site.yml, renders one control per field,
 * and composes a where-object from the reader's selections. The
 * composed predicate flows through the same useFetched path as a
 * saved-view selection, so the framework decides whether to ship it
 * to the source or evaluate locally.
 *
 * Mutually exclusive with the QuerySelector dropdown (Pattern B):
 * activating the panel clears the saved-view selection; activating
 * the dropdown clears the panel.
 *
 * Field types from the starter set are all handled here:
 *   - enum    → <select>
 *   - boolean → <select> (Any / Yes / No tri-state)
 *   - range   → two <input type="number"> for min/max
 *   - text    → <input type="text">
 *
 * Foundations needing richer controls (date pickers, multi-select,
 * checkbox lists) replace this component or extend the type set.
 */

import { useEffect, useState } from 'react'
import { useCollectionQueryable } from '@uniweb/kit'
import { ALL_MEMBERS, useSelectedQuery, usePanelFilter } from './query-context.jsx'

const COLLECTION = 'members'

export default function FilterPanel() {
  const queryable = useCollectionQueryable(COLLECTION)
  const [, setSlug] = useSelectedQuery()
  const [panelWhere, setPanelWhere] = usePanelFilter()

  // Local UI state mirrors the panel's controls. Initialized from any
  // existing panelWhere so re-mounts (option-popover open/close) don't
  // wipe the reader's selections.
  const [values, setValues] = useState(() => decomposeWhere(panelWhere, queryable))

  // Re-decompose if the queryable shape arrives later than first render.
  useEffect(() => {
    setValues(decomposeWhere(panelWhere, queryable))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryable])

  if (!queryable) return null

  const update = (field, value) => {
    const next = { ...values, [field]: value }
    setValues(next)
    const composed = composeWhere(next, queryable)
    setPanelWhere(composed)
    if (composed) setSlug(ALL_MEMBERS) // Clear the saved-view dropdown.
  }

  const reset = () => {
    setValues({})
    setPanelWhere(null)
  }

  const hasActive = panelWhere && Object.keys(panelWhere).length > 0

  return (
    <fieldset className="filter-panel">
      <legend className="filter-panel-legend">Filter members</legend>
      {Object.entries(queryable).map(([field, def]) => (
        <FilterControl
          key={field}
          field={field}
          def={def}
          value={values[field]}
          onChange={(v) => update(field, v)}
        />
      ))}
      <button
        type="button"
        className="filter-panel-reset"
        onClick={reset}
        disabled={!hasActive}
      >
        Reset filters
      </button>
    </fieldset>
  )
}

// ─── Per-type controls ───────────────────────────────────────────

function FilterControl({ field, def, value, onChange }) {
  const label = def?.label || field
  switch (def?.type) {
    case 'enum':
      return (
        <Row label={label} field={field}>
          <select
            id={`filter-${field}`}
            value={value ?? ''}
            onChange={(e) => onChange(e.target.value || undefined)}
          >
            <option value="">Any</option>
            {(def.options || []).map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </Row>
      )
    case 'boolean':
      return (
        <Row label={label} field={field}>
          <select
            id={`filter-${field}`}
            value={value === undefined ? '' : String(value)}
            onChange={(e) => {
              const v = e.target.value
              onChange(v === '' ? undefined : v === 'true')
            }}
          >
            <option value="">Any</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </Row>
      )
    case 'range':
      return (
        <Row label={label} field={field}>
          <div className="filter-range">
            <input
              type="number"
              min={def.min}
              max={def.max}
              placeholder={def.min != null ? String(def.min) : 'min'}
              value={value?.min ?? ''}
              onChange={(e) => {
                const n = e.target.value === '' ? undefined : Number(e.target.value)
                onChange(rangeUpdate(value, 'min', n))
              }}
            />
            <span aria-hidden="true">–</span>
            <input
              type="number"
              min={def.min}
              max={def.max}
              placeholder={def.max != null ? String(def.max) : 'max'}
              value={value?.max ?? ''}
              onChange={(e) => {
                const n = e.target.value === '' ? undefined : Number(e.target.value)
                onChange(rangeUpdate(value, 'max', n))
              }}
            />
          </div>
        </Row>
      )
    case 'text':
      return (
        <Row label={label} field={field}>
          <input
            type="text"
            id={`filter-${field}`}
            placeholder={def.placeholder || ''}
            value={value ?? ''}
            onChange={(e) => onChange(e.target.value || undefined)}
          />
        </Row>
      )
    default:
      return null
  }
}

function Row({ label, field, children }) {
  return (
    <div className="filter-row">
      <label className="filter-label" htmlFor={`filter-${field}`}>{label}</label>
      {children}
    </div>
  )
}

function rangeUpdate(prev, key, value) {
  const next = { ...(prev || {}) }
  if (value === undefined) delete next[key]
  else next[key] = value
  return Object.keys(next).length === 0 ? undefined : next
}

// ─── Where-object composition ────────────────────────────────────

/**
 * Build a where-object from the panel's current values + queryable
 * metadata. Returns null when no field is active so the runtime
 * treats the panel as inactive.
 */
function composeWhere(values, queryable) {
  if (!values || !queryable) return null
  const where = {}
  for (const [field, def] of Object.entries(queryable)) {
    const value = values[field]
    if (value === undefined || value === null || value === '') continue
    if (def.type === 'range') {
      const ops = {}
      if (typeof value.min === 'number') ops.gte = value.min
      if (typeof value.max === 'number') ops.lte = value.max
      if (Object.keys(ops).length > 0) where[field] = ops
    } else {
      where[field] = value
    }
  }
  return Object.keys(where).length > 0 ? where : null
}

/**
 * Inverse of composeWhere: pull control values out of an existing
 * where-object so the panel can rehydrate from persisted state.
 */
function decomposeWhere(where, queryable) {
  if (!where || !queryable) return {}
  const values = {}
  for (const [field, def] of Object.entries(queryable)) {
    const w = where[field]
    if (w === undefined) continue
    if (def.type === 'range' && w && typeof w === 'object') {
      const r = {}
      if (typeof w.gte === 'number') r.min = w.gte
      if (typeof w.lte === 'number') r.max = w.lte
      if (Object.keys(r).length > 0) values[field] = r
    } else {
      values[field] = w
    }
  }
  return values
}
