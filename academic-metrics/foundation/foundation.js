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
 * by the active selection — which sets up the narrative contrast on
 * Cover: "X members of the unit total" (Loom, static) vs. "Y matched
 * by the current selection" (JSX stats strip via useFilteredMembers,
 * reactive).
 *
 * ─────────────────────────────────────────────────────────────────────
 * Filtering: the framework does the work.
 * ─────────────────────────────────────────────────────────────────────
 *
 * This foundation does NOT filter members itself. Sections that show
 * the active population call useFilteredMembers (see components/
 * query-context.jsx) — a thin hook over @uniweb/kit's useFetched that
 * passes the active where-object as part of the request.
 *
 * The framework decides whether to ship that where-object to the
 * source or to evaluate it locally, based on the site's
 * `fetcher.supports:` declaration:
 *
 *   - supports: []       (default; static /data/members.json) — the
 *     framework fetches the file once and applies the predicate in
 *     JS. Multiple sections share one cached fetch.
 *
 *   - supports: [where]  (real backend, e.g., the dev backend at
 *     localhost:8080) — the predicate ships in the request; the
 *     backend returns only matching records.
 *
 * Same author code, same foundation code, same components. Switching
 * modes is one block in site.yml. That's the architecture's promise
 * made concrete — and it's why this foundation no longer needs a
 * `data:` handler to bypass the framework's transport-aware fetcher.
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
