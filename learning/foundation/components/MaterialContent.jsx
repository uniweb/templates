import { Prose } from '@uniweb/kit'

export default function MaterialContent({ content, block, params, data }) {
  const resources = data?.resources || []
  const hasVideo = params.video === 'true' || params.video === true

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      {hasVideo && (
        <div className="aspect-video bg-neutral-900 rounded-2xl mb-10 relative group overflow-hidden shadow-lg border border-border">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary-900/40 to-neutral-900/20 mix-blend-overlay" />
          <div className="absolute inset-0 flex items-center justify-center">
            <button className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <svg className="w-8 h-8 text-white ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z" />
              </svg>
            </button>
          </div>
          <div className="absolute bottom-4 left-4">
            <span className="px-2 py-1 bg-black/50 backdrop-blur-md rounded text-xs font-semibold tracking-wider uppercase text-white">Video Lesson</span>
          </div>
        </div>
      )}

      <Prose content={content} block={block} />

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
  )
}
