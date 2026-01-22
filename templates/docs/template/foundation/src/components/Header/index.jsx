import React from 'react'
import { Link, cn, useActiveRoute, useScrolled, useMobileMenu, useWebsite } from '@uniweb/kit'

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
export function Header({ content, params, block }) {
  const { website } = useWebsite()
  // Kit hooks for common patterns
  const scrolled = useScrolled(0)
  const { isOpen: mobileMenuOpen, toggle: toggleMobileMenu, close: closeMobileMenu } = useMobileMenu()
  const { isActiveOrAncestor } = useActiveRoute()

  // Runtime guarantees: content.main.header/body exist, params have defaults from meta.js
  const { sticky, site_navigation, transparency } = params
  const { title } = content.main.header
  const { imgs, links } = content.main.body

  // Get logo and CTA from content
  const logo = imgs[0]
  const siteName = title || website.name || 'Docs'
  const ctaLink = links[0]

  // Get page hierarchy for site navigation
  const pages = website.getPageHierarchy({ for: 'header' })

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
                onClick={toggleMobileMenu}
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
              {ctaLink && (
                <Link
                  href={ctaLink.href}
                  className="block px-3 py-2 text-base font-medium text-white bg-primary hover:bg-primary-dark rounded-md text-center mt-4"
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
