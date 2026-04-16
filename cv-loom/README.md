# CV (Loom + Press)

An academic CV template that demonstrates two Uniweb companion packages working together: **Loom** instantiates content from live data, and **Press** compiles it to a downloadable Word document. The same Loom-resolved content feeds both the themed web preview and the `.docx` file — one source, two outputs.

Ships with Charles Darwin's CV as sample data: 9 page sections, 18 publications, 6 awards, a full career timeline, and a branded Word document with custom header, footer, and page numbering.

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
Content handler (foundation.js) runs instantiateContent()
against data.profile[0] — resolves every {expression}
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

This CV is one page with 9 sections. Each section is a markdown file whose {expressions} are resolved against a single profile data file. The content handler runs Loom once; after that, everything downstream (components, Press, prerender) sees plain resolved content.

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
{SHOW publications.title WHERE year > '1870' JOINED BY ', '}
```

### Joining lists
`05-publications.md` — single-field extraction joined into prose:
```
{SHOW publications.title WHERE type = 'book' JOINED BY ' · '}
```

### The repeat pattern
`03-education.md` through `09-awards.md` — a `---` divider splits the markdown into header (rendered once) and body (repeated per data item). Declared via `repeat: fieldName` in frontmatter:
```
---
type: CvEntry
repeat: education
---
# Education
{COUNT OF education} degrees from Edinburgh and Cambridge.
---
## {degree}
{institution} — {field} ({start}–{end})
```
The content handler resolves the header against the full profile, then loops the body template per record in the named array (each item's fields are merged into the Loom namespace). A second `---` starts a footer, rendered once after all items.

### Auto-linked content
`01-header.md` — plain `{email}` and `{website}` expressions. The content-reader auto-links emails and URLs at build time, so the resolved text renders as clickable links in both the web preview and the docx output (via Press's `parseStyledString`). No explicit markdown link syntax needed.

## Data conventions

The profile is a single YAML file (`collections/profile/darwin.yml`). Key conventions:

- **Years are quoted strings** (`'1859'`, not `1859`). Loom applies locale grouping to numbers, turning 1859 into "1,859". Quoting suppresses that. Comparisons like `WHERE year > '1870'` still work — Loom coerces.

- **Money amounts are plain numbers** (`1000`, not `'1000'`). This way `TOTAL OF funding.amount` produces locale-grouped output ("1,730").

- **Lists are pre-sorted** by display order. Loom's `SORTED BY` is alphabetical only, so sort the source data when order matters. `funding.0` gives the largest grant because the array is sorted largest-first.

## Section types

The foundation has three section types and one layout — deliberately minimal.

### Header

Renders the personal info block: name (H1), role (H2), affiliation, and contact lines. Loom fills in every value. Uses a **single JSX tree** with Press builders — the same `<H1>`, `<H2>`, `<Paragraph>` elements serve as the web preview (styled via `className`) and compile to docx (via `data-*` attributes). This is the Press hello-world pattern: one tree, two consumers, zero drift.

### CvEntry

The generic workhorse. Renders `content.title` as H2, `content.paragraphs` as body text, and `content.items` as a list of sub-entries (H3 + paragraph each). Used for all 8 non-header sections. The items come from H2 headings in the markdown that appear after body content — the semantic parser groups them automatically. Same single-tree Press pattern as Header.

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

**Add a section.** Create a new `.md` file in `pages/cv/` with `type: CvEntry` in frontmatter. Add `repeat: fieldName` to iterate over a data array, or use inline Loom expressions for summaries.

**Change the docx branding.** Edit `site/layout/header.md` — the institution name (H1) and document label (H2) are plain markdown. The `DownloadBar` component's `compile()` call accepts paragraph styles, numbering definitions, and document metadata.

**Switch themes.** The `theme.yml` controls all colors, fonts, and contexts. The components use semantic CSS tokens (`text-heading`, `text-body`, `text-subtle`, `bg-section`) — changing the theme changes the entire visual identity without touching component code.

**Add images to the docx.** Import `Image` from `@uniweb/press/docx` in a section component and register it alongside text content. The Press adapter fetches images at compile time and embeds them in the Word document. Use PNG or JPEG for best Word compatibility.
