import React from 'react'
import { Link } from '@uniweb/kit'

function Footer({ content, block }) {
  const { paragraphs = [], links = [] } = content
  const website = block.page?.website

  return (
    <footer className="py-12 px-6 bg-gray-900 text-gray-400">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm">
          {paragraphs[0] || `\u00A9 ${new Date().getFullYear()} ${website?.title || 'Site'}. All rights reserved.`}
        </p>
        {links.length > 0 && (
          <div className="flex gap-6">
            {links.map((link, i) => (
              <Link
                key={i}
                href={link.href}
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </footer>
  )
}

export default Footer
