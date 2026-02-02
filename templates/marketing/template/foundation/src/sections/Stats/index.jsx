import React from 'react'
import { cn } from '@uniweb/kit'
import { TrendingUp, Users, Zap, Globe, Award, BarChart3 } from 'lucide-react'

/**
 * Stats Component
 *
 * Display key metrics and statistics with optional icons.
 * Each subsection becomes a stat card.
 *
 * Content structure:
 * - H3 becomes the stat value (e.g., "10M+", "99.9%")
 * - First paragraph becomes the label
 * - Second paragraph (optional) becomes description
 */

// Icon mapping - content authors can specify icon by name
const iconMap = {
  trending: TrendingUp,
  users: Users,
  zap: Zap,
  globe: Globe,
  award: Award,
  chart: BarChart3,
}

function Stats({ content, params }) {
  // Runtime guarantees: content fields exist, params have defaults from meta.js
  const { title, paragraphs } = content
  const { columns, style } = params

  // Extract stats from semantic groups (H3 patterns)
  const stats = content.items

  const gridCols = {
    2: 'sm:grid-cols-2',
    3: 'sm:grid-cols-3',
    4: 'sm:grid-cols-2 lg:grid-cols-4',
  }

  // Simple style: just value and label
  // Cards style: adds background and optional icon
  // Bordered style: adds dividers between stats
  const styleVariants = {
    simple: {
      container: 'text-center',
      card: '',
    },
    cards: {
      container: '',
      card: 'p-6 rounded-xl bg-surface-subtle',
    },
    bordered: {
      container: 'text-center',
      card: 'p-6 border-l first:border-l-0 border-edge-muted',
    },
  }

  const s = styleVariants[style] || styleVariants.simple

  return (
    <section className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {(title || paragraphs[0]) && (
          <div className="text-center mb-12">
            {title && (
              <h2 className="text-3xl font-bold mb-4 text-heading">
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

        <div className={cn('grid gap-8', gridCols[columns] || 'sm:grid-cols-4')}>
          {stats.map((stat, index) => {
            const value = stat.title
            const label = stat.paragraphs?.[0]
            const description = stat.paragraphs?.[1]

            // Check for icon in the pretitle (e.g., "icon:users")
            const pretitle = stat.pretitle
            const iconName = pretitle?.startsWith('icon:') ? pretitle.slice(5) : null
            const IconComponent = iconName ? iconMap[iconName] : null

            return (
              <div
                key={index}
                className={cn(s.container, s.card)}
              >
                {IconComponent && style === 'cards' && (
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-primary/10">
                    <IconComponent className="w-6 h-6 text-primary" />
                  </div>
                )}
                {value && (
                  <div className="text-4xl sm:text-5xl font-bold mb-2 text-heading">
                    {value}
                  </div>
                )}
                {label && (
                  <div className="text-sm font-medium uppercase tracking-wide text-muted">
                    {label}
                  </div>
                )}
                {description && (
                  <p className="mt-2 text-sm text-muted">
                    {description}
                  </p>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Stats
