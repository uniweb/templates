# CV (Loom-instantiated) Template

A single-page narrative CV whose prose is written with `{placeholder}` expressions and instantiated at render time against a profile data file. This template is the reference implementation for Uniweb's **foundation content handler** hook, paired with [`@uniweb/loom`](https://www.npmjs.com/package/@uniweb/loom) — the template-engine companion to Press.

```bash
uniweb create my-bio --template cv-loom
cd my-bio && pnpm dev
# Open http://localhost:5173
```

## What Makes This Template Different

The [`cv` template](../cv/) is a docusite: authored prose and section-component logic produce both an on-screen preview and a downloadable `.docx`. It's the Press story.

**`cv-loom` is the Loom story.** There is no `.docx` compile, no section vocabulary for tables and bibliographies, no download. Just one section component rendering whatever prose it's given. The interesting thing — the whole point of the template — is that the prose itself contains live expressions that get evaluated at render time.

Open `site/pages/home/summary.md` and look at the paragraphs:

```markdown
{first_name} {family_name} is a {role} based at **{affiliation}**.
Over a career spanning {career_start} to {career_end}, his work has
addressed {SHOW research_areas JOINED BY ', '}.

He has authored **{COUNT OF publications} published works**, including
{COUNT OF publications WHERE type = 'book'} books and
{COUNT OF publications WHERE type = 'article-journal'} journal
articles. The {COUNT OF publications WHERE year > '1870'} works from
the last decade of his career:
{SHOW publications.title WHERE year > '1870' JOINED BY ' • '}.
```

None of those `{…}` expressions are escaped or processed by your components. The foundation declares a **content handler** that runs Loom over every block's raw ProseMirror tree before the semantic parser sees it:

```js
// foundation/src/foundation.js
import { Loom, instantiateContent } from '@uniweb/loom'

const loom = new Loom()

export default {
  handlers: {
    content: (data, block) => {
      const profile = data?.profile?.[0]
      if (!profile) return null
      return instantiateContent(
        block.rawContent,
        loom,
        (key) => profile[key]
      )
    },
  },
}
```

At render time the runtime calls this handler with the assembled block data. The handler hands Loom the raw ProseMirror tree and a key resolver pointing at the profile item. Loom walks the tree, evaluates every `{expression}` it finds in a text node, and returns a new tree with the computed strings in place. The framework re-parses that tree through the semantic parser, and the `Summary` component receives an ordinary content object with title and paragraphs — the placeholders are gone.

**The section component has zero knowledge of Loom.** It's the same semantic-content-in, React-JSX-out shape any Uniweb component follows. Template instantiation lives at the foundation boundary, not inside components.

## What Ships in the Box

- **`site/collections/profile/darwin.yml`** — a single pure-YAML file containing the full Darwin profile: name, role, affiliation, research areas, 18 publications with type and year, 5 research grants with source and amount, 6 awards, 6 teaching mentees, and 4 learned societies. Uniweb's collection loader supports `.yml`, `.yaml`, `.json`, and `.md` files side by side; this template uses `.yml` because a profile is pure structured data with no narrative body.
- **`site/pages/home/summary.md`** — the narrative Career Summary page. Four paragraphs. 17 distinct Loom expressions. All computed against the single profile item. No `data:` declaration in the frontmatter — the `Summary` section's `meta.js` declares `data: { inherit: ['profile'] }` and the runtime's EntityStore attaches the collection automatically.
- **`foundation/src/foundation.js`** — the content-handler wiring.
- **`foundation/src/sections/Summary/`** — a 30-line section component that renders title and paragraphs. Unaware of Loom. Its `meta.js` declares profile inheritance so pages don't need to repeat it.

Run `pnpm dev` and the rendered page reads as a finished bio:

> Charles Darwin is a Naturalist and Independent Researcher based at **Down House, Downe, Kent, England**. Over a career spanning 1831 to 1882, his work has addressed transmutation of species, geology of coral reefs and volcanic islands, systematics of the Cirripedia, physiology of climbing and insectivorous plants, expression of emotions in animals and humans, role of earthworms in soil formation.
>
> He has authored **18 published works**, including 17 books and 1 journal articles. The 8 works from the last decade of his career: The Descent of Man, and Selection in Relation to Sex • The Expression of the Emotions in Man and Animals • ...

Every count, every total, every filtered list is computed from the profile, not hand-written. Change `funding.0.amount` to `1500` in the profile and the total updates automatically on the next render.

