import { useDocumentOutput } from '@uniweb/press'
import { H1, H2, Paragraph } from '@uniweb/press/docx'
import { SP } from '#utils/docx-spacing.js'

export default function Header({ content, block }) {
  const { title, subtitle, paragraphs } = content

  // One tree, two consumers: Press builders render <h1>, <h2>, <p> in the
  // browser (styled via className + CSS) and compile to docx (via data-*
  // attributes). No duplicate rendering — this is the Press hello-world
  // pattern.
  const body = (
    <>
      {title && (
        <H1
          data={title}
          className="text-heading text-4xl font-bold leading-tight"
          data-style="cover-title"
          data-spacing-before={SP.coverTitleBefore}
          data-spacing-after={SP.coverTitleAfter}
        />
      )}
      {subtitle && (
        <H2
          data={subtitle}
          className="text-xl text-subtle mt-2"
          data-style="cover-subtitle"
          data-spacing-after={SP.coverSubtitleAfter}
        />
      )}
      {paragraphs.map((p, i) => (
        <Paragraph
          key={i}
          data={p}
          className="text-sm text-body mt-1"
          data-alignment="center"
          data-spacing-after={SP.contactAfter}
        />
      ))}
    </>
  )

  useDocumentOutput(block, 'docx', body)

  return <div className="cv-header">{body}</div>
}
