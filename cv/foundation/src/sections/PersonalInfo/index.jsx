/**
 * PersonalInfo — "about the author" block for a faculty annual report.
 *
 * Pulls the single entry from `content.data.personal` (declared in
 * the page's frontmatter via `data: personal`) and renders it as
 * both a compact card for the web preview and a formal header
 * block in the docx output.
 */
import { useDocumentOutput } from '@uniweb/press'
import { H2, Paragraph } from '@uniweb/press/docx'
import { useDocumentOptions } from '#components/document-options.jsx'
import { formatDate } from '#components/helpers.js'

const SECTION_KEY = 'personal'

export default function PersonalInfo({ content, block }) {
  const [options] = useDocumentOptions()
  const sectionIncluded = options.includedSections[SECTION_KEY] !== false

  const personal = content?.data?.personal?.[0] || {}

  const {
    first_name = '',
    family_name = '',
    role: roleTitle = '',
    affiliation = '',
    email = '',
    born = '',
  } = personal

  const fullName = [first_name, family_name].filter(Boolean).join(' ')

  // Press builders for the docx output.
  const body = (
    <>
      <H2 data={content?.title || 'Personal information'} />
      {fullName && <Paragraph data={`Name: ${fullName}`} />}
      {roleTitle && <Paragraph data={`Title: ${roleTitle}`} />}
      {affiliation && <Paragraph data={`Affiliation: ${affiliation}`} />}
      {email && <Paragraph data={`Email: ${email}`} />}
      {born && <Paragraph data={`Date of birth: ${formatDate(born, { format: 'long' })}`} />}
    </>
  )

  useDocumentOutput(block, 'docx', sectionIncluded ? body : <></>)

  if (!sectionIncluded) return null

  return (
    <div className="max-w-3xl mx-auto py-12">
      <h2 className="text-heading text-3xl font-bold mb-6">
        {content?.title || 'Personal information'}
      </h2>
      <dl className="grid grid-cols-[max-content_1fr] gap-x-6 gap-y-2 text-body">
        {fullName && (
          <>
            <dt className="font-semibold text-subtle">Name</dt>
            <dd>{fullName}</dd>
          </>
        )}
        {roleTitle && (
          <>
            <dt className="font-semibold text-subtle">Title</dt>
            <dd>{roleTitle}</dd>
          </>
        )}
        {affiliation && (
          <>
            <dt className="font-semibold text-subtle">Affiliation</dt>
            <dd className="italic">{affiliation}</dd>
          </>
        )}
        {email && (
          <>
            <dt className="font-semibold text-subtle">Email</dt>
            <dd>
              <a
                className="text-link hover:underline"
                href={`mailto:${email}`}
              >
                {email}
              </a>
            </dd>
          </>
        )}
        {born && (
          <>
            <dt className="font-semibold text-subtle">Date of birth</dt>
            <dd>{formatDate(born, { format: 'long' })}</dd>
          </>
        )}
      </dl>
    </div>
  )
}
