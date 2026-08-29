/**
 * Foundation Configuration — monograph (Press showcase).
 *
 * A docusite foundation whose point is to exercise Press. It ships
 * no content-handlers (no Loom); chapter prose is static markdown,
 * structured data (specimens, measurements, references) is loaded
 * from site/entities/monograph/.
 */

export const vars = {
  'max-content-width': {
    default: '44rem',
    description: 'Maximum width for body content (narrow, book-like)',
  },
  'wide-content-width': {
    default: '60rem',
    description: 'Width for tables and figure grids',
  },
  'section-padding-y': {
    default: 'clamp(2rem, 4vw, 4rem)',
    description: 'Vertical padding around each section',
  },
  'chapter-gap': {
    default: 'clamp(3rem, 6vw, 6rem)',
    description: 'Gap between chapter headings and the preceding section',
  },
}

export default {
  defaultLayout: 'MonographLayout',
  props: {},
}
