import React from 'react'
import { cn, Text } from '@uniweb/kit'

/**
 * Section Component
 *
 * Layout container with spacing options.
 * Uses semantic CSS tokens — adapts automatically to theme context
 * (context-light, context-medium, context-dark) set via frontmatter `theme:`.
 *
 * Paragraphs are rendered through kit's <Text> so HTML produced by the
 * content pipeline (inline math, bracketed spans, bold/italic, links)
 * renders correctly. Using plain {paragraphs[0]} would escape the HTML
 * and show raw <math> markup instead of real math.
 */
function Section({ content, params }) {
  const { title, paragraphs = [] } = content || {}
  const {
    padding = 'lg',
    maxWidth = 'regular',
  } = params || {}

  const paddings = {
    none: '',
    sm: 'py-8',
    md: 'py-12',
    lg: 'py-16',
    xl: 'py-24',
  }

  const widths = {
    narrow: 'max-w-3xl',
    regular: 'max-w-5xl',
    wide: 'max-w-7xl',
    full: 'max-w-none',
  }

  return (
    <section className={cn(paddings[padding], 'px-6')}>
      <div className={cn('mx-auto', widths[maxWidth])}>
        {(title || paragraphs[0]) && (
          <div className="mb-10">
            {title && (
              <h2 className="text-2xl font-bold mb-3 text-heading">{title}</h2>
            )}
            {paragraphs[0] && (
              <Text as="p" text={paragraphs[0]} className="text-lg text-body" />
            )}
          </div>
        )}
      </div>
    </section>
  )
}

export default Section
