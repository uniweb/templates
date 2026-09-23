import React from 'react'
import { H1, P, ChildBlocks, cn } from '@uniweb/kit'

const GAPS = {
  none: 'gap-0',
  sm: 'gap-4',
  md: 'gap-6',
  lg: 'gap-8',
  xl: 'gap-12',
}

// '40/60' → '40fr 60fr'. A ratio with a different part count than `columns`
// falls back to equal widths, so a stale ratio never breaks the grid.
function templateColumns(columns, layout) {
  const parts = String(layout || '').split('/').map(Number)
  const valid = parts.length === columns && parts.every((n) => n > 0)
  return valid ? parts.map((n) => `${n}fr`).join(' ') : `repeat(${columns}, minmax(0, 1fr))`
}

function Grid({ content, block, params }) {
  const { title, paragraphs } = content
  const { columns, layout, headerRow, gap } = params
  const children = block.childBlocks || []

  return (
    <div className="max-w-6xl mx-auto px-4">
      {(title || paragraphs[0]) && (
        <div className="mb-12">
          {title && <H1 text={title} className="text-3xl font-extrabold text-heading mb-2" />}
          {paragraphs[0] && <P text={paragraphs[0]} className="text-subtle max-w-2xl" />}
        </div>
      )}

      {children.length > 0 && (
        <div
          className={cn('grid grid-cols-1 lg:grid-cols-[var(--grid-cols)]', GAPS[gap] || GAPS.lg)}
          style={{ '--grid-cols': templateColumns(columns, layout) }}
        >
          {children.map((childBlock, index) => (
            <div
              key={childBlock.id || index}
              className={headerRow && index === 0 ? 'lg:col-span-full' : ''}
            >
              <ChildBlocks blocks={[childBlock]} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

Grid.className = 'py-12'

export default Grid
