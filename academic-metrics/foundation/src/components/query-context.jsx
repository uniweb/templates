/**
 * Population-selection + section-inclusion + report-options state for
 * academic-metrics.
 *
 * State lives on `page.state` (not a React context) so:
 *   - The values survive SPA navigation without being re-hydrated from
 *     React state on every mount.
 *   - The shared useFilteredMembers hook resolves the active predicate
 *     from page.state on every render and passes it to useFetched —
 *     the framework decides whether to ship that predicate to the
 *     source or evaluate it locally based on `fetcher.supports:`.
 *   - A local sync helper persists to localStorage independently.
 *
 * Six slots, each a separate key so only the subscribing component
 * re-renders when any one changes:
 *
 *   - slug              — which saved view filters the member set.
 *                         'all-members' means "no saved view active."
 *   - panelWhere        — a where-object composed by the FilterPanel.
 *                         null when the panel is inactive. When set,
 *                         takes precedence over `slug`.
 *   - excludedSections  — array of section keys the reader hid.
 *   - dateRange         — { start, end } year window. null on either
 *                         side means "open" (start: beginning of time,
 *                         end: open to the future — grants /
 *                         supervisions can have no end date).
 *   - refereedOnly      — boolean toggle.
 *   - citationStyle     — 'apa' | 'mla' | ... — drives PublicationsList.
 *
 * Persistence: `installQueryStatePersistence(page)` reads localStorage
 * once on first call, seeds any missing slots, then subscribes to the
 * keys it cares about and writes the combined blob on change. Callable
 * from inside a useEffect in the layout.
 *
 * The template ships every section ON by default and leaves the date
 * range empty: "mother of all reports, trim what you don't want."
 */

import { useMemo } from 'react'
import { usePageState, useFetched } from '@uniweb/kit'

const STORAGE_KEY = 'academic-metrics/options'
const ALL_MEMBERS_SLUG = 'all-members'
export const ALL_MEMBERS = ALL_MEMBERS_SLUG

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

const DEFAULTS = {
  slug: ALL_MEMBERS_SLUG,
  panelWhere: null,
  excludedSections: [],
  dateRange: { start: null, end: null },
  refereedOnly: false,
  citationStyle: 'apa',
}

// ─── Persistence ──────────────────────────────────────────────────

function readPersisted() {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    return {
      slug: parsed.slug || DEFAULTS.slug,
      panelWhere: (parsed.panelWhere && typeof parsed.panelWhere === 'object') ? parsed.panelWhere : null,
      excludedSections: Array.isArray(parsed.excludedSections) ? parsed.excludedSections : [],
      dateRange: {
        start: parsed.dateRange?.start != null && parsed.dateRange?.start !== ''
          ? Number(parsed.dateRange.start) : null,
        end: parsed.dateRange?.end != null && parsed.dateRange?.end !== ''
          ? Number(parsed.dateRange.end) : null,
      },
      refereedOnly: Boolean(parsed.refereedOnly),
      citationStyle: parsed.citationStyle || DEFAULTS.citationStyle,
    }
  } catch {
    return null
  }
}

function writePersisted(page) {
  if (typeof window === 'undefined') return
  const snapshot = {
    slug: page.state.get('slug') ?? DEFAULTS.slug,
    panelWhere: page.state.get('panelWhere') ?? DEFAULTS.panelWhere,
    excludedSections: page.state.get('excludedSections') ?? DEFAULTS.excludedSections,
    dateRange: page.state.get('dateRange') ?? DEFAULTS.dateRange,
    refereedOnly: page.state.get('refereedOnly') ?? DEFAULTS.refereedOnly,
    citationStyle: page.state.get('citationStyle') ?? DEFAULTS.citationStyle,
  }
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot))
  } catch {
    // Quota or disabled — state remains live in memory only.
  }
}

// Track which pages already have persistence wired so repeat mounts of
// the layout don't attach duplicate subscribers. A WeakSet keyed by page
// keeps this out of page.state's keyspace — no sentinel values, no
// risk of collision with a foundation slot.
const persistedPages = new WeakSet()

const PERSISTED_KEYS = ['slug', 'panelWhere', 'excludedSections', 'dateRange', 'refereedOnly', 'citationStyle']

/**
 * Seed `page.state` from localStorage if present, then subscribe to
 * changes and write back. Idempotent — safe to call on every layout
 * mount.
 *
 * Returns an unsubscribe function.
 */
export function installQueryStatePersistence(page) {
  if (!page || !page.state) return () => {}
  if (persistedPages.has(page)) return () => {}
  persistedPages.add(page)

  const seed = readPersisted() || DEFAULTS
  for (const key of PERSISTED_KEYS) {
    if (!page.state.has(key)) page.state.set(key, seed[key])
  }

  // Per-key subscriptions — no all-keys fan-out in ObservableState.
  const write = () => writePersisted(page)
  const unsubs = PERSISTED_KEYS.map((key) => page.state.subscribe(key, write))
  return () => unsubs.forEach((fn) => fn())
}

