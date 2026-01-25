/**
 * LeftPanel Component Metadata (v2)
 *
 * Sidebar navigation with collapsible sections.
 */
export default {
  title: 'Left Panel',
  description: 'Sidebar navigation with collapsible sections',
  category: 'navigation',
  purpose: 'Navigate',

  // LeftPanel uses website.getPageHierarchy() for navigation
  content: {},

  params: {
    collapsible: {
      type: 'boolean',
      label: 'Collapsible Sections',
      description: 'Allow sections to be collapsed/expanded',
      default: true,
    },
    site_navigation: {
      type: 'boolean',
      label: 'Filter to Section',
      description: 'Show only pages under current root section',
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
      label: 'Collapsible Nav',
      params: { collapsible: true, default_open: true },
    },
    sectioned: {
      label: 'Section Filtered',
      params: { collapsible: true, site_navigation: true },
    },
  },
}
