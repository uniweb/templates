import React from 'react'
import { H2, P, Link } from '@uniweb/kit'

/**
 * CTA Component
 *
 * A call-to-action section.
 */
function CTA({ content }) {
  // Runtime guarantees: content is flat, params have defaults from meta.js
  const { title, subtitle, paragraphs, links } = content

  const cta = links[0]
  const secondaryCta = links[1]

  return (
    <div className="py-16 sm:py-20 px-6">
      <div className="max-w-3xl mx-auto text-center">
        {title && <H2 text={title} className="text-3xl sm:text-4xl font-bold mb-4 text-heading" />}
        {subtitle && <p className="text-xl mb-4 text-muted">{subtitle}</p>}
        {paragraphs[0] && <P text={paragraphs[0]} className="text-lg mb-8 text-muted" />}
        {(cta || secondaryCta) && (
          <div className="flex gap-4 flex-wrap justify-center">
            {cta && (
              <Link
                href={cta.href}
                className="inline-flex items-center px-8 py-4 font-semibold rounded-xl transition-all bg-btn-primary text-btn-primary-text hover:bg-btn-primary-hover"
              >
                {cta.label}
              </Link>
            )}
            {secondaryCta && (
              <Link
                href={secondaryCta.href}
                className="inline-flex items-center px-8 py-4 font-semibold rounded-xl transition-all bg-btn-secondary text-btn-secondary-text hover:bg-btn-secondary-hover"
              >
                {secondaryCta.label}
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default CTA
