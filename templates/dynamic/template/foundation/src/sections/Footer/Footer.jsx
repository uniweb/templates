import React from 'react'
import { Link, useWebsite } from '@uniweb/kit'
import { Leaf } from 'lucide-react'

export function Footer({ content }) {
  const { website } = useWebsite()

  const { title, paragraphs } = content
  const siteName = title || website.name || 'PandaWatch'
  const description = paragraphs[0]
  const navPages = website.getFooterPages()
  const year = new Date().getFullYear()

  return (
    <div className="py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <Leaf className="w-6 h-6 text-primary-500" />
          <span className="font-bold text-lg text-heading">{siteName}</span>
        </div>
        {navPages.length > 0 && (
          <div className="flex items-center gap-6">
            {navPages.map((page) => (
              <Link
                key={page.route}
                href={page.route}
                className="text-sm text-muted hover:text-body transition-colors"
              >
                {page.label || page.title}
              </Link>
            ))}
          </div>
        )}
        <p className="text-sm text-subtle">
          &copy; {year} {siteName}. All rights reserved.
        </p>
      </div>
    </div>
  )
}

export default Footer
