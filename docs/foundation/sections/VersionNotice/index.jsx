import { Link, Span, useVersion } from '@uniweb/kit'

/**
 * VersionNotice — a line above the pages of an older version, leading to the same page in the
 * latest. On every other page it draws nothing, so it can sit in the header area of the whole site
 * from the start, and appear on its own the day the site gets an older version.
 *
 * The words are the site's, in the section's markdown, so they can be translated like any others.
 * Its link's label is the author's and its address is the reader's: the same page in the latest
 * version, else the nearest one to it.
 */
export default function VersionNotice({ content }) {
  const { isOlderVersion, latestVersion } = useVersion()
  if (!isOlderVersion) return null

  const { title, links } = content

  return (
    <div role="note" className="border-b border-warning bg-warning-subtle">
      <div className="mx-auto max-w-7xl px-4 py-2 text-sm text-heading sm:px-6 lg:px-8">
        {title && <Span text={title} />}
        {links[0]?.label && (
          <Link href={latestVersion.href} className="ml-1 font-medium underline">
            {links[0].label}
          </Link>
        )}
      </div>
    </div>
  )
}
