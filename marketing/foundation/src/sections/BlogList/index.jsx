import { Link } from '@uniweb/kit'

/**
 * BlogList Component
 *
 * Displays a grid of article cards. Gets articles from inherited data
 * (page-level fetch) and renders them with links to individual posts.
 */
function BlogList({ content, params, block }) {
  const { title, subtitle, paragraphs } = content
  const articles = content.data.articles || []
  const { columns, showExcerpt, showAuthor, showDate } = params

  // Fallback route for articles without a route property
  const fallbackRoute = block.page.route

  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
  }

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        {(title || subtitle || paragraphs.length > 0) && (
          <header className="text-center mb-12">
            {title && (
              <h2 className="text-3xl font-bold text-heading mb-4">{title}</h2>
            )}
            {subtitle && (
              <p className="text-xl text-subtle mb-4">{subtitle}</p>
            )}
            {paragraphs.map((p, i) => (
              <p key={i} className="text-subtle max-w-2xl mx-auto">
                {p}
              </p>
            ))}
          </header>
        )}

        {/* Articles Grid */}
        {articles.length > 0 ? (
          <div className={`grid gap-8 ${gridCols[columns] || gridCols[3]}`}>
            {articles.map((article, i) => (
              <ArticleCard
                key={article.slug || i}
                article={article}
                fallbackRoute={fallbackRoute}
                showExcerpt={showExcerpt}
                showAuthor={showAuthor}
                showDate={showDate}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-subtle">No articles found.</p>
        )}
      </div>
    </section>
  )
}

/**
 * Individual article card
 */
function ArticleCard({ article, fallbackRoute, showExcerpt, showAuthor, showDate }) {
  const { slug, title, excerpt, date, image, author, tags, route } = article

  // Use article's route if available (from collection config), otherwise build from fallback
  const articleUrl = route || `${fallbackRoute}/${slug}`

  // Format date
  const formattedDate = date
    ? new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : null

  return (
    <article className="bg-white rounded-xl shadow-sm border border-border/50 overflow-hidden hover:shadow-md transition-shadow">
      {/* Image */}
      {image && (
        <Link href={articleUrl} className="block">
          <img
            src={image}
            alt={title}
            className="w-full h-48 object-cover"
          />
        </Link>
      )}

      <div className="p-6">
        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="flex gap-2 mb-3">
            {tags.slice(0, 2).map((tag, i) => (
              <span
                key={i}
                className="px-2 py-1 text-xs bg-primary/10 text-primary rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h3 className="text-xl font-semibold text-heading mb-2">
          <Link href={articleUrl} className="hover:text-primary">
            {title}
          </Link>
        </h3>

        {/* Excerpt */}
        {showExcerpt && excerpt && (
          <p className="text-subtle mb-4 line-clamp-2">{excerpt}</p>
        )}

        {/* Meta */}
        {(showAuthor || showDate) && (
          <div className="flex items-center gap-3 text-sm text-subtle">
            {showAuthor && author && (
              <div className="flex items-center gap-2">
                {author.avatar && (
                  <img
                    src={author.avatar}
                    alt={author.name}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                )}
                <span>{author.name}</span>
              </div>
            )}
            {showAuthor && showDate && author && formattedDate && (
              <span className="text-gray-300">|</span>
            )}
            {showDate && formattedDate && (
              <time dateTime={date}>{formattedDate}</time>
            )}
          </div>
        )}
      </div>
    </article>
  )
}

export default BlogList
