import React, { useState, useEffect, useRef } from 'react'
import { Link, cn, useScrolled, useMobileMenu, useWebsite, useActiveRoute, useRouting } from '@uniweb/kit'
import { useSearchShortcut, useSearchWithIntent } from '@uniweb/kit/search'
import { ChevronDown, Search, X } from 'lucide-react'

/**
 * Header Component
 *
 * A responsive navigation header with:
 * - Dropdown menus for nested pages
 * - Active state highlighting for current page and ancestors
 * - Language switcher for multilingual sites
 * - Search functionality (Cmd/Ctrl+K)
 */
export function Header({ content, params, block }) {
  const { website } = useWebsite()
  const { isActive, isActiveOrAncestor } = useActiveRoute()
  const { useLocation } = useRouting()
  const location = useLocation()

  // Kit hooks for common patterns
  const scrolled = useScrolled(20)
  const { isOpen: mobileMenuOpen, toggle: toggleMobileMenu, close: closeMobileMenu } = useMobileMenu()

  // Track which dropdown is open (for hover/click)
  const [openDropdown, setOpenDropdown] = useState(null)

  // Search state
  const [searchOpen, setSearchOpen] = useState(false)
  const { query, results, isLoading, clear, triggerPreload, intentProps } = useSearchWithIntent(website)
  const [searchQuery, setSearchQuery] = useState('')
  const searchInputRef = useRef(null)

  // Keyboard shortcut to open search (Cmd/Ctrl+K)
  useSearchShortcut({
    onOpen: () => setSearchOpen(true),
    onPreload: triggerPreload,
  })

  // Focus input when search modal opens, handle Escape key
  useEffect(() => {
    if (searchOpen) {
      if (searchInputRef.current) {
        searchInputRef.current.focus()
      }
      const handleEscape = (e) => {
        if (e.key === 'Escape') {
          closeSearch()
        }
      }
      window.addEventListener('keydown', handleEscape)
      return () => window.removeEventListener('keydown', handleEscape)
    }
  }, [searchOpen])

  // Handle search input changes
  const handleSearchChange = (e) => {
    const value = e.target.value
    setSearchQuery(value)
    query(value)
  }

  // Close search modal
  const closeSearch = () => {
    setSearchOpen(false)
    setSearchQuery('')
    clear()
  }

  // Check if search is enabled
  const searchEnabled = website.isSearchEnabled()

  // Get context from the next block
  const nextBlockInfo = block.getNextBlockInfo()
  const allowTranslucentTop = nextBlockInfo?.context?.allowTranslucentTop || false
  const nextBlockTheme = nextBlockInfo?.theme || 'light'
  const isFloating = allowTranslucentTop
  const isDarkBackground = isFloating && ['gradient', 'dark'].includes(nextBlockTheme)

  // Runtime guarantees: content is flat
  const { title, links } = content

  // Get navigation from website (includes nested children)
  const navPages = website.getPageHierarchy({ for: 'header' })
  const siteName = title || website.name || 'Site'

  // Locale info for language switcher
  const hasMultipleLocales = website.hasMultipleLocales()
  const locales = website.getLocales()
  const activeLocale = website.getActiveLocale()

  const getHeaderStyles = () => {
    if (isFloating) {
      return scrolled
        ? 'bg-white/95 backdrop-blur-lg shadow-sm text-gray-900'
        : isDarkBackground
          ? 'bg-transparent text-white'
          : 'bg-transparent text-gray-900'
    }
    return scrolled
      ? 'bg-white shadow-sm text-gray-900'
      : 'bg-white text-gray-900'
  }

  const getLinkStyles = (isActiveLink = false) => {
    if (isActiveLink) {
      if (isFloating && !scrolled && isDarkBackground) {
        return 'text-white font-semibold'
      }
      return 'text-primary font-semibold'
    }
    if (isFloating && !scrolled && isDarkBackground) {
      return 'text-white/90 hover:text-white'
    }
    return 'text-gray-600 hover:text-gray-900'
  }

  // Render a nav item (with or without dropdown)
  const NavItem = ({ page }) => {
    const hasChildren = page.children && page.children.length > 0
    const isPageActive = isActiveOrAncestor(page)
    const isDropdownOpen = openDropdown === page.route

    if (!hasChildren) {
      return (
        <Link
          href={page.navigableRoute}
          className={cn('text-sm font-medium transition-colors', getLinkStyles(isPageActive))}
        >
          {page.label || page.title}
        </Link>
      )
    }

    // Page with children - render dropdown
    return (
      <div
        className="relative"
        onMouseEnter={() => setOpenDropdown(page.route)}
        onMouseLeave={() => setOpenDropdown(null)}
      >
        <button
          className={cn(
            'flex items-center gap-1 text-sm font-medium transition-colors',
            getLinkStyles(isPageActive)
          )}
          onClick={() => setOpenDropdown(isDropdownOpen ? null : page.route)}
        >
          {page.label || page.title}
          <ChevronDown className={cn(
            'w-4 h-4 transition-transform',
            isDropdownOpen && 'rotate-180'
          )} />
        </button>

        {/* Dropdown menu */}
        {isDropdownOpen && (
          <div className="absolute top-full left-0 pt-2">
            <div className="bg-white rounded-lg shadow-lg border border-gray-100 py-2 min-w-[200px]">
              {/* Link to parent page */}
              <Link
                href={page.navigableRoute}
                className={cn(
                  'block px-4 py-2 text-sm transition-colors',
                  isActive(page)
                    ? 'text-primary font-semibold bg-primary/5'
                    : 'text-gray-700 hover:bg-gray-50'
                )}
              >
                All {page.label || page.title}
              </Link>
              <div className="border-t border-gray-100 my-1" />
              {/* Child pages */}
              {page.children.map((child) => (
                <Link
                  key={child.route}
                  href={child.navigableRoute}
                  className={cn(
                    'block px-4 py-2 text-sm transition-colors',
                    isActive(child)
                      ? 'text-primary font-semibold bg-primary/5'
                      : 'text-gray-700 hover:bg-gray-50'
                  )}
                >
                  {child.label || child.title}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  // Mobile nav item (expandable for children)
  const MobileNavItem = ({ page, depth = 0 }) => {
    const hasChildren = page.children && page.children.length > 0
    const isPageActive = isActiveOrAncestor(page)
    const [isExpanded, setIsExpanded] = useState(isPageActive && hasChildren)

    return (
      <div>
        <div className="flex items-center">
          <Link
            href={page.navigableRoute}
            className={cn(
              'flex-1 block px-3 py-2 text-base font-medium rounded-md',
              depth > 0 && 'pl-6 text-sm',
              isActive(page)
                ? 'text-primary bg-primary/5'
                : 'text-gray-700 hover:bg-gray-50'
            )}
            onClick={closeMobileMenu}
          >
            {page.label || page.title}
          </Link>
          {hasChildren && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 text-gray-500"
            >
              <ChevronDown className={cn(
                'w-4 h-4 transition-transform',
                isExpanded && 'rotate-180'
              )} />
            </button>
          )}
        </div>
        {hasChildren && isExpanded && (
          <div className="ml-2 border-l border-gray-200">
            {page.children.map((child) => (
              <MobileNavItem key={child.route} page={child} depth={depth + 1} />
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <>
      <header className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        getHeaderStyles()
      )}>
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo / Site Name */}
            <div className="flex-shrink-0">
              <Link href="/" className="text-xl font-bold">
                {siteName}
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex lg:items-center lg:gap-8">
              {navPages.map((page) => (
                <NavItem key={page.route} page={page} />
              ))}
            </div>

            {/* Search + Language Switcher + CTA */}
            <div className="hidden lg:flex lg:items-center lg:gap-4">
              {/* Search Button */}
              {searchEnabled && (
                <button
                  onClick={() => setSearchOpen(true)}
                  {...intentProps}
                  className={cn(
                    'p-2 rounded-lg transition-colors',
                    getLinkStyles()
                  )}
                  aria-label="Search (Cmd+K)"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
              {hasMultipleLocales && (
                <div className="flex items-center gap-1 text-sm">
                  {locales.map((locale, i) => (
                    <React.Fragment key={locale.code}>
                      {i > 0 && <span className={getLinkStyles()}>|</span>}
                      <Link
                        reload
                        href={website.getLocaleUrl(locale.code, location.pathname)}
                        className={cn(
                          'px-1 transition-colors',
                          locale.code === activeLocale
                            ? 'font-semibold'
                            : getLinkStyles()
                        )}
                      >
                        {locale.code.toUpperCase()}
                      </Link>
                    </React.Fragment>
                  ))}
                </div>
              )}
              {links[0] && (
                <Link
                  href={links[0].href}
                  className={cn(
                    'inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors',
                    isFloating && !scrolled && isDarkBackground
                      ? 'bg-white text-gray-900 hover:bg-gray-100'
                      : 'bg-primary text-white hover:bg-blue-700'
                  )}
                >
                  {links[0].label}
                </Link>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                type="button"
                onClick={toggleMobileMenu}
                className={cn('p-2 rounded-md', getLinkStyles())}
              >
                <span className="sr-only">Toggle menu</span>
                {mobileMenuOpen ? (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t">
            <div className="px-4 py-4 space-y-1">
              {navPages.map((page) => (
                <MobileNavItem key={page.route} page={page} />
              ))}
              {hasMultipleLocales && (
                <div className="flex items-center gap-2 px-3 py-2 border-t mt-2 pt-4">
                  <span className="text-sm text-gray-500">Language:</span>
                  {locales.map((locale) => (
                    <Link
                      key={locale.code}
                      reload
                      href={website.getLocaleUrl(locale.code, location.pathname)}
                      className={cn(
                        'px-2 py-1 text-sm rounded',
                        locale.code === activeLocale
                          ? 'bg-primary text-white'
                          : 'text-gray-600 hover:bg-gray-100'
                      )}
                    >
                      {locale.code.toUpperCase()}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {!isFloating && <div className="h-16 lg:h-20" />}

      {/* Search Modal */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm"
          onClick={closeSearch}
        >
          <div
            className="max-w-2xl mx-auto mt-20 px-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
              {/* Search Input */}
              <div className="flex items-center border-b border-gray-200 px-4">
                <Search className="w-5 h-5 text-gray-400" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Search..."
                  className="flex-1 px-3 py-4 text-lg outline-none"
                />
                <button
                  onClick={closeSearch}
                  className="p-1 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Search Results */}
              <div className="max-h-96 overflow-y-auto">
                {isLoading && (
                  <div className="p-4 text-center text-gray-500">
                    Searching...
                  </div>
                )}

                {!isLoading && searchQuery && results.length === 0 && (
                  <div className="p-4 text-center text-gray-500">
                    No results found.
                  </div>
                )}

                {!isLoading && results.length > 0 && (
                  <ul className="py-2">
                    {results.map((result, i) => (
                      <li key={result.id || i}>
                        <Link
                          href={result.route || result.href}
                          onClick={closeSearch}
                          className="block px-4 py-3 hover:bg-gray-50 transition-colors"
                        >
                          <div className="font-medium text-gray-900">
                            {result.title}
                          </div>
                          {result.snippetHtml ? (
                            <div
                              className="text-sm text-gray-500 mt-1 line-clamp-2"
                              dangerouslySetInnerHTML={{ __html: result.snippetHtml }}
                            />
                          ) : result.description ? (
                            <div className="text-sm text-gray-500 mt-1 line-clamp-2">
                              {result.description}
                            </div>
                          ) : null}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}

                {!isLoading && !searchQuery && (
                  <div className="p-4 text-center text-gray-400 text-sm">
                    Type to search...
                  </div>
                )}
              </div>

              {/* Keyboard hint */}
              <div className="px-4 py-2 border-t border-gray-100 text-xs text-gray-400 flex items-center justify-end gap-2">
                <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-gray-500">Esc</kbd>
                <span>to close</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Header
