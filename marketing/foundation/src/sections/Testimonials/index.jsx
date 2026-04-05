import { H2, P, cn } from '@uniweb/kit'
import TestimonialCard from '#components/TestimonialCard'

export default function Testimonials({ content, params }) {
  const { title, paragraphs, items } = content
  const cols = params.columns || 3

  return (
    <div className="max-w-6xl mx-auto">
      {(title || paragraphs[0]) && (
        <div className="text-center mb-12">
          {title && <H2 text={title} className="text-heading text-3xl font-bold" />}
          {paragraphs[0] && <P text={paragraphs[0]} className="text-subtle mt-4 max-w-2xl mx-auto" />}
        </div>
      )}
      <div className={cn(
        'grid gap-8',
        cols === 2 && 'md:grid-cols-2',
        cols === 3 && 'md:grid-cols-2 lg:grid-cols-3',
        cols === 4 && 'md:grid-cols-2 lg:grid-cols-4',
      )}>
        {items.map((item, i) => (
          <TestimonialCard key={i} item={item} />
        ))}
      </div>
    </div>
  )
}
