import React, { useState, useMemo } from 'react'
import { cn, Link } from '@uniweb/kit'
import { formatReference, CiteButton, DoiLink, AuthorList } from '@uniweb/scholar'

/**
 * PublicationList Component
 *
 * Display academic publications with proper citation formatting.
 * Supports filtering by year, type, and keyword search.
 * Uses @uniweb/scholar for professional citation formatting.
 *
 * Each item (content group) represents a publication:
 * - H3: Publication title
 * - First paragraph: Authors
 * - Second paragraph: Venue (journal/conference name)
 * - Third paragraph: Year
 * - Fourth paragraph (optional): DOI
 * - Links: PDF, code, etc.
 */

const PUBLICATION_TYPES = {
  journal: { label: 'Journal Article', color: 'bg-journal' },
  conference: { label: 'Conference Paper', color: 'bg-conference' },
  book: { label: 'Book/Chapter', color: 'bg-book' },
  preprint: { label: 'Preprint', color: 'bg-preprint' },
}

function parsePublication(item) {
  const { title, pretitle, paragraphs = [], links = [] } = item || {}

  // Parse authors into structured format if possible
  const authorsStr = paragraphs[0] || ''
  const authors = authorsStr
    .split(/,\s*(?:and\s+)?|(?:\s+and\s+)/)
    .filter(Boolean)
    .map((name) => {
      const parts = name.trim().split(/\s+/)
      if (parts.length === 1) {
        return { family: parts[0], given: '' }
      }
      // Assume "First Last" format
      return {
        given: parts.slice(0, -1).join(' '),
        family: parts[parts.length - 1],
      }
    })

  return {
    id: title?.toLowerCase().replace(/\s+/g, '-').slice(0, 30) || 'pub',
    title,
    authors,
    authorsStr,
    journal: paragraphs[1] || '',
    venue: paragraphs[1] || '',
    year: parseInt(paragraphs[2], 10) || paragraphs[2] || '',
    doi: paragraphs[3] || '',
    type: pretitle || 'journal',
    links,
  }
}

function PublicationCard({ pub, citationStyle, showType, showCiteButton }) {
  const typeInfo = PUBLICATION_TYPES[pub.type] || PUBLICATION_TYPES.journal

  // Build publication object for scholar formatters
  const scholarPub = useMemo(
    () => ({
      id: pub.id,
      type: pub.type === 'conference' ? 'inproceedings' : pub.type,
      title: pub.title,
      authors: pub.authors,
      journal: pub.journal,
      year: pub.year,
      doi: pub.doi,
    }),
    [pub]
  )

  // Format citation using scholar
  const formattedCitation = useMemo(() => {
    if (citationStyle === 'detailed') return null
    try {
      return formatReference(scholarPub, { style: citationStyle })
    } catch {
      return null
    }
  }, [scholarPub, citationStyle])

  return (
    <article className="py-4 border-b border-slate-200 last:border-b-0">
      <div className="flex gap-4">
        {showType && (
          <div className="flex-shrink-0 pt-1">
            <span
              className={cn(
                'inline-block w-2 h-2 rounded-full',
                typeInfo.color
              )}
              title={typeInfo.label}
            />
          </div>
        )}

        <div className="flex-1 min-w-0">
          {formattedCitation ? (
            // Scholar-formatted citation (APA, MLA, Chicago, IEEE)
            <div className="citation text-slate-700 leading-relaxed">
              {formattedCitation}
            </div>
          ) : (
            // Detailed format (title prominent)
            <>
              <h3 className="text-lg font-semibold text-slate-900 mb-1">
                {pub.title}
              </h3>
              {pub.authors.length > 0 && (
                <p className="text-slate-600 mb-1">
                  <AuthorList authors={pub.authors} style="apa" />
                </p>
              )}
              <div className="flex flex-wrap items-center gap-2 text-sm text-muted">
                {pub.venue && <span className="italic">{pub.venue}</span>}
                {pub.venue && pub.year && <span>•</span>}
                {pub.year && <span>{pub.year}</span>}
              </div>
            </>
          )}

          {/* Links row: DOI, PDF, etc. */}
          <div className="flex flex-wrap items-center gap-3 mt-2">
            {pub.doi && <DoiLink doi={pub.doi} format="short" showIcon />}

            {pub.links
              .filter((link) => link.url && !link.url.includes('doi.org'))
              .map((link, i) => (
                <Link
                  key={i}
                  href={link.url}
                  className="text-sm text-primary hover:underline"
                >
                  {link.text}
                </Link>
              ))}

            {showCiteButton && (
              <CiteButton
                publication={scholarPub}
                styles={['apa', 'mla', 'chicago', 'bibtex']}
                label="Cite"
              />
            )}
          </div>
        </div>
      </div>
    </article>
  )
}

