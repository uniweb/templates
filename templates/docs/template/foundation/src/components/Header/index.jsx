import React, { useState } from 'react'
import { Link, cn, useActiveRoute, useScrolled, useMobileMenu, useWebsite } from '@uniweb/kit'
import { useSearchShortcut, useSearchWithIntent } from '@uniweb/kit/search'
import { SearchModal, SearchButton } from '../SearchModal'

/**
 * Header Component for Documentation Sites
 *
 * A responsive navigation header with optional category tabs.
 * When `categories` is enabled, shows top-level pages as tabs
 * and coordinates with LeftPanel to show category-specific navigation.
 *
 * Features:
 * - Sticky header with scroll effects
 * - Optional category tabs (top-level pages as chapters)
 * - Integrated search with Cmd/Ctrl+K shortcut
 * - Locale switcher (appears when multiple locales available)
 * - Responsive mobile menu
 */
export function Header({ content, params, block }) {
  const { website } = useWebsite()

  // Kit hooks for common patterns
  const scrolled = useScrolled(0)
  const { isOpen: mobileMenuOpen, toggle: toggleMobileMenu, close: closeMobileMenu } = useMobileMenu()
  const { isActiveOrAncestor } = useActiveRoute()

  // Local state
  const [searchOpen, setSearchOpen] = useState(false)
  const [localeMenuOpen, setLocaleMenuOpen] = useState(false)

  // Runtime guarantees: content fields exist, params have defaults from meta.js
  const { sticky, categories, transparency, showSearch, showLocale } = params
  const { title, imgs, links } = content

  // Get logo and CTA from content
  const logo = imgs[0]
  const siteName = title || website.name || 'Docs'
  const ctaLink = links[0]

  // Get page hierarchy for navigation
  const pages = website.getPageHierarchy({ for: 'header' })

  // Search configuration
  const searchEnabled = website.isSearchEnabled()
  const shouldShowSearch = showSearch === 'always' || (showSearch === 'auto' && searchEnabled)

  // Intent-based search preloading
  const { triggerPreload, client: searchClient } = useSearchWithIntent(website)

  // Search keyboard shortcut (Cmd/Ctrl+K)
  useSearchShortcut({
    onOpen: () => setSearchOpen(true),
    onPreload: triggerPreload,
  })

  // Locale configuration
  const locales = website.getLocales()
  const activeLocale = website.getActiveLocale()
  const hasMultipleLocales = website.hasMultipleLocales()
  const shouldShowLocale = showLocale === 'always' || (showLocale === 'auto' && hasMultipleLocales)

  // Header styles based on scroll state
  const getHeaderStyles = () => {
    const base = 'transition-all duration-300'
    if (scrolled) {
      if (transparency) {
        return cn(base, 'bg-white/95 backdrop-blur-lg shadow-sm')
      }
      return cn(base, 'bg-white shadow-sm')
    }
    return cn(base, 'bg-white border-b border-gray-200')
  }

  // Locale Switcher Component
  const LocaleSwitcher = () => {
    if (!shouldShowLocale || locales.length < 2) return null

    const currentLocale = locales.find(l => l.code === activeLocale)

    return (
      <div className="relative">
        <button
          onClick={() => setLocaleMenuOpen(!localeMenuOpen)}
          className="flex items-center gap-1.5 px-2 py-1.5 text-sm text-gray-600 hover:text-gray-900 rounded-md hover:bg-gray-100 transition-colors"
          aria-label="Change language"
        >
          <GlobeIcon className="w-4 h-4" />
          <span className="hidden sm:inline">{currentLocale?.label || activeLocale}</span>
          <ChevronIcon className={cn('w-3 h-3 transition-transform', localeMenuOpen && 'rotate-180')} />
        </button>

        {localeMenuOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setLocaleMenuOpen(false)}
            />
            <div className="absolute right-0 top-full mt-1 z-50 bg-white rounded-lg shadow-lg border border-gray-200 py-1 min-w-[140px]">
              {locales.map(locale => (
                <a
                  key={locale.code}
                  href={website.getLocaleUrl(locale.code)}
                  className={cn(
                    'block px-4 py-2 text-sm transition-colors',
                    locale.code === activeLocale
                      ? 'bg-primary/5 text-primary font-medium'
                      : 'text-gray-700 hover:bg-gray-50'
                  )}
                  onClick={() => setLocaleMenuOpen(false)}
                >
                  {locale.label}
                </a>
              ))}
            </div>
          </>
        )}
      </div>
    )
  }

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50',
          getHeaderStyles()
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main header row */}
          <div className="flex items-center justify-between h-16">
            {/* Logo / Site Name */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center gap-2">
                {logo ? (
                  <img
                    src={logo.url || logo.src}
                    alt={logo.alt || siteName}
                    className="h-8 w-auto"
                  />
                ) : (
                  <span className="text-xl font-bold text-gray-900">{siteName}</span>
                )}
              </Link>
            </div>

            {/* Desktop Navigation (when categories is disabled) */}
            {!categories && pages.length > 0 && (
              <nav className="hidden lg:flex lg:items-center lg:gap-6">
                {pages.map((page) => (
                  <Link
                    key={page.route}
                    href={page.navigableRoute}
                    className={cn(
                      'text-sm font-medium transition-colors',
                      isActiveOrAncestor(page)
                        ? 'text-primary'
                        : 'text-gray-600 hover:text-gray-900'
                    )}
                  >
                    {page.label || page.title}
                  </Link>
                ))}
              </nav>
            )}

            {/* Right side controls */}
            <div className="flex items-center gap-2">
              {/* Search button */}
              {shouldShowSearch && (
                <SearchButton
                  onClick={() => setSearchOpen(true)}
                  onMouseEnter={triggerPreload}
                  onFocus={triggerPreload}
                  compact={categories}
                />
              )}

              {/* Locale switcher */}
              <LocaleSwitcher />

              {/* CTA button */}
              {ctaLink && (
                <Link
                  href={ctaLink.href}
                  className="hidden sm:inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors"
                >
                  {ctaLink.label}
                </Link>
              )}

              {/* Mobile menu button */}
              <button
                type="button"
                onClick={toggleMobileMenu}
                className="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                aria-expanded={mobileMenuOpen}
              >
                <span className="sr-only">Toggle menu</span>
                {mobileMenuOpen ? (
                  <CloseIcon className="h-6 w-6" />
                ) : (
                  <MenuIcon className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Category Tabs (when enabled) */}
          {categories && pages.length > 0 && (
            <div className="hidden lg:flex items-center gap-1 -mb-px overflow-x-auto">
              {pages.map((page) => (
                <Link
                  key={page.route}
                  href={page.navigableRoute}
                  className={cn(
                    'px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap',
                    isActiveOrAncestor(page)
                      ? 'border-primary text-primary'
                      : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                  )}
                >
                  {page.label || page.title}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200">
            <div className="px-4 py-4 space-y-2">
              {/* Mobile search */}
              {shouldShowSearch && (
                <button
                  onClick={() => {
                    closeMobileMenu()
                    setSearchOpen(true)
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 text-base text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                >
                  <SearchIcon className="w-5 h-5" />
                  Search
                </button>
              )}

              {/* Mobile nav links */}
              {pages.map((page) => (
                <Link
                  key={page.route}
                  href={page.navigableRoute}
                  className={cn(
                    'block px-3 py-2 text-base font-medium rounded-md',
                    isActiveOrAncestor(page)
                      ? 'text-primary bg-primary/5'
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                  )}
                  onClick={closeMobileMenu}
                >
                  {page.label || page.title}
                </Link>
              ))}

              {/* Mobile locale switcher */}
              {shouldShowLocale && locales.length > 1 && (
                <div className="pt-2 mt-2 border-t border-gray-200">
                  <div className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Language
                  </div>
                  {locales.map(locale => (
                    <a
                      key={locale.code}
                      href={website.getLocaleUrl(locale.code)}
                      className={cn(
                        'block px-3 py-2 text-base rounded-md',
                        locale.code === activeLocale
                          ? 'text-primary font-medium bg-primary/5'
                          : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                      )}
                      onClick={closeMobileMenu}
                    >
                      {locale.label}
                    </a>
                  ))}
                </div>
              )}

              {/* Mobile CTA */}
              {ctaLink && (
                <Link
                  href={ctaLink.href}
                  className="block px-3 py-2 text-base font-medium text-white bg-primary hover:bg-primary/90 rounded-md text-center mt-4"
                  onClick={closeMobileMenu}
                >
                  {ctaLink.label}
                </Link>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Spacer for fixed header */}
      <div className={categories ? 'h-[104px]' : 'h-16'} />

      {/* Search Modal */}
      {shouldShowSearch && (
        <SearchModal
          isOpen={searchOpen}
          onClose={() => setSearchOpen(false)}
          searchClient={searchClient}
        />
      )}
    </>
  )
}

// Icons
const MenuIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
)

const CloseIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
)

const SearchIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
)

const GlobeIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
  </svg>
)

const ChevronIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
)

export default Header
