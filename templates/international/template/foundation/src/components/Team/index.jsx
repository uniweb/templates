import React from 'react'
import { H2, P, cn } from '@uniweb/kit'

/**
 * Team Component
 *
 * Display team members in a grid.
 */
export function Team({ content, params }) {
  // Runtime guarantees: content.main.header/body exist, params have defaults from meta.js
  const { title, subtitle } = content.main.header
  const { paragraphs } = content.main.body
  const items = content.items
  const { theme } = params

  const themes = {
    light: { section: 'bg-white', title: 'text-gray-900', text: 'text-gray-600' },
    gray: { section: 'bg-gray-50', title: 'text-gray-900', text: 'text-gray-600' },
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
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {items.map((item, i) => (
              <div key={i} className="text-center">
                {item.imgs?.[0] && (
                  <img
                    src={item.imgs[0].url || item.imgs[0].src}
                    alt={item.title || ''}
                    className="w-32 h-32 mx-auto mb-4 rounded-full object-cover"
                  />
                )}
                {item.title && <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>}
                {item.subtitle && <p className="text-primary text-sm">{item.subtitle}</p>}
                {item.paragraphs?.[0] && <P text={item.paragraphs[0]} className="text-gray-600 text-sm mt-2" />}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default Team
