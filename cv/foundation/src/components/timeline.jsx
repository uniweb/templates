import { Fragment } from 'react'
import { H3, P } from '@uniweb/kit'
import { H3 as DocxH3, Paragraph } from '@uniweb/press/docx'

export function itemToEntry(item, { primaryField, secondaryField }) {
  const start = item.start != null ? String(item.start) : ''
  const end = item.end != null ? String(item.end) : ''
  const yearRange =
    start && end ? (start === end ? start : `${start} – ${end}`) : start || end
  return {
    yearRange,
    primary: item[primaryField] || item.title || item.name || '',
    secondary: item[secondaryField] || '',
    description: item.description || item.excerpt || item.topic || '',
    key: item.slug || item.id || item.title || item.name,
  }
}

export function renderTimelinePreview(entries) {
  if (!entries.length) return null
  return (
    <ol className="mt-8 space-y-8 border-l-2 border-border pl-6">
      {entries.map((entry) => (
        <li key={entry.key} className="relative">
          <span
            aria-hidden="true"
            className="absolute -left-[29px] top-2 h-3 w-3 rounded-full bg-primary ring-4 ring-section"
          />
          {entry.yearRange && (
            <p className="text-sm font-mono uppercase tracking-wider text-subtle">
              {entry.yearRange}
            </p>
          )}
          {entry.primary && (
            <H3
              text={entry.primary}
              className="mt-1 text-heading text-xl font-semibold"
            />
          )}
          {entry.secondary && (
            <p className="italic text-subtle">{entry.secondary}</p>
          )}
          {entry.description && (
            <P
              text={entry.description}
              className="mt-2 text-body leading-relaxed"
            />
          )}
        </li>
      ))}
    </ol>
  )
}

export function renderTimelineDocx(entries) {
  return (
    <>
      {entries.map((entry, i) => (
        <Fragment key={entry.key || i}>
          {entry.primary && (
            <DocxH3
              data={
                entry.yearRange
                  ? `${entry.yearRange} — ${entry.primary}`
                  : entry.primary
              }
              data-spacing-before={200}
              data-spacing-after={40}
            />
          )}
          {entry.secondary && (
            <Paragraph data={entry.secondary} data-spacing-after={40} />
          )}
          {entry.description && (
            <Paragraph data={entry.description} data-spacing-after={60} />
          )}
        </Fragment>
      ))}
    </>
  )
}
