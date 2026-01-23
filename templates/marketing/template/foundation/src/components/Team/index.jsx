import React from 'react'
import { cn, Link, SocialIcon, isSocialLink } from '@uniweb/kit'

/**
 * Team Component
 *
 * Display team member profiles with photos, names, roles, and social links.
 *
 * Data sources (in order of precedence):
 * 1. content.data.team - From fetch (page/site level) or tagged code blocks
 * 2. content.items - From markdown H3 patterns
 */

export function Team({ content, params }) {
  // Runtime guarantees: content fields exist, params have defaults from meta.js
  const { title, paragraphs } = content
  const { theme, columns, style } = params

  // Support both fetched data and markdown items
  // Fetched data: { name, role, bio, avatar, social: { linkedin, twitter, github } }
  // Markdown items: { title, paragraphs, imgs, links }
  const rawMembers = content.data?.team || content.items || []

  // Normalize to consistent shape
  const members = rawMembers.map((member) => {
    // Check if it's fetched data format (has 'name' property)
    if (member.name !== undefined) {
      // Convert social object to links array
      const socialLinks = []
      if (member.social) {
        for (const [platform, url] of Object.entries(member.social)) {
          if (url) {
            socialLinks.push({ href: url, text: platform })
          }
        }
      }
      return {
        name: member.name,
        role: member.role,
        bio: member.bio,
        photo: member.avatar ? { url: member.avatar } : null,
        socialLinks,
      }
    }
    // Markdown items format
    return {
      name: member.title,
      role: member.paragraphs?.[0],
      bio: member.paragraphs?.[1],
      photo: member.imgs?.[0],
      socialLinks: member.links || [],
    }
  })

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
            const { name, role, bio, photo, socialLinks } = member

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
