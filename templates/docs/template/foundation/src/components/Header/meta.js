/**
 * Header Component Metadata (v2)
 *
 * Documentation header with category tabs, search, and locale switcher.
 */
export default {
  title: 'Header',
  description: 'Documentation header with category tabs, search, and locale switcher',
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
    showSearch: {
      type: 'select',
      label: 'Show Search',
      description: 'When to show the search button',
      options: ['auto', 'always', 'never'],
      default: 'auto',
    },
    showLocale: {
      type: 'select',
      label: 'Show Locale Switcher',
      description: 'When to show the language switcher',
      options: ['auto', 'always', 'never'],
      default: 'auto',
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
