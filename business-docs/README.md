# `business-docs` template

A complete site for **statements of work, invoices, and engagement
reports**, backed by the [`@uniweb/business-docs`](../../unipress/foundations/business-docs/)
foundation. The same foundation source ships in two surfaces: this
uniweb site (multi-page, filterable, XLSX export) and a unipress doc
template (`documents/invoice/`, single-record PDF/DOCX compile).

## Quick start

```bash
uniweb create my-billing-site --template business-docs
cd my-billing-site
pnpm dev
```

Then visit:

- `/` — overview, with `{COUNT OF invoices}` / `{COUNT OF sows}`
  Loom-rendered narrative.
- `/invoices` — list of all invoices, with the same filter UI as the
  report page.
- `/sows` — list of all SOWs.
- `/reports` — filtered engagement report with date-range / client /
  status controls. The Download menu emits an XLSX with two sheets
  (Records, Summary) reflecting the current filter.

## What's in the box

| Path | What it is |
|---|---|
| `foundation/src/` | A copy of the `@uniweb/business-docs` foundation source. Authors are free to fork it for site-specific extensions. |
| `site/site.yml.hbs` | Vendor identity, default currency, default tax jurisdiction, locale, and the queryable surface for both collections. |
| `site/theme.yml` | Default colors and fonts. The foundation declares no hard-coded colors; everything maps through CSS variables. |
| `site/collections/sows/` | 3 sample SOWs: two signed (Globex platform redesign, Initech mobile app) and one in-review (Pied Piper data migration). |
| `site/collections/invoices/` | 5 sample invoices: two multi-line subscription bills, two single-line milestone bills, one overdue. The overdue invoice and the in-review SOW exercise the cross-record validation matrix; the build log surfaces each finding at the appropriate severity. |
| `site/pages/` | One folder per top-level surface (index, invoices, sows, reports). Per-record `[slug]/` detail pages are deferred to a follow-up — the v1 list and report pages already exercise the foundation end-to-end. |

## Customizing

1. **Vendor identity** — edit `business_docs.vendor` in `site/site.yml`.
2. **Currency / tax / locale** — edit `business_docs.defaults`. To
   support a jurisdiction the foundation doesn't ship with, extend the
   registry under `business_docs.registries.tax`.
3. **New invoices / SOWs** — drop `.yml` files into
   `site/collections/invoices/` or `site/collections/sows/`. The
   collection processor also accepts `.bib` and YAML array form (one
   file with multiple records) for bulk imports.
4. **Foundation tweaks** — edit `foundation/src/`. The `useFilteredEngagement`
   hook (`foundation/src/hooks/`) is the place to extend filter
   composition; `compile-options.js` is where Press output options live
   (paragraph styles for docx, the print stylesheet for pagedjs, etc.).

## Outputs

- **Browser preview** — full SPA, foundation rendered into the page.
- **PDF (for printing)** — the report page's Download menu emits an
  HTML+Paged.js artifact. Open in a browser and use Print → Save as
  PDF; Paged.js handles paginated print layout.
- **DOCX** — direct file download from the report page.
- **XLSX** — download from the report page; two sheets (Records,
  Summary) reflect the current filter.

A native PDF adapter (Paged.js server-side or Typst) is on the v2
roadmap. Today's PDF path is browser-print.

## Notes on Loom usage

The foundation's content handler merges the active record's fields,
the site-level `business_docs.vendor` / `defaults`, and computed
`{subtotal}` / `{tax_amount}` / `{tax_rate}` / `{tax_label}` /
`{total}` placeholders into the Loom namespace. Authors writing
markdown can reach all of these with the `{name}` shorthand —
`SHOW` is the default verb. Reserve `{IF condition}`, `{COUNT OF}`,
`{TOTAL OF}`, `{SHOW field WHERE …}` for cases that need them.
