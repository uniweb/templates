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
 * The handler's `vars` extractor exposes the members plus a few
 * precomputed totals. These are unit-wide numbers — not filtered
 * by the active selection — which sets up the narrative contrast on
 * Cover: "X members of the unit total" (Loom, static) vs. "Y matched
 * by the current selection" (JSX stats strip via useFilteredMembers,
 * reactive).
 *
 * ─────────────────────────────────────────────────────────────────────
 * Filtering: one delivered list, narrowed in the browser.
 * ─────────────────────────────────────────────────────────────────────
 *
 * The page's query delivers every member to each section as
 * content.data.members (the `data:` declaration below). Sections that
 * show the active population call useFilteredMembers (see components/
 * query-context.jsx), which applies the active where-object — a saved
 * view's or the filter panel's — to that list with @uniweb/core's
 * matchWhere: the where-object language a query's own `where:` uses.
 *
 * Nothing here names where the records come from — the site's own files,
 * a host that serves records live, or a foundation transport the site
 * selects. The sections receive content.data.members either way, and a
 * new selection narrows it without another request.
 */

import { Loom, createLoomHandlers } from '@uniweb/loom'
import { buildXlsxOptions, buildDocxOptions } from './compile-options.js'

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
  // ⭐ The keys every section receives — what the Loom handlers read (`buildVars`) and what
  // useFilteredMembers reads in the report sections: the members and the saved views.
  data: { members: {}, queries: {} },
  handlers: createLoomHandlers({
    engine,
    vars: buildVars,
  }),

  // Document outputs. Hosts (DownloadBar in-browser, `unipress compile`
  // headless) consume this map via `compileDocument(website, { format,
  // foundation, ...hostHints })`. Per-section sheet / paragraph
  // registrations still happen inside each section via useDocumentOutput;
  // these entries own document-level adapterOptions (workbook metadata,
  // paragraph style pack).
  outputs: {
    xlsx: {
      extension: 'xlsx',
      getOptions: (website, opts) => buildXlsxOptions(website, opts),
    },
    docx: {
      extension: 'docx',
      getOptions: (website, opts) => buildDocxOptions(website, opts),
    },
  },
}
