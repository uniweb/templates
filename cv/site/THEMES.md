# Themes

The site ships two reference `theme.yml` variants. Both drive the
same `faculty-annual-report` foundation — nothing in
`foundation/src/` changes when you switch themes. This is the core
promise of a docusite template: one foundation, many tenants,
distinguished by theme alone.

## The variants

| File | Name | Feel |
|---|---|---|
| `theme.yml` | **Down House** (default) | Victorian serif. Cormorant Garamond + Crimson Text, deep navy primary, warm stone neutral, cream section background. Feels like a well-printed monograph. |
| `theme-modern.yml` | **Modern** | Contemporary sans-serif. Inter everywhere, emerald primary, cool zinc neutral, pure white sections. Feels like a SaaS product page. |

Both themes use the same semantic tokens (`heading`, `body`,
`section`, `card`, `subtle`, `border`, `primary`, `accent`, …).
The section components in `foundation/src/sections/` style
themselves with those tokens — `className="text-heading"`,
`className="bg-section"`, `className="text-primary"`, and so on —
so any value you bind to the tokens flows through automatically.

## Switching themes

### Option 1 — rename

```bash
cd site
mv theme.yml theme-down-house.yml
mv theme-modern.yml theme.yml
pnpm dev
```

`theme.yml` is the one the runtime actually reads. Whichever file
has that name wins.

### Option 2 — copy contents

If you want to keep both files around with their descriptive
names, open `theme.yml` in your editor and replace its entire
contents with the body of `theme-modern.yml` (or vice versa).

## Writing a third theme

Start by copying one of the existing files and changing the
values that matter to you. The smallest honest theme is three
lines:

```yaml
colors:
  primary: '#xxxxxx'
fonts:
  heading: "'Your Font', serif"
background: '#fffef0'
```

Everything else inherits sensible defaults from Uniweb's theming
engine. You only need to override the tokens whose appearance you
care about.

### What each section type pulls from the theme

This is the map of which section component reads which token.
Use it when you're trying to decide whether a particular token
override will change what you think it'll change.

| Token | Affects |
|---|---|
| `heading` | All section titles, `<H1>`–`<H4>`, definition-list labels |
| `body` | All body paragraphs, table content, publication entries |
| `subtle` | Captions ("Formatted via citestyle · APA", "6 of 20 publications", etc.), muted metadata |
| `section` | Background of every section's container |
| `card` | Compact data panels (PersonalInfo's definition list, the ResearchFunding table body) |
| `muted` | Alternating table rows, hover states |
| `border` | Table cell borders, timeline rules, separators |
| `primary` | Download button, active filters, timeline dots |
| `primary-foreground` | Text on `primary` backgrounds (the Download button label) |
| `accent` | Rare highlights — inline `[text]{accent}` spans |
| `link` / `link-hover` | Inline links in body copy and in the preview's citation HTML |

### Fonts

You can ship the Google Fonts import URLs directly in the theme's
`fonts.import[]` list. The runtime injects the `<link>` tags into
`<head>` and the browser fetches them alongside the page's own
assets. Sizing inside components stays in `em` and `rem`, so the
choice of typeface doesn't affect layout.

### Context overrides

Sections can declare `theme: light`, `theme: medium`, or
`theme: dark` in frontmatter. The runtime applies a `context-*`
CSS class to the section wrapper, and the tokens inside
`contexts:` in `theme.yml` resolve to different palette values
per context. The faculty-annual-report sections all use
`theme: light` by default — dark/medium are drafted in both
themes but currently unused. To alternate contexts for visual
rhythm, change a few sections' frontmatter:

```markdown
---
type: Publications
theme: medium
data: publications
---
```

## What themes don't (yet) change

- **Downloaded docx margins.** Currently the compiled `.docx`
  uses Word's default page margins. Slice 9 (or a later
  enhancement) will thread `vars.report-page-margin-*` from the
  theme into the `compile('docx', …)` call so print margins
  track the theme.
- **Downloaded docx typography.** The docx side uses the docx
  library's default fonts (Calibri for body, Times New Roman for
  headings). Adding theme-driven docx typography is a
  straightforward next step — the `paragraphStyles` in
  `foundation/src/components/docx-style-pack.js` already accepts
  a `run: { font: ... }` field, just not wired to the theme yet.

Both of these are small follow-ons that keep the
one-foundation-many-tenants story honest for the compiled file
as well as the preview.
