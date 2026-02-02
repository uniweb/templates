import React from 'react'
import { Link, cn, useWebsite, SocialIcon, isSocialLink } from '@uniweb/kit'

/**
 * Footer Component
 *
 * A marketing footer with navigation, social links, and copyright.
 * Supports simple (single row) and columns (multi-column) layouts.
 */
function Footer({ content, params }) {
  const { website } = useWebsite()

  // Runtime guarantees: content fields exist, params have defaults from meta.js
  const { title, paragraphs, links, items } = content
  const { layout, showNav } = params

  const siteName = title || website?.name || 'Site'
  const copyright = paragraphs[0] || `© ${new Date().getFullYear()} ${siteName}. All rights reserved.`

  // Get footer navigation from website
  const footerPages = showNav ? website.getPageHierarchy({ for: 'footer' }) : []

  // Separate social links from regular links
  const socialLinks = links.filter(link => isSocialLink(link.href))
  const regularLinks = links.filter(link => !isSocialLink(link.href))

  // Simple layout: single row with logo, nav, social
  if (layout === 'simple') {
    return (
      <div className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Logo / Site Name */}
            <div className="flex-shrink-0">
              <Link href="/" className="text-xl font-bold text-heading">
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
                    className="text-sm transition-colors text-subtle hover:text-body"
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
                    className="transition-colors text-subtle hover:text-body"
                    aria-label={link.label || 'Social link'}
                  >
                    <SocialIcon url={link.href} className="w-5 h-5" />
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Bottom row: copyright and legal links */}
          <div className="mt-8 pt-8 border-t border-edge">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-muted">{copyright}</p>
              {regularLinks.length > 0 && (
                <div className="flex items-center gap-4">
                  {regularLinks.map((link, index) => (
                    <Link
                      key={index}
                      href={link.href}
                      className="text-sm transition-colors text-subtle hover:text-body"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Columns layout: multi-column with items
  return (
    <div className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1 lg:col-span-2">
            <Link href="/" className="text-xl font-bold text-heading">
              {siteName}
            </Link>
            {paragraphs[1] && (
              <p className="mt-4 text-sm text-muted">{paragraphs[1]}</p>
            )}
            {/* Social Links */}
            {socialLinks.length > 0 && (
              <div className="flex items-center gap-4 mt-6">
                {socialLinks.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    className="transition-colors text-subtle hover:text-body"
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
                <h3 className="text-sm font-semibold mb-4 text-heading">
                  {column.title}
                </h3>
              )}
              {column.links && column.links.length > 0 && (
                <ul className="space-y-3">
                  {column.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        href={link.href}
                        className="text-sm transition-colors text-subtle hover:text-body"
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
              <h3 className="text-sm font-semibold mb-4 text-heading">
                Navigation
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {footerPages.map((page) => (
                  <Link
                    key={page.route}
                    href={page.navigableRoute}
                    className="text-sm transition-colors text-subtle hover:text-body"
                  >
                    {page.label || page.title}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bottom row: copyright and legal links */}
        <div className="pt-8 border-t border-edge">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted">{copyright}</p>
            {regularLinks.length > 0 && (
              <div className="flex items-center gap-4">
                {regularLinks.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    className="text-sm transition-colors text-subtle hover:text-body"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
