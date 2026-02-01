import React from 'react'
import { Link, useWebsite } from '@uniweb/kit'
import { Leaf } from 'lucide-react'

export function Footer({ content }) {
  const { website } = useWebsite()

  const { title, paragraphs } = content
  const siteName = title || website.name || 'PandaWatch'
  const copyright = paragraphs[0]

  return (
    <div className="py-12">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
        <Link href="/" className="flex items-center gap-2">
          <Leaf className="w-6 h-6 text-primary-500" />
          <span className="font-bold text-lg text-heading">{siteName}</span>
        </Link>
        {copyright ? (
          <p className="text-sm text-subtle">{copyright}</p>
        ) : (
          <p className="text-sm text-subtle">
            &copy; {new Date().getFullYear()} Uniweb Demo Templates.
          </p>
        )}
      </div>
    </div>
  )
}

export default Footer
