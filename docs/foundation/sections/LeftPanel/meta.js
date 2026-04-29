/**
 * LeftPanel Component Metadata
 *
 * Sidebar navigation with collapsible sections and category filtering.
 *
 * `background: 'self'` — this component lives in a layout area (left sidebar)
 * and manages its own background via the layout's bg-white/dark:bg-gray-900.
 * Without this, the runtime would apply a themed section background that
 * creates a visible color mismatch between the sidebar and the layout.
 */
export default {
  title: 'Left Panel',
  description: 'Sidebar navigation with collapsible sections and category filtering',
  category: 'navigation',
  purpose: 'Navigate',
  background: 'self',

  // LeftPanel reads navigation from website.getPageHierarchy(), not from
  // its own content — so the content declaration is empty.
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
      description: 'Show only pages within the current category (pairs with Header categories)',
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
