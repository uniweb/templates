import React from 'react'
import { P, Link } from '@uniweb/kit'

function Footer({ content }) {
  const { title, paragraphs, lists } = content
  const columns = lists[0] || []

  return (
    <div className="border-t border-border">
      <div className="max-w-[var(--max-content-width)] mx-auto px-6 py-12 grid gap-10 sm:grid-cols-2">
        <div>
          {title && <p className="text-lg font-bold text-heading mb-2">{title}</p>}
          {paragraphs[0] && <P text={paragraphs[0]} className="text-sm text-subtle max-w-sm" />}
        </div>

        {columns.length > 0 && (
          <ul className="flex flex-wrap gap-x-8 gap-y-3 sm:justify-end list-none p-0 m-0">
            {columns.map((item, i) => {
              const link = item.links?.[0]
              return (
                <li key={i} className="text-sm">
                  {link ? (
                    <Link href={link.href} className="text-subtle hover:text-link no-underline">
                      {link.label}
                    </Link>
                  ) : (
                    <span className="text-subtle">{item.paragraphs?.[0]}</span>
                  )}
                </li>
              )
            })}
          </ul>
        )}
      </div>

      <div className="max-w-[var(--max-content-width)] mx-auto px-6 pb-8 text-sm text-subtle">
        © {new Date().getFullYear()} {title}
      </div>
    </div>
  )
}

Footer.className = 'p-0'
Footer.as = 'footer'

export default Footer
