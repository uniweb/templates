import React from 'react'
import { H2 } from '@uniweb/kit'
import { MapPin, RefreshCw } from 'lucide-react'

function Skeleton() {
  return [1, 2, 3].map((n) => (
    <div
      key={n}
      className="bg-white rounded-xl border border-edge-muted shadow-sm overflow-hidden h-80"
    >
      <div className="h-48 bg-surface-subtle animate-pulse"></div>
      <div className="p-4 space-y-3">
        <div className="h-4 bg-surface-subtle rounded w-1/3 animate-pulse"></div>
        <div className="h-3 bg-surface-muted rounded w-full animate-pulse"></div>
        <div className="h-3 bg-surface-muted rounded w-2/3 animate-pulse"></div>
      </div>
    </div>
  ))
}

export function Sightings({ content, params, block }) {
  const { title } = content
  const sightings = content.data?.sightings || []
  const loading = block.dataLoading

  return (
    <div className="max-w-6xl mx-auto px-4">
      {title && (
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <MapPin className="w-6 h-6 text-primary-600" />
            <H2 text={title} className="text-2xl font-bold text-heading" />
          </div>
          <button
            onClick={() => block.refetch?.()}
            className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-body transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {loading ? (
          <Skeleton />
        ) : sightings.length === 0 ? (
          <div className="col-span-full bg-surface-subtle p-8 rounded-xl text-center text-muted">
            No sightings available.
          </div>
        ) : (
          sightings.map((obs) => {
            const photoUrl = obs.photos?.[0]?.url?.replace('square', 'medium')
            return (
              <a
                key={obs.id}
                href={obs.uri}
                target="_blank"
                rel="noreferrer"
                className="bg-white rounded-xl border border-edge-muted shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all flex flex-col overflow-hidden group h-full animate-fade-in-up"
              >
                <div className="h-48 overflow-hidden bg-surface-subtle relative">
                  {photoUrl ? (
                    <img
                      src={photoUrl}
                      alt="Observation"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-subtle bg-surface-subtle">
                      No Photo
                    </div>
                  )}
                  <div className="absolute top-3 left-3 bg-black/60 backdrop-blur text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm">
                    {obs.observed_on_details?.date || 'Recent'}
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="text-sm font-bold text-heading mb-1 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-primary-500" />
                    {obs.place_guess || 'Unknown Location'}
                  </h3>
                  <p className="text-subtle text-xs mt-auto">
                    Observer:{' '}
                    <span className="text-link font-medium">{obs.user?.login}</span>
                  </p>
                </div>
              </a>
            )
          })
        )}
      </div>

      <div className="mt-4 text-center">
        <a
          href="https://www.inaturalist.org/taxa/41659-Ailuropoda-melanoleuca"
          target="_blank"
          rel="noreferrer"
          className="text-xs text-subtle hover:text-link transition-colors"
        >
          Data provided by iNaturalist API
        </a>
      </div>
    </div>
  )
}

Sightings.className = 'py-10'

export default Sightings
