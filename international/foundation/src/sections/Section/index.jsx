import React from 'react'
import { H2, P, Icon, cn } from '@uniweb/kit'

/**
 * Section Component
 *
 * A general-purpose content section with title, description, and items.
 */
function Section({ content }) {
  const { title, subtitle, paragraphs = [], items = [] } = content || {}

  return (
    <div className="py-16 sm:py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {(title || subtitle) && (
          <div className="text-center mb-12">
            {title && <H2 text={title} className="text-3xl sm:text-4xl font-bold mb-4 text-heading" />}
            {subtitle && <p className="text-lg text-subtle">{subtitle}</p>}
            {paragraphs[0] && <P text={paragraphs[0]} className="text-lg mt-4 max-w-2xl mx-auto text-subtle" />}
          </div>
        )}

        {items.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((item, i) => {
              const icon = item.icons?.[0]
              return (
                <div key={i} className="p-6 rounded-xl bg-section shadow-sm border border-border/50 border-t-2 border-t-primary-500">
                  {icon && (
                    <div className="w-10 h-10 rounded-lg bg-primary-100/50 text-primary-600 flex items-center justify-center mb-4">
                      <Icon icon={icon} size={20} />
                    </div>
                  )}
                  {item.title && <h3 className="text-xl font-semibold mb-2 text-heading">{item.title}</h3>}
                  {item.paragraphs?.[0] && <P text={item.paragraphs[0]} className="text-subtle" />}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default Section
