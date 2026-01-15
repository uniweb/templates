# @uniweb/templates

Template processing engine and official templates for the Uniweb CLI.

## Overview

This package provides:
1. **Template processing engine** - Handlebars-based file processing with variable substitution
2. **Official templates** - Showcase templates like `marketing`, `docs`, `learning`
3. **Validation utilities** - Version checking and template structure validation

## Usage

### From CLI

```bash
# Use an official template
npx uniweb create my-project --template marketing

# Templates are resolved in order:
# 1. Built-in (single, multi) - in CLI
# 2. Official (@uniweb/templates) - marketing, docs, learning
# 3. npm packages - @scope/template-name
# 4. GitHub repos - github:user/repo
```

### Programmatic API

```javascript
import { applyBuiltinTemplate, hasTemplate, listBuiltinTemplates } from '@uniweb/templates'

// Check if a template exists
if (hasTemplate('marketing')) {
  // Apply template to a directory
  await applyBuiltinTemplate('marketing', './my-project', {
    projectName: 'my-project',
    year: new Date().getFullYear()
  })
}

// List available templates
const templates = await listBuiltinTemplates()
// [{ id: 'marketing', name: 'Marketing Starter', ... }]
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
            ├── src/
            │   └── main.jsx
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
- [ ] Use fixed names: `"name": "foundation"` and `"name": "site"`
- [ ] Add `.hbs` extension to files needing variable substitution
- [ ] Include sample content in `site/pages/`
- [ ] Create meaningful component metadata in `foundation/src/components/*/meta.js`
- [ ] Add E2E tests in the main workspace
- [ ] Test the full flow: create, install, build foundation, build site

## API Reference

### `applyTemplate(templatePath, targetPath, data, options)`

Apply a template from any path.

### `applyBuiltinTemplate(name, targetPath, data, options)`

Apply one of the official templates by name.

### `hasTemplate(name)`

Check if an official template exists.

### `listBuiltinTemplates()`

Get list of all official templates with metadata.

### `validateTemplate(templateRoot, options)`

Validate a template's structure and compatibility.

### `copyTemplateDirectory(sourcePath, targetPath, data, options)`

Low-level directory copying with Handlebars processing.

## License

MIT
