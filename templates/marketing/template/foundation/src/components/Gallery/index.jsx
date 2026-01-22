import React from 'react'
import { cn, Image } from '@uniweb/kit'

/**
 * Gallery Component
 *
 * Display images in various grid layouts.
 * Images come from markdown ![alt](url) syntax.
 */
export function Gallery({ content, params }) {
  // Runtime guarantees: content.main.header/body exist, params have defaults from meta.js
  const { title } = content.main.header
  const { paragraphs, imgs } = content.main.body
  const { theme, layout, columns } = params

  const themes = {
    light: {
      section: 'bg-white',
      title: 'text-gray-900',
      description: 'text-gray-600',
      caption: 'text-gray-600',
    },
    gray: {
      section: 'bg-gray-50',
      title: 'text-gray-900',
      description: 'text-gray-600',
      caption: 'text-gray-600',
    },
    dark: {
      section: 'bg-gray-900',
      title: 'text-white',
      description: 'text-gray-400',
      caption: 'text-gray-400',
    },
  }

  const t = themes[theme] || themes.light

  const gridCols = {
    2: 'sm:grid-cols-2',
    3: 'sm:grid-cols-2 lg:grid-cols-3',
    4: 'sm:grid-cols-2 lg:grid-cols-4',
  }

  // Masonry layout uses CSS columns
  const masonryCols = {
    2: 'sm:columns-2',
    3: 'sm:columns-2 lg:columns-3',
    4: 'sm:columns-2 lg:columns-4',
  }

  return (
    <section className={cn('py-16 px-6', t.section)}>
      <div className="max-w-6xl mx-auto">
        {(title || paragraphs[0]) && (
          <div className="text-center mb-12">
            {title && (
              <h2 className={cn('text-3xl font-bold mb-4', t.title)}>
                {title}
              </h2>
            )}
            {paragraphs[0] && (
              <p className={cn('text-lg max-w-2xl mx-auto', t.description)}>
                {paragraphs[0]}
              </p>
            )}
          </div>
        )}

        {layout === 'masonry' ? (
          // Masonry layout using CSS columns
          <div className={cn('gap-4', masonryCols[columns] || 'sm:columns-3')}>
            {imgs.map((img, index) => (
              <div key={index} className="break-inside-avoid mb-4">
                <div className="relative group overflow-hidden rounded-xl">
                  <img
                    src={img.url || img.src}
                    alt={img.alt || ''}
                    className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {img.alt && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="absolute bottom-4 left-4 right-4 text-white text-sm">
                        {img.alt}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : layout === 'carousel' ? (
          // Horizontal scrolling carousel
          <div className="overflow-x-auto pb-4 -mx-6 px-6 scrollbar-thin scrollbar-thumb-gray-300">
            <div className="flex gap-4" style={{ width: 'max-content' }}>
              {imgs.map((img, index) => (
                <div
                  key={index}
                  className="w-80 flex-shrink-0 group relative overflow-hidden rounded-xl"
                >
                  <img
                    src={img.url || img.src}
                    alt={img.alt || ''}
                    className="w-full h-60 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {img.alt && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="absolute bottom-4 left-4 right-4 text-white text-sm">
                        {img.alt}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          // Standard grid layout
          <div className={cn('grid gap-4', gridCols[columns] || 'sm:grid-cols-3')}>
            {imgs.map((img, index) => (
              <div
                key={index}
                className="relative group overflow-hidden rounded-xl aspect-video"
              >
                <img
                  src={img.url || img.src}
                  alt={img.alt || ''}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {img.alt && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="absolute bottom-4 left-4 right-4 text-white text-sm">
                      {img.alt}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default Gallery
