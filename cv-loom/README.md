# CV (Loom + Press)

An academic CV template that demonstrates two Uniweb companion packages working together: **Loom** instantiates content from live data, and **Press** compiles it to a downloadable Word document. The same Loom-resolved content feeds both the themed web preview and the `.docx` file — one source, two outputs.

Ships with Charles Darwin's CV as sample data: 9 sections, 18 publications, 6 awards, a full career timeline, and a branded Word document with custom header, footer, and page numbering.

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

### Indexed array access
`03-education.md` through `09-awards.md` — per-record rendering via dotted index paths. Each record becomes a content item (H2 heading + paragraph):
```
## {education.0.degree}
{education.0.institution} — {education.0.field} ({education.0.start}–{education.0.end})
```

### Links
`01-header.md` — markdown links with Loom-resolved URLs:
```
[{email}](mailto:{email}) · [ORCID {orcid}](https://orcid.org/{orcid})
```

## Data conventions

The profile is a single YAML file (`collections/profile/darwin.yml`). Key conventions:

- **Years are quoted strings** (`'1859'`, not `1859`). Loom applies locale grouping to numbers, turning 1859 into "1,859". Quoting suppresses that. Comparisons like `WHERE year > '1870'` still work — Loom coerces.

- **Money amounts are plain numbers** (`1000`, not `'1000'`). This way `TOTAL OF funding.amount` produces locale-grouped output ("1,730").

- **Lists are pre-sorted** by display order. Loom's `SORTED BY` is alphabetical only, so sort the source data when order matters. `funding.0` gives the largest grant because the array is sorted largest-first.

## Section types

The foundation has two section types and one layout — deliberately minimal.

### Header

Renders the personal info block: name (H1), role (H2), affiliation, and contact links. Loom fills in every value. The component renders `content.title`, `content.subtitle`, `content.paragraphs`, and `content.links`.

### Section

The generic workhorse. Renders `content.title` as H2, `content.paragraphs` as body text, and `content.items` as a list of sub-entries (H3 + paragraph each). Used for all 8 non-header sections. The items come from H2 headings in the markdown that appear after body content — the semantic parser groups them automatically.

Both section types register docx output via `useDocumentOutput`, so the same resolved content feeds both the web preview and the compiled Word document.

### CvLayout

Wraps the page in a `<DocumentProvider>` and provides:
- A **download button** (fixed bottom-right) that compiles all registered sections to `.docx`
- A branded **docx header** ("Down House Natural History — Curriculum Vitae")
- A **docx footer** with centered page numbers ("Page X of Y")
- Paragraph styles for the cover title and subtitle

## Press integration

Press is format-agnostic: section components register JSX fragments via `useDocumentOutput(block, 'docx', body)`, and a `compile('docx')` call walks all registrations to produce a Blob. The layout's download button triggers this.

The docx header and footer are registered with `{ role: 'header' }` and `{ role: 'footer' }` options. The Press compile pipeline routes them to the Word document's header/footer sections automatically.

The compile call passes paragraph style definitions (cover-title, cover-subtitle) so the Word document renders the header section with appropriate typography.

## How to customize

**Change the profile data.** Edit `darwin.yml` (or replace it). Every {expression} in the markdown resolves against this file. Add or remove fields freely — unused fields are ignored, missing fields produce empty strings.

**Add a section.** Create a new `.md` file in `pages/cv/` with `type: Section` in frontmatter. Use indexed array access (`{newField.0.name}`) for record items, or `SHOW ... JOINED BY` for inline lists.

**Change the docx branding.** Edit `CvLayout/index.jsx` — the `DocxBranding` component defines the header and footer. The `DownloadBar` component's `compile()` call accepts paragraph styles, numbering definitions, and document metadata.

**Switch themes.** The `theme.yml` controls all colors, fonts, and contexts. The components use semantic CSS tokens (`text-heading`, `text-body`, `text-subtle`, `bg-section`) — changing the theme changes the entire visual identity without touching component code.

**Add images to the docx.** Import `Image` from `@uniweb/press/docx` in a section component and register it alongside text content. The Press adapter fetches images at compile time and embeds them in the Word document. Use PNG or JPEG for best Word compatibility.
