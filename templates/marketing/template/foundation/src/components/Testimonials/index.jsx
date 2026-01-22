import React from 'react'

export function Testimonials({ content, params }) {
  // Runtime guarantees: content.main.header/body exist, params have defaults from meta.js
  const { title } = content.main.header
  const { paragraphs } = content.main.body
  const { theme, columns } = params

  // Extract testimonials from semantic groups (H3 patterns)
  const testimonials = content.items

  const themeStyles = {
    light: 'bg-white',
    gray: 'bg-gray-50',
    dark: 'bg-gray-900 text-white',
  }

  const cardStyles = {
    light: 'bg-gray-50',
    gray: 'bg-white shadow-sm',
    dark: 'bg-gray-800',
  }

  const quoteStyles = {
    light: 'text-gray-700',
    gray: 'text-gray-700',
    dark: 'text-gray-300',
  }

  const nameStyles = {
    light: 'text-gray-900',
    gray: 'text-gray-900',
    dark: 'text-white',
  }

  const roleStyles = {
    light: 'text-gray-500',
    gray: 'text-gray-500',
    dark: 'text-gray-400',
  }

  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
  }

  return (
    <section className={`py-20 px-6 ${themeStyles[theme]}`}>
      <div className="max-w-6xl mx-auto">
        {(title || paragraphs[0]) && (
          <div className="text-center mb-16">
            {title && (
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
            )}
            {paragraphs[0] && (
              <p className={`text-lg max-w-2xl mx-auto ${roleStyles[theme]}`}>
                {paragraphs[0]}
              </p>
            )}
          </div>
        )}

        <div className={`grid gap-8 ${gridCols[columns] || 'md:grid-cols-3'}`}>
          {testimonials.map((testimonial, index) => {
            const name = testimonial.header?.title
            const quote = testimonial.body?.paragraphs?.[0]
            const role = testimonial.body?.paragraphs?.[1]

            return (
              <div
                key={index}
                className={`p-6 rounded-xl ${cardStyles[theme]}`}
              >
                <svg className="w-8 h-8 text-primary/30 mb-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                {quote && (
                  <p className={`text-lg mb-4 ${quoteStyles[theme]}`}>"{quote}"</p>
                )}
                <div>
                  {name && (
                    <p className={`font-semibold ${nameStyles[theme]}`}>{name}</p>
                  )}
                  {role && (
                    <p className={`text-sm ${roleStyles[theme]}`}>{role}</p>
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
