import React from 'react'
import { cn, Link } from '@uniweb/kit'

/**
 * LogoCloud Component
 *
 * Display a grid or carousel of partner/client logos.
 * Images from markdown become the logos.
 */
export function LogoCloud({ content, params }) {
  // Runtime guarantees: content fields exist, params have defaults from meta.js
  const { title, paragraphs, imgs, links } = content
  const { layout, grayscale } = params

  // Map images to potentially have associated links
  const logos = imgs.map((img, i) => ({
    src: img.url || img.src,
    alt: img.alt || '',
    link: links[i]?.href,
  }))

  const logoClasses = grayscale
    ? 'grayscale opacity-60 hover:grayscale-0 hover:opacity-100'
    : ''

  const LogoImage = ({ logo }) => (
    <img
      src={logo.src}
      alt={logo.alt}
      className={cn(
        'h-8 sm:h-10 w-auto max-w-[120px] object-contain transition-all duration-300',
        logoClasses
      )}
    />
  )

  return (
    <section className="py-12 px-6">
      <div className="max-w-6xl mx-auto">
        {(title || paragraphs[0]) && (
          <div className="text-center mb-10">
            {title && (
              <h2 className="text-xl font-semibold mb-2 text-heading">
                {title}
              </h2>
            )}
            {paragraphs[0] && (
              <p className="text-sm text-muted">
                {paragraphs[0]}
              </p>
            )}
          </div>
        )}

        {layout === 'marquee' ? (
          <div className="relative overflow-hidden">
            <div className="flex animate-marquee">
              {[...logos, ...logos].map((logo, index) => (
                <div key={index} className="flex-shrink-0 px-8">
                  {logo.link ? (
                    <Link href={logo.link}>
                      <LogoImage logo={logo} />
                    </Link>
                  ) : (
                    <LogoImage logo={logo} />
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
            {logos.map((logo, index) => (
              <div key={index}>
                {logo.link ? (
                  <Link href={logo.link}>
                    <LogoImage logo={logo} />
                  </Link>
                ) : (
                  <LogoImage logo={logo} />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default LogoCloud
