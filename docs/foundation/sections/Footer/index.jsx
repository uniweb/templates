import React from 'react'
import { Link, cn, useWebsite } from '@uniweb/kit'

/**
 * Footer Component for Documentation Sites
 *
 * A simple footer with copyright, links, and optional branding.
 */
function Footer({ content, params }) {
  const { website } = useWebsite()

  // Runtime guarantees: content fields exist, params have defaults from meta.js
  const { title, paragraphs, links } = content

  const { layout } = params

  const siteName = title || website?.name || 'Documentation'
  const copyright = paragraphs[0] || `© ${new Date().getFullYear()} ${siteName}. All rights reserved.`

  return (
    <div className="bg-muted border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {layout === 'simple' ? (
          // Simple layout: copyright left, links right
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-subtle">{copyright}</p>
            {links.length > 0 && (
              <div className="flex items-center gap-4">
                {links.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    className="text-sm text-subtle hover:text-body transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ) : (
          // Centered layout
          <div className="text-center">
            {links.length > 0 && (
              <div className="flex items-center justify-center gap-6 mb-4">
                {links.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    className="text-sm text-subtle hover:text-body transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
            <p className="text-sm text-subtle">{copyright}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Footer
