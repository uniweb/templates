import React from 'react'
import { H2, P, cn } from '@uniweb/kit'

/**
 * Section Component
 *
 * A general-purpose content section with title, description, and items.
 */
export function Section({ content, params }) {
  const { title, subtitle } = content.main?.header || {}
  const { paragraphs = [] } = content.main?.body || {}
  const items = content.items || []
  const { theme = 'light' } = params || {}

  const themes = {
    light: { section: 'bg-white', title: 'text-gray-900', text: 'text-gray-600' },
    gray: { section: 'bg-gray-50', title: 'text-gray-900', text: 'text-gray-600' },
    dark: { section: 'bg-gray-900', title: 'text-white', text: 'text-gray-300' },
  }

  const t = themes[theme] || themes.light

  return (
    <section className={cn('py-16 sm:py-20 px-6', t.section)}>
      <div className="max-w-6xl mx-auto">
        {(title || subtitle) && (
          <div className="text-center mb-12">
            {title && <H2 text={title} className={cn('text-3xl sm:text-4xl font-bold mb-4', t.title)} />}
            {subtitle && <p className={cn('text-lg', t.text)}>{subtitle}</p>}
            {paragraphs[0] && <P text={paragraphs[0]} className={cn('text-lg mt-4 max-w-2xl mx-auto', t.text)} />}
          </div>
        )}

        {items.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((item, i) => (
              <div key={i} className="p-6 rounded-xl bg-white shadow-sm border border-gray-100">
                {item.title && <h3 className="text-xl font-semibold mb-2 text-gray-900">{item.title}</h3>}
                {item.paragraphs?.[0] && <P text={item.paragraphs[0]} className="text-gray-600" />}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default Section
