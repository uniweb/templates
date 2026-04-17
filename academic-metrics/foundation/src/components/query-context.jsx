/**
 * Query-selection + section-inclusion context for academic-metrics.
 *
 * Two pieces of state, persisted together to localStorage:
 *
 *   - Selected query slug — which saved query filters the member set.
 *     'all-members' is a reserved sentinel meaning "no filter."
 *   - Included section keys — set of section keys the reader wants in
 *     the preview and the download. A section that isn't included
 *     skips its xlsx registration and returns null from render.
 *
 * The template ships every section ON by default: the idea is "mother
 * of all reports, trim what you don't want." Each section declares its
 * own key and calls useSectionIncluded(key) to gate itself.
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { resolveQuery, QueryError } from '@uniweb/query'

const STORAGE_KEY = 'academic-metrics/options'
const ALL_MEMBERS_SLUG = 'all-members'

// The canonical list of section keys the template ships. Keep in sync
// with the section components that call useSectionIncluded(). The Cover
// is intentionally absent — it hosts the controls themselves.
export const SECTION_KEYS = [
  'members',
  'publications-by-type',
  'publications-by-journal',
  'publications-by-year',
]

const SECTION_LABELS = {
  members: 'Members',
  'publications-by-type': 'Publications by type',
  'publications-by-journal': 'Publications by journal',
  'publications-by-year': 'Publications by year',
}

export function sectionLabel(key) {
  return SECTION_LABELS[key] || key
}

const DEFAULT_STATE = {
  slug: ALL_MEMBERS_SLUG,
  excludedSections: [],
}

const QueryContext = createContext(null)

function loadPersisted() {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    return {
      slug: parsed.slug || DEFAULT_STATE.slug,
      excludedSections: Array.isArray(parsed.excludedSections)
        ? parsed.excludedSections
        : [],
    }
  } catch {
    return null
  }
}

export function QueryProvider({ children }) {
  const [state, setState] = useState(() => loadPersisted() || DEFAULT_STATE)

  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      // Quota or disabled — state remains live in memory.
    }
  }, [state])

  const setSlug = useCallback((slug) => {
    setState((prev) => ({ ...prev, slug }))
  }, [])

  const toggleSection = useCallback((key) => {
    setState((prev) => {
      const set = new Set(prev.excludedSections)
      if (set.has(key)) set.delete(key)
      else set.add(key)
      return { ...prev, excludedSections: [...set] }
    })
  }, [])

  const value = useMemo(
    () => ({
      slug: state.slug,
      setSlug,
      excludedSections: state.excludedSections,
      toggleSection,
    }),
    [state, setSlug, toggleSection],
  )

  return <QueryContext.Provider value={value}>{children}</QueryContext.Provider>
}

function useCtx() {
  const ctx = useContext(QueryContext)
  if (ctx) return ctx
  // Outside the provider, return a read-only default so sections can
  // call hooks unconditionally.
  return {
    slug: ALL_MEMBERS_SLUG,
    setSlug: () => {},
    excludedSections: [],
    toggleSection: () => {},
  }
}

/**
 * @returns {[string, (slug: string) => void]} current query slug + setter.
 */
export function useSelectedQuery() {
  const { slug, setSlug } = useCtx()
  return [slug, setSlug]
}

/**
 * Whether a given section key is currently included.
 */
export function useSectionIncluded(key) {
  const { excludedSections } = useCtx()
  return !excludedSections.includes(key)
}

/**
 * [excludedSections, toggleSection] — used by the Cover's options panel.
 */
export function useSectionToggles() {
  const { excludedSections, toggleSection } = useCtx()
  return [excludedSections, toggleSection]
}

/**
 * Read members + queries from `content.data`, look up the selected
 * query, and return the filtered member set.
 *
 * @param {Object} content - The section's content prop (with .data).
 * @returns {{ members, activeQuery, totalCount, allQueries }}
 */
export function useFilteredMembers(content) {
  const [slug] = useSelectedQuery()
  const allMembers = content?.data?.members || []
  const allQueries = content?.data?.queries || []

  const activeQuery =
    slug === ALL_MEMBERS_SLUG
      ? null
      : allQueries.find((q) => q.slug === slug) || null

  const filtered = useMemo(() => {
    if (!activeQuery) return allMembers
    try {
      return resolveQuery(activeQuery, allMembers)
    } catch (err) {
      if (err instanceof QueryError) {
        // eslint-disable-next-line no-console
        console.warn(
          `[academic-metrics] query "${activeQuery.slug}" failed to parse:`,
          err.message,
        )
      } else {
        throw err
      }
      return allMembers
    }
  }, [activeQuery, allMembers])

  return {
    members: filtered,
    activeQuery,
    totalCount: allMembers.length,
    allQueries,
  }
}

export const ALL_MEMBERS = ALL_MEMBERS_SLUG
