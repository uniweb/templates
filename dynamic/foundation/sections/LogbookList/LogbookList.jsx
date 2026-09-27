import React from 'react'
import { Link, Text } from '@uniweb/kit'

/**
 * Logbook list — every entry, in the order the `logbook` query sorts them.
 *
 * Each record carries `$route`, its own URL, filled by the framework from the record's
 * name (`$name`): `/logbook/river-survey`. Read `$route`; never rebuild it.
 *
 * `records/folder.yml` places the entries in folders, but a record does not carry its
 * folder: folders organize the records, and a query reads one with `scope:`.
 */
function LogbookList({ content, block }) {
  const entries = content.data?.logbook || []

  if (block.dataLoading) {
    return <div className="max-w-3xl mx-auto px-4 animate-pulse h-40 bg-card rounded-xl" />
  }
  if (block.dataError?.logbook) {
    return <p className="max-w-3xl mx-auto px-4 text-subtle">The logbook could not be loaded.</p>
  }

  return (
    <div className="max-w-3xl mx-auto px-4">
      {content.title && <h1 className="text-3xl font-bold mb-3">{content.title}</h1>}
      {content.paragraphs?.length > 0 && (
        <div className="text-subtle mb-8">
          <Text content={content.paragraphs} />
        </div>
      )}

      <ul className="space-y-3">
        {entries.map((entry) => (
          <li key={entry.$name} className="rounded-xl bg-card p-4 shadow-sm">
            <Link href={entry.$route} className="text-lg font-semibold text-link">
              {entry.title}
            </Link>
            {entry.summary && <p className="text-subtle mt-1">{entry.summary}</p>}
            <p className="text-xs text-subtle mt-2 font-mono">{entry.$route}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default LogbookList
