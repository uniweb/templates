import { Fragment } from 'react'
import { useDocumentOutput } from '@uniweb/press'
import { H2, H3, Paragraph } from '@uniweb/press/docx'
import { getChildBlockRenderer } from '@uniweb/kit'
import { SP } from '#utils/docx-spacing.js'

/**
 * Walk `content.sequence` up to the first H2 sub-heading to collect the
 * paragraphs and insets that make up the main-prose body. Anything from
 * the first H2 onward belongs to `content.items` (semantic parser groups
 * H2-headed sub-entries there) and is rendered separately below.
 *
 * Returning both paragraphs and insets in their original order is what
 * lets an author drop `![](@KeyWorks){ids=…}` between two paragraphs in
 * markdown and have it render exactly there.
 */
function preItemSequence(sequence) {
  if (!Array.isArray(sequence)) return []
  const out = []
  for (const el of sequence) {
    if (el.type === 'heading' && el.level === 2) break
    if (el.type === 'paragraph' || el.type === 'inset') out.push(el)
  }
  return out
}

export default function CvEntry({ content, block }) {
  const { title, items, sequence } = content

  const preItems = preItemSequence(sequence)
  const Renderer = getChildBlockRenderer()

  // Separate the paragraph-only subtree (for Press registration) from
  // the mixed paragraph+inset render (for the browser and as the basis
  // for docx ordering). Insets register their own docx output via
  // useDocumentOutput; each inset block ends up as its own section in
  // the compiled document, appearing next to the surrounding prose.
  const paragraphsForDocx = preItems
    .filter((el) => el.type === 'paragraph')
    .map((el) => el.text)

  const docxBody = (
    <>
      {title && (
        <H2
          data={title}
          data-pagebreakbefore="true"
          data-spacing-before={SP.sectionBefore}
          data-spacing-after={SP.sectionAfter}
        />
      )}
      {paragraphsForDocx.map((p, i) => (
        <Paragraph key={`p${i}`} data={p} data-spacing-after={SP.paraAfter} />
      ))}
      {items.map((item, i) => (
        <Fragment key={i}>
          {item.title && (
            <H3
              data={item.title}
              data-spacing-before={SP.itemBefore}
              data-spacing-after={SP.itemAfter}
            />
          )}
          {item.paragraphs.map((p, j) => (
            <Paragraph
              key={`${i}-${j}`}
              data={p}
              data-spacing-after={SP.detailAfter}
            />
          ))}
        </Fragment>
      ))}
    </>
  )

  useDocumentOutput(block, 'docx', docxBody)

  return (
    <div className="cv-entry">
      {title && (
        <h2 className="text-heading text-2xl font-bold mb-4">{title}</h2>
      )}
      {preItems.map((el, i) => {
        if (el.type === 'paragraph') {
          return (
            <Paragraph
              key={`p${i}`}
              data={el.text}
              className="cv-paragraph"
            />
          )
        }
        if (el.type === 'inset') {
          const insetBlock = block.getInset(el.refId)
          if (!insetBlock) return null
          return <Renderer key={`i${i}`} blocks={[insetBlock]} />
        }
        return null
      })}
      {items.map((item, i) => (
        <Fragment key={i}>
          {item.title && (
            <H3 data={item.title} className="cv-item-title" />
          )}
          {item.paragraphs.map((p, j) => (
            <Paragraph
              key={`${i}-${j}`}
              data={p}
              className="cv-item-detail"
            />
          ))}
        </Fragment>
      ))}
    </div>
  )
}
