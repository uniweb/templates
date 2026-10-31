import React from 'react'
import { cn, H2, H3, P } from '@uniweb/kit'

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
      <section className="py-12 px-6 overflow-x-auto">
        <div className="max-w-6xl mx-auto">
          {title && (
            <H2 text={title} className="text-2xl font-bold text-heading mb-8" />
          )}

          <div className="relative min-w-max">
            {showLine && (
              <div className="absolute top-6 left-0 right-0 h-0.5 bg-muted" />
            )}

            <div className="flex gap-8">
              {parsedEntries.map((entry, i) => (
                <div key={i} className="relative flex flex-col items-center w-48">
                  <div className="w-3 h-3 rounded-full bg-primary z-10 mb-4" />

                  {entry.date && (
                    <P text={entry.date} className="text-sm font-medium text-primary mb-2" />
                  )}

                  <H3 text={entry.title} className="text-base font-semibold text-heading text-center" />

                  {entry.institution && (
                    <P text={entry.institution} className="text-sm text-body text-center mt-1" />
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
    <section className="py-12 px-6">
      <div className="max-w-3xl mx-auto">
        {(title || paragraphs[0]) && (
          <div className="mb-8">
            {title && (
              <H2 text={title} className="text-2xl font-bold text-heading mb-2" />
            )}
            {paragraphs[0] && (
              <P text={paragraphs[0]} className="text-body" />
            )}
          </div>
        )}

        <div className={cn('relative', showLine && 'pl-10 border-l-2 border-border')}>
          {parsedEntries.map((entry, i) => (
            <div key={i} className={cn('relative pb-8 last:pb-0', datePosition === 'inline' && 'flex gap-4')}>
              {showLine && (
                <div className="absolute -left-[17px] top-1.5 w-4 h-4 rounded-full bg-section border-2 border-primary" />
              )}

              {datePosition === 'left' && entry.date && (
                <P text={entry.date} className="text-sm font-medium text-primary mb-1" />
              )}

              {datePosition === 'inline' && entry.date && (
                <P text={entry.date} className="text-sm font-medium text-primary w-auto min-w-[6rem] flex-shrink-0 pt-0.5" />
              )}

              <div className={datePosition === 'inline' ? 'flex-1' : ''}>
                <H3 text={entry.title} className="text-lg font-semibold text-heading" />

                {entry.institution && (
                  <P text={entry.institution} className="text-body mt-1" />
                )}

                {entry.description && (
                  <P text={entry.description} className="text-sm text-subtle mt-2" />
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
