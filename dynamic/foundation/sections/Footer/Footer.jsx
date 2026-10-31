import React from 'react'
import { Link, useWebsite, P, Span } from '@uniweb/kit'
import { Leaf } from 'lucide-react'

function Footer({ content }) {
  const { website } = useWebsite()

  const { title, paragraphs } = content
  const siteName = title || website.name || 'PandaWatch'
  const copyright = paragraphs[0]

  return (
    <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
      <Link href="/" className="flex items-center gap-2">
        <Leaf className="w-6 h-6 text-primary-500" />
        <Span text={siteName} className="font-bold text-lg text-heading" />
      </Link>
      {copyright ? (
        <P text={copyright} className="text-sm text-subtle" />
      ) : (
        <p className="text-sm text-subtle">
          &copy; {new Date().getFullYear()} Uniweb Demo Templates.
        </p>
      )}
    </div>
  )
}

Footer.className = 'py-12'
Footer.as = 'footer'

export default Footer
