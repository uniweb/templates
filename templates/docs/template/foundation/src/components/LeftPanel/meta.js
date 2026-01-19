export default {
  title: 'Left Panel',
  description: 'Sidebar navigation with collapsible sections',
  category: 'Navigation',

  elements: {
    // LeftPanel primarily uses website.getPageHierarchy()
    // No direct content elements needed
  },

  properties: {
    collapsible: {
      type: 'boolean',
      label: 'Collapsible Sections',
      description: 'Allow sections to be collapsed/expanded',
      default: true,
    },
    site_navigation: {
      type: 'boolean',
      label: 'Filter to Section',
      description: 'When enabled, shows only pages under the current root section. Use with Header site_navigation.',
      default: false,
    },
    default_open: {
      type: 'boolean',
      label: 'Default Open',
      description: 'Start with all sections expanded',
      default: true,
    },
  },
}
