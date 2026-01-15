import React from 'react'

export function Features({ content, params }) {
  const { title } = content.main?.header || {}
  const { paragraphs = [] } = content.main?.body || {}
  const { columns = 3, theme = 'light' } = params || {}

  // Extract features from subsections
  const features = content.subsections || []

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

  const descStyles = {
    light: 'text-gray-600',
    gray: 'text-gray-600',
    dark: 'text-gray-400',
  }

  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
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
              <p className={`text-lg max-w-2xl mx-auto ${descStyles[theme]}`}>
                {paragraphs[0]}
              </p>
            )}
          </div>
        )}

        <div className={`grid gap-8 ${gridCols[columns] || 'md:grid-cols-3'}`}>
          {features.map((feature, index) => {
            const featureTitle = feature.header?.title
            const featureDesc = feature.body?.paragraphs?.[0]

            return (
              <div
                key={index}
                className={`p-6 rounded-xl ${cardStyles[theme]}`}
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                {featureTitle && (
                  <h3 className="text-xl font-semibold mb-2">{featureTitle}</h3>
                )}
                {featureDesc && (
                  <p className={descStyles[theme]}>{featureDesc}</p>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Features
