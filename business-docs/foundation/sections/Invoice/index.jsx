import { Fragment } from 'react'
import { useDocumentOutput } from '@uniweb/press'
import { H1, H2, Paragraph } from '@uniweb/press/docx'
import { getChildBlockRenderer } from '@uniweb/kit'

/**
 * Invoice slice — generic section for invoice documents. Same shape as
 * SOW (title + paragraphs + items + insets) but registered separately
 * so document-level Press options (paragraph styles, page metadata) can
 * differentiate the two without conditional logic in shared code.
 *
 * Authors compose an invoice from 4 markdown files (cover, line items,
 * totals, payment) — each a separate Block instance using `type: Invoice`.
 * The Loom namespace already carries computed `{subtotal}`, `{tax_amount}`,
 * `{tax_rate}`, `{tax_label}`, `{total}` so the totals slice renders with
 * plain placeholders.
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

export default function Invoice({ content, block }) {
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

  const sectionJsx = (
    <section className="invoice-section">
      {title && <h1 className="invoice-title">{title}</h1>}
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
        <div className="invoice-items">
          {items.map((item, i) => (
            <Fragment key={i}>
              {item.title && <h2 className="invoice-item-title">{item.title}</h2>}
              {item.paragraphs.map((p, j) => (
                <p key={`${i}-${j}`} className="invoice-item-detail" dangerouslySetInnerHTML={{ __html: p }} />
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
