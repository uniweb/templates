import React, { useState } from 'react'
import { cn } from '@uniweb/kit'
import { ChevronDown, MessageCircle } from 'lucide-react'

/**
 * FAQ Component
 *
 * Collapsible frequently asked questions.
 * Each subsection (H3) becomes a question, with paragraphs as the answer.
 */
function FAQ({ content, params }) {
  // Runtime guarantees: content fields exist, params have defaults from meta.js
  const { title, paragraphs } = content
  const { layout, expandFirst, autoClose } = params

  // Extract questions from semantic groups (H3 patterns)
  const questions = content.items
  const [openItems, setOpenItems] = useState(
    expandFirst ? [0] : []
  )

  const toggleItem = (index) => {
    setOpenItems(prev => {
      const isOpen = prev.includes(index)
      if (isOpen) {
        return prev.filter(i => i !== index)
      }
      return autoClose ? [index] : [...prev, index]
    })
  }

  const FAQItem = ({ question, index }) => {
    const questionText = question.title
    const answerParagraphs = question.paragraphs || []
    const isOpen = openItems.includes(index)

    return (
      <div className="border-b last:border-b-0 border-border">
        <button
          onClick={() => toggleItem(index)}
          className="flex items-center justify-between w-full py-5 text-left transition-colors text-heading hover:text-primary"
          aria-expanded={isOpen}
        >
          <span className="text-lg font-medium pr-4">{questionText}</span>
          <ChevronDown
            className={cn(
              'w-5 h-5 flex-shrink-0 transition-transform duration-200',
              isOpen && 'rotate-180'
            )}
          />
        </button>
        <div
          className={cn(
            'grid transition-all duration-200',
            isOpen ? 'grid-rows-[1fr] opacity-100 pb-5' : 'grid-rows-[0fr] opacity-0'
          )}
        >
          <div className="overflow-hidden">
            {answerParagraphs.map((para, i) => (
              <p key={i} className="mb-3 last:mb-0 text-subtle">
                {para}
              </p>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const isTwoColumn = layout === 'two-column' && questions.length > 4
  const midpoint = Math.ceil(questions.length / 2)

  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        {(title || paragraphs[0]) && (
          <div className="text-center mb-12">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 bg-primary/10">
              <MessageCircle className="w-6 h-6 text-primary" />
            </div>
            {title && (
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-heading">
                {title}
              </h2>
            )}
            {paragraphs[0] && (
              <p className="text-lg max-w-2xl mx-auto text-subtle">
                {paragraphs[0]}
              </p>
            )}
          </div>
        )}

        {isTwoColumn ? (
          <div className="grid md:grid-cols-2 gap-x-12">
            <div>
              {questions.slice(0, midpoint).map((q, index) => (
                <FAQItem key={index} question={q} index={index} />
              ))}
            </div>
            <div>
              {questions.slice(midpoint).map((q, index) => (
                <FAQItem key={index + midpoint} question={q} index={index + midpoint} />
              ))}
            </div>
          </div>
        ) : (
          <div>
            {questions.map((q, index) => (
              <FAQItem key={index} question={q} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default FAQ
