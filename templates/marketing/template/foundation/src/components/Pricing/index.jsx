import React, { useState } from 'react'
import { Link, cn } from '@uniweb/kit'

export function Pricing({ content, params }) {
  // Runtime guarantees: content fields exist, params have defaults from meta.js
  const { title, paragraphs, items } = content
  const { theme, showToggle, defaultBilling, currency, annualDiscount } = params

  // Billing period state
  const [billing, setBilling] = useState(defaultBilling)

  // Get pricing data from tagged YAML or fall back to markdown items
  const pricingData = content.data?.pricing

  // Determine if we have structured data (with prices) or markdown items
  const hasStructuredData = pricingData && Array.isArray(pricingData) && pricingData.length > 0

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

  const toggleBgStyles = {
    light: 'bg-gray-200',
    white: 'bg-gray-200',
    dark: 'bg-gray-700',
  }

  // Format price for display
  const formatPrice = (price) => {
    if (price === 0) return 'Free'
    if (typeof price === 'string') return price
    return `${currency}${price}`
  }

  // Render billing toggle
  const renderToggle = () => {
    if (!showToggle || !hasStructuredData) return null

    return (
      <div className="flex items-center justify-center gap-4 mb-12">
        <span className={cn(
          'text-sm font-medium transition-colors',
          billing === 'monthly' ? (theme === 'dark' ? 'text-white' : 'text-gray-900') : descStyles[theme]
        )}>
          Monthly
        </span>
        <button
          onClick={() => setBilling(billing === 'monthly' ? 'annual' : 'monthly')}
          className={cn(
            'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
            billing === 'annual' ? 'bg-primary' : toggleBgStyles[theme]
          )}
          role="switch"
          aria-checked={billing === 'annual'}
        >
          <span
            className={cn(
              'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
              billing === 'annual' ? 'translate-x-6' : 'translate-x-1'
            )}
          />
        </button>
        <span className={cn(
          'text-sm font-medium transition-colors',
          billing === 'annual' ? (theme === 'dark' ? 'text-white' : 'text-gray-900') : descStyles[theme]
        )}>
          Annual
          {annualDiscount && (
            <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              {annualDiscount}
            </span>
          )}
        </span>
      </div>
    )
  }

  // Render a tier card from structured data
  const renderStructuredTier = (tier, index) => {
    const price = billing === 'annual' ? tier.annualPrice : tier.monthlyPrice
    const isPopular = tier.popular === true

    return (
      <div
        key={tier.name || index}
        className={cn(
          'rounded-2xl p-8 flex flex-col',
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
        <h3 className="text-2xl font-bold text-center mb-2">{tier.name}</h3>
        {tier.description && (
          <p className={cn('text-center mb-6', descStyles[theme])}>{tier.description}</p>
        )}

        {/* Price display */}
        <div className="text-center mb-6">
          <span className="text-4xl font-bold">{formatPrice(price)}</span>
          {price !== 0 && typeof price === 'number' && (
            <span className={cn('text-sm ml-1', descStyles[theme])}>
              /{billing === 'annual' ? 'year' : 'month'}
            </span>
          )}
        </div>

        {tier.features && tier.features.length > 0 && (
          <ul className="space-y-3 mb-8 flex-grow">
            {tier.features.map((feature, i) => (
              <li key={i} className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className={descStyles[theme]}>{feature}</span>
              </li>
            ))}
          </ul>
        )}

        {tier.cta && (
          <Link
            href={tier.cta.href || '#'}
            className={cn(
              'block w-full py-3 text-center font-semibold rounded-lg transition-colors mt-auto',
              isPopular
                ? 'bg-primary text-white hover:bg-blue-700'
                : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
            )}
          >
            {tier.cta.label || 'Get Started'}
          </Link>
        )}
      </div>
    )
  }

  // Render a tier card from markdown items (legacy support)
  const renderMarkdownTier = (tier, index) => {
    const tierTitle = tier.title
    const tierDesc = tier.paragraphs?.[0]
    const features = tier.lists?.[0] || []
    const link = tier.links?.[0]
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
  }

  return (
    <section className={cn('py-20 px-6', themeStyles[theme])}>
      <div className="max-w-6xl mx-auto">
        {(title || paragraphs[0]) && (
          <div className="text-center mb-12">
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

        {renderToggle()}

        <div className="grid md:grid-cols-3 gap-8">
          {hasStructuredData
            ? pricingData.map((tier, index) => renderStructuredTier(tier, index))
            : items.map((tier, index) => renderMarkdownTier(tier, index))
          }
        </div>
      </div>
    </section>
  )
}

export default Pricing
