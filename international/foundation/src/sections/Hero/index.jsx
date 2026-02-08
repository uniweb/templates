import React from 'react'
import { H1, P, Link, cn } from '@uniweb/kit'

/**
 * Hero Component
 *
 * A hero section for landing pages with headline, description, and CTAs.
 */
function Hero({ content, params, block }) {
  // Runtime guarantees: content is flat, params have defaults from meta.js
  const { title, pretitle, subtitle, paragraphs, links } = content
  const { variant } = params

  const cta = links[0]
  const secondaryCta = links[1]
  const description = paragraphs[0]

  // When variant is 'gradient' and no engine background is set,
  // Hero renders its own gradient using brand palette colors
  const isGradient = variant === 'gradient' && !block.hasBackground

  return (
    <div
      className={cn(
        'relative py-20 sm:py-28 lg:py-32 px-6',
        isGradient && 'bg-gradient-to-br from-primary-700 via-primary-800 to-primary-950 context-dark'
      )}
    >
      <div className="relative max-w-4xl mx-auto text-center">
        {pretitle && (
          <span className={cn(
            'inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-6',
            'bg-primary-100/20 text-body border border-border/50'
          )}>
            {pretitle}
          </span>
        )}

        {title && (
          <H1
            text={title}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-heading"
          />
        )}

        {subtitle && (
          <p className="text-xl sm:text-2xl font-medium mb-4 text-subtle">
            {subtitle}
          </p>
        )}

        {description && (
          <P
            text={description}
            className="text-lg sm:text-xl mb-10 max-w-2xl mx-auto text-subtle"
          />
        )}

        {(cta || secondaryCta) && (
          <div className="flex gap-4 flex-wrap justify-center">
            {cta && (
              <Link
                href={cta.href}
                className="inline-flex items-center px-8 py-4 font-semibold rounded-xl transition-all bg-primary text-primary-foreground hover:bg-primary-hover"
              >
                {cta.label}
              </Link>
            )}
            {secondaryCta && (
              <Link
                href={secondaryCta.href}
                className="inline-flex items-center px-8 py-4 font-semibold rounded-xl transition-all border border-border text-body hover:bg-muted"
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

export default Hero
