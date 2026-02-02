import React from 'react'
import { H1, P } from '@uniweb/kit'

function Grid({ content, block }) {
  const { title, paragraphs } = content
  const ChildBlocks = block.getChildBlockRenderer()
  const children = block.childBlocks || []

  return (
    <div className="max-w-6xl mx-auto px-4">
      {(title || paragraphs[0]) && (
        <div className="mb-12">
          {title && <H1 text={title} className="text-3xl font-extrabold text-heading mb-2" />}
          {paragraphs[0] && <P text={paragraphs[0]} className="text-muted max-w-2xl" />}
        </div>
      )}

      {ChildBlocks && children.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {children.map((childBlock, index) => (
            <div
              key={childBlock.id || index}
              className={children.length === 2 && index === 0 ? 'lg:col-span-2' : ''}
            >
              <ChildBlocks blocks={[childBlock]} pure />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

Grid.className = 'py-12'

export default Grid
