# CV (Docusite) Template

An academic CV rendered as a **docusite** — a URL whose content is also a downloadable Word document. The same React section components produce both the on-screen preview and the compiled `.docx`. No backend, no intermediate server: the document is assembled in the browser when the user clicks Download.

```bash
npx uniweb create my-cv --template cv
cd my-cv && pnpm dev
```

## What makes this template different

Most Uniweb templates produce websites. This one produces a **document that lives on the web** — a "docusite" that combines two properties most systems treat as separate:

- **On the screen**, it's a Uniweb page with a URL, theme, and responsive layout.
- **On demand**, it compiles into a `.docx` with branded headers, footers, page numbers, and proper typography — entirely in the browser via [`@uniweb/press`](https://www.npmjs.com/package/@uniweb/press).

The preview and the download share the same JSX. Each section component emits ordinary HTML tags for the preview, carrying semantic `data-*` attributes that Press reads to produce the Word document. If you change the cover title, the next download reflects it without any separate compile-side work.

## Data model

All CV data lives in a **single hierarchical YAML file** (`collections/profile/darwin.yml`). Personal info, education, employment, publications (CSL-JSON), funding, teaching, service, and awards — all in one structured document. Section components read the field they need from `data.profile[0]`.

Publications use CSL-JSON fields for compatibility with [citestyle](https://www.npmjs.com/package/citestyle), which formats them as proper bibliographic entries (APA, MLA, Chicago, IEEE, and 5 more styles selectable at download time).

## Section types

Four section types, each demonstrating a different Press pattern:

| Section type | What it shows | Used for |
|---|---|---|
| **Cover** | H1/H2 with named paragraph styles | Title page with name, role, contact info |
| **Section** | Generic param-driven timeline | Education, Employment, Teaching, Service, Awards |
| **ResearchFunding** | `data-type="table/tableRow/tableCell"` with borders and column widths | Funding table with currency totals |
| **Publications** | Async citestyle formatting + `data-style="bibliography"` hanging indent | APA/MLA/Chicago bibliography |

The **Section** type is reusable — its `dataField`, `primaryField`, and `secondaryField` params tell it which profile array to iterate and what fields to display. Five of the eight page sections use it.

## Layout and docx branding

**ReportLayout** wraps the page in `<DocumentProvider>` (for Press) and `<DocumentOptionsProvider>` (for download-time options). It provides:

- A branded **docx header** ("Down House Natural History — Annual Activity Report") via `useDocumentOutput` with `role: 'header'`
- A centered **page-number footer** ("Page X of Y") via `role: 'footer'`
- A **download toolbar** (top-right) with Options gear and Download button
- Paragraph styles for cover title/subtitle and bibliography hanging indent

## Download options

The Options panel lets users customize the download at compile time:

- **Date range** — filter publications, funding, and teaching by year range
- **Citation style** — switch between 9 pre-compiled styles (APA, MLA, Chicago, IEEE, Vancouver, Harvard, AMA, Nature, Science)
- **Section inclusion** — toggle individual sections on/off

Settings persist to localStorage. Changing any option triggers a re-render, which re-registers the Press fragments — the next compile reflects the new choices.

## Themes

Two themes ship in `site/`:

- **`theme.yml`** (Down House) — Cormorant Garamond + Crimson Text serifs, navy primary, cream background
- **`theme-modern.yml`** (Modern) — Inter sans-serif, emerald primary, white background

Rename one to the other to switch. The downloaded `.docx` inherits the theme's fonts because the layout reads live CSS custom properties at download time and threads them into Press's style pack. See `site/THEMES.md`.

## How to customize

1. **Replace the profile.** Edit `collections/profile/darwin.yml` with your own data.
2. **Publications in CSL-JSON.** Each publication needs `id`, `type`, `title`, `author`, `issued`. If you have a `.bib` file, [citestyle's bibtex parser](https://www.npmjs.com/package/@citestyle/bibtex) converts it.
3. **Pick a theme.** Copy `theme-modern.yml` over `theme.yml` for the contemporary look, or customize the tokens.
4. **Add a section.** Create a new `.md` file in `pages/report/` with `type: Section` and the params for your data field.
5. **Quote your dates.** YAML treats `1809-02-12` as a Date object. Quote values: `born: '1980-05-17'`.

## Key source files

Read in this order:

1. **`src/layouts/ReportLayout/index.jsx`** — the frame. Providers, branded docx header/footer, download handler with style pack.
2. **`src/sections/Cover/index.jsx`** — simplest section. One JSX fragment, two consumers (preview + docx).
3. **`src/sections/Section/index.jsx`** — the generic param-driven timeline. Shows how one component serves five different CV sections.
4. **`src/sections/ResearchFunding/index.jsx`** — the table section. Press's `data-type="table"` vocabulary producing both CSS flexbox and Word table cells.
5. **`src/sections/Publications/index.jsx`** — citestyle integration. Async style loading, date filtering, preview HTML vs docx text.
6. **`src/components/docx-style-pack.js`** — the theme → Word bridge. CSS custom properties become Word font attributes.

## Dependencies

- **`@uniweb/press`** — document compilation framework
- **`citestyle`** — CSL-based citation formatting (replaces citation-js)
