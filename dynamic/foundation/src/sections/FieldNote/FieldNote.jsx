import React from 'react'
import { Link } from '@uniweb/kit'
import { ArrowLeft, Calendar, User } from 'lucide-react'

function Skeleton() {
  return (
    <div className="max-w-3xl mx-auto px-4 animate-pulse">
      <div className="h-80 bg-surface-subtle rounded-xl mb-8"></div>
      <div className="h-4 bg-surface-subtle rounded w-24 mb-4"></div>
      <div className="h-8 bg-surface-subtle rounded w-3/4 mb-6"></div>
      <div className="space-y-3">
        <div className="h-4 bg-surface-muted rounded w-full"></div>
        <div className="h-4 bg-surface-muted rounded w-full"></div>
        <div className="h-4 bg-surface-muted rounded w-5/6"></div>
        <div className="h-4 bg-surface-muted rounded w-full"></div>
        <div className="h-4 bg-surface-muted rounded w-2/3"></div>
      </div>
    </div>
  )
}

function FieldNote({ content, block }) {
  const post = content.data?.post
  const loading = block.dataLoading

  if (loading) return <Skeleton />

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto px-4 text-center py-16">
        <p className="text-muted text-lg mb-4">Field note not found.</p>
        <Link
          href="/blog"
          className="text-link font-semibold inline-flex items-center gap-1"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Field Notes
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-4">
      <Link
        href="/blog"
        className="inline-flex items-center gap-1 text-muted hover:text-body transition-colors mb-6 text-sm font-medium"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Field Notes
      </Link>

      <div className="rounded-xl overflow-hidden mb-8 shadow-md">
        <img
          src={`https://picsum.photos/seed/${post.id + 50}/900/400`}
          alt="Field location"
          className="w-full h-80 object-cover"
        />
      </div>

      <div className="flex items-center gap-4 mb-4 text-sm text-muted">
        <span className="bg-primary-100 text-primary-800 text-xs font-bold px-2.5 py-1 rounded flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          LOG #{post.id}
        </span>
        <span className="flex items-center gap-1">
          <User className="w-3.5 h-3.5" />
          Researcher #{post.userId}
        </span>
      </div>

      <h1 className="text-3xl font-extrabold text-heading mb-6 capitalize leading-tight">
        {post.title}
      </h1>

      <div className="prose max-w-none text-body leading-relaxed space-y-4">
        <p>{post.body}</p>
        <p>{post.body}</p>
      </div>
    </div>
  )
}

FieldNote.className = 'py-12'

export default FieldNote
