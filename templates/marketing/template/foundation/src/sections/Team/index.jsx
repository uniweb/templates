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

function Team({ content, params }) {
  // Runtime guarantees: content fields exist, params have defaults from meta.js
  const { title, paragraphs } = content
  const { columns, style } = params

  // Support both fetched data and markdown items
  const rawMembers = content.data.team || content.items || []

  // Normalize to consistent shape
  const members = rawMembers.map((member) => {
    if (member.name !== undefined) {
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
        bio: member.bio || member.body,
        photo: member.avatar ? { url: member.avatar } : null,
        socialLinks,
      }
    }
    return {
      name: member.title,
      role: member.paragraphs?.[0],
      bio: member.paragraphs?.[1],
      photo: member.imgs?.[0],
      socialLinks: member.links || [],
    }
  })

  const gridCols = {
    2: 'sm:grid-cols-2',
    3: 'sm:grid-cols-2 lg:grid-cols-3',
    4: 'sm:grid-cols-2 lg:grid-cols-4',
  }

  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {(title || paragraphs[0]) && (
          <div className="text-center mb-16">
            {title && (
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-heading">
                {title}
              </h2>
            )}
            {paragraphs[0] && (
              <p className="text-lg max-w-2xl mx-auto text-muted">
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
                    <h3 className="text-lg font-semibold text-heading">{name}</h3>
                  )}
                  {role && (
                    <p className="text-sm text-subtle">{role}</p>
                  )}
                  {socialLinks.length > 0 && (
                    <div className="flex justify-center gap-3 mt-3">
                      {socialLinks.filter(link => isSocialLink(link.href)).map((link, i) => (
                        <Link key={i} href={link.href} className="text-subtle hover:text-primary">
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
                className="rounded-2xl overflow-hidden transition-all duration-300 bg-surface-subtle hover:shadow-lg"
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
                    <h3 className="text-xl font-semibold mb-1 text-heading">
                      {name}
                    </h3>
                  )}
                  {role && (
                    <p className="text-sm mb-3 text-subtle">{role}</p>
                  )}
                  {bio && (
                    <p className="text-sm mb-4 text-muted">{bio}</p>
                  )}
                  {socialLinks.length > 0 && (
                    <div className="flex gap-3">
                      {socialLinks.filter(link => isSocialLink(link.href)).map((link, i) => (
                        <Link key={i} href={link.href} className="text-subtle hover:text-primary">
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
