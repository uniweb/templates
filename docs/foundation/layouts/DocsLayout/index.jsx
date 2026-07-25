import { cn, useHeadings, useMobileMenu } from '@uniweb/kit'

/**
 * Documentation Layout
 *
 * A layout receives its content areas pre-rendered, as props:
 *   - header, footer, left, right: named areas, declared in meta.js and
 *     filled by the matching files in the site's layout/ folder
 *   - body: the page's own sections
 *   - page: the current Page object (route, title, …)
 *
 * Two things worth copying from this file:
 *
 * 1. Every colour resolves through a semantic token — `bg-section`,
 *    `text-subtle`, `border-border`. Those flip with the visitor's light/dark
 *    choice on their own, and they take their values from the *site's*
 *    theme.yml. That is why there is no `dark:` variant anywhere below: a
 *    layout that hardcodes `bg-white dark:bg-gray-900` looks the same on every
 *    site that uses it, which defeats the point of a foundation.
 *
 * 2. The two hard parts — the contents rail and the drawer — come from kit as
 *    hooks, not components. You write the markup; they handle heading
 *    extraction, scroll tracking, and closing the drawer on navigation.
 */

// ─── Table of contents ───────────────────────────────────────────────────────

/**
 * The headings of the page being read, with the one you are level with picked
 * out. `useHeadings` derives the list from the page's own content rather than
 * scanning the DOM, so the rail is present in prerendered HTML instead of
 * appearing after hydration — and its anchors are guaranteed to match the ids
 * the renderer stamped on the headings.
 */
function TocEntry({ heading, activeId, scrollTo, depth = 0 }) {
  return (
    <li>
      <button
        type="button"
        onClick={() => scrollTo(heading.id)}
        className={cn(
          '-ml-px block w-full border-l-2 py-1 text-left text-[13px] leading-snug transition-colors',
          depth === 0 ? 'pl-4' : 'pl-8',
          activeId === heading.id
            ? 'border-primary font-medium text-primary'
            : 'border-transparent text-subtle hover:text-heading'
        )}
      >
        {heading.text}
      </button>

      {heading.children?.length > 0 && (
        <ul>
          {heading.children.map((child) => (
            <TocEntry
              key={child.id}
              heading={child}
              activeId={activeId}
              scrollTo={scrollTo}
              depth={depth + 1}
            />
          ))}
        </ul>
      )}
    </li>
  )
}

function TableOfContents() {
  const { headings, activeId, scrollTo } = useHeadings()

  // A page with one heading has nothing to navigate.
  if (headings.length < 2) return null

  return (
    <nav className="px-4 py-8" aria-label="On this page">
      <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-subtle">
        On this page
      </h4>
      <ul className="space-y-1.5 border-l border-border">
        {headings.map((heading) => (
          <TocEntry key={heading.id} heading={heading} activeId={activeId} scrollTo={scrollTo} />
        ))}
      </ul>
    </nav>
  )
}

// ─── Mobile navigation ───────────────────────────────────────────────────────

/**
 * The navigation rail as a slide-out drawer on small screens. `useMobileMenu`
 * owns the open/closed state and closes itself when the route changes, so
 * following a link does the obvious thing without any effect written here.
 */
function MobileNav({ isOpen, onClose, children }) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <div
        className={cn(
          'fixed bottom-0 left-0 top-[var(--header-height,4rem)] z-50 w-72 md:hidden',
          'border-r border-border bg-section transition-transform duration-300',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Documentation navigation"
      >
        <div className="h-full overflow-y-auto">{children}</div>
      </div>
    </>
  )
}

// ─── Layout ──────────────────────────────────────────────────────────────────

/**
 * Three columns on desktop, one on mobile:
 *
 *   ┌──────────────────────────────────────────────────────┐
 *   │  header                                              │
 *   ├────────┬────────────────────────────┬────────────────┤
 *   │  left  │  <main> (scrolls)          │  contents      │
 *   │  (md+) │  body + footer             │  (xl+)         │
 *   └────────┴────────────────────────────┴────────────────┘
 *
 * The outer element is `h-screen`, so only <main> scrolls and the rails stay
 * put. meta.js declares `scroll: 'main'` to tell the runtime which element to
 * track for scroll restoration — without it, back/forward would restore the
 * window's scroll position, which never moves here.
 */
export default function DocsLayout({ header, body, footer, left, right }) {
  const { isOpen, open, close } = useMobileMenu()

  return (
    <div className="flex h-screen flex-col bg-section text-body">
      <header className="z-30 flex-shrink-0">{header}</header>

      {left && (
        <MobileNav isOpen={isOpen} onClose={close}>
          {left}
        </MobileNav>
      )}

      <div className="mx-auto flex w-full max-w-[90rem] flex-1 overflow-hidden">
        {left && (
          <aside className="hidden w-64 flex-shrink-0 overflow-y-auto border-r border-border md:block">
            {left}
          </aside>
        )}

        {/* The scroll container named by meta.js `scroll: 'main'`. */}
        <main className="min-w-0 flex-1 overflow-y-auto">
          <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
            {/* Column geometry only — no `prose` wrapper here. The sections
                own their own typography, which keeps them renderable under any
                layout, and a second container would reset the prose variables
                for everything inside it. */}
            {body}

            {footer && <footer className="mt-12 border-t border-border pt-8">{footer}</footer>}
          </div>
        </main>

        {/* An explicit `right` area wins; otherwise the page indexes itself. */}
        <aside className="hidden w-56 flex-shrink-0 overflow-y-auto xl:block">
          {right || <TableOfContents />}
        </aside>
      </div>

      {left && (
        <button
          type="button"
          onClick={open}
          aria-label="Open navigation"
          className="fixed bottom-4 left-4 z-30 rounded-full bg-primary p-3 text-primary-foreground shadow-lg transition-colors hover:bg-primary-hover md:hidden"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      )}
    </div>
  )
}
