import React from 'react'
import { cn } from '@uniweb/kit'

/**
 * Timeline Component
 *
 * Academic career timeline - education, positions, awards.
 * Each item is a timeline entry with date and description.
 */
function Timeline({ content, params }) {
  const { title, paragraphs = [] } = content || {}
  const {
    orientation = 'vertical',
    showLine = true,
    datePosition = 'left',
  } = params || {}

  const entries = content.items || []

  // Parse entries
  const parsedEntries = entries.map(entry => {
    const { title: entryTitle, pretitle, paragraphs = [] } = entry || {}

    return {
      title: entryTitle,
      date: pretitle, // e.g., "2020-2024" or "2023"
      institution: paragraphs[0],
      description: paragraphs[1],
    }
  })

  if (orientation === 'horizontal') {
    return (
      <section className="py-12 px-6 bg-white overflow-x-auto">
        <div className="max-w-6xl mx-auto">
          {title && (
            <h2 className="text-2xl font-bold text-slate-900 mb-8">{title}</h2>
          )}

          <div className="relative min-w-max">
            {showLine && (
              <div className="absolute top-6 left-0 right-0 h-0.5 bg-slate-200" />
            )}

            <div className="flex gap-8">
              {parsedEntries.map((entry, i) => (
                <div key={i} className="relative flex flex-col items-center w-48">
                  <div className="w-3 h-3 rounded-full bg-primary z-10 mb-4" />

                  {entry.date && (
                    <p className="text-sm font-medium text-primary mb-2">{entry.date}</p>
                  )}

                  <h3 className="text-base font-semibold text-slate-900 text-center">
                    {entry.title}
                  </h3>

                  {entry.institution && (
                    <p className="text-sm text-slate-600 text-center mt-1">
                      {entry.institution}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  // Vertical timeline
  return (
    <section className="py-12 px-6 bg-white">
      <div className="max-w-3xl mx-auto">
        {(title || paragraphs[0]) && (
          <div className="mb-8">
            {title && (
              <h2 className="text-2xl font-bold text-slate-900 mb-2">{title}</h2>
            )}
            {paragraphs[0] && (
              <p className="text-slate-600">{paragraphs[0]}</p>
            )}
          </div>
        )}

        <div className={cn('relative', showLine && 'pl-8 border-l-2 border-slate-200')}>
          {parsedEntries.map((entry, i) => (
            <div key={i} className={cn('relative pb-8 last:pb-0', datePosition === 'inline' && 'flex gap-4')}>
              {showLine && (
                <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-white border-2 border-primary" />
              )}

              {datePosition === 'left' && entry.date && (
                <p className="text-sm font-medium text-primary mb-1">{entry.date}</p>
              )}

              {datePosition === 'inline' && entry.date && (
                <p className="text-sm font-medium text-primary w-24 flex-shrink-0 pt-0.5">
                  {entry.date}
                </p>
              )}

              <div className={datePosition === 'inline' ? 'flex-1' : ''}>
                <h3 className="text-lg font-semibold text-slate-900">{entry.title}</h3>

                {entry.institution && (
                  <p className="text-slate-600 mt-1">{entry.institution}</p>
                )}

                {entry.description && (
                  <p className="text-sm text-slate-500 mt-2">{entry.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Timeline
