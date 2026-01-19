import React, { useState, useEffect } from 'react'
import { Link, cn } from '@uniweb/kit'

/**
 * Header Component for Documentation Sites
 *
 * A responsive navigation header with navigation levels support.
 * When `site_navigation` is enabled, shows root-level pages as tabs
 * and coordinates with LeftPanel to filter navigation.
 *
 * Features:
 * - Sticky header with scroll effects
 * - Optional site navigation tabs (root-level pages)
 * - Responsive mobile menu
 * - Search toggle
 */
export function Header({ content, params, block, website }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Get params with defaults
  const {
    sticky = true,
    site_navigation = false,
    transparency = true,
  } = params || {}

  // Get logo from content
  const logo = content.main?.body?.imgs?.[0]
  const siteName = content.main?.header?.title || website?.name || 'Docs'
  const ctaLink = content.main?.body?.links?.[0]

  // Get page hierarchy for site navigation
  const pages = website?.getPageHierarchy?.({ for: 'header' }) || []
  const activePage = website?.activePage
  const activeRoute = activePage?.route || ''
  const firstSegment = activeRoute.split('/')[0]

  // Handle scroll for sticky behavior
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [activeRoute])

  // Find the first navigable route for a page (in case it's a category without content)
  const findNavigableRoute = (page) => {
    if (page.hasContent) return page.route
    for (const child of page.children || []) {
      const route = findNavigableRoute(child)
      if (route) return route
    }
    return page.route
  }

  // Determine if a root page is active
  const isRootActive = (page) => {
    return firstSegment === page.route || activeRoute.startsWith(page.route + '/')
  }

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

            {/* Desktop Navigation (when site_navigation is disabled) */}
            {!site_navigation && pages.length > 0 && (
              <nav className="hidden lg:flex lg:items-center lg:gap-6">
                {pages.map((page) => (
                  <Link
                    key={page.route}
                    href={findNavigableRoute(page)}
                    className={cn(
                      'text-sm font-medium transition-colors',
                      isRootActive(page)
                        ? 'text-primary'
                        : 'text-gray-600 hover:text-gray-900'
                    )}
                  >
                    {page.label || page.title}
                  </Link>
                ))}
              </nav>
            )}

            {/* Right side: CTA and mobile toggle */}
            <div className="flex items-center gap-4">
              {ctaLink && (
                <Link
                  href={ctaLink.href}
                  className="hidden sm:inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-dark transition-colors"
                >
                  {ctaLink.label}
                </Link>
              )}

              {/* Mobile menu button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                aria-expanded={mobileMenuOpen}
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

          {/* Site Navigation Tabs (when enabled) */}
          {site_navigation && pages.length > 0 && (
            <div className="hidden lg:flex items-center gap-1 -mb-px overflow-x-auto">
              {pages.map((page) => (
                <Link
                  key={page.route}
                  href={findNavigableRoute(page)}
                  className={cn(
                    'px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap',
                    isRootActive(page)
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
              {pages.map((page) => (
                <Link
                  key={page.route}
                  href={findNavigableRoute(page)}
                  className={cn(
                    'block px-3 py-2 text-base font-medium rounded-md',
                    isRootActive(page)
                      ? 'text-primary bg-primary/5'
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {page.label || page.title}
                </Link>
              ))}
              {ctaLink && (
                <Link
                  href={ctaLink.href}
                  className="block px-3 py-2 text-base font-medium text-white bg-primary hover:bg-primary-dark rounded-md text-center mt-4"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {ctaLink.label}
                </Link>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Spacer for fixed header */}
      <div className={site_navigation ? 'h-24' : 'h-16'} />
    </>
  )
}

// Static block configuration
Header.block = {
  context: {
    siteNavigation: false, // Will be set based on params
  },
}

export default Header
