# CLAUDE.md - AI Assistant Instructions

This file provides guidance for AI assistants working with this Uniweb documentation project.

## Project Overview

This is a **Uniweb** documentation project with navigation levels support. The project has two main packages:

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

# Start development server
pnpm dev

# Build the foundation
cd foundation && pnpm build

# Build the site for production
cd site && pnpm build
```

## Architecture

### Foundation Package (`/foundation`)

The **foundation** contains documentation-focused React components:

- `Header` - Navigation header with optional site navigation tabs
- `LeftPanel` - Sidebar navigation with collapsible sections
- `DocSection` - Main documentation content renderer
- `CodeBlock` - Code snippets with copy button
- `Footer` - Simple site footer

### Site Package (`/site`)

The **site** contains documentation content in Markdown with YAML frontmatter.

**Key directories:**
- `pages/@header/` - Header configuration
- `pages/@footer/` - Footer configuration
- `pages/@left/` - Left sidebar configuration
- `pages/[section]/` - Documentation sections

## Navigation Levels

This template supports **navigation levels** - a pattern where:

1. **Header** shows root-level pages as tabs (when `site_navigation: true`)
2. **LeftPanel** filters to show only pages under the current root section

This creates a GitBook-like experience where each major section has its own sidebar navigation.

### Enabling Navigation Levels

In `@header/1-header.md`:
```yaml
---
type: Header
site_navigation: true
---
```

In `@left/1-navigation.md`:
```yaml
---
type: LeftPanel
site_navigation: true
---
```

## Content Structure

### Documentation Page

```markdown
---
type: DocSection
---

### Category Name

# Page Title

## Subtitle or description

Main content goes here.

### Subsection

More content with lists:

- Item one
- Item two
- Item three

[Link Text](https://example.com)
```

### Page Configuration (page.yml)

```yaml
title: Page Title
description: Page description
order: 1  # Controls navigation order
```

## Component Parameters

### Header

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `sticky` | boolean | `true` | Fixed header on scroll |
| `site_navigation` | boolean | `false` | Show root pages as tabs |
| `transparency` | boolean | `true` | Blur effect when scrolled |

### LeftPanel

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `collapsible` | boolean | `true` | Allow section collapse |
| `site_navigation` | boolean | `false` | Filter to current section |
| `default_open` | boolean | `true` | Start expanded |

### DocSection

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `show_navigation` | boolean | `true` | Show prev/next links |
| `max_width` | string | `prose` | Content width |

## Best Practices

1. **Organize by topic** - Create root-level sections for major topics
2. **Use page.yml** - Configure title, description, and order
3. **Consistent structure** - Use H3 for category, H1 for title, H2 for subtitle
4. **Keep pages focused** - One topic per page

## Resources

- [Uniweb Documentation](https://github.com/uniweb/uniweb)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
