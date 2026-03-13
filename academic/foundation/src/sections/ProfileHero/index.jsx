import React from 'react'
import { H1, P, Link, cn } from '@uniweb/kit'

/**
 * ProfileHero Component
 *
 * A hero section designed for academic profiles - researchers, labs, departments.
 * Unlike generic heroes, this focuses on academic identity elements:
 * - Photo/avatar with academic styling
 * - Institutional affiliation
 * - Research role/title
 * - Key metrics (citations, h-index, etc.)
 */
function ProfileHero({ content, params }) {
  const { title, pretitle, subtitle, paragraphs = [], links = [], images = [] } = content || {}
  const {
    variant = 'researcher',
    photoPosition = 'right',
    showAffiliation = true,
  } = params || {}

  const photo = images[0]
  const bio = paragraphs[0]
  const affiliation = pretitle  // e.g., "Department of Computer Science"
  const role = subtitle         // e.g., "Associate Professor"

  // Variant-specific styling
  const variants = {
    researcher: {
      container: 'bg-card',
      photoStyle: 'rounded-full border-4 border-section shadow-xl',
      photoSize: 'w-48 h-48',
      nameStyle: 'text-heading',
      roleStyle: 'text-primary font-medium',
      affiliationStyle: 'text-subtle text-sm uppercase tracking-wide',
    },
    lab: {
      container: 'bg-primary text-primary-foreground',
      photoStyle: 'rounded-2xl shadow-2xl',
      photoSize: 'w-64 h-48 object-cover',
      nameStyle: 'text-primary-foreground',
      roleStyle: 'text-primary-foreground/70',
      affiliationStyle: 'text-primary-foreground/60 text-sm uppercase tracking-wide',
    },
    department: {
      container: 'bg-section border-b-4 border-primary',
      photoStyle: 'rounded-lg',
      photoSize: 'w-full h-64 object-cover',
      nameStyle: 'text-heading',
      roleStyle: 'text-body',
      affiliationStyle: 'text-primary text-sm font-semibold uppercase tracking-wide',
    },
  }

  const v = variants[variant] || variants.researcher
  const isPhotoLeft = photoPosition === 'left'

  const PhotoBlock = () => {
    if (!photo) return null
    return (
      <div className="flex-shrink-0">
        <img
          src={photo.url || photo.src}
          alt={title || 'Profile photo'}
          className={cn(v.photoStyle, v.photoSize)}
        />
      </div>
    )
  }

  const ContentBlock = () => (
    <div className="flex-1 min-w-0">
      {showAffiliation && affiliation && (
        <p className={cn('mb-2', v.affiliationStyle)}>{affiliation}</p>
      )}

      {title && (
        <H1 text={title} className={cn('text-3xl md:text-4xl font-bold mb-2', v.nameStyle)} />
      )}

      {role && (
        <p className={cn('text-xl mb-4', v.roleStyle)}>{role}</p>
      )}

      {bio && (
        <P text={bio} className="text-lg leading-relaxed mb-6 max-w-2xl" />
      )}

      {links.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {links.map((link, i) => (
            <Link
              key={i}
              href={link.href}
              className={cn(
                'inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                i === 0
                  ? 'bg-primary text-primary-foreground hover:bg-primary-hover'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary-hover'
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )

  return (
    <section className={cn('py-16 px-6', v.container)}>
      <div className="max-w-5xl mx-auto">
        {variant === 'department' && photo ? (
          // Department: Full-width photo above content
          <div>
            <PhotoBlock />
            <div className="mt-8">
              <ContentBlock />
            </div>
          </div>
        ) : (
          // Researcher/Lab: Side-by-side layout
          <div className={cn(
            'flex flex-col md:flex-row gap-8 md:gap-12 items-center',
            isPhotoLeft ? 'md:flex-row' : 'md:flex-row-reverse'
          )}>
            <PhotoBlock />
            <ContentBlock />
          </div>
        )}
      </div>
    </section>
  )
}

export default ProfileHero
