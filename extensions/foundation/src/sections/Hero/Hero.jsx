import React from 'react'
import { H1, P, Link, cn } from '@uniweb/kit'

function Hero({ content, params }) {
  const { title, pretitle, subtitle, paragraphs, links } = content

  return (
    <section className="py-20 sm:py-28 px-6 bg-gradient-to-br from-primary via-blue-600 to-indigo-700 text-white">
      <div className="max-w-4xl mx-auto text-center">
        {pretitle && (
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-6 bg-white/20 backdrop-blur-sm border border-white/20">
            {pretitle}
          </span>
        )}
        {title && (
          <H1
            text={title}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
          />
        )}
        {subtitle && (
          <p className="text-xl sm:text-2xl font-medium mb-4 text-blue-100">
            {subtitle}
          </p>
        )}
        {paragraphs[0] && (
          <P
            text={paragraphs[0]}
            className="text-lg mb-10 leading-relaxed text-blue-100 max-w-2xl mx-auto"
          />
        )}
        {links.length > 0 && (
          <div className="flex gap-4 flex-wrap justify-center">
            {links.map((link, i) => (
              <Link
                key={i}
                href={link.href}
                className={cn(
                  'inline-flex items-center px-8 py-4 font-semibold rounded-xl transition-all',
                  i === 0
                    ? 'bg-white text-primary hover:bg-blue-50'
                    : 'border-2 border-white/30 text-white hover:bg-white/10'
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default Hero
