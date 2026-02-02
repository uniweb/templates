import { Sun, ArrowRight, Instagram, Mail } from 'lucide-react'
import { Link, H3, useWebsite } from '@uniweb/kit'

/**
 * Footer Component
 *
 * Dark-themed footer with four columns:
 * 1. Brand info (logo + description)
 * 2-3. Dynamic columns from content items (H3 headings with links)
 * 4. Newsletter signup form
 *
 * Renders its own dark background.
 */
function Footer({ content }) {
  const { website } = useWebsite()
  const { title, paragraphs, items } = content
  const siteName = title || website?.name || 'Solis Artisans'

  const navPages = website.getPageHierarchy({ for: 'footer' })

  return (
    <div className="bg-neutral-900 text-neutral-400 py-20 px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand column */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-white">
            <Sun className="text-primary-500" size={24} />
            <span className="font-black uppercase tracking-tighter">
              {siteName}
            </span>
          </div>
          {paragraphs[0] && (
            <p className="text-sm leading-relaxed">{paragraphs[0]}</p>
          )}
        </div>

        {/* Navigation column */}
        <div>
          <h5 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">
            Navigation
          </h5>
          <ul className="space-y-4 text-sm">
            {navPages.map((page) => (
              <li key={page.route}>
                <Link
                  href={page.navigableRoute}
                  className="hover:text-primary-500 transition-colors"
                >
                  {page.label || page.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Dynamic columns from items */}
        {items.map((item, i) => (
          <div key={i}>
            {item.title && (
              <h5 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">
                {item.title}
              </h5>
            )}
            {item.links && item.links.length > 0 ? (
              <ul className="space-y-4 text-sm">
                {item.links.map((link, j) => (
                  <li key={j}>
                    <Link
                      href={link.href}
                      className="hover:text-primary-500 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : item.icons && item.icons.length > 0 ? (
              <div className="flex gap-4">
                {item.icons.map((icon, j) => (
                  <span
                    key={j}
                    className="hover:text-primary-500 cursor-pointer transition-colors"
                  >
                    <IconByName name={icon.name} />
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        ))}

        {/* Newsletter column */}
        <div>
          <h5 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">
            Newsletter
          </h5>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex gap-2"
          >
            <input
              type="email"
              placeholder="Email address"
              className="bg-white/5 border border-white/10 px-4 py-2 rounded-lg text-sm flex-1 outline-none focus:border-primary-500 text-white placeholder:text-neutral-500"
            />
            <button
              type="submit"
              className="bg-primary-600 p-2 rounded-lg text-white hover:bg-primary-500 transition-colors"
            >
              <ArrowRight size={18} />
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

function IconByName({ name }) {
  // Map common icon names to Lucide components
  switch (name) {
    case 'instagram':
      return <Instagram size={20} />
    case 'mail':
      return <Mail size={20} />
    default:
      return <Mail size={20} />
  }
}

export default Footer
