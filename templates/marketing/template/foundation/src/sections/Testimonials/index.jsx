import React from 'react'
import { cn } from '@uniweb/kit'

function Testimonials({ content, params }) {
  // Runtime guarantees: content fields exist, params have defaults from meta.js
  const { title, paragraphs } = content
  const { columns } = params

  // Extract testimonials from semantic groups (H3 patterns)
  const testimonials = content.items

  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
  }

  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {(title || paragraphs[0]) && (
          <div className="text-center mb-16">
            {title && (
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-heading">{title}</h2>
            )}
            {paragraphs[0] && (
              <p className="text-lg max-w-2xl mx-auto text-muted">
                {paragraphs[0]}
              </p>
            )}
          </div>
        )}

        <div className={cn('grid gap-8', gridCols[columns] || 'md:grid-cols-3')}>
          {testimonials.map((testimonial, index) => {
            const name = testimonial.title
            const quote = testimonial.paragraphs?.[0]
            const role = testimonial.paragraphs?.[1]

            return (
              <div
                key={index}
                className="p-6 rounded-xl bg-gray-50"
              >
                <svg className="w-8 h-8 text-primary/30 mb-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                {quote && (
                  <p className="text-lg mb-4 text-body">"{quote}"</p>
                )}
                <div>
                  {name && (
                    <p className="font-semibold text-heading">{name}</p>
                  )}
                  {role && (
                    <p className="text-sm text-subtle">{role}</p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
