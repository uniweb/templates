import { H1, P, Link, Visual, cn } from '@uniweb/kit'

export default function Hero({ content, block }) {
  const { title, pretitle, paragraphs, links, imgs } = content
  const visual = block.insets[0] || imgs[0]

  return (
    <div className={cn('max-w-(--max-content-width) mx-auto flex flex-col items-center text-center gap-12', visual && 'lg:flex-row lg:text-left')}>
      <div className="flex-1 max-w-2xl">
        {pretitle && <p className="text-xs font-bold uppercase tracking-widest text-subtle mb-4">{pretitle}</p>}
        <H1 text={title} className="text-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight" />
        {paragraphs[0] && <P text={paragraphs[0]} className="text-subtle text-lg mt-6 max-w-xl" />}
        {links.length > 0 && (
          <div className="mt-8 flex gap-3 flex-wrap justify-center lg:justify-start">
            {links.map((link, i) => (
              <Link key={i} to={link.href} className={cn(
                'px-6 py-3 rounded-lg font-medium transition-colors',
                i === 0 ? 'bg-primary text-primary-foreground hover:bg-primary-hover'
                        : 'border border-secondary-border text-secondary-foreground hover:bg-secondary'
              )}>{link.label}</Link>
            ))}
          </div>
        )}
      </div>
      {visual && <Visual inset={block.insets[0]} image={imgs[0]} className="flex-1 max-w-lg w-full" />}
    </div>
  )
}

Hero.className = 'py-(--section-padding-y) px-(--section-padding-x)'

