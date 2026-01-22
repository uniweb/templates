import React from 'react'
import { Link, cn } from '@uniweb/kit'

export function Pricing({ content, params }) {
  // Runtime guarantees: content.main.header/body exist, params have defaults from meta.js
  const { title } = content.main.header
  const { paragraphs } = content.main.body
  const { theme } = params

  // Extract pricing tiers from semantic groups (H3 patterns)
  const tiers = content.items

  const themeStyles = {
    light: 'bg-gray-50',
    white: 'bg-white',
    dark: 'bg-gray-900 text-white',
  }

  const cardStyles = {
    light: 'bg-white shadow-lg',
    white: 'bg-gray-50',
    dark: 'bg-gray-800',
  }

  const descStyles = {
    light: 'text-gray-600',
    white: 'text-gray-600',
    dark: 'text-gray-400',
  }

  return (
    <section className={cn('py-20 px-6', themeStyles[theme])}>
      <div className="max-w-6xl mx-auto">
        {(title || paragraphs[0]) && (
          <div className="text-center mb-16">
            {title && (
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
            )}
            {paragraphs[0] && (
              <p className={cn('text-lg max-w-2xl mx-auto', descStyles[theme])}>
                {paragraphs[0]}
              </p>
            )}
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-8">
          {tiers.map((tier, index) => {
            const tierTitle = tier.header?.title
            const tierDesc = tier.body?.paragraphs?.[0]
            const features = tier.body?.lists?.[0] || []
            const link = tier.body?.links?.[0]
            const isPopular = index === 1 // Middle tier is popular

            return (
              <div
                key={index}
                className={cn(
                  'rounded-2xl p-8',
                  cardStyles[theme],
                  isPopular && 'ring-2 ring-primary scale-105'
                )}
              >
                {isPopular && (
                  <div className="text-center mb-4">
                    <span className="bg-primary text-white text-sm font-semibold px-3 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}
                {tierTitle && (
                  <h3 className="text-2xl font-bold text-center mb-2">{tierTitle}</h3>
                )}
                {tierDesc && (
                  <p className={cn('text-center mb-6', descStyles[theme])}>{tierDesc}</p>
                )}

                {features.length > 0 && (
                  <ul className="space-y-3 mb-8">
                    {features.map((feature, i) => {
                      // List items from semantic parser are objects with paragraphs array
                      const featureText = typeof feature === 'string'
                        ? feature
                        : feature?.paragraphs?.[0] || ''
                      return (
                        <li key={i} className="flex items-start gap-3">
                          <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className={descStyles[theme]}>{featureText}</span>
                        </li>
                      )
                    })}
                  </ul>
                )}

                {link && (
                  <Link
                    href={link.href}
                    className={cn(
                      'block w-full py-3 text-center font-semibold rounded-lg transition-colors',
                      isPopular
                        ? 'bg-primary text-white hover:bg-blue-700'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    )}
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Pricing
