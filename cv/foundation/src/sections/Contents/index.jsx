/**
 * Contents — table of contents section for the docusite.
 *
 * The compiled docx gets a real Word TOC field via the Press
 * <TableOfContents> builder. Word will auto-populate it from the
 * document headings when the user opens the file (they'll see an
 * "Update field?" prompt the first time).
 *
 * The visible web preview can't know which headings exist at
 * render time — that would require walking the rest of the
 * report tree. Instead, the preview renders a short fixed list
 * of the standard section headings the foundation ships with.
 * Authors who reorganize the report update this list to match.
 */
import { useDocumentOutput } from '@uniweb/press'
import {
  H2 as DocxH2,
  TableOfContents as DocxTableOfContents,
} from '@uniweb/press/docx'
import {
  useDocumentOptions,
  ALL_SECTION_KEYS,
} from '#components/document-options.jsx'

const SECTION_KEY = 'contents'

const DEFAULT_ENTRY_LABELS = {
  cover: 'Cover',
  personal: 'Personal information',
  education: 'Education',
  employment: 'Employment',
  funding: 'Research funding',
  publications: 'Publications',
  teaching: 'Teaching and mentorship',
  service: 'Service',
  awards: 'Awards and honours',
  appendix: 'Appendix',
}

export default function Contents({ content, block }) {
  const [options] = useDocumentOptions()
  const sectionIncluded = options.includedSections[SECTION_KEY] !== false

  const heading = content?.title || 'Contents'

  // Preview list reflects the currently included sections: anything the
  // user toggled off in the options panel is dropped from the list in
  // both preview and (via re-registration) the compiled file. Cover
  // and Contents itself are excluded from the list — they don't
  // belong in their own TOC.
  const entries = ALL_SECTION_KEYS.filter(
    (key) =>
      key !== 'cover' &&
      key !== 'contents' &&
      options.includedSections[key] !== false,
  ).map((key) => DEFAULT_ENTRY_LABELS[key] || key)

  // Docx: register a Word TOC field. Gets the default heading range
  // (1–3) and the title set by the preview heading.
  useDocumentOutput(
    block,
    'docx',
    sectionIncluded ? (
      <>
        <DocxH2 data={heading} />
        <DocxTableOfContents title={heading} headingRange="1-3" />
      </>
    ) : (
      <></>
    ),
  )

  if (!sectionIncluded) return null

  return (
    <nav className="max-w-3xl mx-auto py-12">
      <h2 className="text-heading text-3xl font-bold mb-6">{heading}</h2>
      <ol className="space-y-2 list-decimal list-outside pl-6 marker:text-subtle text-body">
        {entries.map((label) => (
          <li key={label}>{label}</li>
        ))}
      </ol>
      <p className="mt-6 text-xs uppercase tracking-wide text-subtle">
        Preview list is fixed — the downloaded .docx auto-generates its
        table of contents from the actual headings.
      </p>
    </nav>
  )
}
