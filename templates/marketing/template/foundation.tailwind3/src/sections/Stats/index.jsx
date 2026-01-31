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

export function Stats({ content, params }) {
  const { title, paragraphs = [], items: stats = [] } = content || {}
  const {
    theme = 'light',
    columns = 4,
    style = 'simple',
  } = params || {}

  const themes = {
    light: {
      section: 'bg-white',
      title: 'text-gray-900',
      description: 'text-gray-600',
      value: 'text-gray-900',
      label: 'text-gray-600',
      card: '',
      icon: 'text-primary',
      iconBg: 'bg-primary/10',
      border: 'border-gray-100',
    },
    gray: {
      section: 'bg-gray-50',
      title: 'text-gray-900',
      description: 'text-gray-600',
      value: 'text-gray-900',
      label: 'text-gray-600',
      card: 'bg-white shadow-sm',
      icon: 'text-primary',
      iconBg: 'bg-primary/10',
      border: 'border-gray-200',
    },
    dark: {
      section: 'bg-gray-900',
      title: 'text-white',
      description: 'text-gray-400',
      value: 'text-white',
      label: 'text-gray-400',
      card: 'bg-gray-800',
      icon: 'text-primary',
      iconBg: 'bg-primary/20',
      border: 'border-gray-700',
    },
    primary: {
      section: 'bg-primary',
      title: 'text-white',
      description: 'text-blue-100',
      value: 'text-white',
      label: 'text-blue-100',
      card: 'bg-white/10 backdrop-blur-sm',
      icon: 'text-white',
      iconBg: 'bg-white/20',
      border: 'border-white/20',
    },
  }

  const t = themes[theme] || themes.light

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
      card: cn('p-6 rounded-xl', t.card),
    },
    bordered: {
      container: 'text-center',
      card: cn('p-6 border-l first:border-l-0', t.border),
    },
  }

  const s = styleVariants[style] || styleVariants.simple

  return (
    <section className={cn('py-16 px-6', t.section)}>
      <div className="max-w-6xl mx-auto">
        {(title || paragraphs[0]) && (
          <div className="text-center mb-12">
            {title && (
              <h2 className={cn('text-3xl font-bold mb-4', t.title)}>
                {title}
              </h2>
            )}
            {paragraphs[0] && (
              <p className={cn('text-lg max-w-2xl mx-auto', t.description)}>
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
                  <div className={cn('w-12 h-12 rounded-lg flex items-center justify-center mb-4', t.iconBg)}>
                    <IconComponent className={cn('w-6 h-6', t.icon)} />
                  </div>
                )}
                {value && (
                  <div className={cn('text-4xl sm:text-5xl font-bold mb-2', t.value)}>
                    {value}
                  </div>
                )}
                {label && (
                  <div className={cn('text-sm font-medium uppercase tracking-wide', t.label)}>
                    {label}
                  </div>
                )}
                {description && (
                  <p className={cn('mt-2 text-sm', t.description)}>
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
