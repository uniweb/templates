import React from 'react'
import { H2, P } from '@uniweb/kit'
import VideoCard from './VideoCard.jsx'

function Skeleton() {
  return [1, 2, 3, 4, 5, 6].map((n) => (
    <div key={n} className="bg-white rounded-xl border border-edge-muted shadow-sm overflow-hidden">
      <div className="aspect-video bg-surface-subtle animate-pulse"></div>
      <div className="p-4 space-y-2">
        <div className="h-5 bg-surface-subtle rounded w-3/4 animate-pulse"></div>
        <div className="h-3 bg-surface-muted rounded w-1/2 animate-pulse"></div>
      </div>
    </div>
  ))
}

export function VideoGallery({ content, params, block }) {
  const { title, paragraphs } = content
  const videos = content.data?.videos || []
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            <Skeleton />
          ) : videos.length === 0 ? (
            <div className="col-span-full bg-surface-subtle p-8 rounded-xl text-center text-muted">
              No videos available.
            </div>
          ) : (
            videos.map((video) => <VideoCard key={video.id} video={video} />)
          )}
        </div>
      </div>
    </div>
  )
}

export default VideoGallery
