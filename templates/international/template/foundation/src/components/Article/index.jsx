import { useWebsite } from '@uniweb/kit'
import { Article as ArticleBody } from '@uniweb/kit/styled'

/**
 * Article Component
 *
 * Renders a full article from inherited data. Used on dynamic routes
 * where the parent page fetches articles and this page gets one article.
 *
 * Uses kit's Article component for the body content rendering.
 */
export function Article({ content, params }) {
  const article = content.data.article
  const { showImage, showDate, showTags } = params
  const { website } = useWebsite()

  if (!article) {
    return (
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center text-gray-500">
          No article data available.
        </div>
      </section>
    )
  }

  // content is ProseMirror JSON from the collection processor
  const { title, excerpt, date, image, content: articleContent, tags } = article

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
      month: 'long',
      day: 'numeric',
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
                  className="px-3 py-1 text-sm bg-green-100 text-green-800 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>

          {/* Excerpt */}
          {excerpt && (
            <p className="text-xl text-gray-600 mb-6">{excerpt}</p>
          )}

          {/* Date */}
          {showDate && formattedDate && (
            <div className="text-gray-600">
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
