import React from 'react'
import { H1, H2, P, cn } from '@uniweb/kit'

/**
 * Text Component
 *
 * Rich text content with academic typography options.
 * Modeled after professional A2 Text component with:
 * - Text density (spacing/rhythm)
 * - Text scale (size progression)
 * - Heading styles (typography character)
 * - Width constraints (readability)
 */
function Text({ content, params }) {
  const { title, pretitle, subtitle, paragraphs = [], links = [] } = content || {}
  const {
    textScale = 'normal',
    textDensity = 'normal',
    headingStyle = 'bold',
    textWidth = 'regular',
    textAlign = 'left',
  } = params || {}

  // Scale affects font sizes
  const scales = {
    small: {
      title: 'text-xl md:text-2xl',
      subtitle: 'text-base',
      body: 'text-sm',
      eyebrow: 'text-xs',
    },
    normal: {
      title: 'text-2xl md:text-3xl',
      subtitle: 'text-lg',
      body: 'text-base',
      eyebrow: 'text-sm',
    },
    large: {
      title: 'text-3xl md:text-4xl',
      subtitle: 'text-xl',
      body: 'text-lg',
      eyebrow: 'text-sm',
    },
    xlarge: {
      title: 'text-4xl md:text-5xl',
      subtitle: 'text-2xl',
      body: 'text-xl',
      eyebrow: 'text-base',
    },
  }

  // Density affects spacing
  const densities = {
    compact: {
      section: 'py-8',
      titleGap: 'mb-2',
      paragraphGap: 'mb-3',
      lineHeight: 'leading-snug',
    },
    normal: {
      section: 'py-12',
      titleGap: 'mb-4',
      paragraphGap: 'mb-4',
      lineHeight: 'leading-relaxed',
    },
    spacious: {
      section: 'py-16',
      titleGap: 'mb-6',
      paragraphGap: 'mb-6',
      lineHeight: 'leading-loose',
    },
  }

  // Heading styles affect typography character
  const headingStyles = {
    bold: 'font-bold',
    light: 'font-light',
    serif: 'font-serif',
    slab: 'font-black tracking-tight',
  }

  // Width constraints for readability
  const widths = {
    narrow: 'max-w-xl',
    regular: 'max-w-2xl',
    wide: 'max-w-4xl',
    full: 'max-w-none',
  }

  const alignments = {
    left: 'text-left',
    center: 'text-center mx-auto',
    right: 'text-right ml-auto',
  }

  const s = scales[textScale] || scales.normal
  const d = densities[textDensity] || densities.normal
  const h = headingStyles[headingStyle] || headingStyles.bold
  const w = widths[textWidth] || widths.regular
  const a = alignments[textAlign] || alignments.left

  return (
    <section className={cn('px-6 bg-white', d.section)}>
      <div className={cn('mx-auto', w, a)}>
        {pretitle && (
          <p className={cn(
            'uppercase tracking-wide text-primary font-medium',
            s.eyebrow,
            d.titleGap
          )}>
            {pretitle}
          </p>
        )}

        {title && (
          <H1
            text={title}
            className={cn(s.title, h, 'text-slate-900', d.titleGap)}
          />
        )}

        {subtitle && (
          <p className={cn(s.subtitle, 'text-slate-600', d.titleGap)}>
            {subtitle}
          </p>
        )}

        {paragraphs.length > 0 && (
          <div className={cn('prose-academic text-slate-700', d.lineHeight)}>
            {paragraphs.map((para, i) => (
              <P key={i} text={para} className={cn(s.body, d.paragraphGap, 'last:mb-0')} />
            ))}
          </div>
        )}

        {links.length > 0 && (
          <div className={cn('flex flex-wrap gap-4 mt-6', textAlign === 'center' && 'justify-center')}>
            {links.map((link, i) => (
              <a
                key={i}
                href={link.url}
                className="text-primary hover:underline font-medium"
              >
                {link.text} →
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default Text
