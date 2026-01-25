/**
 * Header Component Metadata (v2)
 *
 * Documentation header with optional category tabs.
 */
export default {
  title: 'Header',
  description: 'Documentation header with optional category tabs',
  category: 'navigation',
  purpose: 'Navigate',

  content: {
    title: 'Site name (when no logo)',
    imgs: 'Site logo image',
    links: 'Optional CTA button',
  },

  params: {
    sticky: {
      type: 'boolean',
      label: 'Sticky Header',
      description: 'Header stays fixed at top while scrolling',
      default: true,
    },
    categories: {
      type: 'boolean',
      label: 'Category Tabs',
      description: 'Show top-level pages as category tabs (pairs with LeftPanel categories)',
      default: false,
    },
    transparency: {
      type: 'boolean',
      label: 'Transparency Effect',
      description: 'Use blur transparency when scrolled',
      default: true,
    },
  },

  presets: {
    default: {
      label: 'Simple Header',
      params: { sticky: true, transparency: true },
    },
    categories: {
      label: 'With Category Tabs',
      params: { sticky: true, categories: true },
    },
  },
}
