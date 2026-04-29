import { H2, P, Link } from '@uniweb/kit'

export default function CTA({ content }) {
  const { title, paragraphs, links } = content

  return (
    <div className="text-center max-w-3xl mx-auto">
      <H2 text={title} className="text-heading text-3xl font-bold" />
      {paragraphs[0] && <P text={paragraphs[0]} className="text-subtle text-lg mt-4" />}
      {links[0] && (
        <Link to={links[0].href} className="mt-8 inline-block bg-primary text-primary-foreground hover:bg-primary-hover px-8 py-3 rounded-lg font-medium transition-colors">
          {links[0].label}
        </Link>
      )}
    </div>
  )
}

CTA.className = 'py-[var(--section-padding-y)] px-[var(--section-padding-x)]'
