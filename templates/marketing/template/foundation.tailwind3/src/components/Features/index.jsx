import React from 'react'
import { cn } from '@uniweb/kit'
import {
  Zap,
  FileText,
  Palette,
  Smartphone,
  Search,
  Rocket,
  Shield,
  Clock,
  Globe,
  Users,
  BarChart3,
  Settings,
  Check,
} from 'lucide-react'

/**
 * Features Component
 *
 * Showcase product features in a responsive grid layout.
 * Supports icons via pretitle (e.g., ### icon:zap)
 */

// Icon mapping - content authors can specify icon by name in pretitle
const iconMap = {
  zap: Zap,
  file: FileText,
  document: FileText,
  palette: Palette,
  design: Palette,
  mobile: Smartphone,
  phone: Smartphone,
  search: Search,
  seo: Search,
  rocket: Rocket,
  deploy: Rocket,
  shield: Shield,
  security: Shield,
  clock: Clock,
  fast: Clock,
  globe: Globe,
  global: Globe,
  users: Users,
  team: Users,
  chart: BarChart3,
  analytics: BarChart3,
  settings: Settings,
  config: Settings,
  check: Check,
}

export function Features({ content, params }) {
  const { title, paragraphs = [], items: features = [] } = content || {}
  const { columns = 3, theme = 'light', style = 'cards' } = params || {}

  const themes = {
    light: {
      section: 'bg-white',
      title: 'text-gray-900',
      description: 'text-gray-600',
      featureTitle: 'text-gray-900',
      featureDesc: 'text-gray-600',
      card: 'bg-gray-50',
      iconBg: 'bg-primary/10',
      icon: 'text-primary',
    },
    gray: {
      section: 'bg-gray-50',
      title: 'text-gray-900',
      description: 'text-gray-600',
      featureTitle: 'text-gray-900',
      featureDesc: 'text-gray-600',
      card: 'bg-white shadow-sm',
      iconBg: 'bg-primary/10',
      icon: 'text-primary',
    },
    dark: {
      section: 'bg-gray-900',
      title: 'text-white',
      description: 'text-gray-400',
      featureTitle: 'text-white',
      featureDesc: 'text-gray-400',
      card: 'bg-gray-800',
      iconBg: 'bg-primary/20',
      icon: 'text-primary',
    },
  }

  const t = themes[theme] || themes.light

  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  }

  const styles = {
    cards: {
      container: cn('p-6 rounded-xl', t.card),
      iconWrapper: cn('w-12 h-12 rounded-lg flex items-center justify-center mb-4', t.iconBg),
    },
    minimal: {
      container: 'text-center',
      iconWrapper: cn('w-14 h-14 rounded-xl flex items-center justify-center mb-4 mx-auto', t.iconBg),
    },
    list: {
      container: 'flex gap-4',
      iconWrapper: cn('w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0', t.iconBg),
    },
  }

  const s = styles[style] || styles.cards

  return (
    <section className={cn('py-20 px-6', t.section)}>
      <div className="max-w-6xl mx-auto">
        {(title || paragraphs[0]) && (
          <div className="text-center mb-16">
            {title && (
              <h2 className={cn('text-3xl md:text-4xl font-bold mb-4', t.title)}>
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

        <div className={cn('grid gap-8', gridCols[columns] || 'md:grid-cols-3')}>
          {features.map((feature, index) => {
            const featureTitle = feature.title
            const featureDesc = feature.paragraphs?.[0]

            // Check for icon in pretitle (e.g., "icon:zap")
            const pretitle = feature.pretitle
            const iconName = pretitle?.startsWith('icon:') ? pretitle.slice(5) : null
            const IconComponent = iconName ? iconMap[iconName] : Check

            return (
              <div key={index} className={s.container}>
                <div className={s.iconWrapper}>
                  <IconComponent className={cn('w-6 h-6', t.icon)} />
                </div>
                {style === 'list' ? (
                  <div>
                    {featureTitle && (
                      <h3 className={cn('text-lg font-semibold mb-1', t.featureTitle)}>
                        {featureTitle}
                      </h3>
                    )}
                    {featureDesc && (
                      <p className={cn('text-sm', t.featureDesc)}>{featureDesc}</p>
                    )}
                  </div>
                ) : (
                  <>
                    {featureTitle && (
                      <h3 className={cn('text-xl font-semibold mb-2', t.featureTitle)}>
                        {featureTitle}
                      </h3>
                    )}
                    {featureDesc && (
                      <p className={t.featureDesc}>{featureDesc}</p>
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
