import { H3, P } from '@uniweb/kit'

export default function Card({ content }) {
  const { title, paragraphs } = content

  return (
    <div className="bg-card rounded-xl p-6 border border-border h-full">
      {paragraphs[0] && <P text={paragraphs[0]} className="text-body italic" />}
      {title && <H3 text={title} className="text-heading font-semibold text-sm mt-4" />}
    </div>
  )
}
