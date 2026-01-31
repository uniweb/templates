import React, { useState } from 'react'
import { cn } from '@uniweb/kit'
import { Play } from 'lucide-react'

/**
 * Video Component
 *
 * Embed YouTube or Vimeo videos with optional facade (thumbnail).
 * Supports both centered and side-by-side layouts.
 */

function extractVideoId(url) {
  if (!url) return null

  // YouTube patterns
  const ytPatterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\s?]+)/,
    /youtube\.com\/shorts\/([^&\s?]+)/,
  ]
  for (const pattern of ytPatterns) {
    const match = url.match(pattern)
    if (match) return { type: 'youtube', id: match[1] }
  }

  // Vimeo patterns
  const vimeoMatch = url.match(/vimeo\.com\/(?:video\/)?(\d+)/)
  if (vimeoMatch) return { type: 'vimeo', id: vimeoMatch[1] }

  return null
}

export function Video({ content, params }) {
  // Runtime guarantees: content fields exist, params have defaults from meta.js
  const { title, pretitle, paragraphs, links, imgs } = content
  const { theme, layout, autoplay } = params

  const [isPlaying, setIsPlaying] = useState(autoplay)

  // Get video URL from first link
  const videoLink = links[0]
  const videoUrl = videoLink?.href
  const videoInfo = extractVideoId(videoUrl)

  // Get thumbnail from first image or generate from video
  const thumbImg = imgs[0]
  const thumbnail = thumbImg?.url || thumbImg?.src ||
    (videoInfo?.type === 'youtube'
      ? `https://img.youtube.com/vi/${videoInfo.id}/maxresdefault.jpg`
      : null)

  const themes = {
    light: {
      section: 'bg-white',
      title: 'text-gray-900',
      pretitle: 'text-primary',
      description: 'text-gray-600',
    },
    gray: {
      section: 'bg-gray-50',
      title: 'text-gray-900',
      pretitle: 'text-primary',
      description: 'text-gray-600',
    },
    dark: {
      section: 'bg-gray-900',
      title: 'text-white',
      pretitle: 'text-primary',
      description: 'text-gray-400',
    },
  }

  const t = themes[theme] || themes.light

  const isSplit = layout === 'split'

  const renderVideoEmbed = () => {
    if (!videoInfo) return null

    if (videoInfo.type === 'youtube') {
      return (
        <iframe
          src={`https://www.youtube.com/embed/${videoInfo.id}?autoplay=1&rel=0`}
          title={title || 'Video'}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      )
    }

    if (videoInfo.type === 'vimeo') {
      return (
        <iframe
          src={`https://player.vimeo.com/video/${videoInfo.id}?autoplay=1`}
          title={title || 'Video'}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      )
    }

    return null
  }

  const VideoPlayer = () => (
    <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl bg-gray-900">
      {isPlaying ? (
        renderVideoEmbed()
      ) : (
        <button
          onClick={() => setIsPlaying(true)}
          className="absolute inset-0 w-full h-full group cursor-pointer"
          aria-label="Play video"
        >
          {thumbnail ? (
            <img
              src={thumbnail}
              alt={title || 'Video thumbnail'}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary to-indigo-600" />
          )}
          {/* Play button overlay */}
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center transition-opacity group-hover:bg-black/40">
            <div className="w-20 h-20 bg-white/95 rounded-full flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
              <Play className="w-8 h-8 text-primary ml-1" fill="currentColor" />
            </div>
          </div>
        </button>
      )}
    </div>
  )

  const ContentBlock = () => (
    <div className={cn(isSplit ? 'text-left' : 'text-center')}>
      {pretitle && (
        <span className={cn('text-sm font-semibold uppercase tracking-wide mb-2 block', t.pretitle)}>
          {pretitle}
        </span>
      )}
      {title && (
        <h2 className={cn('text-3xl sm:text-4xl font-bold mb-4', t.title)}>
          {title}
        </h2>
      )}
      {paragraphs[0] && (
        <p className={cn('text-lg', t.description, !isSplit && 'max-w-2xl mx-auto')}>
          {paragraphs[0]}
        </p>
      )}
    </div>
  )

  return (
    <section className={cn('py-20 px-6', t.section)}>
      <div className="max-w-6xl mx-auto">
        {isSplit ? (
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <ContentBlock />
            </div>
            <div>
              <VideoPlayer />
            </div>
          </div>
        ) : (
          <>
            {(title || paragraphs[0]) && (
              <div className="mb-12">
                <ContentBlock />
              </div>
            )}
            <div className="max-w-4xl mx-auto">
              <VideoPlayer />
            </div>
          </>
        )}
      </div>
    </section>
  )
}

export default Video
