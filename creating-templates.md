# Creating Templates

This guide covers how to create, test, and publish official Uniweb templates using the format 2 content template structure.

## How Templates Work

Templates provide **content only** — section type components, pages, theme configuration, and collections. The CLI provides all structural scaffolding (`package.json`, `vite.config.js`, `main.js`, `pnpm-workspace.yaml`, etc.) from its built-in package templates. This means:

- Templates never duplicate structural files
- Structural upgrades (new Vite version, new runtime features) happen in the CLI, not in every template
- Templates are smaller — only unique content ships in the tarball

## Directory Structure

Each template lives at the repo root with this structure:

```
marketing/
├── template.json           # Required: Template metadata
├── preview.png             # Optional: Preview image
├── foundation/
│   └── src/
│       ├── foundation.js   # Section type exports
│       ├── styles.css      # Foundation styles
│       └── sections/       # Section type components
│           └── Hero/
│               ├── index.jsx
│               └── meta.js
└── site/
    ├── site.yml.hbs        # Site configuration (Handlebars-processed)
    ├── theme.yml            # Theme variables
    ├── layout/
    │   ├── header.md
    │   └── footer.md
    ├── pages/
    │   └── home/
    │       ├── page.yml
    │       └── 1-hero.md
    ├── collections/         # Optional: data collections
    ├── locales/             # Optional: i18n translations
    └── public/              # Optional: static assets
```

## What to Include

Templates contain only content — the unique parts that make each template different.

**Foundation content:**
- `src/foundation.js` — exports section types
- `src/styles.css` — foundation-level styles
- `src/sections/` — section type components (JSX + optional `meta.js`)
- `src/layouts/` — custom layout components (if any)
- `src/components/` — internal (non-addressable) components (if any)

**Site content:**
- `site.yml.hbs` — site configuration (processed through Handlebars)
- `theme.yml` — theme variables
- `layout/` — header, footer, sidebar content (markdown)
- `pages/` — page content (markdown + page.yml)
- `collections/` — data collections (if any)
- `locales/` — i18n translation files (if any)
- `public/` — static assets like favicon, images, data files

**Do NOT include** (the CLI generates these from package templates):
- `package.json` (root, foundation, or site)
- `vite.config.js`
- `main.js`
- `index.html`
- `pnpm-workspace.yaml`
- `.gitignore`
- `.vscode/`
- `README.md`
- `AGENTS.md`

## template.json

Required metadata file at the template root:

```json
{
  "name": "Marketing Starter",
  "description": "A complete marketing site with landing page components",
  "compatible": ">=0.7.0",
  "format": 2,
  "tags": ["marketing", "landing-page", "saas"],
  "components": ["Hero", "Features", "Pricing", "Testimonials", "CTA"]
}
```

| Field | Required | Description |
|-------|----------|-------------|
| `name` | Yes | Human-readable template name |
| `description` | No | Longer description for discovery |
| `compatible` | No | Semver range for CLI compatibility |
| `format` | Yes | Must be `2` for content templates |
| `tags` | No | Keywords for discovery |
| `components` | No | List of included section types |
| `packages` | No | Multi-package declaration (see below) |

### Multi-Package Templates

Templates with extensions or multiple foundations use the `packages` array:

```json
{
  "name": "Extensions Demo",
  "compatible": ">=0.7.0",
  "format": 2,
  "packages": [
    { "type": "foundation", "name": "foundation" },
    { "type": "extension", "name": "effects" },
    { "type": "site", "name": "site", "foundation": "foundation" }
  ]
}
```

Each package entry declares:
- `type` — `"foundation"`, `"extension"`, or `"site"`
- `name` — directory name within the template
- `foundation` — (sites only) which foundation this site uses

The CLI reads this array to scaffold the correct package structure, workspace configuration, and build scripts.

## Handlebars Processing

Files ending in `.hbs` are processed through Handlebars. The `.hbs` extension is removed in the output.

**Available variables:**
- `{{projectName}}` — project name from CLI
- `{{year}}` — current year

**Version helper:**
```handlebars
{{version "@uniweb/build"}}    → "^0.7.0" (current published version)
{{version "build"}}            → same, @uniweb/ prefix auto-added
```

**Supported file types for `.hbs` processing:**
- Code: `.js`, `.jsx`, `.ts`, `.tsx`, `.mjs`, `.cjs`
- Data: `.json`, `.yml`, `.yaml`
- Content: `.md`, `.mdx`
- Markup: `.html`, `.htm`, `.css`, `.scss`
- Other: `.txt`, `.xml`, `.svg`, `.vue`, `.astro`

Binary files (images, fonts, etc.) are copied as-is.

## Testing Templates

Test with the CLI's `create` command using a local path:

```bash
# From the workspace root
npx uniweb create test-project --template ./packages/templates/marketing

cd test-project
pnpm install
pnpm dev
```

The CLI detects format 2 from `template.json`, scaffolds the project structure from its package templates, and overlays the template's content.

You can also test the `add --from` flow:

```bash
npx uniweb create test-project
cd test-project
npx uniweb add foundation --from ../packages/templates/marketing
```

Key testing points:
- Project scaffolds correctly with all expected files
- Foundation builds and produces `schema.json` with section type metadata
- Site builds and produces `site-content.json` with parsed content
- Content sections are in correct order
- Handlebars variables are properly substituted

## Releasing Templates

Templates are released via GitHub Releases. The release workflow is automated via GitHub Actions.

### Release Process

1. **Make your changes** to template directories

2. **Commit your changes**:
   ```bash
   git add .
   git commit -m "feat: add new component to marketing template"
   ```

3. **Bump the version** (this creates a git tag):
   ```bash
   pnpm version patch   # 0.7.0 → 0.7.1
   ```

4. **Push the commit and tag**:
   ```bash
   git push && git push --tags
   ```

5. **GitHub Actions automatically**:
   - Creates tarballs for each template (e.g., `marketing.tar.gz`)
   - Updates `manifest.json` with the new version
   - Creates a GitHub Release with all assets
   - Builds and deploys live demos to GitHub Pages

### What Gets Released

Each tarball contains only the template's content directory:
- `marketing.tar.gz` → `marketing/template.json`, `marketing/foundation/`, `marketing/site/`

The CLI downloads and extracts tarballs on demand when users run `create --template <name>`.

## Checklist for New Templates

- [ ] Create `<name>/template.json` with `name` and `format: 2`
- [ ] Create `<name>/foundation/src/` with `foundation.js`, `styles.css`, and `sections/`
- [ ] Create `<name>/site/` with `site.yml.hbs`, pages, and layout
- [ ] Section types in `foundation/src/sections/` with components and optional `meta.js`
- [ ] Add `.hbs` extension to files needing variable substitution
- [ ] Add the template to `manifest.json`
- [ ] Test locally: `npx uniweb create test --template ./<name>` → install → build
- [ ] Verify no structural files are included (no `package.json`, `vite.config.js`, etc.)
