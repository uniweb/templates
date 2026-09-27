import { H2, P, ChildGrid } from '@uniweb/kit'

// The columns come from the section's `grid:` (one of the counts meta.js offers);
// kit's ChildGrid lays the children out from it, and falls back to three.
export default function Grid({ content, block }) {
  const { title, paragraphs } = content

  return (
    <div className="max-w-6xl mx-auto">
      {(title || paragraphs[0]) && (
        <div className="text-center mb-12">
          {title && <H2 text={title} className="text-heading text-3xl font-bold" />}
          {paragraphs[0] && <P text={paragraphs[0]} className="text-subtle mt-4 max-w-2xl mx-auto" />}
        </div>
      )}
      <ChildGrid from={block} fallback={3} />
    </div>
  )
}

Grid.className = 'py-[var(--section-padding-y)] px-[var(--section-padding-x)]'
