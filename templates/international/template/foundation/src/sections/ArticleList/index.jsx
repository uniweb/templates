import { Link, useWebsite } from '@uniweb/kit'

/**
 * ArticleList Component
 *
 * Displays a grid of article cards. Gets articles from inherited data
 * (page-level fetch) and renders them with links to individual posts.
 */
function ArticleList({ content, params, block }) {
  const { title, subtitle, paragraphs } = content
  const articles = content.data.articles || []
  const { columns, showExcerpt, showDate } = params
  const { website } = useWebsite()

  // Fallback route for articles without a route property
  const fallbackRoute = block.page.route

  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
  }

  // Get locale-aware date formatting
  const formatDate = (dateStr) => {
    if (!dateStr) return null
    const locale = website.getActiveLocale()
    const localeMap = {
      en: 'en-US',
      es: 'es-ES',
      fr: 'fr-FR',
    }
    return new Date(dateStr).toLocaleDateString(localeMap[locale] || 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <div className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        {(title || subtitle || paragraphs.length > 0) && (
          <header className="text-center mb-12">
            {title && (
              <h2 className="text-3xl font-bold text-heading mb-4">{title}</h2>
            )}
            {subtitle && (
              <p className="text-xl text-muted mb-4">{subtitle}</p>
            )}
            {paragraphs.map((p, i) => (
              <p key={i} className="text-muted max-w-2xl mx-auto">
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
                showDate={showDate}
                formatDate={formatDate}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-subtle">No articles found.</p>
        )}
      </div>
    </div>
  )
}

/**
 * Individual article card
 */
function ArticleCard({ article, fallbackRoute, showExcerpt, showDate, formatDate }) {
  const { slug, title, excerpt, date, image, tags, route } = article

  // Use article's route if available (from collection config), otherwise build from fallback
  const articleUrl = route || `${fallbackRoute}/${slug}`

  const formattedDate = formatDate(date)

  return (
    <article className="bg-surface-subtle rounded-xl shadow-sm border border-edge-muted overflow-hidden hover:shadow-md transition-shadow">
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
                className="px-2 py-1 text-xs bg-primary-50 text-primary-700 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h3 className="text-xl font-semibold text-heading mb-2">
          <Link href={articleUrl} className="hover:text-link-hover">
            {title}
          </Link>
        </h3>

        {/* Excerpt */}
        {showExcerpt && excerpt && (
          <p className="text-muted mb-4 line-clamp-2">{excerpt}</p>
        )}

        {/* Date */}
        {showDate && formattedDate && (
          <div className="text-sm text-subtle">
            <time dateTime={date}>{formattedDate}</time>
          </div>
        )}
      </div>
    </article>
  )
}

export default ArticleList
