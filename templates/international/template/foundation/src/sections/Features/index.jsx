import React from 'react'
import { H2, P, cn } from '@uniweb/kit'

/**
 * Features Component
 *
 * Display features/services in a grid layout.
 */
export function Features({ content, params }) {
  // Runtime guarantees: content is flat, params have defaults from meta.js
  const { title, subtitle, paragraphs, items } = content
  const { columns } = params

  const cols = { '2': 'md:grid-cols-2', '3': 'md:grid-cols-2 lg:grid-cols-3', '4': 'md:grid-cols-2 lg:grid-cols-4' }

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
          <div className={cn('grid gap-8', cols[columns] || cols['3'])}>
            {items.map((item, i) => (
              <div key={i} className="text-center p-6">
                {item.icons?.[0] && (
                  <div className="w-12 h-12 mx-auto mb-4 bg-primary-100/50 text-primary-600 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">{item.icons[0]}</span>
                  </div>
                )}
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

export default Features
