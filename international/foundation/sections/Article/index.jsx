import { useWebsite, Article as ArticleBody } from '@uniweb/kit'

/**
 * Article Component
 *
 * Renders a full article: content.data.article, one record, whole. Used on a parametric
 * page ([slug]) — one URL for each article of the parent page's query —
 * where it receives the article its URL names.
 *
 * Uses kit's Article component for the body content rendering.
 */
function Article({ content, params }) {
  const article = content.data.article
  const { showImage, showDate, showTags } = params
  const { website } = useWebsite()

  if (!article) {
    return (
      <div className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center text-subtle">
          No article data available.
        </div>
      </div>
    )
  }

  // The article whole, as stored — a key per section, the same on a static site
  // and a hosted one: the card in `brief`, and the body in `body`, whose `content`
  // is the markdown body as ProseMirror JSON.
  const { title, excerpt, date, image, tags } = article.brief || {}
  const articleContent = article.body?.content

  // Get locale-aware date formatting.
  // A date written as `2026-05-28` is a calendar day, not an instant: JavaScript
  // reads it as midnight UTC, so formatting it in the visitor's zone showed the
  // day before anywhere west of UTC. Such a date is formatted in UTC; a date with
  // a time keeps the visitor's zone.
  const formatDate = (dateStr) => {
    if (!dateStr) return null
    const locale = website.getActiveLocale()
    const localeMap = {
      en: 'en-US',
      es: 'es-ES',
      fr: 'fr-FR',
    }
    const dayOnly = /^\d{4}-\d{2}-\d{2}$/.test(dateStr)
    return new Date(dateStr).toLocaleDateString(localeMap[locale] || 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      ...(dayOnly && { timeZone: 'UTC' }),
    })
  }

  const formattedDate = formatDate(date)

  return (
    <article className="py-16 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          {/* Tags */}
          {showTags && tags && tags.length > 0 && (
            <div className="flex gap-2 mb-4">
              {tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-sm bg-primary-100 text-primary-700 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="text-4xl font-bold text-heading mb-4">{title}</h1>

          {/* Excerpt */}
          {excerpt && (
            <p className="text-xl text-subtle mb-6">{excerpt}</p>
          )}

          {/* Date */}
          {showDate && formattedDate && (
            <div className="text-subtle">
              <time dateTime={date}>{formattedDate}</time>
            </div>
          )}
        </header>

        {/* Featured Image */}
        {showImage && image && (
          <div className="mb-8">
            <img
              src={image}
              alt={title}
              className="w-full h-64 md:h-96 object-cover rounded-xl"
            />
          </div>
        )}

        {/* Body Content - rendered from ProseMirror JSON */}
        {articleContent && (
          <ArticleBody content={articleContent} />
        )}
      </div>
    </article>
  )
}

export default Article
