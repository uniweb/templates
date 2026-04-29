import { Link, useWebsite, useActiveRoute } from '@uniweb/kit'

export default function LessonFooter({ block }) {
  const { website } = useWebsite()
  const { route: activeRoute } = useActiveRoute()

  const pages = website.getPageHierarchy()
  const norm = (r) => (r || '').replace(/^\//, '').replace(/\/$/, '')

  const coursePage = pages.find((p) => {
    const route = norm(p.route)
    return route && (activeRoute === route || activeRoute.startsWith(route + '/'))
  })

  if (!coursePage) return null

  const lessons = []
  const flatten = (page) => {
    if (page.hasContent) lessons.push(page)
    for (const child of page.children || []) {
      flatten(child)
    }
  }
  for (const child of coursePage.children || []) {
    flatten(child)
  }

  const currentIndex = lessons.findIndex((p) => norm(p.route) === activeRoute)
  const prev = currentIndex > 0 ? lessons[currentIndex - 1] : null
  const next = currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null

  if (!prev && !next) return null

  return (
    <div className="flex items-center justify-between px-8 py-4 border-t border-border bg-card/90 backdrop-blur-sm">
      {prev ? (
        <Link
          to={prev.navigableRoute || prev.route}
          className="flex items-center gap-2 text-subtle font-medium hover:text-heading transition-colors no-underline"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
          Previous
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          to={next.navigableRoute || next.route}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold bg-primary hover:bg-primary-hover text-primary-foreground shadow-sm hover:shadow-lg transition-all no-underline"
        >
          Continue
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </Link>
      ) : (
        <div />
      )}
    </div>
  )
}
