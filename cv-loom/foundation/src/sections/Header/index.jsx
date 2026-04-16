import { SafeHtml } from '@uniweb/kit'
import { useDocumentOutput } from '@uniweb/press'
import { H1, H2, Paragraph } from '@uniweb/press/docx'

export default function Header({ content, block }) {
  const { title, subtitle, paragraphs = [] } = content || {}

  const docxBody = (
    <>
      {title && (
        <H1
          data={title}
          data-style="cover-title"
          data-spacing-before={960}
          data-spacing-after={120}
        />
      )}
      {subtitle && (
        <H2
          data={subtitle}
          data-style="cover-subtitle"
          data-spacing-after={240}
        />
      )}
      {paragraphs.map((p, i) => (
        <Paragraph key={i} data={p} data-spacing-after={80} />
      ))}
    </>
  )

  useDocumentOutput(block, 'docx', docxBody)

  return (
    <div className="cv-header">
      {title && (
        <h1 className="text-heading text-4xl font-bold leading-tight">
          {title}
        </h1>
      )}
      {subtitle && (
        <p className="text-xl text-subtle mt-2">{subtitle}</p>
      )}
      {paragraphs.length > 0 && (
        <div className="mt-3 text-sm text-body space-y-1">
          {paragraphs.map((para, i) => (
            <SafeHtml key={i} as="p" value={para} />
          ))}
        </div>
      )}
    </div>
  )
}
