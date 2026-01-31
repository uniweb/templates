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
export function Footer({ content, params }) {
  const { website, localize } = useWebsite()

  // Runtime guarantees: content fields exist, params have defaults from meta.js
  const { title, subtitle, paragraphs, links, imgs, items } = content

  const {
    mode,
    columns,
    showCopyright,
    copyrightText,
    background,
  } = params

  // Get navigation items based on mode
  const navItems = mode === 'auto' && website
    ? website.getFooterPages()
    : links.map(link => ({
        route: link.url,
        label: link.text,
        title: link.text
      }))

  // Site branding
  const siteName = title || website?.name || ''
  const tagline = subtitle || website?.description || ''
  const logo = imgs[0]

  // Use kit's social link utilities
  const socialLinks = filterSocialLinks(links)

  // Copyright
  const currentYear = new Date().getFullYear()
  const copyright = copyrightText || `© ${currentYear} ${siteName}. All rights reserved.`

  // Background styles
  const backgrounds = {
    dark: 'bg-slate-900 text-white',
    light: 'bg-slate-100 text-slate-900',
    primary: 'bg-primary text-white',
    white: 'bg-white text-slate-900 border-t border-slate-200',
  }

  const bgClass = backgrounds[background] || backgrounds.dark
  const mutedClass = background === 'dark' || background === 'primary'
    ? 'text-slate-400'
    : 'text-slate-500'
  const linkClass = background === 'dark' || background === 'primary'
    ? 'text-slate-300 hover:text-white'
    : 'text-slate-600 hover:text-primary'
  const headingClass = background === 'dark' || background === 'primary'
    ? 'text-white'
    : 'text-slate-900'

  // Determine column layout
  const hasItems = items.length > 0
  const colCount = columns === 'auto'
    ? (hasItems ? Math.min(items.length + 1, 4) : 2)
    : parseInt(columns)

  return (
    <div className={cn('py-12 px-6', bgClass)}>
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
                <span className={cn('text-xl font-semibold', headingClass)}>
                  {siteName}
                </span>
              )}
            </Link>

            {tagline && (
              <p className={cn('text-sm max-w-xs', mutedClass)}>{tagline}</p>
            )}

            {/* Contact info from paragraphs */}
            {paragraphs.length > 0 && (
              <div className={cn('text-sm space-y-1', mutedClass)}>
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
                    href={link.url || link.href}
                    className={cn('transition-colors', linkClass)}
                    aria-label={link.text || link.label || 'Social link'}
                  >
                    <SocialIcon url={link.url || link.href} className="w-5 h-5" />
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Navigation Column (if no items) */}
          {!hasItems && navItems.length > 0 && (
            <div>
              <h3 className={cn('font-semibold mb-4', headingClass)}>
                {localize({ en: 'Pages', fr: 'Pages', es: 'Páginas' }, 'Pages')}
              </h3>
              <nav className="space-y-2">
                {navItems.map((item, i) => (
                  <Link
                    key={i}
                    href={item.route || '/'}
                    className={cn('block text-sm transition-colors', linkClass)}
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
                <h3 className={cn('font-semibold mb-4', headingClass)}>
                  {item.title}
                </h3>
              )}
              {item.links?.length > 0 && (
                <nav className="space-y-2">
                  {item.links.map((link, j) => (
                    <Link
                      key={j}
                      href={link.url}
                      className={cn('block text-sm transition-colors', linkClass)}
                    >
                      {link.text}
                    </Link>
                  ))}
                </nav>
              )}
              {item.paragraphs?.length > 0 && (
                <div className={cn('text-sm space-y-1', mutedClass)}>
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
          <div className={cn(
            'pt-8 border-t text-sm text-center',
            background === 'dark' || background === 'primary'
              ? 'border-slate-700'
              : 'border-slate-200',
            mutedClass
          )}>
            {copyright}
          </div>
        )}
      </div>
    </div>
  )
}

export default Footer
