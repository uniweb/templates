# Monograph (Press showcase)

A richly illustrated long-form document rendered as a **docusite** — a URL whose content is also a downloadable Microsoft Word file. Built to exercise `@uniweb/press` end-to-end: numbered chapters with nested subsections, figures with captions, data-driven specimen and measurement tables, a citestyle-formatted bibliography, and compile-time options (citation style, figure inclusion, chapter toggles).

Ships with Charles Darwin's 1835 Galapagos observations as sample content — a short monograph in the form of a naturalist's field report, with a cover portrait, an archipelago plate, specimens collected by island, finch beak measurements, observations on biogeography, a plates appendix, and a period-appropriate bibliography.

```bash
npx uniweb create my-monograph --template monograph
cd my-monograph && pnpm dev
```

## What makes this a Press showcase

Most templates produce websites. This one produces **a document that lives on the web** — the same React section components drive both the themed browser preview and the compiled `.docx`, with no divergence between them. Its job is to exercise every part of Press that matters for a real academic document:

| Press feature | Where it appears |
|---|---|
| Numbered chapter headings (1, 2, 3 …) | `Chapter` — `data-numbering-reference="heading-numbering"` level 0 |
| Nested subsection numbering (1.1, 1.2 …) | `Chapter` — same numbering reference, level 1 |
| Figures with captions | `Figure` — uses Press's `<Figure>`/`<Caption>` builders |
| Figure grids (plates appendix) | `FigureGrid` — CSS grid web, sibling figures in docx |
| Bordered data tables with percent widths | `SpecimenTable`, `FinchMeasurements` — Press's `<Table>`/`<Tr>`/`<Td>` |
| Bullet lists | `Chapter` — `params.bullets` drives `data-bullet-level={0}` paragraphs |
| Numbered lists with custom format (I., II., III.) | `Chapter` — `params.observations` drives `data-numbering-reference="decimal-numbering"` |
| Inline styled text (`<strong>`, `<em>`, `<a href>`) | Throughout — `<Paragraph data="...">` parses inline marks |
| Citestyle-formatted bibliography | `Bibliography` — async style load, hanging-indent `data-style="bibliography"` paragraphs |
| Branded docx header + page-number footer | `MonographLayout` registers footer; `PageBranding` registers header |
| Theme fonts → Word typography | `docx-style-pack.js` reads live CSS tokens on download |
| Compile-time options | `DocumentOptionsProvider` + options panel (gear icon, top-right) |

## Data model

Structured data lives in `site/entities/monograph/beagle.yml`. Section components read from `content.data.monograph[0]`. Narrative prose lives in markdown files under `site/pages/monograph/`, one per section:

```
site/pages/monograph/
├── 01-frontmatter.md     FrontMatter          Cover + portrait + abstract
├── 02-prologue.md        Chapter              Chapter 1 with bullets
├── 03-aerial.md          Figure               Inline figure
├── 04-zoology.md         Chapter              Chapter 2 with 3 subsections
├── 05-tortoise.md        Figure               Inline figure
├── 06-specimens.md       SpecimenTable        Data table from beagle.yml
├── 07-measurements.md    FinchMeasurements    Numeric data table
├── 08-biogeography.md    Chapter              Chapter with a numbered-list of observations
├── 09-plates.md          FigureGrid           Plates appendix
└── 10-bibliography.md    Bibliography         citestyle references
```

Images are in `site/public/images/`:
- `darwin-portrait.png` (front matter + plate I)
- `galapagos-aerial.png` (figure 1 + plate II)
- `espanola-tortoise.png` (figure 2 + plate III)

## Section types

