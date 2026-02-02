/**
 * Footer Component Metadata (v2)
 */
export default {
  title: 'Footer',
  description: 'Site footer with navigation, social links, and copyright',
  category: 'navigation',
  purpose: 'Navigate',

  content: {
    title: 'Site name (optional)',
    paragraphs: 'Copyright text [1]',
    links: 'Footer links (social, legal, etc.)',
    items: {
      label: 'Footer columns [0-4]',
      hint: 'Each H3 becomes a column with links below',
    },
  },

  params: {
    layout: {
      type: 'select',
      label: 'Layout',
      options: ['simple', 'columns'],
      default: 'simple',
    },
    showNav: {
      type: 'boolean',
      label: 'Show Page Navigation',
      default: true,
    },
  },
}
