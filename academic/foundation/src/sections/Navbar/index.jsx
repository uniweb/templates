import React, { useState, useEffect, useCallback } from 'react'
import { Link, useWebsite, cn, getLocaleLabel } from '@uniweb/kit'
import { SearchModal, SearchButton } from '../SearchModal'
import { useSearchShortcut, useSearchWithIntent } from '@uniweb/kit/search'

/**
 * Navbar Component
 *
 * A responsive navigation header for academic sites.
 * Supports both auto mode (builds navigation from site pages) and manual mode (uses provided content).
 *
 * Features:
 * - Auto/manual navigation modes
 * - Locale switcher (appears automatically if multiple locales)
 * - Mobile-responsive with hamburger menu
 * - Sticky positioning option
 * - Integrated search (when fuse.js is installed)
 */
function Navbar({ content, params }) {
  const { website, localize } = useWebsite()

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [localeMenuOpen, setLocaleMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  // Runtime guarantees: content fields exist, params have defaults from meta.js
  const { title, links, imgs } = content
  const { mode, sticky, showLocale, showSearch, logoPosition } = params

  // Determine if search should be shown
  const searchEnabled = website.isSearchEnabled()
  const shouldShowSearch = showSearch === 'always' || (showSearch === 'auto' && searchEnabled)

  // Intent-based search preloading (only loads index on hover/focus/shortcut)
  const { triggerPreload, client: searchClient } = useSearchWithIntent(website)

  // Search keyboard shortcut (Cmd/Ctrl+K) - triggers preload immediately
  useSearchShortcut({
    onOpen: () => setSearchOpen(true),
    onPreload: triggerPreload,
  })

  // Get navigation items based on mode
  const navItems = mode === 'auto'
    ? website.getHeaderPages()
    : links.map(link => ({
        route: link.url,
        label: link.text,
        title: link.text
      }))

  // Site branding
  const siteName = title || website.name || ''
  const logo = imgs[0]

  // Locale handling
  const locales = website.getLocales()
  const activeLocale = website.getActiveLocale()
  const hasMultipleLocales = website.hasMultipleLocales()
  const shouldShowLocale = showLocale === 'always' || (showLocale === 'auto' && hasMultipleLocales)

  // Get current route for active state
  const currentRoute = website.activePage?.route || '/'

  const isActive = (route) => {
    if (route === '' || route === '/') {
      return currentRoute === '/' || currentRoute === ''
    }
    return currentRoute.startsWith(route)
  }

  const NavLinks = ({ className, itemClassName, onClick }) => (
    <nav className={className}>
      {navItems.map((item, i) => (
        <Link
          key={i}
          href={item.route || '/'}
          onClick={onClick}
          className={cn(
            itemClassName,
            isActive(item.route)
              ? 'text-primary font-semibold'
              : 'text-slate-600 hover:text-primary'
          )}
        >
          {item.label || item.title}
        </Link>
      ))}
    </nav>
  )

  const LocaleSwitcher = () => {
    if (!shouldShowLocale || locales.length < 2) return null

    const currentLocale = locales.find(l => l.code === activeLocale)

    return (
      <div className="relative">
        <button
          onClick={() => setLocaleMenuOpen(!localeMenuOpen)}
          className="flex items-center gap-1 px-3 py-1.5 text-sm text-slate-600 hover:text-primary rounded-md hover:bg-slate-100 transition-colors"
          aria-label="Change language"
        >
          <GlobeIcon className="w-4 h-4" />
          <span className="hidden sm:inline">{getLocaleLabel(currentLocale || activeLocale)}</span>
          <ChevronIcon className={cn('w-3 h-3 transition-transform', localeMenuOpen && 'rotate-180')} />
        </button>

        {localeMenuOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setLocaleMenuOpen(false)}
            />
            <div className="absolute right-0 top-full mt-1 z-50 bg-white rounded-lg shadow-lg border border-slate-200 py-1 min-w-[140px]">
              {locales.map(locale => (
                <a
                  key={locale.code}
                  href={website.getLocaleUrl(locale.code)}
                  className={cn(
                    'block px-4 py-2 text-sm transition-colors',
                    locale.code === activeLocale
                      ? 'bg-primary/5 text-primary font-medium'
                      : 'text-slate-700 hover:bg-slate-50'
                  )}
                  onClick={() => setLocaleMenuOpen(false)}
                >
                  {getLocaleLabel(locale)}
                </a>
              ))}
            </div>
          </>
        )}
      </div>
    )
  }

  return (
    <header
      className={cn(
        'bg-white border-b border-slate-200 z-50',
        sticky && 'sticky top-0'
      )}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Site Name */}
          <Link
            href="/"
            className={cn(
              'flex items-center gap-3 font-semibold text-lg text-slate-900 hover:text-primary transition-colors',
              logoPosition === 'center' && 'md:absolute md:left-1/2 md:-translate-x-1/2'
            )}
          >
            {logo && (
              <img
                src={logo.url || logo.src}
                alt={siteName}
                className="h-8 w-auto"
              />
            )}
            {siteName && <span>{siteName}</span>}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <NavLinks
              className="flex items-center gap-6"
              itemClassName="text-sm font-medium transition-colors"
            />
            {shouldShowSearch && (
              <SearchButton
                onClick={() => setSearchOpen(true)}
                onMouseEnter={triggerPreload}
                onFocus={triggerPreload}
              />
            )}
            <LocaleSwitcher />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            {shouldShowSearch && (
              <button
                onClick={() => setSearchOpen(true)}
                onMouseEnter={triggerPreload}
                onFocus={triggerPreload}
                className="p-2 text-slate-600 hover:text-primary rounded-md hover:bg-slate-100"
                aria-label="Search"
              >
                <SearchIcon className="w-5 h-5" />
              </button>
            )}
            <LocaleSwitcher />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-primary rounded-md hover:bg-slate-100"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <CloseIcon className="w-6 h-6" />
              ) : (
                <MenuIcon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 py-4">
            <NavLinks
              className="flex flex-col gap-1"
              itemClassName="px-3 py-2 text-base font-medium rounded-md hover:bg-slate-50"
              onClick={() => setMobileMenuOpen(false)}
            />
          </div>
        )}
      </div>

      {/* Search Modal */}
      {shouldShowSearch && (
        <SearchModal
          isOpen={searchOpen}
          onClose={() => setSearchOpen(false)}
          searchClient={searchClient}
        />
      )}
    </header>
  )
}

// Simple SVG icons
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

const SearchIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
)

export default Navbar
