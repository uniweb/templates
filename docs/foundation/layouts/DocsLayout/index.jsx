import React, { useState, useEffect, useRef } from 'react'
import { cn } from '@uniweb/kit'

/**
 * Documentation Layout
 *
 * Uniweb layouts receive pre-rendered content areas as props:
 *   - header, footer, left, right: Named areas (declared in meta.js)
 *   - body: The page's main content sections
 *   - page: The current Page object (route, title, etc.)
 *
 * This layout uses overflow-based scrolling — the <main> element is the
 * scroll container (overflow-y-auto), not the window. The meta.js declares
 * `scroll: 'main'` so the runtime tracks scroll restoration on that element.
 *
 * The right column shows an auto-generated "On this page" table of contents
 * when no explicit `right` area content is provided. This demonstrates that
 * layouts can add their own UI beyond what content authors configure.
 *
 * Dark mode support uses Tailwind's dark: variant, mapped to Uniweb's
 * .scheme-dark class via @custom-variant in styles.css.
 */

// ─── Table of Contents ───────────────────────────────────────────────────────

/**
 * Auto-generated table of contents with scroll spy.
 *
 * Scans the <main> element for h2/h3 headings after content renders,
 * then uses IntersectionObserver to highlight the currently visible section.
 *
 * Uses the layout's mainRef to observe the scroll container. The `root`
 * option in IntersectionObserver is set to <main> (not the viewport)
 * because that's where scrolling happens in this overflow-based layout.
 */
function TableOfContents({ mainRef, activeRoute }) {
  const [headings, setHeadings] = useState([])
  const [activeId, setActiveId] = useState('')

  // Re-extract headings when the page changes
  useEffect(() => {
    const main = mainRef.current
    if (!main) return

    // Delay to ensure React has rendered the new page's content
    const timer = setTimeout(() => {
      const elements = main.querySelectorAll('h2, h3')
      const items = Array.from(elements).map((el) => {
        // Ensure each heading has an id for anchor linking
        if (!el.id) {
          el.id = el.textContent
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, '')
        }
        return {
          id: el.id,
          text: el.textContent,
          level: el.tagName === 'H3' ? 3 : 2,
        }
      })
      setHeadings(items)
    }, 100)

    return () => clearTimeout(timer)
  }, [activeRoute])

  // Scroll spy: observe headings within the <main> scroll container.
  // rootMargin crops the observation zone — a heading is "active" when
  // it's in the top ~35% of the scroll container.
  useEffect(() => {
    if (headings.length === 0) return
    const main = mainRef.current
    if (!main) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      { root: main, rootMargin: '-80px 0px -65% 0px', threshold: 0 }
    )

    headings.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [headings])

  // Hide TOC if the page has fewer than 2 headings
  if (headings.length < 2) return null

  const handleClick = (e, id) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setActiveId(id)
    }
  }

  return (
    <nav className="py-8 px-4">
      <h4 className="text-xs font-semibold uppercase tracking-wider mb-3 text-gray-400 dark:text-gray-500">
        On this page
      </h4>
      <ul className="space-y-1.5 border-l border-gray-200 dark:border-gray-700">
        {headings.map(({ id, text, level }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              onClick={(e) => handleClick(e, id)}
              className={cn(
                'block text-[13px] leading-snug py-1 -ml-px border-l-2 transition-colors',
                level === 3 ? 'pl-6' : 'pl-4',
                activeId === id
                  ? 'border-primary text-primary font-medium'
                  : 'border-transparent text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'
              )}
            >
              {text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

// ─── Mobile Sidebar ──────────────────────────────────────────────────────────

/**
 * Slide-out sidebar drawer for mobile. Renders the left panel content
 * in an overlay that slides from the left edge.
 */
function MobileSidebar({ isOpen, onClose, children }) {
  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = ''
      }
    }
  }, [isOpen])

  return (
    <>
      {/* Backdrop overlay */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={onClose}
        />
      )}

      {/* Drawer panel */}
      <div
        className={cn(
          'md:hidden fixed top-16 left-0 w-72 h-[calc(100vh-4rem)] bg-white dark:bg-gray-900 z-50',
          'transform transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
          aria-label="Close sidebar"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="h-full overflow-y-auto">{children}</div>
      </div>
    </>
  )
}

/**
 * Floating action button to open the mobile sidebar.
 */
function MenuButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="md:hidden fixed bottom-4 left-4 z-30 p-3 bg-primary text-white rounded-full shadow-lg hover:bg-primary-dark transition-colors"
      aria-label="Open navigation"
    >
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>
  )
}

// ─── Layout ──────────────────────────────────────────────────────────────────

/**
 * DocsLayout — three-column documentation layout.
 *
 * Structure (desktop):
 *   ┌─────────────────────────────────────────────────────┐
 *   │  header (flex-shrink-0)                              │
 *   ├────────┬───────────────────────────────┬─────────────┤
 *   │  left  │  <main> (overflow-y-auto)     │  right/TOC  │
 *   │  nav   │  body content + footer        │  (xl+ only) │
 *   │  (md+) │                               │             │
 *   └────────┴───────────────────────────────┴─────────────┘
 *
 * The outer div is h-screen, making this a fixed viewport layout.
 * Only <main> scrolls — sidebars stay fixed in place.
 */
export default function DocsLayout({
  page,
  header,
  body,
  footer,
  left,
  right,
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const mainRef = useRef(null)

  const leftContent = left
  const rightContent = right

  // Auto-close mobile sidebar when navigating to a new page
  const activeRoute = page?.route
  useEffect(() => {
    setSidebarOpen(false)
  }, [activeRoute])

  return (
    <div className="h-screen flex flex-col bg-white dark:bg-gray-900 dark:text-gray-100">
      {/* Header — natural flex child, not fixed/sticky */}
      <header className="flex-shrink-0 z-30">
        {header}
      </header>

      {/* Mobile sidebar drawer (hidden on md+) */}
      {leftContent && (
        <MobileSidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        >
          {leftContent}
        </MobileSidebar>
      )}

      {/* Content area — sidebars + scrollable main */}
      <div className="flex-1 flex overflow-hidden w-full max-w-[90rem] mx-auto">
        {/* Left sidebar — navigation (hidden on mobile) */}
        {leftContent && (
          <aside className="hidden md:block w-64 flex-shrink-0 overflow-y-auto border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
            {leftContent}
          </aside>
        )}

        {/* Main content — the scroll container (matched by scroll: 'main' in meta.js) */}
        <main ref={mainRef} className="flex-1 min-w-0 overflow-y-auto">
          <div className="px-4 py-8 sm:px-6 lg:px-8 max-w-3xl mx-auto">
            {/* Prose wrapper — Tailwind typography plugin styles the body content.
                dark:prose-invert flips colors for dark mode. */}
            <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-semibold prose-a:text-primary hover:prose-a:text-primary-dark prose-code:bg-code-bg prose-code:text-code-text prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none">
              {body}
            </div>

            {/* Footer — prev/next page navigation */}
            {footer && (
              <footer className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                {footer}
              </footer>
            )}
          </div>
        </main>

        {/* Right column — shows explicit content if provided, otherwise
            auto-generates a "On this page" TOC from the rendered headings */}
        <aside className="hidden xl:block w-56 flex-shrink-0 overflow-y-auto bg-white dark:bg-gray-900">
          {rightContent || <TableOfContents mainRef={mainRef} activeRoute={activeRoute} />}
        </aside>
      </div>

      {/* Mobile menu FAB (hidden on md+) */}
      {leftContent && (
        <MenuButton onClick={() => setSidebarOpen(true)} />
      )}
    </div>
  )
}
