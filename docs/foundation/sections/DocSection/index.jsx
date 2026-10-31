import React from 'react'
import { H1, P, Span, Link, Render, cn, useWebsite } from '@uniweb/kit'

/**
 * The section as written, after the header this section draws itself — the
 * pretitle, title and subtitle, which the parser reads from its leading headings,
 * one heading per line: a slot of several lines (`# Getting` / `# Started`) is
 * a list of them. ⛔ Until 2026-10-19 a slot counted once, and its other lines
 * showed again in the body.
 */
function bodyOf(sequence = [], { pretitle, title, subtitle }) {
  const header = [pretitle, title, subtitle].flat().filter(Boolean).length
  let i = 0
  while (i < header && sequence[i]?.type === 'heading') i++
  return sequence.slice(i)
}

/**
 * DocSection Component
 *
 * Main documentation content component: a page header, then the page as
 * written, in prose typography, then previous/next page navigation.
 *
 * The body is the section's content in the order the author wrote it — headings,
 * paragraphs, lists, code, tables, images, quotes, callouts — drawn by kit's
 * <Render>. ⛔ Until 2026-10-19 it was rebuilt from the grouped fields
 * (paragraphs, then lists, then links), which put text out of order, dropped
 * code, tables and images, and drew no list at all.
 */
function DocSection({ content, params, block }) {
  const { website } = useWebsite()

  // Runtime guarantees: content fields exist, params have defaults from meta.js
  const { title, pretitle, subtitle, sequence } = content

  const { show_navigation, max_width } = params

  // Get adjacent pages for navigation
  const allPages = website.getPageHierarchy({ nested: false })
  const currentRoute = website.activePage?.route || ''
  const currentIndex = allPages.findIndex((p) => p.route === currentRoute)
  const prevPage = currentIndex > 0 ? allPages[currentIndex - 1] : null
  const nextPage = currentIndex < allPages.length - 1 ? allPages[currentIndex + 1] : null

  // Width classes
  const widthClass = {
    prose: 'max-w-prose',
    lg: 'max-w-4xl',
    xl: 'max-w-5xl',
    full: 'max-w-none',
  }[max_width] || 'max-w-prose'

  return (
    <article className={cn('py-8 px-6 lg:px-8', widthClass, 'mx-auto')}>
      {/* Header */}
      {(pretitle || title || subtitle) && (
        <header className="mb-8 pb-6 border-b border-border">
          {pretitle && (
            <Span text={pretitle} className="block text-sm font-medium text-primary mb-2" />
          )}
          {title && (
            <H1
              text={title}
              className="text-3xl sm:text-4xl font-bold text-heading tracking-tight"
            />
          )}
          {subtitle && (
            <P text={subtitle} className="mt-3 text-lg text-subtle" />
          )}
        </header>
      )}

      {/* Main content */}
      {/* This section owns the reading typography, so it renders correctly
          under any layout. Its colors are the section's theme tokens, so it
          needs no palette class, and none exists to add. */}
      <div className="prose max-w-none [&>p:first-child]:text-lg [&>p:first-child]:text-subtle">
        <Render content={{ sequence: bodyOf(sequence, content) }} block={block} />
      </div>

      {/* Page navigation */}
      {show_navigation && (prevPage || nextPage) && (
        <nav className="mt-12 pt-6 border-t border-border">
          <div className="flex justify-between">
            {prevPage ? (
              <Link
                href={prevPage.route}
                className="group flex flex-col"
              >
                <span className="text-sm text-subtle mb-1">Previous</span>
                <span className="text-primary group-hover:text-primary-dark font-medium flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  {prevPage.label || prevPage.title}
                </span>
              </Link>
            ) : (
              <div />
            )}

            {nextPage ? (
              <Link
                href={nextPage.route}
                className="group flex flex-col text-right"
              >
                <span className="text-sm text-subtle mb-1">Next</span>
                <span className="text-primary group-hover:text-primary-dark font-medium flex items-center gap-1">
                  {nextPage.label || nextPage.title}
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </nav>
      )}
    </article>
  )
}

export default DocSection
