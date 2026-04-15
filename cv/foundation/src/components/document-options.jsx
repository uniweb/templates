/**
 * Download-time options for the docusite report.
 *
 * Press stays format-agnostic: it doesn't know about citation styles,
 * date ranges, or which sections a report has. Those are report-domain
 * concepts owned by the foundation. This module is the foundation's
 * contribution — a React context that holds the options, a provider
 * that persists them, and a hook that sections read from.
 *
 * Usage:
 *
 *   // At the layout level
 *   <DocumentOptionsProvider>
 *     <DocumentProvider>
 *       …report sections…
 *       <DownloadControls />  // reads options, runs compile()
 *     </DocumentProvider>
 *   </DocumentOptionsProvider>
 *
 *   // Inside any section component
 *   const [options] = useDocumentOptions()
 *   const filtered = items.filter(item =>
 *     inRange(item.year, options.dateRange)
 *   )
 *
 * State changes trigger re-renders in every subscribed section,
 * which re-register their Press fragments via useDocumentOutput
 * (idempotent — overwrites the prior registration at the same key).
 * The next compile() pass walks the updated store.
 */

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

export const ALL_SECTION_KEYS = [
  'cover',
  'contents',
  'personal',
  'education',
  'employment',
  'funding',
  'publications',
  'teaching',
  'service',
  'awards',
  'appendix',
]

export const CITATION_STYLES = [
  { value: 'apa', label: 'APA (7th)' },
  { value: 'mla', label: 'MLA (9th)' },
  { value: 'chicago-author-date', label: 'Chicago (author–date)' },
  { value: 'ieee', label: 'IEEE' },
  { value: 'vancouver', label: 'Vancouver' },
  { value: 'harvard', label: 'Harvard' },
  { value: 'ama', label: 'AMA' },
  { value: 'nature', label: 'Nature' },
  { value: 'science', label: 'Science' },
]

/**
 * The default options state. Used before anything is loaded from
 * localStorage and as the fallback for sections called outside the
 * provider (so they don't need to null-check).
 */
export const DEFAULT_OPTIONS = {
  dateRange: { start: null, end: null }, // null on either end = no bound
  citationStyle: 'apa',
  includedSections: Object.fromEntries(
    ALL_SECTION_KEYS.map((key) => [key, true]),
  ),
}

const DocumentOptionsContext = createContext(null)

const STORAGE_KEY = 'faculty-annual-report/document-options'

function loadPersisted() {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    // Shallow-merge onto defaults so any new option added in a later
    // slice is picked up without wiping saved state.
    return {
      ...DEFAULT_OPTIONS,
      ...parsed,
      dateRange: { ...DEFAULT_OPTIONS.dateRange, ...(parsed?.dateRange || {}) },
      includedSections: {
        ...DEFAULT_OPTIONS.includedSections,
        ...(parsed?.includedSections || {}),
      },
    }
  } catch {
    return null
  }
}

export function DocumentOptionsProvider({ children }) {
  const [options, setOptions] = useState(() => loadPersisted() || DEFAULT_OPTIONS)

  // Persist on change. Dev-mode SSR passes still render once with the
  // default state and then hydrate from localStorage on mount.
  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(options))
    } catch {
      // Storage quota or disabled; ignore — state is still live in memory.
    }
  }, [options])

  const value = useMemo(() => [options, setOptions], [options])

  return (
    <DocumentOptionsContext.Provider value={value}>
      {children}
    </DocumentOptionsContext.Provider>
  )
}

/**
 * Read the download options. Returns a [options, setOptions] tuple.
 *
 * When called outside a <DocumentOptionsProvider>, falls back to the
 * defaults with a no-op setter. This lets section components call the
 * hook unconditionally — safe under conditional providers and Strict
 * Mode double-render.
 */
export function useDocumentOptions() {
  const ctx = useContext(DocumentOptionsContext)
  if (!ctx) return [DEFAULT_OPTIONS, () => {}]
  return ctx
}

/**
 * Merge a partial update into the current options. Convenient for
 * forms that only change one field at a time.
 */
export function updateOptions(setOptions, patch) {
  setOptions((prev) => ({
    ...prev,
    ...patch,
    // Ensure nested objects merge rather than replace.
    dateRange: { ...prev.dateRange, ...(patch.dateRange || {}) },
    includedSections: {
      ...prev.includedSections,
      ...(patch.includedSections || {}),
    },
  }))
}

/**
 * True iff a given year falls inside the (possibly half-open) range.
 * Null bounds mean "unbounded on that side". If both bounds are null,
 * every year passes.
 */
export function yearInRange(year, range) {
  if (year == null) return true
  const y = typeof year === 'number' ? year : parseInt(year, 10)
  if (Number.isNaN(y)) return true
  const { start, end } = range || {}
  if (start != null && y < start) return false
  if (end != null && y > end) return false
  return true
}

/**
 * True iff an item's [itemStart, itemEnd] interval overlaps the range.
 * Items with only one endpoint treat the missing side as unbounded.
 */
export function intervalOverlapsRange(itemStart, itemEnd, range) {
  const s = itemStart != null ? parseInt(itemStart, 10) : null
  const e = itemEnd != null ? parseInt(itemEnd, 10) : s
  const { start, end } = range || {}
  if (start != null && e != null && e < start) return false
  if (end != null && s != null && s > end) return false
  return true
}
