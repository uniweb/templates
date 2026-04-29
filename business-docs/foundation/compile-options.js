/**
 * Per-format adapter-options builders for the business-docs foundation.
 *
 * Hosts (the in-page download button on the uniweb site template, the
 * `unipress compile` headless CLI) consume these via
 * compileDocument(website, { format, foundation, ...hostHints }).
 *
 * Per-section sheet / paragraph registrations still happen inside each
 * section via useDocumentOutput; these builders only assemble document-
 * level adapter options (workbook metadata, paragraph style packs,
 * Paged.js stylesheet) — the things hosts need but shouldn't own
 * per-host.
 */

const PRINT_STYLESHEET = `
@page {
  size: letter;
  margin: 1in 0.75in;
  @bottom-right { content: counter(page) " / " counter(pages); font-size: 9pt; color: #666; }
}
body { font-family: ui-sans-serif, system-ui, sans-serif; font-size: 10.5pt; line-height: 1.45; color: #111; }
h1 { font-size: 22pt; margin: 0 0 0.5em; }
h2 { font-size: 14pt; margin: 1.5em 0 0.4em; }
h3 { font-size: 11.5pt; margin: 1em 0 0.3em; }
table { width: 100%; border-collapse: collapse; margin: 0.75em 0 1em; }
th, td { border-bottom: 1px solid #ddd; padding: 0.4em 0.5em; text-align: left; vertical-align: top; }
th { font-weight: 600; }
.totals-row td { border-bottom: none; padding-top: 0.6em; }
.totals-row.grand td { border-top: 2px solid #111; font-weight: 700; }
.signature-block { margin-top: 2.5em; page-break-inside: avoid; }
.unsigned { color: #888; font-style: italic; }
`

function buildMeta(website, hostHints = {}) {
  const cfg = website?.config?.business_docs || {}
  return {
    title: hostHints.title ?? website?.config?.name ?? 'Business document',
    creator: hostHints.creator ?? cfg.vendor?.organization ?? 'Uniweb',
    subject: hostHints.subject ?? 'Business document',
  }
}

const DOCX_PARAGRAPH_STYLES = [
  {
    id: 'invoice-line',
    name: 'InvoiceLine',
    basedOn: 'Normal',
    next: 'Normal',
    quickFormat: true,
    run: { size: 22 }, // 11pt
    paragraph: { spacing: { before: 0, after: 80 } },
  },
  {
    id: 'totals-row',
    name: 'TotalsRow',
    basedOn: 'Normal',
    next: 'Normal',
    quickFormat: true,
    run: { size: 22, bold: true },
    paragraph: { spacing: { before: 80, after: 80 } },
  },
]

export function buildPagedjsOptions(website, hostHints = {}) {
  return {
    adapterOptions: {
      mode: 'html',
      meta: buildMeta(website, hostHints),
      stylesheet: PRINT_STYLESHEET,
    },
  }
}

export function buildDocxOptions(website, hostHints = {}) {
  return {
    adapterOptions: {
      ...buildMeta(website, hostHints),
      paragraphStyles: hostHints.paragraphStyles ?? DOCX_PARAGRAPH_STYLES,
      loadAsset: hostHints.loadAsset,
    },
  }
}

export function buildXlsxOptions(website, hostHints = {}) {
  return {
    adapterOptions: buildMeta(website, hostHints),
  }
}
