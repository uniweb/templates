/**
 * Appendix — free-form additional content, driven by tagged YAML
 * data blocks in the section's markdown file.
 *
 * The content author writes something like:
 *
 *   \`\`\`yaml:keywords
 *   - evolution
 *   - natural selection
 *   \`\`\`
 *
 *   \`\`\`yaml:acknowledgements
 *   text: Sincere thanks to the many correspondents whose letters...
 *   \`\`\`
 *
 * The Uniweb runtime parses each block into `content.data[tag]`.
 * This component walks that object and renders each tag as its own
 * subsection in both the preview and the docx output. Tag names are
 * turned into H3 headings (snake_case or kebab-case → Title Case).
 *
 * Supported value shapes:
 *   - string         → rendered as a single paragraph
 *   - array          → bulleted list
 *   - object with `text` key → paragraph
 *   - object (other) → definition list of key/value pairs
 *
 * Anything more exotic falls back to stringified JSON.
 */
import React from 'react'
import { useDocumentOutput } from '@uniweb/press'
import { H2 as DocxH2, H3 as DocxH3, Paragraph } from '@uniweb/press/docx'
import { useDocumentOptions } from '#components/document-options.jsx'

const SECTION_KEY = 'appendix'

function humanizeKey(key) {
  return String(key)
    .replace(/[_-]+/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

function isPlainObject(v) {
  return typeof v === 'object' && v !== null && !Array.isArray(v)
}

function renderPreviewBlock(value) {
  if (typeof value === 'string') {
    return <p className="text-body leading-relaxed">{value}</p>
  }
  if (Array.isArray(value)) {
    return (
      <ul className="list-disc list-outside pl-6 space-y-1 text-body">
        {value.map((item, i) => (
          <li key={i}>
            {typeof item === 'string' ? item : JSON.stringify(item)}
          </li>
        ))}
      </ul>
    )
  }
  if (isPlainObject(value)) {
    if (typeof value.text === 'string') {
      return <p className="text-body leading-relaxed">{value.text}</p>
    }
    return (
      <dl className="grid grid-cols-[max-content_1fr] gap-x-6 gap-y-2 text-body">
        {Object.entries(value).map(([k, v]) => (
          <React.Fragment key={k}>
            <dt className="font-semibold text-subtle">{humanizeKey(k)}</dt>
            <dd>{typeof v === 'string' ? v : JSON.stringify(v)}</dd>
          </React.Fragment>
        ))}
      </dl>
    )
  }
  return <p className="text-body italic">{JSON.stringify(value)}</p>
}

function renderDocxBlock(value) {
  if (typeof value === 'string') {
    return <Paragraph data={value} />
  }
  if (Array.isArray(value)) {
    return (
      <>
        {value.map((item, i) => (
          <Paragraph
            key={i}
            data={typeof item === 'string' ? item : JSON.stringify(item)}
            data-bullet-level="0"
          />
        ))}
      </>
    )
  }
  if (isPlainObject(value)) {
    if (typeof value.text === 'string') {
      return <Paragraph data={value.text} />
    }
    return (
      <>
        {Object.entries(value).map(([k, v]) => (
          <Paragraph
            key={k}
            data={`${humanizeKey(k)}: ${
              typeof v === 'string' ? v : JSON.stringify(v)
            }`}
          />
        ))}
      </>
    )
  }
  return <Paragraph data={JSON.stringify(value)} />
}

export default function Appendix({ content, block }) {
  const [options] = useDocumentOptions()
  const sectionIncluded = options.includedSections[SECTION_KEY] !== false

  const heading = content?.title || 'Appendix'

  // content.data carries all the tagged blocks — one key per block
  // (`keywords`, `acknowledgements`, whatever the author named them).
  // Filter out anything that looks like a framework-injected key
  // (e.g., collections referenced elsewhere).
  const data = content?.data || {}
  const tags = Object.keys(data).filter((k) => {
    const v = data[k]
    // Collection references inject arrays of objects with a `slug`
    // field. Skip those — tagged blocks have plain shapes.
    if (Array.isArray(v) && v[0] && typeof v[0] === 'object' && 'slug' in v[0]) {
      return false
    }
    return true
  })

  useDocumentOutput(
    block,
    'docx',
    sectionIncluded ? (
      <>
        <DocxH2 data={heading} data-page-break-before="true" />
        {tags.map((tag) => (
          <React.Fragment key={tag}>
            <DocxH3 data={humanizeKey(tag)} />
            {renderDocxBlock(data[tag])}
          </React.Fragment>
        ))}
      </>
    ) : (
      <></>
    ),
  )

  if (!sectionIncluded) return null

  return (
    <div className="max-w-3xl mx-auto py-12">
      <h2 className="text-heading text-3xl font-bold mb-8">{heading}</h2>

      {tags.length === 0 && (
        <p className="text-subtle italic">
          No appendix content. Add tagged YAML blocks to the section's
          markdown file (e.g., <code>```yaml:keywords</code>).
        </p>
      )}

      {tags.map((tag) => (
        <section key={tag} className="mb-8">
          <h3 className="text-heading text-xl font-semibold mb-3">
            {humanizeKey(tag)}
          </h3>
          {renderPreviewBlock(data[tag])}
        </section>
      ))}
    </div>
  )
}
