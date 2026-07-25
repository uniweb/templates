/**
 * Header Component Metadata
 *
 * Documentation header with category tabs, search, version, locale, and
 * dark mode switchers.
 *
 * `background: 'self'` tells the runtime that this component renders its
 * own background — skip the default section background layer. Without this,
 * the runtime would render a themed background behind the header that
 * conflicts with the surface the component paints itself.
 * This is the same pattern used for sections that render custom backgrounds
 * (gradients, images, glassmorphism, etc.).
 */
export default {
  title: 'Header',
  description: 'Documentation header with category tabs, search, version, and locale switchers',
  category: 'navigation',
  purpose: 'Navigate',
  background: 'self',

  content: {
    title: 'Site name (when no logo)',
    images: 'Site logo image [1]',
    links: 'Links: first internal link becomes CTA, external links (http...) shown as icons [0+]',
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
    showVersion: {
      type: 'select',
      label: 'Show Version Switcher',
      description: 'When to show the version switcher (auto shows only when page is in versioned content)',
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
