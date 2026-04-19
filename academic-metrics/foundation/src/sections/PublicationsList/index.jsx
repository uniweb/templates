/**
 * PublicationsList — formatted bibliography across the filtered
 * member set.
 *
 * Unlike the Publications* aggregator sections (which count and chart),
 * this one renders a flat, sorted bibliography — the classic "list of
 * publications" academics expect in a report.
 *
 * Filters applied (order matters):
 *   1. Active query narrows the member set
 *   2. Date range + refereedOnly narrow each member's publications
 *   3. Result is sorted by year descending (most recent first)
 *
 * Formatting is delegated to citestyle. The active citation style is
 * read from report options; styles are lazy-imported per selection and
 * cached module-locally so switching stays fast.
 *
 * Preview: per-entry <SafeHtml> using citestyle's emitted HTML (with
 *          .csl-author, .csl-title, .csl-container classes already
 *          applied).
 * Xlsx: flat Year / Author / Citation rows.
 * Docx: hanging-indent paragraphs, one per entry. Requires the
 *       'bibliography' paragraph style to be declared on compile —
 *       the DownloadBar passes the style pack in slice-10 builds.
 */

import { useEffect, useState } from 'react'
import { SafeHtml } from '@uniweb/kit'
import { useDocumentOutput } from '@uniweb/press'
import { Paragraph } from '@uniweb/press/docx'
import {
  useReportOptions,
  useSectionIncluded,
  useFilteredMembers,
} from '#components/query-context.jsx'
import { collectPublications } from '#utils/publication-filters.js'
import { publicationsToCsl } from '#utils/to-csl.js'

const SECTION_KEY = 'publications-list'

// Static loaders so Vite can pre-bundle each style's subpath. A
// template-literal import with a variable segment isn't analysable
// and fails at runtime.
const STYLE_LOADERS = {
  apa: () => import('citestyle/styles/apa'),
  mla: () => import('citestyle/styles/mla'),
  'chicago-author-date': () => import('citestyle/styles/chicago-author-date'),
  ieee: () => import('citestyle/styles/ieee'),
  vancouver: () => import('citestyle/styles/vancouver'),
  harvard: () => import('citestyle/styles/harvard'),
  nature: () => import('citestyle/styles/nature'),
}

const styleCache = new Map()

async function loadStyle(styleName) {
  if (styleCache.has(styleName)) return styleCache.get(styleName)
  const loader = STYLE_LOADERS[styleName] || STYLE_LOADERS.apa
  const [{ formatAll }, styleModule] = await Promise.all([
    import('citestyle'),
    loader(),
  ])
  const payload = { formatAll, style: styleModule }
  styleCache.set(styleName, payload)
  return payload
}

export default function PublicationsList({ content, block }) {
  const included = useSectionIncluded(SECTION_KEY)
  const { members, activeLabel } = useFilteredMembers(content)
  const [reportOpts] = useReportOptions()
  const heading = content?.title || 'Publications'

  // Gather publications with author + apply filters, then sort.
  const items = [...collectPublications(members, reportOpts)].sort((a, b) => {
    const ay = Number(a.year) || 0
    const by = Number(b.year) || 0
    return by - ay
  })
  const cslItems = publicationsToCsl(items)

  // Stable dep key for the lazy-format effect — member/query/filter
  // changes should re-format, but equal-contents re-renders shouldn't.
  const itemsKey = cslItems.map((i) => i.id).join('|')

  const [state, setState] = useState({ loading: true, entries: [] })

  useEffect(() => {
    let cancelled = false
    if (!included || cslItems.length === 0) {
      setState({ loading: false, entries: [] })
      return
    }
    loadStyle(reportOpts.citationStyle)
      .then(({ formatAll, style }) => {
        if (cancelled) return
        try {
          setState({ loading: false, entries: formatAll(style, cslItems) })
        } catch (err) {
          // eslint-disable-next-line no-console
          console.error('PublicationsList: formatAll failed', err)
          if (!cancelled) setState({ loading: false, entries: [] })
        }
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.error('PublicationsList: style load failed', err)
        if (!cancelled) setState({ loading: false, entries: [] })
      })
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemsKey, reportOpts.citationStyle, included])

  const { loading, entries } = state

  // Xlsx: flat table. Year + Author + Citation text (no HTML). Keeps
  // the spreadsheet sort-friendly by putting year first.
  useDocumentOutput(
    block,
    'xlsx',
    included && entries.length > 0
      ? {
          title: 'Publications',
          headers: ['Year', 'Author', 'Citation'],
          data: entries.map((entry, i) => {
            const src = items[i]
            return [
              Number(src?.year) || null,
              src?._author || '',
              entry.text || '',
            ]
          }),
          columnWidths: [8, 24, 80],
          numberFormats: ['number', 'text', 'text'],
        }
      : null,
  )

  // Docx: bibliography paragraph style for hanging indent. The
  // DownloadBar passes a style pack with an id of 'bibliography' so
  // data-style="bibliography" renders as a 0.5" hanging-indent paragraph.
  useDocumentOutput(
    block,
    'docx',
    included && entries.length > 0 ? (
      <>
        <Paragraph
          as="h2"
          data={heading}
          data-heading="HEADING_2"
          data-spacing-before={240}
          data-spacing-after={160}
        />
        {entries.map((entry, i) => (
          <Paragraph
            key={entry.id || i}
            data={entry.text}
            data-style="bibliography"
            data-spacing-after={120}
          />
        ))}
      </>
    ) : null,
  )

  if (!included) return null

  const styleLabel = reportOpts.citationStyle.toUpperCase().replace(/-/g, ' ')

  return (
    <section className="chart-section">
      <h2 className="chart-title">{heading}</h2>
      {activeLabel && (
        <p className="chart-query-note">
          Across <em>{activeLabel}</em> ({members.length}{' '}
          {members.length === 1 ? 'member' : 'members'}).
        </p>
      )}

      {loading && (
        <p className="chart-empty">Loading citations…</p>
      )}

      {!loading && entries.length === 0 && (
        <p className="chart-empty">
          No publications match the current query + date range + refereed
          filter.
        </p>
      )}

      {!loading && entries.length > 0 && (
        <>
          <ol className="publications-list">
            {entries.map((entry, i) => (
              <li key={entry.id || i}>
                <SafeHtml
                  as="div"
                  className="csl-entry-wrapper"
                  value={entry.html}
                />
              </li>
            ))}
          </ol>
          <p className="publications-list-note">
            {entries.length}{' '}
            {entries.length === 1 ? 'entry' : 'entries'} · formatted via
            citestyle · {styleLabel}
          </p>
        </>
      )}
    </section>
  )
}
