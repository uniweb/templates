export default {
  title: 'Header',
  description: 'Documentation header with navigation levels support',
  category: 'Navigation',

  elements: {
    title: {
      label: 'Site Name',
      description: 'Displayed when no logo is provided',
    },
    imgs: {
      label: 'Logo',
      description: 'Site logo image',
    },
    links: {
      label: 'CTA Button',
      description: 'Optional call-to-action button',
    },
  },

  properties: {
    sticky: {
      type: 'boolean',
      label: 'Sticky Header',
      description: 'Header stays fixed at top while scrolling',
      default: true,
    },
    site_navigation: {
      type: 'boolean',
      label: 'Site Navigation',
      description: 'Show root-level pages as tabs. When enabled, LeftPanel shows only current section.',
      default: false,
    },
    transparency: {
      type: 'boolean',
      label: 'Transparency Effect',
      description: 'Use blur transparency when scrolled',
      default: true,
    },
  },
}
