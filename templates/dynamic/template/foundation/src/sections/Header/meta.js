export default {
  title: 'Header',
  description: 'Responsive navigation header',
  category: 'navigation',
  purpose: 'Navigate',

  content: {
    title: 'Site name (shown as logo text)',
    links: 'Optional call-to-action button',
  },

  params: {
    floating: {
      type: 'boolean',
      label: 'Floating header',
      description: 'Overlay the header on top of the next section (transparent until scrolled)',
      default: false,
    },
  },

  presets: {
    default: {
      label: 'Standard',
      params: { floating: false },
    },
    floating: {
      label: 'Floating',
      params: { floating: true },
    },
  },
}
