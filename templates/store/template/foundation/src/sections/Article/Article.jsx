import { Link } from '@uniweb/kit'
import { Article as ArticleBody } from '@uniweb/kit/styled'
import { ChevronLeft, Share2, Instagram } from 'lucide-react'

/**
 * Article Component
 *
 * Full article view from inherited collection data.
 * Renders author info, featured image, blockquote, body content,
 * and a bottom CTA section.
 */
export function Article({ content, block }) {
  const article = content.data?.article

  if (!article) {
    return (
      <div className="py-16 px-4 text-center text-neutral-400">
        No article data available.
      </div>
    )
  }

  const {
    title,
    excerpt,
    date,
    readTime,
    image,
    author,
    content: articleContent,
  } = article

  // Generate author initials from name
  const initials = author
    ? author
        .split(' ')
        .map((n) => n[0])
        .join('')
    : ''

  return (
    <article className="pb-24">
      <div className="max-w-4xl mx-auto px-8 pt-12 md:pt-20">
        {/* Back button */}
        <Link
          href="/journal"
          className="group flex items-center gap-2 text-neutral-400 hover:text-primary-600 transition-colors mb-12 uppercase text-xs font-black tracking-widest"
        >
          <ChevronLeft
            size={16}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Back to Journal
        </Link>

        {/* Article header */}
        <div className="space-y-6 mb-16">
          <div className="flex items-center gap-4 text-xs font-black uppercase tracking-[0.2em] text-primary-600">
            {date && <span>{date}</span>}
            {date && readTime && (
              <span className="w-1 h-1 bg-neutral-300 rounded-full" />
            )}
            {readTime && (
              <span className="text-neutral-400">{readTime}</span>
            )}
          </div>

          {title && (
            <h1 className="text-5xl md:text-7xl font-light leading-tight tracking-tight">
              {title}
            </h1>
          )}

          {/* Author info */}
          {author && (
            <div className="flex items-center justify-between py-8 border-y border-neutral-200">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-neutral-200 rounded-full flex items-center justify-center font-bold text-neutral-500 uppercase text-sm">
                  {initials}
                </div>
                <div>
                  <p className="text-sm font-bold text-neutral-900">
                    {author}
                  </p>
                  <p className="text-xs text-neutral-400 italic">
                    Lead Designer & Naturalist
                  </p>
                </div>
              </div>
              <div className="flex gap-4 text-neutral-400">
                <Share2
                  size={18}
                  className="hover:text-primary-600 cursor-pointer"
                />
                <Instagram
                  size={18}
                  className="hover:text-primary-600 cursor-pointer"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Hero image */}
      {image && (
        <div className="w-full h-[60vh] mb-16">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="max-w-3xl mx-auto px-8 space-y-8">
        {/* Blockquote */}
        {excerpt && (
          <div className="text-2xl font-serif text-neutral-600 leading-relaxed italic border-l-4 border-primary-500 pl-8 mb-12">
            &ldquo;{excerpt}&rdquo;
          </div>
        )}

        {/* Body content (ProseMirror JSON from collection) */}
        {articleContent && (
          <div className="prose prose-lg prose-neutral max-w-none">
            <ArticleBody content={articleContent} />
          </div>
        )}

        {/* Bottom CTA */}
        <div className="pt-16 border-t border-neutral-200 mt-20">
          <div className="bg-neutral-100 p-10 rounded-[2rem] flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-2 text-center md:text-left">
              <h4 className="text-2xl font-light">
                Inspired by this light?
              </h4>
              <p className="text-neutral-500">
                Explore our handcrafted collection of solar lanterns.
              </p>
            </div>
            <Link
              href="/"
              className="bg-neutral-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-primary-600 transition-colors whitespace-nowrap"
            >
              Shop Collection
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}

export default Article
