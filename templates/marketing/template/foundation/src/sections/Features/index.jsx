import React from 'react'
import { cn, Icon } from '@uniweb/kit'

/**
 * Features Component
 *
 * Showcase product features in a responsive grid layout.
 * Icons are specified via markdown image syntax: ![](lu-zap)
 */

export function Features({ content, params }) {
  // Runtime guarantees: content fields exist, params have defaults from meta.js
  const { title, paragraphs } = content
  const { columns, style } = params

  // Items come from semantic-parser groups (icon + H3 title patterns)
  const features = content.items

  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  }

  const styles = {
    cards: {
      container: 'p-6 rounded-xl bg-surface-subtle',
      iconWrapper: 'w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-primary/10',
    },
    minimal: {
      container: 'text-center',
      iconWrapper: 'w-14 h-14 rounded-xl flex items-center justify-center mb-4 mx-auto bg-primary/10',
    },
    list: {
      container: 'flex gap-4',
      iconWrapper: 'w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-primary/10',
    },
  }

  const s = styles[style] || styles.cards

  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {(title || paragraphs[0]) && (
          <div className="text-center mb-16">
            {title && (
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-heading">
                {title}
              </h2>
            )}
            {paragraphs[0] && (
              <p className="text-lg max-w-2xl mx-auto text-muted">
                {paragraphs[0]}
              </p>
            )}
          </div>
        )}

        <div className={cn('grid gap-8', gridCols[columns] || 'md:grid-cols-3')}>
          {features.map((feature, index) => {
            const featureTitle = feature.title
            const featureDesc = feature.paragraphs?.[0]

            // Get icon from feature's icons array (parsed from ![](lu-zap) syntax)
            const icon = feature.icons?.[0]

            return (
              <div key={index} className={s.container}>
                {icon && (
                  <div className={s.iconWrapper}>
                    <Icon
                      library={icon.library}
                      name={icon.name}
                      size={24}
                      className="text-primary"
                    />
                  </div>
                )}
                {style === 'list' ? (
                  <div>
                    {featureTitle && (
                      <h3 className="text-lg font-semibold mb-1 text-heading">
                        {featureTitle}
                      </h3>
                    )}
                    {featureDesc && (
                      <p className="text-sm text-muted">{featureDesc}</p>
                    )}
                  </div>
                ) : (
                  <>
                    {featureTitle && (
                      <h3 className="text-xl font-semibold mb-2 text-heading">
                        {featureTitle}
                      </h3>
                    )}
                    {featureDesc && (
                      <p className="text-muted">{featureDesc}</p>
                    )}
                  </>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Features
