import { Link, cn, useAccordion, useActiveRoute, useWebsite } from '@uniweb/kit'

/**
 * LeftPanel — documentation navigation
 *
 * Reads the site's own page tree rather than a hand-written menu, so a
 * markdown file added anywhere under the docs appears here with no change to
 * this foundation.
 *
 * Three things this component deliberately does *not* do, because the
 * framework already does them:
 *
 * - **Narrow to the current section.** `getBranchHierarchy` answers the branch
 *   the visitor is in — under `/docs` it returns the docs, under `/guides` the
 *   guides. No route arithmetic here.
 * - **Sort.** `pages:` lists in site.yml / folder.yml resolve at build time, so
 *   the tree arrives in the order the site asked for.
 * - **Track open sections.** `useAccordion` holds that state.
 *
 * `for: 'left'` names the layout area being filled, and a page's `hideIn:` is
 * tested against it — so an author can keep a page in the header menu while
 * leaving it out of this rail, or the reverse.
 */

function normalizeRoute(route) {
  return (route || '').replace(/^\//, '').replace(/\/$/, '')
}

/** Every branch id in the tree — the "start expanded" case. */
function allBranchIds(items, found = []) {
  for (const page of items || []) {
    if (!page.children?.length) continue
    found.push(page.id || page.route)
    allBranchIds(page.children, found)
  }
  return found
}

/** Only the branches containing the active page, so the tree opens to it. */
function ancestorIds(items, activeRoute, found = []) {
  for (const page of items || []) {
    if (!page.children?.length) continue
    const route = normalizeRoute(page.route)
    if (activeRoute === route || activeRoute.startsWith(route + '/')) {
      found.push(page.id || page.route)
    }
    ancestorIds(page.children, activeRoute, found)
  }
  return found
}

function NavigationTree({ items, activeRoute, collapsible, isOpen, toggle, level }) {
  if (!items?.length) return null

  return (
    <ul className={cn('space-y-1', level > 0 && 'ml-4 mt-1 border-l border-border pl-3')}>
      {items.map((page) => {
        const id = page.id || page.route
        const hasChildren = page.children?.length > 0
        const expanded = !collapsible || isOpen(id)
        const isCurrent = normalizeRoute(page.route) === activeRoute

        return (
          <li key={id}>
            <div className="flex items-center gap-1">
              {hasChildren && collapsible ? (
                <button
                  type="button"
                  onClick={() => toggle(id)}
                  aria-expanded={expanded}
                  aria-label={expanded ? 'Collapse section' : 'Expand section'}
                  className="rounded p-1 text-subtle transition-colors hover:text-heading"
                >
                  <svg
                    className={cn('h-3 w-3 transition-transform', expanded && 'rotate-90')}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              ) : (
                <span className="w-5" />
              )}

              {/* A folder with no markdown of its own is a group heading, not a
                  dead link — the framework marks those `hasContent: false`. */}
              {page.hasContent ? (
                <Link
                  to={page.route}
                  className={cn(
                    'flex-1 rounded px-2 py-1.5 text-sm no-underline transition-colors',
                    isCurrent
                      ? 'bg-primary/5 font-medium text-primary'
                      : 'text-body hover:bg-muted hover:text-heading',
                    level === 0 && 'font-medium'
                  )}
                >
                  {page.label || page.title}
                </Link>
              ) : (
                <span
                  className={cn(
                    'flex-1 px-2 py-1.5 text-sm text-subtle',
                    level === 0 && 'font-medium'
                  )}
                >
                  {page.label || page.title}
                </span>
              )}
            </div>

            {hasChildren && expanded && (
              <NavigationTree
                items={page.children}
                activeRoute={activeRoute}
                collapsible={collapsible}
                isOpen={isOpen}
                toggle={toggle}
                level={level + 1}
              />
            )}
          </li>
        )
      })}
    </ul>
  )
}

export default function LeftPanel({ params }) {
  const { website } = useWebsite()
  const { route } = useActiveRoute()
  const { collapsible, categories, default_open } = params

  const activeRoute = normalizeRoute(route)

  // `categories` narrows to the section being read; otherwise the whole tree.
  const navigation = categories
    ? website.getBranchHierarchy({ route, for: 'left' })
    : website.getPageHierarchy({ for: 'left' })

  const { isOpen, toggle } = useAccordion({
    multiple: true,
    defaultOpen: default_open ? allBranchIds(navigation) : ancestorIds(navigation, activeRoute),
  })

  if (!navigation.length) return null

  return (
    <aside className="h-full">
      <div className="h-full overflow-y-auto px-4 py-6">
        <nav aria-label="Documentation">
          <NavigationTree
            items={navigation}
            activeRoute={activeRoute}
            collapsible={collapsible}
            isOpen={isOpen}
            toggle={toggle}
            level={0}
          />
        </nav>
      </div>
    </aside>
  )
}
