/**
 * Publications — bibliography rendered through citestyle.
 *
 * Reads CSL-JSON items from `content.data.publications`, formats
 * them with citestyle's `formatAll(style, items)`, and renders the
 * structured output two ways:
 *
 *   - Preview: each entry's `html` is dropped into a SafeHtml
 *     paragraph with a hanging indent (semantic HTML with per-field
 *     CSS classes like .csl-author / .csl-title from citestyle).
 *
 *   - Docx: each entry's `text` is emitted as a Press <Paragraph>
 *     with data-style="bibliography", which the style pack in
 *     foundation/src/components/docx-style-pack.js defines as a
 *     hanging-indent paragraph style.
 *
 * citestyle and the pre-compiled style are both lazy-loaded via
 * dynamic import. The module-level cache ensures repeat renders
 * don't re-fetch a previously-loaded style — switching between
 * styles is instant after the first load.
 *
 * Slice 7: citation style and date range come from the download-
 * options hook. Changing the dropdown in the options panel
 * triggers a style swap (lazy-loaded the first time) and
 * re-renders this component, which re-registers its docx
 * fragment — idempotent, so the next compile() reflects the
 * new choice.
 */
import React, { useEffect, useMemo, useState } from 'react'
import { SafeHtml } from '@uniweb/kit'
import { useDocumentOutput } from '@uniweb/press'
import { H2 as DocxH2, Paragraph } from '@uniweb/press/docx'
import {
  useDocumentOptions,
  yearInRange,
} from '#components/document-options.jsx'

const SECTION_KEY = 'publications'

// Module-level cache so sibling renders and HMR reloads reuse the
// same loaded style module instead of triggering a second import.
const styleCache = new Map()

async function loadStyle(styleName) {
  if (styleCache.has(styleName)) return styleCache.get(styleName)

  const [{ formatAll }, styleModule] = await Promise.all([
    import('citestyle'),
    import(/* @vite-ignore */ `citestyle/styles/${styleName}`),
  ])
  const payload = { formatAll, style: styleModule }
  styleCache.set(styleName, payload)
  return payload
}

/**
 * Extract the year from a CSL-JSON publication's `issued.date-parts`.
 * Returns `null` if the publication has no year information so the
 * date-range filter treats it as unbounded.
 */
function publicationYear(item) {
  const dp = item?.issued?.['date-parts']
  if (!Array.isArray(dp) || !Array.isArray(dp[0])) return null
  const y = dp[0][0]
  return typeof y === 'number' ? y : null
}

export default function Publications({ content, block }) {
  const [options] = useDocumentOptions()
  const { dateRange, citationStyle, includedSections } = options
  const sectionIncluded = includedSections[SECTION_KEY] !== false

  const profile = content?.data?.profile?.[0] || {}
  const rawItems = profile.publications || []

  // Filter by date range before handing to citestyle. Publications
  // with no year slip through (treated as unbounded so they aren't
  // silently dropped from reports that happen to use date filters).
  const items = useMemo(
    () =>
      rawItems.filter((item) => yearInRange(publicationYear(item), dateRange)),
    [rawItems, dateRange],
  )

  const [state, setState] = useState({ loading: true, entries: [] })

  useEffect(() => {
    let cancelled = false
    if (!sectionIncluded || !items.length) {
      setState({ loading: false, entries: [] })
      return
    }

    loadStyle(citationStyle)
      .then(({ formatAll, style }) => {
        if (cancelled) return
        try {
          const formatted = formatAll(style, items)
          setState({ loading: false, entries: formatted })
        } catch (err) {
          // eslint-disable-next-line no-console
          console.error('Publications: formatAll failed', err)
          if (!cancelled) setState({ loading: false, entries: [] })
        }
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.error('Publications: failed to load citestyle', err)
        if (!cancelled) setState({ loading: false, entries: [] })
      })

    return () => {
      cancelled = true
    }
  }, [items, citationStyle, sectionIncluded])

  const heading = content?.title || 'Publications'
  const { loading, entries } = state

  // Registration is always called (hook rules) but we pass an empty
  // fragment when the section is excluded. Press's registration is
  // idempotent and handles zero-length fragments cleanly.
  useDocumentOutput(
    block,
    'docx',
    sectionIncluded ? (
      <>
        <DocxH2 data={heading} data-pagebreakbefore="true" data-spacing-before={480} data-spacing-after={120} />
        {entries.map((entry) => (
          <Paragraph
            key={entry.id || entry.text}
            data={entry.text}
            data-style="bibliography"
            data-spacing-after={80}
          />
        ))}
      </>
    ) : (
      <></>
    ),
  )

  if (!sectionIncluded) return null

  const styleLabel = citationStyle.toUpperCase().replace(/-/g, ' ')

  return (
    <div className="max-w-3xl mx-auto py-12">
      <h2 className="text-heading text-3xl font-bold mb-8">{heading}</h2>

      {loading && <p className="text-subtle italic">Loading references…</p>}

      {!loading && entries.length === 0 && rawItems.length > 0 && (
        <p className="text-subtle italic">
          No publications match the current date range.
        </p>
      )}

      {!loading && entries.length === 0 && rawItems.length === 0 && (
        <p className="text-subtle italic">No publications to display.</p>
      )}

      {!loading && entries.length > 0 && (
        <ol className="space-y-3 list-decimal list-outside pl-6 marker:text-subtle">
          {entries.map((entry) => (
            <li key={entry.id || entry.text}>
              <SafeHtml
                as="div"
                className="csl-entry-wrapper leading-relaxed text-body"
                value={entry.html}
              />
            </li>
          ))}
        </ol>
      )}

      <p className="mt-6 text-xs uppercase tracking-wide text-subtle">
        Formatted via citestyle · {styleLabel}
        {(dateRange.start != null || dateRange.end != null) && (
          <>
            {' · '}
            {entries.length} of {rawItems.length} publications
          </>
        )}
      </p>
    </div>
  )
}
