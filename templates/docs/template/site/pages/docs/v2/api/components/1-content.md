---
type: DocSection
---

### API Reference

# Components API

## Component props and configuration

Detailed reference for all component parameters and their options.

### DocSection

The main documentation content component.

- show_navigation (boolean): Show prev/next navigation
- max_width (string): Content width constraint

### Header

Site navigation header component with search, version, and locale support.

- sticky (boolean): Keep header fixed on scroll (default: true)
- categories (boolean): Show top-level pages as category tabs (default: false)
- transparency (boolean): Use blur effect when scrolled (default: true)
- showSearch (auto|always|never): When to show search button (default: auto)
- showLocale (auto|always|never): When to show locale switcher (default: auto)
- showVersion (auto|always|never): When to show version switcher (default: auto)

When `showSearch`, `showLocale`, or `showVersion` is set to `auto`:
- Search appears when `search.enabled: true` in site.yml
- Locale switcher appears when multiple locales are configured
- Version switcher appears when page is in versioned content

### LeftPanel

Sidebar navigation component.

- collapsible (boolean): Allow sections to collapse (default: true)
- categories (boolean): Filter navigation to current category (default: false)
- default_open (boolean): Start with sections expanded (default: true)

### Footer

Simple footer component.

- layout (string): 'simple' or 'centered'

### ApiReference

API endpoint documentation component.

- method (string): HTTP method (GET, POST, PUT, DELETE)
- endpoint (string): API endpoint path

For a conceptual overview, see the [Components Guide](page:components).
