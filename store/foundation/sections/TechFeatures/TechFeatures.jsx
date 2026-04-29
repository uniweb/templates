import { H2, H3, P, Icon } from '@uniweb/kit'

/**
 * TechFeatures Component
 *
 * Feature cards with icons on a dark background.
 * Uses theme: dark context — semantic tokens adapt automatically.
 * Each item from markdown becomes a feature card.
 */
function TechFeatures({ content, params }) {
  const { title, paragraphs, items } = content
  const { columns } = params

  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
  }

  return (
    <div className="max-w-4xl mx-auto px-8 py-24 space-y-24">
      <div className="text-center">
        {title && (
          <H2
            text={title}
            className="text-4xl md:text-5xl font-light mb-8"
          />
        )}
        {paragraphs[0] && (
          <P
            text={paragraphs[0]}
            className="text-neutral-400 text-lg"
          />
        )}
      </div>

      {items.length > 0 && (
        <div className={`grid grid-cols-1 ${gridCols[columns] || gridCols[3]} gap-8`}>
          {items.map((item, i) => (
            <div
              key={i}
              className="p-10 bg-white/5 border border-white/10 rounded-3xl space-y-6"
            >
              {item.icons?.[0] && (
                <div className="text-primary-500">
                  <Icon {...item.icons[0]} size={24} />
                </div>
              )}
              {item.title && (
                <H3 text={item.title} className="text-xl font-bold" />
              )}
              {item.paragraphs?.[0] && (
                <P
                  text={item.paragraphs[0]}
                  className="text-neutral-400 text-sm leading-relaxed"
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default TechFeatures
