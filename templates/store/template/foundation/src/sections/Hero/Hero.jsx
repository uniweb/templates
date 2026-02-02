import { H1, P, Link } from '@uniweb/kit'

/**
 * Hero Component
 *
 * Full-width hero with background image overlay, large headline
 * with optional accent text, subtitle, and CTA button.
 * Background is handled by the engine (frontmatter background property).
 */
function Hero({ content }) {
  const { title, paragraphs, links } = content

  return (
    <div className="min-h-[80vh] flex items-center justify-center text-center px-4">
      <div className="relative z-10 max-w-4xl mx-auto">
        {title && (
          <H1
            text={title}
            className="text-6xl md:text-8xl lg:text-9xl font-light mb-8"
          />
        )}

        {paragraphs[0] && (
          <P
            text={paragraphs[0]}
            className="max-w-xl mx-auto text-neutral-400 mb-10 text-lg"
          />
        )}

        {links[0] && (
          <Link
            href={links[0].href}
            className="inline-block bg-primary-600 hover:bg-primary-500 text-white font-bold py-5 px-10 rounded-2xl transition-all shadow-2xl"
          >
            {links[0].label}
          </Link>
        )}
      </div>
    </div>
  )
}

Hero.className = 'text-white'

export default Hero
