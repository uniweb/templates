# CV (Docusite) Template

An academic CV rendered as a **docusite** — a URL whose content is also a downloadable Microsoft Word document. The same React section components produce both the on-screen preview and the compiled `.docx`, from a single source of truth. No backend, no intermediate server, no round-trip: the document is assembled in the browser at the moment the user clicks Download.

```bash
uniweb create my-cv --template cv
cd my-cv && pnpm dev
# Open http://localhost:5173, click "Download" in the top-right corner.
```

## What Makes This Template Different

Most Uniweb templates produce websites. This one produces a **document that lives on the web**. That's a pattern — a "docusite" — that combines two properties most systems treat as separate:

- **On the screen**, it's a Uniweb page. It has a URL, navigates like any site, responds to the browser's width, reads `theme.yml`, and renders through the standard runtime.
- **On demand**, it compiles into a real `.docx` file the user can download, print, email, or open in Microsoft Word, Google Docs, Pages, or LibreOffice. The compile runs entirely in the browser via [`@uniweb/press`](https://www.npmjs.com/package/@uniweb/press).

The preview and the download are not two implementations of the same content. They are **one implementation with two consumers**. Each section component emits the same JSX to both: ordinary HTML tags for the preview, carrying semantic `data-*` attributes that Press's compile pipeline reads to produce the document.

That's the thing worth studying in this template. Open `src/sections/Cover/index.jsx` and note how the body fragment (lines 33–41) is used twice: once registered with `useDocumentOutput(block, 'docx', body)` for the compile path, and once wrapped in Tailwind divs for the preview path. Zero divergence. If you change the cover to add a role, the next download reflects it without any separate compile-side work.

### The one-foundation-many-tenants story

The same foundation, pointed at two different `theme.yml` files, produces two very different CVs — *and the download changes with the theme, not just the preview.* This template ships with two themes to demonstrate the pattern:

- **`theme.yml`** — Down House. Cormorant Garamond + Crimson Text serifs, navy primary, cream background. A formal, printed-monograph look.
- **`theme-modern.yml`** — Modern. Inter sans-serif, emerald primary, white background. A contemporary digital look.

Rename one to the other in `site/` to switch, then open the dev server and download. The headings, body font, and cover styles *in the downloaded `.docx`* shift with the theme because the foundation's `ReportLayout` reads live CSS custom properties at download time and threads them into Press's style pack (`src/layouts/ReportLayout/index.jsx` → `buildStylePack({ readVar })` → `src/components/docx-style-pack.js`). See `site/THEMES.md` for the full explanation.

This is the property that justifies calling it "one foundation, many tenants." A single component system serves many CV authors, each with their own visual identity, and the downloadable file inherits that identity without any foundation-side code change.

## Who Is This For?

- **Academic researchers** who need a living CV on the web and a printable document that always matches.
- **Faculty authoring annual reports** for departmental submission.
- **Anyone writing long-form documents** whose content changes often but whose Word output needs to stay in sync.

If you want a short job-hunt resume, this is probably too much scaffolding — the template leans toward the comprehensive academic CV (publications, funding, teaching, service, awards, appendix). A lighter `resume` template is a candidate for a future release.

## What Ships in the Box

### The sample content — Charles Darwin

The template is pre-populated with a full Charles Darwin CV: personal info, 2 education entries (Edinburgh, Cambridge), 2 employment entries (Beagle naturalist, Down House), **20 real publications** (Origin of Species, Descent of Man, the Cirripedia monographs, the four plant-physiology books from his later career, the 1881 Worms book…), 6 research grants totalling £1,530, a handful of teaching relationships (Hooker, Huxley, Lubbock, Romanes, Poulton, his son Francis), service on the Geological, Linnean, Zoological, and Royal societies, and 6 awards including the Copley Medal and an honorary Cambridge doctorate.

The publications are in real CSL-JSON format and render as a proper APA bibliography via [citestyle](https://www.npmjs.com/package/citestyle) — the download includes a hanging-indent bibliography section with edition markers, en-dash page ranges, two-author co-credits, and the full shape APA expects for books, journal articles, and chapter contributions.

### The 11 section types

Each is a section component in `src/sections/` that reads a named collection and renders it into both the preview and the download:

| Section type | Collection | Output |
|---|---|---|
| `Cover` | `personal` | Title page with name, affiliation, date range |
| `Contents` | — | Preview list + Word TOC field |
| `PersonalInfo` | `personal` | Name, title, affiliation, email, date of birth |
| `Education` | `education` | Timeline of degrees and institutions |
| `Employment` | `employment` | Timeline of roles and organizations |
| `ResearchFunding` | `funding` | Table with totals, per-row currency formatting |
| `Publications` | `publications` | APA bibliography via citestyle |
| `Teaching` | `teaching` | Timeline of mentees and courses |
| `Service` | `service` | Timeline of committees and fellowships |
| `Awards` | `awards` | Timeline of medals and honours |
| `Appendix` | — | Research areas, correspondents, acknowledgements (from page frontmatter) |

Plus one layout: `ReportLayout` — the frame that wraps the page body, mounts `<DocumentProvider>` so section components can register their docx fragments, mounts `<DocumentOptionsProvider>` so sections can read download-time options (date range, citation style, section inclusion), and renders the top-right toolbar with Options (gear) and Download buttons.

### The supporting components

Under `src/components/` — not section types, just helpers shared across sections:

- **`timeline.jsx`** — `itemToEntry`, `renderTimelinePreview`, `renderTimelineDocx`. The reason seven different sections all render consistent timelines from different collection shapes. When you add a new timeline-style section, import from here.
- **`document-options.jsx` + `document-options-panel.jsx`** — The download-time options context. Date range, citation style, per-section inclusion toggles. Persisted to localStorage. Read from section components via `useDocumentOptions()`.
- **`docx-style-pack.js`** — The `buildStylePack({ readVar })` factory that reads live CSS custom properties and produces the named paragraph styles (`cover-title`, `cover-subtitle`, `bibliography`) that land in `word/styles.xml`. The bridge between `theme.yml` and Word.
- **`helpers.js`** — `formatDate`, `fmtCurrency`, `yearRangeText`, `sumField`. Shared utilities that both section components and the audit script pull from.

## How to Use This Template for Your Own CV

1. **Replace the personal item.** Edit `site/collections/personal/darwin.md`. Rename it to your own slug (e.g. `jane-doe.md`). Update name, role, affiliation, email, date of birth.

2. **Replace the collections.** Delete the files under `site/collections/education/`, `employment/`, `funding/`, `publications/`, `teaching/`, `service/`, `awards/`, and add your own markdown entries following the same frontmatter shape. Each file represents one item in that section's timeline.

3. **Rebuild the publications in CSL-JSON.** The `publications/*.md` files use [CSL-JSON](https://github.com/citation-style-language/schema) fields in frontmatter (`type`, `author`, `issued`, `title`, `publisher`, `container-title`, `volume`, `issue`, `page`). If you have a `.bib` file, [citestyle's bibtex parser](https://www.npmjs.com/package/@citestyle/bibtex) converts it for you.

4. **Pick a theme** — `theme.yml` (Down House) or `theme-modern.yml` (Modern). Rename the one you don't want (or delete it), and customize the tokens. See `site/THEMES.md`.

5. **Adjust the appendix.** `site/pages/report/11-appendix.md` uses tagged YAML blocks for research areas, correspondents, archival references, and acknowledgements. Replace with your own or remove the section entirely by editing `src/sections/Appendix/index.jsx` out of the page.

6. **Quote your dates.** YAML treats `1809-02-12` as a native Date object, which JSON-serializes with a timezone-shifted ISO string. Quote date values in frontmatter: `born: '1980-05-17'`, `start: '2015-09-01'`. The `formatDate()` helper in `src/components/helpers.js` is defensive against both forms, but the quote convention avoids a whole class of edge cases.

## Downloading the Document

Run `pnpm dev` and open the site. The toolbar in the top-right corner has two buttons:

- **Options** — opens a popover with date range, citation style (APA, MLA, Chicago, IEEE, Vancouver, Harvard, AMA, Nature, Science), and per-section inclusion toggles. Settings persist to localStorage.
- **Download** — triggers `compile('docx', …)` from `@uniweb/press`, which walks every registered section fragment, compiles to `.docx`, and saves via `triggerDownload()`.

The download happens entirely in the browser. No server is involved. The compiled file is about 16 KB for the default Darwin CV and opens in Microsoft Word, Google Docs, Pages, or LibreOffice.

## Teaching Artifacts

### `foundation/scripts/compile-darwin.mjs`

A Node script that reproduces the browser download outside of React — loads the collection JSON files, constructs each section's HTML by hand in the exact shape Press's React builders would produce, feeds it through Press's public `htmlToIR`, and calls Press's compile pipeline directly. Useful for **automated audits** (unpack the `.docx`, grep `word/document.xml` for regressions) and as a **teaching artifact** showing how the htmlToIR + compile pipeline can be driven from plain Node without a browser.

**⚠️ It does not run from a scaffolded project as-is.** The script imports Press's internal compile adapter via a monorepo-relative path, and that path only resolves inside the Uniweb workspace checkout. Read the file as documentation — it shows how the HTML template approach works, how the style pack is built from theme variables, how citestyle drives the bibliography, and how the funding table's data attributes produce real Word table cells — but don't expect it to run when you `cd` into your scaffolded project and type `node scripts/compile-darwin.mjs`. The supported route to a `.docx` from your CV is the in-browser Download button.

If you need a Node-based audit and are willing to work inside a Uniweb workspace checkout, the script is a ready starting point.

## Key Source Files to Read

If you're learning how the pieces fit together, read in this order:

1. **`src/layouts/ReportLayout/index.jsx`** — the frame. Mounts the two providers, renders the toolbar, wires `buildStylePack({ readVar })` into the download handler. Short, ~150 lines.
2. **`src/sections/Cover/index.jsx`** — the simplest section. One source, two consumers: the `body` fragment gets registered for docx and re-rendered for preview.
3. **`src/sections/Publications/index.jsx`** — the most interesting section. Shows how citestyle's `formatAll()` produces both an HTML bibliography (for preview) and a text bibliography (for docx), sorted and filtered by the current download options.
4. **`src/sections/ResearchFunding/index.jsx`** — the table section. Shows how Press's `data-type="table"` / `data-type="tableRow"` / `data-type="tableCell"` vocabulary produces both CSS flexbox for the preview and real Word table cells for the download.
5. **`src/components/document-options.jsx`** — the options context. The pattern for any foundation that wants to parameterize its document at download time without leaking into Press.
6. **`src/components/docx-style-pack.js`** — the theme → Word bridge. The `buildStylePack({ readVar })` factory is where CSS custom properties become Word `rFonts` attributes.

## Dependencies

This template pulls in:

- **`@uniweb/press`** — the document compilation framework. Provides `DocumentProvider`, `useDocumentOutput`, `useDocumentCompile`, the docx builder primitives under `@uniweb/press/docx`, and the internal compile pipeline.
- **`citestyle`** — the CSL-based citation formatting library. Replaces the heavier `citation-js`. The template uses the APA style by default, but the download options panel lets end users switch to any of 9 pre-compiled styles at compile time.

Both are stable and both are on npm.

## Further Reading

- **`site/THEMES.md`** — the theme-switching story.
- **`@uniweb/press` docs** — [npmjs.com/package/@uniweb/press](https://www.npmjs.com/package/@uniweb/press). The package CLAUDE.md has the design rationale and the invariants to preserve when modifying it.
- **`citestyle` docs** — [npmjs.com/package/citestyle](https://www.npmjs.com/package/citestyle). The README covers CSL-JSON input, the styles bundled, and the output shape (`html`, `text`, `parts`, `links`).
- **Uniweb docusite concepts** — this is the first official docusite template. If you're building your own docusite category (e.g., `resume`, `thesis`, `report`, `brochure`), this template is the reference implementation.
