import React, { useState, useEffect } from 'react'
import { cn } from '@uniweb/kit'

/**
 * Documentation Layout Component
 *
 * A layout optimized for documentation sites with:
 * - Fixed header
 * - Left sidebar navigation (hidden on mobile, visible on md+)
 * - Scrollable main content area
 * - Optional right sidebar (hidden on mobile, visible on xl+)
 * - Mobile sidebar drawer
 *
 * Uses overflow-based scrolling on <main> rather than window scroll.
 * The layout declares `scroll: 'main'` in meta.js so the runtime
 * manages scroll restoration on the <main> element.
 *
 * Receives pre-rendered areas from the runtime Layout:
 * - header: Header component
 * - body: Main page content
 * - footer: Footer component (prev/next navigation for docs)
 * - left: Left sidebar navigation
 * - right: Right sidebar (table of contents, etc.)
 */

/**
 * Mobile sidebar drawer component
 */
function MobileSidebar({ isOpen, onClose, children }) {
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
      {/* Backdrop */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar drawer */}
      <div
        className={cn(
          'md:hidden fixed top-16 left-0 w-72 h-[calc(100vh-4rem)] bg-white z-50',
          'transform transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-md hover:bg-gray-100"
          aria-label="Close sidebar"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="h-full overflow-y-auto">
          {children}
        </div>
      </div>
    </>
  )
}

/**
 * Menu toggle button for mobile
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

/**
 * Main Layout component
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

  const leftContent = left
  const rightContent = right

  // Close sidebar on page navigation
  const activeRoute = page?.route
  useEffect(() => {
    setSidebarOpen(false)
  }, [activeRoute])

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Fixed Header */}
      <header className="flex-shrink-0 z-30 w-full border-b border-gray-200 bg-white">
        {header}
      </header>

      {/* Mobile Sidebar */}
      {leftContent && (
        <MobileSidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        >
          {leftContent}
        </MobileSidebar>
      )}

      {/* Content Area — sidebars + scrollable main */}
      <div className="flex-1 flex overflow-hidden w-full max-w-7xl mx-auto">
        {/* Left Sidebar - Desktop */}
        {leftContent && (
          <aside className="hidden md:block w-64 flex-shrink-0 overflow-y-auto border-r border-gray-200 bg-white">
            {leftContent}
          </aside>
        )}

        {/* Center Content — this is the scroll container */}
        <main className="flex-1 min-w-0 overflow-y-auto">
          <div className={cn(
            'px-4 py-8 sm:px-6 lg:px-8',
            !rightContent && 'max-w-3xl mx-auto'
          )}>
            {/* Prose wrapper for body content */}
            <div className="prose prose-slate max-w-none prose-headings:font-semibold prose-a:text-primary hover:prose-a:text-primary-dark prose-code:bg-code-bg prose-code:text-code-text prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none">
              {body}
            </div>

            {/* Footer (prev/next navigation) */}
            {footer && (
              <footer className="mt-12 pt-8 border-t border-gray-200">
                {footer}
              </footer>
            )}
          </div>
        </main>

        {/* Right Sidebar - Desktop */}
        {rightContent && (
          <aside className="hidden xl:block w-64 flex-shrink-0 overflow-y-auto border-l border-gray-200 bg-white">
            {rightContent}
          </aside>
        )}
      </div>

      {/* Mobile Menu Button */}
      {leftContent && (
        <MenuButton onClick={() => setSidebarOpen(true)} />
      )}
    </div>
  )
}
