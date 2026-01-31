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
  const { theme, layout, grayscale } = params

  const themes = {
    light: {
      section: 'bg-white',
      title: 'text-gray-900',
      description: 'text-gray-600',
      logo: grayscale ? 'grayscale opacity-60 hover:grayscale-0 hover:opacity-100' : '',
    },
    gray: {
      section: 'bg-gray-50',
      title: 'text-gray-900',
      description: 'text-gray-600',
      logo: grayscale ? 'grayscale opacity-60 hover:grayscale-0 hover:opacity-100' : '',
    },
    dark: {
      section: 'bg-gray-900',
      title: 'text-white',
      description: 'text-gray-400',
      logo: cn('brightness-0 invert', grayscale ? 'opacity-50 hover:opacity-100' : ''),
    },
  }

  const t = themes[theme] || themes.light

  // Map images to potentially have associated links
  const logos = imgs.map((img, i) => ({
    src: img.url || img.src,
    alt: img.alt || '',
    link: links[i]?.href,
  }))

  const LogoImage = ({ logo }) => (
    <img
      src={logo.src}
      alt={logo.alt}
      className={cn(
        'h-8 sm:h-10 w-auto max-w-[120px] object-contain transition-all duration-300',
        t.logo
      )}
    />
  )

  return (
    <section className={cn('py-12 px-6', t.section)}>
      <div className="max-w-6xl mx-auto">
        {(title || paragraphs[0]) && (
          <div className="text-center mb-10">
            {title && (
              <h2 className={cn('text-xl font-semibold mb-2', t.title)}>
                {title}
              </h2>
            )}
            {paragraphs[0] && (
              <p className={cn('text-sm', t.description)}>
                {paragraphs[0]}
              </p>
            )}
          </div>
        )}

        {layout === 'marquee' ? (
          // Infinite scrolling marquee
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
          // Grid layout
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
