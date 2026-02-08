import { Article as ArticleBody } from '@uniweb/kit/styled'

/**
 * Article Component
 *
 * Renders a full article from inherited data. Used on dynamic routes
 * where the parent page fetches articles and this page gets one article.
 *
 * Uses kit's Article component for the body content rendering.
 */
function Article({ content, params }) {
  const article = content.data.article
  const { showImage, showAuthor, showDate, showTags } = params

  if (!article) {
    return (
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center text-subtle">
          No article data available.
        </div>
      </section>
    )
  }

  // content is ProseMirror JSON from the collection processor
  const { title, excerpt, date, image, content: articleContent, author, tags } = article

  // Format date
  const formattedDate = date
    ? new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null

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
                  className="px-3 py-1 text-sm bg-primary/10 text-primary rounded-full"
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

          {/* Author and Date */}
          {(showAuthor || showDate) && (
            <div className="flex items-center gap-4 text-subtle">
              {showAuthor && author && (
                <div className="flex items-center gap-3">
                  {author.avatar && (
                    <img
                      src={author.avatar}
                      alt={author.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  )}
                  <span className="font-medium">{author.name}</span>
                </div>
              )}
              {showAuthor && showDate && author && formattedDate && (
                <span className="text-subtle">|</span>
              )}
              {showDate && formattedDate && (
                <time dateTime={date}>{formattedDate}</time>
              )}
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
