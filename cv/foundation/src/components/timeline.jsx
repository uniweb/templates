/**
 * Shared helpers for timeline-style sections (Education, Employment,
 * Service, Awards, …).
 *
 * Each timeline entry has:
 *   - yearRange      — "1831" or "1831 – 1836"
 *   - primary        — degree, role, position title
 *   - secondary      — institution, organization
 *   - description    — one-paragraph summary (typically the item's excerpt)
 *
 * Two rendering functions are exported:
 *
 *   renderTimelinePreview(entries, { className })
 *       → React JSX for the visible preview, Kit-powered, theme-aware.
 *
 *   renderTimelineDocx(entries)
 *       → Press docx JSX for useDocumentOutput registration. Produces a
 *         flat sequence of paragraphs (heading + sub-heading + description)
 *         that the docx adapter will walk.
 *
 * The shape lives in foundation/src/components/ because it is specific
 * to this foundation's report structure. If it ever generalizes enough
 * to ship as a Press builder, it moves to @uniweb/press/docx.
 */

import React from 'react'
import { H3, P } from '@uniweb/kit'
import { H3 as DocxH3, Paragraph } from '@uniweb/press/docx'

/**
 * Normalize a collection item into a timeline entry.
 *
 * @param {Object} item - The raw collection item, as loaded from JSON.
 * @param {Object} opts
 * @param {string} opts.primaryField   - Field name for the primary heading (e.g., 'degree', 'role')
 * @param {string} opts.secondaryField - Field name for the secondary heading (e.g., 'institution', 'organization')
 */
export function itemToEntry(item, { primaryField, secondaryField }) {
  const start = item.start != null ? String(item.start) : ''
  const end = item.end != null ? String(item.end) : ''
  const yearRange =
    start && end ? (start === end ? start : `${start} – ${end}`) : start || end
  return {
    yearRange,
    primary: item[primaryField] || item.title || '',
    secondary: item[secondaryField] || '',
    description: item.excerpt || '',
    key: item.slug || item.id || item.title,
  }
}

/**
 * Render a list of entries as the visible React preview.
 */
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

/**
 * Render a list of entries as the Press docx fragment.
 *
 * Produces one H3 + up to two Paragraph elements per entry. The docx
 * version is flat text — no timeline line, no markers — because docx
 * rendering is typographic, not visual.
 */
export function renderTimelineDocx(entries) {
  return (
    <>
      {entries.map((entry, i) => (
        <React.Fragment key={entry.key || i}>
          {entry.primary && (
            <DocxH3
              data={
                entry.yearRange
                  ? `${entry.yearRange} — ${entry.primary}`
                  : entry.primary
              }
            />
          )}
          {entry.secondary && <Paragraph data={entry.secondary} />}
          {entry.description && <Paragraph data={entry.description} />}
        </React.Fragment>
      ))}
    </>
  )
}
