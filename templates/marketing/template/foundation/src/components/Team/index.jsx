import React from 'react'
import { cn, Link, SocialIcon, isSocialLink } from '@uniweb/kit'

/**
 * Team Component
 *
 * Display team member profiles with photos, names, roles, and social links.
 * Each subsection becomes a team member card.
 */

export function Team({ content, params }) {
  // Runtime guarantees: content fields exist, params have defaults from meta.js
  const { title, paragraphs } = content
  const { theme, columns, style } = params

  // Extract members from semantic groups (H3 patterns)
  const members = content.items

  const themes = {
    light: {
      section: 'bg-white',
      title: 'text-gray-900',
      description: 'text-gray-600',
      name: 'text-gray-900',
      role: 'text-gray-500',
      bio: 'text-gray-600',
      card: 'bg-gray-50 hover:shadow-lg',
      social: 'text-gray-400 hover:text-primary',
    },
    gray: {
      section: 'bg-gray-50',
      title: 'text-gray-900',
      description: 'text-gray-600',
      name: 'text-gray-900',
      role: 'text-gray-500',
      bio: 'text-gray-600',
      card: 'bg-white shadow-sm hover:shadow-lg',
      social: 'text-gray-400 hover:text-primary',
    },
    dark: {
      section: 'bg-gray-900',
      title: 'text-white',
      description: 'text-gray-400',
      name: 'text-white',
      role: 'text-gray-400',
      bio: 'text-gray-400',
      card: 'bg-gray-800 hover:bg-gray-750',
      social: 'text-gray-500 hover:text-primary',
    },
  }

  const t = themes[theme] || themes.light

  const gridCols = {
    2: 'sm:grid-cols-2',
    3: 'sm:grid-cols-2 lg:grid-cols-3',
    4: 'sm:grid-cols-2 lg:grid-cols-4',
  }

  return (
    <section className={cn('py-20 px-6', t.section)}>
      <div className="max-w-6xl mx-auto">
        {(title || paragraphs[0]) && (
          <div className="text-center mb-16">
            {title && (
              <h2 className={cn('text-3xl sm:text-4xl font-bold mb-4', t.title)}>
                {title}
              </h2>
            )}
            {paragraphs[0] && (
              <p className={cn('text-lg max-w-2xl mx-auto', t.description)}>
                {paragraphs[0]}
              </p>
            )}
          </div>
        )}

        <div className={cn('grid gap-8', gridCols[columns] || 'sm:grid-cols-3')}>
          {members.map((member, index) => {
            const name = member.title
            const role = member.paragraphs?.[0]
            const bio = member.paragraphs?.[1]
            const photo = member.imgs?.[0]
            const socialLinks = member.links || []

            if (style === 'simple') {
              return (
                <div key={index} className="text-center">
                  {photo && (
                    <img
                      src={photo.url || photo.src}
                      alt={name || ''}
                      className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                    />
                  )}
                  {name && (
                    <h3 className={cn('text-lg font-semibold', t.name)}>{name}</h3>
                  )}
                  {role && (
                    <p className={cn('text-sm', t.role)}>{role}</p>
                  )}
                  {socialLinks.length > 0 && (
                    <div className="flex justify-center gap-3 mt-3">
                      {socialLinks.filter(link => isSocialLink(link.href)).map((link, i) => (
                        <Link key={i} href={link.href} className={t.social}>
                          <SocialIcon url={link.href} className="w-5 h-5" />
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )
            }

            // Cards style (default)
            return (
              <div
                key={index}
                className={cn(
                  'rounded-2xl overflow-hidden transition-all duration-300',
                  t.card
                )}
              >
                {photo && (
                  <div className="aspect-square">
                    <img
                      src={photo.url || photo.src}
                      alt={name || ''}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-6">
                  {name && (
                    <h3 className={cn('text-xl font-semibold mb-1', t.name)}>
                      {name}
                    </h3>
                  )}
                  {role && (
                    <p className={cn('text-sm mb-3', t.role)}>{role}</p>
                  )}
                  {bio && (
                    <p className={cn('text-sm mb-4', t.bio)}>{bio}</p>
                  )}
                  {socialLinks.length > 0 && (
                    <div className="flex gap-3">
                      {socialLinks.filter(link => isSocialLink(link.href)).map((link, i) => (
                        <Link key={i} href={link.href} className={t.social}>
                          <SocialIcon url={link.href} className="w-5 h-5" />
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Team
