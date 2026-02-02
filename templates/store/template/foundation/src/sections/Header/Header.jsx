import { useRef } from 'react'
import { Sun, ShoppingBag } from 'lucide-react'
import {
  Link,
  cn,
  useScrolled,
  useMobileMenu,
  useWebsite,
  useActiveRoute,
} from '@uniweb/kit'
import { useCartCount, openCart } from '../../components/cart-store.js'
import { CartDrawer } from '../../components/CartDrawer.jsx'
import { Toast } from '../../components/Toast.jsx'

/**
 * Header Component
 *
 * Fixed navigation bar with:
 * - Logo (sun icon + store name)
 * - Navigation links (auto-generated from page hierarchy)
 * - Cart button with item count badge
 * - Mobile responsive menu
 * - Cart drawer and toast notifications
 */
export function Header({ content, block }) {
  const { website } = useWebsite()
  const headerRef = useRef(null)
  const scrolled = useScrolled(20)
  const {
    isOpen: mobileMenuOpen,
    toggle: toggleMobileMenu,
    close: closeMobileMenu,
  } = useMobileMenu()
  const { isActiveOrAncestor } = useActiveRoute()
  const cartCount = useCartCount()

  const nextBlockInfo = block.getNextBlockInfo()
  const allowTranslucentTop =
    nextBlockInfo?.context?.allowTranslucentTop || false
  const nextBlockTheme = nextBlockInfo?.theme || 'light'
  const isFloating = allowTranslucentTop
  const isDarkBg = isFloating && ['dark'].includes(nextBlockTheme)

  const siteName = content.title || website.name || 'Solis Artisans'
  const navPages = website.getPageHierarchy({ for: 'header' })

  const getHeaderStyles = () => {
    if (isFloating) {
      return scrolled
        ? 'bg-white/80 backdrop-blur-xl border-b border-neutral-200 text-neutral-900'
        : isDarkBg
          ? 'bg-transparent text-white'
          : 'bg-transparent text-neutral-900'
    }
    return scrolled
      ? 'bg-white/80 backdrop-blur-xl border-b border-neutral-200 text-neutral-900'
      : 'bg-white border-b border-neutral-200 text-neutral-900'
  }

  const getLinkStyles = (page) => {
    const isActive = page ? isActiveOrAncestor(page) : false
    if (isFloating && !scrolled && isDarkBg) {
      return isActive ? 'text-primary-400' : 'text-white/90 hover:text-primary-400'
    }
    return isActive
      ? 'text-primary-600'
      : 'text-neutral-500 hover:text-primary-600'
  }

  return (
    <>
      <div
        ref={headerRef}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          getHeaderStyles()
        )}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-primary-600 p-2 rounded-xl text-white">
                <Sun size={24} />
              </div>
              <span className="text-xl font-black tracking-tighter uppercase">
                {siteName}
              </span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-8 text-xs font-black uppercase tracking-widest">
              {navPages.map((page) => (
                <Link
                  key={page.route}
                  href={page.navigableRoute}
                  className={cn(
                    'transition-colors',
                    getLinkStyles(page)
                  )}
                >
                  {page.label || page.title}
                </Link>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <button
                onClick={openCart}
                className={cn(
                  'relative p-2.5 rounded-2xl transition-all',
                  isFloating && !scrolled && isDarkBg
                    ? 'text-white/90 hover:text-primary-400'
                    : 'text-neutral-700 hover:bg-neutral-100'
                )}
              >
                <ShoppingBag size={24} />
                {cartCount > 0 && (
                  <span className={cn(
                    'absolute -top-1 -right-1 bg-primary-600 text-white text-[10px] font-black w-6 h-6 flex items-center justify-center rounded-full border-4',
                    isFloating && !scrolled && isDarkBg ? 'border-transparent' : 'border-white'
                  )}>
                    {cartCount}
                  </span>
                )}
              </button>

              <button
                onClick={toggleMobileMenu}
                className="md:hidden p-2"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {mobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-neutral-200">
            <div className="px-4 py-4 space-y-2">
              {navPages.map((page) => (
                <Link
                  key={page.route}
                  href={page.navigableRoute}
                  className={cn(
                    'block px-3 py-3 text-lg font-light capitalize',
                    isActiveOrAncestor(page)
                      ? 'text-primary-600'
                      : 'text-neutral-700'
                  )}
                  onClick={closeMobileMenu}
                >
                  {page.label || page.title}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Spacer */}
      {!isFloating && <div className="h-20" />}

      {/* Global overlays */}
      <CartDrawer />
      <Toast />
    </>
  )
}

export default Header
