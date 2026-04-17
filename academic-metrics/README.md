# Academic Metrics (Press xlsx showcase)

A **docusite** whose primary output is an Excel workbook. Reports aggregate metrics (publications, funding, supervisions) across a configurable set of university members. The same React components drive both a web preview and a downloadable `.xlsx` — with the two renderings intentionally diverging: charts and styled tables on the web, flat tabular sheets in Excel.

Ships with three 19th-century naturalists (Darwin, Wallace, Lyell) as sample members.

```bash
npx uniweb create my-metrics --template academic-metrics
cd my-metrics && pnpm dev
```

## What makes this a Press xlsx showcase

Most docusite templates favour the "same JSX → same output" pattern (see `monograph` and `cv-loom`). Excel workbooks benefit from the opposite pattern: the web preview and the spreadsheet usually want *different* shapes for the same data. A pie chart in the browser, rows of numbers in the file. This template leans into that.

| Press feature | Where it appears |
|---|---|
| `useDocumentOutput(block, 'xlsx', {title, headers, data})` | Every section registers exactly one xlsx sheet |
| Multi-sheet workbook | One sheet per section |
| Styled header row | Default — bold, filled, bottom-bordered |
| Auto-fit column widths | Default — override with `columnWidths: [...]` |
| Number formats | Keywords (`number`, `currency`, `percent`, `date`) or raw `numFmt` |
| Totals row | `totals: ['Total', 'sum', 'sum']` emits SUM formulas; also accepts `avg`, `count`, literals |
| Workbook metadata | Title, creator, subject flow through `compile('xlsx', {...})` |

## Sections

Seven sections, all gated by the **Population** selector (a saved-query dropdown) and a **Sections** checkbox list on the Cover. Switch either and both the preview AND the next download update.

| Section | Preview | Xlsx sheet |
|---|---|---|
| **Cover** | Report title, a Loom-resolved narrative paragraph (unit-wide counts), population selector, live stats strip | `Summary` — one row of aggregate metadata |
| **Members** | Roster table | `Members` — Name / Rank / Department / Tenured / Start year |
| **PublicationsByType** | Pie chart | `Publications by Type` — rows per type + totals |
| **PublicationsByJournal** | Horizontal bar chart (top 10 venues) | `Publications by Journal` — rows per venue + totals |
| **PublicationsByYear** | Vertical bar chart timeline | `Publications by Year` — Year / Count / Cumulative + totals |
| **Funding** | Horizontal bar chart (GBP per source) | `Funding` — Source / Grants / Total (GBP) + totals |
| **Supervisions** | Stacked bar chart (one stack per supervisor) | `Supervisions` — cross-tab: Member × Level columns + totals |

## Data model

`site/collections/members/*.yml` — one file per member. Each becomes one item in the `members` collection. Fields: `name`, `rank`, `department`, `tenured`, `start_year`, plus nested arrays (`publications[]`, `funding[]`, `supervisions[]`) that sections aggregate.

`site/collections/queries/*.yml` — saved queries (filters). Each file sets a `name`, `description`, `source: members`, and `where:` predicate authored in the [`@uniweb/query`](https://github.com/uniweb/query) DSL. Examples:

```yaml
# queries/tenured-biology.yml
name: Tenured Biology
description: Tenured members of the Department of Biology.
source: members
where: "department = 'biology' AND tenured"
```

## Themes

Two themes ship with the template:

- `site/theme.yml` — **Institute** (default). Clean blue/slate palette, Inter sans-serif throughout. Suited to clinical / administrative reporting.
- `site/theme-archive.yml` — **Archive** (alternate). Warm deep-teal + amber palette, Merriweather serif headings. Suited to library / humanities / historical units.

To swap, rename the files:

```bash
cd site
mv theme.yml theme-institute.yml
mv theme-archive.yml theme.yml
```

The foundation uses semantic tokens (`--heading`, `--body`, `--border`, `--accent`, etc.) so no component code changes — one foundation serves multiple tenants through theme alone.

## Loom integration

The Cover's markdown body contains Loom expressions resolved at content-handler time — `{COUNT OF members}`, `{SHOW members.name JOINED BY ', '}`, `{totalPublications}`, `{totalFunding}`, `{totalGrants}`, `{totalSupervisions}`. `foundation.js` registers `createLoomHandlers` from `@uniweb/loom` with a `vars` extractor that exposes members plus precomputed totals.

The narrative describes the **unit as a whole** (unfiltered totals); the live stats strip underneath describes the **current selection** (filtered by the active query). Two POVs, two authoring patterns, one Cover.

## How to customize

1. **Replace the members.** Edit or add files under `site/collections/members/`.
2. **Add a saved query.** Drop a new `name` / `where` YAML into `site/collections/queries/`. Appears in the selector automatically.
3. **Change theme.** Edit `theme.yml` or swap in `theme-archive.yml` per above.
4. **Edit the narrative.** Rewrite the body of `site/pages/report/cover.md` with any Loom expressions that make sense for the unit.
5. **Add a section.** Create a new `.md` in `site/pages/report/` with a new section type. Each section registers one xlsx sheet.
6. **Toggle sections live.** The Cover's checkbox list lets readers drop sections from the preview and the download without editing anything.

## Dependencies

- **`@uniweb/press`** — document compilation (registered outputs → xlsx Blob via exceljs, dynamic-imported).
- **`@uniweb/query`** — filter-only DSL for the population selector.
- **`@uniweb/loom`** — text weaving for the Cover narrative.
- **`recharts`** — chart library for web-preview visualizations.
