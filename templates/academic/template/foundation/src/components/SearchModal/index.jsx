import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Link, useWebsite, cn } from '@uniweb/kit'

/**
 * SearchModal Component
 *
 * A modal search interface for academic sites.
 * Uses Fuse.js for fuzzy search (must be installed in foundation).
 *
 * Features:
 * - Keyboard navigation (↑↓ to navigate, Enter to select, Escape to close)
 * - Cmd/Ctrl+K shortcut to open
 * - Highlighted search matches
 * - Mobile-responsive
 */
export function SearchModal({ isOpen, onClose, website: websiteProp }) {
  const { website: contextWebsite } = useWebsite()
  const website = websiteProp || contextWebsite

  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [searchClient, setSearchClient] = useState(null)

  const inputRef = useRef(null)
  const resultsRef = useRef(null)

  // Initialize search client
  useEffect(() => {
    if (!website?.isSearchEnabled()) return

    async function initSearch() {
      try {
        const { createSearchClient } = await import('@uniweb/kit/search')
        const client = createSearchClient(website)
        setSearchClient(client)
        // Preload the index
        client.preload()
      } catch (err) {
        console.warn('Search not available:', err.message)
      }
    }

    initSearch()
  }, [website])

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
      setQuery('')
      setResults([])
      setSelectedIndex(0)
    }
  }, [isOpen])

  // Perform search
  const performSearch = useCallback(async (searchQuery) => {
    if (!searchClient || !searchQuery.trim()) {
      setResults([])
      return
    }

    setIsLoading(true)
    try {
      const searchResults = await searchClient.query(searchQuery, { limit: 8 })
      setResults(searchResults)
      setSelectedIndex(0)
    } catch (err) {
      console.error('Search error:', err)
      setResults([])
    } finally {
      setIsLoading(false)
    }
  }, [searchClient])

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      performSearch(query)
    }, 150)
    return () => clearTimeout(timer)
  }, [query, performSearch])

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          setSelectedIndex(i => Math.min(i + 1, results.length - 1))
          break
        case 'ArrowUp':
          e.preventDefault()
          setSelectedIndex(i => Math.max(i - 1, 0))
          break
        case 'Enter':
          e.preventDefault()
          if (results[selectedIndex]) {
            window.location.href = results[selectedIndex].href
            onClose()
          }
          break
        case 'Escape':
          e.preventDefault()
          onClose()
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, results, selectedIndex, onClose])

  // Scroll selected result into view
  useEffect(() => {
    if (resultsRef.current && results.length > 0) {
      const selected = resultsRef.current.children[selectedIndex]
      if (selected) {
        selected.scrollIntoView({ block: 'nearest' })
      }
    }
  }, [selectedIndex, results.length])

  if (!isOpen) return null

  const searchEnabled = website?.isSearchEnabled()

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative min-h-screen flex items-start justify-center pt-[10vh] px-4">
        <div className="relative w-full max-w-xl bg-white rounded-xl shadow-2xl">
          {/* Search Input */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-200">
            <SearchIcon className="w-5 h-5 text-slate-400" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={searchEnabled ? "Search..." : "Search not enabled"}
              disabled={!searchEnabled}
              className="flex-1 text-lg outline-none placeholder:text-slate-400 disabled:opacity-50"
            />
            {isLoading && (
              <div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
            )}
            <kbd className="hidden sm:inline-flex items-center px-2 py-1 text-xs text-slate-400 bg-slate-100 rounded">
              ESC
            </kbd>
          </div>

          {/* Results */}
          {searchEnabled && query && (
            <div ref={resultsRef} className="max-h-[60vh] overflow-y-auto">
              {results.length === 0 && !isLoading ? (
                <div className="px-4 py-8 text-center text-slate-500">
                  No results found for "{query}"
                </div>
              ) : (
                <div className="py-2">
                  {results.map((result, index) => (
                    <Link
                      key={result.id}
                      href={result.href}
                      onClick={onClose}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={cn(
                        'block px-4 py-3 transition-colors',
                        index === selectedIndex
                          ? 'bg-primary/5'
                          : 'hover:bg-slate-50'
                      )}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        {result.type === 'section' && (
                          <span className="text-xs text-primary font-medium">
                            {result.component}
                          </span>
                        )}
                        <span className="text-sm font-medium text-slate-900">
                          {result.title}
                        </span>
                      </div>
                      {result.pageTitle && result.type === 'section' && (
                        <div className="text-xs text-slate-500 mb-1">
                          in {result.pageTitle}
                        </div>
                      )}
                      {result.snippetHtml && (
                        <p
                          className="text-sm text-slate-600 line-clamp-2 [&>mark]:bg-yellow-200 [&>mark]:text-slate-900"
                          dangerouslySetInnerHTML={{ __html: result.snippetHtml }}
                        />
                      )}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Footer hint */}
          {searchEnabled && (
            <div className="flex items-center gap-4 px-4 py-2 border-t border-slate-200 text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-slate-100 rounded">↑</kbd>
                <kbd className="px-1.5 py-0.5 bg-slate-100 rounded">↓</kbd>
                to navigate
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-slate-100 rounded">↵</kbd>
                to select
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/**
 * SearchButton Component
 *
 * A button that opens the search modal.
 * Shows Cmd/Ctrl+K keyboard shortcut hint.
 */
export function SearchButton({ onClick, className }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex items-center gap-2 px-3 py-1.5 text-sm text-slate-500 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors',
        className
      )}
      aria-label="Search"
    >
      <SearchIcon className="w-4 h-4" />
      <span className="hidden sm:inline">Search</span>
      <kbd className="hidden md:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-xs text-slate-400 bg-white rounded border border-slate-200">
        <span className="text-xs">⌘</span>K
      </kbd>
    </button>
  )
}

/**
 * useSearchShortcut Hook
 *
 * Registers Cmd/Ctrl+K keyboard shortcut to open search.
 */
export function useSearchShortcut(onOpen) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        onOpen()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onOpen])
}

// Search icon
const SearchIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
)

export default SearchModal
