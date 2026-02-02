import { H2, P } from '@uniweb/kit'

/**
 * Story Component
 *
 * Centered headline with optional accent text, descriptive paragraph,
 * and a full-width featured image. Used for brand storytelling.
 */
export function Story({ content }) {
  const { title, paragraphs, imgs } = content
  const image = imgs[0]

  return (
    <div className="max-w-4xl mx-auto px-8 py-24 space-y-16">
      <div className="text-center space-y-6">
        {title && (
          <H2
            text={title}
            className="text-4xl md:text-5xl font-light"
          />
        )}
        {paragraphs[0] && (
          <P
            text={paragraphs[0]}
            className="text-xl text-neutral-500 leading-relaxed"
          />
        )}
      </div>

      {image && (
        <img
          src={image.url || image.src}
          alt={image.alt || ''}
          className="w-full h-[500px] object-cover rounded-[3rem]"
        />
      )}
    </div>
  )
}

export default Story
