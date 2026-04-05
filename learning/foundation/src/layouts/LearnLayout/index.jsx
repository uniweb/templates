import { useState } from 'react'

export default function LearnLayout({ header, body, footer, left, params }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const radius = params.canvasRadius
  const sidebarW = params.sidebarWidth

  return (
    <div className="surface-bg flex flex-col h-screen overflow-hidden">
      {header}

      <div className="flex-1 flex overflow-hidden p-2 pt-0 gap-2">
        {left && (
          <aside
            className={`flex-shrink-0 transition-all duration-300 ease-in-out flex flex-col overflow-hidden ${
              sidebarOpen ? 'opacity-100' : 'w-0 opacity-0 -translate-x-10'
            }`}
            style={sidebarOpen ? { width: sidebarW } : undefined}
          >
            <div
              className="h-full flex flex-col bg-card shadow-sm border border-border overflow-hidden"
              style={{ borderRadius: radius }}
            >
              {left}
            </div>
          </aside>
        )}

        <main
          className="flex-1 bg-card shadow-lg border border-border overflow-y-auto overflow-x-hidden transition-all duration-300"
          style={{ borderRadius: radius }}
        >
          {body}
          {footer}
        </main>
      </div>
    </div>
  )
}
