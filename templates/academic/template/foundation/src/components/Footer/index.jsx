import React from 'react'
import { Link, useWebsite, cn } from '@uniweb/kit'

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
export function Footer({ content, params, website: websiteProp }) {
  const { website: contextWebsite, localize } = useWebsite()
  const website = websiteProp || contextWebsite

  const { title, subtitle } = content?.main?.header || {}
  const { paragraphs = [], links = [], imgs = [] } = content?.main?.body || {}
  const items = content?.items || []

  const {
    mode = 'auto',
    columns = 'auto',
    showCopyright = true,
    copyrightText = '',
    background = 'dark',
  } = params || {}

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

  // Extract social links (links with known social domains)
  const socialDomains = ['twitter.com', 'x.com', 'linkedin.com', 'github.com', 'facebook.com', 'instagram.com', 'youtube.com', 'scholar.google.com', 'orcid.org', 'researchgate.net']
  const socialLinks = links.filter(link =>
    socialDomains.some(domain => link.url?.includes(domain))
  )
  const regularLinks = links.filter(link =>
    !socialDomains.some(domain => link.url?.includes(domain))
  )

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
    <footer className={cn('py-12 px-6', bgClass)}>
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
                    href={link.url}
                    className={cn('transition-colors', linkClass)}
                    aria-label={link.text || 'Social link'}
                  >
                    <SocialIcon url={link.url} className="w-5 h-5" />
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
    </footer>
  )
}

// Social media icon component
function SocialIcon({ url, className }) {
  const domain = url?.toLowerCase() || ''

  if (domain.includes('twitter.com') || domain.includes('x.com')) {
    return (
      <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    )
  }

  if (domain.includes('linkedin.com')) {
    return (
      <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    )
  }

  if (domain.includes('github.com')) {
    return (
      <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    )
  }

  if (domain.includes('scholar.google')) {
    return (
      <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z" />
      </svg>
    )
  }

  if (domain.includes('orcid.org')) {
    return (
      <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947s-.422.947-.947.947a.95.95 0 0 1-.947-.947c0-.525.422-.947.947-.947zm-.722 3.038h1.444v10.041H6.647V7.416zm3.562 0h3.9c3.712 0 5.344 2.653 5.344 5.025 0 2.578-2.016 5.025-5.325 5.025h-3.919V7.416zm1.444 1.303v7.444h2.297c3.272 0 4.022-2.484 4.022-3.722 0-2.016-1.284-3.722-4.097-3.722h-2.222z" />
      </svg>
    )
  }

  // Default link icon
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
    </svg>
  )
}

export default Footer
