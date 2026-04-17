/**
 * Query-selection + section-inclusion + report-options context for
 * academic-metrics.
 *
 * Three pieces of state, persisted as one blob to localStorage:
 *
 *   - Selected query slug — which saved query filters the member set.
 *     'all-members' is a reserved sentinel meaning "no filter."
 *   - Included section keys — set of section keys the reader wants in
 *     the preview and the download. A section that isn't included
 *     skips its fragment registrations and returns null from render.
 *   - Report options:
 *       dateRange.start  required (year, number) when a filter is on
 *       dateRange.end    optional — null/empty means "open on the right"
 *                        (reports often need windows that extend into
 *                        the future: some grants / supervisions have
 *                        no end date, so the report's end doesn't
 *                        either)
 *       refereedOnly     boolean
 *       citationStyle    'apa' | 'mla' | 'chicago-author-date' | ...
 *                        drives PublicationsList
 *
 * The template ships every section ON by default and leaves the date
 * range empty: the idea is "mother of all reports, trim what you
 * don't want." Each section declares its own key and calls
 * useSectionIncluded(key) to gate itself.
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
  'publications-list',
  'funding',
  'supervisions',
]

const SECTION_LABELS = {
  members: 'Members',
  'publications-by-type': 'Publications by type',
  'publications-by-journal': 'Publications by journal',
  'publications-by-year': 'Publications by year',
  'publications-list': 'Publications (list)',
  funding: 'Funding',
  supervisions: 'Supervisions',
}

export function sectionLabel(key) {
  return SECTION_LABELS[key] || key
}

export const CITATION_STYLES = [
  { value: 'apa', label: 'APA (7th)' },
  { value: 'mla', label: 'MLA (9th)' },
  { value: 'chicago-author-date', label: 'Chicago (author–date)' },
  { value: 'ieee', label: 'IEEE' },
  { value: 'vancouver', label: 'Vancouver' },
  { value: 'harvard', label: 'Harvard' },
  { value: 'nature', label: 'Nature' },
]

const DEFAULT_STATE = {
  slug: ALL_MEMBERS_SLUG,
  excludedSections: [],
  dateRange: { start: null, end: null },
  refereedOnly: false,
  citationStyle: 'apa',
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
      dateRange: {
        start:
          parsed.dateRange?.start != null && parsed.dateRange?.start !== ''
            ? Number(parsed.dateRange.start)
            : null,
        end:
          parsed.dateRange?.end != null && parsed.dateRange?.end !== ''
            ? Number(parsed.dateRange.end)
            : null,
      },
      refereedOnly: Boolean(parsed.refereedOnly),
      citationStyle: parsed.citationStyle || DEFAULT_STATE.citationStyle,
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

  const setReportOption = useCallback((patch) => {
    setState((prev) => ({ ...prev, ...patch }))
  }, [])

  const value = useMemo(
    () => ({
      slug: state.slug,
      setSlug,
      excludedSections: state.excludedSections,
      toggleSection,
      dateRange: state.dateRange,
      refereedOnly: state.refereedOnly,
      citationStyle: state.citationStyle,
      setReportOption,
    }),
    [state, setSlug, toggleSection, setReportOption],
  )

  return <QueryContext.Provider value={value}>{children}</QueryContext.Provider>
}

function useCtx() {
  const ctx = useContext(QueryContext)
  if (ctx) return ctx
  return {
    slug: ALL_MEMBERS_SLUG,
    setSlug: () => {},
    excludedSections: [],
    toggleSection: () => {},
    dateRange: DEFAULT_STATE.dateRange,
    refereedOnly: DEFAULT_STATE.refereedOnly,
    citationStyle: DEFAULT_STATE.citationStyle,
    setReportOption: () => {},
  }
}

export function useSelectedQuery() {
  const { slug, setSlug } = useCtx()
  return [slug, setSlug]
}

export function useSectionIncluded(key) {
  const { excludedSections } = useCtx()
  return !excludedSections.includes(key)
}

export function useSectionToggles() {
  const { excludedSections, toggleSection } = useCtx()
  return [excludedSections, toggleSection]
}

/**
 * [options, setReportOption] for the date-range / refereed / citation
 * controls.
 */
export function useReportOptions() {
  const { dateRange, refereedOnly, citationStyle, setReportOption } = useCtx()
  return [{ dateRange, refereedOnly, citationStyle }, setReportOption]
}

/**
 * Read members + queries from `content.data`, look up the selected
 * query, and return the filtered member set.
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
