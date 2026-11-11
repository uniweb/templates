import { Fragment } from 'react'
import { useDocumentOutput } from '@uniweb/press'
import { H1, H2, H3, Paragraph } from '@uniweb/press/docx'
import { getChildBlockRenderer, Text } from '@uniweb/kit'

/**
 * SOW slice — generic section for statement-of-work documents. Renders
 * title + paragraphs + items + inline insets and registers an
 * order-preserving docx body for the same content. Loom expressions in
 * the markdown were already resolved by the foundation's content
 * handler, so `content` arrives as plain strings.
 *
 * The shape mirrors CvEntry from cv-loom — the render path that's known
 * to work with mixed paragraph + inset bodies and with --- dividers
 * driving per-item iteration via the source frontmatter param.
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

export default function SOW({ content, block }) {
  const { title, items, sequence } = content
  const Renderer = getChildBlockRenderer()
  const preItems = preItemSequence(sequence)

  const paragraphsForDocx = preItems
    .filter((el) => el.type === 'paragraph')
    .map((el) => el.text)

  const docxBody = (
    <>
      {title && <H1 data={title} data-spacing-after={240} />}
      {paragraphsForDocx.map((p, i) => (
        <Paragraph key={`p${i}`} data={p} data-spacing-after={120} />
      ))}
      {items.map((item, i) => (
        <Fragment key={i}>
          {item.title && <H2 data={item.title} data-spacing-before={200} data-spacing-after={120} />}
          {item.paragraphs.map((p, j) => (
            <Paragraph key={`${i}-${j}`} data={p} data-spacing-after={100} />
          ))}
        </Fragment>
      ))}
    </>
  )

  // Browser + paged.js print share the same JSX (sow-section). Press
  // renders this subtree to HTML for the pagedjs adapter, which passes
  // it straight through to the Paged.js polyfill.
  const sectionJsx = (
    <section className="sow-section">
      {title && <Text as="h1" className="sow-title" text={title} />}
      {preItems.map((el, i) => {
        if (el.type === 'paragraph') {
          return <p key={`p${i}`} dangerouslySetInnerHTML={{ __html: el.text }} />
        }
        if (el.type === 'inset') {
          const insetBlock = block.getInset(el.refId)
          if (!insetBlock) return null
          return <Renderer key={`i${i}`} blocks={[insetBlock]} />
        }
        return null
      })}
      {items.length > 0 && (
        <div className="sow-items">
          {items.map((item, i) => (
            <Fragment key={i}>
              {item.title && <Text as="h2" className="sow-item-title" text={item.title} />}
              {item.paragraphs.map((p, j) => (
                <p key={`${i}-${j}`} className="sow-item-detail" dangerouslySetInnerHTML={{ __html: p }} />
              ))}
            </Fragment>
          ))}
        </div>
      )}
    </section>
  )

  useDocumentOutput(block, 'docx', docxBody)
  useDocumentOutput(block, 'html', sectionJsx)

  return sectionJsx
}
