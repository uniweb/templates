/**
 * Docx style pack for the monograph foundation.
 *
 * `buildStylePack({ readVar })` reads CSS custom properties from the
 * live site theme (`--font-heading`, `--font-body`) and bakes them into
 * the paragraph styles and numbering definitions the docx adapter
 * receives through compile() options. Same theme tokens that style the
 * web preview also style the downloaded .docx.
 *
 * Styles provided:
 *
 *   front-title         36 pt centred, pushes down on the cover page
 *   front-subtitle      20 pt italic centred subtitle
 *   front-meta          10 pt small-caps centred (author, date)
 *   front-abstract      11 pt justified with a little indent
 *   caption             italic 10 pt centred — for <Figure> and <Caption>
 *   bibliography        hanging indent, 10 pt — for citestyle entries
 *
 * Numbering provided:
 *
 *   heading-numbering   Two-level chapter/subsection numbering that
 *                       section components bind to H1 / H2 via
 *                       data-numbering-reference / data-numbering-level.
 *                       Level 0 prints "1., 2., 3., ..." and level 1
 *                       prints "1.1, 1.2, ..." with the chapter number
 *                       flowing through.
 *
 *   decimal-numbering   Plain numbered list ("1., 2., 3., ...") for
 *                       body-level NumberedList items (the "Observations"
 *                       pattern).
 */

// Twips: 1/1440 inch. 720 twips = 0.5 inch.
const HALF_INCH = 720
const QUARTER_INCH = 360

const pt = (n) => n * 2            // docx run size is in half-points
const ptToTwip = (n) => n * 20

const DEFAULT_HEADING_FONT = 'Calibri'
const DEFAULT_BODY_FONT = 'Calibri'

/**
 * Strip the quotes and fallback list off a CSS font-family value —
 * `'Cormorant Garamond', serif` → `Cormorant Garamond`. Word wants a
 * single family per run.
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
 * @param {(name: string) => string} [opts.readVar] - CSS custom-property reader.
 *   Returns the value of `--<name>`. Defaults to a no-op — then every
 *   style uses Calibri, which is always a valid Word fallback.
 * @returns {{ paragraphStyles: object[], numbering: object[] }}
 */
export function buildStylePack({ readVar } = {}) {
  const lookup = typeof readVar === 'function' ? readVar : () => ''
  const headingFont = firstFamily(lookup('font-heading'), DEFAULT_HEADING_FONT)
  const bodyFont = firstFamily(lookup('font-body'), DEFAULT_BODY_FONT)

  const paragraphStyles = [
    {
      id: 'front-title',
      name: 'Front Title',
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
        spacing: { before: ptToTwip(60), after: ptToTwip(12) },
      },
    },
    {
      id: 'front-subtitle',
      name: 'Front Subtitle',
      basedOn: 'Normal',
      next: 'Normal',
      quickFormat: true,
      run: {
        size: pt(20),
        italics: true,
        font: headingFont,
        color: '555555',
      },
      paragraph: {
        alignment: 'center',
        spacing: { before: 0, after: ptToTwip(18) },
      },
    },
    {
      id: 'front-meta',
      name: 'Front Meta',
      basedOn: 'Normal',
      next: 'Normal',
      run: {
        size: pt(10),
        font: headingFont,
        color: '6b6560',
        smallCaps: true,
      },
      paragraph: {
        alignment: 'center',
        spacing: { before: 0, after: ptToTwip(6) },
      },
    },
    {
      id: 'front-abstract',
      name: 'Front Abstract',
      basedOn: 'Normal',
      next: 'Normal',
      run: {
        size: pt(11),
        font: bodyFont,
      },
      paragraph: {
        alignment: 'both',
        indent: { left: QUARTER_INCH, right: QUARTER_INCH },
        spacing: { before: 0, after: ptToTwip(8) },
      },
    },
    {
      id: 'caption',
      name: 'Caption',
      basedOn: 'Normal',
      next: 'Normal',
      quickFormat: true,
      run: {
        size: pt(10),
        italics: true,
        font: bodyFont,
        color: '555555',
      },
      paragraph: {
        alignment: 'center',
        spacing: { before: ptToTwip(2), after: ptToTwip(12) },
      },
    },
    {
      id: 'bibliography',
      name: 'Bibliography',
      basedOn: 'Normal',
      next: 'Normal',
      quickFormat: true,
      run: {
        size: pt(10),
        font: bodyFont,
      },
      paragraph: {
        indent: { left: HALF_INCH, hanging: HALF_INCH },
        spacing: { before: 0, after: ptToTwip(6) },
      },
    },
  ]

  const numbering = [
    {
      reference: 'heading-numbering',
      levels: [
        {
          level: 0,
          format: 'decimal',
          text: '%1.',
          alignment: 'start',
          style: {
            paragraph: {
              indent: { left: 0, hanging: 0 },
            },
          },
        },
        {
          level: 1,
          format: 'decimal',
          text: '%1.%2',
          alignment: 'start',
          style: {
            paragraph: {
              indent: { left: 0, hanging: 0 },
            },
          },
        },
      ],
    },
    {
      reference: 'decimal-numbering',
      levels: [
        {
          level: 0,
          format: 'upperRoman',
          text: '%1.',
          alignment: 'end',
          style: {
            paragraph: {
              indent: { left: HALF_INCH, hanging: HALF_INCH },
            },
          },
        },
      ],
    },
    {
      reference: 'bullet-list',
      levels: [
        {
          level: 0,
          format: 'bullet',
          text: '•',
          alignment: 'start',
          style: {
            paragraph: {
              indent: { left: HALF_INCH, hanging: QUARTER_INCH },
            },
          },
        },
      ],
    },
  ]

  return { paragraphStyles, numbering }
}
