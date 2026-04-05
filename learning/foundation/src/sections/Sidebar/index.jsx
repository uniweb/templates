import { Link, useWebsite, useActiveRoute, cn } from '@uniweb/kit'

function Sidebar() {
  const { website } = useWebsite()
  const { route: activeRoute } = useActiveRoute()

  const pages = website.getPageHierarchy()

  // Find which course we're in
  const coursePage = pages.find((p) => {
    const route = (p.route || '').replace(/^\//, '').replace(/\/$/, '')
    return route && (activeRoute === route || activeRoute.startsWith(route + '/'))
  })

  if (!coursePage) return null

  const norm = (r) => (r || '').replace(/^\//, '').replace(/\/$/, '')
  const isActive = (page) => norm(page.route) === activeRoute

  const hasModules = coursePage.children?.some((c) => c.children?.length > 0)

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="p-6 border-b border-border bg-muted/30">
        <Link
          to="/"
          className="flex items-center text-xs font-bold uppercase tracking-wider text-primary hover:underline mb-2 no-underline"
        >
          <svg className="w-3.5 h-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
          All Courses
        </Link>
        <h2 className="font-bold text-lg text-heading leading-tight">
          {coursePage.label || coursePage.title}
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {hasModules ? (
          coursePage.children?.map((module) => (
            <div key={module.route} className="mb-6">
              <h3 className="text-xs font-bold text-subtle uppercase tracking-wider mb-3 px-2">
                {module.label || module.title}
              </h3>
              <div className="space-y-1">
                {module.children?.map((lesson) => (
                  <LessonLink key={lesson.route} page={lesson} active={isActive(lesson)} />
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="space-y-1">
            {coursePage.children?.map((lesson) => (
              <LessonLink key={lesson.route} page={lesson} active={isActive(lesson)} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function LessonLink({ page, active }) {
  return (
    <Link
      to={page.navigableRoute || page.route}
      className={cn(
        'w-full flex items-center gap-3 p-3 rounded-xl transition-all text-left no-underline',
        active
          ? 'bg-primary/5 text-primary ring-1 ring-primary/20 shadow-sm'
          : 'hover:bg-muted/50 text-body'
      )}
    >
      <svg
        className={cn('w-4 h-4 shrink-0', active ? 'text-primary' : 'text-subtle')}
        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"
      >
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
        />
      </svg>
      <div className="flex-1 min-w-0">
        <div className={cn('text-sm font-medium truncate', active && 'font-bold text-primary')}>
          {page.label || page.title}
        </div>
      </div>
    </Link>
  )
}

Sidebar.className = 'p-0 h-full overflow-hidden'

export default Sidebar
