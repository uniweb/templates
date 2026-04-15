/**
 * docx style pack for the faculty-annual-report foundation.
 *
 * Exports `buildStylePack({ readVar })` — a factory that reads CSS
 * custom properties from the live site theme (`--font-heading`,
 * `--font-body`) and bakes them into the paragraph styles the docx
 * adapter receives. This is what makes the one-foundation-many-tenants
 * story full-stack: the downloaded .docx inherits the site's typography
 * just like the on-screen preview does.
 *
 * `readVar` is injected rather than hard-coded so the function works
 * in three contexts: the browser (DocumentOptions > ReportLayout reads
 * from `document.documentElement`), unit tests (pass a mock), and the
 * Node audit script `compile-darwin.mjs` (pass a lookup object).
 *
 * Shapes match the `docx` library's ParagraphStyle and NumberingConfig
 * interfaces (Press just passes them through).
 *
 * Styles provided:
 *
 *   cover-title     — 36 pt heading, centered. Applied to the cover
 *                     <H1> via `data-style="cover-title"`.
 *   cover-subtitle  — 20 pt subheading, centered, muted weight.
 *   bibliography    — 11 pt with hanging indent, for APA / Chicago /
 *                     Harvard / MLA bibliography entries.
 *
 * Numbering:
 *
 *   biblio-numbering — decimal-numbered list (1. / 2. / 3. …) for
 *                      IEEE / Vancouver / numeric citation styles.
 *
 * A broader "legacy style pack" reference — paragraph styles like
 * `groupTitle` / `groupItems` — lives in `@uniweb/press`'s own
 * `docs/guides/style-pack.md`.
 */

// Twips: 1/1440 inch. 720 twips = 0.5 inch, a standard hanging indent.
const HALF_INCH = 720

// Run `size` is in half-points (so 22 = 11 pt).
const pt = (n) => n * 2
// Paragraph `spacing` is in twips (20 twips = 1 pt).
const ptToTwip = (n) => n * 20

const DEFAULT_HEADING_FONT = 'Calibri'
const DEFAULT_BODY_FONT = 'Calibri'

/**
 * Strip the quotes and fallback list that CSS font-family values
 * typically carry — `'Cormorant Garamond', serif` → `Cormorant Garamond`.
 * Word wants a single family name for the run's `font` field.
 */
function firstFamily(raw, fallback) {
  if (!raw) return fallback
  const first = String(raw).split(',')[0] || ''
  const cleaned = first.trim().replace(/^['"]|['"]$/g, '').trim()
  return cleaned || fallback
}

/**
 * Build a docx style pack from the live theme.
 *
 * @param {object} [opts]
 * @param {(name: string) => string} [opts.readVar]
 *   Function that returns the string value of a CSS custom property
 *   (without the `--` prefix). Defaults to a no-op lookup that yields
 *   Calibri for every font, so callers that don't care about theme
 *   typography (or tests) can call `buildStylePack()` with no args.
 * @returns {{ paragraphStyles: object[], numbering: object[] }}
 */
export function buildStylePack({ readVar } = {}) {
  const lookup = typeof readVar === 'function' ? readVar : () => ''
  const headingFont = firstFamily(lookup('font-heading'), DEFAULT_HEADING_FONT)
  const bodyFont = firstFamily(lookup('font-body'), DEFAULT_BODY_FONT)

  const paragraphStyles = [
    {
      id: 'cover-title',
      name: 'Cover Title',
      basedOn: 'Normal',
      next: 'Normal',
      quickFormat: true,
      run: {
        size: pt(36),
        bold: true,
        font: headingFont,
      },
      paragraph: {
        alignment: 'center',
        spacing: { before: ptToTwip(48), after: ptToTwip(12) },
      },
    },
    {
      id: 'cover-subtitle',
      name: 'Cover Subtitle',
      basedOn: 'Normal',
      next: 'Normal',
      quickFormat: true,
      run: {
        size: pt(20),
        font: headingFont,
        color: '555555',
      },
      paragraph: {
        alignment: 'center',
        spacing: { before: 0, after: ptToTwip(24) },
      },
    },
    {
      id: 'bibliography',
      name: 'Bibliography',
      basedOn: 'Normal',
      next: 'Normal',
      quickFormat: true,
      run: {
        size: pt(11),
        font: bodyFont,
      },
      paragraph: {
        indent: { left: HALF_INCH, hanging: HALF_INCH },
        spacing: { before: 0, after: 120 },
      },
    },
  ]

  const numbering = [
    {
      reference: 'biblio-numbering',
      levels: [
        {
          level: 0,
          format: 'decimal',
          text: '%1.',
          alignment: 'start',
          style: {
            paragraph: {
              indent: { left: HALF_INCH, hanging: HALF_INCH },
            },
          },
        },
      ],
    },
  ]

  return { paragraphStyles, numbering }
}
