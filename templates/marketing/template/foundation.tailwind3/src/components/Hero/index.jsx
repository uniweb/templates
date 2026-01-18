import React from 'react'
import { H1, P, Link, cn } from '@uniweb/kit'

/**
 * Hero Component
 *
 * A modern hero section with multiple layout options, glassmorphism effects,
 * and support for eyebrow text (kicker).
 *
 * Layouts:
 * - center: Centered content (default)
 * - left: Left-aligned content
 * - split-right: Content left, image right
 * - split-left: Image left, content right
 *
 * Themes:
 * - gradient: Primary gradient background
 * - glass: Glassmorphism with subtle background
 * - dark: Dark background
 * - light: Light background
 */
export function Hero({ content, params }) {
  const { title, pretitle, subtitle } = content.main?.header || {}
  const { paragraphs = [], links = [], imgs = [] } = content.main?.body || {}
  const {
    theme = 'gradient',
    layout = 'center',
    showPattern = true,
  } = params || {}

  const cta = links[0]
  const secondaryCta = links[1]
  const heroImage = imgs[0]
  const description = paragraphs[0]

  // Check if layout is split
  const isSplit = layout === 'split-left' || layout === 'split-right'
  const isImageLeft = layout === 'split-left'

  // Theme configurations
  const themes = {
    gradient: {
      section: 'bg-gradient-to-br from-primary via-blue-600 to-indigo-700 text-white',
      eyebrow: 'bg-white/20 text-white backdrop-blur-sm border border-white/20',
      description: 'text-blue-100',
      primaryBtn: 'bg-white text-primary hover:bg-blue-50 shadow-lg shadow-blue-900/20',
      secondaryBtn: 'border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm',
      pattern: 'opacity-10',
    },
    glass: {
      section: 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white',
      eyebrow: 'bg-primary/20 text-primary-200 backdrop-blur-sm border border-primary/30',
      description: 'text-slate-300',
      primaryBtn: 'bg-primary text-white hover:bg-blue-600 shadow-lg shadow-primary/30',
      secondaryBtn: 'border border-white/20 text-white hover:bg-white/10 backdrop-blur-sm',
      pattern: 'opacity-5',
    },
    dark: {
      section: 'bg-gray-900 text-white',
      eyebrow: 'bg-primary/20 text-primary-300 border border-primary/30',
      description: 'text-gray-400',
      primaryBtn: 'bg-primary text-white hover:bg-blue-600',
      secondaryBtn: 'border-2 border-gray-700 text-gray-300 hover:bg-gray-800',
      pattern: 'opacity-5',
    },
    light: {
      section: 'bg-gray-50 text-gray-900',
      eyebrow: 'bg-primary/10 text-primary border border-primary/20',
      description: 'text-gray-600',
      primaryBtn: 'bg-primary text-white hover:bg-blue-700 shadow-lg shadow-primary/20',
      secondaryBtn: 'border-2 border-gray-300 text-gray-700 hover:bg-gray-100',
      pattern: 'opacity-[0.03]',
    },
  }

  const t = themes[theme] || themes.gradient

  // Layout configurations
  const getContentAlignment = () => {
    if (isSplit) return 'text-left'
    return layout === 'left' ? 'text-left' : 'text-center'
  }

  const getButtonAlignment = () => {
    if (isSplit) return 'justify-start'
    return layout === 'left' ? 'justify-start' : 'justify-center'
  }

  // Content block
  const ContentBlock = () => (
    <div className={cn('relative z-10', getContentAlignment())}>
      {/* Eyebrow / Kicker */}
      {pretitle && (
        <span
          className={cn(
            'inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-6',
            t.eyebrow
          )}
        >
          {pretitle}
        </span>
      )}

      {/* Title */}
      {title && (
        <H1
          text={title}
          className={cn(
            'text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight tracking-tight',
            !isSplit && layout === 'center' && 'max-w-4xl mx-auto'
          )}
        />
      )}

      {/* Subtitle */}
      {subtitle && (
        <p className={cn('text-xl sm:text-2xl font-medium mb-4', t.description)}>
          {subtitle}
        </p>
      )}

      {/* Description */}
      {description && (
        <P
          text={description}
          className={cn(
            'text-lg sm:text-xl mb-10 leading-relaxed',
            t.description,
            !isSplit && layout === 'center' && 'max-w-2xl mx-auto'
          )}
        />
      )}

      {/* CTAs */}
      {(cta || secondaryCta) && (
        <div className={cn('flex gap-4 flex-wrap', getButtonAlignment())}>
          {cta && (
            <Link
              href={cta.href}
              className={cn(
                'inline-flex items-center px-8 py-4 font-semibold rounded-xl transition-all duration-200',
                t.primaryBtn
              )}
            >
              {cta.label}
              <svg
                className="ml-2 w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          )}
          {secondaryCta && (
            <Link
              href={secondaryCta.href}
              className={cn(
                'inline-flex items-center px-8 py-4 font-semibold rounded-xl transition-all duration-200',
                t.secondaryBtn
              )}
            >
              {secondaryCta.label}
            </Link>
          )}
        </div>
      )}
    </div>
  )

  // Image block for split layouts
  const ImageBlock = () => {
    if (!heroImage) return null
    return (
      <div className="relative">
        {/* Glassmorphism card behind image */}
        <div className="absolute -inset-4 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20" />
        <img
          src={heroImage.url || heroImage.src}
          alt={heroImage.alt || title || ''}
          className="relative rounded-2xl shadow-2xl w-full object-cover"
        />
      </div>
    )
  }

  return (
    <section className={cn('relative overflow-hidden py-20 sm:py-28 lg:py-32 px-6', t.section)}>
      {/* Background Pattern */}
      {showPattern && (
        <div className={cn('absolute inset-0 pointer-events-none', t.pattern)}>
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="hero-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-grid)" />
          </svg>
        </div>
      )}

      {/* Gradient Orbs for glass theme */}
      {theme === 'glass' && (
        <>
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" />
        </>
      )}

      <div className="relative max-w-7xl mx-auto">
        {isSplit ? (
          // Split layout
          <div
            className={cn(
              'grid lg:grid-cols-2 gap-12 lg:gap-16 items-center',
              isImageLeft && 'lg:grid-flow-col-dense'
            )}
          >
            <div className={isImageLeft ? 'lg:col-start-2' : ''}>
              <ContentBlock />
            </div>
            <div className={isImageLeft ? 'lg:col-start-1' : ''}>
              <ImageBlock />
            </div>
          </div>
        ) : (
          // Centered or left layout
          <div className={cn(layout === 'center' ? 'max-w-4xl mx-auto' : 'max-w-3xl')}>
            <ContentBlock />
            {heroImage && (
              <div className="mt-12 relative">
                <div className="absolute -inset-4 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20" />
                <img
                  src={heroImage.url || heroImage.src}
                  alt={heroImage.alt || title || ''}
                  className="relative rounded-2xl shadow-2xl w-full object-cover"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}

export default Hero
