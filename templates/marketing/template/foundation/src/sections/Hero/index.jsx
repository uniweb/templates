import React from 'react'
import { H1, P, Link, cn } from '@uniweb/kit'

/**
 * Hero Component
 *
 * A modern hero section with multiple layout options and support for
 * eyebrow text (kicker). Backgrounds (gradient, glass, image) are
 * controlled via frontmatter `background:` — this component handles
 * layout and content only.
 *
 * Layouts:
 * - center: Centered content (default)
 * - left: Left-aligned content
 * - split-right: Content left, image right
 * - split-left: Image left, content right
 */
function Hero({ content, params }) {
  // Runtime guarantees: content fields exist, params have defaults from meta.js
  const { title, pretitle, subtitle, paragraphs, links, imgs } = content
  const { layout, showPattern } = params

  const cta = links[0]
  const secondaryCta = links[1]
  const heroImage = imgs[0]
  const description = paragraphs[0]

  // Check if layout is split
  const isSplit = layout === 'split-left' || layout === 'split-right'
  const isImageLeft = layout === 'split-left'

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
          className="inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-6 bg-btn-primary/15 text-heading backdrop-blur-sm border border-btn-primary/20"
        >
          {pretitle}
        </span>
      )}

      {/* Title */}
      {title && (
        <H1
          text={title}
          className={cn(
            'text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight tracking-tight text-heading',
            !isSplit && layout === 'center' && 'max-w-4xl mx-auto'
          )}
        />
      )}

      {/* Subtitle */}
      {subtitle && (
        <p className="text-xl sm:text-2xl font-medium mb-4 text-muted">
          {subtitle}
        </p>
      )}

      {/* Description */}
      {description && (
        <P
          text={description}
          className={cn(
            'text-lg sm:text-xl mb-10 leading-relaxed text-muted',
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
              className="inline-flex items-center px-8 py-4 font-semibold rounded-xl transition-all duration-200 bg-btn-primary text-btn-primary-text hover:bg-btn-primary-hover shadow-lg"
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
              className="inline-flex items-center px-8 py-4 font-semibold rounded-xl transition-all duration-200 border-2 border-edge text-heading hover:bg-surface-subtle backdrop-blur-sm"
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
        <div className="absolute -inset-4 bg-surface/10 backdrop-blur-xl rounded-3xl border border-edge" />
        <img
          src={heroImage.url || heroImage.src}
          alt={heroImage.alt || title || ''}
          className="relative rounded-2xl shadow-2xl w-full object-cover"
        />
      </div>
    )
  }

  return (
    <section className="relative overflow-hidden py-20 sm:py-28 lg:py-32 px-6">
      {/* Background Pattern */}
      {showPattern && (
        <div className="absolute inset-0 pointer-events-none opacity-[0.07]">
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
                <div className="absolute -inset-4 bg-surface/10 backdrop-blur-xl rounded-3xl border border-edge" />
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
