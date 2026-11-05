export default {
  // Meant for the layout's footer area: an editor offers it there, not among a page's sections.
  area: 'footer',
  title: 'Footer',
  description: 'Site footer with brand info, navigation, social links, and newsletter',

  content: {
    title: 'Store name',
    paragraphs: 'Brand description [1]',
    items: {
      label: 'Footer columns [0-4]',
      hint: 'Each H3 becomes a column heading with links below.',
    },
  },

  params: {},
}
