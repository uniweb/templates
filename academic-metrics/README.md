# Academic Metrics (Press xlsx showcase)

A **docusite** whose primary output is an Excel workbook. Reports aggregate metrics (publications, funding, supervisions) across a configurable set of university members. The same React components drive both a web preview and a downloadable `.xlsx` — with the two renderings intentionally diverging: charts and styled tables on the web, flat tabular sheets in Excel.

Ships with three 19th-century naturalists (Darwin, Wallace, Lyell) as sample members.

```bash
npx uniweb create my-metrics --template academic-metrics
cd my-metrics && pnpm dev
```

## What makes this a Press xlsx showcase

Most docusite templates favour the "same JSX → same output" pattern (see `monograph` and `cv-loom`). Excel workbooks benefit from the opposite pattern: the web preview and the spreadsheet usually want *different* shapes for the same data. A bar chart in the browser, rows of numbers in the file. This template leans into that.

| Press feature | Where it appears |
|---|---|
| `useDocumentOutput(block, 'xlsx', {title, headers, data})` | Every section registers exactly one xlsx sheet |
| Multi-sheet workbook | One sheet per section |
| Styled header row | Default — bold, filled, bottom-bordered |
| Auto-fit column widths | Default — override with `columnWidths: [...]` |
| Number formats | Keywords (`number`, `currency`, `percent`, `date`) or raw `numFmt` |
| Totals row | `totals: true` auto-sums numeric columns; explicit spec with `sum`/`avg`/`count` |
| Workbook metadata | Title, creator, subject flow through `compile('xlsx', {...})` |

## Slice 1 scope

This is an incremental template. Slice 1 ships:

- A minimal foundation with **two sections**: `Cover` (report summary) and `Members` (roster).
- **Three mock members** in `site/collections/members/`.
- A floating **Download button** that compiles the page to a two-sheet `.xlsx`.
- No query selection yet — every member is included.
- No charts yet — previews are plain tables.

Further slices add:

- Query collection + options panel (slice 2b)
- Publications, funding, supervisions sections with xlsx aggregates (slices 3–6)
- Charts in the web preview (slice 7)
- docx companion output (future)

## Data model

`site/collections/members/*.yml` — one file per member. Each becomes one item in the `members` collection. Fields: `name`, `rank`, `department`, `tenured`, `start_year`, plus nested arrays (`publications[]`, `funding[]`, `supervisions[]`) that later slices will aggregate over.

## How to customize

1. **Replace the members.** Edit or add files under `site/collections/members/`.
2. **Change theme.** Edit `theme.yml` — heading and body font tokens are read by future Excel styling.
3. **Add a section.** Create a new `.md` in `site/pages/report/` with a new section type. Each section registers one xlsx sheet.

## Dependencies

- **`@uniweb/press`** — document compilation (registered outputs → xlsx Blob via exceljs, dynamic-imported).
