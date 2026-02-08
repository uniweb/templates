import React from 'react'
import { H1, H2, P, Link } from '@uniweb/kit'
import { ClipboardList, ArrowRight } from 'lucide-react'
import NoteCard from './NoteCard.jsx'

function Skeleton({ count }) {
  return Array.from({ length: count }).map((_, n) => (
    <div
      key={n}
      className="bg-white rounded-xl border border-border/50 shadow-sm overflow-hidden h-96"
    >
      <div className="h-48 bg-card animate-pulse"></div>
      <div className="p-6 space-y-4">
        <div className="h-4 bg-card rounded w-1/3 animate-pulse"></div>
        <div className="h-6 bg-card rounded w-full animate-pulse"></div>
        <div className="h-3 bg-muted rounded w-full animate-pulse"></div>
        <div className="h-3 bg-muted rounded w-2/3 animate-pulse"></div>
      </div>
    </div>
  ))
}

function FieldNotes({ content, params, block }) {
  const { title, paragraphs, links } = content
  const description = paragraphs[0]
  const posts = content.data?.posts || []
  const loading = block.dataLoading

  const ctaLink = links[0]

  return (
    <div className="max-w-6xl mx-auto px-4">
      {title && description ? (
        <div className="mb-12">
          <H1
            text={title}
            className="text-3xl font-extrabold text-heading mb-2"
          />
          <P text={description} className="text-subtle max-w-2xl" />
        </div>
      ) : title ? (
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <ClipboardList className="w-6 h-6 text-primary-600" />
            <H2 text={title} className="text-2xl font-bold text-heading" />
          </div>
        </div>
      ) : null}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {loading ? (
          <Skeleton count={posts.length || 3} />
        ) : posts.length === 0 ? (
          <div className="col-span-full bg-card p-8 rounded-xl text-center text-subtle">
            No field notes available.
          </div>
        ) : (
          posts.map((note) => <NoteCard key={note.id} note={note} />)
        )}
      </div>

      {ctaLink && (
        <div className="mt-8 text-center">
          <Link
            href={ctaLink.href}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border/50 text-body font-medium hover:bg-card transition-colors"
          >
            {ctaLink.label}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}
    </div>
  )
}

FieldNotes.className = 'py-12'

export default FieldNotes
