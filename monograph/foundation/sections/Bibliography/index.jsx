/**
 * Bibliography — citestyle-formatted reference list.
 *
 * Reads CSL-JSON items from `content.data.monograph[0].references`,
 * formats them with citestyle's formatAll(style, items), and renders
 * the structured output two ways:
 *
 *   - Preview: each entry's `html` is dropped into a SafeHtml element
 *     inside an ordered list (with CSS markers).
 *   - Docx: each entry's `text` becomes a <Paragraph data-style="bibliography">
 *     which the style pack formats as a hanging-indent paragraph.
 *
 * Both citestyle and the per-style module are lazy-loaded. A
 * module-level cache keeps repeat renders fast when the reader
 * toggles between styles in the options panel.
 */
import React, { useEffect, useState } from 'react'
import { SafeHtml } from '@uniweb/kit'
import { useDocumentOutput } from '@uniweb/press'
import { Paragraph } from '@uniweb/press/docx'
import { useDocumentOptions } from '#components/document-options.jsx'
import { SP } from '#utils/docx-spacing.js'

const CHAPTER_KEY = 'bibliography'

// Static loaders — one per style — so Vite can pre-bundle the
// citestyle subpath exports. A template-literal import with a variable
// segment isn't analysable by Vite, which leaves the bare specifier
// to reach the browser where it fails to resolve.
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

export default function Bibliography({ content, block }) {
  const [options] = useDocumentOptions()
  const chapterIncluded =
    options.includedChapters[CHAPTER_KEY] !== false

  const rawItems = content?.data?.monograph?.[0]?.references || []
  // Stable string key for the effect deps — list identity may change every
  // render even when contents don't (runtime rebuilds parsedContent).
  const refsKey = rawItems.map((r) => r.id || r.text).join('|')

  const [state, setState] = useState({ loading: true, entries: [] })

  useEffect(() => {
    let cancelled = false
    if (!chapterIncluded || !rawItems.length) {
      setState({ loading: false, entries: [] })
      return
    }
    loadStyle(options.citationStyle)
      .then(({ formatAll, style }) => {
        if (cancelled) return
        try {
          const formatted = formatAll(style, rawItems)
          setState({ loading: false, entries: formatted })
        } catch (err) {
          // eslint-disable-next-line no-console
          console.error('Bibliography: formatAll failed', err)
          if (!cancelled) setState({ loading: false, entries: [] })
        }
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.error('Bibliography: failed to load citestyle', err)
        if (!cancelled) setState({ loading: false, entries: [] })
      })
    return () => {
      cancelled = true
    }
    // rawItems intentionally not in deps — refsKey is the stable signal
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refsKey, options.citationStyle, chapterIncluded])

  const heading = content?.title || 'References'
  const { loading, entries } = state
  const styleLabel = options.citationStyle.toUpperCase().replace(/-/g, ' ')

  useDocumentOutput(
    block,
    'docx',
    chapterIncluded ? (
      <>
        <Paragraph
          as="h1"
          data={heading}
          className="chapter-title"
          data-heading="HEADING_1"
          data-numbering-reference="heading-numbering"
          data-numbering-level={0}
          data-page-break-before="true"
          data-spacing-before={SP.chapterBefore}
          data-spacing-after={SP.chapterAfter}
        />
        {entries.map((entry) => (
          <Paragraph
            key={entry.id || entry.text}
            data={entry.text}
            data-style="bibliography"
            data-spacing-after={SP.bibEntryAfter}
          />
        ))}
      </>
    ) : (
      <></>
    ),
  )

  if (!chapterIncluded) return null

  return (
    <section className="chapter">
      <h1 className="chapter-title">{heading}</h1>

      {loading && (
        <p className="chapter-body mono-narrow text-subtle italic">
          Loading references…
        </p>
      )}

      {!loading && entries.length === 0 && (
        <p className="chapter-body mono-narrow text-subtle italic">
          No references to display.
        </p>
      )}

      {!loading && entries.length > 0 && (
        <ol className="bibliography-entries">
          {entries.map((entry) => (
            <li key={entry.id || entry.text}>
              <SafeHtml
                as="div"
                className="csl-entry-wrapper"
                value={entry.html}
              />
            </li>
          ))}
        </ol>
      )}

      {!loading && entries.length > 0 && (
        <p className="bibliography-meta">
          Formatted via citestyle · {styleLabel}
        </p>
      )}
    </section>
  )
}
