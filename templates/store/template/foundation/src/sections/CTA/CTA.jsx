import { H2, P, Link, Icon } from '@uniweb/kit'
import { Zap } from 'lucide-react'

/**
 * CTA Component
 *
 * Bold call-to-action banner with primary color background.
 * Renders its own background (background: 'self' in meta.js).
 * Supports an optional decorative icon and CTA link.
 */
export function CTA({ content }) {
  const { title, paragraphs, links, icons } = content

  return (
    <div className="bg-primary-600 p-12 md:p-16 rounded-[3rem] text-neutral-900 my-8 mx-4 md:mx-8">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 space-y-6">
          {title && (
            <H2
              text={title}
              className="text-3xl md:text-4xl font-bold tracking-tight"
            />
          )}
          {paragraphs[0] && (
            <P
              text={paragraphs[0]}
              className="text-primary-950 font-medium leading-relaxed"
            />
          )}
          {links[0] && (
            <Link
              href={links[0].href}
              className="inline-block bg-neutral-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-neutral-800 transition-colors mt-4"
            >
              {links[0].label}
            </Link>
          )}
        </div>

        <div className="w-48 h-48 bg-white/20 rounded-full flex items-center justify-center">
          {icons[0] ? (
            <Icon {...icons[0]} size={80} />
          ) : (
            <Zap size={80} />
          )}
        </div>
      </div>
    </div>
  )
}

export default CTA
