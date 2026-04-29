/**
 * FrontMatter — the cover / title page of the monograph.
 *
 * Reads title, subtitle, author, affiliation, date, abstract, and
 * (optionally) a portrait image URL from the section's frontmatter
 * params + the data collection. Produces one JSX tree that:
 *   - On screen: a centred cover with a portrait, title, subtitle,
 *     and an indented abstract paragraph.
 *   - In docx: a cover paragraph stack styled via "front-title",
 *     "front-subtitle", "front-meta", "front-abstract" from the
 *     style pack, followed by a page break before the first chapter.
 *
 * Respects the `includedChapters['front-matter']` toggle — when
 * disabled, registers an empty fragment and hides the visible cover.
 */
import React, { Fragment } from 'react'
import { useDocumentOutput } from '@uniweb/press'
import {
  Paragraph,
  TextRun,
  Image,
} from '@uniweb/press/docx'
import { useDocumentOptions } from '#components/document-options.jsx'
import { SP } from '#utils/docx-spacing.js'

const CHAPTER_KEY = 'front-matter'

export default function FrontMatter({ content, block, params }) {
  const [options] = useDocumentOptions()
  const chapterIncluded = options.includedChapters[CHAPTER_KEY] !== false

  const mono = content?.data?.monograph?.[0] || {}
  const {
    title: dataTitle,
    author,
    affiliation,
    date,
    abstract,
  } = mono

  // The section's own frontmatter can also carry title/subtitle;
  // fall through to the data collection.
  const title = content?.title || dataTitle || 'Monograph'
  const subtitle = content?.subtitle || ''
  const portraitUrl = params?.portrait || ''
  const showPortrait = portraitUrl && options.includeFigures

  const abstractParas = (abstract || '')
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean)

  const body = chapterIncluded ? (
    <>
      {showPortrait && (
        <Image
          data={{ url: portraitUrl, alt: author || '' }}
          width={220}
          height={245}
          className="front-matter-portrait"
        />
      )}
      <Paragraph
        as="h1"
        data={title}
        className="front-matter-title"
        data-style="front-title"
        data-spacing-before={SP.frontTitleBefore}
        data-spacing-after={SP.frontTitleAfter}
      />
      {subtitle && (
        <Paragraph
          as="p"
          data={subtitle}
          className="front-matter-subtitle"
          data-style="front-subtitle"
          data-spacing-after={SP.frontSubtitleAfter}
        />
      )}

      {(author || affiliation || date) && (
        <Paragraph
          className="front-matter-meta"
          data-style="front-meta"
          data-spacing-after={SP.frontMetaAfter}
        >
          {[author, affiliation, date]
            .filter(Boolean)
            .map((text, i, all) => (
              <Fragment key={i}>
                <TextRun>{text}</TextRun>
                {i < all.length - 1 ? <TextRun> · </TextRun> : null}
              </Fragment>
            ))}
        </Paragraph>
      )}

      {abstractParas.length > 0 && (
        <>
          <Paragraph
            className="front-matter-abstract-label"
            data-style="front-meta"
            data-spacing-before={SP.frontAbstractBefore}
            data-spacing-after={SP.frontMetaAfter}
            data={'Abstract'}
          />
          {abstractParas.map((p, i) => (
            <Paragraph
              key={i}
              data={p}
              className="front-matter-abstract"
              data-style="front-abstract"
              data-spacing-after={
                i === abstractParas.length - 1
                  ? SP.frontAbstractAfter
                  : SP.paraAfter
              }
            />
          ))}
        </>
      )}
    </>
  ) : (
    <></>
  )

  useDocumentOutput(block, 'docx', body)

  if (!chapterIncluded) return null

  return <div className="front-matter">{body}</div>
}