## Loom Features Demonstrated

The 17 expressions in `summary.md` cover most of Loom's Plain-form surface:

| Feature | Example expression | Produces |
|---|---|---|
| Variable substitution | `{first_name}` | "Charles" |
| Dotted field access | `{funding.0.amount}` | "1,000" |
| Multi-value `SHOW` with `JOINED BY` | `{SHOW research_areas JOINED BY ', '}` | "transmutation of species, geology of coral reefs, ..." |
| `COUNT OF` | `{COUNT OF publications}` | "18" |
| `COUNT OF ... WHERE` | `{COUNT OF publications WHERE type = 'book'}` | "17" |
| `COUNT OF ... WHERE` (comparison) | `{COUNT OF publications WHERE year > '1870'}` | "8" |
| `TOTAL OF` with dot access | `{TOTAL OF funding.amount}` | "1,530" (locale-grouped currency) |
| `AVERAGE OF` | `{AVERAGE OF funding.amount}` | "306" |
| `SHOW ... WHERE ... JOINED BY` | `{SHOW publications.title WHERE year > '1870' JOINED BY ' • '}` | filtered list |

Every feature above runs in the browser and during prerender via the foundation content handler — no special build step, no separate pre-processing of markdown. Edit the profile, refresh, see updated output.

## A Few Conventions Worth Knowing

### Years are strings

Loom's default formatter applies locale grouping to numeric results. That's welcome for totals (`1000` → `"1,000"`) but not for years (`1859` → `"1,859"`, which reads wrong). Store every `year` field as a quoted string in YAML:

```yaml
career_start: '1831'    # quoted
career_end: '1882'      # quoted
publications:
  - year: '1859'        # quoted
    ...
```

Comparisons still work (`{COUNT OF publications WHERE year > '1870'}`) — Loom coerces numerically.

### Amounts are numbers

Currency is the opposite. Store amounts as integers. `TOTAL OF funding.amount` produces `"1,530"` with the locale separator, which is what you want for pounds and dollars.

### `SORTED BY field` has a known limitation

Plain's `SORTED BY field` and `FROM HIGHEST TO LOWEST field` currently sort the list items themselves, ignoring the field hint. This works correctly when the items are homogeneous primitives (all years, all amounts) but not when you try to sort a list of source names "by amount" — the sort walks the source strings alphabetically, not the amounts.

The profile data ships with `funding` pre-sorted from largest to smallest grant. References like `funding.0.source` and `funding.0.amount` give you the top grant directly without relying on sort. See `docs/future-work.md` in the `@uniweb/loom` repo for the status of this limitation.

### The handler sees one profile

The content handler in `foundation/src/foundation.js` flattens `data.profile[0]` into the Loom vars. The profile collection holds a single YAML file; that file's fields become the variable namespace. If you rename `darwin.yml` to `your-name.yml`, nothing else needs to change — the collection loader finds the first file in the folder, emits it as one item, and the handler picks the first item from the array.

If you wanted to render multiple CVs from the same foundation, you'd either scaffold multiple sites (one collection file each) or put multiple files in the profile collection and loop over them from a dynamic route.

## Where Press Fits In (or Doesn't)

This template does not use [`@uniweb/press`](https://www.npmjs.com/package/@uniweb/press). The two packages solve different problems:

- **Press** compiles React JSX into Word documents. It's how the [`cv` template](../cv/) produces `.docx` downloads that track the preview.
- **Loom** evaluates template expressions inline in authored text. It's how this template keeps CV prose in sync with profile data.

They compose cleanly — a future `cv-full` template could layer Press's section vocabulary on top of Loom-instantiated markdown, producing both a live-updating preview and a downloadable document from a single profile source. But each package is interesting on its own, and this template keeps the scope to just the content-handler / Loom story so the pattern is readable without Press on screen at the same time.

## Further Reading

- **`@uniweb/loom` docs** — [npmjs.com/package/@uniweb/loom](https://www.npmjs.com/package/@uniweb/loom). The `docs/basics.md`, `docs/quick-guide.md`, and `docs/language.md` in that package are the authoritative syntax reference.
- **`cv` template** (sibling) — the Press story. Same Charles Darwin sample, rendered through Press section components with `.docx` download.
- **Foundation content handler design** — the handler hook is framework machinery documented in `@uniweb/runtime`'s README. The relocation that landed this hook at render time (rather than at Block construction) is described in the plan `kb/framework/plans/content-handler-relocation.md` in the Uniweb workspace.
