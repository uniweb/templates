# CLAUDE.md - AI Assistant Instructions

This file provides guidance for AI assistants working with this Uniweb project.

## Project Overview

This is a **Uniweb** project - a component web platform that separates content from code. The project has two main packages:

```
{{projectName}}/
├── foundation/     # React component library (code)
├── site/           # Content and pages (markdown)
├── package.json    # Root workspace config
└── pnpm-workspace.yaml
```

### Quick Commands

```bash
# Install dependencies
pnpm install

# Start development server (runs site with hot reload)
pnpm dev

# Build the foundation (creates dist/foundation.js and schema.json)
cd foundation && pnpm build

# Build the site for production
cd site && pnpm build
```

## Architecture

### Foundation Package (`/foundation`)

The **foundation** is a React component library. It can contain any React components, but only **exposed components** are available to content creators:

- **Exposed components**: Have a `meta.js` file and can be selected via `type:` in markdown frontmatter
- **Internal components**: Regular React components used within exposed components

Exposed components follow the `{ content, params, block }` interface:

1. Receive structured content parsed from markdown
2. Have configurable parameters (theme, layout, etc.)
3. Render content according to their design

**Key directories:**
- `src/components/*/` - Component implementations
- `src/components/*/meta.js` - Component metadata (makes component "exposed")
- `src/styles.css` - Global Tailwind styles

### Site Package (`/site`)

The **site** contains the actual content written in markdown. The runtime loads the foundation and renders content based on component selections.

**Key directories:**
- `pages/` - Content pages organized in folders
- `pages/[page-name]/page.yml` - Page metadata
- `pages/[page-name]/*.md` - Content sections

## Content Authoring (Site Package)

### Section File Format

Each section is a markdown file with YAML frontmatter:

```markdown
---
type: Hero          # Component name from foundation
theme: gradient     # Component parameter
layout: center      # Component parameter
---

### Eyebrow Text    # H3 before H1 becomes pretitle/kicker

# Main Headline     # H1 becomes title

## Subtitle         # H2 after H1 becomes subtitle

Description paragraph goes here.

[Primary CTA](#link)
[Secondary CTA](#link2)

![Hero Image](image.jpg)
```

### Content Structure

The semantic parser extracts content into a structured format:

- **`content.main.header`**: title, pretitle (eyebrow), subtitle
- **`content.main.body`**: paragraphs, links, imgs, lists
- **`content.items`**: Content groups from H3 headings (each with header and body)

### Adding Eyebrow/Kicker Text

Place a smaller heading (H3 or H4) before the main H1:

```markdown
### New Feature    ← This becomes pretitle/eyebrow

# Main Headline    ← This becomes title
```

## Component Development (Foundation Package)

### Component Interface

Every exposed component receives these props:

```jsx
function MyComponent({ content, params, block }) {
  // content - Structured content from markdown
  // params - Configuration from frontmatter
  // block - Runtime context (state, children, etc.)
}
```

### Using @uniweb/kit

Import standard components from the kit:

```jsx
import { H1, P, Link, Image, Section, cn } from '@uniweb/kit'

function Hero({ content, params }) {
  const { title, pretitle } = content.main?.header || {}
  const { paragraphs = [], links = [] } = content.main?.body || {}

  return (
    <section className="py-20">
      {pretitle && <span className="text-sm">{pretitle}</span>}
      <H1 text={title} className="text-4xl font-bold" />
      <P text={paragraphs[0]} className="text-lg text-gray-600" />
      {links[0] && <Link href={links[0].url}>{links[0].text}</Link>}
    </section>
  )
}
```

**Key kit exports:**
- `H1, H2, H3, P, Span` - Typography components (handle arrays, filter empty)
- `Link` - Smart links with routing support
- `Image` - Optimized images with filters
- `Section` - Layout wrapper with width/padding options
- `cn` - Tailwind class merging utility

### Component Metadata (`meta.js`)

Exposed components need a `meta.js` file to define their interface:

```javascript
export default {
  title: 'Hero Banner',
  description: 'A hero section with headline and CTA',
  category: 'Headers',

  // Document what content elements the component uses
  elements: {
    pretitle: {
      label: 'Eyebrow',
      description: 'Small text above headline (H3 before H1)',
    },
    title: {
      label: 'Headline',
      required: true,
    },
    paragraphs: {
      label: 'Description',
    },
    links: {
      label: 'Call to Action',
    },
  },

  // Configurable parameters
  properties: {
    theme: {
      type: 'select',
      label: 'Theme',
      options: [
        { value: 'gradient', label: 'Gradient' },
        { value: 'light', label: 'Light' },
        { value: 'dark', label: 'Dark' },
      ],
      default: 'gradient',
    },
    layout: {
      type: 'select',
      label: 'Layout',
      options: [
        { value: 'center', label: 'Center' },
        { value: 'left', label: 'Left' },
      ],
      default: 'center',
    },
  },
}
```

### Semantic Parameters Philosophy

Design parameters that describe **intent**, not implementation:

| Good (Semantic) | Bad (Implementation) |
|-----------------|---------------------|
| `theme: "dark"` | `backgroundColor: "#1a1a1a"` |
| `layout: "split-right"` | `gridTemplateColumns: "1fr 1fr"` |
| `size: "large"` | `fontSize: "2rem"` |
| `emphasis: "high"` | `fontWeight: 700` |

This allows:
- Content creators to make meaningful choices
- Designers to change implementations without breaking content
- Consistent design language across components

### Adding a New Component

1. Create directory: `foundation/src/components/NewComponent/`
2. Add `index.jsx` with the component implementation
3. Add `meta.js` with metadata and schema
4. Export from `foundation/src/index.js`

## Tailwind CSS

This project uses **Tailwind CSS v4** with the Vite plugin.

**Theme customization** (`foundation/src/styles.css`):

```css
@import "tailwindcss";

@source "./components/**/*.{js,jsx}";

@theme {
  --color-primary: #3b82f6;
  --color-secondary: #64748b;
}
```

**Using custom colors:**
```jsx
<div className="bg-primary text-white">
<div className="bg-primary/10">  {/* 10% opacity */}
```

## Best Practices

### For Content (Site)

1. Use semantic markdown structure
2. Keep sections focused on one purpose
3. Use H3 for eyebrow text before H1
4. Provide alt text for images

### For Components (Foundation)

1. Always handle missing content gracefully
2. Use kit components for typography and media
3. Define semantic parameters, not CSS values
4. Document elements and properties in meta.js
5. Use `cn()` for conditional class merging

### Avoid

- Don't hardcode content in components
- Don't create parameters for every CSS property
- Don't skip the meta.js file
- Don't import @uniweb/core directly (use @uniweb/kit)

## Troubleshooting

### "Could not load foundation"
Ensure `site/package.json` has `"foundation": "file:../foundation"` in dependencies.

### Component not appearing
1. Check it's exported from `foundation/src/index.js`
2. Check meta.js exists and is valid
3. Rebuild foundation: `cd foundation && pnpm build`

### Styles not applying
1. Check Tailwind classes are valid
2. Ensure `@source` in styles.css includes your component path
3. Check for typos in custom color names

## Resources

- [Uniweb Documentation](https://github.com/uniweb/uniweb)
- [@uniweb/kit Documentation](https://www.npmjs.com/package/@uniweb/kit)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
