export default {
  // Placed in a layout area: an editor leaves it out of a page's sections.
  area: true,
  title: 'Header',
  description: 'Responsive navigation header',

  content: {
    title: 'Site name (shown as logo text)',
    links: 'Optional call-to-action button',
  },

  // The `content.data` key this section reads — the ```yaml:nav``` block in layout/header.md.
  data: { nav: {} },

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
