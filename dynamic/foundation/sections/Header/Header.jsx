import React from 'react'
import { Icon, Link, cn, useScrolled, useMobileMenu, useWebsite, useActiveRoute } from '@uniweb/kit'
import { Leaf } from 'lucide-react'

function Header({ content, params, block }) {
  const { website } = useWebsite()
  const { isActive, isActiveOrAncestor } = useActiveRoute()
  const scrolled = useScrolled(20)
  const { isOpen: mobileMenuOpen, toggle: toggleMobileMenu, close: closeMobileMenu } = useMobileMenu()

  const { title, links } = content
  const siteName = title || website.name || 'PandaWatch'

  // Prefer manual nav from content data, fall back to automatic page hierarchy
  const manualNav = content.data?.nav
  const autoPages = website.getPageHierarchy({ for: 'header' })

  const isFloating = params.floating
  const nextBlockTheme = isFloating ? (block.getNextBlockInfo()?.theme || 'light') : 'light'
  const isDarkBackground = isFloating && ['dark'].includes(nextBlockTheme)

  const getHeaderStyles = () => {
    if (isFloating) {
      return scrolled
        ? 'bg-section/95 backdrop-blur-lg shadow-sm text-heading'
        : isDarkBackground
          ? 'bg-transparent text-white'
          : 'bg-transparent text-heading'
    }
    return scrolled
      ? 'bg-section shadow-sm border-b border-border text-heading'
      : 'bg-section border-b border-border text-heading'
  }

  const getLinkStyles = (isActiveLink = false) => {
    if (isActiveLink) {
      if (isFloating && !scrolled && isDarkBackground) return 'bg-white/10 text-white font-medium'
      return 'bg-primary-50 text-primary-700 font-medium'
    }
    if (isFloating && !scrolled && isDarkBackground) return 'text-white/90 hover:text-white hover:bg-white/5'
    return 'text-subtle hover:text-primary-600 hover:bg-card'
  }

  // Render a nav item (works for both manual and auto nav)
  const renderNavItem = (item, index) => {
    const href = item.href || item.navigableRoute
    const label = item.label || item.title
    const active = item.route
      ? isActiveOrAncestor(item)
      : item.href === '/'
        ? isActive(item.href)
        : isActiveOrAncestor(item.href)

    return (
      <Link
        key={item.route || item.href || index}
        href={href}
        className={cn(
          'inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
          getLinkStyles(active)
        )}
      >
        {item.icon && <Icon icon={item.icon} size="16" className="opacity-80" />}
        {label}
      </Link>
    )
  }

  const navItems = manualNav || autoPages

  return (
    <>
      <div className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        getHeaderStyles()
      )}>
        <nav className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center shadow-lg shadow-primary-200">
                <Leaf className="text-white w-5 h-5" />
              </div>
              <span className="font-bold text-xl tracking-tight">{siteName}</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-2">
              {navItems.map((item, i) => renderNavItem(item, i))}
            </div>

            {/* CTA */}
            <div className="hidden md:flex items-center gap-4">
              {links[0] && (
                <Link
                  href={links[0].href}
                  className={cn(
                    'inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors',
                    isFloating && !scrolled && isDarkBackground
                      ? 'bg-white text-neutral-900 hover:bg-neutral-100'
                      : 'bg-primary text-primary-foreground hover:bg-primary-hover'
                  )}
                >
                  {links[0].label}
                </Link>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
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
          <div className="md:hidden bg-section border-t border-border">
            <div className="px-4 py-4 space-y-1">
              {navItems.map((item, i) => {
                const href = item.href || item.navigableRoute
                const label = item.label || item.title
                const active = item.route
                  ? isActive(item)
                  : item.href === '/'
                    ? isActive(item.href)
                    : isActiveOrAncestor(item.href)

                return (
                  <Link
                    key={item.route || item.href || i}
                    href={href}
                    className={cn(
                      'flex items-center gap-2 px-3 py-2 text-base font-medium rounded-md',
                      active
                        ? 'text-primary-600 bg-primary-50'
                        : 'text-subtle hover:text-heading hover:bg-card'
                    )}
                    onClick={closeMobileMenu}
                  >
                    {item.icon && <Icon icon={item.icon} size="18" className="opacity-70" />}
                    {label}
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </div>

      {!isFloating && <div className="h-16" />}
    </>
  )
}

Header.as = 'nav'

export default Header
