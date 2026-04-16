/**
 * FigureGrid — a plates-style gallery of captioned images.
 *
 * Markdown usage (params only — content.title is optional):
 *
 *   ---
 *   type: FigureGrid
 *   chapterKey: plates
 *   plates:
 *     - src: /images/darwin-portrait.png
 *       alt: Charles Darwin, aged 31
 *       caption: 'Plate I. Portrait of the author, London 1840.'
 *       width: 480
 *       height: 560
 *       portrait: true
 *     - src: /images/galapagos-aerial.png
 *       alt: Aerial view of the islands
 *       caption: 'Plate II. Aerial view of the archipelago.'
 *   ---
 *   # Plates
 *
 * Single-tree pattern: the same JSX drives the web preview (CSS grid
 * via .fig-grid) and the compiled docx (grid div dissolves via
 * data-type="contentWrapper", images + captions flow in order).
 */
import React from 'react'
import { useDocumentOutput } from '@uniweb/press'
import { Paragraph, Figure as PressFigure } from '@uniweb/press/docx'
import { useDocumentOptions } from '#components/document-options.jsx'
import { SP } from '#utils/docx-spacing.js'

export default function FigureGrid({ content, block, params }) {
  const [options] = useDocumentOptions()
  const chapterKey = params?.chapterKey
  const chapterIncluded =
    !chapterKey || options.includedChapters[chapterKey] !== false
  const show = chapterIncluded && options.includeFigures

  const plates = Array.isArray(params?.plates) ? params.plates : []
  const heading = content?.title || ''

  const body = show && plates.length > 0 ? (
    <>
      {heading && (
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
      )}
      <div className="fig-grid" data-type="contentWrapper">
        {plates.map((plate, i) => (
          <PressFigure
            key={i}
            src={plate.src}
            alt={plate.alt || ''}
            width={Number(plate.width) || 420}
            height={Number(plate.height) || 260}
            caption={plate.caption || ''}
            className="fig"
            imgClassName={
              plate.portrait ? 'fig-img fig-img-portrait' : 'fig-img'
            }
            captionClassName="fig-caption"
            data-spacing-before={SP.figureBefore}
            data-spacing-after={SP.figureAfter}
          />
        ))}
      </div>
    </>
  ) : (
    <></>
  )

  useDocumentOutput(block, 'docx', body)

  if (!show || plates.length === 0) return null

  return <section className="chapter">{body}</section>
}
