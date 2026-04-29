import { useWebsite, useActiveRoute } from '@uniweb/kit'

export default function LessonHeader({ block }) {
  const { website } = useWebsite()
  const { route: activeRoute } = useActiveRoute()

  const pages = website.getPageHierarchy()
  let moduleName = ''
  let lessonTitle = ''

  for (const course of pages) {
    const courseRoute = (course.route || '').replace(/^\//, '').replace(/\/$/, '')
    if (!courseRoute || !activeRoute.startsWith(courseRoute)) continue

    for (const module of course.children || []) {
      const modRoute = (module.route || '').replace(/^\//, '').replace(/\/$/, '')
      if (activeRoute === modRoute || activeRoute.startsWith(modRoute + '/')) {
        moduleName = module.label || module.title || ''
        if (module.hasContent && activeRoute === modRoute) {
          lessonTitle = module.label || module.title || ''
        }
        for (const lesson of module.children || []) {
          const lessonRoute = (lesson.route || '').replace(/^\//, '').replace(/\/$/, '')
          if (activeRoute === lessonRoute) {
            lessonTitle = lesson.label || lesson.title || ''
            break
          }
        }
        break
      }
      if (activeRoute === modRoute) {
        lessonTitle = module.label || module.title || ''
        break
      }
    }
    if (lessonTitle) break
  }

  if (moduleName === lessonTitle) moduleName = ''
  if (!lessonTitle) return null

  return (
    <div className="sticky top-0 z-10 bg-card/80 backdrop-blur-md border-b border-border px-8 py-5 flex items-center justify-between">
      <div>
        {moduleName && (
          <div className="text-xs font-bold text-subtle uppercase tracking-wider mb-1">
            {moduleName}
          </div>
        )}
        <h1 className="text-2xl font-extrabold text-heading tracking-tight">
          {lessonTitle}
        </h1>
      </div>
    </div>
  )
}
