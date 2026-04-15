import { SafeHtml } from '@uniweb/kit'

/**
 * Summary — renders the career summary prose.
 *
 * This component is deliberately simple and has zero knowledge of
 * Loom. By the time it receives its props, the foundation's content
 * handler (see `foundation.js`) has already run every `{placeholder}`
 * expression in the authored markdown against the profile data, and
 * the framework has re-parsed the result. `content.title` and
 * `content.paragraphs` arrive with the placeholders already resolved.
 *
 * Paragraphs are HTML strings from the semantic parser — inline
 * `<strong>` / `<em>` marks from the markdown flow through as real
 * formatting. `SafeHtml` renders them, sanitized, through the kit.
 */
export default function Summary({ content }) {
  const { title, paragraphs = [] } = content || {}

  return (
    <section className="py-16 px-6">
      <div className="max-w-3xl mx-auto summary-prose">
        {title && (
          <h1 className="text-heading text-4xl font-bold mb-8 leading-tight">
            {title}
          </h1>
        )}
        {paragraphs.map((para, index) => (
          <SafeHtml key={index} as="p" value={para} />
        ))}
      </div>
    </section>
  )
}
