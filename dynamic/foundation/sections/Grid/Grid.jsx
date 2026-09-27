import React from 'react'
import { H1, P, ChildGrid } from '@uniweb/kit'

const GAPS = {
  none: 'gap-0',
  sm: 'gap-4',
  md: 'gap-6',
  lg: 'gap-8',
  xl: 'gap-12',
}

// The columns come from the section's `grid:` (one of the layouts meta.js offers);
// kit's ChildGrid lays the children out from it, and falls back to three.
function Grid({ content, block, params }) {
  const { title, paragraphs } = content
  const { headerRow, gap } = params

  return (
    <div className="max-w-6xl mx-auto px-4">
      {(title || paragraphs[0]) && (
        <div className="mb-12">
          {title && <H1 text={title} className="text-3xl font-extrabold text-heading mb-2" />}
          {paragraphs[0] && <P text={paragraphs[0]} className="text-subtle max-w-2xl" />}
        </div>
      )}

      <ChildGrid from={block} fallback={3} headerRow={headerRow} className={GAPS[gap] || GAPS.lg} />
    </div>
  )
}

Grid.className = 'py-12'

export default Grid
