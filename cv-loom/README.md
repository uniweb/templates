# CV (Loom + Press)

An academic CV template that demonstrates two Uniweb companion packages working together: **Loom** instantiates content from live data, and **Press** compiles it to a downloadable Word document. The same content feeds both the themed web preview and the `.docx` file — one source, two outputs.

The template also shows three ways to reach beyond plain Loom into a full third library: a custom `CITE` Loom function that delegates to **citestyle** for inline plain-text citations, a `@KeyWorks` block inset that renders a curated short bibliography between paragraphs, and a `Publications` escape-hatch section that bypasses Loom entirely to render a formatted bibliography.

Ships with Charles Darwin's CV as sample data: 10 page sections, 18 publications with stable ids, 6 awards, a full career timeline, and a branded Word document with custom header, footer, and page numbering.

```bash
npx uniweb create my-cv --template cv-loom
cd my-cv && pnpm dev
```

## The pipeline

```
darwin.yml (profile data)
    │
    ▼
site.yml declares `profile` collection
    │
    ▼
page.yml declares `data: profile`
    │
    ▼
Section markdown files contain {Loom expressions}
    │
    ▼
Content handler (createLoomHandlers) runs instantiateContent()
or instantiateRepeated() against data.profile[0]
    │
    ▼
Framework re-parses through semantic parser
    │
    ▼
Components receive ordinary content (title, paragraphs, items)
— zero knowledge of Loom
    │
    ├──► Web preview (React)
    └──► Press docx registration → compile() → .docx download
```

## What makes this a "docusite"

A docusite is a Uniweb site whose primary purpose is generating a document. The URL _is_ the document — navigable, themed, live — and the download button produces a file from the same content. No separate template, no export pipeline, no drift between what you see and what you get.

This CV is one page with 10 sections. Nine are markdown files whose {expressions} are resolved against a single profile data file — the content handler runs Loom once, and everything downstream (components, Press, prerender) sees plain resolved content. The tenth, `Publications`, is an escape-hatch section that bypasses Loom entirely to render a citestyle-formatted bibliography.

## Loom patterns demonstrated

Each section file exercises different Loom features. The progression from simple to complex is deliberate.

### Simple variable substitution
`01-header.md` — name, role, affiliation filled from profile fields:
```
# {first_name} {family_name}
## {role}
```

### Aggregation
`02-summary.md` — counts, totals, and averages computed inline:
```
{COUNT OF publications} published works
£{TOTAL OF funding.amount}
£{AVERAGE OF funding.amount} per grant
```

### Filtering with WHERE
`05-publications.md` — counts and lists filtered by field value:
```
{COUNT OF publications WHERE type = 'book'} books
{SHOW publications.title WHERE year > 1870 JOINED BY ', '}
```

### Joining lists
`05-publications.md` — single-field extraction joined into prose:
```
{SHOW publications.title WHERE type = 'book' JOINED BY ' · '}
```

