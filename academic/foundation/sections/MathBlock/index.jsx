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
 * This block's distinct job is the numbered-equation feature. Authors
 * label equations in markdown with a `:<id>` suffix on a math fence:
 *
 *     ```math:cross-entropy
 *     \mathcal{L}_{CE} = -\sum_{c=1}^{C} y_c \log(\hat{y}_c)
 *     ```
 *
 * Labeled equations are rendered through <Equation> with automatic
 * sequential numbering; other prose can cross-reference them with
 * <EquationRef id="cross-entropy" />. See @uniweb/scholar/math.
 *
 * Unlabeled display math (plain $$...$$ or ```math without a tag)
 * renders as pretty display math without a number.
 */

function MathBlock({ content, params }) {
  const { title, pretitle, paragraphs = [], math = [] } = content || {}
  const {
    layout = 'standard',
    showNumbers = true,
  } = params || {}

  const labeled = math.filter((m) => m.id)
  const unlabeled = math.filter((m) => !m.id)

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

          {unlabeled.length > 0 && (
            <div className="space-y-4 mb-8">
              {unlabeled.map((m, i) => (
                <div
                  key={`math-${i}`}
                  className="overflow-x-auto py-2"
                  dangerouslySetInnerHTML={{ __html: m.mathml }}
                />
              ))}
            </div>
          )}

          {labeled.length > 0 && (
            <div
              className={cn(
                'space-y-4',
                layout === 'compact' && 'space-y-2'
              )}
            >
              {labeled.map((m) => (
                <Equation
                  key={m.id}
                  id={m.id}
                  mathml={m.mathml}
                  label={showNumbers ? undefined : ''}
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
