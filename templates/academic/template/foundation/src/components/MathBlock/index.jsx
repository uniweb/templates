import React from 'react'
import { cn } from '@uniweb/kit'
import { Math, Equation, EquationProvider, EquationRef } from '@uniweb/scholar/math'

/**
 * MathBlock Component
 *
 * Display mathematical equations and formulas using LaTeX notation.
 * Uses @uniweb/scholar for KaTeX-based math rendering.
 *
 * Content structure:
 * - Title: Section heading
 * - Paragraphs: Text with inline math using $...$ or $$...$$ delimiters
 * - Subsections: Named equations (H3 = equation label, paragraph = LaTeX)
 */

/**
 * Parse text and render inline math
 * Supports $...$ for inline and $$...$$ for display math
 */
function renderMathText(text) {
  if (!text) return null

  // Split by math delimiters, preserving delimiters
  const parts = text.split(/(\$\$[^$]+\$\$|\$[^$]+\$)/g)

  return parts.map((part, i) => {
    // Display math: $$...$$
    if (part.startsWith('$$') && part.endsWith('$$')) {
      const latex = part.slice(2, -2).trim()
      return <Math key={i} display>{latex}</Math>
    }
    // Inline math: $...$
    if (part.startsWith('$') && part.endsWith('$')) {
      const latex = part.slice(1, -1).trim()
      return <Math key={i}>{latex}</Math>
    }
    // Regular text
    return part
  })
}

function EquationCard({ item, showNumber }) {
  const { title, paragraphs = [] } = item || {}
  const latex = paragraphs[0] || ''
  const description = paragraphs[1] || ''

  // Use title as equation ID/label
  const id = title?.toLowerCase().replace(/\s+/g, '-') || undefined

  return (
    <div className="my-6">
      <Equation id={id} label={showNumber ? undefined : title}>
        {latex}
      </Equation>
      {description && (
        <p className="text-center text-sm text-slate-600 mt-2 italic">
          {renderMathText(description)}
        </p>
      )}
    </div>
  )
}

export function MathBlock({ content, params }) {
  const { title, pretitle, paragraphs = [], subsections = [] } = content || {}
  const {
    layout = 'standard',
    showNumbers = true,
    background = 'white',
  } = params || {}

  const backgrounds = {
    white: 'bg-white',
    gray: 'bg-slate-50',
    dark: 'bg-slate-900 text-white',
  }

  const hasEquations = subsections.length > 0

  return (
    <EquationProvider>
      <section className={cn('py-12 px-6', backgrounds[background])}>
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          {(pretitle || title) && (
            <div className="mb-8">
              {pretitle && (
                <p className="text-sm uppercase tracking-wide text-primary font-medium mb-2">
                  {pretitle}
                </p>
              )}
              {title && (
                <h2 className={cn(
                  'text-2xl font-bold mb-4',
                  background === 'dark' ? 'text-white' : 'text-slate-900'
                )}>
                  {title}
                </h2>
              )}
            </div>
          )}

          {/* Introductory text with inline math support */}
          {paragraphs.length > 0 && (
            <div className={cn(
              'prose max-w-none mb-8',
              background === 'dark' ? 'prose-invert' : ''
            )}>
              {paragraphs.map((para, i) => (
                <p key={i} className="mb-4 last:mb-0 leading-relaxed">
                  {renderMathText(para)}
                </p>
              ))}
            </div>
          )}

          {/* Named equations from subsections */}
          {hasEquations && (
            <div className={cn(
              'space-y-4',
              layout === 'compact' && 'space-y-2'
            )}>
              {subsections.map((item, i) => (
                <EquationCard
                  key={i}
                  item={item}
                  showNumber={showNumbers}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </EquationProvider>
  )
}

export default MathBlock
