import React from 'react'
import { Link, cn } from '@uniweb/kit'

/**
 * CTA Component
 *
 * Conversion-focused section. Background color/gradient is controlled
 * via frontmatter `background:` and `theme:` — component uses semantic tokens.
 */
export function CTA({ content, params }) {
  // Runtime guarantees: content fields exist, params have defaults from meta.js
  const { title, paragraphs, links } = content
  const { alignment } = params

  const cta = links[0]
  const secondaryCta = links[1]

  return (
    <section className="py-20 px-6">
      <div className={cn('max-w-4xl mx-auto', alignment === 'center' && 'text-center')}>
        {title && (
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-heading">{title}</h2>
        )}
        {paragraphs[0] && (
          <p className={cn('text-lg mb-8 max-w-2xl text-muted', alignment === 'center' && 'mx-auto')}>
            {paragraphs[0]}
          </p>
        )}
        {(cta || secondaryCta) && (
          <div className={cn('flex gap-4 flex-wrap', alignment === 'center' && 'justify-center')}>
            {cta && (
              <Link
                href={cta.href}
                className="inline-block px-8 py-4 font-semibold rounded-lg transition-colors bg-btn-primary text-btn-primary-text hover:bg-btn-primary-hover"
              >
                {cta.label}
              </Link>
            )}
            {secondaryCta && (
              <Link
                href={secondaryCta.href}
                className="inline-block px-8 py-4 font-semibold rounded-lg transition-colors border-2 border-edge text-heading hover:bg-surface-subtle"
              >
                {secondaryCta.label}
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  )
}

export default CTA
