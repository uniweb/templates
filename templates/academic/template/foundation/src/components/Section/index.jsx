import React from 'react'
import { cn } from '@uniweb/kit'

/**
 * Section Component
 *
 * Layout container with background and spacing options.
 * Used to wrap other components or provide visual separation.
 */
export function Section({ content, params }) {
  const { title, paragraphs = [] } = content || {}
  const {
    background = 'white',
    padding = 'lg',
    maxWidth = 'regular',
  } = params || {}

  const backgrounds = {
    white: 'bg-white',
    gray: 'bg-slate-50',
    dark: 'bg-slate-900 text-white',
    primary: 'bg-primary text-white',
    gradient: 'bg-gradient-to-br from-slate-50 to-slate-100',
  }

  const paddings = {
    none: '',
    sm: 'py-8',
    md: 'py-12',
    lg: 'py-16',
    xl: 'py-24',
  }

  const widths = {
    narrow: 'max-w-3xl',
    regular: 'max-w-5xl',
    wide: 'max-w-7xl',
    full: 'max-w-none',
  }

  return (
    <section className={cn(backgrounds[background], paddings[padding], 'px-6')}>
      <div className={cn('mx-auto', widths[maxWidth])}>
        {(title || paragraphs[0]) && (
          <div className="mb-10">
            {title && (
              <h2 className={cn(
                'text-2xl font-bold mb-3',
                background === 'dark' || background === 'primary' ? 'text-white' : 'text-slate-900'
              )}>
                {title}
              </h2>
            )}
            {paragraphs[0] && (
              <p className={cn(
                'text-lg',
                background === 'dark' || background === 'primary' ? 'text-white/80' : 'text-slate-600'
              )}>
                {paragraphs[0]}
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  )
}

export default Section
