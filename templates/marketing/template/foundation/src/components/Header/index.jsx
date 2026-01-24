import React, { useRef } from 'react'
import { Link, cn, useScrolled, useMobileMenu, useWebsite, useActiveRoute } from '@uniweb/kit'

/**
 * Header Component
 *
 * A responsive navigation header that intelligently adapts to the first
 * content section on each page. Uses cross-block communication to read
 * the next block's context and determine styling.
 *
 * Features:
 * - Automatic navigation from page hierarchy
 * - Translucent/floating mode when next block supports it
 * - Responsive mobile menu
 * - Theme-aware (adapts to next section's theme)
 */
export function Header({ content, params, block }) {
  const { website } = useWebsite()
  const headerRef = useRef(null)

  // Kit hooks for common patterns
  const scrolled = useScrolled(20)
  const { isOpen: mobileMenuOpen, toggle: toggleMobileMenu, close: closeMobileMenu } = useMobileMenu()
  const { isActiveOrAncestor } = useActiveRoute()

  // Get context from the next block (first body section)
  const nextBlockInfo = block.getNextBlockInfo()
  const allowTranslucentTop = nextBlockInfo?.context?.allowTranslucentTop || false
  const nextBlockTheme = nextBlockInfo?.theme || 'light'

  // Determine if we should use translucent/floating style
  const isFloating = allowTranslucentTop

  // Determine text color based on next block's theme (when floating)
  const isDarkBackground = isFloating && ['gradient', 'glass', 'dark'].includes(nextBlockTheme)

  // Runtime guarantees: content fields exist
  const { title, imgs, links } = content

  // Get navigation links from website page hierarchy
  const navPages = website.getPageHierarchy({ for: 'header' })

  // Get logo from content (if provided in markdown)
  const logo = imgs[0]
  const siteName = title || website.name || 'Site'

  // Style configurations
  const getHeaderStyles = () => {
    if (isFloating) {
      // Floating/translucent mode
      if (scrolled) {
        return 'bg-white/95 backdrop-blur-lg shadow-sm text-gray-900'
      }
      return isDarkBackground
        ? 'bg-transparent text-white'
        : 'bg-transparent text-gray-900'
    }
    // Standard mode
    return scrolled
      ? 'bg-white shadow-sm text-gray-900'
      : 'bg-white text-gray-900'
  }

  const getLinkStyles = (page) => {
    const isActive = page ? isActiveOrAncestor(page) : false
    if (isFloating && !scrolled && isDarkBackground) {
      return isActive ? 'text-white font-semibold' : 'text-white/90 hover:text-white'
    }
    return isActive ? 'text-primary font-semibold' : 'text-gray-600 hover:text-gray-900'
  }

  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          getHeaderStyles()
        )}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo / Site Name */}
            <div className="shrink-0">
              <Link href="/" className="flex items-center gap-2">
                {logo ? (
                  <img
                    src={logo.url || logo.src}
                    alt={logo.alt || siteName}
                    className="h-8 w-auto"
                  />
                ) : (
                  <>
                    {/* Default logo mark */}
                    <svg
                      className="h-8 w-8"
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="32" height="32" rx="8" className="fill-primary" />
                      <path
                        d="M8 12L16 8L24 12V20L16 24L8 20V12Z"
                        className="stroke-white"
                        strokeWidth="2"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M16 8V24M8 12L24 20M24 12L8 20"
                        className="stroke-white/60"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                    <span className="text-xl font-bold">{siteName}</span>
                  </>
                )}
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex lg:items-center lg:gap-8">
              {navPages.map((page) => (
                <Link
                  key={page.route}
                  href={page.navigableRoute}
                  className={cn(
                    'text-sm font-medium transition-colors',
                    getLinkStyles(page)
                  )}
                >
                  {page.label || page.title}
                </Link>
              ))}
            </div>

            {/* Desktop CTAs (login/signup if provided in content) */}
            {links.length > 0 && (
              <div className="hidden lg:flex lg:items-center lg:gap-4">
                {/* First link as text link (e.g., "Log in") */}
                {links[0] && (
                  <Link
                    href={links[0].href}
                    className={cn(
                      'text-sm font-medium transition-colors',
                      getLinkStyles(null)
                    )}
                  >
                    {links[0].label}
                  </Link>
                )}
                {/* Second link as primary button (e.g., "Sign up") */}
                {links[1] && (
                  <Link
                    href={links[1].href}
                    className={cn(
                      'inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors',
                      isFloating && !scrolled && isDarkBackground
                        ? 'bg-white text-gray-900 hover:bg-gray-100'
                        : 'bg-primary text-white hover:bg-blue-700'
                    )}
                  >
                    {links[1].label}
                  </Link>
                )}
              </div>
            )}

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                type="button"
                onClick={toggleMobileMenu}
                className={cn(
                  'inline-flex items-center justify-center p-2 rounded-md transition-colors',
                  getLinkStyles(null)
                )}
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
        </nav>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t">
            <div className="px-4 py-4 space-y-2">
              {navPages.map((page) => (
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
              {links.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
                  {links[0] && (
                    <Link
                      href={links[0].href}
                      className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md text-center"
                      onClick={closeMobileMenu}
                    >
                      {links[0].label}
                    </Link>
                  )}
                  {links[1] && (
                    <Link
                      href={links[1].href}
                      className="block px-3 py-2 text-base font-medium text-white bg-primary hover:bg-blue-700 rounded-md text-center"
                      onClick={closeMobileMenu}
                    >
                      {links[1].label}
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Spacer for non-floating headers */}
      {!isFloating && <div className="h-16 lg:h-20" />}
    </>
  )
}

export default Header
