# Academic Metrics (Press xlsx showcase)

A **docusite** whose primary output is an Excel workbook. Reports aggregate metrics (publications, funding, supervisions) across a configurable set of university members. The same React components drive both a web preview and a downloadable `.xlsx` — with the two renderings intentionally diverging: charts and styled tables on the web, flat tabular sheets in Excel.

Ships with three 19th-century naturalists (Darwin, Wallace, Lyell) as sample members.

```bash
npx uniweb create my-metrics --template academic-metrics
cd my-metrics && pnpm dev
```

## How predicates work — static files now, real backend later

The active population (saved view or panel-composed filter) is a **where-object** — a small structured JSON predicate. Sections that show the filtered set call `useFilteredMembers()`, a foundation hook backed by `@uniweb/kit`'s `useFetched`. The framework decides whether to ship that predicate to the source or evaluate it locally, driven entirely by `fetcher.supports:` in `site.yml`.

Two modes, one author surface:

| Site setting | What the framework does | When to use |
|---|---|---|
| `fetcher.supports: []` *(default)* | Fetches `/data/members.json` once and applies the predicate in JS for each unique selection. Multiple sections share one cached fetch. | The default demo. Works without any backend. |
| `fetcher.supports: [where]` *(or more)* | Ships the predicate in the request (`?_where=<JSON>` for GET; merged into the body for POST). The source returns only matching records. | Production. Or local development against the dev backend (see below). |

The foundation has **no filtering code of its own**. There's no `data:` handler intercepting the cascade. Sections call `useFilteredMembers()`; that hook reads the active predicate from `page.state` and hands a where-bound request to the framework. The framework does the rest. Switching modes is one line in `site.yml`; nothing else changes.

## Try the dev backend

The framework ships a tiny Node server (`uniweb-dev-backend`) that boots an HTTP service reading the same YAML collections the static build emits. It implements the framework default fetcher's pushdown wire format, so you can develop against a "real" backend in one terminal:

```bash
# In one terminal: start the dev backend
npx uniweb-dev-backend --collections ./site/collections --port 8080

# In site.yml, uncomment the fetcher block:
#   fetcher:
#     baseUrl: http://localhost:8080
#     supports: [where, limit, sort]

# In another terminal: run the site as usual
pnpm dev
```

Now changing the population dropdown or the filter panel triggers a network request to `localhost:8080`. The browser receives only the matching subset; the server-side evaluator does the work. Switch the `fetcher:` block back to `supports: []` (or remove it) and the same site works against the static `/data/members.json` again. **Same components, same hooks, same author config.**

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

Seven sections, all narrowed by either the **Population** dropdown (saved views from `site/collections/queries/`) or the **Filter** panel (free-form controls generated from the `queryable:` declaration on the `members` collection in `site.yml`). The two are alternatives — picking from one clears the other. A **Sections** checkbox list on the same options panel hides individual sections from both the preview and the download.

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
3. **Change the filterable surface.** Edit the `queryable:` block on the `members` collection in `site.yml` — add fields, change types (`enum` / `boolean` / `range` / `text`), update enum options. The filter panel re-renders to match.
4. **Change theme.** Edit `theme.yml` or swap in `theme-archive.yml` per above.
5. **Edit the narrative.** Rewrite the body of `site/pages/report/cover.md` with any Loom expressions that make sense for the unit.
6. **Add a section.** Create a new `.md` in `site/pages/report/` with a new section type. Each section registers one xlsx sheet.
7. **Toggle sections live.** The Cover's checkbox list lets readers drop sections from the preview and the download without editing anything.

## Dependencies

- **`@uniweb/press`** — document compilation (registered outputs → xlsx Blob via exceljs, dynamic-imported).
- **`@uniweb/kit`** — provides `useFetched` (used by `useFilteredMembers` for predicate-bound fetches) and `useCollectionQueryable` (used by `FilterPanel` to read the queryable surface from `site.yml`).
- **`@uniweb/loom`** — text weaving for the Cover narrative.
- **`recharts`** — chart library for web-preview visualizations.
