import React from 'react'
import { H2, H3, P, Icon, useGridLayout } from '@uniweb/kit'

export default function Services({ content, params }) {
  const { title, paragraphs, items } = content
  // Returns a class STRING, and `gap` is a Tailwind scale step (not a length).
  const gridClass = useGridLayout(params.columns, { gap: 8 })

  return (
    <div className="max-w-[var(--max-content-width)] mx-auto px-6 py-[var(--section-padding-y)]">
      <div className="max-w-2xl mb-12">
        {title && <H2 text={title} className="text-3xl sm:text-4xl font-bold text-heading mb-3" />}
        {paragraphs[0] && <P text={paragraphs[0]} className="text-lg text-subtle" />}
      </div>

      <div className={gridClass}>
        {items.map((item, i) => (
          <div key={i} className="bg-card border border-border rounded-2xl p-6">
            {item.icons?.[0] && (
              <div className="w-11 h-11 rounded-xl bg-primary-50 text-primary-700 flex items-center justify-center mb-4">
                <Icon {...item.icons[0]} size="22" />
              </div>
            )}
            {item.title && <H3 text={item.title} className="text-lg font-bold text-heading mb-2" />}
            {item.paragraphs?.[0] && <P text={item.paragraphs[0]} className="text-subtle" />}
          </div>
        ))}
      </div>
    </div>
  )
}
