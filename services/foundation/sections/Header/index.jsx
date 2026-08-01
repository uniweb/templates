import React from 'react'
import { Link, Icon, useMobileMenu, cn } from '@uniweb/kit'

function Header({ content }) {
  const logo = content.title
  const nav = content.lists[0] || []
  const cta = content.links[0]
  const { isOpen, toggle, close } = useMobileMenu()

  return (
    <div className="sticky top-0 z-10 bg-section/95 backdrop-blur border-b border-border">
      <div className="max-w-[var(--max-content-width)] mx-auto px-6 h-[var(--header-height)] flex items-center justify-between gap-6">
        <Link href="/" className="text-xl font-bold text-heading no-underline">
          {logo}
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {nav.map((item, i) => {
            const link = item.links?.[0]
            return link ? (
              <Link key={i} href={link.href} className="text-sm font-medium text-body hover:text-link no-underline">
                {link.label}
              </Link>
            ) : null
          })}
        </nav>

        <div className="flex items-center gap-3">
          {cta && (
            <Link
              href={cta.href}
              className="hidden sm:inline-flex px-5 py-2.5 text-sm font-semibold rounded-[var(--control-radius)] bg-primary text-primary-foreground hover:bg-primary-hover no-underline"
            >
              {cta.label}
            </Link>
          )}
          <button
            type="button"
            onClick={toggle}
            aria-label="Menu"
            aria-expanded={isOpen}
            className="md:hidden p-2 text-body"
          >
            <Icon name={isOpen ? 'close' : 'menu'} size="24" />
          </button>
        </div>
      </div>

      {isOpen && (
        <nav className={cn('md:hidden border-t border-border px-6 py-4 flex flex-col gap-4')}>
          {nav.map((item, i) => {
            const link = item.links?.[0]
            return link ? (
              <Link key={i} href={link.href} onClick={close} className="text-body no-underline">
                {link.label}
              </Link>
            ) : null
          })}
        </nav>
      )}
    </div>
  )
}

Header.className = 'p-0'
Header.as = 'header'

export default Header
