import { cn, useMobileMenu } from '@uniweb/kit'

/**
 * A course: the lessons in a panel on the left, the lesson being read beside them.
 *
 * A phone has no room for both, so below `md` the panel is a drawer, opened from a
 * button. `useMobileMenu` closes it when a lesson is followed.
 */
export default function LearnLayout({ header, body, footer, left, params }) {
  const { isOpen, open, close } = useMobileMenu()

  const radius = params.canvasRadius
  const sidebarW = params.sidebarWidth

  const panel = left && (
    <div
      className="h-full flex flex-col bg-card shadow-sm border border-border overflow-hidden"
      style={{ borderRadius: radius }}
    >
      {left}
    </div>
  )

  return (
    <div className="surface-bg flex flex-col h-dvh overflow-hidden">
      {header}

      <div className="flex-1 flex min-h-0 overflow-hidden p-2 pt-0 gap-2">
        {left && (
          <aside
            className="hidden md:flex flex-shrink-0 flex-col overflow-hidden"
            style={{ width: sidebarW }}
          >
            {panel}
          </aside>
        )}

        {/* A size container (`@container`), so a block an author placed `full`
            spans this panel rather than the viewport (kit's prose-tokens.css). */}
        <main
          className="@container min-w-0 flex-1 bg-card shadow-lg border border-border overflow-y-auto overflow-x-hidden"
          style={{ borderRadius: radius }}
        >
          {body}
          {footer}
        </main>
      </div>

      {left && (
        <>
          {isOpen && (
            <div className="fixed inset-0 z-40 bg-black/50 md:hidden" onClick={close} aria-hidden="true" />
          )}
          <div
            className={cn(
              'fixed inset-y-0 left-0 z-50 w-80 max-w-[85vw] p-2 transition-transform duration-300 md:hidden',
              isOpen ? 'translate-x-0' : '-translate-x-full invisible'
            )}
            role="dialog"
            aria-modal="true"
            aria-label="Lessons"
          >
            {panel}
          </div>
          <button
            type="button"
            onClick={open}
            aria-label="Open lessons"
            className="fixed bottom-4 left-4 z-30 rounded-full bg-primary p-3 text-primary-foreground shadow-lg transition-colors hover:bg-primary-hover md:hidden"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </>
      )}
    </div>
  )
}
