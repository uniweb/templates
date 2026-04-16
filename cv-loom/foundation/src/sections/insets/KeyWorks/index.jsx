/**
 * KeyWorks — block-level "selected publications" inset.
 *
 * Declared on its own line in markdown:
 *
 *   ![](@KeyWorks){ids=origin-1859,descent-1871,variation-1868}
 *
 * Renders a short formatted bibliography between paragraphs. A CV
 * authoring natural: the Publications section lists everything; this
 * inset highlights a handful of works the reader should see without
 * scrolling down.
 *
 * Each entry:
 *   - Web: an <a href="#ref-<id>"> anchor jumping to the matching entry
 *     in the Publications section (enabled by the id on each Publications
 *     <li>, which the Publications component emits).
 *   - Docx: a <Link data={{ href: "#ref-<id>" }}> internal hyperlink,
 *     resolvable in Word because the Publications section tags each
 *     bibliography paragraph with data-bookmark="ref-<id>" (Press's
 *     bookmark feature added for this template).
 *
 * Same citestyle + to-csl pipeline as the Publications section — just
 * over a filtered list picked by the author.
 */
import { SafeHtml } from '@uniweb/kit'
import { useDocumentOutput } from '@uniweb/press'
import { Paragraph, Link } from '@uniweb/press/docx'
import { formatAll } from 'citestyle'
import * as apa from 'citestyle/styles/apa'
import { publicationsToCsl } from '#utils/to-csl.js'
import { findPublication } from '#utils/find-publication.js'

function parseIds(raw) {
  if (!raw) return []
  return String(raw)
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
}

export default function KeyWorks({ content, params, block }) {
  const ids = parseIds(params?.ids)
  if (!ids.length) return null

  const publications = content?.data?.profile?.[0]?.publications || []
  const picked = ids
    .map((id) => findPublication(publications, id))
    .filter(Boolean)
  if (!picked.length) return null

  const items = publicationsToCsl(picked)
  const entries = formatAll(apa, items)

  const heading = 'Key Works'

  const docxBody = (
    <>
      <Paragraph
        data={heading}
        data-style="cover-subtitle"
        data-spacing-before={240}
        data-spacing-after={80}
      />
      {entries.map((entry, i) => {
        const id = items[i]?.id
        return (
          <Paragraph
            key={id || entry.text}
            data-style="bibliography"
            data-spacing-after={60}
          >
            {id ? (
              <Link data={{ label: entry.text, href: `#ref-${id}` }} />
            ) : (
              entry.text
            )}
          </Paragraph>
        )
      })}
    </>
  )

  useDocumentOutput(block, 'docx', docxBody)

  return (
    <aside className="my-6 border-l-4 border-primary/40 pl-4 py-2 bg-section/40 rounded-r">
      <p className="text-xs uppercase tracking-wide text-subtle mb-2">
        {heading}
      </p>
      <ul className="space-y-1.5 text-sm">
        {entries.map((entry, i) => {
          const id = items[i]?.id
          return (
            <li key={id || entry.text}>
              {id ? (
                <a
                  href={`#ref-${id}`}
                  className="text-body hover:text-primary transition-colors"
                >
                  <SafeHtml
                    as="span"
                    className="csl-entry-wrapper leading-snug"
                    value={entry.html}
                  />
                </a>
              ) : (
                <SafeHtml
                  as="span"
                  className="csl-entry-wrapper leading-snug"
                  value={entry.html}
                />
              )}
            </li>
          )
        })}
      </ul>
    </aside>
  )
}
