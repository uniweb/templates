# @uniweb/templates

Official templates for the Uniweb CLI.

## Overview

This repository contains the official templates for the Uniweb CLI. Templates are distributed via **GitHub Releases**, not npm.

When users run `uniweb create my-project --template marketing`, the CLI:
1. Fetches the `manifest.json` from the latest GitHub release
2. Downloads the template tarball (e.g., `marketing.tar.gz`)
3. Extracts and applies the template with Handlebars processing

## Usage

```bash
# Use an official template (Tailwind v4 by default)
npx uniweb@latest create my-project --template marketing

# Use with Tailwind v3 (legacy)
npx uniweb@latest create my-project --template marketing --variant tailwind3

# Templates are resolved in order:
# 1. Built-in (single, multi) - in CLI
# 2. Official (this repo) - marketing, docs, learning
# 3. npm packages - @scope/template-name
# 4. GitHub repos - github:user/repo
```

## Creating Templates

### Directory Structure

Each template lives in `templates/<name>/` with this structure:

```
templates/
└── marketing/
    ├── template.json       # Required: Template metadata
    ├── preview.png         # Optional: Preview image
    └── template/           # Required: Files to scaffold
        ├── package.json.hbs
        ├── pnpm-workspace.yaml
        ├── .gitignore
        ├── README.md.hbs
        ├── foundation/
        │   ├── package.json.hbs
        │   ├── src/
        │   │   ├── index.js
        │   │   ├── styles.css
        │   │   └── components/
        │   │       └── Hero/
        │   │           ├── index.jsx
        │   │           └── meta.js
        │   └── ...
        └── site/
            ├── package.json.hbs
            ├── site.yml.hbs
            ├── vite.config.js
            ├── main.js
            └── pages/
                └── home/
                    ├── page.yml
                    └── 1-hero.md
```

### template.json

Required metadata file at the template root:

```json
{
  "name": "Marketing Starter",
  "description": "A complete marketing site with landing page components",
  "uniweb": ">=0.2.0",
  "preview": "preview.png",
  "tags": ["marketing", "landing-page", "saas"],
  "components": ["Hero", "Features", "Pricing", "Testimonials", "CTA"]
}
```

| Field | Required | Description |
|-------|----------|-------------|
| `name` | Yes | Human-readable template name |
| `description` | No | Longer description for discovery |
| `uniweb` | No | Semver range for Uniweb compatibility |
| `preview` | No | Preview image filename |
| `tags` | No | Keywords for discovery |
| `components` | No | List of included components |

### Handlebars Processing

Files ending in `.hbs` are processed through Handlebars. The `.hbs` extension is removed in the output.

**Available variables:**
- `{{projectName}}` - Project name from CLI
- `{{year}}` - Current year
- Custom variables can be passed via the API

**Version helper:**
```handlebars
{{version "@uniweb/build"}}    → "^0.2.0" (current published version)
{{version "build"}}            → same, @uniweb/ prefix auto-added
```

**Available partials:**

The CLI provides shared partials that remote templates can use in `.hbs` files:

| Partial | Purpose |
|---------|---------|
| `{{> claude-md}}` | Complete CLAUDE.md for AI assistants |
| `{{> search-docs}}` | Search feature documentation |
| `{{> exports-js}}` | JSDoc header for foundation exports.js |

**Example: CLAUDE.md.hbs**

The `claude-md` partial generates a complete AI assistant guide covering project structure (both single and multi-site), component discovery, content authoring, and troubleshooting:

```handlebars
{{> claude-md}}
```

This teaches Claude how to explore the codebase rather than listing specific components, so the documentation never becomes outdated as the project evolves.

**Example: package.json.hbs**
```json
{
  "name": "{{projectName}}",
  "version": "0.1.0",
  "private": true
}
```

**Supported file types for processing:**
- `.js`, `.jsx`, `.ts`, `.tsx`, `.mjs`, `.cjs`
- `.json`, `.yml`, `.yaml`
- `.md`, `.mdx`
- `.html`, `.htm`, `.css`, `.scss`
- `.txt`, `.xml`, `.svg`, `.vue`, `.astro`

