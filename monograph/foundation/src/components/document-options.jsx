/**
 * Download-time options for the monograph.
 *
 * Press stays format-agnostic — it doesn't know about chapter toggles,
 * figure inclusion, or citation styles. Those are monograph-domain
 * concepts owned by the foundation. This module is the foundation's
 * contribution: a React context that holds the options, a provider
 * that persists them to localStorage, and a hook that sections read.
 *
 * Changing an option re-renders subscribed sections, which re-register
 * their Press fragments via useDocumentOutput (idempotent — overwrites
 * the prior entry). The next compile() reflects the new choices.
 */

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

export const ALL_CHAPTER_KEYS = [
  'front-matter',
  'prologue',
  'zoology',
  'specimens',
  'measurements',
  'biogeography',
  'plates',
  'bibliography',
]

export const CITATION_STYLES = [
  { value: 'apa', label: 'APA (7th)' },
  { value: 'mla', label: 'MLA (9th)' },
  { value: 'chicago-author-date', label: 'Chicago (author–date)' },
  { value: 'ieee', label: 'IEEE' },
  { value: 'vancouver', label: 'Vancouver' },
  { value: 'harvard', label: 'Harvard' },
  { value: 'nature', label: 'Nature' },
]

export const DEFAULT_OPTIONS = {
  citationStyle: 'apa',
  includeFigures: true,
  includedChapters: Object.fromEntries(ALL_CHAPTER_KEYS.map((k) => [k, true])),
}

const DocumentOptionsContext = createContext(null)

const STORAGE_KEY = 'monograph/document-options'

function loadPersisted() {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    return {
      ...DEFAULT_OPTIONS,
      ...parsed,
      includedChapters: {
        ...DEFAULT_OPTIONS.includedChapters,
        ...(parsed?.includedChapters || {}),
      },
    }
  } catch {
    return null
  }
}

export function DocumentOptionsProvider({ children }) {
  const [options, setOptions] = useState(() => loadPersisted() || DEFAULT_OPTIONS)

  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(options))
    } catch {
      // Quota or disabled; state is still live in memory.
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
 * Read download options. Returns [options, setOptions]. Outside the
 * provider, falls back to defaults with a no-op setter so section
 * components can call the hook unconditionally.
 */
export function useDocumentOptions() {
  const ctx = useContext(DocumentOptionsContext)
  if (!ctx) return [DEFAULT_OPTIONS, () => {}]
  return ctx
}

/** Merge a partial update into the current options. */
export function updateOptions(setOptions, patch) {
  setOptions((prev) => ({
    ...prev,
    ...patch,
    includedChapters: {
      ...prev.includedChapters,
      ...(patch.includedChapters || {}),
    },
  }))
}
