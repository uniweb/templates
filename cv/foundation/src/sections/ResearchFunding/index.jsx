/**
 * ResearchFunding — tabular summary of research funding.
 *
 * This is the first slice that exercises Press's table attribute
 * vocabulary end-to-end inside a real Uniweb foundation. The same
 * JSX feeds both the web preview and the docx compile pipeline
 * (Mode 1 from the docusite concepts doc) — the outer and inner
 * <div>s carry `data-type="table"`/`"tableRow"`/`"tableCell"`
 * attributes for the docx walker, and the same divs use CSS
 * flex layout to render as a visible table in the browser.
 *
 * Columns:
 *   1. Year range (15% width)
 *   2. Title + source (60% width)
 *   3. Amount, formatted as currency (25% width)
 *
 * A header row and a total-footer row bracket the data rows.
 * The total row is computed at render time from the same items,
 * so it always reflects the current data.
 */
import { useDocumentOutput } from '@uniweb/press'
import {
  H2 as DocxH2,
  Paragraph,
  TextRun,
  convertMillimetersToTwip,
} from '@uniweb/press/docx'
import {
  fmtCurrency,
  yearRangeText,
  sumField,
} from '#components/helpers.js'
import {
  useDocumentOptions,
  intervalOverlapsRange,
} from '#components/document-options.jsx'

const SECTION_KEY = 'funding'

const COL_WIDTHS = [15, 60, 25] // must sum to 100
const CELL_MARGIN_TOP = convertMillimetersToTwip(1)
const CELL_MARGIN_BOTTOM = convertMillimetersToTwip(1)
const CELL_MARGIN_LEFT = convertMillimetersToTwip(2)
const CELL_MARGIN_RIGHT = convertMillimetersToTwip(2)

/**
 * One table cell. Accepts either a plain string (wrapped in
 * a <Paragraph>) or React children (for bold header labels, etc.).
 * Emits the full set of Press table-cell data attributes.
 */
function TableCell({ colIndex, children, emphasis = false, borderBottom = 'single' }) {
  const width = COL_WIDTHS[colIndex]
  return (
    <div
      className="py-2 px-3 text-sm"
      style={{ flex: `${width} ${width} 0%`, minWidth: 0 }}
      data-type="tableCell"
      data-width-size={width}
      data-width-type="pct"
      data-margins-top={CELL_MARGIN_TOP}
      data-margins-bottom={CELL_MARGIN_BOTTOM}
      data-margins-left={CELL_MARGIN_LEFT}
      data-margins-right={CELL_MARGIN_RIGHT}
      data-borders-top-style="none"
      data-borders-left-style="none"
      data-borders-right-style="none"
      data-borders-bottom-style={borderBottom}
      data-borders-bottom-size={4}
      data-borders-bottom-color="cccccc"
    >
      {typeof children === 'string' ? (
        emphasis ? (
          <Paragraph>
            <TextRun bold>{children}</TextRun>
          </Paragraph>
        ) : (
          <Paragraph data={children} />
        )
      ) : (
        children
      )}
    </div>
  )
}

function TableRow({ children, className = '' }) {
  return (
    <div
      className={`flex border-b border-border/50 ${className}`}
      data-type="tableRow"
    >
      {children}
    </div>
  )
}

export default function ResearchFunding({ content, block }) {
  const [options] = useDocumentOptions()
  const { dateRange, includedSections } = options
  const sectionIncluded = includedSections[SECTION_KEY] !== false

  const rawItems = content?.data?.funding || []

  // Filter by date range — an entry counts if its [start, end] interval
  // overlaps the requested range. Totals reflect only the filtered set.
  const items = rawItems.filter((item) =>
    intervalOverlapsRange(item.start, item.end, dateRange),
  )

  // Sort descending by start year so the most recent entry appears first.
  const sorted = [...items].sort((a, b) => (b.start ?? 0) - (a.start ?? 0))

  const totalGBP = sumField(
    sorted.filter((item) => (item.currency || 'GBP') === 'GBP'),
    'amount',
  )

  const heading = content?.title || 'Research Funding'

  const table = (
    <div
      className="mx-auto w-full max-w-3xl border border-border rounded"
      data-type="table"
    >
      {/* Header row */}
      <TableRow className="bg-muted font-semibold text-heading">
        <TableCell colIndex={0} emphasis borderBottom="single">
          Period
        </TableCell>
        <TableCell colIndex={1} emphasis borderBottom="single">
          Project and source
        </TableCell>
        <TableCell colIndex={2} emphasis borderBottom="single">
          Amount
        </TableCell>
      </TableRow>

      {/* Data rows */}
      {sorted.map((item) => (
        <TableRow key={item.slug || item.title}>
          <TableCell colIndex={0}>{yearRangeText(item.start, item.end)}</TableCell>
          <TableCell colIndex={1}>
            {/* Two paragraphs in one cell: title on top, source below */}
            <Paragraph>
              <TextRun bold>{item.title || ''}</TextRun>
            </Paragraph>
            <Paragraph data={item.source || ''} />
          </TableCell>
          <TableCell colIndex={2}>
            {fmtCurrency(item.amount, item.currency || 'GBP')}
          </TableCell>
        </TableRow>
      ))}

      {/* Total-footer row */}
      <TableRow className="bg-muted/50 font-semibold text-heading">
        <TableCell colIndex={0} borderBottom="none" />
        <TableCell colIndex={1} borderBottom="none" emphasis>
          Total (GBP)
        </TableCell>
        <TableCell colIndex={2} borderBottom="none" emphasis>
          {fmtCurrency(totalGBP, 'GBP')}
        </TableCell>
      </TableRow>
    </div>
  )

  useDocumentOutput(
    block,
    'docx',
    sectionIncluded ? (
      <>
        <DocxH2 data={heading} data-page-break-before="true" />
        {table}
      </>
    ) : (
      <></>
    ),
  )

  if (!sectionIncluded) return null

  return (
    <div className="max-w-4xl mx-auto py-12">
      <h2 className="text-heading text-3xl font-bold mb-6">{heading}</h2>
      {table}
      {(dateRange.start != null || dateRange.end != null) && (
        <p className="mt-3 text-xs uppercase tracking-wide text-subtle text-center">
          {sorted.length} of {rawItems.length} grants in range
        </p>
      )}
    </div>
  )
}
