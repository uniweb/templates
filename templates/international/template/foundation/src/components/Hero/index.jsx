import React from 'react'
import { H1, P, Link, cn } from '@uniweb/kit'

/**
 * Hero Component
 *
 * A hero section for landing pages with headline, description, and CTAs.
 */
export function Hero({ content, params }) {
  // Runtime guarantees: content is flat, params have defaults from meta.js
  const { title, pretitle, subtitle, paragraphs, links } = content
  const { theme, _hasBackground } = params

  const cta = links[0]
  const secondaryCta = links[1]
  const description = paragraphs[0]

  const themes = {
    gradient: {
      section: 'bg-gradient-to-br from-primary via-blue-600 to-indigo-700 text-white',
      eyebrow: 'bg-white/20 text-white border border-white/20',
      description: 'text-blue-100',
      primaryBtn: 'bg-white text-primary hover:bg-blue-50',
      secondaryBtn: 'border-2 border-white/30 text-white hover:bg-white/10',
    },
    dark: {
      section: 'bg-gray-900 text-white',
      eyebrow: 'bg-primary/20 text-primary-300 border border-primary/30',
      description: 'text-gray-400',
      primaryBtn: 'bg-primary text-white hover:bg-blue-600',
      secondaryBtn: 'border-2 border-gray-700 text-gray-300 hover:bg-gray-800',
    },
    light: {
      section: 'bg-gray-50 text-gray-900',
      eyebrow: 'bg-primary/10 text-primary border border-primary/20',
      description: 'text-gray-600',
      primaryBtn: 'bg-primary text-white hover:bg-blue-700',
      secondaryBtn: 'border-2 border-gray-300 text-gray-700 hover:bg-gray-100',
    },
  }

  const t = themes[theme] || themes.gradient

  // When the author set a background image/video, skip our opaque bg color
  // so the engine-rendered background shows through
  const sectionBg = _hasBackground ? 'text-white' : t.section

  return (
    <section className={cn('relative py-20 sm:py-28 lg:py-32 px-6', sectionBg)}>
      <div className="relative max-w-4xl mx-auto text-center">
        {pretitle && (
          <span className={cn('inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-6', t.eyebrow)}>
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
          <p className={cn('text-xl sm:text-2xl font-medium mb-4', t.description)}>
            {subtitle}
          </p>
        )}

        {description && (
          <P
            text={description}
            className={cn('text-lg sm:text-xl mb-10 max-w-2xl mx-auto', t.description)}
          />
        )}

        {(cta || secondaryCta) && (
          <div className="flex gap-4 flex-wrap justify-center">
            {cta && (
              <Link
                href={cta.href}
                className={cn('inline-flex items-center px-8 py-4 font-semibold rounded-xl transition-all', t.primaryBtn)}
              >
                {cta.label}
              </Link>
            )}
            {secondaryCta && (
              <Link
                href={secondaryCta.href}
                className={cn('inline-flex items-center px-8 py-4 font-semibold rounded-xl transition-all', t.secondaryBtn)}
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

export default Hero
