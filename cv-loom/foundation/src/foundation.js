import { Loom, createLoomHandlers } from '@uniweb/loom'
import { formatCitation } from 'citestyle'
import * as apa from 'citestyle/styles/apa'
import { publicationToCsl } from '#utils/to-csl.js'
import { findPublication } from '#utils/find-publication.js'

export const vars = {
  'max-content-width': {
    default: '48rem',
    description: 'Maximum width for section content',
  },
  'section-padding-y': {
    default: 'clamp(2rem, 4vw, 4rem)',
    description: 'Vertical padding around each section',
  },
  'header-height': {
    default: '4rem',
    description: 'Height of the sticky download bar',
  },
}

/**
 * CITE — custom Loom function backed by citestyle.
 *
 * Usage:
 *
 *   {CITE 'origin-1859'}              → (Darwin, 1859)
 *   {CITE 'origin-1859' -p='42'}      → (Darwin, 1859, p. 42)
 *
 * How it works:
 *
 *   - Loom custom functions are synchronous. citestyle's formatCitation
 *     is a pure sync function once the style module is loaded, so we
 *     statically import APA at the top of this file. That locks the
 *     template to one citation style — a fair trade for the inline
 *     citation use case, which rarely needs runtime style switching.
 *
 *   - `this.evaluate('publications')` gives the function access to the
 *     resolved Loom variable namespace (the profile flattened by the
 *     vars extractor below). We look up by `id` and normalize the flat
 *     record to CSL-JSON at the boundary via `publicationToCsl`.
 *
 *   - Flags come from Plain-form `-flag=value` tokens. `-p`, `-page`,
 *     and `-locator` all map to CSL's locator field so authors can
 *     write whichever feels natural.
 */
function CITE(flags, id) {
  const item = findPublication(this.evaluate('publications'), id)
  if (!item) return ''

  const locator = flags.p ?? flags.page ?? flags.locator
  const cite = [
    {
      item: publicationToCsl(item),
      ...(locator ? { locator: String(locator), label: 'page' } : {}),
    },
  ]

  try {
    return formatCitation(apa, cite).text
  } catch {
    return ''
  }
}

const engine = new Loom({}, { CITE })

export default {
  defaultLayout: 'CvLayout',
  handlers: createLoomHandlers({
    engine,
    vars: (data) => data?.profile?.[0],
  }),
}
