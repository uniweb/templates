// AIFeedbackCard — renders grading results from any backend.
//
// Props:
//   score:     number (0–100)
//   feedback:  string (overall feedback message)
//   breakdown: Array<{ criterion: string, status: 'pass'|'partial'|'fail', comment: string }>
//   demo:      boolean (shows demo banner when true)
//
// This component is backend-agnostic. Replace the simulated grading
// in CodeChallengeContent.jsx and OpenEndedContent.jsx with real API
// calls — the result shape stays the same.

export default function AIFeedbackCard({ score, feedback, breakdown, demo }) {
  return (
    <div className="mt-6">
      <div className="bg-gradient-to-r from-primary-50 to-purple-50 rounded-2xl p-6 border border-primary-100 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <svg className="w-[100px] h-[100px] text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="0.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
          </svg>
        </div>

        <div className="relative z-10">
          {demo && (
            <div className="mb-4 px-3 py-1.5 bg-amber-100 text-amber-800 rounded-lg text-xs font-semibold inline-block">
              Demo — connect your grading API for production use
            </div>
          )}

          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-primary-100 text-primary rounded-lg">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-primary-900 text-lg">AI Grading Complete</h3>
              <p className="text-sm text-primary-700/80">Analyzed against course rubrics</p>
            </div>
            <div className="ml-auto flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-primary-50">
              <span className="text-sm font-bold text-subtle">Score</span>
              <span
                className={`text-xl font-black ${
                  score >= 80
                    ? 'text-success'
                    : score >= 60
                      ? 'text-warning'
                      : 'text-error'
                }`}
              >
                {score}/100
              </span>
            </div>
          </div>

          <p className="text-primary-900 leading-relaxed mb-6">{feedback}</p>

          {breakdown?.length > 0 && (
            <div className="space-y-3 bg-white/60 rounded-xl p-4 border border-primary-50/50">
              <h4 className="text-xs font-bold uppercase tracking-wider text-primary-800 mb-2">
                Detailed Breakdown
              </h4>
              {breakdown.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="mt-0.5">
                    {item.status === 'pass' ? (
                      <svg className="w-4 h-4 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                      </svg>
                    ) : item.status === 'partial' ? (
                      <svg className="w-4 h-4 text-warning" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4 text-error" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-heading block">
                      {item.criterion}
                    </span>
                    <span className="text-xs text-subtle">{item.comment}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
