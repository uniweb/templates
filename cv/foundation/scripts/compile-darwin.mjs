#!/usr/bin/env node
/**
 * compile-darwin.mjs — audit-time Node compile of the Darwin CV.
 *
 * ⚠️ NOT RUNNABLE FROM A SCAFFOLDED PROJECT. This script exists as a
 *    teaching artifact showing how to drive the Press compile pipeline
 *    from Node, outside of React and outside of the browser. It was
 *    written against the Uniweb monorepo during the original development
 *    of this template and imports Press's internal adapter via a
 *    monorepo-relative path. That path is deliberate: Press's
 *    `src/adapters/docx.js` is NOT in the package's `exports` field,
 *    because static imports of the adapter would defeat Press's
 *    lazy-load bundle contract for the ~3.4 MB `docx` library (see
 *    @uniweb/press's CLAUDE.md). When you scaffold this template into
 *    a user project, the relative import below will not resolve.
 *
 *    Read this file as documentation of how:
 *      - collection JSON turns into IR via htmlToIR on HTML template
 *        strings (bypassing React/JSX entirely)
 *      - the style pack is built from CSS custom property lookups
 *      - citestyle APA formatting is driven on the Node side
 *      - the Funding table's data-attribute vocabulary works
 *      - the IR → docx compile step is called directly
 *
 *    The supported, always-working path for generating the .docx is
 *    the in-browser Download button from the dev server — see the
 *    template README's "Downloading the document" section. If you
 *    need a Node-based audit for your own CV docusite, adapt this
 *    script inside a Uniweb workspace checkout where the relative
 *    Press path resolves, or open a discussion about exposing a
 *    narrower audit API from Press.
 *
 * What it does (when it *can* run, inside the monorepo):
 *   Loads the real collection JSON files, constructs each section's
 *   HTML by hand in the shape Press's React builders would emit,
 *   feeds the HTML through Press's public `htmlToIR`, calls the
 *   internal compileDocx() to produce a real .docx Blob, and writes
 *   ./charles-darwin.docx next to this file. The HTML matches what
 *   the browser path produces — same data-type attributes, same
 *   data-heading values, same table vocabulary. htmlToIR doesn't
 *   know the difference.
 *
 * Invocation inside the monorepo (from the foundation directory):
 *   node scripts/compile-darwin.mjs
 */

