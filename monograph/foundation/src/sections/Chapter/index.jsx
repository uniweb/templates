/**
 * Chapter — a numbered chapter with optional nested subsections.
 *
 * The markdown pattern:
 *
 *   ---
 *   type: Chapter
 *   key: zoology           # matches a key in includedChapters
 *   ---
 *   # Zoological observations
 *
 *   Opening paragraph, becomes content.title + content.paragraphs.
 *
 *   ## Giant tortoises
 *
 *   Subsection body. Each H2 produces one item in content.items,
 *   grouping the paragraphs after it.
 *
 *   ## The finches
 *
 *   More subsection prose.
 *
 * Numbering:
 *   - The chapter heading carries data-numbering-reference="heading-numbering"
 *     at level 0 (Word prints "1.", "2.", ... auto-incremented).
 *   - Subsection headings are level 1 ("1.1", "1.2", ...).
 *   - The web preview matches via CSS counters in styles.css.
 *
 * Lists (optional via the `lists` param in frontmatter):
 *   - Passing `lists: { bullets: ['...', '...'] }` or
 *     `lists: { observations: ['...', '...'] }` injects a BulletList or
 *     NumberedList at the end of the chapter body. Foundation-specific
 *     styling wraps them in .bullets / .observations for the web preview.
 *
 * Lead-drop-cap:
 *   - The first paragraph of every chapter renders with .chapter-lead
 *     which activates CSS ::first-letter styling.
 */
import React, { Fragment } from 'react'
import { useDocumentOutput } from '@uniweb/press'
import {
  Paragraph,
  BulletList,
  NumberedList,
} from '@uniweb/press/docx'
import { useDocumentOptions } from '#components/document-options.jsx'
import { SP } from '#utils/docx-spacing.js'

export default function Chapter({ content, block, params }) {
  const [options] = useDocumentOptions()
  const chapterKey = params?.key
  const chapterIncluded =
    !chapterKey || options.includedChapters[chapterKey] !== false

  const { title, paragraphs = [], items = [] } = content || {}
  const bullets = params?.bullets || null
  const observations = params?.observations || null

  const renderParas = (list, { lead = false } = {}) =>
    list.map((p, i) => (
      <Paragraph
        key={i}
        data={p}
        className={
          lead && i === 0 ? 'chapter-body chapter-lead' : 'chapter-body'
        }
        data-spacing-after={SP.paraAfter}
      />
    ))

  const body = chapterIncluded ? (
    <>
      {title && (
        <Paragraph
          as="h1"
          data={title}
          className="chapter-title"
          data-heading="HEADING_1"
          data-numbering-reference="heading-numbering"
          data-numbering-level={0}
          data-page-break-before="true"
          data-spacing-before={SP.chapterBefore}
          data-spacing-after={SP.chapterAfter}
        />
      )}

      {paragraphs.length > 0 && renderParas(paragraphs, { lead: true })}

      {items.length > 0 && (
        <div className="chapter-body-list" data-type="contentWrapper">
          {items.map((item, i) => (
            <Fragment key={i}>
              {item.title && (
                <Paragraph
                  as="h2"
                  data={item.title}
                  className="subsection-title"
                  data-heading="HEADING_2"
                  data-numbering-reference="heading-numbering"
                  data-numbering-level={1}
                  data-spacing-before={SP.subsectionBefore}
                  data-spacing-after={SP.subsectionAfter}
                />
              )}
              {item.paragraphs && item.paragraphs.length > 0 &&
                renderParas(item.paragraphs)}
            </Fragment>
          ))}
        </div>
      )}

      {Array.isArray(bullets) && bullets.length > 0 && (
        <ul className="bullets" data-type="contentWrapper">
          {bullets.map((b, i) => (
            <li key={i} data-type="contentWrapper">
              <Paragraph
                data={b}
                data-bullet-level={0}
                data-spacing-after={SP.bulletAfter}
              />
            </li>
          ))}
        </ul>
      )}

      {Array.isArray(observations) && observations.length > 0 && (
        <ol className="observations" data-type="contentWrapper">
          {observations.map((o, i) => (
            <li key={i} data-type="contentWrapper">
              <Paragraph
                data={o}
                data-numbering-reference="decimal-numbering"
                data-numbering-level={0}
                data-spacing-after={SP.numberedAfter}
              />
            </li>
          ))}
        </ol>
      )}
    </>
  ) : (
    <></>
  )

  useDocumentOutput(block, 'docx', body)

  if (!chapterIncluded) return null

  return <section className="chapter">{body}</section>
}
