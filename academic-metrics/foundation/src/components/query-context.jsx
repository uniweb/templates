/**
 * Query-selection context for the academic-metrics docusite.
 *
 * A "query" here is a saved filter over the `members` collection — see
 * @uniweb/query for the grammar. This module owns:
 *
 *   - QueryProvider — holds the slug of the currently-selected query,
 *     persisted to localStorage so the choice survives page reloads.
 *   - useSelectedQuery() — read/write that slug from any component.
 *   - useFilteredMembers(content) — the one section components actually
 *     call: returns { members, activeQuery, totalCount } for the current
 *     selection, running resolveQuery against content.data.members.
 *
 * Press stays format-agnostic. Query machinery belongs to the foundation
 * because the concept of "populations of members" is domain-specific.
 */

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { resolveQuery, QueryError } from '@uniweb/query'

const STORAGE_KEY = 'academic-metrics/selected-query'
const ALL_MEMBERS_SLUG = 'all-members'

const QueryContext = createContext(null)

function loadPersisted() {
  if (typeof window === 'undefined') return null
  try {
    return window.localStorage.getItem(STORAGE_KEY) || null
  } catch {
    return null
  }
}

export function QueryProvider({ children }) {
  const [slug, setSlug] = useState(() => loadPersisted() || ALL_MEMBERS_SLUG)

  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      window.localStorage.setItem(STORAGE_KEY, slug)
    } catch {
      // Quota or disabled — state remains live in memory.
    }
  }, [slug])

  const value = useMemo(() => [slug, setSlug], [slug])

  return <QueryContext.Provider value={value}>{children}</QueryContext.Provider>
}

/**
 * @returns {[string, (slug: string) => void]} current query slug + setter.
 *   Outside a provider, returns [ALL_MEMBERS_SLUG, noop] so sections
 *   can call unconditionally.
 */
export function useSelectedQuery() {
  const ctx = useContext(QueryContext)
  if (!ctx) return [ALL_MEMBERS_SLUG, () => {}]
  return ctx
}

/**
 * Read members + queries from `content.data`, look up the selected
 * query, and return the filtered member set.
 *
 * The `all-members` slug is special: it matches everything by convention,
 * bypassing resolveQuery entirely so a missing predicate never blocks
 * rendering.
 *
 * @param {Object} content - The section's content prop (with .data).
 * @returns {{ members: Array, activeQuery: Object|null, totalCount: number, allQueries: Array }}
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
