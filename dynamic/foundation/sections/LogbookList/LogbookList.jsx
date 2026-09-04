import React from 'react'
import { Link, Text } from '@uniweb/kit'
import { FolderOpen } from 'lucide-react'

/**
 * Logbook list — records placed in folders, grouped by their placement.
 *
 * Every record carries `path`, the folder `records.yml` put it in (`''` at the
 * root), and `route`, its own URL — composed by the framework from that placement
 * and the record's slug, because the entries live under a `[...path]` page:
 * `/logbook/field/river-survey`. Read `route`; never rebuild it.
 */
function LogbookList({ content, block }) {
  const entries = content.data?.logbook || []

  if (block.dataLoading) {
    return <div className="max-w-3xl mx-auto px-4 animate-pulse h-40 bg-card rounded-xl" />
  }
  if (block.dataError?.logbook) {
    return <p className="max-w-3xl mx-auto px-4 text-subtle">The logbook could not be loaded.</p>
  }

  const groups = new Map()
  for (const entry of entries) {
    const key = entry.path || ''
    if (!groups.has(key)) groups.set(key, [])
    groups.get(key).push(entry)
  }

  return (
    <div className="max-w-3xl mx-auto px-4">
      {content.title && <h1 className="text-3xl font-bold mb-3">{content.title}</h1>}
      {content.paragraphs?.length > 0 && (
        <div className="text-subtle mb-8">
          <Text content={content.paragraphs} />
        </div>
      )}

      {[...groups.entries()].map(([folder, items]) => (
        <section key={folder || 'root'} className="mb-10">
          <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-subtle mb-3">
            <FolderOpen className="w-4 h-4" />
            {folder ? `/${folder}` : '/ (root)'}
          </h2>
          <ul className="space-y-3">
            {items.map((entry) => (
              <li key={entry.slug} className="rounded-xl bg-card p-4 shadow-sm">
                <Link href={entry.route} className="text-lg font-semibold text-link">
                  {entry.title}
                </Link>
                {entry.summary && <p className="text-subtle mt-1">{entry.summary}</p>}
                <p className="text-xs text-subtle mt-2 font-mono">{entry.route}</p>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}

export default LogbookList
