import React from 'react'
import { H2, P } from '@uniweb/kit'
import NoteCard from './NoteCard.jsx'

function Skeleton({ count }) {
  return Array.from({ length: count }).map((_, n) => (
    <div
      key={n}
      className="bg-white rounded-xl border border-edge-muted shadow-sm overflow-hidden h-96"
    >
      <div className="h-48 bg-surface-subtle animate-pulse"></div>
      <div className="p-6 space-y-4">
        <div className="h-4 bg-surface-subtle rounded w-1/3 animate-pulse"></div>
        <div className="h-6 bg-surface-subtle rounded w-full animate-pulse"></div>
        <div className="h-3 bg-surface-muted rounded w-full animate-pulse"></div>
        <div className="h-3 bg-surface-muted rounded w-2/3 animate-pulse"></div>
      </div>
    </div>
  ))
}

export function FieldNotes({ content, params, block }) {
  const { title, paragraphs } = content
  const posts = content.data?.posts || []
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {loading ? (
            <Skeleton count={posts.length || 3} />
          ) : posts.length === 0 ? (
            <div className="col-span-full bg-surface-subtle p-8 rounded-xl text-center text-muted">
              No field notes available.
            </div>
          ) : (
            posts.map((note) => <NoteCard key={note.id} note={note} />)
          )}
        </div>
      </div>
    </div>
  )
}

export default FieldNotes
