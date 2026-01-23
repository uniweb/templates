import React from 'react'
import { H2, P, cn } from '@uniweb/kit'

/**
 * Team Component
 *
 * Display team members in a grid.
 *
 * Data sources (in order of precedence):
 * 1. content.data.team - From fetch (page/site level) or tagged code blocks
 * 2. content.items - From markdown H3/H2 patterns
 */
export function Team({ content, params }) {
  // Runtime guarantees: content is flat, params have defaults from meta.js
  const { title, subtitle, paragraphs } = content
  const { theme, columns } = params

  // Support both fetched data and markdown items
  // Fetched data: { name, role, bio, avatar }
  // Markdown items: { title, subtitle, paragraphs, imgs }
  const rawMembers = content.data?.team || content.items || []

  // Normalize to consistent shape
  const members = rawMembers.map((member) => {
    // Check if it's fetched data format (has 'name' property)
    if (member.name !== undefined) {
      return {
        name: member.name,
        role: member.role,
        bio: member.bio,
        avatar: member.avatar ? { url: member.avatar } : null,
      }
    }
    // Markdown items format (H3 = name, H2 = role)
    return {
      name: member.title,
      role: member.subtitle,
      bio: member.paragraphs?.[0],
      avatar: member.imgs?.[0],
    }
  })

  const themes = {
    light: { section: 'bg-white', title: 'text-gray-900', text: 'text-gray-600' },
    gray: { section: 'bg-gray-50', title: 'text-gray-900', text: 'text-gray-600' },
  }

  const t = themes[theme] || themes.light

  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  }

  return (
    <section className={cn('py-16 sm:py-20 px-6', t.section)}>
      <div className="max-w-6xl mx-auto">
        {(title || subtitle) && (
          <div className="text-center mb-12">
            {title && <H2 text={title} className={cn('text-3xl sm:text-4xl font-bold mb-4', t.title)} />}
            {subtitle && <p className={cn('text-lg', t.text)}>{subtitle}</p>}
            {paragraphs[0] && <P text={paragraphs[0]} className={cn('text-lg mt-4 max-w-2xl mx-auto', t.text)} />}
          </div>
        )}

        {members.length > 0 && (
          <div className={cn('grid gap-8', gridCols[columns] || 'md:grid-cols-2 lg:grid-cols-4')}>
            {members.map((member, i) => (
              <div key={i} className="text-center">
                {member.avatar && (
                  <img
                    src={member.avatar.url || member.avatar.src || member.avatar}
                    alt={member.name || ''}
                    className="w-32 h-32 mx-auto mb-4 rounded-full object-cover"
                  />
                )}
                {member.name && <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>}
                {member.role && <p className="text-primary text-sm">{member.role}</p>}
                {member.bio && <P text={member.bio} className="text-gray-600 text-sm mt-2" />}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default Team
