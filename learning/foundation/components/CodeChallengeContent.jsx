import { useState } from 'react'
import { Prose } from '@uniweb/kit'
import AIFeedbackCard from './AIFeedbackCard'
import splitContent from '#utils/splitContent'

export default function CodeChallengeContent({ content, block, params, data }) {
  const { lesson, challenge } = splitContent(content)
  const requirements = data?.requirements || []
  const rubric = data?.rubric || []
  const resources = data?.resources || []
  const snippets = content.snippets || []
  const snippet = snippets.length > 0 ? snippets[snippets.length - 1] : {}

  const [code, setCode] = useState(snippet.code || '// Your code here\n')
  const [isGrading, setIsGrading] = useState(false)
  const [feedback, setFeedback] = useState(null)
  const [consoleOutput, setConsoleOutput] = useState('')

  // ------------------------------------------------------------------
  // INTEGRATION POINT: Replace this function with a real API call.
  //
  // Example with fetch:
  //   const res = await fetch('/api/grade', {
  //     method: 'POST',
  //     body: JSON.stringify({ code, rubric, requirements }),
  //   })
  //   return await res.json()
  //
  // Expected return shape:
  //   { score: number, message: string, breakdown: Array<{ criterion, status, comment }> }
  // ------------------------------------------------------------------
  const gradeCode = (submittedCode) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          score: 78,
          message: 'Your code demonstrates a solid understanding of the concepts. This is demo feedback — connect your own grading API for real analysis.',
          breakdown: rubric.map((criterion, i) => ({
            criterion: typeof criterion === 'string' ? criterion : criterion.text,
            status: i === 0 ? 'pass' : i === 1 ? 'partial' : 'pass',
            comment: i === 0 ? 'Well structured.' : i === 1 ? 'Could be more specific.' : 'Good approach.',
          })),
        })
      }, 1500)
    })
  }

  const handleSubmit = async () => {
    setIsGrading(true)
    setConsoleOutput('> Running code...\n')

    const result = await gradeCode(code)

    setConsoleOutput((prev) => prev + '> Analysis complete.\n')
    setIsGrading(false)
    setFeedback(result)
  }

  const lineCount = code.split('\n').length
  const lineNumbers = Array.from({ length: Math.max(10, lineCount) }, (_, i) => i + 1)

  return (
    <div className="py-8 px-4">
      {/* Lesson material — clean reading prose before the challenge */}
      <div className="max-w-3xl mx-auto mb-12">
        <Prose content={lesson || content} block={block} />

        {resources.length > 0 && (
          <div className="mt-12 p-6 bg-primary-50/50 rounded-2xl border border-primary-100">
            <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-primary-800 mb-4">
              <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
              </svg>
              External Resources
            </h3>
            <ul className="space-y-3">
              {resources.map((res, i) => (
                <li key={i}>
                  <a href={res.url} target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 bg-card rounded-xl border border-primary-100 hover:border-primary-300 hover:shadow-sm transition-all group no-underline">
                    <span className="font-medium text-body group-hover:text-primary">{res.title}</span>
                    <svg className="w-4 h-4 text-subtle group-hover:text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Challenge description when split from lesson material */}
        {lesson && challenge.sequence?.length > 0 && (
          <div className="max-w-3xl mb-8">
            <Prose content={challenge} block={block} />
          </div>
        )}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Requirements sidebar */}
          <div className="w-full lg:w-1/3">
            {requirements.length > 0 && (
              <div className="p-4 bg-muted/50 rounded-xl border border-border mb-6 lg:sticky lg:top-20">
                <h3 className="text-xs font-bold uppercase tracking-wider text-subtle mb-2">
                  Requirements
                </h3>
                <ul className="space-y-2 text-sm text-body">
                  {requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-subtle mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                      </svg>
                      {typeof req === 'string' ? req : req.text || ''}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Code editor + feedback */}
          <div className="w-full lg:w-2/3 flex flex-col gap-4">
            <div className="rounded-2xl overflow-hidden shadow-xl border border-neutral-800 bg-[#0d1117] flex flex-col min-h-[400px]">
              <div className="flex items-center justify-between px-4 py-3 bg-[#161b22] border-b border-neutral-800">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m6.75 7.5 3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0 0 21 18V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v12a2.25 2.25 0 0 0 2.25 2.25Z" />
                  </svg>
                  <span className="text-xs font-mono text-neutral-300">
                    {snippet.language || 'javascript'}.{snippet.language === 'python' ? 'py' : 'js'}
                  </span>
                </div>
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-neutral-700" />
                  <div className="w-3 h-3 rounded-full bg-neutral-700" />
                  <div className="w-3 h-3 rounded-full bg-neutral-700" />
                </div>
              </div>

              <div className="flex flex-1 overflow-hidden">
                <div className="w-12 bg-[#161b22] border-r border-neutral-800 flex flex-col items-end py-4 px-2 select-none font-mono text-xs text-neutral-600">
                  {lineNumbers.map((n) => (
                    <div key={n} className="leading-relaxed">
                      {n}
                    </div>
                  ))}
                </div>
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  disabled={isGrading || !!feedback}
                  spellCheck={false}
                  className="flex-1 p-4 bg-[#0d1117] text-[#c9d1d9] font-mono text-sm leading-relaxed focus:outline-none resize-none disabled:opacity-70 whitespace-pre"
                />
              </div>

              <div className="p-4 bg-[#161b22] border-t border-neutral-800 flex justify-between items-center">
                <div className="text-xs font-mono text-neutral-500">
                  {snippet.language || 'JavaScript'}
                </div>
                {!feedback && (
                  <button
                    onClick={handleSubmit}
                    disabled={isGrading}
                    className={`flex items-center justify-center px-6 py-2 rounded-lg font-bold text-sm transition-all ${
                      !isGrading
                        ? 'bg-primary hover:bg-primary-hover text-white shadow-lg shadow-primary/20'
                        : 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                    }`}
                  >
                    {isGrading ? (
                      <>
                        <svg className="animate-spin mr-2 w-4 h-4" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Running...
                      </>
                    ) : (
                      <>
                        <svg className="mr-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z" />
                        </svg>
                        Run Code
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>

            {(consoleOutput || isGrading) && (
              <div className="rounded-xl bg-black border border-neutral-800 p-4 font-mono text-sm h-32 overflow-y-auto">
                <div className="text-neutral-500 mb-2 border-b border-neutral-800 pb-2 text-xs uppercase tracking-wider">
                  Console
                </div>
                <pre className="text-green-400 whitespace-pre-wrap font-mono text-xs">
                  {consoleOutput}
                  {isGrading && <span className="animate-pulse">_</span>}
                </pre>
              </div>
            )}

            {feedback && (
              <AIFeedbackCard
                score={feedback.score}
                feedback={feedback.message}
                breakdown={feedback.breakdown}
                demo
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
