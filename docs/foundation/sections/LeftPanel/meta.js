/**
 * LeftPanel Component Metadata
 *
 * Sidebar navigation with collapsible sections and category filtering.
 *
 * `background: 'self'` — this component fills a layout area, and the layout
 * already paints that column. Without the opt-out the runtime would render a
 * themed section background underneath, and the seam would show.
 */
export default {
  title: 'Left Panel',
  description: 'Sidebar navigation with collapsible sections and category filtering',
  category: 'navigation',
  purpose: 'Navigate',
  background: 'self',

  // Navigation comes from the site's own page tree, not from this section's
  // content — so the content declaration is empty.
  content: {},

  params: {
    collapsible: {
      type: 'boolean',
      label: 'Collapsible Sections',
      description: 'Allow sections to be collapsed/expanded',
      default: true,
    },
    categories: {
      type: 'boolean',
      label: 'Category Filtering',
      description: 'Show only the section being read, rather than the whole site tree',
      default: false,
    },
    default_open: {
      type: 'boolean',
      label: 'Default Open',
      description: 'Start with all sections expanded',
      default: true,
    },
  },

  presets: {
    default: {
      label: 'Full Navigation',
      params: { collapsible: true, default_open: true },
    },
    categories: {
      label: 'Category Filtered',
      params: { collapsible: true, categories: true, default_open: true },
    },
  },
}
