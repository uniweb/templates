import React from 'react'
import { Link, cn, useWebsite, SocialIcon, isSocialLink } from '@uniweb/kit'

/**
 * Footer Component
 *
 * A marketing footer with navigation, social links, and copyright.
 * Supports simple (single row) and columns (multi-column) layouts.
 */
export function Footer({ content, params }) {
  const { website } = useWebsite()

  // Runtime guarantees: content fields exist, params have defaults from meta.js
  const { title, paragraphs, links, items } = content
  const { theme, layout, showNav } = params

  const siteName = title || website?.name || 'Site'
  const copyright = paragraphs[0] || `© ${new Date().getFullYear()} ${siteName}. All rights reserved.`

  // Get footer navigation from website
  const footerPages = showNav ? website.getPageHierarchy({ for: 'footer' }) : []

  // Separate social links from regular links
  const socialLinks = links.filter(link => isSocialLink(link.href))
  const regularLinks = links.filter(link => !isSocialLink(link.href))

  // Theme styles
  const themeStyles = {
    dark: {
      bg: 'bg-gray-900',
      text: 'text-gray-300',
      heading: 'text-white',
      link: 'text-gray-400 hover:text-white',
      border: 'border-gray-800',
    },
    light: {
      bg: 'bg-gray-50',
      text: 'text-gray-600',
      heading: 'text-gray-900',
      link: 'text-gray-500 hover:text-gray-900',
      border: 'border-gray-200',
    },
  }

  const styles = themeStyles[theme]

  // Simple layout: single row with logo, nav, social
  if (layout === 'simple') {
    return (
      <footer className={cn('py-12 px-6', styles.bg)}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Logo / Site Name */}
            <div className="flex-shrink-0">
              <Link href="/" className={cn('text-xl font-bold', styles.heading)}>
                {siteName}
              </Link>
            </div>

            {/* Navigation Links */}
            {footerPages.length > 0 && (
              <nav className="flex flex-wrap items-center justify-center gap-6">
                {footerPages.map((page) => (
                  <Link
                    key={page.route}
                    href={page.navigableRoute}
                    className={cn('text-sm transition-colors', styles.link)}
                  >
                    {page.label || page.title}
                  </Link>
                ))}
              </nav>
            )}

            {/* Social Links */}
            {socialLinks.length > 0 && (
              <div className="flex items-center gap-4">
                {socialLinks.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    className={cn('transition-colors', styles.link)}
                    aria-label={link.label || 'Social link'}
                  >
                    <SocialIcon url={link.href} className="w-5 h-5" />
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Bottom row: copyright and legal links */}
          <div className={cn('mt-8 pt-8 border-t', styles.border)}>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className={cn('text-sm', styles.text)}>{copyright}</p>
              {regularLinks.length > 0 && (
                <div className="flex items-center gap-4">
                  {regularLinks.map((link, index) => (
                    <Link
                      key={index}
                      href={link.href}
                      className={cn('text-sm transition-colors', styles.link)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </footer>
    )
  }

  // Columns layout: multi-column with items
  return (
    <footer className={cn('py-16 px-6', styles.bg)}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1 lg:col-span-2">
            <Link href="/" className={cn('text-xl font-bold', styles.heading)}>
              {siteName}
            </Link>
            {paragraphs[1] && (
              <p className={cn('mt-4 text-sm', styles.text)}>{paragraphs[1]}</p>
            )}
            {/* Social Links */}
            {socialLinks.length > 0 && (
              <div className="flex items-center gap-4 mt-6">
                {socialLinks.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    className={cn('transition-colors', styles.link)}
                    aria-label={link.label || 'Social link'}
                  >
                    <SocialIcon url={link.href} className="w-5 h-5" />
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Dynamic columns from items */}
          {items.map((column, index) => (
            <div key={index}>
              {column.title && (
                <h3 className={cn('text-sm font-semibold mb-4', styles.heading)}>
                  {column.title}
                </h3>
              )}
              {column.links && column.links.length > 0 && (
                <ul className="space-y-3">
                  {column.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        href={link.href}
                        className={cn('text-sm transition-colors', styles.link)}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          {/* Navigation column if no items and showNav */}
          {items.length === 0 && footerPages.length > 0 && (
            <div className="col-span-2 md:col-span-3">
              <h3 className={cn('text-sm font-semibold mb-4', styles.heading)}>
                Navigation
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {footerPages.map((page) => (
                  <Link
                    key={page.route}
                    href={page.navigableRoute}
                    className={cn('text-sm transition-colors', styles.link)}
                  >
                    {page.label || page.title}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bottom row: copyright and legal links */}
        <div className={cn('pt-8 border-t', styles.border)}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className={cn('text-sm', styles.text)}>{copyright}</p>
            {regularLinks.length > 0 && (
              <div className="flex items-center gap-4">
                {regularLinks.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    className={cn('text-sm transition-colors', styles.link)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
