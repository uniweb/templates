import React from 'react'
import { cn, Text } from '@uniweb/kit'
import { Equation, EquationProvider } from '@uniweb/scholar/math'

/**
 * MathBlock Component
 *
 * Inline/display LaTeX inside paragraphs is handled by the content
 * pipeline: authors write `$x^2$`, `$$\int f\,dx$$`, or fenced ```math
 * blocks and the browser renders real MathML natively. No runtime math
 * library needed here.
 *
 * This block's distinct job is the numbered-equation feature: each
 * subsection becomes a numbered display equation that other text can
 * cross-reference via <EquationRef id="...">. See @uniweb/scholar/math.
 *
 * Content structure:
 * - Title / pretitle: section header.
 * - Paragraphs: prose. Inline math is already compiled into the paragraph HTML.
 * - Math: display equations from $$...$$ or ```math fences (content.math).
 * - Subsections: numbered cross-referenceable equations.
 */

function EquationCard({ item, showNumber }) {
  const { title, paragraphs = [] } = item || {}
  const latex = paragraphs[0] || ''
  const description = paragraphs[1] || ''

  const id = title?.toLowerCase().replace(/\s+/g, '-') || undefined

  return (
    <div className="my-6">
      <Equation id={id} label={showNumber ? undefined : title}>
        {latex}
      </Equation>
      {description && (
        <Text
          as="p"
          text={description}
          className="text-center text-sm text-subtle mt-2 italic"
        />
      )}
    </div>
  )
}

function MathBlock({ content, params }) {
  const { title, pretitle, paragraphs = [], subsections = [], math = [] } =
    content || {}
  const {
    layout = 'standard',
    showNumbers = true,
  } = params || {}

  const hasEquations = subsections.length > 0
  const hasDisplayMath = math.length > 0

  return (
    <EquationProvider>
      <section className="py-12 px-6">
        <div className="max-w-3xl mx-auto">
          {(pretitle || title) && (
            <div className="mb-8">
              {pretitle && (
                <p className="text-sm uppercase tracking-wide text-primary font-medium mb-2">
                  {pretitle}
                </p>
              )}
              {title && (
                <h2 className="text-2xl font-bold mb-4 text-heading">{title}</h2>
              )}
            </div>
          )}

          {paragraphs.length > 0 && (
            <div className="prose max-w-none mb-8 text-body">
              {paragraphs.map((para, i) => (
                <Text
                  key={i}
                  as="p"
                  text={para}
                  className="mb-4 last:mb-0 leading-relaxed"
                />
              ))}
            </div>
          )}

          {hasDisplayMath && (
            <div className="space-y-4 mb-8">
              {math.map((m, i) => (
                <div
                  key={`math-${i}`}
                  className="overflow-x-auto py-2"
                  dangerouslySetInnerHTML={{ __html: m.mathml }}
                />
              ))}
            </div>
          )}

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
