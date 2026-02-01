import React from 'react'
import { Icon, Link, cn, useScrolled, useMobileMenu, useWebsite, useActiveRoute } from '@uniweb/kit'
import { Leaf } from 'lucide-react'

function parseIconRef(ref) {
  if (!ref) return null
  const [library, name] = ref.includes(':') ? ref.split(':', 2) : [null, ref]
  return library && name ? { library, name } : null
}

export function Header({ content, params, block }) {
  const { website } = useWebsite()
  const { isActive, isActiveOrAncestor } = useActiveRoute()
  const scrolled = useScrolled(20)
  const { isOpen: mobileMenuOpen, toggle: toggleMobileMenu, close: closeMobileMenu } = useMobileMenu()

  const { title, links } = content
  const siteName = title || website.name || 'PandaWatch'

  // Prefer manual nav from content data, fall back to automatic page hierarchy
  const manualNav = content.data?.nav
  const autoPages = website.getPageHierarchy({ for: 'header' })

  const nextBlockInfo = block.getNextBlockInfo()
  const allowTranslucentTop = nextBlockInfo?.context?.allowTranslucentTop || false
  const nextBlockTheme = nextBlockInfo?.theme || 'light'
  const isFloating = allowTranslucentTop
  const isDarkBackground = isFloating && ['gradient', 'dark'].includes(nextBlockTheme)

  const getHeaderStyles = () => {
    if (isFloating) {
      return scrolled
        ? 'bg-white/95 backdrop-blur-lg shadow-sm text-gray-900'
        : isDarkBackground
          ? 'bg-transparent text-white'
          : 'bg-transparent text-gray-900'
    }
    return scrolled
      ? 'bg-white shadow-sm border-b border-edge-muted text-gray-900'
      : 'bg-white border-b border-edge-muted text-gray-900'
  }

  const getLinkStyles = (isActiveLink = false) => {
    if (isActiveLink) {
      if (isFloating && !scrolled && isDarkBackground) return 'text-white font-semibold'
      return 'text-primary-600 font-semibold'
    }
    if (isFloating && !scrolled && isDarkBackground) return 'text-white/90 hover:text-white'
    return 'text-muted hover:text-body'
  }

  // Render a nav item (works for both manual and auto nav)
  const renderNavItem = (item, index) => {
    const href = item.href || item.navigableRoute
    const label = item.label || item.title
    const icon = parseIconRef(item.icon)
    const active = item.route
      ? isActiveOrAncestor(item)
      : item.href === '/'
        ? isActive({ route: '/' })
        : website.activePage?.route?.startsWith(item.href)

    return (
      <Link
        key={item.route || item.href || index}
        href={href}
        className={cn(
          'inline-flex items-center gap-1.5 text-sm font-medium transition-colors',
          getLinkStyles(active)
        )}
      >
        {icon && <Icon library={icon.library} name={icon.name} size="16" className="opacity-80" />}
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
        <nav className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center shadow-lg shadow-primary-200">
                <Leaf className="text-white w-5 h-5" />
              </div>
              <span className="font-bold text-xl tracking-tight">{siteName}</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
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
                      ? 'bg-white text-gray-900 hover:bg-gray-100'
                      : 'bg-btn-primary text-btn-primary-text hover:bg-btn-primary-hover'
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
          <div className="md:hidden bg-white border-t">
            <div className="px-4 py-4 space-y-1">
              {navItems.map((item, i) => {
                const href = item.href || item.navigableRoute
                const label = item.label || item.title
                const icon = parseIconRef(item.icon)
                const active = item.route ? isActive(item) : false

                return (
                  <Link
                    key={item.route || item.href || i}
                    href={href}
                    className={cn(
                      'flex items-center gap-2 px-3 py-2 text-base font-medium rounded-md',
                      active
                        ? 'text-primary-600 bg-primary-50'
                        : 'text-gray-700 hover:bg-gray-50'
                    )}
                    onClick={closeMobileMenu}
                  >
                    {icon && <Icon library={icon.library} name={icon.name} size="18" className="opacity-70" />}
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

export default Header
