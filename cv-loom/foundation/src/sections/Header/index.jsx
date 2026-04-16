import { SafeHtml } from '@uniweb/kit'
import { useDocumentOutput } from '@uniweb/press'
import { H1, H2, Paragraph, Link } from '@uniweb/press/docx'

export default function Header({ content, block }) {
  const { title, subtitle, paragraphs = [], links = [] } = content || {}

  const docxBody = (
    <>
      {title && <H1 data={title} data-style="cover-title" />}
      {subtitle && <H2 data={subtitle} data-style="cover-subtitle" />}
      {paragraphs.map((p, i) => (
        <Paragraph key={i} data={p} />
      ))}
      {links.map((link, i) => (
        <Link key={i} data={{ label: link.label || link.href, href: link.href }} />
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
        <div className="mt-4 text-body">
          {paragraphs.map((para, i) => (
            <SafeHtml key={i} as="p" value={para} />
          ))}
        </div>
      )}
      {links.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-4 text-sm">
          {links.map((link, i) => (
            <a
              key={i}
              href={link.href}
              className="text-link underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.label || link.href}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
