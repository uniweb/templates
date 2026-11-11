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
      content: {
        title: 'Column heading',
        links: 'Links',
        icons: { label: 'Icons', hint: 'A column without links shows its icons in a row.' },
      },
    },
  },

  params: {},
}
