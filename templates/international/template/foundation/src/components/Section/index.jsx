import React from 'react'
import { H2, P, cn } from '@uniweb/kit'

/**
 * Section Component
 *
 * A general-purpose content section with title, description, and items.
 */
export function Section({ content }) {
  const { title, subtitle, paragraphs = [], items = [] } = content || {}

  return (
    <div className="py-16 sm:py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {(title || subtitle) && (
          <div className="text-center mb-12">
            {title && <H2 text={title} className="text-3xl sm:text-4xl font-bold mb-4 text-heading" />}
            {subtitle && <p className="text-lg text-muted">{subtitle}</p>}
            {paragraphs[0] && <P text={paragraphs[0]} className="text-lg mt-4 max-w-2xl mx-auto text-muted" />}
          </div>
        )}

        {items.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((item, i) => (
              <div key={i} className="p-6 rounded-xl bg-surface-subtle shadow-sm border border-edge-muted">
                {item.title && <h3 className="text-xl font-semibold mb-2 text-heading">{item.title}</h3>}
                {item.paragraphs?.[0] && <P text={item.paragraphs[0]} className="text-muted" />}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Section