// ─── Hooks ───────────────────────────────────────────────────────

export function useSelectedQuery() {
  return usePageState('slug', DEFAULTS.slug)
}

export function usePanelFilter() {
  return usePageState('panelWhere', DEFAULTS.panelWhere)
}

export function useSectionIncluded(key) {
  const [excluded] = usePageState('excludedSections', DEFAULTS.excludedSections)
  return !excluded.includes(key)
}

export function useSectionToggles() {
  const [excluded, setExcluded] = usePageState('excludedSections', DEFAULTS.excludedSections)
  const toggle = (key) => {
    const set = new Set(excluded)
    if (set.has(key)) set.delete(key)
    else set.add(key)
    setExcluded([...set])
  }
  return [excluded, toggle]
}

/**
 * Group the date-range / refereed / citation controls under one hook
 * so call sites don't grow three separate usePageState lines. The setter
 * accepts a patch object (matches the original React-context API).
 */
export function useReportOptions() {
  const [dateRange, setDateRange] = usePageState('dateRange', DEFAULTS.dateRange)
  const [refereedOnly, setRefereedOnly] = usePageState('refereedOnly', DEFAULTS.refereedOnly)
  const [citationStyle, setCitationStyle] = usePageState('citationStyle', DEFAULTS.citationStyle)

  const setReportOption = (patch) => {
    if ('dateRange' in patch) setDateRange(patch.dateRange)
    if ('refereedOnly' in patch) setRefereedOnly(patch.refereedOnly)
    if ('citationStyle' in patch) setCitationStyle(patch.citationStyle)
  }

  return [{ dateRange, refereedOnly, citationStyle }, setReportOption]
}

// ─── The shared filtered-members hook ────────────────────────────

/**
 * Resolve the active where-object from page.state. The FilterPanel and
 * the QuerySelector dropdown are alternatives; whichever one is active
 * provides the predicate. The panel takes precedence when set.
 */
function resolveActiveWhere(slug, panelWhere, allQueries) {
  if (panelWhere && typeof panelWhere === 'object' && Object.keys(panelWhere).length > 0) {
    return { where: panelWhere, source: 'panel', label: 'Custom filter' }
  }
  if (slug && slug !== ALL_MEMBERS_SLUG) {
    const view = allQueries.find((q) => q.slug === slug)
    if (view?.where) {
      return { where: view.where, source: 'view', label: view.name || slug, view }
    }
  }
  return { where: null, source: null, label: null, view: null }
}

/**
 * Fetch the members collection narrowed by the active predicate.
 *
 * Reads the available saved views from `content.data.queries` (cascaded
 * from page.yml). Composes the active predicate from page.state.
 * Hands a where-bound request to useFetched — the framework dispatches
 * a fresh fetch when the predicate changes (cache key includes
 * pushed-down operators) and uses the runtime fallback when not.
 *
 * Returns { members, activeView, activeWhere, totalCount, loading }:
 *   - members      — the filtered set (or the full set when no filter is active)
 *   - activeView   — the saved-view doc when the dropdown is the source; null otherwise
 *   - activeWhere  — the resolved predicate (or null)
 *   - totalCount   — the unfiltered count, for "X of Y" displays
 *   - loading      — true while the fetch is in flight on first read
 *
 * @param {Object} content - The block's content (delivered by the framework).
 *   Reads content.data.queries for the saved-views catalog and
 *   content.data.members for the unfiltered count.
 */
export function useFilteredMembers(content) {
  const [slug] = useSelectedQuery()
  const [panelWhere] = usePanelFilter()

  const allQueries = useMemo(
    () => (Array.isArray(content?.data?.queries) ? content.data.queries : []),
    [content?.data?.queries],
  )
  const allMembers = useMemo(
    () => (Array.isArray(content?.data?.members) ? content.data.members : []),
    [content?.data?.members],
  )

  const active = useMemo(
    () => resolveActiveWhere(slug, panelWhere, allQueries),
    [slug, panelWhere, allQueries],
  )

  // The page-level cascade already fetched /data/members.json without
  // a where: clause. With supports:[], the cache key for this useFetched
  // matches that fetch (where: doesn't split the key when not pushed down),
  // so we get a synchronous cache hit and apply the predicate locally.
  // With supports:[where], the where: splits the key and triggers a
  // separate fetch with the predicate.
  //
  // NOTE: kit hooks take an explicit path:/url:; the `collection:`
  // shorthand is build-time only. To swap to a backend, change BOTH
  // the page-level fetch (in page.yml) AND the path here.
  const { data: fetched, loading } = useFetched(
    active.where
      ? { path: '/data/members.json', schema: 'members', where: active.where }
      : null,
  )

  const members = active.where ? (fetched || []) : allMembers

  return {
    members,
    activeView: active.view,
    activeWhere: active.where,
    activeLabel: active.label,
    totalCount: allMembers.length,
    loading: active.where ? loading : false,
  }
}
