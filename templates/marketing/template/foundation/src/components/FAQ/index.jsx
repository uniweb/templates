import React, { useState } from 'react'
import { cn } from '@uniweb/kit'
import { ChevronDown, MessageCircle } from 'lucide-react'

/**
 * FAQ Component
 *
 * Collapsible frequently asked questions.
 * Each subsection (H3) becomes a question, with paragraphs as the answer.
 */
export function FAQ({ content, params }) {
  const { title } = content.main?.header || {}
  const { paragraphs = [] } = content.main?.body || {}
  const {
    theme = 'light',
    layout = 'single',
    expandFirst = true,
  } = params || {}

  const questions = content.subsections || []
  const [openItems, setOpenItems] = useState(
    expandFirst ? [0] : []
  )

  const toggleItem = (index) => {
    setOpenItems(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  const themes = {
    light: {
      section: 'bg-white',
      title: 'text-gray-900',
      description: 'text-gray-600',
      question: 'text-gray-900 hover:text-primary',
      answer: 'text-gray-600',
      border: 'border-gray-200',
      iconBg: 'bg-primary/10',
      icon: 'text-primary',
    },
    gray: {
      section: 'bg-gray-50',
      title: 'text-gray-900',
      description: 'text-gray-600',
      question: 'text-gray-900 hover:text-primary',
      answer: 'text-gray-600',
      border: 'border-gray-200',
      iconBg: 'bg-primary/10',
      icon: 'text-primary',
    },
    dark: {
      section: 'bg-gray-900',
      title: 'text-white',
      description: 'text-gray-400',
      question: 'text-white hover:text-primary',
      answer: 'text-gray-400',
      border: 'border-gray-700',
      iconBg: 'bg-primary/20',
      icon: 'text-primary',
    },
  }

  const t = themes[theme] || themes.light

  const FAQItem = ({ question, index }) => {
    const questionText = question.header?.title
    const answerParagraphs = question.body?.paragraphs || []
    const isOpen = openItems.includes(index)

    return (
      <div className={cn('border-b last:border-b-0', t.border)}>
        <button
          onClick={() => toggleItem(index)}
          className={cn(
            'flex items-center justify-between w-full py-5 text-left transition-colors',
            t.question
          )}
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
              <p key={i} className={cn('mb-3 last:mb-0', t.answer)}>
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
    <section className={cn('py-20 px-6', t.section)}>
      <div className="max-w-4xl mx-auto">
        {(title || paragraphs[0]) && (
          <div className="text-center mb-12">
            <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4', t.iconBg)}>
              <MessageCircle className={cn('w-6 h-6', t.icon)} />
            </div>
            {title && (
              <h2 className={cn('text-3xl sm:text-4xl font-bold mb-4', t.title)}>
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
