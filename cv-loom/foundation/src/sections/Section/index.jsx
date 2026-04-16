import { SafeHtml } from '@uniweb/kit'
import { useDocumentOutput } from '@uniweb/press'
import { H2, H3, Paragraph, Paragraphs } from '@uniweb/press/docx'

export default function Section({ content, block }) {
  const { title, paragraphs = [], items = [] } = content || {}

  const docxBody = (
    <>
      {title && <H2 data={title} data-pagebreakbefore="true" />}
      <Paragraphs data={paragraphs} />
      {items.map((item, i) => (
        <span key={i}>
          {item.title && <H3 data={item.title} />}
          <Paragraphs data={item.paragraphs} />
        </span>
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
