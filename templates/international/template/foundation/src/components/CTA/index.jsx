import React from 'react'
import { H2, P, Link, cn } from '@uniweb/kit'

/**
 * CTA Component
 *
 * A call-to-action section.
 */
export function CTA({ content, params }) {
  const { title, subtitle } = content.main?.header || {}
  const { paragraphs = [], links = [] } = content.main?.body || {}
  const { theme = 'primary' } = params || {}

  const cta = links[0]

  const themes = {
    primary: {
      section: 'bg-primary',
      title: 'text-white',
      text: 'text-blue-100',
      btn: 'bg-white text-primary hover:bg-blue-50',
    },
    dark: {
      section: 'bg-gray-900',
      title: 'text-white',
      text: 'text-gray-300',
      btn: 'bg-primary text-white hover:bg-blue-600',
    },
    light: {
      section: 'bg-gray-100',
      title: 'text-gray-900',
      text: 'text-gray-600',
      btn: 'bg-primary text-white hover:bg-blue-700',
    },
  }

  const t = themes[theme] || themes.primary

  return (
    <section className={cn('py-16 sm:py-20 px-6', t.section)}>
      <div className="max-w-3xl mx-auto text-center">
        {title && <H2 text={title} className={cn('text-3xl sm:text-4xl font-bold mb-4', t.title)} />}
        {subtitle && <p className={cn('text-xl mb-4', t.text)}>{subtitle}</p>}
        {paragraphs[0] && <P text={paragraphs[0]} className={cn('text-lg mb-8', t.text)} />}
        {cta && (
          <Link
            href={cta.href}
            className={cn('inline-flex items-center px-8 py-4 font-semibold rounded-xl transition-all', t.btn)}
          >
            {cta.label}
          </Link>
        )}
      </div>
    </section>
  )
}

export default CTA
