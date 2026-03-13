import React from 'react'
import { cn } from '@uniweb/kit'

/**
 * Section Component
 *
 * Layout container with spacing options.
 * Uses semantic CSS tokens — adapts automatically to theme context
 * (context-light, context-medium, context-dark) set via frontmatter `theme:`.
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
              <p className="text-lg text-body">{paragraphs[0]}</p>
            )}
          </div>
        )}
      </div>
    </section>
  )
}

export default Section
