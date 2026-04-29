/**
 * Figure — a section hosting a single captioned image.
 *
 * Markdown usage:
 *
 *   ---
 *   type: Figure
 *   src: /images/galapagos-aerial.png
 *   alt: Aerial view of the Galapagos
 *   width: 640
 *   height: 360
 *   portrait: false       # true applies the narrow-centred .fig-img-portrait style
 *   chapterKey: prologue  # chapter this figure belongs to (inclusion toggle)
 *   ---
 *   The caption paragraph goes in the body. Supports inline marks
 *   like *italic* and **bold**.
 *
 * Uses Press's <Figure> builder — emits data-type="contentWrapper" so
 * the docx sees image + caption as sibling section-level paragraphs.
 */
import React from 'react'
import { useDocumentOutput } from '@uniweb/press'
import { Figure as PressFigure } from '@uniweb/press/docx'
import { useDocumentOptions } from '#components/document-options.jsx'
import { SP } from '#utils/docx-spacing.js'

export default function Figure({ content, block, params }) {
  const [options] = useDocumentOptions()
  const chapterKey = params?.chapterKey
  const chapterIncluded =
    !chapterKey || options.includedChapters[chapterKey] !== false
  const show = chapterIncluded && options.includeFigures

  const src = params?.src || ''
  const alt = params?.alt || ''
  const width = Number(params?.width) || 560
  const height = Number(params?.height) || 360
  const portrait = Boolean(params?.portrait)

  // Caption is the first paragraph of body content.
  const caption =
    content?.paragraphs?.[0] ||
    content?.title ||
    ''

  const body = show && src ? (
    <PressFigure
      src={src}
      alt={alt}
      width={width}
      height={height}
      caption={caption}
      className="fig"
      imgClassName={portrait ? 'fig-img fig-img-portrait' : 'fig-img'}
      captionClassName="fig-caption"
      data-spacing-before={SP.figureBefore}
      data-spacing-after={SP.figureAfter}
    />
  ) : (
    <></>
  )

  useDocumentOutput(block, 'docx', body)

  if (!show || !src) return null

  return <section className="mono-narrow">{body}</section>
}
