/**
 * Foundation Configuration — academic-metrics (Press xlsx showcase).
 *
 * A docusite foundation that produces a downloadable Excel workbook
 * aggregating academic metrics across a set of members. Sections
 * register xlsx fragments via useDocumentOutput; the layout wraps
 * everything in a DocumentProvider and offers a Download button.
 *
 * No content handlers (Loom / queries) in slice 1 — every section
 * receives the full `members` collection and filters in JS. Query
 * integration lands in slice 2b.
 */

export const vars = {
  'max-content-width': {
    default: '72rem',
    description: 'Maximum width for body content (wider than a book; tables need room)',
  },
  'section-padding-y': {
    default: 'clamp(2rem, 4vw, 4rem)',
    description: 'Vertical padding around each section',
  },
  'report-gap': {
    default: 'clamp(2rem, 4vw, 4rem)',
    description: 'Gap between report sections',
  },
}

export default {
  defaultLayout: 'MetricsLayout',
  props: {},
}
