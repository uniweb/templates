import React from 'react'
import { Link, useWebsite, cn, SocialIcon, filterSocialLinks } from '@uniweb/kit'

/**
 * Footer Component
 *
 * A site footer with navigation, contact info, and copyright.
 * Supports both auto mode (builds navigation from site pages) and manual mode.
 *
 * Features:
 * - Auto/manual navigation modes
 * - Multi-column layout
 * - Social links from content
 * - Copyright with dynamic year
 */
function Footer({ content, params }) {
  const { website, localize } = useWebsite()

  // Runtime guarantees: content fields exist, params have defaults from meta.js
  const { title, subtitle, paragraphs, links, images, items } = content

  const {
    mode,
    columns,
    showCopyright,
    copyrightText,
  } = params

  // Get navigation items based on mode
  const navItems = mode === 'auto' && website
    ? website.getFooterPages()
    : links.map(link => ({
        route: link.href,
        label: link.label,
        title: link.label
      }))

  // Site branding
  const siteName = title || website?.name || ''
  const tagline = subtitle || website?.description || ''
  const logo = images[0]

  // Use kit's social link utilities
  const socialLinks = filterSocialLinks(links)

  // Copyright
  const currentYear = new Date().getFullYear()
  const copyright = copyrightText || `© ${currentYear} ${siteName}. All rights reserved.`

  // Determine column layout
  const hasItems = items.length > 0
  const colCount = columns === 'auto'
    ? (hasItems ? Math.min(items.length + 1, 4) : 2)
    : parseInt(columns)

  return (
    <div className="py-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Main Footer Content */}
        <div className={cn(
          'grid gap-8 mb-8',
          colCount === 2 && 'md:grid-cols-2',
          colCount === 3 && 'md:grid-cols-3',
          colCount >= 4 && 'md:grid-cols-4'
        )}>
          {/* Brand Column */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3">
              {logo && (
                <img
                  src={logo.url || logo.src}
                  alt={siteName}
                  className="h-10 w-auto"
                />
              )}
              {siteName && (
                <span className="text-xl font-semibold text-heading">
                  {siteName}
                </span>
              )}
            </Link>

            {tagline && (
              <p className="text-sm max-w-xs text-subtle">{tagline}</p>
            )}

            {/* Contact info from paragraphs */}
            {paragraphs.length > 0 && (
              <div className="text-sm space-y-1 text-subtle">
                {paragraphs.map((p, i) => (
                  <p key={i}>{typeof p === 'string' ? p : p.text}</p>
                ))}
              </div>
            )}

            {/* Social Links */}
            {socialLinks.length > 0 && (
              <div className="flex gap-4 pt-2">
                {socialLinks.map((link, i) => (
                  <Link
                    key={i}
                    href={link.href}
                    className="transition-colors text-subtle hover:text-heading"
                    aria-label={link.label || 'Social link'}
                  >
                    <SocialIcon url={link.href} className="w-5 h-5" />
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Navigation Column (if no items) */}
          {!hasItems && navItems.length > 0 && (
            <div>
              <h3 className="font-semibold mb-4 text-heading">
                {localize({ en: 'Pages', fr: 'Pages', es: 'Páginas' }, 'Pages')}
              </h3>
              <nav className="space-y-2">
                {navItems.map((item, i) => (
                  <Link
                    key={i}
                    href={item.route || '/'}
                    className="block text-sm transition-colors text-subtle hover:text-heading"
                  >
                    {item.label || item.title}
                  </Link>
                ))}
              </nav>
            </div>
          )}

          {/* Custom Item Columns (from H3 sections) */}
          {items.map((item, i) => (
            <div key={i}>
              {item.title && (
                <h3 className="font-semibold mb-4 text-heading">
                  {item.title}
                </h3>
              )}
              {item.links?.length > 0 && (
                <nav className="space-y-2">
                  {item.links.map((link, j) => (
                    <Link
                      key={j}
                      href={link.href}
                      className="block text-sm transition-colors text-subtle hover:text-heading"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              )}
              {item.paragraphs?.length > 0 && (
                <div className="text-sm space-y-1 text-subtle">
                  {item.paragraphs.map((p, j) => (
                    <p key={j}>{typeof p === 'string' ? p : p.text}</p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Copyright Bar */}
        {showCopyright && (
          <div className="pt-8 border-t border-border text-sm text-center text-subtle">
            {copyright}
          </div>
        )}
      </div>
    </div>
  )
}

export default Footer
