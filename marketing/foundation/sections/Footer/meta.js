export default {
  // Meant for the layout's footer area: an editor offers it there, not among a page's sections.
  area: 'footer',
  title: 'Footer',
  description: 'Site footer with navigation, social links, and copyright',

  content: {
    title: 'Site name (optional)',
    paragraphs: {
      label: 'Copyright line and tagline [0-2]',
      hint: 'The first paragraph is the copyright line (a default is shown without one); the second is an optional tagline',
    },
    links: 'Footer links (social + legal)',
    items: {
      label: 'Footer columns [0-4]',
      content: { title: 'Column heading', links: 'Links' },
    },
  },
}
