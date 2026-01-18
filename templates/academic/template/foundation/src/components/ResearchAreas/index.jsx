import React from 'react'
import { cn, Link } from '@uniweb/kit'

/**
 * ResearchAreas Component
 *
 * Display research focus areas, topics, or expertise.
 * Each subsection represents a research area with description.
 */
export function ResearchAreas({ content, params }) {
  const { title } = content.main?.header || {}
  const { paragraphs = [] } = content.main?.body || {}
  const {
    layout = 'cards',
    showNumbers = false,
    accentPosition = 'left',
  } = params || {}

  const areas = content.subsections || []

  const layouts = {
    cards: {
      container: 'grid gap-6 md:grid-cols-2 lg:grid-cols-3',
      item: 'bg-slate-50 p-6 rounded-xl hover:shadow-md transition-shadow',
      title: 'text-lg font-semibold text-slate-900 mb-2',
      description: 'text-slate-600 text-sm',
    },
    list: {
      container: 'space-y-6',
      item: 'flex gap-4',
      title: 'text-lg font-semibold text-slate-900',
      description: 'text-slate-600',
    },
    compact: {
      container: 'flex flex-wrap gap-3',
      item: 'px-4 py-2 bg-primary/10 rounded-full',
      title: 'text-sm font-medium text-primary',
      description: '', // Not shown in compact
    },
  }

  const l = layouts[layout] || layouts.cards

  return (
    <section className="py-12 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        {(title || paragraphs[0]) && (
          <div className="mb-8">
            {title && (
              <h2 className="text-2xl font-bold text-slate-900 mb-2">{title}</h2>
            )}
            {paragraphs[0] && (
              <p className="text-slate-600 max-w-2xl">{paragraphs[0]}</p>
            )}
          </div>
        )}

        <div className={l.container}>
          {areas.map((area, index) => {
            const areaTitle = area.header?.title
            const areaDesc = area.body?.paragraphs?.[0]
            const areaLinks = area.body?.links || []

            if (layout === 'compact') {
              return (
                <div key={index} className={l.item}>
                  <span className={l.title}>{areaTitle}</span>
                </div>
              )
            }

            return (
              <div key={index} className={cn(l.item, layout === 'list' && 'items-start')}>
                {showNumbers && layout === 'list' && (
                  <div className={cn(
                    'flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold',
                    'bg-primary text-white'
                  )}>
                    {index + 1}
                  </div>
                )}

                {layout === 'cards' && accentPosition === 'left' && (
                  <div className="w-1 h-12 bg-primary rounded-full mb-3" />
                )}

                <div className="flex-1">
                  {layout === 'cards' && accentPosition === 'top' && (
                    <div className="w-12 h-1 bg-primary rounded-full mb-3" />
                  )}

                  <h3 className={l.title}>{areaTitle}</h3>

                  {areaDesc && (
                    <p className={l.description}>{areaDesc}</p>
                  )}

                  {areaLinks.length > 0 && (
                    <div className="mt-3">
                      {areaLinks.map((link, i) => (
                        <Link
                          key={i}
                          href={link.url}
                          className="text-sm text-primary hover:underline"
                        >
                          {link.text} →
                        </Link>
                      ))}
                    </div>
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

export default ResearchAreas
