import React from 'react'
import { cn, Link } from '@uniweb/kit'

/**
 * ContactCard Component
 *
 * Contact information block for academic profiles.
 * Office location, email, phone, office hours.
 */
export function ContactCard({ content, params }) {
  const { title } = content.main?.header || {}
  const { paragraphs = [], links = [] } = content.main?.body || {}
  const {
    layout = 'sidebar',
    showIcon = true,
  } = params || {}

  // Parse contact info from paragraphs
  // Convention: each paragraph is "Label: Value" format
  const contactItems = paragraphs.map(para => {
    const colonIdx = para.indexOf(':')
    if (colonIdx > 0) {
      return {
        label: para.slice(0, colonIdx).trim(),
        value: para.slice(colonIdx + 1).trim(),
      }
    }
    return { label: '', value: para }
  }).filter(item => item.value)

  // Icon mapping based on label
  const getIcon = (label) => {
    const l = label.toLowerCase()
    if (l.includes('email') || l.includes('mail')) return 'mail'
    if (l.includes('phone') || l.includes('tel')) return 'phone'
    if (l.includes('office') || l.includes('room') || l.includes('location')) return 'location'
    if (l.includes('hours') || l.includes('time')) return 'clock'
    if (l.includes('fax')) return 'fax'
    return 'info'
  }

  const icons = {
    mail: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    phone: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    location: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    clock: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    fax: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
      </svg>
    ),
    info: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  }

  const layouts = {
    sidebar: {
      container: 'bg-slate-50 p-6 rounded-xl',
      title: 'text-lg font-semibold text-slate-900 mb-4',
      item: 'flex items-start gap-3 py-2',
    },
    inline: {
      container: 'flex flex-wrap gap-6',
      title: 'sr-only',
      item: 'flex items-center gap-2',
    },
    card: {
      container: 'bg-white border border-slate-200 p-6 rounded-xl shadow-sm',
      title: 'text-xl font-semibold text-slate-900 mb-6',
      item: 'flex items-start gap-3 py-3 border-b border-slate-100 last:border-b-0',
    },
  }

  const l = layouts[layout] || layouts.sidebar

  return (
    <div className={l.container}>
      {title && <h3 className={l.title}>{title}</h3>}

      <div className={layout === 'inline' ? 'flex flex-wrap gap-6' : 'space-y-1'}>
        {contactItems.map((item, i) => (
          <div key={i} className={l.item}>
            {showIcon && (
              <span className="text-primary flex-shrink-0 mt-0.5">
                {icons[getIcon(item.label)]}
              </span>
            )}
            <div>
              {item.label && layout !== 'inline' && (
                <p className="text-xs text-muted uppercase tracking-wide">{item.label}</p>
              )}
              <p className="text-slate-900">{item.value}</p>
            </div>
          </div>
        ))}
      </div>

      {links.length > 0 && (
        <div className={cn('flex gap-3 mt-4', layout === 'inline' && 'ml-auto')}>
          {links.map((link, i) => (
            <Link
              key={i}
              href={link.url}
              className="text-sm text-primary hover:underline"
            >
              {link.text}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default ContactCard
