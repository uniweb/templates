import React from 'react'
import { Database } from 'lucide-react'

function Skeleton() {
  return [1, 2, 3, 4, 5, 6].map((n) => (
    <div key={n} className="h-10 bg-card rounded-lg animate-pulse"></div>
  ))
}

function OccurrenceRecords({ content, params, block }) {
  const { title } = content
  const records = content.data?.occurrences || []
  const loading = block.dataLoading

  return (
    <div className="bg-section rounded-2xl border border-border/50 p-6 shadow-sm h-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Database className="text-accent-600 w-5 h-5" />
          <span className="text-xl font-bold text-heading">{title || 'Occurrence Records'}</span>
        </div>
      </div>

      <div className="space-y-3">
        {loading ? (
          <Skeleton />
        ) : records.length === 0 ? (
          <p className="text-subtle text-center py-4">No records available.</p>
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

      <div className="mt-4 pt-2 border-t border-border/50 text-center">
        <span className="text-[10px] text-subtle uppercase tracking-widest font-bold">
          Source: GBIF API
        </span>
      </div>
    </div>
  )
}

export default OccurrenceRecords
