import React from 'react'
import { cn, Link } from '@uniweb/kit'

/**
 * TeamGrid Component
 *
 * Display lab members, collaborators, or team with academic roles.
 * Supports different member types (faculty, students, alumni).
 */
function TeamGrid({ content, params }) {
  const { title, paragraphs = [] } = content || {}
  const {
    groupByRole = true,
    cardStyle = 'photo',
    columns = 3,
  } = params || {}

  const members = content.items || []

  // Parse member data from content items
  const parsedMembers = members.map(member => {
    const { title: name, pretitle, paragraphs = [], imgs = [], links = [] } = member || {}

    return {
      name,
      role: pretitle || 'Member', // e.g., "PhD Student", "Postdoc"
      bio: paragraphs[0],
      email: paragraphs[1],
      photo: imgs[0],
      links,
    }
  })

  // Group by role if requested
  const grouped = groupByRole
    ? parsedMembers.reduce((acc, member) => {
        const key = member.role || 'Team'
        if (!acc[key]) acc[key] = []
        acc[key].push(member)
        return acc
      }, {})
    : { '': parsedMembers }

  const roleOrder = ['Faculty', 'Postdoc', 'PhD Student', 'Masters Student', 'Research Assistant', 'Alumni', 'Member', 'Team']
  const sortedRoles = Object.keys(grouped).sort((a, b) => {
    const aIdx = roleOrder.findIndex(r => a.toLowerCase().includes(r.toLowerCase()))
    const bIdx = roleOrder.findIndex(r => b.toLowerCase().includes(r.toLowerCase()))
    return (aIdx === -1 ? 99 : aIdx) - (bIdx === -1 ? 99 : bIdx)
  })

  const gridCols = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  }

  const MemberCard = ({ member }) => (
    <div className={cn(
      'group',
      cardStyle === 'photo' && 'text-center',
      cardStyle === 'compact' && 'flex items-center gap-4',
      cardStyle === 'detailed' && 'bg-slate-50 p-4 rounded-lg',
    )}>
      {member.photo && cardStyle !== 'minimal' && (
        <div className={cn(
          'overflow-hidden',
          cardStyle === 'photo' && 'w-32 h-32 mx-auto mb-4 rounded-full',
          cardStyle === 'compact' && 'w-12 h-12 rounded-full flex-shrink-0',
          cardStyle === 'detailed' && 'w-20 h-20 rounded-lg float-right ml-4 mb-2',
        )}>
          <img
            src={member.photo.url || member.photo.src}
            alt={member.name}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className={cardStyle === 'compact' ? 'flex-1 min-w-0' : ''}>
        <h3 className={cn(
          'font-semibold text-slate-900',
          cardStyle === 'photo' && 'text-lg',
          cardStyle === 'compact' && 'text-base truncate',
          cardStyle === 'detailed' && 'text-lg mb-1',
        )}>
          {member.name}
        </h3>

        {!groupByRole && member.role && (
          <p className={cn(
            'text-primary text-sm',
            cardStyle === 'compact' && 'truncate',
          )}>
            {member.role}
          </p>
        )}

        {cardStyle === 'detailed' && member.bio && (
          <p className="text-sm text-slate-600 mt-2 clear-both">{member.bio}</p>
        )}

        {member.links.length > 0 && cardStyle !== 'compact' && (
          <div className={cn(
            'flex gap-2 mt-2',
            cardStyle === 'photo' && 'justify-center',
          )}>
            {member.links.map((link, i) => (
              <Link
                key={i}
                href={link.url}
                className="text-xs text-muted hover:text-primary"
              >
                {link.text}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )

  return (
    <section className="py-12 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        {(title || paragraphs[0]) && (
          <div className="mb-10">
            {title && (
              <h2 className="text-2xl font-bold text-slate-900 mb-2">{title}</h2>
            )}
            {paragraphs[0] && (
              <p className="text-slate-600">{paragraphs[0]}</p>
            )}
          </div>
        )}

        {sortedRoles.map(role => (
          <div key={role} className="mb-10 last:mb-0">
            {role && groupByRole && (
              <h3 className="text-lg font-semibold text-slate-700 mb-6 pb-2 border-b border-slate-200">
                {role}
              </h3>
            )}

            <div className={cn('grid gap-8', gridCols[columns] || gridCols[3])}>
              {grouped[role].map((member, i) => (
                <MemberCard key={i} member={member} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default TeamGrid
