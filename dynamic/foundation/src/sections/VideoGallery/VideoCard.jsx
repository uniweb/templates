import React, { useState } from 'react'
import { Play } from 'lucide-react'

export default function VideoCard({ video }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [imageError, setImageError] = useState(false)

  if (imageError) return null

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-edge-muted group flex flex-col h-full animate-fade-in-up">
      <div className="relative aspect-video bg-gray-900">
        {!isPlaying ? (
          <button
            onClick={() => setIsPlaying(true)}
            className="w-full h-full relative flex items-center justify-center group-hover:opacity-95 transition-opacity"
            aria-label={`Play video: ${video.title}`}
          >
            <img
              src={`https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`}
              alt={video.title}
              className="absolute inset-0 w-full h-full object-cover"
              onError={() => setImageError(true)}
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
            <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform z-10 relative">
              <Play className="w-6 h-6 text-white fill-current ml-1" />
            </div>
          </button>
        ) : (
          <div className="relative w-full h-full">
            <iframe
              src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1`}
              title={video.title}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}
      </div>
      <div className="p-4 flex-grow flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-heading line-clamp-1">{video.title}</h3>
          <p className="text-sm text-muted mt-1">
            {video.views} views &middot; {video.date}
          </p>
        </div>
      </div>
    </div>
  )
}
