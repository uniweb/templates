import { H2, DataPlaceholder, Link } from '@uniweb/kit'
import { ChevronRight } from 'lucide-react'

/**
 * JournalList Component
 *
 * Displays the article records the page's query delivers (content.data.articles)
 * in a responsive grid.
 * Each card links to the full article's page, as the framework links it: `$route`.
 */
function JournalList({ content, params, block }) {
  const articles = content.data?.articles || []
  const { title } = content
  const { columns } = params

  if (block.dataLoading) {
    return <DataPlaceholder lines={6} />
  }

  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
  }

  return (
    <div className="max-w-7xl mx-auto px-8 py-24">
      {title && (
        <H2
          text={title}
          className="text-4xl md:text-5xl font-light mb-16 text-center underline decoration-primary-500/30 underline-offset-8"
        />
      )}

      <div className={`grid grid-cols-1 ${gridCols[columns] || gridCols[2]} gap-12`}>
        {articles.map((article, i) => (
          <ArticleCard
            key={article.slug || i}
            article={article}
          />
        ))}
      </div>
    </div>
  )
}

function ArticleCard({ article }) {
  // `$route` — the page that shows this article, filled by the framework. Never rebuilt
  // here; a record with no such page renders as a card with no link.
  const articleUrl = article.$route
  const Card = articleUrl ? Link : 'div'

  return (
    <Card {...(articleUrl ? { href: articleUrl } : {})} className="group block">
      {article.image && (
        <div className="aspect-video rounded-[2.5rem] overflow-hidden mb-8">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        </div>
      )}

      <div className="flex items-center gap-4 text-xs font-black uppercase tracking-[0.2em] text-primary-600 mb-4">
        {article.date && <span>{article.date}</span>}
        {article.date && article.readTime && (
          <span className="w-1 h-1 bg-neutral-300 rounded-full" />
        )}
        {article.readTime && (
          <span className="text-neutral-400">{article.readTime}</span>
        )}
      </div>

      <h3 className="text-2xl md:text-3xl font-light mb-4 group-hover:text-primary-600 transition-colors">
        {article.title}
      </h3>

      {article.excerpt && (
        <p className="text-neutral-500 leading-relaxed mb-6">
          {article.excerpt}
        </p>
      )}

      <div className="flex items-center gap-2 font-bold text-sm uppercase tracking-widest text-neutral-900 group-hover:gap-4 transition-all">
        Read Article <ChevronRight size={16} />
      </div>
    </Card>
  )
}

export default JournalList
