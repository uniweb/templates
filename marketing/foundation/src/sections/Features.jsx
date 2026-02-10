import { H2, H3, P, Icon, cn } from '@uniweb/kit'

export default function Features({ content }) {
  const { title, paragraphs, items } = content

  return (
    <div className="max-w-6xl mx-auto">
      {title && <H2 text={title} className="text-heading text-3xl font-bold text-center" />}
      {paragraphs[0] && <P text={paragraphs[0]} className="text-subtle text-center mt-4 max-w-2xl mx-auto" />}
      <div className={cn('mt-12 grid gap-8', items.length <= 3 ? 'md:grid-cols-3' : 'md:grid-cols-2 lg:grid-cols-4')}>
        {items.map((item, i) => (
          <div key={i} className="bg-card rounded-xl p-6 border border-border">
            {item.icons[0] && <Icon {...item.icons[0]} className="text-link w-8 h-8 mb-4" />}
            <H3 text={item.title} className="text-heading font-semibold" />
            {item.paragraphs[0] && <P text={item.paragraphs[0]} className="text-subtle text-sm mt-2" />}
          </div>
        ))}
      </div>
    </div>
  )
}

Features.className = 'py-(--section-padding-y) px-(--section-padding-x)'
