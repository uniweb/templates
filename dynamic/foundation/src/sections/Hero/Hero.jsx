import React from 'react'
import { H1, P, Link, Icon, cn } from '@uniweb/kit'
import { Activity } from 'lucide-react'
import WeatherCard from './WeatherCard.jsx'

function Hero({ content, params, block }) {
  const { title, pretitle, paragraphs, links } = content
  const weather = content.data?.weather || null
  const loading = block.dataLoading

  const cta = links[0]
  const secondaryCta = links[1]
  const description = paragraphs[0]

  return (
    <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
      <div className="space-y-6">
        {pretitle && (
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-100 text-primary-800 text-xs font-bold uppercase tracking-wide">
            <Activity className="w-3 h-3" />
            {pretitle}
          </span>
        )}

        {title && (
          <H1
            text={title}
            className="text-4xl md:text-5xl font-extrabold leading-none text-heading"
          />
        )}

        {description && (
          <P
            text={description}
            className="text-lg leading-relaxed max-w-lg text-subtle"
          />
        )}

        {(cta || secondaryCta) && (
          <div className="flex gap-4 pt-2 flex-wrap">
            {cta && (
              <Link
                href={cta.href}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all bg-primary text-primary-foreground hover:bg-primary-hover shadow-lg shadow-primary-300/50"
              >
                {cta.iconBefore && <Icon icon={cta.iconBefore} size="16" />}
                {cta.label}
              </Link>
            )}
            {secondaryCta && (
              <Link
                href={secondaryCta.href}
                className="px-6 py-3 rounded-xl font-bold text-body hover:bg-muted transition-colors"
              >
                {secondaryCta.label}
              </Link>
            )}
          </div>
        )}
      </div>

      <div className="flex justify-center md:justify-end animate-fade-in-up">
        <WeatherCard weather={weather} loading={loading} />
      </div>
    </div>
  )
}

Hero.className = 'py-16 md:py-24 border-b border-border'

export default Hero
