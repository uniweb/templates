import React from 'react'
import { Link, cn } from '@uniweb/kit'

function Header({ content, block }) {
  const { title, links = [] } = content
  const website = block.page?.website

  // `fixed`, with a spacer holding its place in the page — the bar's height and its
  // border, so `box-content`. A section renders inside boxes as tall as itself, so
  // `sticky` here would have no room to move (docs/development/component-patterns.md,
  // "Header positioning").
  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <nav className="max-w-7xl mx-auto px-6 h-[var(--header-height)] flex items-center justify-between">
          <Link href="/" className="text-lg font-bold text-gray-900">
            {title || website?.title || 'Site'}
          </Link>
          {links.length > 0 && (
            <div className="flex items-center gap-6">
              {links.map((link, i) => (
                <Link
                  key={i}
                  href={link.href}
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}
        </nav>
      </header>
      <div aria-hidden="true" className="box-content h-[var(--header-height)] border-b border-transparent" />
    </>
  )
}

export default Header
