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
 *
 *
 * ─────────────────────────────────────────────────────────────────────
 *  ⚠️  SIMULATED BACKEND — read this before extending the template.
 * ─────────────────────────────────────────────────────────────────────
 *
 * The `data` handler below filters the members collection in-process
 * based on the active saved query. THIS IS NOT WHAT YOU WOULD DO IN
 * PRODUCTION. It exists so the demo runs without a backend.
 *
 * In a real deployment with thousands of faculty:
 *
 *   1. The active view's `where:` predicate (a structured where-object
 *      authored as YAML in site/collections/queries/) would be sent to
 *      your backend as part of the request — typically as JSON in a
 *      POST body.
 *
 *   2. The backend would evaluate the predicate against the database
 *      (translating it to SQL/Cypher/Mongo as needed) and return ONLY
 *      the matching records — say 47 of 3,000.
 *
 *   3. The browser would receive the already-filtered set and render
 *      it. The components downstream wouldn't know or care that
 *      filtering happened on the server.
 *
 * In this template we ship 3 sample members embedded in the build
 * output (public/data/members.json) and evaluate the same where-object
 * in the browser using @uniweb/core's matchWhere. Same predicate, same
 * result shape — just a different execution site. To swap in a real
 * backend you'd:
 *
 *   - Configure the `fetcher:` block in site.yml to point at your
 *     endpoint and declare `supports: [where]` (so the framework ships
 *     the predicate in the request rather than evaluating locally).
 *   - Delete the data handler below (the backend now does its job).
 *
 * Section components don't change. The selector UI doesn't change.
 * The saved YAML views don't change. That's the point.
 */

import { Loom, createLoomHandlers } from '@uniweb/loom'
import { matchWhere } from '@uniweb/core'

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

const ALL_MEMBERS_SLUG = 'all-members'

/**
 * SIMULATED BACKEND FILTERING. See the file header for the full story.
 *
 * Runs once per block, after Layer-1 fetches have populated
 * `data.members` (page-level cascade) and `data.queries` (per-block
 * fetch). Reads the active query slug from page.state — written by
 * the QuerySelector dropdown in the layout's options panel.
 *
 * Output shape mirrors what a real backend would return:
 *
 *   data.members        → records matching the active query
 *                         (or all records when no filter active)
 *   data.membersTotal   → unfiltered count, for "X of Y" displays
 *   data.activeQuery    → the query doc itself, for label rendering
 *                         (null when no filter active)
 *
 * Components consume these as plain content. They never see the
 * predicate or call the evaluator — those concerns live only here.
 */
function filterMembersByActiveQuery(data, block) {
  const allMembers = Array.isArray(data?.members) ? data.members : null
  if (!allMembers) return data

  const slug = block.page?.state?.get?.('slug')
  const allQueries = Array.isArray(data?.queries) ? data.queries : []

  if (!slug || slug === ALL_MEMBERS_SLUG) {
    return {
      ...data,
      membersTotal: allMembers.length,
      activeQuery: null,
    }
  }

  const activeQuery = allQueries.find((q) => q.slug === slug) || null
  if (!activeQuery || !activeQuery.where) {
    return {
      ...data,
      membersTotal: allMembers.length,
      activeQuery: activeQuery || null,
    }
  }

  // matchWhere walks the where-object against each record. In production
  // this same predicate would ship to the backend (see file header).
  const filtered = matchWhere(activeQuery.where, allMembers)

  return {
    ...data,
    members: filtered,
    membersTotal: allMembers.length,
    activeQuery,
  }
}

const loomHandlers = createLoomHandlers({
  engine,
  vars: buildVars,
})

export default {
  defaultLayout: 'MetricsLayout',
  props: {},
  handlers: {
    data: filterMembersByActiveQuery,
    ...loomHandlers,
  },
}