Binary files (images, fonts, etc.) are copied as-is.

### Critical: Package Dependencies

**The site package MUST include the foundation as a local dependency:**

```json
// site/package.json.hbs
{
  "name": "site",
  "dependencies": {
    "@uniweb/runtime": "^0.1.0",
    "foundation": "file:../foundation"
  }
}
```

This `"foundation": "file:../foundation"` entry is essential because:
1. Both npm and pnpm create a symlink at `site/node_modules/foundation` pointing to the sibling foundation
2. Vite's `#foundation` alias resolves to the `foundation` module
3. Without this, the site build will fail with "Could not load foundation"

**Important:** Use `file:` protocol, not `workspace:*`. The `workspace:*` protocol is pnpm-specific and will fail with npm.

**Use fixed package names:**
- Foundation: `"name": "foundation"` (not `{{projectName}}-foundation`)
- Site: `"name": "site"` (not `{{projectName}}-site`)

**The foundation package MUST include `@uniweb/core` as a direct dependency:**

```json
// foundation/package.json.hbs
{
  "name": "foundation",
  "dependencies": {
    "@uniweb/core": "{{version "@uniweb/core"}}",
    "@uniweb/kit": "{{version "@uniweb/kit"}}"
  }
}
```

This is required because:
1. The foundation build externalizes `@uniweb/core` (it's not bundled into `foundation.js`)
2. When the site's prerender (SSG) loads `foundation/dist/foundation.js` in Node.js, it needs to resolve `import ... from '@uniweb/core'`
3. pnpm uses strict module resolution - each package can only see its own dependencies
4. Even though `@uniweb/kit` depends on `@uniweb/core`, the foundation's direct imports won't resolve through transitive dependencies

Without this, prerendering will fail with:
```
Cannot find package '@uniweb/core' imported from foundation/dist/foundation.js
```

### Root package.json Requirements

The root `package.json.hbs` must include workspace configuration for both npm and pnpm:

```json
{
  "name": "{{projectName}}",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "pnpm --filter site dev",
    "dev:runtime": "VITE_FOUNDATION_MODE=runtime pnpm --filter site dev",
    "build": "pnpm -r build",
    "preview": "pnpm --filter site preview"
  },
  "workspaces": [
    "site",
    "foundation",
    "sites/*",
    "foundations/*"
  ],
  "pnpm": {
    "onlyBuiltDependencies": ["esbuild", "sharp"]
  }
}
```

**Required fields:**
- `workspaces` - Enables npm workspace linking (required for `file:` dependencies to work)
- `pnpm.onlyBuiltDependencies` - Prevents pnpm from rebuilding native modules on every install

This matches how the CLI's built-in templates work and ensures the workspace linking functions correctly.

### Workspace Configuration

The root `pnpm-workspace.yaml` should include both packages:

```yaml
packages:
  - 'site'
  - 'foundation'
  - 'sites/*'
  - 'foundations/*'
```

### Variant Support

Templates can include variant-specific directories using the `.variant` suffix:

```
template/
├── foundation/
├── foundation.typescript/    # Used when variant='typescript'
└── site/
```

When applying with `variant: 'typescript'`, the `foundation.typescript/` directory contents will be used instead of `foundation/`.

## Validation

Templates are validated when applied:

1. **Structure check** - `template.json` and `template/` directory must exist
2. **Required fields** - `name` field is required in template.json
3. **Version compatibility** - If `uniweb` field is set, checks against current version
4. **Unresolved placeholders** - Warns if `{{variables}}` remain after processing

## Testing Templates

Add E2E tests in the main workspace at `tests/e2e/<template>-template.test.js`:

```javascript
import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { createTempDir, cleanupTempDir, runCreate, installDependencies, buildProject } from './helpers.js'

describe('Marketing Template Build', () => {
  let tempDir, projectDir

  beforeAll(async () => {
    tempDir = await createTempDir()
    projectDir = join(tempDir, 'test-project')
    await runCreate('test-project', { cwd: tempDir, template: 'marketing' })
    await patchForLocalPackages(projectDir)
    installDependencies(projectDir)
  }, 300000)

  it('should build foundation successfully', () => {
    buildProject(join(projectDir, 'foundation'))
    expect(existsSync(join(projectDir, 'foundation/dist/foundation.js'))).toBe(true)
  })

  it('should build site successfully', () => {
    buildProject(join(projectDir, 'site'))
    expect(existsSync(join(projectDir, 'site/dist/index.html'))).toBe(true)
  })
})
```

Key testing points:
- Project scaffolds correctly with all expected files
- Foundation builds and produces `schema.json` with component metadata
- Site builds and produces `site-content.json` with parsed content
- Content sections are in correct order
- Handlebars variables are properly substituted

## Releasing Templates

Templates are released via GitHub Releases. The release workflow is automated via GitHub Actions.

### Release Process

1. **Make your changes** to templates in `templates/`

2. **Commit your changes**:
   ```bash
   git add .
   git commit -m "feat: add new component to marketing template"
   ```

3. **Bump the version** (this creates a git tag):
   ```bash
   pnpm version patch   # 0.1.7 → 0.1.8
   # or
   pnpm version minor   # 0.1.7 → 0.2.0
   # or
   pnpm version major   # 0.1.7 → 1.0.0
   ```

4. **Push the commit and tag**:
   ```bash
   git push && git push --tags
   ```

5. **GitHub Actions automatically**:
   - Creates tarballs for each template (e.g., `marketing.tar.gz`)
   - Updates `manifest.json` with the new version
   - Creates a GitHub Release with all assets

### What Gets Released

The workflow creates:
- `manifest.json` - Template metadata with version
- `<template-name>.tar.gz` - One tarball per template

Each tarball contains the full template directory structure that the CLI extracts and processes.

### Manifest Structure

The `manifest.json` file lists all available templates:

```json
{
  "version": "v0.1.8",
  "templates": {
    "marketing": {
      "name": "Marketing Starter",
      "description": "Landing pages and marketing sites with Tailwind CSS v4",
      "variants": ["tailwind3"],
      "tags": ["marketing", "landing-page", "tailwind"]
    }
  }
}
```

### Adding a New Template

1. Create the template directory: `templates/<name>/`
2. Add `template.json` and `template/` directory
3. Add the template to `manifest.json`
4. Test locally with the CLI
5. Follow the release process above

## Troubleshooting

### "createRoot" export not found error

If you see an error like:
```
The requested module 'react-dom/client.js' does not provide an export named 'createRoot'
```

This is a Vite CJS/ESM interop issue. **React's npm packages (both 18 and 19) use CommonJS internally**, and Vite needs to pre-bundle them to convert to ESM for the browser.

**Solution:** Ensure your `vite.config.js` includes:

```javascript
export default defineConfig({
  // ... other config
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-dom/client', 'react-router-dom'],
  },
})
```

This forces Vite to pre-bundle these packages, ensuring proper CJS→ESM conversion. This is particularly important in:
- pnpm monorepos with nested `node_modules` structures
- Projects with linked/workspace dependencies
- Fresh installs before Vite's dependency discovery runs

**Why does React use CommonJS?** React's npm package exports CommonJS for Node.js compatibility. The ESM-only change in React 19 only affects UMD builds (for CDN script tags), not the npm package.

## Checklist for New Templates

- [ ] Create `templates/<name>/template.json` with required `name` field
- [ ] Create `templates/<name>/template/` directory structure
- [ ] Include root `package.json.hbs` with `workspaces` array and `pnpm.onlyBuiltDependencies`
- [ ] Include `pnpm-workspace.yaml` with workspace packages
- [ ] Include both `foundation/` and `site/` packages
- [ ] Add `"foundation": "file:../foundation"` to site's dependencies (not `workspace:*`)
- [ ] Add `"@uniweb/core"` to foundation's dependencies (required for prerender/SSG)
- [ ] Use fixed names: `"name": "foundation"` and `"name": "site"`
- [ ] Add `.hbs` extension to files needing variable substitution
- [ ] Include sample content in `site/pages/`
- [ ] Create meaningful component metadata in `foundation/src/components/*/meta.js`
- [ ] Add E2E tests in the main workspace
- [ ] Test the full flow: create, install, build foundation, build site

## License

MIT
