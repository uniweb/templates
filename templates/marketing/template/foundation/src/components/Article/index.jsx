import { SafeHtml } from '@uniweb/kit'

/**
 * Article Component
 *
 * Renders a full article from inherited data. Used on dynamic routes
 * where the parent page fetches articles and this page gets one article.
 */
export function Article({ content, params }) {
  const article = content.data?.article
  const { showImage, showAuthor, showDate, showTags } = params

  if (!article) {
    return (
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center text-gray-500">
          No article data available.
        </div>
      </section>
    )
  }

  const { title, excerpt, date, image, body, author, tags } = article

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
                  className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-full"
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

          {/* Author and Date */}
          {(showAuthor || showDate) && (
            <div className="flex items-center gap-4 text-gray-600">
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
                <span className="text-gray-400">|</span>
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

        {/* Body Content */}
        {body && (
          <div className="prose prose-lg max-w-none">
            <SafeHtml html={markdownToHtml(body)} />
          </div>
        )}
      </div>
    </article>
  )
}

/**
 * Simple markdown to HTML converter
 * Handles headings, paragraphs, code blocks, and basic formatting
 */
function markdownToHtml(markdown) {
  if (!markdown) return ''

  let html = markdown
    // Code blocks (must be before other transformations)
    .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>')
    // Inline code
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    // Headings
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    // Bold
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    // Paragraphs - split by double newlines
    .split(/\n\n+/)
    .map((block) => {
      // Don't wrap headings, pre, or already wrapped content
      if (
        block.startsWith('<h') ||
        block.startsWith('<pre') ||
        block.startsWith('<ul') ||
        block.startsWith('<ol')
      ) {
        return block
      }
      return `<p>${block.replace(/\n/g, '<br>')}</p>`
    })
    .join('\n')

  return html
}

export default Article
