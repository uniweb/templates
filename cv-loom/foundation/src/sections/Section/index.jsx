import { Fragment } from 'react'
import { SafeHtml } from '@uniweb/kit'
import { useDocumentOutput } from '@uniweb/press'
import { H2, H3, Paragraph } from '@uniweb/press/docx'

// Docx spacing in twips (1 pt = 20 twips)
const SP = {
  sectionBefore: 480,  // 24pt before section heading
  sectionAfter: 120,   // 6pt after section heading
  paraAfter: 120,      // 6pt after body paragraphs
  itemBefore: 200,     // 10pt before each item heading
  itemAfter: 40,       // 2pt after item heading
  detailAfter: 60,     // 3pt after item detail
}

export default function Section({ content, block }) {
  const { title, paragraphs = [], items = [] } = content || {}

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
      {paragraphs.map((p, i) => (
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
          {(item.paragraphs || []).map((p, j) => (
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
    <div className="cv-section">
      {title && (
        <h2 className="text-heading text-2xl font-bold mb-4">{title}</h2>
      )}

      {paragraphs.map((para, i) => (
        <SafeHtml key={i} as="p" value={para} className="cv-paragraph" />
      ))}

      {items.length > 0 && (
        <div className="mt-6 space-y-5">
          {items.map((item, i) => (
            <div key={i} className="cv-item">
              {item.title && (
                <h3 className="font-semibold text-heading">
                  {item.title}
                </h3>
              )}
              {(item.paragraphs || []).map((para, j) => (
                <SafeHtml
                  key={j}
                  as="p"
                  value={para}
                  className="text-body text-sm mt-1"
                />
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
