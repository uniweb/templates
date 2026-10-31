import React from 'react'
import { Link, cn, useWebsite, useRouting, getLocaleLabel, H3, H4, P, Span } from '@uniweb/kit'

/**
 * Footer Component
 *
 * A simple footer with navigation and language switcher.
 */
function Footer({ content, params }) {
  const { website } = useWebsite()
  const { useLocation } = useRouting()
  const location = useLocation()

  // Runtime guarantees: content is flat
  const { title, paragraphs, items } = content

  const siteName = title || website.name || 'Site'
  const description = paragraphs[0]
  const navPages = website.getFooterPages()

  // Labels from content items — translatable via i18n
  const pagesLabel = items[0]?.title || 'Pages'
  const languageLabel = items[1]?.title || 'Language'
  const copyrightText = items[2]?.title || 'All rights reserved.'

  // Locale info
  const hasMultipleLocales = website.hasMultipleLocales()
  const locales = website.getLocales()
  const activeLocale = website.getActiveLocale()

  const year = new Date().getFullYear()

  return (
    <div className="py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <H3 text={siteName} className="text-xl font-bold mb-4 text-heading" />
            {description && <P text={description} className="text-subtle max-w-md" />}
          </div>

          {/* Navigation */}
          <div>
            <H4 text={pagesLabel} className="font-semibold mb-4 text-heading" />
            <ul className="space-y-2">
              {navPages.map((page) => (
                <li key={page.route}>
                  <Link href={page.route} className="text-subtle hover:text-body transition-colors">
                    {page.label || page.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Language */}
          {hasMultipleLocales && (
            <div>
              <H4 text={languageLabel} className="font-semibold mb-4 text-heading" />
              <ul className="space-y-2">
                {locales.map((locale) => (
                  <li key={locale.code}>
                    <Link
                      reload
                      href={website.getLocaleUrl(locale.code, location.pathname)}
                      className={cn(
                        'transition-colors',
                        locale.code === activeLocale
                          ? 'text-body font-medium'
                          : 'text-subtle hover:text-body'
                      )}
                    >
                      {getLocaleLabel(locale)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="border-t border-border pt-8 text-center text-subtle text-sm">
          <p>&copy; {year} <Span text={siteName} />. <Span text={copyrightText} /></p>
        </div>
      </div>
    </div>
  )
}

export default Footer
