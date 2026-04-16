import { Fragment } from 'react'
import { useDocumentOutput } from '@uniweb/press'
import { H2, H3, Paragraph } from '@uniweb/press/docx'
import { SP } from '#utils/docx-spacing.js'

export default function CvEntry({ content, block }) {
  const { title, paragraphs, items } = content

  // One tree, two consumers: Press builders render semantic HTML in the
  // browser (styled via className + CSS) and compile to docx (via data-*
  // attributes). The web wrapper <div className="cv-entry"> is outside
  // the registered tree — docx never sees it.
  const body = (
    <>
      {title && (
        <H2
          data={title}
          className="text-heading text-2xl font-bold mb-4"
          data-pagebreakbefore="true"
          data-spacing-before={SP.sectionBefore}
          data-spacing-after={SP.sectionAfter}
        />
      )}
      {paragraphs.map((p, i) => (
        <Paragraph
          key={`p${i}`}
          data={p}
          className="cv-paragraph"
          data-spacing-after={SP.paraAfter}
        />
      ))}
      {items.map((item, i) => (
        <Fragment key={i}>
          {item.title && (
            <H3
              data={item.title}
              className="cv-item-title"
              data-spacing-before={SP.itemBefore}
              data-spacing-after={SP.itemAfter}
            />
          )}
          {item.paragraphs.map((p, j) => (
            <Paragraph
              key={`${i}-${j}`}
              data={p}
              className="cv-item-detail"
              data-spacing-after={SP.detailAfter}
            />
          ))}
        </Fragment>
      ))}
    </>
  )

  useDocumentOutput(block, 'docx', body)

  return <div className="cv-entry">{body}</div>
}
