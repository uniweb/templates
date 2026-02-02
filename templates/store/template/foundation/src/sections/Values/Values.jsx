import { H3, P, Icon } from '@uniweb/kit'

/**
 * Values Component
 *
 * Two-column layout from content items. Each item becomes a column.
 * Supports both text-only columns and icon-list columns.
 * Icons are rendered with text from the item's paragraphs.
 */
function Values({ content }) {
  const { items } = content

  return (
    <div className="max-w-4xl mx-auto px-8 pb-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {items.map((item, i) => (
          <ValueColumn key={i} item={item} />
        ))}
      </div>
    </div>
  )
}

function ValueColumn({ item }) {
  const hasIcons = item.icons && item.icons.length > 0

  return (
    <div className="space-y-6">
      {item.title && (
        <H3 text={item.title} className="text-3xl font-light" />
      )}

      {hasIcons ? (
        <ul className="space-y-4">
          {item.icons.map((icon, i) => (
            <li key={i} className="flex gap-4 items-start">
              <Icon
                {...icon}
                className="shrink-0 text-primary-600"
                size={24}
              />
              {item.paragraphs[i] && (
                <P text={item.paragraphs[i]} className="text-neutral-700" />
              )}
            </li>
          ))}
        </ul>
      ) : (
        item.paragraphs.map((p, i) => (
          <P
            key={i}
            text={p}
            className="text-neutral-500 leading-relaxed"
          />
        ))
      )}
    </div>
  )
}

export default Values
