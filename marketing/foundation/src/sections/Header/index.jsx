import { useRef } from 'react'
import { Link, cn, useScrolled, useMobileMenu, useWebsite, useActiveRoute } from '@uniweb/kit'

function Header({ content, block }) {
  const { website } = useWebsite()
  const headerRef = useRef(null)
  const scrolled = useScrolled(20)
  const { isOpen: mobileOpen, toggle: toggleMobile, close: closeMobile } = useMobileMenu()
  const { isActiveOrAncestor } = useActiveRoute()

  const nextBlockInfo = block.getNextBlockInfo()
  const isFloating = nextBlockInfo?.context?.allowTranslucentTop || false
  const isDarkBg = isFloating && ['gradient', 'glass', 'dark'].includes(nextBlockInfo?.theme || 'light')

  const { title, imgs, links } = content
  const navPages = website.getPageHierarchy({ for: 'header' })
  const logo = imgs[0]
  const siteName = title || website.name || 'Site'

  const headerClass = isFloating
    ? scrolled
      ? 'bg-section/95 backdrop-blur-lg shadow-sm text-heading'
      : isDarkBg ? 'bg-transparent text-white' : 'bg-transparent text-heading'
    : scrolled
      ? 'bg-section shadow-sm text-heading'
      : 'bg-section text-heading'

  const linkClass = (page) => {
    const active = page ? isActiveOrAncestor(page) : false
    if (isFloating && !scrolled && isDarkBg) {
      return active ? 'text-white font-semibold' : 'text-white/80 hover:text-white'
    }
    return active ? 'text-link font-semibold' : 'text-subtle hover:text-heading'
  }

  return (
    <>
      <div ref={headerRef} className={cn('fixed top-0 left-0 right-0 z-50 transition-all duration-300', headerClass)}>
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <div className="shrink-0">
              <Link href="/" className="flex items-center gap-2">
                {logo ? (
                  <img src={logo.url || logo.src} alt={logo.alt || siteName} className="h-8 w-auto" />
                ) : (
                  <>
                    <svg className="h-8 w-8" viewBox="0 0 32 32" fill="none">
                      <rect width="32" height="32" rx="8" className="fill-primary" />
                      <path d="M8 12L16 8L24 12V20L16 24L8 20V12Z" className="stroke-white" strokeWidth="2" strokeLinejoin="round" />
                      <path d="M16 8V24M8 12L24 20M24 12L8 20" className="stroke-white/60" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    <span className="text-xl font-bold">{siteName}</span>
                  </>
                )}
              </Link>
            </div>

            <div className="hidden lg:flex lg:items-center lg:gap-8">
              {navPages.map((page) => (
                <Link key={page.route} href={page.navigableRoute} className={cn('text-sm font-medium transition-colors', linkClass(page))}>
                  {page.label || page.title}
                </Link>
              ))}
            </div>

            {links.length > 0 && (
              <div className="hidden lg:flex lg:items-center lg:gap-4">
                {links[0] && (
                  <Link href={links[0].href} className={cn('text-sm font-medium transition-colors', linkClass(null))}>
                    {links[0].label}
                  </Link>
                )}
                {links[1] && (
                  <Link href={links[1].href} className={cn(
                    'inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors',
                    isFloating && !scrolled && isDarkBg
                      ? 'bg-white/90 text-neutral-900 hover:bg-white'
                      : 'bg-primary text-primary-foreground hover:bg-primary-hover'
                  )}>
                    {links[1].label}
                  </Link>
                )}
              </div>
            )}

            <div className="lg:hidden">
              <button type="button" onClick={toggleMobile} className="inline-flex items-center justify-center p-2 rounded-md" aria-expanded={mobileOpen}>
                <span className="sr-only">Toggle menu</span>
                {mobileOpen ? (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                ) : (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                )}
              </button>
            </div>
          </div>
        </nav>

        {mobileOpen && (
          <div className="lg:hidden bg-section border-t border-border">
            <div className="px-4 py-4 space-y-2">
              {navPages.map((page) => (
                <Link key={page.route} href={page.navigableRoute} className={cn(
                  'block px-3 py-2 text-base font-medium rounded-md',
                  isActiveOrAncestor(page) ? 'text-link bg-primary/5' : 'text-body hover:text-heading hover:bg-muted'
                )} onClick={closeMobile}>
                  {page.label || page.title}
                </Link>
              ))}
              {links.length > 0 && (
                <div className="mt-4 pt-4 border-t border-border space-y-2">
                  {links.map((link, i) => (
                    <Link key={i} href={link.href} className={cn(
                      'block px-3 py-2 text-base font-medium rounded-md text-center',
                      i === 1 ? 'bg-primary text-primary-foreground hover:bg-primary-hover' : 'text-body hover:text-heading hover:bg-muted'
                    )} onClick={closeMobile}>
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      {!isFloating && <div className="h-16 lg:h-20" />}
    </>
  )
}

Header.as = 'header'
Header.className = 'p-0'

export default Header