| Section type | What it shows |
|---|---|
| `FrontMatter` | Title page with portrait, author meta, and justified abstract. Uses `front-title`, `front-subtitle`, `front-meta`, `front-abstract` style pack styles. |
| `Chapter` | The workhorse — H1 chapter title, body paragraphs (with drop-cap via CSS), nested subsections with H2s (auto-numbered 1.1, 1.2 in Word), and optional `bullets` / `observations` param-driven lists. |
| `Figure` | One captioned image. Press's `<Figure>` emits `data-type="contentWrapper"` so the image and caption land as sibling paragraphs in the docx. |
| `FigureGrid` | Plates appendix — CSS grid of figures in the web preview, sibling figures in the file. |
| `SpecimenTable` | Renders `monograph.specimens` through Press's `<Table>`/`<Tr>`/`<Td>`. Last row is a total. |
| `FinchMeasurements` | Renders `monograph.finchMeasurements` with numeric column alignment; closes with a centred `data-style="caption"` paragraph. |
| `Bibliography` | Loads citestyle + the active style module on demand, formats references, writes preview `.html` to `<SafeHtml>` list items and docx `.text` to `data-style="bibliography"` paragraphs. |
| `PageBranding` | Layout section registered from `site/layout/header.md`. Sets the Word header ("Beagle · Observations on the Galapagos") from author-editable markdown. |

## Layout and branding

`MonographLayout` provides:

- A `DocumentProvider` so every section's `useDocumentOutput(block, 'docx', body)` is collected.
- A `DocumentOptionsProvider` so sections can read the citation style, figure inclusion, and chapter-key toggles via `useDocumentOptions()`.
- A structural **docx footer** with centred page numbering ("X of Y").
- The **floating `DownloadBar`** in the top-right — a gear icon opening the options popover, and a Download button that compiles the page to a `.docx` Blob.
- The layout threads `--font-heading` and `--font-body` from the live theme through the style pack (`foundation/components/docx-style-pack.js`), so the downloaded file inherits the site's typography.

## Download options

Open the gear. Changing any option re-renders subscribed sections, which re-register their Press fragments (idempotent — the next compile reflects the new choices):

- **Citation style** — nine pre-compiled styles from citestyle (APA, MLA, Chicago, IEEE, Vancouver, Harvard, Nature).
- **Include figures** — off hides every `<Figure>` / `<FigureGrid>` from both the preview and the file.
- **Chapters** — one checkbox per chapter key; unchecked chapters vanish from the preview AND are excluded from the compiled document.

Settings persist to `localStorage` under `monograph/document-options`.

## How to customize

1. **Replace the content.** Edit `beagle.yml` and the markdown chapters under `site/pages/monograph/`. The section types and the style pack handle the rest.
2. **Add a chapter.** Create a new `.md` file under `site/pages/monograph/` with `type: Chapter` in the frontmatter. Add the chapter's key to `ALL_CHAPTER_KEYS` in `foundation/components/document-options.jsx` to pick up an inclusion toggle.
3. **Add a figure.** Drop an image into `site/public/images/`, then add a new `type: Figure` section, or add a plate entry to the FigureGrid's `plates` array.
4. **Tweak typography.** Edit `theme.yml` — the docx style pack reads the same font tokens so the file tracks the preview.
5. **Tune Word spacing.** All spacing constants are in `foundation/utils/docx-spacing.js` (twips, 1 pt = 20 twips). These attributes are docx-only — CSS handles the web preview spacing independently.

## Key source files

Read in this order to understand the template:

1. **`foundation/layouts/MonographLayout/index.jsx`** — the providers, the docx footer, the download bar wiring.
2. **`foundation/sections/Chapter/index.jsx`** — the single-tree Press pattern plus numbered headings, bullets, and observations.
3. **`foundation/sections/SpecimenTable/index.jsx`** — data-driven tables with Press's `<Table>`/`<Tr>`/`<Td>`.
4. **`foundation/sections/Bibliography/index.jsx`** — citestyle integration with live style swap.
5. **`foundation/components/docx-style-pack.js`** — the theme → Word bridge. Defines chapter numbering, caption style, bibliography hanging indent.
6. **`foundation/components/document-options.jsx`** — the hook + provider every chapter reads.

## Dependencies

- **`@uniweb/press`** — document compilation framework (root + `/docx`).
- **`citestyle`** — CSL-based citation formatting.
