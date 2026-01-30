import React from 'react'
import { Link, cn, useWebsite, useRouting, getLocaleLabel } from '@uniweb/kit'

/**
 * Footer Component
 *
 * A simple footer with navigation and language switcher.
 */
export function Footer({ content, params }) {
  const { website } = useWebsite()
  const { useLocation } = useRouting()
  const location = useLocation()

  // Runtime guarantees: content is flat
  const { title, paragraphs } = content

  const siteName = title || website.name || 'Site'
  const description = paragraphs[0]
  const navPages = website.getFooterPages()

  // Locale info
  const hasMultipleLocales = website.hasMultipleLocales()
  const locales = website.getLocales()
  const activeLocale = website.getActiveLocale()

  const year = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold mb-4">{siteName}</h3>
            {description && <p className="text-gray-400 max-w-md">{description}</p>}
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold mb-4">Pages</h4>
            <ul className="space-y-2">
              {navPages.map((page) => (
                <li key={page.route}>
                  <Link href={page.route} className="text-gray-400 hover:text-white transition-colors">
                    {page.label || page.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Language */}
          {hasMultipleLocales && (
            <div>
              <h4 className="font-semibold mb-4">Language</h4>
              <ul className="space-y-2">
                {locales.map((locale) => (
                  <li key={locale.code}>
                    <a
                      href={website.getLocaleUrl(locale.code, location.pathname)}
                      className={cn(
                        'transition-colors',
                        locale.code === activeLocale
                          ? 'text-white font-medium'
                          : 'text-gray-400 hover:text-white'
                      )}
                    >
                      {getLocaleLabel(locale)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {year} {siteName}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
