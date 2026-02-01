import React from 'react'
import { H2, P } from '@uniweb/kit'
import { Database } from 'lucide-react'

function Skeleton() {
  return [1, 2, 3, 4, 5, 6].map((n) => (
    <div key={n} className="h-10 bg-surface-subtle rounded-lg animate-pulse"></div>
  ))
}

export function OccurrenceRecords({ content, params, block }) {
  const { title, paragraphs } = content
  const records = content.data?.occurrences || []
  const loading = block.dataLoading

  return (
    <div className="py-16 sm:py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {(title || paragraphs[0]) && (
          <div className="mb-10">
            {title && <H2 text={title} className="text-2xl sm:text-3xl font-bold text-heading mb-2" />}
            {paragraphs[0] && <P text={paragraphs[0]} className="text-muted max-w-2xl" />}
          </div>
        )}

        <div className="bg-white rounded-2xl border border-edge-muted p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <Database className="text-accent-600 w-5 h-5" />
            <span className="text-lg font-bold text-heading">Occurrence Records</span>
          </div>

          <div className="space-y-3">
            {loading ? (
              <Skeleton />
            ) : records.length === 0 ? (
              <p className="text-muted text-center py-4">No records available.</p>
            ) : (
              records.map((rec) => (
                <a
                  key={rec.key}
                  href={`https://www.gbif.org/occurrence/${rec.key}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-accent-50 text-sm group transition-colors"
                >
                  <div className="flex flex-col">
                    <span className="font-medium text-heading group-hover:text-accent-800">
                      {rec.country || 'Unknown'}
                    </span>
                    <span className="text-xs text-subtle">
                      {rec.basisOfRecord}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-subtle group-hover:text-accent-600">
                    {rec.eventDate?.split('T')[0] || 'N/A'}
                  </span>
                </a>
              ))
            )}
          </div>

          <div className="mt-4 pt-2 border-t border-edge-muted text-center">
            <span className="text-[10px] text-subtle uppercase tracking-widest font-bold">
              Source: GBIF API
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OccurrenceRecords
