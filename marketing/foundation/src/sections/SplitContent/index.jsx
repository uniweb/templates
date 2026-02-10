import { H2, P, Link, Visual, cn } from '@uniweb/kit'

export default function SplitContent({ content, block, params }) {
  const { title, paragraphs, links, imgs } = content
  const flipped = params.variant === 'flipped'
  const visual = block.insets[0] || imgs[0]

  return (
    <div className={cn(
      'max-w-6xl mx-auto grid items-center gap-12 lg:grid-cols-2',
      flipped && 'lg:[direction:rtl] lg:*:[direction:ltr]'
    )}>
      <div>
        {title && <H2 text={title} className="text-heading text-3xl font-bold" />}
        {paragraphs[0] && <P text={paragraphs[0]} className="text-subtle text-lg mt-4" />}
        {paragraphs[1] && <P text={paragraphs[1]} className="text-subtle mt-3" />}
        {links.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-3">
            {links.map((link, i) => (
              <Link key={i} to={link.href} className={cn(
                'px-6 py-3 rounded-lg font-medium transition-colors',
                i === 0 ? 'bg-primary text-primary-foreground hover:bg-primary-hover'
                        : 'text-link hover:underline'
              )}>{link.label}</Link>
            ))}
          </div>
        )}
      </div>
      <div>
        {visual ? (
          <Visual inset={block.insets[0]} image={imgs[0]} className="rounded-xl w-full" />
        ) : (
          <div className="aspect-[4/3] w-full bg-card rounded-xl border border-border" />
        )}
      </div>
    </div>
  )
}

SplitContent.className = 'py-(--section-padding-y) px-(--section-padding-x)'
