import { useDocumentOutput } from '@uniweb/press'
import { H1, H2, Paragraph } from '@uniweb/press/docx'

export default function Cover({ content, block }) {
  const { title, subtitle } = content || {}
  const profile = content?.data?.profile?.[0] || {}
  const fullName =
    [profile.first_name, profile.family_name].filter(Boolean).join(' ') ||
    'Unknown Author'
  const affiliation = profile.affiliation || ''
  const roleTitle = profile.role || ''
  const email = profile.email || ''
  const website = profile.website || ''

  const body = (
    <>
      <H1
        data={title || 'Curriculum Vitae'}
        data-style="cover-title"
        data-spacing-before={960}
        data-spacing-after={120}
      />
      {subtitle && (
        <H2
          data={subtitle}
          data-style="cover-subtitle"
          data-spacing-after={240}
        />
      )}
      <Paragraph data={fullName} data-spacing-after={40} />
      {roleTitle && <Paragraph data={roleTitle} data-spacing-after={40} />}
      {affiliation && <Paragraph data={affiliation} data-spacing-after={40} />}
      {email && <Paragraph data={email} data-spacing-after={40} />}
      {website && <Paragraph data={website} data-spacing-after={80} />}
    </>
  )

  useDocumentOutput(block, 'docx', body)

  return (
    <div className="max-w-3xl mx-auto py-16 text-center">
      <h1 className="text-heading text-5xl font-bold tracking-tight">
        {title || 'Curriculum Vitae'}
      </h1>
      {subtitle && (
        <p className="mt-4 text-2xl text-subtle">{subtitle}</p>
      )}
      <div className="mt-10 space-y-1">
        <p className="text-heading text-xl font-medium">{fullName}</p>
        {roleTitle && <p className="text-body">{roleTitle}</p>}
        {affiliation && <p className="text-subtle italic">{affiliation}</p>}
        {email && (
          <p className="text-sm mt-3">
            <a href={`mailto:${email}`} className="text-link underline">{email}</a>
            {website && (
              <> · <a href={website} className="text-link underline" target="_blank" rel="noopener noreferrer">{website}</a></>
            )}
          </p>
        )}
      </div>
    </div>
  )
}
