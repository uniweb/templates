import React from 'react'
import { H2, P } from '@uniweb/kit'
import { BookOpen, RefreshCw } from 'lucide-react'

function Skeleton() {
  return [1, 2, 3, 4, 5].map((n) => (
    <div key={n} className="pb-4 border-b border-edge-muted last:border-0">
      <div className="h-4 bg-surface-subtle rounded w-3/4 mb-2 animate-pulse"></div>
      <div className="h-3 bg-surface-muted rounded w-1/2 animate-pulse"></div>
    </div>
  ))
}

function Publications({ content, params, block }) {
  const { title } = content
  const papers = content.data?.papers || []
  const loading = block.dataLoading

  return (
    <div className="bg-surface rounded-2xl border border-edge-muted p-6 shadow-sm h-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <BookOpen className="text-primary-600 w-5 h-5" />
          <span className="text-xl font-bold text-heading">{title || 'Recent Publications'}</span>
        </div>
        <button
          onClick={() => block.refetch?.()}
          className="text-subtle hover:text-primary-600 transition-colors"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      <div className="space-y-4">
        {loading ? (
          <Skeleton />
        ) : papers.length === 0 ? (
          <p className="text-muted text-center py-4">No publications available.</p>
        ) : (
          papers.map((item, i) => (
            <a
              key={i}
              href={item.URL}
              target="_blank"
              rel="noreferrer"
              className="block pb-4 border-b border-edge-muted last:border-0 last:pb-0 hover:bg-surface-subtle -mx-2 px-2 rounded-lg transition-colors group"
            >
              <h3 className="font-semibold text-heading text-sm leading-snug group-hover:text-primary-600 transition-colors">
                {item.title?.[0]}
              </h3>
              <div className="flex items-center gap-2 mt-1 text-xs text-subtle">
                <span className="font-medium text-muted">
                  {item['container-title']?.[0] || 'Unknown Journal'}
                </span>
                <span>&middot;</span>
                <span>{item.created?.['date-parts']?.[0]?.[0]}</span>
              </div>
            </a>
          ))
        )}
      </div>

      <div className="mt-4 pt-2 border-t border-edge-muted text-center">
        <span className="text-[10px] text-subtle uppercase tracking-widest font-bold">
          Source: CrossRef API
        </span>
      </div>
    </div>
  )
}

export default Publications
