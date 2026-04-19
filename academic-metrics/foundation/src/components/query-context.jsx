/**
 * Query-selection + section-inclusion + report-options state for
 * academic-metrics.
 *
 * State lives on `page.state` (not a React context) so:
 *   - The values survive SPA navigation without being re-hydrated from
 *     React state on every mount.
 *   - The foundation's `data` handler (in foundation.js) can read the
 *     active query slug via `block.page.state.get('slug')` to simulate
 *     backend filtering of the members collection.
 *   - A local sync helper persists to localStorage independently.
 *
 * Five slots, each a separate key so only the subscribing component
 * re-renders when any one changes:
 *
 *   - slug              — which saved query filters the member set.
 *                         'all-members' means "no filter."
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
 *
 * NOTE: Members filtering by active query is no longer done here.
 * Section components read the already-filtered list from
 * `content.data.members`, with `content.data.membersTotal` and
 * `content.data.activeQuery` available for "X of Y" displays. The
 * filtering happens in the foundation's `data` handler — see
 * foundation.js for the simulated-backend explanation.
 */

import { usePageState } from '@uniweb/kit'

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

const PERSISTED_KEYS = ['slug', 'excludedSections', 'dateRange', 'refereedOnly', 'citationStyle']

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
