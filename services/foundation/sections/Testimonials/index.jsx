import React from 'react'
import { H2, P, Span, useGridLayout } from '@uniweb/kit'

export default function Testimonials({ content, params }) {
  const { title, items } = content
  const gridClass = useGridLayout(params.columns, { gap: 6 })

  return (
    <div className="max-w-[var(--max-content-width)] mx-auto px-6 py-[var(--section-padding-y)]">
      {title && (
        <H2 text={title} className="text-3xl sm:text-4xl font-bold text-heading mb-10" />
      )}

      <div className={gridClass}>
        {items.map((item, i) => (
          <figure key={i} className="bg-card border border-border rounded-2xl p-6 m-0">
            {item.paragraphs?.[0] && (
              <blockquote className="m-0">
                <P text={item.paragraphs[0]} className="text-body italic" />
              </blockquote>
            )}
            {item.title && (
              <figcaption className="mt-4 text-sm font-semibold text-heading">
                <Span text={item.title} />
                {item.subtitle && (
                  <span className="block font-normal text-subtle">{item.subtitle}</span>
                )}
              </figcaption>
            )}
          </figure>
        ))}
      </div>
    </div>
  )
}
