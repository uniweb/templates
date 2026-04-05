import { H1, P, Link, useWebsite } from '@uniweb/kit'

const courseGradients = [
  'from-primary to-primary-800',
  'from-emerald-500 to-teal-700',
  'from-amber-500 to-orange-700',
  'from-rose-500 to-pink-700',
  'from-cyan-500 to-blue-700',
]

const courseIcons = [
  'M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342',
  'M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25',
  'M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z',
  'M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5',
  'M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6Z',
]

function useCourses(content, block) {
  const { website } = useWebsite()
  const items = content.items || []

  const itemsByRoute = {}
  for (const item of items) {
    const href = item.links?.[0]?.href
    if (href) itemsByRoute[href] = item
  }

  const currentRoute = block.page.route
  const pages = website.getPageHierarchy({ for: 'header' })
    .filter((p) => p.route !== currentRoute)

  return pages.map((page) => {
    const route = page.route.startsWith('/') ? page.route : '/' + page.route
    const override = itemsByRoute[route]
    return {
      title: page.title || page.label,
      description: override?.paragraphs?.[0] || page.description || '',
      href: route,
      linkLabel: override?.links?.[0]?.label || 'Start Course',
    }
  })
}

function CourseCatalog({ content, block }) {
  const courses = useCourses(content, block)

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6">
      <div className="text-center py-16">
        <H1 text={content.title} className="text-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight" />
        <P text={content.paragraphs} className="text-subtle text-lg mt-4 max-w-2xl mx-auto" />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-16">
        {courses.map((course, i) => {
          const gradient = courseGradients[i % courseGradients.length]
          const iconPath = courseIcons[i % courseIcons.length]

          return (
            <Link
              key={i}
              to={course.href}
              className="group block rounded-2xl border border-border bg-card overflow-hidden hover:shadow-lg transition-all no-underline"
            >
              <div className={`bg-gradient-to-br ${gradient} p-6 relative overflow-hidden`}>
                <div className="absolute top-0 right-0 -mr-6 -mt-6 opacity-10">
                  <svg className="w-32 h-32 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="0.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d={iconPath} />
                  </svg>
                </div>
                <div className="relative z-10">
                  <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d={iconPath} />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="p-5">
                <h3 className="text-heading text-lg font-bold group-hover:text-primary transition-colors">
                  {course.title}
                </h3>
                <p className="text-subtle text-sm mt-2 line-clamp-2" dangerouslySetInnerHTML={{ __html: course.description }} />
                <div className="flex items-center gap-2 mt-4 text-primary text-sm font-semibold">
                  {course.linkLabel}
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

CourseCatalog.className = 'py-0'

export default CourseCatalog
