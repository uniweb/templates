# Academic Metrics (Press xlsx showcase)

A **docusite** whose primary output is an Excel workbook. Reports aggregate metrics (publications, funding, supervisions) across a configurable set of university members. The same React components drive both a web preview and a downloadable `.xlsx` — with the two renderings intentionally diverging: charts and styled tables on the web, flat tabular sheets in Excel.

Ships with three 19th-century naturalists (Darwin, Wallace, Lyell) as sample members.

```bash
npx uniweb create my-metrics --template academic-metrics
cd my-metrics && pnpm dev
```

## ⚠️ Simulated backend — read this first

A real "academic metrics" deployment serves a unit with hundreds or thousands of members. The browser does **not** receive every record; it sends the active view's `where:` predicate (a small JSON object) to a backend, which evaluates it against its database and returns only the matching subset.

This template has no backend. To keep the demo runnable from a single `pnpm dev`, the foundation **simulates that backend in the browser**:

- `site/collections/members/*.yml` is collected at build into `public/data/members.json` — the runtime fetches it whole.
- The foundation's `data` handler (in `foundation/src/foundation.js`) reads the active view from `page.state` and evaluates its `where:` predicate against the loaded members using `matchWhere` from `@uniweb/core`. The result lands on `content.data.members` for every section.
- Section components are dumb readers — they consume `content.data.members` (already filtered) and never see the predicate.

**This isn't how you'd deploy it.** With 3 sample members the browser-side evaluation is trivial; with 3,000 it would be wasteful and slow. To swap in a real backend:

1. Configure the `fetcher:` block in `site.yml` to point at your endpoint with `supports: [where]`. The framework will ship the `where:` predicate (as JSON in the POST body) instead of evaluating it locally.
2. Delete the `data` handler in `foundation.js` (the backend now does its job).

Section components don't change. The selector UI doesn't change. The saved YAML views don't change. **The architectural pattern is the same in both cases — only the execution site of the predicate moves.**

Read `foundation/src/foundation.js` for the inline simulator commentary. The handler is heavily annotated to make the boundary obvious.

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

`site/collections/queries/*.yml` — saved views (named filters). Each file sets a `name`, `description`, `source: members`, and a `where:` predicate as a structured where-object. Example:

```yaml
# queries/tenured-biology.yml
name: Tenured Biology
description: Tenured members of the Department of Biology.
source: members
where:
  department: biology
  tenured: true
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
2. **Add a saved view.** Drop a new `name` / `description` / `where` YAML into `site/collections/queries/` (the `where:` value is a where-object — see existing files for examples). Appears in the selector automatically.
3. **Change theme.** Edit `theme.yml` or swap in `theme-archive.yml` per above.
4. **Edit the narrative.** Rewrite the body of `site/pages/report/cover.md` with any Loom expressions that make sense for the unit.
5. **Add a section.** Create a new `.md` in `site/pages/report/` with a new section type. Each section registers one xlsx sheet.
6. **Toggle sections live.** The Cover's checkbox list lets readers drop sections from the preview and the download without editing anything.

## Dependencies

- **`@uniweb/press`** — document compilation (registered outputs → xlsx Blob via exceljs, dynamic-imported).
- **`@uniweb/core`** — provides `matchWhere` (the where-object evaluator) used by the foundation's data handler to simulate backend filtering. Section components never call it.
- **`@uniweb/loom`** — text weaving for the Cover narrative.
- **`recharts`** — chart library for web-preview visualizations.