export function PublicationList({ content, params }) {
  const { title, paragraphs = [] } = content || {}
  const {
    citationStyle = 'detailed',
    groupBy = 'none',
    showType = true,
    showSearch = false,
    showCiteButton = true,
    limit = 0,
  } = params || {}

  const [searchQuery, setSearchQuery] = useState('')

  const publications = useMemo(() => {
    // Publications come from content.items (semantic groups parsed from markdown)
    return (content.items || []).map(parsePublication)
  }, [content.items])

  // Filter by search
  const filtered = useMemo(() => {
    if (!searchQuery) return publications
    const q = searchQuery.toLowerCase()
    return publications.filter(
      (pub) =>
        pub.title?.toLowerCase().includes(q) ||
        pub.authorsStr?.toLowerCase().includes(q) ||
        pub.venue?.toLowerCase().includes(q)
    )
  }, [publications, searchQuery])

  // Apply limit
  const displayed = limit > 0 ? filtered.slice(0, limit) : filtered

  // Group by year if requested
  const grouped = useMemo(() => {
    if (groupBy !== 'year') return { '': displayed }
    return displayed.reduce((acc, pub) => {
      const key = pub.year || 'Unknown'
      if (!acc[key]) acc[key] = []
      acc[key].push(pub)
      return acc
    }, {})
  }, [displayed, groupBy])

  // Sort groups by year (descending)
  const sortedGroups = Object.keys(grouped).sort((a, b) => {
    if (a === 'Unknown') return 1
    if (b === 'Unknown') return -1
    return parseInt(b) - parseInt(a)
  })

  return (
    <section className="py-12 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        {(title || paragraphs[0]) && (
          <div className="mb-8">
            {title && (
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                {title}
              </h2>
            )}
            {paragraphs[0] && (
              <p className="text-slate-600">{paragraphs[0]}</p>
            )}
          </div>
        )}

        {showSearch && (
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search publications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
            />
          </div>
        )}

        {showType && (
          <div className="flex flex-wrap gap-4 mb-6 text-sm">
            {Object.entries(PUBLICATION_TYPES).map(([key, { label, color }]) => (
              <div key={key} className="flex items-center gap-2">
                <span className={cn('w-2 h-2 rounded-full', color)} />
                <span className="text-slate-600">{label}</span>
              </div>
            ))}
          </div>
        )}

        {sortedGroups.map((group) => (
          <div key={group} className="mb-8 last:mb-0">
            {group && groupBy === 'year' && (
              <h3 className="text-lg font-semibold text-slate-700 mb-4 pb-2 border-b border-slate-200">
                {group}
              </h3>
            )}
            <div>
              {grouped[group].map((pub, i) => (
                <PublicationCard
                  key={pub.id + i}
                  pub={pub}
                  citationStyle={citationStyle}
                  showType={showType}
                  showCiteButton={showCiteButton}
                />
              ))}
            </div>
          </div>
        ))}

        {displayed.length === 0 && (
          <p className="text-slate-500 text-center py-8">
            No publications found.
          </p>
        )}
      </div>
    </section>
  )
}

export default PublicationList
