import { H2, H3, P, Link, cn } from '@uniweb/kit'

export default function Pricing({ content }) {
  const { title, paragraphs, items } = content

  return (
    <div className="max-w-5xl mx-auto">
      {title && <H2 text={title} className="text-heading text-3xl font-bold text-center" />}
      {paragraphs[0] && <P text={paragraphs[0]} className="text-subtle text-center mt-4 max-w-2xl mx-auto" />}
      <div className={cn('mt-12 grid gap-8', items.length === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-2')}>
        {items.map((plan, i) => {
          const featured = plan.icons.length > 0
          const price = plan.paragraphs[0]
          const description = plan.paragraphs[1]
          return (
            <div key={i} className={cn(
              'rounded-xl p-8 border flex flex-col',
              featured ? 'border-primary bg-card shadow-lg ring-1 ring-primary/20' : 'border-border bg-card'
            )}>
              <H3 text={plan.title} className="text-heading text-xl font-bold" />
              {description && <P text={description} className="text-subtle mt-2" />}
              {price && <p className="text-heading text-4xl font-bold mt-6" dangerouslySetInnerHTML={{ __html: price }} />}
              {plan.lists[0] && (
                <ul className="mt-8 space-y-3 flex-1">
                  {plan.lists[0].map((feature, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm text-body">
                      <svg className="w-5 h-5 text-success shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <P text={feature.paragraphs[0]} className="inline" />
                    </li>
                  ))}
                </ul>
              )}
              {plan.links[0] && (
                <Link to={plan.links[0].href} className={cn(
                  'mt-8 block text-center px-6 py-3 rounded-lg font-medium transition-colors',
                  featured
                    ? 'bg-primary text-primary-foreground hover:bg-primary-hover'
                    : 'border border-secondary-border text-secondary-foreground hover:bg-secondary'
                )}>
                  {plan.links[0].label}
                </Link>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

Pricing.className = 'py-[var(--section-padding-y)] px-[var(--section-padding-x)]'
