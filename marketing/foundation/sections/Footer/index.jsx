import { Link, cn, useWebsite, SocialIcon, isSocialLink } from '@uniweb/kit'

function Footer({ content }) {
  const { website } = useWebsite()

  const { title, paragraphs, links, items } = content
  const siteName = title || website?.name || 'Site'
  const copyright = paragraphs[0] || `\u00A9 ${new Date().getFullYear()} ${siteName}. All rights reserved.`

  const footerPages = website.getPageHierarchy({ for: 'footer' })
  const socialLinks = links.filter(link => isSocialLink(link.href))
  const legalLinks = links.filter(link => !isSocialLink(link.href))

  if (items.length > 0) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1 lg:col-span-2">
            <Link href="/" className="text-xl font-bold text-heading">{siteName}</Link>
            {paragraphs[1] && <p className="mt-4 text-sm text-subtle">{paragraphs[1]}</p>}
            {socialLinks.length > 0 && (
              <div className="flex items-center gap-4 mt-6">
                {socialLinks.map((link, i) => (
                  <Link key={i} href={link.href} className="text-subtle hover:text-heading transition-colors" aria-label={link.label || 'Social link'}>
                    <SocialIcon url={link.href} className="w-5 h-5" />
                  </Link>
                ))}
              </div>
            )}
          </div>
          {items.map((column, i) => (
            <div key={i}>
              {column.title && <h3 className="text-sm font-semibold text-heading mb-4">{column.title}</h3>}
              {column.links?.length > 0 && (
                <ul className="space-y-3">
                  {column.links.map((link, j) => (
                    <li key={j}>
                      <Link href={link.href} className="text-sm text-subtle hover:text-heading transition-colors">{link.label}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
        <div className="pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-subtle">{copyright}</p>
            {legalLinks.length > 0 && (
              <div className="flex items-center gap-4">
                {legalLinks.map((link, i) => (
                  <Link key={i} href={link.href} className="text-sm text-subtle hover:text-heading transition-colors">{link.label}</Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        <Link href="/" className="text-xl font-bold text-heading">{siteName}</Link>
        {footerPages.length > 0 && (
          <nav className="flex flex-wrap items-center justify-center gap-6">
            {footerPages.map((page) => (
              <Link key={page.route} href={page.navigableRoute} className="text-sm text-subtle hover:text-heading transition-colors">
                {page.label || page.title}
              </Link>
            ))}
          </nav>
        )}
        {socialLinks.length > 0 && (
          <div className="flex items-center gap-4">
            {socialLinks.map((link, i) => (
              <Link key={i} href={link.href} className="text-subtle hover:text-heading transition-colors" aria-label={link.label || 'Social link'}>
                <SocialIcon url={link.href} className="w-5 h-5" />
              </Link>
            ))}
          </div>
        )}
      </div>
      <div className="mt-8 pt-8 border-t border-border">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-subtle">{copyright}</p>
          {legalLinks.length > 0 && (
            <div className="flex items-center gap-4">
              {legalLinks.map((link, i) => (
                <Link key={i} href={link.href} className="text-sm text-subtle hover:text-heading transition-colors">{link.label}</Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

Footer.as = 'footer'
Footer.className = 'p-0 py-12 px-6'

export default Footer
