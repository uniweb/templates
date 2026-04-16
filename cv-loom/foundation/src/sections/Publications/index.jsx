/**
 * Publications — escape-hatch section type.
 *
 * Unlike Header and CvEntry, this component does not use Loom. The
 * bibliography it renders is too structured for text substitution —
 * per-field CSS classes, auto-linked DOIs, and a docx paragraph style
 * with hanging indent — so it reads the profile directly and lets
 * citestyle do the heavy lifting.
 *
 * Reads CSL-JSON-normalized items from `content.data.profile[0]`,
 * formats them with citestyle's `formatAll(style, items)` (APA baked
 * in — this template doesn't expose a style switcher), and renders
 * two ways:
 *
 *   - Preview: each entry's `html` drops into a <SafeHtml> paragraph
 *     with the semantic per-field CSS classes that citestyle emits
 *     (.csl-author, .csl-title, .csl-container, auto-linked .csl-doi).
 *
 *   - Docx: each entry's `text` becomes a Press <Paragraph> with
 *     data-style="bibliography" — the hanging-indent paragraph style
 *     declared on DownloadBar's compile call.
 *
 * citestyle + APA are statically imported at the top of the file;
 * they're already in the foundation bundle because foundation.js
 * uses them for the CITE custom Loom function. No async loading,
 * no style cache — keep the escape hatch simple.
 */
import { SafeHtml } from '@uniweb/kit'
import { useDocumentOutput } from '@uniweb/press'
import { H2 as DocxH2, Paragraph } from '@uniweb/press/docx'
import { formatAll } from 'citestyle'
import * as apa from 'citestyle/styles/apa'
import { publicationsToCsl } from '#utils/to-csl.js'
import { SP } from '#utils/docx-spacing.js'

export default function Publications({ content, block }) {
  const profile = content?.data?.profile?.[0] || {}
  const rawItems = profile.publications || []

  const items = publicationsToCsl(rawItems)
  const entries = items.length ? formatAll(apa, items) : []

  const heading = content?.title || 'Publications'

  const docxBody = (
    <>
      <DocxH2
        data={heading}
        data-pagebreakbefore="true"
        data-spacing-before={SP.sectionBefore}
        data-spacing-after={SP.sectionAfter}
      />
      {entries.map((entry, i) => {
        const id = items[i]?.id
        return (
          <Paragraph
            key={id || entry.text}
            data={entry.text}
            data-style="bibliography"
            data-spacing-after={80}
            data-bookmark={id ? `ref-${id}` : undefined}
          />
        )
      })}
    </>
  )

  useDocumentOutput(block, 'docx', docxBody)

  return (
    <div className="cv-entry">
      <h2 className="text-heading text-2xl font-bold mb-4">{heading}</h2>

      {entries.length === 0 && (
        <p className="text-subtle italic">No publications to display.</p>
      )}

      {entries.length > 0 && (
        <ol className="space-y-3 list-decimal list-outside pl-6 marker:text-subtle">
          {entries.map((entry, i) => {
            const id = items[i]?.id
            return (
              <li
                key={id || entry.text}
                id={id ? `ref-${id}` : undefined}
                className="scroll-mt-20"
              >
                <SafeHtml
                  as="div"
                  className="csl-entry-wrapper leading-relaxed"
                  value={entry.html}
                />
              </li>
            )
          })}
        </ol>
      )}

      <p className="mt-6 text-xs uppercase tracking-wide text-subtle">
        Formatted via citestyle · APA
      </p>
    </div>
  )
}
