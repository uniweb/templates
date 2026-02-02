import React from 'react'
import { H2, P } from '@uniweb/kit'
import { Heart } from 'lucide-react'

function Skeleton() {
  return [1, 2, 3, 4, 5, 6].map((i) => (
    <div
      key={i}
      className="w-12 h-12 rounded-full bg-surface-subtle animate-pulse ring-2 ring-white"
    ></div>
  ))
}

function Donors({ content, params, block }) {
  const { title, paragraphs } = content
  const donors = content.data?.donors || []
  const loading = block.dataLoading

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="bg-primary-50 rounded-2xl p-8 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          <div className="w-32 h-32 bg-primary-400 rounded-full absolute -top-10 -left-10 blur-3xl"></div>
          <div className="w-32 h-32 bg-primary-400 rounded-full absolute -bottom-10 -right-10 blur-3xl"></div>
        </div>

        <div className="max-w-2xl mx-auto relative z-10">
          <Heart className="w-8 h-8 text-primary-500 mx-auto mb-4 fill-current animate-pulse-slow" />

          {title && <H2 text={title} className="text-2xl font-bold text-heading mb-2" />}
          {paragraphs[0] && <P text={paragraphs[0]} className="text-muted mb-8" />}

          <div className="flex flex-wrap justify-center gap-4 min-h-[64px]">
            {loading ? (
              <Skeleton />
            ) : (
              donors.map((donor, index) => (
                <div
                  key={index}
                  className="group relative animate-scale-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <img
                    src={donor.picture?.medium}
                    alt={donor.name?.first}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-sm group-hover:scale-110 transition-transform cursor-pointer"
                  />
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-lg z-20">
                    {donor.name?.first}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

Donors.className = 'py-10'

export default Donors
