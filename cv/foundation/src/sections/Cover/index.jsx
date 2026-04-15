/**
 * Cover — the title slide of a faculty annual report.
 *
 * Reads its content from:
 *   - `content.title` — the report title (from the page markdown)
 *   - `content.subtitle` — date range or sub-heading
 *   - `content.data.personal` — the personal collection item
 *     (injected via the page's data declaration)
 *
 * Registers a docx fragment for the title page and renders a
 * visible preview for the web version. The two share JSX via
 * Press's builder components (Mode 1 from the docusite concepts
 * doc) — one source, two consumers.
 */
import { useDocumentOutput } from '@uniweb/press'
import { H1, H2, H3, Paragraph } from '@uniweb/press/docx'
import { useDocumentOptions } from '#components/document-options.jsx'

const SECTION_KEY = 'cover'

export default function Cover({ content, block }) {
  const [options] = useDocumentOptions()
  const sectionIncluded = options.includedSections[SECTION_KEY] !== false

  const { title, subtitle } = content || {}
  const personal = content?.data?.personal?.[0] || {}
  const fullName =
    [personal.first_name, personal.family_name].filter(Boolean).join(' ') ||
    'Unknown Author'
  const affiliation = personal.affiliation || ''
  const roleTitle = personal.role || ''

  const body = (
    <>
      <H1 data={title || 'Annual Report'} data-style="cover-title" />
      {subtitle && <H2 data={subtitle} data-style="cover-subtitle" />}
      <Paragraph data={fullName} />
      {roleTitle && <Paragraph data={roleTitle} />}
      {affiliation && <Paragraph data={affiliation} />}
    </>
  )

  useDocumentOutput(block, 'docx', sectionIncluded ? body : <></>)

  if (!sectionIncluded) return null

  return (
    <div className="max-w-3xl mx-auto py-16 text-center">
      <h1 className="text-heading text-5xl font-bold tracking-tight">
        {title || 'Annual Report'}
      </h1>
      {subtitle && (
        <p className="mt-4 text-2xl text-subtle">{subtitle}</p>
      )}
      <div className="mt-10 space-y-1">
        <p className="text-heading text-xl font-medium">{fullName}</p>
        {roleTitle && <p className="text-body">{roleTitle}</p>}
        {affiliation && (
          <p className="text-subtle italic">{affiliation}</p>
        )}
      </div>
    </div>
  )
}

Cover.className = 'py-16'
