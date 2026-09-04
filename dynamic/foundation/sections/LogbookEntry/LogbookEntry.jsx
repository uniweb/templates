import React from 'react'
import { Link, Article } from '@uniweb/kit'
import { ArrowLeft } from 'lucide-react'

/**
 * One logbook entry, rendered on the `[...path]` page.
 *
 * The matched record arrives under the same key the list page reads —
 * `content.data.logbook[0]` — exactly as it would under a `[slug]` page. What the
 * `[...path]` route adds is the URL's shape: `block.dynamicContext.params` carries
 * `path` (the whole capture), `dir` (the folder part) and `slug` (the record's
 * handle), which is what the breadcrumb below is built from.
 */
function LogbookEntry({ content, block }) {
  const entry = content.data?.logbook?.[0]
  const { dir = '', slug = '' } = block.dynamicContext?.params || {}

  if (block.dataLoading) {
    return <div className="max-w-3xl mx-auto px-4 animate-pulse h-64 bg-card rounded-xl" />
  }

  if (!entry) {
    return (
      <div className="max-w-3xl mx-auto px-4 text-center py-16">
        <p className="text-subtle text-lg mb-4">
          {block.dataError?.logbook ? 'The logbook could not be loaded.' : 'No such entry.'}
        </p>
        <Link href="/logbook" className="text-link font-semibold inline-flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" /> Back to the logbook
        </Link>
      </div>
    )
  }

  return (
    <article className="max-w-3xl mx-auto px-4">
      <nav className="text-sm text-subtle mb-6 font-mono">
        <Link href="/logbook" className="hover:text-body">/logbook</Link>
        {dir && <span> / {dir}</span>}
        <span> / {slug}</span>
      </nav>
      <h1 className="text-3xl font-bold mb-2">{entry.title}</h1>
      {entry.date && <p className="text-subtle mb-8">{entry.date}</p>}
      <Article content={entry.content} />
    </article>
  )
}

export default LogbookEntry