import { readFileSync, writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

// Press — public IR helper (works from anywhere @uniweb/press is installed).
import { htmlToIR } from '@uniweb/press/ir'

// Press — INTERNAL adapter. This import ONLY works inside the Uniweb
// monorepo; see the header note above. The path jumps out of the
// template's foundation/ directory, up through pnpm-workspaces/
// framework/, and into @uniweb/press source. Remove or rewrite this
// line if you run the script from a scaffolded project.
import { compileDocx } from '../../../../framework/press/src/adapters/docx.js'

// citestyle — APA is the shipped default (Slice 4).
import { formatAll } from 'citestyle'
import * as apa from 'citestyle/styles/apa'

// Foundation helpers — helpers.js and docx-style-pack.js are both
// pure .js (no React, no @uniweb/press/docx imports) so Node can
// load them directly.
import {
  fmtCurrency,
  yearRangeText,
  sumField,
  formatDate,
} from '../src/components/helpers.js'
import { buildStylePack } from '../src/components/docx-style-pack.js'

// Browser-side, ReportLayout reads live CSS custom properties with
// getComputedStyle(document.documentElement). Here in Node we don't
// have a DOM, so we inject a mock readVar that returns the Down
// House theme's font families. This stays in sync with
// site/theme.yml by construction — if the theme changes, update
// both. A richer version could parse theme.yml, but the point of
// this script is visual audit, not runtime fidelity.
const DOWN_HOUSE_VARS = {
  'font-heading': "'Cormorant Garamond', serif",
  'font-body': "'Crimson Text', serif",
}
const readVar = (name) => DOWN_HOUSE_VARS[name] || ''
const stylePack = buildStylePack({ readVar })

// ────────────────────────────────────────────────────────────────────────────
// Load data
// ────────────────────────────────────────────────────────────────────────────

const __dirname = dirname(fileURLToPath(import.meta.url))
const dataDir = resolve(__dirname, '../../site/public/data')

function load(name) {
  return JSON.parse(readFileSync(resolve(dataDir, `${name}.json`), 'utf-8'))
}

const personal = load('personal')[0]
const education = load('education').sort(
  (a, b) => (b.start ?? 0) - (a.start ?? 0),
)
const employment = load('employment').sort(
  (a, b) => (b.start ?? 0) - (a.start ?? 0),
)
const funding = load('funding').sort((a, b) => (b.start ?? 0) - (a.start ?? 0))
const publications = load('publications')
const teaching = load('teaching').sort((a, b) => (b.start ?? 0) - (a.start ?? 0))
const service = load('service').sort((a, b) => (b.start ?? 0) - (a.start ?? 0))
const awards = load('awards').sort(
  (a, b) => (b.year ?? b.start ?? 0) - (a.year ?? a.start ?? 0),
)

// ────────────────────────────────────────────────────────────────────────────
// HTML helpers — equivalent output to Press's builder components
// ────────────────────────────────────────────────────────────────────────────

/** HTML-escape a string (angle brackets, ampersands). */
function esc(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

/** Escape for a double-quoted HTML attribute value. */
function attr(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

/**
 * Render a Press <H1|H2|H3|H4 data={text} {...extra}> equivalent.
 * `extra` is an object of additional data-* attributes to flow onto
 * the tag (e.g. { 'data-style': 'cover-title' }, { 'data-page-break-before': 'true' }).
 */
function heading(level, text, extra = {}) {
  if (!text) return ''
  const tag = `h${level}`
  const attrsStr = Object.entries(extra)
    .map(([k, v]) => ` ${k}="${attr(v)}"`)
    .join('')
  return `<${tag} data-type="paragraph" data-heading="HEADING_${level}"${attrsStr}><span data-type="text">${esc(
    text,
  )}</span></${tag}>`
}

/** Render a Press <Paragraph data={text} ...attrs>. */
function paragraph(text, extra = {}) {
  const attrsStr = Object.entries(extra)
    .map(([k, v]) => ` ${k}="${attr(v)}"`)
    .join('')
  return `<p data-type="paragraph"${attrsStr}>${esc(text ?? '')}</p>`
}

/** Paragraph with a single bold text run. */
function paragraphBold(text, extra = {}) {
  const attrsStr = Object.entries(extra)
    .map(([k, v]) => ` ${k}="${attr(v)}"`)
    .join('')
  return `<p data-type="paragraph"${attrsStr}><span data-type="text" data-bold="true">${esc(
    text,
  )}</span></p>`
}

/** A TableOfContents placeholder div — consumed by the tableOfContents adapter branch. */
function tocField({ title = 'Contents', hyperlink = true, headingRange = '1-3' } = {}) {
  return `<div data-type="tableOfContents" data-toc-title="${attr(
    title,
  )}" data-toc-hyperlink="${hyperlink ? 'true' : 'false'}" data-toc-heading-range="${attr(
    headingRange,
  )}"></div>`
}

// ────────────────────────────────────────────────────────────────────────────
// Section fragments
// ────────────────────────────────────────────────────────────────────────────

function renderCover() {
  const fullName = [personal.first_name, personal.family_name]
    .filter(Boolean)
    .join(' ')
  return [
    heading(1, 'Annual Report', { 'data-style': 'cover-title' }),
    heading(2, '1809 – 1882', { 'data-style': 'cover-subtitle' }),
    paragraph(fullName),
    personal.role && paragraph(personal.role),
    personal.affiliation && paragraph(personal.affiliation),
  ]
    .filter(Boolean)
    .join('')
}

function renderContents() {
  return heading(2, 'Contents') + tocField({ title: 'Contents' })
}

function renderPersonalInfo() {
  const fullName = [personal.first_name, personal.family_name]
    .filter(Boolean)
    .join(' ')
  const lines = [
    fullName && `Name: ${fullName}`,
    personal.role && `Title: ${personal.role}`,
    personal.affiliation && `Affiliation: ${personal.affiliation}`,
    personal.email && `Email: ${personal.email}`,
    personal.born &&
      `Date of birth: ${formatDate(personal.born, { format: 'long' })}`,
  ].filter(Boolean)
  return heading(2, 'Personal information') + lines.map((l) => paragraph(l)).join('')
}

function renderTimeline(title, items, { primaryField, secondaryField }) {
  const parts = [heading(2, title, { 'data-page-break-before': 'true' })]
  items.forEach((item) => {
    const range = yearRangeText(item.start, item.end)
    const primary = item[primaryField] || item.title || ''
    const h3 = range ? `${range} — ${primary}` : primary
    parts.push(heading(3, h3))
    if (item[secondaryField]) parts.push(paragraph(item[secondaryField]))
    if (item.excerpt) parts.push(paragraph(item.excerpt))
  })
  return parts.join('')
}

function renderAwards() {
  const parts = [heading(2, 'Awards and Honours', { 'data-page-break-before': 'true' })]
  awards.forEach((item) => {
    const year = item.year ?? item.start
    const h3 = year ? `${year} — ${item.title}` : item.title
    parts.push(heading(3, h3))
    if (item.organization) parts.push(paragraph(item.organization))
    if (item.excerpt) parts.push(paragraph(item.excerpt))
  })
  return parts.join('')
}

function renderResearchFunding() {
  const COL = [15, 60, 25]
  // mm → twip constants, matching ResearchFunding/index.jsx
  // 1 mm ≈ 56.69 twips; Math.floor semantics match docx lib
  const mm = (n) => Math.floor((n / 25.4) * 1440)
  const mt = mm(1)
  const mb = mm(1)
  const ml = mm(2)
  const mr = mm(2)

  function cell(col, innerHtml, { borderBottom = 'single' } = {}) {
    return `<div data-type="tableCell" data-width-size="${COL[col]}" data-width-type="pct" data-margins-top="${mt}" data-margins-bottom="${mb}" data-margins-left="${ml}" data-margins-right="${mr}" data-borders-top-style="none" data-borders-left-style="none" data-borders-right-style="none" data-borders-bottom-style="${borderBottom}" data-borders-bottom-size="4" data-borders-bottom-color="cccccc">${innerHtml}</div>`
  }
  function row(cells) {
    return `<div data-type="tableRow">${cells.join('')}</div>`
  }

  const totalGBP = sumField(
    funding.filter((item) => (item.currency || 'GBP') === 'GBP'),
    'amount',
  )

  const rows = [
    row([
      cell(0, paragraphBold('Period')),
      cell(1, paragraphBold('Project and source')),
      cell(2, paragraphBold('Amount')),
    ]),
    ...funding.map((item) =>
      row([
        cell(0, paragraph(yearRangeText(item.start, item.end))),
        cell(1, paragraphBold(item.title || '') + paragraph(item.source || '')),
        cell(2, paragraph(fmtCurrency(item.amount, item.currency || 'GBP'))),
      ]),
    ),
    row([
      cell(0, '', { borderBottom: 'none' }),
      cell(1, paragraphBold('Total (GBP)'), { borderBottom: 'none' }),
      cell(2, paragraphBold(fmtCurrency(totalGBP, 'GBP')), {
        borderBottom: 'none',
      }),
    ]),
  ]

  return (
    heading(2, 'Research Funding', { 'data-page-break-before': 'true' }) +
    `<div data-type="table">${rows.join('')}</div>`
  )
}

function renderPublications() {
  const entries = formatAll(apa, publications)
  const paragraphs = entries
    .map((entry) => paragraph(entry.text, { 'data-style': 'bibliography' }))
    .join('')
  return heading(2, 'Publications', { 'data-page-break-before': 'true' }) + paragraphs
}

function renderAppendix() {
  const sections = []
  sections.push(heading(2, 'Appendix', { 'data-page-break-before': 'true' }))

  // Research areas
  sections.push(heading(3, 'Research Areas'))
  const researchAreas = [
    'Transmutation of species (natural selection, sexual selection)',
    'Geology (coral reef formation, volcanic islands, South American stratigraphy)',
    'Invertebrate zoology (systematics of the Cirripedia)',
    'Plant physiology (pollination, climbing habits, carnivory, circumnutation)',
    'Animal and human behaviour (emotional expression, psychology of worms)',
    'Soil science (earthworm-driven formation of vegetable mould)',
  ]
  researchAreas.forEach((line) =>
    sections.push(paragraph(line, { 'data-bullet-level': '0' })),
  )

  // Correspondents
  sections.push(heading(3, 'Correspondents'))
  const correspondents = [
    'Joseph Dalton Hooker (~1,400 letters)',
    'Charles Lyell (~620 letters)',
    'Thomas Henry Huxley (~510 letters)',
    'Asa Gray (Harvard, ~300 letters)',
    'Alfred Russel Wallace (~170 letters)',
    'Fritz Müller (Brazil, ~100 letters)',
  ]
  correspondents.forEach((line) =>
    sections.push(paragraph(line, { 'data-bullet-level': '0' })),
  )

  // Archival
  sections.push(heading(3, 'Archival References'))
  sections.push(paragraph('Repository: Cambridge University Library (Darwin Archive)'))
  sections.push(
    paragraph(
      'Papers: ~14,000 letters to and from Darwin, plus notebooks and manuscripts',
    ),
  )
  sections.push(paragraph('Online: Darwin Correspondence Project (darwinproject.ac.uk)'))

  // Acknowledgements
  sections.push(heading(3, 'Acknowledgements'))
  sections.push(
    paragraph(
      'This report is assembled from published works, archived correspondence, and the remembrances of family members. Special recognition is owed to the many correspondents — amateur naturalists, missionaries, colonial administrators, gardeners, and ship captains — whose observations supplied material for every branch of the research programme described in the preceding sections.',
    ),
  )

  return sections.join('')
}

// ────────────────────────────────────────────────────────────────────────────
// Assemble all sections → IR → docx
// ────────────────────────────────────────────────────────────────────────────

const sectionHtmls = [
  renderCover(),
  renderContents(),
  renderPersonalInfo(),
  renderTimeline('Education', education, {
    primaryField: 'degree',
    secondaryField: 'institution',
  }),
  renderTimeline('Employment', employment, {
    primaryField: 'role',
    secondaryField: 'organization',
  }),
  renderResearchFunding(),
  renderPublications(),
  renderTimeline('Teaching and Mentorship', teaching, {
    primaryField: 'title',
    secondaryField: 'topic',
  }),
  renderTimeline('Service', service, {
    primaryField: 'title',
    secondaryField: 'organization',
  }),
  renderAwards(),
  renderAppendix(),
]

const sectionIRs = sectionHtmls.map((html) => htmlToIR(html))

const blob = await compileDocx(
  { sections: sectionIRs },
  {
    title: 'Charles Darwin — Annual Report',
    creator: 'Charles Darwin',
    subject: 'Faculty annual report (sandbox compilation)',
    description: 'Slice 9 audit build of the Darwin docusite.',
    keywords: 'Darwin, naturalist, annual report, docusite',
    ...stylePack,
  },
)

// compileDocx returns a Blob in the browser and a Buffer in Node.
let bytes
if (typeof blob.arrayBuffer === 'function') {
  bytes = Buffer.from(await blob.arrayBuffer())
} else {
  bytes = blob
}

const outputPath = resolve(__dirname, 'charles-darwin.docx')
writeFileSync(outputPath, bytes)

console.log('Compiled', sectionIRs.length, 'sections')
console.log('Wrote', outputPath, `(${bytes.length} bytes)`)
