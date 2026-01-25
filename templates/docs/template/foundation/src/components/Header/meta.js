/**
 * Header Component Metadata (v2)
 *
 * Documentation header with navigation levels support.
 */
export default {
  title: 'Header',
  description: 'Documentation header with navigation levels support',
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
    site_navigation: {
      type: 'boolean',
      label: 'Site Navigation',
      description: 'Show root-level pages as tabs',
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
      label: 'Sticky Header',
      params: { sticky: true, transparency: true },
    },
    tabs: {
      label: 'With Site Tabs',
      params: { sticky: true, site_navigation: true },
    },
  },
}
