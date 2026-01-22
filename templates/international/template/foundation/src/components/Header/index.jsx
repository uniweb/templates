import React from 'react'
import { Link, cn, useScrolled, useMobileMenu, useWebsite } from '@uniweb/kit'

/**
 * Header Component
 *
 * A responsive navigation header with language switcher for multilingual sites.
 */
export function Header({ content, params, block }) {
  const { website } = useWebsite()

  // Kit hooks for common patterns
  const scrolled = useScrolled(20)
  const { isOpen: mobileMenuOpen, toggle: toggleMobileMenu, close: closeMobileMenu } = useMobileMenu()

  // Get context from the next block
  const nextBlockInfo = block.getNextBlockInfo()
  const allowTranslucentTop = nextBlockInfo?.context?.allowTranslucentTop || false
  const nextBlockTheme = nextBlockInfo?.theme || 'light'
  const isFloating = allowTranslucentTop
  const isDarkBackground = isFloating && ['gradient', 'dark'].includes(nextBlockTheme)

  // Runtime guarantees: content.main.header/body exist
  const { title } = content.main.header
  const { links } = content.main.body

  // Get navigation from website
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

  const getLinkStyles = () => {
    if (isFloating && !scrolled && isDarkBackground) {
      return 'text-white/90 hover:text-white'
    }
    return 'text-gray-600 hover:text-gray-900'
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
                <Link
                  key={page.route}
                  href={page.navigableRoute}
                  className={cn('text-sm font-medium transition-colors', getLinkStyles())}
                >
                  {page.label || page.title}
                </Link>
              ))}
            </div>

            {/* Language Switcher + CTA */}
            <div className="hidden lg:flex lg:items-center lg:gap-4">
              {hasMultipleLocales && (
                <div className="flex items-center gap-1 text-sm">
                  {locales.map((locale, i) => (
                    <React.Fragment key={locale.code}>
                      {i > 0 && <span className={getLinkStyles()}>|</span>}
                      <a
                        href={website.getLocaleUrl(locale.code)}
                        className={cn(
                          'px-1 transition-colors',
                          locale.code === activeLocale
                            ? 'font-semibold'
                            : getLinkStyles()
                        )}
                      >
                        {locale.code.toUpperCase()}
                      </a>
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
            <div className="px-4 py-4 space-y-2">
              {navPages.map((page) => (
                <Link
                  key={page.route}
                  href={page.navigableRoute}
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-md"
                  onClick={closeMobileMenu}
                >
                  {page.label || page.title}
                </Link>
              ))}
              {hasMultipleLocales && (
                <div className="flex items-center gap-2 px-3 py-2 border-t mt-2 pt-4">
                  <span className="text-sm text-gray-500">Language:</span>
                  {locales.map((locale) => (
                    <a
                      key={locale.code}
                      href={website.getLocaleUrl(locale.code)}
                      className={cn(
                        'px-2 py-1 text-sm rounded',
                        locale.code === activeLocale
                          ? 'bg-primary text-white'
                          : 'text-gray-600 hover:bg-gray-100'
                      )}
                    >
                      {locale.code.toUpperCase()}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {!isFloating && <div className="h-16 lg:h-20" />}
    </>
  )
}

export default Header
