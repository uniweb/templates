import { useState } from 'react'
import { Prose } from '@uniweb/kit'
import AIFeedbackCard from './AIFeedbackCard'

export default function OpenEndedContent({ content, block, params, data }) {
  const rawRubric = data?.rubric
  const rubric = Array.isArray(rawRubric) ? rawRubric : rawRubric ? Object.entries(rawRubric).map(([k, v]) => v ? `${k}: ${v}` : k) : []
  const [answer, setAnswer] = useState('')
  const [isGrading, setIsGrading] = useState(false)
  const [feedback, setFeedback] = useState(null)

  // ------------------------------------------------------------------
  // INTEGRATION POINT: Replace this function with a real API call.
  //
  // Example with fetch:
  //   const res = await fetch('/api/grade', {
  //     method: 'POST',
  //     body: JSON.stringify({ answer, rubric, prompt: content.title }),
  //   })
  //   return await res.json()
  //
  // Expected return shape:
  //   { score: number, message: string, breakdown: Array<{ criterion, status, comment }> }
  // ------------------------------------------------------------------
  const gradeResponse = (submittedAnswer) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          score: 82,
          message: 'Your response shows a solid understanding of the topic. This is demo feedback — connect your own grading API for real analysis.',
          breakdown: rubric.map((criterion, i) => ({
            criterion: typeof criterion === 'string' ? criterion : criterion.text,
            status: i === 0 ? 'pass' : 'partial',
            comment: i === 0 ? 'Well addressed.' : 'Could use more specific detail.',
          })),
        })
      }, 2000)
    })
  }

  const handleSubmit = async () => {
    setIsGrading(true)
    const result = await gradeResponse(answer)
    setIsGrading(false)
    setFeedback(result)
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <div className="bg-muted/50 border border-border rounded-2xl p-6 mb-8 relative">
        <div className="absolute -top-3 left-6 px-2 bg-muted text-xs font-bold text-subtle uppercase tracking-wider rounded">
          Prompt
        </div>
        <Prose content={content} block={block} />
      </div>

      {rubric.length > 0 && (
        <div className="mb-6 p-4 bg-muted/30 border border-border rounded-xl">
          <h4 className="text-xs font-bold uppercase tracking-wider text-subtle mb-2">
            Grading Criteria
          </h4>
          <ul className="space-y-1">
            {rubric.map((item, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-body">
                <svg className="w-4 h-4 text-subtle shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                {typeof item === 'string' ? item : item.text}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="relative mb-6">
        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          disabled={isGrading || !!feedback}
          placeholder="Type your response here..."
          className="w-full h-64 p-6 bg-card border-2 border-border rounded-2xl focus:border-primary focus:ring-4 focus:ring-primary/10 resize-none transition-all text-body text-lg disabled:bg-muted disabled:text-subtle"
        />
        <div className="absolute bottom-4 right-4 text-xs text-subtle font-medium">
          {answer.length} characters
        </div>
      </div>

      {!feedback ? (
        <button
          onClick={handleSubmit}
          disabled={answer.length < 10 || isGrading}
          className={`flex items-center justify-center w-full py-4 rounded-xl font-bold text-lg transition-all ${
            answer.length >= 10 && !isGrading
              ? 'bg-primary-700 hover:bg-primary-800 text-white shadow-lg shadow-primary/30'
              : 'bg-muted text-subtle cursor-not-allowed'
          }`}
        >
          {isGrading ? (
            <>
              <svg className="animate-spin mr-2 w-5 h-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              AI is Grading...
            </>
          ) : (
            <>
              <svg className="mr-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
              </svg>
              Submit for AI Review
            </>
          )}
        </button>
      ) : (
        <AIFeedbackCard
          score={feedback.score}
          feedback={feedback.message}
          breakdown={feedback.breakdown}
          demo
        />
      )}
    </div>
  )
}