### The source pattern
`03-education.md` through `09-awards.md` — a `---` divider splits the markdown into header (rendered once) and body (repeated per data item). Declared via `source: fieldName` in frontmatter:
```
---
type: CvEntry
source: education
---
# Education
{COUNT OF education} degrees from Edinburgh and Cambridge.
---
## {degree}
{institution} — {field} ({start}–{end})
```
The content handler (powered by `createLoomHandlers` from `@uniweb/loom`) resolves the header against the full profile, then loops the body template per record in the named array (each item's fields are merged into the Loom namespace). A second `---` starts a footer, rendered once after all items.

### Filtered iteration with `where`
`05b-books.md` — combines `source` and `where` to iterate only book-type publications:
```
---
type: CvEntry
source: publications
where: "type = 'book'"
---
# Books ({COUNT OF publications})
---
**{title}** ({year}), {publisher}
```

The `where` value is a Loom Plain-form expression. Only items where the expression evaluates to truthy are iterated. Aggregate expressions like `{COUNT OF publications}` in the header reflect the filtered set. Other examples: `year > 1870` (comparison), `refereed` (truthy check), `type = 'book' AND refereed` (boolean combination).

### Auto-linked content
`01-header.md` — plain `{email}` and `{website}` expressions. The content-reader auto-links emails and URLs at build time, so the resolved text renders as clickable links in both the web preview and the docx output (via Press's `parseStyledString`). No explicit markdown link syntax needed.

### Custom function: `CITE`
`02-summary.md` — inline citations backed by citestyle:
```
*On the Origin of Species* {CITE 'origin-1859'}
```
resolves to `*On the Origin of Species* (Darwin, 1859)`. With a locator:
```
{CITE 'descent-1871' -p='398'}
```
resolves to `(Darwin, 1871, p. 398)`.

Registered in `foundation.js` as a custom Loom function — a two-argument JS function (`flags, id`) that looks the publication up by `id` in the profile, normalizes the flat shape to CSL-JSON via `utils/to-csl.js`, and calls citestyle's `formatCitation`. This is the canonical pattern for *extending Loom's vocabulary*: when data-in-text calls for a library Loom doesn't include, drop to JS for one function.

Custom functions have an important constraint: **Loom is synchronous**, so any library the function depends on must be statically imported at module load. The template picks APA as its one citation style — the tradeoff for staying synchronous. For a foundation that needs runtime style switching, drop down to a full escape-hatch section type (see `Publications` below).

### Block inset: `![](@KeyWorks)`

`02-summary.md` — a curated short bibliography on its own line between paragraphs:
```
![](@KeyWorks){ids=origin-1859,descent-1871,variation-1868}
```

Renders as a small "Key Works" card with the three listed publications formatted in APA. Each entry is a link to the matching `Publications` entry — in web via an `href="#ref-<id>"` anchor, in docx via Press's internal-hyperlink that resolves because `Publications` tags each paragraph with `data-bookmark="ref-<id>"`.

This is an **inset** in the Uniweb sense: a named component that content authors embed in markdown via `![](@Name){params}` syntax. Insets are block-level — they live between paragraphs, not inline inside prose (inline inset support isn't in the framework today). The author picks where to place the widget; the component reads its params and renders.

`KeyWorks` reuses the same pipeline as `Publications`: `meta.data.inherit: ['profile']` gives it the publications array, `utils/to-csl.js` normalizes each record, citestyle formats them. The only new concept is the `ids` param (comma-separated, parsed by the component).

The inset exercises `Bookmark` — a Press primitive added for this template (`data-bookmark` on a `<Paragraph>` emits a Word bookmark). Without it, the internal hyperlinks produced by `KeyWorks` would point at nothing in the docx export.

### Press primitives added (for this template and future ones)

Beyond the visible demos above, the template landed three generic Press primitives that aren't all exercised by cv-loom but will serve other templates:

- `<Paragraph data-bookmark="id">` — emits a Word bookmark around the paragraph. **Used by `Publications` entries** so `KeyWorks` can link to them.
- `<WebOnly>` — wraps a subtree that renders in the browser but is dropped from docx. Useful when web and Word need different affordances for the same payload.
- `<FootnoteReference>` — emits a real Word footnote. Word typesets the children at the bottom of whichever page the reference marker lands on. Future academic/monograph templates will want this; cv-loom doesn't use it (CVs don't carry scholarly footnotes).

### When to pick which

| Need | Use |
|---|---|
| Plain-text citation inline with narrative prose | `{CITE 'id'}` |
| A curated short bibliography between paragraphs, each entry linked to the full list | `![](@KeyWorks){ids=a,b,c}` |
| The full formatted bibliography as a standalone section | `Publications` section type |

## Data conventions

The profile is a single YAML file (`collections/profile/darwin.yml`). Key conventions:

- **Years can be plain numbers or quoted strings.** Loom skips locale grouping for 4-digit integers, so `1859` renders as "1859" not "1,859". The Darwin data uses quoted strings (`'1859'`) for historical reasons, but unquoted works identically for display and comparisons.

- **Money amounts are plain numbers** (`1000`, not `'1000'`). This way `TOTAL OF funding.amount` produces locale-grouped output ("1,730").

- **Lists are pre-sorted** by display order. `SORTED BY field` sorts by the named field when items are objects. `funding.0` gives the largest grant because the array is sorted largest-first.

- **Publications carry an `id:`.** Short kebab-case slugs (`origin-1859`, `descent-1871`) that `CITE` and `Publications` use to reference entries. The rest of each publication is a flat author-friendly shape (`year`, `publisher`, `journal`) rather than CSL-JSON — `utils/to-csl.js` normalizes to CSL-JSON at the formatting boundary. Coauthored papers declare an explicit `authors:` list; anything without defaults to Darwin-only authorship.

## Section types

The foundation has four section types and one layout — three Loom-driven, one escape hatch.

### Header

Renders the personal info block: name (H1), role (H2), affiliation, and contact lines. Loom fills in every value. Uses a **single JSX tree** with Press builders — the same `<H1>`, `<H2>`, `<Paragraph>` elements serve as the web preview (styled via `className`) and compile to docx (via `data-*` attributes). This is the Press hello-world pattern: one tree, two consumers, zero drift.

### CvEntry

The generic workhorse. Renders `content.title` as H2, `content.paragraphs` as body text, and `content.items` as a list of sub-entries (H3 + paragraph each). Used for all non-header Loom sections. The items come from H2 headings in the markdown that appear after body content — the semantic parser groups them automatically. Same single-tree Press pattern as Header.

### Publications (escape hatch)

Unlike Header and CvEntry, this component does **not** use Loom. The bibliography it renders — per-field CSS classes, auto-linked DOIs, and a hanging-indent docx paragraph style — is too structured for text substitution to express cleanly.

The component reads `profile.publications` directly, normalizes each flat record to CSL-JSON through `utils/to-csl.js`, and runs citestyle's `formatAll` (APA, statically imported). Web preview uses `SafeHtml` on `entry.html` so the `.csl-author` / `.csl-title` / `.csl-container` classes survive. Docx gets `entry.text` wrapped in a `<Paragraph data-style="bibliography">` — the `bibliography` paragraph style is declared on `DownloadBar`'s `compile()` call with a 0.5" hanging indent.

This is the right pattern whenever a section needs richer output than Loom can express: **drop the Loom handler for that section, keep Loom for the rest.** The `meta.js` file declares `data: { inherit: ['profile'] }` so the section receives the profile the same way Loom sections do; from there, it's an ordinary React component.

### PageBranding

A layout section (`site/layout/header.md`) that registers the docx document header from content. The institution name and document label are author-editable markdown — change `layout/header.md` to rebrand the Word output. Renders nothing visible on the web page.

### CvLayout

Wraps the page in a `<DocumentProvider>` and provides:
- A **download button** (fixed bottom-right) that compiles all registered sections to `.docx`
- A **docx footer** with centered page numbers ("Page X of Y")
- Paragraph styles for the cover title and subtitle
- The **header area** where `PageBranding` registers the docx header

## Press integration

Press is format-agnostic: section components register JSX fragments via `useDocumentOutput(block, 'docx', body)`, and a `compile('docx')` call walks all registrations to produce a Blob. The layout's download button triggers this.

**Single-tree pattern.** Each section component builds one JSX tree using Press builder components (`<H1>`, `<H2>`, `<H3>`, `<Paragraph>`). The same tree is registered for docx AND returned as the web preview. Press builders render semantic HTML (`<h1>`, `<h2>`, `<p>`) that is styled via `className` (Tailwind) + CSS selectors for the browser, and walked via `data-*` attributes for the docx compiler. No duplicate rendering trees — one source, two outputs.

The docx header is registered by `PageBranding` (from `layout/header.md`) with `{ role: 'header' }`. The footer (page numbers) is registered structurally by the layout. The compile call passes paragraph style definitions (cover-title, cover-subtitle) so the Word document renders the header section with appropriate typography.

## How to customize

**Change the profile data.** Edit `darwin.yml` (or replace it). Every {expression} in the markdown resolves against this file. Add or remove fields freely — unused fields are ignored, missing fields produce empty strings.

**Add a section.** Create a new `.md` file in `pages/cv/` with `type: CvEntry` in frontmatter. Add `source: fieldName` to iterate over a data array, or use inline Loom expressions for summaries.

**Change the docx branding.** Edit `site/layout/header.md` — the institution name (H1) and document label (H2) are plain markdown. The `DownloadBar` component's `compile()` call accepts paragraph styles, numbering definitions, and document metadata.

**Switch themes.** The `theme.yml` controls all colors, fonts, and contexts. The components use semantic CSS tokens (`text-heading`, `text-body`, `text-subtle`, `bg-section`) — changing the theme changes the entire visual identity without touching component code.

**Add images to the docx.** Import `Image` from `@uniweb/press/docx` in a section component and register it alongside text content. The Press adapter fetches images at compile time and embeds them in the Word document. Use PNG or JPEG for best Word compatibility.
