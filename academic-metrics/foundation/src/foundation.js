/**
 * Foundation Configuration — academic-metrics (Press xlsx showcase).
 *
 * A docusite foundation that produces a downloadable Excel workbook
 * aggregating academic metrics across a set of members. Sections
 * register xlsx fragments via useDocumentOutput; the layout wraps
 * everything in a DocumentProvider and offers a Download button.
 *
 * Loom integration: the Cover section's markdown body contains Loom
 * expressions ({COUNT OF members}, {SHOW members.name JOINED BY ', '},
 * {totalPublications}, {totalFunding}, ...). createLoomHandlers runs
 * during the content-handler pass, so every component below receives
 * fully-resolved content — Loom is entirely upstream of Press.
 *
 * The handler's `vars` extractor exposes the members collection plus
 * a few precomputed totals. These are unit-wide numbers — not filtered
 * by the active query — which sets up the narrative contrast on Cover:
 * "X members of the unit total" (Loom, static) vs. "Y matched by the
 * current query" (JSX stats strip, reactive).
 */

import { Loom, createLoomHandlers } from '@uniweb/loom'

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

const engine = new Loom()

function buildVars(data) {
  const members = Array.isArray(data?.members) ? data.members : []

  const totalPublications = members.reduce(
    (sum, m) => sum + (Array.isArray(m.publications) ? m.publications.length : 0),
    0,
  )

  const fundingRecords = members.flatMap((m) =>
    Array.isArray(m.funding) ? m.funding : [],
  )
  const totalFunding = fundingRecords.reduce(
    (sum, f) => sum + (Number(f.amount) || 0),
    0,
  )
  const totalGrants = fundingRecords.length

  const totalSupervisions = members.reduce(
    (sum, m) => sum + (Array.isArray(m.supervisions) ? m.supervisions.length : 0),
    0,
  )

  return {
    members,
    totalPublications,
    totalFunding,
    totalGrants,
    totalSupervisions,
  }
}

export default {
  defaultLayout: 'MetricsLayout',
  props: {},
  handlers: createLoomHandlers({
    engine,
    vars: buildVars,
  }),
}
