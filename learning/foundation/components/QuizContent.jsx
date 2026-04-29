import { useState } from 'react'
import { Prose } from '@uniweb/kit'

export default function QuizContent({ content, block, params, data }) {
  const quiz = data?.quiz || {}
  const question = quiz.question || content.title || ''
  const options = quiz.options || []

  const [selected, setSelected] = useState(null)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    if (!selected) return
    setSubmitted(true)
  }

  const correctOption = options.find((o) => o.correct)
  const isCorrect = selected && options.find((o) => o.id === selected)?.correct

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <div className="mb-10">
        <Prose content={content} block={block} />
      </div>

      <div className="mb-8">
        <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
          Knowledge Check
        </span>
        <h2 className="text-2xl font-bold text-heading leading-snug">{question}</h2>
      </div>

      <div className="space-y-3 mb-8">
        {options.map((opt) => {
          const isSelected = selected === opt.id
          let stateClass =
            'border-border hover:border-primary-300 hover:bg-muted/50 bg-card'

          if (submitted) {
            if (opt.correct)
              stateClass = 'bg-success/5 border-success ring-1 ring-success'
            else if (isSelected && !opt.correct)
              stateClass = 'bg-error/5 border-error/50'
            else stateClass = 'opacity-50 border-border bg-card'
          } else if (isSelected) {
            stateClass = 'bg-primary/5 border-primary ring-1 ring-primary'
          }

          return (
            <button
              key={opt.id}
              disabled={submitted}
              onClick={() => setSelected(opt.id)}
              className={`w-full flex items-center p-4 rounded-xl border-2 transition-all text-left ${stateClass}`}
            >
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-4 flex-shrink-0 ${
                  submitted && opt.correct
                    ? 'border-success bg-success text-white'
                    : submitted && isSelected && !opt.correct
                      ? 'border-error bg-error text-white'
                      : isSelected
                        ? 'border-primary bg-primary text-white'
                        : 'border-subtle/30'
                }`}
              >
                {submitted && opt.correct ? (
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                ) : submitted && isSelected && !opt.correct ? (
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                ) : isSelected ? (
                  <div className="w-2 h-2 bg-white rounded-full" />
                ) : null}
              </div>
              <span
                className={`text-lg ${submitted && opt.correct ? 'font-bold text-success' : 'text-body'}`}
              >
                {opt.text}
              </span>
            </button>
          )
        })}
      </div>

      {!submitted ? (
        <button
          onClick={handleSubmit}
          disabled={!selected}
          className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
            selected
              ? 'bg-primary hover:bg-primary-hover text-primary-foreground shadow-lg shadow-primary/30'
              : 'bg-muted text-subtle cursor-not-allowed'
          }`}
        >
          Check Answer
        </button>
      ) : (
        <div
          className={`p-4 rounded-xl flex items-start gap-3 ${
            isCorrect
              ? 'bg-success/5 text-success border border-success/20'
              : 'bg-warning/5 text-warning border border-warning/20'
          }`}
        >
          {isCorrect ? (
            <svg className="w-6 h-6 shrink-0 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M18.75 4.236c.982.143 1.954.317 2.916.52A6.003 6.003 0 0 0 16.27 9.728M18.75 4.236V4.5c0 2.108-.966 3.99-2.48 5.228m0 0a6.003 6.003 0 0 1-4.52 1.522 6.003 6.003 0 0 1-4.52-1.522" />
            </svg>
          ) : (
            <svg className="w-6 h-6 shrink-0 text-warning" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
            </svg>
          )}
          <div>
            <h4 className="font-bold">{isCorrect ? 'Excellent Work!' : 'Not quite right.'}</h4>
            <p className="text-sm mt-1 opacity-80">
              {isCorrect
                ? 'You understand the concept perfectly.'
                : `The correct answer is "${correctOption?.text}". Review the lesson material above.`}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
