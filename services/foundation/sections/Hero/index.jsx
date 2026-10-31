import React from 'react'
import { H1, P, Span, Link, Icon } from '@uniweb/kit'

export default function Hero({ content }) {
  const { title, pretitle, paragraphs, links, lists } = content
  const points = lists[0] || []

  return (
    <div className="max-w-[var(--max-content-width)] mx-auto px-6 py-[var(--section-padding-y)]">
      <div className="max-w-2xl">
        {pretitle && (
          <Span text={pretitle} className="inline-block px-3 py-1 rounded-full text-sm font-semibold bg-primary-50 text-primary-700 mb-5" />
        )}

        {title && (
          <H1 text={title} className="text-4xl sm:text-5xl lg:text-6xl font-bold text-heading leading-tight mb-5" />
        )}

        {paragraphs[0] && (
          <P text={paragraphs[0]} className="text-lg sm:text-xl text-subtle mb-8" />
        )}

        {points.length > 0 && (
          <ul className="list-none p-0 m-0 mb-8 grid gap-3 sm:grid-cols-2">
            {points.map((item, i) => (
              <li key={i} className="flex items-center gap-2.5 text-body">
                <Icon name="check" size="20" className="text-success shrink-0" />
                <Span text={item.paragraphs?.[0]} />
              </li>
            ))}
          </ul>
        )}

        {links.length > 0 && (
          <div className="flex flex-wrap gap-3">
            {links.map((link, i) => (
              <Link
                key={i}
                href={link.href}
                className={
                  i === 0
                    ? 'inline-flex px-7 py-3.5 font-semibold rounded-[var(--control-radius)] bg-primary text-primary-foreground hover:bg-primary-hover no-underline'
                    : 'inline-flex px-7 py-3.5 font-semibold rounded-[var(--control-radius)] border border-border text-body hover:bg-muted no-underline'
                }
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
